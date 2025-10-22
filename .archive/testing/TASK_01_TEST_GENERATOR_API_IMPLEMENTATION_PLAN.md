# Task 1: Test Generator API - Detailed Implementation Plan

**Status:** In Progress
**Priority:** 🔴 CRITICAL (Blocks Production)
**Estimated Effort:** 4-6 hours
**Date Created:** October 1, 2025

---

## 📋 Executive Summary

The test generator API currently returns **mock/placeholder questions** instead of using the comprehensive question banks available in the codebase. This task involves connecting the API to real question data, implementing intelligent question selection logic, and ensuring proper test generation based on user configuration.

---

## 🎯 Current State Analysis

### What Exists

**Current API Implementation** (`/src/app/api/generate-test/route.ts`):

- 28 lines of code
- Generates placeholder questions using `Array.from()` loop
- Mock data: `"NEET Biology Question ${i + 1}"`
- No connection to actual question banks
- No filtering by topic, difficulty, or question type

**Available Question Banks** (Data Layer):

1. **`neetQuestionBank.ts`** (436 lines)
   - 2 single-correct questions (Cell Biology)
   - 1 assertion-reason question
   - 1 match-following question
   - 1 diagram-based question
   - TypeScript interfaces for all 7 question types
   - Phase 1 distribution plan (1,000 questions target)

2. **`advancedQuestions.ts`** (493 lines)
   - 2 assertion-reason questions
   - 2 match-following questions
   - 2 diagram-based questions
   - 2 multiple-correct questions
   - 2 numerical questions
   - 2 statement-based questions
   - **Total: 12 high-quality questions**

3. **`authenticQuestions.ts`** (903 lines)
   - Class 9: 6 questions
   - Class 10: 7 questions
   - Class 11: 8 questions
   - Class 12: 10 questions
   - Dropper: 2 questions
   - **Total: 33 authentic NCERT-aligned questions**
   - Helper functions: `getQuestionsByTopic()`, `getQuestionsByDifficulty()`, `getQuestionsByChapter()`

4. **`ncertBiologyContentDatabase.ts`**
   - 38 NCERT chapters mapped (22 Class 11 + 16 Class 12)
   - Chapter metadata: NEET weightage, difficulty, study hours
   - Topic IDs and curriculum alignment

**Total Available Questions:** ~47 questions (45 needed for full question bank integration)

---

## ❌ Current Problems

1. **No Real Data:** API generates `"Option A", "Option B", "Option C", "Option D"` instead of biology-specific content
2. **No Topic Filtering:** Ignores user-selected topics from configuration
3. **No Difficulty Distribution:** Config specifies difficulty but not applied
4. **No Question Type Distribution:** Config specifies 80% single-correct, 15% assertion-reason, etc. but ignored
5. **No Data Validation:** Doesn't check if enough questions exist for config
6. **Poor Explanation Quality:** Returns generic `"Detailed explanation for question ${i + 1}"`
7. **No NCERT Alignment:** Questions lack educational value and NEET preparation relevance

---

## ✅ Desired State

### API Behavior After Fix

When a user configures a test:

```typescript
{
  title: "Cell Biology Mock Test",
  topics: ["Cell Structure", "Biomolecules", "Cell Division"],
  difficulty: "medium",
  totalQuestions: 40,
  questionTypeDistribution: {
    "single-correct": 32,      // 80%
    "assertion-reason": 6,     // 15%
    "match-following": 1,      // 2.5%
    "diagram-based": 1         // 2.5%
  },
  class: "class-11",
  duration: 60
}
```

The API should:

1. ✅ Filter questions by selected topics
2. ✅ Apply difficulty preferences (easy/medium/hard distribution)
3. ✅ Distribute questions by type (80% single-correct, 15% assertion-reason, etc.)
4. ✅ Ensure question variety (no duplicates)
5. ✅ Return questions with proper metadata (NCERT references, explanations, time estimates)
6. ✅ Handle edge cases (not enough questions available)
7. ✅ Log analytics for test generation

---

## 🏗️ Implementation Plan

### Step 1: Update Imports (Lines 1-10)

**Current:**

```typescript
import { NextRequest, NextResponse } from 'next/server'
```

