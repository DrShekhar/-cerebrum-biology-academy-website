'use client'

import { useState, useEffect } from 'react'
import {
  Phone,
  User,
  GraduationCap,
  MessageCircle,
  Loader2,
  Check,
  Clock,
  Shield,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface QuickInquiryFormProps {
  onSuccess?: () => void
  variant?: 'hero' | 'sidebar' | 'modal'
  preselectedCourse?: string
}

const courseOptions = [
  { value: 'foundation-11', label: 'Foundation (Class 11th)' },
  { value: 'target-12', label: 'Target (Class 12th)' },
  { value: 'dropper', label: 'Dropper Batch' },
  { value: 'crash', label: 'Crash Course' },
  { value: 'undecided', label: 'Need Guidance' },
]

export function QuickInquiryForm({
  onSuccess,
  variant = 'hero',
  preselectedCourse,
}: QuickInquiryFormProps) {
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: preselectedCourse || '',
  })
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendCountdown, setResendCountdown] = useState(0)

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
    } else if (cleaned.length === 10) {
      return `+91${cleaned}`
    }
    return `+${cleaned}`
  }

  const handleSendOTP = async () => {
    if (!formData.name.trim()) {
      setError('Please enter your name')
      return
    }
    if (!formData.phone || formData.phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit phone number')
      return
    }
    if (!formData.course) {
      setError('Please select a course')
      return
    }

    setError('')
    setLoading(true)

    try {
      const formattedPhone = formatPhoneNumber(formData.phone)

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
      setResendCountdown(60)
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyAndSubmit = async () => {
    if (otp.length !== 6) {
      setError('Please enter the 6-digit OTP')
      return
    }

    setError('')
    setLoading(true)

    try {
      const formattedPhone = formatPhoneNumber(formData.phone)

      // Verify OTP
      const verifyResponse = await fetch('/api/auth/whatsapp/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: formattedPhone, code: otp }),
      })

      const verifyData = await verifyResponse.json()

      if (!verifyResponse.ok) {
        throw new Error(verifyData.error || 'Invalid OTP')
      }

      // Submit inquiry to demo-booking API
      const inquiryResponse = await fetch('/api/demo-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formattedPhone,
          email: '',
          course: formData.course,
          source: 'quick-inquiry-form',
          preferredDate: new Date().toISOString().split('T')[0],
          preferredTime: 'callback',
          message: `Quick inquiry for ${courseOptions.find((c) => c.value === formData.course)?.label || formData.course}. Requested callback.`,
        }),
      })

      if (!inquiryResponse.ok) {
        console.error('Failed to submit inquiry, but OTP verified')
      }

      setStep('success')
      onSuccess?.()
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setError('')
    setLoading(true)

    try {
      const formattedPhone = formatPhoneNumber(formData.phone)

      const response = await fetch('/api/auth/whatsapp/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: formattedPhone }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend OTP')
      }

      setResendCountdown(60)
      setOtp('')
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP')
    } finally {
      setLoading(false)
    }
  }

  const isHero = variant === 'hero'

  if (step === 'success') {
    return (
      <div
        className={`${isHero ? 'bg-white/10 backdrop-blur-sm' : 'bg-green-50'} rounded-2xl p-6 text-center`}
      >
        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className={`text-xl font-bold mb-2 ${isHero ? 'text-white' : 'text-gray-900'}`}>
          Thank You, {formData.name.split(' ')[0]}!
        </h3>
        <p className={`${isHero ? 'text-blue-100' : 'text-gray-600'} mb-4`}>
          Our counselor will call you within 2 minutes.
        </p>
        <div
          className={`flex items-center justify-center gap-2 text-sm ${isHero ? 'text-green-300' : 'text-green-600'}`}
        >
          <Phone className="w-4 h-4" />
          <span>Keep your phone ready!</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${isHero ? 'bg-white/10 backdrop-blur-sm' : 'bg-white shadow-xl'} rounded-2xl p-6`}
    >
      <div className="mb-4">
        <h3 className={`text-lg font-bold ${isHero ? 'text-white' : 'text-gray-900'} mb-1`}>
          Get Free Counseling
        </h3>
        <p className={`text-sm ${isHero ? 'text-blue-100' : 'text-gray-600'}`}>
          Callback in 2 minutes - No commitment
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}
{step === 'form' ? (
          <div
            key="form"
            className="space-y-3 animate-fadeInUp"
          >
            <div className="relative">
              <User
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isHero ? 'text-white/60' : 'text-gray-400'}`}
              />
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full pl-10 pr-4 py-3 rounded-lg ${
                  isHero
                    ? 'bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:border-white'
                    : 'bg-gray-50 text-gray-900 border border-gray-200 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-white/20`}
              />
            </div>

            <div className="relative">
              <Phone
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isHero ? 'text-white/60' : 'text-gray-400'}`}
              />
              <input
                type="tel"
                placeholder="WhatsApp Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full pl-10 pr-4 py-3 rounded-lg ${
                  isHero
                    ? 'bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:border-white'
                    : 'bg-gray-50 text-gray-900 border border-gray-200 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-white/20`}
              />
            </div>

            <div className="relative">
              <GraduationCap
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isHero ? 'text-white/60' : 'text-gray-400'}`}
              />
              <select
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className={`w-full pl-10 pr-4 py-3 rounded-lg appearance-none ${
                  isHero
                    ? 'bg-white/20 text-white border border-white/30 focus:border-white'
                    : 'bg-gray-50 text-gray-900 border border-gray-200 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-white/20`}
              >
                <option value="" className="text-gray-900">
                  Select Course
                </option>
                {courseOptions.map((option) => (
                  <option key={option.value} value={option.value} className="text-gray-900">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <Button
              onClick={handleSendOTP}
              disabled={loading}
              className={`w-full ${
                isHero
                  ? 'bg-white text-blue-600 hover:bg-gray-100'
                  : 'bg-green-600 text-white hover:bg-green-700'
              } font-semibold py-3`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get OTP on WhatsApp
                </>
              )}
            </Button>

            <div
              className={`flex items-center justify-center gap-4 text-xs ${isHero ? 'text-white/70' : 'text-gray-500'} mt-3`}
            >
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                100% Secure
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Instant Callback
              </span>
            </div>
          </div>
        ) : (
          <div
            key="otp"
            className="space-y-4 animate-fadeInUp"
          >
            <div className="text-center mb-2">
              <p className={`text-sm ${isHero ? 'text-blue-100' : 'text-gray-600'}`}>
                OTP sent to {formData.phone}
              </p>
            </div>

            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className={`w-full px-4 py-3 rounded-lg text-center text-2xl tracking-widest ${
                isHero
                  ? 'bg-white/20 text-white placeholder:text-white/60 border border-white/30'
                  : 'bg-gray-50 text-gray-900 border border-gray-200'
              } focus:outline-none focus:ring-2 focus:ring-white/20`}
              maxLength={6}
            />

            <Button
              onClick={handleVerifyAndSubmit}
              disabled={loading || otp.length !== 6}
              className={`w-full ${
                isHero
                  ? 'bg-white text-blue-600 hover:bg-gray-100'
                  : 'bg-green-600 text-white hover:bg-green-700'
              } font-semibold py-3`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Verify & Get Callback
                </>
              )}
            </Button>

            <div className="flex items-center justify-between text-sm">
              <button
                onClick={() => setStep('form')}
                className={`${isHero ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Change number
              </button>

              {resendCountdown > 0 ? (
                <span
                  className={`flex items-center gap-1 ${isHero ? 'text-white/60' : 'text-gray-500'}`}
                >
                  <Clock className="w-4 h-4" />
                  Resend in {resendCountdown}s
                </span>
              ) : (
                <button
                  onClick={handleResendOTP}
                  disabled={loading}
                  className={`font-medium ${isHero ? 'text-white hover:text-white/80' : 'text-green-600 hover:text-green-700'}`}
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        )}
</div>
  )
}
