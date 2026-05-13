import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="pt-40 pb-24 min-h-[70vh] flex items-center">
      <div className="container-edit">
        <div className="max-w-xl">
          <div className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone mb-3">
            § 404 · Office not found
          </div>
          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-medium tracking-[-0.02em] leading-[1.02] text-ink">
            We couldn't find that office.
          </h1>
          <p className="mt-5 text-[1rem] text-ink-mute leading-relaxed">
            The unit may have been rented or the link is outdated. Browse the
            live inventory below or reach out and we'll find you the right
            space on the floor.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#offices"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-night px-5 py-3 text-[0.9rem] font-medium text-paper hover:bg-brand transition-colors"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                strokeWidth={1.8}
              />
              See available offices
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-3 text-[0.88rem] text-ink hover:border-ink/40 transition-colors"
            >
              Ask about another unit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
