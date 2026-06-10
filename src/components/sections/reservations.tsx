"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { EASE } from "@/lib/animations";
import { SITE } from "@/lib/content";

const LINES = ["Join us for", "the evening."];

/**
 * The finale: an oversized type moment that drifts gently against the
 * scroll, each line unmasking as it arrives. The whole block is the CTA.
 */
export function Reservations() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="reservations" ref={ref} className="relative overflow-hidden py-36 sm:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div style={reduce ? undefined : { y: drift }}>
          <Reveal variant="fade">
            <p className="eyebrow mb-10 text-center">Reservations</p>
          </Reveal>

          <h2 className="text-center font-serif text-[clamp(3.25rem,11vw,9.5rem)] leading-[0.96] tracking-[-0.02em]">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className={`block ${i === 1 ? "italic text-gold" : ""}`}
                  initial={reduce ? false : { y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1.1, delay: i * 0.12, ease: EASE.out }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <Reveal variant="up" delay={0.3}>
            <p className="mx-auto mt-10 max-w-xl text-center text-cream/75">
              Book online through OpenTable, or call us directly — someone who
              has worked here for years will pick up.
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.38}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={SITE.reservationsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gold px-8 py-3.5 text-sm font-medium uppercase tracking-eyebrow text-ink transition-transform hover:scale-[1.03]"
              >
                Reserve on OpenTable
              </a>
              <a
                href={SITE.phoneHref}
                className="rounded-full border border-white/15 px-8 py-3.5 text-sm uppercase tracking-eyebrow text-cream transition-colors hover:border-gold hover:text-gold"
              >
                {SITE.phone}
              </a>
            </div>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
