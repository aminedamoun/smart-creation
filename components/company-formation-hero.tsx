"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { m } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Globe2,
  Network,
  ShieldCheck,
} from "lucide-react";

type Pillar = {
  id: string;
  index: string;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const pillars: Pillar[] = [
  { id: "mainland", index: "01", label: "Mainland", desc: "Trade anywhere onshore", icon: Building2 },
  { id: "free-zone", index: "02", label: "Free zone", desc: "100% foreign ownership", icon: Globe2 },
  { id: "offshore", index: "03", label: "Offshore", desc: "Hold assets, IP, shares", icon: ShieldCheck },
  { id: "holding", index: "04", label: "Holding", desc: "Group & subsidiary structure", icon: Network },
];

const trust = [
  { value: "10,000+", label: "Companies launched", meta: "Across every emirate" },
  { value: "12+", label: "Years in U.A.E.", meta: "Founded 2013" },
  { value: "All zones", label: "UAE jurisdictions", meta: "Mainland · Free zone · Offshore" },
  { value: "1 day", label: "Plan turnaround", meta: "After your consultation" },
];

export function CompanyFormationHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let pendingX = 72;
    let pendingY = 30;

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
      pendingX = 72;
      pendingY = 30;
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

  return (
    <section
      ref={sectionRef}
      data-dark-hero
      className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28 bg-ink text-paper"
      style={
        {
          "--glow-x": "72%",
          "--glow-y": "30%",
        } as React.CSSProperties
      }
    >
      {/* Cursor-following glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(720px circle at var(--glow-x) var(--glow-y), rgba(72,168,219,0.16), transparent 55%)",
        }}
      />
      {/* Soft pool bottom-left */}
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
        {/* Breadcrumb / masthead */}
        <m.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-mist"
        >
          <span className="h-px w-8 bg-paper/25" />
          <Link href="/" className="hover:text-paper transition-colors">
            Home
          </Link>
          <span className="text-paper/30">/</span>
          <Link href="/services" className="hover:text-paper transition-colors">
            Services
          </Link>
          <span className="text-paper/30">/</span>
          <span className="text-paper">Company formation</span>
        </m.div>

        <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-14 items-center">
          {/* Left — headline */}
          <div className="col-span-12 lg:col-span-7">
            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/[0.04] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              § Company formation
            </m.div>

            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-medium tracking-[-0.03em] leading-[0.98] text-[clamp(2.4rem,6vw,4.6rem)] text-paper text-balance"
            >
              <span className="block">Pick the right</span>
              <span className="block">structure first,</span>
              <span className="block text-brand">everything else gets easier.</span>
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-[36rem] text-[1.04rem] md:text-[1.1rem] leading-relaxed text-paper/70 text-pretty"
            >
              Mainland, free zone, offshore or a holding-company group: we set up
              companies across every UAE jurisdiction. One team accountable from
              name reservation to your first invoice.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink transition-colors hover:bg-paper shadow-[0_10px_30px_-10px_rgba(72,168,219,0.55)]"
              >
                Book a free consultation
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Link>
              <Link
                href="#mainland"
                className="group inline-flex items-center gap-2 rounded-full border border-paper/20 bg-paper/5 backdrop-blur px-5 py-3 text-[0.9rem] text-paper hover:bg-paper/10 transition-colors"
              >
                Compare structures
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </Link>
            </m.div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mist"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 inline-flex animate-ping rounded-full bg-brand opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              <span>Free, 45-min consultation · Plan within one business day</span>
            </m.div>
          </div>

          {/* Right — structure picker */}
          <div className="col-span-12 lg:col-span-5">
            <m.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Picker frame label */}
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist">
                  Choose your structure
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper/40">
                  4 paths
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {pillars.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <m.div
                      key={p.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.32 + i * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={`#${p.id}`}
                        className="group relative flex h-full flex-col rounded-2xl border border-paper/12 bg-paper/[0.04] backdrop-blur-sm p-5 overflow-hidden transition-all hover:border-brand/50 hover:bg-paper/[0.07] hover:-translate-y-0.5"
                      >
                        {/* Hover glow */}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            background:
                              "radial-gradient(closest-side, rgba(72,168,219,0.55), rgba(72,168,219,0) 70%)",
                          }}
                        />
                        {/* Top brand bar */}
                        <span
                          aria-hidden
                          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"
                        />

                        <div className="relative flex items-start justify-between">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-paper/15 bg-paper/[0.05] text-brand-soft group-hover:bg-brand/15 group-hover:text-brand transition-colors">
                            <Icon className="h-4 w-4" strokeWidth={1.7} />
                          </span>
                          <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-mist">
                            {p.index}
                          </span>
                        </div>

                        <div className="relative mt-5">
                          <div className="font-display text-[1.15rem] leading-tight tracking-[-0.01em] text-paper">
                            {p.label}
                          </div>
                          <div className="mt-1.5 text-[0.82rem] leading-snug text-paper/55">
                            {p.desc}
                          </div>
                        </div>

                        <div className="relative mt-5 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist">
                          <span>Jump to</span>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            strokeWidth={1.8}
                          />
                        </div>
                      </Link>
                    </m.div>
                  );
                })}
              </div>
            </m.div>
          </div>
        </div>

        {/* Trust strip */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-y-10 border-t border-paper/15 pt-10"
        >
          {trust.map((item, i) => (
            <div
              key={item.label}
              className={
                "px-1 md:px-6 relative " +
                (i > 0 ? "md:border-l md:border-paper/15" : "")
              }
            >
              <div className="font-display font-medium text-[2rem] md:text-[2.4rem] leading-none tracking-[-0.03em] text-paper">
                {item.value}
              </div>
              <div className="mt-3 text-[0.92rem] text-paper">{item.label}</div>
              <div className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.15em] text-mist">
                {item.meta}
              </div>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
