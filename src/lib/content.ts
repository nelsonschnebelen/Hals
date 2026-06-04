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
      "Prime, dry-aged, and finished over an open flame — the cut that built our reputation.",
    publicId: "hals/hero",
  },
  {
    name: "Pepper-Crusted Filet",
    description:
      "Center-cut tenderloin, cracked black pepper, brandy-cream pan sauce.",
    publicId: "hals/menu",
  },
  {
    name: "The Hal's Chop",
    description:
      "A New Orleans–inspired plate from a kitchen that has never cut a corner.",
    publicId: "hals/atmosphere",
  },
] as const;

export const PRESS = [
  "Food Network",
  "The Atlanta Journal-Constitution",
  "Eater Atlanta",
  "AtlantaNow",
  "StyleBlueprint",
] as const;
