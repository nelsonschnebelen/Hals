"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Aurora } from "@/components/hero/aurora";
import { Embers } from "@/components/hero/embers";
import { NolaFiligree } from "@/components/hero/nola-filigree";
import { EASE } from "@/lib/animations";
import { SITE, IMG } from "@/lib/content";

const LINE_ONE = ["A", "Buckhead", "institution,"];
const LINE_TWO = ["served", "since", "1989."];

const headline: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const word: Variants = {
  hidden: { y: "115%" },
  visible: { y: 0, transition: { duration: 0.9, ease: EASE.out } },
};

/**
 * Hero: the real Hal's ribeye under self-drawing New Orleans ironwork,
 * drifting gold embers, and a slow gilded aurora. The photo parallaxes on
 * scroll. Every layer stills under prefers-reduced-motion.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        gsap.to(imageRef.current, {
          yPercent: 14,
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

  const renderWords = (words: string[]) =>
    words.map((w, i) => (
      <span key={i} className="mr-[0.28em] inline-flex overflow-hidden align-bottom">
        <motion.span variants={word} className="inline-block">
          {w}
        </motion.span>
      </span>
    ));

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden"
    >
      <div ref={imageRef} className="absolute inset-0 -z-10 scale-110">
        <Image
          src={IMG.hero}
          alt="A prime bone-in ribeye with red wine at Hal's The Steakhouse"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_80%]"
        />
        {/* Keep the steak bright; carry the headline with a base + left wash. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/10 to-transparent" />
      </div>

      <Aurora />
      <Embers />

      <div className="absolute left-1/2 top-12 w-[min(820px,90vw)] -translate-x-1/2 sm:top-16">
        <div className="animate-float-slow">
          <NolaFiligree />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 sm:pb-28">
        <motion.p
          className="eyebrow mb-6"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {SITE.cities} · Est. 1989
        </motion.p>

        <motion.h1
          className="max-w-3xl font-serif text-5xl leading-[1.05] text-balance sm:text-7xl"
          variants={headline}
          initial={reduce ? false : "hidden"}
          animate="visible"
        >
          <span className="block">{renderWords(LINE_ONE)}</span>
          <span className="block text-gold">{renderWords(LINE_TWO)}</span>
        </motion.h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
        >
          <p className="mt-6 max-w-md text-base text-cream/80 sm:text-lg">
            Prime steaks over open flame, live music, and a room worth dressing
            up for.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
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
      </div>
    </section>
  );
}
