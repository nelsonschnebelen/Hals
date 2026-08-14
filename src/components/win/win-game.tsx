"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/site/logo";

/** Where the logo and footer link point. Defaults to this site's root; the
 *  standalone (game-only) deploy sets it to the main Hal's site instead. */
const HOME_URL = process.env.NEXT_PUBLIC_HOME_URL || "/";

/** The four offers, equal 25% odds each. */
const PRIZES = [
  {
    id: "dessert",
    name: "A Free Dessert",
    detail: "Your pick from the dessert menu — soufflé, crème brûlée, and friends.",
  },
  {
    id: "drink",
    name: "A Free Drink",
    detail: "A glass of wine, a classic cocktail, or anything from the bar.",
  },
  {
    id: "appetizer",
    name: "A Free Appetizer",
    detail: "Start the evening on the house.",
  },
  {
    id: "twenty",
    name: "$20 Off $100",
    detail: "Twenty dollars off any check of one hundred dollars or more.",
  },
] as const;

type Prize = (typeof PRIZES)[number];

type Claim = {
  prizeId: Prize["id"];
  claimedAt: number;
};

const STORAGE_KEY = "hals-win-claim-v1";
const CLAIM_WINDOW_DAYS = 30;
const POUR_MS = 3200;

function drawPrize(): Prize {
  // 4 divides 2^32, so the modulo is exactly uniform — true 25% each.
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return PRIZES[buf[0] % 4];
}

function loadClaim(): Claim | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const claim = JSON.parse(raw) as Claim;
    if (!PRIZES.some((p) => p.id === claim.prizeId)) return null;
    const expired =
      Date.now() - claim.claimedAt > CLAIM_WINDOW_DAYS * 24 * 60 * 60 * 1000;
    return expired ? null : claim;
  } catch {
    return null;
  }
}

