# Biology Olympiad Question Bank — Progress Tracker

## Goal
Build the most comprehensive Biology Olympiad prep resource: **3,000 questions** covering IBO, USABO, NSEB, INBO, and BBO with question types that match actual exam formats.

---

## Target Distribution

### By Campbell Unit (IBO Weightage)

| Unit | Name | Chapters | Target | Generated | Seeded | IBO Weight |
|------|------|----------|--------|-----------|--------|------------|
| 7 | Animal Form & Function | Ch 40-49 | 750 | 0 | 0 | 25% |
| 2 | The Cell | Ch 6-12 | 600 | 0 | 0 | 20% |
| 3 | Genetics | Ch 13-21 | 600 | 0 | 0 | 20% |
| 6 | Plant Form & Function | Ch 35-39 | 375 | 0 | 0 | 12.5% |
| 4 | Evolution | Ch 22-26 | 225 | 0 | 0 | 7.5% |
| 8 | Ecology | Ch 52-56 | 225 | 0 | 0 | 7.5% |
| 5 | Diversity of Life | Ch 27-34 | 150 | 0 | 0 | 5% |
| 1 | Chemistry of Life | Ch 1-5 | 75 | 0 | 0 | 2.5% |
| **Total** | | | **3,000** | **0** | **0** | |

### By Question Type

| Type | Target | Generated | Seeded | Primary Use |
|------|--------|-----------|--------|-------------|
| MCQ (standard) | 1,200 (40%) | 0 | 0 | NSEB, USABO Open, BBO |
| MTF | 750 (25%) | 0 | 0 | IBO, USABO Semi |
| DATA_INTERPRETATION | 450 (15%) | 0 | 0 | All levels |
| MULTIPLE_SELECT | 300 (10%) | 0 | 0 | NSEB Part A2, USABO Semi |
| EXPERIMENTAL_DESIGN | 300 (10%) | 0 | 0 | IBO, USABO Semi |

### By Olympiad Level

| Level | Target | Generated | Seeded | Difficulty |
|-------|--------|-----------|--------|------------|
| NSEB | 750 | 0 | 0 | HARD |
| USABO_OPEN | 600 | 0 | 0 | HARD |
| USABO_SEMI | 450 | 0 | 0 | EXPERT |
| INBO | 450 | 0 | 0 | EXPERT |
| BBO | 300 | 0 | 0 | HARD-EXPERT |
| IBO | 450 | 0 | 0 | EXPERT |

### By Source Textbook

| Source | Target | Generated | Scope |
|--------|--------|-----------|-------|
| Campbell Biology 12e | 1,500 (50%) | 0 | Core syllabus |
| Alberts — Mol Bio Cell | 600 (20%) | 0 | Signal transduction, protein sorting, gene regulation |
| Lehninger — Biochemistry | 300 (10%) | 0 | Enzyme kinetics, metabolic regulation |
| Lewin's Genes | 200 (6.7%) | 0 | Epigenetics, chromatin biology |
| Eckert/Hill — Animal Phys | 200 (6.7%) | 0 | Comparative physiology, neurophysiology |
| Raven — Plant Biology | 100 (3.3%) | 0 | Advanced plant physiology |
| IBO/USABO Past Papers | 100 (3.3%) | 0 | All domains |

---

## Generation Waves

### Wave 1: Campbell Tier 1 (Cell + Animal Phys + Genetics)
**Target**: ~1,200 questions
**Status**: NOT STARTED
- [ ] Unit 2: The Cell — 200 MCQ + 100 MTF + 50 DATA_INTERPRETATION
- [ ] Unit 3: Genetics — 200 MCQ + 100 MTF + 50 DATA_INTERPRETATION
- [ ] Unit 7: Animal Physiology — 250 MCQ + 150 MTF + 100 DATA_INTERPRETATION

### Wave 2: Campbell Tier 2+3 + Data Interpretation
**Target**: ~800 questions
**Status**: NOT STARTED
- [ ] Unit 4: Evolution — 100 MCQ + 50 MTF + 25 DATA_INTERPRETATION
- [ ] Unit 5: Diversity of Life — 75 MCQ + 25 MTF + 25 DATA_INTERPRETATION
- [ ] Unit 6: Plant Form & Function — 150 MCQ + 75 MTF + 50 DATA_INTERPRETATION
- [ ] Unit 8: Ecology — 100 MCQ + 50 MTF + 25 DATA_INTERPRETATION
- [ ] Unit 1: Chemistry of Life — 50 MCQ + 25 MTF

### Wave 3: Advanced Source Questions
**Target**: ~600 questions
**Status**: NOT STARTED
- [ ] Alberts: Signal transduction, protein sorting — 200 MTF + 100 DATA_INTERPRETATION
- [ ] Lehninger: Enzyme kinetics, metabolic regulation — 100 MTF + 50 DATA_INTERPRETATION
- [ ] Lewin: Epigenetics, chromatin biology — 75 MTF + 75 DATA_INTERPRETATION

