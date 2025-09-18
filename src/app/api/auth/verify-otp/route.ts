import { NextRequest, NextResponse } from 'next/server'
import { adminDb as db } from '@/lib/db-admin'
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
    const otpData = await db.query({
      otpVerification: {
        $: {
          where: {
            id: otpId,
            mobile: mobile,
            otp: otp,
            purpose: purpose,
            isUsed: false,
          },
        },
      },
    })

    if (!otpData?.otpVerification || otpData.otpVerification.length === 0) {
      // Increment failed attempt counter
      try {
        await db.transact([
          db.tx.otpVerification[otpId].update({
            attempts: (otpData?.otpVerification?.[0]?.attempts || 0) + 1,
          }),
        ])
      } catch (error) {
        console.error('Failed to increment OTP attempts:', error)
      }

      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })
    }

    const otpRecord = otpData.otpVerification[0]

    // Check if OTP is expired
    if (otpRecord.expiresAt < Date.now()) {
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

    // Mark OTP as used
    await db.transact([
      db.tx.otpVerification[otpId].update({
        isUsed: true,
        attempts: otpRecord.attempts + 1,
      }),
    ])

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
      const existingUsers = await db.query({
        users: {
          $: {
            where: {
              mobile: mobile,
            },
          },
        },
      })

      if (existingUsers?.users && existingUsers.users.length > 0) {
        return NextResponse.json(
          { error: 'User already exists. Please login instead.' },
          { status: 409 }
        )
      }

      // Create new user
      const userId = crypto.randomUUID()

      const newUser = {
        mobile,
        email: email || undefined,
        name,
        role,
        whatsappNumber: whatsapp || mobile,
        isWhatsappSame: !whatsapp || whatsapp === mobile,
        communicationPreference: whatsappConsent ? 'whatsapp' : 'sms',
        isMobileVerified: true,
        isEmailVerified: false,
        createdAt: currentTime,
        updatedAt: currentTime,
        lastActiveAt: currentTime,
        profile: {
          currentClass: role === 'student' ? currentClass : undefined,
          parentMobile: role === 'student' ? parentMobile : undefined,
          parentWhatsapp: role === 'student' ? parentMobile : undefined, // Assume same unless specified
          targetScore: role === 'student' ? 650 : undefined, // Default NEET target
          registrationDate: currentTime,
          enrolledCourses: [],
          referralCode,
          marketingConsent,
          whatsappConsent,
          smsConsent,
        },
      }

      await db.transact([db.tx.users[userId].update(newUser)])

      user = { id: userId, ...newUser }

      // Update marketing lead status
      try {
        const leads = await db.query({
          marketingLead: {
            $: { where: { mobile: mobile } },
          },
        })

        if (leads?.marketingLead && leads.marketingLead.length > 0) {
          const leadId = leads.marketingLead[0].id
          await db.transact([
            db.tx.marketingLead[leadId].update({
              name: name,
              email: email,
              whatsapp: whatsapp || mobile,
              status: 'enrolled',
            }),
          ])
        }
      } catch (leadError) {
        console.error('Failed to update marketing lead:', leadError)
      }
    } else if (purpose === 'login') {
      // Get existing user
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
          { error: 'User not found. Please register first.' },
          { status: 404 }
        )
      }

      user = existingUsers.users[0]

      // Update last active time
      await db.transact([
        db.tx.users[user.id].update({
          lastActiveAt: currentTime,
          updatedAt: currentTime,
        }),
      ])
    }

    // Ensure user exists before proceeding
    if (!user) {
      return NextResponse.json({ error: 'User authentication failed' }, { status: 500 })
    }

    // Log authentication event
    try {
      await db.transact([
        db.tx.authLogs[crypto.randomUUID()].update({
          userId: user.id,
          event: purpose === 'registration' ? 'registration' : 'signin',
          timestamp: currentTime,
          metadata: {
            method: 'otp',
            mobile: mobile,
            whatsapp: whatsapp || mobile,
            purpose,
          },
        }),
      ])
    } catch (logError) {
      console.error('Failed to log auth event:', logError)
    }

    // Return success with user data (excluding password)
    const safeUser = {
      id: user.id,
      mobile: user.mobile,
      email: user.email,
      name: user.name,
      role: user.role,
      whatsappNumber: user.whatsappNumber,
      communicationPreference: user.communicationPreference,
      isMobileVerified: user.isMobileVerified,
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
