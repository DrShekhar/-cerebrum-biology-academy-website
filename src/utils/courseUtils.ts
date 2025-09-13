// Course System Utility Functions for Cerebrum Biology Academy

import { CourseProgram, CourseSeries, ClassLevel, PaymentOptions, CourseFeatures } from '@/types/courseSystem'
import { cerebrumCourseSystem } from '@/data/courseSystemData'

/**
 * Get all courses for a specific class level
 */
export function getCoursesByClass(classLevel: ClassLevel): CourseProgram[] {
  return cerebrumCourseSystem.categories
    .filter(category => category.targetClass.includes(classLevel))
    .flatMap(category => category.courses)
}

/**
 * Get a specific course by ID
 */
export function getCourseById(courseId: string): CourseProgram | undefined {
  return cerebrumCourseSystem.categories
    .flatMap(category => category.courses)
    .find(course => course.id === courseId)
}

/**
 * Get course pricing for a specific tier
 */
export function getCoursePricing(courseId: string, tier: CourseSeries): {
  price: number
  batchSize: number
  payment: PaymentOptions
} | null {
  const course = getCourseById(courseId)
  if (!course) return null
  
  const tierDetails = course.tiers[tier]
  return {
    price: tierDetails.price,
    batchSize: tierDetails.batchSize,
    payment: tierDetails.payment,
  }
}

/**
 * Compare features across different tiers for a course
 */
export function compareTierFeatures(courseId: string): {
  tier: CourseSeries
  name: string
  price: number
  batchSize: number
  features: CourseFeatures
  highlights: string[]
}[] | null {
  const course = getCourseById(courseId)
  if (!course) return null
  
  const tierInfo = cerebrumCourseSystem.tiers
  
  return Object.entries(course.tiers).map(([tierKey, tierDetails]) => {
    const tierMetadata = tierInfo.find(t => t.series === tierKey as CourseSeries)!
    return {
      tier: tierKey as CourseSeries,
      name: tierMetadata.name,
      price: tierDetails.price,
      batchSize: tierDetails.batchSize,
      features: tierDetails.features,
      highlights: tierMetadata.highlights,
    }
  })
}

/**
 * Calculate total savings for one-time payment
 */
export function calculateSavings(courseId: string, tier: CourseSeries): {
  originalPrice: number
  discountedPrice: number
  savings: number
  savingsPercentage: number
} | null {
  const pricing = getCoursePricing(courseId, tier)
  if (!pricing) return null
  
  const { price, payment } = pricing
  const savings = price - payment.oneTime.discountedAmount
  
  return {
    originalPrice: price,
    discountedPrice: payment.oneTime.discountedAmount,
    savings,
    savingsPercentage: payment.oneTime.discount,
  }
}

/**
 * Get recommended courses based on student profile
 */
export function getRecommendedCourses(studentProfile: {
  currentClass: ClassLevel
  targetScore?: number
  budget?: number
  preferredMode?: string[]
}): CourseProgram[] {
  const { currentClass, budget, preferredMode } = studentProfile
  let courses = getCoursesByClass(currentClass)
  
  // Filter by learning mode preference
  if (preferredMode && preferredMode.length > 0) {
    courses = courses.filter(course => 
      course.learningMode.some(mode => preferredMode.includes(mode))
    )
  }
  
  // Sort by popularity and features
  return courses.sort((a, b) => {
    if (a.isPopular && !b.isPopular) return -1
    if (!a.isPopular && b.isPopular) return 1
    if (a.isFeatured && !b.isFeatured) return -1
    if (!a.isFeatured && b.isFeatured) return 1
    return 0
  })
}

/**
 * Get course enrollment statistics
 */
export function getCourseStats(courseId: string): {
  totalTiers: number
  priceRange: { min: number; max: number }
  totalModules: number
  totalHours: number
  facultyCount: number
} | null {
  const course = getCourseById(courseId)
  if (!course) return null
  
  const prices = Object.values(course.tiers).map(tier => tier.price)
  
  return {
    totalTiers: Object.keys(course.tiers).length,
    priceRange: {
      min: Math.min(...prices),
      max: Math.max(...prices),
    },
    totalModules: course.curriculum.totalModules,
    totalHours: course.curriculum.totalHours,
    facultyCount: course.faculty.length,
  }
}

/**
 * Format course duration for display
 */
export function formatCourseDuration(duration: string): string {
  const durationMap: { [key: string]: string } = {
    '6 months': '6 Months Program',
    '1 year': 'Annual Program',
    '2 years': 'Two-Year Foundation',
    '2.5 years': 'Extended Preparation Program',
  }
  
  return durationMap[duration] || duration
}

