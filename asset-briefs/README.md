# Breach Command — asset production briefs

This folder is the handoff for generating replacement game assets. The target is detailed, realistic military sci-fi machinery and biological opponents with StarCraft-level RTS craftsmanship and readability. Existing meshes are placeholders, not an approved aesthetic.

## Read first

1. [Shared art direction](ART_DIRECTION.md) — confirmed intent, original visual grammar and explicit rejection criteria.
2. [Technical delivery contract](TECHNICAL_CONTRACT.md) — GLB/PBR/animation conventions, proposed mobile budgets and staging layout.
3. [Quality gate](QUALITY_GATE.md) — how to prove appearance and runtime suitability.
4. [Integration guide](INTEGRATION.md) — exact current IDs, loader/rendering changes and metadata example.
5. [Production order](PRODUCTION_ORDER.md) — start with a coherent reviewed batch.

There are **113 individual briefs**, covering **all 74 current model exports** plus shared environment, VFX, UI and audio production packages. Each of the five tower visual states has its own brief. Kits enumerate their expected members in their document and must list individual delivery filenames. [catalog.json](catalog.json) provides machine-readable IDs and paths.

## Instructions for the producing agent

Read the shared documents and the selected asset's brief before creating anything. Preserve the runtime ID. Produce original full-angle 3D assets, working material sets and animation where specified; concept images alone are not model deliveries. If your tools cannot produce a requested format, report the missing stage instead of substituting a primitive or claiming completion. Stage files and evidence under public/assets/replacements/<asset-id>/ and label them candidate until reviewed. Keep editable source and honest limitations.

The proposed dimensions, budgets and detailed concept decisions make the brief actionable but are not new approved gameplay mechanics. Preserve current combat behavior. Do not copy StarCraft unit designs; its role here is quality reference. The current game does not automatically load new GLB files; use the integration guide when replacements arrive.

## towers (50)

