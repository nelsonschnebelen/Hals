import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Parallax } from "@/components/ui/parallax";
import { SectionHeading } from "@/components/ui/section-heading";
import { IMG, LOCATIONS } from "@/lib/content";

const atlanta = LOCATIONS[0];

/** Private events — the upsell, framed as an occasion. */
export function PrivateDining() {
  return (
    <section id="private" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-2">
          <SectionHeading
            index="06"
            eyebrow="Private Dining"
            title={
              <>
                Your celebration, <em className="text-gold">our room</em>.
              </>
            }
          />
          <Reveal variant="up" delay={0.12}>
            <p className="mt-8 max-w-prose text-cream/75">
              Rehearsal dinners, milestone birthdays, the deal you finally
              closed — Hal&rsquo;s hosts parties of every size in private and
              semi-private rooms, with a dedicated coordinator and menus built
              around your night.
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${atlanta.email}`}
                className="rounded-full bg-gold px-7 py-3 text-sm font-medium uppercase tracking-eyebrow text-ink transition-transform hover:scale-[1.03]"
              >
                Plan an Event
              </a>
              <a
                href={atlanta.phoneHref}
                className="link-underline text-sm uppercase tracking-eyebrow text-cream/70"
              >
                {atlanta.phone}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Placeholder → a candle-lit private dining table, set for the night. */}
        <ImageReveal className="aspect-[4/5] lg:order-1" from="bottom">
          <Parallax className="absolute inset-0">
            <Image
              src={IMG.privateTable}
              alt="A candle-lit private dining table at Hal's The Steakhouse"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
        </ImageReveal>
      </div>
    </section>
  );
}
