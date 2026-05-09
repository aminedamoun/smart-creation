"use client";

import { useEffect, useState } from "react";

/**
 * Thin reading-progress bar pinned to the top of the viewport.
 * Driven directly by the document scroll position so it works
 * regardless of layout. Uses requestAnimationFrame to avoid layout
 * thrash. Renders a 2px brand-blue line that fills 0%→100%.
 */
export function ArticleProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const p = total > 0 ? doc.scrollTop / total : 0;
      setProgress(Math.max(0, Math.min(1, p)));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-brand via-brand to-brand-deep transition-[width] duration-75"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
