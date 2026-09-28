# Contributing

Issues and pull requests are welcome. For anything bigger than a fix,
open an issue first so we can agree on the approach.

## Trying a change

Install sdlight from your clone and use it on a small test project:

- Claude Code: `/plugin marketplace add /path/to/your/clone`, then
  `/plugin install sdlight@sdlight-marketplace`.
- Pi: `pi install /path/to/your/clone -l` from the test project.

A skill change is only tested once you've run the part of the workflow it
affects.

## Rules

- **Version.** A change to how a skill behaves bumps the patch version in
  both `.claude-plugin/plugin.json` and `package.json`. Keep them in sync.
- **Prose.** Plain and short. No em dashes, arrow symbols, or curly
  quotes. Text in a skill leaks into everything the skill produces.
- **Diagrams.** The README diagrams are generated. Edit
  `scripts/diagrams.py`, run `python3 scripts/diagrams.py`, and commit
  the SVGs in `docs/img/`.
- **Commits.** Use [conventional commit](https://www.conventionalcommits.org)
  messages. Pull requests are squash merged, so the PR title becomes the
  commit message on `main`.

`AGENTS.md` has the same rules for coding agents working in this repo.
