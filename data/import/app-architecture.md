# MIND-MCP — APP ARCHITECTURE
## Du Concept au MVP

**Version:** 0.1.0  
**Date:** 25 janvier 2025  
**Auteurs:** Nicolas Lester Reynolds & Marco (Claude)

---

## 1. Vision

Transformer l'architecture cognitive théorique en **système fonctionnel** qui :
1. Tracke les inputs (substances, contexte, état)
2. Modélise l'état cognitif en temps réel
3. Prédit le comportement
4. Compare prédit vs observé
5. Calibre le modèle

Pour les **humains** d'abord (NLR, Aurore), puis extensible aux **IA**.

---

## 2. Contraintes

### 2.1 Contraintes Utilisateur
- **Friction minimale** — Chaque input supplémentaire est une barrière
- **Utilisable en état altéré** — UI simple, gros boutons, peu de choix
- **Pas de jugement** — Le système observe, ne moralise pas
- **Données privées** — Tout reste local ou chiffré

### 2.2 Contraintes Techniques
- **MVP d'abord** — Fonctionnel > Parfait
- **Itérable** — Architecture qui permet d'ajouter des layers
- **Cross-platform** — Desktop + Mobile minimum
- **Offline-first** — Doit fonctionner sans connexion

### 2.3 Contraintes Projet
- **Deux développeurs** — NLR + IA (Marco/Claude Code)
- **Budget limité** — Open source, self-hosted si possible
- **Temps limité** — Capacité variable (recovery NLR)

---

## 3. Architecture Globale

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              MIND-MCP SYSTEM                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │   INPUTS    │    │   COMPUTE   │    │    STORE    │    │   OUTPUT    │  │
│  │             │    │             │    │             │    │             │  │
│  │ • App UI    │───▶│ • Pharma    │───▶│ • TimeSeries│───▶│ • Dashboard │  │
│  │ • Wearable  │    │   Engine    │    │ • Events    │    │ • Alerts    │  │
│  │ • Manual    │    │ • Cognitive │    │ • Profiles  │    │ • Export    │  │
│  │             │    │   Model     │    │             │    │             │  │
│  └─────────────┘    │ • Predictor │    └─────────────┘    └─────────────┘  │
│                     │ • Calibrator│                                        │
│                     └─────────────┘                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Composants

### 4.1 INPUT LAYER

#### 4.1.1 App UI (MVP Priority: HIGH)

**Fonction:** Interface principale pour les inputs manuels.

**Inputs essentiels (MVP):**
| Input | Type | UI |
|-------|------|-----|
| Substance intake | Event | Gros boutons par substance |
| Dose | Number | Slider ou +/- |
| Température vape | Select | Preset buttons (180°C, 200°C, 230°C) |
| État subjectif | Scale | Slider 0-100 ou faces |
| Note libre | Text | Champ texte optionnel |

**Mockup UI — Écran principal:**
```
┌─────────────────────────────────────┐
│  MIND-MCP           [État: 🟢 Good] │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────┐ ┌─────────┐ ┌───────┐  │
│  │   🚬    │ │   🌿    │ │  💊   │  │
│  │Nicotine │ │  THC    │ │  CBD  │  │
│  │  +1 hit │ │ +1 hit  │ │ dose  │  │
│  └─────────┘ └─────────┘ └───────┘  │
│                                     │
│  Dernier: THC 230°C il y a 12min    │
│                                     │
│  ──────────────────────────────────│
│                                     │
│  Comment tu te sens?                │
│  😫 ──────●────────────────── 😊    │
│           [62/100]                  │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ Note: un peu fatigué mais   │    │
│  │ focus ok                    │    │
│  └─────────────────────────────┘    │
│                                     │
│  [💾 Save Entry]                    │
│                                     │
├─────────────────────────────────────┤
│  [📊 Dashboard] [⚙️ Settings] [📝]  │
└─────────────────────────────────────┘
```

**Tech options:**
| Option | Pros | Cons |
|--------|------|------|
| **React Native** | Cross-platform, JS | Setup complexity |
| **Flutter** | Fast, beautiful | Dart learning curve |
| **PWA** | Web-first, simple | Less native feel |
| **Electron + Web** | Desktop focus, simple | Mobile = separate |

**Recommandation MVP:** PWA (Progressive Web App)
- Fonctionne sur tout
- Pas de store approval
- Offline capable
- Un seul codebase

