# Autocannon — base configuration

Asset ID: `autocannon`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Current export: `public/assets/models/autocannon.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and vibe

A field-deployable twin-feed kinetic sentry: a compact armored bearing supports two long, purposeful cannon assemblies. It looks like a military machine capable of thousands of sustained rounds, rather than a toy gun mounted on a disk. This asset is the base configuration, not an interchangeable skin.

## Gameplay identity

Runtime type: `autocannon`; tier: 0; branch: null. Role: Rapid kinetic fire · ground & air. Current baseline firing interval: 0.32 seconds; range: 10 scene units. These describe visual timing/context, not permission to rebalance damage or targeting. Keep the operating silhouette legible during real-time play.

## Silhouette and construction

Low broad stabilization feet, a protected central yaw bearing, a stepped turret shoulder, two clearly separated forward barrels and armored ammunition feed routes. The barrels carry the directional silhouette; the rear ammunition volume balances them.

Base twin cannon with compact feed bins and four anchored feet.

Establish the family silhouette and pivot layout here before producing its upgrades. The four later variants must clearly belong to this machine.

### Detailed form specification

**Massing (share of visual mass, bottom to top):** foundation ring and levelling feet ~25%, yaw bearing and turret shoulder ~30%, twin cannon assemblies and feed system ~45%. Nothing above the bearing line is wider than the turret block except the muzzle collars; the weapon's length carries the silhouette, the rear ammunition volume balances it.

**Proportions (within the unchanged 2.4 m × 2.5 m × 2.1 m envelope):** base plate 2.5 m diameter, 0.18 m thick, sitting on four radial feet that stop 0.15 m short of the plate edge. Yaw bearing: stepped cylinder, 1.5 m lower diameter stepping to 1.15 m, 0.45 m tall, with a visible slew ring and grease-darkened seam. Turret block: 1.25 m wide × 1.5 m deep × 0.75 m tall, shoulders chamfered 30–50 mm at 45°, front face sloped ~15° to shed the recoil line. Barrels: two, centers ±0.30 m from the centerline, 1.35 m from breech face to muzzle (overhang beyond the plate is permitted and expected), outer diameter 0.16 m at the jacket stepping to 0.11 m at the muzzle collar.

**Distinguishing geometry:** (1) twin recoil sleds — each barrel rides in an open channel rail visible in side profile, with the recoil stroke readable as a gap behind the breech at rest; (2) ammunition feed chutes curve from two rear drums (0.55 m diameter, mounted at the turret's rear third) forward into each breech in a shallow S-curve — armored, segmented covers, never straight naked belts; (3) muzzle collars are flared, replaceable, and 0.1 m longer than the jacket diameter step; (4) elevation actuators sit outside the turret cheeks, piston rods at ±0.55 m; (5) a low sensor blister on the turret roof, offset left of center, with a single restrained status light. Tier variants must change these masses (drum size, sled reinforcement, barrel sleeves), never only tint.

## Materials and close-up requirements

Include barrel jackets, replaceable muzzle collars, recoil slides, feed covers, accessible maintenance latches, elevation actuators and barrel heat staining. Plate thickness, joins and weld locations must be credible. Avoid a collection of unconnected cylinders. Shared finishes, chamfer and close-up standards: [technical contract](../TECHNICAL_CONTRACT.md) § Shared tower materials and close-up requirements.

## Motion and sockets

Alternate left/right recoil, short chassis vibration, spent-case ejection from a consistent socket and a subtle feed mechanism. Fire is rapid, so recoil must settle or blend cleanly without a full exaggerated body bounce. Required nodes, sockets and clips are defined once in the contract. Shared nodes, sockets and clips: [technical contract](../TECHNICAL_CONTRACT.md) § Shared tower motion, nodes and sockets.

## Size and deliverables

Proposed size: 2.4 m wide, 2.5 m deep, 2.1 m high; barrel overhang may extend beyond the circular base without changing collision. Keep the ground-centered root fixed across this family. Deliver `model.glb`, two optimized LODs, editable source, complete PBR textures, socket/clip metadata and front/side/top, silhouette, neutral-light and in-engine previews under `public/assets/replacements/autocannon/`. Starting tower budgets are in the technical contract; they are not an excuse for crude geometry.

## Generation instruction

Create an original realistic military sci-fi autocannon for Breach Command, specifically base configuration. Follow the physical construction and stage differences above. Produce a full-angle usable 3D asset with materials and moving parts; if your tool only makes images, label its output concept/reference and report the missing model work. No StarCraft unit copying, neon trim blanket, smooth toy casing, flat-color primitive assembly, baked shadows or pre-rendered billboard substitution.

## Acceptance checks

At equal camera and lighting, distinguish this family from its siblings. Show the mechanism firing from the correct socket, verify the upgrade footprint is unchanged, and show its back and underside joins. Reject unreadable upgrades or sophisticated concept art whose exported model loses its quality.
