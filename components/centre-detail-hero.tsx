"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Sparkles,
} from "lucide-react";

type Props = {
  name: string;
  tagline?: string | null;
  location: string;
  building: string;
  emirate?: string | null;
  officesCount: number;
};

export function CentreDetailHero({
  name,
  tagline,
  location,
  building,
  emirate,
  officesCount,
}: Props) {
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
            "radial-gradient(720px circle at var(--glow-x) var(--glow-y), rgba(72,168,219,0.22), transparent 60%)",
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
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
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
          className="flex flex-wrap items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-mist mb-6"
        >
          <span className="h-px w-8 bg-paper/25" />
          <Link href="/" className="hover:text-paper transition-colors">
            Home
          </Link>
          <span className="text-paper/30">/</span>
          <Link
            href="/business-centers"
            className="hover:text-paper transition-colors"
          >
            Business Centres
          </Link>
          <span className="text-paper/30">/</span>
          <span className="text-paper">{name}</span>
        </nav>

        <Link
          href="/business-centers"
          className="group inline-flex items-center gap-1.5 text-[0.85rem] text-mist hover:text-paper transition-colors mb-8 font-mono uppercase tracking-[0.18em]"
        >
          <ArrowLeft
            className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5"
            strokeWidth={1.8}
          />
          All centres
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/[0.05] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist">
            <Sparkles className="h-3 w-3 text-brand" strokeWidth={2} />§ Smart
            Creation Group · owned centre
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl font-display font-medium tracking-[-0.03em] leading-[0.98] text-[clamp(2.4rem,6vw,4.6rem)] text-paper text-balance">
            {name}
            <span className="text-brand">.</span>
          </h1>

          {tagline && (
            <p className="mt-6 max-w-2xl text-[1.04rem] md:text-[1.1rem] leading-relaxed text-paper/75 text-pretty">
              {tagline}
            </p>
          )}

          {/* Meta chips */}
          <div className="mt-9 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/[0.04] backdrop-blur-md px-3.5 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-paper/85">
              <MapPin className="h-3.5 w-3.5 text-brand" strokeWidth={1.8} />
              {location}
              {emirate ? `, ${emirate}` : ""}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/[0.04] backdrop-blur-md px-3.5 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-paper/85">
              <Building2 className="h-3.5 w-3.5 text-brand" strokeWidth={1.8} />
              {building}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/[0.04] backdrop-blur-md px-3.5 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-paper/85">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 inline-flex animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              {officesCount}{" "}
              {officesCount === 1 ? "property" : "properties"} live
            </span>
          </div>

          {/* Quick anchor links */}
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-mist">
            <a
              href="#about"
              className="hover:text-paper transition-colors inline-flex items-center gap-1.5"
            >
              <span className="h-px w-4 bg-paper/30" />
              About this centre
            </a>
            <a
              href="#properties"
              className="hover:text-paper transition-colors inline-flex items-center gap-1.5"
            >
              <span className="h-px w-4 bg-paper/30" />
              Available properties
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
