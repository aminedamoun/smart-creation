import type { Metadata } from "next";
import { LegalPageLayout, type LegalSection } from "@/components/legal-page-layout";

export const metadata: Metadata = {
  title: "Cookies Policy — Smart Creation Group",
  description:
    "What cookies thesmartcreation.com uses, why, and how you can control or disable them in your browser.",
  alternates: { canonical: "/cookies" },
};

const sections: LegalSection[] = [
  {
    id: "what-are-cookies",
    title: "What cookies are",
    body: (
      <>
        <p>
          Cookies are small text files that websites store on your device when
          you visit them. They make sites work, remember preferences and help
          owners understand how their pages are used. Some cookies last only
          while your browser is open (session cookies), others persist for
          longer (persistent cookies).
        </p>
      </>
    ),
  },
  {
    id: "what-we-use",
    title: "Cookies we use",
    body: (
      <>
        <p>
          We keep our cookie footprint minimal. The cookies we set fall into
          three categories:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium text-ink">Strictly necessary</span> —
            cookies that the site needs to function (admin session, security
            tokens, hosting load-balancing). These cannot be turned off
            through this policy. If you disable them in your browser, parts
            of the admin panel will not work.
          </li>
          <li>
            <span className="font-medium text-ink">Functional</span> — remember
            your preferences such as language, recently viewed business
            centres or the position of the WhatsApp button.
          </li>
          <li>
            <span className="font-medium text-ink">Analytics</span> — aggregate,
            anonymised information about how the site is used (which pages
            are visited, how long, on which device). We use this to improve
            page speed, layout and content. We do not use analytics cookies
            to profile individual visitors for advertising.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party cookies",
    body: (
      <>
        <p>
          Some pages of the site embed services from trusted providers, which
          set their own cookies:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium text-ink">Google Maps</span> — when a
            business-centre or homepage map is displayed.
          </li>
          <li>
            <span className="font-medium text-ink">Supabase</span> — for
            authenticated sessions on the admin panel only.
          </li>
        </ul>
        <p>
          We do not run advertising cookies, retargeting pixels or
          cross-site trackers.
        </p>
      </>
    ),
  },
  {
    id: "how-to-control",
    title: "How to control cookies",
    body: (
      <>
        <p>
          You can accept, block or delete cookies directly in your browser
          settings:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium text-ink">Chrome</span> — Settings →
            Privacy and security → Cookies and other site data.
          </li>
          <li>
            <span className="font-medium text-ink">Safari</span> —
            Preferences → Privacy → Cookies and website data.
          </li>
          <li>
            <span className="font-medium text-ink">Firefox</span> — Settings
            → Privacy &amp; Security → Cookies and Site Data.
          </li>
          <li>
            <span className="font-medium text-ink">Edge</span> — Settings →
            Cookies and site permissions.
          </li>
        </ul>
        <p>
          Blocking strictly necessary cookies may prevent parts of the site
          (especially the admin panel) from working.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this Cookies Policy as our use of cookies evolves. The
        &ldquo;Last updated&rdquo; date at the top reflects the most recent
        version.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPageLayout
      eyebrow="Cookies"
      title="Cookies Policy"
      intro="thesmartcreation.com uses a small number of cookies to make the site work, remember your preferences and understand how pages are used. We don't run advertising cookies or cross-site trackers."
      lastUpdated="15 May 2026"
      sections={sections}
      current="cookies"
    />
  );
}
