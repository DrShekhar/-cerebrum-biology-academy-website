/**
 * Keyword Matrix for South Delhi SEO Pages
 *
 * Strategy: Each page targets UNIQUE primary keywords to avoid cannibalization.
 *
 * Hierarchy:
 * 1. Hub pages (e.g., /neet-coaching-south-delhi) → Broad umbrella terms
 * 2. Locality pages (e.g., /neet-coaching-defence-colony-delhi) → Locality-specific
 * 3. Dynamic routes (/biology-tuition-south-delhi/[area]) → Long-tail variations
 */

export interface KeywordConfig {
  slug: string
  primaryKeyword: string
  secondaryKeywords: string[]
  avoidKeywords: string[] // Keywords this page should NOT target (handled by another page)
  focusType: 'hub' | 'locality' | 'long-tail'
}

export const SOUTH_DELHI_KEYWORD_MATRIX: KeywordConfig[] = [
  // ============ HUB PAGES ============
  {
    slug: 'neet-coaching-south-delhi',
    primaryKeyword: 'NEET coaching South Delhi',
    secondaryKeywords: [
      'best NEET biology coaching South Delhi',
      'NEET classes South Delhi',
      'medical entrance coaching South Delhi',
    ],
    avoidKeywords: ['Defence Colony', 'Greater Kailash', 'Hauz Khas', 'Lajpat Nagar'],
    focusType: 'hub',
  },
  {
    slug: 'biology-tuition-south-delhi',
    primaryKeyword: 'Biology tuition South Delhi',
    secondaryKeywords: [
      'biology classes South Delhi',
      'class 11 12 biology South Delhi',
      'CBSE biology tuition South Delhi',
    ],
    avoidKeywords: ['NEET coaching South Delhi'],
    focusType: 'hub',
  },

  // ============ LOCALITY PAGES ============
  {
    slug: 'neet-coaching-defence-colony-delhi',
    primaryKeyword: 'NEET coaching Defence Colony',
    secondaryKeywords: [
      'biology coaching Defence Colony',
      'NEET classes Defence Colony Delhi',
      'best NEET tutor Defence Colony',
    ],
    avoidKeywords: ['NEET coaching South Delhi'],
    focusType: 'locality',
  },
  {
    slug: 'neet-coaching-greater-kailash-delhi',
    primaryKeyword: 'NEET coaching Greater Kailash',
    secondaryKeywords: [
      'biology coaching GK Delhi',
      'NEET classes Greater Kailash',
      'NEET preparation GK',
    ],
    avoidKeywords: ['NEET coaching South Delhi'],
    focusType: 'locality',
  },
  {
    slug: 'neet-coaching-hauz-khas-delhi',
    primaryKeyword: 'NEET coaching Hauz Khas',
    secondaryKeywords: [
      'biology classes Hauz Khas',
      'NEET preparation Hauz Khas Delhi',
      'medical entrance Hauz Khas',
    ],
    avoidKeywords: ['NEET coaching South Delhi'],
    focusType: 'locality',
  },
  {
    slug: 'neet-coaching-lajpat-nagar-delhi',
    primaryKeyword: 'NEET coaching Lajpat Nagar',
    secondaryKeywords: [
      'biology tuition Lajpat Nagar',
      'NEET classes Lajpat Nagar Delhi',
      'NEET prep Lajpat Nagar',
    ],
    avoidKeywords: ['NEET coaching South Delhi'],
    focusType: 'locality',
  },
  {
    slug: 'neet-coaching-saket-delhi',
    primaryKeyword: 'NEET coaching Saket Delhi',
    secondaryKeywords: [
      'biology classes Saket',
      'NEET preparation Saket Delhi',
      'medical coaching Saket',
    ],
    avoidKeywords: ['NEET coaching South Delhi'],
    focusType: 'locality',
  },
  {
    slug: 'neet-coaching-green-park-delhi',
    primaryKeyword: 'NEET coaching Green Park Delhi',
    secondaryKeywords: [
      'biology tuition Green Park',
      'NEET classes Green Park',
      'NEET preparation Green Park',
    ],
    avoidKeywords: ['NEET coaching South Delhi', 'Hauz Khas'],
    focusType: 'locality',
  },
  {
    slug: 'neet-coaching-malviya-nagar-delhi',
    primaryKeyword: 'NEET coaching Malviya Nagar',
    secondaryKeywords: [
      'biology classes Malviya Nagar Delhi',
      'NEET tuition Malviya Nagar',
      'medical entrance Malviya Nagar',
    ],
    avoidKeywords: ['NEET coaching South Delhi', 'Saket'],
    focusType: 'locality',
  },
  {
    slug: 'neet-coaching-cr-park-delhi',
    primaryKeyword: 'NEET coaching CR Park Delhi',
    secondaryKeywords: [
      'biology tuition Chittaranjan Park',
      'NEET classes CR Park',
      'NEET preparation CR Park Delhi',
    ],
    avoidKeywords: ['NEET coaching South Delhi', 'Greater Kailash'],
    focusType: 'locality',
  },
  {
    slug: 'neet-coaching-vasant-kunj-delhi',
    primaryKeyword: 'NEET coaching Vasant Kunj',
    secondaryKeywords: [
      'biology classes Vasant Kunj Delhi',
      'NEET tuition Vasant Kunj',
      'medical entrance Vasant Kunj',
    ],
    avoidKeywords: ['NEET coaching South Delhi'],
    focusType: 'locality',
  },

  // ============ LONG-TAIL PAGES (Dynamic Routes) ============
  {
    slug: 'biology-tuition-south-delhi/defence-colony',
    primaryKeyword: 'biology tuition Defence Colony',
    secondaryKeywords: [
      'class 11 biology Defence Colony',
      'class 12 biology Defence Colony',
      'CBSE biology tutor Defence Colony',
    ],
    avoidKeywords: ['NEET coaching Defence Colony'],
    focusType: 'long-tail',
  },
  {
    slug: 'biology-tuition-south-delhi/greater-kailash',
    primaryKeyword: 'biology tuition Greater Kailash',
    secondaryKeywords: [
      'biology teacher GK Delhi',
      'home tuition biology GK',
      'biology classes Greater Kailash',
    ],
    avoidKeywords: ['NEET coaching Greater Kailash'],
    focusType: 'long-tail',
  },
  {
    slug: 'biology-tuition-south-delhi/hauz-khas',
    primaryKeyword: 'biology tuition Hauz Khas',
    secondaryKeywords: [
      'biology tutor Hauz Khas Delhi',
      'class 11 12 biology Hauz Khas',
      'biology home tuition Hauz Khas',
    ],
    avoidKeywords: ['NEET coaching Hauz Khas'],
    focusType: 'long-tail',
  },
]

