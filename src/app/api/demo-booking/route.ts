// Demo Booking API Route
// Handles demo booking submissions with real-time notifications

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { DemoBookingData } from '@/components/admin/DemoBookingModal'
import { z } from 'zod'
import { AgentType } from '@/generated/prisma'
import { AgentTaskManager } from '@/lib/crm-agents/base'

// Input validation schema
const DemoBookingSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^\+?[\d\s\-\(\)]{10,15}$/, 'Invalid phone number format'),
  whatsappNumber: z
    .string()
    .regex(/^\+?[\d\s\-\(\)]{10,15}$/, 'Invalid WhatsApp number format')
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
})

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Database is now imported from db-admin.ts

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    const rateLimit = rateLimitStore.get(clientIp)

    if (rateLimit && rateLimit.resetTime > now) {
      if (rateLimit.count >= 5) {
        // Max 5 requests per 15 minutes
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        )
      }
      rateLimit.count++
    } else {
      rateLimitStore.set(clientIp, {
        count: 1,
        resetTime: now + 15 * 60 * 1000, // 15 minutes
      })
    }

    const rawData = await request.json()

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
    const { demoType, referralCodeUsed, referralDiscount } = rawData

    // Save demo booking to database using Prisma
    let demoBooking
    try {
      demoBooking = await prisma.demoBooking.create({
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
          referralCodeUsed: referralCodeUsed || null,
          referralDiscount: referralDiscount || 0,

          // Marketing Attribution
          source: 'website',
          utmSource: null,
          utmMedium: null,
          utmCampaign: null,

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

      console.log('✅ Demo booking created:', {
        id: demoBooking.id,
        name: demoBooking.studentName,
        email: demoBooking.email,
        status: demoBooking.status,
        timestamp: demoBooking.createdAt,
      })
    } catch (dbError) {
      // Log detailed error for debugging
      console.error('❌ Database save failed:', {
        error: dbError instanceof Error ? dbError.message : 'Unknown error',
        stack: dbError instanceof Error ? dbError.stack : undefined,
        data: { name: data.name, email: data.email, phone: data.phone },
      })

      // Return user-friendly error
      return NextResponse.json(
        {
          error: 'Database error',
          message: 'Unable to save booking. Please try again or contact support.',
          details:
            process.env.NODE_ENV === 'development'
              ? dbError instanceof Error
                ? dbError.message
                : 'Unknown error'
              : undefined,
        },
        { status: 500 }
      )
    }

    // Schedule follow-up actions
    await scheduleFollowUpActions(demoBooking.id, data)

    // Send immediate notifications
    await sendImmediateNotifications(demoBooking)

    // Queue AI Product Agent for course match analysis (automatic trigger)
    try {
      // First, try to find or create a lead for this demo booking
      let lead = await prisma.leads.findFirst({
        where: {
          OR: [{ email: data.email }, { phone: data.phone.replace(/\D/g, '').slice(-10) }],
        },
      })

      if (lead) {
        // Update existing lead with demo booking
        await prisma.leads.update({
          where: { id: lead.id },
          data: {
            demoBookingId: demoBooking.id,
            stage: 'DEMO_SCHEDULED',
          },
        })

        // Queue Product Agent for course recommendations
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
      }
    } catch (agentError) {
      console.error('Failed to queue product agent for demo:', agentError)
    }

    return NextResponse.json({
      success: true,
      bookingId: demoBooking.id,
      message: 'Demo booking created successfully',
    })
  } catch (error) {
    // Log error securely (don't expose internal details)
    console.error('Demo booking error:', error instanceof Error ? error.message : 'Unknown error')

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
  const confirmationTime = new Date(now.getTime() + 2 * 60 * 60 * 1000)

  // Schedule reminder 1 day before demo
  const preferredDate = new Date(data.preferredDate)
  const reminderTime = new Date(preferredDate.getTime() - 24 * 60 * 60 * 1000)

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
    console.log('📤 Starting notification process for booking:', bookingData.id)

    // 1. Send WhatsApp confirmation to student
    const whatsappResult = await sendWhatsAppConfirmation(bookingData)

    // 2. Send Email confirmation to student
    const emailResult = await sendEmailConfirmation(bookingData)

    // 3. Notify admin team
    await notifyAdminTeam(bookingData)

    console.log('✅ Notifications sent:', {
      bookingId: bookingData.id,
      whatsapp: whatsappResult.success,
      email: emailResult.success,
    })

    // Update booking with notification status
    if (whatsappResult.success || emailResult.success) {
      await prisma.demoBooking.update({
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
    console.log('⚠️ Interakt not configured, skipping WhatsApp')
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
      console.log('✅ WhatsApp sent successfully:', result.result?.messageId)
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
    console.log('⚠️ Resend not configured, skipping email')
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
      console.log('✅ Email sent successfully:', result.id)
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
  const coursesList = Array.isArray(bookingData.courseInterest)
    ? bookingData.courseInterest.join(', ')
    : bookingData.courseInterest || 'NEET Biology'

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
          <h2 style="color: #1f2937; margin-top: 0;">Hi ${bookingData.studentName}!</h2>
          <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
            Great news! Your NEET Biology demo class has been successfully confirmed.
          </p>

          <!-- Demo Details Box -->
          <div style="background-color: #f9fafb; border-left: 4px solid #2563eb; padding: 20px; margin: 30px 0;">
            <h3 style="color: #2563eb; margin-top: 0;">📅 Demo Class Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Date:</td>
                <td style="padding: 8px 0; color: #1f2937;">${bookingData.preferredDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Time:</td>
                <td style="padding: 8px 0; color: #1f2937;">${bookingData.preferredTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Course:</td>
                <td style="padding: 8px 0; color: #1f2937;">${coursesList}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Demo Type:</td>
                <td style="padding: 8px 0; color: #1f2937;">${bookingData.demoType || 'FREE'} Demo</td>
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
            <a href="https://cerebrumbiologyacademy.com/demo-booking/reschedule?id=${bookingData.id}"
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

// Notify admin team
async function notifyAdminTeam(bookingData: any) {
  if (!process.env.INTERAKT_API_KEY) {
    console.log('⚠️ Admin notification skipped - Interakt not configured')
    return
  }

  const coursesList = Array.isArray(bookingData.courseInterest)
    ? bookingData.courseInterest.join(', ')
    : bookingData.courseInterest || 'Not specified'

  const adminMessage = `🆕 NEW DEMO BOOKING

👤 Student: ${bookingData.studentName}
📞 Phone: ${bookingData.phone}
📧 Email: ${bookingData.email}
📅 Date: ${bookingData.preferredDate}
🕐 Time: ${bookingData.preferredTime}
💎 Type: ${bookingData.demoType || 'FREE'}
📚 Course: ${coursesList}

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
        phoneNumber: '9311946297',
        type: 'Text',
        data: {
          message: adminMessage,
        },
      }),
    })

    console.log('✅ Admin notified via WhatsApp')
  } catch (error) {
    console.error('❌ Admin notification failed:', error)
  }
}

// Handle GET requests for fetching demo bookings (admin use)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build query filters
    const where: any = {}
    if (status) {
      where.status = status.toUpperCase() // PENDING, CONFIRMED, etc.
    }

    // Fetch from database
    const [bookings, total] = await Promise.all([
      prisma.demoBooking.findMany({
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
      prisma.demoBooking.count({ where }),
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
    console.error('Fetch demo bookings error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Handle PUT requests for updating demo bookings (admin use)
export async function PUT(request: NextRequest) {
  try {
    const { bookingId, updates } = await request.json()

    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 })
    }

    // Validate bookingId exists
    const existingBooking = await prisma.demoBooking.findUnique({
      where: { id: bookingId },
    })

    if (!existingBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Update booking
    const updatedBooking = await prisma.demoBooking.update({
      where: { id: bookingId },
      data: {
        ...updates,
        updatedAt: new Date(),
      },
    })

    console.log('✅ Demo booking updated:', {
      id: updatedBooking.id,
      changes: Object.keys(updates),
    })

    return NextResponse.json({
      success: true,
      message: 'Demo booking updated successfully',
      booking: updatedBooking,
    })
  } catch (error) {
    console.error('Update demo booking error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
