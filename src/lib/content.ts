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

// Featured menu photo — uses an existing Cloudinary asset so it always renders.
export const MENU_FEATURE = {
  publicId: "hals/menu",
  alt: "A prime cut from Hal's, finished over open flame",
};

export const MENU_ITEMS = [
  {
    name: "Bone-In Ribeye",
    description:
      "Prime and well-marbled, seared over open flame to a deep, crosshatched crust.",
  },
  {
    name: "Steak au Poivre",
    description:
      "Center-cut filet crusted in cracked peppercorns, finished with a brandy demi-glace.",
  },
  {
    name: "Lobster Mac & Cheese",
    description:
      "Penne and sweet Maine lobster baked under a blistered three-cheese crust.",
  },
  {
    name: "Blackened Redfish",
    description:
      "A New Orleans classic — Gulf redfish, cast-iron blackened, lemon butter.",
  },
  {
    name: "Bananas Foster",
    description:
      "Flambéed tableside in dark rum and brown sugar, over vanilla bean ice cream.",
  },
] as const;

export const PRESS = [
  "Food Network",
  "The Atlanta Journal-Constitution",
  "Eater Atlanta",
  "AtlantaNow",
  "StyleBlueprint",
] as const;
