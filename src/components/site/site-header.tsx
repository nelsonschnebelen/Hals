"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/site/logo";
import { NAV_LINKS } from "@/lib/content";

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
          : "bg-gradient-to-b from-ink/60 to-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#top" aria-label="Hal's The Steakhouse — home">
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline text-[13px] uppercase tracking-wide text-cream/70 transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#locations"
          className="rounded-full border border-gold/60 px-5 py-2 text-xs uppercase tracking-eyebrow text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          Reserve
        </a>
      </div>
    </header>
  );
}
