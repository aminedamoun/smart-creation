"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

/**
 * Animates a numeric counter from 0 → `value` when scrolled into view.
 * Preserves prefix / suffix (e.g. "10,000+", "12+", "9%").
 *
 *   <CountUp value={10000} suffix="+" />
 *   <CountUp value={12} suffix="+" />
 *   <CountUp text="6" />     (skips animation if not numeric)
 */
export function CountUp({
  value,
  prefix,
  suffix,
  duration = 1.6,
  format = (n) => Math.round(n).toLocaleString(),
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  format?: (n: number) => string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [display, setDisplay] = useState(format(0));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (n) => setDisplay(format(n)),
    });
    return () => controls.stop();
  }, [inView, value, duration, format]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
