/**
 * Complete Signup Endpoint
 * Creates a Clerk user after phone verification
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { clerkClient } from '@clerk/nextjs/server'

const signupSchema = z.object({
  phone: z
    .string()
    .min(10)
    .max(15)
    .transform((val) => val.replace(/\D/g, '')),
  firstName: z.string().min(1, 'First name required').max(50),
  lastName: z.string().max(50).optional(),
  email: z.string().email().optional(),
  role: z.enum(['student', 'parent']).default('student'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validation = signupSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request',
          details: validation.error.issues,
        },
        { status: 400 }
      )
    }

    const { phone, firstName, lastName, email, role } = validation.data

    // Format phone for India
    const formattedPhone = phone.startsWith('91') ? `+${phone}` : `+91${phone}`

    const client = await clerkClient()

    // Check if user already exists
    const existingUsers = await client.users.getUserList({
      phoneNumber: [formattedPhone],
    })

    if (existingUsers.data.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'An account with this phone number already exists',
          userExists: true,
        },
        { status: 409 }
      )
    }

    // Create new Clerk user
    const user = await client.users.createUser({
      phoneNumber: [formattedPhone],
      firstName,
      lastName: lastName || undefined,
      emailAddress: email ? [email] : undefined,
      skipPasswordRequirement: true, // Phone-only auth
      publicMetadata: {
        role,
        registrationMethod: 'phone_otp',
        registeredAt: new Date().toISOString(),
      },
    })

    // Create sign-in token for immediate login
    try {
      const signInToken = await client.signInTokens.createSignInToken({
        userId: user.id,
        expiresInSeconds: 300, // 5 minutes
      })

      return NextResponse.json({
        success: true,
        message: 'Account created successfully',
        signInToken: signInToken.token,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: formattedPhone,
          role,
        },
      })
    } catch (tokenError) {
      console.error('Failed to create sign-in token:', tokenError)
      // User created but token failed - they can sign in manually
      return NextResponse.json({
        success: true,
        message: 'Account created. Please sign in.',
        signInToken: null,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      })
    }
  } catch (error: any) {
    console.error('Complete signup error:', error)

    // Handle Clerk-specific errors
    if (error.errors) {
      const clerkErrors = error.errors.map((e: any) => e.message).join(', ')
      return NextResponse.json({ success: false, error: clerkErrors }, { status: 400 })
    }

    return NextResponse.json({ success: false, error: 'Failed to create account' }, { status: 500 })
  }
}
