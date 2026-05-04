"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function CeoWord() {
  return (
    <section id="ceo-word" className="relative py-24 md:py-36 bg-ink text-paper overflow-hidden">
      {/* Editorial background accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #f6f3ec 1px, transparent 1px), linear-gradient(to bottom, #f6f3ec 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(72,168,219,0.18) 0%, rgba(72,168,219,0) 70%)",
        }}
      />

      <div className="container-edit relative">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 text-mist mb-10 md:mb-14"
        >
          <span className="h-px w-8 bg-mist/40" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em]">
            § 03 — A word from the CEO
          </span>
        </motion.div>

        <div className="grid grid-cols-12 gap-x-8 gap-y-12 items-start">
          {/* Portrait */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 md:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-paper/10 bg-ink-soft">
              <Image
                src="/ceo-asad-hashmi.webp"
                alt="Asad Hashmi — CEO, Smart Creation Group of Companies"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              {/* Top marker */}
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none">
                <div className="flex items-center gap-2 rounded-full bg-paper/10 backdrop-blur-md px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                  fig. 03 · Founder
                </div>
                <div className="hidden sm:flex items-center gap-2 rounded-full bg-paper/10 backdrop-blur-md px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper/85">
                  Est. MMXIII
                </div>
              </div>
            </div>
            <figcaption className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-mist">
              — Portrait · Asad Hashmi, Dubai
            </figcaption>
          </motion.figure>

          {/* Letter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 md:col-span-7 md:pl-4 lg:pl-10"
          >
            <h2 className="font-display text-balance text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-paper">
              A word from our{" "}
              <span className="text-brand-soft">CEO.</span>
            </h2>

            <div className="mt-8 space-y-5 text-[1.02rem] leading-[1.75] text-mist text-pretty max-w-2xl">
              <p>
                <strong className="text-paper font-semibold">Asad Hashmi</strong> is the
                CEO of{" "}
                <strong className="text-paper font-semibold">Smart Creation Group of Companies</strong> —
                a multi-sector group spanning business setup, real estate, technology,
                hospitality, transport and contracting across the UAE, Canada and Pakistan.
                With a proven track record of success, Asad leads the group with a
                singular focus on quality, efficiency and long-term client value.
              </p>
              <p>
                <span className="text-paper font-semibold">Our mission</span> is to empower
                businesses through seamless, efficient and innovative solutions for
                business setup, licensing, corporate structuring and office space — so
                entrepreneurs can focus on growth, productivity and success.
              </p>
              <p>
                <span className="text-paper font-semibold">Our vision</span> is to be the
                leading workspace provider and business consultancy in the UAE — recognised
                for excellence, innovation and client satisfaction. We aspire to create a
                business ecosystem where entrepreneurs thrive.
              </p>
            </div>

            <div className="mt-10">
              <div className="font-display text-[1.05rem] font-semibold text-paper leading-none">
                Asad Hashmi
              </div>
              <div className="mt-1.5 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-mist">
                CEO · Smart Creation Group of Companies
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
