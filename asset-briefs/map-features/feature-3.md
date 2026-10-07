# Power relay

Asset ID: `feature-3`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Current export: `public/assets/models/feature-3.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and tactical identity

An abandoned power distribution facility that can be restored as generation capacity. Feature index 3; a selectable procedural map element with a one-use tactical interaction. It should invite recognition without looking like a bright collectible toy.

## Visual construction and vibe

A protected service pedestal, damaged cable trunk and paired power modules in the same engineering family as the generator, with a distinct recovery-state silhouette. Use the same weathering and material grammar as the colony and basalt terrain. Integrate the ground contact naturally while keeping the selectable silhouette clear. All sides must work when rotated; avoid an attractive front with an unfinished back.

## States and animation

Brief restoration sequence followed by generator-style operation; current activation creates a generator and hides the feature. Prevent doubled hardware. Deliver `inactive`, `activate` and `used` clips or state meshes where meaningful; document whether a clip is a loop or a one-shot. The renderer currently hides used feature meshes, so retained depleted states require explicit integration. Required anchors: `power_output`, `fx_heat`, `selection_anchor` and a simple selection proxy.

## Surface requirements

Believable layered materials and localized wear; no baked sunlight, no uniform plastic specular and no oversized neon panels. Contact dust and scratches must match the surrounding environment. The surface must remain readable in both neutral and battlefield light.

## Delivery and scale

Proposed envelope: 2.5 m footprint, 2.4 m height. Provide GLB, source, PBR maps, efficient LODs, state/clip metadata and in-context previews under `public/assets/replacements/feature-3/`. Keep activation radius/gameplay unchanged unless separately requested. Record blocker geometry explicitly; visual bounds cannot silently diverge from navigation.

## Generation instruction and acceptance

Create an original detailed 3D map interaction asset for a realistic sci-fi mining colony, with the stated purpose, silhouette and before/after state. Show it mixed with rocks and nearby towers in both orientations. Reject a generic glowing object, a reused tower with only changed tint, or a prop suggesting an unimplemented gameplay action.
