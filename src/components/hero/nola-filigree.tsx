"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE } from "@/lib/animations";
import { FLEUR_PATHS } from "./fleur";

/**
 * French-Quarter-inspired wrought-iron ironwork: a fleur-de-lis crowns the
 * point where two mirrored flourishes sweep outward. The whole thing draws
 * itself on, stroke by stroke. Flourishes authored as one left-hand strand
 * set (1200-wide, centered at x=600) and mirrored; the fleur is the reusable
 * 64×96 mark, scaled and seated on the junction.
 */
const FLOURISH_LEFT = [
  "M600,150 C520,150 470,150 420,166 C388,176 372,196 338,190 C314,186 310,166 328,158 C340,153 352,164 344,174",
  "M600,170 C530,172 480,176 432,196 C408,206 392,222 366,218",
  "M430,164 C420,182 404,190 388,184 C404,178 412,168 430,164 Z",
];

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.8, ease: EASE.out, delay },
      opacity: { duration: 0.4, delay },
    },
  }),
};

export function NolaFiligree({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  const stroke = {
    fill: "none",
    stroke: "#c5a572",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };
  const anim = (delay: number) =>
    reduce
      ? {}
      : { variants: draw, custom: delay, initial: "hidden" as const, animate: "visible" as const };

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden>
      <svg
        viewBox="0 38 1200 198"
        className="w-full [filter:drop-shadow(0_0_5px_rgba(197,165,114,0.32))]"
        focusable="false"
      >
        {/* crowning fleur-de-lis, seated on the junction at (600,150) */}
        <g transform="translate(600,150) scale(1.32) translate(-32,-58)">
          {FLEUR_PATHS.map((d, i) => (
            <motion.path key={`f${i}`} d={d} {...stroke} {...anim(0.3 + i * 0.12)} />
          ))}
        </g>

        {/* mirrored ironwork flourishes */}
        <g>
          {FLOURISH_LEFT.map((d, i) => (
            <motion.path key={`l${i}`} d={d} {...stroke} {...anim(0.9 + i * 0.28)} />
          ))}
        </g>
        <g transform="translate(1200,0) scale(-1,1)">
          {FLOURISH_LEFT.map((d, i) => (
            <motion.path key={`r${i}`} d={d} {...stroke} {...anim(0.9 + i * 0.28)} />
          ))}
        </g>
      </svg>
    </div>
  );
}
