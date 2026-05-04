"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Eye,
  Info,
  MapPin,
  Maximize2,
  Users,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import type { OfficeListing, CenterId } from "@/lib/office-listings";

type Centre = {
  id: string;
  key: string;
  name: string;
  city?: string;
  logo?: string;
};

const accentBg: Record<OfficeListing["accent"], string> = {
  blue: "linear-gradient(135deg, #8dc2dd 0%, #48a8db 55%, #2e8ab8 100%)",
  stone: "linear-gradient(135deg, #b5b6b8 0%, #7a7c7b 70%, #636564 100%)",
  sand: "linear-gradient(135deg, #e8d7ae 0%, #c9a876 65%, #a68854 100%)",
};

const standardFees = [
  { label: "Security deposit", value: "AED 5,000" },
  { label: "Management fee", value: "AED 1,500" },
  { label: "Ejari & contract", value: "AED 500" },
  { label: "DDA NOC", value: "AED 1,400" },
  { label: "VAT", value: "5%" },
  { label: "Parking (optional)", value: "AED 3,500 / yr" },
];

type Filter = "all" | string;

export function OfficesGrid({
  offices,
  centres,
}: {
  offices: OfficeListing[];
  centres: Centre[];
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: offices.length };
    for (const cen of centres) c[cen.key] = 0;
    for (const o of offices) {
      c[o.centerId] = (c[o.centerId] ?? 0) + 1;
    }
    return c;
  }, [offices, centres]);

  const visible = useMemo(
    () => (filter === "all" ? offices : offices.filter((o) => o.centerId === filter)),
    [offices, filter]
  );

  return (
    <section id="offices" className="relative py-24 md:py-36 bg-paper-deep">
      <div className="container-edit">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10 items-end mb-12 md:mb-16">
          <div className="col-span-12 lg:col-span-7">
            <SectionHeader
              section="§ 02 — Available offices"
              title={
                <>
                  Five centres, one group —{" "}
                  <span className="text-brand-deep">
                    pick where you want to work.
                  </span>
                </>
              }
              lede="Real inventory across all five Smart Creation Group locations in Dubai. Filter by centre to see what's available, from flagship suites at Damac Executive Heights to flexible desks in Al Muraqabat."
            />
          </div>
          <div className="col-span-12 lg:col-span-5 lg:text-right">
            <div className="inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-stone">
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 inline-flex animate-ping rounded-full bg-emerald-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Live inventory · {visible.length} shown
              </span>
              <span className="text-mist/70">·</span>
              <span>Updated daily</span>
            </div>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Filter offices by business centre"
          className="mb-10 md:mb-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-3"
        >
          <FilterPill
            active={filter === "all"}
            onClick={() => setFilter("all")}
            primary="All locations"
            secondary={`${counts.all} offices`}
          />
          {centres.map((c) => {
            const count = counts[c.key] ?? 0;
            return (
              <FilterPill
                key={c.key}
                active={filter === c.key}
                disabled={count === 0}
                onClick={() => setFilter(c.key)}
                primary={c.name}
                secondary={c.city ? `${c.city} · ${count}` : `${count}`}
                logo={c.logo}
              />
            );
          })}
        </div>

        {visible.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
            {visible.map((office, idx) => (
              <motion.li
                key={office.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.55,
                  delay: (idx % 3) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <OfficeCard office={office} priority={idx < 3} />
              </motion.li>
            ))}
          </ul>
        ) : (
          <EmptyCenterState />
        )}

        <div className="mt-14 md:mt-16 grid grid-cols-12 gap-x-8 gap-y-8 border-t border-ink/10 pt-10">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-5">
              <Info className="h-3.5 w-3.5" strokeWidth={1.8} />
              What's included in every plan
            </div>
            <dl className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
              {standardFees.map((fee) => (
                <div
                  key={fee.label}
                  className="flex items-baseline justify-between gap-3 border-b border-ink/10 pb-2"
                >
                  <dt className="text-[0.84rem] text-ink-mute">{fee.label}</dt>
                  <dd className="font-mono text-[0.82rem] text-ink">{fee.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[0.82rem] text-ink-mute">
              Co-working plans use a reduced fee schedule (deposit AED 1,000, management
              AED 500). Meeting rooms available from AED 200 / hour for tenants.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-end gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-[0.92rem] font-medium text-paper hover:bg-brand-deep transition-colors"
            >
              Book an office tour
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
            </Link>
            <Link
              href="/business-centers"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-3 text-[0.88rem] text-ink hover:border-ink/40 transition-colors"
            >
              View the full catalog
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────── */

function FilterPill({
  active,
  disabled,
  onClick,
  primary,
  secondary,
  logo,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  primary: string;
  secondary: string;
  logo?: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onClick}
      title={primary}
      className={cn(
        "group flex h-[88px] w-full flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-center transition-all",
        active
          ? "border-ink bg-ink text-paper shadow-[0_10px_25px_-12px_rgba(13,16,19,0.35)]"
          : disabled
          ? "border-ink/10 bg-paper/60 text-ink-mute/60 cursor-not-allowed"
          : "border-ink/15 bg-paper text-ink hover:border-ink/40 hover:bg-paper-soft"
      )}
    >
      {logo ? (
        <span className="relative h-10 w-full">
          <Image
            src={logo}
            alt={primary}
            fill
            sizes="160px"
            className={cn(
              "object-contain transition-opacity",
              active && "brightness-0 invert"
            )}
          />
        </span>
      ) : (
        <span className="text-[1rem] font-medium leading-tight">{primary}</span>
      )}
      <span
        className={cn(
          "max-w-full truncate font-mono text-[0.58rem] uppercase tracking-[0.16em]",
          active ? "text-mist" : "text-stone"
        )}
      >
        {secondary}
      </span>
    </button>
  );
}

function EmptyCenterState() {
  return (
    <div className="rounded-3xl border border-ink/10 bg-paper p-10 md:p-14 text-center">
      <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand-deep">
        <MapPin className="h-5 w-5" strokeWidth={1.6} />
      </div>
      <h3 className="font-display text-[1.4rem] leading-[1.15] tracking-[-0.015em] text-ink">
        Fresh inventory drops weekly at this centre.
      </h3>
      <p className="mt-3 max-w-xl mx-auto text-[0.95rem] text-ink-mute">
        Tell us your team size and timing — we'll send you the units that match
        before they go on the public list.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.9rem] font-medium text-paper hover:bg-brand-deep transition-colors"
        >
          Schedule a tour
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
        </Link>
      </div>
    </div>
  );
}

function OfficeCard({
  office,
  priority,
}: {
  office: OfficeListing;
  priority?: boolean;
}) {
  const isUpcoming = office.availabilityAccent === "upcoming";
  const href = `/business-centers/${office.centerId}/${office.slug}`;
  return (
    <article className="group flex flex-col h-full rounded-3xl border border-ink/10 bg-paper overflow-hidden transition-all hover:border-ink/25 hover:shadow-[0_22px_60px_-30px_rgba(13,16,19,0.28)]">
      <div
        className="relative h-[200px] overflow-hidden"
        style={{ background: accentBg[office.accent] }}
      >
        {office.image && (
          <Image
            src={office.image}
            alt={`${office.officeNo} at ${office.centerName} — ${office.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            priority={!!priority}
          />
        )}
        <div aria-hidden className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-ink/45 to-transparent" />

        <div className="absolute inset-0 p-4 md:p-5 flex items-start justify-between pointer-events-none">
          <span className="rounded-full bg-ink/70 backdrop-blur-md px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper">
            {office.category}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/95 backdrop-blur-md px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink">
            <span className={cn("h-1.5 w-1.5 rounded-full", isUpcoming ? "bg-amber-500" : "bg-emerald-500")} />
            {office.availability}
          </span>
        </div>

        {office.featured && (
          <div className="absolute bottom-4 left-5 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink">
              ★ Featured
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6 md:p-7">
        <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-brand-deep mb-1.5 inline-flex items-center gap-1.5">
          <MapPin className="h-3 w-3" strokeWidth={1.8} />
          {office.centerName}
        </div>
        <div className="font-mono text-[0.64rem] uppercase tracking-[0.22em] text-stone mb-2">
          {office.officeNo} · {office.location}
        </div>
        <h3 className="font-display text-[1.4rem] leading-[1.1] tracking-[-0.02em] text-ink">
          {office.title}
        </h3>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[0.84rem] text-ink-mute">
          {office.sqft && (
            <li className="inline-flex items-center gap-1.5">
              <Maximize2 className="h-3.5 w-3.5 text-stone" strokeWidth={1.6} />
              {office.sqft}
            </li>
          )}
          <li className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-stone" strokeWidth={1.6} />
            {office.capacity}
          </li>
          {office.view && (
            <li className="inline-flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5 text-stone" strokeWidth={1.6} />
              {office.view}
            </li>
          )}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {office.features.slice(0, 3).map((f) => (
            <li
              key={f}
              className="rounded-full border border-ink/10 bg-paper-soft px-2.5 py-1 text-[0.74rem] text-ink-mute"
            >
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6 border-t border-ink/10 flex items-end justify-between gap-3">
          <div className="min-w-0">
            {office.price.note && (
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone mb-0.5">
                {office.price.note}
              </div>
            )}
            <div className="flex items-baseline gap-1">
              <span className="font-display text-[1.7rem] font-medium leading-none tracking-[-0.03em] text-ink">
                {office.price.amount}
              </span>
              <span className="text-[0.82rem] text-ink-mute">{office.price.period}</span>
            </div>
            {office.paymentTerms && (
              <div className="mt-1 text-[0.72rem] text-ink-mute">
                {office.paymentTerms}
              </div>
            )}
          </div>
          <Link
            href={href}
            className="group/cta inline-flex items-center gap-1.5 rounded-full bg-ink text-paper px-4 py-2.5 text-[0.82rem] font-medium hover:bg-brand-deep transition-colors shrink-0"
          >
            View office
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
// CenterId is referenced for type compatibility only.
export type _ = CenterId;
