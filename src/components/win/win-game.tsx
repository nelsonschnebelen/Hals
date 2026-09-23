"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/site/logo";

/** Where the logo and footer link point. Defaults to this site's root; the
 *  standalone (game-only) deploy sets it to the main Hal's site instead. */
const HOME_URL = process.env.NEXT_PUBLIC_HOME_URL || "/";

/** The four offers, equal 25% odds each. `claimUrl` is the Dishio opt-in form
 *  for that prize — the guest fills it out to receive their coupon.
 *  TODO: paste the real Dishio form link for each prize (placeholders below). */
const PRIZES = [
  {
    id: "dessert",
    name: "A Free Dessert",
    cta: "Claim your dessert",
    claimUrl: "#dessert-form",
  },
  {
    id: "drink",
    name: "A Free Drink",
    cta: "Claim your drink",
    claimUrl: "#drink-form",
  },
  {
    id: "appetizer",
    name: "A Free Appetizer",
    cta: "Claim your appetizer",
    claimUrl: "#appetizer-form",
  },
  {
    id: "twenty",
    name: "$20 Off $100",
    cta: "Claim your promotion",
    claimUrl: "#promotion-form",
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

/** Review/demo mode: skip persistence entirely so every refresh deals a fresh
 *  game. Build with NEXT_PUBLIC_REPLAY=1 while stakeholders are reviewing;
 *  omit it for the launch build so each guest's prize locks to their device. */
const REPLAY_MODE = process.env.NEXT_PUBLIC_REPLAY === "1";

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

type Stage = "idle" | "pouring" | "revealed";

export function WinGame() {
  const [stage, setStage] = useState<Stage>("idle");
  const [claim, setClaim] = useState<Claim | null>(null);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Returning guests skip straight to their existing (unexpired) prize —
  // the draw happens once per device, not once per page load.
  useEffect(() => {
    const existing = REPLAY_MODE ? null : loadClaim();
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
    if (!REPLAY_MODE) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Private browsing: the game still works for this page view.
      }
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
        <Logo className="!h-16 sm:!h-20" />
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
          ? "Claim below and we'll send your coupon."
          : "Every pour wins one of four offers — a free drink, a free dessert, a free appetizer, or $20 off $100. Tap to fill your glass."}
      </p>

      {/* The glass, with the prize revealed inside the wine */}
      <div className="relative mt-4">
        <WineGlass filled={filled} pouring={stage === "pouring"} />
        <div
          aria-live="polite"
          className={`absolute inset-x-0 top-[34%] flex flex-col items-center px-10 transition-opacity duration-1000 ${
            stage === "revealed" ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          style={{ textShadow: "0 1px 12px rgba(10,8,7,0.55)" }}
        >
          {stage === "revealed" && prize && (
            <>
              <p className="font-sans text-[0.65rem] uppercase tracking-eyebrow text-cream/80">
                You&apos;ve won
              </p>
              <p className="mt-2 font-serif text-3xl leading-tight text-cream sm:text-4xl">
                {prize.name}
              </p>
            </>
          )}
        </div>
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

      {/* Claim CTA, below the glass — leads to the prize's opt-in coupon form */}
      <div
        className={`mt-6 w-full max-w-md transition-all duration-700 delay-300 ${
          stage === "revealed"
            ? "translate-y-0 opacity-100"
            : "pointer-events-none hidden translate-y-4 opacity-0"
        }`}
      >
        {stage === "revealed" && claim && prize && (
          <a
            href={prize.claimUrl}
            className="inline-block bg-gold px-12 py-4 font-sans text-sm uppercase tracking-eyebrow text-ink transition-colors duration-300 hover:bg-gold-dark"
          >
            {prize.cta}
          </a>
        )}
      </div>

      <div className="mt-auto pt-10">
        <p className="mx-auto max-w-md font-sans text-[0.65rem] leading-relaxed text-cream/40">
          *Offer value up to $20. One offer per guest per visit. Dine-in only at
          Hal&apos;s The Steakhouse, Nashville. Guests must be 21+ to redeem
          drink offers. Not valid with other offers, on gift cards, tax, or
          gratuity. No cash value. Promotion runs through October 31; coupons
          are redeemable for 30 days from claim.
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
      viewBox="0 0 300 262"
      className="h-80 w-auto max-w-full sm:h-96"
      role="img"
      aria-label={filled ? "A glass of red wine, poured" : "An empty wine glass"}
    >
      <defs>
        <clipPath id="bowl-clip">
          <path d="M32 10 C32 130 74 196 150 208 C226 196 268 130 268 10 Z" />
        </clipPath>
        <linearGradient id="wine-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8c1f32" />
          <stop offset="1" stopColor="#5c1020" />
        </linearGradient>
      </defs>

      {/* Pour stream (only while pouring) */}
      <rect
        x="147"
        y="-8"
        width="6"
        height="80"
        fill="#8c1f32"
        opacity={pouring ? 0.9 : 0}
        className="transition-opacity duration-300"
      />

      {/* Wine, clipped to the bowl. Drawn at its full-pour position and
          offset downward (out of the bowl) until `filled`. */}
      <g clipPath="url(#bowl-clip)">
        <g className={`wine-fill ${filled ? "wine-fill-up" : ""}`}>
          <rect x="20" y="58" width="260" height="160" fill="url(#wine-body)" />
          <ellipse cx="150" cy="58" rx="106" ry="9" fill="#a62c40" />
          <ellipse cx="116" cy="58" rx="30" ry="3.5" fill="#c04f60" opacity="0.6" />
        </g>
      </g>

      {/* Glass outline (open rim); stem runs off the bottom edge */}
      <path
        d="M32 10 C32 130 74 196 150 208 C226 196 268 130 268 10"
        fill="none"
        stroke="#c5a572"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="150"
        y1="208"
        x2="150"
        y2="262"
        stroke="#c5a572"
        strokeWidth="3"
      />
      {/* Bowl highlight */}
      <path
        d="M48 26 C48 96 62 142 84 172"
        fill="none"
        stroke="#f5f1ea"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.22"
      />
    </svg>
  );
}