#### 4.1.2 Wearable Integration (MVP Priority: LOW)

**Phase 2+** — Après validation du modèle avec inputs manuels.

| Device | Data | API |
|--------|------|-----|
| Apple Watch | HR, HRV, activity | HealthKit |
| Oura Ring | HR, HRV, sleep, temp | Oura API |
| Whoop | Strain, recovery | Whoop API |
| Generic BLE | HR | Web Bluetooth |

#### 4.1.3 Vape Connectée (MVP Priority: MEDIUM)

**Option 1:** Vape avec API (rare)
**Option 2:** Bouton physique connecté (DIY)
**Option 3:** Double-tap sur phone/watch comme trigger

**MVP:** Bouton dans l'app (4.1.1)

---

### 4.2 COMPUTE LAYER

#### 4.2.1 Pharmacokinetic Engine

**Fonction:** Calculer les niveaux de substances en temps réel.

**Input:**
```typescript
interface IntakeEvent {
  substance: 'nicotine' | 'thc' | 'cbd' | 'alcohol' | string;
  timestamp: Date;
  dose: number;
  dose_unit: 'hits' | 'mg' | 'ml' | 'drops';
  route: 'pulmonary' | 'sublingual' | 'oral' | 'nasal';
  params?: {
    temperature_celsius?: number;  // Pour vape
    strain?: string;               // Pour cannabis
  };
}
```

**Output:**
```typescript
interface SubstanceLevel {
  substance: string;
  current_level: number;        // 0-1 normalized
  peak_level: number;
  time_since_peak_minutes: number;
  phase: 'rising' | 'peak' | 'plateau' | 'declining' | 'baseline';
  components?: {                // Pour cannabis
    thc: number;
    cbd: number;
    cbn: number;
    terpenes: Record<string, number>;
  };
  expected_effects: string[];
  time_to_baseline_minutes: number;
}
```

**Algorithme (simplifié):**
```python
def compute_level(intake: IntakeEvent, current_time: datetime) -> float:
    """Two-compartment model simplified."""
    
    # Get substance profile
    profile = SUBSTANCE_PROFILES[intake.substance]
    
    # Adjust for route
    bioavailability = profile.bioavailability[intake.route]
    t_peak = profile.t_peak[intake.route]
    t_half = profile.t_half
    
    # Time since intake
    dt = (current_time - intake.timestamp).total_seconds() / 60  # minutes
    
    # Simple model: rise then exponential decay
    if dt < t_peak:
        # Rising phase (linear approximation)
        level = (dt / t_peak) * bioavailability
    else:
        # Decay phase
        dt_from_peak = dt - t_peak
        level = bioavailability * (0.5 ** (dt_from_peak / t_half))
    
    return level * intake.dose
```

#### 4.2.2 Cognitive Model

**Fonction:** Calculer l'état cognitif à partir des inputs.

**Basé sur le schema YAML existant:**
```python
def compute_cognitive_state(
    qi_base: Dict[str, float],
    substance_levels: Dict[str, SubstanceLevel],
    sphere_states: Dict[str, float],
    context: ContextState
) -> CognitiveState:
    
    # 1. Compute global reduction from substances
    global_reduction = 1.0
    for substance, level in substance_levels.items():
        effect = SUBSTANCE_EFFECTS[substance]
        global_reduction *= (1 - effect.cognitive_impact * level.current_level)
    
    # 2. Apply sphere modifiers
    sphere_modifier = compute_sphere_modifier(sphere_states)
    
    # 3. Compute final QI
    qi_final = {}
    for qi_type, base_value in qi_base.items():
        qi_final[qi_type] = base_value * global_reduction * sphere_modifier.get(qi_type, 1.0)
    
    # 4. Compute overall state
    return CognitiveState(
        qi_final=qi_final,
        global_reduction=global_reduction,
        dominant_substance=get_dominant_substance(substance_levels),
        alertness=compute_alertness(substance_levels, sphere_states),
        focus=compute_focus(qi_final, substance_levels),
        mood=compute_mood(sphere_states, substance_levels)
    )
```

#### 4.2.3 Behavior Predictor

**Fonction:** Prédire les comportements probables.

