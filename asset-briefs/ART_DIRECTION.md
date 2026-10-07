# Breach Command — shared art direction

## Intent and authority

This is the production brief for replacement assets. The existing procedural meshes and screenshots are placeholders, not approved art references. The user rejected childish/toy-like forms, primitive-looking geometry, flat colors, absent shading, pixel art, line art and box-art presentation. Do not reproduce those shortcomings in a more expensive render.

The quality reference is **StarCraft, particularly StarCraft II's cohesive, detailed, readable RTS production art**. Use it to understand silhouette design, material definition, functional mechanical detail, animation and battlefield clarity. Create original designs; do not copy recognizable units, faction symbols, meshes, textures or audio. This benchmark concerns craftsmanship, not a mandate for photoreal photography or maximum polygon count.

Confirmed direction: realistic military machinery, cool technological sophistication, exaggerated functional silhouettes, detailed surfaces and credible construction. Restrained saturation; neither rainbow faction colors nor pervasive neon. Grounded sci-fi with a threatening biological opponent. Readability and visual sophistication must both survive a freely moving 3D camera.

Detailed object concepts, measurements, timings, material colors and budgets in individual briefs are proposed art decisions that turn this direction into a usable specification. They are not additional user-approved gameplay mechanics. Gameplay IDs and existing behavior are authoritative; flag a suggested visual that implies a new mechanic rather than changing gameplay to match it.

## World and emotional character

A remote industrial mining colony operates on a basaltic exoplanet. Ground vibration wakes a subterranean ecosystem. The colony's military hardware is field-deployable machinery: engineered, serviced, weathered and dangerous. It should feel heavy enough to need transport and assembly. Organisms are adapted to mineral abrasion, underground vibration and hostile surface conditions. They are not cheerful bugs or randomly ornamented fantasy demons.

The dominant experience is military command and calculated expansion under increasing swarm pressure. The reactor is the visual anchor. Infrastructure establishes a coherent colony; weapons have identifiable combat jobs. Biological silhouettes remain legible amid smoke, dust, terrain and overlapping units.

## Human faction design grammar

Primary forms: cast or welded armor housings with chamfered edges, reinforced load paths, purposeful ribs, shielded joints, protected service panels and mechanically credible actuators. Secondary forms: ammunition feed, power routing, cooling, optics, mounting hardware, access latches. Tertiary detail: recessed fasteners, engraved seams, mild edge wear, readable warning decals. Do not paste bolts uniformly over every surface. A detail should explain manufacture, function or use.

Use consistent base hardware across the arsenal: compatible anchor feet, bearing rings, power connectors and fastening standards. Preserve family identity across upgrades. Different weapons need different masses and proportions, not the same chassis with a swapped color.

Target palette: charcoal steel (#303B42), slate armor (#59656B), muted olive (#6C7265), warm titanium (#A5A9A0), dark rubber (#171E23). Small safety accents in faded ochre (#B7955D). Cool sensor/emitter indicators can use muted blue-cyan (#8BB5C2), sparingly. These are guide values, not baked lighting or the only possible colors. Critical information must also be conveyed by form and animation.

Paint has roughness variation, abrasion around contacts, heat discoloration at exhausts, and dust in plausible recesses. Bare conductive metal, ceramic coatings, rubber, glass and paint have different physical responses. Avoid universal shiny plastic, random rust on new surfaces, uniform grunge, baked specular streaks and mirror-chrome everywhere.

## Biological faction design grammar

Shared anatomy: interlocking mineralized carapace plates over elastic, fibrous tissue; articulated limbs; visible joint protection; limited bioluminescence only where a sensory or physiological function warrants it. Shells can be layered, chipped and striated like worn horn and rock. Soft tissue is restrained, not wet everywhere.

Target palette: mineral gray-brown (#655F51), charcoal shell (#353E3D), warm horn (#958770), fibrous umber (#4C3E37), limited desaturated sensory cyan or amber. Use value, silhouette and movement to separate roles. An armored brute is squat and plated; a runner has directional motion and lighter joints; a carrier's payload is unmistakable. Do not scale one insect mesh into every class. Bosses require new anatomy and animation, not enlarged common units.

Heat seekers have purposeful sensory pits or antennae; vibration seekers have ground-coupled limbs and sensory structures. A signal trait is a family resemblance rather than a giant glowing label. Keep the body's threat understandable when indicators are off.

## Environment and light

Basalt, compacted mineral dust, fractured outcrops, extraction scars and restrained traces of abandoned industrial work. Terrain pieces must support procedural assembly without creating an authored road. No decorative road should imply enemies must follow it. Surface microdetail cannot substitute for sculpted landform variation and credible rock morphology.

Preview in neutral studio light AND the actual game's warm key/cool fill environment. Deliver unlit material maps; do not bake the current sun, shadow or fog into albedo. Lighting needs material separation and readable silhouettes in both portrait and landscape, with exposure that avoids crushed machinery and glowing chalk-white emitters.

## Readability at three distances

1. Normal play: tower family, enemy role, upgrade silhouette and imminent threat are distinguishable without reading labels.
2. Maximum allowed close zoom: convincing surfaces, silhouette curvature, joins, mechanical motion and texture detail; no obvious primitive assembly or blurry baked screenshot surfaces.
3. Distant overview: quiet microdetail, clear major shapes, restrained effects. UI communicates selectable objects without coating everything in an opaque outline.

Every model must work from all azimuths. Front-only concept tricks, billboard units and pre-rendered isometric sprites cannot replace a final free-camera 3D asset.

## Required reference package

For each asset, produce a front/side/top design sheet, neutral material render, gameplay-camera render, silhouette thumbnail and short motion preview where animated. Keep actual exported models alongside those views. A beautiful concept painting is a design reference, not a finished game asset. Record the source/tool/version and asset dependencies.

## Failure conditions

Reject basic boxes/cylinders visibly standing in for final hulls; smooth toy pebbles for terrain; repeated identical insect bodies across roles; plastic materials; overbright neon; exaggerated cute faces; floating unsupported mechanisms; invented muzzle placement; undifferentiated upgrades; unreadable VFX; or a hero render that cannot survive import into the game. Optimization may reduce hidden detail and use normal maps, but must preserve the agreed appearance.
