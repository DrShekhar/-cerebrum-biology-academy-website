import { NextRequest, NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/auth'
import {
  getDemoBookings,
  getDemoBookingStats,
  createDemoBooking,
} from '@/lib/database/demo-bookings'
import { z } from 'zod'

// Validation schema for demo booking creation
const createDemoBookingSchema = z.object({
  studentName: z.string().min(1, 'Student name is required'),
  email: z.string().email('Valid email is required').optional(),
  phone: z.string().min(10, 'Valid phone number is required'),
  courseId: z.string().optional(),
  studentClass: z
    .enum(['CLASS_9', 'CLASS_10', 'CLASS_11', 'CLASS_12', 'DROPPER', 'FOUNDATION'])
    .optional(),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTime: z.string().min(1, 'Preferred time is required'),
  message: z.string().optional(),
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
})

// GET /api/admin/demo-bookings - Get all demo bookings
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    await requireAdminAuth()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as any
    const assignedTo = searchParams.get('assignedTo')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    // Build filter options
    const options: any = { page, limit }
    if (status) options.status = status
    if (assignedTo) options.assignedTo = assignedTo
    if (search) options.search = search
    if (dateFrom) options.dateFrom = new Date(dateFrom)
    if (dateTo) options.dateTo = new Date(dateTo)

    // Get bookings and stats
    const [bookingsResult, stats] = await Promise.all([
      getDemoBookings(options),
      getDemoBookingStats(
        options.dateFrom && options.dateTo
          ? {
              dateFrom: options.dateFrom,
              dateTo: options.dateTo,
            }
          : undefined
      ),
    ])

    return NextResponse.json({
      success: true,
      data: {
        bookings: bookingsResult.bookings,
        pagination: bookingsResult.pagination,
        stats,
      },
    })
  } catch (error) {
    console.error('Demo bookings API error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch demo bookings' },
      { status: 500 }
    )
  }
}

// POST /api/admin/demo-bookings - Create new demo booking
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    await requireAdminAuth()

    const body = await request.json()

    // Validate request body
    const validatedData = createDemoBookingSchema.parse(body)

    // Create demo booking in database
    const newBooking = await createDemoBooking({
      ...validatedData,
      source: validatedData.source || 'admin',
    })

    return NextResponse.json(
      {
        success: true,
        data: newBooking,
        message: 'Demo booking created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create demo booking error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create demo booking' },
      { status: 500 }
    )
  }
}
