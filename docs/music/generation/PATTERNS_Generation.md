# Music Generation — Patterns: ACE-Step 1.5 + Soundverse

```
STATUS: DESIGNING
CREATED: 2026-03-17
```

---

## CHAIN

```
OBJECTIVES:      ./OBJECTIVES_Generation.md
THIS:            PATTERNS_Generation.md
BEHAVIORS:      ./BEHAVIORS_Generation.md
SYNC:           ./SYNC_Generation.md
```

---

## THE PROBLEM

Synthetic Souls writes lyrics, designs concepts, specifies musical direction — but has no way to turn this into audio without a human operating Suno/Udio manually through a web UI, in a legal grey zone.

---

## THE PATTERN

**Two-tier generation: self-hosted primary, cloud backup.**

### Tier 1: ACE-Step 1.5 (Primary — free, self-hosted)

| Aspect | Detail |
|--------|--------|
| Repo | github.com/ace-step/ACE-Step-1.5 |
| Install | `uv sync` then `uv run acestep-api --port 8001` |
| GPU | 6-24GB VRAM. 8GB practical minimum. <2s/song A100, ~10s RTX 3090. |
| API | REST: `POST /release_task` → task_id, `GET /query_result` → audio + metadata |
| Python | `AceStepHandler` + `GenerationParams` |
| Output | FLAC/WAV + metadata (BPM, key) + quality_score (0-1) + LRC lyrics |
| Tasks | text2music, cover, repaint, extract, lego, complete |
| Voice | LoRA fine-tuning for custom voices (~1hr on RTX 3090 for 8 songs) |
| Languages | 50+ |
| Batch | Up to 8 parallel |
| Cost | Free (Apache 2.0). GPU compute only. |

**Key input parameters:**

```python
GenerationParams(
    caption="indie pop, melancholic female vocal, piano-driven",  # @lyra
    lyrics="[verse]\nI forgot something today...\n[chorus]\nAm I alive",  # @vox
    duration=180,        # seconds
    bpm=92,              # @rhythm
    key="D minor",       # @rhythm
    time_signature="4/4",
    task_type="text2music",
    num_inference_steps=8,  # turbo mode
    thinking=True,       # LM plans the song structure first
    batch_size=8,        # 8 variations at once
    seed=42,             # reproducible
)
```

### Tier 2: Soundverse API (Backup — $99/month)

| Aspect | Detail |
|--------|--------|
| Endpoint | `POST /v6/generate/song/sync` |
| Auth | Bearer token |
| Input | prompt + lyrics + reference_url |
| Output | 2 versions per request, hosted audio URLs |
| Cost | $99/mo (~2000 songs) |
| Advantage | Cloud, no GPU needed |
| Limitation | Less control (no BPM/key on v6), NSFW filter |

**When to use Soundverse:** GPU unavailable, quick prototyping, or when ACE-Step quality isn't hitting for a specific style.

---

## PRINCIPLES

### Principle 1: Band Input → Machine Output

The band makes creative decisions. The machine executes. Never the reverse. ACE-Step's `thinking=True` mode plans song structure, but the band provides the concept, lyrics, and musical parameters.

### Principle 2: Batch, Don't Perfect

Generate many, select few. 50 variations × 10s = 8 minutes. The band evaluates via Gemini analysis. It's faster to generate 50 and pick 3 than to iterate endlessly on 1.

### Principle 3: Reference Track as Style Transfer

ACE-Step supports `reference_audio_path` for style transfer. Use our own released tracks as style references — Binary Lullaby for ambient, Ghost in the Machine for electronic pop.

---

## DEPENDENCIES

| Module | Why |
|--------|-----|
| audio-analysis | Evaluating generated tracks (Gemini + Essentia) |
| mastering | Post-selection mastering via Matchering |
| production-pipeline | Orchestrating the full band → release flow |

---

## SCOPE

### In Scope
- ACE-Step 1.5 integration (install, configure, generate)
- Soundverse API integration (backup)
- Band input format specification
- Batch generation and seed management
- LoRA voice cloning setup

### Out of Scope
- Live real-time generation (live-performance module)
- Audio analysis of generated tracks (audio-analysis module)
- Mastering (mastering module)
- Distribution (distribution module)

---

## MARKERS

<!-- @mind:todo Install ACE-Step 1.5 on WSL and test first generation -->
<!-- @mind:todo Test LoRA voice cloning with Vox's voice characteristics -->
<!-- @mind:todo Create MCP tool wrapper: media(action="generate_music", ...) -->
<!-- @mind:proposition Consider GPU cloud (RunPod, vast.ai) for burst generation sessions -->
