"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  Building2,
  Calculator,
  CheckCircle2,
  Copyright,
  FileSearch,
  FileSignature,
  FileText,
  Globe2,
  IdCard,
  Layers,
  Network,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type LucideLike = React.ComponentType<{ className?: string; strokeWidth?: number }>;

export type ServiceIconKey =
  | "building"
  | "globe"
  | "shield"
  | "network"
  | "id-card"
  | "star"
  | "users"
  | "banknote"
  | "calculator"
  | "file-text"
  | "file-search"
  | "copyright"
  | "badge-check"
  | "file-signature"
  | "refresh-cw";

const ICONS: Record<ServiceIconKey, LucideLike> = {
  building: Building2,
  globe: Globe2,
  shield: ShieldCheck,
  network: Network,
  "id-card": IdCard,
  star: Star,
  users: Users,
  banknote: Banknote,
  calculator: Calculator,
  "file-text": FileText,
  "file-search": FileSearch,
  copyright: Copyright,
  "badge-check": BadgeCheck,
  "file-signature": FileSignature,
  "refresh-cw": RefreshCw,
};

export type ServiceSectionData = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lede: string;
  icon: ServiceIconKey;
  /** Optional: when provided, the icon plate renders this PNG/SVG masked to brand-blue instead of the lucide icon. */
  logoSrc?: string;
  image: { src: string; alt: string };
  good: string[];
  included: string[];
  meta: { label: string; value: string }[];
  highlight: { eyebrow: string; title: string; body: string };
  steps: string[];
  badge?: string;
  /**
   * Media mode for the right-hand card.
   * - "image" (default): show the parallax photo overlaid with the logo pill.
   * - "logo": show a brand-blue gradient card with the logo centred (matches the
   *   free-zone-style boxes on the homepage). Requires `logoSrc`.
   */
  mediaMode?: "image" | "logo";
};

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
      className={cn(
        "block",
        tone === "brand" ? "bg-brand-deep" : "bg-paper",
        className,
      )}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export function ServiceSection({
  section: s,
  idx,
}: {
  section: ServiceSectionData;
  idx: number;
}) {
  const Icon = ICONS[s.icon];
  const flip = idx % 2 === 1;
  const onSoft = idx % 2 === 1;

  const imageRef = useRef<HTMLDivElement>(null);

  // Parallax for the image
  const { scrollYProgress: imgProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(imgProgress, [0, 1], [40, -40]);

  return (
    <section
      id={s.id}
      className={cn(
        "relative scroll-mt-28 md:scroll-mt-32 py-20 md:py-28 overflow-hidden border-t border-ink/8",
        onSoft ? "bg-paper-soft" : "bg-paper",
      )}
    >
      {/* Soft brand corner pool — alternates corners per section */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute h-[600px] w-[600px] rounded-full opacity-70",
          flip ? "-bottom-48 -left-40" : "-top-48 -right-40",
        )}
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.15), rgba(72,168,219,0) 70%)",
        }}
      />

      {/* Top brand tape with section index */}
      <div className="container-edit relative">
        <div className="flex items-center gap-4 mb-12 md:mb-14">
          <div className="flex items-center gap-3 rounded-full border border-ink/10 bg-paper px-4 py-1.5 shadow-[0_8px_24px_-12px_rgba(13,16,19,0.15)]">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-ink font-display text-[0.78rem] font-semibold">
              {s.index}
            </span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
              {s.eyebrow}
            </span>
          </div>
          <span className="hidden md:block flex-1 h-px bg-gradient-to-r from-ink/15 via-ink/5 to-transparent" />
        </div>
      </div>

      <div className="container-edit relative">
        {/* Watermark index — outlined, big */}
        <m.div
          aria-hidden
          initial={{ opacity: 0, x: flip ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "pointer-events-none select-none font-display font-semibold leading-none tracking-[-0.06em] absolute hidden lg:block top-2 z-0",
            flip ? "right-2" : "left-2",
          )}
          style={{
            fontSize: "clamp(8rem, 14vw, 14rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(13,16,19,0.07)",
          }}
        >
          {s.index}
        </m.div>

        {/* Top: title + image */}
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className={cn(
            "relative grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-10 items-center mb-16 md:mb-24 z-[1]",
            flip && "lg:[&>*:first-child]:order-2",
          )}
        >
          <m.div variants={fadeUp} className="col-span-12 lg:col-span-6">
            {s.badge && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/15 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brand-deep">
                <Sparkles className="h-3 w-3" strokeWidth={2} />
                {s.badge}
              </div>
            )}
            <h2 className="font-display font-semibold text-ink text-balance leading-[0.96] tracking-[-0.025em] text-[clamp(2.4rem,5vw,4rem)]">
              {(() => {
                const words = s.title.split(" ");
                if (words.length < 2)
                  return (
                    <>
                      <span className="text-brand-deep">{s.title}.</span>
                    </>
                  );
                const last = words[words.length - 1];
                const head = words.slice(0, -1).join(" ");
                return (
                  <>
                    {head} <span className="text-brand-deep">{last}.</span>
                  </>
                );
              })()}
            </h2>
            <m.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="origin-left mt-6 h-[3px] w-24 rounded-full bg-brand"
            />
            <p className="mt-7 max-w-[60ch] text-[1.06rem] leading-relaxed text-ink-mute">
              {s.lede}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-night px-5 py-3 text-[0.92rem] font-medium text-paper hover:bg-brand transition-colors"
              >
                Discuss this option
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                />
              </Link>
              <Link
                href="#mainland"
                className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 py-2.5 text-[0.85rem] text-ink hover:border-ink/40 transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-brand-deep" strokeWidth={2} />
                Compare to others
              </Link>
            </div>
          </m.div>

          <m.div
            ref={imageRef}
            variants={fadeUp}
            className="col-span-12 lg:col-span-6 relative"
          >
            {/* Decorative offset frame */}
            <div
              aria-hidden
              className={cn(
                "absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border-2 border-brand/40",
                flip && "-translate-x-3",
              )}
            />
            {s.mediaMode === "logo" && s.logoSrc ? (
              <m.div
                style={{ y: imgY }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-ink/10 bg-[#48a8db] shadow-[0_30px_80px_-30px_rgba(72,168,219,0.55)]"
              >
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
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center p-10">
                  <div className="relative h-[60%] w-[75%] drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
                    <Image
                      src={s.logoSrc}
                      alt={s.image.alt}
                      fill
                      sizes="(max-width: 1024px) 60vw, 35vw"
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="absolute right-5 bottom-5 inline-flex items-center gap-1.5 rounded-full border border-paper/25 bg-ink/40 backdrop-blur-md px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-paper">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-paper opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-paper" />
                  </span>
                  Trusted since 2013
                </div>
              </m.div>
            ) : (
              <m.div
                style={{ y: imgY }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-ink/10 shadow-[0_30px_80px_-30px_rgba(13,16,19,0.45)]"
              >
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.06]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-tr from-ink/40 via-ink/0 to-transparent"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(72,168,219,0.4), rgba(72,168,219,0) 70%)",
                  }}
                />
                {s.logoSrc ? (
                  <div className="absolute left-5 top-5 inline-flex items-center justify-center rounded-2xl border border-paper/25 bg-gradient-to-br from-[#62b5df] via-[#48a8db] to-[#2e8ab8] px-4 py-2.5 shadow-[0_12px_30px_-12px_rgba(72,168,219,0.55)]">
                    <MaskedLogo src={s.logoSrc} tone="paper" className="h-6 w-[100px]" />
                  </div>
                ) : (
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-paper/30 bg-ink/60 backdrop-blur-md px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-paper">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.7} />
                    {s.title}
                  </div>
                )}
                <div className="absolute right-5 bottom-5 inline-flex items-center gap-1.5 rounded-full border border-paper/30 bg-ink/60 backdrop-blur-md px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-paper">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                  </span>
                  Trusted since 2013
                </div>
              </m.div>
            )}
          </m.div>
        </m.div>

        {/* Process timeline — simple step cards */}
        <div className="relative mb-16 md:mb-24 z-[1]">
          <m.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between gap-4 mb-8"
          >
            <div className="flex items-center gap-3">
              <div>
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
                  Process
                </div>
                <div className="font-display text-[1.05rem] tracking-[-0.01em] text-ink">
                  How the setup runs
                </div>
              </div>
            </div>
            <div className="hidden md:block font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
              4 stages
            </div>
          </m.div>

          <m.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {s.steps.map((step, i) => (
              <m.li
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-2xl border border-ink/10 bg-paper p-5 transition-colors hover:border-brand/40 hover:shadow-[0_18px_45px_-25px_rgba(72,168,219,0.45)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-5 top-0 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-ink/10 bg-paper-soft font-display text-[1.2rem] font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:bg-brand group-hover:text-ink group-hover:border-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
                    Stage {i + 1} / 4
                  </span>
                </div>
                <p className="text-[0.95rem] leading-snug text-ink">{step}</p>
              </m.li>
            ))}
          </m.ol>
        </div>

        {/* Below: hoverable card grids + sticky sidebar */}
        <div className="relative grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-10 z-[1]">
          <div className="col-span-12 lg:col-span-7">
            <m.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid sm:grid-cols-2 gap-x-6 gap-y-10"
            >
              <ListCol
                title="Good for"
                tone="brand"
                items={s.good}
                Icon={CheckCircle2}
              />
              <ListCol
                title="What's included"
                tone="stone"
                items={s.included}
                Icon={Layers}
              />
            </m.div>
          </div>

          <aside className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-5">
              {/* At a glance */}
              <m.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-3xl border border-ink/10 bg-paper p-6 md:p-7"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
                />
                <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-5 flex items-center gap-2">
                  <Sparkles className="h-3 w-3 text-brand" strokeWidth={2} />
                  At a glance
                </div>
                <m.dl
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={stagger}
                  className="divide-y divide-ink/10"
                >
                  {s.meta.map((meta) => (
                    <m.div
                      key={meta.label}
                      variants={fadeUp}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                      className="group flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <dt className="text-[0.84rem] text-ink-mute group-hover:text-ink transition-colors">
                        {meta.label}
                      </dt>
                      <dd className="font-mono text-[0.78rem] uppercase tracking-[0.16em] text-ink text-right">
                        {meta.value}
                      </dd>
                    </m.div>
                  ))}
                </m.dl>
              </m.div>

              {/* Highlight CTA card */}
              <m.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3 }}
                className="relative overflow-hidden rounded-3xl border border-brand/40 bg-gradient-to-br from-ink to-[#0a1419] text-paper p-6 md:p-7 shadow-[0_30px_80px_-25px_rgba(72,168,219,0.45)]"
              >
                <m.div
                  aria-hidden
                  className="pointer-events-none absolute -top-20 -right-12 h-56 w-56 rounded-full"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(72,168,219,0.5), rgba(72,168,219,0) 70%)",
                  }}
                  animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
                />
                <div className="relative">
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist mb-3 flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-brand" strokeWidth={2} />
                    {s.highlight.eyebrow}
                  </div>
                  <h3 className="font-display font-semibold text-[1.3rem] leading-[1.2] tracking-[-0.015em] text-paper text-balance">
                    {s.highlight.title}
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-paper/75">
                    {s.highlight.body}
                  </p>
                  <Link
                    href="/contact"
                    className="group mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-[0.85rem] font-medium text-ink hover:bg-paper transition-colors"
                  >
                    Talk it through
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.8}
                    />
                  </Link>
                </div>
              </m.div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ListCol({
  title,
  tone,
  items,
  Icon,
}: {
  title: string;
  tone: "brand" | "stone";
  items: string[];
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <div>
      <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4 flex items-center gap-2">
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            tone === "brand" ? "bg-brand" : "bg-stone",
          )}
        />
        {title}
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <m.li
            key={i}
            variants={fadeUp}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.25 }}
            className="group relative flex items-start gap-3 rounded-xl border border-ink/10 bg-paper p-3.5 hover:border-brand/40 hover:bg-paper-soft transition-colors overflow-hidden"
          >
            {/* Animated accent line */}
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-[3px] origin-bottom scale-y-0 bg-brand group-hover:scale-y-100 transition-transform duration-300 origin-top"
            />
            <Icon
              className={cn(
                "h-4 w-4 mt-1 shrink-0 transition-transform group-hover:scale-110",
                tone === "brand" ? "text-brand-deep" : "text-stone",
              )}
              strokeWidth={tone === "brand" ? 2 : 1.8}
            />
            <span className="text-[0.95rem] leading-relaxed text-ink">{item}</span>
          </m.li>
        ))}
      </ul>
    </div>
  );
}
