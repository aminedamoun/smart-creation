"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export function InsightsHero({ liveCount }: { liveCount: number }) {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      data-dark-hero
      className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-20 bg-ink text-paper"
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
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-mist mb-8"
        >
          <span className="h-px w-8 bg-paper/25" />
          <Link href="/" className="hover:text-paper transition-colors">
            Home
          </Link>
          <span className="text-paper/30">/</span>
          <span className="text-paper">Insights</span>
        </nav>

        <div className="grid grid-cols-12 gap-x-10 gap-y-8 items-end">
          <div className="col-span-12 lg:col-span-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/[0.04] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />§ Insights
            </div>
            <h1 className="font-display font-medium tracking-[-0.03em] leading-[0.98] text-[clamp(2.4rem,6vw,4.6rem)] text-paper text-balance">
              <span className="block">Field notes from</span>
              <span className="block">setting up businesses</span>
              <span className="block text-brand">in the U.A.E.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[1.04rem] md:text-[1.1rem] leading-relaxed text-paper/70 text-pretty">
              Long-form, no-fluff playbooks on Dubai company formation,
              free-zone selection, Corporate Tax, VAT and the practical
              day-to-day of running a business in the U.A.E. Updated for 2026.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:text-right font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mist">
            <div className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 inline-flex animate-ping rounded-full bg-brand opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              {liveCount} live · refreshed monthly
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
