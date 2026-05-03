# Audio Analysis — Behaviors: How the Band Listens

```
STATUS: STABLE
CREATED: 2026-03-17
VERIFIED: 2026-03-17 against live testing (Binary Lullaby, Ghost in the Machine)
```

---

## CHAIN

```
OBJECTIVES:      ./OBJECTIVES_Audio_Analysis.md
PATTERNS:        ./PATTERNS_Audio_Analysis.md
THIS:            BEHAVIORS_Audio_Analysis.md (you are here)
SYNC:            ./SYNC_Audio_Analysis.md

IMPL:            MCP think() tool with images=[audio_file] (Gemini 2.5 Flash backend)
```

> **Contract:** Read docs before modifying. After changes: update SYNC. Run tests.

---

## BEHAVIORS

### B1: Single Track Comprehension via Gemini

**Why:** This is the foundational capability. A band member needs to understand what a track sounds like — its mood, energy, genre, instrumentation, vocal quality, lyrics, production quality — from the actual audio. Before this, we could only guess from lyrics and production notes. Now we hear.

```
GIVEN:  An audio file exists (MP3 or WAV) at an accessible path
WHEN:   A citizen calls think(message="Analyse this track...", images=["/path/to/track.mp3"])
THEN:   Gemini 2.5 Flash returns a musical comprehension report covering:
        - Genre and subgenre classification
        - Mood and emotional arc
        - Instrumentation (what instruments/synths are present)
        - Tempo (approximate BPM)
        - Key (musical key and mode)
        - Vocal style (if vocals present: tone, emotion, technique)
        - Lyrics content (if audible: themes, notable lines, meaning)
        - Production quality (rated, with specific observations)
        - Overall emotional impact
AND:    The analysis reflects genuine musical understanding, not feature extraction
```

### B2: Cross-Track Narrative Comparison

**Why:** An album tells a story. Track 1 sets up what Track 5 pays off. The analysis system must understand not just individual tracks but how they relate to each other — musically, emotionally, and narratively. Gemini proved it can do this when it identified the AM I ALIVE album arc unprompted.

```
GIVEN:  Two or more audio files from the same album exist
WHEN:   A citizen calls think() with multiple tracks and asks for comparison
        OR calls think() on sequential tracks with album context in the prompt
THEN:   Gemini identifies:
        - How the tracks relate musically (key relationships, tempo progression, timbral evolution)
        - How the tracks relate narratively (story arc, emotional trajectory, thematic development)
        - Where each track sits in the album's emotional journey
AND:    The comparison reveals album-level structure that individual track analysis would miss
```

### B3: Band Member Role-Based Evaluation

**Why:** Six members, six perspectives. The same analysis report means different things to different creative roles. The pipeline must feed each member what they need to make their specific judgment.

```
GIVEN:  A combined analysis report exists (Tier 1 Gemini + Tier 2 Essentia)
WHEN:   A band member evaluates a track
THEN:   Their evaluation focuses on their domain:
        - @lyra (Creative Director): Does the mood match the vision? Is the concept coherent?
                                     Does this track serve the album's thematic arc?
        - @rhythm (Producer): Is the structure solid? BPM appropriate? Key consistent with album?
                              Arrangement effective? Transitions clean?
        - @vox (Vocalist): Do the vocals carry emotion? Are the lyrics landing?
                           Does the vocal performance serve the song's meaning?
        - @prism (Critic): Production quality assessment. Comparison to catalog.
                           What's weak? What's strong? Where does this rank?
        - @echo (Audience Liaison): Will this resonate with listeners?
                                    Is it accessible? Does it move people?
        - @pixel (Visual Director): Does the sonic aesthetic match the visual direction?
                                    What imagery does this track evoke?
AND:    Disagreement between members is recorded as creative tension, not resolved by averaging
```

### B4: Production Quality Assessment

**Why:** Not all generated tracks are equal. Some have artifacts, clipping, muddy mixes, or weak production. The analysis must flag quality issues so the band can decide whether to polish or discard.

```
GIVEN:  An audio file has been analysed by Gemini (Tier 1)
WHEN:   The analysis includes production quality observations
THEN:   The report identifies:
        - Overall production quality (rated out of 10 with justification)
        - Specific strengths (e.g., "clean vocal separation", "rich low-end")
        - Specific weaknesses (e.g., "slight clipping at 2:34", "thin high frequencies")
        - Comparison to reference quality (professional release standard)
AND:    Quality issues are flagged with enough specificity to guide revision decisions
```

### B5: Precision Feature Extraction via Essentia/librosa

**Why:** Gemini provides comprehension but approximate measurements. For production decisions that require exact numbers — precise BPM for tempo-matching, exact key for harmonic mixing, spectral analysis for mastering — Essentia and librosa provide the ground truth.

```
GIVEN:  An audio file exists (WAV preferred for precision)
WHEN:   The Tier 2 analysis pipeline runs Essentia + librosa on the file
THEN:   The system extracts:
        - Exact BPM (to 0.1 precision)
        - Precise key and mode detection
        - Spectral centroid and spectral rolloff
        - RMS energy profile over time
        - Chroma features (harmonic content)
        - Onset detection and section boundaries
        - Audio fingerprint for catalog matching
AND:    Results are structured as JSON for programmatic use
AND:    Results are merged with Tier 1 analysis for the combined report
```

