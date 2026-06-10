"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { EASE } from "@/lib/animations";
import { SITE, IMG } from "@/lib/content";

const headline: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } },
};
const word: Variants = {
  hidden: { y: "115%" },
  visible: { y: 0, transition: { duration: 1.1, ease: EASE.out } },
};

function MaskedWords({ words }: { words: { text: string; italic?: boolean }[] }) {
  return (
    <>
      {words.map((w, i) => (
        <span
          key={i}
          className="mr-[0.26em] inline-flex overflow-hidden align-bottom"
        >
          <motion.span
            variants={word}
            className={w.italic ? "inline-block italic text-gold" : "inline-block"}
          >
            {w.text}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/**
 * Hero: the real Hal's ribeye, full bleed. The frame settles from an
 * overscaled crop on load, then scrubs into parallax as you scroll while
 * the type lifts away at a slower rate — two planes of depth, no
 * decoration. Stills under prefers-reduced-motion.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Image plane: GSAP scrub, driven by Lenis' smoothed scroll.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        gsap.to(imageRef.current, {
          yPercent: 16,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }, sectionRef);
      ScrollTrigger.refresh();
    })();

    return () => ctx?.revert();
  }, []);

  // Type plane: lifts and dims slightly faster than the scroll.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden"
    >
      <div ref={imageRef} className="absolute inset-0 -z-10 scale-110">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE.out }}
        >
          <Image
            src={IMG.hero}
            alt="A prime bone-in ribeye with red wine at Hal's The Steakhouse"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_80%]"
          />
        </motion.div>
        {/* Keep the steak bright; carry the headline with a base + left wash. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/10 to-transparent" />
      </div>

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-7xl px-6 pb-24 sm:pb-32"
      >
        <motion.p
          className="eyebrow mb-7"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {SITE.cities} · Est. 1989
        </motion.p>

        <motion.h1
          className="max-w-5xl font-serif text-[clamp(3rem,8.5vw,7.25rem)] leading-[0.98] tracking-[-0.015em] text-balance"
          variants={headline}
          initial={reduce ? false : "hidden"}
          animate="visible"
        >
          <span className="block">
            <MaskedWords
              words={[{ text: "A" }, { text: "Buckhead" }, { text: "institution," }]}
            />
          </span>
          <span className="block">
            <MaskedWords
              words={[
                { text: "served", italic: true },
                { text: "since" },
                { text: "1989." },
              ]}
            />
          </span>
        </motion.h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="mt-9 flex flex-wrap items-end justify-between gap-8"
        >
          <p className="max-w-md text-base text-cream/80 sm:text-lg">
            Prime steaks over open flame, live music, and a room worth dressing
            up for.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#locations"
              className="rounded-full bg-gold px-7 py-3 text-sm font-medium uppercase tracking-eyebrow text-ink transition-transform hover:scale-[1.03]"
            >
              Reserve a Table
            </a>
            <a
              href="#menu"
              className="rounded-full border border-cream/25 px-7 py-3 text-sm uppercase tracking-eyebrow text-cream transition-colors hover:border-gold hover:text-gold"
            >
              View the Menu
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom meta rail */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute inset-x-0 bottom-0 hidden border-t border-white/10 sm:block"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-[10px] uppercase tracking-eyebrow text-cream/45">
          <span>Buckhead, Atlanta</span>
          <span className="flex items-center gap-3">
            <span className="relative block h-7 w-px overflow-hidden bg-cream/15">
              <span className="scroll-dot absolute inset-x-0 top-0 block h-1/3 bg-gold" />
            </span>
            Scroll
          </span>
          <span>Downtown Nashville</span>
        </div>
      </motion.div>
    </section>
  );
}
