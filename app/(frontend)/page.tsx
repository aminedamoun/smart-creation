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
import { CentresMapSection } from "@/components/centres-map-section";
import { Stats } from "@/components/stats";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { Blog, type BlogCardPost } from "@/components/blog";
import { FinalCTA } from "@/components/final-cta";
import { getInsightsList } from "@/lib/insights";

function readMins(n: number) {
  return `${n} min read`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export const revalidate = 300;

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

export default async function HomePage() {
  const insights = await getInsightsList();
  const posts: BlogCardPost[] = insights
    .slice(0, 3)
    .map((m) => ({
      slug: m.slug,
      title: m.title,
      excerpt: m.excerpt,
      category: m.category,
      date: fmtDate(m.date),
      readTime: readMins(m.readMinutes),
      image: m.cover,
      href: `/insights/${m.slug}`,
    }));

  return (
    <>
      <Hero />
      <ZonesTicker />
      <Services />
      <Offices />
      <CentresMapSection
        eyebrow="§ 03 — On the map"
        title={
          <>
            Six centres across Dubai
            <span className="block text-brand-deep">Live office count and price range.</span>
          </>
        }
        lede="Click any pin to see what's available right now and the entry price at that centre. Same team handles your file regardless of which one you start from."
      />
      <CeoWord />
      <GroupOfCompanies />
      <FreeZones />
      <WhyUs />
      <Process />
      <BusinessCenter />
      <Stats />
      <Testimonials />
      <Blog posts={posts} />
      <FAQ />
      <FinalCTA />
    </>
  );
}
