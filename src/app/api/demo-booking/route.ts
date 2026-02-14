// Demo Booking API Route
// Handles demo booking submissions with real-time notifications
// POST: Public (with rate limiting + honeypot spam protection)
// GET/PUT: Admin-only (requires authentication)

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { DemoBookingData } from '@/components/admin/DemoBookingModal'
import { z } from 'zod'
import { AgentType } from '@/generated/prisma'
import { AgentTaskManager } from '@/lib/crm-agents/base'
import { zoomService } from '@/lib/zoom/zoomService'
import { whatsappDripService } from '@/lib/automation/whatsappDripService'
import { trackDemoBookingConversion } from '@/lib/integrations/googleAdsConversion'
import { withAdmin, UserSession } from '@/lib/auth/middleware'
import { WebhookService } from '@/lib/webhooks/webhookService'
import { withRateLimit, checkSpamPattern } from '@/lib/middleware/rateLimit'
import { normalizePhone, validatePhone as validatePhoneUtil } from '@/lib/utils/phone'

// HTML escape function to prevent XSS in email templates
function escapeHtml(str: string | null | undefined): string {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Use centralized phone validation from utils
function validatePhoneNumber(phone: string): boolean {
  return validatePhoneUtil(phone)
}

// Input validation schema
const DemoBookingSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    // Support Unicode letters (Hindi, Tamil, etc.) and spaces
    .regex(
      /^[\p{L}\p{M}\s'-]+$/u,
      'Name can only contain letters, spaces, hyphens, and apostrophes'
    ),
  email: z
    .string()
    .email('Invalid email format')
    .transform((email) => email.toLowerCase().trim()),
  phone: z.string().refine(validatePhoneNumber, 'Phone must have 10-15 digits'),
  whatsappNumber: z
    .string()
    .refine(validatePhoneNumber, 'WhatsApp number must have 10-15 digits')
    .optional(),
  courseInterest: z
    .array(z.string())
    .min(1, 'Please select at least one course')
    .max(5, 'Maximum 5 courses allowed'),
  preferredDate: z.string().refine((date) => {
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return selectedDate >= today
  }, 'Preferred date must be today or in the future'),
  preferredTime: z.string().regex(/^\d{2}:\d{2} [AP]M - \d{2}:\d{2} [AP]M$/, 'Invalid time format'),
  message: z.string().max(500, 'Message must be less than 500 characters').optional(),
  // Honeypot field - should always be empty (bots will fill it)
  website: z.string().max(0, 'Invalid submission').optional(),
})

// Date validation helper - must be valid ISO date string
const dateStringSchema = z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format' })

// Time validation helper - must be valid time format like "10:00 AM - 11:00 AM"
const timeStringSchema = z
  .string()
  .regex(/^\d{1,2}:\d{2}\s*(?:AM|PM)(?:\s*-\s*\d{1,2}:\d{2}\s*(?:AM|PM))?$/i, {
    message: 'Invalid time format (expected: "HH:MM AM/PM" or "HH:MM AM - HH:MM PM")',
  })

// Admin update schema - WHITELIST of allowed fields only
const AdminUpdateSchema = z
  .object({
    // Status fields
    status: z
      .enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW', 'RESCHEDULED'])
      .optional(),
    demoCompleted: z.boolean().optional(),
    convertedToEnrollment: z.boolean().optional(),

    // Scheduling fields - with proper date/time validation
    preferredDate: dateStringSchema.optional(),
    preferredTime: timeStringSchema.optional(),
    rescheduledDate: dateStringSchema.optional(),
    rescheduledTime: timeStringSchema.optional(),

    // Feedback fields
    demoRating: z.number().min(1).max(5).optional(),
    feedback: z.string().max(1000).optional(),
    adminNotes: z.string().max(2000).optional(),

    // Assignment - validated as non-empty string
    assignedCounselorId: z.string().min(1, 'Counselor ID cannot be empty').optional(),

    // Zoom details (can be updated if meeting needs recreation)
    zoomMeetingId: z.string().optional(),
    zoomJoinUrl: z.string().url().optional(),
    zoomStartUrl: z.string().url().optional(),
  })
  .strict() // Reject any additional fields

// Maximum allowed referral discount (10% = 1000 basis points)
const MAX_REFERRAL_DISCOUNT_PERCENT = 10

// Note: Rate limiting is now handled by the distributed Redis-based rate limiter
// from @/lib/middleware/rateLimit. The local Map stores are kept only as fallback
// if Redis is not configured, but they won't work properly in multi-instance deployments.

