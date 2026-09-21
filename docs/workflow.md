# How it runs

The rules sdlight operates under: how far it flows on its own, what
commits, when it flips into "released" mode, and the handful of moments
it stops to ask you.

## Flow by default

Once you trigger a stage, the workflow runs forward through the pipeline
on its own and stops only at a human gate (below). A clean spec flows
into a plan, a passing plan flows into building, each passing step flows
into the next, and a passing final review flows into promotion. You are
not asked to confirm each hop.

The one deliberate exception is seed capture. It files an idea and stops,
because capturing a thought should never kick off building it.

## Git is the only history

Every skill that writes a file commits it, so nothing sdlight produces
lives only in a working tree. Messages follow conventional commits.

- Seeds, specs, and refine passes commit on whatever branch you're on.
- A passing plan review creates a branch named after the slug and
  commits the plan there.
- Each executed step is one commit on that branch, so step review sees
  exactly one step's diff.
- Promotion is that branch's last commit.

**Pushing and pull requests are forbidden by default.** The workflow
pushes a branch or opens a PR only when this repo's AGENTS.md records a
rule allowing it. Ask for a push or a PR without that rule and the agent
offers to write the rule into AGENTS.md first, then acts once you agree.
Merging a PR is never the workflow's call. It happens only when you
explicitly ask, in the moment.

## Project phase

`docs/sdlight/PROJECT.md` carries one hand-set frontmatter line:

```
phase: pre-release
```

It's `pre-release` or `released`; a missing file or line means
`pre-release`. Refinement copies it forward and never changes it. Flip
it to `released` yourself once real users depend on the project.

**In pre-release, breaking things is free.** Brainstorm doesn't ask
about backward compatibility or write migrations into a spec, plan
review treats a shim or alias step as unasked-for work, and final review
never fails a feature for changing what came before.

**In released, documented behavior is a contract.** A spec that changes
behavior a feature doc describes has to say so, and say what happens to
existing users. Plan review and final review then treat an unsanctioned
change to documented behavior as a gap or a failure.

## Human gates

sdlight asks a human at exactly these points, and nowhere else:

- The spec's Open questions section is non-empty when planning starts.
- Plan review returns HOLD because the plan's Risks section lists an
  assumption.
- Plan review returns GAPS three times for the same plan.
- Step review returns FAIL three times for the same step.
- Final review returns FAIL or HOLD.

Everything else runs without asking. Promotion, in particular, never
asks.