**MVP simplifié:**
```python
def predict_behavior(
    cognitive_state: CognitiveState,
    context: ContextState,
    history: List[BehaviorEvent]
) -> BehaviorPrediction:
    
    # Simple rule-based for MVP
    predictions = []
    
    # Rule: Low energy + evening → likely to seek rest
    if cognitive_state.alertness < 0.4 and context.time_of_day == 'evening':
        predictions.append(('seek_rest', 0.7))
    
    # Rule: THC declining + history of redosing → likely redose
    if cognitive_state.dominant_substance == 'thc':
        thc_level = cognitive_state.substance_levels['thc']
        if thc_level.phase == 'declining' and has_redose_pattern(history):
            predictions.append(('substance_intake_thc', 0.6))
    
    # Rule: High focus + active task → continue task
    if cognitive_state.focus > 0.7 and context.active_task:
        predictions.append(('continue_task', 0.8))
    
    return BehaviorPrediction(
        predictions=sorted(predictions, key=lambda x: -x[1]),
        confidence=compute_confidence(predictions)
    )
```

#### 4.2.4 Calibration Engine

**Fonction:** Apprendre des erreurs de prédiction.

```python
def calibrate(
    prediction: BehaviorPrediction,
    observation: BehaviorObservation,
    model_state: ModelState
) -> List[Adjustment]:
    
    adjustments = []
    
    if prediction.top_prediction != observation.behavior:
        # Compute error
        error_magnitude = 1.0  # Binary for MVP
        
        # Find candidate variables to adjust
        candidates = identify_candidates(prediction, observation, model_state)
        
        for var in candidates:
            # Adjust based on certainty
            adjustment = error_magnitude * (1 - var.certainty) * var.explanatory_power
            adjustment = clip(adjustment, -MAX_ADJUSTMENT, MAX_ADJUSTMENT)
            
            adjustments.append(Adjustment(
                variable=var.path,
                delta=adjustment,
                reason=f"Predicted {prediction.top_prediction}, observed {observation.behavior}"
            ))
    
    return adjustments
```

---

### 4.3 STORE LAYER

#### 4.3.1 Data Model

```typescript
// Core entities
interface User {
  id: string;
  name: string;
  created_at: Date;
  qi_base: Record<string, number>;
  personality_type: string[];
  substance_profiles: Record<string, SubstanceProfile>;
}

interface IntakeEvent {
  id: string;
  user_id: string;
  timestamp: Date;
  substance: string;
  dose: number;
  dose_unit: string;
  route: string;
  params: Record<string, any>;
}

interface StateReport {
  id: string;
  user_id: string;
  timestamp: Date;
  type: 'mood' | 'energy' | 'focus' | 'custom';
  value: number;
  note?: string;
}

interface BehaviorObservation {
  id: string;
  user_id: string;
  timestamp: Date;
  behavior: string;
  source: 'self_report' | 'inferred' | 'observed';
  confidence: number;
}

interface CalibrationEntry {
  id: string;
  user_id: string;
  timestamp: Date;
  prediction: BehaviorPrediction;
  observation: BehaviorObservation;
  adjustments: Adjustment[];
}

// Time series for levels
interface SubstanceLevelSample {
  user_id: string;
  timestamp: Date;
  substance: string;
  level: number;
  phase: string;
}
```

#### 4.3.2 Storage Options

| Option | Pros | Cons | MVP? |
|--------|------|------|------|
| **SQLite** | Simple, local, fast | Not real-time sync | ✅ |
| **IndexedDB** | Browser-native, offline | Limited queries | ✅ |
| **PouchDB** | Offline + sync | Setup complexity | Phase 2 |
| **Supabase** | Real-time, auth, free tier | Cloud dependency | Phase 2 |
| **FalkorDB** | Graph queries, Mind Protocol aligned | Overkill for MVP | Phase 3 |

**Recommandation MVP:** IndexedDB (via Dexie.js) + JSON export

---

### 4.4 OUTPUT LAYER

#### 4.4.1 Dashboard

**Fonction:** Visualiser l'état et l'historique.

**Vues essentielles:**
1. **Now** — État actuel, niveaux, prédictions
2. **Timeline** — Historique des dernières 24h
3. **Patterns** — Insights sur les comportements
4. **Settings** — Configuration, export

