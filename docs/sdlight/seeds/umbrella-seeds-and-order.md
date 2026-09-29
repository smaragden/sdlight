---
seed: umbrella-seeds-and-order
created: 2026-09-28
---

sdlight has no way to group or order work larger than one spec, so roadmaps end up in a separate doc the agent has to read each time. Handle it with seeds instead of a new document type. An umbrella seed stands for a larger piece of work, and the seeds that make it up point to it with `related:`. An optional `after: [slug]` field on a seed says what has to ship first. Refine draws `after:` as directed edges in the seed map and lists the seeds with nothing left to wait for as next in the project doc. The umbrella closes on its own: once its parts have shipped, refine deletes it like any other seed a feature doc covers, and the part feature docs can be merged into one subsystem doc as usual. No epic document, no status field.
