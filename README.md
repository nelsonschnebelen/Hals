# Hal's The Steakhouse

Standalone marketing site for Hal's The Steakhouse — a Buckhead institution since
1989, now also in Nashville. Built to be immersive and premium, using the
client's **real** photography (no AI-generated food).

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** — gold `#c5a572` on near-black `#0a0807`, Playfair Display +
  Inter via `next/font`
- **Framer Motion** — `<Reveal>` scroll-in + motion variants
- **Lenis** — premium smooth scroll (lazy-loaded, reduced-motion aware)
- **GSAP / ScrollTrigger** — cinematic hero parallax
- **Cloudinary** — image optimization/delivery (`<CloudImage>` + loader) and
  server-side uploads
- **fal.ai** — image/vector/video generation helpers (art direction only)
- **next/og** — dynamic branded social-share images

## Getting started

```bash
cp .env.example .env.local   # then fill in the secrets (see below)
npm install
npm run dev                  # http://localhost:3000
```

## Environment

See `.env.example`. The Cloudinary cloud name and API key are non-secret and
ship as inline fallbacks. **Rotate and set** `CLOUDINARY_API_SECRET` and
`FAL_KEY` — both were shared in chat.

## The reusable toolkit

| File | Role |
| --- | --- |
| `src/lib/animations.ts` | Motion variants + timing tokens |
| `src/components/ui/reveal.tsx` | `<Reveal variant="up">` scroll-in (reduced-motion aware) |
| `src/components/providers/smooth-scroll.tsx` | Lenis provider (lazy import) |
| `src/lib/gsap.ts` | GSAP + ScrollTrigger preconfigured |
| `src/lib/cloudinary-loader.ts` | `next/image` loader (`f_auto,q_auto`) |
| `src/components/ui/cloud-image.tsx` | `<CloudImage>` — **must** be a client component |
| `src/lib/cloudinary.ts` | Server-only upload helper |
| `src/lib/fal.ts` | `generateImage` / `generateVector` / `generateVideo` |
| `src/app/api/og/route.tsx` | Dynamic OG image |
| `src/app/api/generate-image/route.ts` | fal endpoint |

## Cloudinary assets (account-level, reusable)

- `hals/hero` — real ribeye
- `hals/atmosphere` — real interior
- `hals/menu` — replace with a second real dish

**TODO:** upload the real food photos (ribeye, filet, chop) as `hals/ribeye`,
`hals/filet`, `hals/chop` and wire them into the hero / menu / gallery in
`src/lib/content.ts`.

## Gotchas (already solved here)

- `<CloudImage>` is a client component — `next/image`'s loader is a function and
  can't cross the server→client boundary (caused a cryptic static-gen timeout).
- Lenis is imported lazily inside the effect, never at module scope.
- All motion respects `prefers-reduced-motion`.
- Keep secrets in `.env.local`; scan diffs before pushing.

## Verify

```bash
npx tsc --noEmit
npm run build
```
