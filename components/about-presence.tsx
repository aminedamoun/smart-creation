"use client";

import Link from "next/link";
import { m } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Bus,
  HardHat,
  HeartHandshake,
  Landmark,
  Laptop,
  Sparkles,
} from "lucide-react";

type Country = {
  flag: string;
  name: string;
  region: string;
  headline: string;
  body: string;
  metric: string;
  metricLabel: string;
  pillars: {
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    label: string;
  }[];
};

const countries: Country[] = [
  {
    flag: "🇦🇪",
    name: "United Arab Emirates",
    region: "Headquarters · Dubai",
    headline: "Six owned centres. The whole back office.",
    body: "Tecom, Al Barsha, Bur Dubai, Al Muraqabat, Smart Founders, Naif. Company formation, banking, accounting, audit, Corporate Tax, PRO, real estate and technology — every line under one accountable team.",
    metric: "10,000+",
    metricLabel: "Files launched · since 2013",
    pillars: [
      { icon: Building2, label: "Centres" },
      { icon: HeartHandshake, label: "Setup & PRO" },
      { icon: Sparkles, label: "Tax & audit" },
      { icon: Landmark, label: "Real estate" },
      { icon: Laptop, label: "Technology" },
    ],
  },
  {
    flag: "🇨🇦",
    name: "Canada",
    region: "London, Ontario",
    headline: "Intercity Bus Service.",
    body: "Scheduled intercity routes and private charters operating out of London, Ontario. Same standard of operations, same family of companies — built for daily reliability.",
    metric: "2021",
    metricLabel: "Operating since",
    pillars: [{ icon: Bus, label: "Transport & charters" }],
  },
  {
    flag: "🇵🇰",
    name: "Pakistan",
    region: "Punjab",
    headline: "MM Contractor & General Order Supplies.",
    body: "Civil works, infrastructure and general supplies through MM Contractor and the Group's order-supply arm — the contracting backbone of the Group's regional projects.",
    metric: "2021",
    metricLabel: "Operating since",
    pillars: [{ icon: HardHat, label: "Civil & infrastructure" }],
  },
];

export function AboutPresence() {
  return (
    <section className="relative py-20 md:py-28 bg-paper border-t border-ink/8 overflow-hidden">
      {/* Soft brand pool */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-40 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.07), rgba(72,168,219,0) 70%)",
        }}
      />

      <div className="container-edit relative">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-10 gap-y-8 items-end">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-8"
          >
            <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4">
              <span className="h-px w-8 bg-ink/25" />§ Where we operate
            </div>
            <h2 className="font-display font-semibold text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.04] tracking-[-0.02em] text-ink text-balance">
              Three countries,{" "}
              <span className="text-brand-deep">one operating standard.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-ink-mute">
              The Group is anchored in Dubai with operating arms in Canada and
              Pakistan. Same family, same standards — every company we own ships
              the work it promises.
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-4 lg:text-right"
          >
            <Link
              href="/#group"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-night px-5 py-3 text-[0.92rem] font-medium text-paper hover:bg-brand hover:text-ink transition-colors"
            >
              Meet the ten companies
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </Link>
          </m.div>
        </div>

        {/* Country rows */}
        <ul className="mt-14 md:mt-16 space-y-5">
          {countries.map((c, i) => (
            <m.li
              key={c.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: 0.06 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <article className="group relative rounded-3xl border border-ink/10 bg-paper p-6 md:p-8 overflow-hidden transition-all hover:border-brand/40 hover:shadow-[0_24px_70px_-30px_rgba(72,168,219,0.45)] hover:-translate-y-0.5">
                {/* Top brand accent */}
                <span
                  aria-hidden
                  className="absolute inset-x-7 top-0 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                />
                {/* Brand glow corner */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(72,168,219,0.32), rgba(72,168,219,0) 70%)",
                  }}
                />

                <div className="relative grid grid-cols-12 gap-x-8 gap-y-6 items-start">
                  {/* Country block */}
                  <div className="col-span-12 lg:col-span-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[1.6rem] leading-none">{c.flag}</span>
                      <div>
                        <div className="font-display font-semibold text-[1.18rem] leading-tight tracking-[-0.015em] text-ink">
                          {c.name}
                        </div>
                        <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-stone">
                          {c.region}
                        </div>
                      </div>
                    </div>

                    {/* Metric */}
                    <div className="mt-6 inline-flex items-baseline gap-3 rounded-2xl border border-ink/10 bg-paper-soft px-4 py-3">
                      <span className="font-display font-semibold text-[1.45rem] tracking-[-0.02em] text-brand-deep leading-none">
                        {c.metric}
                      </span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-stone leading-tight">
                        {c.metricLabel}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="col-span-12 lg:col-span-5">
                    <h3 className="font-display font-semibold text-[1.16rem] tracking-[-0.015em] text-ink leading-[1.2]">
                      {c.headline}
                    </h3>
                    <p className="mt-3 text-[0.96rem] leading-relaxed text-ink-mute">
                      {c.body}
                    </p>
                  </div>

                  {/* Pillars */}
                  <div className="col-span-12 lg:col-span-3">
                    <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone mb-3">
                      Operating arms
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {c.pillars.map((p) => {
                        const Icon = p.icon;
                        return (
                          <li
                            key={p.label}
                            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper-soft px-3 py-1.5 text-[0.78rem] text-ink"
                          >
                            <Icon
                              className="h-3.5 w-3.5 text-brand-deep"
                              strokeWidth={1.8}
                            />
                            {p.label}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </article>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
