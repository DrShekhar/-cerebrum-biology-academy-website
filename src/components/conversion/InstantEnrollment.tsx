'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PremiumButton, PremiumCard, AnimatedCounter } from '@/components/ui/PremiumDesignSystem'
import {
  CreditCard,
  ShieldCheck,
  Clock,
  Phone,
  CheckCircle2,
  X,
  UserIcon,
  Mail,
  Heart,
} from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

interface QuizResult {
  studentType: 'foundation' | 'class11' | 'class12' | 'dropper'
  currentScore: number
  targetScore: number
  timeframe: string
  confidence: number
  recommendedCourse: string
  pricing: number
}

interface InstantEnrollmentProps {
  quizResult: QuizResult
  onClose?: () => void
  onSuccess?: (enrollmentData: any) => void
  className?: string
}

interface FormData {
  name: string
  email: string
  phone: string
  state: string
  agreeTerms: boolean
}

export function InstantEnrollment({
  quizResult,
  onClose,
  onSuccess,
  className = '',
}: InstantEnrollmentProps) {
  const [currentStep, setCurrentStep] = useState<'form' | 'payment' | 'success'>('form')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    state: '',
    agreeTerms: false,
  })
  const [loading, setLoading] = useState(false)
  const [urgencyTimer, setUrgencyTimer] = useState(15 * 60) // 15 minutes
  const [seatsLeft, setSeatsLeft] = useState(7)

  // Urgency countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setUrgencyTimer((prev) => {
        if (prev <= 0) return 0
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Simulate live seat booking
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8 && seatsLeft > 3) {
        setSeatsLeft((prev) => prev - 1)
      }
    }, 45000) // Every 45 seconds
    return () => clearInterval(interval)
  }, [seatsLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const calculateDiscount = () => {
    const basePrice = quizResult.pricing
    const discountPercent = Math.min(40, 15 + (quizResult.confidence - 70) * 0.5)
    const discountAmount = Math.round(basePrice * (discountPercent / 100))
    return {
      original: basePrice,
      discount: discountAmount,
      final: basePrice - discountAmount,
      percent: Math.round(discountPercent),
    }
  }

  const pricing = calculateDiscount()

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreeTerms) {
      alert('Please agree to the terms and conditions')
      return
    }

    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setCurrentStep('payment')
    setLoading(false)
  }

  const handlePayment = async () => {
    setLoading(true)

    try {
      // Integrate with Razorpay here
      const enrollmentData = {
        ...formData,
        quizResult,
        pricing,
        enrollmentId: `ENR_${Date.now()}`,
        timestamp: new Date().toISOString(),
      }

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setCurrentStep('success')
      onSuccess?.(enrollmentData)
    } catch (error) {
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsAppSupport = async () => {
    const message = `Hi! I'm interested in enrolling for ${quizResult.recommendedCourse}. Can you help me with the process?`
    await trackAndOpenWhatsApp({
      source: 'instant-enrollment-support',
      message,
      campaign: 'enrollment-support',
    })
  }

  if (currentStep === 'form') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${className}`}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-indigo-500 text-white p-6 rounded-t-2xl relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Secure Your Seat Now!</h2>
              <p className="text-blue-100">
                Complete enrollment for {quizResult.recommendedCourse}
              </p>

              {/* Urgency Timer */}
              <div className="bg-white/20 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-300" />
                  <span className="font-semibold">Limited Time Offer Expires In:</span>
                </div>
                <div className="text-xl font-bold text-orange-300">{formatTime(urgencyTimer)}</div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Seats Left Alert */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3"
            >
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <div>
                <div className="font-semibold text-red-800">
                  Only {seatsLeft} seats left in this batch!
                </div>
                <div className="text-sm text-red-600">3 students enrolled in the last hour</div>
              </div>
            </motion.div>

            {/* Pricing Display */}
            <PremiumCard
              variant="luxury"
              className="bg-green-50 border-green-200"
            >
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold text-gray-900">
                      {quizResult.recommendedCourse}
                    </div>
                    <div className="text-sm text-gray-600">Your personalized course selection</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 line-through">
                      ₹{pricing.original.toLocaleString()}
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      ₹{pricing.final.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">
                      Save ₹{pricing.discount.toLocaleString()} ({pricing.percent}% OFF)
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-green-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{quizResult.confidence}%</div>
                    <div className="text-xs text-gray-500">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{quizResult.timeframe}</div>
                    <div className="text-xs text-gray-500">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">1:10</div>
                    <div className="text-xs text-gray-500">Student:Teacher</div>
                  </div>
                </div>
              </div>
            </PremiumCard>

            {/* Enrollment Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+91 88264 44334"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select your state</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, agreeTerms: e.target.checked }))
                  }
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    Terms & Conditions
                  </a>{' '}
                  and
                  <a href="/privacy" className="text-blue-600 hover:underline ml-1">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 text-lg rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Proceed to Payment - ₹{pricing.final.toLocaleString()}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSupport}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  💬 Need Help? Chat on WhatsApp
                </button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                100% Secure Payment
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-red-500" />
                100% Refund Guarantee
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                5000+ Happy Students
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  if (currentStep === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${className}`}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-2xl max-w-lg w-full"
        >
          <div className="p-8 text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">🎉 Enrollment Successful!</h2>
              <p className="text-gray-600">
                Welcome to {quizResult.recommendedCourse}! Your journey to NEET success starts now.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <div className="font-semibold text-blue-900">What happens next?</div>
              <div className="text-sm text-blue-700 space-y-1">
                <div>✅ Course materials will be sent to your email</div>
                <div>✅ Personal counselor will call you within 2 hours</div>
                <div>✅ WhatsApp group access for doubt clearing</div>
                <div>✅ First class starts tomorrow</div>
              </div>
            </div>

            <PremiumButton
              variant="medical"
              size="lg"
              onClick={onClose}
              className="w-full bg-green-600 hover:from-green-700 hover:to-green-700 text-white"
            >
              Continue to Dashboard
            </PremiumButton>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return null
}
