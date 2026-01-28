import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { withRateLimit } from '@/lib/middleware/rateLimit'
import { zoomService } from '@/lib/zoom/zoomService'
import { sendWhatsAppMessage, isInteraktConfigured } from '@/lib/interakt'
import { logger } from '@/lib/utils/logger'
import { Prisma } from '@/generated/prisma'

const SUPPORT_PHONE = process.env.SUPPORT_PHONE_NUMBER || '+91 88264 44334'

const cancelSchema = z.object({
  bookingId: z.string().min(1, 'Booking ID is required'),
  token: z.string().min(32, 'Invalid cancellation token'),
  reason: z.string().max(500).optional(),
})

/**
 * Verify and consume cancellation/reschedule token
 * Uses reschedule_tokens table (shared with reschedule flow)
 */
async function verifyAndConsumeToken(
  bookingId: string,
  token: string
): Promise<{ valid: boolean; booking?: any }> {
  const result = await prisma.$transaction(
    async (tx) => {
      // Find valid token
      const tokenRecord = await tx.rescheduleToken.findFirst({
        where: {
          bookingId,
          token,
          used: false,
          expiresAt: { gte: new Date() },
        },
      })

      if (!tokenRecord) {
        return { valid: false }
      }

      // Mark token as used
      await tx.rescheduleToken.update({
        where: { id: tokenRecord.id },
        data: { used: true },
      })

      // Get booking details
      const booking = await tx.demoBooking.findUnique({
        where: { id: bookingId },
      })

      return { valid: true, booking }
    },
    { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
  )

  return result
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - prevent abuse
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp = forwardedFor?.split(',')[0].trim() || 'unknown'

    const rateLimitResult = await withRateLimit(request, {
      identifier: `cancel-booking:${clientIp}`,
      limit: 5,
      window: 15 * 60 * 1000, // 5 attempts per 15 minutes
      keyPrefix: 'cancel-booking',
      failClosed: true,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many cancellation attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const validation = cancelSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          details: validation.error.issues,
        },
        { status: 400 }
      )
    }

    const { bookingId, token, reason } = validation.data

    // Verify token and get booking
    const tokenResult = await verifyAndConsumeToken(bookingId, token)

    if (!tokenResult.valid) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid or expired cancellation link. Please contact support: ${SUPPORT_PHONE}`,
        },
        { status: 401 }
      )
    }

    const booking = tokenResult.booking

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Check if already cancelled
    if (booking.status === 'CANCELLED') {
      return NextResponse.json(
        { success: false, error: 'This booking has already been cancelled' },
        { status: 400 }
      )
    }

    // Cancel Zoom meeting if it exists
    const metadata = booking.metadata as any || {}
    if (metadata.zoomMeetingId) {
      await zoomService.cancelDemoMeeting(metadata.zoomMeetingId)
    }

    // Update booking status to CANCELLED
    await prisma.demoBooking.update({
      where: { id: bookingId },
      data: {
        status: 'CANCELLED',
        metadata: {
          ...metadata,
          cancelledAt: new Date().toISOString(),
          cancellationReason: reason || 'User requested cancellation',
        },
        updatedAt: new Date(),
      },
    })

    // Update associated lead if exists
    await prisma.leads.updateMany({
      where: { demoBookingId: bookingId },
      data: {
        stage: 'DEMO_CANCELLED',
        updatedAt: new Date(),
      },
    })

    // Log activity
    try {
      await prisma.activities.create({
        data: {
          action: 'DEMO_CANCELLED',
          description: `Demo booking cancelled by student. Reason: ${reason || 'Not specified'}`,
          metadata: {
            bookingId,
            studentName: booking.studentName,
            preferredDate: booking.preferredDate,
            preferredTime: booking.preferredTime,
          },
        },
      })
    } catch (activityError) {
      // Non-critical, log and continue
      logger.warn('Failed to create cancellation activity log', { error: activityError })
    }

    // Send cancellation confirmation (non-blocking)
    sendCancellationNotification(booking, reason).catch((err) => {
      logger.warn('Failed to send cancellation notification', { error: err })
    })

    logger.info('Demo booking cancelled successfully', {
      bookingId,
      studentName: booking.studentName,
      reason,
    })

    return NextResponse.json({
      success: true,
      message: 'Your demo class has been cancelled successfully.',
    })
  } catch (error) {
    logger.error('Cancellation error:', { error })
    return NextResponse.json(
      { success: false, error: 'Failed to cancel booking. Please try again or contact support.' },
      { status: 500 }
    )
  }
}

async function sendCancellationNotification(
  booking: {
    studentName: string
    phone: string
    preferredDate: string
    preferredTime: string
  },
  reason?: string
) {
  if (!isInteraktConfigured()) return

  try {
    // Send simple text message about cancellation
    await sendWhatsAppMessage({
      phone: booking.phone,
      message: `Hi ${booking.studentName}, your demo class scheduled for ${booking.preferredDate} at ${booking.preferredTime} has been cancelled as requested. We hope to see you again! Contact us at ${SUPPORT_PHONE} to reschedule.`,
    })
  } catch (error) {
    logger.error('Error sending cancellation WhatsApp', { error })
  }
}

// GET endpoint to view cancellation page info
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('id')
    const token = searchParams.get('token')

    if (!bookingId || !token) {
      return NextResponse.json(
        { success: false, error: 'Missing booking ID or token' },
        { status: 400 }
      )
    }

    // Verify token without consuming it
    const tokenRecord = await prisma.rescheduleToken.findFirst({
      where: {
        bookingId,
        token,
        used: false,
        expiresAt: { gte: new Date() },
      },
    })

    if (!tokenRecord) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired cancellation link' },
        { status: 401 }
      )
    }

    // Get booking details
    const booking = await prisma.demoBooking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        studentName: true,
        email: true,
        preferredDate: true,
        preferredTime: true,
        status: true,
      },
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        studentName: booking.studentName,
        email: booking.email,
        preferredDate: booking.preferredDate,
        preferredTime: booking.preferredTime,
        status: booking.status,
      },
    })
  } catch (error) {
    logger.error('Error fetching cancellation details:', { error })
    return NextResponse.json(
      { success: false, error: 'Failed to fetch booking details' },
      { status: 500 }
    )
  }
}
