import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";
import { AdminShell } from "./_shell";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await requireAdmin();

  const [centres, properties, featured, team] = await Promise.all([
    supabaseAdmin.from("sc_centres").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("sc_properties").select("id", { count: "exact", head: true }),
    supabaseAdmin.from("sc_properties").select("id", { count: "exact", head: true }).eq("featured", true),
    supabaseAdmin.from("sc_team").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Centres", value: centres.count ?? 0, href: "/admin/centres" },
    { label: "Properties", value: properties.count ?? 0, href: "/admin/properties" },
    { label: "Featured", value: featured.count ?? 0, href: "/admin/properties?featured=1" },
    { label: "Team", value: team.count ?? 0, href: "/admin/team" },
  ];

  return (
    <AdminShell active="dashboard">
      <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-3">
        Overview
      </div>
      <h1 className="font-display text-[2rem] tracking-[-0.02em] text-ink mb-8">Dashboard</h1>

      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
        {stats.map((s) => (
          <li key={s.label}>
            <Link
              href={s.href}
              className="block rounded-2xl border border-ink/10 bg-paper p-5 hover:border-ink/30 transition-colors"
            >
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
                {s.label}
              </div>
              <div className="mt-2 font-display text-[2.2rem] leading-none text-ink">
                {s.value}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 grid sm:grid-cols-2 gap-4 max-w-3xl">
        <Link
          href="/admin/properties/new"
          className="rounded-2xl border border-ink/10 bg-paper p-5 hover:border-ink/30 transition-colors"
        >
          <div className="font-display text-[1.1rem] text-ink">Add a property</div>
          <p className="mt-1 text-[0.88rem] text-ink-mute">
            Create a new office listing — links it to a centre and uploads a hero image.
          </p>
        </Link>
        <Link
          href="/admin/centres"
          className="rounded-2xl border border-ink/10 bg-paper p-5 hover:border-ink/30 transition-colors"
        >
          <div className="font-display text-[1.1rem] text-ink">Edit a centre</div>
          <p className="mt-1 text-[0.88rem] text-ink-mute">
            Update name, address, advantages, gallery for a business centre.
          </p>
        </Link>
      </div>
    </AdminShell>
  );
}
