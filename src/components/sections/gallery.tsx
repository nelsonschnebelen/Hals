import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { GALLERY } from "@/lib/content";

const spanClass: Record<string, string> = {
  tall: "row-span-2 aspect-[3/4]",
  wide: "sm:col-span-2 aspect-[16/10]",
  normal: "aspect-square",
};

// Visual rhythm for dropped-in photos — repeats across the grid.
const SPAN_PATTERN = ["tall", "normal", "wide", "normal", "normal", "tall"];

/**
 * Reads /public/gallery at build time. Anything dropped there (jpg/png/webp/
 * avif) is rendered automatically — the team can add Instagram creative with
 * zero code changes. Falls back to the curated set when the folder is empty.
 */
function readDroppedGallery() {
  const dir = path.join(process.cwd(), "public", "gallery");
  let files: string[] = [];
  try {
    files = fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
      .sort();
  } catch {
    return [];
  }
  return files.map((file, i) => ({
    src: `/gallery/${file}`,
    alt: file
      .replace(/\.[^.]+$/, "")
      .replace(/^\d+[-_\s]*/, "")
      .replace(/[-_]+/g, " ")
      .trim() || "Hal's The Steakhouse",
    span: SPAN_PATTERN[i % SPAN_PATTERN.length],
  }));
}

/** Image-led gallery — the "I need to go here" proof. */
export function Gallery() {
  const dropped = readDroppedGallery();
  const items = dropped.length > 0 ? dropped : GALLERY;

  return (
    <section id="gallery" className="border-t border-white/5 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal variant="up">
              <p className="eyebrow mb-5">The Experience</p>
            </Reveal>
            <Reveal variant="up" delay={0.05}>
              <h2 className="max-w-xl font-serif text-4xl leading-tight text-balance sm:text-5xl">
                A night at Hal&rsquo;s, in a few frames.
              </h2>
            </Reveal>
          </div>
          <Reveal variant="up" delay={0.1}>
            <a
              href="#locations"
              className="hidden text-sm uppercase tracking-eyebrow text-gold transition-colors hover:text-cream sm:inline-block"
            >
              Book Your Table →
            </a>
          </Reveal>
        </div>

        <div className="grid auto-rows-[1fr] grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {items.map((item, i) => (
            <Reveal
              key={`${item.src}-${i}`}
              variant="scale"
              amount={0.2}
              delay={(i % 3) * 0.06}
              className={spanClass[item.span] ?? spanClass.normal}
            >
              <div className="group relative h-full w-full overflow-hidden rounded-xl bg-ink-800">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
