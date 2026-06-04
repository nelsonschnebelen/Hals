import { Reveal } from "@/components/ui/reveal";
import { STATS } from "@/lib/content";

export function OurStory() {
  return (
    <section id="story" className="border-t border-white/5 py-28">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal variant="up">
            <p className="eyebrow mb-5">Our Story</p>
          </Reveal>
          <Reveal variant="up" delay={0.05}>
            <h2 className="max-w-2xl font-serif text-4xl leading-tight text-balance sm:text-5xl">
              Thirty-five years of the same uncompromising plate.
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <div className="mt-7 max-w-prose space-y-5 text-cream/75">
              <p>
                Hal&rsquo;s opened in Buckhead in 1989 with a simple idea: a
                great steakhouse should feel like a great evening — generous,
                unhurried, and a little bit New Orleans. Decades later, the
                charcoal still glows in an open kitchen and the band still plays
                most nights.
              </p>
              <p>
                Much of our team has been here twenty years or more. They know
                the regulars by name and the newcomers by the end of the night.
                In 2024 we brought that same room to Nashville — same cuts, same
                hospitality, same refusal to cut a corner.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal variant="left" amount={0.4}>
          <div className="grid h-full content-center gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-8 py-10">
                <div className="font-serif text-5xl text-gold">{stat.value}</div>
                <div className="mt-2 text-sm uppercase tracking-eyebrow text-cream/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
