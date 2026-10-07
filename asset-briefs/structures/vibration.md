# Seismic lure

Asset ID: `vibration`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Current export: `public/assets/models/vibration.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept, role and vibe

An expendable ground-signal deception unit that attracts vibration hunters. It shares industrial hardware with the Seismic driver but is clearly a lure, not a weapon. Original military-industrial design; understated, detailed and physically convincing.

## Required silhouette

Low ground-contact plates, a small reciprocating impact head and vibration isolation around its outer casing. No tall generic antenna as the main identity. Apply consistent colony construction standards, bearing/fastener language and grounded proportions. This structure must be recognizable without a UI label.

## Material and detail specification

Contact shoes, restrained springs/dampers, ground anchors, dust seals and purposeful brackets. Use lateral coupling plates to distinguish it from a heat radiator. Use differentiated painted metal, rubber/insulation, bare moving surfaces and appropriate thermal materials. Wear follows work, handling and ground exposure; do not distribute random rust or noise uniformly. All sides need completed surfaces and join logic.

## Animation and state requirements

Rhythmic ground coupling and subtle dust pulses; optional signal rings come from the overlay, not permanent bright geometry. Destruction stops the pulse. Named clips: `idle`, `construct`, `operate`, `damaged_idle`, `destroy`. Socket inventory: `fx_vibration`, `impact_contact`, `fx_damage`, `selection_anchor`. Support structures have no tower upgrade variants in the current game; do not invent upgrade assets or attack mechanics for them.

## Scale, packaging and integration

Proposed envelope: 2.0 m diameter, 1.5 m height. Keep `root` at ground-contact center; +Y up, +Z forward. Produce opaque PBR materials and an economical LOD chain. Deliver GLB, editable source, textures, animated previews and `delivery.json` under `public/assets/replacements/vibration/`. Current factory key is `vibration`; imported operation clips need an adapter, not the current generic turret animation.

## Agent instruction and acceptance

Create the final 3D production candidate, not just a concept image. Review its industrial function from normal camera distance and its seams/materials at near zoom. Provide a damaged and destroyed presentation that preserves gameplay readability. Reject smooth geometric stand-ins, plastic finishes, cartoon proportions and unmotivated flashing lights.
