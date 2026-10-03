# Quickstart & Validation — Modern Podcast Website

**Feature**: 001-podcast-website | **Date**: 2026-10-02
**Purpose**: Runnable validation guide proving the feature works end-to-end.
Contracts: [contracts/routes.md](./contracts/routes.md); data rules:
 [data-model.md](./data-model.md).

## Prerequisites

- Node.js 20+ and npm installed
- A modern browser (latest two versions of Chrome/Firefox/Edge/Safari)
- No database, API keys, or external accounts required (constitution gate I)

## Setup

```bash
npm install        # install dependencies
npm run dev        # local development server (development only)
```

## Build & serve exactly as deployed

```bash
npm run lint       # constitution Development Workflow gate 1
npm run build      # static export → out/ (includes data validation gate)
npx serve out      # or any static file server pointed at out/
```

Expected: `build` completes with zero errors; 20 episode detail pages are
pre-rendered; `out/` contains `index.html`, `episodes.html`,
`episodes/<slug>.html` ×20, `about.html`, `faq.html`, `404.html`,
`sitemap.xml`, `robots.txt`, and `fonts/`.

## Validation scenarios (map to spec acceptance scenarios)

| # | Scenario | Steps | Expected outcome |
|---|----------|-------|------------------|
| V1 | Featured first impression (US1/SC-001) | Open `/` at 360×640, no scrolling | Show name, tagline, one featured episode (title, summary, date, duration, CTA) visible on first screen within 5s |
| V2 | Featured CTA (US1/AC2) | Activate featured CTA | Lands on that same episode's detail view with player/preview controls |
| V3 | Full catalog (US2/SC-002) | Open `/episodes` | 20 entries, newest first, each with number, title, date, duration, summary; all reachable from `/` in ≤2 interactions |
| V4 | Episode detail (US2/AC2) | Click any episode | Full description, show notes, guest block when present, audio control or labeled "preview unavailable" |
| V5 | Featured–catalog consistency (US2/AC4) | Compare featured episode vs catalog | Featured episode appears identically in the catalog |
| V6 | About content (US3/AC1) | Open `/about` | Premise, host bio, ≥1 follow/share link visible |
| V7 | FAQ answers (US3/AC2, FR-006) | Open `/faq` | All questions listed; all answers visible without interaction |
| V8 | Navigation (FR-001) | From every page | Home, Episodes, About, FAQ reachable in one interaction |
| V9 | Narrow viewport (US2/AC3/FR-010) | Emulate 320×568 on `/episodes`, `/`, `/faq` | No overlap, clipping, or horizontal text scrolling; tap targets usable |
| V10 | Keyboard-only journey (FR-011/SC-004) | Tab through `/` → `/episodes` → detail → `/faq` | Every control reachable, visible focus ring, journey completable without a mouse |
| V11 | No-script readability (SC-007) | Disable JavaScript, reload `/`, `/episodes`, `/faq` | All titles, summaries, descriptions, and FAQ answers still visible |
| V12 | Metadata & SEO files (FR-009/constitution) | View page source of each route; open `/sitemap.xml`, `/robots.txt` | Unique title + description per page; sitemap lists all 24 URLs (home, episodes, 20 details, about, faq); robots allows public routes |
| V13 | Broken assets/links (SC-008) | Click through all pages and all 20 details | No broken internal links, missing images, or console errors |
| V14 | Not-found edge case | Visit an unknown URL like `/episodes/nope` | Friendly 404 with link back to `/episodes` |
| V15 | Design review (SC-006) | Stakeholder review of all 4 pages | ≥4 of 5 reviewers rate elegance and distinctiveness ≥4/5 |
| V16 | Performance (SC-003) | Throttle to 4G-class, load `/` | Usable (featured episode visible/interactable) in under 2 seconds |

## Data validation spot-checks

- `npm run build` fails if: episode count ≠ 20, duplicate slug/number,
  zero `featured: true`, empty required fields, invalid dates, or missing
  referenced asset files (see data-model.md Validation Summary).

## Constitution gate re-check (post-build)

- Serve `out/` from a plain file server — site must work (Static-Only ✅)
- Lighthouse/manual check: contrast AA, keyboard, no blocked first paint
- `npm ls --prod` shows only `next`, `react`, `react-dom` (Simplicity ✅)