// Fallback in-memory rate limiting (only used if Redis not configured)
const rateLimitStoreFallback = new Map<string, { count: number; resetTime: number }>()

// Fallback spam detection (only used if Redis not configured)
const spamDetectionStoreFallback = new Map<string, { submissions: number[]; blocked: boolean }>()

// Helper: Get default counselor for auto-assignment (round-robin or least loaded)
async function getDefaultCounselorId(tx: typeof prisma): Promise<string> {
  // Find active counselors ordered by least active leads
  const counselor = await tx.users.findFirst({
    where: {
      role: { in: ['COUNSELOR', 'ADMIN'] },
      isActive: true,
    },
    orderBy: {
      leads: {
        _count: 'asc', // Assign to counselor with fewest leads
      },
    },
    select: { id: true },
  })

  // If no counselor found, try to find any admin
  if (!counselor) {
    const admin = await tx.users.findFirst({
      where: { role: 'ADMIN' },
      select: { id: true },
    })
    if (admin) return admin.id
    throw new Error('No counselor or admin available for lead assignment')
  }

  return counselor.id
}

// Database is now imported from db-admin.ts

export async function POST(request: NextRequest) {
  // Declare rawData outside try block so it's accessible in catch for failure notifications
  let rawData: any = null

  try {
    // Get client IP (parse first IP from x-forwarded-for to prevent spoofing)
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : request.headers.get('x-real-ip') || 'unknown'
    const now = Date.now()

    // Use distributed rate limiting (Redis-backed when configured)
    // This works correctly across multiple server instances
    const rateLimitResult = await withRateLimit(request, {
      identifier: `demo-booking:${clientIp}`,
      limit: 5,
      window: 15 * 60 * 1000, // 15 minutes
      keyPrefix: 'demo-booking',
      failClosed: true, // Security-critical: block requests if rate limiter fails
    })

    if (!rateLimitResult.success) {
      console.warn(`[Demo Booking] Rate limit exceeded for ${clientIp}`)

      // Check spam pattern using distributed store
      const spamResult = await checkSpamPattern(clientIp, 'demo-booking')
      if (spamResult?.blocked) {
        return NextResponse.json(
          { error: 'Your IP has been temporarily blocked due to suspicious activity.' },
          { status: 403 }
        )
      }

      return NextResponse.json(
        {
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.resetTime - now) / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimitResult.resetTime - now) / 1000)),
            'X-RateLimit-Limit': String(rateLimitResult.limit),
            'X-RateLimit-Remaining': String(rateLimitResult.remaining),
          },
        }
      )
    }

    rawData = await request.json()

    // Honeypot check - if 'website' field is filled, it's a bot
    if (rawData.website && rawData.website.length > 0) {
      console.warn(`[Demo Booking] Honeypot triggered from ${clientIp}`)
      // Return success to fool the bot, but don't save anything
      return NextResponse.json({
        success: true,
        bookingId: 'demo_' + Math.random().toString(36).substring(7),
        message: 'Demo booking created successfully',
      })
    }

    // Time-based spam check: submission must take at least 3 seconds (bots are fast)
    const formStartTime = rawData._formStartTime
    if (formStartTime && now - formStartTime < 3000) {
      console.warn(`[Demo Booking] Suspiciously fast submission from ${clientIp}`)
      // Don't reject, but flag for review
      rawData._flaggedForReview = true
    }

    // Validate and sanitize input data
    const validationResult = DemoBookingSchema.safeParse(rawData)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid input data',
          details: validationResult.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 }
      )
    }

    const data = validationResult.data as DemoBookingData

    // Extract new fields from request body (if present)
    const { demoType, referralCodeUsed } = rawData

    // Validate referral code against database and get actual discount
    // SECURITY: Never trust client-provided discount value - always derive from DB
    let validatedReferralDiscount = 0
    let validatedReferralCode: string | null = null
    let validatedReferralCodeId: string | null = null

    if (referralCodeUsed && typeof referralCodeUsed === 'string') {
      try {
        // Lookup the referral code in database
        const referralCodeRecord = await prisma.referral_codes.findUnique({
          where: { code: referralCodeUsed.toUpperCase().trim() },
        })

        if (referralCodeRecord) {
          // Validate code is active and not expired
          const now = new Date()
          const isExpired = referralCodeRecord.expiresAt && referralCodeRecord.expiresAt < now
          const hasUsesLeft = referralCodeRecord.uses < referralCodeRecord.maxUses

          if (!isExpired && hasUsesLeft) {
            // Use discount from database, capped at max allowed
            validatedReferralDiscount = Math.min(
              referralCodeRecord.discount,
              MAX_REFERRAL_DISCOUNT_PERCENT
            )
            validatedReferralCode = referralCodeRecord.code
            validatedReferralCodeId = referralCodeRecord.id

          }
        }
      } catch (referralError) {
        // Log error but don't fail the booking - just proceed without discount
        console.error('[Demo Booking] Referral code lookup failed:', referralError)
      }
    }

    // Extract tracking/attribution data from request body
    const {
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent: _utmContent,
      utmTerm: _utmTerm,
      gclid,
      source,
    } = rawData

    // DEMO-001 & DEMO-005: Validate slot availability before creating booking
    // This prevents double-bookings and ensures the slot is actually free
    const preferredDateObj = new Date(data.preferredDate + 'T00:00:00')
    const availableSlots = await zoomService.getAvailableSlots(preferredDateObj)

    // Extract start time from format like "10:00 AM - 11:00 AM" or "10:00"
    const requestedTimeMatch = data.preferredTime.match(/^(\d{1,2}:\d{2})/)
    const requestedTime = requestedTimeMatch
      ? `${requestedTimeMatch[1].split(':')[0].padStart(2, '0')}:${requestedTimeMatch[1].split(':')[1]}`
      : data.preferredTime

    if (!availableSlots.includes(requestedTime)) {
      return NextResponse.json(
        {
          success: false,
          error: 'This time slot is no longer available. Please select a different time.',
          availableSlots,
        },
        { status: 409 }
      )
    }

    // Save demo booking and link to lead in a transaction for data integrity
    // Use serializable isolation to prevent duplicate lead race conditions
    let demoBooking
    let lead: Awaited<ReturnType<typeof prisma.leads.findFirst>> = null

    try {
      const result = await prisma.$transaction(
        async (tx) => {
          // DEMO-005: Check for slot conflict inside transaction (race condition prevention)
          // Even though we checked availability above, we need atomic verification
          const conflictingBooking = await tx.demoBooking.findFirst({
            where: {
              preferredDate: data.preferredDate,
              preferredTime: {
                startsWith: requestedTime
              },
              status: {
                in: ['PENDING', 'CONFIRMED', 'RESCHEDULED']
              }
            }
          })

          if (conflictingBooking) {
            throw new Error('SLOT_CONFLICT')
          }

          // 1. Create the demo booking
          const booking = await tx.demoBooking.create({
            data: {
              // Identity (no userId for guest bookings)
              userId: null, // Guest booking
              courseId: null, // Will be assigned later by admin

              // Student Information
              studentName: data.name,
              email: data.email,
              phone: data.phone,
              studentClass: null, // Optional, can be added to form later

              // Demo Details
              preferredDate: data.preferredDate, // Store as string
              preferredTime: data.preferredTime, // Single field: "10:00 AM - 11:00 AM"
              message: data.message || null,
              status: 'PENDING', // Use enum value

              // Level 3: Premium Demo & Referral Fields
              demoType: demoType || 'FREE',
              paymentStatus: demoType === 'PREMIUM' ? 'PENDING' : 'NOT_REQUIRED',
              // Only store validated referral code from database lookup
              referralCodeUsed: validatedReferralCode,
              referralDiscount: validatedReferralDiscount,

              // Marketing Attribution - capture tracking data for attribution
              source: source || (gclid ? 'Google Ads' : 'website'),
              utmSource: utmSource || null,
              utmMedium: utmMedium || null,
              utmCampaign: utmCampaign || null,
              gclid: gclid || null,

              // Follow-up Fields (defaults from schema)
              assignedTo: null,
              followUpDate: null,
              remindersSent: 0,

              // Demo Feedback (defaults)
              demoCompleted: false,
              demoRating: null,
              demoFeedback: null,
              convertedToEnrollment: false,
            },
          })

          // 2. Find existing lead by email (case-insensitive) or phone
          const normalizedPhoneValue = normalizePhone(data.phone)
          const normalizedEmail = data.email.toLowerCase().trim()
          const existingLead = await tx.leads.findFirst({
            where: {
              OR: [
                // Case-insensitive email comparison
                { email: { equals: normalizedEmail, mode: 'insensitive' } },
                { phone: normalizedPhoneValue },
              ],
            },
          })

          // 3. If lead exists, update it. Otherwise CREATE a new lead.
          let updatedLead
          if (existingLead) {
            // Update existing lead with demo booking reference
            updatedLead = await tx.leads.update({
              where: { id: existingLead.id },
              data: {
                demoBookingId: booking.id,
                stage: 'DEMO_SCHEDULED',
                // Update name if provided and different
                ...(data.name &&
                  data.name !== existingLead.studentName && { studentName: data.name }),
                // Update course interest if provided
                ...(data.courseInterest?.length > 0 && {
                  courseInterest: data.courseInterest.join(', '),
                }),
              },
            })
          } else {
            // CREATE NEW LEAD - This was missing before!
            updatedLead = await tx.leads.create({
              data: {
                id: `lead_${Date.now()}_${Math.random().toString(36).substring(7)}`,
                studentName: data.name,
                email: data.email || null,
                phone: normalizedPhoneValue,
                courseInterest: data.courseInterest?.join(', ') || 'NEET Biology',
                stage: 'DEMO_SCHEDULED',
                priority: 'WARM',
                source: utmSource ? 'PAID_ADS' : (source as any) || 'WEBSITE_FORM',
                demoBookingId: booking.id,
                // Auto-assign to first available counselor or leave unassigned
                assignedToId: await getDefaultCounselorId(tx),
                updatedAt: new Date(),
              },
            })
          }

          // If referral code was used successfully, increment usage count and create redemption record
          if (validatedReferralCode && validatedReferralCodeId) {
            // Increment usage count
            await tx.referral_codes.update({
              where: { code: validatedReferralCode },
              data: { uses: { increment: 1 } },
            })

            // Create redemption record for tracking
            await tx.referral_redemptions.create({
              data: {
                id: `redemption_${Date.now()}_${Math.random().toString(36).substring(7)}`,
                referralCodeId: validatedReferralCodeId,
                redeemedBy: updatedLead?.id || 'guest',
                redeemedByEmail: data.email,
                discountGiven: validatedReferralDiscount,
                bookingId: booking.id,
              },
            })
          }

          return { booking, lead: updatedLead }
        },
        {
          // Use serializable isolation to prevent duplicate lead creation race conditions
          // This ensures findFirst + create is atomic
          isolationLevel: 'Serializable',
        }
      )

      demoBooking = result.booking
      lead = result.lead
    } catch (dbError) {
      // DEMO-005: Handle slot conflict error specifically
      if (dbError instanceof Error && dbError.message === 'SLOT_CONFLICT') {
        return NextResponse.json(
          {
            success: false,
            error: 'This time slot was just booked by someone else. Please select a different time.',
            code: 'SLOT_CONFLICT',
          },
          { status: 409 }
        )
      }

      // Log error without sensitive data
      console.error('Database transaction failed:', {
        error: dbError instanceof Error ? dbError.message : 'Unknown error',
      })

      // CRITICAL: Notify admin about the failed booking so no lead is lost!
      await notifyAdminBookingFailure(
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          courseInterest: data.courseInterest,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
          message: data.message,
        },
        'Database Error',
        dbError instanceof Error ? dbError.message : 'Unknown database error'
      )

      // Return user-friendly error - NEVER expose internal details to client
      // Details are logged server-side only for debugging
      return NextResponse.json(
        {
          error: 'Unable to save booking',
          message: 'Please try again or contact support.',
        },
        { status: 500 }
      )
    }

    // Track Google Ads conversion if GCLID is present (non-blocking)
    if (gclid) {
      trackDemoBookingConversion({
        gclid: gclid,
        conversionDateTime: new Date(),
        bookingId: demoBooking.id,
      }).catch((err) => {
        console.error('Failed to track Google Ads demo conversion (non-blocking):', err)
      })
    }

    // Schedule follow-up actions (non-blocking, outside transaction)
    await scheduleFollowUpActions(demoBooking.id, data)

    // Send immediate notifications (non-blocking, outside transaction)
    await sendImmediateNotifications(demoBooking)

    // Queue AI Product Agent for course match analysis (non-blocking)
    if (lead) {
      try {
        await AgentTaskManager.createTask({
          agentType: AgentType.PRODUCT_AGENT,
          leadId: lead.id,
          input: {
            action: 'recommend',
            trigger: 'DEMO_BOOKED',
            profile: {
              courseInterest: data.courseInterest.join(', '),
              preferredDate: data.preferredDate,
              demoType: demoType || 'FREE',
            },
          },
        })
      } catch (agentError) {
        console.error('Failed to queue product agent for demo:', agentError)
      }
    }

    // Create Zoom meeting for the demo
    let zoomMeeting = null
    try {
      zoomMeeting = await zoomService.createDemoMeeting({
        studentName: data.name,
        email: data.email,
        phone: data.phone,
        preferredDate: new Date(data.preferredDate),
        preferredTime: data.preferredTime,
        courseInterest: data.courseInterest.join(', '),
        studentClass: '', // Optional
        previousKnowledge: '', // Optional
      })

      // Update booking with Zoom meeting details
      if (zoomMeeting) {
        await prisma.demo_bookings.update({
          where: { id: demoBooking.id },
          data: {
            zoomMeetingId: String(zoomMeeting.id),
            zoomJoinUrl: zoomMeeting.join_url,
            zoomStartUrl: zoomMeeting.start_url,
            zoomPassword: zoomMeeting.password,
          },
        })
      }
    } catch (zoomError) {
      // Log but don't fail the booking if Zoom creation fails
      console.error('Failed to create Zoom meeting (non-blocking):', zoomError)
    }

    // Start WhatsApp drip sequence for demo reminders
    try {
      if (lead) {
        // Trigger demo_booked behavioral action which starts DEMO_REMINDER_SEQUENCE
        await whatsappDripService.handleBehavioralTrigger(lead.id, 'demo_booked', {
          demoDate: new Date(data.preferredDate + ' ' + data.preferredTime.split(' - ')[0]),
          courseInterest: data.courseInterest.join(', '),
        })
      }
    } catch (dripError) {
      console.error('Failed to start demo drip sequence (non-blocking):', dripError)
    }

    // Dispatch webhook event for external CRM integrations
    try {
      const leadData = lead
        ? {
            id: lead.id,
            studentName: lead.studentName,
            email: lead.email,
            phone: lead.phone,
            courseInterest: lead.courseInterest,
            stage: lead.stage,
            priority: lead.priority,
          }
        : {
            studentName: data.name,
            email: data.email,
            phone: data.phone,
            courseInterest: data.courseInterest.join(', '),
          }

      const demoData = {
        id: demoBooking.id,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        demoType: demoType || 'FREE',
        status: demoBooking.status,
        zoomJoinUrl: zoomMeeting?.join_url,
      }

      await WebhookService.onDemoBooked(leadData, demoData)
    } catch (webhookError) {
      console.error('Failed to dispatch demo.booked webhook:', webhookError)
    }

    return NextResponse.json({
      success: true,
      bookingId: demoBooking.id,
      message: 'Demo booking created successfully',
      zoomMeeting: zoomMeeting
        ? {
            joinUrl: zoomMeeting.join_url,
            meetingId: zoomMeeting.id,
            password: zoomMeeting.password,
          }
        : null,
    })
  } catch (error) {
    // Log error securely (don't expose internal details)
    console.error('Demo booking error:', error instanceof Error ? error.message : 'Unknown error')

    // CRITICAL: Notify admin about the failed booking so no lead is lost!
    // Use rawData as fallback if data validation failed
    try {
      const leadInfo = {
        name: rawData?.name || 'Unknown',
        email: rawData?.email || 'Unknown',
        phone: rawData?.phone || 'Unknown',
        courseInterest: rawData?.courseInterest || ['Unknown'],
        preferredDate: rawData?.preferredDate,
        preferredTime: rawData?.preferredTime,
        message: rawData?.message,
      }
      await notifyAdminBookingFailure(
        leadInfo,
        'General Error',
        error instanceof Error ? error.message : 'Unknown error occurred'
      )
    } catch (notifyErr) {
      console.error('Failed to send failure notification:', notifyErr)
    }

    // Return generic error message
    return NextResponse.json(
      { error: 'Unable to process booking request. Please try again later.' },
      { status: 500 }
    )
  }
}

