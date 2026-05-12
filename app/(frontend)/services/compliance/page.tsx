import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { ComplianceHero } from "@/components/compliance-hero";
import {
  ServiceSection,
  type ServiceSectionData,
} from "@/components/service-section";

export const metadata: Metadata = {
  title: "Compliance & Licensing — Trademark, AML, ESR, UBO, Renewals",
  description:
    "Trademark filing, AML / ESR / UBO frameworks, MOFA & embassy attestation and annual licence renewals. Smart Creation Group calendars and files everything that keeps your business legal.",
  alternates: { canonical: "/services/compliance" },
};

const sections: ServiceSectionData[] = [
  {
    id: "trademark",
    index: "01",
    eyebrow: "Brand protection",
    title: "Trademark",
    icon: "copyright",
    lede:
      "Register your brand name, logo and word-marks in the UAE — and, when you're ready, internationally through the Madrid System. Most disputes start because the trademark wasn't filed early enough; we make sure yours is.",
    image: {
      src: "/services/compliance/trademark.webp",
      alt: "Trademark filing",
    },
    good: [
      "Founders launching a new brand or product line",
      "Companies expanding into a new emirate or international market",
      "Businesses that just received a copy-cat warning or threat",
      "Anyone whose name is on a contract — protect it before someone else files it",
    ],
    included: [
      "Pre-filing similarity search across UAE, GCC and key markets",
      "Class selection across the 45 Nice classification classes",
      "Application drafting, filing fee handling and Ministry follow-up",
      "Publication, opposition window and certificate issuance",
      "International filing via the Madrid Protocol — multiple countries in one file",
    ],
    meta: [
      { label: "Authority", value: "MoE — Ministry of Economy" },
      { label: "Term", value: "10 years · renewable" },
      { label: "Filing time", value: "8–12 months to certificate" },
      { label: "International", value: "Madrid Protocol — single filing, many countries" },
    ],
    highlight: {
      eyebrow: "The classic mistake",
      title: "Trade licence is not a trademark.",
      body: "Your trade licence proves you can operate. Your trademark proves the brand belongs to you. We see disputes every quarter because owners assumed the licence was enough — file the trademark while the brand is still small.",
    },
    steps: [
      "Run a similarity search across UAE and target markets.",
      "Pick the right classes (the 45-class system).",
      "File with MoE and respond to any office action.",
      "Publish, clear opposition window — receive certificate.",
    ],
  },
  {
    id: "aml-esr-ubo",
    index: "02",
    eyebrow: "Regulatory frameworks",
    title: "AML / ESR / UBO",
    icon: "badge-check",
    lede:
      "Anti-Money-Laundering frameworks, Economic Substance Regulations notifications and Ultimate Beneficial Owner filings. Each one carries fines if missed — we put the framework in place and file every cycle on time.",
    image: {
      src: "/services/compliance/aml-esr-ubo.webp",
      alt: "AML, ESR and UBO compliance",
    },
    good: [
      "DNFBPs (real estate, dealers in precious metals, accountants, advisors)",
      "Companies engaged in relevant ESR activities — IP, holding, banking, leasing",
      "Free-zone and mainland companies with multiple beneficial owners",
      "Boards needing a documented compliance framework, not just a filing",
    ],
    included: [
      "AML risk assessment, policies, KYC / EDD framework, MLRO support",
      "ESR notification and substance return filings",
      "UBO declaration filing and register maintenance",
      "Annual recertification and ongoing change reporting",
      "Investigation and audit-readiness preparation",
    ],
    meta: [
      { label: "Authorities", value: "FIU · MoE · DET · free-zone regulators" },
      { label: "Cadence", value: "Annual + change-driven filings" },
      { label: "Fines if missed", value: "AED 10k–1M · per breach" },
      { label: "Coverage", value: "Mainland · free zone · offshore" },
    ],
    highlight: {
      eyebrow: "Why these get missed",
      title: "Three filings, three authorities, three deadlines.",
      body: "AML, ESR and UBO each go to a different regulator on a different schedule. We track all three on one calendar so the year-end never becomes a fire drill — and the policies behind them are real, not template-only.",
    },
    steps: [
      "Risk-assess the entity for AML, ESR and UBO obligations.",
      "Draft policies, registers and KYC frameworks.",
      "File the relevant notifications and returns.",
      "Recertify each cycle — no missed deadlines.",
    ],
  },
  {
    id: "attestation",
    index: "03",
    eyebrow: "Document attestation",
    title: "Document attestation",
    icon: "file-signature",
    lede:
      "Notarisation, Ministry of Foreign Affairs and embassy attestation for documents you need accepted in the UAE — or UAE documents you need accepted abroad. Education certificates, marriage certificates, MOAs, powers of attorney and corporate documents.",
    image: {
      src: "/services/compliance/attestation.webp",
      alt: "Document attestation",
    },
    good: [
      "Newcomers attesting marriage, birth and education certificates",
      "Founders preparing MOAs and shareholder docs for a new entity",
      "Companies signing cross-border contracts with attested PoAs",
      "Owners taking UAE documents abroad — selling property, opening accounts",
    ],
    included: [
      "Document review — what attestation chain is required",
      "Translation through approved legal translators",
      "Notarisation, Ministry of Justice and MOFA attestation",
      "Embassy / consulate attestation for the destination country",
      "Pickup, delivery and tracking — we handle the queues",
    ],
    meta: [
      { label: "Touchpoints", value: "Notary · MoJ · MOFA · embassies" },
      { label: "Translation", value: "Legal-grade Arabic / English" },
      { label: "Turnaround", value: "3–10 working days typical" },
      { label: "Coverage", value: "Inbound and outbound documents" },
    ],
    highlight: {
      eyebrow: "Why timing matters",
      title: "The chain is sequential — get one stamp wrong and you start over.",
      body: "MOFA won't attest what wasn't notarised first. Embassies won't accept what MOFA hasn't stamped. We map the right chain for your destination country before the first stamp — so you don't lose two weeks redoing it.",
    },
    steps: [
      "Review the document and target country requirements.",
      "Translate (if required) through approved translators.",
      "Walk through Notary → MoJ → MOFA in order.",
      "Final embassy / consulate stamp — delivered ready to use.",
    ],
  },
  {
    id: "renewal",
    index: "04",
    eyebrow: "Annual maintenance",
    title: "License renewal",
    icon: "refresh-cw",
    lede:
      "Trade licence renewals across mainland, every UAE free zone and offshore. We run the calendar, send the invoice, file before expiry and keep a clean activity history — so your licence never lapses and your operations never stop.",
    image: {
      src: "/services/compliance/renewal.webp",
      alt: "Annual licence renewal",
    },
    good: [
      "Companies that missed a renewal once and don't want to repeat it",
      "Multi-entity groups managing licences across several jurisdictions",
      "Founders who want a single point of accountability for renewals",
      "Owners about to travel — get the renewal closed before you leave",
    ],
    included: [
      "Renewal calendar with reminders 60 / 30 / 7 days before expiry",
      "Tenancy contract / Ejari renewal coordination if required",
      "Authority filings — DET, free-zone authority or offshore registry",
      "Activity audit — add, remove or amend activities at renewal",
      "Trade licence reissued and circulated to your team",
    ],
    meta: [
      { label: "Coverage", value: "Mainland · all free zones · offshore" },
      { label: "Reminder cadence", value: "60 / 30 / 7 days" },
      { label: "Lapse policy", value: "We file before expiry — no fines" },
      { label: "Bundles", value: "Combine with PRO, Ejari, accounting" },
    ],
    highlight: {
      eyebrow: "Why we never let a licence lapse",
      title: "We don't ask you to remember — we just file.",
      body: "Renewals get missed because they're tied to one busy person. We hold the calendar, prep the invoice, follow up if anything's outstanding, and file before the deadline. Your only role is to approve.",
    },
    steps: [
      "Audit the licence — activities, ownership, address, validity.",
      "Renew the tenancy / Ejari if it underpins the licence.",
      "File with the authority before the expiry date.",
      "Reissued licence delivered, calendar updated for next year.",
    ],
  },
];

export default function CompliancePage() {
  return (
    <>
      <ComplianceHero />

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
                Send us your trade licence.{" "}
                <span className="text-brand-soft">We'll tell you what's coming up.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-paper/75">
                Trademark gaps, AML / ESR / UBO obligations, attestation needs and
                renewal dates — assessed and back to you within one business day.
                Free, 30-minute review.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:text-right">
              <div className="inline-flex flex-col gap-3 lg:items-end">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink hover:bg-paper transition-colors"
                >
                  Run a compliance check
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </Link>
                <Link
                  href="/services/financial"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 bg-paper/5 backdrop-blur px-5 py-3 text-[0.9rem] text-paper hover:bg-paper/10 transition-colors"
                >
                  <Calendar className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Pair with finance & tax
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
