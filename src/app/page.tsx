import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/sections/hero";
import { OurStory } from "@/components/sections/our-story";
import { Atmosphere } from "@/components/sections/atmosphere";
import { Menu } from "@/components/sections/menu";
import { Gallery } from "@/components/sections/gallery";
import { PrivateDining } from "@/components/sections/private-dining";
import { Press } from "@/components/sections/press";
import { Locations } from "@/components/sections/locations";
import { Reservations } from "@/components/sections/reservations";
import { Marquee } from "@/components/ui/marquee";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <OurStory />
        <Locations />
        <Marquee />
        <Atmosphere />
        <Menu />
        <Gallery />
        <PrivateDining />
        <Press />
        <Reservations />
      </main>
      <SiteFooter />
    </>
  );
}
