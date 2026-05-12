"use client";

import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { groupCenters } from "@/lib/data";

export function BusinessCenter() {
  return (
    <section id="office" className="relative py-24 md:py-36 bg-paper-soft">
      <div className="container-edit">
        <div className="grid grid-cols-12 gap-x-8 gap-y-12 mb-14 md:mb-20">
          <div className="col-span-12 lg:col-span-7">
            <m.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-stone"
            >
              <span className="h-px w-8 bg-ink/20" />
              § 08 — Our Business Centres
            </m.span>
            <m.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-display mt-5 text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.04] tracking-[-0.02em] text-ink text-balance max-w-3xl"
            >
              Six real Dubai addresses,{" "}
              <span className="text-brand-deep">all owned and operated.</span>
            </m.h2>
            <m.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-5 text-[1.02rem] leading-relaxed text-ink-mute text-pretty max-w-2xl"
            >
              Most setup agents send you home with a PO box. Smart Creation Group
              puts your company inside one of six business centres across Dubai —
              flagship offices at Damac Executive Heights, plus locations in Al
              Barsha, Bur Dubai, Al Muraqabat, Smart Founders and our owned
              freehold building in Naif, Deira.
            </m.p>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:flex lg:justify-end lg:items-end">
            <Link
              href="/business-centers"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-night px-5 py-3 text-[0.9rem] font-medium text-paper hover:bg-brand transition-colors"
            >
              Book an office tour
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {groupCenters.map((center, idx) => (
            <m.li
              key={center.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: (idx % 2) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col rounded-3xl border border-ink/10 bg-paper p-7 md:p-8 transition-all hover:border-ink/25 hover:shadow-[0_18px_50px_-28px_rgba(13,16,19,0.3)]"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone">
                  Centre № {center.index}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-brand-deep">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                  {center.city}
                </span>
              </div>

              <div className="mt-6 relative h-12 md:h-14 w-full">
                <Image
                  src={center.logo}
                  alt={center.name}
                  fill
                  sizes="(max-width: 768px) 90vw, 360px"
                  className="object-contain object-left"
                />
              </div>

              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-mute text-pretty">
                {center.summary}
              </p>

              <div className="mt-5 flex items-start gap-2 text-[0.85rem] text-ink-mute">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-brand-deep" strokeWidth={1.6} />
                <span>{center.address}</span>
              </div>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {center.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-ink/10 bg-paper-soft px-2.5 py-1 text-[0.72rem] text-ink-mute"
                  >
                    {h}
                  </li>
                ))}
              </ul>

              <span
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-brand transition-all duration-500 group-hover:w-full"
              />
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
