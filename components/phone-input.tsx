"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { isValidPhoneNumber } from "libphonenumber-js";
import { COUNTRIES, DEFAULT_COUNTRY, type Country } from "@/lib/countries";

export type PhoneInputValue = {
  /** E.164 phone string, e.g. "+971501234567" */
  e164: string;
  /** Selected country */
  country: Country;
  /** Raw national digits typed by the user */
  national: string;
  /** Whether the current value is a valid mobile/fixed-line number */
  valid: boolean;
};

/**
 * Phone number input with a country-code selector (flag + dial code button +
 * searchable dropdown). Validates the final number via libphonenumber-js and
 * exposes the parsed value through `onChange`.
 */
export function PhoneInput({
  value,
  onChange,
  required = true,
  showError = false,
}: {
  value: PhoneInputValue;
  onChange: (next: PhoneInputValue) => void;
  required?: boolean;
  showError?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close on outside click + Escape.
  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    setTimeout(() => searchRef.current?.focus(), 30);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial.includes(q.replace(/^\+/, "")) ||
        c.iso.toLowerCase().includes(q),
    );
  }, [query]);

  function selectCountry(c: Country) {
    onChange(buildValue(c, value.national));
    setOpen(false);
    setQuery("");
  }

  function onPhoneChange(raw: string) {
    // Allow digits, spaces, dashes — keep only digits internally.
    const digits = raw.replace(/[^\d]/g, "");
    onChange(buildValue(value.country, digits));
  }

  const showInvalid = showError && !!value.national && !value.valid;
  const showRequired = showError && required && !value.national;

  return (
    <div ref={rootRef} className="relative">
      <div
        className={
          "flex items-stretch rounded-xl border bg-paper transition-colors " +
          (showInvalid || showRequired
            ? "border-red-500/60 focus-within:border-red-500"
            : "border-ink/15 focus-within:border-brand-deep")
        }
      >
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          aria-label="Select country code"
          aria-expanded={open}
          className="flex shrink-0 items-center gap-1.5 pl-3 pr-2 py-2.5 border-r border-ink/10 hover:bg-paper-soft transition-colors rounded-l-xl"
        >
          <span className="text-[1rem] leading-none" aria-hidden>
            {value.country.flag}
          </span>
          <span className="font-mono text-[0.85rem] text-ink">
            +{value.country.dial}
          </span>
          <ChevronDown
            className={
              "h-3 w-3 text-ink-mute transition-transform " +
              (open ? "rotate-180" : "")
            }
            strokeWidth={2}
          />
        </button>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required={required}
          value={formatNational(value.national)}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="50 123 4567"
          className="w-full bg-transparent px-3 py-2.5 text-[0.95rem] text-ink placeholder:text-stone/80 outline-none"
        />
      </div>

      {/* Inline validation message */}
      {(showInvalid || showRequired) && (
        <p className="mt-1.5 text-[0.78rem] text-red-600">
          {showRequired
            ? "Phone number is required."
            : "That doesn't look like a valid number. Check the country code and digits."}
        </p>
      )}

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          className="absolute left-0 top-full z-30 mt-2 w-full max-w-[360px] rounded-2xl border border-ink/10 bg-paper shadow-[0_24px_60px_-24px_rgba(13,16,19,0.35)] overflow-hidden"
        >
          <div className="border-b border-ink/10 px-3 py-2.5">
            <div className="flex items-center gap-2 rounded-lg bg-paper-soft px-2.5 py-1.5">
              <Search className="h-3.5 w-3.5 text-ink-mute" strokeWidth={1.8} />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country or code"
                className="w-full bg-transparent text-[0.85rem] text-ink placeholder:text-stone/80 outline-none"
              />
            </div>
          </div>
          <ul className="max-h-[280px] overflow-y-auto py-1">
            {filtered.map((c) => {
              const active = c.iso === value.country.iso;
              return (
                <li key={c.iso}>
                  <button
                    type="button"
                    onClick={() => selectCountry(c)}
                    className={
                      "w-full flex items-center gap-3 px-3 py-2 text-left text-[0.88rem] transition-colors " +
                      (active
                        ? "bg-brand/10 text-ink"
                        : "text-ink-mute hover:bg-paper-soft hover:text-ink")
                    }
                  >
                    <span className="text-[1.05rem] leading-none w-5 shrink-0" aria-hidden>
                      {c.flag}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{c.name}</span>
                    <span className="font-mono text-[0.78rem] text-stone shrink-0">
                      +{c.dial}
                    </span>
                  </button>
                </li>
              );
            })}
            {filtered.length === 0 && (
              <li className="px-3 py-4 text-center text-[0.85rem] text-ink-mute">
                No match for &ldquo;{query}&rdquo;.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ── Helpers ─────────────────────────────────────────────────────── */

export function emptyPhoneValue(): PhoneInputValue {
  return buildValue(DEFAULT_COUNTRY, "");
}

function buildValue(country: Country, national: string): PhoneInputValue {
  const digits = national.replace(/[^\d]/g, "");
  const e164 = digits ? `+${country.dial}${digits}` : "";
  const valid = digits ? isValidPhoneNumber(e164, country.iso as never) : false;
  return { country, national: digits, e164, valid };
}

/** Cosmetic spacing every 3-4 digits while the user types. */
function formatNational(digits: string): string {
  if (!digits) return "";
  return digits.replace(/(\d{3,4})(?=\d)/g, "$1 ");
}
