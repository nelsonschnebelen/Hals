import { Reveal } from "@/components/ui/reveal";
import { SITE } from "@/lib/content";

export function Reservations() {
  return (
    <section id="reservations" className="relative py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal variant="up">
          <p className="eyebrow mb-6">Reservations</p>
        </Reveal>
        <Reveal variant="up" delay={0.05}>
          <h2 className="font-serif text-4xl leading-tight text-balance sm:text-6xl">
            Join us for the evening.
          </h2>
        </Reveal>
        <Reveal variant="up" delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-cream/75">
            Book online through OpenTable, or call us directly — someone who has
            worked here for years will pick up.
          </p>
        </Reveal>
        <Reveal variant="up" delay={0.15}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={SITE.reservationsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gold px-8 py-3.5 text-sm font-medium uppercase tracking-eyebrow text-ink transition-transform hover:scale-[1.03]"
            >
              Reserve on OpenTable
            </a>
            <a
              href={SITE.phoneHref}
              className="rounded-full border border-white/15 px-8 py-3.5 text-sm uppercase tracking-eyebrow text-cream transition-colors hover:border-gold hover:text-gold"
            >
              {SITE.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
