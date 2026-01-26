import { signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult } from 'firebase/auth'
import { auth } from './config'

// Store confirmation result for OTP verification
let confirmationResult: ConfirmationResult | null = null

// Store recaptcha verifier instance
let recaptchaVerifier: RecaptchaVerifier | null = null

// Track initialization attempts for better error recovery
let initAttempts = 0
const MAX_INIT_ATTEMPTS = 3

/**
 * Clear and reset the reCAPTCHA verifier completely
 * This helps recover from failed Enterprise verification attempts
 */
function resetRecaptchaVerifier(): void {
  if (recaptchaVerifier) {
    try {
      recaptchaVerifier.clear()
    } catch (e) {
      console.log('[reCAPTCHA] Clear failed (may already be cleared):', e)
    }
    recaptchaVerifier = null
  }

  // Also remove any lingering reCAPTCHA DOM elements
  const recaptchaContainers = document.querySelectorAll('.grecaptcha-badge, [id^="recaptcha"]')
  recaptchaContainers.forEach((el) => {
    try {
      el.remove()
    } catch (e) {
      // Ignore removal errors
    }
  })
}

/**
 * Initialize invisible reCAPTCHA verifier with retry logic
 * Uses reCAPTCHA v2 invisible mode - Firebase handles Enterprise fallback internally
 * Must be called before sendOTP - attaches to a button element
 */
export function initRecaptcha(buttonId: string): RecaptchaVerifier | null {
  // If Firebase is not configured, return null
  if (!auth) {
    console.warn('[reCAPTCHA] Firebase not configured - phone auth unavailable')
    return null
  }

  // Always clean up existing verifier first
  resetRecaptchaVerifier()

  console.log('[reCAPTCHA] Initializing verifier for button:', buttonId)

  recaptchaVerifier = new RecaptchaVerifier(auth, buttonId, {
    size: 'invisible',
    callback: () => {
      console.log('[reCAPTCHA] Verification successful - proceeding with OTP')
      initAttempts = 0 // Reset on success
    },
    'expired-callback': () => {
      console.log('[reCAPTCHA] Token expired - will re-verify on next attempt')
      // Don't clear here - let the next sendOTP attempt handle it
    },
    'error-callback': (error: unknown) => {
      console.log('[reCAPTCHA] Error callback:', error)
      // Reset on error to allow retry
      resetRecaptchaVerifier()
    },
  })

  return recaptchaVerifier
}

/**
 * Format phone number to E.164 format for Firebase
 * Handles Indian numbers specifically
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')

  // If starts with 91 and has 12 digits, it's already formatted
  if (digits.startsWith('91') && digits.length === 12) {
    return `+${digits}`
  }

  // If 10 digits, assume Indian number
  if (digits.length === 10) {
    return `+91${digits}`
  }

  // If already has + prefix
  if (phone.startsWith('+')) {
    return phone
  }

  // Default: add +91 prefix
  return `+91${digits}`
}

/**
 * Send OTP to phone number with automatic retry on reCAPTCHA failures
 * Returns true if OTP sent successfully
 */
