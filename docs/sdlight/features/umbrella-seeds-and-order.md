---
feature: umbrella-seeds-and-order
---

# Feature: Umbrella specs

## Summary
A feature too big to ship as one becomes an umbrella spec: a spec for
the whole, with its stages listed in order. Each stage ships as an
ordinary feature, and the last one closes the umbrella after checking
it.

## Behavior
When a brainstorm finds a feature too big to ship as one, it proposes
splitting it into stages. If the user agrees, it writes an umbrella spec
at `docs/sdlight/specs/<slug>.md` with every normal section plus a
Stages section, an ordered list of stage slugs, one per line. Its
Acceptance criteria describe when the whole is done. The brainstorm
also writes one seed per stage, mentioning the umbrella's slug in the
paragraph but in no frontmatter field, deletes the originating seed,
and commits it all as `docs(sdlight): spec <slug>`.

A spec is an umbrella if and only if it has a Stages section. A stage's
umbrella is the spec whose Stages section lists the stage's slug. A
stage has shipped when `docs/sdlight/features/<stage-slug>.md` exists,
and the last stage is the one whose final review runs while every other
stage has shipped.

Brainstorming a stage reads the umbrella and keeps the stage within its
scope. If an earlier stage hasn't shipped, it says so once and continues
if the user wants to. A stage that turns out too big adds stages to the
umbrella rather than becoming an umbrella itself. `sdlc-plan` refuses to
plan an umbrella and names the first stage that hasn't shipped.

Final review of the last stage also walks the umbrella's Acceptance
criteria with the same evidence rules, and writes FAIL or HOLD lines
naming the umbrella. Promotion of the last stage salvages the umbrella's
deferrals into seeds, deletes the umbrella spec in the same final
commit, and passes the umbrella's slug and Stages list to the refine run
it starts. That refine run proposes merging the stages' feature docs
into `docs/sdlight/features/<umbrella-slug>.md`, with the usual
confirmation.

While an umbrella is open, refine does not delete its stage seeds as
covered, does not treat it as stale, and does not propose merging its
stages' feature docs. The project doc's Open threads lists each open
umbrella with how many of its stages have shipped out of the total and
the next stage's slug.

## Interfaces
- `templates/spec-template.md`: the umbrella-only `## Stages` section.
- `templates/project-doc-template.md`: the umbrella line in Open threads.
- Skills: `sdlc-brainstorm` (Umbrella specs section), `sdlc-plan`
  (Preconditions), `sdlc-final-review` (Checks), `sdlc-promote` (step 3,
  Close the umbrella), `sdlc-refine` (Seeds, Specs, Feature docs, and
  Project doc items).
- `docs/workflow.md`: the Umbrella specs section.

## Boundaries
One level only: a stage can never be an umbrella. There is no status
field and no new document type; progress is computed from which feature
docs exist. Nothing blocks work on a stage out of order, it only warns.
There is no ordering between unrelated seeds and no project-wide roadmap
above umbrellas.

## Dependencies
- Relies on slugs staying the same from seed to spec to feature doc.
- The seed, spec, feature doc, and project doc conventions used by
  `sdlc-brainstorm`, `sdlc-plan`, `sdlc-final-review`, `sdlc-promote`,
  and `sdlc-refine`.
