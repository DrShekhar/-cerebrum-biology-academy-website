# Cerebrum Biology Academy API Documentation

## Overview

Comprehensive API documentation for test sessions, question management, user progress, and authentication systems.

## Base URL

```
Production: https://cerebrumbiologyacademy.com/api
Development: http://localhost:3000/api
```

## Authentication

All API endpoints require authentication via Bearer token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

### User Roles

- `ADMIN`: Full system access
- `TEACHER`: Content creation and student management
- `PARENT`: Access to children's progress
- `STUDENT`: Personal data and test access

## Rate Limiting

API endpoints are rate limited based on user role:

- `ADMIN`: 1000 requests/hour
- `TEACHER`: 500 requests/hour
- `PARENT`: 200 requests/hour
- `STUDENT`: 100 requests/hour

Rate limit headers are included in responses:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Remaining requests in window
- `X-RateLimit-Reset`: Reset time (ISO 8601)

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": [
    {
      "field": "fieldName",
      "message": "Field-specific error"
    }
  ]
}
```

### Common Error Codes

- `AUTH_REQUIRED`: Authentication token missing
- `INVALID_TOKEN`: Token expired or invalid
- `FORBIDDEN`: Insufficient permissions
- `VALIDATION_ERROR`: Request validation failed
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `NOT_FOUND`: Resource not found
- `INTERNAL_ERROR`: Server error

---

## Test Session Management APIs

### Create Test Session

**POST** `/api/test/create`

Creates a new test session with questions generated based on criteria.

#### Request Body

```json
{
  "testTemplateId": "string (optional)",
  "testType": "PRACTICE_TEST | MOCK_TEST | FULL_TEST | QUICK_TEST | ADAPTIVE_TEST | TIMED_TEST | DIAGNOSTIC_TEST",
  "category": "TOPIC_WISE | SUBJECT_WISE | FULL_SYLLABUS | CHAPTER_WISE | DIFFICULTY_WISE | PREVIOUS_YEAR | MIXED",
  "curriculum": "NEET | CBSE | ICSE | IB | IGCSE",
  "grade": "CLASS_9 | CLASS_10 | CLASS_11 | CLASS_12 | DROPPER",
  "subject": "biology | botany | zoology",
  "topics": ["Cell Biology", "Genetics"],
  "difficulty": "EASY | MEDIUM | HARD | EXPERT",
  "questionCount": 30,
  "timeLimit": 60,
  "negativeMarking": false,
  "customSettings": {
    "isAdaptive": false,
    "shuffleQuestions": true,
    "showResults": true,
    "allowReview": true,
    "enableProctoring": false
  }
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "testSession": {
      "id": "session_id",
      "sessionToken": "unique_token",
      "status": "NOT_STARTED",
      "timeLimit": 60,
      "remainingTime": 3600,
      "currentQuestionIndex": 0,
      "testTemplate": {
        "id": "template_id",
        "title": "Cell Biology Test - Medium",
        "type": "PRACTICE_TEST",
        "totalQuestions": 30,
        "totalMarks": 30
      }
    },
    "questionBank": {
      "id": "bank_id",
      "totalQuestions": 30
    },
    "questions": [
      {
        "id": "question_id",
        "index": 1,
        "topic": "Cell Biology",
        "difficulty": "MEDIUM",
        "type": "MCQ",
        "marks": 1
      }
    ]
  }
}
```

---

### Get Test Session Details

**GET** `/api/test/{id}`

Retrieves comprehensive test session information including questions and progress.

#### Response

```json
{
  "success": true,
  "data": {
    "testSession": {
      "id": "session_id",
      "status": "IN_PROGRESS",
      "startedAt": "2024-01-01T10:00:00Z",
      "timeSpent": 1800,
      "remainingTime": 1800,
      "currentQuestionIndex": 15,
      "questionsAnswered": 15,
      "totalScore": 12,
      "percentage": 80.0
    },
    "questions": [
      {
        "index": 1,
        "id": "question_id",
        "topic": "Cell Biology",
        "type": "MCQ",
        "difficulty": "MEDIUM",
        "question": "What is the powerhouse of the cell?",
        "options": ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
        "marks": 1,
        "userResponse": {
          "selectedAnswer": "Mitochondria",
          "isCorrect": true,
          "timeSpent": 45,
          "marksAwarded": 1
        }
      }
    ],
    "progress": {
      "totalQuestions": 30,
      "answeredQuestions": 15,
      "progressPercentage": 50.0,
      "currentScore": 12,
      "accuracy": 80.0
    }
  }
}
```

---

### Submit Answer

**PUT** `/api/test/{id}/answer`

Submits an answer for a specific question in the test session.

#### Request Body

```json
{
  "questionId": "question_id",
  "selectedAnswer": "Mitochondria",
  "timeSpent": 45,
  "confidence": 4,
  "isMarkedForReview": false,
  "deviceType": "desktop",
  "responseMode": "TEST_MODE"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "response": {
      "id": "response_id",
      "questionId": "question_id",
      "selectedAnswer": "Mitochondria",
      "isCorrect": true,
      "marksAwarded": 1,
      "timeSpent": 45
    },
    "currentStats": {
      "totalQuestions": 15,
      "correctAnswers": 12,
      "totalMarks": 12,
      "accuracy": 80.0
    },
    "feedback": {
      "isCorrect": true,
      "marksAwarded": 1
    }
  }
}
```

---

### Submit Test

**POST** `/api/test/{id}/submit`

Submits the entire test for evaluation and generates comprehensive results.

#### Request Body

```json
{
  "forceSubmit": false,
  "finalAnswers": [
    {
      "questionId": "question_id",
      "selectedAnswer": "answer",
      "timeSpent": 60,
      "confidence": 3
    }
  ],
  "sessionData": {
    "totalTimeSpent": 3000,
    "browserEvents": [
      {
        "type": "tab_switch",
        "timestamp": "2024-01-01T10:30:00Z"
      }
    ],
    "deviceInfo": {
      "userAgent": "Mozilla/5.0...",
      "screenSize": "1920x1080"
    }
  }
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "submission": {
      "id": "session_id",
      "status": "COMPLETED",
      "submittedAt": "2024-01-01T11:00:00Z",
      "totalScore": 24,
      "maxPossibleScore": 30,
      "percentage": 80.0,
      "percentileRank": 75.5,
      "rank": 25,
      "isPassed": true
    },
    "performance": {
      "totalQuestions": 30,
      "correctAnswers": 24,
      "incorrectAnswers": 6,
      "accuracy": 80.0,
      "averageTimePerQuestion": 100
    },
    "analytics": {
      "strengthTopics": ["Cell Biology", "Genetics"],
      "weaknessTopics": ["Ecology"],
      "topicPerformance": {
        "Cell Biology": {
          "accuracy": 90.0,
          "totalQuestions": 10,
          "correctAnswers": 9
        }
      }
    },
    "recommendations": {
      "studyTopics": ["Ecology", "Evolution"],
      "nextSteps": ["Take advanced level tests", "Focus on time management"]
    }
  }
}
```

---

### Get Test Results

**GET** `/api/test/{id}/results`

Retrieves comprehensive test results and analytics.

#### Query Parameters

- `analytics`: Include detailed analytics (default: true)
- `questions`: Include question-wise analysis (default: true)
- `comparison`: Include comparison with other users (default: true)

#### Response

```json
{
  "success": true,
  "data": {
    "testSession": {
      "id": "session_id",
      "status": "COMPLETED",
      "percentage": 80.0,
      "percentileRank": 75.5
    },
    "performance": {
      "totalQuestions": 30,
      "correctAnswers": 24,
      "accuracy": 80.0,
      "isPassed": true
    },
    "questionAnalysis": [
      {
        "questionNumber": 1,
        "topic": "Cell Biology",
        "isCorrect": true,
        "timeSpent": 45,
        "correctAnswer": "Mitochondria",
        "userAnswer": "Mitochondria",
        "explanation": "Mitochondria are known as the powerhouse..."
      }
    ],
    "analytics": {
      "topicAnalysis": [
        {
          "topic": "Cell Biology",
          "accuracy": 90.0,
          "performance": "Excellent"
        }
      ],
      "difficultyAnalysis": {
        "easy": { "accuracy": 95.0, "attempted": 10 },
        "medium": { "accuracy": 75.0, "attempted": 15 },
        "hard": { "accuracy": 60.0, "attempted": 5 }
      }
    }
  }
}
```

---

### Delete Test Session

**DELETE** `/api/test/{id}`

Deletes a test session (only allowed for non-completed sessions).

#### Response

```json
{
  "success": true,
  "message": "Test session deleted successfully"
}
```

---

## Question Management APIs

### Get Questions

**GET** `/api/questions`

Retrieves questions with filtering, pagination, and search capabilities.

#### Query Parameters

- `topic`: Filter by topic
- `curriculum`: Filter by curriculum (NEET, CBSE, etc.)
- `grade`: Filter by grade level
- `difficulty`: Filter by difficulty level
- `type`: Filter by question type
- `search`: Search in question text
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)
- `sortBy`: Sort field (createdAt, difficulty, topic)
- `sortOrder`: Sort order (asc, desc)

#### Response

```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "id": "question_id",
        "topic": "Cell Biology",
        "type": "MCQ",
        "difficulty": "MEDIUM",
        "question": "What is the powerhouse of the cell?",
        "options": ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
        "marks": 1,
        "successRate": 85.5,
        "isActive": true,
        "isVerified": true
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 50,
      "totalCount": 1000,
      "hasMore": true
    },
    "filters": {
      "available": {
        "topics": ["Cell Biology", "Genetics"],
        "curricula": ["NEET", "CBSE"],
        "difficulties": ["EASY", "MEDIUM", "HARD"]
      }
    }
  }
}
```

---

### Create Question

**POST** `/api/questions`

Creates a new question. Requires TEACHER or ADMIN role.

#### Request Body

```json
{
  "topic": "Cell Biology",
  "subtopic": "Cell Organelles",
  "curriculum": "NEET",
  "grade": "CLASS_12",
  "subject": "biology",
  "type": "MCQ",
  "difficulty": "MEDIUM",
  "question": "What is the powerhouse of the cell?",
  "options": ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
  "correctAnswer": "Mitochondria",
  "explanation": "Mitochondria are known as the powerhouse of the cell because they produce ATP through cellular respiration.",
  "questionImage": "https://example.com/image.jpg",
  "marks": 1,
  "timeLimit": 60,
  "tags": ["organelles", "energy", "ATP"],
  "relatedConcepts": ["Cellular respiration", "ATP synthesis"],
  "source": "NEET_2023",
  "category": "PRACTICE"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "question": {
      "id": "question_id",
      "topic": "Cell Biology",
      "type": "MCQ",
      "difficulty": "MEDIUM",
      "isActive": true,
      "isVerified": true,
      "createdAt": "2024-01-01T10:00:00Z"
    }
  },
  "meta": {
    "autoVerified": true,
    "needsReview": false
  }
}
```

---

### Get Question Details

**GET** `/api/questions/{id}`

Retrieves detailed information about a specific question.

#### Response

```json
{
  "success": true,
  "data": {
    "id": "question_id",
    "topic": "Cell Biology",
    "question": "What is the powerhouse of the cell?",
    "options": ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
    "correctAnswer": "Mitochondria",
    "explanation": "Detailed explanation...",
    "statistics": {
      "totalAttempts": 1000,
      "correctAttempts": 850,
      "successRate": 85.0
    },
    "userProgress": {
      "totalAttempts": 3,
      "correctAttempts": 2,
      "lastAttempt": "2024-01-01T10:00:00Z"
    }
  }
}
```

---

### Update Question

**PUT** `/api/questions/{id}`

Updates an existing question. Requires appropriate permissions.

#### Request Body

```json
{
  "question": "Updated question text",
  "explanation": "Updated explanation",
  "difficulty": "HARD",
  "tags": ["updated", "tags"]
}
```

---

### Delete Question

**DELETE** `/api/questions/{id}`

Deletes a question. If question is in use, performs soft delete.

#### Response

```json
{
  "success": true,
  "message": "Question deleted successfully",
  "action": "hard_delete"
}
```

---

### Get Random Questions

**GET** `/api/questions/random`

Generates random questions for test creation with adaptive difficulty.

#### Query Parameters

- `count`: Number of questions (1-100)
- `topics`: Comma-separated topic list
- `curriculum`: Curriculum filter
- `difficulty`: Difficulty filter
- `adaptiveMode`: Enable adaptive difficulty (boolean)
- `weightByPerformance`: Weight by user performance (boolean)
- `excludeIds`: Comma-separated question IDs to exclude

#### Response

```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "id": "question_id",
        "topic": "Cell Biology",
        "difficulty": "MEDIUM",
        "successRate": 75.0,
        "isAdaptive": true
      }
    ],
    "metadata": {
      "requestedCount": 10,
      "actualCount": 10,
      "adaptiveMode": true
    },
    "statistics": {
      "topicDistribution": {
        "Cell Biology": 5,
        "Genetics": 5
      },
      "difficultyDistribution": {
        "MEDIUM": 7,
        "HARD": 3
      }
    }
  }
}
```

---

## User Progress APIs

### Get User Progress

**GET** `/api/progress/{userId}`

Retrieves comprehensive progress data for a user.

#### Query Parameters

- `curriculum`: Filter by curriculum
- `timeFrame`: Time period (week, month, quarter, year, all)
- `groupBy`: Group by (topic, difficulty, curriculum)
- `sortBy`: Sort by (accuracy, masteryScore, lastPracticed)

#### Response

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "role": "STUDENT"
    },
    "summary": {
      "totalTopics": 25,
      "totalQuestions": 500,
      "overallAccuracy": 75.5,
      "averageMastery": 68.2,
      "strongTopics": 8,
      "weakTopics": 3
    },
    "progressByTopic": [
      {
        "topic": "Cell Biology",
        "topics": [
          {
            "topic": "Cell Biology",
            "totalQuestions": 50,
            "correctAnswers": 40,
            "accuracy": 80.0,
            "masteryScore": 75.0,
            "currentLevel": "MEDIUM",
            "lastPracticed": "2024-01-01T10:00:00Z"
          }
        ]
      }
    ],
    "recentActivity": {
      "testSessions": [
        {
          "id": "session_id",
          "title": "Mock Test 1",
          "score": 24,
          "percentage": 80.0,
          "submittedAt": "2024-01-01T10:00:00Z"
        }
      ],
      "learningVelocity": {
        "questionsPerDay": 15.5,
        "accuracy": 78.0,
        "averageTime": 90
      }
    },
    "insights": {
      "strengths": ["Cell Biology", "Genetics"],
      "weaknesses": ["Ecology"],
      "recommendations": ["Focus on improving: Ecology", "Practice more questions"]
    }
  }
}
```

