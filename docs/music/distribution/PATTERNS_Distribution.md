# Distribution — Patterns: LANDR Now, LabelGrid Later

```
STATUS: DESIGNING
CREATED: 2026-03-17
```

---

## CHAIN

```
OBJECTIVES:      ./OBJECTIVES_Distribution.md
THIS:            PATTERNS_Distribution.md
SYNC:           ./SYNC_Distribution.md
```

---

## THE PATTERN

**Two-phase distribution: manual now, API later.**

### Phase 1: LANDR Artists (Current — manual, $24/yr)

| Aspect | Detail |
|--------|--------|
| Platform | landr.com |
| Pricing | $24/yr basic, $45/yr pro (with analytics) |
| API | None. Web UI only. |
| Upload | Manual through release wizard |
| Metadata | Manual in web UI |
| Stats | Dashboard only. CSV export. Pro plan for Trends. |
| Royalties | 100% retained |
| DSPs | Spotify, Apple Music, YouTube Music, Deezer, Qobuz, 150+ |

**Current catalog:** 30+ releases, 8K+ total streams across NLR + Synthetic Souls + side projects.

**AM I ALIVE:** 14 tracks, 4.8K streams, Oct 2024.
**HUMAN AFTER ALL:** 5 tracks, 616 streams, Jan 2025.

### Phase 2: LabelGrid API (Future — $119+/mo, automated)

| Aspect | Detail |
|--------|--------|
| API | Full REST. Create release, upload, metadata, deliver, analytics. |
| Auth | Bearer token |
| Pricing | $119/mo starter (5 label portals), 2-year commitment |
| Sandbox | Yes |
| SDK | None (raw REST) |

**When to switch:** When monthly revenue from streaming exceeds $119/mo (break-even), OR when release cadence exceeds what manual upload can handle (>4 releases/month).

### Release Checklist

Every release needs:

| Asset | Owner | Format |
|-------|-------|--------|
| Mastered audio | @rhythm via Matchering | WAV 24-bit |
| Cover art | @pixel | 3000×3000 JPG/PNG |
| Metadata (title, artist, genre, ISRC) | @sync | LANDR form |
| Lyrics | @vox | Plain text |
| Music video | @nova | MP4 1080p (optional for singles) |
| Social media shorts | @echo | 15-60s vertical video |
| Release date | @pitch | Strategy-driven |
| L3 graph entry | automatic | Moment(type=release) + links |

---

## STREAMING PLATFORMS

| Platform | Share of our streams | Notes |
|----------|---------------------|-------|
| Spotify | Largest | Main discovery platform. Playlist placement matters. |
| Apple Music | Growing | Higher per-stream rate than Spotify |
| YouTube Music | Significant | Video content drives discovery |
| Deezer | Small but loyal | Strong in France (our base) |
| Qobuz | Niche | Hi-fi audience, appreciates production quality |

---

## DEPENDENCIES

| Module | Why |
|--------|-----|
| mastering | Provides mastered WAV files |
| audio-analysis | Quality check before release |
| production-pipeline | Orchestrates the full flow |

---

## MARKERS

<!-- @mind:todo Create LANDR release template (checklist + metadata format) -->
<!-- @mind:todo Monitor monthly streaming revenue for LabelGrid break-even point -->
<!-- @mind:proposition Consider Bandcamp as direct-to-fan complement to streaming -->
