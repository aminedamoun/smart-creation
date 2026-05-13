import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { LazyMotionProvider } from "@/components/lazy-motion-provider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const SITE_URL = "https://thesmartcreation.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Smart Creation Group of Companies · Business Setup, Centres & More in Dubai",
    template: "%s · Smart Creation Group",
  },
  description:
    "Smart Creation Group of Companies. Four Dubai business centres, plus company formation, real estate, technology, holiday homes, transport and contracting across the UAE, Canada and Pakistan. Trusted since 2013.",
  keywords: [
    "Smart Creation Group",
    "Smart Creation Business Center",
    "business setup in Dubai",
    "company formation Dubai",
    "serviced offices Dubai",
    "business centres Dubai",
    "free zone setup UAE",
    "PRO services Dubai",
    "Golden Visa UAE",
    "corporate tax UAE",
    "business consultants Dubai",
    "Asad Hashmi",
  ],
  applicationName: "Smart Creation Group",
  authors: [{ name: "Smart Creation Group of Companies", url: SITE_URL }],
  creator: "Smart Creation Group of Companies",
  publisher: "Smart Creation Group of Companies",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Smart Creation Group of Companies",
    title: "Smart Creation Group · Business Setup, Centres & More in Dubai",
    description:
      "Four owned-and-operated Dubai business centres plus company formation, technology, real estate, hospitality, transport and contracting under one trusted group. Since 2013.",
    locale: "en_AE",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Smart Creation Group of Companies · Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Creation Group · Business Setup & Centres in Dubai",
    description:
      "Four Dubai business centres plus company formation, technology, real estate, hospitality, transport and contracting.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Business Services",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1013" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "Smart Creation Group of Companies",
      alternateName: ["Smart Creation Group", "SCG"],
      url: SITE_URL,
      logo: `${SITE_URL}/sc-group-logo.webp`,
      foundingDate: "2013",
      founder: { "@type": "Person", name: "Asad Hashmi" },
      description:
        "Smart Creation Group of Companies, a multi-sector group operating four Dubai business centres alongside company formation, real estate, technology (Next Journey), holiday rentals, transport and contracting across the UAE, Canada and Pakistan.",
      sameAs: [
        "https://www.linkedin.com/company/smartbusinesscreation",
        "https://www.instagram.com/smartbusinesscreation",
        "https://www.facebook.com/smartbusinesscreation",
      ],
      subOrganization: [
        { "@type": "Organization", name: "Smart Creation Business Center" },
        { "@type": "Organization", name: "Smart Place Business Center" },
        { "@type": "Organization", name: "Smart View Business Center" },
        { "@type": "Organization", name: "Future Space Business Center LLC" },
        { "@type": "Organization", name: "Next Journey Technology" },
        { "@type": "Organization", name: "Smart Holiday Homes" },
        { "@type": "Organization", name: "Intercity Bus Service" },
        { "@type": "Organization", name: "MM Contractor & General Order Supplies" },
      ],
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${SITE_URL}#localbusiness`,
      name: "Smart Creation Group of Companies · HQ",
      image: `${SITE_URL}/reception.jpg`,
      url: SITE_URL,
      telephone: "+97143939099",
      email: "info@thesmartcreation.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "19th Floor, Damac Executive Heights (Tecom), Jebel Ali Race Course Road",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 25.0945,
        longitude: 55.1737,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "City", name: "Dubai" },
        { "@type": "City", name: "Abu Dhabi" },
        { "@type": "City", name: "Sharjah" },
        { "@type": "City", name: "Ras Al Khaimah" },
        { "@type": "City", name: "Ajman" },
      ],
      makesOffer: [
        { "@type": "Offer", name: "Mainland Company Formation" },
        { "@type": "Offer", name: "Free Zone Company Setup" },
        { "@type": "Offer", name: "Offshore Incorporation" },
        { "@type": "Offer", name: "PRO & Visa Services" },
        { "@type": "Offer", name: "Corporate Banking" },
        { "@type": "Offer", name: "Accounting, VAT & Corporate Tax" },
        { "@type": "Offer", name: "Business Centres & Serviced Offices" },
        { "@type": "Offer", name: "Compliance & Licensing" },
        { "@type": "Offer", name: "Real Estate" },
        { "@type": "Offer", name: "Technology Services (AI, Web, Mobile)" },
        { "@type": "Offer", name: "Holiday Rentals" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "Smart Creation Group of Companies",
      publisher: { "@id": `${SITE_URL}#organization` },
      inLanguage: "en-AE",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={geist.variable}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <div className="grain-layer" aria-hidden />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <LazyMotionProvider>
          <SiteHeader />
          <main id="main" className="relative z-[2]">
            {children}
          </main>
          <SiteFooter />
          <WhatsAppFab />
        </LazyMotionProvider>
      </body>
    </html>
  );
}