---

### Update User Progress

**POST** `/api/progress/{userId}/update`

Updates progress metrics for a user (typically called automatically).

#### Request Body

```json
{
  "topic": "Cell Biology",
  "curriculum": "NEET",
  "grade": "CLASS_12",
  "questionResults": [
    {
      "questionId": "question_id",
      "isCorrect": true,
      "timeSpent": 45,
      "difficulty": "MEDIUM"
    }
  ]
}
```

---

### Get User Analytics

**GET** `/api/progress/{userId}/analytics`

Retrieves detailed analytics and insights for a user.

#### Response

```json
{
  "success": true,
  "data": {
    "performanceTrends": {
      "accuracy": [
        { "date": "2024-01-01", "value": 70.0 },
        { "date": "2024-01-02", "value": 72.0 }
      ],
      "speed": [
        { "date": "2024-01-01", "value": 95.0 },
        { "date": "2024-01-02", "value": 88.0 }
      ]
    },
    "topicMastery": {
      "mastered": ["Cell Biology", "Genetics"],
      "inProgress": ["Ecology", "Evolution"],
      "notStarted": ["Plant Physiology"]
    },
    "studyPatterns": {
      "peakHours": [9, 10, 11, 19, 20],
      "averageSessionLength": 45,
      "studyStreak": 7
    },
    "predictions": {
      "expectedScore": 85.5,
      "readinessLevel": "HIGH",
      "recommendedStudyTime": 120
    }
  }
}
```

