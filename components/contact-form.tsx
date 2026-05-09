"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";

const TOPICS = [
  "Company formation",
  "Visa & residency",
  "Free zone setup",
  "Banking & finance",
  "Compliance & licensing",
  "Office space / business centres",
  "Something else",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    // No backend wired yet — simulate a submit. Replace with /api/contact when ready.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setStatus("idle"), 5000);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-3xl border border-ink/10 bg-paper p-6 md:p-8 lg:p-10 shadow-[0_30px_80px_-40px_rgba(13,16,19,0.25)]"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
      />

      <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-3">
        Send us a brief
      </div>
      <h2 className="font-display font-semibold text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.1] tracking-[-0.02em] text-ink text-balance">
        Tell us what you're building.{" "}
        <span className="text-brand-deep">We'll come back within a day.</span>
      </h2>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Your name" icon={<User className="h-3.5 w-3.5" />}>
          <input
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            className="w-full bg-transparent border-0 border-b border-ink/15 focus:border-brand-deep focus:ring-0 px-0 py-2.5 text-[0.98rem] text-ink placeholder:text-stone/60 outline-none transition-colors"
          />
        </Field>
        <Field label="Email" icon={<Mail className="h-3.5 w-3.5" />}>
          <input
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full bg-transparent border-0 border-b border-ink/15 focus:border-brand-deep focus:ring-0 px-0 py-2.5 text-[0.98rem] text-ink placeholder:text-stone/60 outline-none transition-colors"
          />
        </Field>
        <Field label="Phone (optional)" icon={<Phone className="h-3.5 w-3.5" />}>
          <input
            name="phone"
            type="tel"
            placeholder="+971 …"
            className="w-full bg-transparent border-0 border-b border-ink/15 focus:border-brand-deep focus:ring-0 px-0 py-2.5 text-[0.98rem] text-ink placeholder:text-stone/60 outline-none transition-colors"
          />
        </Field>
        <Field label="Topic">
          <select
            name="topic"
            defaultValue=""
            required
            className="w-full bg-transparent border-0 border-b border-ink/15 focus:border-brand-deep focus:ring-0 px-0 py-2.5 text-[0.98rem] text-ink outline-none transition-colors"
          >
            <option value="" disabled>
              Pick the closest match
            </option>
            {TOPICS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-8">
        <Field label="What you're working on" icon={<MessageCircle className="h-3.5 w-3.5" />}>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="A few sentences on what you need — activity, jurisdiction preference, headcount, timing. Anything goes."
            className="w-full bg-transparent border border-ink/15 focus:border-brand-deep focus:ring-0 rounded-xl px-3.5 py-3 text-[0.98rem] leading-relaxed text-ink placeholder:text-stone/60 outline-none transition-colors resize-none"
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 justify-between">
        <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone max-w-md leading-relaxed">
          We reply within 1 business day · No mailing list · No spam
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group relative inline-flex items-center gap-2 rounded-full bg-brand-night px-6 py-3.5 text-[0.92rem] font-medium text-paper transition-all hover:bg-brand disabled:opacity-70 shadow-[0_18px_45px_-22px_rgba(13,16,19,0.5)]"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
              Sending…
            </>
          ) : (
            <>
              Send brief
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {status === "sent" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-6 inline-flex items-start gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] px-4 py-3 text-[0.9rem] text-ink"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" strokeWidth={2.2} />
            <span>
              Brief received — we'll be back within one business day.{" "}
              <span className="text-ink-mute">
                Need it faster? Tap WhatsApp on the right.
              </span>
            </span>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/[0.06] px-4 py-3 text-[0.9rem] text-ink"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block group">
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone mb-1.5 inline-flex items-center gap-1.5">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}
