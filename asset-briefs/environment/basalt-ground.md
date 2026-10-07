# Basalt battlefield surface

Asset ID: `basalt-ground`

Palette: weathered basalt — charcoal `#353E3D`, mineral gray-brown `#655F51`, warm horn `#958770` mineral flecks; no baked light (ART_DIRECTION.md).

Additional production asset; requires the integration described in the shared guide.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and atmosphere

A tileable compacted volcanic regolith surface with basalt chips, subtle extraction disturbance and sparse mineral flecks. The environment must support the detailed military/biological art direction and the free camera.

## Production specification

Moderate value contrast and restrained charcoal/warm gray. Fine cracks must not form roads, arrows or repeated large landmarks. Supply albedo, normal, roughness and optional height; no sun or shadow baked into color. Show representative close detail and a normal battlefield view. Detail hierarchy must stay coherent with the reactor and towers; terrain should not compete with selectable units.

## Scale and delivery

2048² tile, proposed 8–12 m world repeat; include seam tests over a 5×5 repeated plane. Deliver editable source, required runtime files, channel/packing notes, bounds or tile scale, provenance and preview evidence under `public/assets/replacements/basalt-ground/`. Use the shared contract for file types, color spaces and metadata. If multiple modules belong to this kit, enumerate each module and its filename in the delivery report rather than presenting a single beauty image as the whole kit.

### Detailed material-layer specification

The 2048² tile (unchanged 8–12 m repeat) is built in four separable layers, so each can be reviewed independently before compositing:

1. **Macro variation:** low-frequency value and hue drift (±5% value, slight brown-grey shift) at 3–6 m wavelength to kill tiling on open ground. No landmark shapes, no centered features — this layer must be invisible as an image when viewed alone.
2. **Fracture network:** fine cracks 1–3 px wide, branching at 30–60°, segments 0.3–1.5 m long, never running parallel for more than ~2 m, never forming a directional flow field. Crack density varies with the macro layer so worn patches read more fractured.
3. **Chip and grain detail:** mid detail of 2–8 cm angular chips and pits (normal + roughness contrast), micro grain below 1 cm carried by roughness/normal only, never albedo noise. Mineral flecks (warm horn `#958770`) on ≤2% of pixels, clustered on crack edges, not scattered uniformly.
4. **Edge softening:** every crack and chip fades over 2–4 px in the normal map; no perfectly black albedo pixels anywhere (albedo floor ~12% luminance) so the ground never reads as holes under neutral light.

Acceptance extras for this set: the 5×5 seam test must hold at 8 m, 10 m and 12 m repeats, and the tile must survive a 50% desaturation check without visible brightness tiling.

## Integration requirement

The current ground uses one repeated generated image; replacement PBR channels require material wiring. Preserve arbitrary movement and placement on the map. Current simulation rules remain authoritative. New decorative surface features cannot imply or secretly create fixed paths, build restrictions or resource mechanics.

## Generation instruction

Create a production-ready original realistic sci-fi mining-colony basalt battlefield surface using the physical forms and surface requirements above. Use restrained color and readable macrostructure. Deliver a usable asset package, not only a concept painting or a texture with baked lighting.

## Acceptance

Test continuity with neighboring surfaces, all-angle readability, visible tiling/repetition, alpha seams and texture density. Supply neutral-light and game-light previews. Reject generic primitive stand-ins, flat color, toy-like geology or effects that hide the battlefield.
