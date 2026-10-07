# Cryo projector weapon presentation

Asset ID: `weapon-cryo`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Additional production asset; requires the integration described in the shared guide.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Intended visual event

A focused cold vapor stream, small ice particles and localized frost feedback on slowed enemies. This is the visual package for `cryo`, tied to its current firing interval of 0.6 seconds. The tower model must provide an origin socket; effects cannot emerge from the tower center by default.

## Timing and composition

Stream pulse around 0.2–0.4 s, frost state follows actual slow duration. Avoid an opaque white cloud or whole-body solid-blue recolor. Scale the effect relative to a 2.5 m tower and 1–3 m ordinary organism. Emphasize a readable origin, travel/direction if appropriate, and contact. Keep mechanical recoil separate from particles. Branch variations must support the corresponding tower brief without silently changing hit logic.

## Palette and material

Use realistic heat, mineral dust, sparks or restrained cool electrical/cold tones as appropriate. Brightness is localized and brief; no neon blanket, constant bloom or cartoon starbursts. Dark smoke needs enough translucency and contrast not to obscure selection.

## Deliverables

Provide source, required atlas/flipbook or mesh assets, sprite-frame metadata, timing curve, opacity/blend recommendations, attachment socket and impact variant list. Use `public/assets/replacements/weapon-cryo/`. Demonstrate repeated firing and mixed weapons in a mobile-sized view, not only one enlarged hero effect. Include at least three subtle randomized contact variants when relevant.

## Integration and acceptance

Current rendering uses trace lines/sphere flashes. A new effect adapter must follow `shot` events and simulation targets; cosmetic projectiles must not add damage. Cap particles and persistent trails during endless waves, recycle resources, and measure transparency cost. Reject missing origin/contact logic, visually claimed extra hits, opaque battlefield coverage and inconsistent scales.
