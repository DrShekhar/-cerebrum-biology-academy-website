# AI-Powered Test Generator System

## Overview

The AI-Powered Test Generator system for Cerebrum Biology Academy generates personalized NEET practice tests based on student performance, weak areas, and learning patterns. It uses Claude Sonnet 4 for intelligent personalization and integrates with the PostgreSQL database via Prisma.

## Architecture

### Core Components

1. **Test Generation Engine** (`/api/ai/generate-test`)
   - Analyzes student weak areas
   - Calculates optimal question distribution
   - Fetches questions from database
   - Applies difficulty progression
   - Generates AI-powered personalization

2. **Test Session Management**
   - Start Test: `/api/ai/test/start`
   - Submit Test: `/api/ai/test/submit`
   - Test Details: `/api/ai/test/[testId]`
   - Test Results: `/api/ai/test/results/[testId]`

3. **AI Personalization Layer**
   - Claude Sonnet 4 integration
   - Custom test titles and descriptions
   - Personalized instructions
   - Study recommendations
   - Performance insights

## API Endpoints

### 1. Generate Test

**POST** `/api/ai/generate-test`

Generates a personalized test based on student profile and preferences.

#### Request Body

```typescript
{
  studentId: string              // Required: Student identifier
  testType: 'practice' | 'mock' | 'chapter' | 'weak-areas'
  config?: {
    totalQuestions?: number      // Default: 50
    topics?: string[]            // Specific topics to include
    difficulty?: 'easy' | 'medium' | 'hard' | 'mixed'  // Default: mixed
    duration?: number            // In minutes, default: 60
    includeWeakAreas?: boolean   // Default: true
    examPattern?: 'neet' | 'cbse' | 'custom'  // Default: neet
  }
}
```

#### Response

```typescript
{
  testId: string
  title: string                  // AI-generated engaging title
  description: string            // Personalized description
  questions: Question[]
  metadata: {
    totalQuestions: number
    totalMarks: number
    duration: number
    difficulty: string
    topics: string[]
    weakAreasTargeted: string[]
  }
  instructions: string[]         // Personalized instructions
  createdAt: string
}
```

#### Question Format

```typescript
{
  id: string
  question: string
  options: string[]
  correctAnswer: string
  explanation?: string
  topic: string
  subtopic?: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  marks: number
  timeLimit?: number
}
```

### 2. Start Test

**POST** `/api/ai/test/start`

Initializes a test session and records start time.

#### Request Body

```typescript
{
  testId: string
  studentId: string
}
```

#### Response

```typescript
{
  success: boolean
  testId: string
  sessionToken: string
  startedAt: string
  status: 'IN_PROGRESS'
}
```

### 3. Submit Test

**POST** `/api/ai/test/submit`

Submits test answers, calculates score, and generates AI analysis.

#### Request Body

```typescript
{
  testId: string
  studentId: string
  answers: Record<string, string> // questionId -> selectedAnswer
  timeSpent: number // Total time in seconds
}
```

#### Response

```typescript
{
  testId: string
  totalScore: number
  totalMarks: number
  percentage: number
  correctAnswers: number
  incorrectAnswers: number
  unattempted: number
  timeSpent: number
  questionResults: Array<{
    questionId: string
    isCorrect: boolean
    marksAwarded: number
    timeSpent: number
  }>
  topicWiseAnalysis: Record<string, {
    correct: number
    total: number
    accuracy: number
  }>
  aiAnalysis: {
    strengths: string[]
    weaknesses: string[]
    recommendations: string[]
    motivationalMessage: string
  }
}
```

### 4. Get Test Details

**GET** `/api/ai/test/[testId]`

Fetches test details and current progress.

#### Response

```typescript
{
  testId: string
  sessionToken: string
  status: TestSessionStatus
  startedAt: string
  submittedAt?: string
  timeSpent: number
  remainingTime?: number
  currentQuestionIndex: number
  questionsAnswered: number
  template: TestTemplate
  questions: Question[]
}
```

**PATCH** `/api/ai/test/[testId]`

Updates test progress (auto-save functionality).

#### Request Body

