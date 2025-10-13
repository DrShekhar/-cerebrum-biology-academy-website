# Task 5: Question Bank Population Plan

**Status:** In Progress
**Priority:** High (P0 - Critical for MVP Launch)
**Estimated Time:** 2-3 hours for 200 questions
**Target:** Add 200+ NEET Biology questions across all difficulty levels

---

## 📊 Current Status Analysis

### Existing Questions Inventory

**File: `/src/data/authenticQuestions.ts` (33 questions)**

- ✅ Class 9: 6 questions
- ✅ Class 10: 7 questions
- ✅ Class 11: 8 questions
- ✅ Class 12: 10 questions
- ✅ Dropper: 2 questions
- **Total: 33 questions**

**File: `/src/data/neetQuestionBank.ts` (2 questions)**

- ✅ Cell Biology: 2 questions
- Advanced question type examples: 12 questions (across 6 types)
- **Total: 14 questions**

**File: `/src/data/advancedQuestions.ts` (12 questions)**

- ✅ Assertion-Reason: 2 questions
- ✅ Match Following: 2 questions
- ✅ Diagram-Based: 2 questions
- ✅ Multiple Correct: 2 questions
- ✅ Numerical: 2 questions
- ✅ Statement-Based: 2 questions
- **Total: 12 questions**

### **Grand Total: 47 questions currently available**

### Gap Analysis

- **Target:** 200+ questions for MVP launch
- **Current:** 47 questions
- **Required:** 153+ additional questions
- **Gap:** 76% of target missing

---

## 🎯 Question Distribution Strategy

### NEET Biology Topic Weightage (Based on Previous Year Analysis)

| Topic                     | NEET Weightage | Target Questions  | Current | Gap     |
| ------------------------- | -------------- | ----------------- | ------- | ------- |
| **Genetics & Evolution**  | 18%            | 35 questions      | 10      | 25      |
| **Human Physiology**      | 20%            | 40 questions      | 7       | 33      |
| **Plant Physiology**      | 15%            | 30 questions      | 8       | 22      |
| **Cell Biology**          | 12%            | 24 questions      | 8       | 16      |
| **Reproduction**          | 12%            | 24 questions      | 5       | 19      |
| **Ecology & Environment** | 10%            | 20 questions      | 2       | 18      |
| **Biotechnology**         | 8%             | 16 questions      | 2       | 14      |
| **Diversity of Living**   | 5%             | 11 questions      | 5       | 6       |
| **Total**                 | **100%**       | **200 questions** | **47**  | **153** |

### Difficulty Distribution (NEET Pattern)

| Difficulty | Percentage | Target Count  | Current | Gap     |
| ---------- | ---------- | ------------- | ------- | ------- |
| Easy       | 30%        | 60 questions  | 18      | 42      |
| Medium     | 50%        | 100 questions | 22      | 78      |
| Hard       | 20%        | 40 questions  | 7       | 33      |
| **Total**  | **100%**   | **200**       | **47**  | **153** |

### Question Type Distribution

| Type               | NEET Pattern | Target Count  | Current | Gap     |
| ------------------ | ------------ | ------------- | ------- | ------- |
| Single Correct MCQ | 70%          | 140 questions | 33      | 107     |
| Assertion-Reason   | 10%          | 20 questions  | 2       | 18      |
| Match Following    | 5%           | 10 questions  | 2       | 8       |
| Multiple Correct   | 5%           | 10 questions  | 2       | 8       |
| Diagram-Based      | 5%           | 10 questions  | 2       | 8       |
| Statement-Based    | 3%           | 6 questions   | 2       | 4       |
| Numerical          | 2%           | 4 questions   | 2       | 2       |
| **Total**          | **100%**     | **200**       | **47**  | **153** |

---

## 📋 Implementation Plan

### Phase 1: High Priority Topics (Week 1) - 80 Questions

#### 1.1 Human Physiology (35 questions) - 2 hours

- **Digestion & Absorption** (8 questions)
  - Digestive system anatomy
  - Enzyme action and pH
  - Nutrient absorption mechanisms
  - Disorders (peptic ulcer, jaundice, etc.)

- **Breathing & Respiration** (7 questions)
  - Respiratory anatomy
  - Mechanism of breathing
  - Gas exchange
  - Respiratory disorders

- **Circulation** (8 questions)
  - Heart anatomy and function
  - Blood composition
  - Blood pressure regulation
  - Circulatory disorders

- **Excretion** (6 questions)
  - Kidney structure (nephron)
  - Urine formation
  - Osmoregulation
  - Kidney disorders

- **Neural Control** (6 questions)
  - Neuron structure
  - Action potential
  - Reflex arc
  - Brain anatomy

#### 1.2 Genetics & Molecular Biology (30 questions) - 1.5 hours

- **Mendelian Genetics** (8 questions)
  - Monohybrid & dihybrid crosses
  - Law of segregation
  - Law of independent assortment
  - Pedigree analysis

