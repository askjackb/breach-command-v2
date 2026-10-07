# Fractured basalt outcrop kit

Asset ID: `basalt-outcrop`

Palette: weathered basalt — charcoal `#353E3D`, mineral gray-brown `#655F51`, warm horn `#958770` mineral flecks; no baked light (ART_DIRECTION.md).

Additional production asset; requires the integration described in the shared guide.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and atmosphere

A family of coherent fractured stone formations, with layered break planes and erosion that implies physical geology. The environment must support the detailed military/biological art direction and the free camera.

## Production specification

At least six distinguishable modules: low shelf, split pillar, fractured ridge, broad boulder, broken cluster and embedded fragment. Avoid smooth potatoes, random spike fields or uniformly triangulated crystals. Detail all sides; match ground mineral composition. Show representative close detail and a normal battlefield view. Detail hierarchy must stay coherent with the reactor and towers; terrain should not compete with selectable units.

## Scale and delivery

1–6 m modules; exact bounds and simple blocker proxies per variant. Deliver editable source, required runtime files, channel/packing notes, bounds or tile scale, provenance and preview evidence under `public/assets/replacements/basalt-outcrop/`. Use the shared contract for file types, color spaces and metadata. If multiple modules belong to this kit, enumerate each module and its filename in the delivery report rather than presenting a single beauty image as the whole kit.

### Detailed module specifications (all within the unchanged 1–6 m module range)

| Module | Proportions | Distinguishing geometry |
|---|---|---|
| Low shelf | 3–6 m long, 1.5–2.5 m deep, 0.6–1.2 m tall | Near-horizontal top with a single 55–70° fracture face at the front; strata bands visible on the face only |
| Split pillar | 1–1.8 m diameter, 3–6 m tall | Vertical column with one full-height vertical split (0.1–0.25 m gap) and a displaced cap fragment leaning into the split |
| Fractured ridge | 4–6 m long, 1.2–2 m tall | Saw-tooth crest of 4–6 angular peaks, alternating face angles, no smooth saddle |
| Broad boulder | 2–4 m across, 1.5–3 m tall | Single massive form, 6–9 primary faces, longest face weathered flattest; sits visually heaviest |
| Broken cluster | 2–5 m spread | 3–5 fragments with matching fracture tones that imply one origin; gaps between fragments read as shadow, not separate rocks |
| Embedded fragment | 1–2.5 m exposed | Half-buried shard, exposed part leaning 10–25° from vertical, buried end never visible; ground-contact skirt of fine debris |

**Shared construction rules for all six:** primary faces meet at fracture angles of 55–80° (never 90° architectural corners); horizontal strata banding is subtle (≤8% value shift) and wraps consistently so modules placed adjacently look quarried from the same flow; undersides and ground-contact zones get finer fracture detail than tops, since builder placement exposes them to camera at glancing angles; each module's blocker proxy is a simple convex hull ~10% smaller than the visual mesh so units read as passing behind rock edges, not through them.

## Integration requirement

Current rocks are procedurally placed instanced geometry. Replacement modules need a mapping from blocker radius/height to the chosen model and navigation-safe bounds. Current simulation rules remain authoritative. New decorative surface features cannot imply or secretly create fixed paths, build restrictions or resource mechanics.

## Generation instruction

Create a production-ready original realistic sci-fi mining-colony fractured basalt outcrop kit using the physical forms and surface requirements above. Use restrained color and readable macrostructure. Deliver a usable asset package, not only a concept painting or a texture with baked lighting.

## Acceptance

Test continuity with neighboring surfaces, all-angle readability, visible tiling/repetition, alpha seams and texture density. Supply neutral-light and game-light previews. Reject generic primitive stand-ins, flat color, toy-like geology or effects that hide the battlefield.
