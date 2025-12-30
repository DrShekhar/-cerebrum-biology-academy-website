/**
 * Phone OTP Send Endpoint
 * WhatsApp-first OTP with SMS fallback for Indian users
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendOTP, checkOTPRateLimit, OTPChannel } from '@/lib/auth/twilio-verify'

// Indian phone number validation
const phoneSchema = z.object({
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number too long')
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => /^(91)?[6-9]\d{9}$/.test(val), {
      message: 'Invalid Indian phone number',
    }),
  channel: z.enum(['whatsapp', 'sms']).default('whatsapp'),
  fallbackToSms: z.boolean().default(true),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = phoneSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid phone number',
          details: validation.error.issues,
        },
        { status: 400 }
      )
    }

    const { phone, channel, fallbackToSms } = validation.data

    // Format phone for India
    const formattedPhone = phone.startsWith('91') ? `+${phone}` : `+91${phone}`

    // Rate limit check
    const rateLimitKey = `phone:${formattedPhone}`
    const rateLimit = await checkOTPRateLimit(rateLimitKey, 5, 60 * 60 * 1000) // 5 attempts per hour

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many OTP requests. Please try again later.',
          retryAfter: rateLimit.resetAt,
        },
        { status: 429 }
      )
    }

    // Try WhatsApp first
    let result = await sendOTP(formattedPhone, channel as OTPChannel)

    // Fallback to SMS if WhatsApp fails and fallback is enabled
    if (!result.success && channel === 'whatsapp' && fallbackToSms) {
      console.log(`WhatsApp OTP failed for ${formattedPhone}, falling back to SMS`)
      result = await sendOTP(formattedPhone, 'sms')
      result.channel = 'sms' // Update channel in result
    }

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to send OTP',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `OTP sent via ${result.channel}`,
      channel: result.channel,
      phone: formattedPhone.replace(/^(\+91)(\d{2})(\d{4})(\d{4})$/, '$1 $2****$4'),
      remainingAttempts: rateLimit.remainingAttempts,
    })
  } catch (error) {
    console.error('Send OTP error:', error)
    return NextResponse.json({ success: false, error: 'Failed to send OTP' }, { status: 500 })
  }
}
