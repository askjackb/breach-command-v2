# Flak battery — upgrade 3 / Interceptor

Asset ID: `flak-tier3-1`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Current export: `public/assets/models/flak-tier3-1.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and vibe

A fast-tracking anti-air battery built for fragmentation bursts. It is compact, agile in its aiming mechanism and visually distinct from the slower missile platform. This asset is the upgrade 3 / Interceptor, not an interchangeable skin.

## Gameplay identity

Runtime type: `flak`; tier: 3; branch: 1. Role: Air priority · fragmentation. Current baseline firing interval: 0.55 seconds; range: 12 scene units. These describe visual timing/context, not permission to rebalance damage or targeting. Keep the operating silhouette legible during real-time play.

## Silhouette and construction

Four short substantial barrels in a compact elevated cradle, a recognizable tracking dish or enclosed radar head and a broad stable mounting ring. Elevation is more pronounced than Autocannon.

Interceptor: lighter tracking assembly, quick-cycling feeds and finer sensor array; pair with rapid, precise firing animation.

Maintain the root, footprint and aiming socket positions from [the previous configuration](flak-tier2.md). Make this improvement visible from the gameplay camera: change functional masses, not merely tint or add random greebles.

## Materials and close-up requirements

Barrel breeches, short recoil channels, rugged tracking optics, shell feeds, split armor around elevation joints, cable strain relief and service markings. Radar should not look like a household satellite dish. Shared finishes, chamfer and close-up standards: [technical contract](../TECHNICAL_CONTRACT.md) § Shared tower materials and close-up requirements.

## Motion and sockets

Quick turret tracking, independently blended elevation and tight barrel recoil, with restrained airburst flashes. Do not make the entire base turn. Required nodes, sockets and clips are defined once in the contract. Shared nodes, sockets and clips: [technical contract](../TECHNICAL_CONTRACT.md) § Shared tower motion, nodes and sockets.

## Size and deliverables

Proposed size: 2.4 m base diameter, 2.1 m width across guns, 2.5 m height. Keep the ground-centered root fixed across this family. Deliver `model.glb`, two optimized LODs, editable source, complete PBR textures, socket/clip metadata and front/side/top, silhouette, neutral-light and in-engine previews under `public/assets/replacements/flak-tier3-1/`. Starting tower budgets are in the technical contract; they are not an excuse for crude geometry.

## Generation instruction

Create an original realistic military sci-fi flak battery for Breach Command, specifically upgrade 3 / Interceptor. Follow the physical construction and stage differences above. Produce a full-angle usable 3D asset with materials and moving parts; if your tool only makes images, label its output concept/reference and report the missing model work. No StarCraft unit copying, neon trim blanket, smooth toy casing, flat-color primitive assembly, baked shadows or pre-rendered billboard substitution.

## Acceptance checks

At equal camera and lighting, distinguish this family from its siblings and this configuration from its parent. Show the mechanism firing from the correct socket, verify the upgrade footprint is unchanged, and show its back and underside joins. Reject unreadable upgrades or sophisticated concept art whose exported model loses its quality.
