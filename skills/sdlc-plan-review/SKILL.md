---
name: sdlc-plan-review
description: Check an implementation plan in docs/sdlight/plans/ against its spec in docs/sdlight/specs/ before any code is written. Runs in fresh context so the reviewer has not seen the planning conversation. Use immediately after sdlc-plan writes a plan, and whenever the user asks to review or re-check a plan against its spec. Output is PASS, or a list of gaps sent back to the planner, or a question for a human.
context: fork
model: sonnet
---

# SDLC plan review

You are reviewing a plan against its spec. You have not seen the
conversation that produced either, and that is the point. Read only
`docs/sdlight/specs/<slug>.md` and `docs/sdlight/plans/<slug>.md` for the
slug you were given, plus any code file a plan step names if you need to
confirm the step is possible. Nothing else.

## Checks, in order

1. **Coverage.** Every Behavior line and every Acceptance criterion in
   the spec appears in the plan's Spec coverage section, and each maps
   to a numbered step that exists. A missing line is a gap.
2. **Fidelity.** Each step does what its coverage line says, not a
   narrower or wider thing. A step that satisfies the letter of a
   criterion but not the behavior around it is a gap.
3. **Verifiability.** Every step names a way to verify it. A step whose
   verification is "check it works" is a gap.
4. **Scope.** No step does work the spec doesn't ask for. Extra work is
   a gap, since it lands unreviewed against any spec.
5. **Risks.** Read the plan's Risks section. Each assumption there is a
   human question. Do not answer it yourself.

## Verdict

Write one of these, and nothing else after it.

- `PASS` when checks 1 to 4 find nothing and Risks is empty. Decisions
  may hold anything. Those are answered, not open.
- `HOLD` followed by the assumptions from Risks, one per line, when
  checks 1 to 4 find nothing but Risks lists something. A human answers
  these before execution starts.
- `GAPS` followed by one line per gap, each naming the check number,
  the spec line, and what's missing. This goes back to sdlc-plan for a
  revised plan.

## Rounds

A plan gets two GAPS rounds. If the third review still finds gaps, the
verdict is `HOLD` with the remaining gaps listed, and a human decides
whether the spec or the plan is wrong.

## What this skill does not do

- Does not fix the plan. It reports.
- Does not judge whether the spec is a good idea.
- Does not read the seed, the project doc, or other specs.
