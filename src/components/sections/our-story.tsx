import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Parallax } from "@/components/ui/parallax";
import { SectionHeading } from "@/components/ui/section-heading";
import { IMG, STATS } from "@/lib/content";

export function OurStory() {
  return (
    <section id="story" className="border-t border-white/5 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading
              index="01"
              eyebrow="Our Story"
              title={
                <>
                  Thirty-five years of the{" "}
                  <em className="text-gold">same uncompromising</em> plate.
                </>
              }
            />
            <Reveal variant="up" delay={0.12}>
              <div className="mt-8 max-w-prose space-y-5 text-cream/75">
                <p>
                  Hal&rsquo;s opened in Buckhead in 1989 with a simple idea: a
                  great steakhouse should feel like a great evening — generous,
                  unhurried, and a little bit New Orleans. Decades later, the
                  charcoal still glows in an open kitchen and the band still
                  plays most nights.
                </p>
                <p>
                  Much of our team has been here twenty years or more. They know
                  the regulars by name and the newcomers by the end of the
                  night. In 2024 we brought that same room to Nashville — same
                  cuts, same hospitality, same refusal to cut a corner.
                </p>
              </div>
            </Reveal>

            <Reveal variant="up" delay={0.18}>
              <dl className="mt-12 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <dd className="font-serif text-4xl text-gold sm:text-5xl">
                      <Counter value={stat.value} />
                    </dd>
                    <dt className="mt-2 text-[11px] uppercase tracking-eyebrow text-cream/55">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Placeholder → the open kitchen, charcoal glowing. */}
          <ImageReveal className="aspect-[4/5] self-center" from="bottom">
            <Parallax className="absolute inset-0">
              <Image
                src={IMG.openKitchen}
                alt="The open kitchen at Hal's, charcoal glowing"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}
