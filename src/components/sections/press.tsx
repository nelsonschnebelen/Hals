import { Reveal } from "@/components/ui/reveal";
import { PRESS } from "@/lib/content";

export function Press() {
  return (
    <section className="border-y border-white/5 bg-white/[0.015] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal variant="fade">
          <p className="mb-10 text-center text-xs uppercase tracking-eyebrow text-cream/45">
            As featured in
          </p>
        </Reveal>
        <Reveal variant="up" amount={0.5}>
          <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-center">
            {PRESS.map((name) => (
              <li
                key={name}
                className="font-serif text-lg text-cream/55 transition-colors hover:text-gold"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
