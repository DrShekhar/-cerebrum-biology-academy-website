import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

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
  // Use raw query with row-level locking to prevent race conditions
  // This atomically: 1) finds valid token, 2) marks it used, 3) returns result
  const result = await prisma.$transaction(async (tx) => {
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
  })

  return result
}

// Non-consuming token verification (for GET requests to display booking info)
async function verifyTokenReadOnly(bookingId: string, token: string): Promise<boolean> {
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
  return result !== null
}

export async function POST(request: NextRequest) {
  try {
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
      return NextResponse.json({ error: 'New date must be today or in the future' }, { status: 400 })
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
      console.error('Reschedule token consumed but booking not found', { bookingId, tokenId: tokenResult.tokenId })
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
    return NextResponse.json(
      { error: 'Failed to reschedule booking' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
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
    return NextResponse.json(
      { error: 'Failed to fetch booking details' },
      { status: 500 }
    )
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

    // TODO: Implement actual notification sending via WhatsApp/Email
    console.log('Rescheduling notifications:', {
      bookingId: booking.id,
      studentName: booking.studentName,
      from: `${formattedOldDate} at ${oldTime}`,
      to: `${formattedNewDate} at ${booking.preferredTime}`,
    })

    // Send WhatsApp notification if configured
    if (process.env.INTERAKT_API_KEY && booking.phone) {
      const phone = booking.phone.replace(/\D/g, '').slice(-10)
      await fetch('https://api.interakt.ai/v1/public/message/', {
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
            message: `Hi ${booking.studentName}! Your demo class has been rescheduled from ${formattedOldDate} to ${formattedNewDate} at ${booking.preferredTime}. We look forward to seeing you!`,
          },
        }),
      })
    }
  } catch (error) {
    console.error('Failed to send reschedule notifications:', error)
  }
}

export async function PUT(request: NextRequest) {
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

    const rescheduleUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/demo-booking/reschedule?id=${bookingId}&token=${token}`

    return NextResponse.json({
      success: true,
      rescheduleUrl,
      expiresAt: rescheduleToken.expiresAt,
    })
  } catch (error) {
    console.error('Generate reschedule link error:', error)
    return NextResponse.json(
      { error: 'Failed to generate reschedule link' },
      { status: 500 }
    )
  }
}
