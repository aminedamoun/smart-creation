import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Eye,
  Mail,
  MapPin,
  Maximize2,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";

import {
  getCentreByKey,
  getProperties,
  propertyToOffice,
} from "@/lib/supabase-queries";
import { CONTACT } from "@/lib/data";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ centerKey: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { centerKey } = await params;
  const centre = await getCentreByKey(centerKey);
  if (!centre) return {};

  const title = centre.name;
  const description = centre.tagline ?? centre.description ?? "";
  const url = `/business-centers/${centerKey}`;
  const heroSrc = centre.hero_image ?? undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · Smart Creation Group`,
      description,
      url,
      type: "website",
      images: heroSrc ? [{ url: heroSrc, width: 1600, height: 900, alt: title }] : undefined,
    },
  };
}

export default async function CentrePage({ params }: PageProps) {
  const { centerKey } = await params;
  const centre = await getCentreByKey(centerKey);
  if (!centre) notFound();

  const propsRaw = await getProperties({ centreKey: centerKey, limit: 100 });
  const offices = propsRaw.map(propertyToOffice);

  const heroSrc = centre.hero_image ?? "";
  const advantages = centre.advantages ?? [];
  const nearby = centre.nearby ?? [];
  const galleryArr = centre.gallery ?? [];

  const phone = centre.phone || CONTACT.phone;
  const email = centre.email || "info@thesmartcreation.com";
  const mapUrl = centre.google_maps_url ?? undefined;

  return (
    <>
      {/* Hero */}
      <section data-dark-hero className="relative pt-28 md:pt-32 pb-16 md:pb-24 bg-ink text-paper overflow-hidden">
        {heroSrc && (
          <div className="absolute inset-0 -z-10">
            <Image
              src={heroSrc}
              alt={String(centre.name)}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-30"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" />
          </div>
        )}

        <div className="container-edit relative">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-mist mb-6"
          >
            <Link href="/" className="hover:text-paper transition-colors">Home</Link>
            <span className="text-mist/60">/</span>
            <Link href="/business-centers" className="hover:text-paper transition-colors">Business centres</Link>
            <span className="text-mist/60">/</span>
            <span className="text-paper">{String(centre.name)}</span>
          </nav>

          <Link
            href="/business-centers"
            className="group inline-flex items-center gap-1.5 text-[0.88rem] text-mist hover:text-paper transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.8} />
            All centres
          </Link>

          <h1 className="max-w-4xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] tracking-[-0.025em] text-paper text-balance">
            {String(centre.name)}
          </h1>
          {centre.tagline && (
            <p className="mt-5 max-w-2xl text-[1.1rem] leading-relaxed text-mist">
              {String(centre.tagline)}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-mist">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
              {String(centre.location)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" strokeWidth={1.8} />
              {String(centre.building)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              {offices.length} {offices.length === 1 ? "property" : "properties"} available
            </span>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {galleryArr.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container-edit">
            <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-6">
              Inside the centre
            </div>
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {galleryArr.map((g, i) => {
                const src = g.url;
                if (!src) return null;
                return (
                  <li key={i} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper-deep">
                    <Image
                      src={src}
                      alt={g.caption ?? `${String(centre.name)} — ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover hover:scale-[1.03] transition-transform duration-700"
                    />
                    {g.caption && (
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-ink/70 to-transparent">
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper">
                          {g.caption}
                        </span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* About */}
      <section className="pb-16 md:pb-24">
        <div className="container-edit grid grid-cols-12 gap-x-10 gap-y-12">
          <div className="col-span-12 lg:col-span-7">
            <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-3">
              About this centre
            </div>
            <p className="text-[1.05rem] leading-relaxed text-ink text-pretty max-w-[60ch]">
              {String(centre.description)}
            </p>

            {advantages.length > 0 && (
              <div className="mt-12">
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-5">
                  Why tenants pick this centre
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                  {advantages.map((a, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-deep mt-0.5 shrink-0" strokeWidth={2} />
                      <div>
                        <div className="font-display text-[1.05rem] tracking-[-0.01em] text-ink">
                          {a.title}
                        </div>
                        {a.description && (
                          <p className="mt-1 text-[0.9rem] text-ink-mute leading-relaxed">
                            {a.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-28 rounded-3xl border border-ink/10 bg-paper-soft p-6 md:p-7">
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-3">
                Visit / contact
              </div>
              <div className="flex items-start gap-2 text-[0.95rem] text-ink mb-5">
                <MapPin className="h-4 w-4 text-stone mt-0.5 shrink-0" strokeWidth={1.8} />
                <div>
                  <div>{String(centre.building)}</div>
                  {centre.address_line ? <div className="text-ink-mute">{String(centre.address_line)}</div> : (
                    <div className="text-ink-mute">{String(centre.location)}</div>
                  )}
                  <div className="text-ink-mute">{String(centre.emirate)}</div>
                </div>
              </div>

              <div className="space-y-2.5">
                <Link
                  href="/contact"
                  className="group flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-[0.92rem] font-medium text-paper hover:bg-brand-deep transition-colors"
                >
                  Book a viewing
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.8} />
                </Link>
                <Link
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-3 text-[0.88rem] text-ink hover:border-ink/40 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
                  WhatsApp us
                </Link>
                <Link
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="group flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-3 text-[0.88rem] text-ink hover:border-ink/40 transition-colors"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.8} />
                  {phone}
                </Link>
                <Link
                  href={`mailto:${email}`}
                  className="group flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-3 text-[0.88rem] text-ink hover:border-ink/40 transition-colors"
                >
                  <Mail className="h-4 w-4" strokeWidth={1.8} />
                  {email}
                </Link>
                {mapUrl && (
                  <Link
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-3 text-[0.88rem] text-ink hover:border-ink/40 transition-colors"
                  >
                    Open in Google Maps
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </Link>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Properties at this centre */}
      <section className="pb-16 md:pb-24">
        <div className="container-edit">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-3">
                Available properties
              </div>
              <h2 className="font-display font-medium text-[clamp(1.7rem,3vw,2.4rem)] tracking-[-0.02em] leading-tight text-ink">
                {offices.length === 0
                  ? "No live inventory at this centre — call us"
                  : `${offices.length} ${offices.length === 1 ? "office" : "offices"} at ${String(centre.name)}`}
              </h2>
            </div>
          </div>

          {offices.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
              {offices.map((o) => {
                const isUpcoming = o.availabilityAccent === "upcoming";
                return (
                  <li key={o.id}>
                    <Link
                      href={`/business-centers/${centerKey}/${o.slug}`}
                      className="group flex flex-col h-full rounded-3xl border border-ink/10 bg-paper overflow-hidden transition-all hover:border-ink/25 hover:shadow-[0_22px_60px_-30px_rgba(13,16,19,0.28)]"
                    >
                      <div className="relative h-[200px] overflow-hidden bg-paper-deep">
                        {o.image && (
                          <Image
                            src={o.image}
                            alt={`${o.officeNo} — ${o.title}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        )}
                        <div className="absolute inset-x-0 top-0 p-4 flex items-start justify-between pointer-events-none">
                          <span className="rounded-full bg-ink/70 backdrop-blur-md px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper">
                            {o.category}
                          </span>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper/95 backdrop-blur-md px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-ink">
                            <span className={cn("h-1.5 w-1.5 rounded-full", isUpcoming ? "bg-amber-500" : "bg-emerald-500")} />
                            {o.availability}
                          </span>
                        </div>
                        {o.featured && (
                          <div className="absolute bottom-4 left-5">
                            <span className="rounded-full bg-brand px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink">
                              ★ Featured
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col flex-1 p-6">
                        <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-2">
                          {o.officeNo}
                        </div>
                        <h3 className="font-display text-[1.3rem] leading-[1.1] tracking-[-0.02em] text-ink">
                          {o.title}
                        </h3>
                        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[0.84rem] text-ink-mute">
                          {o.sqft && (
                            <li className="inline-flex items-center gap-1.5">
                              <Maximize2 className="h-3.5 w-3.5 text-stone" strokeWidth={1.6} />
                              {o.sqft}
                            </li>
                          )}
                          <li className="inline-flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5 text-stone" strokeWidth={1.6} />
                            {o.capacity}
                          </li>
                          {o.view && (
                            <li className="inline-flex items-center gap-1.5">
                              <Eye className="h-3.5 w-3.5 text-stone" strokeWidth={1.6} />
                              {o.view}
                            </li>
                          )}
                        </ul>
                        <div className="mt-auto pt-5 border-t border-ink/10 flex items-end justify-between gap-3">
                          <div>
                            {o.price.note && (
                              <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone mb-0.5">
                                {o.price.note}
                              </div>
                            )}
                            <div className="flex items-baseline gap-1">
                              <span className="font-display text-[1.5rem] font-medium text-ink tracking-[-0.02em]">
                                {o.price.amount}
                              </span>
                              <span className="text-[0.82rem] text-ink-mute">{o.price.period}</span>
                            </div>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-ink-mute group-hover:text-brand-deep group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" strokeWidth={1.8} />
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="rounded-3xl border border-ink/10 bg-paper p-10 md:p-14 text-center">
              <p className="text-ink-mute max-w-xl mx-auto">
                Fresh inventory is being prepared at this centre. Get in touch and
                we'll match you with a unit before it's listed publicly.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.9rem] font-medium text-paper hover:bg-brand-deep transition-colors"
              >
                Schedule a tour
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Nearby */}
      {nearby.length > 0 && (
        <section className="pb-16 md:pb-24 bg-paper-soft">
          <div className="container-edit pt-16 md:pt-20">
            <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-6">
              What's nearby
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearby.map((n, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-ink/10 bg-paper px-4 py-3.5"
                >
                  <div className="min-w-0">
                    <div className="text-[0.95rem] text-ink truncate">{n.name}</div>
                    <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-stone">
                      {n.category}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-paper-deep px-3 py-1 text-[0.78rem] text-ink-mute">
                    {n.distance}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
