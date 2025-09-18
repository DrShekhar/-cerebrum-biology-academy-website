import { NextRequest, NextResponse } from 'next/server'
import { adminDb as db } from '@/lib/db-admin'
import { z } from 'zod'

// Validation schema for OTP request
const sendOtpSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  purpose: z.enum(['registration', 'login', 'password_reset', 'mobile_verification']),
  whatsapp: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid WhatsApp number')
    .optional(),
})

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Rate limiting: Max 3 OTPs per mobile per hour
async function checkRateLimit(mobile: string): Promise<boolean> {
  const oneHourAgo = Date.now() - 60 * 60 * 1000

  try {
    const recentOtps = await db.query({
      otpVerification: {
        $: {
          where: {
            mobile: mobile,
            createdAt: { $gt: oneHourAgo },
          },
        },
      },
    })

    return (recentOtps?.otpVerification?.length || 0) < 3
  } catch (error) {
    console.error('Rate limit check error:', error)
    return false
  }
}

// Send SMS OTP (Mock implementation - replace with actual SMS service)
async function sendSMSOTP(mobile: string, otp: string): Promise<boolean> {
  try {
    // In production, integrate with SMS service like:
    // - Twilio
    // - AWS SNS
    // - TextLocal
    // - MSG91

    console.log(`📱 SMS OTP for ${mobile}: ${otp}`)

    // Mock success for development
    return true
  } catch (error) {
    console.error('SMS send error:', error)
    return false
  }
}

// Send WhatsApp OTP (Mock implementation - replace with actual WhatsApp Business API)
async function sendWhatsAppOTP(whatsapp: string, otp: string, name?: string): Promise<boolean> {
  try {
    // In production, integrate with WhatsApp Business API:
    // - Facebook WhatsApp Business API
    // - Twilio WhatsApp API
    // - 360Dialog

    const message = `Hi ${name || 'Student'}! 👋

Your OTP for Cerebrum Biology Academy is: *${otp}*

🔒 Valid for 10 minutes
🚫 Don't share with anyone

Best of luck with your NEET preparation! 🎯
- Team Cerebrum`

    console.log(`💬 WhatsApp OTP for ${whatsapp}:`, message)

    // Mock success for development
    return true
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
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    const { mobile, purpose, whatsapp } = validationResult.data

    // Check rate limiting
    if (!(await checkRateLimit(mobile))) {
      return NextResponse.json(
        { error: 'Too many OTP requests. Please try again after 1 hour.' },
        { status: 429 }
      )
    }

    // Generate OTP
    const otp = generateOTP()
    const expiresAt = Date.now() + 10 * 60 * 1000 // 10 minutes
    const otpId = crypto.randomUUID()

    // Check if user exists for login purpose
    if (purpose === 'login') {
      const existingUsers = await db.query({
        users: {
          $: {
            where: {
              mobile: mobile,
            },
          },
        },
      })

      if (!existingUsers?.users || existingUsers.users.length === 0) {
        return NextResponse.json(
          { error: 'Mobile number not registered. Please sign up first.' },
          { status: 404 }
        )
      }
    }

    // Store OTP in database
    await db.transact([
      db.tx.otpVerification[otpId].update({
        mobile,
        otp,
        purpose,
        expiresAt,
        attempts: 0,
        isUsed: false,
        createdAt: Date.now(),
      }),
    ])

    // Send OTP via SMS
    const smsSuccess = await sendSMSOTP(mobile, otp)

    // Send OTP via WhatsApp if number provided
    let whatsappSuccess = false
    if (whatsapp && whatsapp !== mobile) {
      whatsappSuccess = await sendWhatsAppOTP(whatsapp, otp)
    }

    // Create marketing lead for new users
    if (purpose === 'registration') {
      try {
        await db.transact([
          db.tx.marketingLead[crypto.randomUUID()].update({
            mobile,
            whatsapp: whatsapp || mobile,
            source: 'website',
            status: 'new',
            createdAt: Date.now(),
          }),
        ])
      } catch (leadError) {
        console.error('Failed to create marketing lead:', leadError)
        // Don't fail OTP send if lead creation fails
      }
    }

    // Log OTP send event
    try {
      await db.transact([
        db.tx.authLogs[crypto.randomUUID()].update({
          userId: mobile, // Use mobile as temp ID for logging
          event: 'otp_sent',
          timestamp: Date.now(),
          metadata: {
            purpose,
            smsSuccess,
            whatsappSuccess,
            hasWhatsapp: !!whatsapp,
          },
        }),
      ])
    } catch (logError) {
      console.error('Failed to log OTP send:', logError)
    }

    return NextResponse.json(
      {
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
  } catch (error) {
    console.error('Send OTP error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
