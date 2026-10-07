# Battlefield atmosphere and lighting reference

Asset ID: `sky-atmosphere`

Palette: weathered basalt — charcoal `#353E3D`, mineral gray-brown `#655F51`, warm horn `#958770` mineral flecks; no baked light (ART_DIRECTION.md).

Additional production asset; requires the integration described in the shared guide.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and atmosphere

A restrained dusty exoplanet atmosphere that supports readable detailed machinery rather than hiding it in darkness. The environment must support the detailed military/biological art direction and the free camera.

## Production specification

Muted horizon haze, diffuse environmental reflection, warm directional key and cool restrained fill. No saturated nebula wallpaper, excessive bloom or crushed shadow values. Provide neutral and battlefield reference scenes. Show representative close detail and a normal battlefield view. Detail hierarchy must stay coherent with the reactor and towers; terrain should not compete with selectable units.

## Scale and delivery

reference HDR environment or equivalent source with browser-friendly derivative; document exposure and use. Deliver editable source, required runtime files, channel/packing notes, bounds or tile scale, provenance and preview evidence under `public/assets/replacements/sky-atmosphere/`. Use the shared contract for file types, color spaces and metadata. If multiple modules belong to this kit, enumerate each module and its filename in the delivery report rather than presenting a single beauty image as the whole kit.

## Integration requirement

Lighting/environment import requires renderer changes. Do not bake the atmosphere or sun into models or terrain maps. Current simulation rules remain authoritative. New decorative surface features cannot imply or secretly create fixed paths, build restrictions or resource mechanics.

## Generation instruction

Create a production-ready original realistic sci-fi mining-colony battlefield atmosphere and lighting reference using the physical forms and surface requirements above. Use restrained color and readable macrostructure. Deliver a usable asset package, not only a concept painting or a texture with baked lighting.

## Acceptance

Test continuity with neighboring surfaces, all-angle readability, visible tiling/repetition, alpha seams and texture density. Supply neutral-light and game-light previews. Reject generic primitive stand-ins, flat color, toy-like geology or effects that hide the battlefield.
