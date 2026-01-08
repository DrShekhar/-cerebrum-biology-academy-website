// SEO Marketing Machine - Type Definitions
// Used for automated content generation and publishing workflow

// ============================================
// CONTENT TYPES
// ============================================

export type SEOContentType =
  | 'BLOG_POST'
  | 'SEO_LANDING_PAGE'
  | 'NEWS_ARTICLE'
  | 'SOCIAL_POST'
  | 'LEAD_MAGNET'

export type DraftStatus =
  | 'draft'          // AI-generated, pending review
  | 'in_review'      // Being reviewed
  | 'approved'       // Ready to publish
  | 'rejected'       // Needs revision
  | 'published'      // Live on site
  | 'archived'       // No longer relevant

export type ContentPriority =
  | 'urgent'         // Time-sensitive (NTA announcements)
  | 'high'           // Important content
  | 'normal'         // Regular content
  | 'low'            // Can wait

export type ContentDifficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export type TargetAudience = 'Student' | 'Parent' | 'Teacher' | 'All'

export type BlogCategory =
  | 'neet-preparation'
  | 'chapter-guides'
  | 'medical-colleges'
  | 'neet-news'
  | 'study-tips'
  | 'success-stories'
  | 'biology-concepts'
  | 'exam-updates'

export type SocialPlatform =
  | 'twitter'
  | 'linkedin'
  | 'instagram'
  | 'whatsapp'
  | 'youtube'

// ============================================
// BASE CONTENT INTERFACES
// ============================================

export interface ContentMetadata {
  id: string
  type: SEOContentType
  status: DraftStatus
  priority: ContentPriority
  createdAt: string
  updatedAt: string
  publishedAt?: string
  generatedBy: 'claude' | 'manual'
  reviewedBy?: string
  notes?: string
}

export interface SEOMetadata {
  title: string
  description: string
  keywords: string[]
  canonicalUrl?: string
  ogImage?: string
  schema?: Record<string, unknown>
}

// ============================================
// BLOG POST TYPES (matches existing MDX frontmatter)
// ============================================

export interface BlogAuthor {
  name: string
  role: string
  avatar?: string
}

export interface BlogFrontmatter {
  title: string
  slug: string
  excerpt: string
  author: BlogAuthor
  category: BlogCategory
  tags: string[]
  featuredImage: string
  publishedAt: string
  updatedAt: string
  readTime: number
  isPublished: boolean
  seoTitle: string
  seoDescription: string
  views?: number
  difficulty: ContentDifficulty
  neetChapter?: string
  neetWeightage?: 'High' | 'Medium' | 'Low'
  targetAudience: TargetAudience
  keyTakeaways: string[]
}

export interface BlogDraft extends ContentMetadata {
  type: 'BLOG_POST'
  frontmatter: BlogFrontmatter
  content: string  // MDX content body
  wordCount: number
}

export interface BlogGenerationInput {
  topic: string
  difficulty?: ContentDifficulty
  targetAudience?: TargetAudience
  neetChapter?: string
  keywords?: string[]
  outline?: string[]
  referenceUrls?: string[]
}

// ============================================
// NEWS ARTICLE TYPES (Time-sensitive content)
// ============================================

export interface NewsSource {
  name: string
  url: string
  publishedAt?: string
}

export interface NewsArticleFrontmatter {
  title: string
  slug: string
  headline: string
  summary: string
  author: BlogAuthor
  category: 'neet-news' | 'exam-updates'
  tags: string[]
  featuredImage: string
  publishedAt: string
  updatedAt: string
  readTime: number
  isPublished: boolean
  seoTitle: string
  seoDescription: string
  isBreakingNews: boolean
  expiresAt?: string  // For time-sensitive news
  sources: NewsSource[]
  relatedLinks: Array<{ title: string; url: string }>
}

export interface NewsDraft extends ContentMetadata {
  type: 'NEWS_ARTICLE'
  frontmatter: NewsArticleFrontmatter
  content: string
  keyUpdates: string[]
  studentImpact: string
  nextSteps: string[]
}

export interface NewsGenerationInput {
  headline: string
  sourceUrl?: string
  summary?: string
  isUrgent?: boolean
  announcementType?: 'nta' | 'government' | 'medical-college' | 'general'
}

// ============================================
// SEO LANDING PAGE TYPES
// ============================================

export interface SEOLandingDraft extends ContentMetadata {
  type: 'SEO_LANDING_PAGE'
  keyword: string
  classLevel?: 'class-9' | 'class-10' | 'class-11' | 'class-12' | 'dropper' | 'universal'
  location?: string
  pageData: SEOLandingPageData
}

export interface SEOLandingPageData {
  slug: string
  title: string
  metaDescription: string
  keywords: string[]
  hero: {
    headline: string
    subheadline: string
    highlightedText?: string
    ctaText: string
    ctaLink: string
  }
  painPoints: Array<{
    icon: string
    question: string
    solution: string
  }>
  benefits: Array<{
    icon: string
    title: string
    description: string
  }>
  stats: Array<{
    value: string
    label: string
  }>
  faqs: Array<{
    question: string
    answer: string
  }>
  testimonials: Array<{
    name: string
    achievement: string
    quote: string
  }>
}