export async function sendOTP(
  phoneNumber: string,
  buttonId: string
): Promise<{ success: boolean; error?: string; shouldRefresh?: boolean }> {
  // If Firebase is not configured, return error
  if (!auth) {
    return { success: false, error: 'Phone authentication is not available' }
  }

  const formattedPhone = formatPhoneNumber(phoneNumber)
  console.log('[OTP] Sending to:', formattedPhone)

  // Helper to attempt OTP send
  const attemptSend = async (): Promise<{
    success: boolean
    error?: string
    shouldRetry?: boolean
    shouldRefresh?: boolean
  }> => {
    try {
      // Always reinitialize recaptcha for fresh token
      // This helps avoid stale Enterprise verification issues
      initRecaptcha(buttonId)

      if (!recaptchaVerifier) {
        return { success: false, error: 'reCAPTCHA initialization failed', shouldRetry: false }
      }

      // Send OTP via Firebase
      console.log('[OTP] Calling signInWithPhoneNumber...')
      confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifier)

      console.log('[OTP] Successfully sent!')
      initAttempts = 0
      return { success: true }
    } catch (error: unknown) {
      console.error('[OTP] Error:', error)
      const firebaseError = error as { code?: string; message?: string }

      // Determine if we should retry or give up
      let errorMessage = 'Failed to send OTP'
      let shouldRetry = false
      let shouldRefresh = false

      switch (firebaseError.code) {
        case 'auth/invalid-phone-number':
          errorMessage = 'Invalid phone number format'
          break

        case 'auth/too-many-requests':
          errorMessage =
            'Too many attempts. Please wait 10-15 minutes before trying again, or use a different phone number.'
          // Rate limit is server-side, no point in retrying
          break

        case 'auth/quota-exceeded':
          errorMessage = 'SMS quota exceeded. Please try again tomorrow.'
          break

        case 'auth/captcha-check-failed':
        case 'auth/missing-client-identifier':
          // reCAPTCHA issues - might benefit from retry with fresh verifier
          resetRecaptchaVerifier()
          initAttempts++
          if (initAttempts < MAX_INIT_ATTEMPTS) {
            shouldRetry = true
            console.log(
              `[OTP] reCAPTCHA failed, will retry (attempt ${initAttempts}/${MAX_INIT_ATTEMPTS})`
            )
          } else {
            errorMessage = 'Verification check failed. Please refresh the page and try again.'
            shouldRefresh = true
          }
          break

        case 'auth/operation-not-allowed':
          errorMessage = 'Phone authentication is not enabled. Please contact support.'
          break

        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection and try again.'
          shouldRetry = initAttempts < MAX_INIT_ATTEMPTS
          initAttempts++
          break

        case 'auth/internal-error':
          // Often indicates reCAPTCHA Enterprise verification failure
          resetRecaptchaVerifier()
          initAttempts++
          if (initAttempts < MAX_INIT_ATTEMPTS) {
            shouldRetry = true
            console.log(
              `[OTP] Internal error (possibly reCAPTCHA Enterprise), will retry (attempt ${initAttempts}/${MAX_INIT_ATTEMPTS})`
            )
          } else {
            errorMessage =
              'Verification service temporarily unavailable. Please refresh and try again.'
            shouldRefresh = true
          }
          break

        default:
          if (firebaseError.code) {
            errorMessage = `Authentication error: ${firebaseError.code}`
          } else if (firebaseError.message) {
            errorMessage = firebaseError.message
          }
      }

      return { success: false, error: errorMessage, shouldRetry, shouldRefresh }
    }
  }

  // First attempt
  let result = await attemptSend()

  // Automatic retry on reCAPTCHA failures (up to MAX_INIT_ATTEMPTS)
  while (result.shouldRetry && initAttempts < MAX_INIT_ATTEMPTS) {
    console.log(`[OTP] Retrying after delay...`)
    // Small delay before retry
    await new Promise((resolve) => setTimeout(resolve, 1000))
    result = await attemptSend()
  }

  return {
    success: result.success,
    error: result.error,
    shouldRefresh: result.shouldRefresh,
  }
}

/**
 * Verify OTP code entered by user
 * Returns Firebase user if successful
 */
export async function verifyOTP(code: string): Promise<{
  success: boolean
  user?: { uid: string; phoneNumber: string | null }
  error?: string
}> {
  try {
    if (!confirmationResult) {
      return { success: false, error: 'No OTP was sent. Please request a new code' }
    }

    // Verify the OTP code
    const result = await confirmationResult.confirm(code)
    const user = result.user

    // Clear confirmation result after successful verification
    confirmationResult = null

    return {
      success: true,
      user: {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
      },
    }
  } catch (error: unknown) {
    console.error('Error verifying OTP:', error)

    const firebaseError = error as { code?: string }
    let errorMessage = 'Invalid verification code'

    if (firebaseError.code === 'auth/invalid-verification-code') {
      errorMessage = 'Invalid OTP. Please check and try again'
    } else if (firebaseError.code === 'auth/code-expired') {
      errorMessage = 'OTP has expired. Please request a new code'
    }

    return { success: false, error: errorMessage }
  }
}

/**
 * Sign out the current user
 * Clears both Firebase client auth and server-side JWT session cookie
 */
export async function signOut(): Promise<void> {
  // First, call server-side logout to clear the JWT session cookie
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
  } catch (error) {
    console.error('Error calling server logout:', error)
  }

  // Then sign out from Firebase client (if configured)
  if (auth) {
    await auth.signOut()
  }
  confirmationResult = null
  resetRecaptchaVerifier()
  initAttempts = 0
}

/**
 * Get current Firebase user
 */
export function getCurrentUser() {
  return auth?.currentUser ?? null
}

/**
 * Clean up reCAPTCHA verifier (call on component unmount)
 */
export function cleanupRecaptcha(): void {
  resetRecaptchaVerifier()
  initAttempts = 0
}

/**
 * Reset the phone auth state completely
 * Call this when user navigates away or on page refresh
 */
export function resetPhoneAuthState(): void {
  resetRecaptchaVerifier()
  confirmationResult = null
  initAttempts = 0
}
