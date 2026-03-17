import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { normalizePhone } from '@/lib/utils/phone'
import { notifyAdminFormSubmission } from '@/lib/notifications/adminLeadNotification'

/**
 * Simplified demo booking endpoint for Google Ads landing pages.
 * Saves to demo_bookings + creates a lead for CRM follow-up.
 * Less strict validation than /api/demo-booking (no email required).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const name = String(body.name || '').trim()
    const phone = String(body.phone || '').trim()
    const course = String(body.course || '').trim()

    if (!name || !phone || !course) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, phone, course' },
        { status: 400 }
      )
    }

    const normalizedPhone = normalizePhone(phone)
    const source = body.source || 'google-ads-landing'
    const bookingId = `demo_${Date.now()}_${Math.random().toString(36).substring(7)}`

    const result = await prisma.$transaction(async (tx) => {
      const booking = await tx.demoBooking.create({
        data: {
          id: bookingId,
          studentName: name,
          phone: normalizedPhone,
          preferredDate: new Date().toISOString().split('T')[0],
          preferredTime: '09:00 AM - 08:00 PM',
          message: `Landing page: ${body.landingPage || '/lp/neet-demo'}`,
          status: 'PENDING',
          source: source,
          utmSource: body.utm_source || null,
          utmMedium: body.utm_medium || null,
          utmCampaign: body.utm_campaign || null,
          updatedAt: new Date(),
        },
      })

      const lead = await tx.leads.create({
        data: {
          id: `lead_${Date.now()}_${Math.random().toString(36).substring(7)}`,
          studentName: name,
          phone: normalizedPhone,
          courseInterest: course,
          stage: 'DEMO_SCHEDULED',
          priority: 'HOT',
          source: body.utm_source ? 'PAID_ADS' : 'WEBSITE_FORM',
          demoBookingId: booking.id,
          updatedAt: new Date(),
        },
      })

      return { booking, lead }
    })

    notifyAdminFormSubmission('Demo Booking (Landing Page)', {
      Name: name,
      Phone: normalizedPhone,
      Course: course,
      Source: source,
      UTM: body.utm_campaign || body.utm_source || '-',
    }).catch(() => {})

    return NextResponse.json(
      {
        success: true,
        message: 'Demo booking request received. Our team will contact you shortly.',
        data: { id: result.booking.id, name, phone: normalizedPhone, course },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[LEADS/DEMO-BOOKING ERROR]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process demo booking request' },
      { status: 500 }
    )
  }
}
