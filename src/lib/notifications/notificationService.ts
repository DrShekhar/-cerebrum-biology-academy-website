/**
 * Unified Notification Service
 * Orchestrates multi-channel communication (Email + WhatsApp + SMS)
 * Handles intelligent channel selection and delivery tracking
 */

import { z } from 'zod'
import { emailService } from '@/lib/email/emailService'
import { whatsappService } from '@/lib/whatsapp/whatsappService'
import { smsService } from '@/lib/sms/smsService'
import { prisma } from '@/lib/prisma'

// Notification priority levels
export type NotificationPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

// Notification types
export type NotificationType =
  | 'DEMO_CONFIRMATION'
  | 'PAYMENT_REMINDER'
  | 'OFFER_SENT'
  | 'ENROLLMENT_CONFIRMATION'
  | 'CLASS_REMINDER'
  | 'GENERAL'

// Channel configuration based on priority and type
export interface ChannelConfig {
  email: boolean
  whatsapp: boolean
  sms: boolean
}

// Notification request schema
const notificationRequestSchema = z.object({
  leadId: z.string().optional(),
  studentName: z.string(),
  email: z.string().email().optional(),
  phone: z.string(),
  type: z.enum([
    'DEMO_CONFIRMATION',
    'PAYMENT_REMINDER',
    'OFFER_SENT',
    'ENROLLMENT_CONFIRMATION',
    'CLASS_REMINDER',
    'GENERAL',
  ]),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
  emailData: z
    .object({
      subject: z.string(),
      html: z.string(),
    })
    .optional(),
  whatsappData: z
    .object({
      message: z.string(),
    })
    .optional(),
  smsData: z
    .object({
      message: z.string(),
    })
    .optional(),
  customChannels: z
    .object({
      email: z.boolean(),
      whatsapp: z.boolean(),
      sms: z.boolean(),
    })
    .optional(),
})

export type NotificationRequest = z.infer<typeof notificationRequestSchema>

export interface NotificationResult {
  success: boolean
  channels: {
    email?: { success: boolean; messageId?: string; error?: string }
    whatsapp?: { success: boolean; error?: string }
    sms?: { success: boolean; messageId?: string; error?: string }
  }
  error?: string
}

/**
 * Determines which channels to use based on notification type and priority
 */
function getChannelConfig(
  type: NotificationType,
  priority: NotificationPriority,
  customChannels?: Partial<ChannelConfig>
): ChannelConfig {
  // If custom channels specified, use those
  if (customChannels) {
    return {
      email: customChannels.email ?? false,
      whatsapp: customChannels.whatsapp ?? false,
      sms: customChannels.sms ?? false,
    }
  }

  // Default channel selection based on type and priority
  const configs: Record<NotificationType, Record<NotificationPriority, ChannelConfig>> = {
    DEMO_CONFIRMATION: {
      LOW: { email: true, whatsapp: true, sms: false },
      MEDIUM: { email: true, whatsapp: true, sms: false },
      HIGH: { email: true, whatsapp: true, sms: false },
      URGENT: { email: true, whatsapp: true, sms: true },
    },
    PAYMENT_REMINDER: {
      LOW: { email: true, whatsapp: false, sms: false }, // 5 days before
      MEDIUM: { email: true, whatsapp: true, sms: false }, // 3 days before
      HIGH: { email: true, whatsapp: true, sms: true }, // 1 day before
      URGENT: { email: true, whatsapp: true, sms: true }, // Due date or overdue
    },
    OFFER_SENT: {
      LOW: { email: true, whatsapp: true, sms: false },
      MEDIUM: { email: true, whatsapp: true, sms: false },
      HIGH: { email: true, whatsapp: true, sms: false },
      URGENT: { email: true, whatsapp: true, sms: true },
    },
    ENROLLMENT_CONFIRMATION: {
      LOW: { email: true, whatsapp: true, sms: false },
      MEDIUM: { email: true, whatsapp: true, sms: false },
      HIGH: { email: true, whatsapp: true, sms: true },
      URGENT: { email: true, whatsapp: true, sms: true },
    },
    CLASS_REMINDER: {
      LOW: { email: true, whatsapp: false, sms: false },
      MEDIUM: { email: true, whatsapp: true, sms: false },
      HIGH: { email: true, whatsapp: true, sms: false },
      URGENT: { email: true, whatsapp: true, sms: true },
    },
    GENERAL: {
      LOW: { email: true, whatsapp: false, sms: false },
      MEDIUM: { email: true, whatsapp: true, sms: false },
      HIGH: { email: true, whatsapp: true, sms: false },
      URGENT: { email: true, whatsapp: true, sms: true },
    },
  }

  return configs[type][priority]
}

/**
 * Main Notification Service
 */
