import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { ImageReveal } from "@/components/ui/image-reveal";
import { Parallax } from "@/components/ui/parallax";
import { SectionHeading } from "@/components/ui/section-heading";
import { MenuList } from "@/components/sections/menu-list";
import { MENU_FEATURE, MENU_ITEMS, SITE } from "@/lib/content";

export function Menu() {
  return (
    <section id="menu" className="border-t border-white/5 py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* Placeholder → prime cuts searing over the open flame. */}
        <ImageReveal className="aspect-[4/5]" from="bottom">
          <Parallax className="absolute inset-0">
            <Image
              src={MENU_FEATURE.src}
              alt={MENU_FEATURE.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        </ImageReveal>

        <div>
          <SectionHeading
            index="04"
            eyebrow="The Menu"
            title={
              <>
                Prime cuts, finished over <em className="text-gold">open flame</em>.
              </>
            }
          />

          <MenuList items={MENU_ITEMS} />

          <Reveal variant="up" delay={0.1}>
            <a
              href={SITE.reservationsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-9 inline-block text-sm uppercase tracking-eyebrow text-gold"
            >
              View Full Menu
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
