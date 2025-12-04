/**
 * Automatic Agent Triggers
 *
 * Utility functions to trigger AI agents based on CRM events.
 * Use these throughout the application to automatically queue agents.
 */

import { AgentType } from '@/generated/prisma'
import { AgentTaskManager } from './base'
import { prisma } from '@/lib/prisma'

/**
 * Trigger lead qualifier when a new lead is created
 */
export async function triggerLeadQualification(
  leadId: string,
  source: string = 'UNKNOWN'
): Promise<string | null> {
  try {
    const taskId = await AgentTaskManager.createTask({
      agentType: AgentType.LEAD_QUALIFIER,
      leadId,
      input: {
        trigger: 'LEAD_CREATED',
        source,
      },
    })
    console.log(`[TRIGGER] Lead qualification queued: ${taskId}`)
    return taskId
  } catch (error) {
    console.error('[TRIGGER] Failed to queue lead qualification:', error)
    return null
  }
}

/**
 * Trigger call prep agent before a scheduled call
 */
export async function triggerCallPrep(
  leadId: string,
  scheduledCallTime: Date
): Promise<string | null> {
  try {
    // Schedule 1 hour before the call
    const prepTime = new Date(scheduledCallTime.getTime() - 60 * 60 * 1000)

    const taskId = await AgentTaskManager.createTask({
      agentType: AgentType.CALL_PREP,
      leadId,
      input: {
        trigger: 'CALL_SCHEDULED',
        scheduledCallTime: scheduledCallTime.toISOString(),
      },
      scheduledAt: prepTime,
    })
    console.log(`[TRIGGER] Call prep scheduled for ${prepTime.toISOString()}: ${taskId}`)
    return taskId
  } catch (error) {
    console.error('[TRIGGER] Failed to queue call prep:', error)
    return null
  }
}

/**
 * Trigger call analysis chain after a call is completed
 * This queues: Transcription → Summary → Action Items (chained automatically)
 */
export async function triggerCallAnalysis(
  communicationId: string,
  leadId: string
): Promise<string | null> {
  try {
    // Check if there's a recording URL
    const communication = await prisma.crm_communications.findUnique({
      where: { id: communicationId },
      select: { callRecordingUrl: true },
    })

    if (!communication?.callRecordingUrl) {
      console.log('[TRIGGER] No recording URL, skipping transcription')
      return null
    }

    // Queue transcription (which will chain to summary and action extraction)
    const taskId = await AgentTaskManager.createTask({
      agentType: AgentType.CALL_TRANSCRIPTION,
      leadId,
      communicationId,
      input: {
        trigger: 'CALL_COMPLETED',
      },
    })
    console.log(`[TRIGGER] Call analysis chain started: ${taskId}`)
    return taskId
  } catch (error) {
    console.error('[TRIGGER] Failed to queue call analysis:', error)
    return null
  }
}

/**
 * Trigger nurture message generation for follow-up
 */
export async function triggerNurtureMessage(
  leadId: string,
  messageType: string,
  context?: string
): Promise<string | null> {
  try {
    const taskId = await AgentTaskManager.createTask({
      agentType: AgentType.NURTURE,
      leadId,
      input: {
        trigger: 'FOLLOW_UP_DUE',
        messageType,
        context,
      },
    })
    console.log(`[TRIGGER] Nurture message queued: ${taskId}`)
    return taskId
  } catch (error) {
    console.error('[TRIGGER] Failed to queue nurture message:', error)
    return null
  }
}

/**
 * Trigger when lead stage changes
 */
export async function triggerStageChange(
  leadId: string,
  oldStage: string,
  newStage: string
): Promise<void> {
  try {
    // Queue lead re-qualification
    await AgentTaskManager.createTask({
      agentType: AgentType.LEAD_QUALIFIER,
      leadId,
      input: {
        trigger: 'STAGE_CHANGE',
        oldStage,
        newStage,
      },
    })

    // Queue nurture message for certain stage transitions
    const nurtureStages = ['DEMO_SCHEDULED', 'DEMO_COMPLETED', 'OFFER_SENT']
    if (nurtureStages.includes(newStage)) {
      await AgentTaskManager.createTask({
        agentType: AgentType.NURTURE,
        leadId,
        input: {
          trigger: 'STAGE_CHANGE',
          stage: newStage,
        },
      })
    }

    console.log(`[TRIGGER] Stage change triggers queued: ${oldStage} → ${newStage}`)
  } catch (error) {
    console.error('[TRIGGER] Failed to queue stage change triggers:', error)
  }
}

