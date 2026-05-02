import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Building2, MapPin } from "lucide-react";

import { getCentres, getProperties, propertyToOffice } from "@/lib/payload-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Business Centres",
  description:
    "Smart Creation Group operates five business centres across Dubai — flagship Tecom skyline offices, ground-floor Bur Dubai trading suites, Deira freehold space, and more.",
  alternates: { canonical: "/business-centers" },
};

type CentreDoc = Awaited<ReturnType<typeof getCentres>>[number];

function heroUrl(c: CentreDoc): string {
  const h = c.heroImage as { url?: string | null; filename?: string | null } | undefined;
  let raw = h?.url || (h?.filename ? `/api/media/file/${h.filename}` : "/sc-cube.png");
  if (raw.startsWith("http://localhost") || raw.startsWith("http://127.0.0.1")) {
    try {
      raw = new URL(raw).pathname;
    } catch {
      /* ignore */
    }
  }
  return raw;
}

export default async function BusinessCentresIndexPage() {
  const centres = await getCentres();
  const allProps = await getProperties({ limit: 200 });
  const offices = allProps.map(propertyToOffice);
  const countByCentre: Record<string, number> = {};
  for (const o of offices) {
    countByCentre[o.centerId] = (countByCentre[o.centerId] ?? 0) + 1;
  }

  return (
    <>
      <section className="pt-28 md:pt-32 pb-12 md:pb-20 bg-paper-soft">
        <div className="container-edit">
          <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4">
            <span className="h-px w-8 bg-ink/25" />
            § Business Centres
          </div>
          <h1 className="max-w-4xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] tracking-[-0.025em] text-ink text-balance">
            Five centres across Dubai —{" "}
            <span className="italic text-brand-deep">pick where you want to work.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink-mute">
            Each Smart Creation Group business centre is fully serviced, Ejari-ready,
            and managed by the same team. Click into a centre for the full address,
            local advantages, and current property availability.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-edit">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {centres.map((c) => {
              const count = countByCentre[c.key as string] ?? 0;
              return (
                <li key={String(c.id)}>
                  <Link
                    href={`/business-centers/${c.key}`}
                    className="group flex flex-col h-full rounded-3xl border border-ink/10 bg-paper overflow-hidden transition-all hover:border-ink/25 hover:shadow-[0_22px_60px_-30px_rgba(13,16,19,0.28)]"
                  >
                    <div className="relative h-[220px] overflow-hidden bg-paper-deep">
                      <Image
                        src={heroUrl(c)}
                        alt={String(c.name)}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/60 to-transparent" />
                      <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                        <span className="rounded-full bg-paper/95 backdrop-blur-md px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink">
                          {count} {count === 1 ? "office" : "offices"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col flex-1 p-6 md:p-7">
                      <h3 className="font-display text-[1.4rem] leading-[1.1] tracking-[-0.02em] text-ink">
                        {String(c.name)}
                      </h3>
                      {c.tagline && (
                        <p className="mt-2 text-[0.95rem] text-ink-mute leading-relaxed">
                          {String(c.tagline)}
                        </p>
                      )}
                      <div className="mt-4 flex items-start gap-2 text-[0.84rem] text-stone">
                        <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" strokeWidth={1.8} />
                        <span>{String(c.location)}</span>
                      </div>
                      <div className="mt-2 flex items-start gap-2 text-[0.84rem] text-stone">
                        <Building2 className="h-3.5 w-3.5 mt-0.5 shrink-0" strokeWidth={1.8} />
                        <span>{String(c.building)}</span>
                      </div>

                      <div className="mt-auto pt-6 inline-flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ink group-hover:text-brand-deep transition-colors">
                        Visit centre
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.8}
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
