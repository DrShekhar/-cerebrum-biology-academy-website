/**
 * SM-2 Spaced Repetition Algorithm Implementation
 *
 * This algorithm schedules question reviews based on how well the user answered.
 * It adjusts the interval and ease factor based on performance quality (0-5).
 *
 * Quality ratings:
 * - 0: Complete blackout, wrong answer
 * - 1: Wrong answer, but recognized correct answer
 * - 2: Wrong answer, but correct answer seemed easy to recall
 * - 3: Correct answer with serious difficulty
 * - 4: Correct answer with some hesitation
 * - 5: Perfect response, correct and fast
 */

export interface ReviewSchedule {
  easeFactor: number // Minimum 1.3, default 2.5
  interval: number // Days until next review
  repetitions: number // Number of successful reviews
  nextReviewAt: Date
  lastReviewAt: Date | null
}

export interface ReviewResult {
  quality: 0 | 1 | 2 | 3 | 4 | 5
  isCorrect: boolean
  timeSpent: number // seconds
  avgTimeForQuestion?: number // average time for this difficulty
}

/**
 * Calculate quality rating based on answer result
 */
export function calculateQuality(result: ReviewResult): 0 | 1 | 2 | 3 | 4 | 5 {
  const { isCorrect, timeSpent, avgTimeForQuestion = 30 } = result

  if (!isCorrect) {
    // Wrong answers get quality 0-2
    return 0
  }

  // Correct answers: calculate quality based on time
  const timeRatio = timeSpent / avgTimeForQuestion

  if (timeRatio <= 0.5) {
    // Very fast - perfect recall
    return 5
  } else if (timeRatio <= 0.8) {
    // Fast - good recall
    return 4
  } else if (timeRatio <= 1.2) {
    // Normal time - adequate recall
    return 4
  } else if (timeRatio <= 2.0) {
    // Slow - some difficulty
    return 3
  } else {
    // Very slow - serious difficulty
    return 3
  }
}

/**
 * SM-2 Algorithm: Calculate next review schedule
 */
export function calculateNextReview(
  current: ReviewSchedule | null,
  quality: 0 | 1 | 2 | 3 | 4 | 5
): ReviewSchedule {
  const now = new Date()

  // Default values for new items
  if (!current) {
    current = {
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      nextReviewAt: now,
      lastReviewAt: null,
    }
  }

  let { easeFactor, interval, repetitions } = current

  if (quality < 3) {
    // Failed response - reset repetitions, review again soon
    repetitions = 0
    interval = 1 // Review tomorrow
  } else {
    // Successful response
    if (repetitions === 0) {
      interval = 1 // First successful review: 1 day
    } else if (repetitions === 1) {
      interval = 6 // Second successful review: 6 days
    } else {
      // Subsequent reviews: multiply by ease factor
      interval = Math.round(interval * easeFactor)
    }
    repetitions += 1
  }

  // Update ease factor using SM-2 formula
  // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))

  // Ease factor should never go below 1.3
  if (easeFactor < 1.3) {
    easeFactor = 1.3
  }

  // Cap maximum interval at 180 days (6 months)
  if (interval > 180) {
    interval = 180
  }

  // Calculate next review date
  const nextReviewAt = new Date(now)
  nextReviewAt.setDate(nextReviewAt.getDate() + interval)

  return {
    easeFactor: Math.round(easeFactor * 100) / 100, // Round to 2 decimals
    interval,
    repetitions,
    nextReviewAt,
    lastReviewAt: now,
  }
}

/**
 * Get questions due for review
 */
export function isDueForReview(schedule: ReviewSchedule): boolean {
  return new Date() >= schedule.nextReviewAt
}

/**
 * Calculate review priority (lower = higher priority)
 * Questions that are overdue get higher priority
 */
export function calculateReviewPriority(schedule: ReviewSchedule): number {
  const now = new Date()
  const dueDate = schedule.nextReviewAt

  // Days overdue (negative means not yet due)
  const daysOverdue = (now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)

  // Priority based on overdue days and ease factor
  // Lower ease factor = harder question = higher priority
  const priority = -daysOverdue + (2.5 - schedule.easeFactor)

  return priority
}

/**
 * Get difficulty category based on ease factor
 */
export function getDifficultyCategory(easeFactor: number): 'hard' | 'medium' | 'easy' {
  if (easeFactor < 1.8) return 'hard'
  if (easeFactor < 2.3) return 'medium'
  return 'easy'
}

/**
 * Calculate mastery percentage for a set of review schedules
 */
export function calculateMasteryPercentage(schedules: ReviewSchedule[]): number {
  if (schedules.length === 0) return 0

  const totalScore = schedules.reduce((sum, schedule) => {
    // Score based on repetitions and ease factor
    const repScore = Math.min(schedule.repetitions, 5) / 5 // 0-1 based on repetitions
    const easeScore = (schedule.easeFactor - 1.3) / (2.5 - 1.3) // 0-1 based on ease factor
    return sum + (repScore * 0.6 + easeScore * 0.4) // Weight repetitions more
  }, 0)

  return Math.round((totalScore / schedules.length) * 100)
}

/**
 * Get recommended daily review count based on schedule
 */
export function getRecommendedDailyReviews(
  totalDue: number,
  newQuestionsAvailable: number,
  targetDailyReviews: number = 20
): { reviews: number; newQuestions: number } {
  // Prioritize due reviews, then add new questions
  const reviews = Math.min(totalDue, targetDailyReviews)
  const remainingSlots = targetDailyReviews - reviews
  const newQuestions = Math.min(newQuestionsAvailable, remainingSlots, 5) // Max 5 new per day

  return { reviews, newQuestions }
}
