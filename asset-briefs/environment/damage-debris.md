# Damage and destruction debris kit

Asset ID: `damage-debris`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Additional production asset; requires the integration described in the shared guide.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and atmosphere

Limited readable fragments from colony armor and biological shell for attacks/destruction. The environment must support the detailed military/biological art direction and the free camera.

## Production specification

Separate metal panels, broken insulation, shell chips and short-lived dust elements. Preserve faction material differences. Do not leave unlimited debris across an endless run. Show representative close detail and a normal battlefield view. Detail hierarchy must stay coherent with the reactor and towers; terrain should not compete with selectable units.

## Scale and delivery

small fragments 0.05–0.6 m; pooled runtime instances and lifetime metadata. Deliver editable source, required runtime files, channel/packing notes, bounds or tile scale, provenance and preview evidence under `public/assets/replacements/damage-debris/`. Use the shared contract for file types, color spaces and metadata. If multiple modules belong to this kit, enumerate each module and its filename in the delivery report rather than presenting a single beauty image as the whole kit.

## Integration requirement

Current destruction uses a sphere flash. Debris is proposed visual feedback, never a new navigation blocker. Current simulation rules remain authoritative. New decorative surface features cannot imply or secretly create fixed paths, build restrictions or resource mechanics.

## Generation instruction

Create a production-ready original realistic sci-fi mining-colony damage and destruction debris kit using the physical forms and surface requirements above. Use restrained color and readable macrostructure. Deliver a usable asset package, not only a concept painting or a texture with baked lighting.

## Acceptance

Test continuity with neighboring surfaces, all-angle readability, visible tiling/repetition, alpha seams and texture density. Supply neutral-light and game-light previews. Reject generic primitive stand-ins, flat color, toy-like geology or effects that hide the battlefield.
