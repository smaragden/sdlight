---
feature: <feature-name>
---

# Feature: <feature name>

## Summary
1-3 sentences. What this feature does, plainly.

## Behavior
What it does, from the outside. Inputs, outputs, states, observable
effects. This is the meat of the doc. Describe reality as implemented,
not the original intent from the spec.

## Interfaces
Commands, APIs, files, flags, config keys. Whatever something else
(human or agent) needs to touch to use or extend it. N/A if this feature
has no external interface beyond what Behavior already covers.

## Boundaries
What it does not do, as things stand now. Restate as current reality. If
scope grew or shrank during implementation, this reflects that, not the
spec's original non-goals.

## Dependencies
Other features or systems this touches or relies on. N/A if none.