/**
 * Get tier recommendation based on student needs
 */
export function recommendTier(studentProfile: {
  budget: number
  needsPersonalAttention: boolean
  isHighAchiever: boolean
  parentalSupervision: boolean
}): CourseSeries {
  const { budget, needsPersonalAttention, isHighAchiever, parentalSupervision } = studentProfile
  
  if (budget >= 150000 && (needsPersonalAttention || isHighAchiever || parentalSupervision)) {
    return 'pinnacle'
  }
  
  if (budget >= 70000 && (needsPersonalAttention || isHighAchiever)) {
    return 'ascent'
  }
  
  return 'pursuit'
}

/**
 * Generate course comparison data
 */
export function generateCourseComparison(courseIds: string[]): Array<{
  course: CourseProgram
  stats: ReturnType<typeof getCourseStats>
  tierComparison: ReturnType<typeof compareTierFeatures>
}> {
  return courseIds
    .map(id => {
      const course = getCourseById(id)
      if (!course) return null
      
      return {
        course,
        stats: getCourseStats(id),
        tierComparison: compareTierFeatures(id),
      }
    })
    .filter(Boolean) as Array<{
      course: CourseProgram
      stats: ReturnType<typeof getCourseStats>
      tierComparison: ReturnType<typeof compareTierFeatures>
    }>
}

/**
 * Validate enrollment data
 */
export function validateEnrollment(enrollment: {
  courseId: string
  tier: CourseSeries
  studentInfo: {
    name: string
    email: string
    phone: string
    currentClass: ClassLevel
  }
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  // Validate course exists
  const course = getCourseById(enrollment.courseId)
  if (!course) {
    errors.push('Invalid course selected')
  }
  
  // Validate student info
  if (!enrollment.studentInfo.name.trim()) {
    errors.push('Student name is required')
  }
  
  if (!enrollment.studentInfo.email.includes('@')) {
    errors.push('Valid email is required')
  }
  
  if (enrollment.studentInfo.phone.length < 10) {
    errors.push('Valid phone number is required')
  }
  
  // Validate class compatibility
  if (course && course.targetClass !== enrollment.studentInfo.currentClass) {
    errors.push('Course is not suitable for the selected class')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)}L`
  }
  return `₹${price.toLocaleString('en-IN')}`
}

/**
 * Get feature comparison matrix
 */
export function getFeatureMatrix(): {
  feature: string
  pinnacle: boolean
  ascent: boolean
  pursuit: boolean
  description: string
}[] {
  return [
    {
      feature: 'Live Interactive Classes',
      pinnacle: true,
      ascent: true,
      pursuit: true,
      description: 'Real-time classes with faculty interaction',
    },
    {
      feature: 'Recorded Video Lectures',
      pinnacle: true,
      ascent: true,
      pursuit: true,
      description: 'Access to recorded sessions for revision',
    },
    {
      feature: 'Personal Mentoring',
      pinnacle: true,
      ascent: false,
      pursuit: false,
      description: 'One-on-one guidance and support',
    },
    {
      feature: 'Doubt Clearing Sessions',
      pinnacle: true,
      ascent: true,
      pursuit: false,
      description: 'Regular sessions to resolve queries',
    },
    {
      feature: 'Printed Study Materials',
      pinnacle: true,
      ascent: true,
      pursuit: true,
      description: 'Comprehensive printed notes and books',
    },
    {
      feature: 'Digital Notes & Worksheets',
      pinnacle: true,
      ascent: true,
      pursuit: true,
      description: 'Online access to study materials',
    },
    {
      feature: 'Test Series',
      pinnacle: true,
      ascent: true,
      pursuit: false,
      description: 'Comprehensive test practice',
    },
    {
      feature: 'Performance Tracking',
      pinnacle: true,
      ascent: true,
      pursuit: true,
      description: 'Detailed progress analytics',
    },
    {
      feature: 'All India Ranking',
      pinnacle: true,
      ascent: true,
      pursuit: false,
      description: 'National level rank comparison',
    },
    {
      feature: 'Parent Counseling',
      pinnacle: true,
      ascent: false,
      pursuit: false,
      description: 'Regular parent-teacher meetings',
    },
    {
      feature: 'Career Guidance',
      pinnacle: true,
      ascent: true,
      pursuit: false,
      description: 'Professional career counseling',
    },
  ]
}

export default {
  getCoursesByClass,
  getCourseById,
  getCoursePricing,
  compareTierFeatures,
  calculateSavings,
  getRecommendedCourses,
  getCourseStats,
  formatCourseDuration,
  recommendTier,
  generateCourseComparison,
  validateEnrollment,
  formatPrice,
  getFeatureMatrix,
}