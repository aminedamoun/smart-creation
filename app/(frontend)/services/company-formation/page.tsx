import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { CompanyFormationHero } from "@/components/company-formation-hero";
import {
  ServiceSection,
  type ServiceSectionData,
} from "@/components/service-section";

export const metadata: Metadata = {
  title: "Company Formation in the UAE",
  description:
    "Mainland, free zone, offshore and holding-company formation across the UAE. Smart Creation Group handles licensing, banking introductions and PRO services end-to-end — trusted since 2013.",
  alternates: { canonical: "/services/company-formation" },
};

const sections: ServiceSectionData[] = [
  {
    id: "mainland",
    index: "01",
    eyebrow: "Onshore licensing",
    title: "Mainland setup",
    icon: "building",
    lede:
      "Trade anywhere in the UAE — including direct contracts with government, hotels, malls and other onshore entities. Most of our clients setting up to actively serve the local market choose mainland for the freedom and credibility it carries.",
    image: {
      src: "/services/company-formation/mainland.webp",
      alt: "Dubai mainland setup",
    },
    good: [
      "Selling B2B or B2C inside the UAE without restriction",
      "Tendering for government and semi-government work",
      "Operating retail, F&B, salons or any storefront business",
      "Hiring local staff with no visa quota cap on most activities",
    ],
    included: [
      "Initial activity & legal-form advisory (LLC, sole establishment, branch)",
      "Trade name reservation and DET initial approval",
      "MOA drafting and notarisation, including foreign-shareholder structures",
      "Ejari office tenancy contract — issued in-house from our centres",
      "Trade licence issuance and immigration / labour file activation",
    ],
    meta: [
      { label: "Authority", value: "DET (formerly DED) Dubai" },
      { label: "Foreign ownership", value: "100% on most activities" },
      { label: "Setup time", value: "5–10 working days" },
      { label: "Office requirement", value: "Ejari-compliant — included" },
    ],
    highlight: {
      eyebrow: "Why clients pick us for mainland",
      title: "We hold the office, the licence and the PRO file in one place.",
      body: "Same team handles your DET application, Ejari, MOA, banking introduction and visa quota. No agency hand-offs, no chasing — one file owner from name reservation to your first hire.",
    },
    steps: [
      "Pick the activity and legal form (LLC, sole estab., branch).",
      "Reserve trade name, get DET initial approval.",
      "Sign Ejari from one of our centres and notarise the MOA.",
      "Trade licence issued — open immigration file and start hiring.",
    ],
  },
  {
    id: "free-zone",
    index: "02",
    eyebrow: "Free zone licensing",
    title: "Free zone setup",
    icon: "globe",
    lede:
      "100% foreign ownership, 0% personal income tax, fast-tracked licensing and a defined activity list. We work across every major UAE free zone — IFZA, DMCC, JAFZA, DIFC, RAKEZ, SHAMS, DAFZA, Meydan and more.",
    image: {
      src: "/services/company-formation/free-zone.webp",
      alt: "Dubai free zone setup",
    },
    good: [
      "International trading, holding intellectual property, e-commerce",
      "Consulting, agency, media, technology and digital services",
      "Investors who want minimum overhead and fastest setup",
      "Founders who don't need to invoice the local UAE market directly",
    ],
    included: [
      "Free-zone shortlist with cost, activity-list and visa-quota comparison",
      "Application package, KYC and shareholder-document attestation",
      "Lease — flexi desk, executive desk, smart office or full unit",
      "Establishment card, immigration file, e-channel registration",
      "Bank account introduction with two suitable UAE banks",
    ],
    meta: [
      { label: "Jurisdictions covered", value: "All major UAE free zones" },
      { label: "Ownership", value: "100% foreign" },
      { label: "Setup time", value: "3–7 working days" },
      { label: "Tax", value: "0% personal · 9% corporate above AED 375k" },
    ],
    highlight: {
      eyebrow: "How we choose the right zone",
      title: "Match the activity, the cost band and the visa quota — not the brochure.",
      body: "We compare every viable zone for your activity, factoring renewal cost, visa cap, lease type, banking acceptance and corporate-tax exposure. You get a one-page recommendation, not a sales pitch.",
    },
    steps: [
      "Shortlist the zones that match your activity.",
      "Compare cost, visa quota, lease type — pick the winner.",
      "Submit application, KYC and attested documents.",
      "Licence + immigration file issued — open the bank account.",
    ],
  },
  {
    id: "offshore",
    index: "03",
    eyebrow: "International structuring",
    title: "Offshore structure",
    icon: "shield",
    lede:
      "An offshore company holds assets, IP or shares — it doesn't trade inside the UAE. Right for asset protection, international holding, succession planning and ring-fencing IP from operating entities.",
    image: {
      src: "/services/company-formation/offshore.webp",
      alt: "Offshore corporate structure",
    },
    good: [
      "Holding shares of UAE or foreign operating companies",
      "Owning real estate, vessels, investments or intangibles",
      "Estate planning and family governance",
      "Ring-fencing intellectual property from trading risk",
    ],
    included: [
      "Jurisdiction selection — JAFZA Offshore, RAK ICC or Ajman Offshore",
      "Memorandum & Articles drafted to your shareholder structure",
      "Registered agent and registered office (mandatory) — provided in-house",
      "Apostilled / attested certificate of incorporation and company set",
      "Optional opening of a UAE corporate bank account",
    ],
    meta: [
      { label: "Jurisdictions", value: "JAFZA · RAK ICC · Ajman" },
      { label: "Trade locally", value: "Not permitted" },
      { label: "Setup time", value: "3–10 working days" },
      { label: "Annual reporting", value: "Minimal — varies by jurisdiction" },
    ],
    highlight: {
      eyebrow: "Common pairing",
      title: "Offshore on top, free zone or mainland below.",
      body: "We typically structure clients with an offshore holding company that owns the trading entity. Cleaner shareholder layer, simpler exits, and protection between the asset-holding company and operational risk.",
    },
    steps: [
      "Decide what the offshore co. will hold and where to register.",
      "Draft the M&A and shareholder structure.",
      "File with the registered agent — receive incorporation set.",
      "Apostille / attest the documents for international use.",
    ],
  },
  {
    id: "holding",
    index: "04",
    eyebrow: "Group structuring",
    title: "Holding & subsidiary",
    icon: "network",
    lede:
      "Build a parent → subsidiary group across multiple jurisdictions. Right for founders running several brands, investors with multiple verticals, or operators who need to separate IP, trading and real-estate arms.",
    image: {
      src: "/services/company-formation/holding.webp",
      alt: "Holding & subsidiary group structure",
    },
    good: [
      "Family offices and multi-brand operators",
      "Founders ring-fencing risk between business lines",
      "Holding intellectual property in one entity, licensing it to operators",
      "Preparing the cap table for outside investment or acquisition",
    ],
    included: [
      "Group-structure design — parent, sub-holdings and operating subs",
      "Shareholder agreements and inter-company licensing terms",
      "Coordinated incorporation across mainland, free zone and offshore",
      "Corporate-tax grouping advisory and transfer-pricing readiness",
      "Centralised compliance calendar — renewals, ESR, UBO, AML",
    ],
    meta: [
      { label: "Typical layers", value: "Holding → ops → IP / RE" },
      { label: "Tax group eligible", value: "Often yes (UAE CT)" },
      { label: "Setup time", value: "2–6 weeks end-to-end" },
      { label: "Ongoing", value: "Single point of compliance with us" },
    ],
    highlight: {
      eyebrow: "We structure for the future, not just today",
      title: "A clean structure now saves a painful restructure before exit.",
      body: "We design the group with corporate tax, future investment, and an eventual sale in mind — so when the time comes, your cap table, IP and operating entities don't need to be unwound and rebuilt under deal pressure.",
    },
    steps: [
      "Map out the brands, IP and operating entities you need.",
      "Design parent / sub-holding / operating layers.",
      "Incorporate across mainland, free zone and offshore in lockstep.",
      "Wire up shareholder agreements, IP licences and CT grouping.",
    ],
  },
];

export default function CompanyFormationPage() {
  return (
    <>
      <CompanyFormationHero />

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
                Tell us what you're building.{" "}
                <span className="text-brand-soft">We'll come back with a plan.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-paper/75">
                Jurisdiction, costs, timeline, banking, visa quota — written up
                within one business day. Free, 45-minute consultation. No sales
                script.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:text-right">
              <div className="inline-flex flex-col gap-3 lg:items-end">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink hover:bg-paper transition-colors"
                >
                  Book consultation
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </Link>
                <Link
                  href="/business-centers"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 bg-paper/5 backdrop-blur px-5 py-3 text-[0.9rem] text-paper hover:bg-paper/10 transition-colors"
                >
                  <Calendar className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Tour our business centres
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
