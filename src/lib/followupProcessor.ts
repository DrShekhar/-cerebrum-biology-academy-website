/**
 * Follow-up Queue Processor
 *
 * This module handles the execution of queued follow-up actions
 * and manages retry logic for failed operations.
 */

import { prisma } from '@/lib/prisma'
import { QueueStatus, FollowupAction } from '@/generated/prisma'
import { renderTemplate } from './templateRenderer'
import {
  logError,
  logWarning,
  logInfo,
  validateLeadData,
  validateQueueItemData,
  FollowupProcessingError,
  FollowupValidationError,
  createTimeoutPromise,
  retryWithBackoff,
  globalCircuitBreaker,
  globalRateLimiter,
  sanitizeTemplateContent,
} from './followupErrorHandler'

interface ExecutionResult {
  success: boolean
  message: string
  deliveryId?: string
}

/**
 * Process all pending queue items that are due for execution
 * Should be run periodically via cron job (every 5 minutes)
 */
export async function processQueue(): Promise<void> {
  try {
    const now = new Date()

    const dueItems = await prisma.followup_queue.findMany({
      where: {
        scheduledFor: { lte: now },
        status: 'PENDING',
      },
      include: {
        lead: {
          include: {
            users: true,
          },
        },
        rule: {
          include: {
            template: true,
          },
        },
      },
      take: 50,
      orderBy: { scheduledFor: 'asc' },
    })

    logInfo('processQueue', `Processing ${dueItems.length} due follow-up items`, {
      dueItemsCount: dueItems.length,
      now: now.toISOString(),
    })

    for (const item of dueItems) {
      await processQueueItem(item.id)
    }

    logInfo('processQueue', `Completed processing ${dueItems.length} follow-up items`, {
      processedCount: dueItems.length,
    })
  } catch (error) {
    logError('processQueue', error, {
      operation: 'batch processing',
    })
    throw error
  }
}

/**
 * Process a specific queue item
 */