| Asset ID | Brief | Current export / status |
| --- | --- | --- |
| `autocannon` | [Autocannon — base configuration](towers/autocannon.md) | Existing placeholder replacement |
| `autocannon-tier1` | [Autocannon — upgrade 1](towers/autocannon-tier1.md) | Existing placeholder replacement |
| `autocannon-tier2` | [Autocannon — upgrade 2](towers/autocannon-tier2.md) | Existing placeholder replacement |
| `autocannon-tier3-0` | [Autocannon — upgrade 3 / Sabot](towers/autocannon-tier3-0.md) | Existing placeholder replacement |
| `autocannon-tier3-1` | [Autocannon — upgrade 3 / Cyclone](towers/autocannon-tier3-1.md) | Existing placeholder replacement |
| `railgun` | [Railgun — base configuration](towers/railgun.md) | Existing placeholder replacement |
| `railgun-tier1` | [Railgun — upgrade 1](towers/railgun-tier1.md) | Existing placeholder replacement |
| `railgun-tier2` | [Railgun — upgrade 2](towers/railgun-tier2.md) | Existing placeholder replacement |
| `railgun-tier3-0` | [Railgun — upgrade 3 / Lance](towers/railgun-tier3-0.md) | Existing placeholder replacement |
| `railgun-tier3-1` | [Railgun — upgrade 3 / Repeater](towers/railgun-tier3-1.md) | Existing placeholder replacement |
| `missile` | [Missile battery — base configuration](towers/missile.md) | Existing placeholder replacement |
| `missile-tier1` | [Missile battery — upgrade 1](towers/missile-tier1.md) | Existing placeholder replacement |
| `missile-tier2` | [Missile battery — upgrade 2](towers/missile-tier2.md) | Existing placeholder replacement |
| `missile-tier3-0` | [Missile battery — upgrade 3 / Cluster](towers/missile-tier3-0.md) | Existing placeholder replacement |
| `missile-tier3-1` | [Missile battery — upgrade 3 / Barrage](towers/missile-tier3-1.md) | Existing placeholder replacement |
| `flak` | [Flak battery — base configuration](towers/flak.md) | Existing placeholder replacement |
| `flak-tier1` | [Flak battery — upgrade 1](towers/flak-tier1.md) | Existing placeholder replacement |
| `flak-tier2` | [Flak battery — upgrade 2](towers/flak-tier2.md) | Existing placeholder replacement |
| `flak-tier3-0` | [Flak battery — upgrade 3 / Shrapnel](towers/flak-tier3-0.md) | Existing placeholder replacement |
| `flak-tier3-1` | [Flak battery — upgrade 3 / Interceptor](towers/flak-tier3-1.md) | Existing placeholder replacement |
| `incinerator` | [Incinerator — base configuration](towers/incinerator.md) | Existing placeholder replacement |
| `incinerator-tier1` | [Incinerator — upgrade 1](towers/incinerator-tier1.md) | Existing placeholder replacement |
| `incinerator-tier2` | [Incinerator — upgrade 2](towers/incinerator-tier2.md) | Existing placeholder replacement |
| `incinerator-tier3-0` | [Incinerator — upgrade 3 / Inferno](towers/incinerator-tier3-0.md) | Existing placeholder replacement |
| `incinerator-tier3-1` | [Incinerator — upgrade 3 / Pressure](towers/incinerator-tier3-1.md) | Existing placeholder replacement |
| `arc` | [Arc emitter — base configuration](towers/arc.md) | Existing placeholder replacement |
| `arc-tier1` | [Arc emitter — upgrade 1](towers/arc-tier1.md) | Existing placeholder replacement |
| `arc-tier2` | [Arc emitter — upgrade 2](towers/arc-tier2.md) | Existing placeholder replacement |
| `arc-tier3-0` | [Arc emitter — upgrade 3 / Conduit](towers/arc-tier3-0.md) | Existing placeholder replacement |
| `arc-tier3-1` | [Arc emitter — upgrade 3 / Capacitor](towers/arc-tier3-1.md) | Existing placeholder replacement |
| `cryo` | [Cryo projector — base configuration](towers/cryo.md) | Existing placeholder replacement |
| `cryo-tier1` | [Cryo projector — upgrade 1](towers/cryo-tier1.md) | Existing placeholder replacement |
| `cryo-tier2` | [Cryo projector — upgrade 2](towers/cryo-tier2.md) | Existing placeholder replacement |
| `cryo-tier3-0` | [Cryo projector — upgrade 3 / Permafrost](towers/cryo-tier3-0.md) | Existing placeholder replacement |
| `cryo-tier3-1` | [Cryo projector — upgrade 3 / Compression](towers/cryo-tier3-1.md) | Existing placeholder replacement |
| `mortar` | [Mortar — base configuration](towers/mortar.md) | Existing placeholder replacement |
| `mortar-tier1` | [Mortar — upgrade 1](towers/mortar-tier1.md) | Existing placeholder replacement |
| `mortar-tier2` | [Mortar — upgrade 2](towers/mortar-tier2.md) | Existing placeholder replacement |
| `mortar-tier3-0` | [Mortar — upgrade 3 / Seismic shell](towers/mortar-tier3-0.md) | Existing placeholder replacement |
| `mortar-tier3-1` | [Mortar — upgrade 3 / Autoloader](towers/mortar-tier3-1.md) | Existing placeholder replacement |
| `drone` | [Drone hangar — base configuration](towers/drone.md) | Existing placeholder replacement |
| `drone-tier1` | [Drone hangar — upgrade 1](towers/drone-tier1.md) | Existing placeholder replacement |
| `drone-tier2` | [Drone hangar — upgrade 2](towers/drone-tier2.md) | Existing placeholder replacement |
| `drone-tier3-0` | [Drone hangar — upgrade 3 / Heavy drones](towers/drone-tier3-0.md) | Existing placeholder replacement |
| `drone-tier3-1` | [Drone hangar — upgrade 3 / Swarm bay](towers/drone-tier3-1.md) | Existing placeholder replacement |
| `seismic` | [Seismic driver — base configuration](towers/seismic.md) | Existing placeholder replacement |
| `seismic-tier1` | [Seismic driver — upgrade 1](towers/seismic-tier1.md) | Existing placeholder replacement |
| `seismic-tier2` | [Seismic driver — upgrade 2](towers/seismic-tier2.md) | Existing placeholder replacement |
| `seismic-tier3-0` | [Seismic driver — upgrade 3 / Faultline](towers/seismic-tier3-0.md) | Existing placeholder replacement |
| `seismic-tier3-1` | [Seismic driver — upgrade 3 / Resonance](towers/seismic-tier3-1.md) | Existing placeholder replacement |

