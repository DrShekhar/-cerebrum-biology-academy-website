// Demo Booking API Route
// Handles demo booking submissions with real-time notifications

import { NextRequest, NextResponse } from 'next/server'
import { adminDb as db } from '@/lib/db-admin'
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

    const rawData: DemoBookingData = await request.json()

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

    const data = validationResult.data

    // Generate unique ID
    const bookingId = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create demo booking record
    const bookingData = {
      id: bookingId,
      userId: 'guest', // For now, handling guest bookings
      studentName: data.name,
      phone: data.phone,
      whatsappNumber: data.whatsappNumber || data.phone,
      email: data.email,
      courseInterest: data.courseInterest,
      preferredDate: new Date(data.preferredDate),
      preferredTimeStart: data.preferredTime.split(' - ')[0],
      preferredTimeEnd: data.preferredTime.split(' - ')[1],
      timezone: 'Asia/Kolkata',
      status: 'pending',
      notes: data.message || '',
      remindersSent: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      followUpRequired: true,
    }

    // Save to database
    await db.transact([db.tx.demoBookings[bookingId].update(bookingData)])

    // Create user activity record (with sanitized data)
    await db.transact([
      db.tx.userActivities[`activity_${bookingId}`].update({
        userId: 'guest',
        type: 'demo_booking',
        data: {
          bookingId,
          courses: data.courseInterest,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
        },
        timestamp: new Date(),
        sessionId: request.headers.get('x-session-id') || 'unknown',
        ipAddress: clientIp,
        userAgent: request.headers.get('user-agent')?.substring(0, 200) || 'unknown', // Limit user agent length
      }),
    ])

    // Create contact record for CRM
    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    await db.transact([
      db.tx.contacts[contactId].update({
        name: data.name,
        email: data.email,
        phone: data.phone,
        whatsappNumber: data.whatsappNumber || data.phone,
        source: 'website',
        status: 'new',
        tags: ['demo_booked', ...data.courseInterest],
        leadScore: 75, // High score for demo bookings
        createdAt: new Date(),
        conversionProbability: 65,
        estimatedValue: 75000, // Average course value
      }),
    ])

    // Create real-time notification for admin panel
    const notificationId = `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    await db.transact([
      db.tx.notifications[notificationId].update({
        type: 'demo_booking',
        title: 'New Demo Booking',
        message: `${data.name} booked a demo for ${data.courseInterest.join(', ')} on ${new Date(data.preferredDate).toLocaleDateString()}`,
        data: {
          bookingId,
          studentName: data.name,
          courses: data.courseInterest,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
          phone: data.phone,
          email: data.email,
        },
        recipients: ['admin'], // All admin users
        channels: ['in_app', 'email'],
        priority: 'high',
        status: 'queued',
        createdAt: new Date(),
      }),
    ])

    // Create real-time event for dashboard
    await db.transact([
      db.tx.realTimeEvents[`event_${bookingId}`].update({
        type: 'demo_booking_created',
        data: {
          bookingId,
          studentName: data.name,
          courses: data.courseInterest,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
        },
        timestamp: new Date(),
        processed: false,
      }),
    ])

    // Schedule follow-up actions
    await scheduleFollowUpActions(bookingId, data)

    // Send immediate notifications
    await sendImmediateNotifications(bookingData)

    return NextResponse.json({
      success: true,
      bookingId,
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

  // Create notification tasks
  const tasks = [
    {
      id: `task_confirm_${bookingId}`,
      type: 'confirmation_call',
      scheduledFor: confirmationTime,
      data: { bookingId, phone: data.phone, name: data.name },
    },
    {
      id: `task_reminder_${bookingId}`,
      type: 'demo_reminder',
      scheduledFor: reminderTime,
      data: { bookingId, whatsappNumber: data.whatsappNumber || data.phone, name: data.name },
    },
  ]

  for (const task of tasks) {
    await db.transact([
      db.tx.notifications[task.id].update({
        type: task.type,
        title:
          task.type === 'confirmation_call' ? 'Confirmation Call Required' : 'Send Demo Reminder',
        message:
          task.type === 'confirmation_call'
            ? `Call ${data.name} to confirm demo booking`
            : `Send demo reminder to ${data.name}`,
        data: task.data,
        recipients: ['admin'],
        channels: ['in_app'],
        priority: 'medium',
        status: 'scheduled',
        scheduledFor: task.scheduledFor,
        createdAt: new Date(),
      }),
    ])
  }
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

    // Query demo bookings
    const query = db.query({
      demoBookings: status ? { status } : {},
    })

    const result = await query

    return NextResponse.json({
      success: true,
      bookings: result.demoBookings,
      total: result.demoBookings.length,
    })
  } catch (error) {
    console.error('Fetch demo bookings error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Handle PUT requests for updating demo bookings (admin use)
export async function PUT(request: NextRequest) {
  try {
    const { bookingId, updates } = await request.json()

    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 })
    }

    // Update demo booking
    await db.transact([
      db.tx.demoBookings[bookingId].update({
        ...updates,
        updatedAt: new Date(),
      }),
    ])

    // Create activity log
    const activityId = `activity_update_${bookingId}_${Date.now()}`
    await db.transact([
      db.tx.userActivities[activityId].update({
        userId: 'admin',
        type: 'demo_booking_update',
        data: {
          bookingId,
          updates,
          updatedBy: 'admin', // In real app, get from auth
        },
        timestamp: new Date(),
        sessionId: request.headers.get('x-session-id') || 'admin',
      }),
    ])

    return NextResponse.json({
      success: true,
      message: 'Demo booking updated successfully',
    })
  } catch (error) {
    console.error('Update demo booking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
