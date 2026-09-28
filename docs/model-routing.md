# Model routing

Reviewers that compare one document with another run on a cheaper model
in a fresh context. Stages that write, and the final review, which needs
judgment, use the session's model.

| Stage | Model | Context |
|---|---|---|
| brainstorm, plan, promote, refine | session model | current session |
| plan review, step review | `sonnet` | fresh (`context: fork`) |
| final review | session model | fresh (`context: fork`) |

The `model` and `context` settings in a skill's frontmatter only work on
Claude Code. Pi ignores them and runs every reviewer in the current
session on the session model. Each reviewer's instructions still limit
what it reads to the spec, the plan, and the diff, so reviews stay
focused on both hosts.
