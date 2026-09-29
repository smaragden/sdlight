---
name: sdlc-final-review
description: Review a completed implementation against its original spec in docs/sdlight/specs/, not against the plan. Use when every step of a plan has passed sdlc-step-review, or when the user asks for a final review of a feature. Runs in fresh context. A PASS here is what triggers sdlc-promote. A FAIL lists unmet acceptance criteria and goes to a human.
context: fork
---

# SDLC final review

You were given a slug. Read `docs/sdlight/specs/<slug>.md` and the code
as it now stands. Read `docs/sdlight/plans/<slug>.md` only to find where
the code is. The plan is not the standard. The spec is. A feature can
follow its plan perfectly and still miss the spec, and that's what this
gate exists to catch.

If this slug is a stage of an umbrella, also read the umbrella: the spec
in `docs/sdlight/specs/` whose Stages section lists the slug.

Also read the `phase` line from the frontmatter of
`docs/sdlight/PROJECT.md`, and nothing else from that file. Missing file
or missing line means `pre-release`.

## Checks

Walk the spec's Acceptance criteria one at a time. For each, write the
criterion, then the evidence: a test you ran and its output, a command
and its output, or a code path you traced with file and line. "Looks
right" is not evidence.

Then walk the Behavior section the same way. Then check the spec's
Constraints: confirm the implementation obeys each, with evidence; a
violation is a FAIL line. If Constraints reads "None", there's nothing
to check. Then check Non-goals. Confirm the implementation built none of
them.

Then check the umbrella, if this slug is its last stage. A stage has
shipped when `docs/sdlight/features/<stage-slug>.md` exists, and this is
the last stage when every other stage in the umbrella's Stages list has
shipped. In that case, walk the umbrella's Acceptance criteria too, with
the same evidence rules. Each unmet umbrella criterion is a FAIL line,
and each one you cannot verify is a HOLD line, and both name the
umbrella. For any other stage, the umbrella is context only.

Then apply the phase. In pre-release, breaking behavior that existed
before this feature is never a finding. Do not list it, do not HOLD on
it. In `released`, a change to behavior an existing feature doc
describes, which the spec's Behavior section did not sanction, is a
FAIL line naming the feature doc.

Scratch scripts you write to gather evidence go under the repo's
ignored paths or get deleted before the verdict. Leave nothing behind
in `/tmp` or the working tree.

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
