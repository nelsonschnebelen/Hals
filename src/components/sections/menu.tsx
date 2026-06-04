import { CloudImage } from "@/components/ui/cloud-image";
import { Reveal } from "@/components/ui/reveal";
import { MENU_ITEMS, SITE } from "@/lib/content";

export function Menu() {
  return (
    <section id="menu" className="border-t border-white/5 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal variant="up">
              <p className="eyebrow mb-5">The Menu</p>
            </Reveal>
            <Reveal variant="up" delay={0.05}>
              <h2 className="max-w-xl font-serif text-4xl leading-tight text-balance sm:text-5xl">
                Prime cuts, finished over open flame.
              </h2>
            </Reveal>
          </div>
          <Reveal variant="up" delay={0.1}>
            <a
              href={SITE.reservationsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm uppercase tracking-eyebrow text-gold transition-colors hover:text-cream"
            >
              View Full Menu →
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {MENU_ITEMS.map((item, i) => (
            <Reveal key={item.name} variant="up" delay={i * 0.08}>
              <article className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <CloudImage
                    publicId={item.publicId}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-cream">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
