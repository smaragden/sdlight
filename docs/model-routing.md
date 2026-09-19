# Model routing

Reviewers that only check one document against another run on a cheaper
model in fresh context. Everything that authors inherits the session's
model, and so does the final review, which needs judgment.

| Stage | Model | Context |
|---|---|---|
| brainstorm, plan, promote, refine | session default | inline |
| plan review, step review | `sonnet` | fresh (`context: fork`) |
| final review | session default | fresh (`context: fork`) |

The `model` and `context` frontmatter keys are **Claude Code only**. Pi
ignores them, so on Pi every reviewer runs inline on the session model.
The skills' own instructions still tell each reviewer to read only the
spec, plan, and diff, so the context-light discipline holds on both
hosts either way.
