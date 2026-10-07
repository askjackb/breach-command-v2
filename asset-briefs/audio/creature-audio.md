# Enemy and boss sound library

Asset ID: `creature-audio`

Additional production asset; requires the integration described in the shared guide.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and sonic vibe

A coherent subterranean biological sound family with separate anatomy and threat scale. Grounded realistic military sci-fi; purposeful machinery and threatening biology, not cheerful arcade toys.

## Content requirements

Dry shell/ground contacts, restrained joint/tissue sounds, sensory pulses and specific attack/releases. Skitter is light, Bastion heavy, Razor sharp, Wasp airborne, Artillery pressure-driven, Mender restrained support, Brood release distinct. Bosses use heavier new voices rather than only pitch-shifted common units. Match the physical source and actual game events. Different weapon/creature classes must be recognizable by sound without turning every event into a loud spectacle. Include quiet and overlapping playback demonstrations.

## Delivery specification

Spawn/attack/hit/death sets for ten enemies and three bosses, restrained locomotion/flight loops and class-specific heal/brood events. Deliver lossless editable WAV masters and browser-playable derivatives, provenance, loop/event metadata, durations, channel counts and loudness measurements under `public/assets/replacements/creature-audio/`. Prefer mono positional sources and stereo ambience/music. Remove accidental clicks, clipping, leading silence and broken loops. Do not use unlicensed third-party samples.

## Integration and review

Current audio is synthesized tones; a sampled library requires loading, pooling, spatialization, gain staging and voice-priority work. Autoplay begins only after user interaction and mute must work. Endless combat requires voice limits and variation; do not play every overlapping distant emitter at full volume. Review with the model/animation timing and report any missing events rather than inventing gameplay.
