import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MessageCircle,
  Sparkles,
  Users,
} from "lucide-react";
import { InsightArticle } from "@/components/insight-article";
import { ArticleHeroBg } from "@/components/article-hero-bg";
import { ArticleProgress } from "@/components/article-progress";
import { ArticleShare } from "@/components/article-share";
import {
  extractInsightToc,
  getInsightContent,
  getInsightMeta,
  getInsightsList,
} from "@/lib/insights";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getInsightsList();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getInsightMeta(slug);
  if (!meta) return {};
  return {
    title: meta.metaTitle,
    description: meta.metaDescription,
    alternates: { canonical: `/insights/${meta.slug}` },
    openGraph: {
      title: meta.metaTitle,
      description: meta.metaDescription,
      url: `/insights/${meta.slug}`,
      type: "article",
      images: [{ url: meta.cover, width: 1600, height: 900, alt: meta.title }],
    },
  };
}

const fmt = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const meta = await getInsightMeta(slug);
  if (!meta) notFound();

  const body = await getInsightContent(slug);
  const toc = extractInsightToc(body);

  const related = (await getInsightsList())
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <>
      <ArticleProgress />

      {/* Masthead — slim editorial band, no big H1 (title is in the cover) */}
      <section
        data-dark-hero
        className="relative overflow-hidden pt-36 md:pt-44 pb-12 md:pb-16 bg-ink text-paper"
      >
        <ArticleHeroBg />

        <div className="container-edit relative">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-mist mb-8"
          >
            <span className="h-px w-8 bg-paper/25" />
            <Link href="/" className="hover:text-paper transition-colors">Home</Link>
            <span className="text-paper/30">/</span>
            <Link href="/insights" className="hover:text-paper transition-colors">Insights</Link>
            <span className="text-paper/30">/</span>
            <span className="text-paper truncate max-w-[40ch]">{meta.category}</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/[0.04] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-mist">
            <Sparkles className="h-3 w-3 text-brand" strokeWidth={2} />
            {meta.category}
          </div>

          {/* SEO / a11y title — visually carried by the cover image below */}
          <h1 className="sr-only">{meta.title}</h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mist">
            <span className="inline-flex items-center gap-1.5 text-paper">
              <Clock className="h-3.5 w-3.5 text-brand" strokeWidth={2} />
              {meta.readMinutes} min read
            </span>
            <span className="text-paper/40">·</span>
            <span>{fmt(meta.date)}</span>
            <span className="text-paper/40">·</span>
            <span>By Smart Creation team</span>
          </div>
        </div>
      </section>

      {/* Cover — capped width so it sits as a feature image, not a full-bleed hero */}
      <section className="-mt-10 md:-mt-14 pb-10 md:pb-14 bg-paper">
        <div className="container-edit">
          <div className="relative mx-auto max-w-4xl aspect-[16/9] overflow-hidden rounded-3xl border border-ink/10 shadow-[0_30px_80px_-30px_rgba(13,16,19,0.45)]">
            <Image
              src={meta.cover}
              alt={meta.title}
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Author byline + share — premium editorial strip */}
      <section className="bg-paper">
        <div className="container-edit">
          <div className="mx-auto max-w-3xl flex flex-wrap items-center justify-between gap-6 py-6 md:py-8 border-y border-ink/8">
            <div className="flex items-center gap-3">
              <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand/35 bg-brand/10 text-brand-deep">
                <Users className="h-4 w-4" strokeWidth={1.8} />
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-brand/15 animate-pulse"
                />
              </span>
              <div>
                <div className="font-display text-[0.95rem] tracking-[-0.005em] text-ink leading-tight">
                  Smart Creation team
                </div>
                <div className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-stone">
                  Setup · banking · tax · written from Tecom
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 lg:hidden">
              <ArticleShare title={meta.title} slug={meta.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* Pull-quote excerpt */}
      <section className="bg-paper">
        <div className="container-edit">
          <figure className="mx-auto max-w-3xl py-12 md:py-16 border-b border-ink/8 relative">
            <span
              aria-hidden
              className="absolute -top-2 -left-2 md:left-0 font-display font-semibold text-[clamp(5rem,9vw,7rem)] leading-none text-brand/25 select-none pointer-events-none"
            >
              &ldquo;
            </span>
            <blockquote className="pl-10 md:pl-14 border-l-2 border-brand/50">
              <p className="font-display font-medium text-[clamp(1.2rem,1.85vw,1.55rem)] leading-[1.4] tracking-[-0.012em] text-ink text-balance">
                {meta.excerpt}
              </p>
            </blockquote>
          </figure>
        </div>
      </section>

      {/* Desktop sticky share rail (mobile share is in the byline strip above) */}
      <div className="hidden lg:block">
        <ArticleShare title={meta.title} slug={meta.slug} />
      </div>

      {/* Body */}
      <section className="py-10 md:py-14 bg-paper">
        <InsightArticle body={body} toc={toc} />
      </section>

      {/* Newsletter — premium subscribe card */}
      <section className="py-14 md:py-20 bg-paper">
        <div className="container-edit">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-brand/30 bg-gradient-to-br from-brand/[0.08] via-paper to-paper p-8 md:p-10 shadow-[0_22px_60px_-30px_rgba(72,168,219,0.45)]">
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(72,168,219,0.35), rgba(72,168,219,0) 70%)",
              }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-brand-deep mb-4">
                <Mail className="h-3.5 w-3.5" strokeWidth={2} />
                The insider — every other Thursday
              </div>
              <h2 className="font-display font-semibold text-[clamp(1.4rem,2.2vw,1.9rem)] leading-[1.15] tracking-[-0.015em] text-ink text-balance">
                One sharp note on Dubai setup,{" "}
                <span className="text-brand-deep">straight to your inbox.</span>
              </h2>
              <p className="mt-3 max-w-xl text-[0.96rem] leading-relaxed text-ink-mute">
                New rules, new free zones, new banking quirks — explained the
                same way we explain them to clients. Free, no spam, unsubscribe
                in one click.
              </p>
              <form
                className="mt-6 flex flex-col sm:flex-row gap-3"
                action="https://formspree.io/f/xnnjkkkk"
                method="POST"
              >
                <label className="sr-only" htmlFor="newsletter-email">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@company.com"
                  className="flex-1 rounded-full border border-ink/15 bg-paper px-5 py-3 text-[0.95rem] text-ink placeholder:text-stone focus:outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/30"
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-night px-6 py-3 text-[0.92rem] font-medium text-paper hover:bg-brand transition-colors"
                >
                  Subscribe
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {meta.faqs.length > 0 && (
        <section className="py-16 md:py-20 bg-paper-soft border-t border-ink/8">
          <div className="container-edit">
            <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-8">
              <div className="col-span-12 lg:col-span-4">
                <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-4 flex items-center gap-2">
                  <span className="h-px w-8 bg-ink/25" />§ Frequently asked
                </div>
                <h2 className="font-display font-semibold text-[clamp(1.6rem,2.4vw,2rem)] leading-[1.1] tracking-[-0.02em] text-ink text-balance">
                  Quick answers to{" "}
                  <span className="text-brand-deep">the questions we hear most.</span>
                </h2>
                <p className="mt-4 max-w-md text-[0.96rem] leading-relaxed text-ink-mute">
                  Specific to {meta.category.toLowerCase()}. Don't see yours
                  here? Tap "Book a consultation" — we'll cover it on the call.
                </p>
                <Link
                  href="/contact"
                  className="group mt-6 inline-flex items-center gap-2 rounded-full bg-brand-night px-5 py-3 text-[0.92rem] font-medium text-paper hover:bg-brand transition-colors"
                >
                  Ask your question
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </Link>
              </div>

              <ul className="col-span-12 lg:col-span-8 divide-y divide-ink/10 rounded-3xl border border-ink/10 bg-paper overflow-hidden">
                {meta.faqs.map((f, i) => (
                  <li key={i} className="group">
                    <details className="group/faq">
                      <summary className="cursor-pointer list-none flex items-start gap-4 px-5 md:px-7 py-5 md:py-6 hover:bg-paper-soft/60 transition-colors">
                        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-paper-soft font-mono text-[0.66rem] tracking-[0.16em] text-stone group-open/faq:bg-brand group-open/faq:border-brand group-open/faq:text-ink transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 font-display text-[1.05rem] md:text-[1.12rem] leading-[1.35] tracking-[-0.01em] text-ink">
                          {f.q}
                        </span>
                        <span
                          aria-hidden
                          className="mt-1.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-stone group-open/faq:text-brand-deep group-open/faq:rotate-45 transition-transform duration-300"
                        >
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.4}>
                            <path d="M12 5v14" strokeLinecap="round" />
                            <path d="M5 12h14" strokeLinecap="round" />
                          </svg>
                        </span>
                      </summary>
                      <div className="px-5 md:px-7 pb-6 md:pb-7 -mt-1">
                        <div className="ml-11 max-w-[60ch] text-[0.98rem] leading-[1.65] text-ink-mute">
                          {f.a}
                        </div>
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Related + CTA */}
      {related.length > 0 && (
        <section className="py-16 md:py-20 bg-paper-soft border-t border-ink/8">
          <div className="container-edit">
            <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-8">
              <span className="h-px w-8 bg-ink/25" />
              Keep reading
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/insights/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-paper transition-all hover:border-brand/40 hover:shadow-[0_22px_60px_-30px_rgba(72,168,219,0.45)] hover:-translate-y-0.5"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-tr from-ink/35 via-ink/0 to-transparent"
                      />
                      <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-paper/30 bg-ink/55 backdrop-blur-md px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-paper">
                        {p.category}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone mb-3">
                        {fmt(p.date)} · {p.readMinutes} min
                      </div>
                      <h3 className="font-display font-semibold text-[1.2rem] leading-[1.2] tracking-[-0.015em] text-ink text-balance">
                        {p.title.split(":")[0]}
                        <span className="text-brand-deep">.</span>
                      </h3>
                      <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-mute line-clamp-2">
                        {p.excerpt}
                      </p>
                      <div className="mt-auto pt-6 inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone group-hover:text-brand-deep transition-colors">
                        Read on
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.8}
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 md:py-28 bg-ink text-paper border-t border-paper/10">
        <div className="container-edit">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-10 items-center">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-mist mb-4">
                <span className="h-px w-8 bg-mist/40" />§ Talk to us
              </div>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-paper text-balance max-w-3xl">
                Have a setup question this guide didn't cover?{" "}
                <span className="text-brand-soft">We'll write back within a day.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-paper/75">
                Free, 30-minute consultation with the same team that licenses,
                opens accounts and files corporate tax for clients across the
                U.A.E.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:text-right">
              <div className="inline-flex flex-col gap-3 lg:items-end">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink hover:bg-paper transition-colors"
                >
                  Book a consultation
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </Link>
                <Link
                  href="/insights"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 bg-paper/5 backdrop-blur px-5 py-3 text-[0.9rem] text-paper hover:bg-paper/10 transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Read more insights
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
