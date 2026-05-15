import type { Metadata } from "next";
import { LegalPageLayout, type LegalSection } from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Privacy Policy — Smart Creation Group",
  description:
    "How Smart Creation Group collects, uses, stores and shares personal data, your rights as a data subject, and how to contact our team about your information.",
  alternates: { canonical: "/privacy" },
};

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          Smart Creation Group of Companies (&ldquo;Smart Creation&rdquo;,
          &ldquo;we&rdquo;, &ldquo;our&rdquo; or &ldquo;us&rdquo;) is a U.A.E.
          business-setup consultancy operating six owned business centres
          across Dubai and serving founders, family offices and multinationals
          since 2013. Our registered address is 19th Floor, Damac Executive
          Heights, Barsha Heights (Tecom), Dubai, U.A.E.
        </p>
        <p>
          This Privacy Policy explains what personal data we collect when you
          visit thesmartcreation.com or engage our services, why we collect
          it, who we share it with and what rights you have over it.
        </p>
      </>
    ),
  },
  {
    id: "data-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p>We collect personal data in three ways:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium text-ink">
              Information you give us
            </span>{" "}
            when you fill in our contact form, book a consultation, request a
            cost estimate, subscribe to our newsletter or sign a service
            agreement: name, email, phone number, company name, jurisdiction
            preference, visa count and the details of your enquiry.
          </li>
          <li>
            <span className="font-medium text-ink">
              Information collected automatically
            </span>{" "}
            when you visit our website: IP address, browser type, device,
            pages viewed, referring URL and timestamps. See our{" "}
            <a href="/cookies" className="underline hover:text-ink">
              Cookies Policy
            </a>{" "}
            for details.
          </li>
          <li>
            <span className="font-medium text-ink">
              Information from third parties
            </span>{" "}
            such as banks we introduce you to, free-zone authorities, the FTA
            and other government bodies when required to process your file.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use your data",
    body: (
      <>
        <p>We use the personal data you share with us to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Respond to your enquiry and provide a costed proposal.</li>
          <li>
            Set up your U.A.E. company, file your visa or process your tax
            registration where you have engaged us to do so.
          </li>
          <li>
            Introduce you to U.A.E. banking partners (only after your express
            consent).
          </li>
          <li>
            Comply with our legal obligations under U.A.E. law, including
            anti-money-laundering (AML), ESR, UBO and Corporate Tax filings.
          </li>
          <li>
            Send you renewal reminders, regulatory updates and (only with your
            consent) our newsletter.
          </li>
          <li>Improve the website and the services we provide.</li>
        </ul>
      </>
    ),
  },
  {
    id: "lawful-basis",
    title: "Lawful basis for processing",
    body: (
      <>
        <p>
          Where applicable, we process your personal data on one of the
          following lawful bases under U.A.E. Federal Decree-Law No. 45 of 2021
          on the Protection of Personal Data and, where relevant, the EU
          General Data Protection Regulation (GDPR):
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium text-ink">Performance of a contract</span>{" "}
            — to provide the services you engaged us to perform.
          </li>
          <li>
            <span className="font-medium text-ink">Consent</span> — when you
            subscribe to our newsletter or opt-in to marketing.
          </li>
          <li>
            <span className="font-medium text-ink">Legitimate interests</span>{" "}
            — to manage and improve our business and respond to enquiries.
          </li>
          <li>
            <span className="font-medium text-ink">Legal obligation</span> —
            for AML, ESR, UBO, Corporate Tax and other regulatory filings.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share your data with",
    body: (
      <>
        <p>
          We share personal data only when necessary to deliver the services
          you have asked for, or when required by law. Recipients can include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            U.A.E. licensing authorities (DET, free zones, MOFA, GDRFA, ICP)
            and the Federal Tax Authority.
          </li>
          <li>
            Banks and payment partners where we are facilitating an account
            opening on your instruction.
          </li>
          <li>
            Auditors, lawyers and notaries engaged in connection with your
            file.
          </li>
          <li>
            Technology providers that host our infrastructure, send our email
            and run our analytics (Supabase, Vercel, Google).
          </li>
        </ul>
        <p>
          We do not sell your personal data, and we do not share it with third
          parties for their own marketing.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep your data",
    body: (
      <>
        <p>
          We keep your personal data only for as long as we need it to perform
          our services or to comply with our legal obligations. Specifically:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Enquiry data (contact form, calculator submissions): up to 24
            months from your last contact.
          </li>
          <li>
            Engagement files (licences, banking, visas, accounting): a minimum
            of five years after the end of the engagement, in line with U.A.E.
            commercial-law retention requirements.
          </li>
          <li>
            Newsletter subscribers: until you unsubscribe.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access the personal data we hold about you.</li>
          <li>Correct any inaccurate or incomplete information.</li>
          <li>
            Request deletion of your data where we no longer need it for the
            purposes outlined above.
          </li>
          <li>
            Object to or restrict our processing of your data in certain
            cases.
          </li>
          <li>Withdraw consent at any time, where consent is the basis.</li>
          <li>Receive a portable copy of the data you provided to us.</li>
        </ul>
        <p>
          To exercise any of these rights, email us at the address below. We
          aim to respond within 30 days.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <>
        <p>
          We protect your information using industry-standard measures:
          encrypted transport (HTTPS / TLS), encrypted storage, access
          controls, and regular reviews of who in our team can see what. We
          run our infrastructure on tier-one providers with SOC-2-aligned
          practices.
        </p>
        <p>
          No system is ever 100% secure. If we ever experience a personal-data
          breach that affects you, we will notify you and the relevant U.A.E.
          authority without undue delay.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this Privacy Policy as our services or applicable laws
        change. The &ldquo;Last updated&rdquo; date at the top reflects the
        most recent version. Material changes will be announced on this page
        and, where appropriate, via email.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="Smart Creation Group respects your privacy. This policy explains what data we collect, why we collect it, who we share it with, and the rights you have over your information."
      lastUpdated="15 May 2026"
      sections={sections}
      current="privacy"
    />
  );
}
