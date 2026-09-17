# AGENTS.md

## This is the sdlight source repo — check which job you're doing

This repo is unusual: it's the source of **sdlight itself** (a Claude
Code / Pi plugin providing a lightweight SDLC workflow: seed → spec →
plan → feature doc, with review gates), *and* the sdlight skills may be
loaded in your session because it installs itself as a local plugin.

So before acting on anything that looks like an sdlight trigger, work out
which of two jobs the user actually wants:

- **Working *on* the workflow** — changing the plugin: editing
  `skills/*/SKILL.md`, templates, the extension, or manifests. This is
  the default here. When a skill file mentions `docs/sdlight/seeds/`,
  `docs/sdlight/specs/`, etc., you're reading *product behavior* you
  might edit, not instructions to follow.
- **Using the workflow** — actually running seed/spec/plan on this repo
  to develop it (dogfooding). This is legitimate but rarer, and it means
  creating a real `docs/sdlight/` vault here.

If it's ambiguous, ask. The common mistake is treating a skill's trigger
as a command to run when the user meant to work on that skill's
definition. When in doubt, assume they're working *on* the plugin.

## What development here actually looks like

- Skills live in `skills/<name>/SKILL.md`. Templates in `templates/`.
- Plugin manifests: `.claude-plugin/plugin.json` and `package.json`.
  Keep their `version` fields in sync.
- A behavior change to a skill is a real change: bump the patch version
  in both manifests and commit.
- Normal git applies here — commit your work. (The "seeds don't commit"
  rule is a *product* behavior of the seed-capture skill, not a rule for
  developing this repo.)

## Quick orientation check

About to create a file under `docs/sdlight/` in *this* repo? Pause and
confirm intent. If the user asked you to change how the plugin behaves,
you meant to edit a skill under `skills/` instead. Only create a
`docs/sdlight/` vault if they've clearly asked to dogfood the workflow
on sdlight itself.
