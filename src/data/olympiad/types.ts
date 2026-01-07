/**
 * Biology Olympiad Data Types
 * 10 countries + International Biology Olympiad (IBO)
 */

export interface OlympiadRound {
  name: string
  format: string
  duration: string
  topics: string[]
  passRate?: string
}

export interface ExamStructure {
  rounds: OlympiadRound[]
  selectionProcess: string
  iboQualification: boolean
  registrationPeriod?: string
  examMonths?: string[]
}

export interface FAQ {
  question: string
  answer: string
}

export interface BiologyOlympiadCountry {
  id: string
  slug: string
  countryCode: string // ISO 3166-1 alpha-2
  countryName: string
  olympiadName: string // e.g., "USABO"
  olympiadFullName: string // e.g., "USA Biology Olympiad"
  organizingBody: string
  officialWebsite: string
  currency: string
  timezone: string

  // Exam details
  examStructure: ExamStructure

  // Eligibility
  eligibility: {
    ageLimit?: string
    citizenshipRequired: boolean
    schoolLevel: string
    otherRequirements?: string[]
  }

  // Preparation
  preparationResources: string[]
  recommendedBooks: string[]
  campbellChapterFocus: number[] // Most important chapter numbers

  // SEO fields
  metaTitle: string
  metaDescription: string
  keywords: string[]
  heroDescription: string

  // FAQ for schema markup
  faqs: FAQ[]

  // WhatsApp CTA
  whatsappMessage: string
}

// Helper functions
export function getOlympiadBySlug(
  olympiads: BiologyOlympiadCountry[],
  slug: string
): BiologyOlympiadCountry | undefined {
  return olympiads.find((o) => o.slug === slug)
}

export function getOlympiadByCountryCode(
  olympiads: BiologyOlympiadCountry[],
  code: string
): BiologyOlympiadCountry | undefined {
  return olympiads.find((o) => o.countryCode === code)
}

export function getAllOlympiadSlugs(olympiads: BiologyOlympiadCountry[]): string[] {
  return olympiads.map((o) => o.slug)
}
