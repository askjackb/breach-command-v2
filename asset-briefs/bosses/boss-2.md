# THE BREACH QUEEN

Asset ID: `boss-2`

Palette: mineral gray-brown `#655F51`, charcoal shell `#353E3D`, warm horn `#958770`, fibrous umber `#4C3E37`; desaturated sensory cyan or amber only where anatomy warrants (ART_DIRECTION.md).

Current export: `public/assets/models/boss-2.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and encounter character

A huge brood-producing organism that establishes a moving biological invasion center. Runtime boss index: 2. Appears in a rotating boss roster at every tenth wave. It must be a distinct production creature, not the ordinary enemy with the same numeric ID enlarged.

## Hero silhouette

A reinforced front thorax with guarding limbs and a broad multi-chamber brood abdomen; raised protective carapace arches create a regal threat without a human crown or face. Convey size with weight, supporting anatomy and the relationship to nearby towers. A body should not become unreadable behind spikes, constant particles or giant emissive patches.

## Surface and anatomical detail

Protected brood outlets, visibly layered reproductive chambers, reinforced membranes and mineral armor scaled to support enormous mass. Distinguish it anatomically from the regular carrier. Use mineral shell, warm horn and protected connective tissue with believable scale transitions. Microdetail must support large form; it cannot replace it. Deliver completed top, side, front, back and underside views.

## Motion, attacks and feedback

Heavy multi-limb gait, defensive attack, a readable brood-release sequence and failing-chamber death. Current behavior spawns Skitters periodically; opening new map breaches is a design extension, not implemented behavior. Clips: `spawn`, `idle`, `locomotion`, `attack`, `hit`, `death` plus `brood_release` for Queen. Required sockets: `brood_exit_01`, `brood_exit_02`, `attack_origin`, `fx_damage`, `audio_origin`, `selection_anchor`. Identify contact/release timestamps. Simulation continues during the encounter; long cinematic animation cannot stop player control or introduce unimplemented attacks.

## Scale and delivery

Proposed hero envelope: roughly 8 m long, 7 m wide, 5 m high; verify against the current boss collision/attack approximation before integration. Deliver three LODs, source sculpt/model, optimized rig, PBR maps, clips and a live-scene preview under `public/assets/replacements/boss-2/`. The provisional boss budget is 20–40k LOD0 triangles and 2–4 material regions, subject to mobile measurement with its escorts.

## Production instruction

Create an original full-angle realistic alien siege boss with the specific anatomy above. Match the established biological material grammar while producing a new silhouette, gait and attack. Show normal-camera and close-camera views with a tower for scale. No giant recolored insect placeholder, no humanoid fantasy crown, no excessive neon or masked poor anatomy.

## Acceptance

The three bosses must be recognizable as separate threats from silhouettes alone. Show the actual imported animation and attack sockets, verify existing combat timing, and show a death that communicates victory without hiding the next wave or leaving unlimited debris.
