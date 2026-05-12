import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { FreeZonesHero } from "@/components/free-zones-hero";
import {
  FreeZonesExplorer,
  FreeZoneMethod,
} from "@/components/free-zones-explorer";

export const metadata: Metadata = {
  title: "UAE Free Zones — All 12 Compared",
  description:
    "Every major UAE free zone in one place — IFZA, DMCC, JAFZA, DIFC, DAFZA, DCC, DWTC, Meydan, SHAMS, SPC, RAKEZ and AFZA. Compare cost, activity list and visa quota with one honest recommendation.",
  alternates: { canonical: "/free-zones" },
};

export default function FreeZonesPage() {
  return (
    <>
      <FreeZonesHero />
      <FreeZonesExplorer />
      <FreeZoneMethod />

      {/* CTA */}
      <section className="py-20 md:py-28 bg-ink text-paper border-t border-paper/10">
        <div className="container-edit">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-10 items-center">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-mist mb-4">
                <span className="h-px w-8 bg-mist/40" />§ Next step
              </div>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-paper text-balance max-w-3xl">
                Tell us your activity and team size.{" "}
                <span className="text-brand-soft">We'll come back with a zone.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-paper/75">
                Activity, ownership, visa quota, banking, lease type and total
                year-one cost — assessed for your business and back to you within
                one business day. Free, 30-minute consultation.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:text-right">
              <div className="inline-flex flex-col gap-3 lg:items-end">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink hover:bg-paper transition-colors"
                >
                  Get my recommendation
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </Link>
                <Link
                  href="/services/company-formation"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 bg-paper/5 backdrop-blur px-5 py-3 text-[0.9rem] text-paper hover:bg-paper/10 transition-colors"
                >
                  <Calendar className="h-3.5 w-3.5" strokeWidth={1.8} />
                  See company-formation options
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
