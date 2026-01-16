import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'crypto'
import { AuthRateLimit, addSecurityHeaders } from '@/lib/auth/config'

// SECURITY: Lazy-load secrets to prevent build-time errors
// Secrets are only required at runtime when actually processing requests
let _authSecret: string | null = null

const getAuthSecret = (): string => {
  if (_authSecret) return _authSecret

  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      // During build analysis, return placeholder; actual requests will fail at runtime without secrets
      console.warn('[BUILD] AUTH_SECRET not available - will be required at runtime')
      return 'build-time-placeholder-not-for-actual-use'
    }
    console.warn('[DEV] AUTH_SECRET not set - using development fallback')
    _authSecret = 'dev-only-secret-not-for-production-use'
    return _authSecret
  }
  _authSecret = secret
  return _authSecret
}

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
      return addSecurityHeaders(
        NextResponse.json(
          { error: 'Firebase UID and phone number are required' },
          { status: 400 }
        )
      )
    }

    // Rate limiting - prevent brute force attacks
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIP = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : request.headers.get('x-real-ip') || 'unknown'

    const rateLimitKey = `firebase-session:${clientIP}:${phoneNumber}`
    const rateLimitCheck = AuthRateLimit.checkRateLimit(rateLimitKey)
    if (!rateLimitCheck.allowed) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Too many authentication attempts',
            message: 'Please try again later',
            lockoutEndsAt: rateLimitCheck.lockoutEndsAt,
          },
          { status: 429 }
        )
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

      return addSecurityHeaders(
        NextResponse.json({
          userExists: !!existingUser,
          userId: existingUser?.id,
        })
      )
    }

    // Action: Create new user (signup)
    if (action === 'signup') {
      if (!firstName) {
        return addSecurityHeaders(
          NextResponse.json(
            { error: 'First name is required for signup' },
            { status: 400 }
          )
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

        return addSecurityHeaders(
          NextResponse.json({
            success: true,
            userId: existingUser.id,
            message: 'User already exists',
          })
        )
      }

      // Create new user
      // Generate unique ID and placeholder email for phone-only users
      const userId = randomUUID()
      const placeholderEmail = `${normalizedPhone.replace('+', '')}@phone.cerebrum.local`

      // Set up 7-day master trial for new users
      const trialStartDate = new Date()
      const trialEndDate = new Date(trialStartDate)
      trialEndDate.setDate(trialEndDate.getDate() + 7)

      const newUser = await prisma.users.create({
        data: {
          id: userId,
          email: placeholderEmail,
          name: [firstName, lastName].filter(Boolean).join(' '),
          phone: normalizedPhone,
          firebaseUid: uid,
          role: role === 'parent' ? 'PARENT' : 'STUDENT',
          coachingTier: 'FREE',
          trialStartDate: trialStartDate,
          trialEndDate: trialEndDate,
          updatedAt: new Date(),
          profile: {
            firstName,
            lastName,
            signupMethod: 'firebase_phone',
          },
        },
      })

      return addSecurityHeaders(
        NextResponse.json({
          success: true,
          userId: newUser.id,
          coachingTier: newUser.coachingTier,
          trialStartDate: newUser.trialStartDate,
          trialEndDate: newUser.trialEndDate,
          message: 'User created successfully',
        })
      )
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
        return addSecurityHeaders(
          NextResponse.json(
            { error: 'User not found. Please sign up first.' },
            { status: 404 }
          )
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

      // Check if trial is still active
      const now = new Date()
      const isTrialActive = user.trialEndDate ? now < user.trialEndDate : false
      const trialDaysRemaining = user.trialEndDate
        ? Math.max(0, Math.ceil((user.trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
        : 0

      // Create JWT token for NextAuth session
      const sessionToken = jwt.sign(
        {
          id: user.id,
          email: user.email || `${normalizedPhone.replace('+', '')}@phone.local`,
          name: user.name,
          role: user.role.toLowerCase(),
          phone: normalizedPhone,
          coachingTier: user.coachingTier,
          isTrialActive: isTrialActive,
          trialEndDate: user.trialEndDate?.toISOString(),
          sub: user.id,
        },
        getAuthSecret(),
        { expiresIn: '7d' }
      )

      // Set session cookie using Next.js cookies API (reliable across all environments)
      const isProduction = process.env.NODE_ENV === 'production'
      const maxAge = 7 * 24 * 60 * 60 // 7 days in seconds

      // Use Next.js cookies() API - the recommended way to set cookies in route handlers
      const cookieStore = await cookies()
      cookieStore.set('authjs.session-token', sessionToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        path: '/',
        maxAge: maxAge,
      })

      console.log('[Firebase Session] Cookie set via Next.js cookies() API')

      return addSecurityHeaders(
        NextResponse.json({
          success: true,
          userId: user.id,
          user: {
            id: user.id,
            name: user.name,
            role: user.role.toLowerCase(),
            phone: normalizedPhone,
            coachingTier: user.coachingTier,
            isTrialActive: isTrialActive,
            trialDaysRemaining: trialDaysRemaining,
            trialEndDate: user.trialEndDate,
          },
        })
      )
    }

    return addSecurityHeaders(
      NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      )
    )
  } catch (error) {
    console.error('Firebase session error:', error)
    return addSecurityHeaders(
      NextResponse.json(
        { error: 'Failed to process Firebase session' },
        { status: 500 }
      )
    )
  }
}
