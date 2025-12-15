'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Loader2, Check, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SignupForm } from './SignupForm'

/**
 * Get redirect URL based on user role
 */
function getRedirectByRole(role?: string): string {
  switch (role?.toUpperCase()) {
    case 'ADMIN':
    case 'SUPERADMIN':
      return '/admin'
    case 'COUNSELOR':
      return '/counselor/leads'
    case 'TEACHER':
      return '/teacher/assignments'
    case 'PARENT':
      return '/parent/dashboard'
    case 'STUDENT':
    default:
      return '/dashboard'
  }
}

export function WhatsAppLogin() {
  const [step, setStep] = useState<'phone' | 'otp' | 'signup'>('phone')
  const [userId, setUserId] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isSignupComplete, setIsSignupComplete] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(0)
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null)

  // Countdown timer effect
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCountdown])

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')

    if (cleaned.startsWith('91')) {
      return `+${cleaned}`
    } else if (cleaned.startsWith('+91')) {
      return cleaned
    } else if (cleaned.length === 10) {
      return `+91${cleaned}`
    }
    return `+${cleaned}`
  }

  const handleSendOTP = async () => {
    setError('')
    setLoading(true)

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber)

      const response = await fetch('/api/auth/whatsapp/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: formattedPhone }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP')
      }

      setStep('otp')
      setResendCountdown(60) // Start 60-second countdown
      setRemainingAttempts(null)
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setError('')
    setLoading(true)

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber)

      const response = await fetch('/api/auth/whatsapp/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: formattedPhone }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend OTP')
      }

      setResendCountdown(60) // Reset countdown
      setError('')
      setOtp('') // Clear previous OTP input
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    setError('')
    setLoading(true)

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber)

      const response = await fetch('/api/auth/whatsapp/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: formattedPhone, code: otp }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle remaining attempts if provided
        if (data.remainingAttempts !== undefined) {
          setRemainingAttempts(data.remainingAttempts)
        }
        throw new Error(data.error || 'Invalid OTP')
      }

      // Cookies are automatically set by the server (HTTP-only)
      // Store user data in localStorage for quick access (non-sensitive data only)
      localStorage.setItem('user', JSON.stringify(data.user))

      // Check if new user needs to complete signup
      if (data.isNewUser) {
        setUserId(data.user.id)
        setStep('signup')
      } else {
        // Existing user - redirect based on role
        setSuccess(true)
        const redirectUrl = getRedirectByRole(data.user.role)
        setTimeout(() => {
          window.location.href = redirectUrl
        }, 1000)
      }
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Show signup form for new users
  if (step === 'signup') {
    return (
      <SignupForm
        userId={userId}
        phone={phoneNumber}
        onComplete={(userRole?: string) => {
          setIsSignupComplete(true)
          setSuccess(true)
          const redirectUrl = getRedirectByRole(userRole || 'STUDENT')
          setTimeout(() => {
            window.location.href = redirectUrl
          }, 1000)
        }}
      />
    )
  }

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {isSignupComplete ? 'Registration Complete!' : 'Login Successful!'}
        </h3>
        <p className="text-gray-600">Redirecting to your dashboard...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">WhatsApp Login</h2>
        <p className="text-gray-600">
          {step === 'phone'
            ? 'Enter your WhatsApp number to receive OTP'
            : 'Enter the OTP sent to your WhatsApp'}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
          {remainingAttempts !== null && (
            <p className="text-sm mt-1">Remaining attempts: {remainingAttempts}</p>
          )}
        </div>
      )}

      {step === 'phone' ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              WhatsApp Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={loading}
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter your 10-digit mobile number or with country code
            </p>
          </div>

          <Button
            onClick={handleSendOTP}
            disabled={loading || !phoneNumber}
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
                <MessageCircle className="w-4 h-4 mr-2" />
                Send OTP via WhatsApp
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
              Verification Code
            </label>
            <input
              id="otp"
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-2xl tracking-widest"
              maxLength={6}
              disabled={loading}
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
              'Verify & Login'
            )}
          </Button>

          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setStep('phone')}
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
                onClick={handleResendOTP}
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
        By continuing, you agree to our Terms of Service and Privacy Policy
      </div>
    </div>
  )
}
