# Colony and interaction sounds

Asset ID: `colony-audio`

Additional production asset; requires the integration described in the shared guide.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and sonic vibe

Industrial operation, build, repair, damage and tactical map interaction feedback. Grounded realistic military sci-fi; purposeful machinery and threatening biology, not cheerful arcade toys.

## Content requirements

Reactor low hum, mine drill, generator drive, heat-decoy shutter/thermal loop, lure ground pulse. Six map feature activations are distinct and not louder than critical threat signals. Loss of power stops relevant operation loops. Match the physical source and actual game events. Different weapon/creature classes must be recognizable by sound without turning every event into a loud spectacle. Include quiet and overlapping playback demonstrations.

## Delivery specification

operation loops with seamless boundaries; construction/upgrade/repair/sell/destroy one-shots; 6 feature activation/depletion sets. Deliver lossless editable WAV masters and browser-playable derivatives, provenance, loop/event metadata, durations, channel counts and loudness measurements under `public/assets/replacements/colony-audio/`. Prefer mono positional sources and stereo ambience/music. Remove accidental clicks, clipping, leading silence and broken loops. Do not use unlicensed third-party samples.

## Integration and review

Current audio is synthesized tones; a sampled library requires loading, pooling, spatialization, gain staging and voice-priority work. Autoplay begins only after user interaction and mute must work. Endless combat requires voice limits and variation; do not play every overlapping distant emitter at full volume. Review with the model/animation timing and report any missing events rather than inventing gameplay.
