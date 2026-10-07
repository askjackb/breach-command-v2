# Arc emitter — upgrade 2

Asset ID: `arc-tier2`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Current export: `public/assets/models/arc-tier2.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and vibe

A contained electrical discharge turret with paired conductor towers and heavily insulated field hardware. It conveys dangerous energy under engineering control rather than fantasy lightning ornaments. This asset is the upgrade 2, not an interchangeable skin.

## Gameplay identity

Runtime type: `arc`; tier: 2; branch: null. Role: Chain discharge · clustered enemies. Current baseline firing interval: 0.85 seconds; range: 9 scene units. These describe visual timing/context, not permission to rebalance damage or targeting. Keep the operating silhouette legible during real-time play.

## Silhouette and construction

Two separated vertical conductor prongs over a dense shielded capacitor base; an open central discharge gap gives a unique silhouette. Ceramic isolation and grounded bracing are readable from above.

Add conductive field-control fins and reinforced grounding struts.

Maintain the root, footprint and aiming socket positions from [the previous configuration](arc-tier1.md). Make this improvement visible from the gameplay camera: change functional masses, not merely tint or add random greebles.

## Materials and close-up requirements

Layered insulators, bus bars, protected cable routing, field shrouds, grounded armor and small diagnostic indicators. Avoid evenly stacked glowing donuts as the entire model. Shared finishes, chamfer and close-up standards: [technical contract](../TECHNICAL_CONTRACT.md) § Shared tower materials and close-up requirements.

## Motion and sockets

Subtle charge movement on conductors, a brief discharge and recovering field indicators. Chain arcs originate from a real electrode socket; randomized arcs must not imply extra hits. Required nodes, sockets and clips are defined once in the contract. Shared nodes, sockets and clips: [technical contract](../TECHNICAL_CONTRACT.md) § Shared tower motion, nodes and sockets.

## Size and deliverables

Proposed size: 2.4 m base diameter, 2.0 m width, 2.9 m height; tallest standard energy tower. Keep the ground-centered root fixed across this family. Deliver `model.glb`, two optimized LODs, editable source, complete PBR textures, socket/clip metadata and front/side/top, silhouette, neutral-light and in-engine previews under `public/assets/replacements/arc-tier2/`. Starting tower budgets are in the technical contract; they are not an excuse for crude geometry.

## Generation instruction

Create an original realistic military sci-fi arc emitter for Breach Command, specifically upgrade 2. Follow the physical construction and stage differences above. Produce a full-angle usable 3D asset with materials and moving parts; if your tool only makes images, label its output concept/reference and report the missing model work. No StarCraft unit copying, neon trim blanket, smooth toy casing, flat-color primitive assembly, baked shadows or pre-rendered billboard substitution.

## Acceptance checks

At equal camera and lighting, distinguish this family from its siblings and this configuration from its parent. Show the mechanism firing from the correct socket, verify the upgrade footprint is unchanged, and show its back and underside joins. Reject unreadable upgrades or sophisticated concept art whose exported model loses its quality.
