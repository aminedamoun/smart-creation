/**
 * One-shot: repair sc_properties rows where features / highlights /
 * payment_options were saved as a single { value: "<json-string>" }
 * because the old savePropertyAction used the wrong parser.
 *
 * Run with:  npx tsx scripts/repair-property-arrays.mts
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

// Load .env.local manually — tsx does not auto-load dotenv.
const env: Record<string, string> = {};
try {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) env[m[1]] = m[2].replace(/^"(.*)"$/, "$1");
  }
} catch {
  /* fall through to process.env */
}
const URL_ = env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_ || !KEY) throw new Error("missing supabase env");

const sb = createClient(URL_, KEY, { auth: { persistSession: false } });

type ValueArr = { value: string }[];

function repair(arr: unknown): ValueArr {
  if (!Array.isArray(arr)) return [];

  // Detect the broken single-item shape: [{ value: "[{...}]" }]
  if (
    arr.length === 1 &&
    arr[0] &&
    typeof (arr[0] as { value?: unknown }).value === "string" &&
    (arr[0] as { value: string }).value.trim().startsWith("[")
  ) {
    try {
      const parsed = JSON.parse((arr[0] as { value: string }).value);
      if (Array.isArray(parsed)) {
        return parsed
          .filter(
            (it): it is { value: string } =>
              !!it && typeof (it as { value?: unknown }).value === "string"
          )
          .map((it) => ({ value: it.value.trim() }))
          .filter((it) => it.value !== "");
      }
    } catch {
      /* fall through */
    }
  }

  // Already the correct shape — pass through, but normalise.
  return arr
    .filter(
      (it): it is { value: string } =>
        !!it &&
        typeof (it as { value?: unknown }).value === "string" &&
        !(it as { value: string }).value.trim().startsWith("[")
    )
    .map((it) => ({ value: it.value.trim() }))
    .filter((it) => it.value !== "");
}

const FIELDS = ["features", "highlights", "payment_options"] as const;

const { data: rows, error } = await sb
  .from("sc_properties")
  .select("id, slug, features, highlights, payment_options");
if (error) throw error;

let touched = 0;
for (const row of rows ?? []) {
  const update: Record<string, ValueArr> = {};
  let changed = false;

  for (const f of FIELDS) {
    const before = (row as Record<string, unknown>)[f];
    const after = repair(before);
    if (JSON.stringify(before) !== JSON.stringify(after)) {
      update[f] = after;
      changed = true;
    }
  }

  if (changed) {
    touched++;
    console.log(`fix #${row.id} (${row.slug}):`, Object.keys(update).join(", "));
    const { error: upErr } = await sb
      .from("sc_properties")
      .update(update)
      .eq("id", row.id);
    if (upErr) throw upErr;
  }
}

console.log(`\nDone. ${touched} row(s) repaired out of ${rows?.length ?? 0}.`);
