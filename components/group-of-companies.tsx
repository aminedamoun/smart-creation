"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { groupCompanies, type GroupCompany } from "@/lib/data";
import { SectionHeader } from "@/components/ui/section-header";

/**
 * Smart Creation Group — circuit-board layout.
 *
 * Bigger viewBox (1100×720) so the cards never overlap. The cables
 * (L-shaped traces) and travelling comet orbs are kept; the CPU chip
 * is replaced by a clean glass card carrying the SC Group lockup.
 */

const VBOX_W = 1100;
const VBOX_H = 720;

type Chip = {
  companyId: string;
  /** Cable path in viewBox coords */
  path: string;
  /** Card centre position in viewBox coords */
  cx: number;
  cy: number;
  /** offset-path animation timing */
  anim: { duration: string; delay: string };
};

// Paths START at the Smart Creation Group centre card edge and travel OUT to
// each perimeter card. Orbs animate offset-distance 0%→100%, so light flows
// from the centre outward.
const CHIPS: Chip[] = [
  // ── LEFT ──
  {
    companyId: "smart-place-bc",
    cx: 160,
    cy: 220,
    path: "M 390 300 h -42 q -14 0 -14 -14 v -52 q 0 -14 -14 -14 h -70",
    anim: { duration: "2s", delay: "-0.5s" },
  },
  {
    companyId: "smart-view-bc",
    cx: 100,
    cy: 360,
    path: "M 391 360 h -207",
    anim: { duration: "2.5s", delay: "-1s" },
  },
  {
    companyId: "future-space-bc",
    cx: 160,
    cy: 500,
    path: "M 390 420 h -42 q -14 0 -14 14 v 52 q 0 14 -14 14 h -70",
    anim: { duration: "2s", delay: "-1.5s" },
  },
  // ── TOP ──
  {
    companyId: "smart-creation-bc",
    cx: 390,
    cy: 80,
    path: "M 510 280 v -42 q 0 -14 -14 -14 h -92 q -14 0 -14 -14 v -70",
    anim: { duration: "1.7s", delay: "-0.7s" },
  },
  {
    companyId: "abna-rashid",
    cx: 710,
    cy: 80,
    path: "M 590 280 v -42 q 0 -14 14 -14 h 92 q 14 0 14 -14 v -70",
    anim: { duration: "1.7s", delay: "-1.2s" },
  },
  // ── RIGHT ──
  {
    companyId: "next-journey",
    cx: 940,
    cy: 220,
    path: "M 710 300 h 42 q 14 0 14 -14 v -52 q 0 -14 14 -14 h 70",
    anim: { duration: "2s", delay: "-1.8s" },
  },
  {
    companyId: "smart-holiday-homes",
    cx: 1000,
    cy: 360,
    path: "M 709 360 h 207",
    anim: { duration: "2.5s", delay: "-0.4s" },
  },
  {
    companyId: "intercity-bus",
    cx: 940,
    cy: 500,
    path: "M 710 420 h 42 q 14 0 14 14 v 52 q 0 14 14 14 h 70",
    anim: { duration: "2s", delay: "-0.3s" },
  },
  // ── BOTTOM ──
  {
    companyId: "mm-contractor",
    cx: 550,
    cy: 640,
    path: "M 550 453 v 133",
    anim: { duration: "1.7s", delay: "-1s" },
  },
];

const shortName: Record<string, string> = {
  "smart-creation-bc": "Smart Creation BC",
  "smart-place-bc": "Smart Place BC",
  "smart-view-bc": "Smart View BC",
  "future-space-bc": "Future Space BC",
  "abna-rashid": "Abna Rashid Bldg.",
  "next-journey": "Next Journey",
  "smart-holiday-homes": "Smart Holiday Homes",
  "intercity-bus": "Intercity Bus",
  "mm-contractor": "MM Contractor",
};

const companyById: Record<string, GroupCompany> = Object.fromEntries(
  groupCompanies.map((c) => [c.id, c])
);

