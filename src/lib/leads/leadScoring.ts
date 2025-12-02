/**
 * Smart Lead Scoring System
 *
 * AI-powered lead prioritization based on:
 * - Engagement signals (page views, time on site, form submissions)
 * - Demographic data (location, class, course interest)
 * - Behavioral patterns (demo bookings, downloads, chat interactions)
 * - Recency and frequency of interactions
 */

import { prisma } from '@/lib/prisma'

interface LeadScoreBreakdown {
  engagement: number // 0-30 points
  demographic: number // 0-20 points
  behavior: number // 0-30 points
  recency: number // 0-20 points
  total: number // 0-100 points
  factors: string[] // Explanation of score factors
}

interface LeadData {
  id: string
  email?: string | null
  phone: string
  courseInterest: string
  source: string
  createdAt: Date
  lastContactedAt?: Date | null
  demoBookingId?: string | null
}

/**
 * Calculate lead score based on multiple factors
 */
export async function calculateLeadScore(leadId: string): Promise<LeadScoreBreakdown> {
  const lead = await prisma.leads.findUnique({
    where: { id: leadId },
    include: {
      activities: {
        orderBy: { createdAt: 'desc' },
        take: 50,
      },
      demo_bookings: true,
      notes: {
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  })

  if (!lead) {
    throw new Error('Lead not found')
  }

  const breakdown: LeadScoreBreakdown = {
    engagement: 0,
    demographic: 0,
    behavior: 0,
    recency: 0,
    total: 0,
    factors: [],
  }

  // 1. ENGAGEMENT SCORE (0-30 points)
  const activityCount = lead.activities.length
  if (activityCount >= 20) {
    breakdown.engagement += 30
    breakdown.factors.push('High engagement: 20+ activities')
  } else if (activityCount >= 10) {
    breakdown.engagement += 20
    breakdown.factors.push('Good engagement: 10+ activities')
  } else if (activityCount >= 5) {
    breakdown.engagement += 10
    breakdown.factors.push('Moderate engagement: 5+ activities')
  } else if (activityCount > 0) {
    breakdown.engagement += 5
    breakdown.factors.push('Low engagement: Some activity')
  }

  // Bonus for specific activity types
  const activityTypes = lead.activities.map((a) => a.action)
  if (activityTypes.includes('course_view')) {
    breakdown.engagement += 5
    breakdown.factors.push('Viewed course pages')
  }
  if (activityTypes.includes('video_play')) {
    breakdown.engagement += 5
    breakdown.factors.push('Watched video content')
  }

  // Cap engagement at 30
  breakdown.engagement = Math.min(breakdown.engagement, 30)

  // 2. DEMOGRAPHIC SCORE (0-20 points)
  // Course interest indicates intent
  const highValueCourses = ['NEET Complete', 'Dropper', 'Class 12', 'Premium']
  if (highValueCourses.some((c) => lead.courseInterest?.toLowerCase().includes(c.toLowerCase()))) {
    breakdown.demographic += 15
    breakdown.factors.push('High-value course interest')
  } else {
    breakdown.demographic += 8
    breakdown.factors.push('Standard course interest')
  }

  // Having email shows more serious intent
  if (lead.email) {
    breakdown.demographic += 5
    breakdown.factors.push('Provided email address')
  }

  // 3. BEHAVIOR SCORE (0-30 points)
  // Demo booking is strong signal
  if (lead.demo_bookings) {
    breakdown.behavior += 20
    breakdown.factors.push('Demo class booked')

    if (lead.demo_bookings.demoCompleted) {
      breakdown.behavior += 10
      breakdown.factors.push('Attended demo class')
    } else if (lead.demo_bookings.status === 'CONFIRMED') {
      breakdown.behavior += 5
      breakdown.factors.push('Demo confirmed')
    }
  }

  // Source quality
  const highQualitySources = ['demo_booking', 'course_page', 'google_organic']
  const mediumQualitySources = ['exit_intent', 'referral', 'social']
  if (highQualitySources.includes(lead.source)) {
    breakdown.behavior += 10
    breakdown.factors.push('High-quality traffic source')
  } else if (mediumQualitySources.includes(lead.source)) {
    breakdown.behavior += 5
    breakdown.factors.push('Medium-quality traffic source')
  }

  // Cap behavior at 30
  breakdown.behavior = Math.min(breakdown.behavior, 30)

  // 4. RECENCY SCORE (0-20 points)
  const now = new Date()
  const leadAge = Math.floor((now.getTime() - lead.createdAt.getTime()) / (1000 * 60 * 60 * 24))
  const lastActivity = lead.activities[0]?.createdAt
  const daysSinceActivity = lastActivity
    ? Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))
    : leadAge

  // Fresher leads score higher
  if (leadAge <= 1) {
    breakdown.recency += 10
    breakdown.factors.push('Lead created today')
  } else if (leadAge <= 3) {
    breakdown.recency += 8
    breakdown.factors.push('Lead created within 3 days')
  } else if (leadAge <= 7) {
    breakdown.recency += 5
    breakdown.factors.push('Lead created within a week')
  } else if (leadAge <= 14) {
    breakdown.recency += 2
    breakdown.factors.push('Lead created within 2 weeks')
  }

  // Recent activity is valuable
  if (daysSinceActivity <= 1) {
    breakdown.recency += 10
    breakdown.factors.push('Active today')
  } else if (daysSinceActivity <= 3) {
    breakdown.recency += 7
    breakdown.factors.push('Active within 3 days')
  } else if (daysSinceActivity <= 7) {
    breakdown.recency += 4
    breakdown.factors.push('Active within a week')
  }

  // Cap recency at 20
  breakdown.recency = Math.min(breakdown.recency, 20)

  // Calculate total
  breakdown.total =
    breakdown.engagement + breakdown.demographic + breakdown.behavior + breakdown.recency

  return breakdown
}

