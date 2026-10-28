"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";

const LINES = [
  { text: "Some rooms you don't", italic: false },
  { text: "reinvent", italic: true },
  { text: "— you keep the fire lit.", italic: false },
];

/**
 * Editorial opener: a single, confident statement set in oversized serif on
 * near-empty space, drifting gently against the scroll. No photo, no chrome —
 * the pause the reference sites all take before they start selling.
 */
export function Statement() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="border-t border-white/5 py-32 sm:py-48">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal variant="fade">
          <p className="eyebrow mb-10">Est. 1989 · Buckhead &amp; Nashville</p>
        </Reveal>
        <motion.p
          style={reduce ? undefined : { y }}
          className="font-serif text-[clamp(2rem,6vw,4.75rem)] leading-[1.08] tracking-[-0.01em] text-balance text-cream/90"
        >
          {LINES.map((l, i) => (
            <span key={i}>
              {i > 0 && " "}
              <span className={l.italic ? "italic text-gold" : undefined}>
                {l.text}
              </span>
            </span>
          ))}
        </motion.p>
        <Reveal variant="up" delay={0.1}>
          <p className="mt-10 max-w-md text-cream/55">
            A bone-in ribeye. An open flame. A band in the corner. Thirty-seven
            years on, the things worth keeping haven&rsquo;t changed.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
