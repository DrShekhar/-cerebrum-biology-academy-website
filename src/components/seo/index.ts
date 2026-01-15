/**
 * SEO Components Index
 * Centralized exports for all SEO, AEO, and GEO optimization components
 *
 * Usage:
 * import { CitationBadge, DefinedTermSchema, BreadcrumbSchema } from '@/components/seo'
 */

// Citation components for GEO (statistics with sources)
export {
  CitationBadge,
  CitedStatistic,
  VerifiedStatsGrid,
  CITATION_SOURCES,
  type CitationSource,
} from './CitationBadge'

// Defined term components for AEO (glossary/voice search)
export { DefinedTermSchema, DefinedTermListSchema, DefinedTermDisplay } from './DefinedTermSchema'

// Content freshness for E-E-A-T signals
export { ContentFreshness, ArticleSchema, LearningResourceSchema } from './ContentFreshness'

// Breadcrumb components for navigation & SEO
export {
  BreadcrumbSchema,
  PageWithBreadcrumbSchema,
  generateBreadcrumbs,
  COMMON_BREADCRUMBS,
  type BreadcrumbItem,
} from './BreadcrumbSchema'

// Video schema for rich video snippets
export { VideoSchema, VideoListSchema, VideoDisplay } from './VideoSchema'

// Event schema for webinars, demos, live classes
export { EventSchema, EventListSchema, WebinarSchema } from './EventSchema'
