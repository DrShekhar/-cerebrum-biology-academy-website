'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react'

export type Language =
  | 'en'
  | 'hi'
  | 'ta'
  | 'bn'
  | 'te'
  | 'ml'
  | 'kn'
  | 'mr'
  | 'es'
  | 'de'
  | 'ja'
  | 'fr'
  | 'pt'
  | 'ru'
  | 'it'
  | 'nl'
  | 'pl'

export const languageNames: Record<Language, string> = {
  en: 'English',
  hi: 'हिन्दी',
  ta: 'தமிழ்',
  bn: 'বাংলা',
  te: 'తెలుగు',
  ml: 'മലയാളം',
  kn: 'ಕನ್ನಡ',
  mr: 'मराठी',
  es: 'Español',
  de: 'Deutsch',
  ja: '日本語',
  fr: 'Français',
  pt: 'Português',
  ru: 'Русский',
  it: 'Italiano',
  nl: 'Nederlands',
  pl: 'Polski',
}

// PERFORMANCE: Only inline English translations - other languages load on demand
// This reduces initial bundle by ~150KB
const englishTranslations = {
  home: 'Home',
  courses: 'Courses',
  aboutUs: 'About Us',
  contact: 'Contact',
  login: 'Login',
  signUp: 'Sign Up',
  bookDemo: 'Book FREE Demo Class',
  seeSuccessStories: 'See Success Stories',
  heroTitle: 'Best NEET Biology Coaching',
  heroSubtitle: 'Delhi NCR & Pan-India Online',
  locations: 'Laxmi Nagar • Dwarka • Noida • Gurgaon • Kota • Hyderabad • Bangalore',
  topperHighlight: 'Sadhna Scored 695 (100 Percentile)',
  stats: '98% Success Rate • 2,500+ Students • AIIMS Trained Faculties',
  sadhnasScore: "Sadhna's Score",
  percentile100: '100 Percentile',
  successRate: 'Success Rate',
  neetQualified: 'NEET Qualified',
  students: 'Students',
  andCounting: '& Counting',
  nextBatchStarting: 'Next Batch Starting',
  onlySeatsLeft: 'Only 50 Seats Left',
  earlyBirdDiscount: 'Join in the next {days} days and get 15% early bird discount',
  years: 'Years',
  topScore: 'Top Score',
  whyChooseUs: 'Why Choose Us',
  ourCourses: 'Our Courses',
  testimonials: 'Testimonials',
  faculty: 'Our Faculty',
  faq: 'FAQs',
  pricing: 'Pricing',
  freeResources: 'Free Resources',
  blog: 'Blog',
  chooseLanguage: 'Choose your language',
  quickLinks: 'Quick Links',
  resources: 'Resources',
  support: 'Support',
  followUs: 'Follow Us',
  newsletter: 'Newsletter',
  enterEmail: 'Enter your email',
  subscribe: 'Subscribe',
  allRightsReserved: 'All rights reserved',
  privacyPolicy: 'Privacy Policy',
  termsOfService: 'Terms of Service',
  refundPolicy: 'Refund Policy',
  demoClasses: 'Demo Classes',
  studyMaterial: 'Study Material',
  mockTests: 'Mock Tests',
  doubtResolution: 'Doubt Resolution',
  admissionHelp: 'Admission Help',
  feeStructure: 'Fee Structure',
  downloadBrochure: 'Download Brochure',
  callUs: 'Call Us',
  emailUs: 'Email Us',
  address: 'Address',
  startFreeTrial: 'Start Free Trial',
  viewAllCourses: 'View All Courses',
  learnMore: 'Learn More',
  enrollNow: 'Enroll Now',
  getStarted: 'Get Started',
  results: 'Results',
  successStories: 'Success Stories',
  aiims: 'AIIMS',
  trainedFaculty: 'Trained Faculty',
  batchSize: 'Batch Size',
  onlineClasses: 'Online Classes',
  offlineClasses: 'Offline Classes',
  liveClasses: 'Live Classes',
  recordedClasses: 'Recorded Classes',
  personalMentorship: 'Personal Mentorship',
  weeklyTests: 'Weekly Tests',
  comprehensiveStudyMaterial: 'Comprehensive Study Material',
  regularAssessment: 'Regular Assessment',
  parentCommunication: 'Parent Communication',
  performanceTracking: 'Performance Tracking',
  expertFaculty: 'Expert Faculty',
  provenResults: 'Proven Results',
  smallBatches: 'Small Batches',
  personalisedAttention: 'Personalised Attention',
  getInTouch: 'Get in Touch',
  sendMessage: 'Send Message',
  yourName: 'Your Name',
  yourEmail: 'Your Email',
  yourPhone: 'Your Phone',
  yourMessage: 'Your Message',
  selectCourse: 'Select Course',
  selectClass: 'Select Class',
  class11: 'Class 11',
  class12: 'Class 12',
  dropper: 'Dropper',
  twoYearProgram: '2 Year Program',
  studentSuccessStories: 'Student Success Stories',
  hearFromAchievers: 'Hear From Our NEET Achievers',
  realStoriesDescription: 'Real stories from students who transformed their dreams into reality',
  videoSuccessStories: 'Video Success Stories',
  readyToWriteStory: 'Ready to Write Your Success Story?',
  joinThousands:
    'Join thousands of students who achieved their NEET dreams with our proven methodology',
  startYourJourney: 'Start Your Journey',
  watchMoreStories: 'Watch More Stories',
  watchVideo: 'Watch Video',
  getStartedToday: 'Get Started Today',
  readyToBeginJourney: 'Ready to Begin Your NEET Journey?',
  takeFirstStep: 'Take the first step towards your medical career',
  whyChooseCerebrum: 'Why Choose Cerebrum Biology Academy?',
  freeDemoClass: 'Free Demo Class',
  experienceMethodology: 'Experience our teaching methodology with a complimentary biology session',
  noHiddenFees: 'No Hidden Fees',
  transparentPricing: 'Transparent pricing with no surprise charges',
  otherWaysToReach: 'Other Ways to Reach Us',
  joinOurSuccess: 'Join Our Success Story',
  studentsEnrolled: 'Students Enrolled',
  yearsExperience: 'Years Experience',
  responseTime: 'Response Time',
  immediateAssistance: 'For immediate assistance, please call us directly',
  neetSuccessFramework: 'The NEET Success Framework That Works',
  frameworkDescription:
    'Our scientifically-proven 3-step methodology has helped students transform their NEET Biology scores',
  diagnosticAssessment: 'Diagnostic Assessment',
  strategicLearning: 'Strategic Learning',
  performanceOptimization: 'Performance Optimization',
  whyChooseOverTraditional: 'Why Choose Our Academy Over Traditional Coaching?',
  seeDramaticDifference: 'See the dramatic difference our methodology makes',
  ourCommitment: 'Our Commitment to Your Success',
  confidentInMethodology: "We're so confident in our methodology, we guarantee your success",
  readyExperienceDifference: 'Ready to Experience the Difference?',
  bookFreeStrategy: 'Book Your Free Strategy Session',
  boardPreparation: 'Board Preparation',
  services: 'Services',
  company: 'Company',
  stayUpdated: 'Stay Updated',
  getLatestUpdates: 'Get latest updates about NEET, board exams, and biology education tips',
}