**Updated:**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import {
  authenticQuestionBank,
  getQuestionsByTopic,
  getQuestionsByDifficulty,
  getQuestionsByChapter,
  AuthenticQuestion,
} from '@/data/authenticQuestions'
import {
  allAdvancedQuestions,
  AssertionReasonQuestion,
  MatchFollowingQuestion,
  DiagramBasedQuestion,
  MultipleCorrectQuestion,
  NumericalQuestion,
  StatementBasedQuestion,
} from '@/data/advancedQuestions'
import { cellBiologyQuestions, NEETQuestion } from '@/data/neetQuestionBank'
```

**Reason:** Import all question banks and helper functions for intelligent question selection.

---

### Step 2: Define Request Types (Lines 11-40)

```typescript
interface TestConfig {
  title: string
  topics: string[] // Topic IDs selected by user
  chapters?: string[] // Chapter IDs (optional)
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
  totalQuestions: number // 10-100
  questionTypeDistribution?: {
    'single-correct': number
    'assertion-reason': number
    'match-following': number
    'diagram-based': number
    'multiple-correct': number
    numerical: number
    'statement-based': number
  }
  class: 'class-9' | 'class-10' | 'class-11' | 'class-12' | 'dropper'
  subject?: 'biology' | 'botany' | 'zoology' | 'mixed'
  duration: number // Minutes
  negativeMarking?: number // Default: -1
  adaptiveDifficulty?: boolean
  previousYearQuestions?: boolean
}

