import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { CalculatorWizard } from "@/components/calculator-wizard";

export const metadata: Metadata = {
  title: "Cost Calculator — Smart Creation Group",
  description:
    "Answer six quick questions and we'll come back with a costed UAE company-formation plan: licence, visa quota, office, banking and timeline.",
  alternates: { canonical: "/calculator" },
};

const trust = [
  "10,000+ companies launched since 2013",
  "Every mainland authority + 12 free zones",
  "Six owned business centres across Dubai",
  "Fixed fees, written plan within one business day",
];

export default function CalculatorPage() {
  return (
    <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 bg-paper overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.1), rgba(72,168,219,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[460px] w-[460px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.07), rgba(72,168,219,0) 70%)",
        }}
      />

      <div className="container-edit relative">
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-12 gap-y-10 items-start">
          {/* Left — copy */}
          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper-soft px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 inline-flex animate-ping rounded-full bg-brand opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              2-minute free estimate
            </div>

            <h1 className="font-display font-semibold tracking-[-0.025em] leading-[1.04] text-[clamp(2rem,4.4vw,3.4rem)] text-ink text-balance">
              Calculate the cost of your{" "}
              <span className="text-brand-deep">Dubai business setup.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[1.04rem] leading-relaxed text-ink-mute text-pretty">
              Answer a few quick questions and one of our consultants will
              write back with a costed plan: the right jurisdiction, licence,
              visa quota, banking and timeline for your business.
            </p>

            <ul className="mt-8 space-y-3">
              {trust.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2
                    className="h-4 w-4 mt-0.5 shrink-0 text-brand-deep"
                    strokeWidth={2}
                  />
                  <span className="text-[0.95rem] text-ink">{t}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-ink/10 bg-paper-soft p-4">
                <div className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
                  <ShieldCheck
                    className="h-3.5 w-3.5 text-brand-deep"
                    strokeWidth={1.8}
                  />
                  No obligation
                </div>
                <div className="mt-1 text-[0.86rem] text-ink-mute leading-relaxed">
                  No card needed. No mailing list. No spam.
                </div>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-paper-soft p-4">
                <div className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
                  <Sparkles
                    className="h-3.5 w-3.5 text-brand-deep"
                    strokeWidth={1.8}
                  />
                  Real consultants
                </div>
                <div className="mt-1 text-[0.86rem] text-ink-mute leading-relaxed">
                  A specialist reviews your inputs personally.
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-[0.88rem] text-ink-mute">
              <MessageCircle className="h-3.5 w-3.5 text-brand-deep" strokeWidth={1.8} />
              Prefer to chat?{" "}
              <Link
                href="https://wa.me/971555519459"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink font-medium hover:text-brand-deep transition-colors"
              >
                WhatsApp us
              </Link>
            </div>
          </div>

          {/* Right — wizard */}
          <div className="col-span-12 lg:col-span-7">
            <CalculatorWizard />
          </div>
        </div>
      </div>
    </section>
  );
}
