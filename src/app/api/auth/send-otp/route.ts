import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { addSecurityHeaders } from '@/lib/auth/config'
import { z } from 'zod'
import axios from 'axios'
import crypto from 'crypto'

// Validation schema for OTP request
const sendOtpSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  purpose: z.enum(['registration', 'login', 'password_reset', 'mobile_verification']),
  whatsapp: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid WhatsApp number')
    .optional(),
})

// Generate cryptographically secure 6-digit OTP
function generateOTP(): string {
  // Use crypto.randomInt for secure random number in range [100000, 999999]
  return crypto.randomInt(100000, 1000000).toString()
}

// Rate limiting: Max 5 OTPs per mobile per hour, with progressive delays
// SECURITY (2026-01-28): Fail-secure on errors, explicit UTC timestamps
async function checkRateLimit(mobile: string): Promise<{
  allowed: boolean
  waitTime?: number
  securityDegraded?: boolean
}> {
  // Use server-side timestamps in UTC explicitly
  const now = Date.now()
  const oneHourAgo = new Date(now - 60 * 60 * 1000)
  const fiveMinutesAgo = new Date(now - 5 * 60 * 1000)

  try {
    // Check last hour - database timestamps are stored in UTC
    const recentOtps = await prisma.otpVerification.findMany({
      where: {
        mobile: mobile,
        createdAt: {
          gte: oneHourAgo,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const otpCount = recentOtps.length

    // Check last 5 minutes - compare using getTime() for accurate UTC comparison
    const recentOtpsShort = recentOtps.filter(
      (otp) => otp.createdAt.getTime() >= fiveMinutesAgo.getTime()
    )

    const shortTermCount = recentOtpsShort.length

    // Allow up to 5 OTPs per hour, but max 2 in 5 minutes
    if (shortTermCount >= 2) {
      const lastOtpTime = recentOtpsShort[0]?.createdAt.getTime() || 0
      const waitTime = Math.max(0, 5 * 60 * 1000 - (now - lastOtpTime))
      return { allowed: false, waitTime }
    }

    if (otpCount >= 5) {
      return { allowed: false, waitTime: 60 * 60 * 1000 } // 1 hour wait
    }

    return { allowed: true }
  } catch (error) {
    console.error('[SECURITY] Rate limit check error:', error)
    // SECURITY: Fail-secure - block on error to prevent abuse
    // This prevents attackers from exploiting database errors to bypass rate limiting
    if (process.env.NODE_ENV === 'production') {
      console.error(
        '[SECURITY ALERT] OTP rate limiting failed - blocking request for security. ' +
          'Investigate database connectivity issues immediately.'
      )
      return { allowed: false, waitTime: 60 * 1000, securityDegraded: true } // 1 minute wait on error
    }
    // In development, allow with warning
    console.warn('[DEV] Rate limit check failed, allowing for development')
    return { allowed: true, securityDegraded: true }
  }
}

// Send SMS OTP via MSG91
async function sendSMSOTP(mobile: string, otp: string): Promise<boolean> {
  try {
    const authKey = process.env.MSG91_AUTH_KEY
    const templateId = process.env.MSG91_SMS_TEMPLATE_ID
    const senderId = process.env.MSG91_SENDER_ID || 'CRBMBIO'

    // Fallback to mock in development if credentials not configured
    if (!authKey) {
      if (process.env.NODE_ENV === 'development') {
        // Mock success in development without logging actual OTP
        return true
      }
      console.error('MSG91 credentials not configured')
      return false
    }

    const url = 'https://control.msg91.com/api/v5/otp'

    const response = await axios.post(
      url,
      {
        template_id: templateId,
        mobile: `91${mobile}`,
        authkey: authKey,
        otp: otp,
        otp_expiry: 10,
      },
      {
        headers: {
          authkey: authKey,
          'Content-Type': 'application/json',
        },
      }
    )

    if (response.data.type === 'success') {
      return true
    }

    console.error('MSG91 SMS send failed:', response.data)
    return false
  } catch (error) {
    console.error('SMS send error:', error)
    return false
  }
}

// Send WhatsApp OTP via MSG91
async function sendWhatsAppOTP(whatsapp: string, otp: string, name?: string): Promise<boolean> {
  try {
    const authKey = process.env.MSG91_AUTH_KEY
    const whatsappTemplateId = process.env.MSG91_WHATSAPP_TEMPLATE_ID

    // Fallback to mock in development if credentials not configured
    if (!authKey || !whatsappTemplateId) {
      if (process.env.NODE_ENV === 'development') {
        // Mock success in development without logging actual OTP
        return true
      }
      console.error('MSG91 WhatsApp credentials not configured')
      return false
    }

    const url = 'https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/'

    const response = await axios.post(
      url,
      {
        integrated_number: process.env.MSG91_WHATSAPP_NUMBER,
        content_type: 'template',
        payload: {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: `91${whatsapp}`,
          type: 'template',
          template: {
            name: whatsappTemplateId,
            language: {
              code: 'en',
            },
            components: [
              {
                type: 'body',
                parameters: [
                  {
                    type: 'text',
                    text: name || 'Student',
                  },
                  {
                    type: 'text',
                    text: otp,
                  },
                ],
              },
            ],
          },
        },
      },
      {
        headers: {
          authkey: authKey,
          'Content-Type': 'application/json',
        },
      }
    )

    if (response.data.type === 'success' || response.status === 200) {
      return true
    }

    console.error('MSG91 WhatsApp send failed:', response.data)
    return false
  } catch (error) {
    console.error('WhatsApp send error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validationResult = sendOtpSchema.safeParse(body)
    if (!validationResult.success) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Validation failed',
            details: validationResult.error.issues,
          },
          { status: 400 }
        )
      )
    }

    const { mobile, purpose, whatsapp } = validationResult.data

    // Check rate limiting
    const rateLimitResult = await checkRateLimit(mobile)
    if (!rateLimitResult.allowed) {
      const waitTimeMinutes = Math.ceil((rateLimitResult.waitTime || 0) / (60 * 1000))
      const waitTimeHours = Math.ceil((rateLimitResult.waitTime || 0) / (60 * 60 * 1000))

      let errorMessage = 'Too many OTP requests.'
      if (rateLimitResult.waitTime && rateLimitResult.waitTime < 60 * 60 * 1000) {
        errorMessage += ` Please try again after ${waitTimeMinutes} minutes.`
      } else {
        errorMessage += ` Please try again after ${waitTimeHours} hour(s).`
      }

      return addSecurityHeaders(
        NextResponse.json(
          {
            error: errorMessage,
            waitTime: rateLimitResult.waitTime,
            canRetryAt: Date.now() + (rateLimitResult.waitTime || 0),
          },
          { status: 429 }
        )
      )
    }

    // Generate OTP
    const otp = generateOTP()
    const expiresAt = Date.now() + 10 * 60 * 1000 // 10 minutes
    const otpId = crypto.randomUUID()

    // Check if user exists for login purpose
    if (purpose === 'login') {
      const existingUser = await prisma.users.findFirst({
        where: {
          phone: mobile,
        },
      })

      if (!existingUser) {
        return addSecurityHeaders(
          NextResponse.json(
            { error: 'Mobile number not registered. Please sign up first.' },
            { status: 404 }
          )
        )
      }
    }

    // Store OTP in database
    await prisma.otpVerification.create({
      data: {
        id: otpId,
        mobile,
        otp,
        purpose,
        expiresAt: new Date(expiresAt),
        attempts: 0,
        verified: false,
      },
    })

    // Send OTP via SMS
    const smsSuccess = await sendSMSOTP(mobile, otp)

    // Send OTP via WhatsApp if number provided
    let whatsappSuccess = false
    if (whatsapp && whatsapp !== mobile) {
      whatsappSuccess = await sendWhatsAppOTP(whatsapp, otp)
    }

    return addSecurityHeaders(
      NextResponse.json(
        {
          success: true,
          message: 'OTP sent successfully',
          otpId, // Return for verification
          expiresAt,
          sentVia: {
            sms: smsSuccess,
            whatsapp: whatsappSuccess,
          },
        },
        { status: 200 }
      )
    )
  } catch (error) {
    console.error('Send OTP error:', error)
    return addSecurityHeaders(
      NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    )
  }
}
