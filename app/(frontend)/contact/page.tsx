import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  FileSignature,
  Handshake,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import { CONTACT } from "@/lib/data";
import { ContactForm } from "@/components/contact-form";
import { ContactHero } from "@/components/contact-hero";
import { ContactLiveStatus } from "@/components/contact-live-status";
import { CentresMapSection } from "@/components/centres-map-section";

export const metadata: Metadata = {
  title: "Contact Smart Creation Group",
  description:
    "Tell us what you're building — company formation, free zone, visas, banking, office space — and we'll come back within one business day.",
  alternates: { canonical: "/contact" },
};

const offices = [
  {
    key: "smart-creation",
    logo: "/group-logos/smart-creation-bc.webp",
    address: "19th Floor, Damac Executive Heights, Jebel Ali Race Course Road, Tecom",
    note: "Flagship · meetings here by default",
  },
  {
    key: "smart-place",
    logo: "/group-logos/smart-place.webp",
    address: "Iridium Building, Umm Suqeim Street, Al Barsha",
    note: "Walk-in · 5 min from Mall of the Emirates",
  },
  {
    key: "smart-view",
    logo: "/group-logos/smart-view.webp",
    address: "Al Arif Building, 15A Street, Al Hamriya, Bur Dubai",
    note: "Ground-floor · trading-friendly",
  },
  {
    key: "future-space",
    logo: "/group-logos/future-space.webp",
    address: "Block A, 2nd Floor, Dubai Municipality Building, Salah Al Din Street, Al Muraqabat",
    note: "5 min walk to Salah Al Din metro",
  },
  {
    key: "smart-founders",
    logo: "/group-logos/smart-founders.webp",
    address: "Smart Founders Centre, Dubai, U.A.E.",
    note: "Founder-focused workspace",
  },
  {
    key: "abna-rashid",
    logo: "/group-logos/abna-rashid.webp",
    address: "Abna Rashid Hamd Bin Huwaidi Building, Street 27A, Al Nakhal — Naif, Deira",
    note: "Owned freehold · trading-district base",
  },
];

