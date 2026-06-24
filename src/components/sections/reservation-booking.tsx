"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { OpenTableWidget } from "@/components/ui/opentable-widget";
import { LOCATIONS } from "@/lib/content";

/** Book a table without leaving the page: city toggle + OpenTable widget. */
export function ReservationBooking() {
  const [active, setActive] = useState(0);
  const loc = LOCATIONS[active];

  return (
    <div className="mx-auto mt-16 max-w-md">
      <div className="mb-6 flex justify-center gap-2">
        {LOCATIONS.map((l, i) => (
          <button
            key={l.id}
            type="button"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full px-5 py-2 text-xs uppercase tracking-eyebrow transition-colors",
              active === i
                ? "bg-gold text-ink"
                : "border border-white/15 text-cream/70 hover:border-gold hover:text-gold",
            )}
          >
            {l.city}
          </button>
        ))}
      </div>

      <div className="flex justify-center rounded-2xl border border-white/10 bg-ink-800/60 p-5">
        {loc.otRid ? (
          <OpenTableWidget key={loc.otRid} rid={loc.otRid} />
        ) : (
          <a
            href={loc.reservationsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gold px-7 py-3 text-sm font-medium uppercase tracking-eyebrow text-ink transition-transform hover:scale-[1.03]"
          >
            Book {loc.city} on OpenTable
          </a>
        )}
      </div>
    </div>
  );
}
