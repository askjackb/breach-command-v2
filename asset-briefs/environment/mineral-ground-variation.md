# Mineral dust and extraction surface variation

Asset ID: `mineral-ground-variation`

Palette: weathered basalt — charcoal `#353E3D`, mineral gray-brown `#655F51`, warm horn `#958770` mineral flecks; no baked light (ART_DIRECTION.md).

Additional production asset; requires the integration described in the shared guide.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and atmosphere

Secondary terrain treatment that breaks a repeated single texture without suggesting a fixed enemy lane. The environment must support the detailed military/biological art direction and the free camera.

## Production specification

Sparse exposed rock patches, crushed mineral aggregate and irregular disturbed-ground overlays. Blend values/materials with the basalt ground; do not create high-contrast checkerboards or roads. Show representative close detail and a normal battlefield view. Detail hierarchy must stay coherent with the reactor and towers; terrain should not compete with selectable units.

## Scale and delivery

2048² tiling layer plus 1024² masked overlays with documented alpha handling. Deliver editable source, required runtime files, channel/packing notes, bounds or tile scale, provenance and preview evidence under `public/assets/replacements/mineral-ground-variation/`. Use the shared contract for file types, color spaces and metadata. If multiple modules belong to this kit, enumerate each module and its filename in the delivery report rather than presenting a single beauty image as the whole kit.

## Integration requirement

Terrain blending/decal support is proposed. Place overlays from seed-derived data without affecting pathfinding. Current simulation rules remain authoritative. New decorative surface features cannot imply or secretly create fixed paths, build restrictions or resource mechanics.

## Generation instruction

Create a production-ready original realistic sci-fi mining-colony mineral dust and extraction surface variation using the physical forms and surface requirements above. Use restrained color and readable macrostructure. Deliver a usable asset package, not only a concept painting or a texture with baked lighting.

## Acceptance

Test continuity with neighboring surfaces, all-angle readability, visible tiling/repetition, alpha seams and texture density. Supply neutral-light and game-light previews. Reject generic primitive stand-ins, flat color, toy-like geology or effects that hide the battlefield.
