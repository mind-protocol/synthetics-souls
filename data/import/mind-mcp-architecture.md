# MIND-MCP COGNITIVE ARCHITECTURE
## Architecture Logique Complète

**Version:** 0.1.0  
**Date:** 2025-01-25  
**Status:** Draft — Modélisation

---

## Table des Matières

1. [Vue d'ensemble](#1-vue-densemble)
2. [Layers d'abstraction](#2-layers-dabstraction)
3. [Flux de données](#3-flux-de-données)
4. [Composants détaillés](#4-composants-détaillés)
5. [Boucle de feedback](#5-boucle-de-feedback)
6. [Interfaces](#6-interfaces)
7. [États du système](#7-états-du-système)

---

## 1. Vue d'ensemble

### 1.1 Principe fondamental

Le système est une **boucle fermée auto-calibrante** :
- Les inputs sensoriels et substances alimentent un modèle cognitif
- Le modèle prédit le comportement
- Le comportement observé est comparé à la prédiction
- L'erreur calibre le modèle

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│    ENVIRONNEMENT ──→ PERCEPTION ──→ COGNITION ──→ ACTION       │
│          ↑                                            │         │
│          └────────────────────────────────────────────┘         │
│                        (feedback loop)                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Diagramme principal

```mermaid
flowchart TB
    subgraph ENV["🌍 ENVIRONNEMENT EXTERNE"]
        E1[Monde physique]
        E2[Contexte social]
        E3[Contexte temporel]
    end

    subgraph INPUT["📥 LAYER 0: INPUTS"]
        subgraph SENS["Sensoriels"]
            S1[Visuel]
            S2[Auditif]
            S3[Tactile]
            S4[Proprioceptif]
            S5[Intéroceptif]
        end
        subgraph SUBST["Substances"]
            SB1[Nicotine]
            SB2[THC]
            SB3[CBD]
            SB4[Autres]
        end
        subgraph CTX["Contexte"]
            C1[Temporel]
            C2[Spatial]
            C3[Social]
        end
    end

    subgraph PERCEPT["👁️ LAYER 1-2: PERCEPTION"]
        P1[L1: Features brutes]
        P2[L2: Patterns]
        P3[L3: Objets]
        P4[L4: Concepts]
    end

    subgraph CORE["🧠 LAYER 3: NOYAU COGNITIF"]
        subgraph QI["QI Vectors"]
            Q1[Base]
            Q2[Perception]
            Q3[Effectif]
            Q4[Final]
        end
        subgraph PERS["Personnalité"]
            PE1[Types]
            PE2[Sphères]
        end
        subgraph SURV["Survie"]
            SU1[Préservation]
            SU2[Destruction]
        end
        INTEG[Intégrateur]
    end

    subgraph PRED["🎯 LAYER 4: PRÉDICTION"]
        PR1[Modèle prédictif]
        PR2[P comportement]
    end

    subgraph OUTPUT["📤 LAYER 5: OUTPUT"]
        O1[Décision]
        O2[Action motrice]
        O3[Comportement effectif]
    end

    subgraph CALIB["🔄 LAYER 6: CALIBRATION"]
        CA1[Comparateur]
        CA2[Erreur Δ]
        CA3[Ajustement]
    end

    ENV --> INPUT
    INPUT --> PERCEPT
    PERCEPT --> CORE
    QI --> INTEG
    PERS --> INTEG
    SURV --> INTEG
    INTEG --> PRED
    PRED --> OUTPUT
    OUTPUT --> ENV
    OUTPUT --> CA1
    PR2 --> CA1
    CA1 --> CA2
    CA2 --> CA3
    CA3 -.->|calibre| QI
    CA3 -.->|calibre| PERS
    CA3 -.->|calibre| SUBST
```

---

## 2. Layers d'abstraction

### 2.0 Layer 0 — Inputs (Acquisition)

**Fonction:** Capturer les données brutes du monde et de l'état interne.

```mermaid
flowchart LR
    subgraph L0["LAYER 0: INPUTS"]
        direction TB
        
        subgraph HARDWARE["Hardware Layer"]
            H1["📷 Caméra"]
            H2["🎤 Microphone"]
            H3["⌚ Wearable"]
            H4["💨 Vape connectée"]
            H5["📱 App boutons"]
        end
        
        subgraph SIGNALS["Signal Layer"]
            SIG1["Flux vidéo"]
            SIG2["Flux audio"]
            SIG3["Données IMU"]
            SIG4["Timestamps intake"]
            SIG5["Self-reports"]
        end
        
        subgraph NORMALIZED["Normalized Layer"]
            N1["frames[]"]
            N2["samples[]"]
            N3["vectors[]"]
            N4["events[]"]
            N5["ratings[]"]
        end
        
        HARDWARE --> SIGNALS --> NORMALIZED
    end
```

| Input Type | Hardware possible | Signal | Fréquence | Certitude |
|------------|------------------|--------|-----------|-----------|
| Visuel | Caméra / Google Glass | Frames RGB | 30 fps | Haute |
| Auditif | Microphone | Samples audio | 44.1 kHz | Haute |
| Proprioceptif | IMU / Accéléromètre | Vecteurs 3D | 100 Hz | Moyenne |
| Cardiaque | Smart ring / Watch | BPM, HRV | 1 Hz | Haute |
| Substances | Vape connectée / Bouton | Event timestamp | Event-driven | Variable |
| Self-report | App UI | Rating scale | On-demand | Basse-Moyenne |

---

### 2.1 Layer 1 — Features brutes (Extraction)

**Fonction:** Extraire les caractéristiques de bas niveau des signaux bruts.

```mermaid
flowchart LR
    subgraph L1["LAYER 1: FEATURES BRUTES"]
        direction TB
        
        subgraph VIS["Visuel"]
            V1["Luminosité"] 
            V2["Couleurs dominantes"]
            V3["Edges (Canny)"]
            V4["Mouvements (optical flow)"]
        end
        
        subgraph AUD["Auditif"]
            A1["Volume dB"]
            A2["Spectre fréquences"]
            A3["Onset detection"]
        end
        
        subgraph PROP["Proprioceptif"]
            PR1["Accélération 3D"]
            PR2["Orientation"]
            PR3["Variabilité posturale"]
        end
        
        subgraph CHEM["Chimique"]
            CH1["Courbes pharmacocinétiques"]
            CH2["Niveaux estimés"]
            CH3["Interactions"]
        end
    end
```

**Opérations:**
- Filtrage du bruit
- Normalisation
- Extraction de features (FFT, edge detection, etc.)
- Calcul des courbes de substances

---

### 2.2 Layer 2 — Patterns (Agrégation)

**Fonction:** Regrouper les features en patterns reconnaissables.

```mermaid
flowchart LR
    subgraph L2["LAYER 2: PATTERNS"]
        direction TB
        
        subgraph VIS["Visuel"]
            V1["Formes géométriques"]
            V2["Régions d'intérêt"]
            V3["Tracking objets"]
        end
        
        subgraph AUD["Auditif"]
            A1["Segments parole"]
            A2["Patterns musicaux"]
            A3["Sons environnementaux"]
        end
        
        subgraph BODY["Corps"]
            B1["Gestes reconnus"]
            B2["Postures"]
            B3["Patterns de mouvement"]
        end
        
        subgraph STATE["État chimique"]
            S1["Phase de la courbe"]
            S2["Combinaisons actives"]
            S3["Effets attendus"]
        end
    end
```

---

### 2.3 Layer 3 — Objets (Reconnaissance)

**Fonction:** Identifier des entités discrètes à partir des patterns.

```mermaid
flowchart LR
    subgraph L3["LAYER 3: OBJETS"]
        direction TB
        
        subgraph ENTITIES["Entités"]
            E1["Personnes détectées"]
            E2["Objets identifiés"]
            E3["Lieux reconnus"]
        end
        
        subgraph ACTIONS["Actions"]
            A1["Actions en cours"]
            A2["Interactions observées"]
        end
        
        subgraph STATES["États"]
            S1["État émotionnel visible"]
            S2["Niveau d'activité"]
            S3["État physiologique"]
        end
    end
```

---

### 2.4 Layer 4 — Concepts (Sémantique)

**Fonction:** Mapper les objets sur des catégories significatives pour la survie et la cognition.

```mermaid
flowchart LR
    subgraph L4["LAYER 4: CONCEPTS"]
        direction TB
        
        subgraph SURVIVAL["Catégories Survie"]
            SV1["🦁 Prédateur/Menace"]
            SV2["🐰 Proie/Ressource"]
            SV3["🍎 Nourriture"]
            SV4["☠️ Poison/Danger"]
            SV5["🏠 Abri/Sécurité"]
            SV6["💕 Partenaire potentiel"]
            SV7["👥 Allié/Groupe"]
        end
        
        subgraph COGNITIVE["Catégories Cognitives"]
            CG1["📋 Tâche en cours"]
            CG2["🎯 Objectif actif"]
            CG3["⚠️ Problème détecté"]
            CG4["💡 Opportunité"]
        end
        
        subgraph EMOTIONAL["Catégories Émotionnelles"]
            EM1["Valence (+/-)"]
            EM2["Arousal (haut/bas)"]
            EM3["Dominance"]
        end
    end
```

---

### 2.5 Layer 5 — Noyau Cognitif (Intégration)

**Fonction:** Combiner toutes les informations pour produire un état cognitif intégré.

```mermaid
flowchart TB
    subgraph L5["LAYER 5: NOYAU COGNITIF"]
        
        subgraph INPUTS_CORE["Entrées"]
            I1["Concepts (L4)"]
            I2["État substances"]
            I3["Contexte"]
        end
        
        subgraph QI_PROC["Traitement QI"]
            direction LR
            QI1["QI Base\n(statique)"]
            QI2["QI Perception\n(méta-cognition)"]
            QI3["QI Effectif\n= f(Base, Perception)"]
            QI4["QI Final\n= Effectif × Réductions"]
            
            QI1 --> QI3
            QI2 --> QI3
            QI3 --> QI4
        end
        
        subgraph PERS_PROC["Traitement Personnalité"]
            direction LR
            PS1["Types\n(HPI, ADHD...)"]
            PS2["Sphères\n(Sécurité, Énergie...)"]
            PS3["Déficits\n(analyse)"]
            
            PS1 --> PS3
            PS2 --> PS3
        end
        
        subgraph SURV_PROC["Traitement Survie"]
            direction LR
            SV1["Préservation\n(self, offspring)"]
            SV2["Destruction\n(targeted, global)"]
            SV3["Balance\n survie"]
            
            SV1 --> SV3
            SV2 --> SV3
        end
        
        subgraph INTEGRATION["Intégration"]
            INT1["Vecteur d'état\ncognitif complet"]
        end
        
        I1 --> QI_PROC
        I2 --> QI_PROC
        I3 --> PERS_PROC
        
        QI4 --> INT1
        PS3 --> INT1
        SV3 --> INT1
    end
```

**Équations clés (à formaliser en Layer Math):**

```
QI_effective[i] = f(QI_base[i], QI_perception[i])

QI_final[i] = QI_effective[i] × global_reduction × sphere_modifiers[i]

global_reduction = Π(1 - factor_weight[j] × factor_impact[j])

cognitive_state = {QI_final[], spheres[], survival_balance, active_concepts[]}
```

---

### 2.6 Layer 6 — Prédiction (Décision)

**Fonction:** Prédire le comportement le plus probable étant donné l'état cognitif.

```mermaid
flowchart TB
    subgraph L6["LAYER 6: PRÉDICTION"]
        
        subgraph INPUT_PRED["Entrées"]
            IP1["État cognitif (L5)"]
            IP2["Priors comportementaux"]
            IP3["Historique actions"]
        end
        
        subgraph MODEL["Modèle Prédictif"]
            direction TB
            M1["Espace des actions possibles"]
            M2["P(action | état)"]
            M3["Ranking par probabilité"]
        end
        
        subgraph OUTPUT_PRED["Sorties"]
            OP1["Action prédite"]
            OP2["Confiance"]
            OP3["Alternatives"]
            OP4["Facteurs contributifs"]
        end
        
        INPUT_PRED --> MODEL --> OUTPUT_PRED
    end
```

**Catégories d'actions:**

| Catégorie | Exemples | Drivers principaux |
|-----------|----------|-------------------|
| Approach_food | Manger, boire, cuisiner | Faim, opportunité |
| Avoid_threat | Fuir, se cacher, combattre | Sécurité basse, menace détectée |
| Seek_rest | Dormir, s'asseoir, pause | Énergie basse |
| Social_engage | Parler, toucher, approcher | Besoin social, partenaire |
| Task_execute | Travailler, créer, résoudre | Objectif actif, QI disponible |
| Substance_intake | Prendre hit, boire alcool | Craving, habitude, régulation |
| Self_harm | Comportements destructeurs | Survie_destruction élevé |

---

### 2.7 Layer 7 — Output (Action)

**Fonction:** Exécuter l'action et la rendre observable.

```mermaid
flowchart LR
    subgraph L7["LAYER 7: OUTPUT"]
        direction TB
        
        subgraph DECISION["Décision"]
            D1["Action sélectionnée"]
            D2["Paramètres action"]
            D3["Timing"]
        end
        
        subgraph MOTOR["Exécution Motrice"]
            MO1["Planning moteur"]
            MO2["Commandes musculaires"]
            MO3["Mouvement"]
        end
        
        subgraph OBSERVABLE["Observable"]
            OB1["Comportement visible"]
            OB2["Effet sur environnement"]
            OB3["Feedback sensoriel"]
        end
        
        DECISION --> MOTOR --> OBSERVABLE
    end
```

---

### 2.8 Layer 8 — Calibration (Apprentissage)

**Fonction:** Comparer prédiction et observation, ajuster le modèle.

```mermaid
flowchart TB
    subgraph L8["LAYER 8: CALIBRATION"]
        
        subgraph COMPARE["Comparaison"]
            C1["Prédit (L6)"]
            C2["Observé (L7)"]
            C3["Match?"]
            
            C1 --> C3
            C2 --> C3
        end
        
        subgraph ERROR["Analyse Erreur"]
            E1["Δ magnitude"]
            E2["Δ direction"]
            E3["Variables candidates"]
        end
        
        subgraph ADJUST["Ajustement"]
            A1["Sélection variables"]
            A2["Calcul ajustement"]
            A3["Application pondérée"]
        end
        
        subgraph CONSTRAINTS["Contraintes"]
            CO1["Priors science"]
            CO2["Certitude variables"]
            CO3["Limites ajustement"]
        end
        
        C3 -->|"No"| ERROR
        ERROR --> ADJUST
        CONSTRAINTS --> ADJUST
        
        ADJUST -->|"Update"| TARGET["Variables du modèle\n(QI, substances, sphères)"]
    end
```

**Algorithme de calibration:**

```
1. IF prediction ≠ observation:
2.     error = compute_error(prediction, observation)
3.     candidates = identify_candidate_variables(error, model_state)
4.     FOR each candidate in candidates:
5.         adjustment = error × (1 - candidate.certainty) × explanatory_power(candidate, error)
6.         IF adjustment > MAX_ADJUSTMENT:
7.             adjustment = MAX_ADJUSTMENT
8.         IF adjustment contradicts prior:
9.             adjustment = 0 (or flag for review)
10.        candidate.value += adjustment
11.        candidate.certainty = update_certainty(candidate, observation_count)
12.    log_calibration(error, adjustments)
```

---

## 3. Flux de données

### 3.1 Flux principal (Forward)

```mermaid
flowchart LR
    subgraph FORWARD["FLUX FORWARD (Perception → Action)"]
        direction LR
        
        L0["L0\nInputs"] 
        L1["L1\nFeatures"]
        L2["L2\nPatterns"]
        L3["L3\nObjets"]
        L4["L4\nConcepts"]
        L5["L5\nCognition"]
        L6["L6\nPrédiction"]
        L7["L7\nAction"]
        
        L0 -->|"extraction"| L1
        L1 -->|"agrégation"| L2
        L2 -->|"reconnaissance"| L3
        L3 -->|"sémantique"| L4
        L4 -->|"intégration"| L5
        L5 -->|"décision"| L6
        L6 -->|"exécution"| L7
    end
```

**Latences cibles:**

| Transition | Latence cible | Criticité |
|------------|---------------|-----------|
| L0 → L1 | < 50ms | Haute (temps réel) |
| L1 → L2 | < 100ms | Haute |
| L2 → L3 | < 200ms | Moyenne |
| L3 → L4 | < 100ms | Moyenne |
| L4 → L5 | < 50ms | Haute |
| L5 → L6 | < 100ms | Haute |
| L6 → L7 | Variable | Dépend de l'action |
| **Total** | < 600ms | — |

---

### 3.2 Flux feedback (Calibration)

```mermaid
flowchart RL
    subgraph FEEDBACK["FLUX FEEDBACK (Observation → Calibration)"]
        direction RL
        
        L7["L7\nAction\nobservée"]
        L8["L8\nCalibration"]
        L5_target["L5\nVariables\ncognitives"]
        L0_target["L0\nParamètres\nsubstances"]
        
        L7 -->|"observation"| L8
        L8 -->|"ajuste QI, sphères"| L5_target
        L8 -->|"ajuste courbes"| L0_target
    end
```

---

### 3.3 Flux latéral (Contexte)

```mermaid
flowchart TB
    subgraph LATERAL["FLUX LATÉRAL (Contexte)"]
        
        CTX["Contexte\n(temps, lieu, social)"]
        
        CTX --> L4["L4: Modifie\ninterprétation concepts"]
        CTX --> L5["L5: Modifie\nsphères personnalité"]
        CTX --> L6["L6: Modifie\npriors comportement"]
    end
```

---

## 4. Composants détaillés

### 4.1 Pharmacokinetic Engine

**Responsabilité:** Calculer les niveaux de substances en temps réel.

```mermaid
flowchart TB
    subgraph PHARMA["PHARMACOKINETIC ENGINE"]
        
        subgraph INPUT_PH["Inputs"]
            I1["Event: intake(substance, dose, timestamp)"]
            I2["Config: substance_profile"]
        end
        
        subgraph COMPUTE["Compute"]
            C1["Absorption curve"]
            C2["Distribution"]
            C3["Elimination"]
            C4["Current level = ∫ curves"]
        end
        
        subgraph OUTPUT_PH["Outputs"]
            O1["level(t) pour chaque substance"]
            O2["component_levels (THC, CBN, terpènes)"]
            O3["receptor_saturation"]
            O4["expected_effects[]"]
        end
        
        INPUT_PH --> COMPUTE --> OUTPUT_PH
    end
```

**Modèle two-compartment:**

```
dA/dt = -k_abs × A                    (absorption)
dC/dt = k_abs × A - k_elim × C        (central compartment)

level(t) = dose × bioavailability × (e^(-k_elim×t) - e^(-k_abs×t)) / (k_abs - k_elim)
```

---

### 4.2 QI Processor

**Responsabilité:** Calculer les QI finals à partir des bases et de l'état actuel.

```mermaid
flowchart TB
    subgraph QI_PROC["QI PROCESSOR"]
        
        subgraph INPUTS_QI["Inputs"]
            I1["qi_base[i] — from tests"]
            I2["qi_perception[i] — from self-report"]
            I3["substance_levels — from pharma engine"]
            I4["spheres — from personality module"]
            I5["priors — from knowledge base"]
        end
        
        subgraph COMPUTE_QI["Compute"]
            C1["qi_effective[i] = combine(base, perception)"]
            C2["global_reduction = compute_reduction(substances, fatigue, stress)"]
            C3["sphere_modifiers[i] = apply_sphere_effects(spheres, qi_type[i])"]
            C4["prior_modifiers[i] = apply_priors(priors, state)"]
            C5["qi_final[i] = qi_effective[i] × global_reduction × sphere_mod × prior_mod"]
        end
        
        subgraph OUTPUTS_QI["Outputs"]
            O1["qi_final[i] for each intelligence type"]
            O2["qi_global (weighted average)"]
            O3["confidence[i] for each"]
        end
        
        INPUTS_QI --> COMPUTE_QI --> OUTPUTS_QI
    end
```

---

### 4.3 Behavior Predictor

**Responsabilité:** Prédire l'action la plus probable.

```mermaid
flowchart TB
    subgraph PREDICTOR["BEHAVIOR PREDICTOR"]
        
        subgraph INPUTS_BP["Inputs"]
            I1["cognitive_state — from QI processor"]
            I2["active_concepts — from perception"]
            I3["survival_balance — from survival module"]
            I4["action_history — from memory"]
        end
        
        subgraph COMPUTE_BP["Compute"]
            C1["action_space = enumerate_possible_actions(context)"]
            C2["FOR each action in action_space:"]
            C3["    P(action) = base_probability(action, cognitive_state)"]
            C4["    P(action) *= survival_modifier(action, survival_balance)"]
            C5["    P(action) *= habit_modifier(action, action_history)"]
            C6["    P(action) *= opportunity_modifier(action, active_concepts)"]
            C7["normalize(P)"]
            C8["predicted_action = argmax(P)"]
        end
        
        subgraph OUTPUTS_BP["Outputs"]
            O1["predicted_action"]
            O2["confidence = P(predicted_action)"]
            O3["alternatives = top_k(P, k=3)"]
            O4["contributing_factors[]"]
        end
        
        INPUTS_BP --> COMPUTE_BP --> OUTPUTS_BP
    end
```

---

### 4.4 Calibration Engine

**Responsabilité:** Apprendre des erreurs de prédiction.

```mermaid
flowchart TB
    subgraph CALIBRATION["CALIBRATION ENGINE"]
        
        subgraph INPUTS_CAL["Inputs"]
            I1["predicted_action — from predictor"]
            I2["observed_action — from observation"]
            I3["model_state — snapshot at prediction time"]
            I4["variable_certainties — current confidence levels"]
        end
        
        subgraph COMPARE_CAL["Compare"]
            C1{"predicted == observed?"}
        end
        
        subgraph ANALYZE["Analyze (if mismatch)"]
            A1["error_type = categorize(predicted, observed)"]
            A2["error_magnitude = compute_distance(predicted, observed)"]
            A3["candidate_vars = identify_explanatory_variables(error_type, model_state)"]
        end
        
        subgraph ADJUST_CAL["Adjust"]
            AD1["FOR each var in candidate_vars:"]
            AD2["    explanatory_power = compute_correlation(var, error)"]
            AD3["    adjustment_weight = (1 - var.certainty) × explanatory_power"]
            AD4["    delta = error_magnitude × adjustment_weight × LEARNING_RATE"]
            AD5["    var.value += clip(delta, -MAX_ADJ, +MAX_ADJ)"]
            AD6["    var.certainty = update(var.certainty, observation_count)"]
        end
        
        subgraph LOG_CAL["Log"]
            L1["calibration_entry = {timestamp, error, adjustments}"]
            L2["append to calibration_history"]
        end
        
        INPUTS_CAL --> COMPARE_CAL
        COMPARE_CAL -->|"Yes"| LOG_CAL
        COMPARE_CAL -->|"No"| ANALYZE
        ANALYZE --> ADJUST_CAL --> LOG_CAL
    end
```

---

## 5. Boucle de feedback

### 5.1 Vue temporelle

```mermaid
sequenceDiagram
    participant ENV as Environnement
    participant L0 as Layer 0 (Input)
    participant L1_4 as Layers 1-4 (Perception)
    participant L5 as Layer 5 (Cognition)
    participant L6 as Layer 6 (Prédiction)
    participant L7 as Layer 7 (Action)
    participant L8 as Layer 8 (Calibration)
    
    loop Chaque tick (100ms)
        ENV->>L0: Signaux sensoriels
        L0->>L1_4: Features extraites
        L1_4->>L5: Concepts reconnus
        L5->>L6: État cognitif
        L6->>L6: P(comportement)
    end
    
    Note over L6: Prédiction: "va rester assis"
    
    ENV->>L0: (temps passe...)
    L0->>L1_4: Mouvement détecté
    L1_4->>L7: Action reconnue: "verse whisky"
    
    L7->>L8: Observation ≠ Prédiction
    L8->>L8: Calcul erreur
    L8->>L5: Ajustement: stratégie_préservation -= 0.05
    L8->>L0: Ajustement: craving_estimation += 0.1
    
    Note over L8: Calibration logged
```

---

### 5.2 Fréquences des boucles

| Boucle | Fréquence | Description |
|--------|-----------|-------------|
| Perception loop | 10 Hz (100ms) | Update des features et concepts |
| Cognition loop | 2 Hz (500ms) | Update de l'état cognitif complet |
| Prediction loop | 1 Hz (1s) | Nouvelle prédiction comportementale |
| Calibration loop | Event-driven | Quand observation disponible |
| Substance loop | 0.1 Hz (10s) | Update des courbes pharmacocinétiques |

---

## 6. Interfaces

### 6.1 Interface Input (L0)

```yaml
InputEvent:
  type: enum [substance_intake, sensor_reading, self_report, context_change]
  timestamp: datetime
  source: string
  payload:
    # Variable selon type
```

**Events substance:**
```yaml
SubstanceIntakeEvent:
  type: "substance_intake"
  timestamp: "2025-01-25T15:30:00Z"
  source: "app_button"
  payload:
    substance: "thc"
    delivery_method: "pulmonary"
    dose_unit: "hits"
    dose_value: 1
    temperature_celsius: 230
```

**Events self-report:**
```yaml
SelfReportEvent:
  type: "self_report"
  timestamp: "2025-01-25T15:35:00Z"
  source: "app_slider"
  payload:
    variable: "core.personality.spheres.security.value"
    value: 45
    scale: [0, 100]
```

---

### 6.2 Interface Observation (L7 → L8)

```yaml
ObservationEvent:
  timestamp: datetime
  detection_method: enum [video_analysis, self_report, sensor, inferred]
  certainty: float [0-1]
  behavior:
    category: string  # from behavior taxonomy
    specific_action: string
    parameters: object  # action-specific
```

**Exemple:**
```yaml
ObservationEvent:
  timestamp: "2025-01-25T15:32:00Z"
  detection_method: "video_analysis"
  certainty: 0.85
  behavior:
    category: "substance_intake"
    specific_action: "pour_drink"
    parameters:
      substance: "alcohol"
      container: "whisky_glass"
      estimated_volume_ml: 50
```

---

### 6.3 Interface Calibration (L8 output)

```yaml
CalibrationEntry:
  timestamp: datetime
  prediction:
    action: string
    confidence: float
  observation:
    action: string
    certainty: float
  error:
    type: enum [correct, wrong_action, wrong_timing, wrong_intensity]
    magnitude: float
  adjustments:
    - variable: string (path)
      old_value: float
      new_value: float
      reason: string
```

---

## 7. États du système

### 7.1 State Machine globale

```mermaid
stateDiagram-v2
    [*] --> Initializing
    
    Initializing --> Calibrating: Config loaded
    Calibrating --> Running: Min calibration done
    
    Running --> Observing: Action detected
    Observing --> Comparing: Observation complete
    Comparing --> Adjusting: Error > threshold
    Comparing --> Running: Error ≤ threshold
    Adjusting --> Running: Adjustment applied
    
    Running --> Paused: User pause
    Paused --> Running: User resume
    
    Running --> [*]: Shutdown
```

### 7.2 États des variables

Chaque variable peut être dans un des états suivants:

```mermaid
stateDiagram-v2
    [*] --> Uninitialized
    
    Uninitialized --> Estimated: Default/prior applied
    Uninitialized --> Measured: Direct measurement
    
    Estimated --> Calibrated: Calibration adjustment
    Measured --> Calibrated: Calibration adjustment
    
    Calibrated --> Calibrated: Further calibration
    Calibrated --> Measured: New measurement
    
    Measured --> Stale: Time > threshold
    Calibrated --> Stale: Time > threshold
    Stale --> Measured: New measurement
    Stale --> Calibrated: Re-calibration
```

---

## 8. Prochaines étapes

### 8.1 Ce document définit

- ✅ Layers d'abstraction (L0-L8)
- ✅ Flux de données (forward, feedback, latéral)
- ✅ Composants principaux et leurs responsabilités
- ✅ Interfaces entre composants
- ✅ États du système

### 8.2 Documents suivants nécessaires

| Document | Contenu |
|----------|---------|
| **MATH_MODEL.md** | Formules statistiques, distributions, algorithmes de learning |
| **APP_ARCHITECTURE.md** | Stack technique, UI/UX, hardware, déploiement |
| **PRIORS_DATABASE.md** | Catalogue complet des priors comportementaux |
| **INSTANCE_TEMPLATE.yaml** | Template pour fichiers individuels (NLR, Aurore) |

---

## Appendix A: Taxonomie des comportements

```yaml
behavior_taxonomy:
  physiological:
    - eat
    - drink
    - sleep
    - excrete
    - breathe_change (sigh, hyperventilate)
    
  substance:
    - intake_nicotine
    - intake_thc
    - intake_cbd
    - intake_alcohol
    - intake_other
    
  motor:
    - sit
    - stand
    - walk
    - run
    - reach
    - grasp
    - release
    
  social:
    - approach_person
    - avoid_person
    - speak
    - listen
    - touch
    - gesture
    
  cognitive:
    - focus_task
    - switch_task
    - abandon_task
    - seek_information
    - create
    
  emotional:
    - express_joy
    - express_anger
    - express_sadness
    - express_fear
    - suppress_emotion
    
  self_regulation:
    - self_soothe
    - seek_stimulation
    - avoid_stimulation
    - self_harm
```

---

## Appendix B: Glossaire

| Terme | Définition |
|-------|------------|
| **Layer** | Niveau d'abstraction dans le traitement de l'information |
| **Forward flux** | Flux de données de la perception vers l'action |
| **Feedback flux** | Flux de données de l'observation vers la calibration |
| **Certainty** | Degré de confiance dans une valeur (0-1) |
| **Prior** | Contrainte basée sur la connaissance scientifique existante |
| **Calibration** | Ajustement des paramètres du modèle basé sur les observations |
| **Cognitive state** | Vecteur complet décrivant l'état mental à un instant t |
| **Global reduction** | Facteur multiplicatif affectant toutes les capacités cognitives |

---

*Document généré pour Mind-MCP v0.1.0*
*Architecture logique — Draft*
