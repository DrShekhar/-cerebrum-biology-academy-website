'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Phone, Loader2, Check, Clock, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import {
  sendOTP,
  verifyOTP,
  cleanupRecaptcha,
  formatPhoneNumber,
  resetPhoneAuthState,
} from '@/lib/firebase/phone-auth'

interface PhoneSignInProps {
  onSuccess?: () => void
  redirectUrl?: string
}

type Step = 'phone' | 'otp' | 'signup' | 'success'

// Check if Firebase is configured
const isFirebaseConfigured = Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY)

// Get role-based dashboard redirect URL
// IMPORTANT: Roles in the system are UPPERCASE (STUDENT, ADMIN, etc.)
function getRoleDashboardUrl(role: string | undefined): string {
  const normalizedRole = (role || 'STUDENT').toUpperCase()
  switch (normalizedRole) {
    case 'ADMIN':
      return '/admin/dashboard'
    case 'TEACHER':
      return '/teacher/dashboard'
    case 'COUNSELOR':
      return '/counselor/dashboard'
    case 'PARENT':
      return '/parent/dashboard'
    case 'STUDENT':
    default:
      return '/dashboard'
  }
}

// Fallback component when Firebase is not configured
function PhoneSignInFallback() {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8 text-yellow-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Phone Authentication Setup Required
      </h3>
      <p className="text-gray-600 mb-4">
        Phone authentication requires Firebase configuration. Please contact the administrator.
      </p>
      <div className="bg-gray-50 rounded-lg p-4 text-left text-sm text-gray-600">
        <p className="font-medium mb-2">For administrators:</p>
        <p>
          Set the Firebase environment variables (NEXT_PUBLIC_FIREBASE_*) to enable phone
          authentication.
        </p>
      </div>
    </div>
  )
}

