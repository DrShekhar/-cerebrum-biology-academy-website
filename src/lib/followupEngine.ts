/**
 * Follow-up Rule Evaluation Engine
 *
 * This module handles the evaluation of follow-up rules and determines
 * when automated follow-ups should be triggered for leads.
 */

import { prisma } from '@/lib/prisma'
import { FollowupTrigger, LeadStage, QueueStatus } from '@/generated/prisma'

interface TriggerConditions {
  targetStage?: LeadStage
  targetStages?: LeadStage[]
  fromStage?: LeadStage
  toStage?: LeadStage
  scoreThreshold?: number
  scoreOperator?: 'GREATER_THAN' | 'LESS_THAN' | 'EQUALS'
  inactivityDays?: number
  timePeriodDays?: number
  customCondition?: string
}

/**
 * Evaluate if a specific rule should trigger for a lead
 *
 * @param leadId - The lead ID to evaluate
 * @param ruleId - The rule ID to evaluate
 * @returns Promise<boolean> - True if the rule should trigger
 */
export async function evaluateRule(leadId: string, ruleId: string): Promise<boolean> {
  try {
    const [lead, rule] = await Promise.all([
      prisma.leads.findUnique({
        where: { id: leadId },
        include: {
          crm_communications: {
            orderBy: { sentAt: 'desc' },
            take: 1,
          },
          tasks: {
            where: { status: { in: ['PENDING', 'IN_PROGRESS'] } },
            take: 1,
          },
          activities: {
            orderBy: { timestamp: 'desc' },
            take: 1,
          },
          demo_bookings: {
            orderBy: { scheduledAt: 'desc' },
            take: 1,
          },
          offers: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
      }),
      prisma.followup_rules.findUnique({
        where: { id: ruleId },
      }),
    ])

    if (!lead || !rule || !rule.isActive) {
      return false
    }

    const conditions = rule.triggerConditions as TriggerConditions

    switch (rule.triggerType) {
      case 'STAGE_CHANGE':
        return evaluateStageChange(lead, conditions)

      case 'TIME_BASED':
        return evaluateTimeBased(lead, conditions)

      case 'SCORE_THRESHOLD':
        return evaluateScoreThreshold(lead, conditions)

      case 'INACTIVITY':
        return evaluateInactivity(lead, conditions)

      case 'DEMO_NO_SHOW':
        return evaluateDemoNoShow(lead, conditions)

      case 'DEMO_COMPLETED':
        return evaluateDemoCompleted(lead, conditions)

      case 'OFFER_SENT':
        return evaluateOfferSent(lead, conditions)

      case 'CUSTOM':
        return evaluateCustomCondition(lead, conditions)

      default:
        console.warn(`Unknown trigger type: ${rule.triggerType}`)
        return false
    }
  } catch (error) {
    console.error('Error evaluating rule:', error)
    return false
  }
}

/**
 * Process all active rules for a specific lead
 * Creates queue items for triggered rules
 *
 * @param leadId - The lead ID to process
 */
export async function processLeadRules(leadId: string): Promise<void> {
  try {
    const lead = await prisma.leads.findUnique({
      where: { id: leadId },
      select: { assignedToId: true },
    })

    if (!lead) {
      console.warn(`Lead ${leadId} not found`)
      return
    }

    const activeRules = await prisma.followup_rules.findMany({
      where: { isActive: true },
    })

    for (const rule of activeRules) {
      const shouldTrigger = await evaluateRule(leadId, rule.id)

      if (shouldTrigger) {
        const existingQueue = await prisma.followup_queue.findFirst({
          where: {
            leadId,
            ruleId: rule.id,
            status: { in: ['PENDING', 'PROCESSING'] },
          },
        })

        if (!existingQueue) {
          const scheduledFor = new Date()
          scheduledFor.setMinutes(scheduledFor.getMinutes() + rule.delayMinutes)

          await prisma.followup_queue.create({
            data: {
              leadId,
              ruleId: rule.id,
              scheduledFor,
              status: 'PENDING',
              metadata: {
                triggeredAt: new Date().toISOString(),
                triggerType: rule.triggerType,
              },
            },
          })

          console.log(
            `Created queue item for lead ${leadId}, rule ${rule.name}, scheduled for ${scheduledFor.toISOString()}`
          )
        }
      }
    }
  } catch (error) {
    console.error('Error processing lead rules:', error)
    throw error
  }
}

/**
 * Process time-based triggers for all leads
 * Should be run periodically via cron job
 */
export async function processTimeTriggers(): Promise<void> {
  try {
    const timeBasedRules = await prisma.followup_rules.findMany({
      where: {
        isActive: true,
        triggerType: 'TIME_BASED',
      },
    })

    for (const rule of timeBasedRules) {
      const conditions = rule.triggerConditions as TriggerConditions
      const timePeriodDays = conditions.timePeriodDays || 7

      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - timePeriodDays)

      const matchingLeads = await prisma.leads.findMany({
        where: {
          createdAt: { gte: cutoffDate },
          stage: { notIn: ['ENROLLED', 'ACTIVE_STUDENT', 'LOST'] },
        },
        select: { id: true },
      })

      for (const lead of matchingLeads) {
        const shouldTrigger = await evaluateRule(lead.id, rule.id)
        if (shouldTrigger) {
          await processLeadRules(lead.id)
        }
      }
    }

    console.log(`Processed ${timeBasedRules.length} time-based trigger rules`)
  } catch (error) {
    console.error('Error processing time triggers:', error)
    throw error
  }
}

