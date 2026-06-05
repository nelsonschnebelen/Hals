import { FOOTER_LINKS, LOCATIONS, SITE } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.8fr_1fr_1fr]">
          <div>
            <div className="font-serif text-2xl text-cream">HAL&rsquo;S</div>
            <p className="mt-3 max-w-xs text-sm text-cream/55">
              {SITE.tagline} Prime steaks over open flame, live music, and a room
              worth dressing up for.
            </p>
            <a
              href="#locations"
              className="mt-5 inline-block rounded-full border border-gold/60 px-5 py-2 text-[11px] uppercase tracking-eyebrow text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              Reserve a Table
            </a>
            <div className="mt-6 flex gap-4 text-xs uppercase tracking-eyebrow text-cream/55">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-gold"
              >
                Instagram
              </a>
              <a
                href={LOCATIONS[0].facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-gold"
              >
                Facebook
              </a>
            </div>
          </div>

          <div>
            <div className="mb-4 text-xs uppercase tracking-eyebrow text-gold">
              Explore
            </div>
            <ul className="space-y-2.5 text-sm text-cream/65">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {LOCATIONS.map((loc) => (
            <div key={loc.id} className="text-sm text-cream/65">
              <div className="mb-4 text-xs uppercase tracking-eyebrow text-gold">
                {loc.city}
              </div>
              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-gold"
              >
                {loc.address}
                <br />
                {loc.cityLine}
              </a>
              <a
                href={loc.phoneHref}
                className="mt-2 block transition-colors hover:text-gold"
              >
                {loc.phone}
              </a>
              <a
                href={loc.reservationsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block transition-colors hover:text-gold"
              >
                Reservations →
              </a>
              <a
                href={loc.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block transition-colors hover:text-gold"
              >
                Facebook →
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/5 pt-8 text-xs text-cream/35 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Hal&rsquo;s The Steakhouse. All rights
            reserved.
          </span>
          <span>Buckhead, Atlanta · Downtown Nashville</span>
        </div>
      </div>
    </footer>
  );
}