```typescript
{
  currentQuestionIndex: number
  questionsAnswered: number
  questionsMarkedForReview: number
  timeSpent: number
  tabSwitchCount?: number
  fullscreenExits?: number
}
```

### 5. Get Test Results

**GET** `/api/ai/test/results/[testId]`

Provides comprehensive test results with AI-powered insights.

#### Response

```typescript
{
  testId: string
  testInfo: {
    title: string
    completedAt: string
    duration: number
    totalQuestions: number
  }
  performance: {
    totalScore: number
    totalMarks: number
    percentage: number
    correctAnswers: number
    incorrectAnswers: number
    unattempted: number
    timeSpent: number
    averageTimePerQuestion: number
  }
  topicWiseAnalysis: Array<{
    topic: string
    attempted: number
    correct: number
    incorrect: number
    accuracy: number
    timeSpent: number
  }>
  difficultyAnalysis: {
    easy: { attempted: number; correct: number; accuracy: number }
    medium: { attempted: number; correct: number; accuracy: number }
    hard: { attempted: number; correct: number; accuracy: number }
  }
  questionDetails: Array<{
    questionId: string
    question: string
    topic: string
    difficulty: string
    yourAnswer: string
    correctAnswer: string
    isCorrect: boolean
    explanation?: string
    marksAwarded: number
    timeSpent: number
  }>
  aiInsights: {
    overallAssessment: string
    strengths: string[]
    areasToImprove: string[]
    studyPlan: Array<{
      topic: string
      priority: 'high' | 'medium' | 'low'
      recommendations: string[]
    }>
    motivationalMessage: string
    nextSteps: string[]
  }
  comparativeAnalysis: {
    percentileRank?: number
    averageScore?: number
    yourScore: number
    performanceTrend: 'improving' | 'declining' | 'stable' | 'first-test'
  }
}
```

## Question Selection Algorithm

### Distribution Strategy

The system uses intelligent question distribution based on test type:

#### Weak Areas Test (60/20/20 split)

- 60% from identified weak topics
- 20% from moderate performing topics
- 20% from strong topics (confidence building)

#### Mock Test (40/30/30 split)

- 40% from weak areas
- 30% from moderate areas
- 30% from strong areas

#### Practice Test (40/30/30 split)

- Balanced topic distribution
- Mixed difficulty levels
- Diverse topic coverage

### Difficulty Progression

The system applies strategic difficulty progression:

1. **Warm-up (0-20%)**: Medium difficulty questions
2. **Confidence Building (20-30%)**: Easy questions
3. **Challenge Phase (30-70%)**: Alternating hard and medium
4. **Confidence Boost (70-100%)**: Mix of medium and easy

### Topic Balancing

For NEET pattern tests, the system ensures:

- 50/50 Botany/Zoology balance
- 40/60 Class 11/Class 12 ratio
- Diverse topic coverage across all units
- Recent exam pattern alignment

## AI Personalization Features

### Test Generation

Claude Sonnet 4 analyzes:

- Student's weak areas and accuracy levels
- Recent performance trends
- Test type and target goals

Generates:

- Engaging, motivational test titles
- Context-aware descriptions
- Personalized instructions
- Targeted study tips

### Result Analysis

AI provides:

- Comprehensive performance assessment
- Specific strengths identification
- Root cause analysis of weaknesses
- Prioritized study plan with action items
- Motivational messages with growth mindset
- Immediate next steps for improvement

## Database Schema Integration

### Key Models Used

#### TestSession

```prisma
model TestSession {
  id                      String
  userId                  String?
  freeUserId              String?
  testTemplateId          String
  sessionToken            String
  status                  TestSessionStatus
  startedAt               DateTime?
  submittedAt             DateTime?
  timeSpent               Int
  currentQuestionIndex    Int
  questionsAnswered       Int
  totalScore              Int?
  percentage              Float?
  // ... relationships and tracking fields
}
```

#### UserProgress

```prisma
model UserProgress {
  id               String
  userId           String?
  freeUserId       String?
  topic            String
  curriculum       String
  totalQuestions   Int
  correctAnswers   Int
  accuracy         Float
  lastPracticed    DateTime?
  // ... mastery and recommendations
}
```

