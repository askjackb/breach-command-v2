# Incinerator — upgrade 3 / Pressure

Asset ID: `incinerator-tier3-1`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Current export: `public/assets/models/incinerator-tier3-1.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and vibe

A brutal short-range industrial thermal projector adapted for defense. Pressure vessels, insulated hoses and a heat-resistant nozzle explain the weapon; it is neither a magical fire wand nor a cheerful flamethrower toy. This asset is the upgrade 3 / Pressure, not an interchangeable skin.

## Gameplay identity

Runtime type: `incinerator`; tier: 3; branch: 1. Role: Short range · heat & area damage. Current baseline firing interval: 0.2 seconds; range: 6 scene units. These describe visual timing/context, not permission to rebalance damage or targeting. Keep the operating silhouette legible during real-time play.

## Silhouette and construction

A squat heavy pressure manifold, one broad forward nozzle, flanking protected fuel/propellant vessels and a shielded operator/service zone at the rear. The hot front and contained rear have visibly different material treatment.

Pressure: narrower precision throat, stronger pump and faster valve hardware; do not imply a longer gameplay range unless code changes explicitly accompany it.

Maintain the root, footprint and aiming socket positions from [the previous configuration](incinerator-tier2.md). Make this improvement visible from the gameplay camera: change functional masses, not merely tint or add random greebles.

## Materials and close-up requirements

Ceramic nozzle liner, braided protected hoses, pressure fittings, purge valves, heat shields, expansion joints and soot where flames actually pass. Keep fuel plumbing logical rather than ornamental. Shared finishes, chamfer and close-up standards: [technical contract](../TECHNICAL_CONTRACT.md) § Shared tower materials and close-up requirements.

## Motion and sockets

Valve actuation precedes a controlled flame envelope; nozzle tremor and brief purge follow firing. Continuous firing must blend cleanly. Show significant heat through surfaces and distortion, not full-body orange glow. Required nodes, sockets and clips are defined once in the contract. Shared nodes, sockets and clips: [technical contract](../TECHNICAL_CONTRACT.md) § Shared tower motion, nodes and sockets.

## Size and deliverables

Proposed size: 2.5 m footprint, 2.5 m depth, 1.9 m height; low heavy silhouette. Keep the ground-centered root fixed across this family. Deliver `model.glb`, two optimized LODs, editable source, complete PBR textures, socket/clip metadata and front/side/top, silhouette, neutral-light and in-engine previews under `public/assets/replacements/incinerator-tier3-1/`. Starting tower budgets are in the technical contract; they are not an excuse for crude geometry.

## Generation instruction

Create an original realistic military sci-fi incinerator for Breach Command, specifically upgrade 3 / Pressure. Follow the physical construction and stage differences above. Produce a full-angle usable 3D asset with materials and moving parts; if your tool only makes images, label its output concept/reference and report the missing model work. No StarCraft unit copying, neon trim blanket, smooth toy casing, flat-color primitive assembly, baked shadows or pre-rendered billboard substitution.

## Acceptance checks

At equal camera and lighting, distinguish this family from its siblings and this configuration from its parent. Show the mechanism firing from the correct socket, verify the upgrade footprint is unchanged, and show its back and underside joins. Reject unreadable upgrades or sophisticated concept art whose exported model loses its quality.
