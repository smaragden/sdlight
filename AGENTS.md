# AGENTS.md

## Which job are you doing?

This repo is the source of sdlight, a Claude Code and Pi plugin for a
lightweight development workflow (seed, spec, plan, feature doc, with
review gates). The sdlight skills may also be loaded in your session,
because the plugin can be installed from this checkout.

Before acting on anything that looks like an sdlight trigger, work out
which job the user wants:

- **Working on sdlight.** Changing skills, templates, the extension,
  docs, or manifests. This is the default. When a skill mentions
  `docs/sdlight/seeds/` or `docs/sdlight/specs/`, you are reading product
  behavior you might edit, not instructions to follow.
- **Using sdlight on itself.** Running seed, spec, or plan on this repo to
  develop it. This is legitimate but rarer, and it writes to the real
  `docs/sdlight/` vault here.

If it's unclear, ask. The common mistake is running a skill when the user
meant to edit it.

## Development

- Skills live in `skills/<name>/SKILL.md`, templates in `templates/`.
- Manifests are `.claude-plugin/plugin.json` and `package.json`. Keep
  their `version` fields in sync.
- A behavior change to a skill is a real change. Bump the patch version
  in both manifests and commit.
- Commit your work normally. Seed capture's "don't auto-commit" rule is
  product behavior, not a rule for this repo.
- The README diagrams are generated. Edit `scripts/diagrams.py`, run
  `python3 scripts/diagrams.py`, and commit the SVGs in `docs/img/`.
- Keep prose plain: no em dashes, no arrow symbols, no curly quotes. Text
  in a skill leaks into everything the skill produces.

## Before writing under docs/sdlight/

Creating a file under `docs/sdlight/` in this repo? Confirm the user
asked to use sdlight on itself. If they asked to change how the plugin
behaves, edit a skill under `skills/` instead.
