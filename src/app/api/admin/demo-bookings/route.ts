import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { EnhancedDemoBooking } from '@/lib/admin-schema'
import { requireAdminAuth } from '@/lib/auth/admin-auth'

// GET /api/admin/demo-bookings - Get all demo bookings with filters
export const GET = requireAdminAuth(async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const assignedTo = searchParams.get('assignedTo')
    const source = searchParams.get('source')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    // Build filter conditions
    const whereConditions: any = {}
    
    if (status) whereConditions.status = status
    if (assignedTo) whereConditions.assignedTo = assignedTo
    if (source) whereConditions.source = source
    if (dateFrom && dateTo) {
      whereConditions.createdAt = {
        $gte: new Date(dateFrom).getTime(),
        $lte: new Date(dateTo).getTime()
      }
    }

    // Query demo bookings with real-time updates
    const demoBookings = await db.query({
      demoBookings: {
        $: {
          where: whereConditions,
          order: { createdAt: 'desc' },
          limit: limit,
          offset: (page - 1) * limit
        },
        user: {} // Join with user data
      },
      totalCount: {
        $: {
          where: whereConditions
        }
      }
    })

    // Calculate summary statistics
    const stats = await calculateDemoStats(whereConditions)

    return NextResponse.json({
      success: true,
      data: {
        bookings: demoBookings.demoBookings,
        pagination: {
          page,
          limit,
          total: demoBookings.totalCount.length,
          pages: Math.ceil(demoBookings.totalCount.length / limit)
        },
        stats
      }
    })

  } catch (error) {
    console.error('Demo bookings API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch demo bookings' },
      { status: 500 }
    )
  }
})

// POST /api/admin/demo-bookings - Create new demo booking (typically from admin interface)
export const POST = requireAdminAuth(async (request: NextRequest) => {
  try {
    const body = await request.json()
    const { 
      userId, 
      courseId, 
      studentName, 
      email, 
      phone, 
      preferredDate, 
      preferredTime,
      message,
      source = 'admin',
      assignedTo,
      studentClass,
      targetScore
    } = body

    // Validate required fields
    if (!studentName || !phone || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const demoBookingId = db.id()
    const now = Date.now()

    const newDemoBooking: EnhancedDemoBooking = {
      id: demoBookingId,
      userId: userId || `guest_${now}`,
      courseId: courseId || 'general',
      studentName,
      email: email || '',
      phone,
      preferredDate,
      preferredTime,
      message,
      status: 'pending',
      createdAt: now,
      
      // Enhanced fields
      source,
      assignedTo,
      followUpDate: now + (24 * 60 * 60 * 1000), // Default 24h follow-up
      remindersSent: 0,
      studentClass: studentClass || '12th',
      targetScore,
      competitiveExams: ['NEET'],
      convertedToEnrollment: false,
      communicationHistory: [{
        type: 'demo_booking',
        timestamp: now,
        content: `Demo booking created for ${preferredDate} at ${preferredTime}`,
        sentBy: 'system'
      }]
    }

    // Save to database with real-time updates
    await db.transact([
      db.tx.demoBookings[demoBookingId].update(newDemoBooking)
    ])

    // Trigger automated workflows
    await triggerDemoBookingWorkflows(newDemoBooking)

    return NextResponse.json({
      success: true,
      data: newDemoBooking
    }, { status: 201 })

  } catch (error) {
    console.error('Create demo booking error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create demo booking' },
      { status: 500 }
    )
  }
})

// PATCH /api/admin/demo-bookings/[id] - Update demo booking status and details
export const PATCH = requireAdminAuth(async (request: NextRequest) => {
  try {
    const body = await request.json()
    const { id, status, assignedTo, followUpDate, demoFeedback, notes } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Demo booking ID is required' },
        { status: 400 }
      )
    }

    const updates: Partial<EnhancedDemoBooking> = {
      updatedAt: Date.now()
    }

    if (status) updates.status = status
    if (assignedTo) updates.assignedTo = assignedTo
    if (followUpDate) updates.followUpDate = followUpDate
    if (demoFeedback) updates.demoFeedback = demoFeedback

    // Add communication log entry
    if (notes) {
      const currentBooking = await db.query({
        demoBookings: {
          $: { where: { id } }
        }
      })

      if (currentBooking.demoBookings.length > 0) {
        const booking = currentBooking.demoBookings[0] as EnhancedDemoBooking
        updates.communicationHistory = [
          ...(booking.communicationHistory || []),
          {
            type: 'admin_note',
            timestamp: Date.now(),
            content: notes,
            sentBy: 'admin' // Would be actual admin ID in production
          }
        ]
      }
    }

    // Update database
    await db.transact([
      db.tx.demoBookings[id].update(updates)
    ])

    // Trigger status-based workflows
    if (status) {
      await handleStatusChange(id, status)
    }

    return NextResponse.json({
      success: true,
      message: 'Demo booking updated successfully'
    })

  } catch (error) {
    console.error('Update demo booking error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update demo booking' },
      { status: 500 }
    )
  }
})

