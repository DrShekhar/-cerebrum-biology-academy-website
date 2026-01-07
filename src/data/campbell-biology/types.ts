/**
 * Campbell Biology Data Types
 * 56 chapters, 8 units for SEO optimization
 */

export type DifficultyLevel = 'foundational' | 'intermediate' | 'advanced'

export interface OlympiadRelevance {
  usabo: number // 0-5 relevance score for USA Biology Olympiad
  bbo: number // 0-5 relevance score for British Biology Olympiad
  inbo: number // 0-5 relevance score for India National Biology Olympiad
  ibo: number // 0-5 relevance score for International Biology Olympiad
  overall: number // 0-5 overall olympiad relevance
}

export interface ExamRelevance {
  neet: boolean // NEET (India) relevance
  mcat: boolean // MCAT (USA/Canada) relevance
  apBiology: boolean // AP Biology relevance
  ibBiology: boolean // IB Biology (HL/SL) relevance
  aLevel: boolean // A-Level Biology relevance
}

export interface FAQ {
  question: string
  answer: string
}

export interface CampbellBiologyChapter {
  id: string
  chapterNumber: number // 1-56
  unitId: string
  slug: string // URL-friendly slug
  title: string
  subtitle: string
  keyTopics: string[]
  conceptsCount: number
  estimatedHours: number
  difficulty: DifficultyLevel
  olympiadRelevance: OlympiadRelevance
  examRelevance: ExamRelevance

  // SEO fields
  metaTitle: string
  metaDescription: string
  keywords: string[]

  // Content for page
  heroDescription: string
  learningObjectives: string[]

  // FAQ for schema markup
  faqs: FAQ[]

  // WhatsApp CTA
  whatsappMessage: string
}

export interface CampbellBiologyUnit {
  id: string
  unitNumber: number // 1-8
  slug: string
  title: string
  subtitle: string
  description: string
  chapterRange: { start: number; end: number } // Chapter number range
  chapterCount: number
  estimatedHours: number
  keyThemes: string[]
  olympiadRelevance: number // 0-5 overall relevance

  // SEO fields
  metaTitle: string
  metaDescription: string
  keywords: string[]

  // WhatsApp CTA
  whatsappMessage: string
}

// Helper functions
export function getChapterById(
  chapters: CampbellBiologyChapter[],
  id: string
): CampbellBiologyChapter | undefined {
  return chapters.find((ch) => ch.id === id)
}

export function getChapterBySlug(
  chapters: CampbellBiologyChapter[],
  slug: string
): CampbellBiologyChapter | undefined {
  return chapters.find((ch) => ch.slug === slug)
}

export function getChaptersByUnit(
  chapters: CampbellBiologyChapter[],
  unitId: string
): CampbellBiologyChapter[] {
  return chapters.filter((ch) => ch.unitId === unitId)
}

export function getUnitBySlug(
  units: CampbellBiologyUnit[],
  slug: string
): CampbellBiologyUnit | undefined {
  return units.find((u) => u.slug === slug)
}

export function getAllChapterSlugs(chapters: CampbellBiologyChapter[]): string[] {
  return chapters.map((ch) => ch.slug)
}

export function getAllUnitSlugs(units: CampbellBiologyUnit[]): string[] {
  return units.map((u) => u.slug)
}

export function getHighOlympiadChapters(
  chapters: CampbellBiologyChapter[],
  minScore: number = 4
): CampbellBiologyChapter[] {
  return chapters.filter((ch) => ch.olympiadRelevance.overall >= minScore)
}

export function getNEETRelevantChapters(
  chapters: CampbellBiologyChapter[]
): CampbellBiologyChapter[] {
  return chapters.filter((ch) => ch.examRelevance.neet)
}
