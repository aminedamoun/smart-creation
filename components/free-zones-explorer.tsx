"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { m } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  ChevronRight,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { freeZones, type FreeZone } from "@/lib/data";

const popularZones = new Set(["IFZA", "MEYDAN", "DTEC"]);

type Filter =
  | "all"
  | "Dubai"
  | "Sharjah"
  | "RAK"
  | "Ajman"
  | "UAQ"
  | "Abu Dhabi";

const FILTERS: { key: Filter; label: string; sub?: string }[] = [
  { key: "all", label: "All zones", sub: "Across the U.A.E." },
  { key: "Dubai", label: "Dubai" },
  { key: "Sharjah", label: "Sharjah" },
  { key: "RAK", label: "RAK" },
  { key: "Ajman", label: "Ajman" },
  { key: "UAQ", label: "UAQ" },
  { key: "Abu Dhabi", label: "Abu Dhabi" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

export function FreeZonesExplorer() {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      all: freeZones.length,
      Dubai: 0,
      Sharjah: 0,
      RAK: 0,
      Ajman: 0,
      UAQ: 0,
      "Abu Dhabi": 0,
    };
    for (const z of freeZones) {
      const k = z.emirate as Filter;
      if (k in c) c[k] += 1;
    }
    return c;
  }, []);

  const visible = useMemo(() => {
    if (filter === "all") return freeZones;
    return freeZones.filter((z) => z.emirate === filter);
  }, [filter]);

  return (
    <section id="zones" className="relative py-20 md:py-28 bg-paper">
      {/* Soft brand pool */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 h-[520px] w-[520px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.10), rgba(72,168,219,0) 70%)",
        }}
      />

      <div className="container-edit relative">
        <div className="grid grid-cols-12 gap-x-10 gap-y-8 mb-10 md:mb-12 items-end">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4">
              <span className="h-px w-8 bg-ink/25" />§ The catalog
            </div>
            <h2 className="font-display font-semibold text-ink text-balance leading-[0.96] tracking-[-0.025em] text-[clamp(2.2rem,4.4vw,3.4rem)]">
              Compare every UAE free zone —{" "}
              <span className="text-brand-deep">side by side.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-ink-mute">
              Filter by emirate, scan the activity focus and lead time, then
              ask us to put together a one-page comparison for your shortlist.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:text-right">
            <div className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-stone">
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 inline-flex animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                {visible.length} of {freeZones.length} shown
              </span>
              <span className="text-mist/70">·</span>
              <span>Updated quarterly</span>
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div
          role="tablist"
          aria-label="Filter free zones by emirate"
          className="mb-10 md:mb-12 flex flex-wrap gap-2 md:gap-3"
        >
          {FILTERS.map((f) => {
            const active = filter === f.key;
            const count = counts[f.key];
            const disabled = count === 0;
            return (
              <button
                key={f.key}
                type="button"
                role="tab"
                aria-selected={active}
                disabled={disabled}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "group relative inline-flex items-center gap-3 rounded-full border px-4 py-2.5 transition-all",
                  active
                    ? "border-brand-night bg-brand-night text-paper shadow-[0_10px_25px_-12px_rgba(14,53,84,0.5)]"
                    : disabled
                    ? "border-ink/10 bg-paper/60 text-ink-mute/60 cursor-not-allowed"
                    : "border-ink/15 bg-paper text-ink hover:border-ink/40 hover:bg-paper-soft",
                )}
              >
                <span className="text-[0.92rem] font-medium leading-tight">
                  {f.label}
                </span>
                <span
                  className={cn(
                    "font-mono text-[0.62rem] uppercase tracking-[0.18em]",
                    active ? "text-mist" : "text-stone",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Zone grid */}
        <m.ul
          key={filter}
          initial="hidden"
          animate="show"
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
          {visible.map((z) => (
            <m.li key={z.code} variants={fadeUp}>
              <ZoneCard zone={z} />
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}

function ZoneCard({ zone }: { zone: FreeZone }) {
  const logoSrc = zone.logoSrc ?? `/free-zones/${zone.code.toLowerCase()}.png`;
  const isPopular = popularZones.has(zone.code);

  return (
    <Link
      href={zone.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-paper transition-all hover:border-brand/45 hover:shadow-[0_28px_70px_-30px_rgba(72,168,219,0.55)] hover:-translate-y-0.5"
    >
      {/* Animated brand stripe top */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100 z-[1]"
      />
      {/* Hover corner glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.45), rgba(72,168,219,0) 70%)",
        }}
      />

      {/* Logo plate — brand blue background */}
      <div className="relative aspect-[16/9] bg-[#48a8db] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #62b5df 0%, #48a8db 55%, #2e8ab8 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(246,243,236,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(246,243,236,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center p-5">
          <div className="relative h-[60%] w-[78%]">
            <Image
              src={logoSrc}
              alt={`${zone.name} logo`}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
              className="object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        </div>
        <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-paper/85">
          <MapPin className="h-3 w-3" strokeWidth={1.8} />
          {zone.emirate}
        </div>
        {isPopular && (
          <div className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-paper/90 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-brand-deep">
            <Sparkles className="h-2.5 w-2.5" strokeWidth={2} />
            Popular
          </div>
        )}
        <div className="absolute bottom-2.5 right-3 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-paper/55">
          {zone.code}
        </div>
      </div>

      {/* Facts row */}
      <div className="relative grid grid-cols-2 gap-3 px-5 pt-4 pb-4">
        <div>
          <div className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-stone mb-1 flex items-center gap-1.5">
            <Building2 className="h-3 w-3" strokeWidth={1.8} />
            Focus
          </div>
          <div className="text-[0.84rem] leading-snug text-ink/85">
            {zone.focus}
          </div>
        </div>
        <div>
          <div className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-stone mb-1 flex items-center gap-1.5">
            <Clock className="h-3 w-3" strokeWidth={1.8} />
            Setup
          </div>
          <div className="text-[0.84rem] leading-snug text-ink/85">
            {zone.leadTime}
          </div>
        </div>
      </div>

      {/* CTA hint */}
      <div className="relative mt-auto flex items-center justify-between gap-2 px-5 py-3.5 border-t border-ink/8 bg-paper-soft/60">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone group-hover:text-brand-deep transition-colors">
          Setup with us
        </span>
        <ArrowUpRight
          className="h-3.5 w-3.5 text-stone group-hover:text-brand-deep transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      </div>
    </Link>
  );
}

export function FreeZoneMethod() {
  const steps = [
    {
      title: "Understand the activity",
      body: "What you actually want to do — and which classification each zone allows. Not every activity exists in every zone.",
    },
    {
      title: "Match cost & visa quota",
      body: "Setup cost, renewal cost, visa quota and lease type — compared across the viable zones for your activity.",
    },
    {
      title: "Banking compatibility",
      body: "Some zones land bank approvals more easily than others. We factor in your nationality, business type and history.",
    },
    {
      title: "One-page recommendation",
      body: "You get a single sheet — the recommended zone, the runner-up, and why. No upsells, no hidden commission.",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-paper-soft border-t border-ink/8">
      <div className="container-edit relative">
        <div className="max-w-3xl mb-10 md:mb-14">
          <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4">
            <span className="h-px w-8 bg-ink/25" />§ Methodology
          </div>
          <h2 className="font-display font-semibold text-ink text-balance leading-[0.98] tracking-[-0.025em] text-[clamp(2rem,4vw,3rem)]">
            How we choose the right zone for{" "}
            <span className="text-brand-deep">your business.</span>
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-ink-mute">
            We don't push the zone with the highest commission. We compare the
            relevant zones for your activity against four criteria — and back
            the choice with a written one-pager.
          </p>
        </div>

        {/* Glowing transmitting connector */}
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 top-[34px] hidden lg:block h-px overflow-visible"
          >
            <div
              className="absolute inset-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, rgba(72,168,219,0) 0%, rgba(72,168,219,0.45) 12%, rgba(72,168,219,0.45) 88%, rgba(72,168,219,0) 100%)",
              }}
            />
            <div
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 blur-md"
              style={{
                background:
                  "linear-gradient(to right, rgba(72,168,219,0) 0%, rgba(72,168,219,0.35) 50%, rgba(72,168,219,0) 100%)",
              }}
            />
            {[0, 1, 2].map((n) => (
              <m.span
                key={n}
                className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-paper"
                style={{
                  boxShadow:
                    "0 0 12px 2px rgba(72,168,219,0.95), 0 0 28px 6px rgba(72,168,219,0.55), 0 0 56px 14px rgba(72,168,219,0.25)",
                }}
                initial={{ left: "-4%", opacity: 0 }}
                animate={{
                  left: ["-4%", "104%"],
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: n * 1.4,
                  times: [0, 0.05, 0.5, 0.95, 1],
                }}
              />
            ))}
            {[0.7, 2.1].map((d, i) => (
              <m.span
                key={`t-${i}`}
                className="absolute top-1/2 -translate-y-1/2 h-1.5 w-12 rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, rgba(72,168,219,0) 0%, rgba(72,168,219,0.6) 60%, rgba(255,255,255,0.95) 100%)",
                  filter: "blur(2px)",
                }}
                initial={{ left: "-12%", opacity: 0 }}
                animate={{
                  left: ["-12%", "104%"],
                  opacity: [0, 0.85, 0.85, 0],
                }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: d,
                  times: [0, 0.1, 0.9, 1],
                }}
              />
            ))}
          </div>

          <m.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {steps.map((s, i) => (
              <m.li
                key={i}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-2xl border border-ink/10 bg-paper p-5 transition-all hover:border-brand/45 hover:shadow-[0_24px_60px_-30px_rgba(72,168,219,0.55)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-5 top-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 bg-brand transition-transform duration-500"
                />
                <div className="flex items-center gap-3 mb-4">
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-brand/30 bg-paper-soft font-display text-[1.2rem] font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:bg-brand group-hover:text-ink group-hover:border-brand">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-1 rounded-2xl"
                      style={{
                        boxShadow:
                          "0 0 0 2px rgba(72,168,219,0.18), 0 0 18px 4px rgba(72,168,219,0.25)",
                        animation: "pulse 2.4s ease-in-out infinite",
                      }}
                    />
                    <span className="relative">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
                    Stage {i + 1} / 4
                  </span>
                </div>
                <div className="font-display text-[1rem] leading-tight tracking-[-0.01em] text-ink mb-2">
                  {s.title}
                </div>
                <p className="text-[0.88rem] leading-snug text-ink-mute">
                  {s.body}
                </p>
              </m.li>
            ))}
          </m.ol>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-night px-5 py-3 text-[0.92rem] font-medium text-paper hover:bg-brand transition-colors"
          >
            Get my zone recommendation
            <ChevronRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </Link>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
            One-page summary, within one business day
          </span>
        </div>
      </div>
    </section>
  );
}
