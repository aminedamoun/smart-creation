import { freeZones } from "@/lib/data";

/**
 * Continuous-scroll ticker of free-zone abbreviations.
 * Reinforces "every jurisdiction" positioning. Pause on hover via CSS.
 */
export function ZonesTicker() {
  const items = [...freeZones, ...freeZones]; // duplicated for seamless loop
  return (
    <section
      aria-label="Free zones covered"
      className="relative overflow-hidden border-y border-ink/10 bg-ink text-paper py-5"
    >
      <div className="marquee-track flex gap-12 whitespace-nowrap will-change-transform">
        {items.map((zone, idx) => (
          <div
            key={`${zone.code}-${idx}`}
            className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.24em] text-paper/80"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
            <span>{zone.code}</span>
            <span className="text-paper/40">·</span>
            <span className="text-paper/55 normal-case tracking-normal font-sans">
              {zone.emirate}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
