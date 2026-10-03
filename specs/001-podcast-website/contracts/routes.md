# Contracts: Routes & Pages — Modern Podcast Website

**Feature**: 001-podcast-website | **Date**: 2026-10-02
**Type**: UI contract for a static-export site (no server APIs — the route
surface *is* the public interface).

## Route table

All routes MUST exist as pre-rendered static HTML after `next build`.

| Route | Page | Data consumed | Required content (spec ref) | Metadata |
|-------|------|---------------|------------------------------|----------|
| `/` | Landing | `ShowProfile`, `featuredEpisode` (from `episodes`) | Show name + tagline; exactly one featured episode with title, summary, publish date, duration, primary CTA (FR-002); first-screen visibility (SC-001) | Unique title + description + canonical |
| `/episodes` | Catalog | `sortedEpisodes` (all 20) | All 20 episodes newest-first: number, title, date, duration, summary; each links to its detail route (FR-003, SC-002) | Unique title + description + canonical |
| `/episodes/[slug]` | Episode detail (×20) | one `Episode` by slug | Full description, show notes, guest block (if present), cover (or placeholder), native audio player or labeled unavailable state (FR-004, FR-013) | Unique per-episode title + description + canonical |
| `/about` | About | `ShowProfile` | Premise, host name + bio, follow/share links (FR-005) | Unique title + description + canonical |
| `/faq` | FAQ | `ShowProfile.faq` | All questions listed; answers visible by default, expanded, readable without scripts (FR-006) | Unique title + description + canonical |
| `*` (any unknown path) | Not-found | — | Friendly message + link back to `/episodes` (spec edge case) | Default not-found metadata |

## Global shell contract (every route)

- Skip-to-content link, `<header>` with primary nav (Home, Episodes, About,
  FAQ), `<main>` landmark, `<footer>` with ShowProfile links — one
  interaction to every page from every page (FR-001).
- Unique `<title>` and meta description per page (FR-009).
- Fully usable 320px → desktop; no horizontal text scrolling (FR-010).
- All interactive elements keyboard-reachable with visible focus (FR-011).

## Progressive-enhancement contract (every route)

- Core content (headings, episode metadata, descriptions, FAQ answers) is
  present in the served HTML — visible with scripts disabled (SC-007).
- No initial page load is blocked by scripts or unoptimized assets
  (constitution II).

## Site files contract

- `/sitemap.xml` — includes `/`, `/episodes`, all 20 episode URLs, `/about`,
  `/faq` (constitution Additional Constraints).
- `/robots.txt` — allows crawling of all public routes.
- Branded 404 page for unknown URLs.

## Data contract (build-time interface)

- `src/data/episodes.ts` exports `episodes: Episode[]` (20 records) and
  helpers `sortedEpisodes`, `getFeaturedEpisode()` (with most-recent
  fallback), `getEpisodeBySlug(slug)`. See `../data-model.md` for field
  rules and build-time assertions.
- `src/data/show.ts` exports `show: ShowProfile`.
