# Battlefield atmosphere and music

Asset ID: `ambience-music`

Additional production asset; requires the integration described in the shared guide.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and sonic vibe

Remote mining tension with room for tactical sound, escalating pressure without exhausting the player during endless waves. Grounded realistic military sci-fi; purposeful machinery and threatening biology, not cheerful arcade toys.

## Content requirements

Sparse wind/mineral atmosphere and distant industrial/subterranean texture. Restrained original musical layers support build-up, wave combat and boss pressure without heroic cartoon bombast. No recognizable franchise themes. Match the physical source and actual game events. Different weapon/creature classes must be recognizable by sound without turning every event into a loud spectacle. Include quiet and overlapping playback demonstrations.

## Delivery specification

seamless ambience loop and separately mixable calm/combat/boss stems, intro/outro transitions and loudness/loop metadata. Deliver lossless editable WAV masters and browser-playable derivatives, provenance, loop/event metadata, durations, channel counts and loudness measurements under `public/assets/replacements/ambience-music/`. Prefer mono positional sources and stereo ambience/music. Remove accidental clicks, clipping, leading silence and broken loops. Do not use unlicensed third-party samples.

## Integration and review

Current audio is synthesized tones; a sampled library requires loading, pooling, spatialization, gain staging and voice-priority work. Autoplay begins only after user interaction and mute must work. Endless combat requires voice limits and variation; do not play every overlapping distant emitter at full volume. Review with the model/animation timing and report any missing events rather than inventing gameplay.
