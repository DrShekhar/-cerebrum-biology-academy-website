# Cerebrum Biology Academy - Data Model Documentation

**Version:** 1.0
**Last Updated:** 2025-01-27
**Database:** PostgreSQL with Prisma ORM

## Table of Contents

1. [Overview](#overview)
2. [Domain Models](#domain-models)
3. [Entity Relationship Diagrams](#entity-relationship-diagrams)
4. [Service Layer Models](#service-layer-models)
5. [UI Data Models](#ui-data-models)
6. [Data Flow Architecture](#data-flow-architecture)

---

## Overview

The Cerebrum Biology Academy platform consists of **32 core models** organized into 7 logical domains:

### Domain Summary

| Domain                     | Models                                                         | Purpose                                         |
| -------------------------- | -------------------------------------------------------------- | ----------------------------------------------- |
| **User Management**        | User, Session, FreeUser                                        | Authentication, user profiles, free/guest users |
| **Course Management**      | Course, Enrollment, Chapter, Topic                             | Course structure, enrollment tracking           |
| **Content Management**     | StudyMaterial, MaterialAccess, MaterialProgress                | Study materials, videos, PDFs, access control   |
| **Assessment System**      | Question, TestTemplate, TestSession, TestAttempt, TestQuestion | Tests, questions, attempt tracking              |
| **Question Bank**          | QuestionBank, QuestionBankQuestion, UserQuestionResponse       | Organized question collections                  |
| **Analytics & Progress**   | UserProgress, TestAnalytics, PerformanceReport, AnalyticsEvent | Learning analytics, performance tracking        |
| **Community & Engagement** | ForumPost, ForumReply, Achievement, Bookmark, StudyPlan        | Social learning, gamification                   |
| **Business Operations**    | DemoBooking, Payment, CommunicationLog, ContentNotification    | Sales, payments, communications                 |

---

## Domain Models

### 1. User Management Domain

#### Core Entities

- **User**: Authenticated users (students, teachers, parents, admins)
- **Session**: Authentication sessions (NextAuth.js)
- **FreeUser**: Guest users without signup (localStorage-based)

#### Entity Relationship Diagram

\`\`\`mermaid
erDiagram
User ||--o{ Session : "has"
User ||--o{ Enrollment : "enrolls in"
User ||--o{ Payment : "makes"
User ||--o{ TestSession : "takes"
User ||--o{ UserProgress : "tracks"
User ||--o{ MaterialAccess : "accesses"
User ||--o{ DemoBooking : "books"
User ||--o{ CommunicationLog : "communicates"

    FreeUser ||--o{ TestSession : "takes"
    FreeUser ||--o{ TestAttempt : "attempts"
    FreeUser ||--o{ UserProgress : "tracks"
    FreeUser ||--o{ Achievement : "earns"

    User {
        string id PK
        string email UK
        string phone UK
        string name
        enum role
        string passwordHash
        datetime emailVerified
        json profile
        datetime createdAt
        datetime lastActiveAt
    }

    FreeUser {
        string id PK
        string email
        string name
        enum grade
        string curriculum
        int totalPoints
        int studyStreak
        float averageScore
        int totalTestsTaken
        json weakestTopics
        json strongestTopics
        datetime lastActiveDate
    }

    Session {
        string id PK
        string sessionToken UK
        string userId FK
        datetime expires
    }

\`\`\`

### 2. Course Management Domain

#### Core Entities

- **Course**: Class 11/12 courses with syllabus
- **Enrollment**: Student course enrollments
- **Chapter**: Course chapters
- **Topic**: Chapter topics/subtopics

#### Entity Relationship Diagram

\`\`\`mermaid
erDiagram
Course ||--o{ Enrollment : "has"
Course ||--o{ Chapter : "contains"
Course ||--o{ StudyMaterial : "includes"
Course ||--o{ DemoBooking : "for"

    Chapter ||--o{ Topic : "contains"
    Chapter ||--o{ ChapterNote : "has"

    User ||--o{ Enrollment : "creates"
    Enrollment ||--o{ Payment : "generates"

    Course {
        string id PK
        string name
        string description
        enum type
        enum class
        int duration
        int totalFees
        json syllabus
        json features
        boolean isActive
        int sortOrder
    }

    Enrollment {
        string id PK
        string userId FK
        string courseId FK
        enum status
        datetime enrollmentDate
        int totalFees
        int paidAmount
        int pendingAmount
        enum paymentPlan
        int currentProgress
    }

    Chapter {
        string id PK
        string courseId FK
        string title
        string description
        int orderIndex
        int estimatedHours
        json learningObjectives
    }

    Topic {
        string id PK
        string chapterId FK
        string title
        string description
        int orderIndex
        int estimatedMinutes
        enum difficulty
    }

\`\`\`

### 3. Assessment System Domain

#### Core Entities

- **Question**: MCQ, short answer, and other question types
- **TestTemplate**: Test configurations (NEET/CBSE/Custom)
- **TestSession**: Active test attempts
- **TestAttempt**: Completed test records
- **TestQuestion**: Questions linked to tests

#### Entity Relationship Diagram

\`\`\`mermaid
erDiagram
TestTemplate ||--o{ TestQuestion : "contains"
TestTemplate ||--o{ TestSession : "generates"
TestTemplate ||--o{ TestAttempt : "tracks"

    Question ||--o{ TestQuestion : "included in"
    Question ||--o{ UserQuestionResponse : "answered by"
    Question ||--o{ QuestionBankQuestion : "belongs to"

    TestSession ||--o{ UserQuestionResponse : "records"
    TestSession }o--|| User : "taken by"
    TestSession }o--|| FreeUser : "taken by"

    TestAttempt }o--|| User : "submitted by"
    TestAttempt }o--|| FreeUser : "submitted by"
    TestAttempt }o--|| TestTemplate : "for"

    TestTemplate {
        string id PK
        string title
        string slug UK
        enum type
        enum category
        enum difficulty
        int timeLimit
        int totalQuestions
        int totalMarks
        int passingMarks
        boolean negativeMarking
        json markingScheme
        json questionDistribution
        boolean isAdaptive
        json adaptiveSettings
        boolean isPremium
    }

    Question {
        string id PK
        enum type
        enum difficulty
        string question
        json options
        string correctAnswer
        string explanation
        json solutionSteps
        string topic
        string subtopic
        enum curriculum
        enum grade
        string subject
        int marks
        int timeLimit
        string source
        int examYear
        json tags
        float qualityScore
        boolean isActive
    }

    TestSession {
        string id PK
        string testTemplateId FK
        string userId FK
        string freeUserId FK
        enum status
        datetime startedAt
        datetime submittedAt
        int timeSpent
        int currentQuestionIndex
        int questionsAnswered
        float score
        float percentage
        int tabSwitchCount
        int fullscreenExits
        json browserInfo
    }

    TestAttempt {
        string id PK
        string freeUserId FK
        string testTemplateId FK
        float score
        float percentage
        int rank
        json topicWiseScore
        json strengthAreas
        json weaknessAreas
        int timeSpent
        datetime createdAt
    }

\`\`\`

### 4. Question Bank Domain

#### Core Entities

- **QuestionBank**: Organized collections (NEET Previous Year, CBSE Board, etc.)
- **QuestionBankQuestion**: Junction table linking questions to banks
- **UserQuestionResponse**: User answers and analytics

#### Entity Relationship Diagram

\`\`\`mermaid
erDiagram
QuestionBank ||--o{ QuestionBankQuestion : "contains"
Question ||--o{ QuestionBankQuestion : "included in"

    Question ||--o{ UserQuestionResponse : "answered"
    User ||--o{ UserQuestionResponse : "answers"
    TestSession ||--o{ UserQuestionResponse : "records"

    QuestionBank {
        string id PK
        string name
        string description
        enum category
        enum curriculum
        enum grade
        string subject
        json topics
        int totalQuestions
        int activeQuestions
        boolean isActive
        boolean isPublic
        string createdBy
    }

    QuestionBankQuestion {
        string id PK
        string questionBankId FK
        string questionId FK
        int orderIndex
        datetime addedAt
    }

    UserQuestionResponse {
        string id PK
        string userId FK
        string questionId FK
        string testSessionId FK
        string submittedAnswer
        boolean isCorrect
        int timeTaken
        int attemptNumber
        json analytics
        datetime answeredAt
    }

\`\`\`

### 5. Analytics & Progress Domain

#### Core Entities

- **UserProgress**: Topic-wise learning progress
- **TestAnalytics**: Test performance aggregations
- **PerformanceReport**: Weekly/monthly reports
- **AnalyticsEvent**: User interaction tracking

#### Entity Relationship Diagram

\`\`\`mermaid
erDiagram
User ||--o{ UserProgress : "tracks"
FreeUser ||--o{ UserProgress : "tracks"
User ||--o{ PerformanceReport : "generates"
User ||--o{ AnalyticsEvent : "triggers"

    TestSession ||--o{ TestAnalytics : "aggregates"

    UserProgress {
        string id PK
        string userId FK
        string freeUserId FK
        string topic
        enum curriculum
        enum grade
        int totalQuestions
        int correctAnswers
        float accuracy
        int averageTime
        float improvementRate
        enum currentLevel
        float masteryScore
        json recommendedNext
        json weakAreas
        datetime lastPracticed
    }

    TestAnalytics {
        string id PK
        string testSessionId FK
        float averageScore
        float medianScore
        int totalAttempts
        json topicWisePerformance
        json difficultyDistribution
        json timeDistribution
        int rank
        float percentile
        datetime calculatedAt
    }

    PerformanceReport {
        string id PK
        string userId FK
        enum reportType
        datetime startDate
        datetime endDate
        json summary
        json strengths
        json weaknesses
        json recommendations
        float overallScore
        datetime generatedAt
    }

    AnalyticsEvent {
        string id PK
        string userId FK
        enum eventType
        string eventName
        json eventData
        string sessionId
        string ipAddress
        string userAgent
        json deviceInfo
        datetime timestamp
    }

\`\`\`

### 6. Community & Engagement Domain

#### Core Entities

- **ForumPost**: Discussion threads
- **ForumReply**: Post replies
- **Achievement**: Badges and milestones
- **Bookmark**: Saved questions/materials
- **StudyPlan**: Personalized study schedules

#### Entity Relationship Diagram

\`\`\`mermaid
erDiagram
ForumPost ||--o{ ForumReply : "has"
User ||--o{ ForumPost : "creates"
User ||--o{ ForumReply : "writes"

    FreeUser ||--o{ Achievement : "earns"
    User ||--o{ Bookmark : "saves"
    User ||--o{ StudyPlan : "follows"

    ForumPost {
        string id PK
        string userId FK
        string title
        string content
        enum category
        json tags
        int viewCount
        int likeCount
        int replyCount
        boolean isPinned
        boolean isLocked
        datetime createdAt
    }

    ForumReply {
        string id PK
        string postId FK
        string userId FK
        string content
        int likeCount
        boolean isAccepted
        datetime createdAt
    }

    Achievement {
        string id PK
        string freeUserId FK
        enum type
        string title
        string description
        int points
        int currentProgress
        int targetProgress
        boolean isCompleted
        datetime earnedAt
    }

    Bookmark {
        string id PK
        string userId FK
        enum entityType
        string entityId
        json metadata
        datetime createdAt
    }

    StudyPlan {
        string id PK
        string userId FK
        string name
        datetime startDate
        datetime endDate
        json dailyTargets
        json weeklyGoals
        enum status
        int completionPercentage
    }

\`\`\`

### 7. Business Operations Domain

#### Core Entities

- **DemoBooking**: Demo class requests
- **Payment**: Razorpay transactions
- **CommunicationLog**: WhatsApp/Email/SMS logs
- **ContentNotification**: Push notifications

#### Entity Relationship Diagram

\`\`\`mermaid
erDiagram
User ||--o{ DemoBooking : "books"
Course ||--o{ DemoBooking : "for"
DemoBooking ||--o{ CommunicationLog : "generates"

    User ||--o{ Payment : "makes"
    Enrollment ||--o{ Payment : "requires"

    User ||--o{ ContentNotification : "receives"

    DemoBooking {
        string id PK
        string userId FK
        string courseId FK
        string studentName
        string email
        string phone
        enum studentClass
        string preferredDate
        string preferredTime
        enum status
        boolean demoCompleted
        int demoRating
        boolean convertedToEnrollment
        string source
        string utmSource
        datetime createdAt
    }

    Payment {
        string id PK
        string userId FK
        string enrollmentId FK
        int amount
        enum status
        string razorpayOrderId UK
        string razorpayPaymentId
        string razorpaySignature
        enum paymentMethod
        datetime paidAt
        json metadata
    }

    CommunicationLog {
        string id PK
        string userId FK
        string demoBookingId FK
        enum channel
        enum type
        string recipient
        string subject
        string content
        enum status
        json response
        datetime sentAt
    }

    ContentNotification {
        string id PK
        string userId FK
        enum type
        string title
        string message
        json data
        boolean isRead
        datetime readAt
        datetime createdAt
    }

\`\`\`

---

## Complete System ERD

### High-Level Architecture

\`\`\`mermaid
erDiagram
%% USER DOMAIN
User ||--o{ Enrollment : enrolls
User ||--o{ TestSession : takes
User ||--o{ Payment : makes
FreeUser ||--o{ TestAttempt : submits

    %% COURSE DOMAIN
    Course ||--o{ Enrollment : has
    Course ||--o{ Chapter : contains
    Chapter ||--o{ Topic : contains
    Course ||--o{ StudyMaterial : includes

    %% ASSESSMENT DOMAIN
    TestTemplate ||--o{ TestSession : generates
    TestTemplate ||--o{ TestQuestion : contains
    Question ||--o{ TestQuestion : included_in
    QuestionBank ||--o{ QuestionBankQuestion : organizes
    Question ||--o{ QuestionBankQuestion : belongs_to

    %% PROGRESS DOMAIN
    User ||--o{ UserProgress : tracks
    TestSession ||--o{ TestAnalytics : aggregates
    User ||--o{ PerformanceReport : receives

    %% COMMUNITY DOMAIN
    User ||--o{ ForumPost : creates
    ForumPost ||--o{ ForumReply : has
    FreeUser ||--o{ Achievement : earns

    %% BUSINESS DOMAIN
    User ||--o{ DemoBooking : books
    DemoBooking ||--o{ CommunicationLog : generates
    Enrollment ||--o{ Payment : requires

\`\`\`

---

## Service Layer Models

### API Response Types

#### Test Management Service

\`\`\`typescript
// GET /api/tests
interface GetTestsResponse {
success: boolean
data: {
tests: TestTemplateDTO[]
count: number
}
}

interface TestTemplateDTO {
id: string
title: string
description: string
type: 'PRACTICE_TEST' | 'MOCK_TEST' | 'FULL_TEST' | 'ADAPTIVE_TEST'
category: 'TOPIC_WISE' | 'CHAPTER_WISE' | 'FULL_SYLLABUS' | 'PREVIOUS_YEAR'
difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT'
timeLimit: number
totalQuestions: number
totalMarks: number
passingMarks: number
isAdaptive: boolean
tags: string[]
syllabus: string[]
attemptsCount: number
createdAt: string
}

// GET /api/tests/[id]
interface GetTestByIdResponse {
success: boolean
data: {
id: string
title: string
type: string
difficulty: string
timeLimit: number
totalQuestions: number
totalMarks: number
instructions: string[]
questions: TestQuestionDTO[]
}
}

interface TestQuestionDTO {
id: string
type: 'MCQ' | 'SHORT_ANSWER' | 'LONG_ANSWER'
difficulty: 'EASY' | 'MEDIUM' | 'HARD'
question: string
options?: string[]
topic: string
subtopic: string
marks: number
timeLimit: number
questionImage?: string
order: number
}

// POST /api/test-sessions
interface CreateTestSessionRequest {
testTemplateId: string
freeUserId?: string
}

interface CreateTestSessionResponse {
success: boolean
data: {
sessionId: string
testTemplate: TestTemplateDTO
status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
createdAt: string
}
}

// POST /api/test-attempts
interface SubmitTestAttemptRequest {
testSessionId: string
testTemplateId: string
freeUserId?: string
score: number
percentage: number
topicWiseScore: Record<string, TopicScore>
answers: QuestionAnswer[]
timeSpent: number
}

interface TopicScore {
attempted: number
correct: number
percentage: number
}

interface QuestionAnswer {
questionId: string
selectedAnswer: string
isCorrect: boolean
timeTaken: number
}

interface SubmitTestAttemptResponse {
success: boolean
data: {
attemptId: string
score: number
percentage: number
strengthAreas: string[]
weaknessAreas: string[]
rank: number | null
}
}
\`\`\`

#### Dashboard Service

\`\`\`typescript
// GET /api/test-attempts?freeUserId={id}
interface GetTestAttemptsResponse {
success: boolean
data: {
attempts: TestAttemptDTO[]
count: number
}
}

interface TestAttemptDTO {
id: string
testTemplate: {
title: string
type: string
category: string
difficulty: string
totalQuestions: number
totalMarks: number
}
score: number
percentage: number
rank: number | null
strengthAreas: string[]
weaknessAreas: string[]
timeSpent: number
createdAt: string
}

// Dashboard Computed Data
interface DashboardMetrics {
currentScore: number
targetScore: number
improvement: number
rank: number
percentile: number
strongAreas: string[]
weakAreas: WeakArea[]
recentSessions: StudySession[]
totalStudyTime: number
testsCompleted: number
averageScore: number
}

interface WeakArea {
chapter: string
topic: string
difficulty: 'low' | 'medium' | 'high'
improvement: number
recommendedStudyTime: number
}

interface StudySession {
id: string
subject: string
chapter: string
duration: number
score?: number
date: string
type: 'study' | 'practice' | 'test'
}
\`\`\`

---

## UI Data Models

### Component Data Flows

#### Test Taking Flow

\`\`\`mermaid
sequenceDiagram
participant UI as Test UI
participant API as Test API
participant DB as Database

    UI->>API: GET /api/tests (browse tests)
    API->>DB: Query TestTemplate
    DB-->>API: Return test list
    API-->>UI: TestTemplateDTO[]

    UI->>API: POST /api/test-sessions (start test)
    API->>DB: Create TestSession
    DB-->>API: Session created
    API-->>UI: sessionId

    UI->>API: GET /api/tests/[id] (load questions)
    API->>DB: Query test with questions
    DB-->>API: Test + Questions
    API-->>UI: TestQuestionDTO[]

    loop For each answer
        UI->>API: Save answer (local state)
    end

    UI->>API: POST /api/test-attempts (submit)
    API->>DB: Create TestAttempt
    API->>DB: Update TestSession
    API->>DB: Update FreeUser stats
    API->>DB: Create Achievement (if first test)
    DB-->>API: Attempt created
    API-->>UI: Results

\`\`\`

#### Dashboard Data Flow

\`\`\`mermaid
sequenceDiagram
participant UI as Dashboard UI
participant API as API Layer
participant DB as Database

    UI->>UI: Get freeUserId from localStorage

    par Parallel API Calls
        UI->>API: GET /api/test-attempts?freeUserId=X
        and
        UI->>API: GET /api/test-sessions?freeUserId=X
    end

    API->>DB: Query TestAttempt
    API->>DB: Query TestSession
    DB-->>API: Attempts data
    DB-->>API: Sessions data
    API-->>UI: TestAttemptDTO[]
    API-->>UI: TestSessionDTO[]

    UI->>UI: Calculate metrics
    Note over UI: - Average score<br/>- Improvement<br/>- Strong/weak areas<br/>- Study time

    UI->>UI: Render dashboard

\`\`\`

### React Component Data Structure

#### Test Page State

\`\`\`typescript
interface TestPageState {
// Test Configuration
testTemplate: TestTemplateDTO | null
questions: TestQuestionDTO[]

// Session State
sessionId: string | null
currentQuestionIndex: number
answers: Map<string, QuestionAnswer>
markedForReview: Set<string>

// Timer State
timeRemaining: number
testStartTime: number

// UI State
isLoading: boolean
isSubmitting: boolean
showSubmitConfirmation: boolean

// Proctoring State
tabSwitchCount: number
fullscreenExits: number
suspiciousActivity: string[]
}
\`\`\`

#### Dashboard State

\`\`\`typescript
interface DashboardState {
// User Identity
freeUserId: string | null
user: User | null
isAuthenticated: boolean

// Data
testAttempts: TestAttemptDTO[]
testSessions: TestSessionDTO[]

// Computed Metrics
metrics: DashboardMetrics

// UI State
isLoading: boolean
activeTab: 'overview' | 'progress' | 'study' | 'weak-areas'

// Study Timer
studyTimer: number
isStudying: boolean
currentSession: string
}
\`\`\`

---

## Data Flow Architecture

### System Architecture Diagram

\`\`\`mermaid
graph TB
subgraph "Frontend Layer"
UI[React Components]
Store[Client State]
LocalStorage[LocalStorage<br/>freeUserId, preferences]
end

    subgraph "API Layer"
        TestAPI[Test APIs<br/>/api/tests, /api/test-sessions]
        AttemptAPI[Attempt APIs<br/>/api/test-attempts]
        ProgressAPI[Progress APIs<br/>/api/user-progress]
        AuthAPI[Auth APIs<br/>NextAuth]
    end

    subgraph "Service Layer"
        TestService[Test Service]
        ProgressService[Progress Service]
        AnalyticsService[Analytics Service]
        AchievementService[Achievement Service]
    end

    subgraph "Data Layer"
        Prisma[Prisma ORM]
        PostgreSQL[(PostgreSQL)]
    end

    subgraph "External Services"
        Razorpay[Razorpay<br/>Payments]
        WhatsApp[WhatsApp<br/>Business API]
        Storage[Cloud Storage<br/>Study Materials]
    end

    UI <-->|HTTP/JSON| TestAPI
    UI <-->|HTTP/JSON| AttemptAPI
    UI <-->|HTTP/JSON| ProgressAPI
    UI <-->|Session| AuthAPI

    UI <--> Store
    Store <--> LocalStorage

    TestAPI --> TestService
    AttemptAPI --> TestService
    AttemptAPI --> AchievementService
    ProgressAPI --> ProgressService
    ProgressAPI --> AnalyticsService

    TestService --> Prisma
    ProgressService --> Prisma
    AnalyticsService --> Prisma
    AchievementService --> Prisma

    Prisma <--> PostgreSQL

    TestAPI -.->|Payments| Razorpay
    TestAPI -.->|Notifications| WhatsApp
    TestAPI -.->|Materials| Storage

\`\`\`

---

## Key Relationships

### User & Test Ecosystem

1. **Dual User System**:
   - `User`: Authenticated users (requires signup)
   - `FreeUser`: Guest users (localStorage-based, no signup)
   - Both can take tests and track progress

2. **Test Lifecycle**:
   - `TestTemplate` → `TestSession` → `TestAttempt`
   - One template generates many sessions
   - Each session produces one attempt

3. **Question Organization**:
   - `Question` ← linked to → `TestTemplate` via `TestQuestion`
   - `Question` ← organized by → `QuestionBank` via `QuestionBankQuestion`
   - Many-to-many relationships for flexibility

4. **Progress Tracking**:
   - `TestAttempt` → calculates → `topicWiseScore`
   - `TestAttempt` → identifies → `strengthAreas` & `weaknessAreas`
   - `TestAttempt` → triggers → `Achievement` (if milestones met)
   - `UserProgress` → aggregates → topic mastery over time

5. **Business Flow**:
   - `DemoBooking` → converts to → `Enrollment`
   - `Enrollment` → requires → `Payment` (Razorpay)
   - `Enrollment` → grants access → `Course` → `StudyMaterial`

---

## Indexes & Performance

### Critical Indexes

\`\`\`prisma
// User lookups
@@index([email])
@@index([phone])

// Test queries
@@index([testTemplateId, status])
@@index([freeUserId, createdAt])
@@index([userId, testTemplateId])

// Analytics queries
@@index([topic, curriculum, grade])
@@index([testSessionId, calculatedAt])

// Business queries
@@index([status, createdAt])
@@index([razorpayOrderId])
\`\`\`

---

## Next Steps

1. ✅ **Database Schema Documented**
2. ⏳ **Service Layer APIs** - Continue documenting remaining endpoints
3. ⏳ **Frontend Data Flow** - Document Redux/Context state management
4. ⏳ **Performance Optimization** - Add caching layer documentation
5. ⏳ **Data Migration Strategy** - Document seed scripts and migrations

---

**Maintained by:** Cerebrum Engineering Team
**Questions?** Review the [Development Workflow](./DEVELOPMENT_WORKFLOW.md)
