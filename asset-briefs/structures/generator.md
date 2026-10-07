# Power plant

Asset ID: `generator`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Current export: `public/assets/models/generator.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept, role and vibe

A deployable military power facility whose loss can shut down other structures. Heavy generation equipment with credible heat management. Original military-industrial design; understated, detailed and physically convincing.

## Required silhouette

Paired protected generation modules around a service spine, finned heat exchangers, insulated output trunk and a recognizable power-distribution crown. Apply consistent colony construction standards, bearing/fastener language and grounded proportions. This structure must be recognizable without a UI label.

## Material and detail specification

Radiators, vent mesh, isolation mounts, armored cabling, breaker access and small diagnostic indicators. Avoid toy batteries or a universal glowing tube. Use differentiated painted metal, rubber/insulation, bare moving surfaces and appropriate thermal materials. Wear follows work, handling and ground exposure; do not distribute random rust or noise uniformly. All sides need completed surfaces and join logic.

## Animation and state requirements

Subtle fan/drive movement, heat exhaust and state indicators. Losing power must be visible through stopped activity and dimmed indicators without recoloring the entire colony. Named clips: `idle`, `construct`, `operate`, `damaged_idle`, `destroy`. Socket inventory: `fx_heat`, `power_output`, `fx_damage`, `audio_origin`, `selection_anchor`. Support structures have no tower upgrade variants in the current game; do not invent upgrade assets or attack mechanics for them.

## Scale, packaging and integration

Proposed envelope: 2.5 m footprint, 2.5 m height. Keep `root` at ground-contact center; +Y up, +Z forward. Produce opaque PBR materials and an economical LOD chain. Deliver GLB, editable source, textures, animated previews and `delivery.json` under `public/assets/replacements/generator/`. Current factory key is `generator`; imported operation clips need an adapter, not the current generic turret animation.

## Agent instruction and acceptance

Create the final 3D production candidate, not just a concept image. Review its industrial function from normal camera distance and its seams/materials at near zoom. Provide a damaged and destroyed presentation that preserves gameplay readability. Reject smooth geometric stand-ins, plastic finishes, cartoon proportions and unmotivated flashing lights.
