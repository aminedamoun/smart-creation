"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

export function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Cursor-following ambient glow — same approach as the homepage hero.
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
      {/* Cursor-following ambient glow — pointer tracks this radial gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(720px circle at var(--glow-x) var(--glow-y), rgba(72,168,219,0.25), transparent 60%)",
        }}
      />
      {/* Secondary soft pool on the left */}
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
          <span className="text-paper">Contact</span>
        </nav>

        <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-12 items-center">
          {/* Left — copy */}
          <div className="col-span-12 lg:col-span-6">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/[0.04] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />§ Contact
            </div>
            <h1 className="font-display font-medium tracking-[-0.03em] leading-[0.98] text-[clamp(2.2rem,5.4vw,4.2rem)] text-paper text-balance">
              <span className="block">Tell us the business.</span>
              <span className="block">We'll come back with</span>
              <span className="block text-brand">licence, bank, visa.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[1.02rem] md:text-[1.08rem] leading-relaxed text-paper/70 text-pretty">
              Twelve years setting up companies across the U.A.E.: mainland,
              free zone, offshore. One brief in, one written plan out within a
              business day. Free. 30 minutes. No sales script.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mist">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 inline-flex animate-ping rounded-full bg-brand opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Office open · Mon–Sat · Barsha Heights, Dubai
            </div>
          </div>

          {/* Right — team photo */}
          <div className="col-span-12 lg:col-span-6">
            <div className="relative">
              {/* Decorative offset frame */}
              <div
                aria-hidden
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border-2 border-brand/40"
              />
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-paper/15 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.6)]">
                <Image
                  src="/contact-hero.webp"
                  alt="The Smart Creation team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
                {/* Subtle bottom-right brand glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(72,168,219,0.4), rgba(72,168,219,0) 70%)",
                  }}
                />
                {/* Floating "the team" pill */}
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-paper/30 bg-ink/55 backdrop-blur-md px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-paper">
                  <Sparkles className="h-3.5 w-3.5 text-brand" strokeWidth={2} />
                  The team · Smart Creation Group
                </div>
                {/* Live status pill bottom-right */}
                <div className="absolute right-5 bottom-5 inline-flex items-center gap-1.5 rounded-full border border-paper/30 bg-ink/55 backdrop-blur-md px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-paper">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                  </span>
                  Trusted since 2013
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