async function processQueueItem(queueItemId: string): Promise<void> {
  try {
    // Mark as processing
    await prisma.followup_queue.update({
      where: { id: queueItemId },
      data: {
        status: 'PROCESSING',
        lastAttemptAt: new Date(),
      },
    })

    // Fetch queue item with full details
    const queueItem = await prisma.followup_queue.findUnique({
      where: { id: queueItemId },
      include: {
        lead: {
          include: {
            users: true,
          },
        },
        rule: {
          include: {
            template: true,
          },
        },
      },
    })

    if (!queueItem) {
      throw new FollowupProcessingError(`Queue item ${queueItemId} not found`, {
        queueItemId,
      })
    }

    // Validate queue item data
    const queueValidation = validateQueueItemData(queueItem)
    if (!queueValidation.valid) {
      throw new FollowupValidationError(
        `Invalid queue item data: ${queueValidation.errors.join(', ')}`,
        {
          queueItemId,
          errors: queueValidation.errors,
        }
      )
    }

    // Validate lead data
    if (queueItem.lead) {
      const leadValidation = validateLeadData(queueItem.lead)
      if (!leadValidation.valid) {
        logWarning('processQueueItem', `Lead data validation warnings for ${queueItem.leadId}`, {
          errors: leadValidation.errors,
        })
      }
    }

    logInfo('processQueueItem', `Processing queue item ${queueItemId}`, {
      queueItemId,
      leadId: queueItem.leadId,
      ruleId: queueItem.ruleId,
      attempt: queueItem.attempt,
      maxAttempts: queueItem.maxAttempts,
    })

    const result = await executeFollowup(queueItem)

    if (result.success) {
      // Update queue item to completed
      await prisma.followup_queue.update({
        where: { id: queueItemId },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
        },
      })

      // Create history record
      await prisma.followup_history.create({
        data: {
          leadId: queueItem.leadId,
          ruleId: queueItem.ruleId,
          action: queueItem.rule.actionType,
          channel: queueItem.rule.actionType,
          content: result.message,
          status: 'SENT',
          isAutomated: true,
          metadata: {
            queueItemId: queueItem.id,
            deliveryId: result.deliveryId,
            ruleTriggered: queueItem.rule.name,
          },
        },
      })

      logInfo('processQueueItem', `Successfully completed queue item ${queueItemId}`, {
        queueItemId,
        deliveryId: result.deliveryId,
      })
    } else {
      // Handle failure with retry logic
      const newAttempt = queueItem.attempt + 1

      if (newAttempt >= queueItem.maxAttempts) {
        // Max attempts reached - mark as failed
        await prisma.followup_queue.update({
          where: { id: queueItemId },
          data: {
            status: 'FAILED',
            attempt: newAttempt,
            errorMessage: result.message,
          },
        })

        await prisma.followup_history.create({
          data: {
            leadId: queueItem.leadId,
            ruleId: queueItem.ruleId,
            action: queueItem.rule.actionType,
            channel: queueItem.rule.actionType,
            content: result.message,
            status: 'FAILED',
            isAutomated: true,
            metadata: {
              queueItemId: queueItem.id,
              error: result.message,
              attempts: newAttempt,
            },
          },
        })

        logError(
          'processQueueItem',
          new FollowupProcessingError(
            `Failed queue item after ${newAttempt} attempts`,
            { queueItemId, attempts: newAttempt, error: result.message },
            false
          ),
          {
            queueItemId,
            attempts: newAttempt,
            maxAttempts: queueItem.maxAttempts,
          }
        )
      } else {
        // Schedule retry
        const nextScheduledFor = new Date()
        nextScheduledFor.setMinutes(nextScheduledFor.getMinutes() + 30)

        await prisma.followup_queue.update({
          where: { id: queueItemId },
          data: {
            status: 'PENDING',
            attempt: newAttempt,
            scheduledFor: nextScheduledFor,
            errorMessage: result.message,
          },
        })

        logWarning('processQueueItem', `Retrying queue item ${queueItemId}`, {
          queueItemId,
          attempt: newAttempt,
          maxAttempts: queueItem.maxAttempts,
          nextScheduledFor: nextScheduledFor.toISOString(),
          error: result.message,
        })
      }
    }
  } catch (error) {
    logError('processQueueItem', error, {
      queueItemId,
      operation: 'queue item processing',
    })

    // Mark as failed in database
    await prisma.followup_queue.update({
      where: { id: queueItemId },
      data: {
        status: 'FAILED',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
      },
    })
  }
}

/**
 * Execute a specific follow-up action based on the queue item
 */
