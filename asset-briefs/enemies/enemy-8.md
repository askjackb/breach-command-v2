# Tracker

Asset ID: `enemy-8`

Palette: mineral gray-brown `#655F51`, charcoal shell `#353E3D`, warm horn `#958770`, fibrous umber `#4C3E37`; desaturated sensory cyan or amber only where anatomy warrants (ART_DIRECTION.md).

Current export: `public/assets/models/enemy-8.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and gameplay identity

A decoy-resistant hunter that attacks colony infrastructure using differentiated senses. Runtime enemy index: 8. Current role flags: tracker=true, signal=heat. Baseline movement speed is 2.5 scene units/second. Communicate this class through anatomy and motion, not an arbitrary colored stripe.

## Silhouette and anatomical construction

A compact muscular body with a forward crown of short purposeful sensory spines, alert head carriage and strongly planted attack limbs. Preserve a shared subterranean ecology with the other organisms: mineralized shell, fibrous tissue, credible joints and limited sensory light. This is a unique body plan, not a recolored/scaled copy of another unit.

## Close-up materials and details

Show multiple protected sensory pits, compact receptor crest and stronger joint protection than a Razor. Differentiate layered horn/mineral shell from connective tissue and contact wear. Avoid universal wet gloss, faceted primitive body masses, repetitive spikes and cute facial expressions. Back, belly and limb roots must be coherent when the camera rotates.

## Animation and effect requirements

Deliberate pursuit, occasional sensor-head scanning blended into gait, a committed strike and a crisp weighted death. It should not chase bright decoy effects visually. Deliver named clips: `spawn`, `idle`, `locomotion`, `attack`, `hit`, `death`, `scan`. Foot or wing motion must fit its gait and speed; record the natural clip speed so the integration agent can scale playback. Separate hit reaction from locomotion and keep root translation controlled by simulation. Include `attack_origin`, `fx_damage`, `selection_anchor`, and any class-specific discharge/release anchors in metadata. No new gameplay ability is authorized by a dramatic animation.

## Scale and mobile delivery

Proposed adult size: 2.1 m long, 1.6 m wide, 1.3 m high. Common-enemy LOD and rig budgets follow the shared technical contract. Deliver GLB with rig/clips, editable source, PBR textures, LODs and clip/socket inventory under `public/assets/replacements/enemy-8/`. Current rigid-component instancing does not support an imported skeletal rig automatically; include the intended rendering cost and optimized variants.

## Generation instruction

Generate an original realistic sci-fi biological tracker with the body plan above, suitable for a detailed RTS battlefield. Produce the model and animation package, plus neutral all-angle and in-engine previews. If generation yields only concept imagery, identify it as concept and do not claim the game asset is complete.

## Acceptance

Compare equal-scale silhouettes with Skitter, Bastion and Razor. Verify the role can be recognized on a mobile screen, limbs do not skate, attack contacts are consistent, and effects leave the body readable. Reject a generic insect with color or scale changes standing in for this class.
