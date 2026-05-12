"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { navigation, CONTACT, type NavItem } from "@/lib/data";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Inverted = over the dark hero (top of page). Once scrolled past the dark
  // hero (or on pages with no dark hero at all) the header flips to paper-bg
  // / ink-text editorial mode.
  const inverted = !scrolled;

  useEffect(() => {
    const update = () => {
      const dark = document.querySelector<HTMLElement>("[data-dark-hero]");
      if (!dark) {
        setScrolled(true);
        return;
      }
      const rect = dark.getBoundingClientRect();
      setScrolled(rect.bottom < 80);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Close mega on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMega(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const openMega = (label: string) => {
    if (isClosing) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMega(label);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setIsClosing(true);
      setActiveMega(null);
      if (exitTimer.current) clearTimeout(exitTimer.current);
      exitTimer.current = setTimeout(() => setIsClosing(false), 260);
    }, 120);
  };

  // If the cursor leaves the entire viewport, force-close immediately
  // (catches the case where the user mouses out of the browser without
  // ever firing mouseleave on the panel).
  useEffect(() => {
    if (!activeMega) return;
    const onWindowLeave = () => scheduleCloseMega();
    document.addEventListener("mouseleave", onWindowLeave);
    return () => document.removeEventListener("mouseleave", onWindowLeave);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMega]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, []);

  const activeItem = navigation.find((n) => n.label === activeMega);

  return (
    <>
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-paper/85 backdrop-blur-xl border-b border-ink/10"
          : "bg-ink/30 backdrop-blur-md border-b border-paper/5"
      )}
    >
      {/* Editorial masthead line */}
      <div
        className={cn(
          "hidden lg:block transition-all duration-300 border-b overflow-hidden",
          scrolled ? "opacity-0 h-0 border-transparent" : "opacity-100",
          inverted ? "border-paper/15" : "border-ink/15"
        )}
      >
        <div
          className={cn(
            "container-edit flex items-center justify-between py-2 font-mono text-[0.65rem] uppercase tracking-[0.22em]",
            inverted ? "text-mist" : "text-stone"
          )}
        >
          <span>Dubai — Abu Dhabi — Sharjah — RAK</span>
          <span>Est. MMXIII · Trusted since 2013</span>
        </div>
      </div>

      {/* Main nav row */}
      <div className="container-edit">
        <nav className="flex h-20 md:h-24 items-center justify-between">
          <Link href="/" aria-label="Smart Creation Group of Companies" className="shrink-0">
            <Logo onLight={scrolled} />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0.5 text-[0.92rem]">
            {navigation.map((item) => (
              <NavItemTrigger
                key={item.label}
                item={item}
                inverted={inverted}
                isActive={activeMega === item.label}
                onOpen={() => openMega(item.label)}
                onClose={scheduleCloseMega}
              />
            ))}
          </ul>

          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href={CONTACT.phoneHref}
              className={cn(
                "hidden md:inline-flex items-center gap-2 rounded-full px-3 py-2 text-[0.85rem] font-mono transition-colors",
                inverted
                  ? "text-mist hover:text-paper"
                  : "text-ink-mute hover:text-ink"
              )}
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
              <span>{CONTACT.phone}</span>
            </Link>

            <Link
              href="/contact"
              className={cn(
                "group inline-flex items-center gap-1.5 rounded-full px-3 sm:px-4 py-2.5 text-[0.82rem] sm:text-[0.85rem] font-medium whitespace-nowrap transition-colors",
                inverted
                  ? "bg-brand text-ink hover:bg-paper"
                  : "bg-brand-night text-paper hover:bg-brand"
              )}
            >
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book consultation</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={cn(
                "lg:hidden -mr-2 p-2",
                inverted ? "text-paper" : "text-ink"
              )}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.6} />
            </button>
          </div>
        </nav>
      </div>

      {/* Mega menu panel (outside <nav> so it can span full width) */}
      <AnimatePresence>
        {activeItem?.mega && (
          <m.div
            key={activeItem.label}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute left-0 right-0 top-full hidden lg:block"
          >
            <div
              className="container-edit pt-2"
              style={{ pointerEvents: isClosing ? "none" : "auto" }}
              onMouseEnter={() => openMega(activeItem.label)}
              onMouseLeave={scheduleCloseMega}
            >
              <MegaPanel item={activeItem} inverted={inverted} />
            </div>
          </m.div>
        )}
      </AnimatePresence>

    </header>

    {/* Mobile drawer — rendered as sibling so backdrop-filter on <header>
        doesn't trap it as the containing block for position: fixed. */}
    <AnimatePresence>
      {menuOpen && (
        <MobileDrawer onClose={() => setMenuOpen(false)} />
      )}
    </AnimatePresence>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────── */

