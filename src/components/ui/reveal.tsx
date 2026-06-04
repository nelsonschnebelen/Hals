"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { DURATION, EASE, revealVariants, type RevealVariant } from "@/lib/animations";

type RevealProps = {
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  /** Fraction of element in view before triggering (0–1). */
  amount?: number;
  once?: boolean;
  children?: React.ReactNode;
} & Omit<
  HTMLMotionProps<"div">,
  "variants" | "initial" | "whileInView" | "children"
>;

/**
 * Scroll-in wrapper. Respects prefers-reduced-motion — when set, content
 * renders immediately with no transform so nothing is hidden or animated.
 */
export function Reveal({
  variant = "up",
  delay = 0,
  duration = DURATION.base,
  amount = 0.3,
  once = true,
  children,
  ...props
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <motion.div initial={false} {...props}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={revealVariants[variant]}
      transition={{ duration, delay, ease: EASE.out }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
