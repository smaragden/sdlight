# Install

The same repo installs on Claude Code and on Pi. Both read the same
`skills/` folder. Only the manifest differs.

## Claude Code

```
/plugin marketplace add smaragden/sdlight
/plugin install sdlight@sdlight-marketplace
```

To work on sdlight itself, pass the path to your local clone to
`/plugin marketplace add` instead of `smaragden/sdlight`.

## Pi

From git:

```
pi install git:github.com/smaragden/sdlight
```

From a local clone, installed into the current project only:

```
pi install ../path/to/sdlight -l
```

This writes the package into `.pi/settings.json`. Pi treats project-local
packages as untrusted until you approve them, so the first `pi` run in
that project asks, or you can pass `--approve`.

Pi finds the skills through the `pi.skills` field in `package.json`, and
the seed extension through `pi.extensions`. Pi ignores the `context` and
`model` skill settings, see [model routing](model-routing.md).

## Templates

Neither host installs the templates for you. The skills look for them at
`docs/sdlight/templates/` in your project, so copy them there once:

```
mkdir -p docs/sdlight
cp -r path/to/sdlight/templates docs/sdlight/templates
```

See [layout](layout.md) for everything else sdlight writes.
