# THE WALKING SIEGE

Asset ID: `boss-1`

Palette: mineral gray-brown `#655F51`, charcoal shell `#353E3D`, warm horn `#958770`, fibrous umber `#4C3E37`; desaturated sensory cyan or amber only where anatomy warrants (ART_DIRECTION.md).

Current export: `public/assets/models/boss-1.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and encounter character

A mobile biological siege engine with a formidable supported projectile organ and armored front. Runtime boss index: 1. Appears in a rotating boss roster at every tenth wave. It must be a distinct production creature, not the ordinary enemy with the same numeric ID enlarged.

## Hero silhouette

An elongated supporting body with several heavy legs, a raised dorsal launcher cluster and a shielded head below its firing architecture. It needs a recognizably different skyline from Fault Eater. Convey size with weight, supporting anatomy and the relationship to nearby towers. A body should not become unreadable behind spikes, constant particles or giant emissive patches.

## Surface and anatomical detail

Rigid launcher support plates, fibrous pressure chambers, heavily protected feet and a visible loading/charging anatomical cycle. Avoid mechanical cannons glued to a bug. Use mineral shell, warm horn and protected connective tissue with believable scale transitions. Microdetail must support large form; it cannot replace it. Deliver completed top, side, front, back and underside views.

## Motion, attacks and feedback

Measured gait, stop-and-brace artillery fire, distinct launcher recovery and sequential structural collapse on death. Ranged attack range is currently 10 units; do not imply map-wide fire. Clips: `spawn`, `idle`, `locomotion`, `attack`, `hit`, `death`. Required sockets: `muzzle_01`, `fx_charge`, `attack_origin`, `fx_damage`, `audio_origin`, `selection_anchor`. Identify contact/release timestamps. Simulation continues during the encounter; long cinematic animation cannot stop player control or introduce unimplemented attacks.

## Scale and delivery

Proposed hero envelope: roughly 8 m long, 6 m wide, 5 m high; verify against the current boss collision/attack approximation before integration. Deliver three LODs, source sculpt/model, optimized rig, PBR maps, clips and a live-scene preview under `public/assets/replacements/boss-1/`. The provisional boss budget is 20–40k LOD0 triangles and 2–4 material regions, subject to mobile measurement with its escorts.

## Production instruction

Create an original full-angle realistic alien siege boss with the specific anatomy above. Match the established biological material grammar while producing a new silhouette, gait and attack. Show normal-camera and close-camera views with a tower for scale. No giant recolored insect placeholder, no humanoid fantasy crown, no excessive neon or masked poor anatomy.

## Acceptance

The three bosses must be recognizable as separate threats from silhouettes alone. Show the actual imported animation and attack sockets, verify existing combat timing, and show a death that communicates victory without hiding the next wave or leaving unlimited debris.
