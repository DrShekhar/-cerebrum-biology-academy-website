# MCQ Practice Tool — Comprehensive Fix & Enhancement Plan

**Created**: February 14, 2026
**Project**: Cerebrum Biology Academy Website
**Status**: ACTIVE

---

## Table of Contents

1. [Phase 1: Bug Fixes & Missing Integrations](#phase-1-bug-fixes--missing-integrations)
2. [Phase 2: Class 9th/10th Support](#phase-2-class-9th10th-support)
3. [Phase 3: NEET Question Type Enhancement](#phase-3-neet-question-type-enhancement)
4. [Phase 4: Olympiad / Campbell Biology Module](#phase-4-olympiad--campbell-biology-module)
5. [Phase 5: Question Bank Batch Import System](#phase-5-question-bank-batch-import-system)

---

## Phase 1: Bug Fixes & Missing Integrations

### 1.1 Rate Limiting on MCQ API Routes
**Priority**: HIGH | **Risk**: Security vulnerability

**Current State**: Rate limiting utilities exist at `src/lib/rateLimit.ts` and `src/lib/middleware/rateLimit.ts` but are NOT applied to any MCQ endpoints.

**Fix**: Apply rate limiters to all 12 MCQ API routes:

| Endpoint | Limiter | Limit |
|----------|---------|-------|
| `GET /api/mcq/questions` | `apiRateLimit` | 100 req/hr |
| `POST /api/mcq/submit` | `testSubmissionRateLimit` | 60 req/hr |
| `GET /api/mcq/review` | `apiRateLimit` | 100 req/hr |
| `GET /api/mcq/stats` | `apiRateLimit` | 100 req/hr |
| `GET /api/mcq/leaderboard` | `apiRateLimit` | 100 req/hr |
| `GET/POST/DELETE /api/mcq/bookmarks` | `apiRateLimit` | 100 req/hr |
| `GET /api/mcq/daily-challenge` | `apiRateLimit` | 50 req/hr |
| `GET /api/mcq/analytics` | `apiRateLimit` | 100 req/hr |
| `POST /api/mcq/report-error` | `authRateLimit` | 10 req/hr |
| `POST /api/mcq/community/submit` | `questionCreationRateLimit` | 20 req/hr |
| `POST /api/mcq/community/ai-screen` | `bulkOperationRateLimit` | 5 req/hr |
| `GET /api/mcq/ncert-chapters` | `apiRateLimit` | 100 req/hr |

**Files to modify**: All 12 route files under `src/app/api/mcq/`

---

### 1.2 Bookmark Button Integration in Main MCQ Page
**Priority**: MEDIUM | **Status**: Component exists, not rendered

**Current State**:
- `BookmarkButton.tsx` — Fully functional component with toggle, toast notifications
- `bookmarks/route.ts` — Full CRUD API (GET/POST/DELETE)
- `mcq_bookmarks` Prisma model — Complete with unique constraint
- **Missing**: BookmarkButton is NOT rendered in `page.tsx` QuestionCard area

**Fix**:
1. Import `BookmarkButton` in `src/app/neet-biology-mcq/page.tsx`
2. Render it alongside the Report Error button in the question card area
3. Pass `questionId` and `freeUserId` props
4. Add a "My Bookmarks" section/tab in the filter panel or as a separate view
5. Add bookmark count display in StatsPanel

---

### 1.3 correctAnswer Normalization Hardening
**Priority**: MEDIUM | **Risk**: Silent wrong-answer bugs

**Current State** (`src/app/api/mcq/submit/route.ts` lines 117-171):
- Database stores `correctAnswer` as either full option text OR letter (A/B/C/D)
- Runtime normalizes text → letter by matching against options array
- **Issue**: If options fetch fails, comparison fails silently (marks answer wrong)

**Fix**:
1. Add explicit error logging when normalization fails
2. Return `normalizationFailed: true` in response so frontend can show "Could not verify" instead of "Wrong"
3. Add a migration script to normalize ALL existing questions to letter format (A/B/C/D)
4. Add Prisma validation to enforce letter-only storage going forward
5. Add unit tests for edge cases (case mismatch, whitespace, HTML entities)

---

### 1.4 localStorage Quota Management
**Priority**: LOW | **Risk**: Data loss on quota exceeded

**Current State**:
- `mcq_answered_ids_*` keys accumulate indefinitely per filter combination
- No cleanup, no quota check, no TTL
- Uses `requestIdleCallback` for deferred writes (good)

**Fix**:
1. Add a max age of 30 days for answered ID sets
2. Store timestamps with each key: `{ ids: [...], updatedAt: timestamp }`
3. On page load, sweep old entries (>30 days) using `requestIdleCallback`
4. Add try/catch around `localStorage.setItem` to handle QuotaExceededError
5. If quota exceeded, clear oldest entries first
6. Cap per-key storage: if answered IDs exceed 500 per filter combo, trim oldest

---

### 1.5 Analytics Page Enhancement
**Priority**: LOW | **Current**: Complete but basic

**Current State**: `src/app/neet-biology-mcq/analytics/page.tsx` — Works, has TopicAnalytics + tips.

**Enhancements**:
1. Add time-series chart (questions/day, accuracy trend over 7/30 days)
2. Add difficulty breakdown (% correct by Easy/Medium/Hard)
3. Add question type breakdown (once new types are added)
4. Add chapter-level heatmap for weak areas
5. Add comparison with average user stats (percentile)
6. Add downloadable PDF report

---

### 1.6 Contribute Page Polish
**Priority**: LOW | **Current**: Complete but could use refinement

**Enhancements**:
1. Add question preview before submission
2. Add LaTeX/math rendering in preview
3. Show AI screening result inline (pass/fail with feedback)
4. Add bulk submission via CSV upload for verified contributors

---

## Phase 2: Class 9th/10th Support

### 2.1 Problem Statement
Currently, MCQ questions only support NCERT Class 11 and 12. Students preparing for NEET from an early stage (Class 9/10) need foundation-level questions from their NCERT syllabus.

### 2.2 Database Changes

#### A. Extend `ncertClass` range
The `ncertClass` field on `questions` model is `Int?` — already supports any integer. No schema change needed.

#### B. Add Class 9/10 chapters to `ncert_chapters` table
Seed data needed for:

**Class 9 Biology (NCERT Science)**:
| Ch# | Chapter Name | Key Topics |
|-----|-------------|------------|
| 5 | The Fundamental Unit of Life | Cell structure, organelles |
| 6 | Tissues | Plant & animal tissues |
| 7 | Diversity in Living Organisms | Classification, nomenclature |
| 8 | Motion | (Physics - skip) |
| 9 | Force and Laws of Motion | (Physics - skip) |
| 12 | Sound | (Physics - skip) |
| 13 | Why Do We Fall Ill | Diseases, immunity |
| 14 | Natural Resources | Biogeochemical cycles |
| 15 | Improvement in Food Resources | Crop improvement, animal husbandry |

**Class 10 Biology (NCERT Science)**:
| Ch# | Chapter Name | Key Topics |
|-----|-------------|------------|
| 6 | Life Processes | Nutrition, respiration, transport, excretion |
| 7 | Control and Coordination | Nervous system, hormones |
| 8 | How Do Organisms Reproduce | Reproduction types |
| 9 | Heredity and Evolution | Mendel, evolution evidence |
| 15 | Our Environment | Ecosystem, food chains |
| 16 | Sustainable Management of Natural Resources | Conservation |

### 2.3 Frontend Changes

1. **FilterPanel.tsx**: Add Class 9 and Class 10 to NCERT class selector
2. **NcertOptions.tsx**: Update class dropdown to include 9/10
3. **ContentSourceTabs.tsx**: Update question count display to include 9/10
4. **Topic pages**: Create new topic landing pages for 9/10 chapters under `/neet-biology-mcq/`
5. **Navigation**: Add "Foundation (9-10)" section in topic listing

### 2.4 Question Sourcing Strategy
- Batch 1: 50 questions per chapter (Class 9: 6 bio chapters = 300, Class 10: 6 bio chapters = 300) = **600 foundation questions**
- Difficulty: 70% Easy, 25% Medium, 5% Hard
- All NCERT-based with page references
- Include diagram-based questions where applicable

---

## Phase 3: NEET Question Type Enhancement

### 3.1 Research: NEET Biology Question Types (2024-2025)

Based on analysis of NEET 2024-2025 papers:

| Question Type | NEET 2024 % | Format | Current Support |
|--------------|-------------|--------|-----------------|
| **Standard MCQ** | ~30% | Single correct from 4 options | ✅ Full |
| **Match the Following** | ~30% | Match Column A to Column B | ⚠️ Enum exists, no UI |
| **Statement-Based** | ~17% | "Which statements are correct/incorrect?" | ❌ None |
| **Assertion-Reason** | ~10% | Evaluate A (assertion) + R (reason) | ❌ None |
| **Diagram-Based** | ~7% | Identify from figure/diagram | ⚠️ Partial (DiagramQuestion.tsx exists) |
| **Counting Type** | ~3% | "How many of the following..." | ❌ None |
| **Sequence/Order** | ~3% | Arrange in correct sequence | ❌ None |

**Key Insight**: Match-the-Following alone was 30% of NEET 2024! This is critical to implement.

Sources:
- [NEET 2025 Biology Paper Analysis - PW](https://www.pw.live/neet/exams/neet-2025-biology-paper-analysis)
- [NEET 2024 Biology Paper Analysis - Target Publications](https://targetpublications.org/blog/neet-ug-2024-exam-biology-detailed-paper-analysis)
- [NEET Assertion-Reason Questions - SelfStudys](https://www.selfstudys.com/books/neet-assertion-reason-question)

### 3.2 New QuestionType Enum Values Needed

Current enum already has most types. Add these:
```prisma
enum QuestionType {
  MCQ                  // Standard 4-option single correct
  ASSERTION_REASON     // NEW: A-R format with standard 4 answer choices
  STATEMENT_BASED      // NEW: "Which statements are correct/incorrect?"
  MATCH_FOLLOWING       // EXISTS: Match Column A ↔ Column B
  COUNTING_TYPE        // NEW: "How many of the following..."
  SEQUENCE_ORDER       // NEW: Arrange in correct order
  DIAGRAM              // EXISTS: Image/figure based
  MULTIPLE_SELECT      // EXISTS: Multiple correct (not used in NEET but good to have)
  TRUE_FALSE           // EXISTS
  FILL_BLANK           // EXISTS
  SHORT_ANSWER         // EXISTS
  NUMERICAL            // EXISTS
}
```

### 3.3 Question Format Specifications

#### A. Assertion-Reason Format
```json
{
  "type": "ASSERTION_REASON",
  "question": "",
  "assertion": "Mitochondria are called the powerhouse of the cell.",
  "reason": "Mitochondria produce ATP through oxidative phosphorylation.",
  "options": [
    "Both A and R are true and R is the correct explanation of A",
    "Both A and R are true but R is NOT the correct explanation of A",
    "A is true but R is false",
    "A is false but R is true"
  ],
  "correctAnswer": "A"
}
```

#### B. Statement-Based Format
```json
{
  "type": "STATEMENT_BASED",
  "question": "Which of the following statements is/are correct?",
  "statements": [
    "I. Xylem transports water and minerals",
    "II. Phloem transports food",
    "III. Xylem is a simple tissue",
    "IV. Phloem consists of sieve tubes and companion cells"
  ],
  "options": [
    "I, II and IV only",
    "I and II only",
    "I, II, III and IV",
    "II and III only"
  ],
  "correctAnswer": "A"
}
```

#### C. Match the Following Format
```json
{
  "type": "MATCH_FOLLOWING",
  "question": "Match the following:",
  "columnA": [
    { "label": "A", "text": "Mitochondria" },
    { "label": "B", "text": "Chloroplast" },
    { "label": "C", "text": "Ribosome" },
    { "label": "D", "text": "Golgi body" }
  ],
  "columnB": [
    { "label": "i", "text": "Protein synthesis" },
    { "label": "ii", "text": "Photosynthesis" },
    { "label": "iii", "text": "Cellular respiration" },
    { "label": "iv", "text": "Packaging & secretion" }
  ],
  "options": [
    "A-iii, B-ii, C-i, D-iv",
    "A-ii, B-iii, C-iv, D-i",
    "A-i, B-ii, C-iii, D-iv",
    "A-iv, B-i, C-ii, D-iii"
  ],
  "correctAnswer": "A"
}
```

#### D. Counting Type Format
```json
{
  "type": "COUNTING_TYPE",
  "question": "How many of the following are monocot plants?",
  "items": [
    "Wheat",
    "Rice",
    "Mustard",
    "Maize",
    "Pea",
    "Sugarcane"
  ],
  "options": ["Two", "Three", "Four", "Five"],
  "correctAnswer": "C"
}
```

#### E. Sequence/Order Format
```json
{
  "type": "SEQUENCE_ORDER",
  "question": "Arrange the following in correct sequence of events during mitosis:",
  "items": [
    "Condensation of chromatin",
    "Alignment at metaphase plate",
    "Separation of sister chromatids",
    "Nuclear envelope breakdown"
  ],
  "options": [
    "1 → 4 → 2 → 3",
    "4 → 1 → 2 → 3",
    "1 → 2 → 4 → 3",
    "4 → 2 → 1 → 3"
  ],
  "correctAnswer": "A"
}
```

### 3.4 UI Components Needed

| Component | Purpose | Complexity |
|-----------|---------|------------|
| `AssertionReasonCard.tsx` | Renders A-R with styled assertion/reason blocks | Medium |
| `StatementBasedCard.tsx` | Renders numbered statement list + options | Medium |
| `MatchFollowingCard.tsx` | Renders two-column table + matching options | High |
| `CountingTypeCard.tsx` | Renders item list + count options | Low |
| `SequenceOrderCard.tsx` | Renders items + sequence options | Medium |
| `QuestionRenderer.tsx` | Master switch component that delegates to type-specific card | Medium |

### 3.5 Database Schema Changes

Add new JSON fields to `questions` model for structured data:
```prisma
model questions {
  // ... existing fields ...

  // New structured data fields for advanced question types
  assertion       String?    // For ASSERTION_REASON type
  reason          String?    // For ASSERTION_REASON type
  statements      Json?      // For STATEMENT_BASED type: string[]
  columnA         Json?      // For MATCH_FOLLOWING type: {label, text}[]
  columnB         Json?      // For MATCH_FOLLOWING type: {label, text}[]
  items           Json?      // For COUNTING_TYPE & SEQUENCE_ORDER: string[]
  questionSubType String?    // "correct_statements", "incorrect_statements", "identify_correct", etc.
}
```

**Alternative approach** (recommended): Use the existing `options: Json?` field to store ALL structured data per question type, keeping the schema lean:
```json
// For ASSERTION_REASON, store in question JSON:
{
  "assertion": "...",
  "reason": "...",
  "options": ["Both A and R...", ...]
}
```

This avoids schema bloat. The `question` text field stores the display text, and `options` JSON stores type-specific structured data.

---

## Phase 4: Olympiad / Campbell Biology Module

### 4.1 Overview

Create a dedicated Olympiad preparation module powered by Campbell Biology content, targeting:
- **NSEB** (National Standard Examination in Biology) — Stage 1
- **INBo** (Indian National Biology Olympiad) — Stage 2
- **IBO** (International Biology Olympiad) — International level

### 4.2 Olympiad vs NEET: Key Differences

| Aspect | NEET | Olympiad (NSEB/IBO) |
|--------|------|---------------------|
| **Syllabus** | NCERT Class 11-12 | Campbell Biology (broader, deeper) |
| **Depth** | Factual recall + application | Deep conceptual + experimental reasoning |
| **Question Style** | MCQ, A-R, Matching | MCQ + Practical + Data analysis |
| **Topics** | Standard biology | + Biochemistry, Molecular Biology, Ecology advanced |
| **Difficulty** | Moderate | High to Expert |

### 4.3 Content Structure (Campbell Biology 12th Edition)

| Unit | Chapters | Topic Area |
|------|----------|------------|
| 1 | Ch 1-5 | Chemistry of Life |
| 2 | Ch 6-12 | The Cell |
| 3 | Ch 13-18 | Genetics |
| 4 | Ch 19-21 | Mechanisms of Evolution |
| 5 | Ch 22-34 | Biological Diversity |
| 6 | Ch 35-39 | Plant Form & Function |
| 7 | Ch 40-51 | Animal Form & Function |
| 8 | Ch 52-56 | Ecology |

### 4.4 Database Changes

```prisma
// Add to questions model:
isOlympiad          Boolean  @default(false)
olympiadLevel       String?  // "NSEB", "INBo", "IBO"
campbellChapter     Int?     // Campbell Biology chapter number
campbellEdition     Int?     // Edition (12)
campbellUnit        Int?     // Unit number (1-8)
conceptualDepth     String?  // "foundation", "intermediate", "advanced", "expert"

// New index:
@@index([isOlympiad, olympiadLevel])
@@index([campbellChapter])
```

### 4.5 New Routes

```
/neet-tools/olympiad-practice           → Olympiad MCQ hub
/neet-tools/olympiad-practice/[unit]    → Unit-specific questions
/neet-tools/olympiad-practice/nseb      → NSEB-focused practice
/neet-tools/olympiad-practice/ibo       → IBO-level practice
```

### 4.6 Question Sourcing Strategy

**Batch approach (recommended by user)**:
- Batch 1: 20 questions per Campbell chapter for Units 1-3 (Ch 1-18) = **360 questions**
- Batch 2: 20 questions per chapter for Units 4-5 (Ch 19-34) = **320 questions**
- Batch 3: 20 questions per chapter for Units 6-8 (Ch 35-56) = **440 questions**
- **Total: ~1,120 Olympiad questions** across all batches

**Difficulty distribution**:
- 20% Foundation (NCERT overlap)
- 30% Intermediate (Campbell core)
- 35% Advanced (NSEB level)
- 15% Expert (IBO level)

**Question types for Olympiad**:
- 40% Standard MCQ
- 20% Statement-Based
- 15% Assertion-Reason
- 10% Data/Graph interpretation
- 10% Matching
- 5% Experimental design

### 4.7 UI/UX

- Separate tab in NEET Tools: "Olympiad Prep"
- Campbell chapter-based navigation
- Difficulty badge: Foundation → Expert
- Cross-reference with NCERT topics (overlap indicator)
- "Olympiad Tip" section in explanations (deeper insight)
- Separate leaderboard for Olympiad

---

## Phase 5: Question Bank Batch Import System

### 5.1 Purpose
Enable efficient bulk addition of questions across all classes (9-12), types (MCQ, A-R, Matching, etc.), and sources (NCERT, Olympiad, PYQ).

### 5.2 Import Format (JSON)

```json
{
  "batch": {
    "name": "Class 11 Ch5 Morphology - Assertion Reason",
    "version": 1,
    "source": "NCERT",
    "totalQuestions": 50
  },
  "questions": [
    {
      "type": "ASSERTION_REASON",
      "topic": "Morphology of Flowering Plants",
      "chapter": "Morphology of Flowering Plants",
      "ncertClass": 11,
      "ncertChapter": 5,
      "difficulty": "MEDIUM",
      "assertion": "...",
      "reason": "...",
      "options": ["Both A and R are true...", ...],
      "correctAnswer": "A",
      "explanation": "...",
      "ncertPage": 72,
      "neetWeightage": "HIGH",
      "tags": ["morphology", "root-system"]
    }
  ]
}
```

### 5.3 Import API

```
POST /api/admin/mcq/import-batch
Authorization: Admin only

Body: { batch, questions[] }
Response: { imported: N, skipped: N, errors: [...] }
```

### 5.4 Validation Rules
- Duplicate detection (question text similarity > 90%)
- Required fields per question type
- correctAnswer must be valid letter (A/B/C/D)
- Options must be exactly 4
- Explanation required for all NEET-important questions
- Topic must match existing topic list

### 5.5 Question Generation Roadmap

**Priority order for batch creation**:

| Priority | Batch | Class | Type | Count | Status |
|----------|-------|-------|------|-------|--------|
| P0 | Match the Following — All chapters | 11-12 | MATCH_FOLLOWING | 500 | TODO |
| P0 | Assertion-Reason — All chapters | 11-12 | ASSERTION_REASON | 400 | TODO |
| P0 | Statement-Based — All chapters | 11-12 | STATEMENT_BASED | 400 | TODO |
| P1 | Foundation Biology — Class 9 | 9 | MCQ | 300 | TODO |
| P1 | Foundation Biology — Class 10 | 10 | MCQ | 300 | TODO |
| P2 | Counting Type — High-yield chapters | 11-12 | COUNTING_TYPE | 200 | TODO |
| P2 | Sequence/Order — Process chapters | 11-12 | SEQUENCE_ORDER | 200 | TODO |
| P3 | Olympiad Batch 1 — Campbell Units 1-3 | - | Mixed | 360 | TODO |
| P3 | Olympiad Batch 2 — Campbell Units 4-5 | - | Mixed | 320 | TODO |
| P3 | Olympiad Batch 3 — Campbell Units 6-8 | - | Mixed | 440 | TODO |
| P4 | Class 9/10 Advanced Types | 9-10 | A-R, Matching | 200 | TODO |

**Grand Total: ~3,620 new questions across all batches**

---

## Implementation Order & Dependencies

```
Phase 1 (Bug Fixes) ─────────────── Can start immediately
  ├─ 1.1 Rate Limiting ──────────── Independent
  ├─ 1.2 Bookmark Integration ───── Independent
  ├─ 1.3 correctAnswer Fix ──────── Independent
  └─ 1.4 localStorage Cleanup ──── Independent

Phase 2 (Class 9/10) ────────────── Can start after Phase 1.2
  ├─ 2.1 Seed ncert_chapters ────── Independent
  ├─ 2.2 Update FilterPanel ─────── After 2.1
  └─ 2.3 Create topic pages ─────── After 2.2

Phase 3 (Question Types) ────────── Can start in parallel with Phase 2
  ├─ 3.1 Schema migration ──────── First
  ├─ 3.2 QuestionRenderer.tsx ───── After 3.1
  ├─ 3.3 Type-specific cards ────── After 3.2
  ├─ 3.4 FilterPanel type filter ── After 3.3
  └─ 3.5 Submit route update ────── After 3.1

Phase 4 (Olympiad) ──────────────── After Phase 3
  ├─ 4.1 Schema additions ──────── First
  ├─ 4.2 New routes/pages ──────── After 4.1
  └─ 4.3 Campbell integration ──── After 4.2

Phase 5 (Batch Import) ─────────── After Phase 3.1
  ├─ 5.1 Import API ────────────── First
  ├─ 5.2 Validation engine ─────── With 5.1
  └─ 5.3 Question batches ──────── After 5.1
```

---

## Estimated File Changes

| Phase | Files Modified | Files Created | Lines Changed (est.) |
|-------|---------------|---------------|---------------------|
| Phase 1 | 15 | 0 | ~300 |
| Phase 2 | 5 | 8 | ~500 |
| Phase 3 | 8 | 7 | ~1,500 |
| Phase 4 | 3 | 6 | ~800 |
| Phase 5 | 2 | 3 | ~400 |
| **Total** | **~33** | **~24** | **~3,500** |

---

## Risk Mitigation

1. **Schema migrations**: Always backup before running `prisma migrate`
2. **Question data integrity**: Validate all batch imports before committing
3. **UI regressions**: Test all existing MCQ functionality after each phase
4. **Performance**: New question types should not slow down query performance (indexes added)
5. **Mobile compatibility**: All new UI components must be responsive
6. **Build verification**: Run `next build` after each phase to catch errors

---

## Success Metrics

- [ ] All 12 MCQ API routes have rate limiting
- [ ] BookmarkButton visible and functional in quiz interface
- [ ] correctAnswer normalization handles all edge cases
- [ ] localStorage has cleanup logic with 30-day TTL
- [ ] Class 9/10 chapters seeded and filterable
- [ ] 5 new question type UIs rendering correctly
- [ ] Olympiad practice module accessible at /neet-tools/olympiad-practice
- [ ] Batch import API accepting and validating JSON uploads
- [ ] Build passes with zero errors after all phases
- [ ] No visual/UX regressions on existing MCQ functionality