// Schedule automated follow-up actions
async function scheduleFollowUpActions(bookingId: string, data: DemoBookingData) {
  const now = new Date()

  // Schedule confirmation call within 2 hours
  const _confirmationTime = new Date(now.getTime() + 2 * 60 * 60 * 1000)

  // Schedule reminder 1 day before demo
  const preferredDate = new Date(data.preferredDate)
  const _reminderTime = new Date(preferredDate.getTime() - 24 * 60 * 60 * 1000)

  // Schedule tasks using BullMQ/fallback scheduler
  try {
    const { scheduleDemoBookingTasks } = await import('@/lib/scheduler/taskQueue')
    await scheduleDemoBookingTasks({
      id: bookingId,
      name: data.name,
      phone: data.phone,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
    })
  } catch (error) {
    console.error('Failed to schedule follow-up tasks:', error)
  }
}

// Send immediate notifications to student and admin team
async function sendImmediateNotifications(bookingData: any) {
  try {
    // 1. Send WhatsApp confirmation to student
    const whatsappResult = await sendWhatsAppConfirmation(bookingData)

    // 2. Send Email confirmation to student
    const emailResult = await sendEmailConfirmation(bookingData)

    // 3. Notify admin team
    await notifyAdminTeam(bookingData)

    // Update booking with notification status
    if (whatsappResult.success || emailResult.success) {
      await prisma.demo_bookings.update({
        where: { id: bookingData.id },
        data: {
          notificationsSent: {
            whatsapp: whatsappResult.success,
            email: emailResult.success,
            timestamp: new Date().toISOString(),
          },
        },
      })
    }
  } catch (error) {
    console.error('❌ Notification error (non-blocking):', error)
    // Don't throw - notifications failing shouldn't block booking
  }
}

