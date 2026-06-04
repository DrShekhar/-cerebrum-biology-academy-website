import { inngest } from '../client'
import { prisma } from '@/lib/prisma'
import { notificationService } from '@/lib/notifications/notificationService'

const REMINDER_SCHEDULE_HOURS = [24, 72, 168] // +1d, +3d, +7d after createdAt
const MAX_REMINDERS = REMINDER_SCHEDULE_HOURS.length

/**
 * Scheduled reminder job for counselor-issued payment links.
 *
 * Cron runs every 6 hours and finds payment_links where:
 *   - status = ACTIVE (not yet paid, not cancelled, not expired)
 *   - expiresAt is in the future
 *   - remindersSent < MAX_REMINDERS
 *   - createdAt + REMINDER_SCHEDULE_HOURS[remindersSent] hours <= now
 *
 * Sends a WhatsApp + email nudge via notificationService (which logs
 * to crm_communications). Increments remindersSent and stamps
 * lastReminderAt so the next tick doesn't re-fire.
 *
 * Counselor sees the reminder activity in the lead timeline.
 */
export const paymentLinkReminders = inngest.createFunction(
  {
    id: 'payment-link-reminders',
    name: 'Payment Link Reminders',
    triggers: [{ cron: '0 */6 * * *' }], // every 6 hours
  },
  async ({ step, logger }) => {
    const now = new Date()

    const due = await step.run('fetch-due-reminders', async () => {
      return prisma.payment_links.findMany({
        where: {
          status: 'ACTIVE',
          expiresAt: { gt: now },
          remindersSent: { lt: MAX_REMINDERS },
        },
        include: {
          leads: {
            select: {
              id: true,
              studentName: true,
              email: true,
              phone: true,
              assignedToId: true,
            },
          },
        },
        take: 100, // safety cap per tick
      })
    })

    if (due.length === 0) {
      return { processed: 0 }
    }

    logger.info(`payment-link-reminders: ${due.length} candidates`)

    let sent = 0
    let skipped = 0

    for (const link of due) {
      const ageMs = now.getTime() - link.createdAt.getTime()
      const ageHours = ageMs / (1000 * 60 * 60)
      const requiredHours = REMINDER_SCHEDULE_HOURS[link.remindersSent]
      if (ageHours < requiredHours) {
        skipped++
        continue
      }

      const reminderNumber = link.remindersSent + 1
      const amount = Number(link.amount)
      const symbol = link.currency === 'USD' ? '$' : '₹'
      const amountLabel = `${symbol}${amount.toLocaleString(
        link.currency === 'USD' ? 'en-US' : 'en-IN'
      )}`
      const expiresIn = Math.max(
        0,
        Math.ceil((link.expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      )

      const subject = `Reminder ${reminderNumber}/${MAX_REMINDERS}: complete your payment — Cerebrum Biology Academy`
      const html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 560px;">
          <p>Hi ${link.leads.studentName},</p>
          <p>Your payment of <strong>${amountLabel}</strong> for ${link.description} is still pending.</p>
          <p>The payment link expires in <strong>${expiresIn} day${expiresIn === 1 ? '' : 's'}</strong>.</p>
          <p><a href="${link.shortUrl}" style="display:inline-block;background:#4f46e5;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;">Pay ${amountLabel}</a></p>
          <p>If you've already paid, please ignore this message.</p>
          <p>— Cerebrum Biology Academy</p>
        </div>
      `
      const whatsappMessage = `Reminder ${reminderNumber}/${MAX_REMINDERS}: your payment of ${amountLabel} for ${link.description} is pending. Link expires in ${expiresIn} day${expiresIn === 1 ? '' : 's'}.\n\n${link.shortUrl}\n\nIf you've already paid, ignore this. — Cerebrum Biology Academy`

      const result = await step.run(`notify-${link.id}-${reminderNumber}`, async () => {
        return notificationService.send({
          leadId: link.leads.id,
          studentName: link.leads.studentName,
          email: link.leads.email ?? undefined,
          phone: link.leads.phone,
          type: 'PAYMENT_REMINDER',
          priority: reminderNumber === MAX_REMINDERS ? 'HIGH' : 'MEDIUM',
          emailData: { subject, html },
          whatsappData: { message: whatsappMessage },
        })
      })

      if (result.success) {
        await step.run(`bump-${link.id}-${reminderNumber}`, async () => {
          await prisma.payment_links.update({
            where: { id: link.id },
            data: {
              remindersSent: { increment: 1 },
              lastReminderAt: now,
            },
          })
        })
        sent++
      } else {
        logger.warn(`Reminder failed for payment_link ${link.id}`, { result })
      }
    }

    return { processed: due.length, sent, skipped }
  }
)
