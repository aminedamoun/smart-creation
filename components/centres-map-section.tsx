import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { getCentresWithMapData } from "@/lib/supabase-queries";
import type { CentreMapPin } from "@/components/centres-map";
import { CentresMapLazy } from "@/components/centres-map-lazy";

const CENTRE_LOGO: Record<string, string> = {
  "smart-creation": "/group-logos/smart-creation-bc.webp",
  "smart-place": "/group-logos/smart-place.webp",
  "smart-view": "/group-logos/smart-view.webp",
  "future-space": "/group-logos/future-space.webp",
  "smart-founders": "/group-logos/smart-founders.webp",
  "abna-rashid": "/group-logos/abna-rashid.webp",
};

type Variant = "light" | "dark";

export async function CentresMapSection({
  variant = "light",
  eyebrow = "§ On the map",
  title,
  lede,
}: {
  variant?: Variant;
  eyebrow?: string;
  title?: React.ReactNode;
  lede?: string;
}) {
  const data = await getCentresWithMapData();
  const pins: CentreMapPin[] = data.map((d) => ({
    id: d.id,
    key: d.key,
    name: d.name,
    logo: CENTRE_LOGO[d.key] ?? "/group-logos/smart-creation-bc.webp",
    address: d.address,
    officesCount: d.officesCount,
    priceMin: d.priceMin,
    priceMax: d.priceMax,
    properties: d.properties ?? [],
  }));

  const isDark = variant === "dark";

  return (
    <section
      className={
        "py-16 md:py-24 border-t " +
        (isDark
          ? "bg-ink text-paper border-paper/10"
          : "bg-paper border-ink/8")
      }
    >
      <div className="container-edit">
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-8 items-end mb-10 md:mb-12">
          <div className="col-span-12 lg:col-span-8">
            <div
              className={
                "flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] mb-4 " +
                (isDark ? "text-mist" : "text-stone")
              }
            >
              <span
                className={
                  "h-px w-8 " + (isDark ? "bg-mist/40" : "bg-ink/25")
                }
              />
              {eyebrow}
            </div>
            <h2
              className={
                "font-display font-semibold text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.02em] text-balance " +
                (isDark ? "text-paper" : "text-ink")
              }
            >
              {title ?? (
                <>
                  Six centres mapped.{" "}
                  <span className={isDark ? "text-brand-soft" : "text-brand-deep"}>
                    live office count and price range.
                  </span>
                </>
              )}
            </h2>
            {lede && (
              <p
                className={
                  "mt-5 max-w-2xl text-[1rem] leading-relaxed " +
                  (isDark ? "text-paper/70" : "text-ink-mute")
                }
              >
                {lede}
              </p>
            )}
          </div>
          <div className="col-span-12 lg:col-span-4 lg:text-right">
            <Link
              href="/business-centers"
              className={
                "group inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[0.85rem] transition-colors " +
                (isDark
                  ? "border border-paper/20 bg-paper/[0.05] text-paper hover:bg-paper/[0.1]"
                  : "border border-ink/15 bg-paper text-ink hover:border-ink/40")
              }
            >
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
              Browse all centres
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </div>
        </div>

        <CentresMapLazy pins={pins} />
      </div>
    </section>
  );
}
