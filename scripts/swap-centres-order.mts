import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const env: Record<string, string> = {};
for (const line of readFileSync(".env.local", "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^"(.*)"$/, "$1");
}
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL!, env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
});

const updates = [
  { key: "smart-founders", display_order: 40 },
  { key: "future-space",   display_order: 45 },
];
for (const u of updates) {
  const { error } = await sb.from("sc_centres").update({ display_order: u.display_order }).eq("key", u.key);
  if (error) throw error;
  console.log(`updated ${u.key} → display_order ${u.display_order}`);
}
const { data } = await sb.from("sc_centres").select("key, display_order").order("display_order", { ascending: true });
console.log("\ncurrent order:");
console.table(data);
