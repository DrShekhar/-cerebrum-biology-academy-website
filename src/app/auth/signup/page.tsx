'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Phone,
  Mail,
  User,
  GraduationCap,
  MessageSquare,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Smartphone,
  Users,
  Eye,
  EyeOff,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'

export default function SignUpPage() {
  const [registrationMethod, setRegistrationMethod] = useState<'mobile' | 'email'>('mobile')
  const [step, setStep] = useState<'details' | 'otp'>('details')

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    whatsapp: '',
    email: '',
    password: '',
    role: 'student' as 'student' | 'parent',
    currentClass: '12th' as '10th' | '11th' | '12th' | 'Dropper',
    parentMobile: '',
    referralCode: '',
    marketingConsent: true,
    whatsappConsent: true,
  })

  const [otp, setOtp] = useState('')
  const [otpId, setOtpId] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const { sendOtp, verifyOtp, register, isSubmitting } = useAuth()
  const router = useRouter()

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMobileRegistration = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.mobile) {
      setError('Please fill in all required fields')
      return
    }

    if (!formData.mobile.match(/^[6-9]\d{9}$/)) {
      setError('Please enter a valid Indian mobile number')
      return
    }

    if (
      formData.role === 'student' &&
      formData.parentMobile &&
      !formData.parentMobile.match(/^[6-9]\d{9}$/)
    ) {
      setError('Please enter a valid parent mobile number')
      return
    }

    try {
      setError('')
      const result = await sendOtp({
        mobile: formData.mobile,
        purpose: 'registration',
        whatsapp: formData.whatsapp || formData.mobile,
      })

      if (result.success) {
        setOtpId(result.data.otpId)
        setStep('otp')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP')
    }
  }

  const handleEmailRegistration = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    try {
      setError('')
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.mobile,
        role: formData.role,
        currentClass: formData.currentClass,
        parentEmail: formData.role === 'student' ? formData.email : undefined,
        referralCode: formData.referralCode,
      })

      if (result.success) {
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed')
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
        mobile: formData.mobile,
        otp,
        otpId,
        purpose: 'registration',
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp || formData.mobile,
        role: formData.role,
        currentClass: formData.currentClass,
        parentMobile: formData.parentMobile,
        referralCode: formData.referralCode,
        marketingConsent: formData.marketingConsent,
        whatsappConsent: formData.whatsappConsent,
      })

      if (result.success) {
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Invalid OTP')
    }
  }

  const resendOtp = async () => {
    try {
      setError('')
      await sendOtp({
        mobile: formData.mobile,
        purpose: 'registration',
        whatsapp: formData.whatsapp || formData.mobile,
      })
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link href="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md border border-teal-100 p-2">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Us Today!</h1>
          <p className="text-gray-600">Start your NEET Biology preparation journey</p>
        </motion.div>

        {/* Registration Form */}
        {step === 'details' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-6"
          >
            {/* Registration Method Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              <button
                onClick={() => setRegistrationMethod('mobile')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-all ${
                  registrationMethod === 'mobile'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Mobile</span>
              </button>
              <button
                onClick={() => setRegistrationMethod('email')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-all ${
                  registrationMethod === 'email'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </button>
            </div>

            <form
              onSubmit={
                registrationMethod === 'mobile' ? handleMobileRegistration : handleEmailRegistration
              }
              className="space-y-4"
            >
              {/* Basic Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) =>
                      handleInputChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))
                    }
                    placeholder="9876543210"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* WhatsApp (for mobile registration) */}
              {registrationMethod === 'mobile' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Number (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) =>
                        handleInputChange(
                          'whatsapp',
                          e.target.value.replace(/\D/g, '').slice(0, 10)
                        )
                      }
                      placeholder="9876543210 (for updates)"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Email (for email registration) */}
              {registrationMethod === 'email' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="student@example.com"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Create a strong password"
                        className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">I am a *</label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-center space-x-3 p-3 border rounded-xl cursor-pointer transition-all ${
                      formData.role === 'student'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={formData.role === 'student'}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="text-blue-600"
                    />
                    <GraduationCap className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Student</span>
                  </label>
                  <label
                    className={`flex items-center space-x-3 p-3 border rounded-xl cursor-pointer transition-all ${
                      formData.role === 'parent'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="parent"
                      checked={formData.role === 'parent'}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="text-blue-600"
                    />
                    <Users className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Parent</span>
                  </label>
                </div>
              </div>

              {/* Current Class (for students) */}
              {formData.role === 'student' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Class *
                  </label>
                  <select
                    value={formData.currentClass}
                    onChange={(e) => handleInputChange('currentClass', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="10th">Class 10th</option>
                    <option value="11th">Class 11th</option>
                    <option value="12th">Class 12th</option>
                    <option value="Dropper">Dropper (Gap Year)</option>
                  </select>
                </div>
              )}

              {/* Parent Mobile (for students) */}
              {formData.role === 'student' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent's Mobile Number (Optional)
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.parentMobile}
                      onChange={(e) =>
                        handleInputChange(
                          'parentMobile',
                          e.target.value.replace(/\D/g, '').slice(0, 10)
                        )
                      }
                      placeholder="9876543210"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {/* Referral Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Referral Code (Optional)
                </label>
                <input
                  type="text"
                  value={formData.referralCode}
                  onChange={(e) => handleInputChange('referralCode', e.target.value.toUpperCase())}
                  placeholder="Enter referral code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Consent Checkboxes */}
              <div className="space-y-2">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.marketingConsent}
                    onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
                    className="mt-1 text-blue-600"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to receive course updates and promotional content via SMS and email
                  </span>
                </label>
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.whatsappConsent}
                    onChange={(e) => handleInputChange('whatsappConsent', e.target.checked)}
                    className="mt-1 text-blue-600"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to receive study materials and updates via WhatsApp
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? registrationMethod === 'mobile'
                    ? 'Sending OTP...'
                    : 'Creating Account...'
                  : registrationMethod === 'mobile'
                    ? 'Send OTP'
                    : 'Create Account'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
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
            className="bg-white rounded-2xl shadow-xl p-6 mb-6"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Verify OTP</h2>
              <p className="text-gray-600">
                We've sent a 6-digit code to <br />
                <span className="font-medium">+91 {formData.mobile}</span>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg font-mono tracking-widest"
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
                {isSubmitting ? 'Creating Account...' : 'Verify & Create Account'}
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
                  onClick={() => setStep('details')}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  ← Back to details
                </button>
              </div>
            </form>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
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
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in here
            </Link>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            By creating an account, you agree to our{' '}
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
