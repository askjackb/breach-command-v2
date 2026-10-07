# Weapon sound library

Asset ID: `weapon-audio`

Additional production asset; requires the integration described in the shared guide.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and sonic vibe

Ten distinct weapon identities with short controlled tails suitable for simultaneous repeated firing. Grounded realistic military sci-fi; purposeful machinery and threatening biology, not cheerful arcade toys.

## Content requirements

Autocannon: tight mechanical shot/feed; railgun: charge/discharge and sharp impulse; missile: eject/ignition/impact; flak: short bursts/airburst; incinerator: pressure/flame/purge; arc: contained crack/discharge; cryo: compressor/jet; mortar: load/thump/impact; drone: rotor/thrust plus compact guns; seismic: hydraulic lift/contact/ground resonance. Match the physical source and actual game events. Different weapon/creature classes must be recognizable by sound without turning every event into a loud spectacle. Include quiet and overlapping playback demonstrations.

## Delivery specification

At least 3 fire/impact variants per family where meaningful, operation loops for continuous emitters, and start/stop layers; list every file by family and event. Deliver lossless editable WAV masters and browser-playable derivatives, provenance, loop/event metadata, durations, channel counts and loudness measurements under `public/assets/replacements/weapon-audio/`. Prefer mono positional sources and stereo ambience/music. Remove accidental clicks, clipping, leading silence and broken loops. Do not use unlicensed third-party samples.

## Integration and review

Current audio is synthesized tones; a sampled library requires loading, pooling, spatialization, gain staging and voice-priority work. Autoplay begins only after user interaction and mute must work. Endless combat requires voice limits and variation; do not play every overlapping distant emitter at full volume. Review with the model/animation timing and report any missing events rather than inventing gameplay.