## structures (5)

| Asset ID | Brief | Current export / status |
| --- | --- | --- |
| `reactor` | [Command reactor](structures/reactor.md) | Existing placeholder replacement |
| `mine` | [Mining rig](structures/mine.md) | Existing placeholder replacement |
| `generator` | [Power plant](structures/generator.md) | Existing placeholder replacement |
| `heat` | [Heat decoy](structures/heat.md) | Existing placeholder replacement |
| `vibration` | [Seismic lure](structures/vibration.md) | Existing placeholder replacement |

## enemies (10)

| Asset ID | Brief | Current export / status |
| --- | --- | --- |
| `enemy-0` | [Skitter](enemies/enemy-0.md) | Existing placeholder replacement |
| `enemy-1` | [Bastion](enemies/enemy-1.md) | Existing placeholder replacement |
| `enemy-2` | [Razor](enemies/enemy-2.md) | Existing placeholder replacement |
| `enemy-3` | [Burrower](enemies/enemy-3.md) | Existing placeholder replacement |
| `enemy-4` | [Climber](enemies/enemy-4.md) | Existing placeholder replacement |
| `enemy-5` | [Wasp](enemies/enemy-5.md) | Existing placeholder replacement |
| `enemy-6` | [Artillery](enemies/enemy-6.md) | Existing placeholder replacement |
| `enemy-7` | [Mender](enemies/enemy-7.md) | Existing placeholder replacement |
| `enemy-8` | [Tracker](enemies/enemy-8.md) | Existing placeholder replacement |
| `enemy-9` | [Brood carrier](enemies/enemy-9.md) | Existing placeholder replacement |

## bosses (3)

| Asset ID | Brief | Current export / status |
| --- | --- | --- |
| `boss-0` | [THE FAULT EATER](bosses/boss-0.md) | Existing placeholder replacement |
| `boss-1` | [THE WALKING SIEGE](bosses/boss-1.md) | Existing placeholder replacement |
| `boss-2` | [THE BREACH QUEEN](bosses/boss-2.md) | Existing placeholder replacement |

## map features (6)

| Asset ID | Brief | Current export / status |
| --- | --- | --- |
| `feature-0` | [Seismic beacon](map-features/feature-0.md) | Existing placeholder replacement |
| `feature-1` | [Coolant vent](map-features/feature-1.md) | Existing placeholder replacement |
| `feature-2` | [Volatile deposit](map-features/feature-2.md) | Existing placeholder replacement |
| `feature-3` | [Power relay](map-features/feature-3.md) | Existing placeholder replacement |
| `feature-4` | [Fractured formation](map-features/feature-4.md) | Existing placeholder replacement |
| `feature-5` | [Salvage crawler](map-features/feature-5.md) | Existing placeholder replacement |

## environment (11)

