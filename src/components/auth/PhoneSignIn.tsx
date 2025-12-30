'use client'

import { useState, useEffect } from 'react'
import { useSignIn, useClerk } from '@clerk/nextjs'
import { MessageCircle, Phone, Loader2, Check, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface PhoneSignInProps {
  onSuccess?: () => void
  redirectUrl?: string
}

type Step = 'phone' | 'otp' | 'signup' | 'success'
type Channel = 'whatsapp' | 'sms'

export function PhoneSignIn({ onSuccess, redirectUrl = '/dashboard' }: PhoneSignInProps) {
  const { signIn, setActive } = useSignIn()
  const clerk = useClerk()

  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [channel, setChannel] = useState<Channel>('whatsapp')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendCountdown, setResendCountdown] = useState(0)
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null)

  // Signup form state
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [role, setRole] = useState<'student' | 'parent'>('student')

  // Countdown timer
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
    setLoading(true)

    try {
      const response = await fetch('/api/auth/phone/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, channel, fallbackToSms: true }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP')
      }

      // Update channel if fallback occurred
      if (data.channel && data.channel !== channel) {
        setChannel(data.channel)
      }

      setRemainingAttempts(data.remainingAttempts)
      setResendCountdown(60)
      setStep('otp')
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/phone/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code: otp, channel }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.remainingAttempts !== undefined) {
          setRemainingAttempts(data.remainingAttempts)
        }
        throw new Error(data.error || 'Invalid OTP')
      }

      if (data.userExists && data.signInToken) {
        // Existing user - sign in with Clerk token
        await handleClerkSignIn(data.signInToken)
      } else if (!data.userExists) {
        // New user - show signup form
        setStep('signup')
      } else {
        // Fallback - redirect to sign-in
        window.location.href = '/sign-in'
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async () => {
    if (!firstName.trim()) {
      setError('Please enter your first name')
      return
    }

    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/phone/complete-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, firstName, lastName, role }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account')
      }

      if (data.signInToken) {
        await handleClerkSignIn(data.signInToken)
      } else {
        // Token creation failed - redirect to sign-in
        window.location.href = '/sign-in'
      }
    } catch (err: any) {
      setError(err.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const handleClerkSignIn = async (token: string) => {
    try {
      if (!signIn) {
        throw new Error('Sign-in not available')
      }

      const result = await signIn.create({
        strategy: 'ticket',
        ticket: token,
      })

      if (result.status === 'complete' && result.createdSessionId) {
        await setActive({ session: result.createdSessionId })
        setStep('success')

        setTimeout(() => {
          if (onSuccess) {
            onSuccess()
          } else {
            window.location.href = redirectUrl
          }
        }, 1000)
      } else {
        throw new Error('Sign-in incomplete')
      }
    } catch (err: any) {
      console.error('Clerk sign-in error:', err)
      setError('Sign-in failed. Please try again.')
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
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
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
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
            className="w-full"
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
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {step === 'phone' ? 'Sign In with Phone' : 'Enter Verification Code'}
        </h2>
        <p className="text-gray-600">
          {step === 'phone'
            ? 'Get OTP on WhatsApp for quick login'
            : `Enter the 6-digit code sent to your ${channel === 'whatsapp' ? 'WhatsApp' : 'phone'}`}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{error}</p>
          {remainingAttempts !== null && remainingAttempts <= 2 && (
            <p className="text-sm mt-1">Remaining attempts: {remainingAttempts}</p>
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

          {/* Channel selector */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setChannel('whatsapp')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 font-medium text-sm transition-colors ${
                channel === 'whatsapp'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
              disabled={loading}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
            <button
              type="button"
              onClick={() => setChannel('sms')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 font-medium text-sm transition-colors ${
                channel === 'sms'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
              disabled={loading}
            >
              <Phone className="w-4 h-4" />
              SMS
            </button>
          </div>

          <Button
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
                <MessageCircle className="w-4 h-4 mr-2" />
                Send OTP via {channel === 'whatsapp' ? 'WhatsApp' : 'SMS'}
              </>
            )}
          </Button>
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
        <a href="/terms" className="text-blue-600 hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-blue-600 hover:underline">
          Privacy Policy
        </a>
      </div>
    </div>
  )
}
