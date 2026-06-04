import { SITE } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-3">
        <div>
          <div className="font-serif text-xl text-cream">HAL&rsquo;S</div>
          <p className="mt-3 text-sm text-cream/55">
            The Steakhouse — a Buckhead institution since 1989.
          </p>
        </div>

        <div className="text-sm text-cream/65">
          <div className="mb-3 text-xs uppercase tracking-eyebrow text-gold">
            Buckhead, Atlanta
          </div>
          <p>30 Old Ivy Road NE, Atlanta, GA</p>
          <a href={SITE.phoneHref} className="mt-1 inline-block hover:text-gold">
            {SITE.phone}
          </a>
        </div>

        <div className="text-sm text-cream/65">
          <div className="mb-3 text-xs uppercase tracking-eyebrow text-gold">
            Nashville
          </div>
          <p>Now open. Same cuts, same hospitality.</p>
          <a
            href={SITE.reservationsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block hover:text-gold"
          >
            Reservations →
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-6 text-xs text-cream/35">
        © {new Date().getFullYear()} Hal&rsquo;s The Steakhouse. All rights reserved.
      </div>
    </footer>
  );
}
