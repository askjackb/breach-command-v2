# Changes — breach-command v2 (asset & brief improvement pass)

Date: 2026-10-07. Working copy of `breach-command`; the original repo was not modified.
All model exports were regenerated in place under `public/assets/models/`. Game logic,
runtime IDs, node names, footprints and the export interface are unchanged; this pass
changed briefs, procedural model generation, and one exporter bug fix.

## 1. Brief fixes (`asset-briefs/`)

- **TECHNICAL_CONTRACT.md — new sections:**
  - *High-poly → low-poly pipeline (mandatory):* sculpted source required, retopology,
    bake/cage settings recorded in `delivery.json`, texel-density targets per class
    (towers/structures ≥512 px/m, bosses ≥512 px/m via 4096² UV or 2048² + tiled detail
    with up to 6 material regions, enemies ≥256 px/m, environment tiling ≥256 px/m),
    LOD switch distances 15 m / 35 m.
  - *Scene-level budgets (worst case: 110 enemies + full tower roster):* texture memory
    ≤384 MB at LOD0, draw calls ≤300 (horde) / ≤150 (towers & structures),
    ≤96 live particles per weapon system / ≤400 total, overdraw <3×.
  - *Shared tower materials and close-up requirements* and *Shared tower motion, nodes
    and sockets* — the boilerplate sections moved out of the 50 tower briefs (see below).
- **RIGGING.md — new file.** Bone hierarchy and naming (`root→pelvis→spine_01→spine_02→
  neck→head`, limb/wing/jaw chains), joint budgets (enemies ≤32, bosses ≤64), frozen socket
  names (`attack_origin`, `fx_damage`, `fx_vibration`, `selection_anchor`, boss
  `impact_contact`, Queen `brood_exit_01/02`), deformation rules (two-bone wing membranes,
  rigid-bound carapace, no non-uniform bone scale), and gait math
  (stride = speed ÷ cycle rate; contact frames and `cycleSeconds`/`strideMeters` recorded
  per clip in `delivery.json`). TECHNICAL_CONTRACT.md's Animation section points to it as
  binding.
- **Template residue removed:**
  - `Seismic also needs fx_vibration` stripped from **45 non-seismic** tower briefs; the
    sentence remains only in the 5 seismic tower briefs, where it is correct.
  - `brood_release` removed from **boss-0.md and boss-1.md**; it remains only in
    **boss-2.md** (the Breach Queen), the only boss that uses it.
- **Boilerplate deduplicated:** the repeated "Materials and close-up requirements" and
  "Motion and sockets" shared text was removed from all **50 tower briefs** and replaced
  with a one-line reference to the contract sections above. Asset-specific delta sentences
  (feed drums, branch differences, etc.) were kept in each brief.
- **Palette binding:** a `Palette:` line with faction-appropriate ART_DIRECTION hexes was
  added to **107 briefs** (towers/structures/map-features/ui/vfx: human palette — charcoal
  steel `#303B42`, slate `#59656B`, olive `#6C7265`, titanium `#A5A9A0`, rubber `#171E23`,
  ochre `#B7955D`, sensor cyan `#8BB5C2`; enemies/bosses: bio palette — `#655F51`,
  `#353E3D`, `#958770`, `#4C3E37`; environment briefs mapped per file). The **6 audio
  briefs intentionally have no Palette line** — audio deliverables have no color.
- **Batch 1 expansions:** `towers/autocannon.md`, `enemies/enemy-0.md`,
  `structures/reactor.md`, `environment/basalt-ground.md` and
  `environment/basalt-outcrop.md` were expanded with full per-asset form specifications
  (massing, proportions, distinguishing geometry, material layers). All runtime IDs,
  dimensions, socket names and gameplay behavior are unchanged — visual spec only.
- **catalog.json:** `version` 1 → **2**, new `"briefsVersion": "2.0"`, still 113 assets.

## 2. Generator improvements (`src/assets.js`)

- Rewrote the procedural generator around the ART_DIRECTION palette (human set + bio set,
  sensor-cyan glow) with shared geometry/material pools retained.
- New component vocabulary: stepped turret chassis with bearing, apron, chamfered feet and
  bolts; barrel jackets and flared muzzles; feed routes; collars; pipe runs; sensor blisters.
- Distinct silhouettes per tower family (autocannon/quad-flak, railgun, missile, thermal,
  arc, mortar, drone, seismic), per enemy class (9 styles: Skitter, Wasp, Burrower, Bastion,
  Artillery, Brood carrier, Queen, Fault Eater, Walking Siege) and per structure
  (mine/generator/heat/vibration + reactor with octagonal foundation ring, buttress fins,
  cooling grilles, earthing straps).
- Tier/branch variants now differ by added mass and components (extra barrels, extended
  rails, additional drones/pylons/rings, ammunition modules) — not by tint.
- All runtime contracts preserved: exported names (`part`, `towerModel`, `enemyModel`,
  `featureModel`), root/`turret`/`abdomen`/`wing`/`drone` node names, `userData.turret` and
  `userData.legs` (6 leg groups per enemy), feature type mapping, boss scale 3.3, mine scale
  0.8, reactor early-return envelope. Verified structurally in Node against the node lookups
  `src/main.js` performs.

## 3. Exporter fix (`scripts/export-assets.js`)

**Finding:** the shipped model JSONs were origin-collapsed. `save()` called
`model.toJSON()` without `updateMatrixWorld()`, and three r180's `Object3D.toJSON` writes
`this.matrix` verbatim — so every exported mesh carried an identity/stale matrix (verified
empirically: first autocannon mesh translation `[0,0,0]` in the old export vs
`[0, 0.28, 0]` after update). The live game was never affected (it calls `src/assets.js`
directly), but the downloadable JSON assets were piles of geometry at the origin.

**Fix:** `save()` now calls `model.updateMatrixWorld(true)` before `toJSON()`. Inputs,
outputs and the manifest format are unchanged.

## 4. Triangle counts (exported JSON, before → after)

| Category | Files | Before | After | Delta |
|----------|------:|-------:|------:|------:|
| Towers | 50 | 91,660 | 238,804 | +147,144 |
| Structures | 5 | 7,684 | 14,860 | +7,176 |
| Enemies | 10 | 39,024 | 53,224 | +14,200 |
| Bosses | 3 | 14,168 | 20,280 | +6,112 |
| Map features | 6 | 6,660 | 12,316 | +5,656 |
| **Total** | **74** | **159,196** | **339,484** | **+180,288 (×2.13)** |

Bounding boxes (new exports): 0 zero-size files; all 50 towers have a 2.50 m footprint
(Z extends to 3.75–4.50 m only where barrels/rails overhang the base, per the briefs);
reactor Ø6.0 m by design; boss boxes include the 3.3× root scale. Old-export boxes are not
comparable — they were degenerate because of the exporter bug above.

## 5. Verification

- `npm run assets` — 74 model JSONs regenerated; all 74 parse; manifest length 74.
- `npm test` — **10/10 pass, 0 fail** (no test files were modified).
- `npm run build` — **succeeds** (vite production build, 11 modules).

## 6. Honest limitations

- Models are still **procedural primitive compositions**, not hand-sculpted AAA assets.
  They are denser and more differentiated than v1 (≈2.1× triangles, per-family silhouettes,
  palette-bound materials), but there is no sculpt/retopo/bake step, no real PBR texture
  work beyond the shared generated metal-surface texture, and no rigged animation — the
  briefs and RIGGING.md now specify that pipeline for future hand-made replacements.
- No visual/render review was performed; quality claims above are limited to measurable
  facts (triangle counts, bounding boxes, node-name contracts, test/build results).
