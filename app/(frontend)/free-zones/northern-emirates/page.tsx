import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { NorthernEmiratesZonesHero } from "@/components/northern-emirates-zones-hero";
import {
  FreeZoneSpotlight,
  type FreeZoneSpotlightData,
} from "@/components/free-zone-spotlight";

export const metadata: Metadata = {
  title: "Sharjah & Northern Emirates Free Zones — SHAMS, SPC, RAKEZ, AFZA",
  description:
    "Sharjah Media City, Sharjah Publishing City, RAKEZ and Ajman Free Zone — every Northern Emirates option compared by cost, activity list and visa quota.",
  alternates: { canonical: "/free-zones/northern-emirates" },
};

const zones: FreeZoneSpotlightData[] = [
  {
    id: "shams",
    index: "01",
    code: "SHAMS",
    name: "Sharjah Media City",
    eyebrow: "Sharjah · media & creative",
    emirate: "Sharjah",
    logoSrc: "/free-zones/shams.png",
    image: { src: "/building/building-2.jpg", alt: "SHAMS — Sharjah" },
    lede:
      "Affordable, fast and creative-friendly. Right for content creators, freelancers, agencies and small media-adjacent businesses. Two-day licence, low cost, broad activity list.",
    good: [
      "Solo founders, freelancers and creators",
      "Marketing agencies and content studios on a budget",
      "Bootstrapped teams that need a real licence fast",
      "Founders relocating to Sharjah residency",
    ],
    included: [
      "Activity classification against SHAMS' creative list",
      "Application + KYC submission",
      "Flexi-desk lease — Sharjah-resident-friendly",
      "Establishment card, immigration file, visa quota",
      "Bank account introduction",
    ],
    meta: [
      { label: "Authority", value: "SHAMS · Sharjah Media City" },
      { label: "Setup time", value: "2 working days" },
      { label: "Visa quota", value: "Up to 6 with flexi-desk" },
      { label: "Year-one cost", value: "From AED 5,750" },
    ],
    highlight: {
      eyebrow: "Why SHAMS punches above its weight",
      title: "Two-day licence at the lowest credible cost.",
      body: "SHAMS isn't Dubai-prestige but for solo founders, freelancers and small creative shops it's the fastest way to a real licence with bank-acceptable paperwork — and you can bring family on the same visa.",
    },
    steps: [
      "Match your activity to SHAMS' creative list.",
      "Submit application + KYC.",
      "Sign flexi-desk lease.",
      "Licence + visa quota activated in 2 days.",
    ],
  },
  {
    id: "spc",
    index: "02",
    code: "SPC",
    name: "Sharjah Publishing City",
    eyebrow: "Sharjah · publishing & content",
    emirate: "Sharjah",
    logoSrc: "/free-zones/spc.png",
    image: { src: "/building/building-1.jpg", alt: "SPC — Sharjah" },
    lede:
      "Built for publishing, e-learning, content production and intellectual-property businesses. Strong cultural and academic ecosystem, IP-friendly licensing.",
    good: [
      "Publishers, e-learning and EdTech companies",
      "Authors, agents and rights-management businesses",
      "Content studios producing video and digital media",
      "IP-heavy companies needing a copyright-friendly base",
    ],
    included: [
      "Activity mapping under SPC's publishing/IP categories",
      "Application + corporate documents",
      "Office or flexi-desk lease in SPC",
      "Establishment card, immigration file, visa quota",
      "IP and copyright registration support",
    ],
    meta: [
      { label: "Authority", value: "SPC · Sharjah Publishing City" },
      { label: "Setup time", value: "5–7 working days" },
      { label: "Visa quota", value: "1–6 visas typical" },
      { label: "Year-one cost", value: "From AED 6,500" },
    ],
    highlight: {
      eyebrow: "Why SPC for content businesses",
      title: "An ecosystem built around publishing and IP.",
      body: "SPC sits inside Sharjah's broader cultural-and-academic district. If your business depends on rights, IP, distribution and publishing infrastructure, the partners and authorities you need are all in one place.",
    },
    steps: [
      "Confirm publishing / IP activity classification.",
      "Submit corporate documents.",
      "Choose office or flexi-desk.",
      "Licence + visa quota activated.",
    ],
  },
  {
    id: "rakez",
    index: "03",
    code: "RAKEZ",
    name: "Ras Al Khaimah Economic Zone",
    eyebrow: "RAK · industrial & SME",
    emirate: "Ras Al Khaimah",
    logoSrc: "/free-zones/rakez.png",
    image: { src: "/building/building-3.jpg", alt: "RAKEZ — Ras Al Khaimah" },
    lede:
      "The most cost-efficient industrial and SME licensing in the UAE. Industrial parks, plots, warehouses and offices at a fraction of Dubai pricing, with broad activity lists and 0% personal income tax.",
    good: [
      "Manufacturing, industrial and SME operators",
      "Cost-sensitive trading and import-export businesses",
      "Founders prioritising cost over Dubai address",
      "Logistics and warehousing at scale on a budget",
    ],
    included: [
      "Activity classification across RAKEZ industrial / commercial categories",
      "Application + corporate documents",
      "Office, plot or warehouse lease",
      "Establishment card, immigration file, visa quota",
      "Banking introduction",
    ],
    meta: [
      { label: "Authority", value: "RAKEZ" },
      { label: "Setup time", value: "5–10 working days" },
      { label: "Visa quota", value: "Tied to lease size" },
      { label: "Year-one cost", value: "From AED 6,200" },
    ],
    highlight: {
      eyebrow: "Why RAKEZ for industrial",
      title: "Half the cost of Dubai for the same legal protections.",
      body: "If your business doesn't depend on a Dubai postcode, RAKEZ delivers the same UAE corporate framework, same 100% foreign ownership, same banking access — for materially lower setup and renewal cost.",
    },
    steps: [
      "Match activity to RAKEZ industrial / commercial list.",
      "Submit application + KYC.",
      "Lease office, warehouse or plot.",
      "Licence + immigration file issued.",
    ],
  },
  {
    id: "afza",
    index: "04",
    code: "AFZA",
    name: "Ajman Free Zone",
    eyebrow: "Ajman · fastest entry",
    emirate: "Ajman",
    logoSrc: "/free-zones/afza.png",
    image: { src: "/building/building-8.jpg", alt: "AFZA — Ajman" },
    lede:
      "One of the fastest and cheapest UAE free-zone licences. Right for first-time entrepreneurs, small trading and consulting firms, and bootstrapped founders who want a real UAE licence without Dubai overhead.",
    good: [
      "First-time founders launching their first UAE business",
      "Small consulting, trading and service businesses",
      "Founders prioritising lowest possible cost",
      "Anyone testing the UAE market before committing to Dubai",
    ],
    included: [
      "Activity confirmation under AFZA's commercial / service categories",
      "Application + KYC submission",
      "Smart-office or flexi-desk lease",
      "Establishment card, immigration file, visa quota",
      "Bank account introduction",
    ],
    meta: [
      { label: "Authority", value: "Ajman Free Zone Authority" },
      { label: "Setup time", value: "2–4 working days" },
      { label: "Visa quota", value: "1–3 with flexi-desk" },
      { label: "Year-one cost", value: "From AED 5,500" },
    ],
    highlight: {
      eyebrow: "Why AFZA for first-time founders",
      title: "Cheapest credible UAE licence, in days.",
      body: "AFZA isn't Dubai prestige, but it's a fully legitimate UAE free-zone licence. Lower stakes, lower cost, lower risk — the right way to test an idea in the UAE without committing capital you don't yet need to.",
    },
    steps: [
      "Confirm activity matches AFZA's list.",
      "Submit application + KYC.",
      "Choose smart-office or flexi-desk.",
      "Licence + visa quota activated.",
    ],
  },
];

export default function NorthernEmiratesZonesPage() {
  return (
    <>
      <NorthernEmiratesZonesHero />

      {zones.map((z, idx) => (
        <FreeZoneSpotlight key={z.id} zone={z} idx={idx} />
      ))}

      {/* CTA */}
      <section className="py-20 md:py-28 bg-ink text-paper border-t border-paper/10">
        <div className="container-edit">
          <div className="grid grid-cols-12 gap-x-10 gap-y-10 items-center">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-mist mb-4">
                <span className="h-px w-8 bg-mist/40" />§ Next step
              </div>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-paper text-balance max-w-3xl">
                Tell us your activity and team size.{" "}
                <span className="text-brand-soft">We'll come back with the right zone.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-paper/75">
                Activity, ownership, visa quota, banking, lease type and total
                year-one cost — assessed against all four Northern Emirates zones
                and back to you within one business day.
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
                  href="/free-zones/dubai"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 bg-paper/5 backdrop-blur px-5 py-3 text-[0.9rem] text-paper hover:bg-paper/10 transition-colors"
                >
                  <Calendar className="h-3.5 w-3.5" strokeWidth={1.8} />
                  See Dubai zones
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
