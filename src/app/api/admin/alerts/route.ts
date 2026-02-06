import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'
import { notificationService } from '@/lib/notifications/notificationService'

const sendAlertSchema = z.object({
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(1, 'Message is required').max(5000),
  recipientType: z.enum(['ALL_STUDENTS', 'BY_TIER', 'BY_COURSE', 'ALL_PARENTS', 'CUSTOM']),
  tierFilter: z.enum(['PURSUIT', 'ASCENT', 'PINNACLE']).optional(),
  courseId: z.string().optional(),
  studentIds: z.array(z.string()).optional(),
  channels: z.object({
    email: z.boolean().default(false),
    whatsapp: z.boolean().default(false),
    sms: z.boolean().default(false),
  }),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
})

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminAuth()

    const body = await request.json()
    const validatedData = sendAlertSchema.parse(body)

    let recipients: { id: string; name: string; email: string; phone: string | null }[] = []

    switch (validatedData.recipientType) {
      case 'ALL_STUDENTS':
        recipients = await prisma.users.findMany({
          where: { role: 'STUDENT' },
          select: { id: true, name: true, email: true, phone: true },
        })
        break
      case 'BY_TIER':
        if (validatedData.tierFilter) {
          recipients = await prisma.users.findMany({
            where: {
              role: 'STUDENT',
              coachingTier: validatedData.tierFilter as any,
            },
            select: { id: true, name: true, email: true, phone: true },
          })
        }
        break
      case 'BY_COURSE':
        if (validatedData.courseId) {
          const enrollments = await prisma.enrollments.findMany({
            where: {
              courseId: validatedData.courseId,
              status: { in: ['ACTIVE', 'PENDING'] },
            },
            include: {
              users: { select: { id: true, name: true, email: true, phone: true } },
            },
          })
          recipients = enrollments.map((e) => e.users)
        }
        break
      case 'ALL_PARENTS':
        recipients = await prisma.users.findMany({
          where: { role: 'PARENT' },
          select: { id: true, name: true, email: true, phone: true },
        })
        break
      case 'CUSTOM':
        if (validatedData.studentIds?.length) {
          recipients = await prisma.users.findMany({
            where: { id: { in: validatedData.studentIds } },
            select: { id: true, name: true, email: true, phone: true },
          })
        }
        break
    }

    if (recipients.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No recipients found for the selected criteria' },
        { status: 400 }
      )
    }

    const alertId = uuidv4()

    const alert = await prisma.content_notifications.create({
      data: {
        id: alertId,
        title: validatedData.subject,
        message: validatedData.message,
        type: 'ANNOUNCEMENT',
        targetUserIds: recipients.map((r) => r.id),
        sendToAll: validatedData.recipientType === 'ALL_STUDENTS',
        channels: validatedData.channels,
        status: 'SENDING',
        recipientCount: recipients.length,
        updatedAt: new Date(),
      },
    })

    let deliveredCount = 0
    let failedCount = 0

    // Fire-and-forget: send notifications in background
    const sendPromises = recipients.map(async (recipient) => {
      try {
        const result = await notificationService.send({
          studentName: recipient.name,
          email: recipient.email,
          phone: recipient.phone || '',
          type: 'GENERAL',
          priority: validatedData.priority,
          emailData: validatedData.channels.email
            ? {
                subject: validatedData.subject,
                html: `<h2>${validatedData.subject}</h2><p>${validatedData.message.replace(/\n/g, '<br/>')}</p><p style="color: #666; font-size: 12px;">- Cerebrum Biology Academy</p>`,
              }
            : undefined,
          whatsappData: validatedData.channels.whatsapp
            ? { message: `${validatedData.subject}\n\n${validatedData.message}` }
            : undefined,
          smsData: validatedData.channels.sms
            ? {
                message: `CEREBRUM: ${validatedData.subject} - ${validatedData.message.substring(0, 140)}`,
              }
            : undefined,
          customChannels: validatedData.channels,
        })

        if (result.success) {
          deliveredCount++
        } else {
          failedCount++
        }
      } catch {
        failedCount++
      }
    })

    await Promise.allSettled(sendPromises)

    await prisma.content_notifications.update({
      where: { id: alertId },
      data: {
        status: failedCount === recipients.length ? 'FAILED' : 'SENT',
        sentAt: new Date(),
        deliveredCount,
        failedCount,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: `Alert sent to ${deliveredCount} of ${recipients.length} recipients`,
      data: {
        alertId,
        recipientCount: recipients.length,
        deliveredCount,
        failedCount,
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Send alert error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send alert' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    const [alerts, total] = await Promise.all([
      prisma.content_notifications.findMany({
        where: { type: { in: ['ANNOUNCEMENT', 'CUSTOM'] } },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.content_notifications.count({
        where: { type: { in: ['ANNOUNCEMENT', 'CUSTOM'] } },
      }),
    ])

    const totalSent = await prisma.content_notifications.count({
      where: {
        type: { in: ['ANNOUNCEMENT', 'CUSTOM'] },
        status: 'SENT',
      },
    })

    const deliveryStats = await prisma.content_notifications.aggregate({
      where: { type: { in: ['ANNOUNCEMENT', 'CUSTOM'] } },
      _sum: { deliveredCount: true, recipientCount: true, failedCount: true },
    })

    return NextResponse.json({
      success: true,
      data: {
        alerts,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        stats: {
          totalSent,
          totalRecipients: deliveryStats._sum.recipientCount || 0,
          totalDelivered: deliveryStats._sum.deliveredCount || 0,
          totalFailed: deliveryStats._sum.failedCount || 0,
        },
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Fetch alerts error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch alerts' },
      { status: 500 }
    )
  }
}
