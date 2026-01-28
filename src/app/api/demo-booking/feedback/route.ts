import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { withRateLimit } from '@/lib/middleware/rateLimit'
import { logger } from '@/lib/utils/logger'
import * as crypto from 'crypto'

const feedbackSchema = z.object({
  bookingId: z.string().min(1, 'Booking ID is required'),
  token: z.string().min(32, 'Invalid feedback token'),
  rating: z.number().min(1).max(5),
  feedback: z.string().max(2000).optional(),
  wouldRecommend: z.boolean().optional(),
  topicsLiked: z.array(z.string()).optional(),
  improvementSuggestions: z.string().max(1000).optional(),
})

/**
 * Generate feedback token using HMAC
 * Token = HMAC-SHA256(bookingId, secret)
 */
function generateFeedbackToken(bookingId: string): string {
  const secret = process.env.FEEDBACK_TOKEN_SECRET || 'cerebrum-feedback-secret-2025'
  return crypto.createHmac('sha256', secret).update(bookingId).digest('hex')
}

/**
 * Verify feedback token
 */
function verifyFeedbackToken(bookingId: string, token: string): boolean {
  const expectedToken = generateFeedbackToken(bookingId)
  // Use timing-safe comparison to prevent timing attacks
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expectedToken))
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp = forwardedFor?.split(',')[0].trim() || 'unknown'

    const rateLimitResult = await withRateLimit(request, {
      identifier: `demo-feedback:${clientIp}`,
      limit: 10,
      window: 60 * 60 * 1000, // 10 submissions per hour
      keyPrefix: 'demo-feedback',
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many feedback submissions' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const validation = feedbackSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid feedback data',
          details: validation.error.issues,
        },
        { status: 400 }
      )
    }

    const {
      bookingId,
      token,
      rating,
      feedback,
      wouldRecommend,
      topicsLiked,
      improvementSuggestions,
    } = validation.data

    // Verify token
    if (!verifyFeedbackToken(bookingId, token)) {
      return NextResponse.json(
        { success: false, error: 'Invalid feedback token' },
        { status: 401 }
      )
    }

    // Check if booking exists
    const booking = await prisma.demoBooking.findUnique({
      where: { id: bookingId },
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Check if feedback already submitted
    if (booking.demoRating !== null) {
      return NextResponse.json(
        { success: false, error: 'Feedback has already been submitted for this demo' },
        { status: 400 }
      )
    }

    // Save feedback
    const existingMetadata = (booking.metadata as any) || {}
    const updatedBooking = await prisma.demoBooking.update({
      where: { id: bookingId },
      data: {
        demoRating: rating,
        demoFeedback: feedback || null,
        demoCompleted: true,
        metadata: {
          ...existingMetadata,
          wouldRecommend,
          topicsLiked,
          improvementSuggestions,
          feedbackSubmittedAt: new Date().toISOString(),
        },
        updatedAt: new Date(),
      },
    })

    // Log activity
    try {
      await prisma.activities.create({
        data: {
          action: 'DEMO_FEEDBACK_SUBMITTED',
          description: `Demo feedback submitted: ${rating}/5 stars`,
          metadata: {
            bookingId,
            rating,
            wouldRecommend,
            studentName: booking.studentName,
          },
        },
      })
    } catch (activityError) {
      logger.warn('Failed to create feedback activity log', { error: activityError })
    }

    // If rating is high (4-5), potentially queue for testimonial request
    if (rating >= 4) {
      logger.info('High rating demo feedback - consider testimonial request', {
        bookingId,
        rating,
        studentName: booking.studentName,
      })
    }

    logger.info('Demo feedback submitted', {
      bookingId,
      rating,
      wouldRecommend,
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you for your feedback! Your input helps us improve.',
    })
  } catch (error) {
    logger.error('Feedback submission error:', { error })
    return NextResponse.json(
      { success: false, error: 'Failed to submit feedback' },
      { status: 500 }
    )
  }
}

// GET: Generate feedback link for a booking (admin use)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('id')

    if (!bookingId) {
      return NextResponse.json(
        { success: false, error: 'Booking ID is required' },
        { status: 400 }
      )
    }

    // Check if booking exists
    const booking = await prisma.demoBooking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        studentName: true,
        demoRating: true,
        demoCompleted: true,
      },
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Generate feedback token
    const token = generateFeedbackToken(bookingId)
    const feedbackUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://cerebrumbiologyacademy.com'}/demo-feedback?id=${bookingId}&token=${token}`

    return NextResponse.json({
      success: true,
      data: {
        bookingId: booking.id,
        studentName: booking.studentName,
        feedbackSubmitted: booking.demoRating !== null,
        feedbackUrl,
        token,
      },
    })
  } catch (error) {
    logger.error('Error generating feedback link:', { error })
    return NextResponse.json(
      { success: false, error: 'Failed to generate feedback link' },
      { status: 500 }
    )
  }
}