function expiryDate(claim: Claim): string {
  const d = new Date(claim.claimedAt + CLAIM_WINDOW_DAYS * 24 * 60 * 60 * 1000);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

type Stage = "idle" | "pouring" | "revealed";

export function WinGame() {
  const [stage, setStage] = useState<Stage>("idle");
  const [claim, setClaim] = useState<Claim | null>(null);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Returning guests skip straight to their existing (unexpired) prize —
  // the draw happens once per device, not once per page load.
  useEffect(() => {
    const existing = loadClaim();
    if (existing) {
      setClaim(existing);
      setStage("revealed");
    }
    return () => {
      if (revealTimer.current) clearTimeout(revealTimer.current);
    };
  }, []);

  const pour = useCallback(() => {
    if (stage !== "idle") return;
    const prize = drawPrize();
    const next: Claim = {
      prizeId: prize.id,
      claimedAt: Date.now(),
    };
    // Persist before the animation so a mid-pour refresh keeps the same result.
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Private browsing: the game still works for this page view.
    }
    setClaim(next);
    setStage("pouring");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    revealTimer.current = setTimeout(
      () => setStage("revealed"),
      reduced ? 400 : POUR_MS,
    );
  }, [stage]);

  const prize = claim ? PRIZES.find((p) => p.id === claim.prizeId)! : null;
  const filled = stage !== "idle";

  return (
    <main className="relative flex min-h-svh flex-col items-center overflow-hidden px-6 py-10 text-center">
      {/* Soft gold glow that blooms behind the glass on reveal */}
      <div
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-[38%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-1000 ${
          stage === "revealed" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(closest-side, rgba(197,165,114,0.18), transparent 70%)",
        }}
      />

      <a href={HOME_URL} aria-label="Hal's The Steakhouse — home">
        <Logo />
      </a>

      <p className="eyebrow mt-8">A toast, on us</p>
      <h1 className="mt-3 font-serif text-4xl sm:text-5xl">
        {stage === "revealed" ? (
          <>
            Cheers — <span className="italic text-gold">you won.</span>
          </>
        ) : (
          <>
            Raise a glass, <span className="italic text-gold">win a prize.</span>
          </>
        )}
      </h1>
      <p className="mt-4 max-w-md font-sans text-sm leading-relaxed text-cream/70">
        {stage === "revealed"
          ? "Show this screen to your server on your next visit."
          : "Every pour wins one of four offers — a free dessert, a free drink, a free appetizer, or $20 off $100. Tap to fill your glass."}
      </p>

      {/* The glass */}
      <div className="relative mt-6">
        <WineGlass filled={filled} pouring={stage === "pouring"} />
      </div>

      {stage !== "revealed" && (
        <button
          type="button"
          onClick={pour}
          disabled={stage !== "idle"}
          className="mt-6 border border-gold/60 px-10 py-4 font-sans text-xs uppercase tracking-eyebrow text-gold transition-colors duration-300 hover:bg-gold hover:text-ink disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gold"
        >
          {stage === "idle" ? "Click to claim" : "Pouring…"}
        </button>
      )}

      {/* Prize card */}
      <div
        aria-live="polite"
        className={`mt-8 w-full max-w-md transition-all duration-700 ${
          stage === "revealed"
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {stage === "revealed" && claim && prize && (
          <div className="border border-gold/40 bg-ink-800/80 px-8 py-8 backdrop-blur-sm">
            <p className="eyebrow">You&apos;ve won</p>
            <p className="mt-3 font-serif text-3xl text-cream sm:text-4xl">
              {prize.name}
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-cream/70">
              {prize.detail}
            </p>
            <div className="mx-auto mt-6 inline-block border border-dashed border-gold/50 px-6 py-3">
              <p className="font-sans text-sm uppercase tracking-eyebrow text-gold">
                Present to your server
              </p>
            </div>
            <p className="mt-5 font-sans text-xs text-cream/60">
              Valid through {expiryDate(claim)}
            </p>
          </div>
        )}
      </div>

      <div className="mt-auto pt-10">
        <p className="mx-auto max-w-md font-sans text-[0.65rem] leading-relaxed text-cream/40">
          *Offer value up to $20. One offer per guest per visit. Dine-in only at
          Hal&apos;s The Steakhouse, Atlanta or Nashville. Guests must be 21+ to
          redeem drink offers. Not valid with other offers, on gift cards, tax,
          or gratuity. No cash value. Offer expires 30 days after claim.
        </p>
        <a
          href={HOME_URL}
          className="mt-4 inline-block font-sans text-xs uppercase tracking-eyebrow text-gold/70 transition-colors hover:text-gold"
        >
          halsthesteakhouse.com
        </a>
      </div>
    </main>
  );
}

/**
 * Red-wine glass drawn inline so the pour can animate: the wine is a block
 * clipped to the bowl's interior, slid upward via a CSS transform transition
 * (see .wine-fill in globals.css). A thin stream shows while pouring.
 */
function WineGlass({ filled, pouring }: { filled: boolean; pouring: boolean }) {
  return (
    <svg
      viewBox="0 0 200 264"
      className="h-64 w-auto sm:h-72"
      role="img"
      aria-label={filled ? "A glass of red wine, poured" : "An empty wine glass"}
    >
      <defs>
        <clipPath id="bowl-clip">
          <path d="M52 12 C52 88 68 122 100 128 C132 122 148 88 148 12 Z" />
        </clipPath>
        <linearGradient id="wine-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8c1f32" />
          <stop offset="1" stopColor="#5c1020" />
        </linearGradient>
      </defs>

      {/* Pour stream (only while pouring) */}
      <rect
        x="97.5"
        y="-8"
        width="5"
        height="72"
        fill="#8c1f32"
        opacity={pouring ? 0.9 : 0}
        className="transition-opacity duration-300"
      />

      {/* Wine, clipped to the bowl. Drawn at its full-pour position and
          offset downward (out of the bowl) until `filled`. */}
      <g clipPath="url(#bowl-clip)">
        <g className={`wine-fill ${filled ? "wine-fill-up" : ""}`}>
          <rect x="40" y="56" width="120" height="90" fill="url(#wine-body)" />
          <ellipse cx="100" cy="56" rx="45" ry="6" fill="#a62c40" />
          <ellipse cx="86" cy="56" rx="14" ry="2.5" fill="#c04f60" opacity="0.6" />
        </g>
      </g>

      {/* Glass outline (open rim), stem, foot */}
      <path
        d="M52 12 C52 88 68 122 100 128 C132 122 148 88 148 12"
        fill="none"
        stroke="#c5a572"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="100"
        y1="128"
        x2="100"
        y2="228"
        stroke="#c5a572"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M62 240 Q100 226 138 240"
        fill="none"
        stroke="#c5a572"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Bowl highlight */}
      <path
        d="M62 24 C62 62 68 90 78 106"
        fill="none"
        stroke="#f5f1ea"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.25"
      />
    </svg>
  );
}
