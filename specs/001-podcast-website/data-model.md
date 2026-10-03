# Phase 1: Data Model — Modern Podcast Website

**Feature**: 001-podcast-website | **Date**: 2026-10-02
**Source**: spec.md Key Entities + FRs; no persistence layer — all entities
are build-time constants (constitution gate I: no database).

---

## Entity: Episode

One of exactly 20 mock records, embedded in `src/data/episodes.ts`.

| Field | Type | Required | Rules / Validation |
|-------|------|----------|--------------------|
| `slug` | string | yes | Unique across the catalog; URL-safe (lowercase, hyphens); used by `/episodes/[slug]` |
| `number` | integer | yes | Unique; 1–20; displayed as episode number |
| `title` | string | yes | Non-empty; ≤ 120 chars (layout safety) |
| `summary` | string | yes | Non-empty; ≤ 300 chars; shown in catalog cards |
| `description` | string | yes | Non-empty; full show notes on detail page |
| `publishedAt` | ISO date string (`YYYY-MM-DD`) | yes | Valid calendar date; source of newest-first ordering |
| `durationSeconds` | integer | yes | > 0; rendered as human duration (e.g. "48 min") |
| `guestName` | string | no | When absent, guest block hidden (edge case fallback) |
| `coverImage` | string (public path) | no | When absent, branded placeholder used (edge case fallback) |
| `audioUrl` | string (public path) | no | When absent, player shows labeled "preview unavailable" state (FR-013) |
| `featured` | boolean | no (flag) | Exactly one record has `featured: true` across the catalog; absent = not featured; zero flags triggers the most-recent fallback |

**Derivations (computed, never stored):**

- `sortedEpisodes` = sort by `publishedAt` descending → catalog order
  (FR-003, Assumptions: newest first).
- `featuredEpisode` = the record with `featured: true`; **fallback** (edge
  case): if none or the flag points at a missing record, use
  `sortedEpisodes[0]` (the most recent episode).
- `episodeCount` must equal 20 at build time (FR-003/SC-002) — enforced by a
  build-time assertion in the data module.

**Relationships:** references the singleton ShowProfile only for site-wide
branding; episodes are independent of each other.

**State transitions:** none — data is immutable; editing content is a code
change, not a runtime operation (no admin UI, per spec Assumptions).

## Entity: ShowProfile

Singleton record embedded in `src/data/show.ts`.

| Field | Type | Required | Rules / Validation |
|-------|------|----------|--------------------|
| `name` | string | yes | Non-empty; used in site title, header, footer |
| `tagline` | string | yes | ≤ 160 chars; landing hero + meta descriptions |
| `premise` | string | yes | Show description; About page |
| `hostName` | string | yes | About page |
| `hostBio` | string | yes | About page; ≤ 800 chars |
| `links` | array of `{ label, url }` | yes | ≥ 1 entry ("Follow / share"); labels non-empty; URLs well-formed |
| `faq` | array of `{ question, answer }` | yes | ≥ 5 entries; question and answer non-empty (FR-006) |

**State transitions:** none — static singleton.

## Validation Summary (build-time checks)

1. Exactly 20 episode records; unique `slug` and `number`.
2. Exactly one `featured: true` (fallback path covers zero-hit case, but
   authoring target is one).
3. All required fields present and non-empty; `publishedAt` parses as a
   valid date; `durationSeconds > 0`.
4. Every `coverImage` / `audioUrl` path resolves to a file in `public/`
   (avoids broken assets, SC-008).
5. FAQ list satisfies minimum entry count and non-empty content.

Violations fail the production build (constitution Development Workflow:
build gate).

## Out of Scope Entities

- User accounts, favorites, comments, subscriptions — not requested.
- Analytics events, feed generation — not requested (spec Assumptions).
