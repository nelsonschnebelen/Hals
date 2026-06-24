"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type MenuItem = { readonly name: string; readonly description?: string };
type MenuSection = {
  readonly title: string;
  readonly layout?: string;
  readonly items: readonly MenuItem[];
};
type LocationMenu = {
  readonly id: string;
  readonly label: string;
  readonly sections: readonly MenuSection[];
  readonly notes?: readonly string[];
  readonly pending?: string;
};

/** Atlanta / Nashville menu toggle with a full sectioned menu. */
export function MenuLocationTabs({ menus }: { menus: readonly LocationMenu[] }) {
  const [active, setActive] = useState(0);
  const menu = menus[active];

  return (
    <div>
      <div className="mt-8 flex gap-2" role="tablist" aria-label="Menu by location">
        {menus.map((m, i) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full px-5 py-2 text-xs uppercase tracking-eyebrow transition-colors",
              active === i
                ? "bg-gold text-ink"
                : "border border-white/15 text-cream/70 hover:border-gold hover:text-gold",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      {menu.sections.length === 0 ? (
        <p className="mt-10 max-w-prose leading-relaxed text-cream/65">{menu.pending}</p>
      ) : (
        <div className="mt-12 space-y-12">
          {menu.sections.map((section) => (
            <div key={section.title}>
              <h3 className="border-b border-white/10 pb-3 text-xs uppercase tracking-eyebrow text-gold">
                {section.title}
              </h3>

              {section.layout === "grid" ? (
                <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-2.5 text-sm text-cream/75 sm:grid-cols-3">
                  {section.items.map((item) => (
                    <li key={item.name}>{item.name}</li>
                  ))}
                </ul>
              ) : (
                <div className="mt-5 space-y-5">
                  {section.items.map((item) => (
                    <div key={item.name}>
                      <h4 className="font-serif text-lg text-cream">{item.name}</h4>
                      {item.description && (
                        <p className="mt-1 max-w-prose text-sm leading-relaxed text-cream/60">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {menu.notes && menu.notes.length > 0 && (
            <div className="space-y-1.5 border-t border-white/10 pt-6 text-xs leading-relaxed text-cream/45">
              {menu.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