| Asset ID | Brief | Current export / status |
| --- | --- | --- |
| `basalt-ground` | [Basalt battlefield surface](environment/basalt-ground.md) | Additional production package |
| `basalt-outcrop` | [Fractured basalt outcrop kit](environment/basalt-outcrop.md) | Additional production package |
| `mineral-ground-variation` | [Mineral dust and extraction surface variation](environment/mineral-ground-variation.md) | Additional production package |
| `breach-mouth` | [Enemy breach opening](environment/breach-mouth.md) | Additional production package |
| `construction-pad` | [Construction foundation and anchor set](environment/construction-pad.md) | Additional production package |
| `damage-debris` | [Damage and destruction debris kit](environment/damage-debris.md) | Additional production package |
| `colony-decals` | [Colony industrial decal atlas](environment/colony-decals.md) | Additional production package |
| `metal-surface` | [Industrial material library](environment/metal-surface.md) | Additional production package |
| `biological-materials` | [Biological material library](environment/biological-materials.md) | Additional production package |
| `drone-unit` | [Interceptor drone](environment/drone-unit.md) | Additional production package |
| `sky-atmosphere` | [Battlefield atmosphere and lighting reference](environment/sky-atmosphere.md) | Additional production package |

## vfx (13)

| Asset ID | Brief | Current export / status |
| --- | --- | --- |
| `weapon-autocannon` | [Autocannon weapon presentation](vfx/weapon-autocannon.md) | Additional production package |
| `weapon-railgun` | [Railgun weapon presentation](vfx/weapon-railgun.md) | Additional production package |
| `weapon-missile` | [Missile battery weapon presentation](vfx/weapon-missile.md) | Additional production package |
| `weapon-flak` | [Flak battery weapon presentation](vfx/weapon-flak.md) | Additional production package |
| `weapon-incinerator` | [Incinerator weapon presentation](vfx/weapon-incinerator.md) | Additional production package |
| `weapon-arc` | [Arc emitter weapon presentation](vfx/weapon-arc.md) | Additional production package |
| `weapon-cryo` | [Cryo projector weapon presentation](vfx/weapon-cryo.md) | Additional production package |
| `weapon-mortar` | [Mortar weapon presentation](vfx/weapon-mortar.md) | Additional production package |
| `weapon-drone` | [Drone hangar weapon presentation](vfx/weapon-drone.md) | Additional production package |
| `weapon-seismic` | [Seismic driver weapon presentation](vfx/weapon-seismic.md) | Additional production package |
| `ability-orbital-strike` | [Orbital strike](vfx/ability-orbital-strike.md) | Additional production package |
| `ability-overdrive` | [Weapon overdrive](vfx/ability-overdrive.md) | Additional production package |
| `ability-field-repair` | [Field repair](vfx/ability-field-repair.md) | Additional production package |

## ui (9)

| Asset ID | Brief | Current export / status |
| --- | --- | --- |
| `tower-icons` | [Tower icon set](ui/tower-icons.md) | Additional production package |
| `enemy-icons` | [Enemy and boss identification icons](ui/enemy-icons.md) | Additional production package |
| `commander-icons` | [Commander ability and tree icons](ui/commander-icons.md) | Additional production package |
| `resource-icons` | [Economy and status symbols](ui/resource-icons.md) | Additional production package |
| `signal-markers` | [Heat and vibration overlays](ui/signal-markers.md) | Additional production package |
| `selection-placement` | [Selection and construction indicators](ui/selection-placement.md) | Additional production package |
| `hud-surface-kit` | [Adaptive HUD visual kit](ui/hud-surface-kit.md) | Additional production package |
| `menu-title` | [Breach Command title treatment](ui/menu-title.md) | Additional production package |
| `map-feature-icons` | [Interactive map feature icons](ui/map-feature-icons.md) | Additional production package |

## audio (6)

| Asset ID | Brief | Current export / status |
| --- | --- | --- |
| `weapon-audio` | [Weapon sound library](audio/weapon-audio.md) | Additional production package |
| `creature-audio` | [Enemy and boss sound library](audio/creature-audio.md) | Additional production package |
| `colony-audio` | [Colony and interaction sounds](audio/colony-audio.md) | Additional production package |
| `commander-audio` | [Commander ability sounds](audio/commander-audio.md) | Additional production package |
| `ambience-music` | [Battlefield atmosphere and music](audio/ambience-music.md) | Additional production package |
| `interface-audio` | [Interface feedback](audio/interface-audio.md) | Additional production package |
