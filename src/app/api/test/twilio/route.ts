/**
 * Twilio Test Endpoint
 * Test OTP sending and verification
 *
 * POST /api/test/twilio - Send test OTP
 * POST /api/test/twilio?verify=true - Verify OTP
 */

import { NextRequest, NextResponse } from 'next/server'
import { sendOTP, verifyOTP } from '@/lib/auth/twilio-verify'

// Only allow in development
const isDev = process.env.NODE_ENV !== 'production'

export async function POST(request: NextRequest) {
  if (!isDev) {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const isVerify = request.nextUrl.searchParams.get('verify') === 'true'

    if (isVerify) {
      // Verify OTP
      const { phone, code } = body

      if (!phone || !code) {
        return NextResponse.json({ error: 'phone and code required' }, { status: 400 })
      }

      const result = await verifyOTP(phone, code, 'sms')

      return NextResponse.json({
        success: result.success,
        valid: result.valid,
        status: result.status,
        error: result.error,
      })
    } else {
      // Send OTP
      const { phone, channel = 'sms' } = body

      if (!phone) {
        return NextResponse.json({ error: 'phone required' }, { status: 400 })
      }

      const result = await sendOTP(phone, channel)

      return NextResponse.json({
        success: result.success,
        sid: result.sid,
        channel: result.channel,
        to: result.to,
        status: result.status,
        error: result.error,
      })
    }
  } catch (error) {
    console.error('Twilio test error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Test failed' },
      { status: 500 }
    )
  }
}

export async function GET() {
  if (!isDev) {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 })
  }

  // Check Twilio configuration
  const config = {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID
      ? `${process.env.TWILIO_ACCOUNT_SID.substring(0, 10)}...`
      : 'NOT SET',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN ? 'SET (hidden)' : 'NOT SET',
    TWILIO_VERIFY_SERVICE_SID: process.env.TWILIO_VERIFY_SERVICE_SID
      ? `${process.env.TWILIO_VERIFY_SERVICE_SID.substring(0, 10)}...`
      : 'NOT SET',
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || 'NOT SET',
  }

  return NextResponse.json({
    status: 'Twilio configuration check',
    config,
    instructions: {
      sendOTP: 'POST /api/test/twilio with { phone: "+918826444334", channel: "sms" }',
      verifyOTP:
        'POST /api/test/twilio?verify=true with { phone: "+918826444334", code: "123456" }',
    },
  })
}
