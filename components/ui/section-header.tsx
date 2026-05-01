"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  section: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
};

/**
 * Editorial section header — mono section marker + serif title + optional lede.
 */
export function SectionHeader({
  section,
  title,
  lede,
  align = "left",
  theme = "light",
  className,
}: SectionHeaderProps) {
  const isDark = theme === "dark";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex items-center gap-3",
          align === "center" ? "justify-center" : "",
          isDark ? "text-mist" : "text-stone"
        )}
      >
        <span className={cn("h-px w-8", isDark ? "bg-mist/40" : "bg-ink/20")} />
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em]">
          {section}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "font-display mt-5 text-balance text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.02em]",
          isDark ? "text-paper" : "text-ink"
        )}
      >
        {title}
      </motion.h2>

      {lede && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-pretty",
            align === "center" ? "mx-auto" : "",
            isDark ? "text-mist" : "text-ink-mute"
          )}
        >
          {lede}
        </motion.p>
      )}
    </div>
  );
}
