"use client";

import { useEffect, useRef, useState } from "react";
import {
  m,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Building2,
  CalendarDays,
  Globe2,
  Sparkles,
} from "lucide-react";

type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  meta: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /** 0..1 — drives the brand bar fill */
  bar: number;
  /** Decimal formatting separator group */
  format?: "plain" | "comma";
};

const stats: Stat[] = [
  {
    value: 12,
    suffix: "+",
    label: "Years on the ground",
    meta: "Founded 2013",
    icon: CalendarDays,
    bar: 0.6,
  },
  {
    value: 10000,
    suffix: "+",
    label: "Companies launched",
    meta: "Across every emirate",
    icon: Sparkles,
    bar: 1,
    format: "comma",
  },
  {
    value: 6,
    label: "Owned Dubai centres",
    meta: "Tecom · Al Barsha · Bur Dubai · Deira",
    icon: Building2,
    bar: 0.5,
  },
  {
    value: 10,
    label: "Group companies",
    meta: "U.A.E · Canada · Pakistan",
    icon: Globe2,
    bar: 0.7,
  },
];

function CountUp({
  to,
  format = "plain",
  duration = 1.6,
  inView,
}: {
  to: number;
  format?: "plain" | "comma";
  duration?: number;
  inView: boolean;
}) {
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, {
    stiffness: 60,
    damping: 18,
    mass: 0.8,
  });
  const display = useTransform(spring, (latest) => {
    const v = Math.round(latest);
    return format === "comma" ? v.toLocaleString("en-US") : String(v);
  });

  const [text, setText] = useState(format === "comma" ? "0" : "0");

  useEffect(() => {
    if (inView) {
      motionVal.set(to);
    }
  }, [inView, to, motionVal]);

  useEffect(() => {
    const unsub = display.on("change", (v) => setText(v));
    return () => unsub();
  }, [display]);

  // duration is informational — spring controls timing.
  void duration;

  return <span>{text}</span>;
}

export function AboutStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-paper text-ink border-t border-ink/10 overflow-hidden">
      {/* Soft brand pool */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.07), rgba(72,168,219,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-[-8%] h-[360px] w-[360px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.06), rgba(72,168,219,0) 70%)",
        }}
      />

      <div ref={ref} className="container-edit relative">
        {/* Eyebrow */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone pt-12 md:pt-14"
        >
          <span className="h-px w-8 bg-ink/25" />§ By the numbers
        </m.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-x-2 pt-8 pb-14 md:pb-16">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <m.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                animate={
                  inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
                }
                transition={{
                  duration: 0.7,
                  delay: 0.08 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  "group relative px-1 md:px-6 " +
                  (i > 0 ? "md:border-l md:border-ink/12" : "")
                }
              >
                {/* Hover brand glow */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(72,168,219,0.28), rgba(72,168,219,0) 70%)",
                  }}
                />

                {/* Icon row */}
                <div className="relative flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-ink/10 bg-paper-soft text-brand-deep transition-all duration-500 group-hover:bg-brand group-hover:text-ink group-hover:border-brand group-hover:rotate-[-6deg] group-hover:scale-110">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Counter */}
                <div className="relative mt-5 font-display font-semibold text-[2rem] md:text-[2.45rem] leading-[1] tracking-[-0.03em] text-ink tabular-nums">
                  {s.prefix}
                  <CountUp
                    to={s.value}
                    format={s.format}
                    inView={inView}
                  />
                  {s.suffix}
                </div>

                {/* Brand bar */}
                <div className="relative mt-4 h-[3px] w-full rounded-full bg-ink/8 overflow-hidden">
                  <m.span
                    aria-hidden
                    className="block h-full rounded-full bg-gradient-to-r from-brand via-brand-deep to-brand origin-left"
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: s.bar } : { scaleX: 0 }}
                    transition={{
                      duration: 1.1,
                      delay: 0.08 * i + 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ transformOrigin: "left" }}
                  />
                </div>

                <div className="relative mt-4 text-[0.95rem] leading-snug text-ink">
                  {s.label}
                </div>
                <div className="relative mt-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-stone">
                  {s.meta}
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
