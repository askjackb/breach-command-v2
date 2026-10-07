# Mortar — upgrade 3 / Seismic shell

Asset ID: `mortar-tier3-0`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Current export: `public/assets/models/mortar-tier3-0.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and vibe

A heavy automatic indirect-fire mortar emplacement with a stout elevated tube, strong recoil bed and a visible loading mechanism. Its industrial weight and ballistic role must be immediately recognizable. This asset is the upgrade 3 / Seismic shell, not an interchangeable skin.

## Gameplay identity

Runtime type: `mortar`; tier: 3; branch: 0. Role: Indirect bombardment · ground. Current baseline firing interval: 2.5 seconds; range: 20 scene units. These describe visual timing/context, not permission to rebalance damage or targeting. Keep the operating silhouette legible during real-time play.

## Silhouette and construction

A short broad tube angled upward over a heavily braced cradle; an offset ammunition tray and rear rammer create a different silhouette from forward-firing gun towers.

Seismic shell: larger payload handling hardware and reinforced tube collar; broader ground impact effects.

Maintain the root, footprint and aiming socket positions from [the previous configuration](mortar-tier2.md). Make this improvement visible from the gameplay camera: change functional masses, not merely tint or add random greebles.

## Materials and close-up requirements

Trunnions, recoil dampers, tube reinforcing bands, hinged loading tray, shell handling guards and dust wear around anchor feet. The bore needs believable thickness and depth. Shared finishes, chamfer and close-up standards: [technical contract](../TECHNICAL_CONTRACT.md) § Shared tower materials and close-up requirements.

## Motion and sockets

Load/ram, recoil along the tube axis, settle and reset; do not fire from a closed decorative cap. Ballistic projectiles are presentation of existing hits, not new simulation travel-time logic. Required nodes, sockets and clips are defined once in the contract. Shared nodes, sockets and clips: [technical contract](../TECHNICAL_CONTRACT.md) § Shared tower motion, nodes and sockets.

## Size and deliverables

Proposed size: 2.5 m base diameter, 2.6 m depth, 2.6 m height at normal elevation. Keep the ground-centered root fixed across this family. Deliver `model.glb`, two optimized LODs, editable source, complete PBR textures, socket/clip metadata and front/side/top, silhouette, neutral-light and in-engine previews under `public/assets/replacements/mortar-tier3-0/`. Starting tower budgets are in the technical contract; they are not an excuse for crude geometry.

## Generation instruction

Create an original realistic military sci-fi mortar for Breach Command, specifically upgrade 3 / Seismic shell. Follow the physical construction and stage differences above. Produce a full-angle usable 3D asset with materials and moving parts; if your tool only makes images, label its output concept/reference and report the missing model work. No StarCraft unit copying, neon trim blanket, smooth toy casing, flat-color primitive assembly, baked shadows or pre-rendered billboard substitution.

## Acceptance checks

At equal camera and lighting, distinguish this family from its siblings and this configuration from its parent. Show the mechanism firing from the correct socket, verify the upgrade footprint is unchanged, and show its back and underside joins. Reject unreadable upgrades or sophisticated concept art whose exported model loses its quality.
