# Orbital strike

Asset ID: `ability-orbital-strike`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Additional production asset; requires the integration described in the shared guide.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and role

A decisive localized military bombardment with a brief targeting marker and strong grounded blast. A commander ability in uninterrupted real-time combat; its presentation must preserve player control and battlefield readability.

## Visual specification

One strike within the chosen radius, fast hot core, expanding pressure and mineral dust; restrained descending streak if used. Avoid full-screen white-out or an unexplained sci-fi beam curtain. Payload branches increase visual force; Coverage branches increase footprint, matching actual ability parameters. Distinguish commander action from normal tower fire without dominating the entire screen. Provide clear start, active and end phases.

## Delivery and timing

Supply reusable effect source, required runtime atlas/meshes, timing curves, target/affected-area scale notes and an ability icon reference. Stage under `public/assets/replacements/ability-orbital-strike/`. Author short repeatable impact/recovery pieces rather than an uneditable cinematic movie. Follow actual cooldown/duration/level parameters from `src/sim.js` at integration time.

## Integration and review

Ability VFX support is proposed; bind it to actual successful ability activation and affected entities, not every UI tap. The effect cannot pause the run or create new damage/healing. Demonstrate portrait and landscape at normal zoom with concurrent enemy/tower activity. Reject camera takeover, unbounded particles, neon flood and feedback disconnected from the affected structures/enemies.
