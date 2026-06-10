import fs from "node:fs";
import path from "node:path";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { GalleryColumns } from "@/components/sections/gallery-columns";
import { GALLERY } from "@/lib/content";

/**
 * Reads /public/gallery at build time. Anything dropped there (jpg/png/webp/
 * avif) is rendered automatically — the team can add Instagram creative with
 * zero code changes. Falls back to the matched placeholder set when the
 * folder is empty.
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
  return files.map((file) => ({
    src: `/gallery/${file}`,
    alt:
      file
        .replace(/\.[^.]+$/, "")
        .replace(/^\d+[-_\s]*/, "")
        .replace(/[-_]+/g, " ")
        .trim() || "Hal's The Steakhouse",
  }));
}

/** Image-led gallery — the "I need to go here" proof. */
export function Gallery() {
  const dropped = readDroppedGallery();
  const items = dropped.length > 0 ? dropped : GALLERY;

  return (
    <section id="gallery" className="overflow-hidden border-t border-white/5 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="05"
            eyebrow="The Experience"
            title={
              <>
                A night at Hal&rsquo;s, in a <em className="text-gold">few frames</em>.
              </>
            }
            className="max-w-2xl"
          />
          <Reveal variant="up" delay={0.1}>
            <a
              href="#locations"
              className="link-underline hidden text-sm uppercase tracking-eyebrow text-gold sm:inline-block"
            >
              Book Your Table
            </a>
          </Reveal>
        </div>

        <GalleryColumns items={items} />
      </div>
    </section>
  );
}
