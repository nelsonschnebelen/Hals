import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { Parallax } from "@/components/ui/parallax";
import { MENU_FEATURE, MENU_ITEMS, SITE } from "@/lib/content";

export function Menu() {
  return (
    <section id="menu" className="border-t border-white/5 py-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
        <Reveal variant="right" amount={0.3}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Parallax className="absolute inset-0">
              <Image
                src={MENU_FEATURE.src}
                alt={MENU_FEATURE.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          </div>
        </Reveal>

        <div>
          <Reveal variant="up">
            <p className="eyebrow mb-5">The Menu</p>
          </Reveal>
          <Reveal variant="up" delay={0.05}>
            <h2 className="max-w-xl font-serif text-4xl leading-tight text-balance sm:text-5xl">
              Prime cuts, finished over open flame.
            </h2>
          </Reveal>

          <div className="mt-10 divide-y divide-white/5 border-y border-white/5">
            {MENU_ITEMS.map((item, i) => (
              <Reveal key={item.name} variant="up" delay={i * 0.06}>
                <div className="flex items-baseline justify-between gap-6 py-5">
                  <div>
                    <h3 className="font-serif text-xl text-cream">{item.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-cream/60">
                      {item.description}
                    </p>
                  </div>
                  <span className="mt-1 hidden h-1.5 w-1.5 shrink-0 rounded-full bg-gold/70 sm:block" />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal variant="up" delay={0.1}>
            <a
              href={SITE.reservationsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block text-sm uppercase tracking-eyebrow text-gold transition-colors hover:text-cream"
            >
              View Full Menu →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
