"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animations";

/** Stylized fleur-de-lis, drawn as gold line art (64×96 viewBox). */
export const FLEUR_PATHS = [
  // central petal
  "M32,6 C38,22 42,34 40,46 C39,52 36,56 32,58 C28,56 25,52 24,46 C22,34 26,22 32,6 Z",
  // right leaf
  "M38,55 C34,46 38,34 52,29 C50,40 49,50 41,57 Z",
  // left leaf
  "M26,55 C30,46 26,34 12,29 C14,40 15,50 23,57 Z",
  // band
  "M22,56 C28,59 36,59 42,56 C41,61 40,63 38,65 L26,65 C24,63 23,61 22,56 Z",
  // tail
  "M32,65 C35,74 40,80 32,89 C24,80 29,74 32,65 Z",
];

type FleurProps = {
  className?: string;
  delay?: number;
  /** Draw when scrolled into view instead of on mount. */
  inView?: boolean;
};

export function Fleur({ className = "", delay = 0, inView = false }: FleurProps) {
  const reduce = useReducedMotion();

  const motionProps = (i: number) => {
    if (reduce) return {};
    const span = { duration: 1.5, ease: EASE.out, delay: delay + i * 0.16 };
    const target = { pathLength: 1, opacity: 1 };
    const from = { pathLength: 0, opacity: 0 };
    const transition = { pathLength: span, opacity: { ...span, duration: 0.4 } };
    return inView
      ? {
          initial: from,
          whileInView: target,
          viewport: { once: true, amount: 0.6 },
          transition,
        }
      : { initial: from, animate: target, transition };
  };

  return (
    <svg viewBox="0 0 64 96" className={className} fill="none" aria-hidden focusable="false">
      {FLEUR_PATHS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="#c5a572"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          {...motionProps(i)}
        />
      ))}
    </svg>
  );
}
