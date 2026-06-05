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
import { OrnamentDivider } from "@/components/ui/ornament-divider";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <OurStory />
        <Locations />
        <OrnamentDivider className="py-4" />
        <Atmosphere />
        <Menu />
        <Gallery />
        <PrivateDining />
        <OrnamentDivider className="py-4" />
        <Press />
      </main>
      <SiteFooter />
    </>
  );
}
