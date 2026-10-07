# How replacement assets will enter the existing game

## Current behavior versus planned support

The game currently constructs towers with `towerModel(type, tier, branch)`, enemies with `enemyModel(kind, boss)`, and map features with `featureModel(type)` in `src/assets.js`. `src/main.js` calls those factories for builds, upgrades, previews and spawns. Exported `public/assets/models/*.json` are deliverable copies; the game does not load them. Replacing those JSON files alone has no runtime effect.

New GLB assets can be integrated, but a loader/registry and animation/rendering adapter must be implemented when delivery arrives. This documentation pass does not change the running game. Keep the simulation intact while replacing visuals. The files and budgets here are an authoring contract, not a promise of drop-in support already implemented.

## ID mapping

The [README inventory](README.md) and `catalog.json` map every current export to its own brief. Exact tower variant IDs: `<type>` means base/tier 0; `<type>-tier1`; `<type>-tier2`; `<type>-tier3-0` means branch index 0; `<type>-tier3-1` means branch index 1. There are five visual states per family, because the third upgrade has two alternatives.

Enemies use `enemy-0` through `enemy-9`, aligned with `ENEMIES` order in `src/data.js`. Bosses use `boss-0` through `boss-2` and `BOSSES` order; do not derive boss appearance from the ordinary enemy with the same numeric index. Features use `feature-0` through `feature-5`, aligned with `FEATURE_NAMES`. Support IDs are `reactor`, `mine`, `generator`, `heat`, `vibration`.

## Integration sequence

1. Validate the received files, metadata, missing dependencies, material packing, scale, pivots, clips and source provenance. Create an import report. Do not approve art solely because it imports.
2. Add `GLTFLoader` and an async asset registry, using `import.meta.env.BASE_URL` for every local asset path so GitHub Pages subpaths work. Preload the approved first batch before starting a run; display an honest loading/error state.
3. Maintain explicit factory keys for `(type,tier,branch)`, `enemy-kind`, `boss-kind` and feature type. Keep the existing procedural factory as a visibly documented fallback for undelivered assets; never mislabel a fallback as the new asset.
4. Bind `turret`, pitch joints and muzzle/socket nodes by name. Set `model.userData.turret` or replace the aiming adapter deliberately. Existing yaw uses `atan2(target.x-source.x,target.z-source.z)` and expects +Z forward.
5. Use an animation adapter that follows build/fire/hit/death/spawn events. Keep damage and cooldown timing in `src/sim.js`. Death animation may continue visually after the enemy is removed from simulation; it must not remain targetable. Do not let the current sine-wave limb animation run over an imported skeletal rig.
6. Handle instancing explicitly. Current `renderEnemies()` instances rigid mesh components using matrices. It cannot automatically render different skeletal poses with that approach. Choose tested skinned clones with suitable budgets or implement a verified animated instancing strategy. Do not flatten a rig and silently lose animation.
7. Use the same registry for construction previews, finished structures, upgrade replacement and selection hit testing. Clone/tint preview materials without modifying shared production materials. Keep proxies separate from render geometry and map the selected object back to the simulation entity.
8. Connect VFX and spatial audio to sockets and simulation events. Current weapons use straight trace lines and synthesized tones; new projectile, drone and particle presentations need adapters. Retain readability and voice/effect caps.
9. Replace terrain surfaces and instanced rock geometry in `drawRocks()` independently of navigation. New visible rock bounds must match the existing blocker radii, or navigation/collision must be updated together. Procedural maps must remain free of authored lanes.
10. Measure real-device performance, run simulation regressions and browser checks, review the in-engine first batch, then roll out remaining approved assets. Commit source assets/metadata in manageable sizes; exclude temporary tool caches. Document which IDs are actually replaced.

## Example delivery metadata

```json
{
  "assetId": "autocannon",
  "brief": "asset-briefs/towers/autocannon.md",
  "version": "candidate-01",
  "status": "candidate",
  "files": {
    "model": "model.glb",
    "lod1": "model-lod1.glb",
    "lod2": "model-lod2.glb",
    "source": "source/autocannon.blend",
    "preview": "previews/gameplay.png"
  },
  "boundsMeters": {"width": 2.4, "height": 2.1, "depth": 2.5},
  "axes": {"up": "+Y", "forward": "+Z"},
  "pivot": "ground-contact center",
  "nodes": ["root", "base", "turret", "weapon_pitch"],
  "sockets": ["muzzle_01", "muzzle_02", "fx_heat", "selection_anchor"],
  "clips": [{"name": "fire", "durationSeconds": 0.25, "loop": false,
    "events": [{"name": "muzzle", "timeSeconds": 0.0}]}],
  "lodTriangles": [12000, 4500, 1600],
  "materialCount": 3,
  "textures": [{"role": "ORM", "size": [2048, 2048],
    "packing": "R=AO, G=roughness, B=metalness"}],
  "dependencies": [],
  "provenance": {"tool": "record actual tool", "references": []},
  "limitations": ["record actual limitations"]
}
```

All example numbers are proposed values, not measurements of a delivered asset. Assets may arrive incrementally; the first accepted batch can be integrated before the entire roster is complete.
