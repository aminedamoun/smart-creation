"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
  Sparkles,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type FreeZoneSpotlightData = {
  id: string;
  index: string;
  code: string;
  name: string;
  eyebrow: string;
  emirate: string;
  logoSrc: string;
  image: { src: string; alt: string };
  lede: string;
  good: string[];
  included: string[];
  meta: { label: string; value: string }[];
  highlight: { eyebrow: string; title: string; body: string };
  steps: string[];
  badge?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

export function FreeZoneSpotlight({
  zone: z,
  idx,
}: {
  zone: FreeZoneSpotlightData;
  idx: number;
}) {
  const onSoft = idx % 2 === 1;
  const flip = idx % 2 === 1;

  const cost = z.meta.find((m) => /cost/i.test(m.label))?.value;
  const time = z.meta.find((m) => /time|setup/i.test(m.label))?.value;
  const visa = z.meta.find((m) => /visa|quota/i.test(m.label))?.value;
  const authority = z.meta.find((m) => /authority|emirate/i.test(m.label))?.value ?? z.emirate;

  return (
    <section
      id={z.id}
      className={cn(
        "relative scroll-mt-28 md:scroll-mt-32 py-20 md:py-28 overflow-hidden border-t border-ink/8",
        onSoft ? "bg-paper-soft" : "bg-paper",
      )}
    >
      {/* Massive watermark zone CODE */}
      <m.span
        aria-hidden
        initial={{ opacity: 0, x: flip ? 30 : -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "pointer-events-none select-none absolute font-display font-semibold leading-none tracking-[-0.06em] hidden md:block top-12 z-0",
          flip ? "right-[-2vw]" : "left-[-2vw]",
        )}
        style={{
          fontSize: "clamp(8rem, 18vw, 18rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(13,16,19,0.07)",
        }}
      >
        {z.code}
      </m.span>

      {/* Brand pool corner */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute h-[600px] w-[600px] rounded-full opacity-70",
          flip ? "-bottom-48 -left-40" : "-top-48 -right-40",
        )}
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.16), rgba(72,168,219,0) 70%)",
        }}
      />

      <div className="container-edit relative z-[1]">
        {/* Spotlight card — full-bleed image with overlay info */}
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative overflow-hidden rounded-[28px] border border-ink/10 bg-ink shadow-[0_40px_100px_-30px_rgba(13,16,19,0.45)]"
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <Image
              src={z.image.src}
              alt={z.image.alt}
              fill
              priority={idx === 0}
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="object-cover scale-[1.02]"
            />
            {/* Brand-blue corner overlay */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: flip
                  ? "linear-gradient(to left, rgba(13,16,19,0.85) 0%, rgba(13,16,19,0.55) 35%, rgba(13,16,19,0.20) 70%, transparent 100%)"
                  : "linear-gradient(to right, rgba(13,16,19,0.85) 0%, rgba(13,16,19,0.55) 35%, rgba(13,16,19,0.20) 70%, transparent 100%)",
              }}
            />
            {/* Decorative grid */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #f6f3ec 1px, transparent 1px), linear-gradient(to bottom, #f6f3ec 1px, transparent 1px)",
                backgroundSize: "64px 64px",
                maskImage:
                  "radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at 50% 50%, black 40%, transparent 80%)",
              }}
            />
            {/* Brand-blue corner glow */}
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute h-[460px] w-[460px] rounded-full",
                flip ? "-bottom-40 -right-40" : "-bottom-40 -left-40",
              )}
              style={{
                background:
                  "radial-gradient(closest-side, rgba(72,168,219,0.45), rgba(72,168,219,0) 70%)",
              }}
            />

            {/* Title block */}
            <div
              className={cn(
                "absolute inset-y-0 flex w-full md:w-[62%] flex-col justify-between p-7 md:p-10",
                flip && "md:left-auto md:right-0 md:items-end md:text-right",
              )}
            >
              <div className={cn("flex items-center gap-3", flip && "md:flex-row-reverse")}>
                <span className="inline-flex items-center gap-2 rounded-full border border-paper/20 bg-paper/[0.06] backdrop-blur-md px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-paper">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" />§ {z.index} ·{" "}
                  {z.eyebrow}
                </span>
                {z.badge && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand/20 border border-brand/40 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-brand">
                    <Sparkles className="h-2.5 w-2.5" strokeWidth={2} />
                    {z.badge}
                  </span>
                )}
              </div>

              <m.div variants={fadeUp}>
                {/* Logo card — brand-blue gradient */}
                <div
                  className={cn(
                    "inline-flex items-center justify-center rounded-2xl border border-paper/20 bg-gradient-to-br from-[#62b5df] via-[#48a8db] to-[#2e8ab8] px-5 py-3.5 shadow-[0_12px_30px_-12px_rgba(72,168,219,0.55)] mb-6",
                  )}
                >
                  <span
                    aria-hidden
                    className="block h-8 w-[140px] bg-paper"
                    style={{
                      WebkitMaskImage: `url(${z.logoSrc})`,
                      maskImage: `url(${z.logoSrc})`,
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                    }}
                  />
                </div>
                <h2 className="font-display font-semibold leading-[0.92] tracking-[-0.03em] text-[clamp(2.4rem,5.4vw,4.4rem)] text-paper text-balance">
                  {z.name}
                  <span className="text-brand">.</span>
                </h2>
              </m.div>
            </div>

            {/* Live pulse indicator */}
            <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-paper/25 bg-ink/60 backdrop-blur-md px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-paper">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              {z.code}
            </div>
          </div>

          {/* Stats strip — sits below image, inside the same card */}
          <m.div
            variants={fadeUp}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-paper/10 border-t border-paper/10 bg-[#0a1216]"
          >
            {[
              { icon: MapPin, label: "Authority", value: authority },
              { icon: Clock, label: "Setup", value: time ?? "–" },
              { icon: Layers, label: "Visa quota", value: visa ?? "–" },
              { icon: Wallet, label: "Year-one", value: cost ?? "–" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 px-5 py-4 md:px-7 md:py-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-paper/15 bg-paper/[0.05] text-brand-soft">
                  <s.icon className="h-4 w-4" strokeWidth={1.7} />
                </span>
                <div className="min-w-0">
                  <div className="font-mono text-[0.56rem] uppercase tracking-[0.22em] text-mist">
                    {s.label}
                  </div>
                  <div className="text-[0.86rem] text-paper truncate">
                    {s.value}
                  </div>
                </div>
              </div>
            ))}
          </m.div>
        </m.div>

        {/* Lede (full-width contained) */}
        <m.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 md:mt-14 max-w-3xl text-[1.08rem] leading-relaxed text-ink-mute"
        >
          {z.lede}
        </m.p>

        {/* Body grid — 3 columns: Good for / Included / Process */}
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8"
        >
          {/* Good for */}
          <m.div variants={fadeUp} className="lg:col-span-4">
            <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Good for
            </div>
            <ul className="space-y-2.5">
              {z.good.map((g, i) => (
                <m.li
                  key={i}
                  variants={fadeUp}
                  whileHover={{ x: 3 }}
                  className="group relative flex items-start gap-3 rounded-xl border border-ink/10 bg-paper p-3.5 hover:border-brand/40 transition-colors overflow-hidden"
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-brand transition-transform duration-300 group-hover:scale-y-100"
                  />
                  <CheckCircle2 className="h-4 w-4 text-brand-deep mt-0.5 shrink-0" strokeWidth={2} />
                  <span className="text-[0.94rem] leading-snug text-ink">{g}</span>
                </m.li>
              ))}
            </ul>
          </m.div>

          {/* What's included */}
          <m.div variants={fadeUp} className="lg:col-span-4">
            <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-stone" />
              What's included
            </div>
            <ul className="space-y-2.5">
              {z.included.map((g, i) => (
                <m.li
                  key={i}
                  variants={fadeUp}
                  whileHover={{ x: 3 }}
                  className="group flex items-start gap-3 rounded-xl border border-ink/10 bg-paper p-3.5 hover:border-brand/40 transition-colors"
                >
                  <Layers className="h-4 w-4 text-stone mt-0.5 shrink-0" strokeWidth={1.8} />
                  <span className="text-[0.94rem] leading-snug text-ink">{g}</span>
                </m.li>
              ))}
            </ul>
          </m.div>

          {/* Process steps — vertical numbered timeline */}
          <m.div variants={fadeUp} className="lg:col-span-4">
            <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-4 flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-brand" strokeWidth={2} />
              How we run it
            </div>
            <ol className="relative space-y-3">
              {/* Vertical connector line */}
              <span
                aria-hidden
                className="absolute left-[18px] top-3 bottom-3 w-px bg-gradient-to-b from-brand/0 via-brand/40 to-brand/0"
              />
              {z.steps.map((step, i) => (
                <m.li
                  key={i}
                  variants={fadeUp}
                  className="relative flex items-start gap-3"
                >
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-paper font-mono text-[0.7rem] tracking-[0.16em] text-ink">
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full"
                      style={{
                        boxShadow: "0 0 0 2px rgba(72,168,219,0.18), 0 0 12px 2px rgba(72,168,219,0.25)",
                        animation: "pulse 2.4s ease-in-out infinite",
                      }}
                    />
                    <span className="relative">{String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <span className="rounded-xl border border-ink/10 bg-paper px-3.5 py-2.5 flex-1 text-[0.92rem] leading-snug text-ink">
                    {step}
                  </span>
                </m.li>
              ))}
            </ol>
          </m.div>
        </m.div>

        {/* Highlight banner */}
        <m.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3 }}
          className="mt-14 md:mt-16 relative overflow-hidden rounded-3xl border border-brand/40 bg-gradient-to-br from-ink to-[#0a1419] text-paper p-7 md:p-10 shadow-[0_30px_80px_-25px_rgba(72,168,219,0.45)]"
        >
          <m.div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-12 h-72 w-72 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(72,168,219,0.5), rgba(72,168,219,0) 70%)",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
          />
          <div className="relative grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-8 items-center">
            <div className="col-span-12 lg:col-span-8">
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist mb-3 flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-brand" strokeWidth={2} />
                {z.highlight.eyebrow}
              </div>
              <h3 className="font-display font-semibold text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.15] tracking-[-0.015em] text-paper text-balance">
                {z.highlight.title}
              </h3>
              <p className="mt-3 max-w-2xl text-[0.96rem] leading-relaxed text-paper/75">
                {z.highlight.body}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:text-right">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-[0.92rem] font-medium text-ink hover:bg-paper transition-colors"
              >
                Talk through {z.code}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                />
              </Link>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
