"use client";

import { useEffect, useRef, useState } from "react";
import { m, useScroll, useSpring, useTransform } from "framer-motion";
import { processSteps } from "@/lib/data";
import { SectionHeader } from "@/components/ui/section-header";

export function Process() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });

  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  const lineScale = useTransform(lineProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative py-24 md:py-36 bg-ink text-paper overflow-hidden">
      {/* Subtle backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f6f3ec 1px, transparent 1px), linear-gradient(to bottom, #f6f3ec 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          maskImage:
            "radial-gradient(ellipse at top, black 40%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.25), rgba(72,168,219,0) 70%)",
        }}
      />

      <div className="container-edit relative">
        <SectionHeader
          section="§ 07 — Process"
          theme="dark"
          title={
            <>
              From first call to fully operational —{" "}
              <span className="text-brand">in forty-five days.</span>
            </>
          }
          lede="No mystery fees, no chasing for document lists. A senior consultant owns your file from start to finish, with a single written timeline you can share with your board."
        />

        <ol
          ref={timelineRef}
          className="mt-20 md:mt-28 relative max-w-4xl mx-auto"
        >
          {/* Rail — muted track */}
          <div
            aria-hidden
            className="absolute left-6 md:left-10 top-3 bottom-3 w-px bg-paper/15"
          />
          {/* Rail — animated progress fill (client-only to avoid hydration mismatch) */}
          {mounted && (
            <m.div
              aria-hidden
              style={{ scaleY: lineScale, originY: 0 }}
              className="absolute left-6 md:left-10 top-3 bottom-3 w-px bg-gradient-to-b from-brand via-brand to-brand-deep shadow-[0_0_18px_rgba(72,168,219,0.65)]"
            />
          )}

          {processSteps.map((step, idx) => (
            <m.li
              key={step.index}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative pl-16 md:pl-24 pb-14 last:pb-0"
            >
              {/* Dot cluster */}
              <div className="absolute left-0 top-1.5 flex h-12 w-12 md:h-[5rem] md:w-[5rem] items-center justify-center">
                {/* Outer ring — eases in */}
                <m.span
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.08 + 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute h-10 w-10 md:h-14 md:w-14 rounded-full border border-paper/15"
                />
                {/* Continuous pulse */}
                <m.span
                  aria-hidden
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{
                    scale: [0.6, 1.4, 0.6],
                    opacity: [0.55, 0, 0.55],
                  }}
                  viewport={{ once: false, margin: "-80px" }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.25,
                  }}
                  className="absolute h-4 w-4 rounded-full bg-brand/35"
                />
                {/* Core dot */}
                <m.span
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.08 + 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute h-3 w-3 rounded-full bg-brand ring-4 ring-ink shadow-[0_0_14px_rgba(72,168,219,0.7)]"
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-baseline md:gap-6 mb-4">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-brand">
                  Step {step.index}
                </span>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-paper/40">
                  {step.duration}
                </span>
              </div>
              <h3 className="font-display text-[1.8rem] md:text-[2.2rem] leading-[1.05] tracking-[-0.02em] text-paper">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xl text-[1rem] leading-relaxed text-paper/70 text-pretty">
                {step.summary}
              </p>
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
