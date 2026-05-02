import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Calendar,
  CheckCircle2,
  Eye,
  MapPin,
  Maximize2,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";

import { OfficeGallery } from "@/components/office-gallery";
import {
  getProperty,
  getSimilarProperties,
  propertyToOffice,
  propertyToImages,
} from "@/lib/payload-queries";
import { CONTACT } from "@/lib/data";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ centerKey: string; propertySlug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { centerKey, propertySlug } = await params;
  const raw = await getProperty(propertySlug);
  if (!raw) return {};
  const office = propertyToOffice(raw);

  const title = `${office.officeNo} — ${office.title}`;
  const description = `${office.sqft ?? office.capacity} ${office.category.toLowerCase()} at ${office.building}, ${office.location}. ${office.availability}. From AED ${office.price.amount}${office.price.period}. Trusted since 2013.`;
  const url = `/business-centers/${centerKey}/${propertySlug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · Smart Creation Group`,
      description,
      url,
      type: "website",
      images: office.image
        ? [{ url: office.image, width: 1200, height: 900, alt: title }]
        : undefined,
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { centerKey, propertySlug } = await params;
  const raw = await getProperty(propertySlug);
  if (!raw) notFound();

  const office = propertyToOffice(raw);

  if (office.centerId !== centerKey) notFound();

  const images = propertyToImages(raw);

  const centreId = (raw.center as { id: string | number } | null)?.id;
  const similarRaw = centreId
    ? await getSimilarProperties({ centreId, excludeSlug: propertySlug, limit: 3 })
    : [];
  const similar = similarRaw.map(propertyToOffice);

  const isUpcoming = office.availabilityAccent === "upcoming";

  const feeRows: { label: string; value?: string }[] = [
    { label: "Security deposit", value: office.fees.securityDeposit },
    { label: "Management fee", value: office.fees.managementFee },
    { label: "Ejari & contract", value: office.fees.ejariFee },
    { label: "DDA NOC", value: office.fees.ddaNoc },
    { label: "VAT", value: office.fees.vat },
    { label: "Parking", value: office.fees.parking },
  ].filter((r) => r.value && r.value !== "—");

  return (
    <>
      <section className="pt-28 md:pt-32 pb-4">
        <div className="container-edit">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone"
          >
            <Link href="/" className="hover:text-ink transition-colors">Home</Link>
            <span className="text-mist/60">/</span>
            <Link href="/business-centers" className="hover:text-ink transition-colors">
              Business centres
            </Link>
            <span className="text-mist/60">/</span>
            <Link href={`/business-centers/${centerKey}`} className="hover:text-ink transition-colors">
              {office.centerName}
            </Link>
            <span className="text-mist/60">/</span>
            <span className="text-ink">{office.officeNo}</span>
          </nav>

          <Link
            href={`/business-centers/${centerKey}`}
            className="group mt-4 inline-flex items-center gap-1.5 text-[0.88rem] text-ink-mute hover:text-ink transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.8} />
            Back to {office.centerName}
          </Link>
        </div>
      </section>

      <section className="pb-10 md:pb-14">
        <div className="container-edit">
          <OfficeGallery images={images} title={office.title} />
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-edit grid grid-cols-12 gap-x-10 gap-y-10">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="rounded-full border border-ink/15 bg-paper-soft px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink">
                {office.category}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink">
                <span className={cn("h-1.5 w-1.5 rounded-full", isUpcoming ? "bg-amber-500" : "bg-emerald-500")} />
                {office.availability}
              </span>
              {office.featured && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink">
                  ★ Featured
                </span>
              )}
            </div>

            <div className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-stone mb-3">
              {office.officeNo}
            </div>
            <h1 className="font-display font-medium text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.02] tracking-[-0.025em] text-ink text-balance">
              {office.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-[0.95rem] text-ink-mute">
              <MapPin className="h-4 w-4 text-stone" strokeWidth={1.8} />
              <span>{office.floor}, {office.building}</span>
              <span className="text-mist">·</span>
              <span>{office.location}</span>
              <span className="text-mist">·</span>
              <span>{office.emirate}</span>
            </div>

            <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 border-y border-ink/10 py-6">
              {office.sqft && <SpecItem icon={<Maximize2 />} label="Size" value={office.sqft} />}
              <SpecItem icon={<Users />} label="Capacity" value={office.capacity} />
              {office.view && <SpecItem icon={<Eye />} label="View" value={office.view} />}
              <SpecItem icon={<Calendar />} label="Available" value={office.availability} />
            </dl>

            <div className="mt-10 max-w-[60ch]">
              <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-3">
                About this space
              </div>
              <p className="text-[1.02rem] leading-relaxed text-ink text-pretty">
                {office.description}
              </p>
            </div>

            {office.highlights.length > 0 && (
              <div className="mt-10">
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-4">
                  Highlights
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {office.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-brand-deep mt-0.5 shrink-0" strokeWidth={2} />
                      <span className="text-[0.95rem] text-ink">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {office.features.length > 0 && (
              <div className="mt-10">
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-4">
                  What's in the room
                </div>
                <ul className="flex flex-wrap gap-2">
                  {office.features.map((f) => (
                    <li key={f} className="rounded-full border border-ink/10 bg-paper-soft px-3 py-1.5 text-[0.84rem] text-ink-mute">
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {office.paymentOptions && office.paymentOptions.length > 0 && (
              <div className="mt-10">
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-4">
                  Payment options
                </div>
                <ul className="space-y-2">
                  {office.paymentOptions.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[0.95rem] text-ink">
                      <span className="mt-2 block h-1 w-1 rounded-full bg-brand shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="rounded-3xl border border-ink/10 bg-paper-soft p-6 md:p-7">
                <div className="pb-5 border-b border-ink/10">
                  {office.price.note && (
                    <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-1">
                      {office.price.note}
                    </div>
                  )}
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-[2.2rem] font-medium leading-none tracking-[-0.03em] text-ink">
                      {office.price.amount}
                    </span>
                    {office.price.period && (
                      <span className="text-[0.95rem] text-ink-mute">{office.price.period}</span>
                    )}
                  </div>
                  {office.paymentTerms && (
                    <div className="mt-2 text-[0.85rem] text-ink-mute">{office.paymentTerms}</div>
                  )}
                </div>

                <div className="mt-5 space-y-2.5">
                  <Link href="/contact" className="group flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-[0.92rem] font-medium text-paper hover:bg-brand-deep transition-colors">
                    Book a viewing
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.8} />
                  </Link>
                  <Link href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-3 text-[0.88rem] text-ink hover:border-ink/40 transition-colors">
                    <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
                    WhatsApp us
                  </Link>
                  <Link href={CONTACT.phoneHref} className="group flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-3 text-[0.88rem] text-ink hover:border-ink/40 transition-colors">
                    <Phone className="h-4 w-4" strokeWidth={1.8} />
                    {CONTACT.phone}
                  </Link>
                </div>

                {feeRows.length > 0 && (
                  <div className="mt-7 pt-5 border-t border-ink/10">
                    <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-3">
                      One-time & standard fees
                    </div>
                    <dl className="space-y-1.5">
                      {feeRows.map((row) => (
                        <div key={row.label} className="flex items-baseline justify-between gap-3 py-1">
                          <dt className="text-[0.85rem] text-ink-mute">{row.label}</dt>
                          <dd className="font-mono text-[0.82rem] text-ink">{row.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                <div className="mt-6 pt-5 border-t border-ink/10 flex items-start gap-2 text-[0.82rem] text-ink-mute">
                  <Building2 className="h-4 w-4 text-stone mt-0.5 shrink-0" strokeWidth={1.8} />
                  <div>
                    <div className="text-ink">{office.building}</div>
                    <div>{office.floor} · {office.location}</div>
                    <div>{office.emirate}</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-ink/10 bg-paper p-5">
                <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-2">
                  Trusted since 2013
                </div>
                <p className="text-[0.88rem] text-ink-mute leading-relaxed">
                  Every tenant gets free company-formation and PRO consultation.
                  If you need a trade license, visas, or a bank account alongside
                  the office — we handle all three.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="pb-24 md:pb-36">
          <div className="container-edit">
            <div className="flex items-end justify-between mb-10 gap-4">
              <div>
                <div className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-3">
                  <span className="h-px w-8 bg-ink/20" />
                  Other spaces at this centre
                </div>
                <h2 className="font-display font-medium text-[clamp(1.6rem,3vw,2.2rem)] tracking-[-0.02em] leading-tight text-ink">
                  More at {office.centerName}
                </h2>
              </div>
              <Link href={`/business-centers/${centerKey}`} className="group hidden md:inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-ink hover:text-brand-deep transition-colors">
                View all at this centre
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.8} />
              </Link>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              {similar.map((o) => (
                <li key={o.id}>
                  <Link href={`/business-centers/${centerKey}/${o.slug}`} className="group flex flex-col h-full rounded-3xl border border-ink/10 bg-paper overflow-hidden transition-all hover:border-ink/25 hover:shadow-[0_20px_60px_-30px_rgba(13,16,19,0.25)]">
                    <div className="relative h-[180px] overflow-hidden bg-paper-deep">
                      {o.image && (
                        <Image src={o.image} alt={`${o.officeNo} — ${o.title}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                      )}
                      <div className="absolute top-3 left-3 rounded-full bg-ink/70 backdrop-blur-md px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-paper">
                        {o.category}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
                        {o.officeNo}
                      </div>
                      <h3 className="font-display mt-1.5 text-[1.15rem] tracking-[-0.01em] text-ink">
                        {o.title}
                      </h3>
                      <div className="mt-auto pt-4 flex items-baseline justify-between gap-3">
                        <div className="flex items-baseline gap-1">
                          {o.price.note && (
                            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
                              {o.price.note}
                            </span>
                          )}
                          <span className="font-display text-[1.15rem] font-medium text-ink tracking-[-0.02em]">
                            {o.price.amount}
                          </span>
                          <span className="text-[0.78rem] text-ink-mute">{o.price.period}</span>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-ink-mute group-hover:text-brand-deep group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" strokeWidth={1.8} />
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

function SpecItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone mb-1.5">
        <span className="h-3.5 w-3.5 [&_svg]:h-full [&_svg]:w-full">{icon}</span>
        {label}
      </div>
      <div className="text-[1rem] text-ink font-medium">{value}</div>
    </div>
  );
}
