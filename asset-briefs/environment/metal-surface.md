# Industrial material library

Asset ID: `metal-surface`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Additional production asset; requires the integration described in the shared guide.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and atmosphere

A consistent physical material set for painted steel, worn conductive metal, ceramic heat shielding, rubber and sensor glass. The environment must support the detailed military/biological art direction and the free camera.

## Production specification

Separate albedo/normal/roughness/metalness channels and realistic roughness hierarchy. Paint chips follow contact; conductive rails differ from painted armor. Uniform noise is not surface authoring. Show representative close detail and a normal battlefield view. Detail hierarchy must stay coherent with the reactor and towers; terrain should not compete with selectable units.

## Scale and delivery

2048² source materials, economical shared atlases or trimmed derivatives. Deliver editable source, required runtime files, channel/packing notes, bounds or tile scale, provenance and preview evidence under `public/assets/replacements/metal-surface/`. Use the shared contract for file types, color spaces and metadata. If multiple modules belong to this kit, enumerate each module and its filename in the delivery report rather than presenting a single beauty image as the whole kit.

## Integration requirement

Replace the current deterministic noise texture. Shared material sourcing reduces memory without making every tower identical. Current simulation rules remain authoritative. New decorative surface features cannot imply or secretly create fixed paths, build restrictions or resource mechanics.

## Generation instruction

Create a production-ready original realistic sci-fi mining-colony industrial material library using the physical forms and surface requirements above. Use restrained color and readable macrostructure. Deliver a usable asset package, not only a concept painting or a texture with baked lighting.

## Acceptance

Test continuity with neighboring surfaces, all-angle readability, visible tiling/repetition, alpha seams and texture density. Supply neutral-light and game-light previews. Reject generic primitive stand-ins, flat color, toy-like geology or effects that hide the battlefield.
