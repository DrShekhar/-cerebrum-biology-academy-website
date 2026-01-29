import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'
import { withAdmin, UserSession } from '@/lib/auth/middleware'
import { withRateLimit } from '@/lib/middleware/rateLimit'
import { Prisma } from '@/generated/prisma'
import { normalizePhone } from '@/lib/utils/phone'

// Support phone from environment
const SUPPORT_PHONE = process.env.SUPPORT_PHONE_NUMBER || '+91 88264 44334'

function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Atomic token verification - marks token as used in single operation to prevent race conditions
async function verifyAndConsumeToken(
  bookingId: string,
  token: string
): Promise<{ valid: boolean; tokenId?: string }> {
  // Use serializable isolation to prevent race conditions
  // This atomically: 1) finds valid token, 2) marks it used, 3) returns result
  const result = await prisma.$transaction(
    async (tx) => {
      // Find and lock the token row
      const tokenRecord = await tx.rescheduleToken.findFirst({
        where: {
          bookingId,
          token,
          used: false,
          expiresAt: {
            gte: new Date(),
          },
        },
      })

      if (!tokenRecord) {
        return { valid: false }
      }

      // Atomically mark as used within same transaction
      await tx.rescheduleToken.update({
        where: { id: tokenRecord.id },
        data: { used: true },
      })

      return { valid: true, tokenId: tokenRecord.id }
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    }
  )

  return result
}

