import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit } from '@/lib/rateLimit'
import { zoomService } from '@/lib/zoom/zoomService'
import { prisma } from '@/lib/prisma'
import { notificationService } from '@/lib/notifications/notificationService'
import { notifyAdminDemoBooking } from '@/lib/notifications/adminLeadNotification'
import { trackDemoBookingConversion } from '@/lib/integrations/googleAdsConversion'
import { logger } from '@/lib/utils/logger'

const demoBookingSchema = z.object({
  studentName: z.string().min(2).max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(
      /^\+?[1-9]\d{9,14}$/,
      'Please enter a valid phone number (e.g., +91 8826444334 or 8826444334)'
    ),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?/)
    .or(z.enum(['TODAY', 'TOMORROW', 'ASAP'])), // Allow urgent options
  preferredTime: z.string().regex(/^\d{2}:\d{2}$/).or(z.enum(['ASAP', 'MORNING', 'AFTERNOON', 'EVENING'])),
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
  source: z.string().max(200).optional(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  utmContent: z.string().max(100).optional(),
  gclid: z.string().max(200).optional(),
})

/**
 * Determine LeadSource enum from tracking parameters
 * GCLID presence = definitive Google Ads lead
 */
function determineLeadSource(body: {
  gclid?: string | null
  utmSource?: string | null
  utmMedium?: string | null
  source?: string | null
}): 'GOOGLE_ADS' | 'FACEBOOK_ADS' | 'SOCIAL_MEDIA' | 'WEBSITE' | 'REFERRAL' {
  // GCLID is definitive proof of Google Ads
  if (body.gclid) {
    return 'GOOGLE_ADS'
  }

  const source = (body.utmSource || body.source || '').toLowerCase()
  const medium = (body.utmMedium || '').toLowerCase()

  // Check for Google Ads via UTM
  if (
    (source === 'google' || source === 'googleads') &&
    (medium === 'cpc' || medium === 'ppc' || medium === 'paid')
  ) {
    return 'GOOGLE_ADS'
  }

  // Check for Facebook Ads
  if ((source === 'facebook' || source === 'fb' || source === 'instagram') && medium === 'cpc') {
    return 'FACEBOOK_ADS'
  }

  // Check for social media
  if (['facebook', 'fb', 'instagram', 'youtube', 'twitter', 'linkedin'].includes(source)) {
    return 'SOCIAL_MEDIA'
  }

  // Check for referral
  if (source === 'referral' || medium === 'referral') {
    return 'REFERRAL'
  }

  return 'WEBSITE'
}

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

    // Normalize phone number (remove spaces, handle +91 prefix)
    if (rawBody.phone) {
      rawBody.phone = rawBody.phone.replace(/[\s-]/g, '')
      // If it's a 10-digit Indian number without country code, add +91
      const phoneDigits = rawBody.phone.replace(/[^\d]/g, '')
      if (phoneDigits.length === 10 && /^[6-9]/.test(phoneDigits)) {
        rawBody.phone = '+91' + phoneDigits
      }
    }

    // Handle urgent date options
    if (rawBody.preferredDate === 'TODAY') {
      rawBody.preferredDate = new Date().toISOString().split('T')[0]
    } else if (rawBody.preferredDate === 'TOMORROW') {
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      rawBody.preferredDate = tomorrow.toISOString().split('T')[0]
    } else if (rawBody.preferredDate === 'ASAP') {
      rawBody.preferredDate = new Date().toISOString().split('T')[0]
      rawBody.isUrgent = true
    }

    // Handle time slot preferences
    if (rawBody.preferredTime === 'ASAP') {
      // Find next available slot
      const now = new Date()
      const hour = now.getHours()
      if (hour < 10) rawBody.preferredTime = '10:00'
      else if (hour < 14) rawBody.preferredTime = '14:00'
      else if (hour < 18) rawBody.preferredTime = '18:00'
      else rawBody.preferredTime = '10:00' // Next day's first slot
    } else if (rawBody.preferredTime === 'MORNING') {
      rawBody.preferredTime = '10:00'
    } else if (rawBody.preferredTime === 'AFTERNOON') {
      rawBody.preferredTime = '14:00'
    } else if (rawBody.preferredTime === 'EVENING') {
      rawBody.preferredTime = '18:00'
    }

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

    // Validate date (must be today or future, with same-day support)
    // Append T00:00:00 to parse as local time, not UTC
    const selectedDate = new Date(body.preferredDate + 'T00:00:00')
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Allow same-day booking (today) but not past dates
    if (selectedDate < today) {
      return NextResponse.json(
        {
          success: false,
          error: 'Demo date cannot be in the past. Select today or a future date.',
        },
        { status: 400 }
      )
    }

    // Mark as urgent if same-day booking
    const isSameDay = selectedDate.toDateString() === today.toDateString()
    const isUrgent = (rawBody as { isUrgent?: boolean }).isUrgent || isSameDay

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
          phone: '+918826444334',
        },
      })
    }

    // Determine lead source from tracking params
    const leadSource = determineLeadSource(body)
    const sourceDetail = body.source || body.hearAboutUs || 'Website'

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
        source: sourceDetail,
        utmSource: body.utmSource,
        utmMedium: body.utmMedium,
        utmCampaign: body.utmCampaign,
        utmContent: body.utmContent,
        gclid: body.gclid,
        assignedTo: assignedCounselor.id,
        notificationsSent: {
          whatsapp: false,
          email: false,
        },
      },
    })

    // Step 3: Auto-create Lead from DemoBooking with proper tracking
    const lead = await prisma.lead.create({
      data: {
        studentName: body.studentName,
        email: body.email,
        phone: body.phone,
        courseInterest: body.courseInterest,
        stage: 'DEMO_SCHEDULED',
        priority: 'HOT',
        source: leadSource,
        sourceDetail: sourceDetail,
        utmSource: body.utmSource,
        utmMedium: body.utmMedium,
        utmCampaign: body.utmCampaign,
        utmContent: body.utmContent,
        gclid: body.gclid,
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

    // Step 5b: Send WhatsApp notification to admin about new lead
    notifyAdminDemoBooking({
      studentName: body.studentName,
      email: body.email,
      phone: body.phone,
      courseInterest: body.courseInterest,
      preferredDate: new Date(body.preferredDate),
      preferredTime: body.preferredTime,
      source: body.source || body.hearAboutUs,
      gclid: body.gclid,
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
      leadId: lead.id,
    }).catch((err) => {
      logger.error('Admin WhatsApp notification failed', { error: err, leadId: lead.id })
    })

    // Step 5c: Track Google Ads conversion if GCLID is present
    if (body.gclid) {
      trackDemoBookingConversion({
        gclid: body.gclid,
        bookingId: demoBooking.id,
        conversionDateTime: new Date(),
      }).catch((err) => {
        logger.error('Google Ads conversion tracking failed', { error: err, gclid: body.gclid })
      })
    }

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

    const origin = request.headers.get('origin') || ''
    const allowedOrigins = [
      'https://cerebrumbiologyacademy.com',
      'https://cerebrumbiologyacademy.com',
      ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
    ]
    const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0]

    return NextResponse.json(
      {
        success: true,
        availableSlots,
        date: selectedDate.toISOString(),
      },
      {
        headers: {
          'Access-Control-Allow-Origin': corsOrigin,
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Credentials': 'true',
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
