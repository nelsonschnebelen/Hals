import type { Variants } from "framer-motion";

/** Timing tokens — keep motion consistent across the site. */
export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
} as const;

/** Cubic-bezier easing tokens. */
export const EASE = {
  /** Smooth deceleration — good for entrances. */
  out: [0.16, 1, 0.3, 1],
  /** Symmetric ease for hero/cinematic moves. */
  inOut: [0.83, 0, 0.17, 1],
} as const;

const distance = 28;

/** Reusable scroll-in variants. Pair with <Reveal variant="up" />. */
export const revealVariants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -distance },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: distance },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -distance },
    visible: { opacity: 1, x: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
};

export type RevealVariant = keyof typeof revealVariants;

/** Stagger container — children with `revealVariants` animate in sequence. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};
