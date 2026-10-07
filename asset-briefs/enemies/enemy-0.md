# Skitter

Asset ID: `enemy-0`

Palette: mineral gray-brown `#655F51`, charcoal shell `#353E3D`, warm horn `#958770`, fibrous umber `#4C3E37`; desaturated sensory cyan or amber only where anatomy warrants (ART_DIRECTION.md).

Current export: `public/assets/models/enemy-0.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and gameplay identity

A light mineral-armored swarm forager, nervous and dangerous, with low ground contact and vibration-sensitive forelimbs. Runtime enemy index: 0. Current role flags: signal=vibration. Baseline movement speed is 3.2 scene units/second. Communicate this class through anatomy and motion, not an arbitrary colored stripe.

## Silhouette and anatomical construction

A narrow segmented abdomen, low wedge head and six clearly jointed running limbs. Give the front contact limbs a purposeful sensing shape. Preserve a shared subterranean ecology with the other organisms: mineralized shell, fibrous tissue, credible joints and limited sensory light. This is a unique body plan, not a recolored/scaled copy of another unit.

## Close-up materials and details

Show ground-contact forelimbs and protected joint membranes. Differentiate layered horn/mineral shell from connective tissue and contact wear. Avoid universal wet gloss, faceted primitive body masses, repetitive spikes and cute facial expressions. Back, belly and limb roots must be coherent when the camera rotates.

## Animation and effect requirements

Alternating tripod gait, quick weight transfer, a short forward bite/claw attack and a collapsed death with limited debris. Deliver named clips: `spawn`, `idle`, `locomotion`, `attack`, `hit`, `death`. Foot or wing motion must fit its gait and speed; record the natural clip speed so the integration agent can scale playback. Separate hit reaction from locomotion and keep root translation controlled by simulation. Include `attack_origin`, `fx_damage`, `selection_anchor`, and any class-specific discharge/release anchors in metadata. No new gameplay ability is authorized by a dramatic animation.

### Detailed form specification

**Massing:** a low wedge, not a beetle ball. Of the unchanged 1.4 m length: wedge head and sensor crown ~20%, thorax ~25%, abdomen ~55%. Width 1.1 m is carried at the thorax; the abdomen tapers to 70% of thorax width at the rear so the body reads as driven from behind. Height peaks at 0.7 m over the thorax and falls both ways — no part of the silhouette is a dome.

**Body plan and proportions:** head is a flat triangular wedge, snout 0.25 m wide, hinged low; two flattened sensing paddles (0.18 m long, leaf-shaped) project ahead of the snout at ground level and are the first thing to contact terrain. Thorax carries the limb roots: six limbs in F/M/B pairs (see [RIGGING.md](../RIGGING.md)), upper segment angled 35° down from the body line, lower segment near-vertical, total ground clearance under the thorax 0.22 m. Segment ratio upper:lower ≈ 1 : 1.3. Front pair is slightly longer and thinner — probing limbs; mid pair is the drive pair (thickest, ~0.07 m diameter); rear pair shortest.

**Distinguishing geometry:** (1) carapace of five overlapping plates laid rearward like shingles, each plate edge lifting 0.02–0.03 m over the next so light catches a stepped ridge line down the back; (2) a single low sensor crown on the head — two short antennae stubs and one recessed sensory pit, no horns or crest; (3) spinneret-like rear cluster: three small blunt vents at the abdomen tip; (4) ventral mouthparts implied by two small gripping palps beside the snout, closed at rest. Nothing on this class glows except a pinpoint sensory dot; it is the smallest, plainest silhouette in the roster and must stay readable purely by shape.

## Scale and mobile delivery

Proposed adult size: 1.4 m long, 1.1 m wide, 0.7 m high. Common-enemy LOD and rig budgets follow the shared technical contract. Deliver GLB with rig/clips, editable source, PBR textures, LODs and clip/socket inventory under `public/assets/replacements/enemy-0/`. Current rigid-component instancing does not support an imported skeletal rig automatically; include the intended rendering cost and optimized variants.

## Generation instruction

Generate an original realistic sci-fi biological skitter with the body plan above, suitable for a detailed RTS battlefield. Produce the model and animation package, plus neutral all-angle and in-engine previews. If generation yields only concept imagery, identify it as concept and do not claim the game asset is complete.

## Acceptance

Compare equal-scale silhouettes with Skitter, Bastion and Razor. Verify the role can be recognized on a mobile screen, limbs do not skate, attack contacts are consistent, and effects leave the body readable. Reject a generic insect with color or scale changes standing in for this class.
