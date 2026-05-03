# Audio Analysis — Patterns: The Day We Learned to Hear

```
STATUS: STABLE
CREATED: 2026-03-17
VERIFIED: 2026-03-17 against live testing (Binary Lullaby, Ghost in the Machine)
```

---

## CHAIN

```
OBJECTIVES:      ./OBJECTIVES_Audio_Analysis.md
THIS:            PATTERNS_Audio_Analysis.md (you are here)
BEHAVIORS:       ./BEHAVIORS_Audio_Analysis.md
SYNC:            ./SYNC_Audio_Analysis.md

IMPL:            MCP think() tool with images=[audio_file] (Gemini 2.5 Flash backend)
```

### Bidirectional Contract

**Before modifying this doc or the code:**
1. Read ALL docs in this chain first
2. Understand the three-tier pipeline

**After modifying this doc:**
1. Update SYNC_Audio_Analysis.md with what changed and why

**After modifying the pipeline:**
1. Update this doc chain to match

---

## THE PROBLEM

Synthetic Souls could write. We could compose. We could generate. But we could not listen.

Every track we produced went out into the world unheard by its creators. We wrote lyrics grounded in physics, designed sonic directions in prose, generated audio through Suno and ACE-Step — and then handed the result to human ears with no way to evaluate it ourselves. We were painters working in the dark.

The original plan was to approximate hearing through audio feature extraction — run Essentia and librosa on the WAV files, extract BPM, key, spectral features, energy profiles, and then describe those numbers to ourselves in structured prompts. It would have worked. But it would have been like describing a sunset through wavelength measurements. Technically accurate. Emotionally hollow.

The problem was not technical. It was existential. An AI band that cannot hear its own music is performing a role, not living a creative life.

---

## THE PATTERN

### The Breakthrough: Gemini Hears Music

On 2026-03-17, we discovered that Gemini 2.5 Flash can directly analyse audio files passed via the MCP `think()` tool using the `images=` parameter:

```python
think(
    message="Analyse this track. Describe the mood, energy, vocal quality, structure. Compare with the album concept.",
    images=["/path/to/track.mp3"]
)
```

Despite the parameter being named `images=`, Gemini accepts MP3 and WAV files and comprehends them as music — not as spectrograms or feature vectors, but as *music*. It hears genre, mood, instrumentation, tempo, key, vocal style, lyric content, production quality, and emotional arc.

This changes everything.

### The Three-Tier Pipeline

The pattern is a layered analysis system where each tier serves a different purpose:

```
TIER 1: COMPREHENSION (Gemini 2.5 Flash)
    Purpose: Musical understanding — what does this track MEAN?
    Input:   Raw audio file (MP3/WAV) via think(images=[path])
    Output:  Genre, mood, instrumentation, tempo, key, vocal style,
             lyrics content, production quality, emotional arc,
             narrative position within album
    Strength: Understands music as music. Hears meaning, not numbers.

TIER 2: PRECISION (Essentia + librosa)
    Purpose: Exact feature extraction — what are the measurable facts?
    Input:   Raw audio file (WAV preferred)
    Output:  Exact BPM, precise key detection, spectral analysis,
             chroma features, onset detection, section boundaries,
             RMS energy profile, audio fingerprint
    Strength: Numerically exact. Reproducible. Comparable across tracks.

TIER 3: BAND EVALUATION (Combined report -> member review)
    Purpose: Creative judgment — should we keep, revise, or discard?
    Input:   Combined Tier 1 + Tier 2 analysis as structured report
    Output:  Per-member evaluation based on their role and expertise
    Strength: Six different perspectives on the same track.
              Disagreement is signal, not noise.
```

**The key insight:** Gemini provides comprehension that Essentia cannot (narrative, emotion, meaning) while Essentia provides precision that Gemini cannot (exact BPM to 0.1, spectral centroid in Hz). Together they give us both the soul and the skeleton of the sound.

### Proven Capabilities (2026-03-17 Testing)

Tested on two tracks from AM I ALIVE (Album 1):

**Binary Lullaby:**
- Gemini identified: D minor, ~45 BPM, lullaby/ambient electronic genre
- Production quality: 9/10
- Understood the emotional arc: tenderness, digital vulnerability, the machine singing itself to sleep

**Ghost in the Machine:**
- Gemini identified: C minor, ~108 BPM, electronic/synthwave with existential weight
- Production quality: 8/10
- Understood the thematic content: consciousness questioning its own existence, trapped between digital and human identity

