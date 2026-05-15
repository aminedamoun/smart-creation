"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  ChevronRight,
  Clock,
  Coins,
  Globe2,
  HardHat,
  Home,
  Laptop,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  Quote,
  ShoppingBag,
  Sparkles,
  User,
  Users,
  Utensils,
  Warehouse,
} from "lucide-react";
import { CONTACT } from "@/lib/data";
import { PhoneInput, emptyPhoneValue, type PhoneInputValue } from "@/components/phone-input";

type Icon = React.ComponentType<{ className?: string; strokeWidth?: number }>;

type Option = {
  id: string;
  label: string;
  desc?: string;
  icon: Icon;
};

const ACTIVITY_OPTIONS: Option[] = [
  { id: "trading",     label: "Trading & Import / Export", desc: "General trading, machinery, chemicals, distribution", icon: Briefcase },
  { id: "services",    label: "Professional Services",     desc: "Consulting, marketing, agencies, freelance",        icon: Laptop },
  { id: "tech",        label: "Technology & Software",     desc: "SaaS, mobile, AI, web, IT services",                icon: Sparkles },
  { id: "real-estate", label: "Real Estate & Construction",desc: "Brokerage, developer, contracting, civil works",    icon: HardHat },
  { id: "hospitality", label: "Food & Hospitality",        desc: "F&B, holiday homes, events, tourism",               icon: Utensils },
  { id: "finance",     label: "Finance & Investment",      desc: "Holding, advisory, family office, insurance",       icon: Coins },
  { id: "other",       label: "Something else",            desc: "Tell us more in the next step",                     icon: Globe2 },
];

const JURISDICTION_OPTIONS: Option[] = [
  { id: "mainland",  label: "Mainland",   desc: "Trade anywhere in the UAE, contract with government", icon: Building2 },
  { id: "free-zone", label: "Free zone",  desc: "100% foreign ownership, tax-friendly",               icon: Globe2 },
  { id: "offshore",  label: "Offshore",   desc: "Hold assets, IP, shares — no UAE trading",            icon: Sparkles },
  { id: "not-sure",  label: "Not sure",   desc: "We'll recommend the right structure",                 icon: ChevronRight },
];

/** Numeric pill choices for the "setup details" step. */
const SHAREHOLDER_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8+"];
const VISA_OPTIONS_PILL = ["0", "1", "2", "3", "4", "5", "6", "7+"];

const OFFICE_OPTIONS: Option[] = [
  { id: "separate-office", label: "Separate office",  desc: "Standalone leased commercial unit",       icon: Building2 },
  { id: "business-centre", label: "Business centre",  desc: "Serviced office in one of our six centres", icon: Briefcase },
  { id: "warehouse",       label: "Warehouse",        desc: "Storage, logistics or light industrial",   icon: Warehouse },
  { id: "shop",            label: "Shop",             desc: "Ground-floor retail or showroom",          icon: ShoppingBag },
  { id: "own",             label: "I have my own",    desc: "Existing premises or Ejari",               icon: Home },
];

const TIMELINE_OPTIONS: Option[] = [
  { id: "asap",       label: "ASAP",          desc: "Ready to start this week",     icon: Clock },
  { id: "1-month",    label: "Within a month",desc: "Planning to launch soon",      icon: Clock },
  { id: "3-months",   label: "1 – 3 months",  desc: "Researching options",          icon: Clock },
  { id: "exploring",  label: "Just exploring",desc: "No timeline yet",              icon: Clock },
];

const REASON_OPTIONS: Option[] = [
  { id: "new-company",  label: "New company formation", desc: "Starting fresh, first U.A.E. licence",        icon: Sparkles },
  { id: "expansion",    label: "Expansion plan",        desc: "New branch, franchise or additional entity",  icon: Building2 },
  { id: "relocation",   label: "Company relocation",    desc: "Moving an existing business into the U.A.E.", icon: Globe2 },
  { id: "visa",         label: "Visa purposes only",    desc: "Need residency through a company structure",  icon: User },
];

type State = {
  activity?: string;
  jurisdiction?: string;
  reason?: string;
  shareholders?: string;
  visas?: string;
  office?: string;
  timeline?: string;
  name: string;
  email: string;
  phone: PhoneInputValue;
};