// Main Firebase Phone Auth component
function PhoneSignInWithFirebase({ onSuccess, redirectUrl = '/dashboard' }: PhoneSignInProps) {
  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showRefresh, setShowRefresh] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(0)
  const [verifyingSession, setVerifyingSession] = useState(false)

  // Signup form state (for new users)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState<'student' | 'parent'>('student')

  // Store Firebase user after verification
  const [firebaseUser, setFirebaseUser] = useState<{
    uid: string
    phoneNumber: string | null
  } | null>(null)

  // Ref for reCAPTCHA button
  const sendOtpButtonRef = useRef<HTMLButtonElement>(null)

  // Cleanup reCAPTCHA on unmount
  useEffect(() => {
    return () => {
      cleanupRecaptcha()
    }
  }, [])

  // Countdown timer for resend
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown((c) => c - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCountdown])

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '')
    if (digits.length <= 10) return digits
    if (digits.startsWith('91')) return digits.slice(0, 12)
    return digits.slice(0, 10)
  }

  const handleSendOTP = async () => {
    setError('')
    setShowRefresh(false)
    setLoading(true)

    try {
      // Send OTP using Firebase
      const result = await sendOTP(phone, 'send-otp-button')

      if (!result.success) {
        setShowRefresh(result.shouldRefresh || false)
        throw new Error(result.error || 'Failed to send OTP')
      }

      setResendCountdown(60)
      setStep('otp')
    } catch (err: unknown) {
      const error = err as Error
      setError(error.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleRefreshPage = () => {
    resetPhoneAuthState()
    window.location.reload()
  }

  const handleVerifyOTP = async () => {
    setError('')
    setLoading(true)

    try {
      // Verify OTP using Firebase
      const result = await verifyOTP(otp)

      if (!result.success) {
        throw new Error(result.error || 'Invalid OTP')
      }

      // Store Firebase user data
      setFirebaseUser(result.user || null)

      // Check if user exists in our database
      const formattedPhone = formatPhoneNumber(phone)
      const checkResponse = await fetch('/api/auth/firebase-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          uid: result.user?.uid,
          phoneNumber: formattedPhone,
          action: 'check',
        }),
      })

      const checkData = await checkResponse.json()

      if (!checkResponse.ok) {
        throw new Error(checkData.error || 'Failed to check user account')
      }

      if (checkData.userExists) {
        // Existing user - create session and redirect
        await createSessionAndRedirect(result.user!)
      } else {
        // New user - show signup form
        setStep('signup')
      }
    } catch (err: unknown) {
      const error = err as Error
      setError(error.message || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async () => {
    if (!firstName.trim()) {
      setError('Please enter your first name')
      return
    }

    if (!firebaseUser) {
      setError('Session expired. Please verify your phone again.')
      setStep('phone')
      return
    }

    setError('')
    setLoading(true)

    try {
      // Create user and session
      const response = await fetch('/api/auth/firebase-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          uid: firebaseUser.uid,
          phoneNumber: formatPhoneNumber(phone),
          firstName,
          lastName,
          role,
          action: 'signup',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account')
      }

      await createSessionAndRedirect(firebaseUser)
    } catch (err: unknown) {
      const error = err as Error
      setError(error.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const verifySessionWithRetry = async (
    maxRetries: number = 5,
    initialDelay: number = 600
  ): Promise<boolean> => {
    let delay = initialDelay

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      console.log(`[PhoneSignIn] Session verification attempt ${attempt}/${maxRetries}, delay: ${delay}ms`)

      await new Promise((resolve) => setTimeout(resolve, delay))

      try {
        const response = await fetch('/api/auth/session', {
          method: 'GET',
          credentials: 'include',
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
        })

        const data = await response.json()
        console.log(`[PhoneSignIn] Attempt ${attempt} result:`, {
          authenticated: data.authenticated,
          hasUser: !!data.user,
          userId: data.user?.id,
        })

        if (data.authenticated && data.user) {
          return true
        }
      } catch (err) {
        console.error(`[PhoneSignIn] Verification attempt ${attempt} error:`, err)
      }

      // Exponential backoff with cap
      delay = Math.min(delay * 1.5, 2000)
    }

    return false
  }

  const createSessionAndRedirect = async (user: { uid: string; phoneNumber: string | null }) => {
    try {
      const response = await fetch('/api/auth/firebase-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          uid: user.uid,
          phoneNumber: user.phoneNumber,
          action: 'login',
        }),
      })

      const data = await response.json()

      console.log('[PhoneSignIn] Login response:', {
        ok: response.ok,
        status: response.status,
        userId: data.userId,
      })

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create session')
      }

      // Show loading overlay during session verification
      setVerifyingSession(true)
      const isVerified = await verifySessionWithRetry()
      setVerifyingSession(false)

      if (!isVerified) {
        throw new Error('Session verification failed. Please try again.')
      }

      console.log('[PhoneSignIn] Session verified successfully')
      setStep('success')

      // Use role-based redirect if no custom redirectUrl was provided
      const userRole = data.user?.role
      const finalRedirectUrl =
        redirectUrl === '/dashboard' ? getRoleDashboardUrl(userRole) : redirectUrl

      const redirectWithTimestamp = finalRedirectUrl.includes('?')
        ? `${finalRedirectUrl}&_t=${Date.now()}`
        : `${finalRedirectUrl}?_t=${Date.now()}`

      // Redirect after a brief delay to ensure cookies are propagated
      // Using shorter delay (800ms) with immediate fallback
      const performRedirect = () => {
        if (onSuccess) {
          onSuccess()
        } else {
          console.log('[PhoneSignIn] Redirecting to:', redirectWithTimestamp, 'role:', userRole)
          try {
            // Primary: Use replace to prevent back button from returning to login
            window.location.replace(redirectWithTimestamp)
          } catch (redirectError) {
            console.error('[PhoneSignIn] Replace failed, using href:', redirectError)
            // Fallback: Direct assignment
            window.location.href = redirectWithTimestamp
          }
        }
      }

      // Execute redirect after delay
      setTimeout(performRedirect, 800)

      // Failsafe: If still on this page after 3 seconds, force redirect
      setTimeout(() => {
        if (window.location.pathname.includes('sign-in')) {
          console.warn('[PhoneSignIn] Failsafe redirect triggered')
          window.location.href = redirectWithTimestamp
        }
      }, 3000)
    } catch (err: unknown) {
      const error = err as Error
      console.error('[PhoneSignIn] Session creation error:', error)
      setError(error.message || 'Failed to complete sign-in')
      setVerifyingSession(false)
      setStep('phone')
    }
  }

  // Success screen
  if (step === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Login Successful!</h3>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    )
  }

  // Signup form
  if (step === 'signup') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
          <p className="text-gray-600">Just a few more details to get started</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name (Optional)
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`px-4 py-3 rounded-lg border-2 font-medium transition-colors ${
                  role === 'student'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                disabled={loading}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('parent')}
                className={`px-4 py-3 rounded-lg border-2 font-medium transition-colors ${
                  role === 'parent'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                disabled={loading}
              >
                Parent
              </button>
            </div>
          </div>

          <Button
            onClick={handleSignup}
            disabled={loading || !firstName.trim()}
            variant="primary"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 relative">
      {/* Session Verification Loading Overlay */}
      {verifyingSession && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="verifying-session-label"
        >
          <div className="bg-white rounded-xl p-6 text-center shadow-2xl max-w-sm mx-4">
            <Loader2 className="w-10 h-10 text-green-600 animate-spin mx-auto mb-4" />
            <p id="verifying-session-label" className="text-lg font-medium text-gray-900 mb-1">
              Verifying Session
            </p>
            <p className="text-sm text-gray-600">
              Please wait while we secure your login...
            </p>
          </div>
        </div>
      )}

      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {step === 'phone' ? 'Sign In with Phone' : 'Enter Verification Code'}
        </h2>
        <p className="text-gray-600">
          {step === 'phone'
            ? 'Get OTP on your phone for quick login'
            : 'Enter the 6-digit code sent to your phone'}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="mb-2">{error}</p>
          {showRefresh && (
            <button
              onClick={handleRefreshPage}
              className="flex items-center gap-2 text-sm font-medium text-red-700 hover:text-red-800 underline"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Page
            </button>
          )}
        </div>
      )}

      {step === 'phone' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <div className="flex">
              <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-600 text-sm">
                +91
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="98765 43210"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                maxLength={10}
                disabled={loading}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Enter your 10-digit mobile number</p>
          </div>

          <Button
            id="send-otp-button"
            ref={sendOtpButtonRef}
            onClick={handleSendOTP}
            disabled={loading || phone.length !== 10}
            variant="primary"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending OTP...
              </>
            ) : (
              <>
                <Phone className="w-4 h-4 mr-2" />
                Send OTP
              </>
            )}
          </Button>

          <p className="text-xs text-center text-gray-500">
            Free OTP - no charges for verification
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-2xl tracking-widest font-mono"
              maxLength={6}
              disabled={loading}
              autoFocus
            />
          </div>

          <Button
            onClick={handleVerifyOTP}
            disabled={loading || otp.length !== 6}
            variant="primary"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify & Sign In'
            )}
          </Button>

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => {
                setStep('phone')
                setOtp('')
                setError('')
                cleanupRecaptcha()
              }}
              className="flex-1 text-sm text-gray-600 hover:text-gray-900 py-2"
              disabled={loading}
            >
              Change number
            </button>

            {resendCountdown > 0 ? (
              <div className="flex-1 flex items-center justify-center gap-2 text-sm text-gray-500 py-2">
                <Clock className="w-4 h-4" />
                <span>Resend in {resendCountdown}s</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSendOTP}
                className="flex-1 text-sm text-green-600 hover:text-green-700 font-medium py-2"
                disabled={loading}
              >
                Resend OTP
              </button>
            )}
          </div>
        </div>
      )}

      <div className="text-xs text-center text-gray-500">
        By continuing, you agree to our{' '}
        <Link href="/terms" className="text-green-600 hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy-policy" className="text-green-600 hover:underline">
          Privacy Policy
        </Link>
      </div>
    </div>
  )
}

// Exported component that conditionally renders based on Firebase configuration
export function PhoneSignIn(props: PhoneSignInProps) {
  if (!isFirebaseConfigured) {
    return <PhoneSignInFallback />
  }

  return <PhoneSignInWithFirebase {...props} />
}
