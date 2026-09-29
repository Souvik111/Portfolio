# Souvik Mondal — Portfolio

Portfolio site built from the Figma designs: home, three case studies, a pannable
playground, a web-work carousel and an about page.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
```

## Pages

| Route          | What it is                                                       |
| -------------- | ---------------------------------------------------------------- |
| `/`            | Home — hero, work cards, web section, contact footer              |
| `/about`       | About — bio, experience, tools                                    |
| `/playground`  | Infinite canvas: artworks, music player, sketchbook               |
| `/web`         | Web Design & Development carousel                                 |
| `/work/deepr`  | Deepr case study                                                  |
| `/work/piex`   | PIEX Solar SaaS case study                                        |
| `/work/8x`     | 8x invite-flow case study                                         |

## Layout

```
src/app/          routes (one folder per page)
src/components/   shared pieces — Nav, SiteFooter, CursorTrail,
                  PanZoomCanvas, Sketchbook, MusicCorner, WebCarousel…
src/app/globals.css   design tokens (colours, fonts) + all animations
public/           images and video, grouped per page (home, deepr, piex, 8x, web…)
scripts/          figma-export.mjs — pulls assets straight from Figma
```

## Things worth knowing

- **Colours and fonts** live as CSS variables at the top of `src/app/globals.css`
  and are exposed to Tailwind through `@theme inline`, so `bg-orange`,
  `text-ink`, `font-display` etc. all come from there.
- **Fonts** are Syne (headings) and DM Sans (body), loaded via `next/font`.
- **Transparent videos** (the waving cat) ship as both `.webm` (VP9 alpha) and
  `.mov` (HEVC alpha) — Safari only decodes the second one.
- **Pixel sprites** (walking cat, dancing cat) are sprite sheets animated with
  CSS `steps()`, so they stay crisp.
- **The playground canvas** is `PanZoomCanvas`: children are positioned in Figma
  coordinates and the whole canvas pans and zooms.
- **Image quality:** `next.config.ts` allowlists quality `92`, which the web
  screenshots use — Next 16 ignores any `quality` not listed there.
- **Pulling new assets from Figma:**
  ```bash
  FIGMA_TOKEN=<your token> node scripts/figma-export.mjs <fileKey> <folder> name=1:23 …
  ```
  Exports at 2x into `public/<folder>/`.

## Still to fill in

- `public/cv.pdf` — the "Read CV" button points here
- The last four slides in `/web` have no live URL yet
