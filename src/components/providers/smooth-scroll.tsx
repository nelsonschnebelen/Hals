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
    let onClick: ((e: MouseEvent) => void) | undefined;

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

      // Smooth-scroll in-page anchor links (nav + the Reserve buttons that
      // point at #locations). Lenis doesn't handle these on its own.
      onClick = (e) => {
        const link = (e.target as HTMLElement)?.closest?.(
          'a[href^="#"]',
        ) as HTMLAnchorElement | null;
        if (!link) return;
        const hash = link.getAttribute("href");
        if (!hash || hash.length < 2) return;
        const target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        lenis?.scrollTo(target as HTMLElement, { offset: -80 });
        history.pushState(null, "", hash);
      };
      document.addEventListener("click", onClick);
    })();

    return () => {
      cancelAnimationFrame(frame);
      if (onClick) document.removeEventListener("click", onClick);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