- **Molecular Basis of Inheritance** (10 questions)
  - DNA structure and replication
  - Transcription and translation
  - Genetic code
  - Gene regulation (lac operon)

- **Chromosomal Theory** (6 questions)
  - Chromosome structure
  - Sex determination
  - Linkage and crossing over
  - Mutations

- **Evolution** (6 questions)
  - Evidence of evolution
  - Darwin's theory
  - Hardy-Weinberg principle
  - Speciation

#### 1.3 Plant Physiology (15 questions) - 45 minutes

- **Photosynthesis** (8 questions)
  - Light reactions
  - Dark reactions (Calvin cycle)
  - C3, C4, and CAM plants
  - Photorespiration

- **Respiration** (7 questions)
  - Glycolysis
  - Krebs cycle
  - Electron transport chain
  - Anaerobic respiration

### Phase 2: Medium Priority Topics (Week 2) - 70 Questions

#### 2.1 Reproduction (25 questions) - 1.5 hours

- **Sexual Reproduction in Flowering Plants** (12 questions)
  - Flower structure
  - Microsporogenesis and megasporogenesis
  - Pollination and fertilization
  - Seed and fruit development

- **Human Reproduction** (13 questions)
  - Male reproductive system
  - Female reproductive system
  - Menstrual cycle
  - Fertilization and implantation
  - Pregnancy and parturition

#### 2.2 Cell Biology (20 questions) - 1 hour

- **Cell Structure** (10 questions)
  - Prokaryotic vs eukaryotic cells
  - Cell organelles and functions
  - Plasma membrane structure
  - Cell wall

- **Cell Cycle & Division** (10 questions)
  - Mitosis phases
  - Meiosis phases
  - Significance of cell division
  - Cell cycle regulation

#### 2.3 Ecology & Environment (20 questions) - 1 hour

- **Ecosystem** (8 questions)
  - Energy flow
  - Food chains and webs
  - Ecological pyramids
  - Nutrient cycling

- **Biodiversity & Conservation** (6 questions)
  - Biodiversity levels
  - Threats to biodiversity
  - Conservation strategies
  - Endangered species

- **Environmental Issues** (6 questions)
  - Pollution types
  - Global warming
  - Ozone depletion
  - Waste management

#### 2.4 Biotechnology (15 questions) - 45 minutes

- **Principles & Processes** (8 questions)
  - Recombinant DNA technology
  - PCR technique
  - Gel electrophoresis
  - Cloning vectors

- **Applications** (7 questions)
  - Genetically modified organisms
  - Gene therapy
  - Bioremediation
  - Biosensors

### Phase 3: Foundation Topics (Week 3) - 50 Questions

#### 3.1 Diversity of Living Organisms (20 questions) - 1 hour

- **Plant Kingdom** (10 questions)
  - Classification (algae to angiosperms)
  - Characteristic features
  - Life cycles
  - Economic importance

- **Animal Kingdom** (10 questions)
  - Classification (porifera to chordata)
  - Characteristic features
  - Evolutionary relationships
  - Examples

#### 3.2 Structural Organization (15 questions) - 45 minutes

- **Tissues** (8 questions)
  - Plant tissues (meristematic & permanent)
  - Animal tissues (epithelial, connective, muscular, nervous)
  - Tissue organization

- **Morphology** (7 questions)
  - Plant morphology (root, stem, leaf, flower)
  - Animal morphology (basic body plans)

#### 3.3 Biomolecules (15 questions) - 45 minutes

- **Structure & Function** (8 questions)
  - Carbohydrates
  - Proteins
  - Lipids
  - Nucleic acids

- **Enzymes** (7 questions)
  - Classification
  - Mechanism of action
  - Factors affecting enzyme activity
  - Clinical applications

---

## 🛠️ Implementation Approach

### Step 1: Prepare Question Templates (15 minutes)

Create TypeScript interfaces for all question types to ensure consistency:

```typescript
interface StandardNEETQuestion {
  id: string
  topicId: string
  chapterId: string
  classId: string
  question: string
  options: [string, string, string, string]
  correctAnswer: string
  explanation: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  ncertPageReference: string
  previousYearFrequency: number
  conceptualLinks: string[]
  timeEstimate: number // seconds
  bloomsLevel: 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate'
  weightage: number
}
```

### Step 2: Source Quality Questions (1 hour)

Reference materials:

1. **NCERT Textbooks** (Class 11 & 12)
   - Biology Part 1: Chapters 1-11
   - Biology Part 2: Chapters 12-22
2. **Previous NEET Papers** (2020-2024)
3. **Standard Reference Books**
   - Trueman's Biology
   - NCERT Exemplar
4. **Question Patterns** from existing authentic questions

### Step 3: Populate Questions by Priority (2 hours)

**Batch Processing Approach:**

1. Start with Human Physiology (highest weightage)
2. Add 10 questions at a time
3. Test import and rendering
4. Validate question format
5. Continue with next batch