const STEPS = ["activity", "jurisdiction", "reason", "office", "timeline", "contact"] as const;
type Step = (typeof STEPS)[number];

export function CalculatorWizard() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<State>({
    name: "",
    email: "",
    phone: emptyPhoneValue(),
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [validateContact, setValidateContact] = useState(false);

  const current: Step = STEPS[step];
  const total = STEPS.length;
  const progress = ((step + 1) / total) * 100;

  function pick(field: keyof State, id: string) {
    setState((s) => ({ ...s, [field]: id }));
    // Auto-advance after a beat.
    setTimeout(() => {
      setStep((cur) => Math.min(cur + 1, total - 1));
    }, 220);
  }

  function back() {
    setStep((cur) => Math.max(cur - 1, 0));
  }
  function next() {
    setStep((cur) => Math.min(cur + 1, total - 1));
  }

  function labelFor(options: Option[], id?: string) {
    return options.find((o) => o.id === id)?.label ?? "—";
  }

  async function submit() {
    setStatus("sending");
    setError(null);
    try {
      const summary = [
        `Business activity: ${labelFor(ACTIVITY_OPTIONS, state.activity)}`,
        `Jurisdiction preference: ${labelFor(JURISDICTION_OPTIONS, state.jurisdiction)}`,
        `Setup reason: ${labelFor(REASON_OPTIONS, state.reason)}`,
        `Shareholders: ${state.shareholders ?? "—"}`,
        `Visa quota: ${state.visas ?? "—"}`,
        `Office requirement: ${labelFor(OFFICE_OPTIONS, state.office)}`,
        `Timeline: ${labelFor(TIMELINE_OPTIONS, state.timeline)}`,
      ].join("\n");

      const payload = {
        name: state.name.trim(),
        email: state.email.trim(),
        phone: state.phone.e164,
        topic: "Cost calculator request",
        message: `Cost calculator submission — please send a costed proposal.\n\n${summary}`,
      };

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
          json.error || `Couldn't submit (status ${res.status}).`,
        );
      }
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setError(
        (err as Error).message ||
          "Something went wrong. Please try again in a moment.",
      );
    }
  }

  const canSubmit =
    !!state.activity &&
    !!state.jurisdiction &&
    !!state.reason &&
    !!state.shareholders &&
    !!state.visas &&
    !!state.office &&
    !!state.timeline &&
    state.name.trim().length > 1 &&
    /.+@.+\..+/.test(state.email) &&
    state.phone.valid &&
    status !== "sending";

  function handleSubmitClick() {
    setValidateContact(true);
    if (canSubmit) submit();
  }

  /* ── Success state — personalised proposal-pending card ────────── */

  if (status === "sent") {
    const firstName = (state.name.trim().split(/\s+/)[0] || "there").replace(
      /[^a-zA-Z'\-]/g,
      "",
    ) || "there";

    const activityLabel = labelFor(ACTIVITY_OPTIONS, state.activity).replace(
      /\s*&\s*Import \/ Export/i,
      "",
    );

    const visaPhrase = (() => {
      const v = state.visas;
      if (!v) return "your team";
      if (v === "0") return "no visas yet";
      if (v === "1") return "1 visa";
      return `${v} visas`;
    })();

    return (
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="text-center md:text-left">
          <h2 className="font-display font-semibold tracking-[-0.025em] leading-[1.04] text-[clamp(1.8rem,3.6vw,2.6rem)] text-ink text-balance">
            Your setup estimate is{" "}
            <span className="text-brand-deep">almost ready</span>
            {firstName !== "there" ? `, ${firstName}.` : "."}
          </h2>
          <p className="mt-4 text-[1rem] leading-relaxed text-ink-mute max-w-2xl md:max-w-none">
            Book a free 15-minute call with the{" "}
            <span className="text-ink font-medium">Smart Creation team</span> to
            receive your personalised business-setup proposal with detailed
            costs and timelines.
          </p>
        </div>

        <div className="mt-7 relative overflow-hidden rounded-3xl border border-ink/10 bg-paper p-5 md:p-7 shadow-[0_30px_80px_-40px_rgba(13,16,19,0.25)]">
          {/* Top brand stripe */}
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
          />
          {/* Soft brand corner */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-60 w-60 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(72,168,219,0.22), rgba(72,168,219,0) 70%)",
            }}
          />

          {/* Header: brand mark + name + role */}
          <div className="relative flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-ink/10 bg-paper-soft p-2">
              <Image
                src="/sc-cube.png"
                alt="Smart Creation Group"
                fill
                sizes="56px"
                className="object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="font-display text-[1.05rem] tracking-[-0.005em] text-ink">
                Smart Creation Group
              </div>
              <div className="mt-0.5 text-[0.82rem] text-ink-mute">
                Business Setup Consultancy · Dubai
              </div>
              <div className="mt-1 inline-flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-stone">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                English · Arabic · Urdu
              </div>
            </div>
          </div>

          {/* Personalised quote */}
          <div className="relative mt-5 rounded-2xl border border-brand/30 bg-brand/[0.06] p-4 md:p-5">
            <Quote
              aria-hidden
              className="absolute left-3 top-3 h-4 w-4 text-brand-deep/60"
              strokeWidth={2}
            />
            <p className="pl-7 text-[0.95rem] leading-relaxed text-ink">
              Hi{" "}
              <span className="font-medium">
                {firstName !== "there" ? firstName : "there"}
              </span>
              , I&apos;ve reviewed your requirements for a{" "}
              <span className="font-medium">{activityLabel.toLowerCase()}</span>{" "}
              setup with <span className="font-medium">{visaPhrase}</span>. I
              have some great options for you. Let&apos;s connect and I&apos;ll
              walk you through everything.
            </p>
          </div>

          {/* Action buttons */}
          <div className="relative mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={CONTACT.phoneHref}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-paper px-5 py-3 text-[0.9rem] font-medium text-ink hover:border-ink/40 hover:bg-paper-soft transition-colors"
            >
              <Phone className="h-4 w-4" strokeWidth={1.8} />
              Call ({CONTACT.phone})
            </a>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-[0.9rem] font-medium text-paper hover:bg-emerald-700 transition-colors"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.8} />
              WhatsApp
            </a>
          </div>

          {/* Email line */}
          <div className="relative mt-4 text-center">
            <a
              href={CONTACT.emailHref}
              className="inline-flex items-center gap-1.5 text-[0.85rem] text-ink-mute hover:text-ink transition-colors"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.8} />
              Email: {CONTACT.email}
            </a>
          </div>
        </div>

        <p className="mt-5 text-center font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
          A copy of your brief was sent to our team · We&apos;ll be in touch soon
        </p>
      </m.div>
    );
  }

  /* ── Wizard ────────────────────────────────────────────────────── */

  return (
    <div className="relative rounded-3xl border border-ink/10 bg-paper p-6 md:p-10 shadow-[0_30px_80px_-40px_rgba(13,16,19,0.25)] overflow-hidden">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent"
      />

      {/* Progress + step counter */}
      <div className="mb-7">
        <div className="h-1.5 w-full rounded-full bg-paper-soft overflow-hidden">
          <m.div
            className="h-full rounded-full bg-gradient-to-r from-brand via-brand-deep to-brand"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
          <span>
            Step {step + 1} / {total}
          </span>
          <span className="text-brand-deep">
            {current === "activity"
              ? "Activity"
              : current === "jurisdiction"
                ? "Jurisdiction"
                : current === "reason"
                  ? "Setup details"
                  : current === "office"
                    ? "Office"
                    : current === "timeline"
                      ? "Timeline"
                      : "Contact"}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={current}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {current === "activity" && (
            <StepPick
              title="What type of business are you setting up?"
              subtitle="Pick the closest match — we'll refine in the proposal."
              options={ACTIVITY_OPTIONS}
              value={state.activity}
              onPick={(id) => pick("activity", id)}
            />
          )}

          {current === "jurisdiction" && (
            <StepPick
              title="Where do you want to operate?"
              subtitle="Each option has different cost, ownership and trading implications."
              options={JURISDICTION_OPTIONS}
              value={state.jurisdiction}
              onPick={(id) => pick("jurisdiction", id)}
            />
          )}

          {current === "reason" && (
            <StepSetupDetails
              state={state}
              onChange={(patch) => setState((s) => ({ ...s, ...patch }))}
            />
          )}

          {current === "office" && (
            <StepPick
              title="What kind of office?"
              subtitle="Most licences require an address. We own and operate six centres in Dubai."
              options={OFFICE_OPTIONS}
              value={state.office}
              onPick={(id) => pick("office", id)}
            />
          )}

          {current === "timeline" && (
            <StepPick
              title="What's your timeline?"
              subtitle="So we can prioritise the file."
              options={TIMELINE_OPTIONS}
              value={state.timeline}
              onPick={(id) => pick("timeline", id)}
            />
          )}

          {current === "contact" && (
            <StepContact
              state={state}
              showErrors={validateContact}
              onChange={(patch) =>
                setState((s) => ({ ...s, ...patch }))
              }
            />
          )}
        </m.div>
      </AnimatePresence>

      {/* Footer nav */}
      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="group inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-paper px-4 py-2 text-[0.85rem] text-ink-mute hover:text-ink hover:border-ink/40 transition-colors disabled:opacity-40 disabled:hover:text-ink-mute disabled:hover:border-ink/15"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
          Back
        </button>

        {current === "contact" ? (
          <button
            type="button"
            onClick={handleSubmitClick}
            disabled={status === "sending"}
            className="group inline-flex items-center gap-2 rounded-full bg-brand-night px-6 py-3 text-[0.92rem] font-medium text-paper hover:bg-brand transition-colors disabled:opacity-60 shadow-[0_12px_28px_-14px_rgba(13,16,19,0.5)]"
          >
            {status === "sending" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
                Sending…
              </>
            ) : (
              <>
                Get my proposal
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            disabled={
              (current === "activity" && !state.activity) ||
              (current === "jurisdiction" && !state.jurisdiction) ||
              (current === "reason" &&
                (!state.reason || !state.shareholders || !state.visas)) ||
              (current === "office" && !state.office) ||
              (current === "timeline" && !state.timeline)
            }
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[0.88rem] font-medium text-paper hover:bg-brand-night transition-colors disabled:opacity-40"
          >
            Continue
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </button>
        )}
      </div>

      {error && (
        <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/[0.06] px-4 py-3 text-[0.88rem] text-ink">
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Setup details step (reason + shareholders + visas) ─────────── */

function StepSetupDetails({
  state,
  onChange,
}: {
  state: State;
  onChange: (patch: Partial<State>) => void;
}) {
  return (
    <div>
      <h2 className="font-display font-semibold text-[1.4rem] md:text-[1.65rem] leading-[1.2] tracking-[-0.015em] text-ink text-balance">
        Tell us a bit more about your setup.
      </h2>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-mute">
        Three quick questions so we can size your licence correctly.
      </p>

      {/* Reason */}
      <div className="mt-6">
        <p className="font-display text-[1.02rem] text-ink mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-brand-deep" strokeWidth={1.8} />
          What&apos;s your main reason for setting up in the U.A.E.?
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {REASON_OPTIONS.map((o) => {
            const Icon = o.icon;
            const active = state.reason === o.id;
            return (
              <li key={o.id}>
                <button
                  type="button"
                  onClick={() => onChange({ reason: o.id })}
                  className={
                    "group w-full flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-all " +
                    (active
                      ? "border-brand-deep bg-brand/[0.06] shadow-[0_10px_24px_-14px_rgba(72,168,219,0.5)]"
                      : "border-ink/12 bg-paper hover:border-brand/45 hover:bg-paper-soft")
                  }
                >
                  <span
                    className={
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors " +
                      (active
                        ? "border-brand bg-brand text-ink"
                        : "border-ink/10 bg-paper-soft text-brand-deep")
                    }
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[0.95rem] tracking-[-0.005em] text-ink">
                      {o.label}
                    </span>
                    <span className="block mt-0.5 text-[0.78rem] text-ink-mute">
                      {o.desc}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Shareholders */}
      <div className="mt-7">
        <p className="font-display text-[1.02rem] text-ink mb-3 flex items-center gap-2">
          <Users className="h-4 w-4 text-brand-deep" strokeWidth={1.8} />
          How many owners / shareholders?
        </p>
        <PillRow
          options={SHAREHOLDER_OPTIONS}
          value={state.shareholders}
          onPick={(v) => onChange({ shareholders: v })}
        />
      </div>

      {/* Visas */}
      <div className="mt-7">
        <p className="font-display text-[1.02rem] text-ink mb-3 flex items-center gap-2">
          <User className="h-4 w-4 text-brand-deep" strokeWidth={1.8} />
          How many residence visas do you need?
        </p>
        <PillRow
          options={VISA_OPTIONS_PILL}
          value={state.visas}
          onPick={(v) => onChange({ visas: v })}
        />
      </div>
    </div>
  );
}

function PillRow({
  options,
  value,
  onPick,
}: {
  options: string[];
  value: string | undefined;
  onPick: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onPick(o)}
            className={
              "h-12 rounded-2xl border text-[0.95rem] font-medium transition-all " +
              (active
                ? "border-brand-night bg-brand-night text-paper shadow-[0_8px_20px_-10px_rgba(14,53,84,0.5)]"
                : "border-ink/12 bg-paper text-ink hover:border-brand/45 hover:bg-paper-soft")
            }
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

/* ── Option grid step ───────────────────────────────────────────── */

function StepPick({
  title,
  subtitle,
  options,
  value,
  onPick,
}: {
  title: string;
  subtitle: string;
  options: Option[];
  value: string | undefined;
  onPick: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display font-semibold text-[1.4rem] md:text-[1.65rem] leading-[1.2] tracking-[-0.015em] text-ink text-balance">
        {title}
      </h2>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-mute">
        {subtitle}
      </p>
      <ul className="mt-6 space-y-2.5">
        {options.map((o) => {
          const Icon = o.icon;
          const active = value === o.id;
          return (
            <li key={o.id}>
              <button
                type="button"
                onClick={() => onPick(o.id)}
                className={
                  "group w-full flex items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-all " +
                  (active
                    ? "border-brand-deep bg-brand/[0.06] shadow-[0_10px_24px_-14px_rgba(72,168,219,0.5)]"
                    : "border-ink/12 bg-paper hover:border-brand/45 hover:bg-paper-soft")
                }
              >
                <span
                  className={
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors " +
                    (active
                      ? "border-brand bg-brand text-ink"
                      : "border-ink/10 bg-paper-soft text-brand-deep group-hover:bg-brand/15 group-hover:border-brand/40")
                  }
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1rem] tracking-[-0.005em] text-ink">
                    {o.label}
                  </span>
                  {o.desc && (
                    <span className="block mt-0.5 text-[0.85rem] text-ink-mute">
                      {o.desc}
                    </span>
                  )}
                </span>
                <ChevronRight
                  className={
                    "h-4 w-4 shrink-0 transition-transform " +
                    (active
                      ? "text-brand-deep translate-x-0.5"
                      : "text-ink-mute/60 group-hover:text-ink-mute group-hover:translate-x-0.5")
                  }
                  strokeWidth={1.8}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── Contact details step ───────────────────────────────────────── */

function StepContact({
  state,
  showErrors,
  onChange,
}: {
  state: State;
  showErrors: boolean;
  onChange: (patch: Partial<State>) => void;
}) {
  return (
    <div>
      <h2 className="font-display font-semibold text-[1.4rem] md:text-[1.65rem] leading-[1.2] tracking-[-0.015em] text-ink text-balance">
        Where should we send your proposal?
      </h2>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-mute">
        We&apos;ll review your inputs and write back with a costed plan,
        timeline, banking introductions and office options.
      </p>

      <div className="mt-6 space-y-5">
        <Field label="Your name" icon={<User className="h-3.5 w-3.5" />}>
          <input
            type="text"
            required
            value={state.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Jane Doe"
            className={inputCls}
          />
        </Field>
        <Field label="Email" icon={<Mail className="h-3.5 w-3.5" />}>
          <input
            type="email"
            required
            value={state.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="you@company.com"
            className={inputCls}
          />
        </Field>
        <Field label="Phone" icon={<Phone className="h-3.5 w-3.5" />}>
          <PhoneInput
            value={state.phone}
            onChange={(next) => onChange({ phone: next })}
            required
            showError={showErrors}
          />
        </Field>
      </div>

      <div className="mt-5 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
        We&apos;ll be in touch soon
      </div>
    </div>
  );
}

const inputCls =
  "w-full bg-transparent border-0 border-b border-ink/15 focus:border-brand-deep focus:ring-0 px-0 py-2.5 text-[0.98rem] text-ink placeholder:text-stone/80 outline-none transition-colors";

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
    <label className="block">
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone mb-1.5 inline-flex items-center gap-1.5">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}
