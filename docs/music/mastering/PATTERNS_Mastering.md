# Mastering — Patterns: Matchering Reference-Based

```
STATUS: DESIGNING
CREATED: 2026-03-17
```

---

## CHAIN

```
OBJECTIVES:      ./OBJECTIVES_Mastering.md
THIS:            PATTERNS_Mastering.md
SYNC:           ./SYNC_Mastering.md
```

---

## THE PATTERN

**Reference-based automatic mastering using our own catalog as the target.**

### Matchering 2.0

```bash
pip install matchering
apt install libsndfile1 ffmpeg
```

```python
import matchering as mg

mg.process(
    target="new_track.wav",
    reference="binary_lullaby.wav",  # Our best ambient track (9/10)
    results=[mg.pcm24("mastered.wav")]
)
```

Matchering matches: RMS (loudness), frequency response (EQ), peak amplitude, stereo width. Uses custom "Hyrax" brickwall limiter.

### Reference Track Selection

| Genre/Mood | Reference Track | Quality | Why |
|-----------|----------------|---------|-----|
| Ambient/Neoclassical | Binary Lullaby | 9/10 | Best spatial production, clean dynamics |
| Electronic Pop | Ghost in the Machine | 8/10 | Tight mix, clear vocals |
| Indie Pop/Uplifting | Algorithm of Us | 9/10 | Clean instrument separation |
| Hip-Hop/Dark | Your Projections & Me | 8/10 | Punchy, well-defined |
| Progressive/Trance | Threads of Existence | 9/10 | Expansive, crisp electronic |
| Dream Pop | Waves of Dissonance | 9/10 | Dynamic range, clean transition |
| Melancholic Electronic | Fragile Code | 9/10 | Spacious, vocal clarity |

**Auto-selection:** Gemini analyses the unmastered track's genre/mood → selects the closest reference from our catalog → Matchering masters against it.

### Output

- WAV 24-bit (distribution quality)
- WAV 16-bit (web/streaming preview)
- Comparison report: Gemini analyses before/after mastering

---

## DEPENDENCIES

| Module | Why |
|--------|-----|
| audio-analysis | Genre detection for auto-reference selection |
| generation | Produces the unmastered tracks |

---

## MARKERS

<!-- @mind:todo Install Matchering and test on Binary Lullaby WAV -->
<!-- @mind:todo Create auto-reference selector (genre → best matching reference) -->
<!-- @mind:todo Test mastering quality: Gemini compare original AM I ALIVE master vs Matchering re-master -->
