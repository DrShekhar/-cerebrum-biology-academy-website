export interface Question {
  id: string
  questionText: string
  questionImage?: string
  options: {
    id: string
    text: string
    image?: string
  }[]
  correctAnswer: string
  explanation: string
  explanationImage?: string
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  subtopic: string
  subject: 'biology' | 'botany' | 'zoology'
  examYear?: string
  source?: string
  marks: number
  timeAllocated: number // in seconds
  keywords: string[]
  relatedConcepts: string[]
}

export interface MockTest {
  id: string
  title: string
  description: string
  slug: string
  category: 'full-test' | 'topic-test' | 'previous-year' | 'custom'
  subject: 'biology' | 'botany' | 'zoology' | 'mixed'
  duration: number // in minutes
  totalQuestions: number
  totalMarks: number
  questions: Question[]
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
  topics: string[]
  instructions: string[]
  isActive: boolean
  isPremium: boolean
  attemptCount: number
  averageScore: number
  // Class-based targeting
  targetClass: 'class-11' | 'class-12' | 'dropper' | 'all'
  classRequirements: {
    minimumClass: 'class-11' | 'class-12' | 'dropper'
    recommendedFor: ('class-11' | 'class-12' | 'dropper')[]
    difficultyByClass: {
      'class-11': 'easy' | 'medium' | 'hard'
      'class-12': 'easy' | 'medium' | 'hard'
      'dropper': 'easy' | 'medium' | 'hard'
    }
  }
  // Adaptive features
  adaptiveSettings: {
    enableAdaptive: boolean
    questionPoolByClass: {
      'class-11': string[] // question IDs
      'class-12': string[] // question IDs  
      'dropper': string[] // question IDs
    }
    progressionRules: {
      easyToMediumThreshold: number // percentage correct
      mediumToHardThreshold: number
    }
  }
  createdAt: string
  updatedAt: string
  seoMetadata: {
    title: string
    description: string
    keywords: string[]
    canonicalUrl?: string
  }
}

export interface UserProfile {
  id: string
  email: string
  name: string
  currentClass: 'class-11' | 'class-12' | 'dropper'
  schoolName?: string
  location?: string
  targetExam: 'neet-2024' | 'neet-2025' | 'neet-2026'
  weakSubjects: string[]
  strongSubjects: string[]
  studyGoals: string[]
  preferredDifficulty: 'easy' | 'medium' | 'hard' | 'adaptive'
  studySchedule: {
    dailyHours: number
    preferredTime: 'morning' | 'afternoon' | 'evening'
    testFrequency: 'daily' | 'alternate' | 'weekly'
  }
  createdAt: string
  lastActive: string
}

export interface TestAttempt {
  id: string
  testId: string
  userId: string
  userEmail: string
  userName: string
  userClass: 'class-11' | 'class-12' | 'dropper'
  startTime: string
  endTime?: string
  duration: number // actual time taken in seconds
  status: 'in-progress' | 'completed' | 'abandoned'
  responses: TestResponse[]
  score: {
    correct: number
    incorrect: number
    unattempted: number
    totalMarks: number
    percentage: number
    rank?: number
    percentile?: number
  }
  analytics: {
    subjectWise: {
      subject: string
      correct: number
      total: number
      percentage: number
    }[]
    topicWise: {
      topic: string
      correct: number
      total: number
      percentage: number
    }[]
    difficultyWise: {
      difficulty: string
      correct: number
      total: number
      percentage: number
    }[]
    timeAnalysis: {
      averageTimePerQuestion: number
      questionsRushed: number // answered in < 30 seconds
      questionsOvertime: number // answered in > 3 minutes
    }
  }
  suggestions: string[]
  weakAreas: string[]
  strongAreas: string[]
}

export interface TestResponse {
  questionId: string
  selectedAnswer?: string
  isCorrect: boolean
  timeTaken: number // in seconds
  isMarkedForReview: boolean
  confidence: 'high' | 'medium' | 'low'
}

export interface TestLeaderboard {
  testId: string
  entries: {
    rank: number
    userName: string
    score: number
    percentage: number
    timeTaken: number
    location?: string
  }[]
  totalAttempts: number
  averageScore: number
  topScore: number
}

export interface UserTestHistory {
  userId: string
  totalTests: number
  totalScore: number
  averageScore: number
  bestScore: number
  recentTests: {
    testId: string
    testTitle: string
    score: number
    percentage: number
    date: string
    rank?: number
  }[]
  subjectStrengths: {
    subject: string
    averageScore: number
    testsAttempted: number
  }[]
  progressTrend: {
    date: string
    averageScore: number
  }[]
  achievements: {
    id: string
    title: string
    description: string
    earnedDate: string
    icon: string
  }[]
}

export interface TestAnalytics {
  testId: string
  totalAttempts: number
  averageScore: number
  averageTime: number
  completionRate: number
  questionAnalytics: {
    questionId: string
    correctRate: number
    averageTime: number
    skipRate: number
    mostSelectedWrongAnswer?: string
  }[]
  topicDifficulty: {
    topic: string
    averageScore: number
    difficultyRating: number
  }[]
  performanceByTime: {
    timeSlot: string // "morning", "afternoon", "evening"
    averageScore: number
    attempts: number
  }[]
}

export interface TestSeries {
  id: string
  title: string
  description: string
  slug: string
  tests: string[] // test IDs
  totalTests: number
  duration: string // "4 weeks", "2 months"
  price: number
  isPremium: boolean
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  targetAudience: string[]
  features: string[]
  schedule: {
    frequency: string // "weekly", "bi-weekly"
    duration: number // per test in minutes
    startDate: string
    endDate: string
  }
  enrollmentCount: number
  rating: number
  testimonials: string[]
  seoMetadata: {
    title: string
    description: string
    keywords: string[]
  }
}

export interface QuestionBank {
  totalQuestions: number
  subjects: {
    name: string
    questionCount: number
    topics: {
      name: string
      questionCount: number
      subtopics: {
        name: string
        questionCount: number
      }[]
    }[]
  }[]
  difficulties: {
    easy: number
    medium: number
    hard: number
  }
  sources: {
    previousYear: number
    custom: number
    ncert: number
  }[]
}

export interface TestRecommendation {
  userId: string
  recommendedTests: {
    testId: string
    reason: string
    priority: 'high' | 'medium' | 'low'
    estimatedScore: number
  }[]
  weakAreasToFocus: string[]
  nextTopicSuggestion: string
  studyPlan: {
    day: number
    topic: string
    testId?: string
    studyMaterial?: string
  }[]
}

// Utility types for API responses
export interface MockTestListResponse {
  tests: MockTest[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  filters: {
    subjects: string[]
    difficulties: string[]
    topics: string[]
  }
}

export interface TestStartResponse {
  test: MockTest
  attemptId: string
  timeRemaining: number
  canResume: boolean
  previousAttempts: number
}

export interface TestSubmissionResponse {
  attempt: TestAttempt
  leaderboard: TestLeaderboard
  recommendations: TestRecommendation
  shareableLink: string
}