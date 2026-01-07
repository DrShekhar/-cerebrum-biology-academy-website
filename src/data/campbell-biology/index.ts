/**
 * Campbell Biology Data - Main Export
 *
 * 56 chapters across 8 units from Campbell Biology textbook
 * Used for SEO pages targeting Biology Olympiads, NEET, MCAT, AP/IB Biology
 */

// Types
export * from './types'

// All chapters (56 total)
export {
  allChapters,
  unit1Chapters,
  unit2Chapters,
  unit3Chapters,
  unit4Chapters,
  unit5Chapters,
  unit6Chapters,
  unit7Chapters,
  unit8Chapters,
  chaptersByUnit,
  getChapterBySlug,
  getChapterByNumber,
  getChaptersByUnitId,
  getHighOlympiadChapters,
  getChaptersByDifficulty,
  getNEETChapters,
  getAdjacentChapters,
  searchChapters,
} from './chapters'

// All units (8 total)
export {
  campbellUnits,
  getUnitBySlug,
  getUnitById,
  getUnitByNumber,
  getAdjacentUnits,
  getTotalEstimatedHours,
  getHighOlympiadUnits,
} from './units'

// Quick stats
export const CAMPBELL_STATS = {
  totalChapters: 56,
  totalUnits: 8,
  totalEstimatedHours: 381, // Sum of all chapter estimated hours
  olympiadHighRelevanceChapters: 48, // Chapters with 4+ olympiad rating
  neetRelevantChapters: 56, // All chapters are NEET-relevant
}

// WhatsApp phone number for CTAs
export const WHATSAPP_PHONE = '+918826444334'

// Default WhatsApp message for Campbell Biology
export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi! I'm studying Campbell Biology and preparing for Biology Olympiad/NEET. Can you tell me about your online tutoring programs?"
