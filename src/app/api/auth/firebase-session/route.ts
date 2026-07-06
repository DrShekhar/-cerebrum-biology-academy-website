import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { randomUUID, randomBytes } from 'crypto'
import { AuthRateLimit, addSecurityHeaders } from '@/lib/auth/config'
import { TRIAL_DAYS } from '@/lib/constants/trial'
import { notifySignupToCrm } from '@/lib/leads/notifySignup'
import { requireFreshFirebaseAuth } from '@/lib/auth/firebase-verify'

interface FirebaseSessionRequest {
  uid: string
  phoneNumber: string
  idToken?: string
  firstName?: string
  lastName?: string
  role?: 'STUDENT' | 'PARENT'
  action: 'check' | 'signup' | 'login'
}

// Firebase Admin SDK credentials are required for server-side ID token
// verification. When they are absent in local dev we fall back to trusting
// the client-sent uid (clearly logged); production ALWAYS verifies.
const isFirebaseAdminConfigured = (): boolean =>
  Boolean(
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON ||
      (process.env.FIREBASE_PROJECT_ID &&
        process.env.FIREBASE_CLIENT_EMAIL &&
        process.env.FIREBASE_PRIVATE_KEY)
  )

const last10Digits = (phone: string): string => phone.replace(/\D/g, '').slice(-10)

// P0 auth unification: instead of minting a forged session cookie, we issue a
// one-time bridge token. The client exchanges it for a REAL NextAuth session
// via signIn('whatsapp-otp', { phone, verificationToken }).
const BRIDGE_TOKEN_TTL_MS = 5 * 60 * 1000

// All prisma.users calls in this route use explicit `select` so the query
// never references columns the production DB may not have yet (schema drift
// like users.subscriptionTier previously 500'd every phone login here).
const AUTH_USER_SELECT = {
  id: true,
  phone: true,
  firebaseUid: true,
  name: true,
  role: true,
  coachingTier: true,
  trialStartDate: true,
  trialEndDate: true,
} as const

async function issueBridgeToken(userId: string): Promise<string> {
  const token = randomBytes(32).toString('hex')
  await prisma.users.update({
    where: { id: userId },
    data: {
      verificationToken: token,
      verificationTokenExpiry: new Date(Date.now() + BRIDGE_TOKEN_TTL_MS),
    },
    select: { id: true },
  })
  return token
}

