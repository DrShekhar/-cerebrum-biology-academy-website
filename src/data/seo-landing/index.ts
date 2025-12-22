// SEO Landing Pages - Data Index
// Export all content and types from a single entry point

export * from './types'

// Import all page content
import { class9SEOPages } from './class-9-content'
import { class10SEOPages } from './class-10-content'
import { class11SEOPages } from './class-11-content'
import { class12SEOPages } from './class-12-content'
import { dropperSEOPages } from './dropper-content'
import { universalSEOPages } from './universal-content'
import { ncertSEOPages } from './ncert-content'
import { topicsSEOPages } from './topics-content'
import { internationalSEOPages } from './international-content'
import { neetGuideSEOPages } from './neet-guide-content'
import { resourcesSEOPages } from './resources-content'
import { chapterNotesSEOPages } from './chapter-notes-content'
import { crashCourseSEOPages } from './crash-course-content'
import { comparisonSEOPages } from './comparison-content'

// Re-export individual content modules
export { class9SEOPages } from './class-9-content'
export { class10SEOPages } from './class-10-content'
export { class11SEOPages } from './class-11-content'
export { class12SEOPages } from './class-12-content'
export { dropperSEOPages } from './dropper-content'
export { universalSEOPages } from './universal-content'
export { ncertSEOPages } from './ncert-content'
export { topicsSEOPages } from './topics-content'
export { internationalSEOPages } from './international-content'
export { neetGuideSEOPages } from './neet-guide-content'
export { resourcesSEOPages } from './resources-content'
export { chapterNotesSEOPages } from './chapter-notes-content'
export { crashCourseSEOPages } from './crash-course-content'
export { comparisonSEOPages } from './comparison-content'

// Slug helpers for each category
export function getNcertSlugs(): string[] {
  return Object.keys(ncertSEOPages)
}

export function getTopicsSlugs(): string[] {
  return Object.keys(topicsSEOPages)
}

export function getInternationalSlugs(): string[] {
  return Object.keys(internationalSEOPages)
}

export function getNeetGuideSlugs(): string[] {
  return Object.keys(neetGuideSEOPages)
}

export function getResourcesSlugs(): string[] {
  return Object.keys(resourcesSEOPages)
}

export function getChapterNotesSlugs(): string[] {
  return Object.keys(chapterNotesSEOPages)
}

export function getCrashCourseSlugs(): string[] {
  return Object.keys(crashCourseSEOPages)
}

export function getComparisonSlugs(): string[] {
  return Object.keys(comparisonSEOPages)
}

// Combined export of all SEO pages
export const allSEOPages = {
  ...class9SEOPages,
  ...class10SEOPages,
  ...class11SEOPages,
  ...class12SEOPages,
  ...dropperSEOPages,
  ...universalSEOPages,
  ...ncertSEOPages,
  ...topicsSEOPages,
  ...internationalSEOPages,
  ...neetGuideSEOPages,
  ...resourcesSEOPages,
  ...chapterNotesSEOPages,
  ...crashCourseSEOPages,
  ...comparisonSEOPages,
}

// Helper to get content by slug
export function getSEOPageContent(slug: string) {
  return allSEOPages[slug] || null
}

// Get all slugs for sitemap generation
export function getAllSEOSlugs(): string[] {
  return Object.values(allSEOPages).map((page) => page.slug)
}

// Get pages by class level
export function getSEOPagesByClassLevel(classLevel: string) {
  return Object.values(allSEOPages).filter((page) => page.classLevel === classLevel)
}

// Get count of all SEO pages
export function getSEOPageCount(): number {
  return Object.keys(allSEOPages).length
}
