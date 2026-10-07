# Biological material library

Asset ID: `biological-materials`

Palette: mineral gray-brown `#655F51`, charcoal shell `#353E3D`, warm horn `#958770`, fibrous umber `#4C3E37`; desaturated sensory cyan or amber only where anatomy warrants (ART_DIRECTION.md).

Additional production asset; requires the integration described in the shared guide.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and atmosphere

Shared mineralized shell, horn, fibrous tissue and wing membrane material vocabulary. The environment must support the detailed military/biological art direction and the free camera.

## Production specification

Shell layers and striations, localized abrasion, credible protected joint tissue, limited translucency on membranes. Avoid glossy gummy flesh or endlessly wet bodies. Show representative close detail and a normal battlefield view. Detail hierarchy must stay coherent with the reactor and towers; terrain should not compete with selectable units.

## Scale and delivery

2048² source materials; 1024² common-enemy atlases as appropriate. Deliver editable source, required runtime files, channel/packing notes, bounds or tile scale, provenance and preview evidence under `public/assets/replacements/biological-materials/`. Use the shared contract for file types, color spaces and metadata. If multiple modules belong to this kit, enumerate each module and its filename in the delivery report rather than presenting a single beauty image as the whole kit.

## Integration requirement

Final per-unit maps need correct UVs. A material library is a production dependency, not a universal texture slapped on unrelated anatomy. Current simulation rules remain authoritative. New decorative surface features cannot imply or secretly create fixed paths, build restrictions or resource mechanics.

## Generation instruction

Create a production-ready original realistic sci-fi mining-colony biological material library using the physical forms and surface requirements above. Use restrained color and readable macrostructure. Deliver a usable asset package, not only a concept painting or a texture with baked lighting.

## Acceptance

Test continuity with neighboring surfaces, all-angle readability, visible tiling/repetition, alpha seams and texture density. Supply neutral-light and game-light previews. Reject generic primitive stand-ins, flat color, toy-like geology or effects that hide the battlefield.
