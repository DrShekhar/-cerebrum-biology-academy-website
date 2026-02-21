# MCQ Olympiad Audit Fix Plan

## Issue 1: EXPERT Difficulty Badge (QuestionCard.tsx) — HIGH
**Problem**: EXPERT difficulty shows same amber/yellow styling as MEDIUM
**Fix**: Add purple styling for EXPERT in the difficulty badge (lines 170-187)
- Badge bg: `bg-purple-100 text-purple-700`
- Dot: `bg-purple-600`
- Affects: QuestionCard.tsx (+ check all special card types for same pattern)

## Issue 2: Olympiad Metadata Display (QuestionCard.tsx) — HIGH
**Problem**: QuestionCard shows NCERT metadata but no Olympiad metadata
**Fix**: Add conditional Olympiad metadata block after the NCERT block (line 232)
- Show Campbell Unit + Chapter: `Unit 3 • Ch.14`
- Show Olympiad Level badge: `IBO`, `USABO_OPEN`, etc.
- Show conceptual depth if present
- Only display when `question.isOlympiad` is true
- Check all 8 special card types (AssertionReasonCard, MTFCard, etc.) for same gap

## Issue 3: Question Type Filter — MEDIUM
**Files**: page.tsx, FilterPanel.tsx, route.ts
**Fix**:
1. `types.ts`: Add OLYMPIAD_QUESTION_TYPES constant
2. `FilterPanel.tsx`: Add question type filter buttons (only show when Olympiad mode)
3. `page.tsx`: Add `selectedQuestionType` state, pass to FilterPanel, append to API params
4. `route.ts`: Parse `questionType` param and add to where clause

## Issue 4: Compound DB Index — MINOR
**File**: prisma/schema.prisma
**Fix**: Add `@@index([campbellUnit, campbellChapter])` to questions model
- Run `npx prisma generate` after (NO migration needed for indexes in Supabase)
