import { AuthenticQuestion } from './types'
import { class9Questions } from './class-9'
import { class10Questions } from './class-10'
import { class11Questions } from './class-11'
import { class12Questions } from './class-12'
import { dropperQuestions } from './dropper'

// ============================================================================
// COMPILED QUESTION BANKS BY CLASS
// ============================================================================

export const authenticQuestionBank = {
  'class-9': class9Questions,
  'class-10': class10Questions,
  'class-11': class11Questions,
  'class-12': class12Questions,
  dropper: dropperQuestions,
}

// ============================================================================
// TOPIC-WISE QUESTION RETRIEVAL FUNCTIONS
// ============================================================================

export const getQuestionsByTopic = (topicIds: string[], classId: string): AuthenticQuestion[] => {
  const classQuestions = authenticQuestionBank[classId as keyof typeof authenticQuestionBank] || []
  return classQuestions.filter((q) => topicIds.includes(q.topicId))
}

export const getQuestionsByDifficulty = (
  difficulty: 'Easy' | 'Medium' | 'Hard',
  classId: string
): AuthenticQuestion[] => {
  const classQuestions = authenticQuestionBank[classId as keyof typeof authenticQuestionBank] || []
  return classQuestions.filter((q) => q.difficulty === difficulty)
}

export const getQuestionsByChapter = (
  chapterIds: string[],
  classId: string
): AuthenticQuestion[] => {
  const classQuestions = authenticQuestionBank[classId as keyof typeof authenticQuestionBank] || []
  return classQuestions.filter((q) => chapterIds.includes(q.chapterId))
}

export const getHighWeightageQuestions = (
  classId: string,
  weightageThreshold: number = 4.0
): AuthenticQuestion[] => {
  const classQuestions = authenticQuestionBank[classId as keyof typeof authenticQuestionBank] || []
  return classQuestions.filter((q) => q.weightage >= weightageThreshold)
}

export const getQuestionsByBloomsLevel = (
  bloomsLevel: string,
  classId: string
): AuthenticQuestion[] => {
  const classQuestions = authenticQuestionBank[classId as keyof typeof authenticQuestionBank] || []
  return classQuestions.filter((q) => q.bloomsLevel === bloomsLevel)
}

// ============================================================================
// QUESTION STATISTICS
// ============================================================================

export const getQuestionBankStats = () => {
  const allQuestions = [
    ...class9Questions,
    ...class10Questions,
    ...class11Questions,
    ...class12Questions,
    ...dropperQuestions,
  ]

  return {
    totalQuestions: allQuestions.length,
    class9: class9Questions.length,
    class10: class10Questions.length,
    class11: class11Questions.length,
    class12: class12Questions.length,
    dropper: dropperQuestions.length,
    difficultyDistribution: {
      easy: allQuestions.filter((q) => q.difficulty === 'Easy').length,
      medium: allQuestions.filter((q) => q.difficulty === 'Medium').length,
      hard: allQuestions.filter((q) => q.difficulty === 'Hard').length,
    },
    bloomsDistribution: {
      remember: allQuestions.filter((q) => q.bloomsLevel === 'Remember').length,
      understand: allQuestions.filter((q) => q.bloomsLevel === 'Understand').length,
      apply: allQuestions.filter((q) => q.bloomsLevel === 'Apply').length,
      analyze: allQuestions.filter((q) => q.bloomsLevel === 'Analyze').length,
      evaluate: allQuestions.filter((q) => q.bloomsLevel === 'Evaluate').length,
    },
  }
}
