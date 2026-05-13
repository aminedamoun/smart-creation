"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import {
  Building2,
  Compass,
  Globe2,
  Landmark,
  Rocket,
  Sparkles,
  Trophy,
} from "lucide-react";

type Milestone = {
  year: string;
  title: string;
  body: string;
  tag: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const milestones: Milestone[] = [
  {
    year: "2013",
    title: "One floor. One promise.",
    body: "Smart Creation Business Center is founded at Damac Executive Heights, Tecom. Asad Hashmi's bet that founders deserve one accountable team for every part of setting up in the U.A.E.",
    tag: "Founded · Tecom, Dubai",
    icon: Rocket,
  },
  {
    year: "2015",
    title: "The first thousand.",
    body: "Banking introductions, PRO and visa services scale alongside formation. We pass our first thousand U.A.E. companies launched, across mainland and free-zone jurisdictions.",
    tag: "1,000+ companies launched",
    icon: Compass,
  },
  {
    year: "2017",
    title: "Smart Place opens in Al Barsha.",
    body: "A second owned centre opens at Iridium Building, Umm Suqeim Street: flexible furnished offices for entrepreneurs and growing teams in Al Barsha.",
    tag: "2nd owned centre · Al Barsha 1",
    icon: Building2,
  },
  {
    year: "2019",
    title: "Smart View in Bur Dubai.",
    body: "We expand into Bur Dubai with serviced offices designed for credible daily operations: local sponsorship, corporate structuring, and finance & tax under one roof.",
    tag: "3rd owned centre · Bur Dubai",
    icon: Building2,
  },
  {
    year: "2021",
    title: "The Group goes international.",
    body: "Intercity Bus Service launches in London, Ontario. MM Contractor begins infrastructure works in Pakistan. The same accountable team, now across three countries.",
    tag: "🇦🇪 · 🇨🇦 · 🇵🇰",
    icon: Globe2,
  },
  {
    year: "2022",
    title: "Future Space in Al Muraqabat.",
    body: "Premium serviced offices, flexi desks and virtual offices open at Salah Al Din Street: our fourth owned centre and a full operational footprint across central Dubai.",
    tag: "4th owned centre · Deira",
    icon: Landmark,
  },
  {
    year: "2024",
    title: "Compliance, properly.",
    body: "AML, ESR, UBO and Corporate Tax frameworks rolled out across the client base. Three regulators, three deadlines, one calendar. No missed filings.",
    tag: "Compliance & tax frameworks",
    icon: Sparkles,
  },
  {
    year: "2026",
    title: "Six centres. Ten companies. One Group.",
    body: "Smart Creation Group of Companies: six owned Dubai centres, ten sister companies across the U.A.E., Canada and Pakistan, and 10,000+ businesses launched on the ground.",
    tag: "Today · 25 people on staff",
    icon: Trophy,
  },
];

export function AboutJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 80%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-paper-soft border-y border-ink/8 overflow-hidden"
    >
      {/* Soft brand pool */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-[-10%] h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.07), rgba(72,168,219,0) 70%)",
        }}
      />

      <div className="container-edit relative">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4">
            <span className="h-px w-8 bg-ink/25" />§ The journey
          </div>
          <h2 className="font-display font-semibold text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.04] tracking-[-0.02em] text-ink text-balance">
            From one floor in 2013,{" "}
            <span className="text-brand-deep">
              to a Group of ten, today.
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-ink-mute">
            Twelve years of compounding work: every centre we own, every
            renewal we file, every company we launch sits on the same operating
            promise we made on day one.
          </p>
        </m.div>

        {/* Timeline */}
        <div className="relative mt-14 md:mt-20">
          {/* Track — soft background line */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-5 md:left-1/2 top-0 bottom-0 w-px -translate-x-px bg-ink/10"
          />
          {/* Progress — fills as you scroll */}
          <m.div
            aria-hidden
            style={{ height: lineHeight }}
            className="pointer-events-none absolute left-5 md:left-1/2 top-0 w-px -translate-x-px bg-gradient-to-b from-brand via-brand-deep to-brand origin-top"
          />

          <ol className="relative space-y-12 md:space-y-16">
            {milestones.map((milestone, i) => {
              const Icon = milestone.icon;
              const isRight = i % 2 === 0;
              return (
                <m.li
                  key={milestone.year}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.04 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative md:grid md:grid-cols-2 md:gap-10 items-start"
                >
                  {isRight ? <div className="hidden md:block" /> : null}

                  {/* Node */}
                  <m.span
                    aria-hidden
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.5,
                      delay: 0.04 * i + 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute left-5 md:left-1/2 top-1.5 -translate-x-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-paper shadow-[0_8px_24px_-12px_rgba(13,16,19,0.35)]"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-brand/15 animate-pulse"
                    />
                    <Icon
                      className="relative h-4 w-4 text-brand-deep"
                      strokeWidth={1.8}
                    />
                  </m.span>

                  {/* Card */}
                  <article
                    className={
                      "relative ml-16 md:ml-0 group rounded-3xl border border-ink/10 bg-paper p-6 md:p-7 transition-all duration-500 hover:border-brand/40 hover:shadow-[0_22px_60px_-30px_rgba(72,168,219,0.45)] hover:-translate-y-0.5 " +
                      (isRight ? "md:col-start-2" : "md:col-start-1")
                    }
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
                          "radial-gradient(closest-side, rgba(72,168,219,0.3), rgba(72,168,219,0) 70%)",
                      }}
                    />

                    <div className="flex items-baseline gap-3">
                      <span className="font-display font-semibold text-[1.7rem] md:text-[1.9rem] leading-none tracking-[-0.03em] text-brand-deep">
                        {milestone.year}
                      </span>
                      <span className="h-px flex-1 bg-ink/10" />
                    </div>

                    <h3 className="mt-3 font-display font-semibold text-[1.18rem] md:text-[1.28rem] leading-[1.18] tracking-[-0.015em] text-ink">
                      {milestone.title}
                    </h3>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-mute">
                      {milestone.body}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper-soft px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-stone">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      {milestone.tag}
                    </div>
                  </article>
                </m.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