function NavItemTrigger({
  item,
  inverted,
  isActive,
  onOpen,
  onClose,
}: {
  item: NavItem;
  inverted: boolean;
  isActive: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const hasMega = !!item.mega;
  const isLabelOnly = item.noLink === true;
  const triggerClass = cn(
    "inline-flex items-center gap-1 px-3.5 py-2 rounded-full transition-colors",
    inverted
      ? "text-paper/80 hover:text-paper"
      : "text-ink/80 hover:text-ink",
    isActive && (inverted ? "text-paper" : "text-ink"),
    isLabelOnly && hasMega ? "cursor-default" : undefined,
  );
  const triggerInner = (
    <>
      {item.label}
      {hasMega && (
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            isActive && "rotate-180"
          )}
          strokeWidth={2}
        />
      )}
    </>
  );
  return (
    <li
      className="relative"
      onMouseEnter={hasMega ? onOpen : undefined}
      onMouseLeave={hasMega ? onClose : undefined}
    >
      {isLabelOnly && hasMega ? (
        <button
          type="button"
          className={triggerClass}
          onFocus={onOpen}
          onClick={() => (isActive ? onClose() : onOpen())}
          aria-expanded={isActive}
          aria-haspopup="true"
        >
          {triggerInner}
        </button>
      ) : (
        <Link
          href={item.href}
          className={triggerClass}
          onFocus={hasMega ? onOpen : undefined}
          aria-expanded={hasMega ? isActive : undefined}
          aria-haspopup={hasMega ? "true" : undefined}
        >
          {triggerInner}
        </Link>
      )}
    </li>
  );
}

/* ────────────────────────────────────────────────────────────────── */

