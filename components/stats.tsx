"use client";

import { m } from "framer-motion";
import { Counter } from "@/components/ui/counter";
import { stats } from "@/lib/data";

export function Stats() {
  return (
    <section aria-label="Firm at a glance" className="relative py-20 md:py-28 bg-paper-deep">
      <div className="container-edit">
        <div className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-10">
          <span className="h-px w-8 bg-ink/20" />
          § 09 — The record
        </div>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
          {stats.map((s, idx) => (
            <m.li
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={
                "relative " + (idx > 0 ? "lg:border-l lg:border-ink/15 lg:pl-8" : "")
              }
            >
              <Counter
                to={s.value}
                suffix={s.suffix}
                prefix={s.prefix}
                className="font-display text-[clamp(2.5rem,5.8vw,4.25rem)] leading-none tracking-[-0.03em] text-ink"
              />
              <div className="mt-4 font-medium text-[1rem] text-ink">{s.label}</div>
              <div className="mt-1 text-[0.85rem] text-ink-mute">{s.caption}</div>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
