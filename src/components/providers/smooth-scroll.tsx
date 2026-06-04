"use client";

import { useEffect } from "react";

/**
 * Lenis smooth-scroll provider.
 *
 * Lenis is imported lazily *inside* the effect — never at module scope —
 * so it stays off the server prerender path (it touches `window`). Disabled
 * automatically when the user prefers reduced motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lenis: import("lenis").default | undefined;
    let frame = 0;

    (async () => {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    })();

    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
