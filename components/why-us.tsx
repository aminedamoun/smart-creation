import Image from "next/image";
import { differentiators } from "@/lib/data";
import { SectionHeader } from "@/components/ui/section-header";

const cardImages: Record<string, { src: string; alt: string }> = {
  "01": {
    src: "/services-banner.webp",
    alt: "Smart Creation Group reception · Damac Executive Heights, 19th Floor, Dubai",
  },
  "02": {
    src: "/difference/02.webp",
    alt: "Dubai skyline · home of every major U.A.E. free zone",
  },
  "03": {
    src: "/difference/03.webp",
    alt: "Fifteen years of company files · ten thousand companies",
  },
  "04": {
    src: "/difference/04.webp",
    alt: "Contracts, reports & ongoing compliance · beyond the license",
  },
};

export function WhyUs() {
  return (
    <section id="why" className="relative py-24 md:py-36">
      <div className="container-edit">
        <div className="max-w-3xl mb-14 md:mb-20">
          <SectionHeader
            section="§ 06 · The difference"
            title={
              <>
                Why founders who have done it before{" "}
                <span className="text-brand-deep">come back to us.</span>
              </>
            }
            lede="Setup agencies are not commodities. The difference shows up in the second year, when the hand-off fails, the visa renewal gets stuck, or the Corporate Tax deadline arrives. Here's what we do differently."
          />
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {differentiators.map((d, idx) => {
            const img = cardImages[d.index];
            return (
              <li
                key={d.index}
                                                                                className="group flex flex-col rounded-3xl border border-ink/10 bg-paper overflow-hidden transition-all hover:border-ink/25 hover:shadow-[0_18px_50px_-28px_rgba(13,16,19,0.3)]"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
                  {img && (
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-transparent"
                  />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-paper/95 backdrop-blur-md px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                    fig. {d.index}
                  </div>
                  <div className="absolute bottom-3 left-3 font-display text-[2.2rem] leading-none tracking-[-0.04em] text-paper drop-shadow-md">
                    {d.index}
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="font-display text-[1.25rem] md:text-[1.35rem] leading-[1.15] tracking-[-0.015em] text-ink text-balance">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-mute text-pretty">
                    {d.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