class NotificationService {
  /**
   * Send notification via appropriate channels
   */
  async send(request: NotificationRequest): Promise<NotificationResult> {
    // Validate request
    try {
      notificationRequestSchema.parse(request)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          channels: {},
          error: `Validation error: ${error.issues.map((e) => e.message).join(', ')}`,
        }
      }
      return { success: false, channels: {}, error: 'Invalid notification request' }
    }

    // Determine which channels to use
    const channelConfig = getChannelConfig(request.type, request.priority, request.customChannels)

    console.log(
      `📢 Sending ${request.type} notification to ${request.studentName} via:`,
      Object.entries(channelConfig)
        .filter(([_, enabled]) => enabled)
        .map(([channel]) => channel)
        .join(', ')
    )

    const result: NotificationResult = {
      success: false,
      channels: {},
    }

    // Send via all configured channels in parallel
    const promises: Promise<void>[] = []

    // Email
    if (channelConfig.email && request.emailData && request.email) {
      promises.push(
        (async () => {
          try {
            const emailResult = await emailService.send({
              to: request.email!,
              subject: request.emailData!.subject,
              html: request.emailData!.html,
            })
            result.channels.email = emailResult
          } catch (error) {
            result.channels.email = {
              success: false,
              error: error instanceof Error ? error.message : 'Unknown error',
            }
          }
        })()
      )
    }

    // WhatsApp
    if (channelConfig.whatsapp && request.whatsappData) {
      promises.push(
        (async () => {
          try {
            const whatsappResult = await whatsappService.sendMessage({
              phone: request.phone,
              message: request.whatsappData!.message,
            })
            result.channels.whatsapp = {
              success: whatsappResult,
              error: whatsappResult ? undefined : 'WhatsApp message failed',
            }
          } catch (error) {
            result.channels.whatsapp = {
              success: false,
              error: error instanceof Error ? error.message : 'Unknown error',
            }
          }
        })()
      )
    }

    // SMS
    if (channelConfig.sms && request.smsData) {
      promises.push(
        (async () => {
          try {
            const formattedPhone = smsService.formatPhoneNumber(request.phone)
            const smsResult = await smsService.send({
              to: formattedPhone,
              message: request.smsData!.message,
            })
            result.channels.sms = smsResult
          } catch (error) {
            result.channels.sms = {
              success: false,
              error: error instanceof Error ? error.message : 'Unknown error',
            }
          }
        })()
      )
    }

    // Wait for all channel sends to complete
    await Promise.all(promises)

    // Determine overall success (at least one channel succeeded)
    const anySuccess = Object.values(result.channels).some((channel) => channel?.success)
    result.success = anySuccess

    // Log communication to database if leadId provided
    if (request.leadId) {
      await this.logCommunication(request, result)
    }

    console.log(`📊 Notification result:`, {
      type: request.type,
      priority: request.priority,
      success: result.success,
      channels: Object.entries(result.channels)
        .map(([channel, data]) => `${channel}: ${data?.success ? '✅' : '❌'}`)
        .join(', '),
    })

    return result
  }

  /**
   * Log communication to database for audit trail
   */
  private async logCommunication(
    request: NotificationRequest,
    result: NotificationResult
  ): Promise<void> {
    if (!request.leadId) return

    try {
      await prisma.crm_communications.create({
        data: {
          leadId: request.leadId,
          type: this.getCommunicationType(request.type),
          channel: this.getPrimaryChannel(result),
          direction: 'OUTBOUND',
          content: this.getCommunicationContent(request),
          status: result.success ? 'SENT' : 'FAILED',
          metadata: {
            priority: request.priority,
            channels: result.channels,
            notificationType: request.type,
          },
        },
      })
    } catch (error) {
      console.error('Failed to log communication:', error)
    }
  }

  /**
   * Map notification type to communication type
   */
  private getCommunicationType(
    notificationType: NotificationType
  ): 'EMAIL' | 'SMS' | 'WHATSAPP' | 'CALL' {
    const mapping: Record<NotificationType, 'EMAIL' | 'SMS' | 'WHATSAPP'> = {
      DEMO_CONFIRMATION: 'EMAIL',
      PAYMENT_REMINDER: 'EMAIL',
      OFFER_SENT: 'EMAIL',
      ENROLLMENT_CONFIRMATION: 'EMAIL',
      CLASS_REMINDER: 'WHATSAPP',
      GENERAL: 'EMAIL',
    }
    return mapping[notificationType]
  }

  /**
   * Get the primary channel that was used (for logging)
   */
  private getPrimaryChannel(result: NotificationResult): 'EMAIL' | 'SMS' | 'WHATSAPP' | 'CALL' {
    if (result.channels.email?.success) return 'EMAIL'
    if (result.channels.whatsapp?.success) return 'WHATSAPP'
    if (result.channels.sms?.success) return 'SMS'
    return 'EMAIL' // Default
  }

  /**
   * Extract content summary for logging
   */
  private getCommunicationContent(request: NotificationRequest): string {
    if (request.emailData) {
      return request.emailData.subject
    }
    if (request.whatsappData) {
      return request.whatsappData.message.substring(0, 100)
    }
    if (request.smsData) {
      return request.smsData.message.substring(0, 100)
    }
    return `${request.type} notification`
  }

  /**
   * Send demo booking confirmation
   */
  async sendDemoConfirmation(data: {
    leadId?: string
    studentName: string
    email: string
    phone: string
    demoDate: Date
    meetingLink: string
    meetingPassword: string
    counselorName: string
  }): Promise<NotificationResult> {
    return this.send({
      leadId: data.leadId,
      studentName: data.studentName,
      email: data.email,
      phone: data.phone,
      type: 'DEMO_CONFIRMATION',
      priority: 'HIGH',
      emailData: {
        subject: 'Demo Class Confirmed - Cerebrum Biology Academy',
        html: this.generateDemoConfirmationEmail(data),
      },
      whatsappData: {
        message: `Hi ${data.studentName}! Your demo class is confirmed for ${data.demoDate.toLocaleDateString()}. Join link: ${data.meetingLink} Password: ${data.meetingPassword}. See you in class!`,
      },
    })
  }

  /**
   * Send payment reminder
   */
  async sendPaymentReminder(data: {
    leadId?: string
    studentName: string
    email?: string
    phone: string
    amount: number
    dueDate: Date
    installmentNumber: number
    courseName?: string
    paymentLink?: string
    daysUntilDue?: number
    isOverdue?: boolean
    priority?: NotificationPriority
    channels?: ('email' | 'whatsapp' | 'sms')[]
  }): Promise<boolean> {
    // Determine priority based on days until due or isOverdue flag
    let priority: NotificationPriority = data.priority || 'LOW'
    if (!data.priority) {
      if (data.isOverdue || (data.daysUntilDue !== undefined && data.daysUntilDue <= 0)) {
        priority = 'URGENT'
      } else if (data.daysUntilDue === 1) {
        priority = 'HIGH'
      } else if (data.daysUntilDue !== undefined && data.daysUntilDue <= 3) {
        priority = 'MEDIUM'
      }
    }

    const daysUntilDue = data.daysUntilDue ?? 0
    const paymentLink = data.paymentLink || '#'

    const result = await this.send({
      leadId: data.leadId,
      studentName: data.studentName,
      email: data.email,
      phone: data.phone,
      type: 'PAYMENT_REMINDER',
      priority,
      emailData: data.email
        ? {
            subject: `Payment Reminder - Installment #${data.installmentNumber} ${data.isOverdue ? 'Overdue' : daysUntilDue === 0 ? 'Due Today' : `Due in ${daysUntilDue} days`}`,
            html: this.generatePaymentReminderEmail({
              studentName: data.studentName,
              amount: data.amount,
              dueDate: data.dueDate,
              installmentNumber: data.installmentNumber,
              courseName: data.courseName || 'Course',
              paymentLink,
            }),
          }
        : undefined,
      whatsappData: {
        message: `Hi ${data.studentName}! Reminder: Installment #${data.installmentNumber} of ₹${data.amount.toLocaleString('en-IN')} is due on ${data.dueDate.toLocaleDateString()}. Pay now: ${paymentLink}`,
      },
      smsData:
        priority === 'HIGH' || priority === 'URGENT'
          ? {
              message: `CEREBRUM: Payment of Rs.${data.amount} due ${data.isOverdue ? 'OVERDUE' : daysUntilDue === 0 ? 'TODAY' : `in ${daysUntilDue} days`}. Pay: ${paymentLink}`,
            }
          : undefined,
      customChannels: data.channels
        ? {
            email: data.channels.includes('email'),
            whatsapp: data.channels.includes('whatsapp'),
            sms: data.channels.includes('sms'),
          }
        : undefined,
    })

    return result.success
  }

  /**
   * Generate demo confirmation email HTML
   */
  private generateDemoConfirmationEmail(data: {
    studentName: string
    demoDate: Date
    meetingLink: string
    meetingPassword: string
    counselorName: string
  }): string {
    // This would use the emailTemplates.demoConfirmation
    // For now, return a simple version
    return `<h1>Demo Class Confirmed!</h1><p>Hi ${data.studentName},</p><p>Your demo class is scheduled for ${data.demoDate.toLocaleDateString()}.</p><p><strong>Join Link:</strong> <a href="${data.meetingLink}">${data.meetingLink}</a></p><p><strong>Password:</strong> ${data.meetingPassword}</p>`
  }

  /**
   * Generate payment reminder email HTML
   */
  private generatePaymentReminderEmail(data: {
    studentName: string
    amount: number
    dueDate: Date
    installmentNumber: number
    courseName: string
    paymentLink: string
  }): string {
    // This would use the emailTemplates.paymentReminder
    // For now, return a simple version
    return `<h1>Payment Reminder</h1><p>Hi ${data.studentName},</p><p>This is a reminder that your installment payment is due soon.</p><p><strong>Amount:</strong> ₹${data.amount.toLocaleString('en-IN')}</p><p><strong>Due Date:</strong> ${data.dueDate.toLocaleDateString()}</p><p><a href="${data.paymentLink}">Pay Now</a></p>`
  }
}

// Singleton instance
export const notificationService = new NotificationService()
