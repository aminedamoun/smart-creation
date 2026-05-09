"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Sparkles } from "lucide-react";

function CountUp({
  to,
  format = "plain",
  suffix = "",
  inView,
}: {
  to: number;
  format?: "plain" | "comma";
  suffix?: string;
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
  const [text, setText] = useState("0");

  useEffect(() => {
    if (inView) motionVal.set(to);
  }, [inView, to, motionVal]);

  useEffect(() => {
    const unsub = display.on("change", (v) => setText(v));
    return () => unsub();
  }, [display]);

  return (
    <span>
      {text}
      {suffix}
    </span>
  );
}

export function CentresHero({
  centresCount,
  officesCount,
}: {
  centresCount: number;
  officesCount: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let pendingX = 78;
    let pendingY = 28;

    const apply = () => {
      el.style.setProperty("--glow-x", `${pendingX}%`);
      el.style.setProperty("--glow-y", `${pendingY}%`);
      raf = 0;
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      pendingX = ((e.clientX - rect.left) / rect.width) * 100;
      pendingY = ((e.clientY - rect.top) / rect.height) * 100;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      pendingX = 78;
      pendingY = 28;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    apply();

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Word-form for the centre count.
  const count = centresCount || 6;
  const words = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];
  const word = words[count] ?? String(count);
  const headlineCount = `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

  return (
    <section
      ref={sectionRef}
      data-dark-hero
      className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24 bg-ink text-paper"
      style={
        {
          "--glow-x": "78%",
          "--glow-y": "28%",
        } as React.CSSProperties
      }
    >
      {/* Cursor-following ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(720px circle at var(--glow-x) var(--glow-y), rgba(72,168,219,0.25), transparent 60%)",
        }}
      />
      {/* Secondary soft pool */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.12), rgba(72,168,219,0) 70%)",
        }}
      />
      {/* Decorative grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f6f3ec 1px, transparent 1px), linear-gradient(to bottom, #f6f3ec 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at center, black 45%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 45%, transparent 80%)",
        }}
      />

      <div className="container-edit relative">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-mist mb-8"
        >
          <span className="h-px w-8 bg-paper/25" />
          <Link href="/" className="hover:text-paper transition-colors">
            Home
          </Link>
          <span className="text-paper/30">/</span>
          <span className="text-paper">Business Centres</span>
        </nav>

        <div className="grid grid-cols-12 gap-x-10 gap-y-12 items-center">
          {/* Left — copy */}
          <div className="col-span-12 lg:col-span-7">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/[0.04] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />§ Business Centres
            </div>
            <h1 className="font-display font-medium tracking-[-0.03em] leading-[0.98] text-[clamp(2.2rem,5.4vw,4.4rem)] text-paper text-balance">
              <span className="block">{headlineCount} centres</span>
              <span className="block">across Dubai —</span>
              <span className="block text-brand">pick where you work.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[1.02rem] md:text-[1.08rem] leading-relaxed text-paper/70 text-pretty">
              Every Smart Creation Group centre is owned, fully serviced and
              Ejari-ready — managed by the same team that handles your trade
              licence, bank account and visa. Click into a centre for the
              address, local advantages and live property availability.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mist">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 inline-flex animate-ping rounded-full bg-brand opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              {officesCount} live offices · refreshed daily
            </div>
          </div>

          {/* Right — operating snapshot card */}
          <div className="col-span-12 lg:col-start-9 lg:col-span-4">
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 30,
                scale: inView ? 1 : 0.97,
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Decorative offset frame */}
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-3xl border-2 border-brand/40"
                animate={{
                  x: [3, 5, 3],
                  y: [3, 5, 3],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Floating snapshot card */}
              <motion.div
                className="relative rounded-3xl border border-paper/15 bg-paper/[0.04] backdrop-blur-md p-6 md:p-7 shadow-[0_30px_80px_-30px_rgba(72,168,219,0.4)]"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Inner brand glow corner */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(72,168,219,0.32), rgba(72,168,219,0) 70%)",
                  }}
                />

                <div className="relative flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist">
                    <Sparkles className="h-3.5 w-3.5 text-brand" strokeWidth={2} />
                    Operating snapshot
                  </div>
                  <div className="inline-flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-mist">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                    </span>
                    Live
                  </div>
                </div>

                <ul className="relative space-y-4">
                  {/* Owned centres */}
                  <li className="border-b border-paper/10 pb-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-[1.7rem] tracking-[-0.025em] text-paper leading-none tabular-nums">
                        <CountUp to={centresCount} inView={inView} />
                      </span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist text-right">
                        Owned centres
                      </span>
                    </div>
                    <div className="mt-2 h-[2px] w-full rounded-full bg-paper/10 overflow-hidden">
                      <motion.span
                        aria-hidden
                        className="block h-full rounded-full bg-gradient-to-r from-brand via-brand-deep to-brand origin-left"
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 0.6 } : { scaleX: 0 }}
                        transition={{
                          duration: 1.1,
                          delay: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{ transformOrigin: "left" }}
                      />
                    </div>
                  </li>

                  {/* Live offices */}
                  <li className="border-b border-paper/10 pb-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-[1.7rem] tracking-[-0.025em] text-paper leading-none tabular-nums">
                        <CountUp
                          to={officesCount}
                          format="comma"
                          inView={inView}
                        />
                      </span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist text-right">
                        Live offices
                      </span>
                    </div>
                    <div className="mt-2 h-[2px] w-full rounded-full bg-paper/10 overflow-hidden">
                      <motion.span
                        aria-hidden
                        className="block h-full rounded-full bg-gradient-to-r from-brand via-brand-deep to-brand origin-left"
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 0.92 } : { scaleX: 0 }}
                        transition={{
                          duration: 1.2,
                          delay: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{ transformOrigin: "left" }}
                      />
                    </div>
                  </li>

                  {/* Move-in ready */}
                  <li>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-[1.7rem] tracking-[-0.025em] text-paper leading-none tabular-nums">
                        <CountUp to={24} suffix="h" inView={inView} />
                      </span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist text-right">
                        Move-in ready
                      </span>
                    </div>
                    <div className="mt-2 h-[2px] w-full rounded-full bg-paper/10 overflow-hidden">
                      <motion.span
                        aria-hidden
                        className="block h-full rounded-full bg-gradient-to-r from-brand via-brand-deep to-brand origin-left"
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 0.78 } : { scaleX: 0 }}
                        transition={{
                          duration: 1.2,
                          delay: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{ transformOrigin: "left" }}
                      />
                    </div>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