interface GeneratedQuestion {
  id: string
  question: string
  questionType: string
  options: string[] | any
  correctAnswer: string | string[]
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  subtopic?: string
  marks: number
  timeLimit: number
  ncertReference?: string
  previousYearFrequency?: number
  bloomsLevel?: string
  tags: string[]
  relatedConcepts: string[]
}
```

---

### Step 3: Create Question Pool Builder (Lines 41-120)

```typescript
function buildQuestionPool(config: TestConfig): {
  singleCorrect: AuthenticQuestion[]
  assertionReason: AssertionReasonQuestion[]
  matchFollowing: MatchFollowingQuestion[]
  diagramBased: DiagramBasedQuestion[]
  multipleCorrect: MultipleCorrectQuestion[]
  numerical: NumericalQuestion[]
  statementBased: StatementBasedQuestion[]
} {
  // Step 3.1: Get all questions for the selected class
  const classQuestions = authenticQuestionBank[config.class] || []

  // Step 3.2: Filter by topics if specified
  let filteredQuestions = classQuestions
  if (config.topics && config.topics.length > 0) {
    filteredQuestions = filteredQuestions.filter(
      (q) => config.topics.includes(q.topicId) || config.chapters?.includes(q.chapterId)
    )
  }

  // Step 3.3: Filter by difficulty if not 'mixed'
  if (config.difficulty !== 'mixed') {
    const difficultyMap = {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
    }
    filteredQuestions = filteredQuestions.filter(
      (q) => q.difficulty === difficultyMap[config.difficulty]
    )
  }

  // Step 3.4: Add advanced questions (all 12 from advancedQuestions.ts)
  const advancedQuestionsPool = {
    assertionReason: allAdvancedQuestions.assertionReason,
    matchFollowing: allAdvancedQuestions.matchFollowing,
    diagramBased: allAdvancedQuestions.diagramBased,
    multipleCorrect: allAdvancedQuestions.multipleCorrect,
    numerical: allAdvancedQuestions.numerical,
    statementBased: allAdvancedQuestions.statementBased,
  }

  // Step 3.5: Add cell biology questions from NEET bank
  const neetQuestions = [...cellBiologyQuestions]

  return {
    singleCorrect: [...filteredQuestions, ...neetQuestions],
    ...advancedQuestionsPool,
  }
}
```

**Purpose:** Build a comprehensive question pool filtered by user's configuration.

---

### Step 4: Implement Intelligent Question Selection (Lines 121-250)

```typescript
function selectQuestions(
  pool: ReturnType<typeof buildQuestionPool>,
  config: TestConfig
): GeneratedQuestion[] {
  const selectedQuestions: GeneratedQuestion[] = []

  // Default distribution (80% single-correct, 15% assertion-reason, 5% others)
  const distribution = config.questionTypeDistribution || {
    'single-correct': Math.floor(config.totalQuestions * 0.8),
    'assertion-reason': Math.floor(config.totalQuestions * 0.15),
    'match-following': Math.floor(config.totalQuestions * 0.025),
    'diagram-based': Math.floor(config.totalQuestions * 0.025),
    'multiple-correct': 0,
    numerical: 0,
    'statement-based': 0,
  }

  // Helper function to shuffle array
  const shuffle = <T>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Helper function to convert to GeneratedQuestion format
  const convertToGeneratedQuestion = (q: any, type: string): GeneratedQuestion => {
    return {
      id: q.id,
      question: q.questionText || q.question || q.assertion || '',
      questionType: type,
      options: q.options || [],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || '',
      difficulty: (q.difficulty || 'medium').toLowerCase() as 'easy' | 'medium' | 'hard',
      topic: q.topicId || 'general',
      subtopic: q.chapterId || '',
      marks: 4, // Standard NEET marks
      timeLimit: q.estimatedTimeSeconds || q.timeEstimate || 60,
      ncertReference: q.ncertReference || q.ncertPageReference,
      previousYearFrequency: q.previousYearFrequency,
      bloomsLevel: q.bloomsLevel,
      tags: q.tags || [],
      relatedConcepts: q.relatedConcepts || q.conceptualLinks || [],
    }
  }

  // Select single-correct questions
  const singleCorrectShuffled = shuffle(pool.singleCorrect)
  for (let i = 0; i < distribution['single-correct'] && i < singleCorrectShuffled.length; i++) {
    selectedQuestions.push(convertToGeneratedQuestion(singleCorrectShuffled[i], 'single-correct'))
  }

  // Select assertion-reason questions
  const assertionReasonShuffled = shuffle(pool.assertionReason)
  for (let i = 0; i < distribution['assertion-reason'] && i < assertionReasonShuffled.length; i++) {
    selectedQuestions.push(
      convertToGeneratedQuestion(assertionReasonShuffled[i], 'assertion-reason')
    )
  }

  // Select match-following questions
  const matchFollowingShuffled = shuffle(pool.matchFollowing)
  for (let i = 0; i < distribution['match-following'] && i < matchFollowingShuffled.length; i++) {
    selectedQuestions.push(convertToGeneratedQuestion(matchFollowingShuffled[i], 'match-following'))
  }

  // Select diagram-based questions
  const diagramBasedShuffled = shuffle(pool.diagramBased)
  for (let i = 0; i < distribution['diagram-based'] && i < diagramBasedShuffled.length; i++) {
    selectedQuestions.push(convertToGeneratedQuestion(diagramBasedShuffled[i], 'diagram-based'))
  }

  // Select multiple-correct questions (if requested)
  if (distribution['multiple-correct'] > 0) {
    const multipleCorrectShuffled = shuffle(pool.multipleCorrect)
    for (
      let i = 0;
      i < distribution['multiple-correct'] && i < multipleCorrectShuffled.length;
      i++
    ) {
      selectedQuestions.push(
        convertToGeneratedQuestion(multipleCorrectShuffled[i], 'multiple-correct')
      )
    }
  }

  // Select numerical questions (if requested)
  if (distribution['numerical'] > 0) {
    const numericalShuffled = shuffle(pool.numerical)
    for (let i = 0; i < distribution['numerical'] && i < numericalShuffled.length; i++) {
      selectedQuestions.push(convertToGeneratedQuestion(numericalShuffled[i], 'numerical'))
    }
  }

  // Select statement-based questions (if requested)
  if (distribution['statement-based'] > 0) {
    const statementBasedShuffled = shuffle(pool.statementBased)
    for (let i = 0; i < distribution['statement-based'] && i < statementBasedShuffled.length; i++) {
      selectedQuestions.push(
        convertToGeneratedQuestion(statementBasedShuffled[i], 'statement-based')
      )
    }
  }

  // Final shuffle to mix question types
  return shuffle(selectedQuestions)
}
```

**Purpose:** Intelligently select questions based on type distribution and difficulty preferences.

---

### Step 5: Add Validation & Error Handling (Lines 251-300)

```typescript
function validateQuestionAvailability(
  pool: ReturnType<typeof buildQuestionPool>,
  config: TestConfig
): { isValid: boolean; message?: string; availableCount: number } {
  const distribution = config.questionTypeDistribution || {
    'single-correct': Math.floor(config.totalQuestions * 0.8),
    'assertion-reason': Math.floor(config.totalQuestions * 0.15),
    'match-following': Math.floor(config.totalQuestions * 0.025),
    'diagram-based': Math.floor(config.totalQuestions * 0.025),
    'multiple-correct': 0,
    numerical: 0,
    'statement-based': 0,
  }

  const availableCount =
    pool.singleCorrect.length +
    pool.assertionReason.length +
    pool.matchFollowing.length +
    pool.diagramBased.length +
    pool.multipleCorrect.length +
    pool.numerical.length +
    pool.statementBased.length

  if (availableCount < config.totalQuestions) {
    return {
      isValid: false,
      message: `Only ${availableCount} questions available for your selection. Please reduce total questions to ${availableCount} or select more topics.`,
      availableCount,
    }
  }

  // Check individual type availability
  if (pool.singleCorrect.length < distribution['single-correct']) {
    return {
      isValid: false,
      message: `Not enough single-correct questions available. Need ${distribution['single-correct']}, found ${pool.singleCorrect.length}`,
      availableCount,
    }
  }

  if (pool.assertionReason.length < distribution['assertion-reason']) {
    return {
      isValid: false,
      message: `Not enough assertion-reason questions available. Need ${distribution['assertion-reason']}, found ${pool.assertionReason.length}`,
      availableCount,
    }
  }

  return { isValid: true, availableCount }
}
```

**Purpose:** Validate that enough questions exist for the requested configuration.

---

### Step 6: Update POST Handler (Lines 301-370)

```typescript
export async function POST(request: NextRequest) {
  try {
    // Parse request
    const config: TestConfig = await request.json()

    // Validate required fields
    if (!config.totalQuestions || config.totalQuestions < 1 || config.totalQuestions > 100) {
      return NextResponse.json(
        { error: 'Total questions must be between 1 and 100' },
        { status: 400 }
      )
    }

    if (!config.class) {
      return NextResponse.json({ error: 'Class selection is required' }, { status: 400 })
    }

    // Build question pool
    const questionPool = buildQuestionPool(config)

    // Validate availability
    const validation = validateQuestionAvailability(questionPool, config)
    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: validation.message,
          availableQuestions: validation.availableCount,
          suggestion: 'Try selecting more topics or reducing the number of questions',
        },
        { status: 400 }
      )
    }

    // Select questions intelligently
    const selectedQuestions = selectQuestions(questionPool, config)

    // Ensure we have exactly the requested number
    const finalQuestions = selectedQuestions.slice(0, config.totalQuestions)

    // Log analytics
    console.log(`✅ Generated test: ${config.title}`)
    console.log(`   Class: ${config.class}`)
    console.log(`   Topics: ${config.topics.join(', ')}`)
    console.log(`   Total Questions: ${finalQuestions.length}`)
    console.log(`   Difficulty: ${config.difficulty}`)
    console.log(`   Duration: ${config.duration} minutes`)

    // Return response
    return NextResponse.json({
      success: true,
      test: {
        title: config.title,
        totalQuestions: finalQuestions.length,
        duration: config.duration,
        negativeMarking: config.negativeMarking || -1,
        maxMarks: finalQuestions.length * 4,
        difficulty: config.difficulty,
        class: config.class,
      },
      questions: finalQuestions,
      metadata: {
        totalAvailable: validation.availableCount,
        distribution: {
          'single-correct': finalQuestions.filter((q) => q.questionType === 'single-correct')
            .length,
          'assertion-reason': finalQuestions.filter((q) => q.questionType === 'assertion-reason')
            .length,
          'match-following': finalQuestions.filter((q) => q.questionType === 'match-following')
            .length,
          'diagram-based': finalQuestions.filter((q) => q.questionType === 'diagram-based').length,
          'multiple-correct': finalQuestions.filter((q) => q.questionType === 'multiple-correct')
            .length,
          numerical: finalQuestions.filter((q) => q.questionType === 'numerical').length,
          'statement-based': finalQuestions.filter((q) => q.questionType === 'statement-based')
            .length,
        },
      },
    })
  } catch (error) {
    console.error('❌ Test generation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate test',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
```

**Purpose:** Main API handler with comprehensive error handling and logging.

---

## 📊 Expected Results After Implementation

### Before (Current)

```json
{
  "questions": [
    {
      "id": "q_1",
      "question": "NEET Biology Question 1 on Cell Biology",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "A",
      "explanation": "Detailed explanation for question 1 will be provided after test completion.",
      "difficulty": "medium",
      "topic": "Cell Biology"
    }
  ]
}
```

### After (Fixed)

```json
{
  "success": true,
  "test": {
    "title": "Cell Biology Mock Test",
    "totalQuestions": 40,
    "duration": 60,
    "negativeMarking": -1,
    "maxMarks": 160,
    "difficulty": "medium",
    "class": "class-11"
  },
  "questions": [
    {
      "id": "q11-001",
      "question": "Which of the following is NOT a characteristic feature of prokaryotic cells?",
      "questionType": "single-correct",
      "options": [
        "Absence of membrane-bound nucleus",
        "Presence of 70S ribosomes",
        "Absence of histone proteins",
        "Presence of membrane-bound organelles"
      ],
      "correctAnswer": "Presence of membrane-bound organelles",
      "explanation": "Prokaryotic cells lack membrane-bound organelles like mitochondria, chloroplasts, ER, and Golgi apparatus...",
      "difficulty": "medium",
      "topic": "topic-11-8-1",
      "marks": 4,
      "timeLimit": 40,
      "ncertReference": "Class 11, Chapter 8, Page 134",
      "previousYearFrequency": 18,
      "bloomsLevel": "Understand",
      "tags": ["eukaryotic cells", "nucleoid", "plasmids"]
    }
  ],
  "metadata": {
    "totalAvailable": 47,
    "distribution": {
      "single-correct": 32,
      "assertion-reason": 6,
      "match-following": 1,
      "diagram-based": 1
    }
  }
}
```

---

## 🧪 Testing Strategy

### Test Case 1: Standard Test Generation

```bash
POST /api/generate-test
{
  "title": "Class 11 Cell Biology Test",
  "topics": ["topic-11-8-1", "topic-11-8-2"],
  "class": "class-11",
  "difficulty": "medium",
  "totalQuestions": 20,
  "duration": 30
}
```

**Expected:** 20 questions, mix of types, medium difficulty

### Test Case 2: Insufficient Questions

```bash
POST /api/generate-test
{
  "class": "class-12",
  "topics": ["topic-12-7-2"], // Evolution - limited questions
  "totalQuestions": 50,
  "difficulty": "hard"
}
```

**Expected:** Error with available count and suggestion

### Test Case 3: Custom Distribution

```bash
POST /api/generate-test
{
  "class": "class-11",
  "totalQuestions": 30,
  "questionTypeDistribution": {
    "single-correct": 20,
    "assertion-reason": 5,
    "match-following": 3,
    "diagram-based": 2
  }
}
```

**Expected:** Exactly 20+5+3+2 = 30 questions with specified distribution

---

## 🚀 Deployment Steps

1. **Backup Current File**

   ```bash
   cp src/app/api/generate-test/route.ts src/app/api/generate-test/route.ts.backup
   ```

2. **Implement Changes**
   - Follow steps 1-6 above
   - Update file line by line

3. **Test Locally**

   ```bash
   npm run dev
   # Test all 3 test cases above
   ```

4. **Run Type Check**

   ```bash
   npx tsc --noEmit
   ```

5. **Commit Changes**

   ```bash
   git add src/app/api/generate-test/route.ts
   git commit -m "feat: Connect test generator API to real question banks

   - Integrated authenticQuestions, advancedQuestions, and neetQuestionBank
   - Implemented intelligent question selection with type distribution
   - Added validation for question availability
   - Improved error handling and logging
   - Questions now include NCERT references and detailed explanations

   Resolves: Task 1 - Test Generator API Implementation"
   ```

6. **Deploy to Production**
   ```bash
   git push origin develop
   # Vercel auto-deploys
   ```

---

## ⏱️ Time Breakdown

| Phase     | Task                                 | Estimated Time         |
| --------- | ------------------------------------ | ---------------------- |
| 1         | Import statements & type definitions | 30 min                 |
| 2         | Build question pool function         | 45 min                 |
| 3         | Question selection logic             | 60 min                 |
| 4         | Validation & error handling          | 30 min                 |
| 5         | Update POST handler                  | 30 min                 |
| 6         | Testing all scenarios                | 45 min                 |
| 7         | Documentation & deployment           | 30 min                 |
| **Total** |                                      | **4 hours 30 minutes** |

---

## 📈 Success Metrics

- ✅ All API calls return real NCERT-aligned questions
- ✅ Question distribution matches configuration (80/15/5 or custom)
- ✅ Difficulty filtering works correctly
- ✅ Topic selection filters questions properly
- ✅ Error messages are clear and actionable
- ✅ Response time < 500ms for 50-question test
- ✅ Zero TypeScript errors
- ✅ All test cases pass

---

## 🔄 Future Enhancements (Post-MVP)

1. **AI Question Generation**
   - Use OpenAI GPT-4 to generate questions when bank is insufficient
   - Validate generated questions against NCERT content

2. **Adaptive Difficulty**
   - Adjust question difficulty based on user's previous performance
   - Implement IRT (Item Response Theory) for optimal question selection

3. **Question Bank Expansion**
   - Reach 1,000 questions for Phase 1
   - Add video explanations
   - Include interactive diagrams

4. **Caching**
   - Cache frequently requested test configurations
   - Use Redis for fast retrieval

5. **Analytics**
   - Track which questions are most frequently selected
   - Monitor difficulty distribution in actual tests
   - A/B test different question selection algorithms

---

## 📞 Support & Questions

If any issues arise during implementation:

- Check TypeScript errors: `npx tsc --noEmit`
- Verify question bank imports are correct
- Test with minimal configuration first (10 questions, single topic)
- Review console logs for debugging information

---

**Document Version:** 1.0
**Last Updated:** October 1, 2025
**Next Review:** After implementation completion
