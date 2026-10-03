# Quiet Frequencies — mi-podcast

An elegant, static podcast website: landing page with one featured episode,
a 20-episode catalog (mock data, no feeds), About, and FAQ. Built with
Next.js static export — no database, no server.

<img width="916" height="471" alt="Captura de pantalla 2026-10-03 141822" src="https://github.com/user-attachments/assets/001d85d7-2f37-449b-8a46-810fe3593ca3" />

## Commands

```bash
npm install       # install dependencies
npm run dev       # dev server → http://localhost:3000
npm run lint      # ESLint gate
npm run build     # production static export → out/
npm run serve     # serve the out/ export locally
npm run format    # Prettier write
```

## Structure

- `src/app/` — routes: `/`, `/episodes`, `/episodes/[slug]` (×20), `/about`,
  `/faq`, plus `sitemap.ts` and `not-found.tsx`
- `src/components/` — Header, Footer, FeaturedHero, EpisodeCard,
  EpisodePlayer, FaqItem
- `src/data/` — embedded mock data: 20 episodes + show profile (build-time
  validated)
- `src/lib/` — date/duration formatting helpers
- `public/` — self-hosted OFL fonts, robots.txt, assets

## Deploy

Upload the `out/` directory to any static host (Netlify, GitHub Pages,
S3, nginx). Nothing else is needed.
