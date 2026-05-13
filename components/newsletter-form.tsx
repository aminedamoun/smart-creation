"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Loader2, Mail } from "lucide-react";

export function NewsletterForm({ source }: { source?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const json: { ok?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}));
      if (!res.ok || !json.ok) {
        throw new Error(
          json.error || `Couldn't subscribe (status ${res.status}).`,
        );
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("idle");
      setError(
        (err as Error).message ||
          "Couldn't subscribe right now. Try again in a moment.",
      );
    }
  }

  return (
    <div className="mt-6">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <m.div
            key="thanks"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl border border-brand/35 bg-brand/[0.04] p-5 md:p-6 overflow-hidden"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(72,168,219,0.32), rgba(72,168,219,0) 70%)",
              }}
            />
            <div className="relative flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
                <CheckCircle2 className="h-5 w-5" strokeWidth={2.2} />
              </span>
              <div className="min-w-0">
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brand-deep mb-1.5">
                  Subscribed · welcome aboard
                </div>
                <h3 className="font-display text-[1.1rem] md:text-[1.2rem] leading-[1.25] tracking-[-0.01em] text-ink">
                  You&apos;re on the list. Thank you.
                </h3>
                <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-mute">
                  We send one note every other Thursday. New rules, new free
                  zones, new banking quirks. No spam. Unsubscribe any time.
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-stone">
                  <Mail className="h-3 w-3 text-brand-deep" strokeWidth={2} />
                  Check your inbox in a moment
                </div>
              </div>
            </div>
          </m.div>
        ) : (
          <m.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onSubmit={onSubmit}
            className="flex flex-col sm:flex-row gap-3"
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
              disabled={status === "sending"}
              className="flex-1 rounded-full border border-ink/15 bg-paper px-5 py-3 text-[0.95rem] text-ink placeholder:text-stone focus:outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/30 disabled:opacity-70"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-night px-6 py-3 text-[0.92rem] font-medium text-paper hover:bg-brand transition-colors disabled:opacity-80"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                  Subscribing…
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </>
              )}
            </button>
          </m.form>
        )}
      </AnimatePresence>
      {error && (
        <p className="mt-3 text-[0.82rem] text-red-600">{error}</p>
      )}
    </div>
  );
}
