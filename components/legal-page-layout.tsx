import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { CONTACT } from "@/lib/data";

export type LegalSection = {
  id: string;
  title: string;
  body: React.ReactNode;
};

/**
 * Shared editorial layout for /privacy, /terms and /cookies. Renders a
 * dark hero with breadcrumb + title, a sticky table-of-contents column,
 * the article body and a unified contact footer.
 */
export function LegalPageLayout({
  eyebrow,
  title,
  intro,
  lastUpdated,
  sections,
  current,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
  current: "privacy" | "terms" | "cookies";
}) {
  const otherLinks = [
    { id: "privacy" as const, label: "Privacy", href: "/privacy" },
    { id: "terms" as const, label: "Terms", href: "/terms" },
    { id: "cookies" as const, label: "Cookies", href: "/cookies" },
  ];

  return (
    <>
      {/* Hero — dark, editorial */}
      <section
        data-dark-hero
        className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-20 bg-ink text-paper"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(720px circle at 78% 28%, rgba(72,168,219,0.16), transparent 55%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-40 h-[560px] w-[560px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(72,168,219,0.12), rgba(72,168,219,0) 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #f6f3ec 1px, transparent 1px), linear-gradient(to bottom, #f6f3ec 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse at center, black 45%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 45%, transparent 80%)",
          }}
        />

        <div className="container-edit relative">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-mist mb-8"
          >
            <span className="h-px w-8 bg-paper/25" />
            <Link href="/" className="hover:text-paper transition-colors">
              Home
            </Link>
            <span className="text-paper/30">/</span>
            <span className="text-paper">{eyebrow}</span>
          </nav>

          <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-8 items-end">
            <div className="col-span-12 lg:col-span-8">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/[0.04] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />§ {eyebrow}
              </div>
              <h1 className="font-display font-medium tracking-[-0.03em] leading-[1] text-[clamp(2.2rem,5vw,3.8rem)] text-paper text-balance">
                {title}
              </h1>
              <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-paper/70 text-pretty">
                {intro}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 lg:text-right font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mist">
              <div>Last updated</div>
              <div className="mt-1 text-paper">{lastUpdated}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 md:py-24 bg-paper">
        <div className="container-edit">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-10">
            {/* Sticky TOC + cross-links */}
            <aside className="hidden lg:block col-span-3">
              <div className="sticky top-28 space-y-8">
                <div>
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone mb-4">
                    Contents
                  </div>
                  <nav>
                    <ul className="space-y-1.5 text-[0.88rem]">
                      {sections.map((s) => (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            className="block py-1 text-ink-mute hover:text-ink transition-colors"
                          >
                            {s.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
                <div>
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone mb-3">
                    Related
                  </div>
                  <ul className="space-y-1.5 text-[0.88rem]">
                    {otherLinks
                      .filter((l) => l.id !== current)
                      .map((l) => (
                        <li key={l.id}>
                          <Link
                            href={l.href}
                            className="inline-flex items-center gap-1.5 text-ink-mute hover:text-ink transition-colors"
                          >
                            {l.label}
                            <ArrowUpRight
                              className="h-3 w-3"
                              strokeWidth={1.8}
                            />
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Article */}
            <article className="col-span-12 lg:col-span-9 lg:max-w-3xl">
              <div className="space-y-12">
                {sections.map((s) => (
                  <section
                    key={s.id}
                    id={s.id}
                    className="scroll-mt-28 md:scroll-mt-32"
                  >
                    <h2 className="font-display font-semibold text-[1.35rem] md:text-[1.55rem] leading-[1.2] tracking-[-0.015em] text-ink text-balance">
                      {s.title}
                    </h2>
                    <div className="mt-4 space-y-4 text-[0.98rem] leading-relaxed text-ink-mute legal-prose">
                      {s.body}
                    </div>
                  </section>
                ))}

                {/* Contact card */}
                <section className="mt-10 rounded-3xl border border-ink/10 bg-paper-soft p-6 md:p-8">
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone mb-3">
                    Questions?
                  </div>
                  <h3 className="font-display font-semibold text-[1.15rem] tracking-[-0.01em] text-ink">
                    Reach the Smart Creation team.
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-mute max-w-xl">
                    For anything related to this policy, your personal data, or
                    your account with us — get in touch and a real person will
                    reply within one business day.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <a
                      href={CONTACT.emailHref}
                      className="inline-flex items-center gap-2 rounded-full bg-brand-night px-5 py-2.5 text-[0.88rem] font-medium text-paper hover:bg-brand transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" strokeWidth={1.8} />
                      {CONTACT.email}
                    </a>
                    <a
                      href={CONTACT.phoneHref}
                      className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-2.5 text-[0.88rem] text-ink hover:border-ink/40 transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
                      {CONTACT.phone}
                    </a>
                  </div>
                </section>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