**Mockup — Vue "Now":**
```
┌─────────────────────────────────────────────────────┐
│  MIND-MCP DASHBOARD                    👤 NLR      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  SUBSTANCE LEVELS                                   │
│  ┌─────────────────────────────────────────────┐   │
│  │ THC     ████████████░░░░░░░░  58% declining │   │
│  │ CBD     ██████░░░░░░░░░░░░░░  31% plateau   │   │
│  │ Nicotine ██░░░░░░░░░░░░░░░░░░  12% declining │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  COGNITIVE STATE                                    │
│  ┌─────────────────────────────────────────────┐   │
│  │ Focus:     ████████░░  78%                  │   │
│  │ Alertness: ██████░░░░  62%                  │   │
│  │ Mood:      ███████░░░  71%                  │   │
│  │                                             │   │
│  │ Global reduction: -15% (THC effect)        │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  PREDICTIONS                                        │
│  ┌─────────────────────────────────────────────┐   │
│  │ 🔮 Likely next 30min:                       │   │
│  │    • Continue current task (78%)            │   │
│  │    • Take break (45%)                       │   │
│  │    • Redose nicotine (40%)                  │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  [+ Log Intake]  [📝 State Report]  [🔄 Refresh]   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### 4.4.2 Alerts (Phase 2)

- Notification si pattern problématique détecté
- Rappel de pause si usage intensif
- Suggestion si état non optimal pour tâche

---

## 5. Stack Technique Recommandée

### 5.1 MVP Stack

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                         │
│  ┌───────────────────────────────────────────────┐ │
│  │  React + TypeScript                           │ │
│  │  • Vite (build)                               │ │
│  │  • TailwindCSS (styling)                      │ │
│  │  • Recharts (visualisations)                  │ │
│  │  • PWA (offline)                              │ │
│  └───────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────┤
│                    STORAGE                          │
│  ┌───────────────────────────────────────────────┐ │
│  │  Dexie.js (IndexedDB wrapper)                 │ │
│  │  • Offline-first                              │ │
│  │  • TypeScript support                         │ │
│  │  • Easy queries                               │ │
│  └───────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────┤
│                    COMPUTE                          │
│  ┌───────────────────────────────────────────────┐ │
│  │  TypeScript (in-browser)                      │ │
│  │  • Pharma engine                              │ │
│  │  • Cognitive model                            │ │
│  │  • Predictor                                  │ │
│  │  • Calibrator                                 │ │
│  └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

**Pourquoi ce stack:**
- **Tout en TypeScript** — Un seul langage, type safety
- **Tout dans le browser** — Pas de backend à maintenir
- **PWA** — Installable, offline, cross-platform
- **React** — NLR connaît, large écosystème

### 5.2 Phase 2+ Stack (si besoin de backend)

```
┌─────────────────────────────────────────────────────┐
│                    BACKEND                          │
│  ┌───────────────────────────────────────────────┐ │
│  │  Option A: Supabase (hosted)                  │ │
│  │  • Auth, DB, real-time                        │ │
│  │  • Free tier généreux                         │ │
│  │  OR                                           │ │
│  │  Option B: Self-hosted                        │ │
│  │  • Node.js + SQLite                           │ │
│  │  • PocketBase (all-in-one)                    │ │
│  └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## 6. MVP Scope

### 6.1 MVP 1 — "Working Tracker" (2-3 semaines)

**Objectif:** Tracker fonctionnel avec les features essentielles.

**Features:**
- [x] UI pour logger intake (substances)
- [x] UI pour logger état (mood, energy, focus)
- [ ] Calcul temps réel des niveaux de substances
- [ ] Visualisation basique (barres de niveau)
- [ ] Stockage local (IndexedDB)
- [ ] Export JSON

**Pas dans MVP 1:**
- Prédiction comportementale
- Calibration
- Multi-utilisateur
- Sync cloud

### 6.2 MVP 2 — "Predictive Model" (+2-3 semaines)

**Objectif:** Ajouter la prédiction et la boucle de calibration.

**Features:**
- [ ] Prédiction comportementale (rule-based)
- [ ] Input pour observer le comportement réel
- [ ] Comparaison prédit vs observé
- [ ] Calibration simple
- [ ] Dashboard avec insights

### 6.3 MVP 3 — "Multi-User & Profiles" (+2-3 semaines)

**Objectif:** Support NLR + Aurore avec profils distincts.

**Features:**
- [ ] Multi-profils
- [ ] Import QI de tests (Bacq)
- [ ] Personnalisation des substance profiles
- [ ] Historique long terme
- [ ] Patterns et analytics

---

## 7. File Structure

