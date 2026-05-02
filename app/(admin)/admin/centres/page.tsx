import Link from "next/link";
import Image from "next/image";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";
import { AdminShell } from "../_shell";

export const dynamic = "force-dynamic";

type Row = {
  id: number;
  key: string;
  name: string;
  building: string;
  location: string;
  hero_image: string | null;
};

export default async function CentresList() {
  await requireAdmin();
  const { data } = await supabaseAdmin
    .from("sc_centres")
    .select("id, key, name, building, location, hero_image")
    .order("display_order", { ascending: true });
  const centres = (data ?? []) as Row[];

  // count properties per centre
  const counts: Record<number, number> = {};
  const { data: propRows } = await supabaseAdmin
    .from("sc_properties")
    .select("centre_id");
  for (const r of propRows ?? []) {
    if (r.centre_id) counts[r.centre_id] = (counts[r.centre_id] ?? 0) + 1;
  }

  return (
    <AdminShell active="centres">
      <div className="flex items-end justify-between mb-8 gap-4">
        <div>
          <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-2">
            Content
          </div>
          <h1 className="font-display text-[2rem] tracking-[-0.02em] text-ink">Business Centres</h1>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {centres.map((c) => (
          <li key={c.id}>
            <Link
              href={`/admin/centres/${c.id}`}
              className="group block rounded-3xl border border-ink/10 bg-paper overflow-hidden hover:border-ink/30 transition-colors"
            >
              <div className="relative h-[180px] bg-paper-soft">
                {c.hero_image && (
                  <Image
                    src={c.hero_image}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-paper/95 backdrop-blur-md px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink">
                  {counts[c.id] ?? 0} {counts[c.id] === 1 ? "property" : "properties"}
                </div>
              </div>
              <div className="p-5">
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
                  {c.key}
                </div>
                <h3 className="mt-1 font-display text-[1.15rem] tracking-[-0.01em] text-ink">
                  {c.name}
                </h3>
                <div className="mt-1.5 text-[0.84rem] text-ink-mute truncate">
                  {c.building} · {c.location}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
