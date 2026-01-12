import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  PhoneAuthProvider,
  signInWithCredential,
} from 'firebase/auth'
import { auth } from './config'

// Store confirmation result for OTP verification
let confirmationResult: ConfirmationResult | null = null

// Store recaptcha verifier instance
let recaptchaVerifier: RecaptchaVerifier | null = null

/**
 * Initialize invisible reCAPTCHA verifier
 * Must be called before sendOTP - attaches to a button element
 */
export function initRecaptcha(buttonId: string): RecaptchaVerifier {
  // Clean up existing verifier if any
  if (recaptchaVerifier) {
    recaptchaVerifier.clear()
  }

  recaptchaVerifier = new RecaptchaVerifier(auth, buttonId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved - will proceed with OTP send
    },
    'expired-callback': () => {
      // Reset reCAPTCHA if expired
      console.log('reCAPTCHA expired, please try again')
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
 * Send OTP to phone number
 * Returns true if OTP sent successfully
 */
export async function sendOTP(
  phoneNumber: string,
  buttonId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const formattedPhone = formatPhoneNumber(phoneNumber)

    // Initialize recaptcha if not already done
    if (!recaptchaVerifier) {
      initRecaptcha(buttonId)
    }

    if (!recaptchaVerifier) {
      return { success: false, error: 'reCAPTCHA initialization failed' }
    }

    // Send OTP via Firebase
    confirmationResult = await signInWithPhoneNumber(
      auth,
      formattedPhone,
      recaptchaVerifier
    )

    return { success: true }
  } catch (error: unknown) {
    console.error('Error sending OTP:', error)

    // Handle specific Firebase errors
    const firebaseError = error as { code?: string; message?: string }
    let errorMessage = 'Failed to send OTP'

    if (firebaseError.code === 'auth/invalid-phone-number') {
      errorMessage = 'Invalid phone number format'
    } else if (firebaseError.code === 'auth/too-many-requests') {
      errorMessage = 'Too many attempts. Please try again later'
    } else if (firebaseError.code === 'auth/quota-exceeded') {
      errorMessage = 'SMS quota exceeded. Please try again tomorrow'
    } else if (firebaseError.code === 'auth/captcha-check-failed') {
      errorMessage = 'reCAPTCHA verification failed. Please refresh the page'
      // Reset reCAPTCHA
      if (recaptchaVerifier) {
        recaptchaVerifier.clear()
        recaptchaVerifier = null
      }
    } else if (firebaseError.code === 'auth/operation-not-allowed') {
      errorMessage = 'Phone auth not enabled. Please enable it in Firebase Console.'
    } else if (firebaseError.code === 'auth/missing-client-identifier') {
      errorMessage = 'reCAPTCHA failed to load. Please refresh the page.'
    } else if (firebaseError.code === 'auth/network-request-failed') {
      errorMessage = 'Network error. Please check your internet connection.'
    } else if (firebaseError.code) {
      // Show the actual error code for debugging
      errorMessage = `Firebase error: ${firebaseError.code}`
    } else if (firebaseError.message) {
      errorMessage = firebaseError.message
    }

    return { success: false, error: errorMessage }
  }
}

/**
 * Verify OTP code entered by user
 * Returns Firebase user if successful
 */
export async function verifyOTP(
  code: string
): Promise<{ success: boolean; user?: { uid: string; phoneNumber: string | null }; error?: string }> {
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
 */
export async function signOut(): Promise<void> {
  await auth.signOut()
  confirmationResult = null
  if (recaptchaVerifier) {
    recaptchaVerifier.clear()
    recaptchaVerifier = null
  }
}

/**
 * Get current Firebase user
 */
export function getCurrentUser() {
  return auth.currentUser
}

/**
 * Clean up reCAPTCHA verifier (call on component unmount)
 */
export function cleanupRecaptcha(): void {
  if (recaptchaVerifier) {
    recaptchaVerifier.clear()
    recaptchaVerifier = null
  }
}
