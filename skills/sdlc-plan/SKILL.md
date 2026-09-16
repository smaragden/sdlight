---
name: sdlc-plan
description: Turn an approved spec in specs/ into an implementation plan in plans/. Use when the user asks to plan a spec, says "plan <feature>", or wants to start implementing something that has a spec but no plan yet. Do not use this for ideas without a spec (that's sdlc-brainstorm). Writing the plan always ends by handing it to sdlc-plan-review. Never start executing a plan that hasn't passed that gate.
---

# SDLC plan: spec to plan

## Preconditions

The spec at `specs/<slug>.md` exists. If its Open questions section
lists anything, stop and put those questions to the user before writing
a line of the plan. An open question in the spec is the first human
gate, and planning around it produces a plan that has to be redone.

## Flow

1. Read the spec. Then read the code the feature will touch. Enough to
   name real files and functions in the steps, no more.
2. Write `plans/<slug>.md` from `templates/plan-template.md`.
3. Hand the slug to sdlc-plan-review. Do not begin execution yourself.

## Writing the plan

- The Spec coverage section is the contract. Copy every Behavior line
  and every Acceptance criterion from the spec, one per line, and name
  the step that closes it. If you can't name a step for a line, the plan
  isn't done.
- Steps are small. One step is one reviewable change with its own
  verification. If a step needs more than a paragraph to describe, split
  it.
- Every assumption you made about the spec's meaning goes in Risks. Do
  not resolve an ambiguity silently by picking the convenient reading.
  Name it and let the gate decide whether a human needs to see it.
- Say how each step is verified before saying what it changes. A step
  with no verification is not a step.

## What this skill does not do

- Does not edit the spec. If the spec needs changing, say so and stop.
- Does not run the code or start implementation.
- Does not skip the review gate, even for a plan that looks trivial.