/**
 * Trigger when demo is completed
 */
export async function triggerDemoCompleted(
  leadId: string,
  demoBookingId: string,
  rating?: number
): Promise<void> {
  try {
    // Queue nurture message (follow-up)
    await AgentTaskManager.createTask({
      agentType: AgentType.NURTURE,
      leadId,
      input: {
        trigger: 'DEMO_COMPLETED',
        demoBookingId,
        rating,
        messageType: 'DEMO_FOLLOWUP',
      },
    })

    // Re-qualify the lead
    await AgentTaskManager.createTask({
      agentType: AgentType.LEAD_QUALIFIER,
      leadId,
      input: {
        trigger: 'DEMO_COMPLETED',
        rating,
      },
    })

    console.log(`[TRIGGER] Demo completed triggers queued for lead: ${leadId}`)
  } catch (error) {
    console.error('[TRIGGER] Failed to queue demo completed triggers:', error)
  }
}

/**
 * Trigger for scheduled follow-ups (called from cron)
 */
export async function triggerScheduledFollowUps(): Promise<number> {
  try {
    const now = new Date()
    const leads = await prisma.leads.findMany({
      where: {
        nextFollowUpAt: { lte: now },
        stage: { notIn: ['ENROLLED', 'ACTIVE_STUDENT', 'LOST'] },
      },
      select: { id: true, stage: true },
      take: 50,
    })

    let queued = 0
    for (const lead of leads) {
      await AgentTaskManager.createTask({
        agentType: AgentType.NURTURE,
        leadId: lead.id,
        input: {
          trigger: 'FOLLOW_UP_DUE',
          stage: lead.stage,
        },
      })
      queued++
    }

    console.log(`[TRIGGER] Scheduled follow-ups queued: ${queued}`)
    return queued
  } catch (error) {
    console.error('[TRIGGER] Failed to process scheduled follow-ups:', error)
    return 0
  }
}

/**
 * Trigger content generation for campaigns
 */
export async function triggerContentGeneration(
  contentType: string,
  metadata?: Record<string, unknown>
): Promise<string | null> {
  try {
    const taskId = await AgentTaskManager.createTask({
      agentType: AgentType.CONTENT_GENERATOR,
      input: {
        trigger: 'CAMPAIGN_REQUEST',
        contentType,
        ...metadata,
      },
    })
    console.log(`[TRIGGER] Content generation queued: ${taskId}`)
    return taskId
  } catch (error) {
    console.error('[TRIGGER] Failed to queue content generation:', error)
    return null
  }
}

/**
 * Trigger product recommendations when a new lead is created
 */
export async function triggerProductRecommendation(
  leadId: string,
  source: string = 'LEAD_CREATED'
): Promise<string | null> {
  try {
    const taskId = await AgentTaskManager.createTask({
      agentType: AgentType.PRODUCT_AGENT,
      leadId,
      input: {
        trigger: source,
        action: 'RECOMMEND_COURSES',
      },
    })
    console.log(`[TRIGGER] Product recommendation queued: ${taskId}`)
    return taskId
  } catch (error) {
    console.error('[TRIGGER] Failed to queue product recommendation:', error)
    return null
  }
}

/**
 * Trigger product match analysis for demo booking
 */
export async function triggerDemoProductMatch(
  leadId: string,
  courseId: string
): Promise<string | null> {
  try {
    const taskId = await AgentTaskManager.createTask({
      agentType: AgentType.PRODUCT_AGENT,
      leadId,
      input: {
        trigger: 'DEMO_BOOKED',
        action: 'MATCH_ANALYSIS',
        courseId,
      },
    })
    console.log(`[TRIGGER] Demo product match queued: ${taskId}`)
    return taskId
  } catch (error) {
    console.error('[TRIGGER] Failed to queue demo product match:', error)
    return null
  }
}

/**
 * Trigger offer generation for a lead
 */
export async function triggerOfferGeneration(
  leadId: string,
  courseId: string,
  urgency: 'low' | 'medium' | 'high' = 'medium'
): Promise<string | null> {
  try {
    const taskId = await AgentTaskManager.createTask({
      agentType: AgentType.PRODUCT_AGENT,
      leadId,
      input: {
        trigger: 'OFFER_REQUEST',
        action: 'GENERATE_OFFER',
        courseId,
        urgency,
      },
    })
    console.log(`[TRIGGER] Offer generation queued: ${taskId}`)
    return taskId
  } catch (error) {
    console.error('[TRIGGER] Failed to queue offer generation:', error)
    return null
  }
}
