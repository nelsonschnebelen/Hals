import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Parallax } from "@/components/ui/parallax";
import { SectionHeading } from "@/components/ui/section-heading";
import { IMG } from "@/lib/content";

/**
 * Atmosphere: two image planes drifting at different parallax rates — the
 * room behind, the live-music plane overlapping in front — beside the copy.
 */
export function Atmosphere() {
  return (
    <section id="atmosphere" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20">
        <div className="relative pb-20 pr-10 sm:pr-16">
          {/* Placeholder → the warm, low-lit dining room. */}
          <ImageReveal className="aspect-[4/5]" from="bottom">
            <Parallax className="absolute inset-0" speed={10}>
              <Image
                src={IMG.diningRoom}
                alt="The warm, low-lit dining room at Hal's The Steakhouse"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
          </ImageReveal>

          {/* Placeholder → live music downstairs. Faster drift = nearer plane. */}
          <ImageReveal
            className="absolute bottom-0 right-0 w-[52%] max-w-[290px] shadow-2xl shadow-ink/80 aspect-[4/5]"
            from="left"
            delay={0.25}
          >
            <Parallax className="absolute inset-0" speed={18}>
              <Image
                src={IMG.liveMusic}
                alt="Live music downstairs at Hal's, most nights"
                fill
                sizes="(max-width: 1024px) 60vw, 25vw"
                className="object-cover"
              />
            </Parallax>
          </ImageReveal>
        </div>

        <div>
          <SectionHeading
            index="03"
            eyebrow="The Room"
            title={
              <>
                The kind of night you{" "}
                <em className="text-gold">book a table</em> for.
              </>
            }
          />
          <Reveal variant="up" delay={0.12}>
            <p className="mt-8 max-w-prose text-cream/75">
              Downstairs, live music plays and the open kitchen hums. Upstairs,
              the patio opens to Buckhead&rsquo;s skyline. It&rsquo;s the warmth
              that&rsquo;s made Hal&rsquo;s the room Atlanta returns to — for
              anniversaries, for closing the deal, for an ordinary Tuesday that
              deserves better.
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.18}>
            <ul className="mt-10 grid gap-x-8 text-sm text-cream/70 sm:grid-cols-2">
              {[
                "Live music, nightly",
                "Open charcoal kitchen",
                "Upper patio, city views",
                "Private dining rooms",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-4 border-t border-white/10 py-4"
                >
                  <span className="h-px w-5 bg-gold/70" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
