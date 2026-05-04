import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { VisasHero } from "@/components/visas-hero";
import {
  ServiceSection,
  type ServiceSectionData,
} from "@/components/service-section";

export const metadata: Metadata = {
  title: "UAE Visas & Residency",
  description:
    "Investor visas, the Golden visa, family sponsorship and PRO services. Smart Creation Group files, follows up and renews — keeping your residency valid while you focus on the business.",
  alternates: { canonical: "/services/visas" },
};

const sections: ServiceSectionData[] = [
  {
    id: "pro-visa",
    index: "01",
    eyebrow: "PRO services",
    title: "PRO services",
    icon: "id-card",
    lede:
      "Visa stamping, Emirates ID, labour cards and the recurring government touchpoints that keep your team legally on the ground. Our typing centre and PROs handle the queues so your staff don't.",
    image: {
      src: "/building/building-1.jpg",
      alt: "PRO desk with a UAE visa file — placeholder image",
    },
    good: [
      "Founders and HR teams who don't want to chase ICP / GDRFA portals",
      "New companies onboarding their first batch of employees",
      "Existing companies with renewals, status changes or quota issues",
      "Anyone who's tired of \"the system is down — try tomorrow\"",
    ],
    included: [
      "Visa applications, stamping and Emirates ID coordination",
      "Labour cards, MOHRE contracts and quota expansions",
      "Status changes (visit → employment, family → employment)",
      "Renewals, cancellations and exit formalities",
      "MOFA attestation and document typing in-house",
    ],
    meta: [
      { label: "Channels", value: "ICP · GDRFA · MOHRE" },
      { label: "Typing centre", value: "In-house" },
      { label: "Turnaround", value: "Same/next-day for most filings" },
      { label: "Coverage", value: "All seven emirates" },
    ],
    highlight: {
      eyebrow: "Why teams put PRO with us",
      title: "One WhatsApp away — and the file already moved.",
      body: "Tell us the request once. We open the application, follow up across the right portal, send back a confirmation and update your team. No queues. No portals. No vague \"we're checking\".",
    },
    steps: [
      "Tell us who the visa / ID is for and what changed.",
      "We collect the documents and submit on the right portal.",
      "We follow up daily until the approval lands.",
      "Stamped passport / EID delivered to you, file archived.",
    ],
  },
  {
    id: "investor-visa",
    index: "02",
    eyebrow: "Owner / shareholder route",
    title: "Investor visa",
    icon: "shield",
    lede:
      "Residency for company owners and shareholders. Two-, five- or ten-year terms depending on the structure — sponsoring you and (if you choose) your family directly through your business.",
    image: {
      src: "/building/building-3.jpg",
      alt: "UAE investor visa file — placeholder image",
    },
    good: [
      "Shareholders of UAE mainland or free-zone companies",
      "Founders who want residency tied to their own business",
      "Partners in an LLC who need their share documented for visa eligibility",
      "Owners ready to sponsor spouse and children once stamped",
    ],
    included: [
      "Eligibility check against share certificate, MOA and trade licence",
      "Establishment-card update and visa quota provisioning",
      "Entry permit, status change, medical and Emirates ID booking",
      "Visa stamping and family-sponsorship setup if needed",
      "Renewal calendar — we book it before it expires",
    ],
    meta: [
      { label: "Term options", value: "2 · 5 · 10 years" },
      { label: "Sponsors who", value: "Self + family" },
      { label: "Setup time", value: "10–15 working days" },
      { label: "Travel during", value: "Permitted with status change" },
    ],
    highlight: {
      eyebrow: "Most common pairing",
      title: "Set up the company, then sponsor yourself in the same file.",
      body: "We don't pass you to a different team for the visa. The same file owner who got your trade licence opens your investor visa, your Emirates ID, and (when you're ready) your family's residency.",
    },
    steps: [
      "Check the share certificate qualifies for the visa term you want.",
      "Open / update the establishment card and visa quota.",
      "File the entry permit and complete medical + EID.",
      "Stamp the visa — and, if needed, sponsor the family.",
    ],
  },
  {
    id: "golden-visa",
    index: "03",
    eyebrow: "10-year long-term residency",
    title: "Golden visa",
    icon: "star",
    badge: "Popular",
    lede:
      "The UAE's flagship 10-year residency. Routes for investors, entrepreneurs, specialised talent, scientists, top students and select humanitarian work. We assess your case against every category and apply through the strongest one.",
    image: {
      src: "/building/building-5.jpg",
      alt: "Golden visa application — placeholder image",
    },
    good: [
      "Founders and investors with sustained business activity in the UAE",
      "Specialised talent — doctors, executives, engineers, creative professionals",
      "Real-estate investors meeting the property-value threshold",
      "Top performers preparing to bring family long-term",
    ],
    included: [
      "Eligibility audit across all current Golden-visa categories",
      "Document pack — evidence of investment, achievement or property",
      "Nomination submission to the right authority (ICP, DET, etc.)",
      "Medical, Emirates ID and visa stamping coordination",
      "Family sponsorship under the same Golden umbrella",
    ],
    meta: [
      { label: "Term", value: "10 years · renewable" },
      { label: "Sponsors who", value: "Self · family · domestic staff" },
      { label: "Re-entry rule", value: "No 6-month limit" },
      { label: "Approval time", value: "30–45 working days typical" },
    ],
    highlight: {
      eyebrow: "How we strengthen the case",
      title: "We don't just submit — we frame the file.",
      body: "The Golden visa is a discretionary nomination. We pick the strongest category for your profile, assemble the evidence the way the authority expects to see it, and stay on the file until it's approved.",
    },
    steps: [
      "Audit your profile against all Golden-visa categories.",
      "Pick the strongest route and build the evidence pack.",
      "Submit the nomination via the right authority.",
      "Medical, EID, stamping — and family added under the same visa.",
    ],
  },
  {
    id: "family-visa",
    index: "04",
    eyebrow: "Sponsoring your family",
    title: "Family sponsorship",
    icon: "users",
    lede:
      "Bring your spouse, children and (where eligible) parents under your residency. We set the salary thresholds, attestations and tenancy requirements first — so the application doesn't get rejected after you've paid the fees.",
    image: {
      src: "/building/building-7.jpg",
      alt: "Family sponsorship paperwork — placeholder image",
    },
    good: [
      "Residents who just got their own visa and want to bring family",
      "Parents bringing children before the new school term",
      "Sponsoring an adult son (under 25, in education) or unmarried daughter",
      "Sponsoring elderly parents — usually requires extra documentation",
    ],
    included: [
      "Eligibility check against salary, tenancy and visa-type rules",
      "Attestation of marriage / birth / parent-child relationship",
      "Entry permit, status change and medical for each dependant",
      "Emirates ID enrolment for every family member",
      "Visa stamping, school-letter support and renewal reminders",
    ],
    meta: [
      { label: "Eligibility", value: "Salary + tenancy thresholds" },
      { label: "Term", value: "Matches sponsor's visa" },
      { label: "Setup time", value: "10–14 working days" },
      { label: "Renewable", value: "Yes — with sponsor's renewal" },
    ],
    highlight: {
      eyebrow: "Avoid the classic mistake",
      title: "Don't book flights before the salary letter is approved.",
      body: "Family sponsorship gets rejected most often on salary documentation, attestations or tenancy mismatches. We confirm the file is clean before applications start — so the approval lands when you expect it.",
    },
    steps: [
      "Verify salary, tenancy and visa-type eligibility for each dependant.",
      "Get marriage / birth / parent documents attested through MOFA.",
      "File entry permits and run medicals + EID enrolment.",
      "Stamp the residence visa for every family member.",
    ],
  },
];

export default function VisasPage() {
  return (
    <>
      <VisasHero />

      {sections.map((s, idx) => (
        <ServiceSection key={s.id} section={s} idx={idx} />
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
                Tell us who needs residency.{" "}
                <span className="text-brand-soft">We'll come back with a route.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-paper/75">
                Eligibility, term, sponsor structure, family — checked against the
                latest ICP and GDRFA rules and back to you within one business day.
                Free, 30-minute consultation.
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
                  href="/services/company-formation"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 bg-paper/5 backdrop-blur px-5 py-3 text-[0.9rem] text-paper hover:bg-paper/10 transition-colors"
                >
                  <Calendar className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Pair with company formation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
