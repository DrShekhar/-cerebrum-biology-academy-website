import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/utils/logger'
import { sendWhatsAppMessage, isInteraktConfigured } from '@/lib/interakt'

/**
 * Demo Reminders Cron Job
 * Sends WhatsApp reminders to students at:
 * - 24 hours before demo
 * - 1 hour before demo
 * - 15 minutes before demo
 *
 * Run every 15 minutes via Vercel cron
 */

// Vercel Cron invokes registered paths with GET (Authorization: Bearer CRON_SECRET),
// so GET must run the real processing — a 405 stub here means no reminder ever sends.
async function handleCron(request: NextRequest) {
  try {
    // Verify cron authentication
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (!cronSecret) {
      logger.error('CRON_SECRET not configured')
      return NextResponse.json(
        { success: false, error: 'Cron configuration error' },
        { status: 500 }
      )
    }

    if (authHeader !== `Bearer ${cronSecret}`) {
      logger.warn('Unauthorized demo reminders cron attempt')
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    // WhatsApp config gates only the WhatsApp channel — web push still runs.
    // Bail only when NO channel is configured at all.
    const { isPushConfigured } = await import('@/lib/push/webPush')
    if (!isInteraktConfigured() && !isPushConfigured()) {
      logger.warn('Neither WhatsApp nor web push configured, skipping demo reminders')
      return NextResponse.json({
        success: true,
        message: 'No reminder channel configured, nothing sent',
        stats: { processed: 0, sent24h: 0, sent1h: 0, sent15m: 0 },
      })
    }
    if (!isInteraktConfigured()) {
      logger.warn('Interakt WhatsApp not configured — demo reminders send web push only')
    }

    const result = await processDemoReminders()

    logger.info('Demo reminders cron completed', result)

    return NextResponse.json({
      success: true,
      message: 'Demo reminders processed successfully',
      stats: result,
    })
  } catch (error) {
    logger.error('Error in demo reminders cron job:', { error })
    return NextResponse.json(
      {
        success: false,
        error: 'Demo reminder processing failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

async function processDemoReminders() {
  const now = new Date()
  const stats = {
    processed: 0,
    sent24h: 0,
    sent1h: 0,
    sent15m: 0,
    errors: 0,
  }

  // Get demos in the next 25 hours that haven't been fully reminded
  const twentyFiveHoursFromNow = new Date(now.getTime() + 25 * 60 * 60 * 1000)
  const todayStr = now.toISOString().split('T')[0]
  const tomorrowStr = twentyFiveHoursFromNow.toISOString().split('T')[0]

  const upcomingDemos = await prisma.demo_bookings.findMany({
    where: {
      status: { in: ['PENDING', 'CONFIRMED'] },
      preferredDate: {
        in: [todayStr, tomorrowStr],
      },
      remindersSent: { lt: 3 }, // Max 3 reminders
    },
    select: {
      id: true,
      userId: true,
      studentName: true,
      email: true,
      phone: true,
      preferredDate: true,
      preferredTime: true,
      remindersSent: true,
    },
  })

  stats.processed = upcomingDemos.length

  for (const demo of upcomingDemos) {
    try {
      const demoDateTime = parseDemoDateTime(demo.preferredDate, demo.preferredTime)
      if (!demoDateTime) continue

      const hoursUntilDemo = (demoDateTime.getTime() - now.getTime()) / (1000 * 60 * 60)

      // Skip if demo is in the past
      if (hoursUntilDemo < 0) continue

      // Determine which reminder to send based on time and remindersSent count
      let reminderType: '24h' | '1h' | '15m' | null = null

      if (hoursUntilDemo <= 24 && hoursUntilDemo > 1 && demo.remindersSent < 1) {
        reminderType = '24h'
      } else if (hoursUntilDemo <= 1 && hoursUntilDemo > 0.25 && demo.remindersSent < 2) {
        reminderType = '1h'
      } else if (hoursUntilDemo <= 0.25 && hoursUntilDemo > 0 && demo.remindersSent < 3) {
        reminderType = '15m'
      }

      if (reminderType) {
        // WhatsApp (skipped cleanly when Interakt is unconfigured)…
        const waSent = isInteraktConfigured() ? await sendDemoReminder(demo, reminderType) : false

        // …and web push, independently (no-op without VAPID keys).
        let pushSent = false
        if (demo.userId) {
          const timeLabel =
            reminderType === '24h'
              ? 'tomorrow'
              : reminderType === '1h'
                ? 'in 1 hour'
                : 'in 15 minutes'
          try {
            const { sendPushToUser } = await import('@/lib/push/webPush')
            const res = await sendPushToUser(demo.userId, {
              title: 'Demo class reminder',
              body: `Your NEET Biology demo class is ${timeLabel} (${demo.preferredTime}). See you there!`,
              url: '/dashboard/student',
              tag: `demo-reminder-${demo.id}`,
            })
            pushSent = res.sent > 0
          } catch {
            /* push is best-effort */
          }
        }

        // Count the reminder as sent if either channel delivered — otherwise the
        // cron would re-fire it every 15 minutes.
        const success = waSent || pushSent

        if (success) {
          // Update remindersSent count
          await prisma.demo_bookings.update({
            where: { id: demo.id },
            data: {
              remindersSent: demo.remindersSent + 1,
              updatedAt: new Date(),
            },
          })

          if (reminderType === '24h') stats.sent24h++
          else if (reminderType === '1h') stats.sent1h++
          else if (reminderType === '15m') stats.sent15m++
        } else {
          stats.errors++
        }
      }
    } catch (error) {
      logger.error('Error processing demo reminder', { demoId: demo.id, error })
      stats.errors++
    }
  }

  return stats
}

function parseDemoDateTime(dateStr: string, timeStr: string): Date | null {
  try {
    // Extract time from formats like "10:00", "10:00 AM", "10:00 AM - 11:00 AM"
    const timeMatch = timeStr.match(/^(\d{1,2}):(\d{2})/)
    if (!timeMatch) return null

    let hours = parseInt(timeMatch[1], 10)
    const minutes = parseInt(timeMatch[2], 10)

    // Handle AM/PM
    const isPM = /PM/i.test(timeStr)
    const isAM = /AM/i.test(timeStr)

    if (isPM && hours < 12) hours += 12
    if (isAM && hours === 12) hours = 0

    // Create date object (dateStr is YYYY-MM-DD format)
    const date = new Date(
      `${dateStr}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`
    )

    return isNaN(date.getTime()) ? null : date
  } catch {
    return null
  }
}

async function sendDemoReminder(
  demo: {
    id: string
    studentName: string
    phone: string
    preferredDate: string
    preferredTime: string
  },
  type: '24h' | '1h' | '15m'
): Promise<boolean> {
  const timeMessages = {
    '24h': '24 hours',
    '1h': '1 hour',
    '15m': '15 minutes',
  }

  try {
    // Use class_reminder template with params: name, time_remaining, subject, topic, faculty_name, join_link
    const result = await sendWhatsAppMessage({
      phone: demo.phone,
      templateName: 'class_reminder',
      templateParams: {
        '1': demo.studentName,
        '2': timeMessages[type],
        '3': 'Biology',
        '4': 'NEET Demo Class',
        '5': 'Dr. Shekhar',
        '6': 'Zoom link will be shared shortly',
      },
    })

    if (result.success) {
      logger.info('Demo reminder sent', {
        demoId: demo.id,
        type,
        phone: demo.phone.slice(-4),
      })
      return true
    } else {
      logger.warn('Demo reminder failed', {
        demoId: demo.id,
        type,
        error: result.error,
      })
      return false
    }
  } catch (error) {
    logger.error('Error sending demo reminder', { demoId: demo.id, type, error })
    return false
  }
}

export async function GET(request: NextRequest) {
  return handleCron(request)
}

export async function POST(request: NextRequest) {
  return handleCron(request)
}
