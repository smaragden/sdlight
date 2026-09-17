---
feature: browse-seeds-random-pick
---

# Feature: Browse seeds and take one to brainstorming

## Summary
Adds a `/browse-seeds` command to the sdlight pi extension that opens a
popup over the seed vault. You scan seeds by slug, preview each one's
content, optionally jump to a random seed, and select one to start a
brainstorm on it.

## Behavior
Running `/browse-seeds` in the interactive TUI reads every `*.md` seed
under `docs/sdlight/seeds/` and opens an overlay popup. The popup shows a
selectable list of seed slugs and a preview pane; moving the selection
updates the preview with that seed's body (the text beneath its
frontmatter). Pressing `r` moves the selection to a uniformly random
seed and refreshes the preview without selecting it. Pressing Enter
closes the popup and sends the user message
`/skill:sdlc-brainstorm <seed path>` (with prompt-template expansion),
starting a brainstorm on the chosen seed. Pressing Esc closes the popup
with nothing selected and nothing started.

If there are no seeds (missing `docs/sdlight/seeds/` or no `*.md` files),
the command reports "No seeds to browse." and opens no popup. Outside the
interactive TUI (for example print, json, or rpc modes) the command
reports that browsing needs the interactive TUI and does nothing else.

## Interfaces
- Command: `/browse-seeds` — "Browse seeds and take one to brainstorming".
- Popup keys: up/down navigate, `r` random, Enter brainstorm, Esc cancel.
- Reads: seed files under `docs/sdlight/seeds/*.md`.
- Emits: a user message `/skill:sdlc-brainstorm <path>` on selection.
- Lives in `extensions/seed-counter.ts`, registered via the package's
  `pi.extensions` entry.

## Boundaries
Does not edit, rename, delete, or create seeds, and performs no git
operations. Does not filter, search, sort, or tag seeds; the list is
shown in a stable slug order and the popup only navigates, randomizes,
selects, or cancels. The preview does not scroll. It does not replace the
separate `/seeds` command, which reports uncommitted seeds. Browsing is
only available in the interactive TUI.

## Dependencies
- The `sdlc-brainstorm` skill, invoked on selection.
- The `@earendil-works/pi-tui` components (`SelectList`, `Text`,
  `Container`) and `DynamicBorder` for the popup UI.
- Shares the `seed-counter` extension module with the seed status/`/seeds`
  feature.
