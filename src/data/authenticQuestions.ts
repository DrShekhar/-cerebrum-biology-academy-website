/**
 * Re-export from modular questions structure for backward compatibility
 * All imports from '@/data/authenticQuestions' will continue to work
 */

// Type re-export
export type { AuthenticQuestion } from './questions'

// Value re-exports
export {
  qualityStandards,
  class9Questions,
  class10Questions,
  class11Questions,
  class12Questions,
  dropperQuestions,
  authenticQuestionBank,
  getQuestionsByTopic,
  getQuestionsByDifficulty,
  getQuestionsByChapter,
  getHighWeightageQuestions,
  getQuestionsByBloomsLevel,
  getQuestionBankStats,
} from './questions'
