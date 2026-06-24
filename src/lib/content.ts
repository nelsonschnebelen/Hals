/** Single source of truth for homepage copy. Swap for final client copy. */

// Placeholder imagery, generated locally (scripts/generate-placeholders.py)
// and matched per section/dish to what its copy describes. Each is a swap
// point: drop the real Hal's photo of the same subject over the file in
// /public/placeholders (or change the path here) and nothing else moves.
// The hero ships real in /public.
export const IMG = {
  hero: "/hero.jpg", // real Hal's bone-in ribeye + wine

  // Dishes — one placeholder per menu item, matched to its description.
  ribeye: "/placeholders/ribeye.jpg", // → bone-in ribeye, crosshatched crust
  auPoivre: "/placeholders/auPoivre.jpg", // → sliced filet with pan sauce
  lobsterMac: "/placeholders/lobsterMac.jpg", // → baked pasta, blistered cheese crust
  redfish: "/placeholders/redfish.jpg", // → pan-finished Gulf fish, lemon butter
  bananasFoster: "/placeholders/bananasFoster.jpg", // → dessert over vanilla bean ice cream
  openFlame: "/placeholders/openFlame.jpg", // → cuts searing over open flame

  // Rooms & atmosphere — one placeholder per section subject.
  diningRoom: "/placeholders/diningRoom.jpg", // → the warm, low-lit dining room
  liveMusic: "/placeholders/liveMusic.jpg", // → live music playing downstairs
  barCocktails: "/placeholders/barCocktails.jpg", // → drinks at the bar
  openKitchen: "/placeholders/openKitchen.jpg", // → chefs in the open kitchen
  privateTable: "/placeholders/privateTable.jpg", // → candle-lit private dining table
  wine: "/placeholders/wine.jpg", // → red wine, poured tableside

  // Locations — one room per city.
  atlantaRoom: "/placeholders/atlantaRoom.jpg", // → the original Buckhead room
  nashvilleRoom: "/placeholders/nashvilleRoom.jpg", // → the new downtown Nashville room
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
    otRid: 2592, // OpenTable restaurant id (confirmed from hals.net)
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
    otRid: null, // TODO: Nashville's OpenTable rid (Atlanta's is 2592; Nashville differs)
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

/**
 * Menu split by location, mirroring the current Hal's site.
 * Atlanta is the full dinner menu. Nashville's food menu is still pending —
 * its tab shows a graceful fallback until the dishes are provided.
 */
export const MENU_BY_LOCATION = [
  {
    id: "atlanta",
    label: "Atlanta",
    sections: [
      {
        title: "Appetizers",
        items: [
          { name: "Oysters Bordelaise", description: "Oysters dusted with cornmeal, flash-fried, topped with garlic sauce." },
          { name: "Carpaccio", description: "Paper-thin sliced raw filet mignon, garnished with Dijonaise sauce, Parmigiana-Reggiano, chopped onion, and olive oil." },
          { name: "Shrimp Remoulade", description: "Poached, chilled shrimp on a bed of iceberg lettuce, topped with a Creole white remoulade sauce." },
          { name: "Fried Calamari", description: "Sliced calamari lightly battered, flash-fried, and served with marinara." },
          { name: "Escargot", description: "Baked and served out of the shell in a garlic butter sauce." },
          { name: "Mussels in White Wine Sauce", description: "Steamed in the shell in a white wine, garlic, butter, and cream sauce." },
        ],
      },
      {
        title: "Soups",
        items: [
          { name: "Louisiana Gumbo", description: "Seafood and Andouille sausage gumbo." },
          { name: "Lobster Bisque", description: "True lobster bisque finished with Sherry and lobster meat." },
        ],
      },
      {
        title: "Salads",
        items: [
          { name: "House Salad", description: "Bibb and iceberg lettuce with tomato, avocado, and your choice of dressing." },
          { name: "Caesar Salad", description: "Romaine topped with homemade croutons and tossed in our tangy Caesar dressing." },
          { name: "Beef Steak Tomato & Onion Salad", description: "Chopped tomatoes and Vidalia onions tossed in Hal's Vinaigrette." },
          { name: "Crab Salad", description: "Bibb lettuce, chopped onions, green olives, and jumbo lump crabmeat tossed in Hal's Vinaigrette." },
          { name: "Hal's Chopped Salad", description: "Mixed greens, carrots, celery, onions, tomatoes, asparagus, and crumbled blue cheese tossed in Hal's Vinaigrette." },
          { name: "Veal Salad", description: "Entrée salad — crispy-fried veal scaloppini over mixed lettuce tossed in Hal's Vinaigrette, topped with fresh Parmigiana-Reggiano." },
        ],
      },
      {
        title: "Pasta",
        items: [
          { name: "Pasta Asciutta", description: "Angel hair pasta tossed with extra virgin olive oil and homemade marinara." },
          { name: "Fettuccine Alfredo", description: "Fettuccine in a Parmigiana-Reggiano cream sauce." },
        ],
      },
      {
        title: "Seafood",
        items: [
          { name: "Trout Meunière or Almandine", description: "Speckled trout lightly battered and fried, with a brown butter sauce — with or without almonds." },
          { name: "Trout with Colossal Crabmeat", description: "Speckled trout lightly battered and fried, topped with sautéed jumbo lump crabmeat." },
          { name: "Snapper Franchaise", description: "Gulf red snapper in a light egg batter, sautéed and finished with a lemon beurre blanc." },
          { name: "Snapper with Artichokes & Mushrooms", description: "Gulf red snapper poached in white wine, butter, artichokes, and mushrooms." },
          { name: "Scottish Salmon Filet", description: "Grilled and lightly brushed with a butter sauce." },
          { name: "Swordfish Steak", description: "Grilled, classic Piccata, or Au Poivre." },
        ],
      },
      {
        title: "Veal",
        items: [
          { name: "Veal Marsala", description: "Sautéed in Marsala wine and topped with fresh mushrooms." },
          { name: "Veal Piccata", description: "Sautéed and finished with a lemon butter sauce." },
          { name: "Osso Bucco", description: "Braised veal shank in an Italian red wine sauce, served with angel hair pasta." },
        ],
      },
      {
        title: "Beef, Lamb & Poultry",
        items: [
          { name: "Filet Mignon, 12 oz.", description: "Center-cut filet mignon grilled and finished with a butter sauce." },
          { name: "Blackened Filet Medallions", description: "Filet medallions rubbed with our blackening seasoning, pan-seared, and served with fried onion rings." },
          { name: "Filet Mignon Au Poivre, 12 oz.", description: "Pressed in peppercorns, pan-seared, and served with a Cognac sauce." },
          { name: "Prime Bone-In Ribeye, 22 oz.", description: "Grilled and finished with a butter sauce." },
          { name: "Hal's Ribeye", description: "Prime bone-in lean cut, eye of the ribeye, finished with a butter sauce." },
          { name: "Rack of Lamb", description: "Roasted New Zealand rack rubbed with rosemary, served with a red wine and mint jelly reduction." },
          { name: "Roasted Chicken", description: "Oven-roasted in its own juices, served over mashed potatoes and gravy." },
          { name: "Hal's Duckling à l'Orange", description: "Crispy Long Island duckling with a light orange sauce, wild and white rice." },
        ],
      },
      {
        title: "Sides",
        layout: "grid",
        items: [
          { name: "Asparagus" },
          { name: "Sautéed Mushrooms" },
          { name: "Onion Rings" },
          { name: "Sautéed Onions" },
          { name: "Crabmeat" },
          { name: "Creamed Spinach" },
          { name: "Brabant Potatoes" },
          { name: "Brabant with Blue Cheese" },
          { name: "Brabant with Garlic Butter" },
          { name: "White Truffle Mac & Cheese" },
          { name: "Fettuccine Alfredo" },
          { name: "Pasta Asciutta" },
          { name: "Mashed Potatoes" },
          { name: "Lyonnaise Potatoes" },
          { name: "Sautéed Spinach" },
          { name: "Steamed Broccoli" },
          { name: "Shrimp" },
          { name: "Brussels Sprouts" },
        ],
      },
    ],
    notes: [
      "Dinner served Monday–Saturday, 5–11 PM · Closed Sunday · Bar opens at 4 PM",
      "$5 valet. Hal's does not offer separate checks and does not permit outside wine.",
    ],
    pending: "",
  },
  {
    id: "nashville",
    label: "Nashville",
    sections: [
      {
        title: "Appetizers",
        items: [
          { name: "Lobster Le'Beaux", description: "Fresh Maine lobster tail chopped, dusted in seasoned flour and fried, topped with a lemon beurre blanc and jumbo lump crabmeat." },
          { name: "Carpaccio", description: "Paper-thin sliced raw filet mignon, garnished with Dijonaise sauce, Parmigiana-Reggiano, chopped onion, and olive oil." },
          { name: "Fried Calamari", description: "Sliced calamari lightly battered, flash-fried, and served with marinara." },
          { name: "Escargot", description: "Baked and served out of the shell in a garlic butter sauce." },
          { name: "Mussels in White Wine Sauce", description: "Steamed in the shell in a white wine, garlic, butter, and cream sauce." },
          { name: "Shrimp Remoulade", description: "Poached, chilled shrimp on a bed of iceberg lettuce, topped with a Creole white remoulade sauce." },
          { name: "Shrimp Cocktail", description: "Served on the rim of a chilled glass filled with cocktail sauce." },
          { name: "Crab Cocktail", description: "Fresh Colossal crabmeat served in a chilled glass with a side of cocktail sauce." },
          { name: "Combo Remoulade", description: "Jumbo shrimp on a bed of iceberg lettuce, topped with Colossal crabmeat, white remoulade, and a touch of cocktail sauce." },
        ],
      },
      {
        title: "Salads & Soups",
        items: [
          { name: "House Salad", description: "Bibb and iceberg lettuce with tomato, avocado, and your choice of dressing." },
          { name: "Caesar Salad", description: "Romaine topped with homemade croutons and tossed in our tangy Caesar dressing." },
          { name: "Beefsteak Tomato & Onion Salad", description: "Chopped tomatoes and Vidalia onions tossed in Hal's Vinaigrette." },
          { name: "Crab Salad", description: "Bibb lettuce, chopped onions, green olives, and Colossal crabmeat tossed in Hal's Vinaigrette." },
          { name: "Hal's Chopped Salad", description: "Mixed greens, carrots, celery, onions, tomatoes, asparagus, and crumbled blue cheese tossed in Hal's Vinaigrette." },
          { name: "Wedge Salad", description: "A quarter head of lettuce with tomato, topped with blue cheese crumbles, bacon, and choice of dressing." },
          { name: "Veal Salad", description: "Entrée salad — crispy-fried veal scaloppini over mixed lettuce tossed in Hal's Vinaigrette, topped with fresh Parmigiana-Reggiano." },
          { name: "Louisiana Gumbo", description: "Seafood and Andouille sausage gumbo." },
          { name: "Lobster Bisque", description: "True lobster bisque finished with Sherry and lobster meat." },
        ],
      },
      {
        title: "Seafood",
        items: [
          { name: "Trout Meunière or Almandine", description: "Speckled trout lightly battered and fried, with a brown butter sauce — with or without almonds." },
          { name: "Trout with Colossal Crabmeat", description: "Speckled trout lightly battered and fried, topped with sautéed jumbo lump crabmeat." },
          { name: "Snapper Franchaise", description: "Gulf red snapper in a light egg batter, sautéed and finished with a lemon beurre blanc." },
          { name: "Snapper with Artichokes & Mushrooms", description: "Gulf red snapper poached in white wine, butter, artichokes, and mushrooms." },
          { name: "Scottish Salmon Filet", description: "Grilled and lightly brushed with a butter sauce." },
          { name: "Swordfish Steak", description: "Grilled, classic Piccata, or Au Poivre." },
          { name: "Chilean Seabass", description: "8 oz. pan-seared, over a bed of sautéed spinach, topped with a lobster sauce and shoestring potatoes." },
          { name: "16 oz. Lobster Tail", description: "Grilled, fried, broiled, steamed, or blackened." },
        ],
      },
      {
        title: "Steaks",
        items: [
          { name: "Filet Mignon, 12 oz.", description: "Center-cut filet mignon grilled and finished with a butter sauce." },
          { name: "Blackened Filet Medallions", description: "Filet medallions rubbed with our blackening seasoning, pan-seared, and served with fried onion rings." },
          { name: "Filet Mignon Au Poivre, 12 oz.", description: "Pressed in peppercorns, pan-seared, and served with a Cognac sauce." },
          { name: "Hal's Ribeye", description: "Prime bone-in lean cut, eye of the ribeye, finished with a butter sauce." },
          { name: "NY Strip, 16 oz.", description: "Prime New York Strip." },
          { name: "Bone-In Filet, 16 oz.", description: "Center-cut bone-in filet grilled and finished with a butter sauce." },
          { name: "Filet Oscar", description: "Three 4 oz. filet medallions sautéed and served with Colossal crabmeat, asparagus, and a side of hollandaise." },
          { name: "Surf & Turf", description: "Two 4 oz. filet medallions sautéed and finished in the oven, served with an 8 oz. lobster tail, cooked to your preferred preparation." },
        ],
      },
      {
        title: "Veal, Lamb & Poultry",
        items: [
          { name: "Veal Marsala", description: "Sautéed in Marsala wine and topped with fresh mushrooms." },
          { name: "Veal Piccata", description: "Sautéed and finished with a lemon butter sauce." },
          { name: "Osso Bucco", description: "Braised veal shank in an Italian red wine sauce, served with angel hair pasta." },
          { name: "Roasted Chicken", description: "Oven-roasted in its own juices, served over mashed potatoes and gravy." },
          { name: "Hal's Duckling à l'Orange", description: "Crispy Long Island duckling with a light orange sauce and wild rice." },
          { name: "Rack of Lamb", description: "Roasted New Zealand rack rubbed with rosemary, served with a red wine and mint jelly reduction." },
        ],
      },
      {
        title: "Pastas",
        items: [
          { name: "Pasta Asciutta", description: "Angel hair pasta tossed with extra virgin olive oil, Parmigiana-Reggiano, and homemade marinara." },
          { name: "Fettuccine Alfredo", description: "Fettuccine in a Parmigiana-Reggiano cream sauce." },
        ],
      },
      {
        title: "Sides",
        layout: "grid",
        items: [
          { name: "Asparagus" },
          { name: "Sautéed Mushrooms" },
          { name: "Onion Rings" },
          { name: "Sautéed Onions" },
          { name: "Mashed Potatoes" },
          { name: "Sautéed Spinach" },
          { name: "Creamed Spinach" },
          { name: "Brabant Potatoes" },
          { name: "Lobster Mac & Cheese" },
          { name: "White Truffle Mac & Cheese" },
          { name: "Brussels Sprouts" },
        ],
      },
    ],
    notes: [
      "Kitchen: Tue–Thu 4:30–10 PM · Fri–Sat 4:30–11 PM · Sun–Mon 4:30–9 PM · Bar opens at 4 PM",
      "$12 valet at the AC Hotel Marriott deck (Rep. John Lewis Way S). Hal's does not offer separate checks and does not permit outside wine.",
    ],
    pending: "",
  },
] as const;

/** Gallery — three parallax columns; alts double as the shot list. */
export const GALLERY = [
  { src: IMG.hero, alt: "Bone-in ribeye with a glass of red" },
  { src: IMG.diningRoom, alt: "The dining room at golden hour" },
  { src: IMG.barCocktails, alt: "Cocktails at the bar" },
  { src: IMG.openKitchen, alt: "The open kitchen at work" },
  { src: IMG.liveMusic, alt: "Live music, downstairs" },
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
