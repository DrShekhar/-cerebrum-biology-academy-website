import { verifyIdToken } from '@/lib/firebase/admin'
import { NextRequest } from 'next/server'

/**
 * Firebase Token Re-verification for Sensitive Operations
 *
 * Use this utility when performing sensitive operations that require
 * fresh authentication verification beyond the session cookie.
 *
 * Examples of sensitive operations:
 * - Changing phone number or email
 * - Updating password
 * - Deleting account
 * - Accessing payment information
 * - Modifying security settings
 *
 * Usage:
 * ```typescript
 * import { requireFreshFirebaseAuth, extractFirebaseToken } from '@/lib/auth/firebase-verify'
 *
 * export async function POST(request: NextRequest) {
 *   const token = extractFirebaseToken(request)
 *   const verification = await requireFreshFirebaseAuth(token, {
 *     maxAgeSeconds: 300, // Token must be < 5 minutes old
 *     requiredClaims: { phone_number: '+91...' }, // Optional: verify specific claims
 *   })
 *
 *   if (!verification.valid) {
 *     return NextResponse.json({ error: verification.error }, { status: 401 })
 *   }
 *
 *   // Proceed with sensitive operation
 *   const { uid, phoneNumber } = verification
 * }
 * ```
 */

export interface FirebaseVerificationOptions {
  /**
   * Maximum age of the token in seconds.
   * For sensitive operations, use 300 (5 minutes) or less.
   * Default: 300 seconds (5 minutes)
   */
  maxAgeSeconds?: number

  /**
   * Required claims that must be present in the token.
   * Useful for verifying the user owns a specific phone number or email.
   */
  requiredClaims?: {
    phone_number?: string
    email?: string
    [key: string]: string | undefined
  }

  /**
   * If true, requires the token to have been issued after a recent sign-in,
   * not just a token refresh. This is more secure for highly sensitive operations.
   * Default: false
   */
  requireRecentSignIn?: boolean
}

export interface FirebaseVerificationResult {
  valid: boolean
  uid?: string
  phoneNumber?: string
  email?: string
  error?: string
  tokenAge?: number
}

/**
 * Extract Firebase ID token from request headers
 *
 * Expects the token in the Authorization header as:
 * - `Bearer <token>` (standard)
 * - `Firebase <token>` (alternative)
 *
 * Or in a custom header:
 * - `X-Firebase-Token: <token>`
 */
export function extractFirebaseToken(request: NextRequest): string | null {
  // Check Authorization header
  const authHeader = request.headers.get('authorization')
  if (authHeader) {
    const [scheme, token] = authHeader.split(' ')
    if ((scheme === 'Bearer' || scheme === 'Firebase') && token) {
      return token
    }
  }

  // Check custom header
  const customToken = request.headers.get('x-firebase-token')
  if (customToken) {
    return customToken
  }

  return null
}

/**
 * Verify a Firebase ID token with additional security checks for sensitive operations
 *
 * This function:
 * 1. Verifies the token is valid and not expired
 * 2. Checks the token age (for sensitive ops, should be recently issued)
 * 3. Validates any required claims
 * 4. Optionally checks for recent sign-in (not just token refresh)
 */
export async function requireFreshFirebaseAuth(
  token: string | null,
  options: FirebaseVerificationOptions = {}
): Promise<FirebaseVerificationResult> {
  const { maxAgeSeconds = 300, requiredClaims, requireRecentSignIn = false } = options

  if (!token) {
    return {
      valid: false,
      error: 'Firebase authentication token required for this operation',
    }
  }

  try {
    // Verify the token with Firebase Admin SDK
    const decodedToken = await verifyIdToken(token)

    // Calculate token age
    const now = Math.floor(Date.now() / 1000)
    const tokenAge = now - decodedToken.iat

    // Check if token is too old
    if (tokenAge > maxAgeSeconds) {
      return {
        valid: false,
        error: `Authentication token too old. Please re-authenticate. Token age: ${tokenAge}s, max allowed: ${maxAgeSeconds}s`,
        tokenAge,
      }
    }

    // Check for recent sign-in if required
    if (requireRecentSignIn && decodedToken.auth_time) {
      const timeSinceSignIn = now - decodedToken.auth_time
      if (timeSinceSignIn > maxAgeSeconds) {
        return {
          valid: false,
          error: `Recent sign-in required for this operation. Please sign in again.`,
          tokenAge,
        }
      }
    }

    // Validate required claims
    if (requiredClaims) {
      for (const [key, expectedValue] of Object.entries(requiredClaims)) {
        if (expectedValue === undefined) continue

        const actualValue = decodedToken[key]
        if (actualValue !== expectedValue) {
          return {
            valid: false,
            error: `Token claim mismatch for '${key}'. This operation requires verification of your identity.`,
            tokenAge,
          }
        }
      }
    }

    // Token is valid
    return {
      valid: true,
      uid: decodedToken.uid,
      phoneNumber: decodedToken.phone_number,
      email: decodedToken.email,
      tokenAge,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    // Provide user-friendly error messages
    if (errorMessage.includes('expired')) {
      return {
        valid: false,
        error: 'Your authentication has expired. Please sign in again.',
      }
    }

    if (errorMessage.includes('revoked')) {
      return {
        valid: false,
        error: 'Your session has been revoked. Please sign in again.',
      }
    }

    console.error('[Firebase Verify] Token verification failed:', errorMessage)
    return {
      valid: false,
      error: 'Authentication verification failed. Please try signing in again.',
    }
  }
}

/**
 * Middleware helper to require fresh Firebase auth for an entire route
 *
 * Usage in API route:
 * ```typescript
 * import { withFreshFirebaseAuth } from '@/lib/auth/firebase-verify'
 *
 * export const POST = withFreshFirebaseAuth(async (request, firebaseUser) => {
 *   // firebaseUser contains { uid, phoneNumber, email }
 *   return NextResponse.json({ success: true })
 * }, { maxAgeSeconds: 300 })
 * ```
 */
export function withFreshFirebaseAuth(
  handler: (
    request: NextRequest,
    firebaseUser: { uid: string; phoneNumber?: string; email?: string }
  ) => Promise<Response>,
  options: FirebaseVerificationOptions = {}
) {
  return async (request: NextRequest): Promise<Response> => {
    const token = extractFirebaseToken(request)
    const verification = await requireFreshFirebaseAuth(token, options)

    if (!verification.valid) {
      return new Response(
        JSON.stringify({
          error: verification.error,
          code: 'FIREBASE_AUTH_REQUIRED',
        }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    return handler(request, {
      uid: verification.uid!,
      phoneNumber: verification.phoneNumber,
      email: verification.email,
    })
  }
}
