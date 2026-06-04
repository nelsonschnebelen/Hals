"use client";

import { useEffect, useRef } from "react";
import { CloudImage } from "@/components/ui/cloud-image";
import { SITE } from "@/lib/content";

/**
 * Hero with the signature scroll moment: the steak photograph drifts in a
 * slow parallax while the headline settles. Parallax is GSAP/ScrollTrigger
 * and is skipped entirely under prefers-reduced-motion.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        gsap.to(imageRef.current, {
          yPercent: 18,
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

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden"
    >
      <div ref={imageRef} className="absolute inset-0 -z-10 scale-110">
        <CloudImage
          publicId="hals/hero"
          alt="A dry-aged bone-in ribeye finished over an open flame at Hal's The Steakhouse"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-20 sm:pb-28">
        <p className="eyebrow mb-6">{SITE.cities}</p>
        <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] text-balance sm:text-7xl">
          A Buckhead institution,
          <span className="block text-gold">served since 1989.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-cream/75 sm:text-lg">
          New Orleans–inspired steaks, an open kitchen, nightly live music, and a
          room that has welcomed Atlanta for more than three decades.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={SITE.reservationsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-7 py-3 text-sm font-medium uppercase tracking-eyebrow text-ink transition-transform hover:scale-[1.03]"
          >
            Reserve a Table
          </a>
          <a
            href="#story"
            className="text-sm uppercase tracking-eyebrow text-cream/70 transition-colors hover:text-gold"
          >
            Our Story ↓
          </a>
        </div>
      </div>
    </section>
  );
}