export type TranslationKey = keyof typeof englishTranslations

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey, params?: Record<string, string | number>) => string
  availableLanguages: Language[]
  isLoadingLanguage: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const availableLanguages: Language[] = [
  'en',
  'es',
  'de',
  'ja',
  'fr',
  'pt',
  'ru',
  'it',
  'nl',
  'pl',
  'hi',
  'ta',
  'bn',
  'te',
  'ml',
  'kn',
  'mr',
]

// Cache for loaded translations
const translationCache: Map<Language, Record<string, string>> = new Map([
  ['en', englishTranslations],
])

// Lazy load translations for non-English languages
async function loadTranslations(lang: Language): Promise<Record<string, string>> {
  if (translationCache.has(lang)) {
    return translationCache.get(lang)!
  }

  try {
    // Dynamic import for code-splitting
    const langModule = await import(`@/locales/${lang}`)
    const translations = langModule[lang] || langModule.default
    translationCache.set(lang, translations)
    return translations
  } catch (error) {
    console.error(`Failed to load translations for ${lang}:`, error)
    return englishTranslations // Fallback to English
  }
}

export function I18nProviderOptimized({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [currentTranslations, setCurrentTranslations] =
    useState<Record<string, string>>(englishTranslations)
  const [isLoadingLanguage, setIsLoadingLanguage] = useState(false)

  // Load saved language preference on mount (fast localStorage read)
  React.useEffect(() => {
    const savedLang = localStorage.getItem('preferred-language') as Language
    if (savedLang && savedLang !== 'en' && availableLanguages.includes(savedLang)) {
      setLanguageState(savedLang)
      loadTranslations(savedLang).then(setCurrentTranslations)
    }
  }, [])

  const setLanguage = useCallback(async (lang: Language) => {
    setIsLoadingLanguage(true)
    setLanguageState(lang)

    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang)
      document.documentElement.lang = lang
    }

    const translations = await loadTranslations(lang)
    setCurrentTranslations(translations)
    setIsLoadingLanguage(false)
  }, [])

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string | number>): string => {
      let text = currentTranslations[key] || englishTranslations[key] || key
      if (params) {
        Object.entries(params).forEach(([paramKey, value]) => {
          text = text.replace(`{${paramKey}}`, String(value))
        })
      }
      return text
    },
    [currentTranslations]
  )

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      availableLanguages,
      isLoadingLanguage,
    }),
    [language, setLanguage, t, isLoadingLanguage]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    return {
      language: 'en' as Language,
      setLanguage: async () => {},
      t: (key: TranslationKey) => englishTranslations[key] || key,
      availableLanguages,
      isLoadingLanguage: false,
    }
  }
  return context
}
