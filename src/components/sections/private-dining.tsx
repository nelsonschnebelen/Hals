import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { Parallax } from "@/components/ui/parallax";
import { IMG, LOCATIONS } from "@/lib/content";

const atlanta = LOCATIONS[0];

/** Private events — the upsell, framed as an occasion. */
export function PrivateDining() {
  return (
    <section id="private" className="relative overflow-hidden py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        <div className="lg:order-2">
          <Reveal variant="up">
            <p className="eyebrow mb-5">Private Dining</p>
          </Reveal>
          <Reveal variant="up" delay={0.05}>
            <h2 className="max-w-xl font-serif text-4xl leading-tight text-balance sm:text-5xl">
              Your celebration, our room.
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <p className="mt-7 max-w-prose text-cream/75">
              Rehearsal dinners, milestone birthdays, the deal you finally
              closed — Hal&rsquo;s hosts parties of every size in private and
              semi-private rooms, with a dedicated coordinator and menus built
              around your night.
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${atlanta.email}`}
                className="rounded-full bg-gold px-7 py-3 text-sm font-medium uppercase tracking-eyebrow text-ink transition-transform hover:scale-[1.03]"
              >
                Plan an Event
              </a>
              <a
                href={atlanta.phoneHref}
                className="text-sm uppercase tracking-eyebrow text-cream/70 transition-colors hover:text-gold"
              >
                {atlanta.phone}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal variant="right" amount={0.35} className="lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Parallax className="absolute inset-0">
              <Image
                src={IMG.fineDining}
                alt="A private celebration at Hal's The Steakhouse"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
