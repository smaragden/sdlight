---
plan: browse-seeds-random-pick
spec: docs/sdlight/specs/browse-seeds-random-pick.md
---

# Plan: Browse seeds and take one to brainstorming

## Approach
Add a `/browse-seeds` command to the existing `extensions/seed-counter.ts`
extension, keeping all seed tooling in one place and reusing its file
conventions. The command reads every seed from `docs/sdlight/seeds/` and
opens a custom overlay built with `ctx.ui.custom({ overlay: true })`: a
`SelectList` of seed slugs on one side and a preview pane showing the
selected seed's body on the other. A key moves the selection to a random
seed. Confirming returns the chosen seed to the command, which calls
`pi.sendUserMessage` to start `sdlc-brainstorm` on it. The obvious
alternative, `ctx.ui.select()`, is rejected because it offers no live
preview pane and no randomize affordance.

## Spec coverage
- B1 Command opens popup listing every seed, each row labeled by slug (Steps 2, 3)
- B2 Moving the selection updates a preview of the seed's body (Step 3)
- B3 Randomize moves selection to a random seed and updates preview, starts nothing (Step 4)
- B4 Confirming closes popup and sends a message starting sdlc-brainstorm on the seed by path/slug (Step 5)
- B5 Cancelling (Esc) closes popup with nothing selected or started (Step 3)
- B6 No seeds: report it, open no popup, start nothing (Step 2)
- A1 With at least one seed, command opens a popup listing all *.md seeds by slug (Steps 2, 3)
- A2 Changing the selected row updates a visible body preview (Step 3)
- A3 Randomize moves selection to a random seed and updates preview without starting a brainstorm (Step 4)
- A4 Confirming closes popup and produces a user message starting sdlc-brainstorm referencing the seed path/slug (Step 5)
- A5 Esc closes popup with no message sent and no brainstorm started (Step 3)
- A6 With no seeds, command shows a notice and opens no popup (Step 2)

## Steps

1. **Add a seed-listing helper.**
   In `extensions/seed-counter.ts`, add `listSeeds(cwd)` that reads
   `docs/sdlight/seeds/*.md`, and for each returns `{ slug, path, body }`
   where `slug` is the filename without extension (title) and `body` is
   the file content beneath the frontmatter block. Returns an empty array
   when the directory is missing.
   Verify: a node snippet against a temp vault with two seed files returns
   both, each with the correct slug and body text; a missing directory
   returns `[]`.
   Closes: supports B1, A1 (listing source).

2. **Register `/browse-seeds` with the empty-vault guard.**
   Add `pi.registerCommand("browse-seeds", ...)`. The handler calls
   `listSeeds(ctx.cwd)`; if it returns no seeds, it calls
   `ctx.ui.notify("No seeds to browse.", "info")` and returns without
   opening any UI. Guard non-TUI modes (`ctx.mode !== "tui"`) with a
   notify-and-return as well.
   Verify: run the command in a repo with an empty/absent seeds dir and
   observe the notice and no popup.
   Closes: B6, A6.

3. **Build the picker overlay (list + preview + cancel).**
   In the handler, when seeds exist, open `ctx.ui.custom({ overlay: true })`
   returning a `Container` that holds a `SelectList` of seed slugs and a
   preview pane (`Text`/`Markdown`) showing the selected seed's body. Wire
   the list's selection-change so the preview updates as the highlight
   moves. Esc calls `done(null)` (cancel); the handler does nothing on a
   null result.
   Verify: with a vault of seeds, open the popup, move the highlight and
   watch the preview change, press Esc and confirm the popup closes with
   no further action.
   Closes: B1, B2, B5, A1, A2, A5.

4. **Add the randomize action.**
   Add a key handler (documented in the popup, e.g. `r`) that sets the
   `SelectList` selection to a uniformly random index and refreshes the
   preview. It only moves the selection; it does not call `done`.
   Verify: press the randomize key repeatedly and confirm the highlight
   and preview jump to different seeds, and that no brainstorm starts.
   Closes: B3, A3.

5. **Take the selected seed to brainstorming.**
   On confirm (Enter), `done(seed)` returns the chosen seed. The handler
   then starts the brainstorm with an explicit skill invocation:
   `pi.sendUserMessage("/skill:sdlc-brainstorm docs/sdlight/seeds/<slug>.md", { expandPromptTemplates: true })`,
   naming the selected seed's path/slug.
   Verify: select a seed, confirm, and observe the `sdlc-brainstorm`
   skill expand and start a turn referencing that seed.
   Closes: B4, A4.

## Decisions
- Command name is `/browse-seeds` (2026-09-17, user).
- Brainstorm is started with an explicit skill invocation
  (`/skill:sdlc-brainstorm` via `expandPromptTemplates: true`), not a
  plain natural-language message (2026-09-17, user).
- `SelectList` selection-change integration is an implementation detail
  to resolve during Step 3; no separate decision needed (2026-09-17, user).
- The preview does not scroll. Seeds are short enough to show wrapped;
  no scroll support is required (2026-09-17, user).
- The popup is TUI-only. rpc/print modes are guarded out in Step 2
  (2026-09-17, user).

## Risks
None.
