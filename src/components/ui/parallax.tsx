"use client";

import { useEffect, useRef } from "react";

type ParallaxProps = {
  children: React.ReactNode;
  /** Drift amount as a % of the image height (per direction). */
  speed?: number;
  className?: string;
};

/**
 * Scroll parallax for section imagery. The inner layer is taller than its
 * frame and drifts vertically as the element scrolls through the viewport,
 * giving each section the slow depth MILA uses. Stills under reduced motion.
 */
export function Parallax({ children, speed = 12, className = "" }: ParallaxProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        gsap.fromTo(
          inner.current,
          { yPercent: -speed },
          {
            yPercent: speed,
            ease: "none",
            scrollTrigger: {
              trigger: wrap.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }, wrap);
      ScrollTrigger.refresh();
    })();

    return () => ctx?.revert();
  }, [speed]);

  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`}>
      {/* Oversized so ±speed drift never exposes an edge. */}
      <div
        ref={inner}
        className="absolute -inset-y-[18%] inset-x-0 will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
