"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  Hash,
  Quote,
  Sparkles,
} from "lucide-react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export type TocEntry = { id: string; text: string };

export function InsightArticle({
  body,
  toc,
}: {
  body: string;
  toc: TocEntry[];
}) {
  const articleRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Reading progress (scroll-bound)
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start 30%", "end end"],
  });

  // Highlight the heading currently in view
  useEffect(() => {
    if (toc.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0, 1] },
    );
    for (const t of toc) {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [toc]);

  // Per-render counters for heading order + first-paragraph (drop cap) detection
  const headingCount = useRef({ count: 0 });
  const paragraphCount = useRef({ count: 0 });
  const sawFirstHeading = useRef(false);
  headingCount.current.count = 0;
  paragraphCount.current.count = 0;
  sawFirstHeading.current = false;

  const components: Components = {
    h2: ({ children }) => {
      const idx = headingCount.current.count;
      headingCount.current.count += 1;
      sawFirstHeading.current = true;
      const text = String(children);
      // IDs come from the precomputed TOC so anchor links land exactly here
      const id = toc[idx]?.id ?? text;
      return (
        <motion.h2
          id={id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="group/heading scroll-mt-28 md:scroll-mt-32 mt-14 mb-6 relative font-display font-semibold text-ink tracking-[-0.02em] leading-[1.1] text-[clamp(1.5rem,2.4vw,2rem)]"
        >
          <a
            href={`#${id}`}
            className="inline-flex items-center gap-2 hover:text-brand-deep transition-colors"
          >
            <span
              aria-hidden
              className="inline-flex h-1.5 w-1.5 rounded-full bg-brand"
            />
            {text}
            <Hash
              className="h-4 w-4 opacity-0 group-hover/heading:opacity-100 text-brand-deep transition-opacity"
              strokeWidth={2}
            />
          </a>
        </motion.h2>
      );
    },
    h3: ({ children }) => (
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mt-9 mb-3 font-display font-medium text-ink tracking-[-0.015em] leading-[1.2] text-[1.2rem]"
      >
        {children}
      </motion.h3>
    ),
    p: ({ children }) => {
      paragraphCount.current.count += 1;
      const isFirst = paragraphCount.current.count === 1 && !sawFirstHeading.current;
      return (
        <p
          className={cn(
            "my-5 text-[1.04rem] leading-[1.7] text-ink",
            isFirst && "first-paragraph",
          )}
        >
          {children}
        </p>
      );
    },
    ul: ({ children }) => (
      <ul className="my-5 pl-5 space-y-1.5">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-5 pl-5 space-y-1.5 list-decimal marker:text-brand-deep marker:font-medium">
        {children}
      </ol>
    ),
    li: ({ children, ...rest }) => {
      const ordered = (rest as { ordered?: boolean }).ordered;
      return (
        <li
          className={cn(
            "leading-[1.65] text-ink",
            ordered ? "list-decimal" : "list-disc",
            "marker:text-brand-deep",
          )}
        >
          {children}
        </li>
      );
    },
    blockquote: ({ children }) => (
      <motion.blockquote
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.5 }}
        className="relative my-8 rounded-2xl border border-brand/30 bg-gradient-to-br from-paper-soft to-paper p-6 md:p-7 pl-12 text-ink shadow-[0_18px_50px_-30px_rgba(72,168,219,0.45)]"
      >
        <Quote
          className="absolute left-5 top-5 h-5 w-5 text-brand-deep"
          strokeWidth={2}
        />
        <div className="font-display text-[1.05rem] leading-[1.5] tracking-[-0.005em]">
          {children}
        </div>
      </motion.blockquote>
    ),
    hr: () => <hr className="my-12 border-ink/10" />,
    a: ({ children, href }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-brand-deep underline underline-offset-2 hover:text-ink transition-colors"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="text-ink-mute italic">{children}</em>
    ),
    code: ({ children }) => (
      <code className="font-mono text-[0.92em] bg-paper-soft px-1.5 py-0.5 rounded border border-ink/8">
        {children}
      </code>
    ),
    table: ({ children }) => (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.5 }}
        className="my-8 overflow-hidden rounded-2xl border border-ink/10 shadow-[0_14px_40px_-25px_rgba(13,16,19,0.25)]"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-[0.92rem] border-collapse">{children}</table>
        </div>
      </motion.div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gradient-to-br from-ink to-[#0a1419] text-paper">
        {children}
      </thead>
    ),
    th: ({ children }) => (
      <th className="text-left font-display font-medium px-4 py-3 border-b border-paper/15 text-[0.85rem] tracking-[-0.005em]">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 border-b border-ink/8 align-top text-ink">{children}</td>
    ),
  };

  return (
    <div ref={articleRef} className="relative">
      {/* Top reading-progress bar */}
      <motion.div
        aria-hidden
        className="fixed left-0 right-0 top-0 z-40 h-[3px] origin-left bg-gradient-to-r from-brand via-brand-deep to-brand"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="container-edit">
        <div className="grid grid-cols-12 gap-x-10">
          {/* Sticky TOC (lg+) */}
          {toc.length > 0 && (
            <aside className="hidden lg:block col-span-3">
              <div className="sticky top-28">
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone mb-4 flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-brand-deep" strokeWidth={2} />
                  In this article
                </div>
                <nav>
                  <ul className="space-y-1.5">
                    {toc.map((t) => {
                      const active = activeId === t.id;
                      return (
                        <li key={t.id}>
                          <a
                            href={`#${t.id}`}
                            className={cn(
                              "group relative block pl-4 pr-2 py-1.5 text-[0.86rem] leading-snug border-l-2 transition-colors",
                              active
                                ? "border-brand text-ink"
                                : "border-ink/10 text-ink-mute hover:text-ink hover:border-ink/30",
                            )}
                          >
                            <span
                              aria-hidden
                              className={cn(
                                "absolute -left-[5px] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full transition-colors",
                                active ? "bg-brand" : "bg-transparent",
                              )}
                            />
                            {t.text}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="mt-8 rounded-2xl border border-brand/30 bg-gradient-to-br from-ink to-[#0a1419] text-paper p-5 shadow-[0_22px_60px_-30px_rgba(72,168,219,0.45)]">
                  <div className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-mist mb-2 inline-flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-brand" strokeWidth={2} />
                    Need help?
                  </div>
                  <div className="font-display text-[0.98rem] leading-[1.3] text-paper text-balance">
                    Same team that writes these guides also licenses, files, and
                    runs the bank intros.
                  </div>
                  <Link
                    href="/contact"
                    className="group mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-[0.78rem] font-medium text-ink hover:bg-paper transition-colors"
                  >
                    Book a call
                    <ChevronRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={2}
                    />
                  </Link>
                </div>
              </div>
            </aside>
          )}

          {/* Article body */}
          <article
            className={cn(
              "col-span-12",
              toc.length > 0 ? "lg:col-span-9 lg:max-w-3xl" : "max-w-3xl mx-auto",
            )}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {body}
            </ReactMarkdown>
          </article>
        </div>
      </div>

      <style jsx global>{`
        .first-paragraph::first-letter {
          float: left;
          font-family: var(--font-display, ui-serif, Georgia, serif);
          font-weight: 600;
          font-size: 4.2rem;
          line-height: 0.9;
          padding: 0.25rem 0.65rem 0 0;
          color: rgb(46, 138, 184);
          letter-spacing: -0.04em;
        }
      `}</style>
    </div>
  );
}
