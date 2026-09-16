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

1. **Write the feature doc** at `docs/features/<slug>.md`, using
   `templates/feature-doc-template.md`. Base every section on what was
   implemented. Read the real code and behavior, not the spec's
   original intent. Where implementation deviated from the spec, the
   feature doc records the deviation as current reality without flagging
   or explaining it. The plan and git history hold that.
2. **Delete the source spec** at `specs/<slug>.md`.
3. **Delete the source seed** at `seeds/<slug>.md`, if it still exists.
   The brainstorm session usually deletes it on promotion to spec. Skip
   this step in that case.
4. **Land atomically.** The feature doc write and the two deletions go in
   the same commit or PR as the implementation, not a follow-up commit.
   Leave the plan document alone. It stays as the historical record of
   how the feature was built.

## What this skill does not do

- Does not write or touch the plan doc.
- Does not run the refinement pass. That has its own trigger, tied to
  brainstorm sessions.
- Does not ask for confirmation before deleting the seed and spec. Being
  automatic is the point.
