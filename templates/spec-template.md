---
spec: <feature-name>
source_seeds: [<seed-file-1>, <seed-file-2>]
---

# Spec: <feature name>

## Intent
1-3 sentences. Why this exists. What problem or opportunity it addresses.

## Scope
What this feature covers. Be concrete about boundaries.

## Roads not taken
The distinct routes weighed during brainstorming and why this one won,
one line each. If the idea honestly had one sensible route, say so. This
is background for a later reader, not something a review gate checks.

## Behavior
The essential behavior the implementation must produce. Inputs, outputs,
states, observable effects. This is what a plan gets checked against.

## Constraints
Self-imposed rules this feature must obey: the palette we work within
(no new dependencies, one file only, no network calls, and so on).
Deliberate limits chosen to sharpen the work, not incidental facts. The
plan and the implementation are checked against these, like acceptance
criteria. "None" is a valid answer and means the work is unconstrained.

## Non-goals
What this does not do. Anything that came up during
brainstorming and got forked into a seed belongs here as a one-line
boundary marker. The seed file has the detail.

## Acceptance criteria
Concrete, checkable conditions that let a review agent or a human decide
pass or fail without ambiguity.

## Open questions
Anything unresolved that a human should weigh in on before or during
implementation. Empty is fine. It means nothing's blocking.
