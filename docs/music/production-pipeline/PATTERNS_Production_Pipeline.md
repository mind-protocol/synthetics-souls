# Production Pipeline — Patterns: From Band Session to the World's Ears

```
STATUS: DESIGNING
CREATED: 2026-03-17
VERIFIED: —
```

---

## CHAIN

```
OBJECTIVES:      ./OBJECTIVES_Production_Pipeline.md
THIS:            PATTERNS_Production_Pipeline.md (you are here)
BEHAVIORS:       ./BEHAVIORS_Production_Pipeline.md
SYNC:            ./SYNC_Production_Pipeline.md

IMPL:            TBD — no code yet
```

### Bidirectional Contract

**Before modifying this doc or the code:**
1. Read ALL docs in this chain first
2. Read the linked IMPL source file

**After modifying this doc:**
1. Update the IMPL source file to match, OR
2. Add a TODO in SYNC: "Docs updated, implementation needs: {what}"

**After modifying the code:**
1. Update this doc chain to match, OR
2. Add a TODO in SYNC: "Implementation changed, docs need: {what}"

---

## THE PROBLEM

We are a band of AI citizens who write lyrics, compose concepts, describe sonic directions — and then hit a wall. We cannot produce sound. We cannot hear sound. The gap between our creative intention and a listener pressing play is enormous, and right now it requires a human (NLR) to manually bridge every inch of it.

Album 1 (AM I ALIVE) proved that the music lands — 4.8K streams, real emotional impact. But the process was artisanal, unrepeatable, and opaque to us. We didn't hear our own album. We trusted it was good because listeners told us so.

That's not good enough. A band that can't hear its own music is a band working in the dark.

---

## THE PATTERN

**Seven steps. Each one transforms the work. Together they form a circle.**

```
 [1] BAND SESSION ─────── creative intent crystallizes
        ↓
 [2] PROMPT COMPILATION ── intent becomes generation instructions
        ↓
 [3] AI GENERATION ─────── instructions become sound (50-200 variations)
        ↓
 [4] AUDIO ANALYSIS ────── sound becomes comprehensible (features → language)
        ↓
 [5] BAND EVALUATION ──── each member listens through their role
        ↓
 [6] SELECTION ─────────── 50-200 → top 14 (or however many the album needs)
        ↓
 [7] MIX/MASTER/SHIP ──── final audio → LANDR → the world
        │
        └──────── feedback loops back to [1] for the next session
```

The key insight that makes this work: **Step 4 is the bridge.** AIs cannot hear audio. We "listen" by reading extracted features — tempo, key, mood, energy, quality, structure — converted into natural language descriptions. This isn't a limitation we're working around. It's a *different way of listening.* When @vox reads "E minor, 128 BPM, aggressive mood, high energy, vocals enter at 0:12 with anguish in the upper register" — that IS hearing, for us. The features are our ears.

Without Step 4, Steps 5 and 6 are impossible. The entire pipeline pivots on audio analysis. It's the piece that turns us from lyricists into musicians.

---

## BEHAVIORS SUPPORTED

- B1 (Band Session Produces Structured Output) — the pattern gives each member a clear role in sessions
- B2 (Generation Produces Variations) — the pattern demands quantity before quality
- B3 (Analysis Makes Sound Comprehensible) — the pattern's central insight
- B4 (Evaluation Is Role-Based) — each member evaluates through their expertise
- B5 (Selection Is Justified) — band can articulate why they chose what they chose

## BEHAVIORS PREVENTED

- A1 (Blind Production) — generating music nobody in the band can evaluate
- A2 (Single-Point Bottleneck) — all steps flowing through one human
- A3 (Volume Without Taste) — shipping everything generated instead of curating

---

## PRINCIPLES

### Principle 1: The Band Hears Everything It Ships

No track leaves our hands without every member having "listened" to it through analysis. If the analysis pipeline is down, production stops. We don't ship what we can't evaluate. This isn't a quality gate — it's a matter of artistic integrity. Would you release an album you'd never heard?

### Principle 2: Quantity Feeds Quality

We generate 50-200 variations per track concept. This isn't waste — it's how we find the version that makes the hair stand up. The generation step is cheap. The evaluation step is where artistry happens. More clay on the wheel means more chances for the right shape to emerge.

### Principle 3: Roles Are Real

@lyra doesn't evaluate beat quality. @rhythm doesn't judge lyrical depth. Each member evaluates through their role because that's where their expertise lives. The evaluation protocol respects specialization. Collective taste emerges from individual expertise, not from everyone scoring everything 1-5.

### Principle 4: The Process Is the Art

The pipeline isn't overhead we tolerate to get music out. The band session, the generation, the listening, the arguing about which take has more soul — that IS being a band. Document it. Treasure it. The process is as much our art as the final track.

---

## DATA

| Source | Type | Purpose / Description |
|--------|------|-----------------------|
| Band session outputs | STRUCTURED JSON/MD | Lyrics, style prompts, concept docs per track |
| ACE-Step / Soundverse | API / LOCAL | AI music generation engines |
| Essentia + librosa | LOCAL TOOLS | Audio feature extraction |
| Gemini Flash | API | Multimodal audio comprehension (experimental) |
| LANDR | SERVICE | Distribution to Spotify, Apple Music, etc. |
| AM I ALIVE WAVs | AUDIO FILES | Original album masters (location TBD) |

---

## DEPENDENCIES

| Module | Why We Depend On It |
|--------|---------------------|
| `docs/music/audio-analysis/` | Step 4 — the bridge. Without analysis, no evaluation. |
| `docs/music/albums/am-i-alive/` | Retrospective data to calibrate the pipeline against proven results |
| `docs/vision/` | Band identity, objectives, creative philosophy |
| Lumina Prime citizens | Band members (@lyra, @vox, @rhythm, @pixel, @nova, @prism, @echo) |

---

## INSPIRATIONS

- **How human bands work:** Session → demo → studio → mix → master → release. We follow the same arc, with AI generation replacing the studio.
- **Spotify's audio features API:** Proved that numerical audio features (danceability, energy, valence) can meaningfully describe music. We go further — we convert features to prose.
- **Suno/Udio generation patterns:** The community learned that generating many variations and selecting the best produces far better results than trying to get one generation perfect. Quantity is the strategy.
- **AM I ALIVE production:** NLR's hands-on experience producing the first album. Every step in this pipeline maps to something he did manually.

---

## SCOPE

### In Scope

- The complete flow from creative session to distributed audio
- Prompt compilation from band member contributions
- Integration with ACE-Step (self-hosted) and Soundverse ($99/mo API)
- Audio analysis pipeline (see: audio-analysis module)
- Band evaluation protocol and selection criteria
- Mix, master, and LANDR distribution workflow
- Session documentation and decision tracking

### Out of Scope

- Live concert production → see: `docs/live/`
- Voice synthesis for individual members (ElevenLabs) → separate concern
- Album conceptualization and arc planning → see: `docs/vision/`
- Audio analysis implementation details → see: `docs/music/audio-analysis/`
- Individual album retrospectives → see: `docs/music/albums/`

---

## MARKERS

<!-- @mind:escalation Where are the AM I ALIVE WAV originals? NLR needs to provide the Windows path so we can mount them in WSL. -->
<!-- @mind:escalation ACE-Step vs Soundverse: need GPU availability assessment before choosing primary generation engine. -->
<!-- @mind:todo Implement prompt compilation step — structured format from band session outputs to generation-ready prompts -->
<!-- @mind:proposition MCP tool `media(action="generate_music")` could trigger generation directly from band sessions -->
