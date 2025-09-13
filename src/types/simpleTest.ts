// Simplified types for functional mock tests
export interface SimpleQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number // index of correct option (0, 1, 2, 3)
  explanation: string
  subject: string
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
  marks: number
}

export interface SimpleTest {
  id: string
  title: string
  description: string
  duration: number // minutes
  totalQuestions: number
  questions: SimpleQuestion[]
  subject: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: 'full-test' | 'topic-test' | 'previous-year'
  isPublished: boolean
}

export interface TestResponse {
  questionId: string
  selectedAnswer: number | null
  isMarkedForReview: boolean
  timeTaken: number // seconds
}

export interface TestResult {
  testId: string
  userId: string
  responses: TestResponse[]
  totalScore: number
  percentage: number
  timeTaken: number
  completedAt: string
}