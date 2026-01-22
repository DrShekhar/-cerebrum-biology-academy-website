// Comprehensive Course System Types for Cerebrum Biology Academy

export type ClassLevel = '9th' | '10th' | '11th' | '12th' | 'Dropper' | '2-Year'
export type CourseSeries = 'pinnacle' | 'ascent' | 'pursuit'
export type LearningMode = 'Online' | 'Offline' | 'Hybrid'
export type PaymentPlan = 'one-time' | 'installment'

export interface CourseFeatures {
  // Core Teaching Features
  liveClasses: boolean
  recordedVideos: boolean
  personalMentoring: boolean
  doubtSessions: boolean
  
  // Study Materials
  printedMaterials: boolean
  digitalNotes: boolean
  worksheets: boolean
  previousYearPapers: boolean
  
  // Assessment & Testing
  weeklyTests: boolean
  testSeries: boolean
  mockTests: boolean
  performanceTracking: boolean
  allIndiaRanking: boolean
  
  // Additional Support
  parentCounseling: boolean
  careerGuidance: boolean
  regularFeedback: boolean
  studyPlanning: boolean
  revisionSessions: boolean
}

export interface PaymentOptions {
  oneTime: {
    amount: number
    discount: number // 5% discount for one-time payment
    discountedAmount: number
  }
  installment: {
    totalAmount: number
    installments: {
      amount: number
      dueDate: string
      description: string
    }[]
    processingFee?: number
  }
}

export interface CourseTier {
  series: CourseSeries
  name: string
  description: string
  batchSize: number
  batchSizeDisplay?: string
  priceRange: {
    min: number
    max: number
  }
  features: CourseFeatures
  highlights: string[]
}

export interface CourseCategory {
  id: string
  name: string
  description: string
  targetClass: ClassLevel[]
  icon: string
  courses: CourseProgram[]
}

export interface CourseProgram {
  id: string
  name: string
  description: string
  targetClass: ClassLevel
  duration: string // e.g., "6 months", "1 year", "2 years"
  teachingHours: number // hours per week
  learningMode: LearningMode[]
  
  // Tier-based offerings
  tiers: {
    pinnacle: CourseTierDetails
    ascent: CourseTierDetails
    pursuit: CourseTierDetails
  }
  
  // Course Content
  curriculum: CourseCurriculum
  schedule: CourseSchedule
  faculty: FacultyInfo[]
  
  // Additional Information
  prerequisites: string[]
  learningOutcomes: string[]
  testimonials: CourseTestimonial[]
  faq: FAQ[]
  
  // SEO & Marketing
  isPopular?: boolean
  isFeatured?: boolean
  specialBadge?: string
  seoTitle?: string
  seoDescription?: string
}

export interface CourseTierDetails {
  price: number
  batchSize: number
  features: CourseFeatures
  payment: PaymentOptions
  additionalBenefits: string[]
  enrollmentBonus?: string[]
}

export interface CourseCurriculum {
  totalModules: number
  totalHours: number
  practicalHours: number
  testCount: number
  modules: CurriculumModule[]
}

export interface CurriculumModule {
  id: string
  title: string
  description: string
  duration: number // in hours
  topics: string[]
  learningObjectives: string[]
  practicalWork?: string[]
  assignments?: string[]
  assessments?: string[]
}

export interface CourseSchedule {
  daysPerWeek: number
  hoursPerDay: number
  timing: string[]
  flexibility: string
  makeupClasses: boolean
  holidaySchedule: string
}

export interface FacultyInfo {
  id: string
  name: string
  qualification: string[]
  experience: string
  specialization: string[]
  rating: number
  teachingExperience: string
  achievementHighlights: string[]
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: 'general' | 'admission' | 'payment' | 'curriculum' | 'support' | 'performance' | 'program' | 'eligibility'
  order: number
}

export interface CourseTestimonial {
  id: string
  studentName: string
  course: string
  year: string
  rank: string
  previousRank?: string
  improvement?: string
  college: string
  feedback: string
  rating: number
}

// Comprehensive Course System
export interface CourseSystem {
  categories: CourseCategory[]
  tiers: CourseTier[]
  generalFeatures: {
    commonFeatures: string[]
    supportServices: string[]
    facilities: string[]
    policies: {
      refund: string
      attendance: string
      makeupClasses: string
      materialPolicy: string
    }
  }
}

// Helper Types for Course Management
export interface EnrollmentData {
  courseId: string
  tier: CourseSeries
  studentInfo: {
    name: string
    email: string
    phone: string
    parentPhone: string
    currentClass: ClassLevel
    previousScore?: string
    targetScore: string
    specialRequirements?: string[]
  }
  paymentPlan: PaymentPlan
  selectedSchedule: string
  agreeToTerms: boolean
  enrollmentDate: string
}

export interface CourseAnalytics {
  courseId: string
  tier: CourseSeries
  enrollments: number
  completionRate: number
  averageScore: number
  satisfactionRating: number
  renewalRate: number
  referralRate: number
}

// Academic Performance Tracking
export interface StudentProgress {
  studentId: string
  courseId: string
  tier: CourseSeries
  currentModule: string
  completedModules: string[]
  testScores: {
    testId: string
    score: number
    maxScore: number
    date: string
    topics: string[]
  }[]
  attendanceRate: number
  assignmentSubmissions: number
  overallProgress: number // percentage
  weakAreas: string[]
  improvementSuggestions: string[]
}