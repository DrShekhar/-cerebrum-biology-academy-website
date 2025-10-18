# Quick Start Guide - AI Test Generator

## 5-Minute Setup

### Step 1: Environment Variables

Add to `.env.local`:

```bash
ANTHROPIC_API_KEY=your_api_key_here
DATABASE_URL=your_postgresql_url
```

### Step 2: Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed test data (if available)
npm run db:seed
```

### Step 3: Start Development Server

```bash
npm run dev
```

### Step 4: Test the API

```bash
# Health check
curl http://localhost:3000/api/ai/generate-test

# Generate a test
curl -X POST http://localhost:3000/api/ai/generate-test \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "student_test",
    "testType": "practice",
    "config": {
      "totalQuestions": 10,
      "duration": 15
    }
  }'
```

## API Quick Reference

### 1. Generate Test

```typescript
POST /api/ai/generate-test

Body:
{
  studentId: string
  testType: 'practice' | 'mock' | 'chapter' | 'weak-areas'
  config?: {
    totalQuestions?: number    // Default: 50
    duration?: number          // Default: 60 minutes
    topics?: string[]          // Optional topic filter
    difficulty?: 'easy' | 'medium' | 'hard' | 'mixed'
  }
}

Response:
{
  testId: string
  title: string
  description: string
  questions: Question[]
  metadata: { ... }
  instructions: string[]
}
```

### 2. Start Test

```typescript
POST / api / ai / test / start

Body: {
  testId: string
  studentId: string
}
```

### 3. Submit Test

```typescript
POST /api/ai/test/submit

Body:
{
  testId: string
  studentId: string
  answers: { questionId: selectedAnswer }
  timeSpent: number
}

Response:
{
  totalScore: number
  percentage: number
  topicWiseAnalysis: { ... }
  aiAnalysis: { ... }
}
```

### 4. Get Results

```typescript
GET /api/ai/test/results/[testId]

Response:
{
  performance: { ... }
  topicWiseAnalysis: [ ... ]
  questionDetails: [ ... ]
  aiInsights: {
    overallAssessment: string
    strengths: string[]
    areasToImprove: string[]
    studyPlan: [ ... ]
  }
}
```

## Common Use Cases

### Use Case 1: Generate Weak Areas Test

```javascript
const response = await fetch('/api/ai/generate-test', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    studentId: 'student_123',
    testType: 'weak-areas',
    config: {
      totalQuestions: 20,
      duration: 30,
      includeWeakAreas: true,
    },
  }),
})

const test = await response.json()
console.log('Test ID:', test.testId)
console.log('Weak areas targeted:', test.metadata.weakAreasTargeted)
```

### Use Case 2: Full Test Lifecycle

```javascript
// 1. Generate
const test = await generateTest(studentId, 'practice')

// 2. Start
await startTest(test.testId, studentId)

// 3. Take test (student answers questions)
const answers = collectAnswers()

// 4. Submit
const results = await submitTest(test.testId, studentId, answers, timeSpent)

// 5. Show results
displayResults(results)

// 6. Get detailed analysis
const details = await getDetailedResults(test.testId)
displayAIInsights(details.aiInsights)
```

### Use Case 3: Topic-Specific Practice

```javascript
const response = await fetch('/api/ai/generate-test', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    studentId: 'student_123',
    testType: 'chapter',
    config: {
      topics: ['Cell Biology', 'Cell Cycle and Cell Division'],
      totalQuestions: 30,
      difficulty: 'medium',
    },
  }),
})
```

## Test Types Explained

### Practice Test

- **Purpose:** Regular practice with mixed topics
- **Distribution:** 40% weak, 30% moderate, 30% strong
- **Best for:** Daily practice, concept reinforcement

### Mock Test

- **Purpose:** Simulate real NEET exam
- **Distribution:** Follows NEET pattern
- **Best for:** Exam preparation, time management

### Chapter Test

- **Purpose:** Focus on specific topics
- **Distribution:** 100% from selected topics
- **Best for:** Topic mastery, after completing chapters

### Weak Areas Test

- **Purpose:** Target improvement areas
- **Distribution:** 60% weak, 20% moderate, 20% strong
- **Best for:** Improving accuracy, addressing gaps

## Troubleshooting

### Issue: "Student not found"

**Solution:** Ensure student exists in database with valid ID

### Issue: "Insufficient questions"

**Solution:** Add more questions to database or reduce totalQuestions

### Issue: "AI personalization failed"

**Solution:** Check ANTHROPIC_API_KEY, fallback will be used

### Issue: Slow generation

**Solution:** Check database indexes and question count

## Next Steps

1. **Read Full Documentation:** `/docs/AI_TEST_GENERATOR.md`
2. **Run Tests:** `npx tsx scripts/test-ai-generator.ts`
3. **Integrate with Frontend:** See usage examples above
4. **Monitor Performance:** Check logs and response times

## Support

- Documentation: `/docs/AI_TEST_GENERATOR.md`
- Implementation Summary: `/IMPLEMENTATION_SUMMARY_TEST_GENERATOR.md`
- Issues: Contact development team

---

**Last Updated:** January 18, 2025
