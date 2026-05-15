import type { Metadata } from "next";
import { LegalPageLayout, type LegalSection } from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Terms of Service — Smart Creation Group",
  description:
    "The terms that govern the use of thesmartcreation.com and the services we provide — engagement, fees, intellectual property, liability and the law applied.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    body: (
      <>
        <p>
          By accessing thesmartcreation.com or engaging Smart Creation Group
          of Companies (&ldquo;Smart Creation&rdquo;, &ldquo;we&rdquo;,
          &ldquo;our&rdquo;) to deliver any of our services, you agree to
          these Terms of Service together with the separate{" "}
          <a href="/privacy" className="underline hover:text-ink">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/cookies" className="underline hover:text-ink">
            Cookies Policy
          </a>
          . If you do not agree, please do not use the site or engage our
          services.
        </p>
      </>
    ),
  },
  {
    id: "services",
    title: "Our services",
    body: (
      <>
        <p>
          Smart Creation provides U.A.E. business-setup, banking-introduction,
          visa, accounting, audit, Corporate Tax, real-estate and related
          professional services. The exact scope of any engagement is set out
          in a written proposal or service agreement that we send before the
          work begins. That document — together with any change order signed
          afterwards — governs what we deliver.
        </p>
        <p>
          We do not provide legal, tax or accounting advice within the meaning
          of any regulated profession, and nothing on this website or in our
          communications should be relied on as such. Where a regulated
          opinion is needed, we will refer you to a licensed practitioner.
        </p>
      </>
    ),
  },
  {
    id: "fees",
    title: "Fees and payments",
    body: (
      <>
        <p>
          Our fees are quoted in U.A.E. dirhams (AED) and are exclusive of
          government and authority charges unless explicitly stated. The fees,
          payment schedule and any third-party costs are stated in your
          written proposal. Government fees vary by authority and are paid by
          you, not by us.
        </p>
        <p>
          Payment terms, refund rules and cancellation conditions are governed
          by the proposal or service agreement you sign with us.
        </p>
      </>
    ),
  },
  {
    id: "your-responsibilities",
    title: "Your responsibilities",
    body: (
      <>
        <p>You agree to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Provide accurate, complete and up-to-date information about
            yourself, your shareholders and your business.
          </li>
          <li>
            Promptly supply any documents, signatures or KYC information that
            government bodies or banks request.
          </li>
          <li>
            Cooperate with our team in good faith and respond within
            reasonable timeframes so we can deliver your file on schedule.
          </li>
          <li>
            Comply with all applicable U.A.E. laws and regulations relating to
            your activity.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: (
      <>
        <p>
          The website, its content, design, code, brand marks and the
          underlying systems are owned by Smart Creation Group or licensed to
          us. You may view and use the site for personal, non-commercial
          purposes. You may not copy, modify, reverse-engineer, scrape,
          republish or commercially exploit any part of the site without our
          prior written consent.
        </p>
        <p>
          Documents we deliver as part of an engagement (proposals, plans,
          compliance frameworks) remain our intellectual property unless your
          signed agreement says otherwise. You receive a non-exclusive,
          non-transferable licence to use them for the agreed purpose.
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    title: "Third-party links and services",
    body: (
      <p>
        The site may link to third-party websites and services, including
        government portals, banks and partner platforms. We do not control or
        endorse those third parties and we are not responsible for their
        content, accuracy or practices. Your use of any third-party service is
        governed by that party&apos;s own terms and privacy policy.
      </p>
    ),
  },
  {
    id: "warranties",
    title: "Warranties and disclaimers",
    body: (
      <>
        <p>
          We deliver our services with the reasonable skill and care expected
          of a U.A.E.-licensed business-setup consultancy with our track
          record. Beyond that, the website and the services are provided
          &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranty
          of any kind, express or implied, including warranties of
          merchantability, fitness for a particular purpose or non-infringement.
        </p>
        <p>
          We do not warrant uninterrupted or error-free operation of the
          website, that information on the site is always current, or that
          any specific business outcome (a licence, a bank account, a tax
          ruling) will be obtained.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <>
        <p>
          To the maximum extent permitted by applicable U.A.E. law, Smart
          Creation will not be liable for any indirect, incidental,
          consequential, special or punitive damages arising out of or
          relating to your use of the website or any of our services,
          including loss of profits, revenue, data or goodwill.
        </p>
        <p>
          Our total aggregate liability for any claim arising from an
          engagement is limited to the fees you paid us under that
          engagement during the twelve months preceding the event giving rise
          to the claim.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law and jurisdiction",
    body: (
      <p>
        These Terms and any engagement governed by them are governed by the
        laws of the United Arab Emirates as applicable in the Emirate of
        Dubai. The courts of Dubai have exclusive jurisdiction over any
        dispute, unless the engagement letter specifies arbitration under the
        DIAC Arbitration Rules in Dubai, in which case that clause prevails.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these Terms from time to time. The &ldquo;Last
        updated&rdquo; date at the top reflects the most recent version.
        Material changes will be highlighted on this page. Continuing to use
        the site after we post changes constitutes acceptance of the updated
        Terms.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      eyebrow="Terms"
      title="Terms of Service"
      intro="The terms below govern the use of thesmartcreation.com and the engagements we deliver. Please read them carefully — they explain what we do, what we don't, and who is responsible for what."
      lastUpdated="15 May 2026"
      sections={sections}
      current="terms"
    />
  );
}
