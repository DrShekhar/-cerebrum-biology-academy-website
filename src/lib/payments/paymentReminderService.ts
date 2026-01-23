/**
 * Payment Reminder Automation Service
 * Scans for upcoming and overdue payments, sends multi-channel reminders
 * Integrates with paymentScheduleService for system-calculated schedules
 */

import { prisma } from '@/lib/prisma'
import { notificationService } from '@/lib/notifications/notificationService'
import { addDays, differenceInDays, format } from 'date-fns'
import type { NotificationPriority } from '@/lib/notifications/notificationService'

export interface PaymentReminderConfig {
  reminderDaysBefore: number[]
  overdueCheckEnabled: boolean
  createTasksForOverdue: boolean
  channels: ('email' | 'whatsapp' | 'sms')[]
}

export interface ReminderResult {
  totalScanned: number
  remindersSent: number
  tasksCreated: number
  errors: string[]
  details: {
    upcoming: number
    overdue: number
    alreadySent: number
  }
}

const DEFAULT_CONFIG: PaymentReminderConfig = {
  reminderDaysBefore: [7, 3, 1],
  overdueCheckEnabled: true,
  createTasksForOverdue: true,
  channels: ['email', 'whatsapp', 'sms'],
}

/**
 * Main Payment Reminder Service
 */