// Non-consuming token verification (for GET requests to display booking info)
// Includes artificial delay to prevent timing attacks on token enumeration
async function verifyTokenReadOnly(bookingId: string, token: string): Promise<boolean> {
  const startTime = Date.now()
  const MIN_RESPONSE_TIME = 100 // Minimum 100ms response time

  const result = await prisma.rescheduleToken.findFirst({
    where: {
      bookingId,
      token,
      used: false,
      expiresAt: {
        gte: new Date(),
      },
    },
  })

  // Add artificial delay to make response time constant regardless of whether token exists
  // This prevents timing attacks that could enumerate valid tokens
  const elapsed = Date.now() - startTime
  if (elapsed < MIN_RESPONSE_TIME) {
    await new Promise((resolve) => setTimeout(resolve, MIN_RESPONSE_TIME - elapsed))
  }

  return result !== null
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit to prevent token brute-force attacks
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp =
      forwardedFor?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown'

    const rateLimitResult = await withRateLimit(request, {
      identifier: `reschedule-post:${clientIp}`,
      limit: 10, // 10 reschedule attempts per 15 minutes (stricter than GET)
      window: 15 * 60 * 1000,
      keyPrefix: 'reschedule-post',
      failClosed: true, // Security-critical: block requests if rate limiter fails
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many reschedule attempts. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { bookingId, token, newDate, newTime } = body

    // Validate inputs
    if (!bookingId || typeof bookingId !== 'string') {
      return NextResponse.json({ error: 'Valid booking ID is required' }, { status: 400 })
    }
    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Valid token is required' }, { status: 400 })
    }
    if (!newDate || typeof newDate !== 'string') {
      return NextResponse.json({ error: 'New date is required' }, { status: 400 })
    }
    if (!newTime || typeof newTime !== 'string') {
      return NextResponse.json({ error: 'New time is required' }, { status: 400 })
    }

    // Validate date format and ensure it's in the future
    const selectedDate = new Date(newDate)
    if (isNaN(selectedDate.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 })
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (selectedDate < today) {
      return NextResponse.json(
        { error: 'New date must be today or in the future' },
        { status: 400 }
      )
    }

    // Atomically verify AND consume token in single transaction to prevent race conditions
    const tokenResult = await verifyAndConsumeToken(bookingId, token)
    if (!tokenResult.valid) {
      return NextResponse.json(
        {
          error: `Invalid or expired reschedule link. Please contact support at ${SUPPORT_PHONE}`,
        },
        { status: 401 }
      )
    }

    // Token is now consumed - proceed with update
    const booking = await prisma.demoBooking.findUnique({
      where: { id: bookingId },
    })

    if (!booking) {
      // Token was consumed but booking not found - log for investigation
      console.error('Reschedule token consumed but booking not found', {
        bookingId,
        tokenId: tokenResult.tokenId,
      })
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const oldDate = booking.preferredDate
    const oldTime = booking.preferredTime

    // Update booking (token already marked as used)
    const updatedBooking = await prisma.demoBooking.update({
      where: { id: bookingId },
      data: {
        preferredDate: newDate,
        preferredTime: newTime,
        status: 'RESCHEDULED',
        updatedAt: new Date(),
      },
    })

    // Send notifications (fire and forget, don't block response)
    sendRescheduleNotifications(updatedBooking, oldDate, oldTime).catch((err) =>
      console.error('Failed to send reschedule notifications:', err)
    )

    console.log('Booking rescheduled:', {
      bookingId,
      oldDate,
      oldTime,
      newDate,
      newTime,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Demo class rescheduled successfully',
      booking: {
        id: updatedBooking.id,
        studentName: updatedBooking.studentName,
        preferredDate: updatedBooking.preferredDate,
        preferredTime: updatedBooking.preferredTime,
      },
    })
  } catch (error) {
    console.error('Reschedule error:', error)
    return NextResponse.json({ error: 'Failed to reschedule booking' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Rate limit to prevent token/booking enumeration
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp =
      forwardedFor?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown'

    const rateLimitResult = await withRateLimit(request, {
      identifier: `reschedule-get:${clientIp}`,
      limit: 20, // 20 requests per 15 minutes
      window: 15 * 60 * 1000,
      keyPrefix: 'reschedule-get',
      failClosed: true, // Security-critical: block requests if rate limiter fails
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('id')
    const token = searchParams.get('token')

    if (!bookingId || !token) {
      return NextResponse.json({ error: 'Missing booking ID or token' }, { status: 400 })
    }

    // Use read-only verification for GET (don't consume token)
    const isValid = await verifyTokenReadOnly(bookingId, token)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid or expired reschedule link' }, { status: 401 })
    }

    const booking = await prisma.demoBooking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        studentName: true,
        email: true,
        phone: true,
        preferredDate: true,
        preferredTime: true,
        demoType: true,
        status: true,
        createdAt: true,
      },
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      booking,
    })
  } catch (error) {
    console.error('Fetch booking error:', error)
    return NextResponse.json({ error: 'Failed to fetch booking details' }, { status: 500 })
  }
}

async function sendRescheduleNotifications(booking: any, oldDate: string, oldTime: string) {
  try {
    const formattedNewDate = new Date(booking.preferredDate).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    const formattedOldDate = new Date(oldDate).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    console.log('Sending reschedule notifications:', {
      bookingId: booking.id,
      studentName: booking.studentName,
      from: `${formattedOldDate} at ${oldTime}`,
      to: `${formattedNewDate} at ${booking.preferredTime}`,
    })

    const notificationPromises: Promise<any>[] = []

    // 1. Send WhatsApp notification to student
    if (process.env.INTERAKT_API_KEY && booking.phone) {
      const phone = normalizePhone(booking.phone)
      notificationPromises.push(
        fetch('https://api.interakt.ai/v1/public/message/', {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(process.env.INTERAKT_API_KEY + ':').toString('base64')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            countryCode: '+91',
            phoneNumber: phone,
            type: 'Text',
            data: {
              message: `Hi ${booking.studentName}! Your NEET Biology demo class has been rescheduled.\n\nPrevious: ${formattedOldDate} at ${oldTime}\nNew: ${formattedNewDate} at ${booking.preferredTime}\n\nA new Zoom link will be sent 30 mins before the class. Questions? Call ${SUPPORT_PHONE}`,
            },
          }),
        }).catch((err) => console.error('WhatsApp student notification failed:', err))
      )
    }

    // 2. Send Email notification to student
    if (process.env.RESEND_API_KEY && booking.email) {
      notificationPromises.push(
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Cerebrum Biology Academy <noreply@cerebrumbiologyacademy.com>',
            to: booking.email,
            subject: `Demo Class Rescheduled - ${formattedNewDate}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #2563eb, #9333ea); padding: 20px; text-align: center;">
                  <h1 style="color: white; margin: 0;">Demo Class Rescheduled</h1>
                </div>
                <div style="padding: 30px; background: #f9fafb;">
                  <p>Hi ${booking.studentName},</p>
                  <p>Your NEET Biology demo class has been rescheduled.</p>
                  <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="color: #666; margin-bottom: 10px;">
                      <strong>Previous:</strong> ${formattedOldDate} at ${oldTime}
                    </p>
                    <p style="color: #2563eb; font-size: 18px; margin: 0;">
                      <strong>New Date:</strong> ${formattedNewDate} at ${booking.preferredTime}
                    </p>
                  </div>
                  <p>A new Zoom link will be sent 30 minutes before your class.</p>
                  <p style="color: #666; font-size: 14px;">
                    Need help? Contact us at ${SUPPORT_PHONE} or reply to this email.
                  </p>
                </div>
                <div style="background: #1f2937; padding: 20px; text-align: center;">
                  <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                    © ${new Date().getFullYear()} Cerebrum Biology Academy
                  </p>
                </div>
              </div>
            `,
          }),
        }).catch((err) => console.error('Email student notification failed:', err))
      )
    }

    // 3. Notify admin team via WhatsApp
    const adminPhone = process.env.ADMIN_PHONE_NUMBER || '9311946297'
    if (process.env.INTERAKT_API_KEY) {
      notificationPromises.push(
        fetch('https://api.interakt.ai/v1/public/message/', {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(process.env.INTERAKT_API_KEY + ':').toString('base64')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            countryCode: '+91',
            phoneNumber: adminPhone,
            type: 'Text',
            data: {
              message: `📅 Demo RESCHEDULED\n\n👤 ${booking.studentName}\n📞 ${booking.phone}\nPrev: ${formattedOldDate} ${oldTime}\nNew: ${formattedNewDate} ${booking.preferredTime}`,
            },
          }),
        }).catch((err) => console.error('WhatsApp admin notification failed:', err))
      )
    }

    // Wait for all notifications (with timeout)
    await Promise.race([
      Promise.allSettled(notificationPromises),
      new Promise((resolve) => setTimeout(resolve, 5000)), // 5 second timeout
    ])

    console.log('Reschedule notifications sent successfully')
  } catch (error) {
    console.error('Failed to send reschedule notifications:', error)
  }
}

