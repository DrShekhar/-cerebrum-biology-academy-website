/**
 * Authentic NCERT-aligned Biology Question Bank - Types
 * High-quality MCQs with proper NEET format and scientific accuracy
 */

export interface AuthenticQuestion {
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

// Quality Standards for Question Bank
export const qualityStandards = {
  minimumQuestionsPerTopic: 5,
  difficultyDistribution: {
    easy: 0.3, // 30% easy questions
    medium: 0.5, // 50% medium questions
    hard: 0.2, // 20% hard questions
  },
  bloomsDistribution: {
    remember: 0.25, // 25% factual recall
    understand: 0.35, // 35% conceptual understanding
    apply: 0.25, // 25% application
    analyze: 0.1, // 10% analysis
    evaluate: 0.05, // 5% evaluation
  },
  averageTimePerQuestion: 45, // seconds
  ncertAlignment: 1.0, // 100% questions must have NCERT reference
}
