/**
 * Personalized Course Recommendation System
 *
 * Recommends courses based on:
 * - Student profile (class, target exam, preparation level)
 * - Browsing behavior (pages viewed, videos watched)
 * - Similar student patterns
 * - Season/timing factors
 */

import { prisma } from '@/lib/prisma'

interface StudentProfile {
  class?: string
  targetExam?: string
  preparationLevel?: 'beginner' | 'intermediate' | 'advanced'
  budget?: 'low' | 'medium' | 'high'
  preferredMode?: 'online' | 'offline' | 'hybrid'
  weakAreas?: string[]
  strongAreas?: string[]
}

interface CourseRecommendation {
  courseId: string
  courseName: string
  matchScore: number // 0-100
  reasons: string[]
  price: number
  duration: string
  highlights: string[]
}

interface RecommendationInput {
  userId?: string
  leadId?: string
  profile?: StudentProfile
  browsingHistory?: string[]
}

// Course catalog with metadata for matching
const COURSE_CATALOG = [
  {
    id: 'neet-class-11',
    name: 'NEET Biology Class 11',
    targetClass: '11',
    targetExam: 'NEET',
    level: 'beginner',
    mode: ['online', 'offline'],
    price: 15000,
    duration: '12 months',
    highlights: ['NCERT focused', 'Foundation building', 'Regular tests'],
    topics: ['Cell Biology', 'Plant Physiology', 'Human Physiology Basics'],
  },
  {
    id: 'neet-class-12',
    name: 'NEET Biology Class 12',
    targetClass: '12',
    targetExam: 'NEET',
    level: 'intermediate',
    mode: ['online', 'offline'],
    price: 18000,
    duration: '12 months',
    highlights: ['Board + NEET prep', 'Previous year papers', 'Weekly tests'],
    topics: ['Genetics', 'Evolution', 'Ecology', 'Biotechnology'],
  },
  {
    id: 'neet-dropper',
    name: 'NEET Dropper Intensive',
    targetClass: 'dropper',
    targetExam: 'NEET',
    level: 'advanced',
    mode: ['online', 'offline', 'hybrid'],
    price: 25000,
    duration: '10 months',
    highlights: ['Full syllabus revision', 'Mock tests', 'Personal mentoring'],
    topics: ['Complete Biology', 'NEET Strategy', 'Time Management'],
  },
  {
    id: 'neet-crash',
    name: 'NEET Crash Course',
    targetClass: '12',
    targetExam: 'NEET',
    level: 'advanced',
    mode: ['online'],
    price: 8000,
    duration: '3 months',
    highlights: ['Quick revision', 'Important topics only', 'Test series'],
    topics: ['High weightage chapters', 'Previous year patterns'],
  },
  {
    id: 'neet-test-series',
    name: 'NEET Test Series',
    targetClass: 'any',
    targetExam: 'NEET',
    level: 'any',
    mode: ['online'],
    price: 2500,
    duration: '6 months',
    highlights: ['100+ tests', 'Detailed analysis', 'All India rank'],
    topics: ['Full syllabus tests', 'Chapter-wise tests'],
  },
  {
    id: 'foundation-class-9',
    name: 'Biology Foundation Class 9',
    targetClass: '9',
    targetExam: 'Foundation',
    level: 'beginner',
    mode: ['online', 'offline'],
    price: 8000,
    duration: '12 months',
    highlights: ['Early start advantage', 'Strong basics', 'Olympiad prep'],
    topics: ['Basic Biology', 'Scientific Method', 'Life Processes'],
  },
  {
    id: 'foundation-class-10',
    name: 'Biology Foundation Class 10',
    targetClass: '10',
    targetExam: 'Foundation',
    level: 'beginner',
    mode: ['online', 'offline'],
    price: 10000,
    duration: '12 months',
    highlights: ['Board focused', 'NEET intro', 'Concept clarity'],
    topics: ['Life Processes', 'Control and Coordination', 'Reproduction'],
  },
]

/**
 * Get personalized course recommendations
 */
export async function getRecommendations(
  input: RecommendationInput
): Promise<CourseRecommendation[]> {
  const profile = input.profile || (await inferProfile(input))
  const recommendations: CourseRecommendation[] = []

  for (const course of COURSE_CATALOG) {
    const { score, reasons } = calculateMatchScore(course, profile, input.browsingHistory)

    if (score >= 30) {
      recommendations.push({
        courseId: course.id,
        courseName: course.name,
        matchScore: score,
        reasons,
        price: course.price,
        duration: course.duration,
        highlights: course.highlights,
      })
    }
  }

  // Sort by match score descending
  recommendations.sort((a, b) => b.matchScore - a.matchScore)

  // Return top 4 recommendations
  return recommendations.slice(0, 4)
}

/**
 * Infer student profile from behavior and data
 */
