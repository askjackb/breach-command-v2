# Seismic driver — upgrade 3 / Resonance

Asset ID: `seismic-tier3-1`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Current export: `public/assets/models/seismic-tier3-1.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and vibe

A ground-coupled resonant impact machine that weaponizes industrial seismic equipment. Its large reciprocating mass and anchored coupling distinguish it from a generic glowing energy tower. This asset is the upgrade 3 / Resonance, not an interchangeable skin.

## Gameplay identity

Runtime type: `seismic`; tier: 3; branch: 1. Role: Burrow disruption · vibration. Current baseline firing interval: 1.5 seconds; range: 8 scene units. These describe visual timing/context, not permission to rebalance damage or targeting. Keep the operating silhouette legible during real-time play.

## Silhouette and construction

A central vertical driver inside a reinforced cage, a broad ground contact plate, strong triangular braces and side accumulator housings. Readable downward force is essential.

Resonance: faster reciprocating assembly with tuned accumulator banks and visible return hardware.

Maintain the root, footprint and aiming socket positions from [the previous configuration](seismic-tier2.md). Make this improvement visible from the gameplay camera: change functional masses, not merely tint or add random greebles.

## Materials and close-up requirements

Hydraulic rams, impact guides, dust seals, replaceable ground coupling segments, vibration isolators and strain monitoring. Avoid unexplained hovering pistons. Shared finishes, chamfer and close-up standards: [technical contract](../TECHNICAL_CONTRACT.md) § Shared tower materials and close-up requirements.

## Motion and sockets

Mass lifts, drops, contacts the plate and rebounds under control; dust and expanding ground disturbance reinforce the downward impulse. The chassis anchors remain fixed. Required nodes, sockets and clips are defined once in the contract. Shared nodes, sockets and clips: [technical contract](../TECHNICAL_CONTRACT.md) § Shared tower motion, nodes and sockets. This family additionally requires the `fx_vibration` socket (see contract).

## Size and deliverables

Proposed size: 2.5 m footprint, 2.5 m depth, 2.8 m height. Keep the ground-centered root fixed across this family. Deliver `model.glb`, two optimized LODs, editable source, complete PBR textures, socket/clip metadata and front/side/top, silhouette, neutral-light and in-engine previews under `public/assets/replacements/seismic-tier3-1/`. Starting tower budgets are in the technical contract; they are not an excuse for crude geometry.

## Generation instruction

Create an original realistic military sci-fi seismic driver for Breach Command, specifically upgrade 3 / Resonance. Follow the physical construction and stage differences above. Produce a full-angle usable 3D asset with materials and moving parts; if your tool only makes images, label its output concept/reference and report the missing model work. No StarCraft unit copying, neon trim blanket, smooth toy casing, flat-color primitive assembly, baked shadows or pre-rendered billboard substitution.

## Acceptance checks

At equal camera and lighting, distinguish this family from its siblings and this configuration from its parent. Show the mechanism firing from the correct socket, verify the upgrade footprint is unchanged, and show its back and underside joins. Reject unreadable upgrades or sophisticated concept art whose exported model loses its quality.
