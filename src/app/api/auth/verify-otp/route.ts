import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { SessionManager, CookieManager, addSecurityHeaders, AuthRateLimit } from '@/lib/auth/config'
import { z } from 'zod'

// Validation schema for OTP verification
const verifyOtpSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
  otpId: z.string().uuid('Invalid OTP ID'),
  purpose: z.enum(['registration', 'login', 'password_reset', 'mobile_verification']),

  // Required for registration
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email').optional(),
  whatsapp: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid WhatsApp number')
    .optional(),
  role: z.enum(['student', 'parent']).optional(),
  currentClass: z.enum(['10th', '11th', '12th', 'Dropper']).optional(),
  parentMobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid parent mobile')
    .optional(),
  referralCode: z.string().optional(),

  // Marketing consent
  marketingConsent: z.boolean().optional(),
  whatsappConsent: z.boolean().optional(),
  smsConsent: z.boolean().optional(),
})

export async function POST(request: NextRequest) {
  // SECURITY (2026-01-28): Rate limit OTP verification to prevent brute force
  const forwardedFor = request.headers.get('x-forwarded-for')
  const clientIP = forwardedFor
    ? forwardedFor.split(',')[0].trim()
    : request.headers.get('x-real-ip') || 'unknown'

  try {
    // Check rate limiting before processing
    const rateLimitCheck = await AuthRateLimit.checkRateLimit(`otp-verify:${clientIP}`)
    if (!rateLimitCheck.allowed) {
      console.warn(
        `[SECURITY] OTP verification rate limited for IP: ${clientIP} at ${new Date().toISOString()}`
      )
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Too many verification attempts',
            message: 'Please wait before trying again',
            lockoutEndsAt: rateLimitCheck.lockoutEndsAt,
            remainingAttempts: 0,
          },
          { status: 429 }
        )
      )
    }

    const body = await request.json()

    // Validate input
    const validationResult = verifyOtpSchema.safeParse(body)
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

    const {
      mobile,
      otp,
      otpId,
      purpose,
      name,
      email,
      whatsapp,
      role,
      currentClass,
      parentMobile,
      referralCode,
      marketingConsent = true,
      whatsappConsent = true,
      smsConsent = true,
    } = validationResult.data

    // Verify OTP
    const otpRecord = await prisma.otpVerification.findUnique({
      where: {
        id: otpId,
      },
    })

    if (
      !otpRecord ||
      otpRecord.mobile !== mobile ||
      otpRecord.otp !== otp ||
      otpRecord.purpose !== purpose ||
      otpRecord.verified
    ) {
      // Increment failed attempt counter
      if (otpRecord) {
        try {
          await prisma.otpVerification.update({
            where: { id: otpId },
            data: {
              attempts: { increment: 1 },
            },
          })
        } catch (error) {
          console.error('Failed to increment OTP attempts:', error)
        }
      }

      return addSecurityHeaders(
        NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })
      )
    }

    // Check if OTP is expired
    if (otpRecord.expiresAt < new Date()) {
      return addSecurityHeaders(
        NextResponse.json({ error: 'OTP has expired. Please request a new one.' }, { status: 400 })
      )
    }

    // Check attempt limit
    if (otpRecord.attempts >= 3) {
      return addSecurityHeaders(
        NextResponse.json(
          { error: 'Too many invalid attempts. Please request a new OTP.' },
          { status: 400 }
        )
      )
    }

    // Mark OTP as verified and then delete to prevent any replay attacks
    // SECURITY (2026-01-28): Double protection - mark as verified then delete
    await prisma.otpVerification.update({
      where: { id: otpId },
      data: {
        verified: true,
        attempts: otpRecord.attempts + 1,
      },
    })

    // Delete the OTP record after successful verification (belt-and-suspenders approach)
    try {
      await prisma.otpVerification.delete({
        where: { id: otpId },
      })
    } catch (deleteError) {
      // Log but don't fail if delete fails - the verified flag already prevents reuse
      console.warn('Failed to delete OTP record after verification:', deleteError)
    }

    let user
    const currentTime = Date.now()

    if (purpose === 'registration') {
      // Validate required fields for registration
      if (!name || !role) {
        return addSecurityHeaders(
          NextResponse.json(
            { error: 'Name and role are required for registration' },
            { status: 400 }
          )
        )
      }

      // Check if user already exists
      const existingUser = await prisma.users.findFirst({
        where: { phone: mobile },
      })

      if (existingUser) {
        return addSecurityHeaders(
          NextResponse.json(
            { error: 'User already exists. Please login instead.' },
            { status: 409 }
          )
        )
      }

      // Create new user
      user = await prisma.users.create({
        data: {
          name,
          email: email || `${mobile}@temp.cerebrumbiologyacademy.com`,
          phone: mobile,
          role: role === 'student' ? 'STUDENT' : 'PARENT',
          phoneVerified: new Date(),
          profile: {
            whatsappNumber: whatsapp || mobile,
            isWhatsappSame: !whatsapp || whatsapp === mobile,
            communicationPreference: whatsappConsent ? 'whatsapp' : 'sms',
            currentClass: role === 'student' ? currentClass : undefined,
            parentMobile: role === 'student' ? parentMobile : undefined,
            referralCode,
            marketingConsent,
            whatsappConsent,
            smsConsent,
          },
        },
      })

      // Update marketing lead status
      try {
        const lead = await prisma.marketingLead.findFirst({
          where: { mobile: mobile },
        })

        if (lead) {
          await prisma.marketingLead.update({
            where: { id: lead.id },
            data: {
              name: name,
              email: email,
              whatsapp: whatsapp || mobile,
              status: 'enrolled',
            },
          })
        }
      } catch (leadError) {
        console.error('Failed to update marketing lead:', leadError)
      }
    } else if (purpose === 'login') {
      // Get existing user
      user = await prisma.users.findFirst({
        where: { phone: mobile },
      })

      if (!user) {
        return addSecurityHeaders(
          NextResponse.json({ error: 'User not found. Please register first.' }, { status: 404 })
        )
      }

      // Update last active time
      await prisma.users.update({
        where: { id: user.id },
        data: {
          lastActiveAt: new Date(),
        },
      })
    }

    // Ensure user exists before proceeding
    if (!user) {
      return addSecurityHeaders(
        NextResponse.json({ error: 'User authentication failed' }, { status: 500 })
      )
    }

    // Create session and generate tokens
    const { accessToken, refreshToken } = await SessionManager.createSession(user)

    // Return success with user data (excluding password)
    const safeUser = {
      id: user.id,
      phone: user.phone,
      email: user.email,
      name: user.name,
      role: user.role,
      phoneVerified: user.phoneVerified,
      profile: user.profile,
    }

    // Track analytics event
    try {
      await prisma.analyticsEvent.create({
        data: {
          userId: user.id,
          eventType: 'auth',
          eventName: purpose === 'registration' ? 'user_registered_otp' : 'user_login_otp',
          properties: {
            method: 'otp',
            mobile: mobile.slice(0, 3) + '****' + mobile.slice(-2),
          },
          ipAddress:
            request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
          userAgent: request.headers.get('user-agent'),
        },
      })
    } catch (analyticsError) {
      console.error('Analytics tracking error:', analyticsError)
    }

    const response = NextResponse.json(
      {
        success: true,
        message: `${purpose === 'registration' ? 'Registration' : 'Login'} successful`,
        user: safeUser,
        accessToken,
        expiresIn: 15 * 60, // 15 minutes in seconds
      },
      { status: 200 }
    )

    // Set HTTP-only cookies
    CookieManager.setAuthCookies(response, accessToken, refreshToken)

    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Verify OTP error:', error)
    return addSecurityHeaders(
      NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    )
  }
}