// Send WhatsApp confirmation via Interakt
async function sendWhatsAppConfirmation(bookingData: any) {
  if (!process.env.INTERAKT_API_KEY) {
    return { success: false, reason: 'not_configured' }
  }

  try {
    // Clean phone number - remove all non-digits and get last 10 digits
    const cleanPhone = bookingData.phone.replace(/\D/g, '')
    const phoneNumber = cleanPhone.slice(-10)

    if (phoneNumber.length !== 10) {
      console.error('❌ Invalid phone number format:', bookingData.phone)
      return { success: false, reason: 'invalid_phone' }
    }

    const response = await fetch('https://api.interakt.ai/v1/public/message/', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.INTERAKT_API_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        countryCode: '+91',
        phoneNumber: phoneNumber,
        callbackData: `demo_booking_${bookingData.id}`,
        type: 'Template',
        template: {
          name: 'demo_confirmation',
          languageCode: 'en',
          bodyValues: [
            bookingData.studentName,
            bookingData.demoType || 'FREE',
            bookingData.preferredDate,
            bookingData.preferredTime,
            'Join link will be sent 30 minutes before class',
          ],
        },
      }),
    })

    const result = await response.json()

    if (response.ok) {
      return { success: true, messageId: result.result?.messageId }
    } else {
      console.error('❌ Interakt API error:', result)
      return { success: false, error: result }
    }
  } catch (error) {
    console.error('❌ WhatsApp send error:', error)
    return { success: false, error }
  }
}

