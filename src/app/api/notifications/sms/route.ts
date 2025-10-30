import { NextRequest, NextResponse } from 'next/server'

interface SMSPayload {
  phone: string
  name: string
  date: string
  time: string
  zoomUrl?: string
  demoType?: 'FREE' | 'PREMIUM'
  bookingId?: string
}

/**
 * Send SMS notification via Interakt API
 * Interakt is a WhatsApp/SMS marketing automation platform
 * API Docs: https://docs.interakt.ai/
 */
export async function POST(request: NextRequest) {
  try {
    const { phone, name, date, time, zoomUrl, demoType, bookingId }: SMSPayload =
      await request.json()

    if (!phone || !name || !date || !time) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check for Interakt API credentials
    const interaktApiKey = process.env.INTERAKT_API_KEY
    const interaktPhoneId = process.env.INTERAKT_PHONE_NUMBER_ID

    if (!interaktApiKey || !interaktPhoneId) {
      console.warn('⚠️ Interakt credentials not configured, SMS will be skipped')
      return NextResponse.json(
        {
          success: false,
          error: 'SMS service not configured',
          fallback: 'whatsapp',
          message: 'Interakt API credentials missing in environment variables',
        },
        { status: 503 }
      )
    }

    const isPremium = demoType === 'PREMIUM'
    const formattedDate = new Date(date).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

    // Format phone number for Interakt (must start with country code)
    let formattedPhone = phone.replace(/[^0-9+]/g, '')
    if (!formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.startsWith('91')
        ? `+${formattedPhone}`
        : `+91${formattedPhone}`
    }

    // Interakt WhatsApp template message (you'll need to create this template in Interakt dashboard)
    const templateData = {
      countryCode: '+91',
      phoneNumber: formattedPhone.replace('+91', ''),
      callbackData: bookingId || 'demo-booking',
      type: 'Template',
      template: {
        name: 'demo_confirmation', // Template name in Interakt dashboard
        languageCode: 'en',
        bodyValues: [
          name,
          isPremium ? 'Premium' : 'Free',
          formattedDate,
          time,
          zoomUrl || "We'll send the Zoom link 30 minutes before",
        ],
      },
    }

    // Send via Interakt API
    const response = await fetch('https://api.interakt.ai/v1/public/message/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${interaktApiKey}:`).toString('base64')}`,
      },
      body: JSON.stringify(templateData),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || `Interakt API error: ${response.status}`)
    }

    console.log('✅ SMS/WhatsApp sent successfully via Interakt:', {
      messageId: result.result?.message_id || result.id,
      status: result.result?.status || 'sent',
      to: formattedPhone,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      messageId: result.result?.message_id || result.id,
      status: result.result?.status || 'sent',
      provider: 'interakt',
    })
  } catch (error) {
    console.error('❌ SMS/WhatsApp send failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    })

    const errorMessage = error instanceof Error ? error.message : 'Failed to send notification'

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        fallback: 'whatsapp',
        provider: 'interakt',
      },
      { status: 500 }
    )
  }
}

/**
 * Get message status from Interakt
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const messageId = searchParams.get('messageId')

  if (!messageId) {
    return NextResponse.json({ error: 'Message ID required' }, { status: 400 })
  }

  try {
    const interaktApiKey = process.env.INTERAKT_API_KEY

    if (!interaktApiKey) {
      return NextResponse.json({ error: 'Interakt API key not configured' }, { status: 503 })
    }

    // Fetch message status from Interakt
    const response = await fetch(`https://api.interakt.ai/v1/public/message/${messageId}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(`${interaktApiKey}:`).toString('base64')}`,
      },
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch message status')
    }

    return NextResponse.json({
      success: true,
      status: result.status || 'unknown',
      timestamp: result.timestamp || new Date().toISOString(),
      provider: 'interakt',
    })
  } catch (error) {
    console.error('Failed to fetch message status from Interakt:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch status',
      },
      { status: 500 }
    )
  }
}
