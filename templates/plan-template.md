---
plan: <feature-name>
spec: specs/<feature-name>.md
---

# Plan: <feature name>

## Approach
A short paragraph. The shape of the implementation and why this shape
over the obvious alternative. Name the alternative in one sentence.

## Spec coverage
One line per Behavior item and per Acceptance criterion in the spec,
each mapped to the step below that satisfies it. Every spec line must
appear here. Any spec line with no step is a gap the plan-review gate
will reject.

## Steps
Numbered. Each step is small enough to review on its own and names:
- what changes (files, functions, commands),
- how to verify it (a test, a command, an observable effect),
- which Spec coverage lines it closes.

## Risks
Where the plan could drift from the spec, where the spec is ambiguous,
and what was assumed. Each assumption is a question the plan-review
gate may bounce back to a human. Empty means you assumed nothing.