/**
 * Update lead score in database
 */
export async function updateLeadScore(leadId: string): Promise<number> {
  const breakdown = await calculateLeadScore(leadId)

  await prisma.leads.update({
    where: { id: leadId },
    data: {
      score: breakdown.total,
      scoreUpdatedAt: new Date(),
      scoreBreakdown: breakdown as any,
    },
  })

  console.log(`Lead ${leadId} score updated: ${breakdown.total}`)
  return breakdown.total
}

/**
 * Batch update scores for all leads
 */
export async function updateAllLeadScores(): Promise<{
  updated: number
  errors: number
}> {
  const leads = await prisma.leads.findMany({
    where: {
      OR: [{ score: null }, { scoreUpdatedAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } }],
    },
    select: { id: true },
    take: 100,
  })

  let updated = 0
  let errors = 0

  for (const lead of leads) {
    try {
      await updateLeadScore(lead.id)
      updated++
    } catch (error) {
      console.error(`Failed to update score for lead ${lead.id}:`, error)
      errors++
    }
  }

  return { updated, errors }
}

/**
 * Get lead priority based on score
 */
export function getLeadPriority(score: number): 'HOT' | 'WARM' | 'COLD' {
  if (score >= 70) return 'HOT'
  if (score >= 40) return 'WARM'
  return 'COLD'
}

/**
 * Get recommended action based on lead score and stage
 */
export function getRecommendedAction(
  score: number,
  stage: string,
  hasDemo: boolean
): { action: string; urgency: 'high' | 'medium' | 'low' } {
  if (score >= 80 && !hasDemo) {
    return { action: 'Book demo class immediately', urgency: 'high' }
  }

  if (score >= 70 && hasDemo) {
    return { action: 'Follow up with enrollment offer', urgency: 'high' }
  }

  if (score >= 50) {
    return { action: 'Send personalized course info', urgency: 'medium' }
  }

  if (score >= 30) {
    return { action: 'Add to nurture campaign', urgency: 'low' }
  }

  return { action: 'Monitor for engagement', urgency: 'low' }
}
