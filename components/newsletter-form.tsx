"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";

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
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      setStatus("idle");
      setError(
        (err as Error).message ||
          "Couldn't subscribe right now. Try again in a moment.",
      );
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 flex flex-col sm:flex-row gap-3"
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
        disabled={status === "sending" || status === "sent"}
        className="flex-1 rounded-full border border-ink/15 bg-paper px-5 py-3 text-[0.95rem] text-ink placeholder:text-stone focus:outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/30 disabled:opacity-70"
      />
      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-night px-6 py-3 text-[0.92rem] font-medium text-paper hover:bg-brand transition-colors disabled:opacity-80"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
            Subscribing…
          </>
        ) : status === "sent" ? (
          <>
            <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
            Subscribed
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
      {error && (
        <p className="sm:w-full text-[0.82rem] text-red-600 mt-1">{error}</p>
      )}
    </form>
  );
}
