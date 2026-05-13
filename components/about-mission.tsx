"use client";

import { m } from "framer-motion";
import { Compass, HeartHandshake, Target } from "lucide-react";

const pillars = [
  {
    eyebrow: "Mission",
    icon: Target,
    title: "Empower business builders.",
    body: "We exist to remove every operational friction between a founder's idea and a fully licensed, funded, staffed U.A.E. business, so the work that creates value can start sooner.",
    accent: "from-brand/15 via-brand/5 to-transparent",
  },
  {
    eyebrow: "Vision",
    icon: Compass,
    title: "The U.A.E.'s most trusted operating partner.",
    body: "Recognised by founders, banks, regulators and the F.T.A. as the team that gets the file right the first time, every time, across mainland, free zone and offshore.",
    accent: "from-brand-soft/25 via-brand/8 to-transparent",
  },
  {
    eyebrow: "Promise",
    icon: HeartHandshake,
    title: "One accountable team, for the next twelve years.",
    body: "We don't disappear after the licence is issued. We renew, we file, we open the next bank account, we stamp the next visa. The work that matters happens in the years after setup.",
    accent: "from-brand-deep/15 via-brand/8 to-transparent",
  },
];

export function AboutMission() {
  return (
    <section className="relative py-20 md:py-28 bg-paper overflow-hidden">
      {/* Soft brand pool */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.08), rgba(72,168,219,0) 70%)",
        }}
      />

      <div className="container-edit relative">
        {/* Section header */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4">
            <span className="h-px w-8 bg-ink/25" />§ Why we exist
          </div>
          <h2 className="font-display font-semibold text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.04] tracking-[-0.02em] text-ink text-balance">
            Mission, vision and the promise{" "}
            <span className="text-brand-deep">we hold ourselves to.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-ink-mute">
            Three constants that have shaped every decision Smart Creation
            Group has made since we opened our first floor at Damac Executive
            Heights in 2013.
          </p>
        </m.div>

        {/* Three-pillar grid */}
        <ul className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <m.li
                key={p.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.06 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <article className="group relative h-full rounded-3xl border border-ink/10 bg-paper p-7 md:p-8 overflow-hidden transition-all hover:border-brand/40 hover:shadow-[0_28px_70px_-30px_rgba(72,168,219,0.5)] hover:-translate-y-0.5">
                  {/* Top brand accent — animates on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-x-7 top-0 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                  />
                  {/* Diagonal soft fill */}
                  <span
                    aria-hidden
                    className={
                      "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 " +
                      p.accent
                    }
                  />
                  {/* Brand glow corner */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-20 -right-20 h-52 w-52 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(72,168,219,0.4), rgba(72,168,219,0) 70%)",
                    }}
                  />

                  <div className="relative flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-ink/10 bg-paper-soft text-brand-deep transition-all duration-500 group-hover:bg-brand group-hover:text-ink group-hover:border-brand group-hover:rotate-[-6deg] group-hover:scale-110">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
                      {String(i + 1).padStart(2, "0")} · {p.eyebrow}
                    </span>
                  </div>

                  <h3 className="relative mt-7 font-display font-semibold text-[1.2rem] md:text-[1.3rem] tracking-[-0.015em] text-ink leading-[1.18] text-balance">
                    {p.title}
                  </h3>
                  <p className="relative mt-4 text-[0.96rem] leading-relaxed text-ink-mute">
                    {p.body}
                  </p>

                  {/* Bottom thin brand line — hover only */}
                  <span
                    aria-hidden
                    className="relative mt-6 block h-[2px] w-12 origin-left scale-x-0 group-hover:scale-x-100 bg-brand transition-transform duration-700"
                  />
                </article>
              </m.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
