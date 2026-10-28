"use client";

import { useState } from "react";
import { LOCATIONS } from "@/lib/content";

type Sheet = "call" | "book" | "directions" | null;

const Icon = {
  menu: (
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  ),
  call: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  book: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  directions: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
};

function Glyph({ d }: { d: keyof typeof Icon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      {Icon[d]}
    </svg>
  );
}

/**
 * Mobile action bar — the Wolseley pattern. Four fixed actions at the base of
 * the screen on phones: Menus, Call, Book, Directions. Because Hal's has two
 * rooms, Call/Book/Directions open a quick location chooser.
 */
export function MobileActionBar() {
  const [sheet, setSheet] = useState<Sheet>(null);

  const hrefFor = (loc: (typeof LOCATIONS)[number], kind: Sheet) =>
    kind === "call"
      ? loc.phoneHref
      : kind === "book"
        ? loc.reservationsUrl
        : loc.mapUrl;

  const label = { call: "Call", book: "Book", directions: "Directions" };

  return (
    <>
      {/* keeps footer content clear of the bar */}
      <div aria-hidden className="h-16 lg:hidden" />

      <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-white/10 bg-ink/95 backdrop-blur lg:hidden">
        <a
          href="#menu"
          className="flex flex-col items-center gap-1 py-3 text-cream/80 transition-colors active:text-gold"
        >
          <Glyph d="menu" />
          <span className="text-[10px] uppercase tracking-wide">Menus</span>
        </a>
        {(["call", "book", "directions"] as const).map((kind) => (
          <button
            key={kind}
            onClick={() => setSheet(kind)}
            className="flex flex-col items-center gap-1 py-3 text-cream/80 transition-colors active:text-gold"
          >
            <Glyph d={kind} />
            <span className="text-[10px] uppercase tracking-wide">
              {label[kind]}
            </span>
          </button>
        ))}
      </nav>

      {/* Location chooser */}
      {sheet && (
        <div
          className="fixed inset-0 z-[60] flex items-end lg:hidden"
          onClick={() => setSheet(null)}
        >
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" />
          <div
            className="relative w-full rounded-t-2xl border-t border-white/10 bg-ink-800 p-6 pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/20" />
            <p className="mb-5 text-center text-xs uppercase tracking-eyebrow text-gold">
              {sheet === "call"
                ? "Call which room?"
                : sheet === "book"
                  ? "Reserve at"
                  : "Directions to"}
            </p>
            <div className="space-y-3">
              {LOCATIONS.map((loc) => (
                <a
                  key={loc.id}
                  href={hrefFor(loc, sheet)}
                  target={sheet === "call" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  onClick={() => setSheet(null)}
                  className="flex items-center justify-between rounded-xl border border-white/10 px-5 py-4 transition-colors active:border-gold"
                >
                  <span>
                    <span className="block font-serif text-lg text-cream">
                      {loc.city}
                    </span>
                    <span className="block text-xs text-cream/50">
                      {loc.neighborhood}
                    </span>
                  </span>
                  <span className="text-gold">
                    <Glyph d={sheet} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