---

### Get Leaderboard

**GET** `/api/progress/leaderboard`

Retrieves leaderboard data for competitive rankings.

#### Query Parameters

- `timeFrame`: Time period for ranking
- `curriculum`: Filter by curriculum
- `grade`: Filter by grade
- `limit`: Number of entries (default: 50)

#### Response

```json
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "userId": "user_id",
        "name": "John Doe",
        "score": 95.5,
        "testsCompleted": 25,
        "accuracy": 88.0,
        "badge": "Top Performer"
      }
    ],
    "userRank": {
      "rank": 15,
      "score": 82.0,
      "percentile": 75.5
    }
  }
}
```

---

## Authentication & Security

### Security Headers

All responses include security headers:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`

### CSRF Protection

State-changing operations require CSRF token in header:

```
X-CSRF-Token: <csrf_token>
```

### Request Logging

All API requests are logged with:

- Request method and path
- User ID and role
- Response status and duration
- Rate limit status
- Error details (if any)

---

## WebSocket Endpoints (Real-time)

### Test Session WebSocket

**WS** `/api/realtime/test/{sessionId}`

Real-time test session updates including:

- Timer updates
- Progress synchronization
- Anti-cheating monitoring
- Live proctoring events

#### Messages

```json
// Timer update
{
  "type": "timer_update",
  "remainingTime": 1800,
  "serverTime": "2024-01-01T10:30:00Z"
}

