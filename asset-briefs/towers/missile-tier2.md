# Missile battery — upgrade 2

Asset ID: `missile-tier2`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Current export: `public/assets/models/missile-tier2.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and vibe

An armored guided-missile emplacement with articulated launch pods and replaceable ammunition cassettes. It is a battlefield weapon platform, not a festive rocket rack. This asset is the upgrade 2, not an interchangeable skin.

## Gameplay identity

Runtime type: `missile`; tier: 2; branch: null. Role: Explosive area · ground & air. Current baseline firing interval: 1.6 seconds; range: 14 scene units. These describe visual timing/context, not permission to rebalance damage or targeting. Keep the operating silhouette legible during real-time play.

## Silhouette and construction

Two offset rectangular pods on a strong yoke, angled launch cells, a rear reload compartment and a central targeting head. Cell openings and elevation distinguish it from gun barrels.

Add an armored magazine spine and improved pod stabilization with clearly visible latch hardware.

Maintain the root, footprint and aiming socket positions from [the previous configuration](missile-tier1.md). Make this improvement visible from the gameplay camera: change functional masses, not merely tint or add random greebles.

## Materials and close-up requirements

Recessed cell doors, pod frame thickness, blast-safe hinges, reinforced cable loops, reload rails and scorching at actual exhaust exits. Avoid random tiny tubes with no attachment or launcher depth. Shared finishes, chamfer and close-up standards: [technical contract](../TECHNICAL_CONTRACT.md) § Shared tower materials and close-up requirements.

## Motion and sockets

One cell opens, a missile ejects, exhaust ignites clear of the housing, and the empty cell enters a cooldown/reload state. Gameplay damage timing remains authoritative. Required nodes, sockets and clips are defined once in the contract. Shared nodes, sockets and clips: [technical contract](../TECHNICAL_CONTRACT.md) § Shared tower motion, nodes and sockets.

## Size and deliverables

Proposed size: 2.5 m footprint width, 2.6 m body depth, 2.5 m height; pods rotate within reasonable overhang. Keep the ground-centered root fixed across this family. Deliver `model.glb`, two optimized LODs, editable source, complete PBR textures, socket/clip metadata and front/side/top, silhouette, neutral-light and in-engine previews under `public/assets/replacements/missile-tier2/`. Starting tower budgets are in the technical contract; they are not an excuse for crude geometry.

## Generation instruction

Create an original realistic military sci-fi missile battery for Breach Command, specifically upgrade 2. Follow the physical construction and stage differences above. Produce a full-angle usable 3D asset with materials and moving parts; if your tool only makes images, label its output concept/reference and report the missing model work. No StarCraft unit copying, neon trim blanket, smooth toy casing, flat-color primitive assembly, baked shadows or pre-rendered billboard substitution.

## Acceptance checks

At equal camera and lighting, distinguish this family from its siblings and this configuration from its parent. Show the mechanism firing from the correct socket, verify the upgrade footprint is unchanged, and show its back and underside joins. Reject unreadable upgrades or sophisticated concept art whose exported model loses its quality.
