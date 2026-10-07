# Climber

Asset ID: `enemy-4`

Palette: mineral gray-brown `#655F51`, charcoal shell `#353E3D`, warm horn `#958770`, fibrous umber `#4C3E37`; desaturated sensory cyan or amber only where anatomy warrants (ART_DIRECTION.md).

Current export: `public/assets/models/enemy-4.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and gameplay identity

A heat-hunting wall-bypassing organism with flexible gripping limbs. Runtime enemy index: 4. Current role flags: climb=true, signal=heat. Baseline movement speed is 2.8 scene units/second. Communicate this class through anatomy and motion, not an arbitrary colored stripe.

## Silhouette and anatomical construction

A high-shouldered body, four prominent long gripping legs plus smaller balance limbs, and hooked contact extremities. Read as a climber, not a spider toy. Preserve a shared subterranean ecology with the other organisms: mineralized shell, fibrous tissue, credible joints and limited sensory light. This is a unique body plan, not a recolored/scaled copy of another unit.

## Close-up materials and details

Show gripping hooks, articulated pads, flexible protected limb joints and restrained heat sensory antennae. Differentiate layered horn/mineral shell from connective tissue and contact wear. Avoid universal wet gloss, faceted primitive body masses, repetitive spikes and cute facial expressions. Back, belly and limb roots must be coherent when the camera rotates.

## Animation and effect requirements

Splayed ground gait and grip/reach animation; provide a climb loop for future adapter use. Current simulation bypasses obstacles without vertical surface traversal. Deliver named clips: `spawn`, `idle`, `locomotion`, `attack`, `hit`, `death`, `climb`. Foot or wing motion must fit its gait and speed; record the natural clip speed so the integration agent can scale playback. Separate hit reaction from locomotion and keep root translation controlled by simulation. Include `attack_origin`, `fx_damage`, `selection_anchor`, and any class-specific discharge/release anchors in metadata. No new gameplay ability is authorized by a dramatic animation.

## Scale and mobile delivery

Proposed adult size: 1.8 m long, 2.0 m spread width, 1.2 m high. Common-enemy LOD and rig budgets follow the shared technical contract. Deliver GLB with rig/clips, editable source, PBR textures, LODs and clip/socket inventory under `public/assets/replacements/enemy-4/`. Current rigid-component instancing does not support an imported skeletal rig automatically; include the intended rendering cost and optimized variants.

## Generation instruction

Generate an original realistic sci-fi biological climber with the body plan above, suitable for a detailed RTS battlefield. Produce the model and animation package, plus neutral all-angle and in-engine previews. If generation yields only concept imagery, identify it as concept and do not claim the game asset is complete.

## Acceptance

Compare equal-scale silhouettes with Skitter, Bastion and Razor. Verify the role can be recognized on a mobile screen, limbs do not skate, attack contacts are consistent, and effects leave the body readable. Reject a generic insect with color or scale changes standing in for this class.
