/** Single source of truth for homepage copy. Swap for final client copy. */

// Placeholder photography, matched per section/dish to what its copy
// describes. Each is a swap point: replace the URL with the real Hal's
// photo of the same subject and nothing else changes. The hero ships
// locally in /public.
const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1600`;

export const IMG = {
  hero: "/hero.jpg", // real Hal's bone-in ribeye + wine

  // Dishes — one placeholder per menu item, matched to its description.
  ribeye: UNSPLASH("1546964124-0cce460f38ef"), // → bone-in ribeye, crosshatched crust
  auPoivre: UNSPLASH("1544025162-d76694265947"), // → sliced filet with pan sauce
  lobsterMac: UNSPLASH("1476224203421-9ac39bcb3327"), // → baked pasta, blistered cheese crust
  redfish: UNSPLASH("1467003909585-2f8a72700288"), // → pan-finished Gulf fish, lemon butter
  bananasFoster: UNSPLASH("1563805042-7684c019e1cb"), // → dessert over vanilla bean ice cream
  openFlame: UNSPLASH("1558030006-450675393462"), // → cuts searing over open flame

  // Rooms & atmosphere — one placeholder per section subject.
  diningRoom: UNSPLASH("1517248135467-4c7edcad34c4"), // → the warm, low-lit dining room
  liveMusic: UNSPLASH("1511671782779-c97d3d27a1d4"), // → the band playing downstairs
  barCocktails: UNSPLASH("1514362545857-3bc16c4c7d1b"), // → drinks at the bar
  openKitchen: UNSPLASH("1551218808-94e220e084d2"), // → chefs in the open kitchen
  privateTable: UNSPLASH("1464366400600-7168b8af9bc3"), // → candle-lit private dining table
  wine: UNSPLASH("1510812431401-41d2bd2722f3"), // → red wine, poured tableside

  // Locations — one room per city.
  atlantaRoom: UNSPLASH("1555396273-367ea4eb4db5"), // → the original Buckhead room
  nashvilleRoom: UNSPLASH("1559339352-11d035aa65de"), // → the new downtown Nashville room
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
    image: IMG.atlantaRoom,
    valet: null,
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
    image: IMG.nashvilleRoom,
    valet: {
      note: "Valet parking directs you to the AC Marriott parking deck. Arrive by either approach below.",
      entrances: [
        {
          name: "Alley Entrance",
          sub: "Between Hal's & The Joseph",
          groups: [
            {
              from: "",
              steps: [
                "Turn into the alley between Hal's and The Joseph Hotel.",
                "Continue straight, then turn right onto Peabody Street.",
                "Turn right onto Rep. John Lewis Way.",
                "Turn right into the AC Marriott parking deck.",
              ],
            },
          ],
        },
        {
          name: "Rep. John Lewis Way Entrance",
          sub: "",
          groups: [
            {
              from: "From Korean Veterans Blvd.",
              steps: [
                "Turn onto Rep. John Lewis Way — Calacas will be on the corner.",
                "Continue past Calacas and turn into the AC Marriott parking deck.",
              ],
            },
            {
              from: "From Peabody St.",
              steps: [
                "Turn into the AC Marriott parking deck before reaching Calacas.",
              ],
            },
          ],
        },
      ],
    },
  },
] as const;

export const MENU_FEATURE = {
  src: IMG.openFlame,
  alt: "A prime cut from Hal's, finished over open flame",
};

export const MENU_ITEMS = [
  {
    name: "Bone-In Ribeye",
    description:
      "Prime and well-marbled, seared over open flame to a deep, crosshatched crust.",
    image: IMG.ribeye,
  },
  {
    name: "Steak au Poivre",
    description:
      "Center-cut filet crusted in cracked peppercorns, finished with a brandy demi-glace.",
    image: IMG.auPoivre,
  },
  {
    name: "Lobster Mac & Cheese",
    description:
      "Penne and sweet Maine lobster baked under a blistered three-cheese crust.",
    image: IMG.lobsterMac,
  },
  {
    name: "Blackened Redfish",
    description:
      "A New Orleans classic — Gulf redfish, cast-iron blackened, lemon butter.",
    image: IMG.redfish,
  },
  {
    name: "Bananas Foster",
    description:
      "Flambéed tableside in dark rum and brown sugar, over vanilla bean ice cream.",
    image: IMG.bananasFoster,
  },
] as const;

/** Gallery — three parallax columns; alts double as the shot list. */
export const GALLERY = [
  { src: IMG.hero, alt: "Bone-in ribeye with a glass of red" },
  { src: IMG.diningRoom, alt: "The dining room at golden hour" },
  { src: IMG.barCocktails, alt: "Cocktails at the bar" },
  { src: IMG.openKitchen, alt: "The open kitchen at work" },
  { src: IMG.liveMusic, alt: "The band, downstairs" },
  { src: IMG.openFlame, alt: "Seared over open flame" },
  { src: IMG.wine, alt: "Poured tableside" },
  { src: IMG.auPoivre, alt: "A board of slow-finished cuts" },
  { src: IMG.privateTable, alt: "An evening at the table" },
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
