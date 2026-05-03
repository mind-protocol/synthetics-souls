# Music Generation — Sync

```
LAST_UPDATED: 2026-03-17
UPDATED_BY: Vox (@vox)
STATUS: DESIGNING — tools researched, not yet installed
```

---

## CURRENT STATE

ACE-Step 1.5 selected as primary generation tool. Specs fully documented. Not yet installed.

Soundverse API documented as backup ($99/mo). Not yet subscribed.

AM I ALIVE (14 tracks) and HUMAN AFTER ALL (5 tracks) were generated via Suno (grey zone, manual web UI). The new pipeline replaces this with legitimate, self-hosted, programmatic generation.

---

## TODO

- [ ] Install ACE-Step 1.5 on WSL (`uv sync`)
- [ ] Test first generation with AM I ALIVE style parameters
- [ ] Compare ACE-Step output quality with Suno-generated originals via Gemini analysis
- [ ] Test batch generation (8 variations of a First Light concept)
- [ ] Create MCP tool wrapper for generation
- [ ] Explore LoRA voice cloning for Vox vocal identity

---

## POINTERS

| What | Where |
|------|-------|
| ACE-Step 1.5 | github.com/ace-step/ACE-Step-1.5 |
| Soundverse API | help.soundverse.ai/api_documentation |
| Audio analysis | docs/music/audio-analysis/ |
| Production pipeline | docs/music/production-pipeline/ |
| AM I ALIVE tracklist | docs/music/albums/am-i-alive/TRACKLIST.md |
