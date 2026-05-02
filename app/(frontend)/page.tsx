import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { ZonesTicker } from "@/components/zones-ticker";
import { Services } from "@/components/services";
import { Offices } from "@/components/offices";
import { CeoWord } from "@/components/ceo-word";
import { GroupOfCompanies } from "@/components/group-of-companies";
import { FreeZones } from "@/components/free-zones";
import { WhyUs } from "@/components/why-us";
import { Process } from "@/components/process";
import { BusinessCenter } from "@/components/business-center";
import { Stats } from "@/components/stats";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { Blog } from "@/components/blog";
import { FinalCTA } from "@/components/final-cta";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Business Setup, Centres & More in Dubai",
  description:
    "Smart Creation Group of Companies — four Dubai business centres plus company formation, real estate, technology, holiday rentals, transport and contracting. One trusted partner since 2013.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Smart Creation Group — Business Setup, Centres & More in Dubai",
    description:
      "Four owned-and-operated Dubai business centres plus a multi-sector group across the UAE, Canada and Pakistan.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ZonesTicker />
      <Services />
      <Offices />
      <CeoWord />
      <GroupOfCompanies />
      <FreeZones />
      <WhyUs />
      <Process />
      <BusinessCenter />
      <Stats />
      <Testimonials />
      <Blog />
      <FAQ />
      <FinalCTA />
    </>
  );
}
