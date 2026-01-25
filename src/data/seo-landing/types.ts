// Types for SEO Landing Pages

export type ClassLevel = 'class-9' | 'class-10' | 'class-11' | 'class-12' | 'dropper' | 'universal'

/**
 * HowTo step for instructional content pages
 * Enables HowTo rich snippets in Google search
 */
export interface HowToStep {
  name: string
  text: string
  url?: string
  image?: string
}

/**
 * HowTo schema metadata
 */
export interface HowToMeta {
  /** ISO 8601 duration (e.g., "P6M" for 6 months, "PT2H" for 2 hours) */
  totalTime?: string
  /** Items needed (e.g., "NCERT Biology Class 11") */
  supply?: string[]
  /** Tools needed (e.g., "Mock Test Series") */
  tool?: string[]
}

export interface SEOLandingContent {
  // Page identification
  slug: string
  classLevel: ClassLevel

  // SEO metadata
  title: string
  metaDescription: string
  keywords: string[]

  // Hero section
  hero: {
    headline: string
    subheadline: string
    highlightedText?: string
    ctaText: string
    ctaLink: string
    backgroundGradient?: string
  }

  // Pain points section
  painPoints: {
    title: string
    points: Array<{
      icon: string
      question: string
      solution: string
    }>
  }

  // Benefits section
  benefits: {
    title: string
    subtitle?: string
    items: Array<{
      icon: string
      title: string
      description: string
    }>
  }

  // Quick stats
  stats: Array<{
    value: string
    label: string
    icon?: string
  }>

  // Testimonials (2-3 mini testimonials)
  testimonials: Array<{
    name: string
    achievement: string
    quote: string
    image?: string
    score?: string
  }>

  // FAQ section (keyword-rich)
  faqs: Array<{
    question: string
    answer: string
  }>

  // Course details summary
  courseSummary: {
    title: string
    duration: string
    batchSize: string
    features: string[]
    price: {
      original: number
      discounted?: number
      emi?: string
    }
  }

  // CTA section
  cta: {
    title: string
    subtitle: string
    primaryButton: {
      text: string
      link: string
    }
    secondaryButton?: {
      text: string
      link: string
    }
    tertiaryButton?: {
      text: string
      link: string
    }
  }

  // Free Tools CTAs (NEET MCQ, Rank Predictor, College Predictor)
  toolsCTA?: {
    title: string
    tools: Array<{
      name: string
      description: string
      link: string
      icon: 'mcq' | 'rank' | 'college' | 'notes' | 'quiz'
    }>
  }

  // Related Blog Posts
  relatedBlogPosts?: Array<{
    title: string
    slug: string
    excerpt: string
  }>

  // Contact Buttons (WhatsApp, Call)
  contactButtons?: {
    whatsapp?: {
      number: string
      message: string
    }
    phone?: string
  }

  // Related pages for internal linking
  relatedPages: Array<{
    title: string
    link: string
  }>

  // HowTo schema for instructional/guide content (optional)
  howToSteps?: HowToStep[]
  howToMeta?: HowToMeta

  // Schema.org data
  schema: {
    '@type'?: 'Course' | 'WebPage' | 'Article' | 'FAQPage'
    courseName: string
    provider: string
    description: string
    duration: string
    price: number
    priceCurrency: string
    // Enhanced schema properties
    aggregateRating?: {
      ratingValue: number
      reviewCount: number
      bestRating?: number
      worstRating?: number
    }
    coursePrerequisites?: string
    educationalLevel?: string
    numberOfLessons?: number
    hasCourseInstance?: boolean
  }
}

export interface SEOLandingPageProps {
  content: SEOLandingContent
}

// Quick reference for class labels
export const classLabels: Record<ClassLevel, string> = {
  'class-9': 'Class 9 Foundation',
  'class-10': 'Class 10 Foundation',
  'class-11': 'Class 11 NEET',
  'class-12': 'Class 12 NEET',
  dropper: 'NEET Dropper',
  universal: 'NEET Biology',
}

// Course page links
export const coursePageLinks: Record<ClassLevel, string> = {
  'class-9': '/courses/class-9-foundation',
  'class-10': '/courses/class-10-foundation',
  'class-11': '/class-11',
  'class-12': '/class-12',
  dropper: '/courses/neet-dropper',
  universal: '/courses',
}

// Tier page links with query params
export const tierPageLinks: Record<ClassLevel, string> = {
  'class-9': '/courses?class=foundation-9',
  'class-10': '/courses?class=foundation-10',
  'class-11': '/courses?class=class-11',
  'class-12': '/courses?class=class-12',
  dropper: '/courses?class=dropper',
  universal: '/courses',
}
