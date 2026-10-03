<!--
Sync Impact Report
==================
- Version change: unversioned (template) → 1.0.0
- Modified principles:
  - [PRINCIPLE_1_NAME] placeholder → I. Static-Only Delivery (NON-NEGOTIABLE)
  - [PRINCIPLE_2_NAME] placeholder → II. Performance & Accessibility Baseline
  - [PRINCIPLE_3_NAME] placeholder → III. Simplicity (YAGNI)
  - Template slots PRINCIPLE_4 and PRINCIPLE_5 intentionally dropped —
    bare-minimum constitution for a static web app defines three principles only.
- Added sections:
  - Additional Constraints
  - Development Workflow
- Removed sections: none (template placeholders replaced, not removed)
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md — Constitution Check gate is generic
    ("Gates determined based on constitution file"); no changes required.
  - ✅ .specify/templates/spec-template.md — no constitution-mandated sections;
    MUST-style FR/SC placeholders already align.
  - ✅ .specify/templates/tasks-template.md — no principle-driven task categories
    added or removed; verification tasks map to Development Workflow gate.
  - ✅ .specify/templates/checklist-template.md — verified, no stale references.
  - ✅ .specify/templates/commands/*.md — directory does not exist; command files
    live in .opencode/commands/ and reference the constitution generically
    (no outdated agent-specific guidance found).
  - ✅ AGENTS.md — points to current plan; no principle references to update.
  - ⚠ README.md / docs/quickstart.md — do not exist; create with constitution
    compliance notes if added later (deferred, not a blocker).
- Follow-up TODOs: none — all placeholder tokens resolved.
-->

# mi-podcast Constitution

## Core Principles

### I. Static-Only Delivery (NON-NEGOTIABLE)

- The build MUST produce plain static files (HTML, CSS, JS, assets) that any
  static file host can serve with no server-side runtime, database, or
  backend process.
- The site MUST function when served from a plain file server or static host;
  no feature may REQUIRE a custom server.
- Client-side code is public: secrets, API keys, and private data MUST NOT be
  shipped in any asset.
- Features that need dynamic behavior (e.g., podcast feed data) MUST degrade
  gracefully: the core content is readable with JavaScript disabled or
  unavailable (progressive enhancement).

Rationale: static delivery keeps hosting trivial, cheap, and secure; anything
else must be justified as a constitution amendment.

### II. Performance & Accessibility Baseline

- Pages MUST be responsive (mobile-first) and usable at 320px width up to
  desktop widths.
- Markup MUST be semantic and valid: headings in order, alt text on meaningful
  images, form inputs labeled, and interactive controls keyboard-reachable.
- Text MUST meet WCAG AA contrast; the primary user journeys MUST be
  completable with a keyboard alone.
- Images and media MUST be compressed and sized for their display context;
  initial page load MUST NOT be blocked by scripts or unoptimized assets.

Rationale: a static site has no excuses for poor delivery — these are the
minimum bars for a usable, indexable page.

### III. Simplicity (YAGNI)

- Dependencies, frameworks, and build tooling MUST be kept to the smallest
  set that meets a demonstrated need; plain HTML/CSS/JS is the default.
- Every new dependency or tool MUST be justified in the plan's Complexity
  Tracking table before adoption.
- Each feature MUST be as simple as possible; speculative abstractions,
  unused configuration, and premature generalization MUST NOT be merged.

Rationale: minimal surface area is easier to audit, faster to load, and
simpler to maintain for a small static project.

## Additional Constraints

- Target browsers: the latest two major versions of Chrome, Firefox, Edge,
  and Safari. No legacy (IE) support.
- No backend, database, authentication, or server-side rendering is in scope;
  introducing any of these requires a constitution amendment.
- External data (feeds, APIs) MUST be fetched from public, CORS-enabled
  sources or resolved at build time; runtime calls to private services are
  prohibited.
- Every page MUST ship a unique `<title>`, meta description, and canonical
  URL; the site MUST ship a valid `sitemap.xml` and `robots.txt`.
- All content MUST be original or licensed for web publication (text, audio,
  images, fonts).

## Development Workflow

- Before any merge, a change MUST pass: lint/format check (once configured),
  a successful production build, and a manual browser smoke test of affected
  pages at mobile and desktop widths.
- The production build output MUST be verified: no broken internal links,
  missing assets, or console errors on affected pages.
- Plans MUST pass the `## Constitution Check` gate in
  `.specify/templates/plan-template.md` before Phase 0 research; violations
  MUST be justified in the plan's Complexity Tracking table or the plan is
  rejected.
- Structure or technology-stack changes MUST be reflected in the current plan
  and `AGENTS.md` in the same change.

## Governance

- This constitution supersedes all other practices for this repository.
- Amendments MUST be proposed as a change to this file that documents the
  rationale, updates the Sync Impact Report, and bumps the version using
  semantic versioning: MAJOR for principle removal or redefinition, MINOR for
  new principles or sections, PATCH for clarifications and wording fixes.
- Every plan, spec, and task list MUST be checked against this constitution;
  conflicts MUST be resolved in favor of the constitution before
  implementation begins.
- Compliance review expectations: reviewers MUST verify the Development
  Workflow gates were run and the Constitution Check passed; unjustified
  violations block merge.
- Runtime development guidance lives in the current plan and `AGENTS.md`,
  which MUST stay consistent with this constitution.

**Version**: 1.0.0 | **Ratified**: 2026-10-02 | **Last Amended**: 2026-10-02
