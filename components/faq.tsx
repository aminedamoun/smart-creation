"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/data";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-36 bg-paper-soft">
      <div className="container-edit">
        <div className="grid grid-cols-12 gap-x-8 gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <SectionHeader
              section="§ 11 — Questions"
              title={
                <>
                  The questions{" "}
                  <span className="text-brand-deep">founders actually ask.</span>
                </>
              }
              lede="Straight answers to the eight questions we hear most often — the same ones we'll walk through on our first call."
            />
          </div>

          <div className="col-span-12 lg:col-span-8">
            <ul className="divide-y divide-ink/10 border-t border-b border-ink/10">
              {faqs.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <li key={faq.q}>
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-start gap-6 py-6 text-left"
                    >
                      <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-stone min-w-[2.5rem] pt-1.5">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-[1.18rem] md:text-[1.32rem] leading-[1.25] tracking-[-0.01em] text-ink text-balance">
                        {faq.q}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-paper text-ink transition-all",
                          isOpen && "bg-ink text-paper border-ink rotate-45"
                        )}
                      >
                        <Plus className="h-4 w-4" strokeWidth={1.8} />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <m.div
                          key="content"
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                          }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pr-16 md:pl-[4.75rem] text-[1rem] leading-relaxed text-ink-mute text-pretty">
                            {faq.a}
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>

            <p className="mt-8 text-[0.92rem] text-ink-mute">
              Still have questions? Book a free call —{" "}
              <a href="/contact" className="text-brand-deep underline underline-offset-4 decoration-brand/40 hover:decoration-brand">
                a senior consultant will call you back within one business hour.
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
