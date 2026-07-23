/**
 * Follow-up Rule Evaluation Engine
 *
 * This module handles the evaluation of follow-up rules and determines
 * when automated follow-ups should be triggered for leads.
 */

import { prisma } from '@/lib/prisma'
import { LeadStage, Prisma } from '@/generated/prisma'
import { logError, logWarning, logInfo } from './followupErrorHandler'

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
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
          demo_bookings: true,
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
        logWarning('evaluateRule', `Unknown trigger type: ${rule.triggerType}`, {
          ruleId,
          triggerType: rule.triggerType,
        })
        return false
    }
  } catch (error) {
    logError('evaluateRule', error, {
      leadId,
      ruleId,
      operation: 'rule evaluation',
    })
    return false
  }
}

/**
 * Fire-and-forget wrapper around processLeadRules for event call sites
 * (lead created, stage changed). Never throws into the caller — a rules
 * failure must not break a lead write or a public form response.
 */
export function scheduleLeadRuleProcessing(leadId: string, context?: string): void {
  void processLeadRules(leadId).catch((error) => {
    logError('scheduleLeadRuleProcessing', error, {
      leadId,
      context,
      operation: 'event-driven rule processing',
    })
  })
}

// TIME_BASED and INACTIVITY rules may legitimately re-fire (cooldown = the
// rule's own period). Every other trigger describes a one-time event
// (stage reached, demo no-show, offer aging) — those fire once per lead per
// rule, ever, or the cron backstop would resend them every sweep after the
// queue item completes.
const RECURRING_TRIGGERS = new Set(['TIME_BASED', 'INACTIVITY'])

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
      logWarning('processLeadRules', `Lead not found`, {
        leadId,
        operation: 'lead rules processing',
      })
      return
    }

    const activeRules = await prisma.followup_rules.findMany({
      where: { isActive: true },
    })

    for (const rule of activeRules) {
      const shouldTrigger = await evaluateRule(leadId, rule.id)

      if (shouldTrigger) {
        let existingQueue
        if (RECURRING_TRIGGERS.has(rule.triggerType)) {
          const conditions = rule.triggerConditions as TriggerConditions
          const periodDays = conditions.timePeriodDays || conditions.inactivityDays || 7
          const cooldownStart = new Date(Date.now() - periodDays * 24 * 60 * 60 * 1000)
          existingQueue = await prisma.followup_queue.findFirst({
            where: {
              leadId,
              ruleId: rule.id,
              OR: [
                { status: { in: ['PENDING', 'PROCESSING'] } },
                { createdAt: { gte: cooldownStart } },
              ],
            },
          })
        } else {
          existingQueue = await prisma.followup_queue.findFirst({
            where: { leadId, ruleId: rule.id },
          })
        }

        if (!existingQueue) {
          const scheduledFor = new Date()
          scheduledFor.setMinutes(scheduledFor.getMinutes() + rule.delayMinutes)

          await prisma.followup_queue.create({
            data: {
              id: `fq_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
              leadId,
              ruleId: rule.id,
              scheduledFor,
              status: 'PENDING',
              updatedAt: new Date(),
              metadata: {
                triggeredAt: new Date().toISOString(),
                triggerType: rule.triggerType,
              } as Prisma.InputJsonValue,
            },
          })

          logInfo('processLeadRules', `Created queue item for lead`, {
            leadId,
            ruleId: rule.id,
            ruleName: rule.name,
            scheduledFor: scheduledFor.toISOString(),
          })
        }
      }
    }
  } catch (error) {
    logError('processLeadRules', error, {
      leadId,
      operation: 'lead rules processing',
    })
    throw error
  }
}

/**
 * Cron backstop: evaluate ALL active rules across the open pipeline.
 *
 * Instant triggers (STAGE_CHANGE, SCORE_THRESHOLD, …) fire at the event via
 * scheduleLeadRuleProcessing(); this sweep exists for the triggers that only
 * become true as time passes (TIME_BASED, INACTIVITY, DEMO_NO_SHOW, an offer
 * aging past its follow-up window) and as a safety net for events that were
 * missed. Previously the sweep only ran leads sitting inside a TIME_BASED
 * rule's createdAt window, so with no active TIME_BASED rule the entire rule
 * engine produced nothing.
 */
export async function processTimeTriggers(): Promise<{
  rulesActive: number
  leadsEvaluated: number
  leadsFailed: number
}> {
  try {
    const rulesActive = await prisma.followup_rules.count({ where: { isActive: true } })
    if (rulesActive === 0) {
      logInfo('processTimeTriggers', 'No active follow-up rules — nothing to evaluate', {
        operation: 'rule sweep',
      })
      return { rulesActive: 0, leadsEvaluated: 0, leadsFailed: 0 }
    }

    // 90 days of updatedAt covers the live pipeline (any touchpoint bumps
    // updatedAt); leads untouched longer than that have already had every
    // time window expire. Capped so one sweep can't blow the function budget.
    const cutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    const openLeads = await prisma.leads.findMany({
      where: {
        stage: { notIn: ['ENROLLED', 'ACTIVE_STUDENT', 'LOST'] },
        updatedAt: { gte: cutoff },
      },
      select: { id: true },
      orderBy: { updatedAt: 'desc' },
      take: 1000,
    })

    let leadsFailed = 0
    for (const lead of openLeads) {
      try {
        await processLeadRules(lead.id)
      } catch {
        // already logged inside processLeadRules — keep sweeping
        leadsFailed++
      }
    }

    logInfo('processTimeTriggers', `Rule sweep complete`, {
      rulesActive,
      leadsEvaluated: openLeads.length,
      leadsFailed,
      operation: 'rule sweep',
    })
    return { rulesActive, leadsEvaluated: openLeads.length, leadsFailed }
  } catch (error) {
    logError('processTimeTriggers', error, {
      operation: 'rule sweep',
    })
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
  if (lead.score == null || conditions.scoreThreshold == null) return false

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

// `lead.demo_bookings` is an ARRAY (Prisma include returns all bookings), so the
// most recent booking must be selected before reading its status. Previously the
// code read `.status` directly off the array (always undefined), so DEMO_NO_SHOW
// and DEMO_COMPLETED triggers never fired in production.
function latestDemoBooking(lead: any): any | null {
  const bookings = lead?.demo_bookings
  if (!Array.isArray(bookings) || bookings.length === 0) return null
  return [...bookings].sort(
    (a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
  )[0]
}

function evaluateDemoNoShow(lead: any, conditions: TriggerConditions): boolean {
  const latestDemo = latestDemoBooking(lead)
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
  const latestDemo = latestDemoBooking(lead)
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

/**
 * Evaluate custom conditions using a simple expression language
 * Supports: lead.field == value, lead.field != value, lead.field > value, lead.field < value
 * Logical operators: AND, OR (case insensitive)
 * Examples:
 *   - "lead.score > 50"
 *   - "lead.stage == 'DEMO_SCHEDULED' AND lead.score >= 70"
 *   - "lead.courseInterest == 'NEET' OR lead.courseInterest == 'Class 12'"
 */
function evaluateCustomCondition(lead: any, conditions: TriggerConditions): boolean {
  if (!conditions.customCondition) return false

  try {
    const condition = conditions.customCondition.trim()

    const evaluateSingleCondition = (expr: string): boolean => {
      expr = expr.trim()

      const operators = ['===', '!==', '==', '!=', '>=', '<=', '>', '<']
      let operator = ''
      let operatorIndex = -1

      for (const op of operators) {
        const idx = expr.indexOf(op)
        if (idx !== -1) {
          operator = op
          operatorIndex = idx
          break
        }
      }

      if (!operator || operatorIndex === -1) {
        logWarning('evaluateCustomCondition', `Invalid expression format: ${expr}`, {
          leadId: lead?.id,
        })
        return false
      }

      const leftPart = expr.substring(0, operatorIndex).trim()
      const rightPart = expr.substring(operatorIndex + operator.length).trim()

      let leftValue: any
      if (leftPart.startsWith('lead.')) {
        const fieldPath = leftPart.substring(5)
        leftValue = getNestedValue(lead, fieldPath)
      } else {
        leftValue = parseValue(leftPart)
      }

      const rightValue = parseValue(rightPart)

      switch (operator) {
        case '===':
        case '==':
          return leftValue === rightValue || String(leftValue) === String(rightValue)
        case '!==':
        case '!=':
          return leftValue !== rightValue && String(leftValue) !== String(rightValue)
        case '>=':
          return Number(leftValue) >= Number(rightValue)
        case '<=':
          return Number(leftValue) <= Number(rightValue)
        case '>':
          return Number(leftValue) > Number(rightValue)
        case '<':
          return Number(leftValue) < Number(rightValue)
        default:
          return false
      }
    }

    const getNestedValue = (obj: any, path: string): any => {
      return path.split('.').reduce((current, key) => current?.[key], obj)
    }

    const parseValue = (val: string): any => {
      val = val.trim()
      if (val.startsWith("'") && val.endsWith("'")) {
        return val.slice(1, -1)
      }
      if (val.startsWith('"') && val.endsWith('"')) {
        return val.slice(1, -1)
      }
      if (val === 'true') return true
      if (val === 'false') return false
      if (val === 'null') return null
      if (val === 'undefined') return undefined
      const num = Number(val)
      if (!isNaN(num)) return num
      return val
    }

    const orParts = condition.split(/\s+OR\s+/i)
    for (const orPart of orParts) {
      const andParts = orPart.split(/\s+AND\s+/i)
      const allAndConditionsTrue = andParts.every((andPart) => evaluateSingleCondition(andPart))
      if (allAndConditionsTrue) {
        return true
      }
    }

    return false
  } catch (error) {
    logError('evaluateCustomCondition', error, {
      leadId: lead?.id,
      customCondition: conditions.customCondition,
      operation: 'custom condition evaluation',
    })
    return false
  }
}