/**
 * Get keyword configuration for a specific page
 */
export function getKeywordConfig(slug: string): KeywordConfig | undefined {
  return SOUTH_DELHI_KEYWORD_MATRIX.find((config) => config.slug === slug)
}

/**
 * Get all keywords a page should target (primary + secondary)
 */
export function getPageKeywords(slug: string): string[] {
  const config = getKeywordConfig(slug)
  if (!config) return []
  return [config.primaryKeyword, ...config.secondaryKeywords]
}

/**
 * Check if a keyword would cause cannibalization
 */
export function wouldCannibalize(slug: string, keyword: string): boolean {
  const config = getKeywordConfig(slug)
  if (!config) return false
  return config.avoidKeywords.some((avoid) => keyword.toLowerCase().includes(avoid.toLowerCase()))
}

/**
 * Generate differentiated meta title based on keyword matrix
 */
export function getDifferentiatedTitle(slug: string, fallbackLocality: string): string {
  const config = getKeywordConfig(slug)
  if (config) {
    return `Best ${config.primaryKeyword} | 98% Success Rate | Cerebrum Academy`
  }
  return `Best NEET Biology Coaching in ${fallbackLocality} | Cerebrum Academy`
}

/**
 * Generate differentiated meta description
 */
export function getDifferentiatedDescription(slug: string, fallbackLocality: string): string {
  const config = getKeywordConfig(slug)
  if (config) {
    const keyword = config.primaryKeyword
    return `Join #1 ${keyword}. Expert faculty, proven 98% success rate, 695/720 top score. Personalized batches & doubt clearing. Book free demo!`
  }
  return `Join the best NEET biology coaching in ${fallbackLocality}. 98% success rate with expert faculty. Book your free demo today!`
}
