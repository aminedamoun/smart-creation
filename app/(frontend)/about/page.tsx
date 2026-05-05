import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Globe2,
  HeartHandshake,
  Quote,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { BRAND, team } from "@/lib/data";
import { AboutHero } from "@/components/about-hero";
import { AboutTeamGrid } from "@/components/about-team-grid";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About Smart Creation Group",
  description:
    "Twelve years setting up businesses across the U.A.E. — six Dubai centres, four jurisdictions, one accountable team. Meet the people behind every licence, bank account and visa we process.",
  alternates: { canonical: "/about" },
};

const stats = [
  { value: "12+", label: "Years on the ground", meta: "Founded 2013" },
  { value: "10,000+", label: "Companies launched", meta: "Across every emirate" },
  { value: "6", label: "Owned Dubai centres", meta: "Tecom · Al Barsha · Bur Dubai · Deira" },
  { value: "9", label: "Group companies", meta: "U.A.E · Canada · Pakistan" },
];

const values = [
  {
    title: "One accountable owner",
    body: "The same person who answers your first email gets your trade licence, opens your bank account, and stamps your visa. No agency hand-offs.",
    icon: HeartHandshake,
  },
  {
    title: "Plain-English advice",
    body: "Mainland or free zone, QFZP exposure, banking acceptance — every variable mapped to your activity in one written brief. We say what we'd do, not what makes the bigger fee.",
    icon: Sparkles,
  },
  {
    title: "Owned infrastructure",
    body: "Six business centres we own and operate — Tecom, Al Barsha, Bur Dubai, Al Muraqabat, Smart Founders, and Naif. Walk-in tours, floors we control, no broker layer.",
    icon: Building2,
  },
  {
    title: "Built to renew, not just open",
    body: "Twelve years means we've seen the renewal cycle, the audit cycle, the corporate-tax cycle. We don't disappear after the licence — we file every year.",
    icon: ShieldCheck,
  },
];

const ceoBio = [
  "Asad Hashmi founded Smart Creation Business Center in 2013 with a single floor at Damac Executive Heights and a clear thesis — every founder coming to Dubai deserves one accountable team for everything that touches their business, not a chain of brokers.",
  "Twelve years on, that team handles company formation, banking introductions, visas, accounting, audit, Corporate Tax and the day-to-day PRO work for 10,000+ businesses across every U.A.E. jurisdiction. The Group has expanded into real estate, technology, hospitality, transport and contracting across the U.A.E., Canada and Pakistan — but the original promise hasn't changed.",
  "He is regularly consulted on business-formation strategy by founders, family offices and multinationals, and continues to lead the Group from Tecom.",
];

