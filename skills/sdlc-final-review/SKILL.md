---
name: sdlc-final-review
description: Review a completed implementation against its original spec in specs/, not against the plan. Use when every step of a plan has passed sdlc-step-review, or when the user asks for a final review of a feature. Runs in fresh context. A PASS here is what triggers sdlc-promote; a FAIL lists unmet acceptance criteria and goes to a human.
context: fork
---

# SDLC final review

You were given a slug. Read `specs/<slug>.md` and the code as it now
stands. Read `plans/<slug>.md` only to find where the code is. The plan
is not the standard. The spec is. A feature can follow its plan
perfectly and still miss the spec, and that's what this gate exists to
catch.

## Checks

Walk the spec's Acceptance criteria one at a time. For each, write the
criterion, then the evidence: a test you ran and its output, a command
and its output, or a code path you traced with file and line. "Looks
right" is not evidence.

Then walk the Behavior section the same way. Then check Non-goals:
confirm the implementation did not build any of them.

## Verdict

- `PASS` when every criterion and behavior has evidence and no non-goal
  was built. sdlc-promote runs next, automatically.
- `FAIL` followed by one line per unmet criterion or behavior, with
  what's missing. A human decides whether to fix the code or amend the
  spec. Do not amend either yourself.
- `HOLD` followed by one line per criterion you could not verify
  mechanically, because it needs a manual check, an external system, or
  a judgment the spec doesn't make. A human verifies those and then
  declares the result.

A review with both unmet and unverifiable items is `FAIL`. List both
kinds.

## What this skill does not do

- Does not write the feature doc. That's sdlc-promote, after PASS.
- Does not review the plan's quality or the code's style.
- Does not fix anything.
