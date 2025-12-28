/**
 * LMS WhatsApp Bot API
 *
 * Handles incoming WhatsApp messages for LMS features.
 * Integrates with the existing Interakt webhook system.
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { whatsappLmsBot } from '@/lib/lms/whatsappLmsBot'

interface IncomingMessage {
  phone: string
  messageType: 'text' | 'button' | 'list'
  text?: string
  buttonId?: string
  listRowId?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...data } = body

    switch (action) {
      case 'process_message': {
        // Process incoming WhatsApp message for LMS
        const message: IncomingMessage = data

        if (!message.phone) {
          return NextResponse.json(
            { success: false, error: 'Phone number is required' },
            { status: 400 }
          )
        }

        // Normalize phone number
        const phone = message.phone.replace(/\D/g, '')

        // Find user by phone
        const user = await prisma.users.findFirst({
          where: {
            OR: [{ phone: phone }, { phone: `+${phone}` }, { phone: `+91${phone}` }],
          },
          select: { id: true, name: true },
        })

        if (!user) {
          return NextResponse.json({
            success: true,
            response: {
              text: `Welcome to Cerebrum Biology Academy LMS!

You don't have an active account yet. Please visit our website to enroll in a course:
https://cerebrumbiologyacademy.com/courses

After enrollment, you'll be able to access your courses here.`,
            },
          })
        }

        // Process the message
        const response = await whatsappLmsBot.processLmsMessage({
          phone,
          userId: user.id,
          messageText: message.text || '',
          buttonId: message.buttonId,
          listRowId: message.listRowId,
        })

        return NextResponse.json({
          success: true,
          response,
        })
      }

      case 'send_reminder': {
        // Send study reminder to user
        const { userId } = data

        if (!userId) {
          return NextResponse.json({ success: false, error: 'userId is required' }, { status: 400 })
        }

        await whatsappLmsBot.sendStudyReminder(userId)

        return NextResponse.json({
          success: true,
          message: 'Reminder sent',
        })
      }

      case 'send_milestone': {
        // Send progress milestone notification
        const { userId, milestone, courseName } = data

        if (!userId || !milestone || !courseName) {
          return NextResponse.json(
            { success: false, error: 'userId, milestone, and courseName are required' },
            { status: 400 }
          )
        }

        await whatsappLmsBot.sendProgressMilestone(userId, milestone, courseName)

        return NextResponse.json({
          success: true,
          message: 'Milestone notification sent',
        })
      }

      case 'send_bulk_reminders': {
        // Send reminders to inactive users (called by cron)
        const inactiveThresholdDays = data.daysInactive || 3

        // Find users who haven't watched anything in X days
        const cutoffDate = new Date(Date.now() - inactiveThresholdDays * 24 * 60 * 60 * 1000)

        const inactiveUsers = await prisma.lms_whatsapp_sessions.findMany({
          where: {
            notificationsEnabled: true,
            lastInteractionAt: {
              lt: cutoffDate,
            },
          },
          select: { userId: true },
          take: 50, // Limit batch size
        })

        let sent = 0
        for (const session of inactiveUsers) {
          try {
            await whatsappLmsBot.sendStudyReminder(session.userId)
            sent++
          } catch (error) {
            console.error(`Failed to send reminder to ${session.userId}:`, error)
          }
        }

        return NextResponse.json({
          success: true,
          message: `Sent ${sent} reminders`,
          total: inactiveUsers.length,
          sent,
        })
      }

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action',
            validActions: [
              'process_message',
              'send_reminder',
              'send_milestone',
              'send_bulk_reminders',
            ],
          },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('LMS WhatsApp API error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  // Get bot status and stats
  const totalSessions = await prisma.lms_whatsapp_sessions.count()
  const activeSessions = await prisma.lms_whatsapp_sessions.count({
    where: {
      lastInteractionAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
      },
    },
  })

  const notificationsSent = await prisma.lms_progress_notifications.count({
    where: {
      sentAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  })

  return NextResponse.json({
    service: 'LMS WhatsApp Bot',
    status: 'active',
    stats: {
      totalSessions,
      activeLast24h: activeSessions,
      notificationsSentLast24h: notificationsSent,
    },
    commands: [
      'menu - Main menu',
      'courses - My courses',
      'continue - Continue watching',
      'progress - My progress',
      'help - Get help',
      'back - Go back',
    ],
    usage: {
      processMessage: 'POST with action="process_message", phone, text/buttonId/listRowId',
      sendReminder: 'POST with action="send_reminder", userId',
      sendMilestone: 'POST with action="send_milestone", userId, milestone, courseName',
      sendBulkReminders: 'POST with action="send_bulk_reminders", daysInactive (optional)',
    },
  })
}
