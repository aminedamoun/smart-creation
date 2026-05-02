import Link from "next/link";
import Image from "next/image";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";
import { AdminShell } from "../_shell";

export const dynamic = "force-dynamic";

type PropertyRow = {
  id: number;
  slug: string;
  title: string;
  hero_image: string | null;
  centre_id: number | null;
  office_no: string;
  category: string;
  price_amount: string;
  price_period: string | null;
  availability: string;
  availability_accent: string;
  featured: boolean;
};

type CentreRow = { id: number; key: string; name: string; display_order: number };

export default async function PropertiesList({
  searchParams,
}: {
  searchParams: Promise<{ centre?: string }>;
}) {
  await requireAdmin();
  const sp = await searchParams;

  const [centresRes, propsRes] = await Promise.all([
    supabaseAdmin.from("sc_centres").select("id, key, name, display_order").order("display_order"),
    supabaseAdmin
      .from("sc_properties")
      .select("id, slug, title, hero_image, centre_id, office_no, category, price_amount, price_period, availability, availability_accent, featured")
      .order("featured", { ascending: false })
      .order("id", { ascending: true }),
  ]);
  const centres = (centresRes.data ?? []) as CentreRow[];
  let properties = (propsRes.data ?? []) as PropertyRow[];

  const filterCentreId = sp.centre ? Number(sp.centre) : null;
  if (filterCentreId) properties = properties.filter((p) => p.centre_id === filterCentreId);

  const centreById = new Map(centres.map((c) => [c.id, c]));

  return (
    <AdminShell active="properties">
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-2">
            Content
          </div>
          <h1 className="font-display text-[2rem] tracking-[-0.02em] text-ink">Properties</h1>
        </div>
        <Link
          href="/admin/properties/new"
          className="rounded-full bg-ink text-paper px-4 py-2 text-[0.88rem] font-medium hover:bg-brand-deep transition-colors"
        >
          + Create property
        </Link>
      </div>

      {/* Centre tabs */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <FilterPill href="/admin/properties" active={!filterCentreId} primary="All" secondary={`${propsRes.data?.length ?? 0}`} />
        {centres.map((c) => {
          const count = (propsRes.data ?? []).filter((p) => p.centre_id === c.id).length;
          return (
            <FilterPill
              key={c.id}
              href={`/admin/properties?centre=${c.id}`}
              active={filterCentreId === c.id}
              primary={c.name.replace("Business Center", "BC").replace("Hamd Bin Huwaidi Building", "Bldg.")}
              secondary={`${count}`}
            />
          );
        })}
      </div>

      {properties.length === 0 ? (
        <p className="text-ink-mute">No properties yet. Click "+ Create property" to add one.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {properties.map((p) => {
            const centre = p.centre_id ? centreById.get(p.centre_id) : null;
            const isUpcoming = p.availability_accent === "upcoming";
            return (
              <li key={p.id}>
                <Link
                  href={`/admin/properties/${p.id}`}
                  className="group block rounded-3xl border border-ink/10 bg-paper overflow-hidden hover:border-ink/30 transition-colors"
                >
                  <div className="relative h-[160px] bg-paper-soft">
                    {p.hero_image && (
                      <Image src={p.hero_image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                    )}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {p.featured && (
                        <span className="rounded-full bg-brand px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink">
                          ★ Featured
                        </span>
                      )}
                      <span className="rounded-full bg-ink/70 backdrop-blur-md px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper">
                        {p.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-paper/95 backdrop-blur-md px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink">
                      <span className={"h-1.5 w-1.5 rounded-full " + (isUpcoming ? "bg-amber-500" : "bg-emerald-500")} />
                      {p.availability}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
                      {p.office_no} · {centre?.name ?? "—"}
                    </div>
                    <h3 className="mt-1 font-display text-[1.1rem] tracking-[-0.01em] text-ink truncate">
                      {p.title}
                    </h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="font-display text-[1.15rem] text-ink">{p.price_amount}</span>
                      <span className="text-[0.78rem] text-ink-mute">{p.price_period}</span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </AdminShell>
  );
}

function FilterPill({ href, active, primary, secondary }: { href: string; active: boolean; primary: string; secondary: string }) {
  return (
    <Link
      href={href}
      className={
        "inline-flex flex-col items-start rounded-2xl border px-3 py-1.5 text-left transition-colors " +
        (active
          ? "border-ink bg-ink text-paper"
          : "border-ink/15 bg-paper text-ink hover:border-ink/40")
      }
    >
      <span className="text-[0.86rem] font-medium leading-tight">{primary}</span>
      <span className={"font-mono text-[0.6rem] uppercase tracking-[0.18em] " + (active ? "text-mist" : "text-stone")}>
        {secondary}
      </span>
    </Link>
  );
}