export function GroupOfCompanies() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = sectionRef.current;
    const spot = spotlightRef.current;
    if (!sec || !spot) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rect = sec.getBoundingClientRect();
    const onResize = () => {
      rect = sec.getBoundingClientRect();
    };
    const onMove = (e: MouseEvent) => {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spot.style.background = `radial-gradient(560px circle at ${x}px ${y}px, rgba(72,168,219,0.32) 0%, rgba(72,168,219,0.10) 35%, transparent 70%)`;
    };
    const onLeave = () => {
      spot.style.background =
        "radial-gradient(640px circle at 50% 40%, rgba(72,168,219,0) 0%, transparent 70%)";
    };

    window.addEventListener("scroll", onResize, { passive: true });
    window.addEventListener("resize", onResize);
    sec.addEventListener("mousemove", onMove);
    sec.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("scroll", onResize);
      window.removeEventListener("resize", onResize);
      sec.removeEventListener("mousemove", onMove);
      sec.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="group"
      className="relative py-24 md:py-36 bg-ink text-paper overflow-hidden"
    >
      {/* Grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Base ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[28%] -translate-x-1/2 z-0"
        style={{
          width: "1100px",
          height: "640px",
          background:
            "radial-gradient(ellipse, rgba(72,168,219,0.18) 0%, transparent 65%)",
        }}
      />
      {/* Cursor spotlight */}
      <div
        ref={spotlightRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          mixBlendMode: "screen",
          background:
            "radial-gradient(640px circle at 50% 40%, rgba(72,168,219,0), transparent 70%)",
        }}
      />

      <div className="container-edit relative z-[2]">
        <div className="mb-12 md:mb-16">
          <SectionHeader
            theme="dark"
            align="center"
            section="§ 04 — The Group"
            title={
              <>
                Smart Creation Group —{" "}
                <span className="italic text-brand-soft">
                  one parent, nine affiliated companies.
                </span>
              </>
            }
            lede="The Group sits at the centre of the circuit. Around it, nine specialist companies plug in — four sister business centres, plus real estate, technology, hospitality, transport and contracting across the UAE, Canada and Pakistan."
          />
        </div>

        {/* ── Circuit board ─────────────────────────────────── */}
        <div className="hidden md:block relative mx-auto w-full max-w-[1180px] aspect-[1100/720]">
          {/* Cables (SVG) */}
          <svg
            viewBox={`0 0 ${VBOX_W} ${VBOX_H}`}
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full pointer-events-none"
            aria-hidden
          >
            <defs>
              {CHIPS.map((c, i) => (
                <mask key={`m-${i}`} id={`scg-mask-${i + 1}`}>
                  <path
                    d={c.path}
                    stroke="white"
                    strokeWidth="0.6"
                    fill="none"
                  />
                </mask>
              ))}

              <radialGradient id="scg-orb" fx="1">
                <stop offset="0%" stopColor="#cdeaf6" />
                <stop offset="35%" stopColor="#48a8db" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>

              <filter
                id="cable-glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="2.6" />
              </filter>
            </defs>

            {/* Cards finish loading at ~1.1s. Cables fade in one-by-one
                from 1.2s. Orbs become visible at ~2.2s and travel slowly. */}

            {/* Single faint trace — the moving orb supplies the motion */}
            {CHIPS.map((c, i) => (
              <motion.path
                key={`cable-${i}`}
                d={c.path}
                stroke="rgba(155,214,239,0.18)"
                fill="none"
                strokeWidth="0.7"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.55,
                  delay: 1.2 + i * 0.09,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* COMET ORBS — fade in once all cables are lit */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 2.2, ease: "easeOut" }}
            >
              {CHIPS.map((_, i) => (
                <g key={`o-${i}`} mask={`url(#scg-mask-${i + 1})`}>
                  <circle
                    className={`scg-architecture scg-line-${i + 1}`}
                    cx="0"
                    cy="0"
                    r="42"
                    fill="url(#scg-orb)"
                  />
                </g>
              ))}
            </motion.g>
          </svg>

          {/* Centre card — Smart Creation Group (bigger) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <CentreCard />
          </motion.div>

          {/* Perimeter cards */}
          {CHIPS.map((c, i) => {
            const company = companyById[c.companyId];
            if (!company) return null;
            return (
              <motion.div
                key={c.companyId}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                style={{
                  left: `${(c.cx / VBOX_W) * 100}%`,
                  top: `${(c.cy / VBOX_H) * 100}%`,
                }}
              >
                <PerimeterCard company={company} />
              </motion.div>
            );
          })}
        </div>

        {/* ── Mobile fallback ─────────────────────────────────────── */}
        <div className="md:hidden">
          <div className="mb-8 flex justify-center">
            <CentreCard compact />
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {groupCompanies.map((c) => (
              <li
                key={c.id}
                className="flex items-center gap-3 rounded-2xl border border-paper/10 bg-paper/[0.03] p-3"
              >
                <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden">
                  {c.logo ? (
                    <Image
                      src={c.logo}
                      alt={`${c.name} logo`}
                      width={120}
                      height={56}
                      className="max-h-full max-w-full w-auto h-auto object-contain"
                    />
                  ) : (
                    <c.icon
                      className="h-5 w-5 text-brand-soft"
                      strokeWidth={1.6}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-[0.95rem] leading-tight text-paper">
                    {c.name}
                  </div>
                  <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-mist truncate">
                    <span aria-hidden className="mr-1.5">
                      {c.flag}
                    </span>
                    {c.sector}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footnote */}
        <div className="mt-10 hidden md:flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist">
          <span>Live circuit · 9 affiliates · 3 countries</span>
          <span className="text-mist/50">·</span>
          <Link
            href="/business-centers"
            className="text-paper hover:text-brand-soft transition-colors"
          >
            Visit our business centres →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────── */

function CentreCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative">
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[180%] w-[180%] rounded-full halo-pulse"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.55), rgba(72,168,219,0) 70%)",
        }}
      />
      <div
        className={`relative flex flex-col items-center rounded-3xl bg-paper border border-brand/40 shadow-[0_40px_90px_-25px_rgba(72,168,219,0.7)] ${
          compact
            ? "px-6 py-5 w-[260px]"
            : "px-8 py-7 md:px-10 md:py-8 w-[280px] md:w-[340px]"
        }`}
      >
        <div className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-stone mb-3">
          Holding entity · Est. 2013
        </div>
        <Image
          src="/sc-group-logo.png"
          alt="Smart Creation Group"
          width={551}
          height={228}
          className={
            compact
              ? "h-14 w-auto object-contain"
              : "h-16 md:h-20 w-auto object-contain"
          }
          priority
        />
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand/15 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-brand-deep">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 inline-flex animate-ping rounded-full bg-brand opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
          </span>
          9 affiliates · 3 countries
        </div>
      </div>
    </div>
  );
}

function PerimeterCard({ company }: { company: GroupCompany }) {
  const Icon = company.icon;
  const label = shortName[company.id] ?? company.name;
  const sector = company.sector.split("·")[0].trim();

  return (
    <div className="group w-[180px]">
      <div className="relative rounded-2xl border border-brand/35 bg-[rgba(15,20,24,0.88)] backdrop-blur-md transition-all hover:border-brand/70 hover:bg-[rgba(20,28,36,0.94)] hover:-translate-y-0.5 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)]">
        {/* Top brand bar */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand to-transparent rounded-t-2xl" />

        {/* Logo plate */}
        <div className="flex h-[58px] items-center justify-center px-3 pt-3">
          {company.logo ? (
            <Image
              src={company.logo}
              alt={`${company.name} logo`}
              width={260}
              height={120}
              className="max-h-full max-w-full w-auto h-auto object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
            />
          ) : (
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 border border-brand/30 text-brand-soft">
              <Icon className="h-5 w-5" strokeWidth={1.6} />
            </span>
          )}
        </div>

        {/* Caption */}
        <div className="px-3 pb-3 pt-2 text-center">
          <div className="font-display text-[0.8rem] leading-tight text-paper truncate">
            {label}
          </div>
          <div className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-mist truncate">
            <span aria-hidden className="mr-1 text-base leading-none">
              {company.flag}
            </span>
            {sector}
          </div>
        </div>
      </div>
    </div>
  );
}
