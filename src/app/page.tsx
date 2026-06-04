import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/sections/hero";
import { OurStory } from "@/components/sections/our-story";
import { Atmosphere } from "@/components/sections/atmosphere";
import { Menu } from "@/components/sections/menu";
import { Press } from "@/components/sections/press";
import { Reservations } from "@/components/sections/reservations";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <OurStory />
        <Atmosphere />
        <Menu />
        <Press />
        <Reservations />
      </main>
      <SiteFooter />
    </>
  );
}