function MegaPanel({
  item,
  inverted,
}: {
  item: NavItem;
  inverted: boolean;
}) {
  if (!item.mega) return null;
  const { groups, feature, footer } = item.mega;

  return (
    <div
      className={cn(
        "relative rounded-2xl border shadow-[0_40px_100px_-20px_rgba(0,0,0,0.45)] overflow-hidden",
        inverted
          ? "bg-ink/92 border-paper/10 backdrop-blur-2xl text-paper"
          : "bg-paper-soft/95 border-ink/10 backdrop-blur-2xl text-ink"
      )}
    >
      {/* Subtle brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-20 h-[360px] w-[360px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.18), rgba(72,168,219,0) 70%)",
        }}
      />

      <div className="relative grid grid-cols-12 gap-6 p-7 md:p-8">
        {/* Left: grouped link columns */}
        <div
          className={cn(
            "grid gap-x-4 md:gap-x-8 gap-y-7",
            feature ? "col-span-12 lg:col-span-8" : "col-span-12",
            groups.length >= 3 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2"
          )}
        >
          {groups.map((group, gIdx) => (
            <m.div
              key={group.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: gIdx * 0.04 }}
            >
              <div
                className={cn(
                  "flex items-center gap-2 mb-4 font-mono text-[0.62rem] uppercase tracking-[0.24em]",
                  inverted ? "text-mist" : "text-stone"
                )}
              >
                <span
                  className={cn(
                    "h-px w-4",
                    inverted ? "bg-paper/25" : "bg-ink/20"
                  )}
                />
                {group.title}
              </div>
              <ul className="space-y-0.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "group flex items-start gap-3 rounded-lg -mx-2 px-2 py-2 transition-colors",
                        inverted ? "hover:bg-paper/5" : "hover:bg-ink/[0.04]"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-1.5 block h-1 w-1 shrink-0 rounded-full transition-colors",
                          inverted
                            ? "bg-paper/30 group-hover:bg-brand"
                            : "bg-ink/20 group-hover:bg-brand"
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span
                            className={cn(
                              "text-[0.92rem] font-medium transition-colors",
                              inverted
                                ? "text-paper group-hover:text-brand"
                                : "text-ink group-hover:text-brand-deep"
                            )}
                          >
                            {link.label}
                          </span>
                          {link.badge && (
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full px-1.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.14em]",
                                inverted
                                  ? "bg-brand/20 text-brand"
                                  : "bg-brand/15 text-brand-deep"
                              )}
                            >
                              {link.badge}
                            </span>
                          )}
                        </span>
                        {link.desc && (
                          <span
                            className={cn(
                              "block text-[0.78rem] leading-snug mt-0.5",
                              inverted ? "text-paper/55" : "text-ink-mute"
                            )}
                          >
                            {link.desc}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </m.div>
          ))}
        </div>

        {/* Right: feature / CTA card */}
        {feature && (
          <m.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="col-span-12 lg:col-span-4"
          >
            <div
              className={cn(
                "relative h-full rounded-2xl border overflow-hidden p-6",
                inverted
                  ? "border-paper/10 bg-paper/[0.04]"
                  : "border-ink/10 bg-ink/[0.03]"
              )}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(72,168,219,0.3), rgba(72,168,219,0) 70%)",
                }}
              />
              <div className="relative flex h-full flex-col">
                <div
                  className={cn(
                    "font-mono text-[0.62rem] uppercase tracking-[0.22em] mb-3",
                    inverted ? "text-mist" : "text-stone"
                  )}
                >
                  {feature.eyebrow}
                </div>
                <h3
                  className={cn(
                    "font-display text-[1.1rem] leading-[1.2] tracking-[-0.01em] text-balance",
                    inverted ? "text-paper" : "text-ink"
                  )}
                >
                  {feature.title}
                </h3>
                <p
                  className={cn(
                    "mt-3 text-[0.85rem] leading-relaxed",
                    inverted ? "text-paper/65" : "text-ink-mute"
                  )}
                >
                  {feature.body}
                </p>
                <Link
                  href={feature.cta.href}
                  className={cn(
                    "mt-6 self-start group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.82rem] font-medium transition-colors",
                    inverted
                      ? "bg-brand text-ink hover:bg-paper"
                      : "bg-brand-night text-paper hover:bg-brand"
                  )}
                >
                  {feature.cta.label}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
                </Link>
              </div>
            </div>
          </m.div>
        )}
      </div>

      {/* Footer row */}
      {footer && (
        <div
          className={cn(
            "relative flex items-center justify-between px-7 md:px-8 py-4 border-t",
            inverted
              ? "border-paper/10 bg-paper/[0.02]"
              : "border-ink/10 bg-ink/[0.02]"
          )}
        >
          <span
            className={cn(
              "font-mono text-[0.62rem] uppercase tracking-[0.22em]",
              inverted ? "text-mist" : "text-stone"
            )}
          >
            Smart Creation Group · Dubai
          </span>
          <Link
            href={footer.href}
            className={cn(
              "group inline-flex items-center gap-1.5 text-[0.82rem] font-medium transition-colors",
              inverted ? "text-paper hover:text-brand" : "text-ink hover:text-brand-deep"
            )}
          >
            {footer.label}
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────── */

function MobileDrawer({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const easeOut = [0.22, 1, 0.36, 1] as const;

  return (
    <>
      {/* Backdrop — fades in fast, lets the page hint stay subtly visible */}
      <m.div
        key="drawer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: easeOut }}
        onClick={onClose}
        className="lg:hidden fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm"
        aria-hidden
      />

      {/* Drawer panel */}
      <m.div
        key="drawer-panel"
        initial={{ y: "8%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "6%", opacity: 0 }}
        transition={{ duration: 0.42, ease: easeOut }}
        className="lg:hidden fixed inset-0 z-50 bg-ink text-paper flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Ambient glow — floats in */}
        <m.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.05, ease: easeOut }}
          className="pointer-events-none absolute -top-40 -right-32 h-[520px] w-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(72,168,219,0.3), rgba(72,168,219,0) 70%)",
          }}
        />
        <m.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.12, ease: easeOut }}
          className="pointer-events-none absolute -bottom-44 -left-32 h-[460px] w-[460px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(72,168,219,0.18), rgba(72,168,219,0) 70%)",
          }}
        />
        {/* Decorative grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #f6f3ec 1px, transparent 1px), linear-gradient(to bottom, #f6f3ec 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />

        {/* Top bar */}
        <m.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: easeOut }}
          className="relative container-edit flex h-16 items-center justify-between border-b border-paper/10"
        >
          <Logo inverted />
          <button
            type="button"
            onClick={onClose}
            className="group -mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-paper/15 bg-paper/[0.03] text-paper transition-all hover:bg-paper/10 hover:border-paper/30 hover:rotate-90 active:scale-95"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </m.div>

        {/* Editorial strip */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.16, ease: easeOut }}
          className="relative container-edit flex items-center justify-between border-b border-paper/8 py-3 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist"
        >
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
            § Menu
          </span>
          <span className="text-paper/55">EST. 2013 · Dubai</span>
        </m.div>

        {/* Nav */}
        <nav className="relative container-edit flex-1 overflow-y-auto py-6">
          <ul>
            {navigation.map((item, i) => {
              const isExpanded = expanded === item.label;
              const hasMega = !!item.mega;
              return (
                <m.li
                  key={item.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.18 + i * 0.05,
                    ease: easeOut,
                  }}
                  className="relative border-b border-paper/8 last:border-b-0"
                >
                  {hasMega ? (
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded(isExpanded ? null : item.label)
                      }
                      className="group relative flex w-full items-center gap-4 py-4 text-left"
                      aria-expanded={isExpanded}
                    >
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist w-7 shrink-0 transition-colors group-hover:text-brand">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "flex-1 font-display text-[1.7rem] font-medium tracking-[-0.02em] leading-none transition-colors",
                          isExpanded ? "text-brand" : "text-paper group-hover:text-brand"
                        )}
                      >
                        {item.label}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-paper/55 transition-all duration-300",
                          isExpanded && "rotate-180 text-brand"
                        )}
                        strokeWidth={1.8}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group relative flex items-center gap-4 py-4"
                    >
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist w-7 shrink-0 transition-colors group-hover:text-brand">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-[1.7rem] font-medium tracking-[-0.02em] leading-none text-paper transition-colors group-hover:text-brand">
                        {item.label}
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 text-paper/40 transition-all group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.8}
                      />
                    </Link>
                  )}

                  <AnimatePresence initial={false}>
                    {isExpanded && item.mega && (
                      <m.div
                        key="mega"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: easeOut }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pl-11 pr-1 space-y-6">
                          {item.mega.groups.map((group, gi) => (
                            <m.div
                              key={group.title}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.35,
                                delay: 0.04 + gi * 0.04,
                                ease: easeOut,
                              }}
                            >
                              <div className="flex items-center gap-2 mb-2.5 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist">
                                <span className="h-px w-4 bg-paper/20" />
                                {group.title}
                              </div>
                              <ul className="space-y-2">
                                {group.links.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      onClick={onClose}
                                      className="group/link flex items-center gap-2.5 -mx-2 px-2 py-1.5 rounded-lg text-[0.92rem] text-paper/85 hover:bg-paper/5 hover:text-paper transition-colors"
                                    >
                                      <span
                                        aria-hidden
                                        className="block h-1 w-1 rounded-full bg-paper/30 group-hover/link:bg-brand transition-colors"
                                      />
                                      <span className="flex-1">{link.label}</span>
                                      {link.badge && (
                                        <span className="rounded-full bg-brand/20 px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-brand">
                                          {link.badge}
                                        </span>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </m.div>
                          ))}
                          {item.mega.feature && (
                            <m.div
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: 0.18,
                                ease: easeOut,
                              }}
                            >
                              <Link
                                href={item.mega.feature.cta.href}
                                onClick={onClose}
                                className="group/feat relative block rounded-2xl border border-paper/15 bg-paper/[0.04] p-4 overflow-hidden hover:border-brand/40 hover:bg-paper/[0.07] transition-colors"
                              >
                                <span
                                  aria-hidden
                                  className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full opacity-0 group-hover/feat:opacity-100 transition-opacity"
                                  style={{
                                    background:
                                      "radial-gradient(closest-side, rgba(72,168,219,0.45), rgba(72,168,219,0) 70%)",
                                  }}
                                />
                                <div className="relative font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mist">
                                  {item.mega.feature.eyebrow}
                                </div>
                                <div className="relative mt-1 font-display text-[0.98rem] tracking-[-0.01em] text-paper">
                                  {item.mega.feature.title}
                                </div>
                                <div className="relative mt-2.5 inline-flex items-center gap-1 text-[0.82rem] font-medium text-brand">
                                  {item.mega.feature.cta.label}
                                  <ArrowRight className="h-3 w-3 transition-transform group-hover/feat:translate-x-0.5" strokeWidth={2} />
                                </div>
                              </Link>
                            </m.div>
                          )}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42, ease: easeOut }}
          className="relative container-edit border-t border-paper/10 py-5 space-y-3"
        >
          <div className="flex items-center justify-between gap-4">
            <Link
              href={CONTACT.phoneHref}
              className="group inline-flex items-center gap-2 font-mono text-[0.82rem] text-paper/85 hover:text-paper transition-colors"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-paper/15 bg-paper/[0.05] text-brand-soft group-hover:bg-brand group-hover:text-ink group-hover:border-brand transition-colors">
                <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>
              {CONTACT.phone}
            </Link>
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-mist">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
              Office open · Mon–Sat
            </span>
          </div>

          <Link
            href="/contact"
            onClick={onClose}
            className="group flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-[0.95rem] font-medium text-ink hover:bg-paper transition-colors"
          >
            Book free consultation
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </Link>
        </m.div>
      </m.div>
    </>
  );
}
