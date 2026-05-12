import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { DubaiZonesHero } from "@/components/dubai-zones-hero";
import {
  ServiceSection,
  type ServiceSectionData,
} from "@/components/service-section";

export const metadata: Metadata = {
  title: "Dubai Free Zones — IFZA, DMCC, JAFZA, DIFC & More",
  description:
    "All eight major Dubai free zones — IFZA, DMCC, JAFZA, DIFC, Meydan, DAFZA, DWTC, DCC. Compare activity lists, cost bands and visa quotas, then apply through the right one.",
  alternates: { canonical: "/free-zones/dubai" },
};

const sections: ServiceSectionData[] = [
  {
    id: "ifza",
    index: "01",
    eyebrow: "Most popular all-rounder",
    title: "IFZA",
    icon: "globe",
    image: { src: "/free-zones/ifza.webp", alt: "IFZA — Dubai Silicon Oasis" },
    lede:
      "International Free Zone Authority — Dubai's most-applied-for free zone. Wide activity list, low setup cost, fast turnaround. The default starting point for consultancies, trading firms and small teams that need a clean licence quickly.",
    good: [
      "Consulting, marketing, design and small-team services",
      "Trading companies that don't need a port or warehouse",
      "Founders who want minimum setup cost and fastest turnaround",
      "Bootstrapped teams scaling from 1 to 5 people",
    ],
    included: [
      "Free-zone shortlist confirmation against your activity list",
      "Application package with KYC and shareholder docs",
      "Smart office or flexi desk lease — Ejari-equivalent",
      "Establishment card, immigration file and e-channel registration",
      "Bank account introduction with two suitable UAE banks",
    ],
    meta: [
      { label: "Authority", value: "IFZA · Dubai Silicon Oasis" },
      { label: "Setup time", value: "3–5 working days" },
      { label: "Visa quota", value: "Flexible 1–6 visas" },
      { label: "Year-one cost", value: "From AED 12,500" },
    ],
    highlight: {
      eyebrow: "Why IFZA wins for most",
      title: "Cheapest credible licence in Dubai.",
      body: "IFZA hits the sweet spot — proper Dubai address, bank-acceptable, broad activity list, fast filing. For 70% of new businesses, it's the right starting point. We tell you when it's not.",
    },
    steps: [
      "Confirm activity matches IFZA's list.",
      "Submit application + KYC + share docs.",
      "Choose flexi desk or smart office.",
      "Establishment card + visa quota issued.",
    ],
  },
  {
    id: "dmcc",
    index: "02",
    eyebrow: "Premium · global trade",
    title: "DMCC",
    icon: "globe",
    image: { src: "/free-zones/dmcc.webp", alt: "DMCC — JLT" },
    lede:
      "Dubai Multi Commodities Centre — the gold standard for traders, commodity firms and serious global businesses. Higher cost, higher prestige, premier location at Jumeirah Lakes Towers and a bank-friendly reputation.",
    good: [
      "Commodity, gold, crypto, precious metals and trading firms",
      "Companies prioritising prestige and easier banking",
      "Founders working B2B with international counterparties",
      "Businesses that need a recognisable JLT address",
    ],
    included: [
      "Activity-list mapping against DMCC's specialised categories",
      "Premium-grade application — full corporate due diligence",
      "Office lease in JLT — co-working, fitted or shell-and-core",
      "Establishment card, residence visas and e-channel",
      "Banking introduction — DMCC opens doors most zones don't",
    ],
    meta: [
      { label: "Authority", value: "DMCC · Jumeirah Lakes Towers" },
      { label: "Setup time", value: "7–10 working days" },
      { label: "Visa quota", value: "Tied to office size" },
      { label: "Year-one cost", value: "From AED 35,000" },
    ],
    highlight: {
      eyebrow: "Why pay the premium",
      title: "Banking acceptance and brand credibility.",
      body: "DMCC entities get bank meetings faster, get approved more often, and clear KYC checks at international counterparties without back-and-forth. If banking is your bottleneck, DMCC is the answer.",
    },
    steps: [
      "Map your activity to DMCC's specialised list.",
      "Full DD pack — UBO, source of funds, business plan.",
      "Lease the right office — visa quota follows size.",
      "Licence issued, banking introduction starts day one.",
    ],
  },
  {
    id: "difc",
    index: "03",
    eyebrow: "Finance & professional",
    title: "DIFC",
    icon: "globe",
    image: { src: "/free-zones/difc.webp", alt: "DIFC — Dubai" },
    lede:
      "Dubai International Financial Centre — the region's financial district. Common-law jurisdiction, independent regulator (DFSA), home to most major banks, asset managers and fintechs. A serious commitment, but unmatched for finance.",
    good: [
      "Banks, asset managers, family offices and fintechs",
      "Wealth-management and advisory firms",
      "Holding companies seeking common-law jurisdiction",
      "Tech firms positioning for institutional clients",
    ],
    included: [
      "Pre-application advisory — DFSA-regulated vs non-regulated",
      "Memorandum & Articles drafted under DIFC law",
      "DFSA application coordination if regulated",
      "Office lease in Gate Avenue / Innovation Hub / wider DIFC",
      "Substance support — directors, secretary, registered address",
    ],
    meta: [
      { label: "Authority", value: "DIFC Authority + DFSA" },
      { label: "Setup time", value: "4–6 weeks" },
      { label: "Visa quota", value: "Tied to office size" },
      { label: "Year-one cost", value: "From AED 75,000" },
    ],
    highlight: {
      eyebrow: "When DIFC is right",
      title: "When the regulator and the legal system matter more than the cost.",
      body: "DIFC isn't cheap, but for fund management, fintech, regulated activities and serious holding structures it's the only credible UAE answer. We tell you upfront whether your activity needs DFSA regulation.",
    },
    steps: [
      "Decide regulated vs non-regulated path.",
      "Draft M&A and submit DIFC application.",
      "DFSA process if regulated; lease secured in parallel.",
      "Licence, registered address, immigration file live.",
    ],
  },
  {
    id: "meydan",
    index: "04",
    eyebrow: "Professional services",
    title: "Meydan",
    icon: "globe",
    image: { src: "/free-zones/meydan.webp", alt: "Meydan — Dubai" },
    lede:
      "Meydan Free Zone — quick licensing for professional services, consulting, marketing and digital businesses. Affordable and fast, with a smart-office concept that suits 1–5 person teams.",
    good: [
      "Consulting, marketing, branding, design firms",
      "Coaches, trainers and professional service providers",
      "Founders launching a single-shareholder LLC",
      "Teams that don't need a physical office every day",
    ],
    included: [
      "Activity confirmation against Meydan's professional categories",
      "Smart-office or flexi-desk lease",
      "Application, KYC and shareholder docs",
      "Establishment card and visa quota provisioning",
      "Bank introduction with two UAE banks",
    ],
    meta: [
      { label: "Authority", value: "Meydan FZ" },
      { label: "Setup time", value: "3–5 working days" },
      { label: "Visa quota", value: "1–3 visas with smart office" },
      { label: "Year-one cost", value: "From AED 14,500" },
    ],
    highlight: {
      eyebrow: "Why Meydan over IFZA",
      title: "Slightly more polished — same speed.",
      body: "Meydan's smart-office concept and address quality nudge the perception above the entry-level zones. For client-facing professional services, that nudge sometimes matters.",
    },
    steps: [
      "Match your activity to Meydan's professional list.",
      "Choose smart office or flexi desk.",
      "Submit application and KYC.",
      "Licence + visa quota activated.",
    ],
  },
  {
    id: "dcc",
    index: "05",
    eyebrow: "Pure e-commerce zone",
    title: "DCC",
    icon: "globe",
    image: { src: "/free-zones/dcc.webp", alt: "DCC — Dubai" },
    lede:
      "Dubai CommerCity — the UAE's first dedicated e-commerce free zone. Built around fulfilment, last-mile and digital retail. Right for online brands, marketplace sellers and D2C operators serving GCC and beyond.",
    good: [
      "Online retail brands and marketplace sellers",
      "D2C operators with GCC fulfilment needs",
      "Cross-border e-commerce with high SKU counts",
      "Digital-first brands that need fulfilment under one roof",
    ],
    included: [
      "E-commerce activity classification",
      "Fulfilment-centre or office lease",
      "Last-mile partner introductions",
      "Establishment card, residence visas, immigration file",
      "Payment-gateway and accounting setup support",
    ],
    meta: [
      { label: "Authority", value: "DCC · Dubai CommerCity" },
      { label: "Setup time", value: "5–7 working days" },
      { label: "Visa quota", value: "Tied to lease type" },
      { label: "Year-one cost", value: "From AED 28,000" },
    ],
    highlight: {
      eyebrow: "Why DCC for online brands",
      title: "Built for e-commerce — not retrofitted.",
      body: "DCC's licensing categories, lease types and partner ecosystem are all designed around online retail. You don't translate your business into the zone — the zone speaks your language.",
    },
    steps: [
      "Confirm e-commerce activity classification.",
      "Choose office vs fulfilment-centre lease.",
      "Application + KYC submission.",
      "Licence, fulfilment access and visas activated.",
    ],
  },
  {
    id: "dtec",
    index: "06",
    eyebrow: "Tech & digital focus",
    title: "DTEC",
    icon: "globe",
    image: { src: "/free-zones/dtec-large.webp", alt: "DTEC — Dubai Silicon Oasis" },
    lede:
      "Dubai Technology Entrepreneur Campus — the region's largest tech-startup community, hosted inside Dubai Silicon Oasis. Designed for software, SaaS, AI and digital teams that want a credible tech address with co-working flexibility built in.",
    good: [
      "Software, SaaS, AI and digital startups",
      "Founders who want a tech-credible address from day one",
      "Small teams scaling 1–10 people on flex desks",
      "Bootstrapped builders who want low overhead and easy growth",
    ],
    included: [
      "Activity confirmation against DTEC's tech category list",
      "Flexi desk or private office at the DTEC campus",
      "Application package, KYC and shareholder docs",
      "Establishment card, immigration file and visa quota",
      "Bank account introduction with two suitable U.A.E. banks",
    ],
    meta: [
      { label: "Authority", value: "DTEC · Dubai Silicon Oasis" },
      { label: "Setup time", value: "3–5 working days" },
      { label: "Visa quota", value: "Flexible 1–6 visas" },
      { label: "Year-one cost", value: "From AED 14,500" },
    ],
    highlight: {
      eyebrow: "Why DTEC for builders",
      title: "Tech address with a real community attached.",
      body: "DTEC isn't just a licence — it's a campus. Demo days, accelerator partners, investor mixers and a peer group of 800+ tech companies. The address signals you're serious; the community gets you to traction faster.",
    },
    steps: [
      "Match your activity to DTEC's tech list.",
      "Choose flexi desk or private office.",
      "Submit application + KYC.",
      "Licence + visa quota issued.",
    ],
  },
  {
    id: "ancfz",
    index: "07",
    eyebrow: "Startups & SMEs · Ajman",
    title: "ANCFZ",
    icon: "globe",
    image: { src: "/free-zones/anc-large.webp", alt: "ANCFZ — Ajman NuVentures Centre Free Zone" },
    lede:
      "Ajman NuVentures Centre Free Zone — purpose-built for startups and small businesses that want low setup cost, fast turnaround and a flexible activity list. Right for founders launching lean, freelancers and remote teams.",
    good: [
      "Solo founders and freelancers seeking a credible licence",
      "Bootstrapped SMEs prioritising cost and speed",
      "Service businesses without a heavy physical footprint",
      "Remote-first teams that need a U.A.E. address with a visa",
    ],
    included: [
      "Activity confirmation against ANCFZ's flexible list",
      "Smart-office or flexi-desk lease",
      "Application, KYC and shareholder docs",
      "Establishment card and visa quota provisioning",
      "Bank introduction with two U.A.E. banks",
    ],
    meta: [
      { label: "Authority", value: "ANCFZ · Ajman" },
      { label: "Setup time", value: "2–4 working days" },
      { label: "Visa quota", value: "Flexible 1–4 visas" },
      { label: "Year-one cost", value: "From AED 9,500" },
    ],
    highlight: {
      eyebrow: "Why ANCFZ wins on cost",
      title: "One of the lowest entry points in the U.A.E.",
      body: "If your business doesn't need Dubai prestige, ANCFZ trims the licence and lease bill significantly while keeping the same investor visa, bank account access and CT framework as any other free zone.",
    },
    steps: [
      "Confirm activity matches ANCFZ's list.",
      "Pick smart-office or flexi-desk.",
      "Submit application + KYC.",
      "Licence + visa quota activated.",
    ],
  },
  {
    id: "uaq",
    index: "08",
    eyebrow: "Fast setup · Umm Al Quwain",
    title: "UAQ",
    icon: "globe",
    image: { src: "/free-zones/uaq-large.webp", alt: "UAQ — Umm Al Quwain Free Trade Zone" },
    lede:
      "Umm Al Quwain Free Trade Zone Authority — fastest-setup environment in the U.A.E. for SMEs. Light-touch process, broad activity list, and an entry-level price point with full ownership and tax benefits.",
    good: [
      "SMEs that need a quick licence on a tight timeline",
      "Trading and consulting firms without a physical footprint",
      "Founders who want minimum bureaucracy",
      "Cost-conscious teams scaling 1–5 people",
    ],
    included: [
      "Activity confirmation against UAQ FTZ's list",
      "Flexi-desk or virtual-office lease",
      "Application, KYC and shareholder docs",
      "Establishment card and visa quota provisioning",
      "Bank introduction with U.A.E. banks",
    ],
    meta: [
      { label: "Authority", value: "UAQ FTZ · Umm Al Quwain" },
      { label: "Setup time", value: "2–4 working days" },
      { label: "Visa quota", value: "Flexible 1–6 visas" },
      { label: "Year-one cost", value: "From AED 8,500" },
    ],
    highlight: {
      eyebrow: "Why UAQ for speed",
      title: "From signed brief to issued licence in days, not weeks.",
      body: "UAQ FTZ runs one of the leanest application flows in the country. For founders who need to move fast — sign a contract, hire on a visa, open a bank — UAQ lets you skip weeks of bureaucracy elsewhere.",
    },
    steps: [
      "Match your activity to UAQ's list.",
      "Pick virtual office or flexi-desk.",
      "Submit application + KYC.",
      "Licence + visa quota issued in days.",
    ],
  },
];

export default function DubaiZonesPage() {
  return (
    <>
      <DubaiZonesHero />

      {sections.map((s, idx) => (
        <ServiceSection key={s.id} section={s} idx={idx} />
      ))}

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
                <span className="text-brand-soft">We'll come back with the right Dubai zone.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-paper/75">
                Activity, ownership, visa quota, banking, lease type, total
                year-one cost — assessed and back to you within one business day.
                Free, 30-minute consultation.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:text-right">
              <div className="inline-flex flex-col gap-3 lg:items-end">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink hover:bg-paper transition-colors"
                >
                  Get my Dubai recommendation
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </Link>
                <Link
                  href="/free-zones/northern-emirates"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 bg-paper/5 backdrop-blur px-5 py-3 text-[0.9rem] text-paper hover:bg-paper/10 transition-colors"
                >
                  <Calendar className="h-3.5 w-3.5" strokeWidth={1.8} />
                  See northern-emirates zones
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
