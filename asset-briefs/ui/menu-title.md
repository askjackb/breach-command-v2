# Breach Command title treatment

Asset ID: `menu-title`

Palette: charcoal steel `#303B42`, slate armor `#59656B`, muted olive `#6C7265`, warm titanium `#A5A9A0`, dark rubber `#171E23`; faded ochre `#B7955D` accents; sensor cyan `#8BB5C2` for indicators only (ART_DIRECTION.md).

Additional production asset; requires the integration described in the shared guide.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and purpose

Original restrained military sci-fi title identity and supporting menu illustration.

## Design instruction

Strong controlled typography, deliberate spacing and a small original colony insignia. If illustrating the menu, show approved hardware/organisms rather than promising a different art style than actual gameplay. Interface icons can be clean vector symbols even though the user rejected line-art/pixel-art as the game-world visual style. Do not substitute these UI glyphs for detailed 3D world assets. Keep icon stroke/fill density coherent and edges crisp at intended size.

## Deliverables and states

editable/vector wordmark plus separate background art if produced; no baked functional buttons. Use SVG for functional icons, transparent PNG only where raster art is justified, and editable source. Include all subject filenames in `delivery.json` under `public/assets/replacements/menu-title/`. Avoid external fonts/assets unless licensed and packaged; labels, counters and upgrade descriptions must remain editable accessible text.

## Mobile requirements

Show the artwork within actual readable controls, including at least 44 CSS px intended touch targets in the proposed interface revision. The artwork itself may be 24 px. Portrait/landscape adaptation cannot crop essential controls or require paused combat. Active, disabled and cooldown states must also differ in shape/value/text, not only hue.

## Acceptance and integration

Show normal-scale screenshots and monochrome comparison. Confirm every symbol remains distinct and doesn't depend on tiny inscriptions. Current interface is CSS/HTML; new art should be wired to those controls without hiding text or baking an entire interface into an image. Reject emoji substitutes, toy emblems, neon panels and unreadable microdetail.
