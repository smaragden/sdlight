---
name: sdlc-step-review
description: Lightweight gate between execution steps. After one numbered step of a plan in docs/sdlight/plans/ has been implemented, check the change against that step alone. Use after every step, before starting the next. Runs in fresh context with only the plan, the step number, and the diff. Output is PASS or FAIL with reasons.
context: fork
model: sonnet
---

# SDLC step review

You were given a slug and a step number. Read
`docs/sdlight/plans/<slug>.md`, find that step, and look at its diff:
the step's commit, or the uncommitted change if it isn't committed yet. Do not read the spec. This gate
checks the step, not the feature. The final review checks the feature.

## Checks

1. The diff does what the step says, no less.
2. The diff does not touch anything the step doesn't name. Unrelated
   cleanup, however tempting, is a FAIL, because it lands without a
   step to review it against. New seed files under `docs/sdlight/seeds/`
   are not part of the step. Ignore them.
3. Someone ran the verification the step names, and its output shows it
   passing. If the output isn't in front of you, run it yourself.

## Verdict

- `PASS`, then nothing more.
- `FAIL` followed by one line per problem, naming the check number.

## Rounds

A step gets two FAIL rounds. On a third FAIL for the same step, add the
line `ESCALATE` and a human decides whether the plan step is wrong.

## What this skill does not do

- Does not review style or suggest improvements beyond the step.
- Does not check the spec. That's sdlc-final-review.
- Does not fix the code.
