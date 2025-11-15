import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit } from '@/lib/rateLimit'
import { zoomService } from '@/lib/zoom/zoomService'
import { prisma } from '@/lib/prisma'
import { notificationService } from '@/lib/notifications/notificationService'
import { logger } from '@/lib/utils/logger'

const demoBookingSchema = z.object({
  studentName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{9,14}$/),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?/),
  preferredTime: z.string().regex(/^\d{2}:\d{2}$/),
  courseInterest: z.string().min(1).max(100),
  studentClass: z.string().min(1).max(50),
  previousKnowledge: z.string().max(1000),
  specificTopics: z.array(z.string()).optional(),
  parentName: z.string().max(100).optional(),
  parentPhone: z
    .string()
    .regex(/^\+?[1-9]\d{9,14}$/)
    .optional(),
  hearAboutUs: z.string().max(200).optional(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  utmContent: z.string().max(100).optional(),
})

type DemoBookingRequest = z.infer<typeof demoBookingSchema>

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request, { maxRequests: 10, windowMs: 60 * 60 * 1000 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
          },
        }
      )
    }

    const rawBody = await request.json()
    const validationResult = demoBookingSchema.safeParse(rawBody)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid input data',
          details: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    const body = validationResult.data

    // Validate required fields
    const requiredFields: (keyof DemoBookingRequest)[] = [
      'studentName',
      'email',
      'phone',
      'preferredDate',
      'preferredTime',
      'courseInterest',
    ]
    const missingFields = requiredFields.filter((field) => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`,
        },
        { status: 400 }
      )
    }

    // Validate date (must be future date)
    const selectedDate = new Date(body.preferredDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate <= today) {
      return NextResponse.json(
        {
          success: false,
          error: 'Demo date must be in the future',
        },
        { status: 400 }
      )
    }

    // Check if slot is available
    const availableSlots = await zoomService.getAvailableSlots(selectedDate)
    if (!availableSlots.includes(body.preferredTime)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Selected time slot is not available',
        },
        { status: 400 }
      )
    }

    // Create Zoom meeting
    const meetingResponse = await zoomService.createDemoMeeting({
      studentName: body.studentName,
      email: body.email,
      phone: body.phone,
      preferredDate: selectedDate,
      preferredTime: body.preferredTime,
      courseInterest: body.courseInterest,
      studentClass: body.studentClass,
      previousKnowledge: body.previousKnowledge,
      specificTopics: body.specificTopics || [],
    })

    if (!meetingResponse) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create demo meeting. Please try again.',
        },
        { status: 500 }
      )
    }

    // Step 1: Get or create first available counselor (for round-robin assignment)
    let assignedCounselor = await prisma.user.findFirst({
      where: { role: 'COUNSELOR' },
      orderBy: { createdAt: 'asc' },
    })

    // If no counselor exists, create a default one for testing
    if (!assignedCounselor) {
      logger.warn('No counselor found, creating default counselor for testing', {
        action: 'auto_create_counselor',
      })
      assignedCounselor = await prisma.user.create({
        data: {
          email: 'counselor@cerebrumbiologyacademy.com',
          name: 'Default Counselor',
          role: 'COUNSELOR',
          phone: '+919876543210',
        },
      })
    }

    // Step 2: Save DemoBooking to database
    const demoBooking = await prisma.demoBooking.create({
      data: {
        studentName: body.studentName,
        email: body.email,
        phone: body.phone,
        studentClass: body.studentClass as any,
        preferredDate: new Date(body.preferredDate),
        preferredTime: body.preferredTime,
        message: body.previousKnowledge,
        status: 'CONFIRMED',
        source: body.hearAboutUs || 'Website',
        utmSource: body.utmSource,
        utmMedium: body.utmMedium,
        utmCampaign: body.utmCampaign,
        assignedTo: assignedCounselor.id,
        notificationsSent: {
          whatsapp: false,
          email: false,
        },
      },
    })

    // Step 3: Auto-create Lead from DemoBooking
    const lead = await prisma.lead.create({
      data: {
        studentName: body.studentName,
        email: body.email,
        phone: body.phone,
        courseInterest: body.courseInterest,
        stage: 'DEMO_SCHEDULED',
        priority: 'HOT',
        source: body.hearAboutUs || 'Website - Demo Booking',
        assignedToId: assignedCounselor.id,
        demoBookingId: demoBooking.id,
        nextFollowUpAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      },
    })

    // Step 4: Create initial follow-up task for counselor
    const followUpDate = new Date()
    followUpDate.setHours(followUpDate.getHours() + 2) // Follow up in 2 hours

    await prisma.task.create({
      data: {
        title: `Follow up on demo booking - ${body.studentName}`,
        description: `New demo class booked for ${body.studentName} (${body.courseInterest}). Demo scheduled for ${body.preferredDate} at ${body.preferredTime}. Please call to confirm attendance.`,
        type: 'FOLLOW_UP_CALL',
        priority: 'HIGH',
        dueDate: followUpDate,
        status: 'PENDING',
        leadId: lead.id,
        assignedToId: assignedCounselor.id,
        createdById: assignedCounselor.id,
        isAutoGenerated: true,
        triggerEvent: 'demo_booking_created',
      },
    })

    // Step 5: Log activity for audit trail
    await prisma.activity.create({
      data: {
        userId: assignedCounselor.id,
        leadId: lead.id,
        action: 'DEMO_BOOKED',
        description: `Demo booking created for ${body.studentName} via website. Scheduled for ${body.preferredDate} at ${body.preferredTime}.`,
        metadata: {
          demoBookingId: demoBooking.id,
          source: body.hearAboutUs || 'Website',
          utmSource: body.utmSource,
          utmMedium: body.utmMedium,
          utmCampaign: body.utmCampaign,
        },
      },
    })

    // Step 6: Send multi-channel confirmation to student (Email + WhatsApp + SMS)
    let notificationSent = false
    try {
      const sent = await notificationService.sendDemoConfirmation({
        leadId: lead.id,
        studentName: body.studentName,
        email: body.email,
        phone: body.phone,
        demoDate: new Date(body.preferredDate),
        meetingLink: meetingResponse.join_url,
        meetingPassword: meetingResponse.password,
        counselorName: assignedCounselor.name,
      })

      notificationSent = sent.success

      // Update notification status
      await prisma.demoBooking.update({
        where: { id: demoBooking.id },
        data: {
          notificationsSent: {
            whatsapp: true,
            email: true,
            sms: true,
          },
        },
      })
    } catch (error) {
      logger.error('Multi-channel confirmation to student failed', {
        error,
        leadId: lead.id,
        studentName: body.studentName,
      })
    }

    // Log successful booking and lead creation
    logger.businessEvent('demo_booking_created', {
      demoBookingId: demoBooking.id,
      leadId: lead.id,
      studentName: body.studentName,
      assignedTo: assignedCounselor.name,
      email: body.email,
      phone: body.phone,
      meetingId: meetingResponse.id,
      scheduledTime: meetingResponse.start_time,
      notifications: {
        multiChannelSent: notificationSent,
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Demo class booked successfully! Our counselor will contact you shortly.',
      booking: {
        id: demoBooking.id,
        leadId: lead.id,
        meetingId: meetingResponse.id,
        scheduledTime: meetingResponse.start_time,
        joinUrl: meetingResponse.join_url,
        password: meetingResponse.password,
        assignedCounselor: assignedCounselor.name,
      },
    })
  } catch (error) {
    logger.error('Demo booking error', { error })
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again.',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request, { maxRequests: 30, windowMs: 60 * 60 * 1000 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
          },
        }
      )
    }

    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json(
        { success: false, error: 'Date parameter is required' },
        { status: 400 }
      )
    }

    const selectedDate = new Date(date)
    const availableSlots = await zoomService.getAvailableSlots(selectedDate)

    return NextResponse.json(
      {
        success: true,
        availableSlots,
        date: selectedDate.toISOString(),
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    )
  } catch (error) {
    logger.error('Error fetching available slots', { error })
    return NextResponse.json(
      { success: false, error: 'Failed to fetch available slots' },
      { status: 500 }
    )
  }
}
