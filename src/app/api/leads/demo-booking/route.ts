import { NextRequest, NextResponse } from 'next/server'

interface DemoBookingRequest {
  name: string
  phone: string
  course: string
  source: string
  landingPage: string
  timestamp: string
  utm_source?: string
  utm_campaign?: string
  utm_medium?: string
  gclid?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: DemoBookingRequest = await request.json()

    // Validate required fields
    if (!body.name || !body.phone || !body.course) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, phone, course' },
        { status: 400 }
      )
    }

    // TODO: Store in database when DB is available
    // For now, just acknowledge receipt for Google Ads landing page
    console.log('[DEMO BOOKING] Received from landing page:', {
      name: body.name,
      phone: body.phone,
      course: body.course,
      source: body.source,
      landingPage: body.landingPage,
      utm_source: body.utm_source,
      utm_campaign: body.utm_campaign,
      utm_medium: body.utm_medium,
      gclid: body.gclid,
      timestamp: body.timestamp,
    })

    // TODO: Send confirmation email to user
    // TODO: Send lead notification to sales team WhatsApp/email
    // TODO: Track conversion in Google Ads

    return NextResponse.json(
      {
        success: true,
        message: 'Demo booking request received. Our team will contact you shortly.',
        data: {
          name: body.name,
          phone: body.phone,
          course: body.course,
          timestamp: body.timestamp,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[DEMO BOOKING ERROR]', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process demo booking request' },
      { status: 500 }
    )
  }
}
