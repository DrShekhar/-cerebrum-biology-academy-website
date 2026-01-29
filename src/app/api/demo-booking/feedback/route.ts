import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { withRateLimit } from '@/lib/middleware/rateLimit'
import { withAdmin, UserSession } from '@/lib/auth/middleware'
import { logger } from '@/lib/utils/logger'
import * as crypto from 'crypto'

// Token expiration: 7 days after demo (in milliseconds)
const FEEDBACK_TOKEN_EXPIRY_DAYS = 7
const FEEDBACK_TOKEN_EXPIRY_MS = FEEDBACK_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000

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
 * Get feedback token secret - fails if not configured in production
 */
function getFeedbackSecret(): string {
  const secret = process.env.FEEDBACK_TOKEN_SECRET
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      logger.error('FEEDBACK_TOKEN_SECRET is not configured in production!')
      throw new Error('Feedback token secret not configured')
    }
    // Only allow fallback in development
    return 'cerebrum-feedback-dev-secret-2025'
  }
  return secret
}

/**
 * Generate feedback token using HMAC with timestamp for expiration
 * Token format: timestamp.HMAC-SHA256(bookingId:timestamp, secret)
 * Timestamp is rounded to nearest hour to prevent token leakage via timing
 */
function generateFeedbackToken(bookingId: string, timestamp?: number): string {
  const secret = getFeedbackSecret()
  // Round to nearest hour to reduce token variations
  const ts = timestamp || Math.floor(Date.now() / 3600000) * 3600000
  const data = `${bookingId}:${ts}`
  const hmac = crypto.createHmac('sha256', secret).update(data).digest('hex')
  // Encode timestamp in base36 to shorten the token
  return `${ts.toString(36)}.${hmac}`
}

/**
 * Verify feedback token with expiration check
 * Returns { valid: boolean, expired?: boolean }
 */
function verifyFeedbackToken(bookingId: string, token: string, demoDate?: Date): { valid: boolean; expired?: boolean } {
  try {
    const [tsEncoded, hmac] = token.split('.')
    if (!tsEncoded || !hmac) {
      return { valid: false }
    }

    const timestamp = parseInt(tsEncoded, 36)
    if (isNaN(timestamp)) {
      return { valid: false }
    }

    // Regenerate expected token with same timestamp
    const expectedToken = generateFeedbackToken(bookingId, timestamp)
    const expectedHmac = expectedToken.split('.')[1]

    // Use timing-safe comparison to prevent timing attacks
    const hmacBuffer = Buffer.from(hmac)
    const expectedBuffer = Buffer.from(expectedHmac)

    if (hmacBuffer.length !== expectedBuffer.length) {
      return { valid: false }
    }

    const isValid = crypto.timingSafeEqual(hmacBuffer, expectedBuffer)
    if (!isValid) {
      return { valid: false }
    }

    // Check expiration - token expires FEEDBACK_TOKEN_EXPIRY_DAYS after demo date
    // If no demo date provided, use token creation time + expiry
    const expiryBase = demoDate ? demoDate.getTime() : timestamp
    const expiresAt = expiryBase + FEEDBACK_TOKEN_EXPIRY_MS

    if (Date.now() > expiresAt) {
      return { valid: true, expired: true }
    }

    return { valid: true, expired: false }
  } catch (error) {
    logger.warn('Token verification error', { error })
    return { valid: false }
  }
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
      failClosed: true, // Block requests if rate limit check fails
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

    // Check if booking exists first (need demo date for token expiration)
    const booking = await prisma.demoBooking.findUnique({
      where: { id: bookingId },
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Parse demo date for expiration check
    const demoDate = booking.preferredDate
      ? new Date(`${booking.preferredDate}T${booking.preferredTime?.split(' ')[0] || '10:00'}`)
      : undefined

    // Verify token with expiration check
    const tokenResult = verifyFeedbackToken(bookingId, token, demoDate)
    if (!tokenResult.valid) {
      return NextResponse.json(
        { success: false, error: 'Invalid feedback token' },
        { status: 401 }
      )
    }

    if (tokenResult.expired) {
      return NextResponse.json(
        {
          success: false,
          error: 'Feedback link has expired. Please contact support if you still wish to provide feedback.',
        },
        { status: 410 } // 410 Gone - resource no longer available
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

// GET: Generate feedback link for a booking (admin use only)
async function handleGetFeedbackLink(request: NextRequest, _session: UserSession) {
  try {
    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('id')

    if (!bookingId) {
      return NextResponse.json(
        { success: false, error: 'Booking ID is required' },
        { status: 400 }
      )
    }

    // Check if booking exists (include preferredDate for expiry calculation)
    const booking = await prisma.demoBooking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        studentName: true,
        demoRating: true,
        demoCompleted: true,
        preferredDate: true,
        preferredTime: true,
      },
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Generate feedback token with timestamp
    const token = generateFeedbackToken(bookingId)
    const feedbackUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://cerebrumbiologyacademy.com'}/demo-feedback?id=${bookingId}&token=${token}`

    // Calculate token expiry date
    const demoDate = booking.preferredDate
      ? new Date(`${booking.preferredDate}T${booking.preferredTime?.split(' ')[0] || '10:00'}`)
      : new Date()
    const expiresAt = new Date(demoDate.getTime() + FEEDBACK_TOKEN_EXPIRY_MS)

    return NextResponse.json({
      success: true,
      data: {
        bookingId: booking.id,
        studentName: booking.studentName,
        feedbackSubmitted: booking.demoRating !== null,
        feedbackUrl,
        token,
        expiresAt: expiresAt.toISOString(),
        expiresInDays: FEEDBACK_TOKEN_EXPIRY_DAYS,
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

// Protect GET with admin authentication - prevents token enumeration
export const GET = withAdmin(handleGetFeedbackLink)
