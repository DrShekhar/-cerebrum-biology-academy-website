/**
 * Authentic NCERT-aligned Biology Question Bank
 * Split into modular files for better code-splitting and maintainability
 */

// Types
export type { AuthenticQuestion } from './types'
export { qualityStandards } from './types'

// Question arrays by class
export { class9Questions } from './class-9'
export { class10Questions } from './class-10'
export { class11Questions } from './class-11'
export { class12Questions } from './class-12'
export { dropperQuestions } from './dropper'

// Compiled question bank and helpers
export {
  authenticQuestionBank,
  getQuestionsByTopic,
  getQuestionsByDifficulty,
  getQuestionsByChapter,
  getHighWeightageQuestions,
  getQuestionsByBloomsLevel,
  getQuestionBankStats,
} from './helpers'
