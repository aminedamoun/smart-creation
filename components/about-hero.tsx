"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

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
      className="relative overflow-hidden flex flex-col min-h-[85vh] md:min-h-[92vh] pt-32 md:pt-40 pb-12 md:pb-16 bg-ink text-paper"
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
          className="object-cover object-[center_22%]"
        />
      </div>

      {/* Soft gradient overlay — keeps the photo readable behind text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/35 to-ink/85"
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

      {/* Breadcrumb — same plain style as the other dark heroes */}
      <div className="container-edit relative">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-mist"
        >
          <span className="h-px w-8 bg-paper/25" />
          <Link href="/" className="hover:text-paper transition-colors">Home</Link>
          <span className="text-paper/30">/</span>
          <span className="text-paper">About</span>
        </motion.nav>
      </div>

      {/* Spacer flexes — full team photo stays visible above */}
      <div className="flex-1" />

      {/* Centered copy grounded near the bottom of the hero */}
      <div className="container-edit relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-paper/15 bg-ink/55 backdrop-blur-md px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist"
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
          className="font-display font-medium tracking-[-0.03em] leading-[1.05] text-[clamp(1.5rem,3.4vw,2.8rem)] text-paper text-balance drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)] whitespace-nowrap"
        >
          Built around your business{" "}
          <span className="text-brand">— since 2013.</span>
        </motion.h1>
      </div>
    </section>
  );
}
