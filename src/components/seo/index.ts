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

// Structured data schemas (Organization, Course, LocalBusiness, HowTo, Person, Video, Review)
export {
  OrganizationSchema,
  WebsiteSchema,
  CourseSchema,
  FAQSchema,
  LocalBusinessSchema,
  NationalServiceSchema,
  GurugramServiceSchema,
  HowToSchema,
  PersonSchema,
  DrShekharSinghSchema,
  VideoSchema as VideoObjectSchema,
  ReviewSchema,
  ReviewListSchema,
  StructuredData,
  type HowToStep,
  type HowToSchemaProps,
  type PersonSchemaProps,
  type VideoSchemaProps,
  type ReviewSchemaProps,
  type ReviewListSchemaProps,
} from './StructuredData'

// Intent landing page component with built-in SEO
export { IntentLandingPage, type IntentPageData, type HowToStepData } from './IntentLandingPage'

// Enhanced article schemas for blog posts (TechArticle, NewsArticle)
export { TechArticleSchema, BlogListSchema, type ArticleType } from './TechArticleSchema'

// Aggregate offer schemas for course pricing tiers
export {
  CourseOfferSchema,
  CourseComparisonSchema,
  FeatureComparisonSchema,
} from './AggregateOfferSchema'

// Schedule schemas for batch timings and demo classes
export {
  ScheduleSchema,
  DemoClassScheduleSchema,
  OpeningHoursSchema,
  STANDARD_BATCHES,
} from './ScheduleSchema'

// People Also Ask component for AEO (Answer Engine Optimization)
export {
  PeopleAlsoAsk,
  NEET_BIOLOGY_PAA_QUESTIONS,
  NEET_COACHING_PAA_QUESTIONS,
  generateLocationPAAQuestions,
  type PAQuestion,
} from './PeopleAlsoAsk'

// QAPage schemas for blog posts and articles with Q&A content
export {
  QAPageSchema,
  HowToSchema as HowToStepSchema,
  ItemListSchema,
  ComprehensiveAEOSchema,
  DefinitionBox,
} from './QAPageSchema'

// Speakable schema for voice search optimization
export {
  SpeakableSchema,
  VoiceSearchContent,
  CourseSchemaWithSpeakable,
  LocalBusinessSpeakable,
  VoiceSearchFAQSchema,
  generateSpeakableText,
} from './SpeakableSchema'

// Top 10 List component with ItemList schema for ranking pages
export { Top10List, TOP_10_NEET_COACHING_GURUGRAM, type RankedItem } from './Top10ListSchema'

// Hinglish keywords for long-tail SEO targeting
export {
  HINGLISH_KEYWORDS,
  HINGLISH_FAQS,
  HinglishKeywordsSchema,
  HinglishFAQSection,
} from './HinglishKeywords'

// Google My Business multi-location schema
export {
  GoogleMyBusinessSchema,
  SingleLocationSchema,
  LocationCardsSection,
  CEREBRUM_LOCATIONS,
  generateLocationSchema,
  type LocationData,
} from './GoogleMyBusinessSchema'

// State-specific schemas for regional SEO
export {
  StateSchema,
  INDIAN_STATES,
  generateStateFAQs,
  getAllStates,
  type StateData,
} from './StateSchema'

// State landing page component
export { StateLandingPage } from './StateLandingPage'

// Comparison schemas and components for competitive SEO
export {
  ComparisonSchema,
  COMPETITORS,
  CEREBRUM_DATA,
  getComparisonData,
  getAllCompetitors,
  type CompetitorData,
} from './ComparisonSchema'
export { ComparisonLandingPage } from './ComparisonLandingPage'

// Service schema for GMB keyword services per center
export { ServiceSchema, AllServicesSchema, DEFAULT_SERVICES_BY_CENTER } from './ServiceSchema'
