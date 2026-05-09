"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative background layer for the article masthead — adds the same
 * cursor-following ambient glow used by the homepage hero. Tracks the
 * mouse via CSS custom properties (no React re-renders).
 */
export function ArticleHeroBg() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let pendingX = 78;
    let pendingY = 32;

    const apply = () => {
      el.style.setProperty("--glow-x", `${pendingX}%`);
      el.style.setProperty("--glow-y", `${pendingY}%`);
      raf = 0;
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      pendingX = ((e.clientX - rect.left) / rect.width) * 100;
      pendingY = ((e.clientY - rect.top) / rect.height) * 100;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      pendingX = 78;
      pendingY = 32;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    // Track the parent section (so the glow follows the user across the
    // whole masthead, not just inside this layer).
    const parent = el.parentElement;
    if (!parent) return;
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    apply();

    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={
        {
          "--glow-x": "78%",
          "--glow-y": "32%",
        } as React.CSSProperties
      }
    >
      {/* Cursor-following brand-blue halo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(720px circle at var(--glow-x) var(--glow-y), rgba(72,168,219,0.22), transparent 60%)",
        }}
      />
      {/* Soft brand pool, bottom-left */}
      <div
        className="absolute -bottom-40 -left-40 h-[560px] w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(72,168,219,0.14), rgba(72,168,219,0) 70%)",
        }}
      />
      {/* Decorative grid texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f6f3ec 1px, transparent 1px), linear-gradient(to bottom, #f6f3ec 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at center, black 45%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 45%, transparent 80%)",
        }}
      />
    </div>
  );
}
