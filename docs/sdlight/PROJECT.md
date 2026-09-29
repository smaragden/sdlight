---
generated: 2026-09-29
phase: pre-release
source: derived from docs/sdlight/features/*.md. Only phase is hand-set.
---

# Project: sdlight

## What this is
sdlight is a lightweight SDLC workflow delivered as a Claude Code / Pi
plugin: seed, spec, plan, and feature doc with review gates between the
stages. This vault tracks features developed against sdlight itself.

## Feature map
- Browse seeds and take one to brainstorming: a `/browse-seeds` popup to
  scan, preview, randomize, and select a seed to start a brainstorm on.
  See [features/browse-seeds-random-pick.md](features/browse-seeds-random-pick.md).

## Architecture at a glance
The feature ships inside the `seed-counter` pi extension
(`extensions/seed-counter.ts`), which is loaded via the package's
`pi.extensions` entry. The extension reads seeds from
`docs/sdlight/seeds/` and builds its popup from `@earendil-works/pi-tui`
components. Selecting a seed hands off to the `sdlc-brainstorm` skill.

## Open threads
- Umbrella specs: spec in progress at
  [specs/umbrella-seeds-and-order.md](specs/umbrella-seeds-and-order.md).
