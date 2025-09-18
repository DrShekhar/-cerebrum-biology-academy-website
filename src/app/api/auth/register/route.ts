import { NextRequest, NextResponse } from 'next/server'
import { adminDb as db } from '@/lib/db-admin'
import { hashPassword } from '@/lib/auth'
import { z } from 'zod'

// Validation schema for registration
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  role: z.enum(['student', 'parent', 'teacher']),
  currentClass: z.enum(['10th', '11th', '12th', 'Dropper']).optional(),
  parentEmail: z.string().email().optional(),
  referralCode: z.string().optional(),
})

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

    // Check if user already exists
    const existingUsers = await db.query({
      users: {
        $: {
          where: {
            email: email,
          },
        },
      },
    })

    if (existingUsers?.users && existingUsers.users.length > 0) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user profile based on role
    const profile: any = {
      phone,
      registrationDate: Date.now(),
      isVerified: false,
      enrolledCourses: [],
    }

    if (role === 'student') {
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
    const userId = crypto.randomUUID()

    // Create user in database
    await db.transact([
      db.tx.users[userId].update({
        name,
        email,
        password: hashedPassword,
        role,
        profile,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }),
    ])

    // Log registration event
    try {
      await db.transact([
        db.tx.authLogs[crypto.randomUUID()].update({
          userId,
          event: 'registration',
          timestamp: Date.now(),
          metadata: {
            role,
            currentClass,
            referralCode,
          },
        }),
      ])
    } catch (logError) {
      console.error('Failed to log registration:', logError)
      // Don't fail registration if logging fails
    }

    // Return success (without password)
    return NextResponse.json(
      {
        message: 'Account created successfully',
        user: {
          id: userId,
          name,
          email,
          role,
          profile: {
            phone,
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

// Install zod for validation
// npm install zod
