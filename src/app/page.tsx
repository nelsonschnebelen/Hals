import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { MobileActionBar } from "@/components/site/mobile-action-bar";
import { Hero } from "@/components/sections/hero";
import { Statement } from "@/components/sections/statement";
import { OurStory } from "@/components/sections/our-story";
import { Menu } from "@/components/sections/menu";
import { Atmosphere } from "@/components/sections/atmosphere";
import { Gallery } from "@/components/sections/gallery";
import { PrivateDining } from "@/components/sections/private-dining";
import { Locations } from "@/components/sections/locations";
import { GoodToKnow } from "@/components/sections/good-to-know";
import { Press } from "@/components/sections/press";
import { Reservations } from "@/components/sections/reservations";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Statement />
        <OurStory />
        <Menu />
        <Atmosphere />
        <Gallery />
        <PrivateDining />
        <Locations />
        <GoodToKnow />
        <Press />
        <Reservations />
      </main>
      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
