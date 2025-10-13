// Demo Booking API Route
// Handles demo booking submissions with real-time notifications

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { DemoBookingData } from '@/components/admin/DemoBookingModal'
import { z } from 'zod'

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

  // Log scheduled tasks (TODO: implement proper task scheduling)
  console.log('Scheduled follow-up actions:', {
    bookingId,
    confirmationCall: confirmationTime,
    reminderCall: reminderTime,
    phone: data.phone,
    name: data.name,
  })

  // TODO: Implement proper task scheduling system
  // Options:
  // 1. Use a job queue (Bull, Agenda)
  // 2. Use cron jobs with database
  // 3. Use external service (Zapier, Airtable automations)
}

// Send immediate notifications to admin team
async function sendImmediateNotifications(bookingData: any) {
  // In a real implementation, you would:
  // 1. Send email to admin team
  // 2. Send WhatsApp message to admin
  // 3. Create Slack notification
  // 4. Update admin dashboard in real-time

  console.log('Sending immediate notifications for booking:', bookingData.id)

  // For now, we'll just log the notification
  // In production, integrate with:
  // - Email service (SendGrid, AWS SES)
  // - WhatsApp Business API
  // - Slack API
  // - Real-time dashboard updates
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
