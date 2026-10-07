# Razor

Asset ID: `enemy-2`

Palette: mineral gray-brown `#655F51`, charcoal shell `#353E3D`, warm horn `#958770`, fibrous umber `#4C3E37`; desaturated sensory cyan or amber only where anatomy warrants (ART_DIRECTION.md).

Current export: `public/assets/models/enemy-2.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and gameplay identity

A fast heat-hunting predator with directional aggression and minimal wasted mass. Runtime enemy index: 2. Current role flags: signal=heat. Baseline movement speed is 4.5 scene units/second. Communicate this class through anatomy and motion, not an arbitrary colored stripe.

## Silhouette and anatomical construction

Long lean torso, raised forward sensory head, swept blade-like forelimbs and spring-like rear limbs; clearly faster than Skitter. Preserve a shared subterranean ecology with the other organisms: mineralized shell, fibrous tissue, credible joints and limited sensory light. This is a unique body plan, not a recolored/scaled copy of another unit.

## Close-up materials and details

Show sensory pits, tendon bundles, honed mineralized forelimbs and lightly plated joints. Differentiate layered horn/mineral shell from connective tissue and contact wear. Avoid universal wet gloss, faceted primitive body masses, repetitive spikes and cute facial expressions. Back, belly and limb roots must be coherent when the camera rotates.

## Animation and effect requirements

Rapid low-contact running with strong push-off, a brief lunge strike and a sliding weighted death; avoid constant foot skating. Deliver named clips: `spawn`, `idle`, `locomotion`, `attack`, `hit`, `death`. Foot or wing motion must fit its gait and speed; record the natural clip speed so the integration agent can scale playback. Separate hit reaction from locomotion and keep root translation controlled by simulation. Include `attack_origin`, `fx_damage`, `selection_anchor`, and any class-specific discharge/release anchors in metadata. No new gameplay ability is authorized by a dramatic animation.

## Scale and mobile delivery

Proposed adult size: 2.0 m long, 1.4 m wide, 1.0 m high. Common-enemy LOD and rig budgets follow the shared technical contract. Deliver GLB with rig/clips, editable source, PBR textures, LODs and clip/socket inventory under `public/assets/replacements/enemy-2/`. Current rigid-component instancing does not support an imported skeletal rig automatically; include the intended rendering cost and optimized variants.

## Generation instruction

Generate an original realistic sci-fi biological razor with the body plan above, suitable for a detailed RTS battlefield. Produce the model and animation package, plus neutral all-angle and in-engine previews. If generation yields only concept imagery, identify it as concept and do not claim the game asset is complete.

## Acceptance

Compare equal-scale silhouettes with Skitter, Bastion and Razor. Verify the role can be recognized on a mobile screen, limbs do not skate, attack contacts are consistent, and effects leave the body readable. Reject a generic insect with color or scale changes standing in for this class.