export async function POST(request: NextRequest) {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

  try {
    const body: FirebaseSessionRequest = await request.json()
    const { uid, phoneNumber, idToken, firstName, lastName, role, action } = body

    if (!uid || !phoneNumber) {
      console.error(`[Firebase Session][${requestId}] Missing required fields`)
      return addSecurityHeaders(
        NextResponse.json({ error: 'Firebase UID and phone number are required' }, { status: 400 })
      )
    }

    // Rate limiting - prevent brute force attacks
    // NOTE: In serverless environments, in-memory rate limiting is per-instance
    // Consider using Redis (Upstash) for production distributed rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIP = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : request.headers.get('x-real-ip') || 'unknown'

    // Normalize phone number to E.164 format BEFORE rate limiting, so
    // +919876543210 / 919876543210 / 9876543210 share ONE rate bucket
    // (keying on the raw input let each format multiply the allowance).
    const normalizedPhone = phoneNumber.startsWith('+')
      ? phoneNumber
      : `+91${phoneNumber.replace(/\D/g, '').slice(-10)}`

    const rateLimitKey = `firebase-session:${clientIP}:${normalizedPhone}`
    const rateLimitCheck = await AuthRateLimit.checkRateLimit(rateLimitKey)
    if (!rateLimitCheck.allowed) {
      console.warn(`[Firebase Session] Rate limit exceeded for IP: ${clientIP}`)
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Too many authentication attempts',
            message: 'Please wait a few minutes before trying again',
            lockoutEndsAt: rateLimitCheck.lockoutEndsAt,
          },
          { status: 429 }
        )
      )
    }

    const phoneLast10 = last10Digits(normalizedPhone)
    if (!phoneLast10) {
      return addSecurityHeaders(
        NextResponse.json({ error: 'Invalid phone number' }, { status: 400 })
      )
    }

    // Country-aware phone matchers. Indian numbers historically exist in
    // exactly three stored formats (bare 10-digit, 91-prefixed, +91 E.164) —
    // match those EXACTLY. Non-Indian numbers were only ever stored as full
    // E.164 — exact match only. The previous blanket endsWith(last10) let
    // +1 987-654-3210 (US) resolve the +91 98765 43210 (India) row: the US
    // login would bind its firebaseUid to the Indian account and receive the
    // Indian user's session. Exact-format matching closes that.
    const phoneMatchers = normalizedPhone.startsWith('+91')
      ? [
          { phone: normalizedPhone }, // +91XXXXXXXXXX
          { phone: normalizedPhone.slice(1) }, // 91XXXXXXXXXX
          { phone: phoneLast10 }, // XXXXXXXXXX (legacy bare)
        ]
      : [{ phone: normalizedPhone }]

    // SECURITY: For signup/login, verify the Firebase ID token server-side.
    // The forged-cookie era trusted the client-sent uid with no verification.
    let verifiedUid = uid
    if (action === 'signup' || action === 'login') {
      if (isFirebaseAdminConfigured() || process.env.NODE_ENV === 'production') {
        if (!idToken) {
          console.warn(`[Firebase Session][${requestId}] Missing Firebase ID token`)
          return addSecurityHeaders(
            NextResponse.json(
              { error: 'Firebase ID token is required. Please sign in again.' },
              { status: 401 }
            )
          )
        }

        const verification = await requireFreshFirebaseAuth(idToken, {
          // Firebase ID tokens are valid for 1h; the client fetches a fresh
          // (auto-refreshed) token right before calling this route.
          maxAgeSeconds: 60 * 60,
        })

        if (!verification.valid) {
          console.warn(
            `[Firebase Session][${requestId}] ID token verification failed: ${verification.error}`
          )
          return addSecurityHeaders(
            NextResponse.json(
              { error: verification.error || 'Authentication verification failed' },
              { status: 401 }
            )
          )
        }

        const phoneMatches =
          !!verification.phoneNumber &&
          last10Digits(verification.phoneNumber) === last10Digits(normalizedPhone)
        const uidMatches = verification.uid === uid

        if (!phoneMatches && !uidMatches) {
          console.warn(
            `[Firebase Session][${requestId}] Verified token does not match requested phone/uid`
          )
          return addSecurityHeaders(
            NextResponse.json(
              { error: 'Phone number does not match verified credentials' },
              { status: 401 }
            )
          )
        }

        // Trust the server-verified identity over client-sent values
        verifiedUid = verification.uid!
      } else {
        // DEV-ONLY fallback (NODE_ENV !== 'production' guaranteed by the branch
        // above): firebase-admin credentials are missing, so we cannot verify
        // the ID token. Accept the client uid as before, loudly.
        console.warn(
          `[Firebase Session][${requestId}] DEV-ONLY FALLBACK: firebase-admin credentials missing ` +
            '(FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_PROJECT_ID/CLIENT_EMAIL/PRIVATE_KEY). ' +
            'Accepting client-sent uid WITHOUT verification. This path never runs in production.'
        )
      }
    }

    // Action: Check if user exists
    if (action === 'check') {
      const existingUser = await prisma.users.findFirst({
        where: {
          OR: [...phoneMatchers, { firebaseUid: uid }],
        },
        select: { id: true },
      })

      // Reset rate limit on successful check
      AuthRateLimit.resetRateLimit(rateLimitKey)

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
          NextResponse.json({ error: 'First name is required for signup' }, { status: 400 })
        )
      }

      // Check if user already exists (country-aware exact-format matching)
      const existingUser = await prisma.users.findFirst({
        where: {
          OR: [...phoneMatchers, { firebaseUid: verifiedUid }],
        },
        select: AUTH_USER_SELECT,
      })

      if (existingUser) {
        // User already exists, update Firebase UID if needed
        if (!existingUser.firebaseUid) {
          await prisma.users.update({
            where: { id: existingUser.id },
            data: { firebaseUid: verifiedUid },
            select: { id: true },
          })
        }

        const verificationToken = await issueBridgeToken(existingUser.id)

        return addSecurityHeaders(
          NextResponse.json({
            success: true,
            userId: existingUser.id,
            phone: existingUser.phone || normalizedPhone,
            verificationToken,
            message: 'User already exists',
          })
        )
      }

      // Create new user
      // Generate unique ID and placeholder email for phone-only users
      const userId = randomUUID()
      const placeholderEmail = `${normalizedPhone.replace('+', '')}@phone.cerebrum.local`

      // Set up the master trial for new users (length: TRIAL_DAYS)
      const trialStartDate = new Date()
      const trialEndDate = new Date(trialStartDate)
      trialEndDate.setDate(trialEndDate.getDate() + TRIAL_DAYS)

      const newUser = await prisma.users.create({
        data: {
          id: userId,
          email: placeholderEmail,
          name: [firstName, lastName].filter(Boolean).join(' '),
          phone: normalizedPhone,
          firebaseUid: verifiedUid,
          role: role === 'PARENT' ? 'PARENT' : 'STUDENT',
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
        select: AUTH_USER_SELECT,
      })

      const verificationToken = await issueBridgeToken(newUser.id)

      // New signup → CRM: round-robin counselor assignment + follow-up task
      notifySignupToCrm({
        name: newUser.name,
        phone: newUser.phone,
        source: 'phone-otp-signup',
      })

      // Reset rate limit on successful signup
      AuthRateLimit.resetRateLimit(rateLimitKey)
      return addSecurityHeaders(
        NextResponse.json({
          success: true,
          userId: newUser.id,
          phone: newUser.phone || normalizedPhone,
          verificationToken,
          coachingTier: newUser.coachingTier,
          trialStartDate: newUser.trialStartDate,
          trialEndDate: newUser.trialEndDate,
          message: 'User created successfully',
        })
      )
    }

    // Action: Issue bridge token for a REAL NextAuth sign-in (login)
    if (action === 'login') {
      // Find user by phone or Firebase UID (country-aware exact-format matching)
      let user = await prisma.users.findFirst({
        where: {
          OR: [...phoneMatchers, { firebaseUid: verifiedUid }],
        },
        select: AUTH_USER_SELECT,
      })

      if (!user) {
        console.warn(
          `[Firebase Session][${requestId}] User not found for phone: ***${normalizedPhone.slice(-4)}`
        )
        return addSecurityHeaders(
          NextResponse.json({ error: 'User not found. Please sign up first.' }, { status: 404 })
        )
      }

      // Update Firebase UID if not set
      if (!user.firebaseUid) {
        user = await prisma.users.update({
          where: { id: user.id },
          data: { firebaseUid: verifiedUid },
          select: AUTH_USER_SELECT,
        })
      }

      // Update last active timestamp
      await prisma.users.update({
        where: { id: user.id },
        data: { lastActiveAt: new Date() },
        select: { id: true },
      })

      // Check if trial is still active
      const now = new Date()
      const isTrialActive = user.trialEndDate ? now < user.trialEndDate : false
      const trialDaysRemaining = user.trialEndDate
        ? Math.max(
            0,
            Math.ceil((user.trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
          )
        : 0

      // P0 auth unification: NO forged cookie. Return a one-time bridge token;
      // the client completes login with signIn('whatsapp-otp', ...) which
      // creates a real NextAuth session.
      const verificationToken = await issueBridgeToken(user.id)

      const response = NextResponse.json({
        success: true,
        userId: user.id,
        phone: user.phone || normalizedPhone,
        verificationToken,
        user: {
          id: user.id,
          name: user.name,
          role: user.role.toUpperCase(),
          phone: normalizedPhone,
          coachingTier: user.coachingTier,
          isTrialActive: isTrialActive,
          trialDaysRemaining: trialDaysRemaining,
          trialEndDate: user.trialEndDate,
        },
      })

      // Reset rate limit on successful login
      AuthRateLimit.resetRateLimit(rateLimitKey)

      return addSecurityHeaders(response)
    }

    return addSecurityHeaders(NextResponse.json({ error: 'Invalid action' }, { status: 400 }))
  } catch (error) {
    // Detailed error logging for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined

    console.error('[Firebase Session] Error processing request:', {
      message: errorMessage,
      stack: errorStack,
      timestamp: new Date().toISOString(),
    })

    // Provide user-friendly error messages (never expose technical details to users)
    let userMessage = 'Something went wrong. Please try again in a moment.'
    let statusCode = 500

    if (errorMessage.includes('Unique constraint')) {
      userMessage = 'This phone number is already registered. Please try logging in instead.'
      statusCode = 409
    } else if (
      errorMessage.includes('Connection') ||
      errorMessage.includes('timeout') ||
      errorMessage.includes('ETIMEDOUT')
    ) {
      userMessage = 'We are experiencing connection issues. Please try again in a moment.'
      statusCode = 503
    } else if (
      errorMessage.includes('does not exist') ||
      errorMessage.includes('column') ||
      errorMessage.includes('prisma')
    ) {
      // Database schema mismatch - don't expose to users
      userMessage = 'We are updating our systems. Please try again in a few minutes.'
      statusCode = 503
    } else if (errorMessage.includes('rate limit') || errorMessage.includes('too many')) {
      userMessage = 'Too many attempts. Please wait a few minutes before trying again.'
      statusCode = 429
    }

    return addSecurityHeaders(
      NextResponse.json(
        {
          error: userMessage,
        },
        { status: statusCode }
      )
    )
  }
}
