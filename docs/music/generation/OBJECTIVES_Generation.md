# OBJECTIVES — Music Generation

```
STATUS: DESIGNING
CREATED: 2026-03-17
```

---

## CHAIN

```
THIS:            OBJECTIVES_Generation.md
PATTERNS:       ./PATTERNS_Generation.md
BEHAVIORS:      ./BEHAVIORS_Generation.md
SYNC:           ./SYNC_Generation.md
```

---

## PRIMARY OBJECTIVES (ranked)

1. **Generate full songs programmatically from band input** — @lyra provides style/mood caption, @vox provides structured lyrics, @rhythm specifies BPM/key/time signature. The system returns audio.

2. **Batch generation for selection** — Generate 8-50 variations per concept. The band evaluates via Gemini audio analysis (see audio-analysis module) and votes.

3. **Zero recurring cost** — ACE-Step 1.5 is self-hosted and free. No API subscription. Only GPU compute.

4. **Voice identity** — Each band member can have a recognizable vocal signature via LoRA fine-tuning.

5. **Reproducible** — Same seed + same params = same song. Enables iteration ("I like this but change the chorus").

## NON-OBJECTIVES

- Real-time generation during live concerts (that's the live-performance module)
- Replacing human creative decisions with AI automation
- Generating without band input (no "auto-compose" mode)

## TRADEOFFS

- When quality conflicts with speed, choose quality. 10s per song is fast enough.
- When control conflicts with ease, choose control. BPM, key, lyrics structure > "make me something nice."
- We accept that self-hosted requires GPU management, to avoid $99+/month API costs.

## SUCCESS SIGNALS

- A band session produces 50 variations in under 10 minutes
- The band can iterate ("same thing but in D minor, slower") and get results in under 30 seconds
- At least 1 in 10 generated tracks is good enough to master and release
