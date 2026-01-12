import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'

// SECURITY: No fallback in production - secrets are required
const getAuthSecret = () => {
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('CRITICAL: AUTH_SECRET or NEXTAUTH_SECRET is required in production')
    }
    return 'dev-only-secret-not-for-production-use'
  }
  return secret
}
const AUTH_SECRET = getAuthSecret()

interface FirebaseSessionRequest {
  uid: string
  phoneNumber: string
  firstName?: string
  lastName?: string
  role?: 'student' | 'parent'
  action: 'check' | 'signup' | 'login'
}

export async function POST(request: NextRequest) {
  try {
    const body: FirebaseSessionRequest = await request.json()
    const { uid, phoneNumber, firstName, lastName, role, action } = body

    if (!uid || !phoneNumber) {
      return NextResponse.json(
        { error: 'Firebase UID and phone number are required' },
        { status: 400 }
      )
    }

    // Normalize phone number to E.164 format
    const normalizedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber.replace(/\D/g, '').slice(-10)}`

    // Action: Check if user exists
    if (action === 'check') {
      const existingUser = await prisma.users.findFirst({
        where: {
          OR: [
            { phone: normalizedPhone },
            { firebaseUid: uid },
          ],
        },
      })

      return NextResponse.json({
        userExists: !!existingUser,
        userId: existingUser?.id,
      })
    }

    // Action: Create new user (signup)
    if (action === 'signup') {
      if (!firstName) {
        return NextResponse.json(
          { error: 'First name is required for signup' },
          { status: 400 }
        )
      }

      // Check if user already exists
      const existingUser = await prisma.users.findFirst({
        where: {
          OR: [
            { phone: normalizedPhone },
            { firebaseUid: uid },
          ],
        },
      })

      if (existingUser) {
        // User already exists, update Firebase UID if needed
        if (!existingUser.firebaseUid) {
          await prisma.users.update({
            where: { id: existingUser.id },
            data: { firebaseUid: uid },
          })
        }

        return NextResponse.json({
          success: true,
          userId: existingUser.id,
          message: 'User already exists',
        })
      }

      // Create new user
      // Generate unique ID and placeholder email for phone-only users
      const userId = randomUUID()
      const placeholderEmail = `${normalizedPhone.replace('+', '')}@phone.cerebrum.local`

      const newUser = await prisma.users.create({
        data: {
          id: userId,
          email: placeholderEmail,
          name: [firstName, lastName].filter(Boolean).join(' '),
          phone: normalizedPhone,
          firebaseUid: uid,
          role: role === 'parent' ? 'PARENT' : 'STUDENT',
          updatedAt: new Date(),
          profile: {
            firstName,
            lastName,
            signupMethod: 'firebase_phone',
          },
        },
      })

      return NextResponse.json({
        success: true,
        userId: newUser.id,
        message: 'User created successfully',
      })
    }

    // Action: Create session (login)
    if (action === 'login') {
      // Find user by phone or Firebase UID
      let user = await prisma.users.findFirst({
        where: {
          OR: [
            { phone: normalizedPhone },
            { firebaseUid: uid },
          ],
        },
      })

      if (!user) {
        return NextResponse.json(
          { error: 'User not found. Please sign up first.' },
          { status: 404 }
        )
      }

      // Update Firebase UID if not set
      if (!user.firebaseUid) {
        user = await prisma.users.update({
          where: { id: user.id },
          data: { firebaseUid: uid },
        })
      }

      // Update last active timestamp
      await prisma.users.update({
        where: { id: user.id },
        data: { lastActiveAt: new Date() },
      })

      // Create JWT token for NextAuth session
      const sessionToken = jwt.sign(
        {
          id: user.id,
          email: user.email || `${normalizedPhone.replace('+', '')}@phone.local`,
          name: user.name,
          role: user.role.toLowerCase(),
          phone: normalizedPhone,
          sub: user.id,
        },
        AUTH_SECRET,
        { expiresIn: '7d' }
      )

      // Set session cookie using NextResponse headers (more reliable)
      const isProduction = process.env.NODE_ENV === 'production'
      const maxAge = 7 * 24 * 60 * 60 // 7 days in seconds

      const response = NextResponse.json({
        success: true,
        userId: user.id,
        user: {
          id: user.id,
          name: user.name,
          role: user.role.toLowerCase(),
          phone: normalizedPhone,
        },
      })

      // Set cookie using response headers
      const cookieOptions = [
        `authjs.session-token=${sessionToken}`,
        'HttpOnly',
        `Max-Age=${maxAge}`,
        'Path=/',
        'SameSite=Lax',
        isProduction ? 'Secure' : '',
      ].filter(Boolean).join('; ')

      response.headers.set('Set-Cookie', cookieOptions)

      console.log('[Firebase Session] Cookie set via response headers')

      return response
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Firebase session error:', error)
    return NextResponse.json(
      { error: 'Failed to process Firebase session' },
      { status: 500 }
    )
  }
}
