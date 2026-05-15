import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { AffiliatedCompaniesHero } from "@/components/affiliated-companies-hero";
import {
  ServiceSection,
  type ServiceSectionData,
} from "@/components/service-section";

export const metadata: Metadata = {
  title: "Group Companies — Smart Creation Group",
  description:
    "Six specialist companies under Smart Creation Group across the UAE, Canada and Pakistan. Smart Business Creation, Next Journey Technology, Smart Holiday Homes, Intercity Bus, MM Contractor and Immersion Social.",
  alternates: { canonical: "/affiliated-companies" },
};

const sections: ServiceSectionData[] = [
  {
    id: "smart-business-creation",
    index: "01",
    eyebrow: "Business Setup · UAE 🇦🇪",
    title: "Smart Business Creation LLC",
    icon: "building",
    logoSrc: "/group-logos/smart-business-creation.webp",
    mediaMode: "logo",
    lede:
      "The founding company of the Group. Smart Business Creation has licensed, banked and visa'd more than 10,000 businesses across every UAE jurisdiction since 2013. Mainland, free zone, offshore, holding structures and the day-to-day PRO file every founder lives inside.",
    image: {
      src: "/group-logos/smart-business-creation.webp",
      alt: "Smart Business Creation",
    },
    good: [
      "Founders setting up a Dubai or UAE company for the first time",
      "Multinationals opening a regional HQ or local entity",
      "Investors building a holding-company structure",
      "Existing companies migrating from another agent",
    ],
    included: [
      "End-to-end licensing — mainland, free zone, offshore",
      "Banking introductions with 10+ UAE banking partners",
      "Investor, employment and family-visa processing in-house",
      "Office space at any of the six owned business centres",
      "Annual renewals, audit and Corporate Tax filings",
    ],
    meta: [
      { label: "Founded", value: "2013" },
      { label: "Companies launched", value: "10,000+" },
      { label: "Country", value: "UAE 🇦🇪" },
      { label: "HQ", value: "Damac Executive Heights, Tecom" },
    ],
    highlight: {
      eyebrow: "Why founders come back",
      title: "One accountable team, no broker chain.",
      body: "The same person who reads your brief gets your licence, opens the bank account, and stamps the visa. No agency hand-offs, no surprises.",
    },
    steps: [
      "Brief us on the activity, ownership and team size.",
      "Receive a costed, written setup plan within one business day.",
      "We file the licence, run banking, secure visas in parallel.",
      "Operate from one of our six centres or your own address.",
      "We renew, file and refile every year, on the calendar.",
    ],
  },
  {
    id: "next-journey",
    index: "02",
    eyebrow: "Technology · UAE 🇦🇪",
    title: "Next Journey Technology LLC",
    icon: "globe",
    logoSrc: "/group-logos/next-journey.webp",
    mediaMode: "logo",
    lede:
      "The Group's technology arm. Next Journey Technology builds and manages the digital backbone of Smart Creation's clients — websites, customer portals, in-house CRMs, integrations and the IT infrastructure that keeps Dubai operations running.",
    image: {
      src: "/group-logos/next-journey.webp",
      alt: "Next Journey Technology",
    },
    good: [
      "Companies launching with a website, brand and CRM from day one",
      "Existing UAE businesses modernising their stack",
      "Startups needing IT support without hiring full-time",
      "Brands wanting paid-search, SEO and content support",
    ],
    included: [
      "Brand-led website design and development",
      "Customer portals, dashboards and internal tools",
      "CRM setup and third-party integrations",
      "IT support, mailbox provisioning and infrastructure",
      "Digital marketing — SEO, paid search, content",
    ],
    meta: [
      { label: "Sector", value: "Technology & Marketing" },
      { label: "Country", value: "UAE 🇦🇪" },
      { label: "Best for", value: "End-to-end digital launch" },
    ],
    highlight: {
      eyebrow: "Built for founders",
      title: "Launch your licence and your website in the same week.",
      body: "We treat the digital launch as part of the company setup file, not a separate vendor relationship. Same team, same accountability.",
    },
    steps: [
      "Discovery: domain, brand, scope of the digital launch.",
      "Design: brand kit, site layout and copy direction.",
      "Build: ship the site, CRM and email — in days, not months.",
      "Operate: ongoing support, content and performance work.",
    ],
  },
  {
    id: "smart-holiday-homes",
    index: "03",
    eyebrow: "Hospitality · UAE 🇦🇪",
    title: "Smart Holiday Homes",
    icon: "star",
    logoSrc: "/group-logos/smart-holiday-homes.webp",
    mediaMode: "logo",
    lede:
      "Furnished, hotel-grade short-term rentals across Dubai. Smart Holiday Homes manages the full guest experience — welcome, cleaning, maintenance, listings and pricing — so owners can convert their apartment into a yield-generating asset without the day-to-day operations.",
    image: {
      src: "/group-logos/smart-holiday-homes.webp",
      alt: "Smart Holiday Homes",
    },
    good: [
      "Owners with an apartment they want to rent short-term",
      "Investors buying-to-let in Dubai's premium districts",
      "Visiting founders and family-office principals",
      "Long-stay business travellers on relocation",
    ],
    included: [
      "Listing on Airbnb, Booking.com and direct channels",
      "DTCM licensing and ongoing compliance",
      "Dynamic pricing tuned to seasonality and events",
      "Professional cleaning, linen and maintenance",
      "Guest welcome, key handover and 24/7 support",
    ],
    meta: [
      { label: "Sector", value: "Short-term rentals" },
      { label: "Country", value: "UAE 🇦🇪" },
      { label: "Licence", value: "DTCM-registered operator" },
    ],
    highlight: {
      eyebrow: "Hands-off ownership",
      title: "Your unit, our operations. Your numbers, on a clean dashboard.",
      body: "We set the right price, keep the property hotel-clean and surface clear monthly statements. Owners stay in control without lifting a finger.",
    },
    steps: [
      "Property assessment and pricing strategy.",
      "DTCM licensing and listing setup.",
      "Photography, staging and channel publication.",
      "Day-to-day guest operations, cleaning and maintenance.",
      "Monthly statement, payouts and tax assistance.",
    ],
  },
  {
    id: "intercity-bus",
    index: "04",
    eyebrow: "Transport · Canada 🇨🇦",
    title: "Intercity Bus Service",
    icon: "globe",
    logoSrc: "/group-logos/intercity-bus.webp",
    mediaMode: "logo",
    lede:
      "Premier intercity bus operator based in London, Ontario. Scheduled routes, private charters and a value-card programme — built for daily commuters, students and corporate transport across southern Ontario.",
    image: {
      src: "/group-logos/intercity-bus.webp",
      alt: "Intercity Bus Service",
    },
    good: [
      "Daily commuters across southern Ontario",
      "Universities and student associations",
      "Corporate groups, weddings and event transport",
      "Tour operators planning multi-day routes",
    ],
    included: [
      "Scheduled intercity routes from London, Ontario",
      "Private charter for groups, weddings and events",
      "Value-card programme for frequent travellers",
      "Modern, accessible fleet with on-board comfort",
      "Driver training, insurance and full safety compliance",
    ],
    meta: [
      { label: "Sector", value: "Transport & logistics" },
      { label: "Country", value: "Canada 🇨🇦" },
      { label: "Base", value: "London, Ontario" },
    ],
    highlight: {
      eyebrow: "Reliable transport, every route",
      title: "On-time intercity travel, run by an operator that answers the phone.",
      body: "From single-trip riders to weekly corporate contracts, Intercity Bus delivers the same standard of operations our UAE clients have trusted since 2013.",
    },
    steps: [
      "Pick a route or request a charter.",
      "Confirm pricing and schedule.",
      "Ride: comfortable, on-time, every day.",
      "Frequent rider? Save with the value-card programme.",
    ],
  },
  {
    id: "mm-contractor",
    index: "05",
    eyebrow: "Construction · Pakistan 🇵🇰",
    title: "MM Contractor & General Order Supplies",
    icon: "shield",
    logoSrc: "/group-logos/mm-contractor.webp",
    mediaMode: "logo",
    lede:
      "Pakistan-based contracting arm of the Group. MM Contractor handles civil works, road development, infrastructure projects and general order supplies for public-sector and private-sector clients across Punjab.",
    image: {
      src: "/group-logos/mm-contractor.webp",
      alt: "MM Contractor & General Order Supplies",
    },
    good: [
      "Government infrastructure tenders in Pakistan",
      "Road development and civil works",
      "Industrial site preparation and excavation",
      "Bulk order supplies for public projects",
    ],
    included: [
      "Tender preparation, technical bid and pricing",
      "Project management and on-site supervision",
      "Civil works — roads, drainage, foundations",
      "General order supplies for public-sector contracts",
      "Compliance and reporting to procurement bodies",
    ],
    meta: [
      { label: "Sector", value: "Construction & infrastructure" },
      { label: "Country", value: "Pakistan 🇵🇰" },
      { label: "Operating since", value: "2021" },
    ],
    highlight: {
      eyebrow: "Built to spec, on the calendar",
      title: "Projects delivered on schedule, under public-sector standards.",
      body: "Our contracting arm follows the same discipline as our UAE operations — accountable project owners, transparent reporting, no surprises at handover.",
    },
    steps: [
      "Review tender or scope documents.",
      "Submit technical and commercial bid.",
      "Mobilise: site, equipment and crew.",
      "Execute with weekly progress reporting.",
      "Hand over, with compliance and warranty.",
    ],
  },
  {
    id: "immersion-social",
    index: "06",
    eyebrow: "Experiences · UAE 🇦🇪",
    title: "Immersion Social",
    icon: "users",
    logoSrc: "/group-logos/immersion.webp",
    mediaMode: "logo",
    lede:
      "The Group's experiences arm. Immersion Social designs events, brand activations, curated dinners and member-style gatherings that connect founders, clients and partners across Dubai's business community.",
    image: {
      src: "/group-logos/immersion.webp",
      alt: "Immersion Social",
    },
    good: [
      "Brands launching in the UAE that need a launch event",
      "Founders building a network in their first year in Dubai",
      "Family offices hosting curated dinners and gatherings",
      "Sponsors looking for a credible business audience",
    ],
    included: [
      "Concept, venue scouting and creative direction",
      "Guest curation and invitation management",
      "Production — staging, F&B, content capture",
      "Brand activation and on-site experience design",
      "Post-event content, photography and follow-up",
    ],
    meta: [
      { label: "Sector", value: "Events & experiences" },
      { label: "Country", value: "UAE 🇦🇪" },
      { label: "Audience", value: "Founders, investors, partners" },
    ],
    highlight: {
      eyebrow: "Quiet rooms, the right people",
      title: "Curated experiences that lead to real business relationships.",
      body: "We don't run mass conferences. Immersion is small-format and high-trust — the kind of room where conversations turn into work the same week.",
    },
    steps: [
      "Define the audience and the outcome.",
      "Concept, venue and creative direction.",
      "Curate the guest list — quality over headcount.",
      "Run the event end-to-end.",
      "Follow-up: content, intros and next-step planning.",
    ],
  },
];

export default function AffiliatedCompaniesPage() {
  return (
    <>
      <AffiliatedCompaniesHero />

      {sections.map((s, idx) => (
        <ServiceSection key={s.id} section={s} idx={idx} />
      ))}

      {/* CTA */}
      <section className="py-20 md:py-28 bg-ink text-paper border-t border-paper/10">
        <div className="container-edit">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-10 items-center">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-mist mb-4">
                <span className="h-px w-8 bg-mist/40" />§ Work with the Group
              </div>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-paper text-balance max-w-3xl">
                One brief in.{" "}
                <span className="text-brand-soft">The right Group arm out.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-paper/75">
                Tell us what you need — business setup, technology, hospitality,
                transport, contracting or experiences — and we&apos;ll route it
                to the right team. Same standard, same accountability across
                every company.
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
