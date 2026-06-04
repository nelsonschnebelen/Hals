/** Single source of truth for homepage copy. Swap for final client copy. */

export const SITE = {
  name: "Hal's The Steakhouse",
  phone: "(404) 261-0025",
  phoneHref: "tel:+14042610025",
  reservationsUrl: "https://www.opentable.com/hals-the-steakhouse",
  cities: "Buckhead, Atlanta · Nashville",
} as const;

export const NAV_LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "Atmosphere", href: "#atmosphere" },
  { label: "Menu", href: "#menu" },
  { label: "Reservations", href: "#reservations" },
] as const;

export const STATS = [
  { value: "1989", label: "Est. in Buckhead" },
  { value: "20+", label: "Years, our core staff" },
  { value: "2", label: "Cities and counting" },
] as const;

export const MENU_ITEMS = [
  {
    name: "Bone-In Ribeye",
    description:
      "Prime and well-marbled, seared over open flame to a deep, crosshatched crust — the cut that built our reputation.",
    publicId: "hals/ribeye",
  },
  {
    name: "Steak au Poivre",
    description:
      "Center-cut filet crusted in cracked peppercorns, finished tableside with a brandy demi-glace.",
    publicId: "hals/filet",
  },
  {
    name: "Lobster Mac & Cheese",
    description:
      "Penne and sweet Maine lobster baked under a blistered three-cheese crust — our New Orleans soul on a plate.",
    publicId: "hals/lobster-mac",
  },
] as const;

export const PRESS = [
  "Food Network",
  "The Atlanta Journal-Constitution",
  "Eater Atlanta",
  "AtlantaNow",
  "StyleBlueprint",
] as const;
