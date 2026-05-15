"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { PhoneInput, emptyPhoneValue, type PhoneInputValue } from "@/components/phone-input";

const TOPICS = [
  "Company formation",
  "Visa & residency",
  "Free zone setup",
  "Banking & finance",
  "Compliance & licensing",
  "Office space / business centres",
  "Something else",
];

export function ConsultationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState<PhoneInputValue>(emptyPhoneValue());
  const [showPhoneError, setShowPhoneError] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Lock body scroll while open, restore on close.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Esc to close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Auto-focus the name field when modal opens.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => firstFieldRef.current?.focus(), 250);
    return () => clearTimeout(t);
  }, [open]);

  // Reset the success card a moment after the modal closes.
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setStatus("idle");
      setError(null);
      setShowPhoneError(false);
    }, 400);
    return () => clearTimeout(t);
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!phone.valid) {
      setShowPhoneError(true);
      return;
    }
    setStatus("sending");
    setError(null);

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: phone.e164,
      topic: String(data.get("topic") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json: { ok?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}));
      if (!res.ok || !json.ok) {
        throw new Error(
          json.error || `Couldn't send the brief (status ${res.status}).`,
        );
      }
      setStatus("sent");
      form.reset();
      setPhone(emptyPhoneValue());
      setShowPhoneError(false);
    } catch (err) {
      setStatus("idle");
      setError(
        (err as Error).message ||
          "Couldn't send right now. Try again in a moment.",
      );
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <m.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
            className="fixed inset-0 z-[60] bg-ink/65 backdrop-blur-sm"
          />

          {/* Centered modal */}
          <m.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consultation-title"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-[61] w-[calc(100vw-1.5rem)] max-w-[640px] -translate-x-1/2 -translate-y-1/2 max-h-[92vh] overflow-y-auto overflow-x-hidden rounded-3xl border border-ink/10 bg-paper shadow-[0_30px_80px_-30px_rgba(13,16,19,0.6)] overscroll-contain"
          >
            {/* Top brand stripe */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
            />
            {/* Brand glow corner */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(72,168,219,0.28), rgba(72,168,219,0) 70%)",
              }}
            />

            {/* Close — sticky inside the scroll container so it always
                stays clickable in the top-right corner. */}
            <div className="sticky top-0 z-20 flex justify-end pointer-events-none">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                aria-label="Close"
                className="pointer-events-auto m-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-paper text-ink-mute hover:text-ink hover:bg-paper-soft hover:rotate-90 transition-all shadow-[0_8px_20px_-10px_rgba(13,16,19,0.25)]"
              >
                <X className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </div>

            <div className="relative px-6 pt-1 pb-7 md:px-9 md:pt-2 md:pb-9 -mt-2">
              {status === "sent" ? (
                <SuccessCard onClose={onClose} />
              ) : (
                <>
                  <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone mb-3 flex items-center gap-2">
                    <Sparkles className="h-3 w-3 text-brand" strokeWidth={2} />
                    Free · 45 min consultation
                  </div>
                  <h2
                    id="consultation-title"
                    className="font-display font-semibold text-[clamp(1.4rem,2.4vw,1.85rem)] leading-[1.15] tracking-[-0.015em] text-ink text-balance"
                  >
                    Tell us what you&apos;re building.{" "}
                    <span className="text-brand-deep">
                      We&apos;ll come back within a day.
                    </span>
                  </h2>

                  <form onSubmit={onSubmit} className="mt-7 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field
                        label="Your name"
                        icon={<User className="h-3.5 w-3.5" />}
                      >
                        <input
                          ref={firstFieldRef}
                          name="name"
                          type="text"
                          required
                          placeholder="Jane Doe"
                          className={inputCls}
                        />
                      </Field>
                      <Field
                        label="Email"
                        icon={<Mail className="h-3.5 w-3.5" />}
                      >
                        <input
                          name="email"
                          type="email"
                          required
                          placeholder="you@company.com"
                          className={inputCls}
                        />
                      </Field>
                      <Field
                        label="Phone"
                        icon={<Phone className="h-3.5 w-3.5" />}
                      >
                        <PhoneInput
                          value={phone}
                          onChange={setPhone}
                          required
                          showError={showPhoneError}
                        />
                      </Field>
                      <Field label="Topic">
                        <select
                          name="topic"
                          defaultValue=""
                          required
                          className={inputCls + " bg-paper appearance-none"}
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

                    <Field
                      label="What you're working on"
                      icon={
                        <MessageCircle className="h-3.5 w-3.5" />
                      }
                    >
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Activity, jurisdiction preference, headcount, timing. Anything goes."
                        className={
                          "w-full bg-paper-soft/60 border border-ink/10 focus:border-brand-deep focus:ring-0 rounded-xl px-3.5 py-3 text-[0.95rem] leading-relaxed text-ink placeholder:text-stone/80 outline-none transition-colors resize-none"
                        }
                      />
                    </Field>

                    <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-3 justify-between">
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone leading-relaxed max-w-xs">
                        We&apos;ll be in touch soon
                      </span>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group relative inline-flex items-center gap-2 rounded-full bg-brand-night px-6 py-3 text-[0.92rem] font-medium text-paper transition-all hover:bg-brand disabled:opacity-70 shadow-[0_12px_28px_-14px_rgba(13,16,19,0.5)]"
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2
                              className="h-4 w-4 animate-spin"
                              strokeWidth={2}
                            />
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

                    {error && (
                      <p className="rounded-2xl border border-red-500/30 bg-red-500/[0.06] px-4 py-3 text-[0.88rem] text-ink">
                        {error}
                      </p>
                    )}
                  </form>
                </>
              )}
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}

const inputCls =
  "w-full bg-transparent border-0 border-b border-ink/15 focus:border-brand-deep focus:ring-0 px-0 py-2 text-[0.95rem] text-ink placeholder:text-stone/80 outline-none transition-colors";

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
      <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-stone mb-1 inline-flex items-center gap-1.5">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

function SuccessCard({ onClose }: { onClose: () => void }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-2"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
          <CheckCircle2 className="h-6 w-6" strokeWidth={2.2} />
        </span>
        <div className="min-w-0">
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brand-deep mb-1.5">
            Request received
          </div>
          <h3 className="font-display text-[1.25rem] md:text-[1.4rem] leading-[1.2] tracking-[-0.01em] text-ink">
            Thank you for submitting your request.
          </h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-mute">
            One of our consultants will review your brief, assess your
            requirements, and get back to you with the right plan, cost and
            timeline.
          </p>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-mute">
            If you need a faster response, feel free to WhatsApp us at{" "}
            <a
              href="https://wa.me/971555519459"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-deep font-medium hover:underline"
            >
              +971 55 551 9459
            </a>
            .
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full bg-brand-night px-5 py-2.5 text-[0.88rem] font-medium text-paper hover:bg-brand transition-colors"
            >
              Close
            </button>
            <a
              href="https://wa.me/971555519459"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-2.5 text-[0.88rem] text-ink hover:border-ink/40 transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.8} />
              WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </m.div>
  );
}
