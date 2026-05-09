/**
 * Seed Supabase sc_team with the existing team list.
 * Asad Hashmi is excluded — he stays in the dedicated CEO spotlight section.
 *
 *   npx tsx scripts/seed-team.mts          # seeds when sc_team is empty
 *   npx tsx scripts/seed-team.mts --force  # truncate + re-seed
 */
import { readFileSync } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

try {
  const env = readFileSync(path.resolve(process.cwd(), ".env.local"), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch {
  /* ignore */
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
const FORCE = process.argv.includes("--force");

const sb = createClient(url, key, { auth: { persistSession: false } });

type Member = {
  name: string;
  role: string;
  photo?: string;
  linkedin?: string;
};

// Mirror of the non-CEO entries in lib/data.ts → team. Order matters; it
// becomes the initial display order on the about page.
const team: Member[] = [
  { name: "Mahwish", role: "Managing Partner", linkedin: "https://www.linkedin.com/in/mahwishch/" },
  { name: "Shrushti Gupta", role: "Business Operations & HR Manager", photo: "/team/shrushti-gupta.webp", linkedin: "https://www.linkedin.com/in/shrushti-gupta-lion-%E2%9C%8C-7351a3112/" },
  { name: "Mian Aqib Riaz", role: "Business Setup Consultant", linkedin: "https://www.linkedin.com/in/mian-aqib-3227426b/" },
  { name: "Shaista Rehman", role: "Business Setup Consultant", linkedin: "https://www.linkedin.com/in/shaista-rehman-/" },
  { name: "Jawad Khan", role: "Business Setup Consultant & Public Relations Officer", photo: "/team/jawad-khan.webp", linkedin: "https://www.linkedin.com/in/jawadd-khan/" },
  { name: "Asher Ejaz", role: "Business Setup Consultant", photo: "/team/asher-ejaz.webp", linkedin: "https://www.linkedin.com/in/asher-e-3a8939188/" },
  { name: "Ayesha Ahmed", role: "Business Setup Consultant", photo: "/team/ayesha-ahmad.webp", linkedin: "https://www.linkedin.com/in/ayesha-ahmed-1873223ab/" },
  { name: "Ruby Sharma", role: "Business Setup Consultant", photo: "/team/ruby-sharma.webp", linkedin: "https://www.linkedin.com/in/ruby-sharma-8089842b7/" },
  { name: "Sidra Subhani", role: "Business Setup Consultant", photo: "/team/sidra-subhani.webp", linkedin: "https://www.linkedin.com/in/sidra-subhani-446020288/" },
  { name: "Zeeshan Rasheed", role: "Business Setup Consultant", photo: "/team/zeeshan-rasheed.webp", linkedin: "https://www.linkedin.com/in/zeeshan-rasheed-188463351/" },
  { name: "Shamsa Kanwal", role: "Business Setup Consultant & Public Relations Officer", photo: "/team/shamsa-kanwal.webp", linkedin: "https://www.linkedin.com/in/shamsa-farooq-749b12322/" },
  { name: "Famey Johnson", role: "Business Setup Consultant", linkedin: "https://www.linkedin.com/in/famey-johnson-1703892a5/" },
  { name: "Ashenafi Tsigab", role: "Business Setup Consultant", photo: "/team/ashenafi-tsigab.webp", linkedin: "https://www.linkedin.com/in/ashenafi-tsigab-118956374/" },
  { name: "Volodymyr Fedorets", role: "Business Setup Consultant", photo: "/team/volodymyr-fedorets.webp", linkedin: "https://www.linkedin.com/in/volodymyr-fedorets/" },
  { name: "Sarath Shaji", role: "Business Setup Consultant", linkedin: "https://www.linkedin.com/in/sarathshajismartbusinescreation/" },
  { name: "Yousuf Khan", role: "Business Setup Consultant", photo: "/team/yusuf-khan.webp", linkedin: "https://www.linkedin.com/in/yousuf-khan-227309263/" },
  { name: "Saeed Ur Rehman", role: "Audit, Advisory & Compliance Manager", photo: "/team/saeed-ur-rehman.webp", linkedin: "https://www.linkedin.com/in/saeed-ur-rehman-aca-4b4143387/" },
  { name: "Renju Raj", role: "Accountant", photo: "/team/renju-raj.webp" },
  { name: "Khakan Abbasi", role: "Banking & Business Setup Consultant", photo: "/team/khakan-abbasi.webp", linkedin: "https://www.linkedin.com/in/khakan-abbasi-84ab6261/" },
  { name: "Afrin Hameed", role: "Business Coordinator", photo: "/team/afrin-hameed.webp", linkedin: "https://www.linkedin.com/in/afrin-hameed-9956b1129/" },
  { name: "Faria Nasir", role: "Digital Marketing & Business Development Specialist", photo: "/team/fariha-nasir.webp", linkedin: "https://www.linkedin.com/in/faria-nasir-068856252/" },
  { name: "Athena Janin Sayson Gadiana", role: "Administrative Assistant", photo: "/team/athena-saysongadiana.webp", linkedin: "https://www.linkedin.com/in/athena-janin-gadiana-2086a02b4/" },
  { name: "Wardah Minhaj", role: "Administrative Operations Executive", photo: "/team/wardah-minhaj.webp", linkedin: "https://www.linkedin.com/in/wardah-minhaj-8836b9182" },
];

async function run() {
  const { count, error: countErr } = await sb
    .from("sc_team")
    .select("id", { count: "exact", head: true });
  if (countErr) {
    console.error("Count failed:", countErr.message);
    console.error("Tip: run scripts/supabase-schema.sql in Supabase SQL editor first.");
    process.exit(1);
  }
  if (count && count > 0 && !FORCE) {
    console.log(`sc_team already has ${count} rows. Re-run with --force to wipe and re-seed.`);
    return;
  }
  if (FORCE && count) {
    console.log(`Wiping ${count} existing rows…`);
    const { error: delErr } = await sb.from("sc_team").delete().gt("id", 0);
    if (delErr) {
      console.error("Delete failed:", delErr.message);
      process.exit(1);
    }
  }

  const rows = team.map((m, i) => ({
    name: m.name,
    role: m.role,
    photo: m.photo ?? null,
    linkedin: m.linkedin ?? null,
    visible: true,
    display_order: (i + 1) * 10,
  }));

  const { error } = await sb.from("sc_team").insert(rows);
  if (error) {
    console.error("Insert failed:", error.message);
    process.exit(1);
  }
  console.log(`Seeded ${rows.length} team members.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
