# Mining rig

Asset ID: `mine`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Current export: `public/assets/models/mine.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept, role and vibe

A militarized automated drilling platform that earns alloy and broadcasts ground vibration. Its economic function must be immediately legible. Original military-industrial design; understated, detailed and physically convincing.

## Required silhouette

An anchored drill mast, moving vertical drill head, material handling chute and compact collection bins; a visibly ground-coupled stance. Apply consistent colony construction standards, bearing/fastener language and grounded proportions. This structure must be recognizable without a UI label.

## Material and detail specification

Drill guides, hydraulic hoses, dust shields, replaceable cutter head, extraction guards and abrasion near actual contacts. Show mining hardware rather than a gun silhouette. Use differentiated painted metal, rubber/insulation, bare moving surfaces and appropriate thermal materials. Wear follows work, handling and ground exposure; do not distribute random rust or noise uniformly. All sides need completed surfaces and join logic.

## Animation and state requirements

Drill rotation and feed cycle with dust pulsing at ground contact. New terrain holes are cosmetic unless navigation is explicitly updated; never move the simulation root. Named clips: `idle`, `construct`, `operate`, `damaged_idle`, `destroy`. Socket inventory: `drill_tip`, `fx_vibration`, `fx_dust`, `fx_damage`, `selection_anchor`. Support structures have no tower upgrade variants in the current game; do not invent upgrade assets or attack mechanics for them.

## Scale, packaging and integration

Proposed envelope: 2.5 m footprint, 3.2 m height. Keep `root` at ground-contact center; +Y up, +Z forward. Produce opaque PBR materials and an economical LOD chain. Deliver GLB, editable source, textures, animated previews and `delivery.json` under `public/assets/replacements/mine/`. Current factory key is `mine`; imported operation clips need an adapter, not the current generic turret animation.

## Agent instruction and acceptance

Create the final 3D production candidate, not just a concept image. Review its industrial function from normal camera distance and its seams/materials at near zoom. Provide a damaged and destroyed presentation that preserves gameplay readability. Reject smooth geometric stand-ins, plastic finishes, cartoon proportions and unmotivated flashing lights.
