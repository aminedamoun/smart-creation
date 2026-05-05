"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0 },
};

const variantMap = { fadeUp, fadeIn, slideRight } as const;

export function Reveal({
  children,
  delay = 0,
  duration = 0.65,
  variant = "fadeUp",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  variant?: keyof typeof variantMap;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variantMap[variant]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const containerStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export function StaggerGroup({
  children,
  className,
  staggerChildren = 0.08,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Component =
    as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div;
  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        ...containerStagger,
        show: { transition: { staggerChildren } },
      }}
      className={className}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Component = as === "li" ? motion.li : motion.div;
  return (
    <Component variants={itemFadeUp} className={className}>
      {children}
    </Component>
  );
}
