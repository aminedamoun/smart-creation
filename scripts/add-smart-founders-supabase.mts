/**
 * Insert the Smart Founders centre into Supabase, ordered immediately after
 * Future Space. Idempotent: skips if a centre with key "smart-founders"
 * already exists.
 *
 *   npx tsx scripts/add-smart-founders-supabase.mts
 */
import { readFileSync } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

try {
  const envFile = readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
  for (const line of envFile.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {
  /* no .env.local */
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const sb = createClient(url, serviceKey, { auth: { persistSession: false } });

const { data: existing, error: existsErr } = await sb
  .from("sc_centres")
  .select("id, key, display_order, name")
  .order("display_order", { ascending: true });
if (existsErr) {
  console.error(existsErr);
  process.exit(1);
}

console.log("Current centres:");
for (const c of existing ?? []) console.log(`  ${c.display_order}\t${c.key}\t${c.name}`);

if ((existing ?? []).some((c) => c.key === "smart-founders")) {
  console.log("\n= smart-founders already exists, nothing to do.");
  process.exit(0);
}

const futureSpace = (existing ?? []).find((c) => c.key === "future-space");
const smartView = (existing ?? []).find((c) => c.key === "smart-view");
if (!futureSpace) {
  console.error("\n! future-space centre not found; cannot place smart-founders");
  process.exit(1);
}
const fsOrder = futureSpace.display_order;
const svOrder = smartView?.display_order;
const targetOrder =
  svOrder !== undefined && svOrder > fsOrder
    ? Math.floor((fsOrder + svOrder) / 2)
    : fsOrder + 5;
console.log(
  `\n+ Inserting smart-founders with display_order ${targetOrder} (after future-space ${fsOrder}${
    svOrder !== undefined ? `, before smart-view ${svOrder}` : ""
  })`,
);

const { error: insertErr } = await sb.from("sc_centres").insert({
  key: "smart-founders",
  name: "Smart Founders",
  tagline: "Founder-focused workspace.",
  description:
    "Smart Founders — a dedicated centre for early-stage founders and small teams. Workspace, mentorship adjacency, and back-office support tailored to new businesses.",
  hero_image: "/centres/smart-founders.webp",
  building: "Smart Founders Centre",
  location: "Dubai",
  address_line: "Dubai, U.A.E.",
  emirate: "Dubai, U.A.E.",
  google_maps_url: null,
  phone: null,
  email: null,
  display_order: targetOrder,
  advantages: [],
  nearby: [],
  gallery: [],
});
if (insertErr) {
  console.error(insertErr);
  process.exit(1);
}
console.log("Done.");
process.exit(0);
