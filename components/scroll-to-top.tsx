"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * Floating "scroll back to top" button. Appears in the bottom-left
 * corner once the visitor has scrolled past one viewport height, fades
 * out at the top of the page. Smooth-scrolls to the top on click.
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          key="scroll-to-top"
          type="button"
          onClick={handleClick}
          aria-label="Back to top"
          title="Back to top"
          initial={{ opacity: 0, y: 14, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.94 }}
          className="group fixed left-4 md:left-6 bottom-5 md:bottom-6 z-40 inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full border border-ink/10 bg-paper/90 text-ink backdrop-blur-md shadow-[0_18px_45px_-18px_rgba(13,16,19,0.4)] hover:border-brand/50 hover:bg-paper transition-colors"
        >
          {/* Soft brand glow on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background:
                "radial-gradient(closest-side, rgba(72,168,219,0.22), rgba(72,168,219,0) 70%)",
            }}
          />
          <ArrowUp
            className="relative h-4 w-4 md:h-[18px] md:w-[18px] transition-transform group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </m.button>
      )}
    </AnimatePresence>
  );
}
