"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type MenuItem = {
  readonly name: string;
  readonly description: string;
  readonly image: string;
};

/**
 * Editorial menu: hovering a dish floats its photo at the cursor — the kind
 * of signature interaction premium restaurant sites are built around. The
 * reveal is desktop-only and disabled under reduced motion.
 */
export function MenuList({ items }: { items: readonly MenuItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !floatRef.current) return;
    floatRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => setActive(null)}
      className="relative mt-10 border-y border-white/5"
    >
      {items.map((item, i) => (
        <div
          key={item.name}
          onMouseEnter={() => setActive(i)}
          className="group flex items-baseline justify-between gap-6 border-b border-white/5 py-5 transition-colors last:border-b-0"
        >
          <div className="flex gap-5 transition-transform duration-500 ease-out group-hover:lg:translate-x-3">
            <span className="pt-1 font-serif text-xs italic text-gold/50 transition-colors group-hover:text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-serif text-xl text-cream transition-colors group-hover:text-gold">
                {item.name}
              </h3>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-cream/60">
                {item.description}
              </p>
            </div>
          </div>
          <span className="mt-2 hidden h-1.5 w-1.5 shrink-0 rounded-full bg-gold/40 transition-colors group-hover:bg-gold sm:block" />
        </div>
      ))}

      {/* Cursor-following reveal (desktop) */}
      <div
        ref={floatRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-64 w-48 overflow-hidden rounded-xl shadow-2xl lg:block"
        style={{
          opacity: active === null ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        {items.map((item, i) => (
          <Image
            key={item.name}
            src={item.image}
            alt=""
            fill
            sizes="192px"
            className={cn(
              "object-cover transition-opacity duration-300",
              active === i ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>
    </div>
  );
}
