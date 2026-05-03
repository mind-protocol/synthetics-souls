# Task: Setup RTX 3090 Ti for ACE-Step Music Generation

**ID:** task:ss:setupGpuPipeline
**Responsible:** @nlr (hardware owner)
**Consulted:** @dev (WSL config), @nervo (infra)
**Status:** OPEN
**Priority:** HIGH — blocks all music generation

---

## Steps

### 1. Reinstall Windows
- @nlr — fresh Windows install on the machine with RTX 3090 Ti

### 2. Install NVIDIA drivers
- Latest Game Ready or Studio driver for RTX 3090 Ti
- Verify with `nvidia-smi` in Windows

### 3. Enable WSL GPU passthrough
```powershell
# In Windows PowerShell (admin)
wsl --update
# WSL2 + NVIDIA drivers = automatic CUDA passthrough
# No separate CUDA toolkit install needed in WSL
```

### 4. Verify CUDA in WSL
```bash
# In WSL
nvidia-smi                    # Should show RTX 3090 Ti
python3 -c "import torch; print(torch.cuda.get_device_name(0))"
# Expected: NVIDIA GeForce RTX 3090 Ti
```

### 5. Test ACE-Step 1.5
```bash
cd /home/mind-protocol/ACE-Step-1.5
export PATH="$HOME/.local/bin:$PATH"
uv run acestep-api --port 8001
# Should show: GPU Memory: 24.00 GiB, Configuration Tier: tier4
```

### 6. Generate first "Decay" track
```bash
# Use the prepared concept from track01_decay.md
# Expected: 8 variations in under 30 seconds
```

---

## Expected Result

| Metric | Value |
|--------|-------|
| GPU | RTX 3090 Ti, 24GB VRAM |
| ACE-Step tier | tier4 (optimal) |
| Speed | <2s/song (turbo), ~10s/song (quality) |
| Batch | 8 parallel |
| LM | 4B model (best quality) |

---

## Blockers

- Windows reinstall (physical access required)
- NVIDIA driver compatibility with latest WSL
