# Workflow

How far sdlight runs on its own, what it commits, how the project phase
changes its reviews, and when it stops to ask you.

## What runs on its own

The workflow stops after the spec and hands it back to you. Everything
after that runs in sequence without asking: the plan, plan review, the
build, each step review, final review, and promotion. The plan needs no
separate sign-off from you, because plan review checks it against the
spec and final review checks the finished code against the spec again.

Two steps never lead into the next one on their own:

- **Seed capture** saves the idea and stops. Writing down an idea should
  never start building it.
- **The spec.** Brainstorm writes it and stops. You read it and ask for a
  plan when you're ready.

## Git

Every skill that writes a file commits it, using
[conventional commit](https://www.conventionalcommits.org) messages. The
one exception is seed capture: it leaves the seed uncommitted unless you
ask it to commit.

- Specs and refine passes commit on your current branch.
- When plan review passes, sdlight creates a branch named after the
  feature and commits the plan there.
- Each step of the plan is one commit on that branch, so step review sees
  exactly one step's diff.
- Promotion is the branch's last commit.

sdlight doesn't push or open pull requests unless your project's
`AGENTS.md` says it may. If you ask for a push or a PR without that rule
in place, the agent offers to add the rule first. It never merges a pull
request unless you ask it to at that moment.

## Project phase

`docs/sdlight/PROJECT.md` has one line you set by hand:

```
phase: pre-release
```

The value is `pre-release` or `released`. If the file or the line is
missing, sdlight treats the project as `pre-release`. `sdlc-refine` keeps
the line as it is. Change it to `released` yourself once people depend on
the project.

**In pre-release, breaking changes are fine.** Brainstorm doesn't ask
about backward compatibility or put migrations in the spec. Plan review
treats a compatibility shim nobody asked for as extra work. Final review
never fails a feature for changing earlier behavior.

**In released, documented behavior is a promise.** A spec that changes
behavior described in a feature doc must say so, and say what happens to
existing users. Plan review and final review flag any such change the
spec didn't approve.

## When it stops to ask

sdlight asks you only in these cases:

- The spec's Open questions section isn't empty when planning starts.
- Plan review returns HOLD because the plan lists an assumption only you
  can confirm.
- Plan review returns GAPS for the third time on the same plan.
- Step review returns FAIL for the third time on the same step.
- Final review returns FAIL or HOLD.

Everything else runs without asking, including promotion.
