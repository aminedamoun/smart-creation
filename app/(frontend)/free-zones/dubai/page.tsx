import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { DubaiZonesHero } from "@/components/dubai-zones-hero";
import {
  FreeZoneSpotlight,
  type FreeZoneSpotlightData,
} from "@/components/free-zone-spotlight";

export const metadata: Metadata = {
  title: "Dubai Free Zones — IFZA, DMCC, JAFZA, DIFC & More",
  description:
    "All eight major Dubai free zones — IFZA, DMCC, JAFZA, DIFC, Meydan, DAFZA, DWTC, DCC. Compare activity lists, cost bands and visa quotas, then apply through the right one.",
  alternates: { canonical: "/free-zones/dubai" },
};

const zones: FreeZoneSpotlightData[] = [
  {
    id: "ifza",
    index: "01",
    code: "IFZA",
    name: "International Free Zone Authority",
    eyebrow: "Most popular all-rounder",
    emirate: "Dubai · Silicon Oasis",
    logoSrc: "/free-zones/ifza.png",
    image: { src: "/building/building-3.jpg", alt: "IFZA — Dubai Silicon Oasis" },
    lede:
      "Dubai's most-applied-for free zone. Wide activity list, low setup cost, fast turnaround. The default starting point for consultancies, trading firms and small teams that need a clean licence quickly.",
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
    code: "DMCC",
    name: "Multi Commodities Centre",
    eyebrow: "Premium · global trade",
    emirate: "Dubai · JLT",
    logoSrc: "/free-zones/dmcc.png",
    image: { src: "/building/building-4.jpg", alt: "DMCC — JLT" },
    lede:
      "The gold standard for traders, commodity firms and serious global businesses. Higher cost, higher prestige, premier location at Jumeirah Lakes Towers and a bank-friendly reputation.",
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
    id: "jafza",
    index: "03",
    code: "JAFZA",
    name: "Jebel Ali Free Zone",
    eyebrow: "Industrial & port-side",
    emirate: "Dubai · Jebel Ali",
    logoSrc: "/free-zones/jafza.png",
    image: { src: "/building/building-2.jpg", alt: "JAFZA — Jebel Ali" },
    lede:
      "The UAE's industrial heart. Direct port access, large warehouse and plot leases, customs bonded zone. Right for manufacturing, heavy logistics, import-export at scale and businesses that move physical goods.",
    good: [
      "Manufacturing, assembly and industrial businesses",
      "Import-export firms moving sea or air freight",
      "Logistics and 3PL operators needing warehouse space",
      "Trading houses with bonded-warehouse needs",
    ],
    included: [
      "Activity classification under JAFZA's industrial codes",
      "Plot, warehouse or office shortlist with build-out advisory",
      "Customs registration and bonded-zone access",
      "Establishment card, labour file and immigration setup",
      "Lease, licence and operational launch coordination",
    ],
    meta: [
      { label: "Authority", value: "JAFZA · Jebel Ali Port" },
      { label: "Setup time", value: "5–10 working days" },
      { label: "Visa quota", value: "Tied to lease size" },
      { label: "Year-one cost", value: "Depends on lease size" },
    ],
    highlight: {
      eyebrow: "Why JAFZA matters",
      title: "Bonded customs zone, port adjacent.",
      body: "If you're moving containers, JAFZA's port adjacency and bonded zone save weeks of customs handling per year. We coordinate the lease, the licence and the customs file together — so your first shipment lands clean.",
    },
    steps: [
      "Pick lease type — office, warehouse or plot.",
      "Submit application + customs registration.",
      "Sign lease, build-out begins.",
      "Licence + customs file activated.",
    ],
  },
  {
    id: "difc",
    index: "04",
    code: "DIFC",
    name: "International Financial Centre",
    eyebrow: "Finance & professional",
    emirate: "Dubai · DIFC",
    logoSrc: "/free-zones/difc.png",
    image: { src: "/building/building-5.jpg", alt: "DIFC — Dubai" },
    lede:
      "The region's financial district. Common-law jurisdiction, independent regulator (DFSA), home to most major banks, asset managers and fintechs. A serious commitment, but unmatched for finance.",
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
    index: "05",
    code: "MEYDAN",
    name: "Meydan Free Zone",
    eyebrow: "Professional services",
    emirate: "Dubai · Meydan",
    logoSrc: "/free-zones/meydan.png",
    image: { src: "/building/building-6.jpg", alt: "Meydan — Dubai" },
    lede:
      "Quick licensing for professional services, consulting, marketing and digital businesses. Affordable and fast, with a smart-office concept that suits 1–5 person teams.",
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
    id: "dafza",
    index: "06",
    code: "DAFZA",
    name: "Dubai Airport Free Zone",
    eyebrow: "Aviation & e-commerce",
    emirate: "Dubai · DXB-adjacent",
    logoSrc: "/free-zones/dafza.png",
    image: { src: "/building/building-7.jpg", alt: "DAFZA — Dubai Airport" },
    lede:
      "Adjacent to DXB, ideal for aviation services, MRO, e-commerce fulfilment and any business that benefits from airside proximity. Strong logistics ecosystem and bonded-warehouse options.",
    good: [
      "Aviation services, MRO, parts trading",
      "E-commerce fulfilment with global air freight needs",
      "High-value goods import — pharma, electronics, fashion",
      "Companies serving the airport ecosystem directly",
    ],
    included: [
      "Activity classification under DAFZA's logistics-heavy list",
      "Office, warehouse or fulfilment-centre lease",
      "Customs registration and bonded-zone access",
      "Establishment card, residence visas, immigration file",
      "Banking introduction and e-commerce payment-gateway support",
    ],
    meta: [
      { label: "Authority", value: "DAFZA · DXB-adjacent" },
      { label: "Setup time", value: "5–7 working days" },
      { label: "Visa quota", value: "Tied to lease type" },
      { label: "Year-one cost", value: "From AED 25,000" },
    ],
    highlight: {
      eyebrow: "Why DAFZA for e-commerce",
      title: "Air freight + bonded warehousing in one zone.",
      body: "Cross-border e-commerce lives or dies on shipment lead time. DAFZA gives you airside warehousing and customs clearance in one walk — your reorder cycle shortens from weeks to days.",
    },
    steps: [
      "Match activity to DAFZA's classification.",
      "Pick the right lease — office, warehouse, fulfilment.",
      "Customs file + bonded-zone access activated.",
      "Licence + immigration file issued.",
    ],
  },
  {
    id: "dwtc",
    index: "07",
    code: "DWTC",
    name: "Dubai World Trade Centre",
    eyebrow: "Events & business services",
    emirate: "Dubai · Sheikh Zayed Road",
    logoSrc: "/free-zones/dwtc.png",
    image: { src: "/building/building-1.jpg", alt: "DWTC — Sheikh Zayed Road" },
    lede:
      "The events, exhibitions and business-services hub right on Sheikh Zayed Road. Right for event organisers, conference businesses, professional services with a central address.",
    good: [
      "Event-management, conference and exhibitions companies",
      "Marketing agencies tied to the events industry",
      "Professional services valuing a central SZR address",
      "Trading firms with showroom-adjacent needs",
    ],
    included: [
      "Activity classification against DWTC's services-heavy list",
      "Office lease in DWTC towers / Trade Centre district",
      "Application, KYC and shareholder docs",
      "Establishment card, immigration file, visa quota",
      "Banking introduction and operations setup",
    ],
    meta: [
      { label: "Authority", value: "DWTC FZ · Sheikh Zayed Road" },
      { label: "Setup time", value: "5–7 working days" },
      { label: "Visa quota", value: "Tied to office size" },
      { label: "Year-one cost", value: "From AED 22,500" },
    ],
    highlight: {
      eyebrow: "Why DWTC's address matters",
      title: "Sheikh Zayed Road, walking distance to every event.",
      body: "If your business runs adjacent to events — exhibitions, conferences, trade shows — DWTC puts you in the building. Saves your team commute time across the year, builds presence with the right audience.",
    },
    steps: [
      "Match activity to DWTC's services list.",
      "Lease office in DWTC complex.",
      "Submit application + KYC.",
      "Licence + immigration file issued.",
    ],
  },
  {
    id: "dcc",
    index: "08",
    code: "DCC",
    name: "Dubai CommerCity",
    eyebrow: "Pure e-commerce zone",
    emirate: "Dubai · CommerCity",
    logoSrc: "/free-zones/dcc.png",
    image: { src: "/building/building-8.jpg", alt: "DCC — Dubai" },
    lede:
      "The UAE's first dedicated e-commerce free zone. Built around fulfilment, last-mile and digital retail. Right for online brands, marketplace sellers and D2C operators serving GCC and beyond.",
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
];

export default function DubaiZonesPage() {
  return (
    <>
      <DubaiZonesHero />

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
