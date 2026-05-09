"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Linkedin, MessageCircle, Share2 } from "lucide-react";

/**
 * Sticky share rail — pinned to the left margin on desktop, stacks
 * inline at the top on mobile. Shows LinkedIn / WhatsApp / copy-link.
 */
export function ArticleShare({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setUrl(`${window.location.origin}/insights/${slug}`);
  }, [slug]);

  const liHref = url
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    : "#";
  const waHref = url
    ? `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`
    : "#";

  const onCopy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable, no-op */
    }
  };

  // Shared button styling — paper bg by default, brand-night fill on
  // hover/active so the click feedback reads as "selected".
  const btn =
    "group inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-paper text-ink-mute transition-all " +
    "hover:border-brand-night hover:bg-brand-night hover:text-paper hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-12px_rgba(14,53,84,0.5)] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:border-brand-night focus-visible:bg-brand-night focus-visible:text-paper " +
    "active:bg-brand active:border-brand active:text-ink";

  return (
    <aside
      aria-label="Share this article"
      className="lg:fixed lg:left-6 xl:left-10 lg:top-1/2 lg:-translate-y-1/2 lg:z-30 lg:flex-col flex flex-row items-center gap-2 lg:gap-3"
    >
      <span className="hidden lg:inline-flex items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-stone rotate-180 [writing-mode:vertical-rl] mb-1">
        <Share2 className="h-3 w-3" strokeWidth={1.8} />
        Share
      </span>
      <a
        href={liHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={btn}
      >
        <Linkedin className="h-4 w-4" strokeWidth={1.7} />
      </a>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className={btn}
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.7} />
      </a>
      <button
        type="button"
        onClick={onCopy}
        aria-label="Copy article link"
        title={copied ? "Copied!" : "Copy link"}
        className={btn}
      >
        {copied ? (
          <Check className="h-4 w-4" strokeWidth={2.2} />
        ) : (
          <Copy className="h-4 w-4" strokeWidth={1.7} />
        )}
      </button>
    </aside>
  );
}
