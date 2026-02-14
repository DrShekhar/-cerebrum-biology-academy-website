import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { z } from 'zod'
import { withRateLimit, checkSpamPattern, recordSpamViolation } from '@/lib/middleware/rateLimit'
import { zoomService } from '@/lib/zoom/zoomService'
import { prisma } from '@/lib/prisma'
import { notificationService } from '@/lib/notifications/notificationService'
import { notifyAdminDemoBooking } from '@/lib/notifications/adminLeadNotification'
import { trackDemoBookingConversion } from '@/lib/integrations/googleAdsConversion'
import { logger } from '@/lib/utils/logger'
import { Prisma } from '@/generated/prisma'
import { normalizePhone, validatePhone } from '@/lib/utils/phone'

/**
 * @deprecated This endpoint is deprecated. Use /api/demo-booking instead.
 * This endpoint will be removed in a future version.
 */
const DEPRECATION_HEADERS = {
  'X-Deprecated': 'true',
  'X-Deprecated-Message': 'This endpoint is deprecated. Use /api/demo-booking instead.',
  'Deprecation': 'true',
  'Sunset': '2026-06-01',
}

// Use centralized phone validation from utils
function validatePhoneNumber(phone: string): boolean {
  return validatePhone(phone)
}

const demoBookingSchema = z.object({
  studentName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    // Support Unicode letters (Hindi, Tamil, etc.) and spaces
    .regex(
      /^[\p{L}\p{M}\s'-]+$/u,
      'Name can only contain letters, spaces, hyphens, and apostrophes'
    ),
  email: z
    .string()
    .email('Please enter a valid email address')
    .transform((email) => email.toLowerCase().trim()),
  phone: z.string().refine(validatePhoneNumber, 'Phone must have 10-15 digits'),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2})?/)
    .or(z.enum(['TODAY', 'TOMORROW', 'ASAP'])), // Allow urgent options
  preferredTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .or(z.enum(['ASAP', 'MORNING', 'AFTERNOON', 'EVENING'])),
  courseInterest: z.string().min(1).max(100),
  studentClass: z.string().max(50).optional(),
  previousKnowledge: z.string().max(1000).optional(),
  specificTopics: z.array(z.string()).optional(),
  parentName: z.string().max(100).optional(),
  parentPhone: z
    .string()
    .refine((phone) => !phone || validatePhoneNumber(phone), 'Parent phone must have 10-15 digits')
    .optional(),
  hearAboutUs: z.string().max(200).optional(),
  source: z.string().max(200).optional(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  utmContent: z.string().max(100).optional(),
  gclid: z.string().max(200).optional(),
  // Honeypot field - should always be empty (bots will fill it)
  website: z.string().max(0, 'Invalid submission').optional(),
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
    // Get client IP (parse first IP from x-forwarded-for to prevent spoofing)
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : request.headers.get('x-real-ip') || 'unknown'
    const now = Date.now()

    // Check for spam block before rate limiting
    const spamResult = await checkSpamPattern(clientIp, 'demo-book')
    if (spamResult?.blocked) {
      logger.warn('Blocked spam IP attempted demo booking', { clientIp })
      return NextResponse.json(
        {
          success: false,
          error: 'Your IP has been temporarily blocked due to suspicious activity.',
        },
        { status: 403 }
      )
    }

    // Use distributed rate limiting (Redis-backed when configured)
    const rateLimitResult = await withRateLimit(request, {
      identifier: `demo-book:${clientIp}`,
      limit: 10, // 10 bookings per hour per IP
      window: 60 * 60 * 1000, // 1 hour
      keyPrefix: 'demo-book',
      failClosed: true, // Security-critical: block requests if rate limiter fails
    })

    if (!rateLimitResult.success) {
      logger.warn('Rate limit exceeded for demo booking', { clientIp })
      // Record rate limit violation for spam detection
      await recordSpamViolation(clientIp, 'demo-book')
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.resetTime - now) / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimitResult.resetTime - now) / 1000)),
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          },
        }
      )
    }

    const rawBody = await request.json()

    // Honeypot check - if 'website' field is filled, it's a bot
    if (rawBody.website && rawBody.website.length > 0) {
      logger.warn('Honeypot triggered in demo booking', { clientIp })
      // Record spam violation
      await recordSpamViolation(clientIp, 'demo-book')
      // Return success to fool the bot, but don't save anything
      return NextResponse.json({
        success: true,
        booking: {
          id: 'demo_' + crypto.randomBytes(6).toString('hex'),
          message: 'Demo class booked successfully!',
        },
      })
    }

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

    // Step 1: Get first available counselor using round-robin (least loaded)
    const assignedCounselor = await prisma.users.findFirst({
      where: {
        role: { in: ['COUNSELOR', 'ADMIN'] },
        isActive: true,
      },
      orderBy: {
        // Assign to counselor with fewest leads for load balancing
        leads: { _count: 'asc' },
      },
    })

    // SECURITY: Never auto-create users in production
    // If no counselor exists, the booking cannot be assigned - return error
    if (!assignedCounselor) {
      logger.error('No active counselor or admin found for lead assignment', {
        action: 'demo_booking_failed',
        reason: 'no_counselor_available',
      })
      return NextResponse.json(
        {
          success: false,
          error: 'Unable to process booking at this time. Please contact support.',
        },
        { status: 503 }
      )
    }

    // Determine lead source from tracking params
    const leadSource = determineLeadSource(body)
    const sourceDetail = body.source || body.hearAboutUs || 'Website'

    // Normalize phone for dedup check using centralized utility
    const normalizedPhoneValue = normalizePhone(body.phone)
    const normalizedEmail = body.email.toLowerCase().trim()

    // Use serializable transaction to prevent duplicate lead creation race conditions
    const { demoBooking, lead } = await prisma.$transaction(
      async (tx) => {
        // Check for existing lead by email or phone (case-insensitive)
        const existingLead = await tx.leads.findFirst({
          where: {
            OR: [
              { email: { equals: normalizedEmail, mode: 'insensitive' } },
              { phone: normalizedPhoneValue },
            ],
          },
        })

        // Step 2: Save DemoBooking to database
        const booking = await tx.demoBooking.create({
          data: {
            studentName: body.studentName,
            email: normalizedEmail,
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

        let leadRecord
        if (existingLead) {
          // Update existing lead with new demo booking
          leadRecord = await tx.leads.update({
            where: { id: existingLead.id },
            data: {
              stage: 'DEMO_SCHEDULED',
              demoBookingId: booking.id,
              // Update if name is different
              ...(body.studentName !== existingLead.studentName && {
                studentName: body.studentName,
              }),
            },
          })
        } else {
          // Step 3: Create new Lead from DemoBooking with proper tracking
          leadRecord = await tx.leads.create({
            data: {
              studentName: body.studentName,
              email: normalizedEmail,
              phone: normalizedPhoneValue,
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
              demoBookingId: booking.id,
              nextFollowUpAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
            },
          })
        }

        // Step 4: Create initial follow-up task for counselor
        const followUpDate = new Date()
        followUpDate.setHours(followUpDate.getHours() + 2) // Follow up in 2 hours

        await tx.tasks.create({
          data: {
            title: `Follow up on demo booking - ${body.studentName}`,
            description: `New demo class booked for ${body.studentName} (${body.courseInterest}). Demo scheduled for ${body.preferredDate} at ${body.preferredTime}. Please call to confirm attendance.`,
            type: 'FOLLOW_UP_CALL',
            priority: 'HIGH',
            dueDate: followUpDate,
            status: 'PENDING',
            leadId: leadRecord.id,
            assignedToId: assignedCounselor.id,
            createdById: assignedCounselor.id,
            isAutoGenerated: true,
            triggerEvent: 'demo_booking_created',
          },
        })

        // Step 5: Log activity for audit trail
        await tx.activities.create({
          data: {
            userId: assignedCounselor.id,
            leadId: leadRecord.id,
            action: 'DEMO_BOOKED',
            description: `Demo booking created for ${body.studentName} via website. Scheduled for ${body.preferredDate} at ${body.preferredTime}.`,
            metadata: {
              demoBookingId: booking.id,
              source: body.hearAboutUs || 'Website',
              utmSource: body.utmSource,
              utmMedium: body.utmMedium,
              utmCampaign: body.utmCampaign,
            },
          },
        })

        return { demoBooking: booking, lead: leadRecord }
      },
      {
        // Use serializable isolation to prevent duplicate lead creation race conditions
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      }
    )

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
      await prisma.demo_bookings.update({
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

    // Log deprecation warning
    logger.warn('Deprecated API /api/demo/book used', {
      studentEmail: body.email,
      clientIp
    })

    return NextResponse.json(
      {
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
        _deprecated: 'This endpoint is deprecated. Please use /api/demo-booking instead.',
      },
      { headers: DEPRECATION_HEADERS }
    )
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
    // Get client IP for rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : request.headers.get('x-real-ip') || 'unknown'

    // Use distributed rate limiting for slot availability checks
    const rateLimitResult = await withRateLimit(request, {
      identifier: `demo-book-slots:${clientIp}`,
      limit: 30, // 30 requests per 15 minutes for slot checks
      window: 15 * 60 * 1000,
      keyPrefix: 'demo-book-slots',
      failClosed: true, // Block requests if rate limit check fails
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
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
      'https://www.cerebrumbiologyacademy.com',
      ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
    ]
    const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0]

    // Log deprecation warning
    logger.warn('Deprecated API /api/demo/book (GET) used', { clientIp, date })

    return NextResponse.json(
      {
        success: true,
        availableSlots,
        date: selectedDate.toISOString(),
        _deprecated: 'This endpoint is deprecated. Please use /api/demo-booking instead.',
      },
      {
        headers: {
          ...DEPRECATION_HEADERS,
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