class PaymentReminderService {
  /**
   * Run payment reminder automation
   * Scans all pending installments and sends reminders based on config
   */
  async runAutomation(config: Partial<PaymentReminderConfig> = {}): Promise<ReminderResult> {
    const finalConfig = { ...DEFAULT_CONFIG, ...config }

    const result: ReminderResult = {
      totalScanned: 0,
      remindersSent: 0,
      tasksCreated: 0,
      errors: [],
      details: {
        upcoming: 0,
        overdue: 0,
        alreadySent: 0,
      },
    }

    try {
      const now = new Date()
      const maxDaysAhead = Math.max(...finalConfig.reminderDaysBefore)
      const checkUntil = addDays(now, maxDaysAhead)

      console.log(
        `📅 Payment Reminder Automation Started - Checking installments up to ${format(checkUntil, 'MMM dd, yyyy')}`
      )

      const pendingInstallments = await prisma.installments.findMany({
        where: {
          status: {
            in: ['PENDING', 'OVERDUE'],
          },
          dueDate: {
            lte: checkUntil,
          },
        },
        include: {
          fee_plans: {
            include: {
              lead: {
                include: {
                  assignedTo: true,
                },
              },
            },
          },
        },
        orderBy: {
          dueDate: 'asc',
        },
      })

      result.totalScanned = pendingInstallments.length
      console.log(`🔍 Found ${pendingInstallments.length} pending/overdue installments`)

      for (const installment of pendingInstallments) {
        try {
          const daysUntilDue = differenceInDays(installment.dueDate, now)

          if (daysUntilDue < 0) {
            result.details.overdue++
            await this.handleOverdueInstallment(installment, finalConfig, result)
          } else if (finalConfig.reminderDaysBefore.includes(daysUntilDue)) {
            result.details.upcoming++
            await this.handleUpcomingInstallment(installment, daysUntilDue, finalConfig, result)
          }
        } catch (error) {
          const errorMsg = `Error processing installment ${installment.id}: ${error instanceof Error ? error.message : 'Unknown error'}`
          console.error(errorMsg)
          result.errors.push(errorMsg)
        }
      }

      console.log(`✅ Payment Reminder Automation Complete`)
      console.log(`   📊 Reminders Sent: ${result.remindersSent}`)
      console.log(`   ✅ Tasks Created: ${result.tasksCreated}`)
      console.log(`   ⏰ Upcoming: ${result.details.upcoming}`)
      console.log(`   🚨 Overdue: ${result.details.overdue}`)
      console.log(`   ⏭️  Already Sent: ${result.details.alreadySent}`)

      return result
    } catch (error) {
      console.error('❌ Fatal error in payment reminder automation:', error)
      result.errors.push(`Fatal error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      return result
    }
  }

  /**
   * Handle overdue installment
   */
  private async handleOverdueInstallment(
    installment: any,
    config: PaymentReminderConfig,
    result: ReminderResult
  ) {
    const remindersSent = (installment.remindersSent as any) || {}
    const now = new Date()
    const daysOverdue = Math.abs(differenceInDays(installment.dueDate, now))

    if (remindersSent.overdue) {
      const lastSent = new Date(remindersSent.overdue)
      const daysSinceLastReminder = differenceInDays(now, lastSent)

      if (daysSinceLastReminder < 3) {
        console.log(
          `⏭️  Skipping overdue reminder for installment ${installment.installmentNumber} - sent ${daysSinceLastReminder} days ago`
        )
        result.details.alreadySent++
        return
      }
    }

    console.log(
      `🚨 Sending OVERDUE reminder for ${installment.fee_plans.lead.studentName} - Installment ${installment.installmentNumber} (${daysOverdue} days overdue)`
    )

    const lead = installment.fee_plans.lead

    const reminderSent = await notificationService.sendPaymentReminder({
      leadId: lead.id,
      studentName: lead.studentName,
      email: lead.email || undefined,
      phone: lead.phone,
      amount: Number(installment.amount),
      dueDate: installment.dueDate,
      installmentNumber: installment.installmentNumber,
      isOverdue: true,
      priority: 'URGENT',
      channels: config.channels,
    })

    if (reminderSent) {
      await prisma.installments.update({
        where: { id: installment.id },
        data: {
          remindersSent: {
            ...remindersSent,
            overdue: now.toISOString(),
          },
        },
      })

      if (remindersSent.overdue === undefined) {
        await prisma.installments.update({
          where: { id: installment.id },
          data: { status: 'OVERDUE' },
        })
      }

      result.remindersSent++

      if (config.createTasksForOverdue) {
        await this.createFollowUpTask(lead, installment, 'OVERDUE')
        result.tasksCreated++
      }
    }
  }

  /**
   * Handle upcoming installment reminder
   */
  private async handleUpcomingInstallment(
    installment: any,
    daysUntilDue: number,
    config: PaymentReminderConfig,
    result: ReminderResult
  ) {
    const remindersSent = (installment.remindersSent as any) || {}
    const reminderKey = `${daysUntilDue}_days`

    if (remindersSent[reminderKey]) {
      console.log(
        `⏭️  Skipping reminder for installment ${installment.installmentNumber} - ${daysUntilDue} day reminder already sent`
      )
      result.details.alreadySent++
      return
    }

    console.log(
      `⏰ Sending ${daysUntilDue}-day reminder for ${installment.fee_plans.lead.studentName} - Installment ${installment.installmentNumber}`
    )

    const lead = installment.fee_plans.lead

    const priority = this.getPriorityByDaysRemaining(daysUntilDue)

    const reminderSent = await notificationService.sendPaymentReminder({
      leadId: lead.id,
      studentName: lead.studentName,
      email: lead.email || undefined,
      phone: lead.phone,
      amount: Number(installment.amount),
      dueDate: installment.dueDate,
      installmentNumber: installment.installmentNumber,
      isOverdue: false,
      priority,
      channels: config.channels,
    })

    if (reminderSent) {
      await prisma.installments.update({
        where: { id: installment.id },
        data: {
          remindersSent: {
            ...remindersSent,
            [reminderKey]: new Date().toISOString(),
          },
        },
      })

      result.remindersSent++

      if (daysUntilDue === 1) {
        await this.createFollowUpTask(lead, installment, 'DUE_TOMORROW')
        result.tasksCreated++
      }
    }
  }

  /**
   * Create follow-up task for counselor
   */
  private async createFollowUpTask(
    lead: any,
    installment: any,
    urgency: 'OVERDUE' | 'DUE_TOMORROW'
  ) {
    const existingTask = await prisma.task.findFirst({
      where: {
        leadId: lead.id,
        type: 'PAYMENT_REMINDER',
        status: { in: ['PENDING', 'IN_PROGRESS'] },
        description: {
          contains: `Installment ${installment.installmentNumber}`,
        },
      },
    })

    if (existingTask) {
      console.log(`⏭️  Task already exists for installment ${installment.installmentNumber}`)
      return
    }

    const title =
      urgency === 'OVERDUE'
        ? `URGENT: Overdue Payment - ${lead.studentName}`
        : `Payment Due Tomorrow - ${lead.studentName}`

    const description = `Installment ${installment.installmentNumber} payment reminder

Amount: ₹${Number(installment.amount).toLocaleString('en-IN')}
Due Date: ${format(installment.dueDate, 'MMM dd, yyyy')}
Status: ${urgency === 'OVERDUE' ? 'OVERDUE' : 'Due Tomorrow'}

Action Required:
- Follow up via WhatsApp/call
- Confirm payment status
- Offer assistance if needed
- Update installment status after payment`

    await prisma.task.create({
      data: {
        leadId: lead.id,
        title,
        description,
        type: 'PAYMENT_REMINDER',
        priority: urgency === 'OVERDUE' ? 'HIGH' : 'MEDIUM',
        status: 'PENDING',
        dueDate: urgency === 'OVERDUE' ? new Date() : installment.dueDate,
        assignedToId: lead.assignedToId,
        isAutoGenerated: true,
        triggerEvent: 'payment_reminder_automation',
      },
    })

    await prisma.activity.create({
      data: {
        userId: lead.assignedToId,
        leadId: lead.id,
        action: 'TASK_CREATED',
        description: `Auto-created payment reminder task for Installment ${installment.installmentNumber}`,
        metadata: {
          taskType: 'PAYMENT_REMINDER',
          installmentId: installment.id,
          urgency,
        },
      },
    })

    console.log(`✅ Created ${urgency} task for ${lead.studentName}`)
  }

  /**
   * Get priority based on days remaining
   */
  private getPriorityByDaysRemaining(daysRemaining: number): NotificationPriority {
    if (daysRemaining <= 1) return 'HIGH'
    if (daysRemaining <= 3) return 'MEDIUM'
    return 'LOW'
  }

  /**
   * Send payment reminder for specific installment
   * (Can be called manually by counselor or via API)
   */
  async sendManualReminder(
    installmentId: string,
    channels: ('email' | 'whatsapp' | 'sms')[] = ['whatsapp', 'email']
  ): Promise<boolean> {
    try {
      const installment = await prisma.installments.findUnique({
        where: { id: installmentId },
        include: {
          fee_plans: {
            include: {
              lead: true,
            },
          },
        },
      })

      if (!installment) {
        throw new Error('Installment not found')
      }

      if (installment.status === 'PAID') {
        console.log('⏭️  Installment already paid, skipping reminder')
        return false
      }

      const lead = installment.fee_plans.lead
      const now = new Date()
      const daysUntilDue = differenceInDays(installment.dueDate, now)
      const isOverdue = daysUntilDue < 0

      console.log(
        `📤 Sending manual reminder for ${lead.studentName} - Installment ${installment.installmentNumber}`
      )

      const reminderSent = await notificationService.sendPaymentReminder({
        leadId: lead.id,
        studentName: lead.studentName,
        email: lead.email || undefined,
        phone: lead.phone,
        amount: Number(installment.amount),
        dueDate: installment.dueDate,
        installmentNumber: installment.installmentNumber,
        isOverdue,
        priority: isOverdue ? 'URGENT' : 'MEDIUM',
        channels,
      })

      if (reminderSent) {
        const remindersSent = (installment.remindersSent as any) || {}

        await prisma.installments.update({
          where: { id: installmentId },
          data: {
            remindersSent: {
              ...remindersSent,
              manual: new Date().toISOString(),
            },
          },
        })

        await prisma.activity.create({
          data: {
            userId: lead.assignedToId,
            leadId: lead.id,
            action: 'PAYMENT_REMINDER_SENT',
            description: `Manual payment reminder sent for Installment ${installment.installmentNumber}`,
            metadata: {
              installmentId,
              channels,
              amount: Number(installment.amount).toLocaleString('en-IN'),
            },
          },
        })
      }

      return reminderSent
    } catch (error) {
      console.error('Error sending manual reminder:', error)
      throw error
    }
  }

  /**
   * Mark installment as paid
   * Updates status and triggers enrollment if all installments are paid
   */
  async markInstallmentAsPaid(
    installmentId: string,
    paymentDetails: {
      paidAmount: number
      paymentMethod: string
      razorpayPaymentId?: string
      userId: string
    }
  ): Promise<void> {
    try {
      await prisma.$transaction(async (tx) => {
        const installment = await tx.installments.update({
          where: { id: installmentId },
          data: {
            status: 'PAID',
            paidAt: new Date(),
            paidAmount: paymentDetails.paidAmount,
            razorpayPaymentId: paymentDetails.razorpayPaymentId,
          },
          include: {
            fee_plans: {
              include: {
                installments: true,
                lead: true,
              },
            },
          },
        })

        await tx.fee_payments.create({
          data: {
            feePlanId: installment.feePlanId,
            installmentId: installment.id,
            amount: paymentDetails.paidAmount,
            paymentMethod: paymentDetails.paymentMethod,
            razorpayPaymentId: paymentDetails.razorpayPaymentId,
            status: 'COMPLETED',
            paidAt: new Date(),
          },
        })

        const updatedAmountPaid =
          Number(installment.fee_plans.amountPaid) + paymentDetails.paidAmount

        await tx.fee_plans.update({
          where: { id: installment.feePlanId },
          data: {
            amountPaid: updatedAmountPaid,
            amountDue: Number(installment.fee_plans.totalFee) - updatedAmountPaid,
            status:
              updatedAmountPaid >= Number(installment.fee_plans.totalFee) ? 'COMPLETED' : 'PARTIAL',
          },
        })

        const allPaid = installment.fee_plans.installments.every(
          (inst) => inst.status === 'PAID' || inst.id === installmentId
        )

        if (allPaid && installment.fee_plans.lead.stage !== 'ENROLLED') {
          await tx.lead.update({
            where: { id: installment.fee_plans.leadId },
            data: {
              stage: 'ENROLLED',
              convertedAt: new Date(),
            },
          })

          await tx.activity.create({
            data: {
              userId: paymentDetails.userId,
              leadId: installment.fee_plans.leadId,
              action: 'LEAD_ENROLLED',
              description: `Lead converted to ENROLLED - All payments completed`,
              metadata: {
                feePlanId: installment.feePlanId,
                totalAmount: Number(installment.fee_plans.totalFee),
              },
            },
          })

          console.log(
            `🎉 Lead ${installment.fee_plans.lead.studentName} ENROLLED - All payments completed!`
          )
        }

        await tx.activity.create({
          data: {
            userId: paymentDetails.userId,
            leadId: installment.fee_plans.leadId,
            action: 'PAYMENT_RECEIVED',
            description: `Payment received for Installment ${installment.installmentNumber} - ₹${paymentDetails.paidAmount.toLocaleString('en-IN')}`,
            metadata: {
              installmentId,
              amount: paymentDetails.paidAmount,
              paymentMethod: paymentDetails.paymentMethod,
            },
          },
        })
      })

      console.log(`✅ Installment ${installmentId} marked as PAID`)
    } catch (error) {
      console.error('Error marking installment as paid:', error)
      throw error
    }
  }

  /**
   * Get upcoming reminders for a lead
   */
  async getUpcomingRemindersForLead(leadId: string): Promise<any[]> {
    const now = new Date()
    const sevenDaysFromNow = addDays(now, 7)

    const installments = await prisma.installments.findMany({
      where: {
        fee_plans: {
          leadId,
        },
        status: {
          in: ['PENDING', 'OVERDUE'],
        },
        dueDate: {
          lte: sevenDaysFromNow,
        },
      },
      include: {
        fee_plans: {
          include: {
            lead: true,
          },
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    })

    return installments.map((inst) => ({
      installmentId: inst.id,
      installmentNumber: inst.installmentNumber,
      amount: inst.amount,
      dueDate: inst.dueDate,
      status: inst.status,
      daysUntilDue: differenceInDays(inst.dueDate, now),
      remindersSent: inst.remindersSent,
    }))
  }

  /**
   * Get overdue installments summary
   */
  async getOverdueSummary(): Promise<{
    totalOverdue: number
    totalAmount: number
    byLead: Array<{
      leadId: string
      studentName: string
      overdueCount: number
      overdueAmount: number
    }>
  }> {
    const now = new Date()

    const overdueInstallments = await prisma.installments.findMany({
      where: {
        status: {
          in: ['PENDING', 'OVERDUE'],
        },
        dueDate: {
          lt: now,
        },
      },
      include: {
        fee_plans: {
          include: {
            lead: true,
          },
        },
      },
    })

    const byLead = new Map<
      string,
      { leadId: string; studentName: string; overdueCount: number; overdueAmount: number }
    >()

    let totalAmount = 0

    for (const inst of overdueInstallments) {
      const lead = inst.fee_plans.lead
      const amount = Number(inst.amount)
      totalAmount += amount

      if (!byLead.has(lead.id)) {
        byLead.set(lead.id, {
          leadId: lead.id,
          studentName: lead.studentName,
          overdueCount: 0,
          overdueAmount: 0,
        })
      }

      const entry = byLead.get(lead.id)!
      entry.overdueCount++
      entry.overdueAmount += amount
    }

    return {
      totalOverdue: overdueInstallments.length,
      totalAmount,
      byLead: Array.from(byLead.values()),
    }
  }
}

export const paymentReminderService = new PaymentReminderService()
