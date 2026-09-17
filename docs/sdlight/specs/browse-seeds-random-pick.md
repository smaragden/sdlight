---
spec: browse-seeds-random-pick
source_seeds: [browse-seeds-random-pick.md]
---

# Spec: Browse seeds and take one to brainstorming

## Intent
Turn the seed vault from a passive folder of files into a fast triage
surface. When you want to make progress on the backlog, you open a
popup, scan what's there, peek at candidates, and drop straight into a
brainstorm on the one you pick — with a randomize nudge for when you
can't decide.

## Scope
A pi extension command that opens an interactive popup picker over the
seeds in `docs/sdlight/seeds/`. The popup lets you browse the list,
preview a seed's content, jump to a random seed, and select one to take
to brainstorming. Selecting a seed starts `sdlc-brainstorm` on it.

## Behavior
- A command opens a popup picker listing every seed in
  `docs/sdlight/seeds/` (`*.md`). Each row shows the seed's slug as its
  title.
- Moving the selection through the list updates a preview showing the
  selected seed's body content (the paragraph beneath its frontmatter),
  so the user can peek without leaving the popup.
- A randomize action moves the selection to a uniformly random seed in
  the list and updates the preview. Randomize only moves the selection;
  it does not start a brainstorm on its own.
- Confirming a selection closes the popup and takes that seed to
  brainstorming: the extension sends a user message that invokes
  `sdlc-brainstorm` on the selected seed, identifying it by its file
  path / slug.
- Cancelling the popup (e.g. Esc) closes it with no seed selected and
  nothing started.
- If the vault has no seeds (missing `docs/sdlight/seeds/` or no `*.md`
  files), the command reports that there are no seeds and does not open
  an empty picker or start anything.

## Non-goals
- No editing, renaming, deleting, or creating seeds from the popup.
- No committing or other git operations.
- Not a replacement for the `seed-counter` status/`/seeds` listing; this
  is a separate browsing/picking surface.
- No filtering, search, sorting, or tag support in this first version.

## Acceptance criteria
- Running the command with at least one seed present opens a popup that
  lists all `*.md` seeds under `docs/sdlight/seeds/`, each labeled by its
  slug.
- Changing the selected row updates a visible preview of that seed's body
  text.
- Triggering randomize moves the selection to a random seed and updates
  the preview, without starting a brainstorm.
- Confirming a selection closes the popup and results in a user message
  that starts `sdlc-brainstorm` for the selected seed, referencing that
  seed's path/slug.
- Pressing Esc (or the cancel affordance) closes the popup with no
  message sent and no brainstorm started.
- Running the command with no seeds present shows a "no seeds" notice and
  opens no popup.

## Open questions
- Command name. `/browse-seeds` is the working name; a shorter alias
  (e.g. `/seed`) may be preferable. Not blocking.
