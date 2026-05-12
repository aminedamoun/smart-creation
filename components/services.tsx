"use client";

import Link from "next/link";
import Image from "next/image";
import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeader } from "@/components/ui/section-header";

const RECEPTION_IMAGE_READY = true;
const RECEPTION_IMAGE_SRC = "/services-banner.webp";

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-36">
      <div className="container-edit">
        <div className="grid grid-cols-12 gap-x-8 gap-y-12 items-end mb-16 md:mb-24">
          <div className="col-span-12 lg:col-span-5">
            <SectionHeader
              section="§ 01 — Services"
              title={
                <>
                  Everything a company needs{" "}
                  <span className="text-brand-deep">under one group.</span>
                </>
              }
              lede="From trade license to corporate bank account to Corporate Tax filing, Smart Creation Group is the one partner a Dubai business actually needs. Eight practices, one standard — backed by four owned-and-operated business centres."
            />
          </div>

          {/* Reception image — editorial feature frame */}
          <m.figure
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-7 relative"
          >
            <div className="relative aspect-[4/3] md:aspect-[5/3] rounded-3xl overflow-hidden border border-ink/10 bg-paper-deep">
              {RECEPTION_IMAGE_READY ? (
                <Image
                  src={RECEPTION_IMAGE_SRC}
                  alt="Reception at Smart Creation Group HQ — 19th Floor, Damac Executive Heights, Tecom, Dubai"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                  priority={false}
                />
              ) : (
                <ReceptionPlaceholder />
              )}

              {/* Editorial overlay — top-left marker */}
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none">
                <div className="flex items-center gap-2 rounded-full bg-brand-night/85 backdrop-blur-md px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                  fig. 02 · Reception
                </div>
                <div className="hidden sm:flex items-center gap-2 rounded-full bg-brand-night/85 backdrop-blur-md px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper/85">
                  Floor XIX
                </div>
              </div>

              {/* Editorial overlay — bottom caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 pointer-events-none bg-gradient-to-t from-ink/80 via-ink/25 to-transparent">
                <div className="font-display text-[0.98rem] md:text-[1.1rem] text-paper tracking-[-0.01em]">
                  Damac Executive Heights · Barsha Heights (Tecom)
                </div>
                <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist">
                  Visit us — Sun to Thu, 09:00 – 18:00 GST
                </div>
              </div>
            </div>

            {/* External caption — like a photo credit */}
            <figcaption className="mt-3 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.2em] text-stone">
              <span>— Photograph · Office lobby, Dubai</span>
              <Link
                href="/business-centers"
                className="group inline-flex items-center gap-1.5 text-ink hover:text-brand-deep transition-colors"
              >
                Book an office tour
                <ArrowUpRight
                  className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                />
              </Link>
            </figcaption>
          </m.figure>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-ink/10">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <m.li
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: (idx % 4) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border-b border-r border-ink/10"
              >
                <Link
                  href={service.href}
                  className="group relative flex flex-col h-full p-7 md:p-8 transition-colors hover:bg-paper-soft"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone">
                      {service.index}
                    </span>
                    <Icon
                      className="h-5 w-5 text-ink-mute transition-all group-hover:text-brand-deep group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-display mt-8 text-[1.4rem] leading-[1.1] tracking-[-0.015em] text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-mute">
                    {service.summary}
                  </p>
                  <div className="mt-auto pt-8 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-mute group-hover:text-brand-deep transition-colors">
                    Explore
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.8}
                    />
                  </div>
                  {/* Hover accent */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-brand transition-all duration-500 group-hover:w-full"
                  />
                </Link>
              </m.li>
            );
          })}
        </ul>

        <div className="mt-10 md:mt-12 flex justify-end">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-ink hover:text-brand-deep transition-colors"
          >
            View all services
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.8}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Designed placeholder while the real reception photo is still pending.
 * Brand-tinted gradient with a stylised lobby illustration, so the
 * section doesn't feel visually incomplete pre-asset.
 */
