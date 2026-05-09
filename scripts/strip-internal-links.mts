/**
 * One-shot: strip the trailing "Internal Linking Suggestions" block out of
 * every sc_insights row's body (and the markdown source files).
 * Run with: npx tsx scripts/strip-internal-links.mts
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const env: Record<string, string> = {};
for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^"(.*)"$/, "$1");
}
const sb = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL!,
  env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } },
);

// Drop everything from "**Internal Linking Suggestions:**" onward, including
// any leading horizontal rule + blank lines that introduce the block.
function strip(body: string): string {
  return body
    .replace(/\n+---\s*\n+\*\*Internal Linking Suggestions:?\*\*[\s\S]*$/m, "\n")
    .replace(/\n+\*\*Internal Linking Suggestions:?\*\*[\s\S]*$/m, "\n")
    .trimEnd();
}

// 1. Update all rows in Supabase
const { data: rows, error } = await sb
  .from("sc_insights")
  .select("id, slug, body");
if (error) throw error;

let dbTouched = 0;
for (const row of rows ?? []) {
  const before = String(row.body ?? "");
  const after = strip(before);
  if (after !== before) {
    const { error: upErr } = await sb
      .from("sc_insights")
      .update({ body: after, updated_at: new Date().toISOString() })
      .eq("id", row.id);
    if (upErr) throw upErr;
    console.log(`db: stripped block from ${row.slug}`);
    dbTouched++;
  }
}
console.log(`\nDB rows updated: ${dbTouched}/${rows?.length ?? 0}`);

// 2. Update local markdown files too (so re-seeding stays clean)
const dir = "content/insights";
let fileTouched = 0;
for (const file of readdirSync(dir)) {
  if (!file.endsWith(".md")) continue;
  const path = join(dir, file);
  const before = readFileSync(path, "utf8");
  const after = strip(before);
  if (after !== before) {
    writeFileSync(path, after + "\n");
    console.log(`file: stripped block from ${file}`);
    fileTouched++;
  }
}
console.log(`Markdown files updated: ${fileTouched}`);
