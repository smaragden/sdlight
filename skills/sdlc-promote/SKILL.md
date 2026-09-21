---
name: sdlc-promote
description: Promote a completed feature once its final implementation review has passed. Generate its feature doc from implementation reality, delete the source seed and spec, and land it all atomically with the code. Use this automatically the moment a final-review gate passes for a feature. Do not wait to be asked, and do not use this before final review has passed. Promotion is the last step, not a shortcut.
---

# SDLC promotion

Fires automatically when a feature's final implementation review passes.
No human gate here. This step is cheap and recoverable from git if
something about it turns out wrong later.

## Preconditions

Only run this after the final-review gate for the feature has
passed. If asked to promote something that hasn't cleared final review,
stop and say so.

## Steps

1. **Write the feature doc** at `docs/sdlight/features/<slug>.md`, using
   `docs/sdlight/templates/feature-doc-template.md`. Base every section
   on what was implemented. Read the real code and behavior, not the
   spec's original intent. Where implementation deviated from the spec, the
   feature doc records the deviation as current reality without flagging
   or explaining it. The plan and git history hold that.
2. **Salvage deferrals, then delete the source spec** at
   `docs/sdlight/specs/<slug>.md`. Before deleting, read its Roads not
   taken and Non-goals one last time. Any deferred follow-up there (a
   "later, not now" idea, a real future possibility) that isn't already a
   file under `docs/sdlight/seeds/` gets written as a seed now, so it
   survives the deletion. Do not re-seed outright rejections. This is the
   last point before the spec is gone for good. Then delete the spec.
3. **Delete the source seed** at `docs/sdlight/seeds/<slug>.md`, if it
   still exists. The brainstorm session usually deletes it on promotion
   to spec. Skip this step in that case.
4. **Commit on the feature branch.** The feature doc write, the two
   deletions, and any deferral seeds you salvaged in step 2 go in one
   commit, the last commit on the branch. This
   commit lands the feature code too, so write a conventional-commit
   message whose type reflects the actual change (`feat`, `fix`, and so
   on) and whose subject names the feature, not `docs`. Leave the plan
   document alone; it stays as the historical record of how the feature
   was built.
5. **Push and open a PR only if the repo permits it.** Pushing and pull
   requests are forbidden by default, allowed only when the repo's
   AGENTS.md records a rule permitting them. With that rule present, push
   the branch and open a PR for the feature. Without it, leave the branch
   local. If the user asks you to push or open a PR and no such rule
   exists, offer to add the rule to the repo's AGENTS.md, and proceed
   only once they agree and it is recorded. Never merge the PR yourself;
   merging is the user's explicit call.
6. **Run sdlc-refine** so the project doc stops listing this feature as
   an open thread and starts listing it in the feature map.

## What this skill does not do

- Does not write or touch the plan doc.
- Does not merge the branch or the PR. That is the user's explicit call.
- Does not ask for confirmation before deleting the seed and spec. Being
  automatic is the point.