// Helper function to calculate demo booking statistics
async function calculateDemoStats(whereConditions: any) {
  const allBookings = await db.query({
    demoBookings: {
      $: { where: whereConditions }
    }
  })

  const bookings = allBookings.demoBookings as EnhancedDemoBooking[]

  const total = bookings.length
  const pending = bookings.filter(b => b.status === 'pending').length
  const confirmed = bookings.filter(b => b.status === 'confirmed').length
  const completed = bookings.filter(b => b.status === 'completed').length
  const cancelled = bookings.filter(b => b.status === 'cancelled').length
  const converted = bookings.filter(b => b.convertedToEnrollment).length

  const conversionRate = completed > 0 ? (converted / completed) * 100 : 0

  // Source breakdown
  const sourceBreakdown = bookings.reduce((acc: any, booking) => {
    acc[booking.source] = (acc[booking.source] || 0) + 1
    return acc
  }, {})

  // Class distribution
  const classDistribution = bookings.reduce((acc: any, booking) => {
    const studentClass = booking.studentClass || 'Unknown'
    acc[studentClass] = (acc[studentClass] || 0) + 1
    return acc
  }, {})

  return {
    total,
    pending,
    confirmed,
    completed,
    cancelled,
    converted,
    conversionRate: Math.round(conversionRate * 100) / 100,
    sourceBreakdown,
    classDistribution
  }
}

// Trigger automated workflows for new demo bookings
async function triggerDemoBookingWorkflows(booking: EnhancedDemoBooking) {
  try {
    // 1. Send confirmation WhatsApp message
    await sendWhatsAppConfirmation(booking)
    
    // 2. Schedule reminder notifications
    await scheduleReminders(booking)
    
    // 3. Assign to sales team if not already assigned
    if (!booking.assignedTo) {
      await autoAssignToSalesTeam(booking)
    }
    
    // 4. Add to marketing automation funnel
    await addToMarketingFunnel(booking)

  } catch (error) {
    console.error('Workflow trigger error:', error)
  }
}

// Handle status change workflows
async function handleStatusChange(bookingId: string, newStatus: string) {
  switch (newStatus) {
    case 'confirmed':
      await sendDemoConfirmationNotifications(bookingId)
      break
    case 'completed':
      await sendFeedbackRequest(bookingId)
      await triggerFollowUpSequence(bookingId)
      break
    case 'cancelled':
      await handleCancellation(bookingId)
      break
  }
}

// Placeholder functions for external integrations
async function sendWhatsAppConfirmation(booking: EnhancedDemoBooking) {
  // WhatsApp API integration
  console.log(`Sending WhatsApp confirmation to ${booking.phone}`)
}

async function scheduleReminders(booking: EnhancedDemoBooking) {
  // Schedule system reminders
  console.log(`Scheduling reminders for booking ${booking.id}`)
}

async function autoAssignToSalesTeam(booking: EnhancedDemoBooking) {
  // Auto-assignment logic based on load balancing
  console.log(`Auto-assigning booking ${booking.id}`)
}

async function addToMarketingFunnel(booking: EnhancedDemoBooking) {
  // Add to marketing automation
  console.log(`Adding ${booking.id} to marketing funnel`)
}

async function sendDemoConfirmationNotifications(bookingId: string) {
  console.log(`Sending demo confirmation for ${bookingId}`)
}

async function sendFeedbackRequest(bookingId: string) {
  console.log(`Sending feedback request for ${bookingId}`)
}

async function triggerFollowUpSequence(bookingId: string) {
  console.log(`Triggering follow-up sequence for ${bookingId}`)
}

async function handleCancellation(bookingId: string) {
  console.log(`Handling cancellation for ${bookingId}`)
}