### Wave 4: Experimental Design + Past Papers
**Target**: ~400 questions
**Status**: NOT STARTED
- [ ] Experimental Design questions across all units — 300
- [ ] IBO/USABO Past Paper adaptations — 100

---

## JSON Batch File Format

### Standard MCQ
```json
{
  "type": "MCQ",
  "question": "Which complex of the electron transport chain...",
  "options": ["Complex I", "Complex II", "Complex III", "Complex IV"],
  "correctAnswer": "B",
  "explanation": "Complex II (succinate dehydrogenase) does not pump protons...",
  "isOlympiad": true,
  "olympiadLevel": "NSEB",
  "campbellUnit": 2,
  "campbellChapter": 9,
  "sourceTextbook": "Campbell-12e",
  "conceptualDepth": "intermediate",
  "difficulty": "HARD",
  "topic": "Cell Structure and Function"
}
```

### MTF (Multiple True/False)
```json
{
  "type": "MTF",
  "question": "Evaluate the following statements about oxidative phosphorylation:",
  "options": [
    "The proton gradient stores energy as proton-motive force",
    "Complex II directly pumps protons across the inner membrane",
    "Oligomycin blocks ATP synthase by preventing proton flow through Fo",
    "Uncoupling proteins increase ETC rate while decreasing ATP production"
  ],
  "correctAnswer": "TFTT",
  "explanation": "S1: TRUE — PMF stores electrochemical energy. S2: FALSE — Complex II does NOT pump protons...",
  "isOlympiad": true,
  "olympiadLevel": "IBO",
  "campbellUnit": 2,
  "campbellChapter": 9,
  "sourceTextbook": "Campbell-12e",
  "conceptualDepth": "expert",
  "difficulty": "EXPERT"
}
```

### DATA_INTERPRETATION
```json
{
  "type": "DATA_INTERPRETATION",
  "question": "Based on the data, which conclusion is best supported?",
  "dataContext": "Table 1: Enzyme activity at different pH values...",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "C",
  "explanation": "The data shows...",
  "isOlympiad": true,
  "olympiadLevel": "USABO_SEMI",
  "difficulty": "EXPERT"
}
```

### EXPERIMENTAL_DESIGN
```json
{
  "type": "EXPERIMENTAL_DESIGN",
  "question": "What is the most appropriate control for this experiment?",
  "experimentContext": "A researcher wants to test whether auxin promotes...",
  "options": ["Control A", "Control B", "Control C", "Control D"],
  "correctAnswer": "B",
  "explanation": "The proper control should...",
  "isOlympiad": true,
  "olympiadLevel": "IBO",
  "difficulty": "EXPERT"
}
```

---

## Batch File Naming Convention

```
src/data/mcq-batches/olympiad/
  unit2-cell/
    campbell-ch06-cell-membrane-mcq.json
    campbell-ch06-cell-membrane-mtf.json
    campbell-ch09-cellular-respiration-mcq.json
    campbell-ch09-cellular-respiration-mtf.json
    campbell-ch09-cellular-respiration-data.json
  unit3-genetics/
    campbell-ch13-meiosis-mcq.json
    campbell-ch14-mendel-genetics-mtf.json
    ...
  unit7-animal-physiology/
    campbell-ch40-animal-structure-mcq.json
    campbell-ch44-osmoregulation-mtf.json
    ...
```

---

## Infrastructure Checklist

- [x] Prisma schema: MTF, DATA_INTERPRETATION, EXPERIMENTAL_DESIGN enum values added
- [x] Prisma schema: sourceTextbook, dataContext, experimentContext fields added
- [x] TypeScript types: OlympiadLevel, MTFAnswerResult, widened correctAnswer
- [x] Gamification: EXPERT XP (25), MTF scoring (1.0/0.6/0.2/0.0)
- [x] Submit API: MTF partial credit scoring, mtfDetails in response
- [x] Questions API: olympiad fields in response transform
- [x] MTFCard component: T/F toggles, keyboard shortcuts, partial score display
- [x] DataInterpretationCard: data context panel
- [x] ExperimentalDesignCard: experiment context panel
- [x] QuestionRenderer: 3 new case branches
- [x] Seed script: handles new fields + MTF format
- [x] Olympiad Practice Hub: redesigned with 4 sections
- [ ] Wave 1 content generation (1,200 Qs)
- [ ] Wave 2 content generation (800 Qs)
- [ ] Wave 3 content generation (600 Qs)
- [ ] Wave 4 content generation (400 Qs)
- [ ] Seed all batches to database
- [ ] Production build verification
- [ ] Regression testing (NEET MCQ still works)
