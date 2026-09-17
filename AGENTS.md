# AGENTS.md

## This is the sdlight source repo, not a project that uses sdlight

You are developing **sdlight itself** — a Claude Code / Pi plugin that
provides a lightweight SDLC workflow (seed → spec → plan → feature doc,
with review gates). This repo is the plugin's source, not a consumer of
it.

Concretely, that means:

- **Do not run the sdlight workflow on this repo.** There is no
  `docs/sdlight/` vault here and there shouldn't be. Don't create seeds,
  specs, or plans under `docs/sdlight/`. The paths the skills describe
  (`docs/sdlight/seeds/`, `docs/sdlight/specs/`, ...) refer to the
  *target* project that installs sdlight — not to this one.
- **When a skill file mentions those paths, you're reading product
  behavior, not instructions for this repo.** Editing `skills/*/SKILL.md`
  here changes what the plugin tells *other* projects to do.
- The sdlight skills may be loaded in your session (this repo installs
  itself as a local plugin). Treat their triggers as descriptions of the
  feature you're building, not as commands to follow here.

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

If you're about to create a file under `docs/sdlight/` in *this* repo,
stop — you've mistaken the source repo for a consumer. You almost
certainly meant to edit a skill under `skills/` instead.
