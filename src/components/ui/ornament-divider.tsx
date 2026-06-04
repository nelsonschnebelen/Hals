"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animations";
import { Fleur } from "@/components/hero/fleur";

/** Section divider: hairlines draw outward from a fleur-de-lis on scroll-in. */
export function OrnamentDivider({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  const line = reduce
    ? {}
    : {
        initial: { scaleX: 0, opacity: 0 },
        whileInView: { scaleX: 1, opacity: 1 },
        viewport: { once: true, amount: 1 },
        transition: { duration: 0.9, ease: EASE.out },
      };

  return (
    <div className={`flex items-center justify-center gap-5 ${className}`} aria-hidden>
      <motion.span
        className="h-px w-16 origin-right bg-gradient-to-l from-gold/70 to-transparent sm:w-28"
        {...line}
      />
      <Fleur className="h-7 w-auto shrink-0 sm:h-8" inView delay={0.15} />
      <motion.span
        className="h-px w-16 origin-left bg-gradient-to-r from-gold/70 to-transparent sm:w-28"
        {...line}
      />
    </div>
  );
}
