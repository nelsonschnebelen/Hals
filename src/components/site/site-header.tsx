"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE } from "@/lib/content";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled
          ? "border-b border-white/5 bg-ink/85 backdrop-blur"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#top" className="font-serif text-xl tracking-wide text-cream">
          HAL&rsquo;S
          <span className="ml-2 hidden align-middle text-[10px] uppercase tracking-eyebrow text-gold sm:inline">
            The Steakhouse
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-cream/70 transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={SITE.reservationsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-gold/60 px-5 py-2 text-xs uppercase tracking-eyebrow text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          Reserve
        </a>
      </div>
    </header>
  );
}