async function inferProfile(input: RecommendationInput): Promise<StudentProfile> {
  const profile: StudentProfile = {}

  // Try to get profile from lead or user data
  if (input.leadId) {
    const lead = await prisma.leads.findUnique({
      where: { id: input.leadId },
      select: { courseInterest: true, activities: { take: 20 } },
    })

    if (lead) {
      // Infer class from course interest
      const interest = lead.courseInterest?.toLowerCase() || ''
      if (interest.includes('11')) profile.class = '11'
      else if (interest.includes('12')) profile.class = '12'
      else if (interest.includes('dropper')) profile.class = 'dropper'
      else if (interest.includes('9')) profile.class = '9'
      else if (interest.includes('10')) profile.class = '10'

      profile.targetExam = 'NEET'
    }
  }

  // Infer from browsing history
  if (input.browsingHistory?.length) {
    const pages = input.browsingHistory.join(' ').toLowerCase()
    if (pages.includes('class-11')) profile.class = '11'
    if (pages.includes('class-12')) profile.class = '12'
    if (pages.includes('dropper')) profile.class = 'dropper'
    if (pages.includes('online')) profile.preferredMode = 'online'
    if (pages.includes('offline')) profile.preferredMode = 'offline'
  }

  // Default to intermediate if no info
  profile.preparationLevel = profile.preparationLevel || 'intermediate'
  profile.targetExam = profile.targetExam || 'NEET'

  return profile
}

/**
 * Calculate match score between course and student profile
 */
function calculateMatchScore(
  course: (typeof COURSE_CATALOG)[0],
  profile: StudentProfile,
  browsingHistory?: string[]
): { score: number; reasons: string[] } {
  let score = 50 // Base score
  const reasons: string[] = []

  // Class match (30 points)
  if (profile.class) {
    if (course.targetClass === profile.class) {
      score += 30
      reasons.push(`Perfect match for Class ${profile.class}`)
    } else if (course.targetClass === 'any') {
      score += 15
      reasons.push('Suitable for all classes')
    } else {
      score -= 20
    }
  }

  // Exam match (20 points)
  if (
    profile.targetExam &&
    course.targetExam.toLowerCase().includes(profile.targetExam.toLowerCase())
  ) {
    score += 20
    reasons.push(`Designed for ${profile.targetExam}`)
  }

  // Level match (15 points)
  if (profile.preparationLevel) {
    if (course.level === profile.preparationLevel || course.level === 'any') {
      score += 15
      reasons.push('Matches your preparation level')
    } else if (
      (profile.preparationLevel === 'beginner' && course.level === 'intermediate') ||
      (profile.preparationLevel === 'intermediate' && course.level === 'advanced')
    ) {
      score += 8
      reasons.push('Slightly challenging - great for growth')
    }
  }

  // Mode match (10 points)
  if (profile.preferredMode && course.mode.includes(profile.preferredMode)) {
    score += 10
    reasons.push(`Available in ${profile.preferredMode} mode`)
  }

  // Budget match (10 points)
  if (profile.budget) {
    const budgetRanges = {
      low: [0, 10000],
      medium: [10000, 20000],
      high: [20000, 100000],
    }
    const [min, max] = budgetRanges[profile.budget]
    if (course.price >= min && course.price <= max) {
      score += 10
      reasons.push('Within your budget')
    }
  }

  // Browsing history bonus (up to 15 points)
  if (browsingHistory?.length) {
    const history = browsingHistory.join(' ').toLowerCase()
    if (history.includes(course.id) || history.includes(course.name.toLowerCase())) {
      score += 15
      reasons.push("You've shown interest in this course")
    }
  }

  // Seasonal bonus - crash courses near exam time
  const month = new Date().getMonth()
  if (month >= 0 && month <= 4 && course.id.includes('crash')) {
    score += 10
    reasons.push('Perfect timing before NEET exam')
  }

  // Cap score at 100
  score = Math.min(100, Math.max(0, score))

  return { score, reasons }
}

/**
 * Get similar courses (for "You might also like" section)
 */
export function getSimilarCourses(courseId: string): string[] {
  const course = COURSE_CATALOG.find((c) => c.id === courseId)
  if (!course) return []

  return COURSE_CATALOG.filter(
    (c) =>
      c.id !== courseId &&
      (c.targetClass === course.targetClass || c.targetExam === course.targetExam)
  )
    .slice(0, 3)
    .map((c) => c.id)
}

/**
 * Track recommendation click for learning
 */
export async function trackRecommendationClick(
  userId: string | undefined,
  leadId: string | undefined,
  courseId: string,
  position: number
): Promise<void> {
  console.log('Recommendation clicked:', {
    userId,
    leadId,
    courseId,
    position,
    timestamp: new Date().toISOString(),
  })

  // In production, store this for ML model training
  // await prisma.recommendationClicks.create({ ... })
}
