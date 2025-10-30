import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

function verifyToken(bookingId: string, token: string): Promise<boolean> {
  return prisma.rescheduleToken
    .findFirst({
      where: {
        bookingId,
        token,
        used: false,
        expiresAt: {
          gte: new Date(),
        },
      },
    })
    .then((result) => result !== null)
}

export async function POST(request: NextRequest) {
  try {
    const { bookingId, token, newDate, newTime } = await request.json()

    if (!bookingId || !token || !newDate || !newTime) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const isValid = await verifyToken(bookingId, token)
    if (!isValid) {
      return NextResponse.json(
        {
          error: 'Invalid or expired reschedule link. Please contact support at +91 88264 44334',
        },
        { status: 401 }
      )
    }

    const booking = await prisma.demoBooking.findUnique({
      where: { id: bookingId },
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const oldDate = booking.preferredDate
    const oldTime = booking.preferredTime

    const [updatedBooking] = await prisma.$transaction([
      prisma.demoBooking.update({
        where: { id: bookingId },
        data: {
          preferredDate: newDate,
          preferredTime: newTime,
          status: 'RESCHEDULED',
          updatedAt: new Date(),
        },
      }),
      prisma.rescheduleToken.updateMany({
        where: { bookingId },
        data: { used: true },
      }),
    ])

    await sendRescheduleNotifications(updatedBooking, oldDate, oldTime)

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
      {
        error: 'Failed to reschedule booking',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
      },
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

    const isValid = await verifyToken(bookingId, token)
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
      {
        error: 'Failed to fetch booking details',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
      },
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

    console.log('Rescheduling notifications:', {
      bookingId: booking.id,
      studentName: booking.studentName,
      from: `${formattedOldDate} at ${oldTime}`,
      to: `${formattedNewDate} at ${booking.preferredTime}`,
    })
  } catch (error) {
    console.error('Failed to send reschedule notifications:', error)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { bookingId } = await request.json()

    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID required' }, { status: 400 })
    }

    const booking = await prisma.demoBooking.findUnique({
      where: { id: bookingId },
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
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
      {
        error: 'Failed to generate reschedule link',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
