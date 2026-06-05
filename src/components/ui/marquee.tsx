const ITEMS = [
  "Prime Steaks",
  "Open Flame",
  "Live Music",
  "Since 1989",
  "Buckhead",
  "Nashville",
];

function Group() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden>
      {ITEMS.map((word, i) => (
        <span key={i} className="flex items-center">
          <span className="px-8 font-serif text-3xl uppercase tracking-wide text-cream/85 sm:text-5xl">
            {word}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
        </span>
      ))}
    </div>
  );
}

/** Kinetic marquee — a slow, endless ribbon of the brand's promises. */
export function Marquee() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-ink-800/30 py-7">
      <div className="marquee-track flex w-max">
        <Group />
        <Group />
      </div>
      {/* Edge fades for a premium falloff. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </section>
  );
}
