"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { googleRating, testimonials } from "@/lib/data";
import { SectionHeader } from "@/components/ui/section-header";

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-36">
      <div className="container-edit">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10 items-end mb-14 md:mb-20">
          <div className="col-span-12 lg:col-span-7">
            <SectionHeader
              section="§ 10 — Founders on record"
              title={
                <>
                  The references are our founders.{" "}
                  <span className="italic text-brand-deep">
                    Read every review on Google.
                  </span>
                </>
              }
              lede="Verified reviews from founders we've licensed, banked, and visa'd. No curated testimonials, no edits — the same reviews Google shows the world."
            />
          </div>

          {/* Google score card */}
          <div className="col-span-12 lg:col-span-5">
            <Link
              href={googleRating.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 rounded-2xl border border-ink/10 bg-paper-soft/70 px-5 py-4 hover:border-ink/25 transition-colors"
            >
              <GoogleLogo className="h-9 w-9 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-[1.6rem] font-medium leading-none text-ink">
                    {googleRating.average.toFixed(1)}
                  </span>
                  <Stars rating={5} size="md" />
                </div>
                <div className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-stone">
                  Based on {googleRating.count} Google reviews
                </div>
              </div>
              <ArrowUpRight
                className="h-4 w-4 text-ink-mute transition-all group-hover:text-brand-deep group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((t, idx) => (
            <motion.li
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: (idx % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col rounded-3xl border border-ink/10 bg-paper p-6 md:p-7"
            >
              {/* Header — avatar + name + Google badge */}
              <div className="flex items-start gap-3">
                <div
                  aria-hidden
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-semibold text-[0.95rem] text-white"
                  style={{ backgroundColor: t.avatarColor }}
                >
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-[0.95rem] text-ink truncate">
                      {t.name}
                    </span>
                    <VerifiedBadge />
                  </div>
                  <div className="text-[0.78rem] text-ink-mute truncate">
                    {t.title} · {t.company}
                  </div>
                </div>
                <GoogleLogo className="h-5 w-5 shrink-0 mt-0.5" />
              </div>

              {/* Star rating + date */}
              <div className="mt-4 flex items-center gap-2.5">
                <Stars rating={t.rating} size="sm" />
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-stone">
                  {t.date}
                </span>
              </div>

              {/* Review body */}
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-mute text-pretty">
                {t.quote}
              </p>
            </motion.li>
          ))}
        </ul>

        {/* CTA — write a review */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-8">
          <p className="max-w-xl text-[0.92rem] text-ink-mute">
            Were we your company-formation partner? A one-minute Google review is the
            highest compliment you can pay a boutique firm.
          </p>
          <Link
            href={googleRating.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.9rem] font-medium text-paper hover:bg-brand-deep transition-colors"
          >
            <GoogleLogo className="h-4 w-4" invertForDarkBg />
            Write a Google review
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.8}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────── */

function Stars({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const dim = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${dim} ${
            i < rating ? "fill-[#fbbc04] text-[#fbbc04]" : "text-ink/15"
          }`}
          strokeWidth={1.4}
        />
      ))}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <span
      title="Verified Google reviewer"
      className="inline-flex items-center justify-center rounded-full bg-[#1a73e8]/10 p-0.5"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="#1a73e8"
        aria-hidden
      >
        <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 15-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z" />
      </svg>
    </span>
  );
}

function GoogleLogo({
  className = "h-5 w-5",
  invertForDarkBg = false,
}: {
  className?: string;
  invertForDarkBg?: boolean;
}) {
  if (invertForDarkBg) {
    return (
      <svg
        viewBox="0 0 48 48"
        className={className}
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6 8-11.3 8a12 12 0 1 1 0-24c3 0 5.8 1.1 7.9 2.9l5.7-5.7A20 20 0 1 0 44 24c0-1.3-.1-2.6-.4-3.9z"
        />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#4285F4"
        d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6 8-11.3 8a12 12 0 1 1 0-24c3 0 5.8 1.1 7.9 2.9l5.7-5.7A20 20 0 1 0 44 24c0-1.3-.1-2.6-.4-3.9z"
      />
      <path
        fill="#34A853"
        d="M6.3 14.7l6.6 4.8A12 12 0 0 1 24 12c3 0 5.8 1.1 7.9 2.9l5.7-5.7A20 20 0 0 0 6.3 14.7z"
      />
      <path
        fill="#FBBC05"
        d="M24 44c5.4 0 10.3-2 14-5.4l-6.5-5.3A12 12 0 0 1 12.7 28l-6.6 5.1A20 20 0 0 0 24 44z"
      />
      <path
        fill="#EA4335"
        d="M43.6 20.1H42V20H24v8h11.3a12 12 0 0 1-3.8 5.3l6.5 5.3c3.7-3.4 6-8.5 6-14.6 0-1.3-.1-2.6-.4-3.9z"
      />
    </svg>
  );
}
