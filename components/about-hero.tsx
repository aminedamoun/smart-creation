"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const stats = [
  { value: "12+", label: "Years on the ground", meta: "Founded 2013" },
  { value: "10,000+", label: "Companies launched", meta: "Across every emirate" },
  { value: "6", label: "Owned Dubai centres", meta: "Tecom · Al Barsha · Bur Dubai · Deira" },
  { value: "9", label: "Group companies", meta: "U.A.E · Canada · Pakistan" },
];

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Cursor-following ambient glow — same approach as the homepage hero.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let pendingX = 70;
    let pendingY = 35;

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
      pendingX = 70;
      pendingY = 35;
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
      className="relative overflow-hidden pt-32 md:pt-44 pb-16 md:pb-24 bg-ink text-paper"
      style={
        {
          "--glow-x": "70%",
          "--glow-y": "35%",
        } as React.CSSProperties
      }
    >
      {/* Background photo — visible by default, softly dimmed by gradient */}
      <div aria-hidden className="absolute inset-0 -z-0">
        <Image
          src="/team-group.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      {/* Soft gradient overlay — keeps the photo readable behind text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/35 to-ink/85"
      />
      {/* Bottom anchor — grounds the stats strip in pure ink */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent"
      />

      {/* Cursor-following brand-blue halo — pointer tracks this radial gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(420px circle at var(--glow-x) var(--glow-y), rgba(72,168,219,0.25), transparent 60%)",
        }}
      />
      {/* Soft brand pool bottom-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.16), rgba(72,168,219,0) 70%)",
        }}
      />

      <div className="container-edit relative">
        {/* Breadcrumb */}
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-mist mb-8"
        >
          <span className="h-px w-8 bg-paper/25" />
          <Link href="/" className="hover:text-paper transition-colors">Home</Link>
          <span className="text-paper/30">/</span>
          <span className="text-paper">About</span>
        </motion.nav>

        {/* Centered copy block */}
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-paper/15 bg-ink/55 backdrop-blur-md px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />§ About
            <span className="text-paper/30">·</span>
            <Users className="h-3 w-3 text-brand" strokeWidth={2} />
            The whole team
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-medium tracking-[-0.03em] leading-[0.96] text-[clamp(2.4rem,6.4vw,5rem)] text-paper text-balance drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]"
          >
            <span className="block">Built around</span>
            <span className="block">your business —</span>
            <span className="block text-brand">since 2013.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-2xl text-[1.02rem] md:text-[1.1rem] leading-relaxed text-paper/90 text-pretty drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]"
          >
            Smart Creation Group is a multi-sector group of nine companies
            spanning six owned Dubai business centres, company formation,
            technology, real estate, hospitality, transport and contracting —
            across the U.A.E., Canada and Pakistan. One trusted partner. Twelve
            years on the ground.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mist"
          >
            <span className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 inline-flex animate-ping rounded-full bg-brand opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Headquartered · Barsha Heights, Dubai
            </span>
            <span className="text-paper/30">·</span>
            <span>Trusted since MMXIII</span>
          </motion.div>
        </div>

        {/* Stats strip — animates in on mount, same rhythm as the homepage hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-y-8 border-t border-paper/15 pt-10"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={"px-1 md:px-6 " + (i > 0 ? "md:border-l md:border-paper/15" : "")}
            >
              <div className="font-display font-medium text-[1.7rem] md:text-[2rem] leading-none tracking-[-0.03em] text-paper">
                {s.value}
              </div>
              <div className="mt-2 text-[0.86rem] text-paper">{s.label}</div>
              <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-mist">
                {s.meta}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
