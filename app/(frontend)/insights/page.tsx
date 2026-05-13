import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { getInsightsList } from "@/lib/insights";
import { InsightsHero } from "@/components/insights-hero";

export const metadata: Metadata = {
  title: "Insights · Dubai business setup, tax & compliance",
  description:
    "Long-form guides from the Smart Creation team: company formation playbooks, free-zone vs mainland breakdowns, and the UAE Corporate Tax & VAT survival guides.",
  alternates: { canonical: "/insights" },
};

const fmt = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });

export default async function InsightsPage() {
  const posts = await getInsightsList();
  const [feature, ...rest] = posts;

  return (
    <>
      <InsightsHero liveCount={posts.length} />

      {/* Feature */}
      <section className="py-16 md:py-24 bg-paper">
        <div className="container-edit">
          <Link
            href={`/insights/${feature.slug}`}
            className="group relative block overflow-hidden rounded-3xl border border-ink/10 bg-paper transition-all hover:border-brand/40 hover:shadow-[0_30px_80px_-30px_rgba(72,168,219,0.45)]"
          >
            <div className="grid grid-cols-12 gap-0">
              <div className="relative col-span-12 lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
                <Image
                  src={feature.cover}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-tr from-ink/45 via-ink/0 to-transparent"
                />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-paper/30 bg-ink/55 backdrop-blur-md px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-paper">
                  <Sparkles className="h-3 w-3 text-brand" strokeWidth={2} />
                  Featured · {feature.category}
                </div>
              </div>

              <div className="relative col-span-12 lg:col-span-5 p-7 md:p-10 flex flex-col">
                <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-4">
                  {fmt(feature.date)} · {feature.readMinutes} min read
                </div>
                <h2 className="font-display font-semibold text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.1] tracking-[-0.02em] text-ink text-balance">
                  {feature.title.split(":")[0]}
                  <span className="text-brand-deep">.</span>
                </h2>
                <p className="mt-4 text-[1rem] leading-relaxed text-ink-mute">
                  {feature.excerpt}
                </p>
                <div className="mt-auto pt-8 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ink group-hover:text-brand-deep transition-colors">
                  Read the full guide
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Rest of posts */}
      {rest.length > 0 && (
        <section className="pb-20 md:pb-28 bg-paper">
          <div className="container-edit">
            <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-8">
              <span className="h-px w-8 bg-ink/25" />
              More reading
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {rest.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/insights/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-paper transition-all hover:border-brand/40 hover:shadow-[0_22px_60px_-30px_rgba(72,168,219,0.45)] hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-tr from-ink/35 via-ink/0 to-transparent"
                      />
                      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-paper/30 bg-ink/55 backdrop-blur-md px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-paper">
                        {p.category}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <div className="flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone mb-3">
                        <span>{fmt(p.date)}</span>
                        <span className="text-stone/50">·</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" strokeWidth={1.8} />
                          {p.readMinutes} min
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-[1.25rem] leading-[1.2] tracking-[-0.015em] text-ink text-balance">
                        {p.title.split(":")[0]}
                        <span className="text-brand-deep">.</span>
                      </h3>
                      <p className="mt-3 text-[0.94rem] leading-relaxed text-ink-mute line-clamp-3">
                        {p.excerpt}
                      </p>
                      <div className="mt-auto pt-6 inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone group-hover:text-brand-deep transition-colors">
                        Read on
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.8}
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
