import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { Parallax } from "@/components/ui/parallax";
import { LOCATIONS } from "@/lib/content";

/** Both locations, presented as an invitation — book, call, or get directions. */
export function Locations() {
  return (
    <section id="locations" className="border-t border-white/5 bg-ink-800/40 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Reveal variant="up">
            <p className="eyebrow mb-5">Visit Us</p>
          </Reveal>
          <Reveal variant="up" delay={0.05}>
            <h2 className="font-serif text-4xl leading-tight text-balance sm:text-5xl">
              Two cities. One table worth keeping.
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-cream/70">
              Book online in seconds, or call the room directly — someone who has
              worked here for years will pick up.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {LOCATIONS.map((loc, i) => (
            <Reveal key={loc.id} variant="up" amount={0.25} delay={i * 0.08}>
              <article className="group h-full overflow-hidden rounded-2xl border border-white/5 bg-ink-800/60">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Parallax className="absolute inset-0" speed={10}>
                    <Image
                      src={loc.image}
                      alt={`Hal's The Steakhouse — ${loc.city}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Parallax>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                  <div className="absolute bottom-5 left-6">
                    <p className="text-xs uppercase tracking-eyebrow text-gold">
                      {loc.neighborhood}
                    </p>
                    <h3 className="font-serif text-3xl text-cream">{loc.city}</h3>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <p className="text-cream/75">{loc.blurb}</p>

                  <div className="mt-6 space-y-1 text-sm text-cream/65">
                    <a
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block transition-colors hover:text-gold"
                    >
                      {loc.address}, {loc.cityLine}
                    </a>
                    <div className="flex flex-wrap gap-x-5 gap-y-1">
                      <a href={loc.phoneHref} className="transition-colors hover:text-gold">
                        {loc.phone}
                      </a>
                      <a
                        href={`mailto:${loc.email}`}
                        className="transition-colors hover:text-gold"
                      >
                        {loc.email}
                      </a>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href={loc.reservationsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-gold px-6 py-2.5 text-xs font-medium uppercase tracking-eyebrow text-ink transition-transform hover:scale-[1.03]"
                    >
                      Reserve
                    </a>
                    <a
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-cream/20 px-6 py-2.5 text-xs uppercase tracking-eyebrow text-cream transition-colors hover:border-gold hover:text-gold"
                    >
                      Directions
                    </a>
                  </div>

                  {loc.valet && (
                    <details className="group/valet mt-7 border-t border-white/5 pt-5">
                      <summary className="flex cursor-pointer list-none items-center justify-between text-xs uppercase tracking-eyebrow text-gold">
                        <span>Valet Parking</span>
                        <span className="text-base leading-none transition-transform duration-300 group-open/valet:rotate-45">
                          +
                        </span>
                      </summary>

                      <p className="mt-5 text-sm leading-relaxed text-cream/65">
                        {loc.valet.note}
                      </p>

                      <div className="mt-6 space-y-7">
                        {loc.valet.entrances.map((entrance) => (
                          <div key={entrance.name}>
                            <h4 className="font-serif text-xl italic text-cream">
                              {entrance.name}
                            </h4>
                            {entrance.sub && (
                              <p className="mt-0.5 text-[11px] uppercase tracking-wide text-cream/45">
                                {entrance.sub}
                              </p>
                            )}
                            <span className="mt-3 block h-px w-10 bg-gold/50" />

                            <div className="mt-4 space-y-4">
                              {entrance.groups.map((group, gi) => (
                                <div key={gi}>
                                  {group.from && (
                                    <p className="mb-2 text-[11px] font-medium uppercase tracking-eyebrow text-gold/80">
                                      {group.from}
                                    </p>
                                  )}
                                  <ol className="space-y-1.5">
                                    {group.steps.map((step, si) => (
                                      <li
                                        key={si}
                                        className="flex gap-3 text-sm leading-relaxed text-cream/70"
                                      >
                                        <span className="mt-px font-serif text-xs text-gold/70">
                                          {si + 1}
                                        </span>
                                        <span>{step}</span>
                                      </li>
                                    ))}
                                  </ol>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
