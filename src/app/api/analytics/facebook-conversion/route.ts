import { NextRequest, NextResponse } from 'next/server'

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || ''
const FB_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN || ''
const FB_TEST_EVENT_CODE = process.env.FACEBOOK_TEST_EVENT_CODE

interface ConversionEventData {
  eventName: string
  eventTime: number
  userData: {
    em?: string
    ph?: string
    fn?: string
    ln?: string
    ct?: string
    st?: string
    zp?: string
    country?: string
  }
  customData?: Record<string, unknown>
}

/**
 * Facebook Conversion API endpoint
 * Sends server-side events for more accurate conversion tracking
 *
 * This complements the client-side Facebook Pixel to:
 * 1. Track conversions even when browser blocks pixels
 * 2. Provide more accurate attribution
 * 3. Enable offline conversion tracking
 */
export async function POST(request: NextRequest) {
  try {
    const body: ConversionEventData = await request.json()

    // Validate required fields
    if (!body.eventName || !body.eventTime) {
      return NextResponse.json(
        { error: 'Missing required fields: eventName and eventTime' },
        { status: 400 }
      )
    }

    // Check if Facebook credentials are configured
    if (!FB_PIXEL_ID || !FB_ACCESS_TOKEN) {
      return NextResponse.json(
        { success: true, message: 'Facebook Conversion API not configured' },
        { status: 200 }
      )
    }

    // Get client IP and user agent for better matching
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown'
    const userAgent = request.headers.get('user-agent') || ''

    // Build the event data
    const eventData = {
      event_name: body.eventName,
      event_time: body.eventTime,
      event_source_url: request.headers.get('referer') || 'https://cerebrumbiologyacademy.com',
      action_source: 'website',
      user_data: {
        ...body.userData,
        client_ip_address: clientIp,
        client_user_agent: userAgent,
        fbc: request.cookies.get('_fbc')?.value, // Facebook Click ID
        fbp: request.cookies.get('_fbp')?.value, // Facebook Browser ID
      },
      custom_data: body.customData,
    }

    // Send to Facebook Conversion API
    const fbResponse = await fetch(`https://graph.facebook.com/v18.0/${FB_PIXEL_ID}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [eventData],
        access_token: FB_ACCESS_TOKEN,
        ...(FB_TEST_EVENT_CODE && { test_event_code: FB_TEST_EVENT_CODE }),
      }),
    })

    if (!fbResponse.ok) {
      const errorData = await fbResponse.json()
      console.error('[Facebook Conversion API] Error:', errorData)
      return NextResponse.json({ error: 'Facebook API error', details: errorData }, { status: 502 })
    }

    const result = await fbResponse.json()

    return NextResponse.json({
      success: true,
      eventName: body.eventName,
      eventsReceived: result.events_received,
    })
  } catch (error) {
    console.error('[Facebook Conversion API] Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
