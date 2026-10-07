# Autocannon — upgrade 1

Asset ID: `autocannon-tier1`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Current export: `public/assets/models/autocannon-tier1.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and vibe

A field-deployable twin-feed kinetic sentry: a compact armored bearing supports two long, purposeful cannon assemblies. It looks like a military machine capable of thousands of sustained rounds, rather than a toy gun mounted on a disk. This asset is the upgrade 1, not an interchangeable skin.

## Gameplay identity

Runtime type: `autocannon`; tier: 1; branch: null. Role: Rapid kinetic fire · ground & air. Current baseline firing interval: 0.32 seconds; range: 10 scene units. These describe visual timing/context, not permission to rebalance damage or targeting. Keep the operating silhouette legible during real-time play.

## Silhouette and construction

Low broad stabilization feet, a protected central yaw bearing, a stepped turret shoulder, two clearly separated forward barrels and armored ammunition feed routes. The barrels carry the directional silhouette; the rear ammunition volume balances them.

Add reinforced bearing guards and larger side feed drums; visibly strengthen the recoil sled.

Maintain the root, footprint and aiming socket positions from [the previous configuration](autocannon.md). Make this improvement visible from the gameplay camera: change functional masses, not merely tint or add random greebles.

## Materials and close-up requirements

Include barrel jackets, replaceable muzzle collars, recoil slides, feed covers, accessible maintenance latches, elevation actuators and barrel heat staining. Plate thickness, joins and weld locations must be credible. Avoid a collection of unconnected cylinders. Shared finishes, chamfer and close-up standards: [technical contract](../TECHNICAL_CONTRACT.md) § Shared tower materials and close-up requirements.

## Motion and sockets

Alternate left/right recoil, short chassis vibration, spent-case ejection from a consistent socket and a subtle feed mechanism. Fire is rapid, so recoil must settle or blend cleanly without a full exaggerated body bounce. Required nodes, sockets and clips are defined once in the contract. Shared nodes, sockets and clips: [technical contract](../TECHNICAL_CONTRACT.md) § Shared tower motion, nodes and sockets.

## Size and deliverables

Proposed size: 2.4 m wide, 2.5 m deep, 2.1 m high; barrel overhang may extend beyond the circular base without changing collision. Keep the ground-centered root fixed across this family. Deliver `model.glb`, two optimized LODs, editable source, complete PBR textures, socket/clip metadata and front/side/top, silhouette, neutral-light and in-engine previews under `public/assets/replacements/autocannon-tier1/`. Starting tower budgets are in the technical contract; they are not an excuse for crude geometry.

## Generation instruction

Create an original realistic military sci-fi autocannon for Breach Command, specifically upgrade 1. Follow the physical construction and stage differences above. Produce a full-angle usable 3D asset with materials and moving parts; if your tool only makes images, label its output concept/reference and report the missing model work. No StarCraft unit copying, neon trim blanket, smooth toy casing, flat-color primitive assembly, baked shadows or pre-rendered billboard substitution.

## Acceptance checks

At equal camera and lighting, distinguish this family from its siblings and this configuration from its parent. Show the mechanism firing from the correct socket, verify the upgrade footprint is unchanged, and show its back and underside joins. Reject unreadable upgrades or sophisticated concept art whose exported model loses its quality.