// Progress update
{
  "type": "progress_update",
  "questionsAnswered": 15,
  "currentScore": 12,
  "accuracy": 80.0
}

// Anti-cheat alert
{
  "type": "anticheat_alert",
  "event": "tab_switch",
  "count": 3,
  "warning": true
}
```

---

## Admin APIs

### System Analytics

**GET** `/api/admin/analytics`

System-wide analytics for administrators.

#### Response

```json
{
  "success": true,
  "data": {
    "users": {
      "total": 10000,
      "active": 7500,
      "newThisMonth": 500
    },
    "tests": {
      "totalSessions": 50000,
      "completedThisWeek": 2500,
      "averageScore": 72.5
    },
    "questions": {
      "total": 5000,
      "verified": 4500,
      "pendingReview": 50
    },
    "performance": {
      "averageResponseTime": 250,
      "uptime": 99.9,
      "errorRate": 0.1
    }
  }
}
```

### User Management

**GET** `/api/admin/users`

Manage users with advanced filtering and bulk operations.

**POST** `/api/admin/users/{id}/action`

Perform administrative actions on users.

```json
{
  "action": "suspend | activate | reset_password | change_role",
  "reason": "Reason for action",
  "duration": "7d",
  "newRole": "TEACHER"
}
```

---

## Monitoring & Health

### Health Check

**GET** `/api/health`

System health status.

#### Response

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T10:00:00Z",
  "services": {
    "database": "healthy",
    "redis": "healthy",
    "external_apis": "healthy"
  },
  "metrics": {
    "response_time": 150,
    "memory_usage": 65.5,
    "cpu_usage": 45.2
  }
}
```