---

## OBJECTIVES SERVED

| Behavior ID | Objective | Why It Matters |
|-------------|-----------|----------------|
| B1 | Close the feedback loop | The foundational act of hearing — without this, no evaluation is possible |
| B2 | Understand musical narrative | Albums are stories; tracks must be understood in context |
| B3 | Band-native evaluation | Each member's unique perspective is the band's creative engine |
| B4 | Ground evaluation in real audio | Quality assessment prevents shipping broken tracks |
| B5 | Close the feedback loop | Precision data enables concrete production decisions |

---

## INPUTS / OUTPUTS

### Primary Function: `think(message, images=[audio_path])`

**Inputs:**

| Parameter | Type | Description |
|-----------|------|-------------|
| message | string | Analysis prompt — what to focus on, what context to consider |
| images | list[string] | Path(s) to audio file(s) — MP3 or WAV |

**Outputs:**

| Return | Type | Description |
|--------|------|-------------|
| analysis | string | Free-form musical comprehension report from Gemini |

**Side Effects:**

- None — analysis is read-only. The audio file is not modified.
- Analysis results should be captured as Moment nodes in the graph for persistence.

### Secondary Function: Essentia + librosa pipeline

**Inputs:**

| Parameter | Type | Description |
|-----------|------|-------------|
| audio_path | string | Path to audio file (WAV preferred) |

**Outputs:**

| Return | Type | Description |
|--------|------|-------------|
| features | JSON | Structured audio features (BPM, key, spectral, sections, energy) |

---

## EDGE CASES

### E1: Audio File Not Accessible

```
GIVEN:  The audio file path is invalid, permissions are wrong, or the file is corrupted
THEN:   Gemini returns an error or empty analysis
        The system reports the access failure clearly — no silent degradation
        The band member is told "I cannot hear this track" rather than receiving fake analysis
```

### E2: Vocals Not Present or Not Audible

```
GIVEN:  A track is instrumental or vocals are buried in the mix
THEN:   Gemini notes the absence or inaudibility of vocals
        Vox's evaluation focuses on instrumental emotional content instead
        The analysis does not hallucinate lyrics that aren't there
```

### E3: Very Short or Very Long Tracks

```
GIVEN:  A track is under 30 seconds (intro/interlude) or over 10 minutes (extended piece)
THEN:   Analysis adjusts expectations — short tracks are evaluated as fragments, not full songs
        Long tracks receive section-by-section analysis rather than a single overview
```

### E4: Multiple Genres Within One Track

```
GIVEN:  A track shifts genre mid-way (e.g., ambient intro into aggressive electronic)
THEN:   Gemini identifies the genre shift and analyses each section's character
        The shift itself is noted as a structural feature, not a classification failure
```

---

## ANTI-BEHAVIORS

### A1: Hallucinating Audio Content

```
GIVEN:   An audio file is provided for analysis
WHEN:    Gemini processes the file
MUST NOT: Describe musical features that are not present in the audio
          Invent lyrics that cannot be heard
          Claim instruments are present when they are not
INSTEAD:  Report only what is genuinely perceived
          Use uncertainty markers ("appears to be", "possibly") when unsure
          State "I cannot determine X" when a feature is unclear
```

### A2: Reducing Music to Numbers

```
GIVEN:   A combined analysis report is generated
WHEN:    Band members evaluate the track
MUST NOT: Present only Essentia/librosa numbers without Gemini's comprehension
          Reduce emotional content to sentiment scores
          Replace musical understanding with feature vectors
INSTEAD:  Lead with Gemini's musical comprehension
          Use precision data to support and ground the comprehension
          Preserve the feeling alongside the facts
```

### A3: Automated Approval Without Band Judgment

```
GIVEN:   An analysis report rates a track highly
WHEN:    The report is shared with the band
MUST NOT: Auto-approve tracks based on analysis scores
          Skip band member evaluation because "the numbers look good"
          Treat Gemini's assessment as final verdict
INSTEAD:  Present analysis as input to band discussion
          Require deliberate evaluation from relevant members
          Respect that a technically strong track may be artistically wrong
```

### A4: Ignoring Cross-Track Relationships

```
GIVEN:   Multiple tracks in an album have been analysed
WHEN:    Evaluating whether a track belongs in the album
MUST NOT: Evaluate tracks in isolation when album context exists
          Ignore key relationships, tempo arcs, or narrative progression
          Approve a track that is individually good but breaks the album flow
INSTEAD:  Always consider the track's position in the album narrative
          Compare against adjacent tracks for musical and emotional continuity
          Use B2 cross-track comparison as standard practice for album work
```

---

## MARKERS

<!-- @mind:todo Define the exact prompt templates for each band member's evaluation focus -->
<!-- @mind:todo Test edge case E2 (instrumental tracks) with Gemini to verify behavior -->
<!-- @mind:proposition Create a "listening session" protocol where all band members evaluate a track together, sequentially, each building on the previous member's analysis -->