// Generate reschedule link - ADMIN ONLY to prevent IDOR attacks
async function handleGenerateRescheduleLink(request: NextRequest, session: UserSession) {
  try {
    const { bookingId } = await request.json()

    if (!bookingId || typeof bookingId !== 'string') {
      return NextResponse.json({ error: 'Valid booking ID required' }, { status: 400 })
    }

    const booking = await prisma.demoBooking.findUnique({
      where: { id: bookingId },
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Check if there's already an active (unused) token
    const existingToken = await prisma.rescheduleToken.findFirst({
      where: {
        bookingId,
        used: false,
        expiresAt: { gte: new Date() },
      },
    })

    if (existingToken) {
      // Return existing token instead of creating new one
      const rescheduleUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/demo-booking/reschedule?id=${bookingId}&token=${existingToken.token}`
      return NextResponse.json({
        success: true,
        rescheduleUrl,
        expiresAt: existingToken.expiresAt,
        note: 'Using existing active reschedule link',
      })
    }

    const token = generateSecureToken()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    const rescheduleToken = await prisma.rescheduleToken.create({
      data: {
        bookingId,
        token,
        expiresAt,
      },
    })

    // Log admin action
    console.log(
      `[Reschedule] Admin ${session.userId} generated reschedule link for booking ${bookingId}`
    )

    const rescheduleUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/demo-booking/reschedule?id=${bookingId}&token=${token}`

    return NextResponse.json({
      success: true,
      rescheduleUrl,
      expiresAt: rescheduleToken.expiresAt,
    })
  } catch (error) {
    console.error('Generate reschedule link error:', error)
    return NextResponse.json({ error: 'Failed to generate reschedule link' }, { status: 500 })
  }
}

// Export PUT with admin authentication to prevent IDOR attacks
export const PUT = withAdmin(handleGenerateRescheduleLink)