const journey = [
  {
    n: "01",
    title: "You send the brief",
    body: "Either through the form, WhatsApp or a quick call. The more you say upfront, the sharper our reply.",
    icon: FileSignature,
  },
  {
    n: "02",
    title: "We come back within a day",
    body: "Jurisdictions compared, costs ranged, banking flagged, visa quota mapped. One page, no fluff.",
    icon: Sparkles,
  },
  {
    n: "03",
    title: "You decide, we file",
    body: "Trade name, MOA, Ejari, licence and immigration file — same team handles every step end-to-end.",
    icon: Handshake,
  },
  {
    n: "04",
    title: "Doors open",
    body: "Licence in hand, account opened, residency stamped. We stay on call for renewals and CT filings.",
    icon: CheckCircle2,
  },
];

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      {/* Form + sidebar */}
      <section className="py-16 md:py-24 bg-paper">
        <div className="container-edit">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-10">
            {/* Form column with watermark */}
            <div className="col-span-12 lg:col-span-7 relative">
              {/* Decorative watermark number */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-2 -left-2 select-none font-display font-semibold leading-none tracking-[-0.06em] hidden lg:block"
                style={{
                  fontSize: "clamp(8rem, 12vw, 12rem)",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(13,16,19,0.06)",
                }}
              >
                01
              </div>

              <div className="relative">
                <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-6">
                  <span className="h-px w-8 bg-ink/25" />§ Send us a brief
                </div>
                <ContactForm />
              </div>
            </div>

            {/* Sticky right rail — magazine-style stack */}
            <aside className="col-span-12 lg:col-span-5">
              <div className="lg:sticky lg:top-28 space-y-5">
                {/* Live status card */}
                <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-paper p-6 md:p-7 shadow-[0_22px_60px_-30px_rgba(13,16,19,0.18)]">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
                  />
                  <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-4 inline-flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-brand" strokeWidth={2} />
                    Live status
                  </div>

                  <ContactLiveStatus />

                  <div className="mt-6 grid grid-cols-3 divide-x divide-ink/10 border-t border-ink/10 pt-5 -mx-1.5">
                    <div className="px-1.5">
                      <div className="font-display font-medium text-[1.4rem] leading-none tracking-[-0.03em] text-ink">
                        ~12m
                      </div>
                      <div className="mt-1.5 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-stone leading-tight">
                        Avg WhatsApp reply
                      </div>
                    </div>
                    <div className="px-1.5">
                      <div className="font-display font-medium text-[1.4rem] leading-none tracking-[-0.03em] text-ink">
                        1 day
                      </div>
                      <div className="mt-1.5 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-stone leading-tight">
                        Brief turnaround
                      </div>
                    </div>
                    <div className="px-1.5">
                      <div className="font-display font-medium text-[1.4rem] leading-none tracking-[-0.03em] text-ink">
                        Free
                      </div>
                      <div className="mt-1.5 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-stone leading-tight">
                        Initial consult
                      </div>
                    </div>
                  </div>
                </div>

                {/* Founder note */}
                <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-paper-soft p-6 md:p-7">
                  <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-4">
                    A note from the team
                  </div>
                  <p className="font-display text-[1.05rem] leading-[1.4] tracking-[-0.005em] text-ink text-balance">
                    “We don't pass briefs to a junior. The same person who writes
                    your reply gets your licence, your bank account and your visa
                    file across the line.”
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/15 text-brand-deep font-display text-[0.95rem]">
                      AH
                    </div>
                    <div>
                      <div className="text-[0.92rem] text-ink">Asad Hashmi</div>
                      <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-stone">
                        CEO · Smart Creation Group
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visit / book a tour */}
                <div className="relative overflow-hidden rounded-3xl border border-brand/40 bg-gradient-to-br from-ink to-[#0a1419] text-paper p-6 md:p-7 shadow-[0_30px_80px_-25px_rgba(72,168,219,0.45)]">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-20 -right-12 h-56 w-56 rounded-full"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(72,168,219,0.5), rgba(72,168,219,0) 70%)",
                    }}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
                  />
                  <div className="relative">
                    <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist mb-3 inline-flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 text-brand" strokeWidth={2} />
                      Prefer to visit?
                    </div>
                    <h3 className="font-display font-semibold text-[1.2rem] leading-[1.2] tracking-[-0.01em] text-paper text-balance">
                      Walk into any of our six Dubai centres.
                    </h3>
                    <p className="mt-3 text-[0.92rem] leading-relaxed text-paper/75">
                      Tour the floors, see the offices, meet the team handling your
                      file. We'll book a slot that fits your day.
                    </p>
                    <Link
                      href="/business-centers"
                      className="group mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-[0.85rem] font-medium text-ink hover:bg-paper transition-colors"
                    >
                      Pick a centre to visit
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={2}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Channel bar — three big tiles */}
      <section className="pb-16 md:pb-24 bg-paper">
        <div className="container-edit">
          <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-8">
            <span className="h-px w-8 bg-ink/25" />§ Or reach us directly
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {/* WhatsApp */}
            <Link
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-3xl border border-brand/35 bg-gradient-to-br from-brand/[0.1] via-paper to-paper p-6 md:p-7 transition-all hover:-translate-y-0.5 hover:border-brand/60 hover:shadow-[0_22px_60px_-30px_rgba(72,168,219,0.55)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(72,168,219,0.45), rgba(72,168,219,0) 70%)",
                }}
              />
              <div className="relative flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 border border-brand/35 text-brand-deep">
                  <MessageCircle className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-brand-deep/80">
                  Fastest
                </span>
              </div>
              <div className="relative mt-6 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
                WhatsApp
              </div>
              <div className="relative mt-1 font-display text-[1.15rem] tracking-[-0.01em] text-ink">
                {CONTACT.whatsapp}
              </div>
              <div className="relative mt-4 inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brand-deep">
                Message us
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </div>
            </Link>

            {/* Phone */}
            <Link
              href={CONTACT.phoneHref}
              className="group relative overflow-hidden rounded-3xl border border-ink/10 bg-paper p-6 md:p-7 transition-all hover:-translate-y-0.5 hover:border-brand/45 hover:shadow-[0_22px_60px_-30px_rgba(72,168,219,0.5)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(72,168,219,0.45), rgba(72,168,219,0) 70%)",
                }}
              />
              <div className="relative flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-soft border border-ink/10 text-brand-deep">
                  <Phone className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-stone">
                  Mon – Fri 9 – 6
                </span>
              </div>
              <div className="relative mt-6 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone">
                Call us
              </div>
              <div className="relative mt-1 font-display text-[1.15rem] tracking-[-0.01em] text-ink">
                {CONTACT.phone}
              </div>
              <div className="relative mt-1 text-[0.85rem] text-ink-mute">
                Mobile · {CONTACT.phoneAlt}
              </div>
              <div className="relative mt-4 inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brand-deep">
                Talk to a person
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </div>
            </Link>

            {/* Email */}
            <Link
              href={CONTACT.emailHref}
              className="group relative overflow-hidden rounded-3xl border border-brand/40 bg-gradient-to-br from-ink to-[#0a1419] text-paper p-6 md:p-7 transition-all hover:-translate-y-0.5 shadow-[0_22px_60px_-30px_rgba(72,168,219,0.5)] hover:shadow-[0_30px_80px_-25px_rgba(72,168,219,0.6)]"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -right-12 h-48 w-48 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(72,168,219,0.5), rgba(72,168,219,0) 70%)",
                }}
              />
              <div className="relative flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper/[0.06] border border-paper/15 text-brand">
                  <Mail className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-mist">
                  Reply &lt; 1 day
                </span>
              </div>
              <div className="relative mt-6 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist">
                Email
              </div>
              <div className="relative mt-1 font-display text-[1.15rem] tracking-[-0.01em] text-paper truncate">
                {CONTACT.email}
              </div>
              <div className="relative mt-4 inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brand">
                Send a note
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="py-16 md:py-24 bg-paper-soft border-y border-ink/8 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(72,168,219,0.10), rgba(72,168,219,0) 70%)",
          }}
        />
        <div className="container-edit relative">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-8 items-end mb-10 md:mb-12">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4">
                <span className="h-px w-8 bg-ink/25" />§ What happens after you send
              </div>
              <h2 className="font-display font-semibold text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.02em] text-ink text-balance">
                From brief to licence —{" "}
                <span className="text-brand-deep">four predictable steps.</span>
              </h2>
            </div>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {journey.map((j) => {
              const Icon = j.icon;
              return (
                <li
                  key={j.n}
                  className="group relative rounded-3xl border border-ink/10 bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_22px_60px_-30px_rgba(72,168,219,0.45)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-6 top-0 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-ink/10 bg-paper-soft text-brand-deep transition-colors group-hover:bg-brand group-hover:text-ink group-hover:border-brand">
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <span className="font-display font-semibold text-[1.4rem] tracking-[-0.03em] text-ink/30">
                      {j.n}
                    </span>
                  </div>
                  <div className="mt-5 font-display text-[1.05rem] leading-[1.25] tracking-[-0.01em] text-ink">
                    {j.title}
                  </div>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-mute">
                    {j.body}
                  </p>
                </li>
              );
            })}
          </ol>

          <div className="mt-10 md:mt-12 flex items-start gap-3 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone leading-relaxed">
            <Clock className="h-3 w-3 mt-0.5 shrink-0 text-brand-deep" strokeWidth={2} />
            <span>
              Typical timeline: brief replied within 1 business day · setup ready in 5–10 working days · bank account live within 4–6 weeks
            </span>
          </div>
        </div>
      </section>

      {/* Centres map */}
      <CentresMapSection
        eyebrow="§ On the map"
        title={
          <>
            Find us on the ground —{" "}
            <span className="text-brand-deep">six pins, live office count.</span>
          </>
        }
        lede="Each pin opens to the centre with its current available offices and entry price. Click through to visit the centre page or book a tour."
      />

      {/* Offices */}
      <section className="py-16 md:py-24 bg-paper border-t border-ink/8">
        <div className="container-edit">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-10 items-end mb-10 md:mb-14">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4">
                <span className="h-px w-8 bg-ink/25" />§ Where to find us
              </div>
              <h2 className="font-display font-semibold text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.02em] text-ink text-balance">
                Six centres,{" "}
                <span className="text-brand-deep">all walking distance from a metro line.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-ink-mute">
                Pop into any of them — same team handles your file regardless of
                which one you start from.
              </p>
            </div>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {offices.map((o) => (
              <li
                key={o.key}
                className="group relative flex flex-col rounded-3xl border border-ink/10 bg-paper overflow-hidden transition-all hover:border-brand/40 hover:shadow-[0_22px_60px_-30px_rgba(72,168,219,0.45)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100 z-[1]"
                />
                {/* Logo plate — dark gradient with white logo */}
                <div className="relative aspect-[16/9] bg-ink overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #11171b 0%, #0d1013 55%, #08090b 100%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(246,243,236,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(246,243,236,0.6) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(72,168,219,0.4), rgba(72,168,219,0) 70%)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-5">
                    <div className="relative h-[60%] w-[78%]">
                      <Image
                        src={o.logo}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 90vw, 30vw"
                        className="object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="p-5 md:p-6 flex-1">
                  <div className="flex items-start gap-2 text-[0.92rem] leading-relaxed text-ink">
                    <MapPin className="h-3.5 w-3.5 mt-1 shrink-0 text-brand-deep" strokeWidth={1.8} />
                    <span>{o.address}</span>
                  </div>
                  <div className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
                    {o.note}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
