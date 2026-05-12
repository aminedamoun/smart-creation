"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type OfficeGalleryProps = {
  images: string[];
  title: string;
};

/**
 * Hero-and-thumbnails gallery. Click a thumbnail to swap the main image.
 * Arrow keys and the on-image chevrons cycle through the set.
 */
export function OfficeGallery({ images, title }: OfficeGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const next = useCallback(
    () => setActiveIdx((i) => (i + 1) % images.length),
    [images.length]
  );
  const prev = useCallback(
    () => setActiveIdx((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <div>
      {/* Main / hero */}
      <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-paper-deep border border-ink/10">
        <AnimatePresence initial={false} mode="wait">
          <m.div
            key={images[activeIdx]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIdx]}
              alt={`${title} — photo ${activeIdx + 1} of ${images.length}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover"
            />
          </m.div>
        </AnimatePresence>

        {/* Prev / next */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-ink/55 backdrop-blur-md text-paper hover:bg-ink/80 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-ink/55 backdrop-blur-md text-paper hover:bg-ink/80 transition-colors"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-4 right-4 rounded-full bg-ink/65 backdrop-blur-md px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-paper">
          {activeIdx + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <ul
          className="mt-3 md:mt-4 grid gap-2 md:gap-3"
          style={{
            gridTemplateColumns: `repeat(auto-fill, minmax(84px, 1fr))`,
          }}
          role="tablist"
          aria-label={`${title} photos`}
        >
          {images.map((img, i) => {
            const isActive = i === activeIdx;
            return (
              <li key={img}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show photo ${i + 1}`}
                  onClick={() => setActiveIdx(i)}
                  className={cn(
                    "group relative block w-full aspect-[4/3] rounded-lg overflow-hidden border transition-all",
                    isActive
                      ? "border-brand ring-2 ring-brand/25 shadow-[0_6px_20px_-10px_rgba(72,168,219,0.5)]"
                      : "border-ink/10 opacity-75 hover:opacity-100 hover:border-ink/30"
                  )}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="96px"
                    className={cn(
                      "object-cover transition-transform duration-300",
                      !isActive && "group-hover:scale-[1.04]"
                    )}
                  />
                  {/* Number badge */}
                  <span
                    className={cn(
                      "absolute top-1 left-1 rounded px-1 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] transition-colors",
                      isActive
                        ? "bg-brand text-ink"
                        : "bg-ink/60 text-paper"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
