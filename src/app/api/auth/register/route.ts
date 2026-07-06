import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'
import { PasswordUtils } from '@/lib/auth/config'
import { TRIAL_DAYS } from '@/lib/constants/trial'
import { z } from 'zod'

// Validation schema for registration
// SECURITY (2026-01-28): Password strength validation added via PasswordUtils
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  role: z.enum(['STUDENT', 'PARENT', 'TEACHER']),
  currentClass: z.enum(['10th', '11th', '12th', 'Dropper']).optional(),
  parentEmail: z.string().email().optional(),
  referralCode: z.string().optional(),
})

// Normalize to E.164 the same way the phone-OTP flow does, so the two signup
// paths never create differently-formatted rows for the same person.
function normalizePhone(phone: string): string {
  const trimmed = phone.trim()
  const digits = trimmed.replace(/\D/g, '')
  if (trimmed.startsWith('+')) return `+${digits}`
  if (digits.startsWith('91') && digits.length === 12) return `+${digits}`
  if (/^[6-9]\d{9}$/.test(digits)) return `+91${digits}`
  return `+${digits}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validationResult = registerSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    const { name, email, password, phone, role, currentClass, parentEmail, referralCode } =
      validationResult.data

    // SECURITY: Enforce strong password requirements
    const passwordValidation = PasswordUtils.validatePassword(password)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        {
          error: 'Password does not meet security requirements',
          details: passwordValidation.errors,
        },
        { status: 400 }
      )
    }

    // Check if user already exists (email is the credentials-provider key)
    const existingByEmail = await prisma.users.findUnique({
      where: { email },
      select: { id: true },
    })
    if (existingByEmail) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 })
    }

    // Phone is unique in the users table. Country-aware duplicate check
    // (mirrors firebase-session): Indian numbers exist in three legacy stored
    // formats — match those exactly; other countries only as full E.164. A
    // blanket endsWith(last10) wrongly blocked e.g. a US +1 number from
    // registering because an Indian +91 number shared its trailing 10 digits.
    const normalizedPhone = normalizePhone(phone)
    const phoneLast10 = normalizedPhone.replace(/\D/g, '').slice(-10)
    const phoneMatchers = normalizedPhone.startsWith('+91')
      ? [{ phone: normalizedPhone }, { phone: normalizedPhone.slice(1) }, { phone: phoneLast10 }]
      : [{ phone: normalizedPhone }]
    const existingByPhone = phoneLast10
      ? await prisma.users.findFirst({
          where: { OR: phoneMatchers },
          select: { id: true },
        })
      : null
    if (existingByPhone) {
      return NextResponse.json(
        {
          error:
            'An account with this phone number already exists. Please sign in with Phone OTP instead.',
        },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user profile based on role
    const profile: Record<string, string | number | boolean | string[] | undefined> = {
      phone: normalizedPhone,
      registrationDate: Date.now(),
      isVerified: false,
      enrolledCourses: [],
      signupMethod: 'email_password',
    }

    if (role === 'STUDENT') {
      profile.currentClass = currentClass
      profile.parentEmail = parentEmail
      profile.targetScore = 650 // Default NEET target
      profile.weakSubjects = []
      profile.studyHours = 0
    }

    if (referralCode) {
      profile.referralCode = referralCode
    }

    // Generate unique user ID
    const userId = randomUUID()

    // Same master trial the phone-OTP signup grants (length: TRIAL_DAYS)
    const trialStartDate = new Date()
    const trialEndDate = new Date(trialStartDate)
    trialEndDate.setDate(trialEndDate.getDate() + TRIAL_DAYS)

    let newUser
    try {
      newUser = await prisma.users.create({
        data: {
          id: userId,
          email,
          name,
          phone: normalizedPhone,
          passwordHash: hashedPassword,
          role,
          coachingTier: 'FREE',
          trialStartDate,
          trialEndDate,
          profile,
          updatedAt: new Date(),
        },
        select: { id: true, name: true, email: true, role: true },
      })
    } catch (createError) {
      const message = createError instanceof Error ? createError.message : ''
      if (message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'An account with this email or phone number already exists' },
          { status: 409 }
        )
      }
      throw createError
    }

    // Return success (without password)
    return NextResponse.json(
      {
        message: 'Account created successfully',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          profile: {
            phone: normalizedPhone,
            currentClass,
            isVerified: false,
          },
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
