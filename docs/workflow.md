# How it runs

The rules sdlight operates under: what commits, when it flips into
"released" mode, and the handful of moments it stops to ask you.

## Git is the only history

Every skill that writes a file commits it, so nothing sdlight produces
lives only in a working tree. Messages follow conventional commits.

- Seeds, specs, and refine passes commit on whatever branch you're on.
- A passing plan review creates a branch named after the slug and
  commits the plan there.
- Each executed step is one commit on that branch, so step review sees
  exactly one step's diff.
- Promotion is that branch's last commit. Merging is yours to do.

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