// Send Email confirmation via Resend
async function sendEmailConfirmation(bookingData: any) {
  if (!process.env.RESEND_API_KEY) {
    return { success: false, reason: 'not_configured' }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Cerebrum Biology Academy <noreply@cerebrumbiologyacademy.com>',
        to: bookingData.email,
        subject: `Demo Class Confirmed - ${bookingData.preferredDate}`,
        html: generateDemoConfirmationEmail(bookingData),
      }),
    })

    const result = await response.json()

    if (response.ok) {
      return { success: true, emailId: result.id }
    } else {
      console.error('❌ Resend API error:', result)
      return { success: false, error: result }
    }
  } catch (error) {
    console.error('❌ Email send error:', error)
    return { success: false, error }
  }
}

// Generate HTML email template
function generateDemoConfirmationEmail(bookingData: any): string {
  // Escape all user-provided data to prevent XSS
  const safeName = escapeHtml(bookingData.studentName)
  const safeDate = escapeHtml(bookingData.preferredDate)
  const safeTime = escapeHtml(bookingData.preferredTime)
  const safeDemoType = escapeHtml(bookingData.demoType) || 'FREE'
  // Escape booking ID for URL safety (prevent injection in href)
  const safeBookingId = encodeURIComponent(bookingData.id || '')

  const coursesList = Array.isArray(bookingData.courseInterest)
    ? bookingData.courseInterest.map((c: string) => escapeHtml(c)).join(', ')
    : escapeHtml(bookingData.courseInterest) || 'NEET Biology'

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Demo Class Confirmed</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Demo Class Confirmed! 🎉</h1>
        </div>

        <!-- Content -->
        <div style="padding: 40px 20px;">
          <h2 style="color: #1f2937; margin-top: 0;">Hi ${safeName}!</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Great news! Your NEET Biology demo class has been successfully confirmed.
          </p>

          <!-- Demo Details Box -->
          <div style="background-color: #f9fafb; border-left: 4px solid #2563eb; padding: 20px; margin: 30px 0;">
            <h3 style="color: #2563eb; margin-top: 0;">📅 Demo Class Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Date:</td>
                <td style="padding: 8px 0; color: #1f2937;">${safeDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Time:</td>
                <td style="padding: 8px 0; color: #1f2937;">${safeTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Course:</td>
                <td style="padding: 8px 0; color: #1f2937;">${coursesList}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Demo Type:</td>
                <td style="padding: 8px 0; color: #1f2937;">${safeDemoType} Demo</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Duration:</td>
                <td style="padding: 8px 0; color: #1f2937;">1 Hour</td>
              </tr>
            </table>
          </div>

          <!-- What to Prepare -->
          <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">📝 What to Prepare:</h3>
            <ul style="color: #1e3a8a; line-height: 1.8; margin: 10px 0; padding-left: 20px;">
              <li>Notebook and pen for taking notes</li>
              <li>Your NEET biology questions and doubts</li>
              <li>NEET preparation goals and challenges</li>
              <li>Quiet environment with stable internet</li>
            </ul>
          </div>

          <!-- Topics Covered -->
          <h3 style="color: #1f2937;">🎯 Topics We'll Cover:</h3>
          <ul style="color: #4b5563; line-height: 1.8; margin: 10px 0; padding-left: 20px;">
            <li>NEET Biology syllabus overview</li>
            <li>High-yield topics and scoring strategies</li>
            <li>Our unique teaching methodology</li>
            <li>Previous year question patterns</li>
            <li>Live doubt clearing session</li>
          </ul>

          <!-- Join Link Notice -->
          <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 30px 0;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>📱 Join Link:</strong> Will be sent via WhatsApp and Email 30 minutes before the demo class.
            </p>
          </div>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 40px 0;">
            <a href="https://cerebrumbiologyacademy.com/demo-booking/reschedule?id=${safeBookingId}"
               style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%);
                      color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 8px;
                      font-weight: bold; font-size: 16px;">
              View Booking Details
            </a>
          </div>

          <!-- Contact Info -->
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Need Help?</h3>
            <p style="color: #4b5563; margin: 10px 0;">
              📞 Call/WhatsApp: <strong>+91 93119 46297</strong><br>
              📧 Email: <strong>info@cerebrumbiologyacademy.com</strong><br>
              🌐 Website: <strong>cerebrumbiologyacademy.com</strong>
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #1f2937; padding: 30px 20px; text-align: center;">
          <p style="color: #9ca3af; font-size: 14px; margin: 0;">
            © 2025 Cerebrum Biology Academy. All rights reserved.
          </p>
          <p style="color: #6b7280; font-size: 12px; margin: 10px 0 0 0;">
            Gurugram, Haryana, India
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Admin notification phone number - configured via env var
const ADMIN_PHONE = process.env.ADMIN_PHONE_NUMBER || '9311946297'
const SUPPORT_PHONE = process.env.SUPPORT_PHONE_NUMBER || '+91 93119 46297'

// Notify admin when a demo booking fails - so no lead is lost!
async function notifyAdminBookingFailure(leadData: {
  name: string
  email: string
  phone: string
  courseInterest: string[]
  preferredDate?: string
  preferredTime?: string
  message?: string
}, errorType: string, errorMessage: string) {
  if (!process.env.INTERAKT_API_KEY) {
    console.warn('[Demo Booking] Cannot send failure notification - INTERAKT_API_KEY not configured')
    return
  }

  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  const coursesList = leadData.courseInterest?.join(', ') || 'Not specified'

  const alertMessage = `🚨 DEMO BOOKING FAILED - FOLLOW UP NEEDED!

❌ Error: ${errorType}

👤 Student: ${(leadData.name || 'Unknown').slice(0, 50)}
📞 Phone: ${(leadData.phone || 'Not provided').slice(0, 15)}
📧 Email: ${(leadData.email || 'Not provided').slice(0, 100)}
📅 Date: ${(leadData.preferredDate || 'Not specified').slice(0, 20)}
🕐 Time: ${(leadData.preferredTime || 'Not specified').slice(0, 30)}
📚 Course: ${coursesList.slice(0, 100)}

⏰ Time: ${timestamp}

⚠️ ACTION: Call/WhatsApp this student immediately to recover the lead!

📝 Error Details: ${errorMessage.slice(0, 200)}`

  try {
    await fetch('https://api.interakt.ai/v1/public/message/', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.INTERAKT_API_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        countryCode: '+91',
        phoneNumber: ADMIN_PHONE,
        type: 'Text',
        data: {
          message: alertMessage,
        },
      }),
    })
  } catch (notifyError) {
    console.error('❌ Failed to send booking failure notification:', notifyError)
  }
}