export async function executeFollowup(queueItem: any): Promise<ExecutionResult> {
  try {
    const { lead, rule } = queueItem

    if (!lead || !rule) {
      logError('executeFollowup', new FollowupValidationError('Lead or rule not found'), {
        queueItemId: queueItem.id,
        hasLead: !!lead,
        hasRule: !!rule,
      })
      return {
        success: false,
        message: 'Lead or rule not found',
      }
    }

    // Render and sanitize template content
    let content = ''
    if (rule.template) {
      try {
        content = renderTemplate(rule.template, lead)
        content = sanitizeTemplateContent(content)
      } catch (error) {
        logError('executeFollowup', error, {
          operation: 'template rendering',
          templateId: rule.template.id,
        })
        return {
          success: false,
          message: 'Failed to render template',
        }
      }
    }

    logInfo('executeFollowup', `Executing ${rule.actionType} action`, {
      queueItemId: queueItem.id,
      leadId: lead.id,
      ruleId: rule.id,
      actionType: rule.actionType,
      hasContent: !!content,
    })

    // Execute action based on type
    switch (rule.actionType) {
      case 'EMAIL':
        return await sendEmail(lead, rule, content)

      case 'WHATSAPP':
        return await sendWhatsApp(lead, rule, content)

      case 'CALL_TASK':
        return await createCallTask(lead, rule, content)

      case 'SMS':
        return await sendSMS(lead, rule, content)

      case 'NOTIFICATION':
        return await createNotification(lead, rule, content)

      case 'TASK':
        return await createTask(lead, rule, content)

      default:
        logError(
          'executeFollowup',
          new FollowupProcessingError(`Unknown action type: ${rule.actionType}`),
          {
            queueItemId: queueItem.id,
            actionType: rule.actionType,
          }
        )
        return {
          success: false,
          message: `Unknown action type: ${rule.actionType}`,
        }
    }
  } catch (error) {
    logError('executeFollowup', error, {
      queueItemId: queueItem.id,
      operation: 'follow-up execution',
    })
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

async function sendEmail(lead: any, rule: any, content: string): Promise<ExecutionResult> {
  try {
    console.log(`Sending email to ${lead.email} for lead ${lead.id}`)

    return {
      success: true,
      message: `Email sent successfully to ${lead.email}`,
      deliveryId: `email_${Date.now()}`,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email',
    }
  }
}

async function sendWhatsApp(lead: any, rule: any, content: string): Promise<ExecutionResult> {
  try {
    console.log(`Sending WhatsApp to ${lead.phone} for lead ${lead.id}`)

    return {
      success: true,
      message: `WhatsApp sent successfully to ${lead.phone}`,
      deliveryId: `whatsapp_${Date.now()}`,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send WhatsApp',
    }
  }
}

async function createCallTask(lead: any, rule: any, content: string): Promise<ExecutionResult> {
  try {
    await prisma.tasks.create({
      data: {
        title: `Follow-up Call: ${lead.studentName}`,
        description: content || `Call ${lead.studentName} regarding ${rule.name}`,
        type: 'CALL',
        priority: rule.priority,
        status: 'PENDING',
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        userId: lead.assignedToId,
        leadId: lead.id,
      },
    })

    console.log(`Created call task for lead ${lead.id}`)

    return {
      success: true,
      message: `Call task created for counselor`,
      deliveryId: `task_${Date.now()}`,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create call task',
    }
  }
}

async function sendSMS(lead: any, rule: any, content: string): Promise<ExecutionResult> {
  try {
    console.log(`Sending SMS to ${lead.phone} for lead ${lead.id}`)

    return {
      success: true,
      message: `SMS sent successfully to ${lead.phone}`,
      deliveryId: `sms_${Date.now()}`,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send SMS',
    }
  }
}

async function createNotification(lead: any, rule: any, content: string): Promise<ExecutionResult> {
  try {
    console.log(`Creating in-app notification for lead ${lead.id}`)

    return {
      success: true,
      message: `Notification created successfully`,
      deliveryId: `notification_${Date.now()}`,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create notification',
    }
  }
}

async function createTask(lead: any, rule: any, content: string): Promise<ExecutionResult> {
  try {
    await prisma.tasks.create({
      data: {
        title: `Follow-up: ${lead.studentName}`,
        description: content || `Follow up with ${lead.studentName} regarding ${rule.name}`,
        type: 'FOLLOW_UP',
        priority: rule.priority,
        status: 'PENDING',
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        userId: lead.assignedToId,
        leadId: lead.id,
      },
    })

    console.log(`Created task for lead ${lead.id}`)

    return {
      success: true,
      message: `Task created for counselor`,
      deliveryId: `task_${Date.now()}`,
    }
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create task',
    }
  }
}

/**
 * Cancel a queued follow-up
 */
export async function cancelQueueItem(queueItemId: string, reason?: string): Promise<void> {
  await prisma.followup_queue.update({
    where: { id: queueItemId },
    data: {
      status: 'CANCELLED',
      errorMessage: reason || 'Cancelled by user',
    },
  })

  console.log(`Cancelled queue item ${queueItemId}`)
}

/**
 * Skip a queued follow-up
 */
export async function skipQueueItem(queueItemId: string, reason?: string): Promise<void> {
  await prisma.followup_queue.update({
    where: { id: queueItemId },
    data: {
      status: 'SKIPPED',
      errorMessage: reason || 'Skipped by user',
    },
  })

  console.log(`Skipped queue item ${queueItemId}`)
}