export default function AboutPage() {
  const ceo = team.find((m) => m.name === "Asad Hashmi");

  return (
    <>
      <AboutHero />

      {/* Story */}
      <section className="py-20 md:py-28 bg-paper">
        <div className="container-edit">
          <div className="grid grid-cols-12 gap-x-10 gap-y-10">
            <Reveal variant="slideRight" className="col-span-12 lg:col-span-5">
              <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4">
                <span className="h-px w-8 bg-ink/25" />§ Our story
              </div>
              <h2 className="font-display font-semibold text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] tracking-[-0.02em] text-ink text-balance">
                One floor in 2013.{" "}
                <span className="text-brand-deep">A nine-company group today.</span>
              </h2>
            </Reveal>
            <StaggerGroup className="col-span-12 lg:col-span-7 space-y-6 max-w-[60ch]">
              <StaggerItem>
                <p className="text-[1.04rem] leading-relaxed text-ink">
                  {BRAND.mission.split(". ").slice(0, 2).join(". ")}.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="text-[1.02rem] leading-relaxed text-ink-mute">
                  {BRAND.vision}
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="text-[1.02rem] leading-relaxed text-ink-mute">
                  We started with one floor at Damac Executive Heights — and a
                  belief that founders coming to the U.A.E. deserved one team
                  accountable for everything that touches their business. Twelve
                  years on, that team has grown to ~25 people across business
                  setup, banking, finance, audit, PRO, and operations — handling
                  10,000+ companies across every emirate.
                </p>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-paper-soft border-y border-ink/8">
        <div className="container-edit">
          <Reveal>
            <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4">
              <span className="h-px w-8 bg-ink/25" />§ How we work
            </div>
            <h2 className="font-display font-semibold text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] tracking-[-0.02em] text-ink text-balance max-w-3xl">
              Four habits we don't compromise on —{" "}
              <span className="text-brand-deep">and our clients feel them daily.</span>
            </h2>
          </Reveal>

          <StaggerGroup as="ul" staggerChildren={0.1} className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <StaggerItem
                  as="li"
                  key={v.title}
                  className="group relative rounded-3xl border border-ink/10 bg-paper p-6 md:p-7 transition-all hover:border-brand/40 hover:shadow-[0_22px_60px_-30px_rgba(72,168,219,0.45)] hover:-translate-y-0.5 overflow-hidden"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-7 top-0 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(72,168,219,0.35), rgba(72,168,219,0) 70%)",
                    }}
                  />
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-ink/10 bg-paper-soft text-brand-deep transition-all duration-500 group-hover:bg-brand group-hover:text-ink group-hover:border-brand group-hover:rotate-[-6deg] group-hover:scale-110">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <div className="relative mt-5 font-display font-semibold text-[1.1rem] tracking-[-0.015em] text-ink leading-[1.2]">
                    {v.title}
                  </div>
                  <p className="relative mt-3 text-[0.93rem] leading-relaxed text-ink-mute">
                    {v.body}
                  </p>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

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
          <AboutTeamGrid />
        </div>
      </section>

      {/* Where we operate */}
      <section className="py-20 md:py-28 bg-paper border-t border-ink/8">
        <div className="container-edit">
          <div className="grid grid-cols-12 gap-x-10 gap-y-10 items-center">
            <Reveal variant="slideRight" className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4">
                <span className="h-px w-8 bg-ink/25" />§ Where we operate
              </div>
              <h2 className="font-display font-semibold text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] tracking-[-0.02em] text-ink text-balance">
                Three countries,{" "}
                <span className="text-brand-deep">one Group.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-ink-mute">
                Smart Creation Group of Companies — six owned business centres
                across Dubai, plus group companies serving real estate,
                technology, hospitality, transport and contracting across the
                U.A.E., Canada and Pakistan. The same accountable team handles
                your file, regardless of where you start.
              </p>
              <Link
                href="/#group"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.92rem] font-medium text-paper hover:bg-brand-deep transition-colors"
              >
                Meet the nine companies
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </Link>
            </Reveal>
            <StaggerGroup as="ul" className="col-span-12 lg:col-span-5 grid grid-cols-1 gap-3" staggerChildren={0.1}>
              {[
                { country: "🇦🇪 U.A.E.", what: "6 business centres · company formation · banking · finance · PRO · real estate · technology · hospitality" },
                { country: "🇨🇦 Canada", what: "Intercity Bus Service — scheduled routes & charters, London, Ontario" },
                { country: "🇵🇰 Pakistan", what: "MM Contractor & General Order Supplies — infrastructure & civil works" },
              ].map((row) => (
                <StaggerItem
                  as="li"
                  key={row.country}
                  className="group flex items-start gap-4 rounded-2xl border border-ink/10 bg-paper p-5 transition-all hover:border-brand/40 hover:shadow-[0_18px_50px_-30px_rgba(72,168,219,0.45)] hover:-translate-y-0.5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink/10 bg-paper-soft text-brand-deep transition-all duration-500 group-hover:bg-brand group-hover:text-ink group-hover:border-brand group-hover:rotate-[-6deg]">
                    <Globe2 className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <div>
                    <div className="font-display text-[1.05rem] tracking-[-0.015em] text-ink">
                      {row.country}
                    </div>
                    <div className="mt-1 text-[0.9rem] leading-relaxed text-ink-mute">
                      {row.what}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

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
