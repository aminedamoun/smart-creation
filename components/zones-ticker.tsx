import Image from "next/image";
import { groupCompanies } from "@/lib/data";

/**
 * Continuous-scroll ticker of the Group of Companies logos —
 * same artwork the circuit-board section below uses. Pause on hover via CSS.
 */
export function ZonesTicker() {
  // Duplicate the list so the marquee loop is seamless.
  const items = [...groupCompanies, ...groupCompanies];

  return (
    <section
      aria-label="Smart Creation Group of Companies"
      className="relative overflow-hidden border-y border-ink/10 bg-ink text-paper py-6"
    >
      <div className="marquee-track flex items-center gap-14 whitespace-nowrap will-change-transform">
        {items.map((company, idx) => (
          <div
            key={`${company.id}-${idx}`}
            className="flex items-center gap-3 shrink-0"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand shrink-0" />
            <div className="relative h-9 w-[140px] shrink-0">
              <Image
                src={company.logo ?? "/group-logos/smart-creation-bc.webp"}
                alt={company.name}
                fill
                sizes="200px"
                className="object-contain object-left"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
