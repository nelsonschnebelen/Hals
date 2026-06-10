"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/animations";

type ImageRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Direction the curtain lifts from. */
  from?: "bottom" | "top" | "left" | "right";
};

const CLIP_FROM: Record<NonNullable<ImageRevealProps["from"]>, string> = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * Editorial image entrance: the frame unmasks along one edge while the
 * image inside settles from an overscaled crop — the two opposing moves
 * read as a curtain lift. Size the container (aspect-*, h-*) and pass a
 * fill layer as children. Renders static under prefers-reduced-motion.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
  from = "bottom",
}: ImageRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  }

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={{ clipPath: CLIP_FROM[from] }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.2, delay, ease: EASE.out }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.22 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.6, delay, ease: EASE.out }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