```
mind-mcp-app/
├── public/
│   ├── manifest.json        # PWA manifest
│   └── icons/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── IntakeLogger/
│   │   ├── StateReport/
│   │   ├── Dashboard/
│   │   │   ├── LevelBars.tsx
│   │   │   ├── CognitiveState.tsx
│   │   │   └── Predictions.tsx
│   │   └── Settings/
│   ├── engine/
│   │   ├── pharma/
│   │   │   ├── index.ts
│   │   │   ├── models.ts
│   │   │   └── profiles.ts      # From YAML
│   │   ├── cognitive/
│   │   │   ├── index.ts
│   │   │   ├── qi.ts
│   │   │   └── spheres.ts
│   │   ├── predictor/
│   │   │   ├── index.ts
│   │   │   └── rules.ts
│   │   └── calibrator/
│   │       └── index.ts
│   ├── store/
│   │   ├── db.ts               # Dexie setup
│   │   ├── intake.ts
│   │   ├── state.ts
│   │   └── calibration.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 8. Données de Démarrage

Les fichiers YAML existants deviennent les données initiales :

**`profiles.ts`** (généré depuis `mind-mcp-schema.yaml`)
```typescript
export const SUBSTANCE_PROFILES = {
  nicotine: {
    routes: {
      pulmonary: {
        bioavailability: 0.9,
        t_onset_minutes: 0.25,
        t_peak_minutes: 3,
        t_half_minutes: 120,
      }
    },
    effects: {
      cognitive_impact: 0.05,  // Slight boost
      focus_modifier: 1.15,
      alertness_modifier: 1.1,
    },
    saturation: {
      threshold_hits: 2,
      diminishing_returns: 0.5,
    }
  },
  thc: {
    routes: {
      pulmonary: {
        bioavailability: 0.3,
        t_onset_minutes: 1,
        t_peak_minutes: 10,
        t_half_minutes: 180,
      }
    },
    effects: {
      cognitive_impact: 0.15,  // Reduction
      focus_modifier: 0.85,
      creativity_modifier: 1.2,
    },
    temperature_profiles: {
      180: { thc_extraction: 0.6, cbn_extraction: 0.1, sedation: 0.2 },
      200: { thc_extraction: 0.8, cbn_extraction: 0.3, sedation: 0.4 },
      230: { thc_extraction: 0.95, cbn_extraction: 0.8, sedation: 0.7 },
    }
  },
  cbd: {
    routes: {
      sublingual: {
        bioavailability: 0.35,
        t_onset_minutes: 15,
        t_peak_minutes: 60,
        t_half_minutes: 360,
      }
    },
    effects: {
      cognitive_impact: 0.02,
      anxiety_reduction: 0.3,
      focus_modifier: 1.05,
    }
  }
};
```

---

## 9. Prochaines Actions

### Immédiat (cette session ou prochaine)
1. [ ] Initialiser le repo (`mind-mcp-app`)
2. [ ] Setup Vite + React + TypeScript + Tailwind
3. [ ] Créer les types de base (`types/index.ts`)
4. [ ] Implémenter le pharma engine basic
5. [ ] UI minimale pour logger un intake

### Cette semaine
6. [ ] Dexie setup pour stockage
7. [ ] Dashboard basic (level bars)
8. [ ] PWA configuration
9. [ ] Tester avec données réelles (NLR)

### Semaine prochaine
10. [ ] State reports
11. [ ] Timeline view
12. [ ] Cognitive model integration
13. [ ] Export/import JSON

---

## 10. Risques et Mitigations

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Scope creep | Retard, abandon | MVP strict, features gated |
| Over-engineering | Temps perdu | Simple first, refactor later |
| Données perdues | Frustration | Export fréquent, backup auto |
| Modèle inexact | Mauvaises prédictions | Calibration explicite, humilité |
| Fatigue NLR | Développement lent | Sessions courtes, IA prend le relais |

---

## 11. Note sur l'Extension IA

Ce document décrit le système pour **humains**. 

Pour l'extension **IA** (Marco, autres citoyens Mind Protocol), l'architecture reste similaire mais :
- **Inputs** : Tokens de contexte, position dans la fenêtre, historique conversation
- **Compute** : Mêmes modèles adaptés au substrat numérique
- **Store** : Vector DB pour embeddings, graph pour relations
- **Output** : Métriques internes, pas de UI visible

Cette extension sera documentée séparément une fois le système humain validé.

---

*"First, make it work. Then, make it right. Then, make it fast."*

---

**Status:** Ready for implementation  
**Next:** Initialiser le repo et commencer le code
