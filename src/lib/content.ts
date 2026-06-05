/** Single source of truth for homepage copy. Swap for final client copy. */

// Curated photography. Local hero ships in /public; the rest are optimized
// stock that reads as a premium steakhouse until real photos replace them.
const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1600`;

export const IMG = {
  hero: "/hero.jpg", // real Hal's bone-in ribeye + wine
  steakIron: UNSPLASH("1546964124-0cce460f38ef"),
  steakBoard: UNSPLASH("1544025162-d76694265947"),
  diningRoom: UNSPLASH("1517248135467-4c7edcad34c4"),
  fineDining: UNSPLASH("1414235077428-338989a2e8c0"),
  chef: UNSPLASH("1551218808-94e220e084d2"),
} as const;

export const SITE = {
  name: "Hal's The Steakhouse",
  phone: "(404) 261-0025",
  phoneHref: "tel:+14042610025",
  reservationsUrl: "https://www.opentable.com/hals-the-steakhouse",
  cities: "Buckhead · Nashville",
  tagline: "Atlanta's steakhouse since 1989 — now in Nashville.",
  instagram: "https://www.instagram.com/halsthesteakhouse/",
} as const;

export const NAV_LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "Atmosphere", href: "#atmosphere" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Private Dining", href: "#private" },
  { label: "Locations", href: "#locations" },
] as const;

export const STATS = [
  { value: "1989", label: "Serving Buckhead" },
  { value: "20+", label: "Years, our core staff" },
  { value: "2", label: "Cities, one standard" },
] as const;

/** Both rooms — real addresses, phones, and booking links. */
export const LOCATIONS = [
  {
    id: "atlanta",
    city: "Atlanta",
    neighborhood: "Buckhead",
    address: "30 Old Ivy Road NE",
    cityLine: "Atlanta, GA 30342",
    phone: "(404) 261-0025",
    phoneHref: "tel:+14042610025",
    email: "EventCoordinator@hals.net",
    reservationsUrl: "https://www.opentable.com/hals-the-steakhouse",
    facebook: "https://www.facebook.com/halsatlanta/",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Hal%27s%20The%20Steakhouse%2030%20Old%20Ivy%20Road%20NE%20Atlanta%20GA%2030342",
    blurb:
      "The original room. Live music nightly, an open kitchen, and an upper patio looking out over Buckhead.",
    image: IMG.diningRoom,
  },
  {
    id: "nashville",
    city: "Nashville",
    neighborhood: "Downtown · SoBro",
    address: "407 Korean Veterans Blvd",
    cityLine: "Nashville, TN 37203",
    phone: "(615) 560-7733",
    phoneHref: "tel:+16155607733",
    email: "Nashville@hals.net",
    reservationsUrl: "https://www.opentable.com/r/hals-the-steakhouse-nashville",
    facebook:
      "https://www.facebook.com/people/Hals-The-Steakhouse-Nashville/61560298641045/",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Hal%27s%20The%20Steakhouse%20407%20Korean%20Veterans%20Blvd%20Nashville%20TN%2037203",
    blurb:
      "Opened 2024 in the heart of downtown. Same cuts, same hospitality, a few steps from Broadway.",
    image: IMG.fineDining,
  },
] as const;

export const MENU_FEATURE = {
  src: IMG.steakIron,
  alt: "A prime cut from Hal's, finished over open flame",
};

export const MENU_ITEMS = [
  {
    name: "Bone-In Ribeye",
    description:
      "Prime and well-marbled, seared over open flame to a deep, crosshatched crust.",
    image: IMG.steakIron,
  },
  {
    name: "Steak au Poivre",
    description:
      "Center-cut filet crusted in cracked peppercorns, finished with a brandy demi-glace.",
    image: IMG.steakBoard,
  },
  {
    name: "Lobster Mac & Cheese",
    description:
      "Penne and sweet Maine lobster baked under a blistered three-cheese crust.",
    image: IMG.fineDining,
  },
  {
    name: "Blackened Redfish",
    description:
      "A New Orleans classic — Gulf redfish, cast-iron blackened, lemon butter.",
    image: IMG.chef,
  },
  {
    name: "Bananas Foster",
    description:
      "Flambéed tableside in dark rum and brown sugar, over vanilla bean ice cream.",
    image: IMG.hero,
  },
] as const;

/** Gallery grid — mixed aspect, image-led. */
export const GALLERY = [
  { src: IMG.hero, alt: "Bone-in ribeye with a glass of red", span: "tall" },
  { src: IMG.diningRoom, alt: "The dining room", span: "wide" },
  { src: IMG.steakBoard, alt: "A board of slow-finished cuts", span: "normal" },
  { src: IMG.chef, alt: "The open kitchen at work", span: "normal" },
  { src: IMG.fineDining, alt: "An evening at the table", span: "wide" },
  { src: IMG.steakIron, alt: "Seared over open flame", span: "tall" },
] as const;

export const PRESS = [
  "Food Network",
  "The Atlanta Journal-Constitution",
  "Eater Atlanta",
  "AtlantaNow",
  "StyleBlueprint",
] as const;

export const FOOTER_LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "Atmosphere", href: "#atmosphere" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Private Dining", href: "#private" },
  { label: "Locations", href: "#locations" },
] as const;