function evaluateStageChange(lead: any, conditions: TriggerConditions): boolean {
  if (conditions.targetStage && lead.stage === conditions.targetStage) {
    return true
  }

  if (conditions.targetStages && conditions.targetStages.includes(lead.stage)) {
    return true
  }

  if (conditions.fromStage && conditions.toStage) {
    return lead.stage === conditions.toStage
  }

  return false
}

function evaluateTimeBased(lead: any, conditions: TriggerConditions): boolean {
  if (!conditions.timePeriodDays) return false

  const daysSinceCreation = Math.floor(
    (Date.now() - new Date(lead.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  )

  return daysSinceCreation >= conditions.timePeriodDays
}

function evaluateScoreThreshold(lead: any, conditions: TriggerConditions): boolean {
  if (!lead.score || !conditions.scoreThreshold) return false

  switch (conditions.scoreOperator) {
    case 'GREATER_THAN':
      return lead.score > conditions.scoreThreshold
    case 'LESS_THAN':
      return lead.score < conditions.scoreThreshold
    case 'EQUALS':
      return lead.score === conditions.scoreThreshold
    default:
      return lead.score >= conditions.scoreThreshold
  }
}

function evaluateInactivity(lead: any, conditions: TriggerConditions): boolean {
  if (!conditions.inactivityDays) return false

  const lastContact = lead.crm_communications?.[0]?.sentAt
  if (!lastContact) return true

  const daysSinceContact = Math.floor(
    (Date.now() - new Date(lastContact).getTime()) / (1000 * 60 * 60 * 24)
  )

  return daysSinceContact >= conditions.inactivityDays
}

function evaluateDemoNoShow(lead: any, conditions: TriggerConditions): boolean {
  const latestDemo = lead.demo_bookings?.[0]
  if (!latestDemo) return false

  if (latestDemo.status === 'SCHEDULED') {
    const scheduledTime = new Date(latestDemo.scheduledAt).getTime()
    const now = Date.now()
    const twoHoursInMs = 2 * 60 * 60 * 1000

    return now > scheduledTime + twoHoursInMs
  }

  return latestDemo.status === 'NO_SHOW'
}

function evaluateDemoCompleted(lead: any, conditions: TriggerConditions): boolean {
  const latestDemo = lead.demo_bookings?.[0]
  if (!latestDemo) return false

  return latestDemo.status === 'COMPLETED'
}

function evaluateOfferSent(lead: any, conditions: TriggerConditions): boolean {
  const latestOffer = lead.offers?.[0]
  if (!latestOffer) return false

  const daysSinceOffer = Math.floor(
    (Date.now() - new Date(latestOffer.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  )

  const followUpAfterDays = conditions.timePeriodDays || 1

  return daysSinceOffer >= followUpAfterDays
}

function evaluateCustomCondition(lead: any, conditions: TriggerConditions): boolean {
  if (!conditions.customCondition) return false

  try {
    const condition = conditions.customCondition
    return false
  } catch (error) {
    console.error('Error evaluating custom condition:', error)
    return false
  }
}
