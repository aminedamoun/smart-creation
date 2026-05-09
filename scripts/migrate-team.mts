/**
 * One-shot DDL migration to create sc_team in Supabase.
 *   PG_PASSWORD=... npx tsx scripts/migrate-team.mts
 */
import { Client } from "pg";

const password = process.env.PG_PASSWORD;
const projectRef = "eabxzyhizfsvbsysobwd";
if (!password) {
  console.error("Missing PG_PASSWORD env var");
  process.exit(1);
}

const ddl = `
create table if not exists public.sc_team (
  id            bigserial   primary key,
  name          text        not null,
  role          text        not null default '',
  photo         text,
  linkedin      text,
  display_order integer     not null default 100,
  visible       boolean     not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists sc_team_display_order_idx on public.sc_team (display_order);

alter table public.sc_team enable row level security;

drop policy if exists "sc_team anon read" on public.sc_team;
create policy "sc_team anon read"
  on public.sc_team for select
  to anon, authenticated
  using (visible = true);

drop trigger if exists sc_team_updated_at on public.sc_team;
create trigger sc_team_updated_at
  before update on public.sc_team
  for each row execute function public.sc_set_updated_at();
`;

async function tryConnect(connStr: string, label: string): Promise<boolean> {
  const c = new Client({
    connectionString: connStr,
    ssl: { rejectUnauthorized: false },
  });
  try {
    await c.connect();
    console.log(`Connected via ${label}.`);
    await c.query(ddl);
    console.log("DDL applied.");
    await c.end();
    return true;
  } catch (e) {
    console.error(`${label} failed:`, (e as Error).message);
    try { await c.end(); } catch {}
    return false;
  }
}

const regions = [
  "us-east-1",
  "us-east-2",
  "us-west-1",
  "us-west-2",
  "ca-central-1",
  "sa-east-1",
  "eu-west-1",
  "eu-west-2",
  "eu-west-3",
  "eu-central-1",
  "eu-central-2",
  "eu-north-1",
  "ap-south-1",
  "ap-southeast-1",
  "ap-southeast-2",
  "ap-northeast-1",
  "ap-northeast-2",
  "me-south-1",
  "me-central-1",
];

const hosts = ["aws-0", "aws-1", "aws-2"];
const candidates: { label: string; url: string }[] = [];
for (const h of hosts) {
  for (const r of regions) {
    candidates.push({
      label: `${h}-${r}:5432`,
      url: `postgresql://postgres.${projectRef}:${encodeURIComponent(password)}@${h}-${r}.pooler.supabase.com:5432/postgres`,
    });
  }
}

(async () => {
  for (const c of candidates) {
    const ok = await tryConnect(c.url, c.label);
    if (ok) process.exit(0);
  }
  console.error("All connection attempts failed.");
  process.exit(1);
})();
