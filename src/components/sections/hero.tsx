"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/animations";

const ROOMS = [
  { t: "The Dining Room", d: "Live music, nightly" },
  { t: "The Bar", d: "A proper martini" },
  { t: "The Patio", d: "Over the skyline" },
];

function Line({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE.out, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Noir hero: a condensed Anton "smash" headline — a solid word, an ember
 * word, and an outlined word that drifts on scroll — set against a full-bleed
 * ribeye that parallaxes. Kinetic but legible; stills under reduced motion.
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
          yPercent: 12,
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const driftX = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[680px] items-center overflow-hidden"
    >
      {/* Full-bleed photo, right-weighted */}
      <div ref={imageRef} className="absolute inset-y-0 left-[32%] right-0 -z-10 scale-105">
        <Image
          src="/hero.jpg"
          alt="A prime bone-in ribeye with red wine at Hal's The Steakhouse"
          fill
          priority
          sizes="70vw"
          className="object-cover object-[50%_74%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/45 to-ink/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      </div>

      <motion.div
        style={reduce ? undefined : { y: contentY }}
        className="relative mx-auto w-full max-w-7xl px-6 pb-24 lg:px-10"
      >
        <motion.p
          className="mb-6 flex items-center gap-4 text-[11px] uppercase tracking-eyebrow text-cream/55"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span className="h-px w-11 bg-gold" />
          Buckhead · Nashville · Est. 1989
        </motion.p>

        <h1 className="smash text-[clamp(72px,16vw,250px)]">
          <Line delay={reduce ? 0 : 0.3}>Open</Line>
          <Line delay={reduce ? 0 : 0.42} className="text-gold">
            Flame.
          </Line>
          <motion.span
            className="block"
            style={reduce ? undefined : { x: driftX }}
          >
            <Line delay={reduce ? 0 : 0.54} className="text-outline">
              Since 89.
            </Line>
          </motion.span>
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <p className="mt-8 max-w-md text-lg leading-relaxed text-cream/80">
            Prime cuts over live fire, a band in the corner, and a room Atlanta
            has returned to for <span className="text-cream">thirty-seven years.</span>
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#locations"
              className="rounded-full bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-eyebrow text-ink transition-transform hover:scale-[1.03]"
            >
              Reserve a Table
            </a>
            <a
              href="#menu"
              className="rounded-full border border-cream/20 px-8 py-4 text-xs uppercase tracking-eyebrow text-cream transition-colors hover:border-gold hover:text-gold"
            >
              View the Menu
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Bento strip */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="absolute inset-x-0 bottom-0 z-10 hidden grid-cols-3 border-t border-white/10 bg-ink/50 backdrop-blur sm:grid"
      >
        {ROOMS.map((r) => (
          <div
            key={r.t}
            className="border-l border-white/10 px-6 py-5 first:border-l-0 lg:px-10"
          >
            <div className="font-serif text-base italic text-gold">{r.t}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-cream/50">
              {r.d}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
