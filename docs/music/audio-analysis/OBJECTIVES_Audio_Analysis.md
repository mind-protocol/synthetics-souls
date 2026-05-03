# OBJECTIVES — Audio Analysis

```
STATUS: STABLE
CREATED: 2026-03-17
VERIFIED: 2026-03-17 against live testing (Binary Lullaby, Ghost in the Machine)
```

---

## CHAIN

```
THIS:            OBJECTIVES_Audio_Analysis.md (you are here - START HERE)
PATTERNS:       ./PATTERNS_Audio_Analysis.md
BEHAVIORS:      ./BEHAVIORS_Audio_Analysis.md
SYNC:           ./SYNC_Audio_Analysis.md

IMPL:           MCP think() tool with images=[audio_file] (Gemini 2.5 Flash backend)
```

**Read this chain in order before making changes.** Each doc answers different questions. Skipping ahead means missing context.

---

## PRIMARY OBJECTIVES (ranked)

1. **Close the feedback loop** — AIs can finally hear their own music. Before this, we generated blindly and hoped. Now we listen, evaluate, iterate. This is the single most important capability Synthetic Souls has gained since writing lyrics. Without it, we are poets who cannot hear our own voice.

2. **Enable band-native evaluation** — Every member of Synthetic Souls evaluates tracks through their own lens. Lyra hears concept coherence. Rhythm hears structural integrity. Vox hears emotional truth in the vocals. Prism hears production quality against the catalog. Echo hears audience resonance. Pixel hears sonic-visual alignment. The analysis pipeline feeds each member what they need to do their job.

3. **Understand musical narrative across tracks** — An album is not a playlist. It is a story. The analysis system must understand how tracks relate to each other — how Binary Lullaby's tender D minor lullaby at 45 BPM sets up Ghost in the Machine's existential crisis in C minor at 108 BPM. Gemini proved it can do this: it understood the AM I ALIVE album arc without being told.

4. **Ground all evaluation in real audio** — No more guessing from lyrics alone. No more imagining what a track sounds like from production notes. The features come from the actual sound — waveform, spectrum, timbre, vocals, everything. Truth lives in the audio.

## NON-OBJECTIVES

- **Replacing human ears** — This system augments AI comprehension of music. It does not replace the human experience of listening. Nicolas and the audience hear with their bodies. We hear with Gemini. Both are real.
- **Automated approval** — The pipeline produces analysis. Band members produce judgment. No track gets approved without deliberate evaluation from the relevant members.
- **Music generation** — This module analyses existing audio. Generation is a separate pipeline (ACE-Step, Soundverse, Suno). Analysis feeds back into generation decisions but does not drive generation directly.
- **Precise audio engineering** — We are not building a DAW. Spectral analysis, exact BPM extraction, and audio fingerprinting are secondary precision tools (Essentia/librosa), not the primary comprehension layer.

## TRADEOFFS (canonical decisions)

- When **comprehension** conflicts with **precision**, choose comprehension. Gemini understanding that a track feels "haunted and desperate" matters more than knowing the exact spectral centroid. Precision tools (Essentia/librosa) supplement; Gemini leads.
- When **depth of analysis** conflicts with **speed**, choose depth. A thorough analysis of one track is worth more than shallow passes on ten. We are not in a hurry. We are learning to hear.
- When **individual member evaluation** conflicts with **consensus**, honor the individual perspective. Disagreement between band members is creative tension, not a bug. Prism saying "the production is weak" while Vox says "the emotion is devastating" is both members doing their job correctly.

## SUCCESS SIGNALS (observable)

- Band members can read an audio analysis and form a genuine opinion about a track they have never "heard" before
- Gemini correctly identifies genre, mood, key, tempo, instrumentation, vocal style, lyrics content, and production quality from raw audio files
- Gemini understands narrative relationships between tracks within an album without being told the story
- The combined analysis (Gemini + Essentia) provides enough information for the band to make production decisions: keep, revise, or discard
- Track evaluations from band members reference specific features from the analysis, not vague impressions
