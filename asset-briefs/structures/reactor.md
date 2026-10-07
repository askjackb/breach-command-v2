# Command reactor

Asset ID: `reactor`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Current export: `public/assets/models/reactor.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept, role and vibe

The colony anchor and run-ending objective: a protected compact fusion/industrial command core, heavy enough to establish the scene hierarchy. Original military-industrial design; understated, detailed and physically convincing.

## Required silhouette

A broad circular reinforced foundation, shielded reactor body, segmented external armor and a protected command/service crown. It must remain recognizable among ten tower families and enemy swarms. Apply consistent colony construction standards, bearing/fastener language and grounded proportions. This structure must be recognizable without a UI label.

## Material and detail specification

Reactor confinement rings, removable armor panels, access ladder/maintenance hatch, protected power trunks, credible cooling outlets and modest status lighting. Avoid a plain cylinder with glowing rings. Use differentiated painted metal, rubber/insulation, bare moving surfaces and appropriate thermal materials. Wear follows work, handling and ground exposure; do not distribute random rust or noise uniformly. All sides need completed surfaces and join logic.

### Detailed form specification

**Massing (unchanged 6 m base diameter, ~4.6 m overall height):** roughly 60% of the visual mass sits below half height — a grounded industrial stack, not a tower. Read bottom-up: foundation ring → armored body → service crown → status ring.

**Proportions:** foundation ring 6.0 m diameter, 0.8 m tall, octagonal with chamfered 45° transitions between facets and a recessed dark service trench at ground contact. Body: cylinder 3.6 m diameter, 2.6 m tall, plated with eight vertical armor panels (each ~1.4 m wide) with 0.04 m gaps at the seams and visible weld beads at the base ring. Mid-height cooling band: a 0.5 m tall recessed ring carrying six vertical outlet grilles (slate) spaced evenly, none of them luminous. Crown: service ring 2.6 m diameter, 0.5 m tall, topped by a shallow truncated cone (top diameter 1.6 m) with a central inspection cap; the status light band wraps the crown as a recessed groove, luminous only in small segments.

**Distinguishing geometry:** (1) six buttress fins radiate from the foundation ring at 60° intervals, 0.9 m tall, triangular in side profile, merging into the body panels — these carry the silhouette at gameplay distance; (2) two pipe runs climb the body at 180° apart, elbowed at the cooling band, with flange rings every 0.65 m; (3) one recessed maintenance hatch (1.1 m × 0.7 m) on the body front with a wheel handle and stenciled markings; (4) earthing straps drop from the crown to two foundation anchor blocks. No antenna forest, no exposed glowing core — the reactor reads as heavy sealed machinery.

## Animation and state requirements

Steady low mechanical activity and subtle operating light; damage creates localized sparking and cooling trouble. Destruction is a readable core failure with a brief protected flash, debris and a lasting ruined shell. No endless blinding explosion. Named clips: `idle`, `construct`, `damaged_idle`, `destroy`. Socket inventory: `fx_core`, `fx_heat`, `fx_damage`, `audio_origin`, `selection_anchor`. Support structures have no tower upgrade variants in the current game; do not invent upgrade assets or attack mechanics for them.

## Scale, packaging and integration

Proposed envelope: 6 m base diameter, roughly 4.6 m height. Keep `root` at ground-contact center; +Y up, +Z forward. Produce opaque PBR materials and an economical LOD chain. Deliver GLB, editable source, textures, animated previews and `delivery.json` under `public/assets/replacements/reactor/`. Current factory key is `reactor`; imported operation clips need an adapter, not the current generic turret animation.

## Agent instruction and acceptance

Create the final 3D production candidate, not just a concept image. Review its industrial function from normal camera distance and its seams/materials at near zoom. Provide a damaged and destroyed presentation that preserves gameplay readability. Reject smooth geometric stand-ins, plastic finishes, cartoon proportions and unmotivated flashing lights.
