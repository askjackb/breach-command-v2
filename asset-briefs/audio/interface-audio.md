# Interface feedback

Asset ID: `interface-audio`

Additional production asset; requires the integration described in the shared guide.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and sonic vibe

Precise understated command interface sounds. Grounded realistic military sci-fi; purposeful machinery and threatening biology, not cheerful arcade toys.

## Content requirements

Distinct but quiet selection, valid construction, rejection, research choice, unlock, wave warning and reactor danger cues. Avoid repetitive loud clicks or arcade coin rewards. Match the physical source and actual game events. Different weapon/creature classes must be recognizable by sound without turning every event into a loud spectacle. Include quiet and overlapping playback demonstrations.

## Delivery specification

short UI cue library with several subtle variants and priority guidance. Deliver lossless editable WAV masters and browser-playable derivatives, provenance, loop/event metadata, durations, channel counts and loudness measurements under `public/assets/replacements/interface-audio/`. Prefer mono positional sources and stereo ambience/music. Remove accidental clicks, clipping, leading silence and broken loops. Do not use unlicensed third-party samples.

## Integration and review

Current audio is synthesized tones; a sampled library requires loading, pooling, spatialization, gain staging and voice-priority work. Autoplay begins only after user interaction and mute must work. Endless combat requires voice limits and variation; do not play every overlapping distant emitter at full volume. Review with the model/animation timing and report any missing events rather than inventing gameplay.
