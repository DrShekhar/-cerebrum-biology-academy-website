/**
 * Centralized Statistics Constants
 *
 * IMPORTANT: All statistics displayed across the website should be sourced from this file
 * to ensure consistency. Do NOT hardcode statistics in individual components.
 *
 * Last Updated: January 2025
 */

export const STATISTICS = {
  // Student counts - Use the most accurate current number
  TOTAL_STUDENTS: '11,500+',
  TOTAL_STUDENTS_NUMBER: 11500,

  // Student mentored (historical total)
  STUDENTS_MENTORED: '1.5 lakh+',
  STUDENTS_MENTORED_NUMBER: 150000,

  // Review/rating statistics
  REVIEWS_COUNT: '2,847',
  REVIEWS_COUNT_NUMBER: 2847,
  AVERAGE_RATING: 4.9,
  MAX_RATING: 5,

  // Success metrics
  SUCCESS_RATE: '98%',
  SUCCESS_RATE_NUMBER: 98,
  NEET_SUCCESS_RATE: '93%',
  NEET_SUCCESS_RATE_NUMBER: 93,

  // Score metrics
  AVERAGE_BIOLOGY_SCORE: '330+',
  AVERAGE_BIOLOGY_SCORE_NUMBER: 330,
  TOP_SCORE: 695,
  TOP_SCORER_NAME: 'Sadhna',

  // AIIMS statistics
  AIIMS_SELECTIONS: '500+',
  AIIMS_SELECTIONS_NUMBER: 500,

  // Experience
  YEARS_EXPERIENCE: 15,
  YEARS_EXPERIENCE_DISPLAY: '15+',

  // Batch size - Current operational batch size
  BATCH_SIZE: {
    min: 15,
    max: 20,
    display: '15-20',
  },

  // Demo session
  DEMO_DURATION_MINUTES: 60,
  DEMO_DURATION_DISPLAY: '60 minutes',

  // Course pricing (in INR)
  COURSE_PRICING: {
    class11: {
      original: 15000,
      discounted: 12000,
    },
    class12: {
      original: 18000,
      discounted: 15000,
    },
    neetDropper: {
      original: 25000,
      discounted: 20000,
    },
    foundation: {
      original: 12000,
      discounted: 10000,
    },
  },

  // Response time promises
  RESPONSE_TIME_HOURS: 2,
  CALLBACK_TIME_MINUTES: 30,
} as const

// Type exports for TypeScript support
export type Statistics = typeof STATISTICS
export type BatchSize = typeof STATISTICS.BATCH_SIZE
export type CoursePricing = typeof STATISTICS.COURSE_PRICING

/**
 * Helper function to format large numbers with Indian numbering system
 */
export function formatIndianNumber(num: number): string {
  if (num >= 100000) {
    const lakhs = num / 100000
    return lakhs % 1 === 0 ? `${lakhs} lakh` : `${lakhs.toFixed(1)} lakh`
  }
  if (num >= 1000) {
    return num.toLocaleString('en-IN')
  }
  return num.toString()
}

/**
 * Helper function to get formatted student count with suffix
 */
export function getStudentCount(includePrefix = true): string {
  return includePrefix ? STATISTICS.TOTAL_STUDENTS : STATISTICS.TOTAL_STUDENTS.replace('+', '')
}

/**
 * Helper function to get rating display string
 */
export function getRatingDisplay(): string {
  return `${STATISTICS.AVERAGE_RATING}/${STATISTICS.MAX_RATING} Rating • ${STATISTICS.REVIEWS_COUNT} Reviews`
}
