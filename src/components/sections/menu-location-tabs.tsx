"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MenuList } from "@/components/sections/menu-list";

type MenuItem = { readonly name: string; readonly description: string; readonly image: string };
type LocationMenu = { readonly id: string; readonly label: string; readonly items: readonly MenuItem[] };

/** Atlanta / Nashville menu toggle. */
export function MenuLocationTabs({ menus }: { menus: readonly LocationMenu[] }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="mt-8 flex gap-2" role="tablist" aria-label="Menu by location">
        {menus.map((menu, i) => (
          <button
            key={menu.id}
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
            {menu.label}
          </button>
        ))}
      </div>

      <MenuList items={menus[active].items} />
    </div>
  );
}
