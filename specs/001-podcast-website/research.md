# Phase 0: Research — Modern Podcast Website

**Feature**: 001-podcast-website | **Date**: 2026-10-02
**Input**: User direction — "Next.js with static site configuration, no
databases — data is embedded in the content for the mock episodes. Site is
responsive and ready for mobile."

All Technical Context items are resolved; no NEEDS CLARIFICATION markers
remain.

---

## R1. Rendering strategy: Next.js static export

- **Decision**: Configure Next.js with `output: 'export'` so `next build`
  emits a fully static site to `out/` (plain HTML/CSS/JS per route). No API
  routes, server actions, route handlers, middleware, or runtime server.
- **Rationale**: User-mandated stack; satisfies constitution gate I
  (Static-Only Delivery) and FR-007 (no external data services); deployable
  to any static host.
- **Alternatives considered**:
  - SSR/ISR on a Node server — rejected: violates constitution gate I.
  - Plain hand-written HTML/CSS — rejected: user chose Next.js; routing,
    metadata, and sitemap tooling come for free.
  - Static-site competitors (Astro, Hugo) — rejected: user specified
    Next.js.

## R2. Routing: App Router with pre-rendered dynamic segment

- **Decision**: App Router routes `/`, `/episodes`, `/episodes/[slug]`,
  `/about`, `/faq`. The 20 detail pages are produced at build time via
  `generateStaticParams()` over the embedded episode data.
- **Rationale**: Static export requires every dynamic route enumerated at
  build time; gives each episode a shareable address (spec FR-004 decision)
  with zero runtime logic.
- **Alternatives considered**:
  - Pages Router — legacy structure, no benefit here.
  - Client-side single-page rendering of episodes — rejected: content would
    not exist without scripts (SC-007) and would lose per-page metadata
    (FR-009).
  - Hash/query-based episode display — rejected: not shareable per spec.

## R3. Data: embedded typed modules

- **Decision**: Store the 20 episodes in `src/data/episodes.ts` and the show
  profile in `src/data/show.ts` as typed constants imported at build time.
  Sorting (newest-first) is computed from `publishedAt`, not stored order.
- **Rationale**: User-mandated ("data is embedded in the content"); FR-007
  forbids live feeds; TypeScript types double as the validation contract
  (see data-model.md).
- **Alternatives considered**:
  - JSON files — no type checking; rejected.
  - Headless CMS / database — rejected by user and constitution.
  - Fetching an RSS feed at build time — rejected by FR-007 explicitly.

## R4. Styling: CSS Modules + design-token custom properties

- **Decision**: Global tokens (color, type scale, spacing, radius, shadow)
  defined as CSS custom properties in `globals.css`; per-component CSS
  Modules. No CSS framework, no CSS-in-JS.
- **Rationale**: Constitution III (smallest dependency set); tokens make the
  "elegant, cohesive" identity (FR-012) enforceable in one place; zero
  runtime cost.
- **Alternatives considered**:
  - Tailwind — rejected: adds a dependency and utility-class markup noise
    for a 4-page site.
  - styled-components/vanilla-extract — rejected: runtime or build
    complexity without need.

## R5. Design direction ("elegant, stands out")

- **Decision**: Editorial direction: large serif display headings + clean
  sans-serif body (self-hosted OFL fonts), generous whitespace, restrained
  neutral palette with one accent color, subtle CSS-only transitions
  (hover/focus), strong typographic hierarchy on the featured hero.
- **Rationale**: Interprets the user's "elegant / stand out" requirement
  (spec Assumptions, FR-012); verifiable via design review SC-006; CSS-only
  motion keeps constitution II/III (no animation libraries, no blocked
  load).
- **Alternatives considered**:
  - Dark "luxury" theme, brutalist, retro — all valid but narrower tastes;
    editorial direction is the safest elegant default and themeable later.
  - Animation libraries (GSAP, Framer) — rejected: unnecessary dependency.

## R6. Images under static export

- **Decision**: Set `images.unoptimized: true` (required for
  `output: 'export'`). Commit pre-sized, compressed cover art under
  `public/images/`; every `<Image>` carries explicit `width`/`height`
  (or is replaced by plain markup with dimensions) to avoid layout shift.
- **Rationale**: The built-in optimizer needs a server; constitution II
  requires compressed, display-appropriate assets and no blocked initial
  load — pre-commit compression is the static equivalent.
- **Alternatives considered**:
  - Image CDN loader (`images.loader`) — rejected: external service at
    runtime, adds a dependency.
  - Uncompressed full-size art — rejected: violates constitution II.

## R7. Interactivity: native browser elements only

- **Decision**: Audio playback via native `<audio controls>` pointing at a
  bundled sample clip, with a clearly labeled "preview unavailable" state
  when no file exists (FR-013). FAQ via native `<details>`/`<summary>`
  rendered with the `open` attribute so answers are visible by default
  (FR-006). No client-side state libraries; `'use client'` only where a
  genuinely interactive island is unavoidable.
- **Rationale**: Native controls are keyboard accessible and work without
  scripts (constitution I/II); satisfies YAGNI (constitution III).
- **Alternatives considered**:
  - Audio player libraries (howler, custom players) — rejected: dependency
    and JS-dependence for a mocked catalog.
  - JS accordion components — rejected: unnecessary; disclosure elements
    are semantic and accessible out of the box.

## R8. Metadata, sitemap, robots

- **Decision**: Per-route `export const metadata` (title, description,
  canonical) including one template per episode; `app/sitemap.ts` generated
  from the episode data; `public/robots.txt`.
- **Rationale**: FR-009 + constitution Additional Constraints require unique
  titles/descriptions/canonical URLs, a valid sitemap.xml and robots.txt.
- **Alternatives considered**:
  - Hand-maintained static sitemap — drifts from data; rejected.
  - Metadata libraries — rejected: built into the framework.

## R9. Quality tooling

- **Decision**: ESLint (Next.js core-web-vitals config) + Prettier as
  dev-only dependencies; gates run as `lint` and `build` scripts per
  constitution Development Workflow.
- **Rationale**: Constitution requires a lint/format check before merge;
  dev-only tooling does not ship to the browser.
- **Alternatives considered**:
  - No linter — rejected: constitution workflow names the gate.
  - TypeScript ESLint strict monorepo configs — overkill for this scope.

## R10. Responsive strategy

- **Decision**: Mobile-first CSS (base styles for 320px, `min-width`
  breakpoints upward); fluid type via `clamp()`; touch targets ≥ 44px;
  catalog and hero layouts verified at 320px, 768px, 1280px in quickstart
  scenarios.
- **Rationale**: FR-010 and constitution II mandate 320px usability;
  mobile-first avoids desktop-first override bloat.
- **Alternatives considered**:
  - Desktop-first with down-scaling — rejected: heavier overrides, easier
    to break the 320px floor.

---

**Phase 0 verdict**: All unknowns resolved. No new dependencies beyond
`next`, `react`, `react-dom` (+ dev tooling) — constitution gate III holds.
Proceed to Phase 1 design.
