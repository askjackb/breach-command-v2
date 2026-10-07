# Cryo projector — upgrade 2

Asset ID: `cryo-tier2`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Current export: `public/assets/models/cryo-tier2.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and vibe

A military cryogenic suppression projector derived from industrial cooling equipment. Its identifying traits are refrigeration, insulated storage and a focused cold jet—not a snowflake sculpture. This asset is the upgrade 2, not an interchangeable skin.

## Gameplay identity

Runtime type: `cryo`; tier: 2; branch: null. Role: Movement suppression · ground & air. Current baseline firing interval: 0.6 seconds; range: 9 scene units. These describe visual timing/context, not permission to rebalance damage or targeting. Keep the operating silhouette legible during real-time play.

## Silhouette and construction

A substantial insulated forward nozzle, paired low cold-storage vessels, finned refrigeration equipment and shielded distribution hoses. Broader storage masses separate it from Incinerator.

Add multiple cold accumulators and a larger adjustable nozzle collar.

Maintain the root, footprint and aiming socket positions from [the previous configuration](cryo-tier1.md). Make this improvement visible from the gameplay camera: change functional masses, not merely tint or add random greebles.

## Materials and close-up requirements

Frost only near cold parts, condensation/purge outlets, insulated fittings, small pressure gauges, compressor vents and ice-free maintenance areas. Painted metal remains physically plausible underneath frost. Shared finishes, chamfer and close-up standards: [technical contract](../TECHNICAL_CONTRACT.md) § Shared tower materials and close-up requirements.

## Motion and sockets

Compressor movement, controlled valve cycling, a fine cold plume and residual frost near the muzzle. Suppressed enemies retain recognizable silhouettes under frost effects. Required nodes, sockets and clips are defined once in the contract. Shared nodes, sockets and clips: [technical contract](../TECHNICAL_CONTRACT.md) § Shared tower motion, nodes and sockets.

## Size and deliverables

Proposed size: 2.4 m footprint, 2.6 m depth, 2.0 m height. Keep the ground-centered root fixed across this family. Deliver `model.glb`, two optimized LODs, editable source, complete PBR textures, socket/clip metadata and front/side/top, silhouette, neutral-light and in-engine previews under `public/assets/replacements/cryo-tier2/`. Starting tower budgets are in the technical contract; they are not an excuse for crude geometry.

## Generation instruction

Create an original realistic military sci-fi cryo projector for Breach Command, specifically upgrade 2. Follow the physical construction and stage differences above. Produce a full-angle usable 3D asset with materials and moving parts; if your tool only makes images, label its output concept/reference and report the missing model work. No StarCraft unit copying, neon trim blanket, smooth toy casing, flat-color primitive assembly, baked shadows or pre-rendered billboard substitution.

## Acceptance checks

At equal camera and lighting, distinguish this family from its siblings and this configuration from its parent. Show the mechanism firing from the correct socket, verify the upgrade footprint is unchanged, and show its back and underside joins. Reject unreadable upgrades or sophisticated concept art whose exported model loses its quality.
