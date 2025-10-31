import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { signIn } from '@/lib/auth'
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
  try {
    const body = await request.json()

    // Validate input
    const validationResult = verifyOtpSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues,
        },
        { status: 400 }
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

      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })
    }

    // Check if OTP is expired
    if (otpRecord.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      )
    }

    // Check attempt limit
    if (otpRecord.attempts >= 3) {
      return NextResponse.json(
        { error: 'Too many invalid attempts. Please request a new OTP.' },
        { status: 400 }
      )
    }

    // Mark OTP as verified
    await prisma.otpVerification.update({
      where: { id: otpId },
      data: {
        verified: true,
        attempts: otpRecord.attempts + 1,
      },
    })

    let user
    const currentTime = Date.now()

    if (purpose === 'registration') {
      // Validate required fields for registration
      if (!name || !role) {
        return NextResponse.json(
          { error: 'Name and role are required for registration' },
          { status: 400 }
        )
      }

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { phone: mobile },
      })

      if (existingUser) {
        return NextResponse.json(
          { error: 'User already exists. Please login instead.' },
          { status: 409 }
        )
      }

      // Create new user
      user = await prisma.user.create({
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
      user = await prisma.user.findUnique({
        where: { phone: mobile },
      })

      if (!user) {
        return NextResponse.json(
          { error: 'User not found. Please register first.' },
          { status: 404 }
        )
      }

      // Update last active time
      await prisma.user.update({
        where: { id: user.id },
        data: {
          lastActiveAt: new Date(),
        },
      })
    }

    // Ensure user exists before proceeding
    if (!user) {
      return NextResponse.json({ error: 'User authentication failed' }, { status: 500 })
    }

    // Log authentication event for monitoring
    console.log(
      `Auth event: ${purpose === 'registration' ? 'registration' : 'signin'} for user ${user.id} via OTP`
    )

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

    return NextResponse.json(
      {
        message: `${purpose === 'registration' ? 'Registration' : 'Login'} successful`,
        user: safeUser,
        token: 'jwt-token-would-go-here', // In production, generate JWT token
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Verify OTP error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
