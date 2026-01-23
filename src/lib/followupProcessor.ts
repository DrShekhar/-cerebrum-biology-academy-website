/**
 * Follow-up Queue Processor
 *
 * This module handles the execution of queued follow-up actions
 * and manages retry logic for failed operations.
 */

import { prisma } from '@/lib/prisma'
import { renderTemplate } from './templateRenderer'
import {
  logError,
  logWarning,
  logInfo,
  validateLeadData,
  validateQueueItemData,
  FollowupProcessingError,
  FollowupValidationError,
  sanitizeTemplateContent,
} from './followupErrorHandler'
import { emailService } from './email/emailService'
import { smsService } from './sms/smsService'
import { sendWhatsAppMessage, sendFollowUpMessage } from './interakt'

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
    const email = lead.email || lead.users?.email
    if (!email) {
      logWarning('sendEmail', 'No email address found for lead', { leadId: lead.id })
      return {
        success: false,
        message: 'No email address found for lead',
      }
    }

    const subject = rule.template?.subject || `Follow-up: ${rule.name}`
    const htmlContent =
      content ||
      `<p>Hello ${lead.studentName || 'there'},</p><p>This is a follow-up regarding your inquiry at Cerebrum Biology Academy.</p>`

    logInfo('sendEmail', `Sending email to ${email}`, {
      leadId: lead.id,
      ruleId: rule.id,
      subject,
    })

    const result = await emailService.send({
      to: email,
      subject,
      html: htmlContent,
      text: content.replace(/<[^>]*>/g, ''),
    })

    if (result.success) {
      logInfo('sendEmail', `Email sent successfully via ${result.provider}`, {
        leadId: lead.id,
        messageId: result.messageId,
      })
      return {
        success: true,
        message: `Email sent successfully to ${email}`,
        deliveryId: result.messageId || `email_${Date.now()}`,
      }
    } else {
      logError('sendEmail', new Error(result.error || 'Email sending failed'), {
        leadId: lead.id,
        email,
      })
      return {
        success: false,
        message: result.error || 'Failed to send email',
      }
    }
  } catch (error) {
    logError('sendEmail', error, { leadId: lead?.id })
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send email',
    }
  }
}

async function sendWhatsApp(lead: any, rule: any, content: string): Promise<ExecutionResult> {
  try {
    const phone = lead.phone || lead.whatsappNumber || lead.users?.phone
    if (!phone) {
      logWarning('sendWhatsApp', 'No phone number found for lead', { leadId: lead.id })
      return {
        success: false,
        message: 'No phone number found for lead',
      }
    }

    logInfo('sendWhatsApp', `Sending WhatsApp to ${phone}`, {
      leadId: lead.id,
      ruleId: rule.id,
      ruleName: rule.name,
    })

    const templateName = rule.template?.whatsappTemplateName

    let result
    if (templateName) {
      result = await sendWhatsAppMessage({
        phone,
        templateName,
        templateParams: {
          name: lead.studentName || lead.name || 'Student',
          courseName: lead.courseInterest || 'NEET Biology',
          counselorName: lead.assignedTo?.name || 'Cerebrum Team',
        },
      })
    } else if (content) {
      result = await sendWhatsAppMessage({
        phone,
        message: content,
      })
    } else {
      result = await sendFollowUpMessage({
        phone,
        name: lead.studentName || lead.name || 'Student',
        courseName: lead.courseInterest || 'NEET Biology',
        counselorName: lead.assignedTo?.name || 'Cerebrum Team',
        bookingLink: `https://cerebrumbiologyacademy.com/book-demo?lead=${lead.id}`,
      })
    }

    if (result.success) {
      logInfo('sendWhatsApp', 'WhatsApp sent successfully', {
        leadId: lead.id,
        messageId: result.messageId,
      })
      return {
        success: true,
        message: `WhatsApp sent successfully to ${phone}`,
        deliveryId: result.messageId || `whatsapp_${Date.now()}`,
      }
    } else {
      logError('sendWhatsApp', new Error(result.error || 'WhatsApp sending failed'), {
        leadId: lead.id,
        phone,
      })
      return {
        success: false,
        message: result.error || 'Failed to send WhatsApp',
      }
    }
  } catch (error) {
    logError('sendWhatsApp', error, { leadId: lead?.id })
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
    const phone = lead.phone || lead.users?.phone
    if (!phone) {
      logWarning('sendSMS', 'No phone number found for lead', { leadId: lead.id })
      return {
        success: false,
        message: 'No phone number found for lead',
      }
    }

    const formattedPhone = smsService.formatPhoneNumber(phone)
    const message =
      content ||
      `Hi ${lead.studentName || 'there'}, this is a follow-up from Cerebrum Biology Academy regarding your inquiry. Reply to connect with our team.`

    logInfo('sendSMS', `Sending SMS to ${formattedPhone}`, {
      leadId: lead.id,
      ruleId: rule.id,
    })

    const result = await smsService.send({
      to: formattedPhone,
      message,
    })

    if (result.success) {
      logInfo('sendSMS', `SMS sent successfully via ${result.provider}`, {
        leadId: lead.id,
        messageId: result.messageId,
      })
      return {
        success: true,
        message: `SMS sent successfully to ${formattedPhone}`,
        deliveryId: result.messageId || `sms_${Date.now()}`,
      }
    } else {
      logError('sendSMS', new Error(result.error || 'SMS sending failed'), {
        leadId: lead.id,
        phone: formattedPhone,
      })
      return {
        success: false,
        message: result.error || 'Failed to send SMS',
      }
    }
  } catch (error) {
    logError('sendSMS', error, { leadId: lead?.id })
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send SMS',
    }
  }
}

async function createNotification(lead: any, rule: any, content: string): Promise<ExecutionResult> {
  try {
    const notificationId = `notif_${Date.now()}_${lead.id.slice(0, 8)}`
    const title = rule.template?.notificationTitle || `Follow-up: ${lead.studentName || 'Lead'}`
    const message =
      content || `Follow-up notification for ${lead.studentName || 'lead'} regarding ${rule.name}`

    logInfo('createNotification', `Creating notification for lead`, {
      leadId: lead.id,
      ruleId: rule.id,
      notificationId,
    })

    await prisma.content_notifications.create({
      data: {
        id: notificationId,
        title,
        message,
        type: 'FOLLOW_UP',
        targetUserIds: lead.assignedToId ? [lead.assignedToId] : null,
        isActive: true,
        metadata: {
          leadId: lead.id,
          ruleId: rule.id,
          ruleName: rule.name,
          leadName: lead.studentName,
          leadPhone: lead.phone,
        },
      },
    })

    logInfo('createNotification', 'Notification created successfully', {
      leadId: lead.id,
      notificationId,
    })

    return {
      success: true,
      message: `Notification created successfully`,
      deliveryId: notificationId,
    }
  } catch (error) {
    logError('createNotification', error, { leadId: lead?.id })
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
