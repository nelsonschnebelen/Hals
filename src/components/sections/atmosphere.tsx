import { CloudImage } from "@/components/ui/cloud-image";
import { Reveal } from "@/components/ui/reveal";

export function Atmosphere() {
  return (
    <section id="atmosphere" className="relative overflow-hidden py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
        <Reveal variant="right" amount={0.35}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <CloudImage
              publicId="hals/atmosphere"
              alt="The warm, low-lit dining room at Hal's The Steakhouse"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal variant="up">
            <p className="eyebrow mb-5">The Room</p>
          </Reveal>
          <Reveal variant="up" delay={0.05}>
            <h2 className="font-serif text-4xl leading-tight text-balance sm:text-5xl">
              Live music, low light, and a patio over the city.
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <p className="mt-7 max-w-prose text-cream/75">
              Downstairs, the band plays and the open kitchen hums. Upstairs, the
              patio opens to Buckhead&rsquo;s skyline — the kind of table you book
              for the nights that matter. It&rsquo;s the same warmth that has made
              Hal&rsquo;s a destination for anniversaries, deals, and ordinary
              Tuesdays alike.
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.15}>
            <ul className="mt-8 grid gap-3 text-sm text-cream/70 sm:grid-cols-2">
              {[
                "Nightly live music",
                "Open charcoal kitchen",
                "Upper patio, city views",
                "Private dining rooms",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="hairline !w-5" />
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
