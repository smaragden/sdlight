# Install

sdlight ships as one repo that works on two hosts. Same `skills/`, same
`templates/`, different manifest.

## Claude Code

```
/plugin marketplace add smaragden/sdlight
/plugin install sdlight@sdlight-marketplace
```

Developing locally before you've pushed? Point the marketplace command
at this folder's local path instead of the GitHub slug.

## Pi

From the project that will use it, for local development:

```
pi install ../path/to/sdlight -l
```

That writes the package into `.pi/settings.json`. Pi treats
project-local packages as untrusted until you approve them, so the first
`pi` run in that project asks — or pass `--approve`.

From a git host, or from npm once published:

```
pi install git:github.com/smaragden/sdlight
pi install npm:sdlight
```

Pi reads the `pi.skills` field in `package.json` and loads
`skills/*/SKILL.md` directly — no separate copy. You can also skip
packaging entirely and point Pi at a Claude Code skills directory:

```json
{ "skills": ["../.claude/skills"] }
```

Pi's loader accepts all eight skills with no warnings (checked against
Pi 0.85.1). It ignores the `context` and `model` frontmatter keys — see
[model routing](model-routing.md).

## Templates

Neither host loads `templates/*` automatically. The skills reference them
by relative path (`docs/sdlight/templates/spec-template.md` and so on)
from the target repo's root, so copy this repo's `templates/` into
`docs/sdlight/templates/` in the project you run sdlight in. See
[layout](layout.md).
