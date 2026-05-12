"use client";

import Link from "next/link";
import { m } from "framer-motion";
import {
  ArrowUpRight,
  Banknote,
  Building2,
  Calendar,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type Diff = {
  title: string;
  body: string;
  metric: string;
  metricLabel: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const items: Diff[] = [
  {
    title: "One accountable owner",
    body: "The same person who answers your first email gets your trade licence, opens your bank account and stamps your visa. No agency hand-offs, no chain of brokers.",
    metric: "1",
    metricLabel: "owner per file",
    icon: HeartHandshake,
  },
  {
    title: "Plain-English, fee-blind advice",
    body: "Mainland or free zone, QFZP exposure, banking acceptance — every variable mapped to your activity in one written brief. We say what we'd do, not what makes the bigger fee.",
    metric: "1 day",
    metricLabel: "brief → costed plan",
    icon: Sparkles,
  },
  {
    title: "Owned infrastructure",
    body: "Six business centres we own and operate — Tecom, Al Barsha, Bur Dubai, Al Muraqabat, Smart Founders and Naif. Walk-in tours, floors we control, no broker layer.",
    metric: "6",
    metricLabel: "owned Dubai centres",
    icon: Building2,
  },
  {
    title: "Banking introductions that land",
    body: "Pre-screened with the bank, walked into the meeting prepared, daily follow-up until the account is live. We file what the relationship manager needs before they ask.",
    metric: "10+",
    metricLabel: "U.A.E. banking partners",
    icon: Banknote,
  },
  {
    title: "Built to renew, not just open",
    body: "Twelve years means we've seen the renewal cycle, the audit cycle, the corporate-tax cycle. We don't disappear after the licence — we file every year, on the calendar.",
    metric: "100%",
    metricLabel: "renewals before expiry",
    icon: Calendar,
  },
  {
    title: "Compliance, properly",
    body: "AML, ESR, UBO, Corporate Tax, VAT, e-invoicing. Three regulators, three deadlines, one calendar — no missed filings, no fines, no fires.",
    metric: "0",
    metricLabel: "missed filings · 12 yrs",
    icon: ShieldCheck,
  },
];

export function AboutDifferentiators() {
  return (
    <section className="relative py-20 md:py-28 bg-paper border-y border-ink/8 overflow-hidden">
      {/* Soft brand pool */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.08), rgba(72,168,219,0) 70%)",
        }}
      />

      <div className="container-edit relative">
        <div className="grid grid-cols-12 gap-x-10 gap-y-8 items-end">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-8"
          >
            <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4">
              <span className="h-px w-8 bg-ink/25" />§ Why founders choose us
            </div>
            <h2 className="font-display font-semibold text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.04] tracking-[-0.02em] text-ink text-balance">
              Six habits we don't compromise on —{" "}
              <span className="text-brand-deep">
                and our clients feel them daily.
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-ink-mute">
              The reasons 10,000+ founders, family offices and multinationals
              have trusted us with the operational backbone of their U.A.E.
              business since 2013.
            </p>
          </m.div>
        </div>

        <ul className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <m.li
                key={it.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.65,
                  delay: 0.05 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <article className="group relative h-full rounded-3xl border border-ink/10 bg-paper p-7 md:p-8 overflow-hidden transition-all hover:border-brand/45 hover:shadow-[0_24px_60px_-30px_rgba(72,168,219,0.5)] hover:-translate-y-0.5">
                  {/* Top brand accent */}
                  <span
                    aria-hidden
                    className="absolute inset-x-7 top-0 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                  />
                  {/* Brand glow corner */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-20 -right-20 h-52 w-52 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(72,168,219,0.32), rgba(72,168,219,0) 70%)",
                    }}
                  />

                  {/* Icon + index */}
                  <div className="relative flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-ink/10 bg-paper-soft text-brand-deep transition-all duration-500 group-hover:bg-brand group-hover:text-ink group-hover:border-brand group-hover:rotate-[-6deg] group-hover:scale-110">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="relative mt-7 font-display font-semibold text-[1.16rem] md:text-[1.22rem] tracking-[-0.015em] text-ink leading-[1.2]">
                    {it.title}
                  </h3>
                  <p className="relative mt-3 text-[0.94rem] leading-relaxed text-ink-mute">
                    {it.body}
                  </p>

                  {/* Metric strip */}
                  <div className="relative mt-6 pt-5 border-t border-ink/10 flex items-baseline gap-3">
                    <span className="font-display font-semibold text-[1.45rem] tracking-[-0.02em] text-brand-deep leading-none">
                      {it.metric}
                    </span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-stone leading-tight">
                      {it.metricLabel}
                    </span>
                  </div>
                </article>
              </m.li>
            );
          })}
        </ul>

        {/* Centres CTA — walk-in-ready inventory across Dubai */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 md:mt-14"
        >
          <div className="group relative overflow-hidden rounded-3xl border border-ink/10 bg-paper p-6 md:p-8 transition-all hover:border-brand/40 hover:shadow-[0_24px_70px_-30px_rgba(72,168,219,0.45)]">
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(72,168,219,0.32), rgba(72,168,219,0) 70%)",
              }}
            />

            <div className="relative grid grid-cols-12 gap-x-8 gap-y-6 items-center">
              <div className="col-span-12 lg:col-span-8">
                <div className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-ink/10 bg-paper-soft text-brand-deep">
                    <Building2 className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  Walk-in-ready · live availability
                </div>
                <h3 className="font-display font-semibold text-[1.3rem] md:text-[1.55rem] leading-[1.2] tracking-[-0.02em] text-ink text-balance">
                  Want to see the centres themselves?{" "}
                  <span className="text-brand-deep">
                    Six owned floors across Dubai — every room, every price, live.
                  </span>
                </h3>
              </div>

              <div className="col-span-12 lg:col-span-4 lg:text-right">
                <Link
                  href="/business-centers"
                  className="group/btn inline-flex items-center gap-2 rounded-full bg-brand-night px-5 py-3 text-[0.92rem] font-medium text-paper hover:bg-brand hover:text-ink transition-colors"
                >
                  Browse business centres
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </Link>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
