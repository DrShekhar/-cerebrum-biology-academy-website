'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Phone,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Smartphone,
  MessageSquare,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useAuth as useInstantAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'

export default function SignInPage() {
  const [authMethod, setAuthMethod] = useState<'mobile' | 'email'>('mobile')
  const [mobile, setMobile] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [otpId, setOtpId] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState<'auth' | 'otp'>('auth')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rateLimitInfo, setRateLimitInfo] = useState<{
    isRateLimited: boolean
    waitTime: number
    canRetryAt: number
    countdown: number
  } | null>(null)

  const { login, isLoading: isAuthLoading } = useAuth()
  const { sendOtp, verifyOtp, isSubmitting: isInstantSubmitting } = useInstantAuth()
  const router = useRouter()
  const isSubmitting = isAuthLoading || isInstantSubmitting

  // Effect to handle countdown timer for rate limiting
  React.useEffect(() => {
    let interval: NodeJS.Timeout

    if (rateLimitInfo?.isRateLimited) {
      interval = setInterval(() => {
        const now = Date.now()
        const remainingTime = Math.max(0, rateLimitInfo.canRetryAt - now)

        setRateLimitInfo((prev) => {
          if (!prev) return null
          return {
            ...prev,
            countdown: remainingTime,
          }
        })

        if (remainingTime <= 0) {
          setRateLimitInfo(null)
          setError('')
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [rateLimitInfo?.isRateLimited, rateLimitInfo?.canRetryAt])

  const handleMobileSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!mobile.match(/^[6-9]\d{9}$/)) {
      setError('Please enter a valid Indian mobile number')
      return
    }

    try {
      setError('')
      const result = await sendOtp({
        mobile,
        purpose: 'login',
        whatsapp: whatsapp || mobile,
      })

      if (result.success) {
        setOtpId(result.data.otpId)
        setStep('otp')
      }
    } catch (err: any) {
      if (err.cause?.type === 'RATE_LIMITED') {
        setRateLimitInfo({
          isRateLimited: true,
          waitTime: err.cause.waitTime,
          canRetryAt: err.cause.canRetryAt,
          countdown: err.cause.waitTime,
        })
      }
      setError(err.message || 'Failed to send OTP')
    }
  }

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP')
      return
    }

    try {
      setError('')
      const result = await verifyOtp({
        mobile,
        otp,
        otpId,
        purpose: 'login',
        whatsapp: whatsapp || mobile,
      })

      if (result.success) {
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Invalid OTP')
    }
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    try {
      setError('')
      const result = await login(email, password, true)

      if (result.success) {
        router.push('/dashboard')
      } else {
        setError(result.error || 'Sign in failed')
      }
    } catch (err: any) {
      setError(err.message || 'Sign in failed')
    }
  }

  const resendOtp = async () => {
    try {
      setError('')
      await sendOtp({
        mobile,
        purpose: 'login',
        whatsapp: whatsapp || mobile,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background decoration layer */}
      <div className="absolute inset-0 z-0">
        {/* Corner decorative shapes - highly visible */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-200/40 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-blue-200/30 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-pink-200/30 rounded-full blur-[80px]"></div>

        {/* Animated glowing orbs */}
        <div className="absolute top-1/4 left-1/3 w-40 h-40 bg-teal-300/50 rounded-full blur-[60px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-purple-300/50 rounded-full blur-[60px] animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, rgba(100, 100, 150, 0.15) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        ></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-teal-50 to-white rounded-xl flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-teal-200/50 p-2">
              <Image
                src="/brain-logo.png"
                alt="Cerebrum Biology Academy"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900">Cerebrum</span>
              <span className="text-lg text-gray-600 block -mt-1">Biology Academy</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Sign in to continue your NEET Biology journey</p>
        </motion.div>

        {/* Auth Method Toggle */}
        {step === 'auth' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100/50 p-6 mb-6 ring-1 ring-black/5"
          >
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6 border border-gray-200 shadow-inner">
              <button
                onClick={() => setAuthMethod('mobile')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-all ${
                  authMethod === 'mobile'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Mobile OTP</span>
              </button>
              <button
                onClick={() => setAuthMethod('email')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-all ${
                  authMethod === 'email'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </button>
            </div>

            {/* Mobile OTP Form */}
            {authMethod === 'mobile' && (
              <form onSubmit={handleMobileSignIn} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 placeholder-gray-400 shadow-sm hover:border-gray-400 transition-all duration-200"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">We'll send an OTP to this number</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Number (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210 (for updates)"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 placeholder-gray-400 shadow-sm hover:border-gray-400 transition-all duration-200"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    For course updates and support (can be different from mobile)
                  </p>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting || rateLimitInfo?.isRateLimited}
                >
                  {rateLimitInfo?.isRateLimited
                    ? `Wait ${Math.ceil(rateLimitInfo.countdown / 1000)}s`
                    : isSubmitting
                      ? 'Sending OTP...'
                      : 'Send OTP'}
                  {!rateLimitInfo?.isRateLimited && <ArrowRight className="w-5 h-5 ml-2" />}
                </Button>
              </form>
            )}

            {/* Email Form */}
            {authMethod === 'email' && (
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 placeholder-gray-400 shadow-sm hover:border-gray-400 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-900 placeholder-gray-400 shadow-sm hover:border-gray-400 transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      aria-pressed={showPassword}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                role="alert"
                aria-live="polite"
              >
                {error}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* OTP Verification */}
        {step === 'otp' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100/50 p-6 mb-6 ring-1 ring-black/5"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Verify OTP</h2>
              <p className="text-gray-600">
                We've sent a 6-digit code to <br />
                <span className="font-medium">+91 {mobile}</span>
              </p>
            </div>

            <form onSubmit={handleOtpVerification} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="123456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-center text-lg font-mono tracking-widest text-gray-900 placeholder-gray-400 shadow-sm hover:border-gray-400 transition-all duration-200"
                  maxLength={6}
                  required
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Verifying...' : 'Verify & Sign In'}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={resendOtp}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  disabled={isSubmitting}
                >
                  Resend OTP
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep('auth')}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  ← Back to mobile number
                </button>
              </div>
            </form>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                role="alert"
                aria-live="polite"
              >
                {error}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up here
            </Link>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-700">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-700">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