### Step 4: Quality Assurance (30 minutes)

For each question, verify:

- ✅ Correct answer is scientifically accurate
- ✅ Explanation references NCERT
- ✅ Options are plausible distractors
- ✅ Difficulty matches complexity
- ✅ Time estimate is realistic (30-90 seconds)
- ✅ Tags and conceptual links are relevant

### Step 5: Integration Testing (15 minutes)

- Test question retrieval functions
- Verify filtering by topic, difficulty, class
- Check randomization logic
- Validate test generation with new questions

---

## 📁 File Modifications

### Primary File: `/src/data/authenticQuestions.ts`

**Current Structure (903 lines):**

- Class 9: 6 questions (lines 28-164)
- Class 10: 7 questions (lines 170-330)
- Class 11: 8 questions (lines 336-519)
- Class 12: 10 questions (lines 525-755)
- Dropper: 2 questions (lines 761-808)

**Target Structure (2000+ lines):**

- Class 9: 20 questions (foundation)
- Class 10: 25 questions (foundation)
- Class 11: 70 questions (NEET focus)
- Class 12: 80 questions (NEET focus)
- Dropper: 5 questions (revision)

### Secondary Files (Optional Enhancement)

**Option A: Keep all questions in authenticQuestions.ts**

- ✅ Simple to maintain
- ✅ Single source of truth
- ❌ Large file size (2000+ lines)

**Option B: Split into topic-based files (Recommended)**

```
/src/data/questions/
  ├── humanPhysiology.ts (35 questions)
  ├── genetics.ts (35 questions)
  ├── plantPhysiology.ts (30 questions)
  ├── cellBiology.ts (24 questions)
  ├── reproduction.ts (24 questions)
  ├── ecology.ts (20 questions)
  ├── biotechnology.ts (16 questions)
  ├── diversity.ts (11 questions)
  └── index.ts (export aggregator)
```

---

## 🎯 Success Metrics

### Quantitative Metrics

- ✅ Total questions: 200+ (currently 47, need 153)
- ✅ Topic coverage: 8 major topics with weighted distribution
- ✅ Difficulty distribution: 30% Easy, 50% Medium, 20% Hard
- ✅ Question types: 7 different types matching NEET pattern

### Qualitative Metrics

- ✅ NCERT alignment: 100% questions must reference NCERT
- ✅ Scientific accuracy: All answers verified
- ✅ Explanation quality: Clear, detailed, educative
- ✅ Time estimates: Realistic (30-90 seconds per question)

### Integration Metrics

- ✅ Test generator can create valid tests
- ✅ Filtering by topic/difficulty/class works
- ✅ No duplicate question IDs
- ✅ All questions render correctly in UI

---

## 🚀 Execution Timeline

| Phase            | Duration     | Completion Date | Deliverable                                                       |
| ---------------- | ------------ | --------------- | ----------------------------------------------------------------- |
| **Phase 1**      | 4 hours      | Day 1           | 80 questions (Human Physiology, Genetics, Plant Physiology)       |
| **Phase 2**      | 4 hours      | Day 2           | 70 questions (Reproduction, Cell Biology, Ecology, Biotechnology) |
| **Phase 3**      | 3 hours      | Day 3           | 50 questions (Diversity, Structure, Biomolecules)                 |
| **QA & Testing** | 1 hour       | Day 3           | Validation complete                                               |
| **Total**        | **12 hours** | **3 days**      | **200 questions ready**                                           |

---

## 📝 Notes & Considerations

### Best Practices

1. **Consistency:** Follow existing question format exactly
2. **Quality over Quantity:** Better to have 150 excellent questions than 250 mediocre ones
3. **NEET Alignment:** Every question should be answerable from NCERT
4. **Distractor Quality:** Wrong options should be plausible, not obviously wrong

### Potential Challenges

1. **Time Constraint:** 200 questions is substantial - may need 2-3 sessions
2. **Copyright:** Ensure questions are original or properly referenced
3. **Technical Accuracy:** All biology content must be scientifically accurate
4. **NCERT References:** Must verify exact page numbers

### Future Enhancements (Post-MVP)

- [ ] Add diagrams for diagram-based questions
- [ ] Include image support for microscope questions
- [ ] Create video explanations for complex topics
- [ ] Add difficulty-adaptive testing
- [ ] Implement spaced repetition algorithm

---

## ✅ Completion Criteria

Task 5 will be marked complete when:

- ✅ Minimum 200 questions added to question bank
- ✅ All 8 major topics covered with weighted distribution
- ✅ Difficulty distribution matches NEET pattern
- ✅ All questions have NCERT references
- ✅ Test generator successfully creates tests with new questions
- ✅ No TypeScript errors or warnings
- ✅ Code committed with detailed commit message

---

**Last Updated:** 2025-10-01
**Task Owner:** Claude Code
**Status:** Planning Complete → Ready for Execution
