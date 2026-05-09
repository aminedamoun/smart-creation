"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from "@vis.gl/react-google-maps";

/** Brand palette shared across the markers — kept inline so the pin
 *  visuals stay together and easy to tune. */
const COLOR_DARK = "#173e58"; // deep navy-blue head background
const COLOR_DEEP = "#2e8ab8"; // brand-deep — used for stem + dot core
const COLOR_BLUE = "#48a8db"; // brand — used for ring accents + halos
import {
  ArrowUpRight,
  ChevronLeft,
  Eye,
  MapPin,
  Maximize2,
  Users,
} from "lucide-react";
import { CENTRE_COORDS, DUBAI_CENTER } from "@/lib/centre-coordinates";

export type CentreMapPin = {
  id: number;
  key: string;
  name: string;
  logo: string;
  address: string;
  officesCount: number;
  priceMin: number | null;
  priceMax: number | null;
  properties: {
    slug: string;
    title: string;
    officeNo: string;
    category: string;
    image: string;
    sqft: string | null;
    capacity: string;
    priceAmount: string;
    pricePeriod: string | null;
    availability: string;
    availabilityAccent: string;
  }[];
};

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ?? "DEMO_MAP_ID";
const DEFAULT_ZOOM = 11;

function fmtAed(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}k`;
  return n.toLocaleString();
}

function formatRange(min: number | null, max: number | null): string {
  if (min === null && max === null) return "Talk to us";
  if (min !== null && max !== null && min !== max) {
    return `AED ${fmtAed(min)}–${fmtAed(max)}`;
  }
  const v = min ?? max ?? 0;
  return `AED ${fmtAed(v)}`;
}

/** Strip the redundant "Business Center" suffix so the pin head reads cleanly. */
function shortCentreName(name: string): string {
  return name
    .replace(/\s*Business Center(s)?\s*/i, "")
    .replace(/Hamd Bin Huwaidi Building/i, "Bldg.")
    .trim();
}

/**
 * Per-centre stem length in pixels. Pins anchor at their geographic
 * coordinate (the bottom dot) and the head floats above by `STEM_PX`,
 * so geographically close centres can be staggered vertically to avoid
 * head-on collisions on the map.
 */
const STEM_PX: Record<string, number> = {
  "smart-creation": 64,
  "smart-place": 96,
  "smart-view": 40,
  "future-space": 72,
  "abna-rashid": 48,
  "smart-founders": 110,
};

function MapCameraSync({
  selected,
  pins,
}: {
  selected: CentreMapPin | null;
  pins: CentreMapPin[];
}) {
  const map = useMap();
  useEffect(() => {
    if (!map || typeof google === "undefined") return;
    if (selected) {
      const c = CENTRE_COORDS[selected.key];
      if (c) {
        map.panTo(c);
        map.setZoom(14);
      }
      return;
    }
    if (pins.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      pins.forEach((p) => {
        const c = CENTRE_COORDS[p.key];
        if (c) bounds.extend(c);
      });
      if (!bounds.isEmpty()) map.fitBounds(bounds, 90);
    } else {
      map.panTo(DUBAI_CENTER);
      map.setZoom(DEFAULT_ZOOM);
    }
  }, [map, selected, pins]);
  return null;
}

export function CentresMap({ pins }: { pins: CentreMapPin[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<CentreMapPin | null>(null);
  const valid = useMemo(
    () => pins.filter((p) => CENTRE_COORDS[p.key]),
    [pins],
  );
  const totalOffices = valid.reduce((acc, p) => acc + p.officesCount, 0);

  if (!API_KEY) {
    return (
      <div className="relative h-[460px] md:h-[560px] w-full rounded-3xl border border-ink/10 bg-paper-soft overflow-hidden flex items-center justify-center">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(13,16,19,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,16,19,0.6) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative max-w-md text-center px-6">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-ink/10 bg-paper text-brand-deep mx-auto">
            <MapPin className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <div className="mt-4 font-display text-[1.05rem] tracking-[-0.01em] text-ink">
            Map preview
          </div>
          <p className="mt-2 text-[0.88rem] text-ink-mute leading-relaxed">
            Set <code className="font-mono text-[0.85em] bg-paper-soft px-1.5 py-0.5 rounded border border-ink/10">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> in{" "}
            <code className="font-mono text-[0.85em] bg-paper-soft px-1.5 py-0.5 rounded border border-ink/10">.env.local</code> to load the live Dubai map.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-[460px] md:h-[600px] w-full rounded-3xl overflow-hidden border border-ink/10 shadow-[0_30px_80px_-30px_rgba(13,16,19,0.35)]">
        <APIProvider apiKey={API_KEY} language="en" region="AE">
          <Map
            mapId={MAP_ID}
            defaultCenter={DUBAI_CENTER}
            defaultZoom={DEFAULT_ZOOM}
            gestureHandling="greedy"
            disableDefaultUI
            clickableIcons={false}
            style={{ width: "100%", height: "100%" }}
          >
            <MapCameraSync selected={selected} pins={valid} />

            {valid.map((p) => {
              const c = CENTRE_COORDS[p.key]!;
              const isActive = selected?.key === p.key;
              const isHovered = hovered === p.key;
              const stem = STEM_PX[p.key] ?? 56;
              return (
                <AdvancedMarker
                  key={p.key}
                  position={c}
                  onClick={() => setSelected(p)}
                  zIndex={isActive ? 9999 : isHovered ? 5000 : 100}
                >
                  {/* Bottom-anchored column: head card sits `stem` px above the dot. */}
                  <div
                    onMouseEnter={() => setHovered(p.key)}
                    onMouseLeave={() => setHovered(null)}
                    className="relative flex flex-col items-center cursor-pointer group"
                  >
                    {/* Head card — dark navy blue with centre name + office count */}
                    <div
                      className={
                        "relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-300 whitespace-nowrap " +
                        (isActive
                          ? "shadow-[0_18px_42px_-10px_rgba(23,62,88,0.85)] scale-[1.06]"
                          : isHovered
                          ? "shadow-[0_16px_38px_-14px_rgba(23,62,88,0.7)] scale-[1.04]"
                          : "shadow-[0_12px_28px_-14px_rgba(23,62,88,0.55)]")
                      }
                      style={{
                        backgroundColor: COLOR_DARK,
                        boxShadow: isActive
                          ? `0 0 0 2px ${COLOR_BLUE}80, 0 18px 42px -10px rgba(23,62,88,0.85)`
                          : undefined,
                      }}
                    >
                      <span className="font-display text-[0.78rem] font-medium tracking-[-0.005em] text-paper">
                        {shortCentreName(p.name)}
                      </span>
                      <span
                        className="inline-flex items-center justify-center rounded-full px-1.5 py-0.5 font-mono text-[0.56rem] font-semibold tracking-[0.08em] text-paper"
                        style={{ backgroundColor: COLOR_BLUE + "33" }}
                      >
                        {p.officesCount}
                      </span>
                    </div>

                    {/* Stem — fades from dark navy down to brand blue */}
                    <span
                      aria-hidden
                      className="block w-[2px] rounded-full transition-all duration-300"
                      style={{
                        height: `${stem}px`,
                        background: `linear-gradient(to bottom, ${COLOR_DARK} 0%, ${COLOR_DEEP} 60%, ${COLOR_BLUE} 100%)`,
                        opacity: isActive ? 1 : isHovered ? 0.95 : 0.85,
                      }}
                    />

                    {/* Pin at the actual coordinate — bigger, with always-on animated rings */}
                    <span
                      aria-hidden
                      className={
                        "relative flex items-center justify-center transition-transform duration-300 " +
                        (isActive ? "scale-110" : isHovered ? "scale-[1.07]" : "")
                      }
                      style={{ height: 28, width: 28 }}
                    >
                      {/* Outer always-pulsing ring */}
                      <span
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{
                          backgroundColor: COLOR_BLUE,
                          opacity: 0.28,
                          animationDuration: "2.4s",
                        }}
                      />
                      {/* Soft static halo */}
                      <span
                        className="absolute rounded-full transition-opacity duration-300"
                        style={{
                          height: 22,
                          width: 22,
                          backgroundColor: COLOR_BLUE,
                          opacity: isActive ? 0.45 : isHovered ? 0.35 : 0.22,
                        }}
                      />
                      {/* Outer ring */}
                      <span
                        className="absolute rounded-full"
                        style={{
                          height: 18,
                          width: 18,
                          backgroundColor: "white",
                          boxShadow: `0 4px 12px rgba(23,62,88,0.45)`,
                        }}
                      />
                      {/* Solid dot — the actual marker tip */}
                      <span
                        className="relative rounded-full"
                        style={{
                          height: 12,
                          width: 12,
                          background: `radial-gradient(circle at 35% 30%, ${COLOR_BLUE}, ${COLOR_DARK})`,
                          boxShadow: `0 2px 6px rgba(23,62,88,0.7), inset 0 0 0 1.5px ${COLOR_DEEP}`,
                        }}
                      />
                    </span>
                  </div>
                </AdvancedMarker>
              );
            })}
          </Map>
        </APIProvider>

        {/* Top-left live count pill */}
        <div className="absolute left-4 top-4 z-[5] inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper/95 backdrop-blur-md px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone shadow-[0_10px_30px_-15px_rgba(13,16,19,0.3)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 inline-flex animate-ping rounded-full bg-emerald-500 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          {valid.length} centres · {totalOffices} live office{totalOffices === 1 ? "" : "s"}
        </div>

        {/* Side-slide details panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.key + "-side"}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-4 left-4 z-[10] w-[300px] md:w-[320px] rounded-2xl bg-paper border border-ink/10 shadow-[0_28px_70px_-20px_rgba(13,16,19,0.4)] overflow-hidden"
            >
              <button
                onClick={() => setSelected(null)}
                className="flex items-center gap-2 px-5 pt-4 pb-2 text-[0.78rem] text-stone hover:text-ink transition-colors"
              >
                <ChevronLeft className="h-3.5 w-3.5" strokeWidth={2} />
                Back to all centres
              </button>

              <div className="px-5 pb-5">
                <div className="relative h-36 mb-4 rounded-xl bg-ink overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #11171b 0%, #0d1013 55%, #08090b 100%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-12 -right-10 h-32 w-32 rounded-full"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(72,168,219,0.45), rgba(72,168,219,0) 70%)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="relative h-[78%] w-[88%]">
                      <Image
                        src={selected.logo}
                        alt={selected.name}
                        fill
                        sizes="280px"
                        className="object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-display text-[1.15rem] tracking-[-0.015em] text-ink leading-tight">
                  {selected.name}
                </h3>
                <p className="mt-1 text-[0.82rem] text-ink-mute leading-snug line-clamp-2">
                  {selected.address}
                </p>

                <div className="mt-4 space-y-2.5 border-t border-ink/8 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[0.82rem] text-ink-mute">
                      Available offices:
                    </span>
                    <span className="font-display text-[1rem] tracking-[-0.02em] text-ink">
                      {selected.officesCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[0.82rem] text-ink-mute">
                      Price range:
                    </span>
                    <span className="font-display text-[0.95rem] tracking-[-0.02em] text-ink">
                      {formatRange(selected.priceMin, selected.priceMax)}
                    </span>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <Link
                    href={`/business-centers/${selected.key}`}
                    className="group flex items-center justify-center w-full gap-1.5 rounded-full bg-brand-night px-4 py-2.5 text-[0.85rem] font-medium text-paper hover:bg-brand transition-colors"
                  >
                    Visit centre
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.8}
                    />
                  </Link>
                  {selected.officesCount > 0 && (
                    <a
                      href="#available-offices"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById("available-offices")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="group flex items-center justify-center w-full gap-1.5 rounded-full border border-ink/15 bg-paper px-4 py-2.5 text-[0.82rem] text-ink hover:border-ink/40 hover:bg-paper-soft transition-colors"
                    >
                      View {selected.officesCount} office
                      {selected.officesCount === 1 ? "" : "s"} below
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Properties grid — appears when a centre is selected */}
      <AnimatePresence>
        {selected && (selected.properties?.length ?? 0) > 0 && (
          <motion.div
            id="available-offices"
            key={selected.key + "-grid"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 md:mt-10 scroll-mt-28"
          >
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6 md:mb-8">
              <div>
                <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-2">
                  Available at
                </div>
                <h3 className="font-display font-semibold text-[clamp(1.4rem,2.2vw,1.8rem)] leading-[1.1] tracking-[-0.02em] text-ink">
                  {selected.name}
                  <span className="text-brand-deep">.</span>
                </h3>
              </div>
              <Link
                href={`/business-centers/${selected.key}`}
                className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 py-2.5 text-[0.85rem] text-ink hover:border-ink/40 transition-colors"
              >
                View all {selected.officesCount}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                />
              </Link>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {selected.properties.slice(0, 6).map((o, i) => {
                const isUpcoming = o.availabilityAccent === "upcoming";
                return (
                  <motion.li
                    key={o.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={`/business-centers/${selected.key}/${o.slug}`}
                      className="group flex flex-col h-full rounded-2xl border border-ink/10 bg-paper overflow-hidden transition-all hover:border-brand/45 hover:shadow-[0_22px_60px_-30px_rgba(72,168,219,0.45)] hover:-translate-y-0.5"
                    >
                      <div className="relative h-[170px] overflow-hidden bg-paper-deep">
                        {o.image ? (
                          <Image
                            src={o.image}
                            alt={`${o.officeNo} — ${o.title}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-stone">
                            <Maximize2 className="h-6 w-6" strokeWidth={1.5} />
                          </div>
                        )}
                        <div className="absolute inset-x-0 top-0 p-3 flex items-start justify-between pointer-events-none">
                          <span className="rounded-full bg-ink/70 backdrop-blur-md px-2.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-paper">
                            {o.category}
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/95 backdrop-blur-md px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ink">
                            <span
                              className={
                                "h-1.5 w-1.5 rounded-full " +
                                (isUpcoming ? "bg-amber-500" : "bg-emerald-500")
                              }
                            />
                            {o.availability}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col flex-1 p-4 md:p-5">
                        <div className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-stone mb-1">
                          {o.officeNo}
                        </div>
                        <h4 className="font-display text-[1.05rem] leading-[1.15] tracking-[-0.015em] text-ink">
                          {o.title}
                        </h4>
                        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[0.78rem] text-ink-mute">
                          {o.sqft && (
                            <li className="inline-flex items-center gap-1">
                              <Maximize2 className="h-3 w-3 text-stone" strokeWidth={1.6} />
                              {o.sqft}
                            </li>
                          )}
                          <li className="inline-flex items-center gap-1">
                            <Users className="h-3 w-3 text-stone" strokeWidth={1.6} />
                            {o.capacity}
                          </li>
                        </ul>

                        <div className="mt-auto pt-4 border-t border-ink/8 flex items-end justify-between gap-3">
                          <div>
                            <div className="flex items-baseline gap-1">
                              <span className="font-display text-[1.15rem] font-medium text-ink tracking-[-0.02em]">
                                {o.priceAmount}
                              </span>
                              {o.pricePeriod && (
                                <span className="text-[0.7rem] text-ink-mute">{o.pricePeriod}</span>
                              )}
                            </div>
                          </div>
                          <Eye
                            className="h-3.5 w-3.5 text-stone group-hover:text-brand-deep transition-colors"
                            strokeWidth={1.8}
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