#### UserQuestionResponse

```prisma
model UserQuestionResponse {
  id              String
  userId          String?
  freeUserId      String?
  questionId      String
  testSessionId   String?
  selectedAnswer  String?
  isCorrect       Boolean?
  timeSpent       Int?
  marksAwarded    Int
  answeredAt      DateTime
}
```

## Performance Optimizations

### Question Fetching

- Fetch 2x required questions for randomization
- Prioritize less recently used questions
- Exclude already used question IDs
- Database indexing on key fields

### Caching Strategy

- Cache frequent topic queries
- Pre-generate common test patterns
- Session-based result caching

### Database Queries

- Batch operations where possible
- Efficient joins with Prisma include
- Limit concurrent operations per student

## Error Handling

### Validation Checks

- Student ID existence
- Sufficient questions availability
- Valid configuration parameters
- Test session state verification

### Fallback Mechanisms

- AI generation fallback responses
- Default question selection if database fails
- Graceful degradation of features

### Logging

- Test generation requests
- AI API calls and responses
- Database errors
- Performance metrics

## Testing Guide

### Manual Testing

#### 1. Generate a Weak Areas Test

```bash
curl -X POST http://localhost:3000/api/ai/generate-test \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "student_123",
    "testType": "weak-areas",
    "config": {
      "totalQuestions": 20,
      "duration": 30,
      "includeWeakAreas": true
    }
  }'
```

#### 2. Start Test Session

```bash
curl -X POST http://localhost:3000/api/ai/test/start \
  -H "Content-Type: application/json" \
  -d '{
    "testId": "test_xyz",
    "studentId": "student_123"
  }'
```

#### 3. Submit Test

```bash
curl -X POST http://localhost:3000/api/ai/test/submit \
  -H "Content-Type: application/json" \
  -d '{
    "testId": "test_xyz",
    "studentId": "student_123",
    "answers": {
      "question_1": "option_a",
      "question_2": "option_b"
    },
    "timeSpent": 1800
  }'
```

#### 4. Get Results

```bash
curl http://localhost:3000/api/ai/test/results/test_xyz
```

### Performance Benchmarks

Target metrics:

- Test generation: < 3 seconds
- Question fetching: < 1 second
- Submission processing: < 2 seconds
- AI analysis: < 2 seconds
- Total test lifecycle: < 8 seconds

### Validation Checks

- ✅ Question distribution matches configuration
- ✅ Difficulty progression is applied
- ✅ Topic balancing for NEET pattern
- ✅ Weak areas are prioritized
- ✅ Database updates are atomic
- ✅ AI personalization is generated
- ✅ Results are accurate

## Environment Variables

Required environment variables:

```bash
# Anthropic AI
ANTHROPIC_API_KEY=your_anthropic_key

# Database
DATABASE_URL=postgresql://user:password@host:port/database
```

## Future Enhancements

### Planned Features

1. **Adaptive Testing**
   - Dynamic difficulty adjustment
   - Real-time question selection
   - Personalized question count

2. **Advanced Analytics**
   - Learning curve tracking
   - Predictive performance modeling
   - Peer comparison analytics

3. **Enhanced Personalization**
   - Learning style detection
   - Optimal study time suggestions
   - Concept dependency mapping

4. **Integration Features**
   - WhatsApp result notifications
   - Email performance reports
   - Parental monitoring dashboard

## Troubleshooting

### Common Issues

**Issue**: Test generation taking too long

- **Solution**: Check database indexes, optimize queries, implement caching

**Issue**: AI personalization fails

- **Solution**: Fallback responses are used automatically, check API key

**Issue**: Insufficient questions for test

- **Solution**: System will include available questions and log warning

**Issue**: Database connection errors

- **Solution**: Check DATABASE_URL, verify Prisma schema is synced

## Support

For issues or questions:

- GitHub Issues: [Repository Issues]
- Email: support@cerebrumbiologyacademy.com
- Phone: +91 88264 44334

---

**Last Updated**: 2025-01-18
**Version**: 1.0.0
**Maintained by**: Cerebrum Biology Academy Development Team
