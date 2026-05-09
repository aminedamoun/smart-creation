import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Quote, Sparkles } from "lucide-react";
import { team } from "@/lib/data";
import { getTeam } from "@/lib/team";
import { AboutHero } from "@/components/about-hero";
import { AboutStats } from "@/components/about-stats";
import { AboutMission } from "@/components/about-mission";
import { AboutJourney } from "@/components/about-journey";
import { AboutDifferentiators } from "@/components/about-differentiators";
import { AboutPresence } from "@/components/about-presence";
import { AboutTeamGrid } from "@/components/about-team-grid";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Smart Creation Group",
  description:
    "Twelve years setting up businesses across the U.A.E. — six Dubai centres, four jurisdictions, one accountable team. Meet the people behind every licence, bank account and visa we process.",
  alternates: { canonical: "/about" },
};

const ceoBio = [
  "Asad Hashmi founded Smart Creation Business Center in 2013 with a single floor at Damac Executive Heights and a clear thesis — every founder coming to Dubai deserves one accountable team for everything that touches their business, not a chain of brokers.",
  "Twelve years on, that team handles company formation, banking introductions, visas, accounting, audit, Corporate Tax and the day-to-day PRO work for 10,000+ businesses across every U.A.E. jurisdiction. The Group has expanded into real estate, technology, hospitality, transport and contracting across the U.A.E., Canada and Pakistan — but the original promise hasn't changed.",
  "He is regularly consulted on business-formation strategy by founders, family offices and multinationals, and continues to lead the Group from Tecom.",
];

export default async function AboutPage() {
  const ceo = team.find((m) => m.name === "Asad Hashmi");
  const members = await getTeam();

  return (
    <>
      <AboutHero />
      <AboutStats />

      {/* Mission · Vision · Promise */}
      <AboutMission />

      {/* Twelve-year scroll-driven journey */}
      <AboutJourney />

      {/* Six differentiators */}
      <AboutDifferentiators />

      {/* CEO spotlight */}
      <section className="py-20 md:py-28 bg-paper">
        <div className="container-edit">
          <div className="grid grid-cols-12 gap-x-10 gap-y-10 items-center">
            <Reveal variant="slideRight" className="col-span-12 lg:col-span-5">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border-2 border-brand/40"
                />
                <div className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-ink/10 shadow-[0_30px_80px_-30px_rgba(13,16,19,0.35)]">
                  {ceo?.photo && (
                    <Image
                      src={ceo.photo}
                      alt={ceo.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  )}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(72,168,219,0.4), rgba(72,168,219,0) 70%)",
                    }}
                  />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-paper/30 bg-ink/55 backdrop-blur-md px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-paper">
                    <Sparkles className="h-3.5 w-3.5 text-brand" strokeWidth={2} />
                    Founder & CEO
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="col-span-12 lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4">
                  <span className="h-px w-8 bg-ink/25" />§ The Founder
                </div>
                <h2 className="font-display font-semibold text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.05] tracking-[-0.02em] text-ink text-balance">
                  Asad Hashmi —{" "}
                  <span className="text-brand-deep">CEO, Smart Creation Group.</span>
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="relative mt-8 rounded-3xl border border-brand/30 bg-gradient-to-br from-paper-soft to-paper p-6 md:p-7 shadow-[0_18px_50px_-30px_rgba(72,168,219,0.45)]">
                  <Quote className="absolute left-5 top-5 h-5 w-5 text-brand-deep" strokeWidth={2} />
                  <div className="pl-10 font-display text-[1.08rem] leading-[1.5] tracking-[-0.005em] text-ink">
                    &ldquo;Every founder coming to the U.A.E. deserves one
                    accountable team — not a chain of brokers. We've held that
                    rule since day one. It's the reason we still file every
                    renewal, twelve years later.&rdquo;
                  </div>
                </div>
              </Reveal>

              <StaggerGroup className="mt-8 space-y-5 max-w-[60ch]">
                {ceoBio.map((p, i) => (
                  <StaggerItem key={i}>
                    <p
                      className={
                        i === 0
                          ? "text-[1.02rem] leading-relaxed text-ink"
                          : "text-[0.98rem] leading-relaxed text-ink-mute"
                      }
                    >
                      {p}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
          </div>
        </div>
      </section>

      {/* Team grid (animated client component) */}
      <section className="py-20 md:py-28 bg-paper-soft border-t border-ink/8">
        <div className="container-edit">
          <AboutTeamGrid members={members} />
        </div>
      </section>

      {/* Where we operate — three countries, one Group */}
      <AboutPresence />

      {/* CTA */}
      <section className="py-20 md:py-28 bg-ink text-paper border-t border-paper/10">
        <div className="container-edit">
          <div className="grid grid-cols-12 gap-x-10 gap-y-10 items-center">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-mist mb-4">
                <span className="h-px w-8 bg-mist/40" />§ Work with us
              </div>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-paper text-balance max-w-3xl">
                Tell us the business.{" "}
                <span className="text-brand-soft">
                  We'll come back with licence, bank, visa.
                </span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-paper/75">
                One brief in, one written plan out within a business day. Free
                30-minute consultation. No sales script.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:text-right">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink hover:bg-paper transition-colors"
              >
                Book a consultation
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
