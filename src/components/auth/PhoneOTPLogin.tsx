'use client'

import { useState, useEffect } from 'react'
import { useSignIn, useSignUp } from '@clerk/nextjs'
import { MessageCircle, Smartphone, Loader2, Check, ArrowLeft, Clock } from 'lucide-react'

interface PhoneOTPLoginProps {
  redirectUrl?: string
  onBack?: () => void
  isSignUp?: boolean
}

type Channel = 'whatsapp' | 'sms'
type Step = 'channel' | 'phone' | 'otp' | 'signup' | 'success'

/**
 * Phone OTP Login Component
 * Supports WhatsApp and SMS OTP with Clerk integration
 */
export function PhoneOTPLogin({
  redirectUrl = '/dashboard',
  onBack,
  isSignUp = false,
}: PhoneOTPLoginProps) {
  const { signIn, setActive: setSignInActive } = useSignIn()
  const { signUp, setActive: setSignUpActive } = useSignUp()

  const [step, setStep] = useState<Step>('channel')
  const [channel, setChannel] = useState<Channel>('whatsapp')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendCountdown, setResendCountdown] = useState(0)
  const [signInToken, setSignInToken] = useState<string | null>(null)
  const [needsSignup, setNeedsSignup] = useState(false)

  // Signup form fields
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  // Countdown timer
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown((c) => c - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCountdown])

  // Format phone number for India
  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.startsWith('91')) return `+${cleaned}`
    if (cleaned.length === 10) return `+91${cleaned}`
    return `+${cleaned}`
  }

  // Send OTP - WhatsApp via Interakt, SMS via Twilio
  const handleSendOTP = async () => {
    setError('')
    setLoading(true)

    try {
      const formattedPhone = formatPhone(phone)

      // Route to different providers based on channel
      const endpoint =
        channel === 'whatsapp'
          ? '/api/auth/whatsapp/send-otp' // Interakt (India-optimized)
          : '/api/auth/phone/send-otp' // Twilio

      const body =
        channel === 'whatsapp'
          ? { phoneNumber: formattedPhone } // Interakt uses phoneNumber
          : { phone: formattedPhone, channel: 'sms' } // Twilio uses phone

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP')
      }

      setStep('otp')
      setResendCountdown(60)
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  // Verify OTP - WhatsApp via Interakt, SMS via Twilio
  const handleVerifyOTP = async () => {
    setError('')
    setLoading(true)

    try {
      const formattedPhone = formatPhone(phone)

      // Route to different providers based on channel
      const endpoint =
        channel === 'whatsapp'
          ? '/api/auth/whatsapp/verify-otp' // Interakt
          : '/api/auth/phone/verify' // Twilio

      const body =
        channel === 'whatsapp'
          ? { phoneNumber: formattedPhone, code: otp } // Interakt uses phoneNumber
          : { phone: formattedPhone, code: otp, channel: 'sms' } // Twilio uses phone

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Invalid OTP')
      }

      if (data.userExists && data.signInToken) {
        // Existing user - sign in with token
        setSignInToken(data.signInToken)
        await handleSignInWithToken(data.signInToken)
      } else if (!data.userExists) {
        // New user - show signup form
        setNeedsSignup(true)
        setStep('signup')
      } else {
        // Token failed, but user exists - redirect to sign-in
        window.location.href = `/sign-in?phone=${encodeURIComponent(formattedPhone)}`
      }
    } catch (err: any) {
      setError(err.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  // Sign in with token
  const handleSignInWithToken = async (token: string) => {
    try {
      if (!signIn) throw new Error('Sign in not available')

      const result = await signIn.create({
        strategy: 'ticket',
        ticket: token,
      })

      if (result.status === 'complete') {
        await setSignInActive({ session: result.createdSessionId })
        setStep('success')
        setTimeout(() => {
          window.location.href = redirectUrl
        }, 1000)
      }
    } catch (err: any) {
      console.error('Sign in with token failed:', err)
      // Fallback - redirect to dashboard
      window.location.href = redirectUrl
    }
  }

  // Complete signup
  const handleCompleteSignup = async () => {
    setError('')
    setLoading(true)

    try {
      const formattedPhone = formatPhone(phone)

      const response = await fetch('/api/auth/phone/complete-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formattedPhone,
          firstName,
          lastName,
          email: email || undefined,
          role: 'student',
          channel,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account')
      }

      if (data.signInToken) {
        await handleSignInWithToken(data.signInToken)
      } else {
        setStep('success')
        setTimeout(() => {
          window.location.href = redirectUrl
        }, 1500)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  // Resend OTP
  const handleResendOTP = async () => {
    if (resendCountdown > 0) return
    await handleSendOTP()
  }

  // Success state
  if (step === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {needsSignup ? 'Account Created!' : 'Login Successful!'}
        </h3>
        <p className="text-gray-600">Redirecting to dashboard...</p>
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
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Enter your first name"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Enter your last name"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>

          <button
            onClick={handleCompleteSignup}
            disabled={loading || !firstName.trim()}
            className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </div>
      </div>
    )
  }

  // Channel selection
  if (step === 'channel') {
    return (
      <div className="space-y-6">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all options
          </button>
        )}

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isSignUp ? 'Sign Up with Phone' : 'Sign In with Phone'}
          </h2>
          <p className="text-gray-600">Choose how you want to receive the OTP</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              setChannel('whatsapp')
              setStep('phone')
            }}
            className="w-full flex items-center gap-4 p-4 border-2 border-green-200 rounded-xl bg-green-50 hover:bg-green-100 hover:border-green-300 transition-colors"
          >
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">WhatsApp OTP</p>
              <p className="text-sm text-gray-600">Receive OTP on WhatsApp (Recommended)</p>
            </div>
          </button>

          <button
            onClick={() => {
              setChannel('sms')
              setStep('phone')
            }}
            className="w-full flex items-center gap-4 p-4 border-2 border-blue-200 rounded-xl bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-colors"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">SMS OTP</p>
              <p className="text-sm text-gray-600">Receive OTP via text message</p>
            </div>
          </button>
        </div>
      </div>
    )
  }

  // Phone number input
  if (step === 'phone') {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setStep('channel')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Change method
        </button>

        <div className="text-center">
          <div
            className={`w-16 h-16 ${channel === 'whatsapp' ? 'bg-green-100' : 'bg-blue-100'} rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            {channel === 'whatsapp' ? (
              <MessageCircle
                className={`w-8 h-8 ${channel === 'whatsapp' ? 'text-green-600' : 'text-blue-600'}`}
              />
            ) : (
              <Smartphone className="w-8 h-8 text-blue-600" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Your Phone Number</h2>
          <p className="text-gray-600">
            We&apos;ll send a verification code via {channel === 'whatsapp' ? 'WhatsApp' : 'SMS'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-lg"
              placeholder="+91 98765 43210"
              disabled={loading}
            />
            <p className="mt-1 text-xs text-gray-500">Enter your 10-digit mobile number</p>
          </div>

          <button
            onClick={handleSendOTP}
            disabled={loading || phone.replace(/\D/g, '').length < 10}
            className={`w-full px-4 py-3 ${channel === 'whatsapp' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending OTP...
              </>
            ) : (
              <>
                {channel === 'whatsapp' ? (
                  <MessageCircle className="w-5 h-5" />
                ) : (
                  <Smartphone className="w-5 h-5" />
                )}
                Send OTP
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  // OTP verification
  return (
    <div className="space-y-6">
      <button
        onClick={() => {
          setStep('phone')
          setOtp('')
          setError('')
        }}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Change number
      </button>

      <div className="text-center">
        <div
          className={`w-16 h-16 ${channel === 'whatsapp' ? 'bg-green-100' : 'bg-blue-100'} rounded-full flex items-center justify-center mx-auto mb-4`}
        >
          {channel === 'whatsapp' ? (
            <MessageCircle className="w-8 h-8 text-green-600" />
          ) : (
            <Smartphone className="w-8 h-8 text-blue-600" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Verification Code</h2>
        <p className="text-gray-600">We sent a code to {formatPhone(phone)}</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-center text-2xl tracking-widest"
            placeholder="000000"
            maxLength={6}
            disabled={loading}
          />
        </div>

        <button
          onClick={handleVerifyOTP}
          disabled={loading || otp.length !== 6}
          className={`w-full px-4 py-3 ${channel === 'whatsapp' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} disabled:bg-gray-300 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify & Continue'
          )}
        </button>

        <div className="flex items-center justify-center">
          {resendCountdown > 0 ? (
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Resend in {resendCountdown}s</span>
            </div>
          ) : (
            <button
              onClick={handleResendOTP}
              disabled={loading}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Resend Code
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
