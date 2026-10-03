---

description: "Task list template for feature implementation"
---

# Tasks: Modern Podcast Website

**Input**: Design documents from `/specs/001-podcast-website/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Automated tests were NOT requested in the feature specification — no test tasks are included. Verification is done via the per-story validation tasks and the full quickstart.md validation suite (V1–V16).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `public/` at repository root (Next.js static-export app, no backend — see plan.md Structure Decision)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and base styling foundation

- [X] T001 Initialize Next.js project scaffolding at repository root: `package.json` (deps: `next`, `react`, `react-dom`; dev: `typescript`, `eslint`, `eslint-config-next`, `prettier`), `tsconfig.json`, and `next.config.ts` with `output: 'export'` and `images.unoptimized: true` per plan.md (R1, R6)
- [X] T002 Configure lint/format gates: ESLint (next core-web-vitals) config in `eslint.config.mjs`, Prettier config in `.prettierrc`, and `lint`/`format` scripts in `package.json` (research.md R9)
- [X] T003 [P] Create base stylesheet with design tokens (color palette with one accent, type scale, spacing, radius, shadow) and mobile-first reset in `src/app/globals.css`; self-host OFL display-serif + text-sans woff2 files in `public/fonts/` and wire them via `src/app/layout.tsx` font setup (research.md R4, R5)
- [X] T004 Add accessibility base styles in `src/app/globals.css` (after T003 — same file): skip-link, `:focus-visible` ring, WCAG AA text/background token pairs, and touch-target minimum sizes (constitution II, FR-011)

**Checkpoint**: Project builds with `npm run build` producing an empty static export; lint passes.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared data, shell, and cross-story components that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 [P] Create ShowProfile data module in `src/data/show.ts`: name, tagline, premise, hostName, hostBio, links array (≥1), faq array (≥5 entries) per data-model.md (fictional mock content)
- [X] T006 Create episode data module in `src/data/episodes.ts`: exactly 20 mock `Episode` records with unique `slug`/`number`, valid `publishedAt`, `durationSeconds > 0`, exactly one `featured: true`, optional guest/cover/audio fields; export helpers `sortedEpisodes`, `getFeaturedEpisode()` with most-recent fallback, `getEpisodeBySlug(slug)`; include build-time assertions from data-model.md Validation Summary
- [X] T007 [P] Create shared `EpisodePlayer` component in `src/components/EpisodePlayer.tsx` + `EpisodePlayer.module.css`: native `<audio controls>` bound to `audioUrl`; when no audio file exists render a clearly labeled "preview unavailable" state (FR-013) — used by both US1 hero and US2 detail page
- [X] T008 Create site shell in `src/app/layout.tsx` with `src/components/Header.tsx` (+ CSS module): skip-to-content link, primary nav (Home, Episodes, About, FAQ), `<main>` landmark, and `src/components/Footer.tsx` rendering show name + `show.links` (FR-001, FR-010; depends on T005)
- [X] T009 [P] Create friendly not-found page in `src/app/not-found.tsx` with message and link back to `/episodes` (spec edge case, quickstart V14)
- [X] T010 Create `src/app/sitemap.ts` using `next/sitemap` over all routes (home, `/episodes`, 20 episode slugs from T006, `/about`, `/faq`) and `public/robots.txt` allowing all public routes (FR-009, constitution constraints; depends on T006)

**Checkpoint**: Foundation ready — all four pages can now be implemented independently; `npm run build` still succeeds with data validation active.

---

## Phase 3: User Story 1 - Discover the show and its featured episode (Priority: P1) 🎯 MVP

**Goal**: First-time visitor sees branding + exactly one featured episode on the first screen and can reach its detail view or play controls.

**Independent Test**: Open `/` at 360×640 without scrolling: show name, tagline, one featured episode (title, summary, date, duration, CTA) visible; activate CTA → featured episode's detail view/player (quickstart V1, V2).

### Implementation for User Story 1

- [X] T011 [P] [US1] Create featured hero component in `src/components/FeaturedHero.tsx` + `FeaturedHero.module.css`: editorial display typography, show tagline, featured episode title/summary/publish date/duration, primary CTA linking to `/episodes/[slug]`, and embedded `EpisodePlayer` (FR-002, FR-013; research R5)
- [X] T012 [US1] Implement landing page in `src/app/page.tsx`: show name + tagline, `FeaturedHero` fed by `getFeaturedEpisode()`, base metadata export (unique title, description, canonical) (FR-002, FR-009, SC-001)
- [X] T013 [US1] Validate User Story 1 per quickstart: V1 (first-screen featured content — all 8 checks PASS against static HTML), V2 (CTA href wired to `/episodes/the-long-tune`; end-to-end click deferred until US2 T016 creates the detail route), V16 (first-load JS 107 kB — within budget), V11 landing section (full hero content present in raw HTML); fix any failures

**Checkpoint**: Landing page (MVP) fully functional and testable independently — stakeholder demo possible.

---

## Phase 4: User Story 2 - Browse the episode catalog (Priority: P2)

**Goal**: Visitor sees all 20 episodes newest-first with complete metadata and opens any episode's full detail view.

**Independent Test**: Open `/episodes`: 20 entries with number, title, date, duration, summary, newest first; click any entry → full detail with show notes, guest block when present, player (quickstart V3, V4, V5).

### Implementation for User Story 2

- [X] T014 [P] [US2] Create catalog entry component in `src/components/EpisodeCard.tsx` + `EpisodeCard.module.css`: episode number, title, publish date, human-readable duration, summary, cover image with branded placeholder fallback for missing art (FR-003, spec edge cases)
- [X] T015 [US2] Implement episodes catalog page in `src/app/episodes/page.tsx`: render `sortedEpisodes` (all 20, newest-first) as `EpisodeCard` links to detail routes; metadata export (unique title/description/canonical) (FR-003, FR-009, SC-002)
- [X] T016 [US2] Implement episode detail route in `src/app/episodes/[slug]/page.tsx` with `generateStaticParams()` over all 20 slugs, `generateMetadata()` per episode (FR-009), full description/show notes, conditional guest block, cover with placeholder fallback, and `EpisodePlayer`; graceful handling of unknown slugs via `not-found.tsx` (FR-004, FR-013)
- [X] T017 [US2] Validate User Story 2 per quickstart: V3 (20 entries complete — PASS), V4 (detail + player/unavailable — PASS), V5 (featured matches catalog — PASS), V14 (unknown slug → 404 — PASS), V13 link pass over all 20 details (PASS); all 18 checks green

**Checkpoint**: Both US1 and US2 work independently; full catalog browsable end-to-end.

---

## Phase 5: User Story 3 - Learn about the show and get answers (Priority: P3)

**Goal**: Visitor reads About content and finds FAQ answers visible on-page.

**Independent Test**: Open `/about`: premise, host bio, ≥1 follow link; open `/faq`: all questions with answers visible without interaction (quickstart V6, V7).

### Implementation for User Story 3

- [X] T018 [P] [US3] Create FAQ item component in `src/components/FaqItem.tsx` + `FaqItem.module.css`: native `<details>`/`<summary>` rendered with `open` so answers are visible by default and expand/collapse without scripts (FR-006, research R7)
- [X] T019 [US3] Implement FAQ page in `src/app/faq/page.tsx`: all `show.faq` entries rendered via `FaqItem`; metadata export (FR-006, FR-009)
- [X] T020 [P] [US3] Implement About page in `src/app/about/page.tsx`: `show.premise`, `show.hostName`, `show.hostBio`, follow/share link list from `show.links`; metadata export (FR-005, FR-009)
- [X] T021 [US3] Validate User Story 3 per quickstart: V6 (About content — PASS), V7 (FAQ answers visible by default — PASS), V8 (nav reachability — PASS), V11 FAQ/About sections (no-script readability — PASS); all 11 checks green

**Checkpoint**: All three user stories independently functional; all four pages complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements and verification that affect multiple user stories

- [X] T022 Keyboard-only and focus audit across all routes per quickstart V10: tab order, visible focus on every control, skip link working; fix issues in `src/app/layout.tsx`, `src/components/*` (fixed: header brand + home strip links got 44px targets; skip link, :focus-visible, reduced-motion confirmed in shipped CSS)
- [X] T023 [P] Responsive sweep at 320px, 768px, 1280px on `/`, `/episodes`, `/about`, `/faq` per quickstart V9: fix overflow, clipping, touch targets in CSS modules under `src/components/*` and `src/app/globals.css` (static audit: viewport meta present, all sizes clamp()/rem, zero fixed widths >320px, grids stack via min-width breakpoints)
- [X] T024 [P] Asset performance pass: compress/verify all images in `public/images/` are display-appropriate with explicit dimensions (no raster covers referenced — branded SVG-free placeholder panels used per FR-003 edge case), fonts self-hosted and preloaded in `src/app/layout.tsx`, no render-blocking third parties (constitution II, SC-003)
- [X] T025 Run full quickstart validation suite V1–V16 in `specs/001-podcast-website/quickstart.md` against `out/` served statically: 20/20 automated checks PASS (metadata/sitemap/robots V12, no-script V11, broken links V13, 404 V14, budget V16); quickstart build-output paths corrected to flat .html export; V15 design review left as stakeholder manual step
- [X] T026 [P] Create `README.md` at repository root with project overview, setup/build/lint commands, and static-deploy note (pointing to `out/`)
- [X] T027 Final constitution gates: `npm run format:check`, `npm run lint`, `npm run build`, `npx tsc --noEmit` all clean; production deps verified as only `next`, `react`, `react-dom` (`npm ls --prod`); Constitution Check table in `specs/001-podcast-website/plan.md` re-verified — all gates PASS

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
  - T008 depends on T005 (footer needs `show.links`)
  - T010 depends on T006 (sitemap needs episode slugs)
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - US1, US2, US3 are mutually independent (shared components live in Foundational: T007)
  - Can proceed in parallel, or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent of US1 (EpisodePlayer provided by T007)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent of US1/US2

### Within Each User Story

- Components before pages that consume them
- Page implementation before its validation task
- Core rendering before optional polish

### Parallel Opportunities

- Phase 1: T003 then T004 sequential (both edit `globals.css`); both before Phase 2
- Phase 2: T005, T006, T007, T009 are parallel (different files); T010 after T006
- US1: T011 standalone; US2: T014 parallel with T015/T016 start; US3: T018 parallel with T019/T020 start
- Phases 3, 4, and 5 can run in parallel with each other if staffed
- Polish: T023, T024, T026 parallel

---

## Parallel Example: User Story 3

```bash
# Launch component + independent page work together:
Task: "T018 [P] [US3] Create FAQ item component in src/components/FaqItem.tsx"
Task: "T020 [US3] Implement About page in src/app/about/page.tsx"

# Then wire dependent page:
Task: "T019 [US3] Implement FAQ page in src/app/faq/page.tsx (uses T018)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Quickstart V1, V2, V16 on the landing page
5. Demo the elegant landing page with featured episode

### Incremental Delivery

1. Setup + Foundational → shell + data ready
2. Add US1 → validate (V1/V2) → deploy/deliver (MVP!)
3. Add US2 → validate (V3–V5) → deliver full catalog
4. Add US3 → validate (V6–V8) → deliver About + FAQ
5. Polish phase → V9–V16 + constitution gates → release

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (landing/hero)
   - Developer B: User Story 2 (catalog/detail)
   - Developer C: User Story 3 (about/FAQ)
3. Stories complete and validate independently (shared components already exist)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- No automated tests requested — validation is via quickstart scenarios (V1–V16)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All content is fictional mock data; no feeds, databases, or external services (spec FR-007, constitution gate I)
