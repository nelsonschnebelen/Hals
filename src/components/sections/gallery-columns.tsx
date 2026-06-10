"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

type Item = { src: string; alt: string };

/** Per-column drift in px (± as the section scrolls through the viewport). */
const COLUMN_SPEEDS = [50, 130, 80];

/** Static top offsets so the columns start staggered, not flush. */
const COLUMN_OFFSETS = ["", "md:mt-24", "md:mt-10"];

/** Aspect rhythm down each column. */
const ASPECTS = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]"];

/**
 * Three image columns scrubbing at different rates as the section moves
 * through the viewport — the offsets between them are pure scroll depth.
 * Columns sit still under prefers-reduced-motion.
 */
export function GalleryColumns({ items }: { items: readonly Item[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const columns: Item[][] = [[], [], []];
  items.forEach((item, i) => columns[i % 3].push(item));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: ReturnType<typeof import("gsap").gsap.context> | undefined;

    (async () => {
      const { gsap, ScrollTrigger } = await import("@/lib/gsap");
      ctx = gsap.context(() => {
        gsap.utils
          .toArray<HTMLElement>("[data-gallery-col]")
          .forEach((col) => {
            const speed = Number(col.dataset.galleryCol) || 0;
            gsap.fromTo(
              col,
              { y: speed },
              {
                y: -speed,
                ease: "none",
                scrollTrigger: {
                  trigger: ref.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          });
      }, ref);
      ScrollTrigger.refresh();
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-3 gap-3 sm:gap-5">
      {columns.map((column, c) => (
        <div
          key={c}
          data-gallery-col={COLUMN_SPEEDS[c]}
          className={`flex flex-col gap-3 will-change-transform sm:gap-5 ${COLUMN_OFFSETS[c]}`}
        >
          {column.map((item, i) => (
            <Reveal
              key={`${item.src}-${i}`}
              variant="fade"
              amount={0.15}
              delay={i * 0.05}
            >
              <figure
                className={`group relative overflow-hidden bg-ink-800 ${ASPECTS[(c + i) % ASPECTS.length]}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 33vw, 30vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-ink/80 to-transparent p-4 pt-10 text-[10px] uppercase tracking-eyebrow text-cream/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:block">
                  {item.alt}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      ))}
    </div>
  );
}
