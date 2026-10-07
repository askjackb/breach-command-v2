# Breach Command

A local-first, mobile-adaptive 3D endless tower defense game. Establish a mining colony on a procedurally generated battlefield, manipulate biological enemies with heat and vibration, and survive successive boss cycles.

## Play online

https://jackbauertv24-droid.github.io/breach-command/

GitHub Actions builds and deploys the game to GitHub Pages on each push to `main`.

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

Open the printed URL. To build a deployable static distribution:

```sh
npm run build
npx vite preview --host 0.0.0.0
```

No backend, account, purchased assets, or external runtime asset requests. Dependencies are bundled at build time. Run `npm test` for simulation and navigation regression checks.

## Play

- Protect the central reactor. Destruction ends the run; a new run creates a new map and resets your colony.
- Waves advance automatically. Every tenth wave includes a boss; defeating it continues the run.
- Start with autocannon, missile battery and cryogenic projector. Choose research rewards between waves without pausing. Unlock other weapons or improve combat, economy and commander abilities.
- Place structures continuously on valid terrain within colony territory. Confirm construction; structures take time to assemble. Territory expands every five waves.
- Mining and kills earn alloy. Generators provide power capacity. Structures cost alloy and reserve power.
- Mining creates vibration; firing generates heat. Signal-specific decoys attract matching enemies. Trackers ignore decoys. Use the Signals overlay to see signals and current intentions.
- Enemies navigate around rocks; ground enemies attack obstructing structures. Climbers, burrowers and fliers bypass tower obstructions.
- Select structures to repair, upgrade or sell for a partial refund. Towers have three upgrade stages with two mutually exclusive final specializations.
- Select map features to activate seismic beacons, coolant vents, volatile deposits, power relays, fractured formations and salvage crawlers.
- Orbital strike and field repair require a terrain target. Overdrive activates immediately. Research improves all three abilities during a run.

Desktop: drag to orbit, right-drag to pan, wheel to zoom. Touch: one finger rotates; two fingers pan, pinch to zoom and twist to rotate. Tap selects or places a construction preview. Camera tilt and zoom are bounded. Portrait and landscape interfaces adapt without pausing gameplay.

Only settings-independent unlock metadata and records persist locally. Tactician unlocks after defeating one boss; Prospector unlocks at wave five. No active run is saved. Closing/reloading abandons it.

## Content and assets

10 tower families, 10 enemy archetypes, 3 boss families, 3 upgradeable commander abilities, 6 interactive map features. Bosses include area-damage, ranged siege and brood-spawning behaviors. Difficulty and combinations escalate; the initial map is finite and territory eventually reaches its boundary.

All game art is produced for this project:

- `src/assets.js`: original procedural 3D model construction, materials and articulated components.
- `public/assets/models/`: 74 exported Three.js ObjectLoader-compatible models, including tower tiers and final branches, support structures, enemies, bosses and map features.
- `public/assets/basalt.png`: AI-generated terrain albedo, also used on rock surfaces.
- `public/assets/metal-surface.png`: original deterministic surface texture for industrial models.
- `public/assets/manifest.json`: exported model inventory.
- Weapon sounds are synthesized with Web Audio; no sampled library.

Regenerate models with `npm run assets`. Runtime constructs models from the same source and instances enemy components to reduce draw calls. Exported models are provided for inspection/reuse, rather than downloading redundant model JSON during gameplay.

## Verification and limits

This is a playable first implementation, **not a claim of finished AAA or StarCraft-quality production art**. It needs visual review, balancing, animation refinement, deeper audio, material authoring and real-device performance profiling. Terrain has surface detail and towers/enemies have mechanical/articulated geometry, but there are no hand-sculpted production meshes or baked PBR material sets. Ambient soundtrack, cinematic presentation and campaign are absent.

Headless Chromium checks cover desktop, portrait and landscape layouts, startup, construction UI, signal toggle and commander activation. Screenshots are in `artifacts/`. Simulation tests cover map determinism, continuous placement, economy/power constraints, signal targeting, upgrades, boss scheduling, navigation and sustained combat. Headless checks are not an iPhone 17 performance certification; 30 FPS on that device remains unverified. Multi-touch twist is implemented but needs real-device usability validation.

The procedural generator protects the starting area and distributes map features; it does not yet certify the tactical quality of every generated map. There is no indefinitely expanding terrain. Enemy population is capped at 110 and later challenge comes from scaling and combinations. Power capacity gates construction; loss of generation shuts down structures beyond available capacity, in construction order. Commander research points feed a three-tier specialization tree for each ability.

## Source map

`src/sim.js`: engine-independent simulation. `src/pathfinding.js`: deterministic terrain navigation. `src/data.js`: roster/balance. `src/assets.js`: models/materials. `src/main.js`: rendering, input, UI/audio. `src/style.css`: adaptive HUD.

To repeat browser QA, run `npm run build`, start `npx vite preview --port 5174` in another terminal, install Chromium with `npx playwright install chromium`, then run `node scripts/browser-qa.js`.

## Replacement asset production briefs

See [asset-briefs/README.md](asset-briefs/README.md) for individual concepts and instructions for every current model and shared production package, including the art direction, delivery contract, quality gate and integration plan. Replacement files can be delivered incrementally; the current renderer needs a GLB/animation adapter before new deliveries become visible in the game.