// Notify admin team
async function notifyAdminTeam(bookingData: any) {
  if (!process.env.INTERAKT_API_KEY) {
    return
  }

  const coursesList = Array.isArray(bookingData.courseInterest)
    ? bookingData.courseInterest.join(', ')
    : bookingData.courseInterest || 'Not specified'

  // Note: WhatsApp messages are plaintext, XSS not a concern, but limit data exposure
  const adminMessage = `🆕 NEW DEMO BOOKING

👤 Student: ${(bookingData.studentName || '').slice(0, 50)}
📞 Phone: ${(bookingData.phone || '').slice(0, 15)}
📧 Email: ${(bookingData.email || '').slice(0, 100)}
📅 Date: ${(bookingData.preferredDate || '').slice(0, 20)}
🕐 Time: ${(bookingData.preferredTime || '').slice(0, 30)}
💎 Type: ${(bookingData.demoType || 'FREE').slice(0, 20)}
📚 Course: ${coursesList.slice(0, 100)}

🔗 View: cerebrumbiologyacademy.com/admin/demo-bookings`

  try {
    await fetch('https://api.interakt.ai/v1/public/message/', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.INTERAKT_API_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        countryCode: '+91',
        phoneNumber: ADMIN_PHONE,
        type: 'Text',
        data: {
          message: adminMessage,
        },
      }),
    })
  } catch (error) {
    console.error('❌ Admin notification failed:', error)
  }
}

