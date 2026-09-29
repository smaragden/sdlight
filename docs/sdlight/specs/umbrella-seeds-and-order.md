---
spec: umbrella-seeds-and-order
source_seeds: [umbrella-seeds-and-order]
---

# Spec: Umbrella specs

## Intent
Some features turn out too big to ship as one. Today the split into
ordered stages, the reason for it, and what "done" means for the whole
live in a separate project doc that sdlight can't see or check. Umbrella
specs bring that inside sdlight: one spec for the whole, with its stages
in order, closed and verified when the last stage ships.

## Scope
An umbrella spec and its lifecycle across the existing skills:
brainstorm creates it, stages are brainstormed and shipped as ordinary
features, planning refuses it, the last stage's final review checks it,
promotion deletes it, and refine reports its progress and keeps its
stages intact. Covers the spec template, the affected skills, and the
workflow doc.

## Roads not taken
- Umbrella seed with an ordered `parts:` list: lighter, but it has no
  room for the why or the "done when", so those would still live outside
  sdlight.
- An `after: [slug]` dependency field on seeds: in practice the order was
  a plain sequence, and a graph solves a problem that didn't come up.
- Several slugs grouped into one stage: one stage is one feature, which
  keeps progress and lookup simple.
- Nested umbrellas or a project-wide roadmap: one level covers the real
  case, and a roadmap above it stays in the project.

## Behavior
- B1. When brainstorm and the user agree a feature is too big to ship as
  one, brainstorm writes an umbrella spec at
  `docs/sdlight/specs/<slug>.md`. It has every normal spec section plus
  a Stages section: an ordered list with one stage slug per line, each
  one feature. Its Acceptance criteria describe when the whole is done.
- B2. In the same session brainstorm writes one seed per stage at
  `docs/sdlight/seeds/<stage-slug>.md`, each naming the umbrella's slug,
  deletes the originating seed, and commits the umbrella spec and the
  stage seeds in one commit, `docs(sdlight): spec <slug>`.
- B3. A spec is an umbrella if and only if it has a Stages section. A
  stage's umbrella is the spec whose Stages section lists the stage's
  slug. Stage seeds and stage specs carry no reference back.
- B4. When brainstorm works on a stage seed, it reads the umbrella spec
  and keeps the stage spec within the umbrella's scope. If an earlier
  stage has no feature doc yet, it says so once and continues if the
  user wants to.
- B5. When a stage turns out too big, brainstorm adds stages to the
  existing umbrella's Stages section instead of making the stage an
  umbrella.
- B6. sdlc-plan refuses to plan an umbrella spec. It names the next
  stage, the first in the Stages list without a feature doc, and says to
  brainstorm that stage.
- B7. A stage has shipped when `docs/sdlight/features/<stage-slug>.md`
  exists. The last stage is the one whose final review runs while every
  other stage has shipped.
- B8. sdlc-final-review of the last stage also checks the umbrella's
  Acceptance criteria, with the same evidence rules. An unmet or
  unverifiable umbrella criterion produces a FAIL or HOLD line that
  names the umbrella.
- B9. sdlc-promote of the last stage salvages the umbrella's deferrals
  into seeds, the same way it does for the stage's own spec, and deletes
  the umbrella spec in the same final commit.
- B10. sdlc-refine does not delete a stage seed as covered by its
  umbrella, does not delete an umbrella as stale or superseded while any
  stage has not shipped, and does not propose merging stage feature docs
  while the umbrella is open. Once the umbrella is gone, it proposes
  merging its stages' feature docs into one doc named after the umbrella.
  The umbrella's stage list is not available at that point, so the
  proposal is based on the stage feature docs themselves.
- B11. The project doc's Open threads section lists each open umbrella
  with its name, how many of its stages have shipped out of the total,
  and the next stage's slug, all computed from B7.

## Constraints
- No new document type. An umbrella is a spec in `docs/sdlight/specs/`.
- No status field anywhere. Progress is computed from which feature docs
  exist.
- One level. A stage can never itself be an umbrella.

## Non-goals
- A project-wide roadmap above umbrellas.
- Ordering or dependencies between unrelated seeds.
- Blocking work on a stage out of order. Brainstorm warns, nothing stops.
- How sdlight should branch when `main` is protected. Seeded as
  `protected-main-branching`.

## Acceptance criteria
- A1. `templates/spec-template.md` has a Stages section marked as used
  only by umbrella specs, showing the one-slug-per-line ordered form.
- A2. `skills/sdlc-brainstorm/SKILL.md` instructs B1, B2, B4, and B5.
- A3. `skills/sdlc-plan/SKILL.md` instructs B6.
- A4. `skills/sdlc-final-review/SKILL.md` instructs B8, using the B7
  definitions.
- A5. `skills/sdlc-promote/SKILL.md` instructs B9.
- A6. `skills/sdlc-refine/SKILL.md` instructs B10 and B11, and
  `templates/project-doc-template.md` describes the umbrella line in
  Open threads.
- A7. `docs/workflow.md` describes umbrella specs: when brainstorm makes
  one, how stages ship, and how the umbrella closes.
- A8. No changed file contains a status field, a new document type, or
  an instruction that lets a stage become an umbrella.
- A9. No changed file contains an em dash, an arrow symbol, or a curly
  quote.

## Open questions
None.
