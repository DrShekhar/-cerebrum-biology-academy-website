/**
 * Lead Scoring Algorithm
 * Calculates a 0-100 score for leads based on multiple factors
 */

import { prisma } from '@/lib/prisma'
import { differenceInDays, differenceInHours } from 'date-fns'

export interface ScoreBreakdown {
  demographic: number
  behavioral: number
  engagement: number
  timeline: number
  total: number
  details: {
    hasEmail: boolean
    hasPhone: boolean
    sourceQuality: number
    activityCount: number
    communicationCount: number
    demoBooked: boolean
    demoAttended: boolean
    responseSpeed: number
    daysSinceCreation: number
    daysSinceLastContact: number
  }
}

export async function calculateLeadScore(leadId: string): Promise<ScoreBreakdown> {
  const lead = await prisma.leads.findUnique({
    where: { id: leadId },
    include: {
      activities: { orderBy: { createdAt: 'desc' }, take: 50 },
      crm_communications: { orderBy: { sentAt: 'desc' }, take: 50 },
      demo_bookings: true,
      tasks: { where: { status: 'COMPLETED' } },
      notes: true,
    },
  })

  if (!lead) {
    throw new Error('Lead not found')
  }

  let demographicScore = 0
  let behavioralScore = 0
  let engagementScore = 0
  let timelineScore = 0

  // DEMOGRAPHIC SCORING (0-25 points)
  if (lead.email) demographicScore += 5
  if (lead.phone) demographicScore += 5

  const sourceScores: Record<string, number> = {
    WEBSITE: 10,
    WHATSAPP: 8,
    PHONE_CALL: 9,
    REFERRAL: 10,
    WALK_IN: 7,
    SOCIAL_MEDIA: 6,
    MANUAL_ENTRY: 4,
  }
  demographicScore += sourceScores[lead.source] || 5

  demographicScore = Math.min(demographicScore, 25)

  // BEHAVIORAL SCORING (0-30 points)
  const activityCount = lead.activities.length
  const communicationCount = lead.crm_communications.length
  const completedTasksCount = lead.tasks.length
  const notesCount = lead.notes.length

  if (activityCount >= 10) behavioralScore += 8
  else if (activityCount >= 5) behavioralScore += 5
  else if (activityCount >= 1) behavioralScore += 2

  if (communicationCount >= 10) behavioralScore += 7
  else if (communicationCount >= 5) behavioralScore += 4
  else if (communicationCount >= 1) behavioralScore += 2

  if (completedTasksCount >= 3) behavioralScore += 5
  else if (completedTasksCount >= 1) behavioralScore += 3

  if (notesCount >= 3) behavioralScore += 5
  else if (notesCount >= 1) behavioralScore += 3

  const stageScores: Record<string, number> = {
    NEW_LEAD: 0,
    CONTACTED: 2,
    QUALIFIED: 4,
    DEMO_SCHEDULED: 6,
    DEMO_COMPLETED: 8,
    OFFER_SENT: 9,
    NEGOTIATION: 10,
    ENROLLED: 0,
    LOST: 0,
  }
  behavioralScore += stageScores[lead.stage] || 0

  behavioralScore = Math.min(behavioralScore, 30)

  // ENGAGEMENT SCORING (0-30 points)
  const demoBooked = !!lead.demoBookingId
  const demoAttended = lead.demo_bookings?.status === 'COMPLETED'

  if (demoAttended) engagementScore += 15
  else if (demoBooked) engagementScore += 10

  let responseSpeed = 0
  if (lead.lastContactedAt) {
    const hoursSinceCreation = differenceInHours(lead.lastContactedAt, lead.createdAt)
    if (hoursSinceCreation <= 24) responseSpeed = 10
    else if (hoursSinceCreation <= 48) responseSpeed = 7
    else if (hoursSinceCreation <= 72) responseSpeed = 4
    else responseSpeed = 2
    engagementScore += responseSpeed
  }

  const recentCommunications = lead.crm_communications.filter((comm) => {
    const daysSinceCommunication = differenceInDays(new Date(), comm.sentAt)
    return daysSinceCommunication <= 7
  }).length

  if (recentCommunications >= 3) engagementScore += 5
  else if (recentCommunications >= 1) engagementScore += 3

  engagementScore = Math.min(engagementScore, 30)

  // TIMELINE SCORING (0-15 points)
  const daysSinceCreation = differenceInDays(new Date(), lead.createdAt)
  const daysSinceLastContact = lead.lastContactedAt
    ? differenceInDays(new Date(), lead.lastContactedAt)
    : daysSinceCreation

  if (daysSinceCreation <= 7) timelineScore += 5
  else if (daysSinceCreation <= 14) timelineScore += 4
  else if (daysSinceCreation <= 30) timelineScore += 2
  else if (daysSinceCreation > 90) timelineScore -= 3

  if (daysSinceLastContact <= 3) timelineScore += 5
  else if (daysSinceLastContact <= 7) timelineScore += 3
  else if (daysSinceLastContact <= 14) timelineScore += 1
  else if (daysSinceLastContact > 30) timelineScore -= 2

  if (lead.nextFollowUpAt) {
    const daysUntilFollowUp = differenceInDays(lead.nextFollowUpAt, new Date())
    if (daysUntilFollowUp >= 0 && daysUntilFollowUp <= 7) timelineScore += 5
    else if (daysUntilFollowUp < 0) timelineScore -= 2
  }

  timelineScore = Math.max(0, Math.min(timelineScore, 15))

  const totalScore = demographicScore + behavioralScore + engagementScore + timelineScore

  return {
    demographic: demographicScore,
    behavioral: behavioralScore,
    engagement: engagementScore,
    timeline: timelineScore,
    total: Math.min(100, Math.max(0, totalScore)),
    details: {
      hasEmail: !!lead.email,
      hasPhone: !!lead.phone,
      sourceQuality: sourceScores[lead.source] || 5,
      activityCount,
      communicationCount,
      demoBooked,
      demoAttended,
      responseSpeed,
      daysSinceCreation,
      daysSinceLastContact,
    },
  }
}

export async function updateLeadScore(leadId: string): Promise<void> {
  const scoreBreakdown = await calculateLeadScore(leadId)

  await prisma.leads.update({
    where: { id: leadId },
    data: {
      score: scoreBreakdown.total,
      scoreUpdatedAt: new Date(),
      scoreBreakdown: scoreBreakdown as any,
    },
  })
}

export async function bulkUpdateLeadScores(leadIds: string[]): Promise<void> {
  await Promise.all(leadIds.map((leadId) => updateLeadScore(leadId)))
}

export async function updateAllLeadScores(counselorId?: string): Promise<number> {
  const leads = await prisma.leads.findMany({
    where: counselorId
      ? {
          assignedToId: counselorId,
          stage: { notIn: ['ENROLLED', 'LOST'] },
        }
      : {
          stage: { notIn: ['ENROLLED', 'LOST'] },
        },
    select: { id: true },
  })

  await bulkUpdateLeadScores(leads.map((l) => l.id))

  return leads.length
}

export function getScoreCategory(score: number): string {
  if (score >= 80) return 'Hot'
  if (score >= 60) return 'Warm'
  if (score >= 40) return 'Cold'
  return 'Inactive'
}

export function getScoreCategoryColor(score: number): string {
  if (score >= 80) return 'red'
  if (score >= 60) return 'orange'
  if (score >= 40) return 'blue'
  return 'gray'
}