// Handle GET requests for fetching demo bookings (admin use)
// Protected with admin authentication
async function handleGet(request: NextRequest, _session: UserSession) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    // Enforce pagination limits to prevent DoS
    const MAX_LIMIT = 100
    const requestedLimit = parseInt(searchParams.get('limit') || '50')
    const limit = Math.min(Math.max(1, requestedLimit), MAX_LIMIT)
    const offset = Math.max(0, parseInt(searchParams.get('offset') || '0'))

    // Build query filters
    const where: any = {}
    if (status) {
      where.status = status.toUpperCase() // PENDING, CONFIRMED, etc.
    }

    // Fetch from database
    const [bookings, total] = await Promise.all([
      prisma.demo_bookings.findMany({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          course: {
            select: { id: true, name: true, type: true },
          },
        },
      }),
      prisma.demo_bookings.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      bookings: bookings.map((booking) => ({
        id: booking.id,
        studentName: booking.studentName,
        email: booking.email,
        phone: booking.phone,
        preferredDate: booking.preferredDate,
        preferredTime: booking.preferredTime,
        status: booking.status,
        message: booking.message,
        courseId: booking.courseId,
        remindersSent: booking.remindersSent,
        assignedTo: booking.assignedTo,
        followUpDate: booking.followUpDate?.toISOString(),
        demoCompleted: booking.demoCompleted,
        source: booking.source,
        createdAt: booking.createdAt.toISOString(),
        updatedAt: booking.updatedAt.toISOString(),
        user: booking.user,
        course: booking.course,
      })),
      total,
      page: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    // Log full error server-side for debugging
    console.error('Fetch demo bookings error:', error)
    // Return generic error to client - never expose internal details
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

// Export GET with admin authentication
export const GET = withAdmin(handleGet)

// Handle PUT requests for updating demo bookings (admin use)
// Protected with admin authentication
async function handlePut(request: NextRequest, session: UserSession) {
  try {
    const body = await request.json()
    const { bookingId, updates } = body

    if (!bookingId || typeof bookingId !== 'string') {
      return NextResponse.json({ error: 'Valid booking ID is required' }, { status: 400 })
    }

    // Validate updates against whitelist schema
    const validationResult = AdminUpdateSchema.safeParse(updates)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues.map((i) => ({
            field: i.path.join('.'),
            message: i.message,
          })),
        },
        { status: 400 }
      )
    }

    const validatedUpdates = validationResult.data

    // Validate bookingId exists
    const existingBooking = await prisma.demo_bookings.findUnique({
      where: { id: bookingId },
    })

    if (!existingBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Update booking with validated data only
    const updatedBooking = await prisma.demo_bookings.update({
      where: { id: bookingId },
      data: {
        ...validatedUpdates,
        updatedAt: new Date(),
      },
    })

    // Log admin action for audit trail with before/after values

    return NextResponse.json({
      success: true,
      message: 'Demo booking updated successfully',
      booking: updatedBooking,
    })
  } catch (error) {
    console.error('Update demo booking error:', error)
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}

// Export PUT with admin authentication
export const PUT = withAdmin(handlePut)
