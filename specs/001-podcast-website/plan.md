# Implementation Plan: Modern Podcast Website

**Branch**: `001-podcast-website` (spec directory; not a git repo yet) | **Date**: 2026-10-02 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-podcast-website/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build an elegant, distinctive 4-page podcast website (Home with one featured
episode, Episodes, About, FAQ) using Next.js configured for full static
export. All content for the 20 episodes is mocked and embedded in the
codebase — no database, no live feed, no server runtime. The site must be
responsive from 320px up, keyboard accessible, readable without scripts, and
visually stand out via a cohesive editorial design direction.

## Technical Context

**Language/Version**: TypeScript 5.x (Next.js App Router)

**Primary Dependencies**: Next.js 15 static export (`output: 'export'`),
React 19; no other runtime dependencies (styling via CSS Modules, media via
native browser elements)

**Storage**: N/A — no database; mock episode data embedded as typed modules
compiled into the static site at build time

**Testing**: Manual browser smoke tests + lint and production-build gates per
constitution; automated tests optional (only if requested in the spec)

**Target Platform**: Static file host (any); latest two versions of Chrome,
Firefox, Edge, Safari; viewports 320px → desktop

**Project Type**: web application (static site, no backend)

**Performance Goals**: Landing page usable in under 2s on 4G-class mobile
(SC-003); all content visible without waiting on scripts (SC-007)

**Constraints**: Static export only — no API routes, server actions,
middleware, or database; WCAG AA contrast + keyboard-only journeys (FR-011);
no secrets in shipped assets; unique title/description per page plus
sitemap/robots (FR-009, constitution)

**Scale/Scope**: 4 top-level pages, 20 pre-rendered episode detail pages,
20 mock episodes, 1 show profile, 1 featured episode at a time

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Gate | Status | Evidence |
|---|------|--------|----------|
| I | Static-Only Delivery | ✅ PASS | `output: 'export'` emits plain HTML/CSS/JS to `out/`; no API routes, server actions, or middleware; episode data embedded at build time; every route is pre-rendered, so content is readable with scripts disabled |
| I | No secrets in assets | ✅ PASS | Only public mock content ships; no keys or private data |
| I | Progressive enhancement | ✅ PASS | Pre-rendered HTML for all routes; FAQ uses native disclosure elements; audio uses native controls — core content and primary journeys work without scripts |
| II | Responsive 320px+ | ✅ PASS | Mobile-first layout required in every component task; verified in quickstart scenarios |
| II | Semantic/valid markup, keyboard, AA contrast | ✅ PASS | Semantic landmarks and heading order; focus-visible styles; contrast tokens checked against WCAG AA; all journeys keyboard-testable |
| II | Asset optimization, no blocked initial load | ✅ PASS | Static export disables image optimizer (`images.unoptimized: true`), so images are pre-sized/compressed before commit; self-hosted fonts; no third-party scripts |
| III | Minimal dependencies | ✅ PASS | Runtime deps: `next`, `react`, `react-dom` only. Dev: `typescript`, `eslint`, `prettier`. No CSS framework, no state library, no audio/accordion libraries |
| Constraints | Browsers, no backend, build-time data only, per-page metadata + sitemap/robots, licensed content | ✅ PASS | Evergreen browsers only; no server surface; all data embedded at build; `metadata` export per route + `sitemap.ts` + `public/robots.txt`; mock text authored for the project; fonts licensed for web (OFL) |

**Verdict**: No violations — no Complexity Tracking entries required.

Re-check after Phase 1 design: **PASS** — research/data-model/contracts
introduce no server components requiring request context, no dynamic APIs,
and no new dependencies.

## Project Structure

### Documentation (this feature)

```text
specs/001-podcast-website/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── routes.md        # Page/route UI contract
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
package.json             # deps: next, react, react-dom (+ dev: typescript, eslint, prettier)
next.config.ts           # output: 'export', images.unoptimized: true
tsconfig.json
public/
├── fonts/               # self-hosted OFL woff2 (display serif + text sans)
├── images/
│   ├── episodes/        # pre-sized, compressed cover art (20)
│   └── show/            # host photo / show branding
├── audio/               # optional bundled sample clip (else "unavailable" state)
├── robots.txt
└── favicon.ico
src/
├── app/
│   ├── layout.tsx       # Root layout: skip link, header nav, footer, fonts, base metadata
│   ├── page.tsx         # Landing (/) — branding + exactly one featured episode
│   ├── episodes/
│   │   ├── page.tsx     # Catalog: 20 episodes, newest first
│   │   └── [slug]/page.tsx  # Episode detail; generateStaticParams ×20
│   ├── about/page.tsx   # Show premise, host bio, follow/share links
│   ├── faq/page.tsx     # Questions with answers visible by default
│   ├── sitemap.ts       # next/sitemap over all routes
│   ├── not-found.tsx    # Friendly not-found with link back to episodes
│   └── globals.css      # Design tokens (color, type scale, spacing), resets
├── components/
│   ├── Header.tsx / Footer.tsx
│   ├── FeaturedHero.tsx    # Landing featured-episode hero
│   ├── EpisodeCard.tsx     # Catalog entry (number, title, date, duration, summary)
│   ├── EpisodePlayer.tsx   # Native <audio> with labeled unavailable fallback
│   └── FaqItem.tsx         # Native <details>/<summary>, open by default
├── lib/
│   └── format.ts        # formatDate / formatDuration helpers
└── data/
    ├── episodes.ts      # 20 mock episode records (typed, exactly one featured)
    └── show.ts          # ShowProfile: name, tagline, premise, host bio, links
out/                     # Static export output (build artifact, not committed)
```

**Structure Decision**: Single project — one Next.js static-export app at the
repository root. No backend/frontend split exists because there is no backend
(constitution gate I). Route-level pages under `src/app`, shared UI under
`src/components`, embedded mock data under `src/data`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | — | All constitution gates passed; no justifications required |