export interface SEOLandingGenerationInput {
  keyword: string
  classLevel?: string
  location?: string
  focusArea?: 'coaching' | 'tuition' | 'online' | 'notes' | 'mcq'
}

// ============================================
// SOCIAL MEDIA TYPES
// ============================================

export interface SocialPostDraft extends ContentMetadata {
  type: 'SOCIAL_POST'
  platform: SocialPlatform
  sourceContentId?: string  // Reference to blog/news being repurposed
  content: SocialPostContent
}

export interface SocialPostContent {
  // Twitter/X
  thread?: string[]  // Array of tweets for thread

  // LinkedIn
  longFormPost?: string

  // Instagram
  caption?: string
  hashtags?: string[]

  // WhatsApp
  broadcastMessage?: string

  // YouTube
  videoTitle?: string
  videoDescription?: string
  tags?: string[]
}

export interface SocialGenerationInput {
  sourceType: 'blog' | 'news' | 'custom'
  sourceId?: string
  sourceSummary?: string
  platforms: SocialPlatform[]
  tone?: 'professional' | 'casual' | 'urgent' | 'educational'
}

// ============================================
// LEAD MAGNET TYPES (PDF downloads)
// ============================================

export interface LeadMagnetDraft extends ContentMetadata {
  type: 'LEAD_MAGNET'
  magnetType: LeadMagnetType
  title: string
  description: string
  targetKeywords: string[]
  content: LeadMagnetContent
  estimatedPages: number
  downloadGate: DownloadGateConfig
}

export type LeadMagnetType =
  | 'cheat-sheet'
  | 'chapter-notes'
  | 'pyq-analysis'
  | 'revision-guide'
  | 'formula-sheet'
  | 'mind-map'
  | 'question-bank'

export interface LeadMagnetContent {
  title: string
  subtitle?: string
  sections: Array<{
    heading: string
    content: string
    type: 'text' | 'table' | 'diagram' | 'list' | 'formula'
  }>
  footer?: string
}

export interface DownloadGateConfig {
  requiredFields: Array<'name' | 'email' | 'phone' | 'class'>
  whatsappOptIn: boolean
  emailOptIn: boolean
  thankYouMessage: string
  redirectUrl?: string
}

export interface LeadMagnetGenerationInput {
  topic: string
  magnetType: LeadMagnetType
  targetChapter?: string
  pageCount?: number
  includeFormulas?: boolean
  includeDiagrams?: boolean
}

// ============================================
// WORKFLOW & QUEUE TYPES
// ============================================

export interface DraftQueueItem {
  id: string
  type: SEOContentType
  title: string
  status: DraftStatus
  priority: ContentPriority
  createdAt: string
  previewUrl?: string
}

export interface PublishResult {
  success: boolean
  contentId: string
  publishedUrl?: string
  error?: string
  publishedAt?: string
}

export interface ContentAnalytics {
  contentId: string
  views: number
  clicks: number
  conversions: number
  avgTimeOnPage?: number
  bounceRate?: number
  lastUpdated: string
}

// ============================================
// CLI COMMAND TYPES
// ============================================

export interface CLIGenerateOptions {
  type: SEOContentType
  topic?: string
  keyword?: string
  headline?: string
  sourceUrl?: string
  urgent?: boolean
  batch?: string  // Path to batch file
  output?: string // Custom output path
}

export interface CLIReviewOptions {
  id?: string
  type?: SEOContentType
  status?: DraftStatus
  all?: boolean
}

export interface CLIPublishOptions {
  id?: string
  allApproved?: boolean
  urgent?: boolean
}

// ============================================
// PROMPT TEMPLATE TYPES
// ============================================

export interface PromptTemplate {
  name: string
  description: string
  systemPrompt: string
  userPromptTemplate: string
  outputFormat: 'json' | 'markdown' | 'mdx'
  requiredVariables: string[]
  optionalVariables?: string[]
}

export interface PromptContext {
  brand: {
    name: string
    tagline: string
    tone: string
    targetAudience: string[]
  }
  seo: {
    primaryKeywords: string[]
    secondaryKeywords: string[]
    competitorKeywords?: string[]
  }
  content: Record<string, unknown>
}

// ============================================
// CONFIGURATION TYPES
// ============================================

export interface SEOMarketingConfig {
  draftsDir: string
  publishedDir: string
  defaultAuthor: BlogAuthor
  defaultPriority: ContentPriority
  autoGenerateSlugs: boolean
  maxDraftsInQueue: number
  urgentExpiryHours: number
  whatsappNumber: string
  whatsappMessage: string
}

export const DEFAULT_CONFIG: SEOMarketingConfig = {
  draftsDir: 'content/drafts',
  publishedDir: 'content/blog',
  defaultAuthor: {
    name: 'Dr. Shekhar Singh',
    role: 'Founder & Senior Faculty'
  },
  defaultPriority: 'normal',
  autoGenerateSlugs: true,
  maxDraftsInQueue: 100,
  urgentExpiryHours: 24,
  whatsappNumber: '+917980078875',
  whatsappMessage: 'Hi! I found you through your website and would like to know more about your NEET Biology coaching.'
}