function ReceptionPlaceholder() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #8dc2dd 0%, #48a8db 55%, #2e8ab8 100%)",
        }}
      />
      {/* Faint architectural grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f6f3ec 1px, transparent 1px), linear-gradient(to bottom, #f6f3ec 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Stylised reception scene */}
      <svg
        aria-hidden
        viewBox="0 0 800 480"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="reception-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d1013" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#0d1013" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="reception-wall" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0d1013" stopOpacity="0" />
            <stop offset="100%" stopColor="#0d1013" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {/* Floor plane */}
        <rect x="0" y="340" width="800" height="140" fill="url(#reception-floor)" />
        {/* Back wall tint */}
        <rect x="0" y="0" width="800" height="340" fill="url(#reception-wall)" opacity="0.5" />
        {/* Reception desk */}
        <rect x="260" y="260" width="280" height="80" fill="#f6f3ec" opacity="0.85" />
        <rect x="260" y="260" width="280" height="8" fill="#0d1013" opacity="0.2" />
        <line x1="260" y1="300" x2="540" y2="300" stroke="#0d1013" strokeOpacity="0.12" strokeWidth="1" />
        {/* Wordmark on the wall */}
        <g transform="translate(400 150)" textAnchor="middle">
          <text
            fontFamily="var(--font-mono)"
            fontSize="10"
            letterSpacing="5"
            fill="#f6f3ec"
            fillOpacity="0.7"
          >
            SMART CREATION GROUP
          </text>
          <line
            x1="-120"
            y1="14"
            x2="120"
            y2="14"
            stroke="#f6f3ec"
            strokeOpacity="0.35"
            strokeWidth="0.8"
          />
          <text
            y="36"
            fontFamily="var(--font-mono)"
            fontSize="8"
            letterSpacing="4"
            fill="#f6f3ec"
            fillOpacity="0.55"
          >
            EST. MMXIII · DUBAI
          </text>
        </g>
        {/* Ceiling light strip */}
        <rect x="240" y="30" width="320" height="4" fill="#f6f3ec" opacity="0.55" rx="2" />
        {/* Plant silhouettes */}
        <g opacity="0.55">
          <ellipse cx="120" cy="320" rx="28" ry="8" fill="#0d1013" opacity="0.3" />
          <path
            d="M120 320 C 100 280, 96 240, 112 210 M120 320 C 140 280, 148 240, 136 200 M120 320 C 124 260, 132 220, 128 190"
            stroke="#f6f3ec"
            strokeOpacity="0.6"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <rect x="108" y="318" width="24" height="18" fill="#f6f3ec" fillOpacity="0.25" />
        </g>
        <g opacity="0.55" transform="translate(560 0)">
          <ellipse cx="120" cy="320" rx="28" ry="8" fill="#0d1013" opacity="0.3" />
          <path
            d="M120 320 C 100 280, 96 240, 112 210 M120 320 C 140 280, 148 240, 136 200 M120 320 C 124 260, 132 220, 128 190"
            stroke="#f6f3ec"
            strokeOpacity="0.6"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <rect x="108" y="318" width="24" height="18" fill="#f6f3ec" fillOpacity="0.25" />
        </g>
        {/* Pendant lights hanging */}
        <g>
          <line x1="330" y1="40" x2="330" y2="100" stroke="#f6f3ec" strokeOpacity="0.5" strokeWidth="0.8" />
          <circle cx="330" cy="108" r="8" fill="#f6f3ec" opacity="0.75" />
          <line x1="400" y1="40" x2="400" y2="120" stroke="#f6f3ec" strokeOpacity="0.5" strokeWidth="0.8" />
          <circle cx="400" cy="128" r="8" fill="#f6f3ec" opacity="0.85" />
          <line x1="470" y1="40" x2="470" y2="100" stroke="#f6f3ec" strokeOpacity="0.5" strokeWidth="0.8" />
          <circle cx="470" cy="108" r="8" fill="#f6f3ec" opacity="0.75" />
        </g>
      </svg>

      {/* Placeholder hint — clearly marks where the real photo goes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="rounded-full bg-ink/60 backdrop-blur px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper/90">
          Reception photograph — pending
        </div>
      </div>
    </>
  );
}