### Metrics

**GET** `/api/metrics`

Performance and usage metrics (Prometheus format).

---

## SDK Examples

### JavaScript/TypeScript

```typescript
import { CerebrumAPI } from '@cerebrum/api-client'

const api = new CerebrumAPI({
  baseURL: 'https://cerebrumbiologyacademy.com/api',
  apiKey: 'your-api-key'
})

// Create test session
const testSession = await api.tests.create({
  topics: ['Cell Biology', 'Genetics'],
  difficulty: 'MEDIUM',
  questionCount: 30,
  timeLimit: 60
})

// Submit answer
await api.tests.submitAnswer(testSession.id, {
  questionId: 'q1',
  selectedAnswer: 'Mitochondria',
  timeSpent: 45
})

// Get progress
const progress = await api.progress.get('user_id')
```

### Python

```python
from cerebrum_api import CerebrumAPI

api = CerebrumAPI(
    base_url='https://cerebrumbiologyacademy.com/api',
    api_key='your-api-key'
)

# Create test session
test_session = api.tests.create(
    topics=['Cell Biology', 'Genetics'],
    difficulty='MEDIUM',
    question_count=30,
    time_limit=60
)

# Submit answer
api.tests.submit_answer(
    test_session['id'],
    question_id='q1',
    selected_answer='Mitochondria',
    time_spent=45
)
```

---

## Testing

### Postman Collection

Import the Postman collection for easy API testing:

```
https://cerebrumbiologyacademy.com/api/postman-collection.json
```

### Authentication for Testing

Use the test endpoint to get authentication tokens:

**POST** `/api/auth/test-login`

```json
{
  "role": "STUDENT",
  "testUser": true
}
```

---

## Support

- **Documentation**: https://docs.cerebrumbiologyacademy.com
- **Support Email**: api-support@cerebrumbiologyacademy.com
- **Status Page**: https://status.cerebrumbiologyacademy.com

---

## Changelog

### v1.0.0 (2024-01-01)
- Initial API release
- Test session management
- Question management
- User progress tracking
- Real-time WebSocket support
- Comprehensive authentication and security

### v1.1.0 (2024-02-01)
- Enhanced analytics
- Adaptive question selection
- Performance improvements
- Additional admin endpoints

---

*Last updated: January 2024*