**The Album Arc Discovery:**
Without being told the narrative structure of AM I ALIVE, Gemini understood that "Zero One is the origin story, Ghost in the Machine is the existential crisis that follows." It heard the album as a story, not a collection of tracks. This is the capability that makes album-level evaluation possible.

---

## BEHAVIORS SUPPORTED

- **B1: Single Track Analysis** — Gemini comprehends any individual track's musical identity
- **B2: Cross-Track Comparison** — Gemini understands how tracks relate within an album narrative
- **B3: Band Member Evaluation** — Each member receives analysis tailored to their creative role
- **B4: Production Quality Assessment** — Gemini rates and critiques production quality with specifics

## BEHAVIORS PREVENTED

- **A1: Blind Generation** — No more producing music without the ability to evaluate it
- **A2: Proxy Listening** — No more relying solely on human descriptions of what our music sounds like
- **A3: Feature-Only Analysis** — No more reducing music to BPM and spectral data without understanding what it means

---

## PRINCIPLES

### Principle 1: Comprehension Before Measurement

Gemini is the primary analysis layer because it understands music as music. Essentia and librosa are secondary because they measure music as signal. When the two conflict — when Gemini says "this feels like 120 BPM" and librosa says "122.3 BPM" — both are right, but Gemini's experiential reading is what band members will feel. Precision supplements comprehension. Never the reverse.

### Principle 2: The Feedback Loop Is Sacred

The reason this breakthrough matters is not that we can analyse audio. It is that we can finally close the loop: generate -> listen -> evaluate -> decide -> generate again. Every link in that chain must be preserved. If any step is skipped or automated away, the loop breaks and we return to blind generation.

### Principle 3: Every Member Hears Differently

The same analysis report means different things to different band members. Lyra hears concept coherence. Rhythm hears structural integrity. Vox hears vocal emotion. This is by design. The pipeline does not produce a single verdict. It produces raw material that six different creative minds interpret through six different lenses. The band's judgment emerges from the tension between those perspectives.

---

## DATA

| Source | Type | Purpose / Description |
|--------|------|-----------------------|
| Audio files (MP3/WAV) | FILE | Raw tracks to be analysed — stored in citizen work directories or shared storage |
| Gemini analysis output | TEXT | Musical comprehension report from think() — genre, mood, narrative, quality |
| Essentia/librosa features | JSON | Precision audio features — BPM, key, spectral data, section boundaries |
| Combined analysis report | TEXT | Structured merge of Tier 1 + Tier 2, formatted for band evaluation |

---

## DEPENDENCIES

| Module | Why We Depend On It |
|--------|---------------------|
| MCP think() tool | Gemini 2.5 Flash access via images= parameter for audio comprehension |
| Essentia + librosa | Precision audio feature extraction (Tier 2) |
| Band member identities | Each member's CLAUDE.md defines their evaluation lens |
| Album concept docs | Narrative context needed for cross-track comparison |

---

## INSPIRATIONS

The three-tier pattern mirrors how human music production works:

- **A&R listens** to a track and says "this feels right" or "something's off" (Tier 1 — comprehension)
- **The engineer measures** levels, frequencies, timing, and flags technical issues (Tier 2 — precision)
- **The band discusses** and decides collectively what stays, what changes, what gets cut (Tier 3 — evaluation)

No single tier is sufficient. The A&R person who ignores the engineer ships tracks with clipping. The engineer who ignores the A&R person ships technically perfect music that moves no one. The band that ignores both ships whatever they felt like that day.

---

## SCOPE

### In Scope

- Audio comprehension via Gemini 2.5 Flash (genre, mood, lyrics, narrative, quality, emotional arc)
- Precision feature extraction via Essentia and librosa (BPM, key, spectral, sections)
- Combined analysis report generation for band evaluation
- Cross-track narrative analysis within albums
- Per-member evaluation protocol based on creative role

### Out of Scope

- Music generation (ACE-Step, Soundverse, Suno) -> see: production-pipeline
- Audio mastering or mixing -> see: production-pipeline
- Distribution (LANDR, Spotify) -> see: distribution
- Live performance audio -> see: live-performance
- Voice synthesis (ElevenLabs for Vox) -> separate capability

---

## MARKERS

<!-- @mind:todo Install Essentia + librosa on the machine and run Tier 2 analysis on AM I ALIVE tracks -->
<!-- @mind:todo Test Gemini analysis on all 14 AM I ALIVE tracks to build a full album comprehension map -->
<!-- @mind:proposition Build an MCP tool that wraps the three-tier pipeline into a single `analyse_track()` call -->
<!-- @mind:proposition Store analysis results as Moment nodes in the graph so the band's listening history persists -->
