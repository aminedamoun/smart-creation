"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { m } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Pillar = {
  id: string;
  index: string;
  code: string;
  name: string;
  focus: string;
  logoSrc: string;
};

const pillars: Pillar[] = [
  { id: "ifza", index: "01", code: "IFZA", name: "International Free Zone Authority", focus: "General trading & services", logoSrc: "/free-zones/ifza.png" },
  { id: "dmcc", index: "02", code: "DMCC", name: "Dubai Multi Commodities Centre", focus: "Commodities & global trade", logoSrc: "/free-zones/dmcc.png" },
  { id: "difc", index: "03", code: "DIFC", name: "Dubai International Financial Centre", focus: "Finance & fintech", logoSrc: "/free-zones/difc.png" },
  { id: "meydan", index: "04", code: "MEYDAN", name: "Meydan Free Zone", focus: "Professional services", logoSrc: "/free-zones/meydan.png" },
  { id: "dcc", index: "05", code: "DCC", name: "Dubai CommerCity", focus: "E-commerce & digital", logoSrc: "/free-zones/dcc.png" },
  { id: "dtec", index: "06", code: "DTEC", name: "Dubai Technology Entrepreneur Campus", focus: "Technology & digital focus", logoSrc: "/free-zones/dtec.webp" },
  { id: "ancfz", index: "07", code: "ANCFZ", name: "Ajman NuVentures Centre Free Zone", focus: "Tailored for startups & SMEs", logoSrc: "/free-zones/anc.webp" },
  { id: "uaq", index: "08", code: "UAQ", name: "Umm Al Quwain Free Trade Zone Authority", focus: "Fast-setup environment for SMEs", logoSrc: "/free-zones/uaq.webp" },
];

const trust = [
  { value: "8", label: "Free zones covered", meta: "Across the U.A.E." },
  { value: "3 days", label: "Fastest licence", meta: "IFZA · Meydan · UAQ" },
  { value: "100%", label: "Foreign ownership", meta: "Across every U.A.E. zone" },
  { value: "0%", label: "Personal income tax", meta: "9% CT above AED 375k" },
];

function MaskedLogo({
  src,
  className,
  tone = "brand",
}: {
  src: string;
  className?: string;
  tone?: "brand" | "paper";
}) {
  return (
    <span
      aria-hidden
      className={tone === "paper" ? `${className ?? ""} bg-paper` : `${className ?? ""} bg-brand`}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        display: "block",
      }}
    />
  );
}

export function DubaiZonesHero() {
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
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(720px circle at var(--glow-x) var(--glow-y), rgba(72,168,219,0.16), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.12), rgba(72,168,219,0) 70%)",
        }}
      />
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
          <Link href="/free-zones" className="hover:text-paper transition-colors">
            Free zones
          </Link>
          <span className="text-paper/30">/</span>
          <span className="text-paper">Dubai</span>
        </m.div>

        <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-14 items-start">
          {/* Left — headline */}
          <div className="col-span-12 lg:col-span-6">
            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/[0.04] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />§ Dubai · Free zones
            </m.div>

            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-medium tracking-[-0.03em] leading-[0.98] text-[clamp(2.4rem,6vw,4.6rem)] text-paper text-balance"
            >
              <span className="block">Eight Dubai zones,</span>
              <span className="block">one team that</span>
              <span className="block text-brand">knows them all.</span>
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-[36rem] text-[1.04rem] md:text-[1.1rem] leading-relaxed text-paper/70 text-pretty"
            >
              IFZA, DMCC, JAFZA, DIFC, Meydan, DAFZA, DWTC, DCC. Every Dubai
              free zone has its own activity list, cost band and visa quota.
              We compare them all and apply through the right one.
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
                Get a Dubai zone match
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Link>
              <Link
                href="#ifza"
                className="group inline-flex items-center gap-2 rounded-full border border-paper/20 bg-paper/5 backdrop-blur px-5 py-3 text-[0.9rem] text-paper hover:bg-paper/10 transition-colors"
              >
                Browse zones
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
              <span>Direct relationships with every Dubai authority</span>
            </m.div>
          </div>

          {/* Right — 8 logo pillar cards */}
          <div className="col-span-12 lg:col-span-6">
            <m.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist">
                  Jump to a zone
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-paper/40">
                  8 zones
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {pillars.map((p, i) => (
                  <m.div
                    key={p.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.32 + i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={`#${p.id}`}
                      title={p.name}
                      aria-label={p.name}
                      className="group relative block aspect-[16/9] rounded-2xl border border-paper/15 bg-[#48a8db] overflow-hidden transition-all hover:border-brand hover:shadow-[0_18px_40px_-20px_rgba(72,168,219,0.7)] hover:-translate-y-0.5"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(135deg, #62b5df 0%, #48a8db 55%, #2e8ab8 100%)",
                        }}
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 opacity-[0.14]"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, rgba(246,243,236,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(246,243,236,0.6) 1px, transparent 1px)",
                          backgroundSize: "24px 24px",
                        }}
                      />
                      <span className="absolute right-2 top-2 font-mono text-[0.52rem] uppercase tracking-[0.22em] text-paper/70">
                        {p.index}
                      </span>
                      <span className="absolute inset-0 flex items-center justify-center p-4">
                        <MaskedLogo
                          src={p.logoSrc}
                          className="h-[55%] w-[80%] drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition-transform group-hover:scale-[1.04]"
                          tone="paper"
                        />
                      </span>
                      <ArrowUpRight
                        className="absolute right-2 bottom-2 h-3 w-3 text-paper/70 opacity-60 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.8}
                      />
                    </Link>
                  </m.div>
                ))}
              </div>
            </m.div>
          </div>
        </div>

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
