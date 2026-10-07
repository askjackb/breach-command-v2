# Rigging and locomotion specification (binding)

Read with [ART_DIRECTION.md](ART_DIRECTION.md) and [TECHNICAL_CONTRACT.md](TECHNICAL_CONTRACT.md). This file is the single source for creature rig structure, naming, deformation and gait math. Per-asset briefs specify anatomy; this file specifies how that anatomy must be boned and animated.

## Bone hierarchy and naming

All rigs use a single root and predictable, lower-case, underscore-separated names. The hierarchy for ground creatures is:

```
root
└── pelvis
    ├── spine_01
    │   └── spine_02
    │       ├── neck
    │       │   └── head
    │       ├── limb_F_L_01 → limb_F_L_02 → limb_F_L_03 (front-left leg chain)
    │       └── limb_F_R_01 → limb_F_R_02 → limb_F_R_03 (front-right leg chain)
    ├── limb_M_L_01 → … (mid legs, six-limbed classes)
    ├── limb_M_R_01 → …
    ├── limb_B_L_01 → … (back legs)
    └── limb_B_R_01 → …
```

- Six-limbed classes use F/M/B (front/mid/back) pairs; four-limbed classes use F/B only. Winged classes add `wing_L_01 → wing_L_02` and `wing_R_01 → wing_R_02` branching from `spine_02`. Burrowing classes add a dedicated `jaw` or `bore_head` chain from `head` where the brief requires excavation.
- Socket empties (`attack_origin`, `fx_damage`, `fx_vibration`, `selection_anchor`, boss `impact_contact`, Queen `brood_exit_01/02`) are bones or empties named exactly as in the briefs — never renamed per asset.
- Names are stable across LODs of the same asset: LOD1/LOD2 may drop twist/helper bones but never rename or reparent the primary chains.

## Joint budgets

- Ordinary enemies: **≤ 32 joints total** (a six-limb gait rig uses 18 limb joints + 4 spine/neck/head + sockets' parent bones within this budget).
- Bosses (hero rigs): **≤ 64 joints total**, allowing extra spine segments, jaw chains and brood-chamber bones.
- Structures/towers are node-animated (see contract hierarchy `root/base/turret/weapon_pitch`); skeletal skinning is not required, but moving parts must be separate nodes with pivots at their real rotation axes.

## Skinning and deformation

- Weight transitions must be gradual (no single-vertex rigid blocks at limb roots); joint bends collapse on the inside of the bend and stretch on the outside — paint weights accordingly and check at full gait extension.
- **Wing membranes** (Wasp and any membrane surface): membrane is skinned to a minimum two-bone chain per wing so the surface can cup and fold; the membrane's trailing edge must not detach from the rear wing bone at full flap amplitude. Double-sided material is permitted for membranes only.
- **Gripping/climbing limbs** (Climber): the terminal segment of each leg must be an independent bone (`limb_*_03`) capable of planter-flexion so feet can visibly close on a surface; contact poses in the climb cycle are keyed, not procedural guesses.
- Carapace plates that overlap joints are rigid-bound to the nearest bone (100% weight) so they slide over, never stretch with, the underlying tissue.
- No bone may scale non-uniformly in any delivered clip.

## Gait math and contact frames

Locomotion clips must be authored so playback speed can be matched to simulation speed without foot sliding:

- **Stride length = simulation speed ÷ cycle rate.** For each class, the brief's baseline speed and the clip's cycle duration define the stride: e.g. Skitter at 3.2 m/s with a 0.5 s gait cycle must travel 1.6 m per cycle, and foot contacts must be planted for the stance portion of that cycle at exactly that rate.
- Every locomotion clip must declare, in `delivery.json`: `cycleSeconds`, the derived `strideMeters` at the class baseline speed, and the **contact frames** (frame numbers where each foot is planted) for at least one full cycle.
- Feet must be stationary relative to the ground during stance at the declared stride rate — zero visible skating is the acceptance bar at normal gameplay zoom.
- Root motion is removed from clips (simulation drives translation); the pelvis may bob/roll within ±10% of body height but must return to neutral at cycle wrap so loops close invisibly.

## Clip-speed recording requirement

`delivery.json` for every creature must record, per clip: duration in seconds, loop flag, contact/event timestamps (attack contact, brood release, impact), and the locomotion cycle data above. An asset delivered without clip-speed and contact-frame data is incomplete and fails the gate, regardless of visual quality.

## Structure animation notes

Towers and structures animate via node transforms: turret yaw on `turret`, elevation on `weapon_pitch`, recoil as a short translation of the weapon subgroup along its fire axis that settles without overshoot. The Seismic family's driver (see Seismic briefs) additionally drives the `fx_vibration` socket timing from the impact frame of its `fire` clip.
