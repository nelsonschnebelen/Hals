"use client";

import { useEffect, useRef } from "react";

/**
 * Slow-rising gold embers drifting with the steam. Lightweight canvas;
 * disabled entirely under prefers-reduced-motion.
 */
export function Embers({ count = 44 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    type P = { x: number; y: number; r: number; vy: number; drift: number; a: number; tw: number };
    const spawn = (atBottom = false): P => ({
      x: Math.random() * w,
      y: atBottom ? h + Math.random() * 40 : Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vy: Math.random() * 0.22 + 0.1,
      drift: Math.random() * 0.6 + 0.2,
      a: Math.random() * 0.5 + 0.2,
      tw: Math.random() * Math.PI * 2,
    });
    const particles = Array.from({ length: count }, () => spawn());

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y -= p.vy;
        p.tw += 0.025;
        p.x += Math.sin(p.y * 0.012) * p.drift * 0.4;
        if (p.y < -12) Object.assign(p, spawn(true));
        const alpha = p.a * (0.55 + 0.45 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197,165,114,${alpha})`;
        ctx.shadowColor = "rgba(197,165,114,0.85)";
        ctx.shadowBlur = 7;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
