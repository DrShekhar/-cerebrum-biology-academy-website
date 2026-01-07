import { CampbellBiologyChapter } from '../types'
import { unit1Chapters } from './unit1-chemistry-of-life'
import { unit2Chapters } from './unit2-the-cell'
import { unit3Chapters } from './unit3-genetics'
import { unit4Chapters } from './unit4-evolution'
import { unit5Chapters } from './unit5-diversity-of-life'
import { unit6Chapters } from './unit6-plant-form-function'
import { unit7Chapters } from './unit7-animal-form-function'
import { unit8Chapters } from './unit8-ecology'

// Export all chapters as a single array (56 chapters total)
export const allChapters: CampbellBiologyChapter[] = [
  ...unit1Chapters,
  ...unit2Chapters,
  ...unit3Chapters,
  ...unit4Chapters,
  ...unit5Chapters,
  ...unit6Chapters,
  ...unit7Chapters,
  ...unit8Chapters,
]

// Export individual unit arrays for granular access
export {
  unit1Chapters,
  unit2Chapters,
  unit3Chapters,
  unit4Chapters,
  unit5Chapters,
  unit6Chapters,
  unit7Chapters,
  unit8Chapters,
}

// Chapters grouped by unit ID
export const chaptersByUnit: Record<string, CampbellBiologyChapter[]> = {
  'unit-1': unit1Chapters,
  'unit-2': unit2Chapters,
  'unit-3': unit3Chapters,
  'unit-4': unit4Chapters,
  'unit-5': unit5Chapters,
  'unit-6': unit6Chapters,
  'unit-7': unit7Chapters,
  'unit-8': unit8Chapters,
}

// Helper: Get chapter by slug
export function getChapterBySlug(slug: string): CampbellBiologyChapter | undefined {
  return allChapters.find((chapter) => chapter.slug === slug)
}

// Helper: Get chapter by number
export function getChapterByNumber(chapterNumber: number): CampbellBiologyChapter | undefined {
  return allChapters.find((chapter) => chapter.chapterNumber === chapterNumber)
}

// Helper: Get chapters for a specific unit
export function getChaptersByUnitId(unitId: string): CampbellBiologyChapter[] {
  return chaptersByUnit[unitId] || []
}

// Helper: Get high olympiad relevance chapters (4+ overall)
export function getHighOlympiadChapters(): CampbellBiologyChapter[] {
  return allChapters.filter((chapter) => chapter.olympiadRelevance.overall >= 4)
}

// Helper: Get chapters by difficulty
export function getChaptersByDifficulty(
  difficulty: 'foundational' | 'intermediate' | 'advanced'
): CampbellBiologyChapter[] {
  return allChapters.filter((chapter) => chapter.difficulty === difficulty)
}

// Helper: Get NEET-relevant chapters
export function getNEETChapters(): CampbellBiologyChapter[] {
  return allChapters.filter((chapter) => chapter.examRelevance.neet)
}

// Helper: Get adjacent chapters for navigation
export function getAdjacentChapters(chapterNumber: number): {
  previous: CampbellBiologyChapter | null
  next: CampbellBiologyChapter | null
} {
  const currentIndex = allChapters.findIndex((ch) => ch.chapterNumber === chapterNumber)

  return {
    previous: currentIndex > 0 ? allChapters[currentIndex - 1] : null,
    next: currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null,
  }
}

// Helper: Search chapters by keyword
export function searchChapters(query: string): CampbellBiologyChapter[] {
  const lowerQuery = query.toLowerCase()
  return allChapters.filter(
    (chapter) =>
      chapter.title.toLowerCase().includes(lowerQuery) ||
      chapter.subtitle.toLowerCase().includes(lowerQuery) ||
      chapter.keyTopics.some((topic) => topic.toLowerCase().includes(lowerQuery)) ||
      chapter.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery))
  )
}
