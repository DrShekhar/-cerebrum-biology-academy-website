'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Clock,
  Users,
  GraduationCap,
  CalendarDays,
  ShieldCheck,
  MessageSquare,
  Phone,
  AlertTriangle,
  Star,
  Trophy,
  Flame,
  ArrowLeft,
  Loader2,
} from 'lucide-react'
import { PremiumCard, PremiumButton, AnimatedCounter } from '@/components/ui/PremiumDesignSystem'
import { EnrollmentProgress } from '@/components/ui/ProgressIndicators'
import { BiologyScoreDisplay } from '@/components/ui/BiologyScoreDisplay'
import { useFormValidation } from '@/hooks/useFormValidation'
import { addDays, format, startOfTomorrow } from 'date-fns'
import { razorpayService } from '@/lib/payments/razorpay'

// Razorpay types are declared in src/types/globals.d.ts

interface StreamlinedEnrollmentPageProps {
  onEnrollmentComplete?: (data: any) => void
  onWhatsAppContact?: () => void
  onCallNow?: () => void
}

interface AssessmentResult {
  currentScore: number
  targetScore: number
  improvement: number
  strengths: string[]
  weaknesses: string[]
  timeToTarget: string
}

interface CounselingSlot {
  date: string
  time: string
  mode: 'online' | 'offline' | 'home'
  available: boolean
  counselor: string
}

interface PlanOption {
  id: string
  name: string
  price: number
  emiPrice: number
  duration: string
  batchSize: number
  features: string[]
  recommended?: boolean
  discount?: number
}

export function StreamlinedEnrollmentPage({
  onEnrollmentComplete,
  onWhatsAppContact,
  onCallNow,
}: StreamlinedEnrollmentPageProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    previousScore: '',
    targetColleges: '',
    parentName: '',
    parentMobile: '',
  })
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<CounselingSlot | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<PlanOption | null>(null)
  const [urgencyTimer, setUrgencyTimer] = useState(86400) // 24 hours in seconds
  const [enrollmentStats, setEnrollmentStats] = useState({ thisMonth: 847, seatsLeft: 12 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Assessment form state
  const [assessmentAnswers, setAssessmentAnswers] = useState({
    currentScore: '' as string,
    challengingTopics: [] as string[],
    studyHours: '' as string,
  })

  // Form validation hook
  const { validationStates, validateField, formatPhone, capitalizeName } = useFormValidation()

  const steps = [
    { id: 0, title: 'Assessment', icon: GraduationCap, iconSolid: GraduationCap },
    { id: 1, title: 'Counseling', icon: Users, iconSolid: Users },
    { id: 2, title: 'Plan Selection', icon: CheckCircle2, iconSolid: CheckCircle2 },
    { id: 3, title: 'Enrollment', icon: Clock, iconSolid: Clock },
    { id: 4, title: 'Success', icon: Trophy, iconSolid: Trophy },
  ]

  // Mock assessment questions
  const assessmentQuestions = [
    {
      id: 1,
      question: 'What was your Biology score in the last NEET attempt?',
      type: 'number',
      placeholder: 'Enter score out of 360',
      required: true,
    },
    {
      id: 2,
      question: 'Which Biology topics do you find most challenging?',
      type: 'multiselect',
      options: [
        'Ecology',
        'Genetics',
        'Plant Physiology',
        'Human Physiology',
        'Molecular Biology',
        'Cell Biology',
      ],
    },
    {
      id: 3,
      question: 'How many hours do you currently study Biology daily?',
      type: 'select',
      options: ['Less than 2 hours', '2-4 hours', '4-6 hours', 'More than 6 hours'],
    },
  ]

  // Generate dynamic counseling slots for the next 7 days
  const counselingSlots: CounselingSlot[] = useMemo(() => {
    const counselors = [
      'Dr. Priya Sharma',
      'Dr. Raj Kumar',
      'Dr. Anjali Singh',
      'Dr. Vikram Patel',
    ]
    const timeSlots = ['10:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']
    const modes: ('online' | 'offline' | 'home')[] = ['online', 'offline', 'home', 'online']
    const slots: CounselingSlot[] = []

    const tomorrow = startOfTomorrow()

    for (let dayOffset = 0; dayOffset < 4; dayOffset++) {
      const date = addDays(tomorrow, dayOffset)
      const formattedDate = format(date, 'yyyy-MM-dd')
      const displayDate = format(date, 'EEEE, MMM d')

      slots.push({
        date: displayDate,
        time: timeSlots[dayOffset % timeSlots.length],
        mode: modes[dayOffset % modes.length],
        available: dayOffset !== 3, // Last slot shown as booked for urgency
        counselor: counselors[dayOffset % counselors.length],
      })
    }

    return slots
  }, [])

  // Plan options
  const planOptions: PlanOption[] = [
    {
      id: 'foundation',
      name: 'Foundation Plus',
      price: 42000,
      emiPrice: 3500,
      duration: '12 months',
      batchSize: 15,
      features: ['Live Classes', 'Study Material', 'Mock Tests', 'Doubt Clearing'],
      discount: 10,
    },
    {
      id: 'advanced',
      name: 'Advanced Achiever',
      price: 75000,
      emiPrice: 6250,
      duration: '12 months',
      batchSize: 12,
      features: [
        'All Foundation features',
        'Personal Mentor',
        'One-on-One Sessions',
        'Performance Analytics',
      ],
      recommended: true,
      discount: 15,
    },
    {
      id: 'elite',
      name: 'Elite Ranker',
      price: 125000,
      emiPrice: 10417,
      duration: '12 months',
      batchSize: 8,
      features: [
        'All Advanced features',
        'Home Visits',
        'Parent Counseling',
        'Guaranteed Admission',
      ],
      discount: 20,
    },
  ]

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setUrgencyTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Calculate assessment result based on user input
  const calculateAssessmentResult = (): AssessmentResult => {
    const score = parseInt(assessmentAnswers.currentScore) || 0
    const targetScore = 340 // Target for medical colleges
    const improvement = Math.max(0, targetScore - score)

    // All topics
    const allTopics = [
      'Ecology',
      'Genetics',
      'Plant Physiology',
      'Human Physiology',
      'Molecular Biology',
      'Cell Biology',
    ]

    // Weaknesses are the topics user selected as challenging
    const weaknesses =
      assessmentAnswers.challengingTopics.length > 0
        ? assessmentAnswers.challengingTopics.slice(0, 3)
        : ['Ecology', 'Plant Physiology']

    // Strengths are the remaining topics
    const strengths = allTopics.filter((t) => !weaknesses.includes(t)).slice(0, 2)

    // Calculate time to target based on current score and study hours
    let timeToTarget = '10-12 months'
    if (score >= 280) {
      timeToTarget = '4-6 months'
    } else if (score >= 220) {
      timeToTarget = '6-8 months'
    } else if (score >= 160) {
      timeToTarget = '8-10 months'
    }

    // Adjust based on study hours
    if (assessmentAnswers.studyHours === 'More than 6 hours') {
      timeToTarget = timeToTarget.replace(/(\d+)-(\d+)/, (_, min, max) => `${Math.max(3, parseInt(min) - 2)}-${parseInt(max) - 2}`)
    } else if (assessmentAnswers.studyHours === 'Less than 2 hours') {
      timeToTarget = timeToTarget.replace(/(\d+)-(\d+)/, (_, min, max) => `${parseInt(min) + 2}-${parseInt(max) + 2}`)
    }

    return {
      currentScore: score,
      targetScore,
      improvement,
      strengths,
      weaknesses,
      timeToTarget,
    }
  }

  const handleAssessmentSubmit = () => {
    // Validate assessment has at least score filled
    if (!assessmentAnswers.currentScore) {
      return // Could add validation error state here
    }

    const result = calculateAssessmentResult()
    setAssessmentResult(result)
    setCurrentStep(1)
  }

  // Navigate to previous step
  const handlePrevStep = () => {
    if (currentStep > 0 && currentStep < 4) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSlotSelection = (slot: CounselingSlot) => {
    setSelectedSlot(slot)
    setCurrentStep(2)
  }

  const handlePlanSelection = (plan: PlanOption) => {
    setSelectedPlan(plan)
    setCurrentStep(3)
  }

  const handleEnrollmentSubmit = async () => {
    if (!selectedPlan) return

    setIsSubmitting(true)
    setPaymentError(null)

    try {
      // Create order via Razorpay service
      const result = await razorpayService.processEnrollment({
        studentName: formData.fullName,
        email: formData.email,
        phone: formData.mobile.replace(/\D/g, ''),
        courseId: selectedPlan.id,
        courseName: selectedPlan.name,
        amount: selectedPlan.price,
        installmentPlan: 'full',
      })

      if (!result.success) {
        setPaymentError(result.error || 'Failed to create payment order')
        setIsSubmitting(false)
        return
      }

      // Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: result.amount,
        currency: result.currency || 'INR',
        name: 'Cerebrum Biology Academy',
        description: `${selectedPlan.name} - ${selectedPlan.duration}`,
        order_id: result.orderId,
        handler: async function (response: any) {
          // Verify payment
          const verified = await razorpayService.verifyPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          )

          if (verified) {
            setCurrentStep(4)
            onEnrollmentComplete?.({
              assessment: assessmentResult,
              counseling: selectedSlot,
              plan: selectedPlan,
              formData,
              payment: {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
              },
            })
          } else {
            setPaymentError('Payment verification failed. Please contact support.')
          }
          setIsSubmitting(false)
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile.replace(/\D/g, ''),
        },
        notes: {
          course: selectedPlan.name,
          parentName: formData.parentName,
          parentPhone: formData.parentMobile.replace(/\D/g, ''),
        },
        theme: {
          color: '#4f46e5', // Indigo to match branding
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on('payment.failed', function (response: any) {
        setPaymentError(response.error.description || 'Payment failed. Please try again.')
        setIsSubmitting(false)
      })
      razorpay.open()
    } catch (error) {
      console.error('Enrollment error:', error)
      setPaymentError('An unexpected error occurred. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Progress Indicator */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-indigo-600">Secure Your NEET Success</h1>
              <p className="text-gray-600 mt-2">Join 1,50,000+ students who enrolled this month</p>
            </div>

            {/* Urgency Timer */}
            <div className="bg-red-100 border border-red-200 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-red-600 mb-2">
                <Flame className="w-5 h-5" />
                <span className="text-sm font-medium">Early Bird Discount Ends In:</span>
              </div>
              <div className="text-2xl font-bold text-red-700">{formatTime(urgencyTimer)}</div>
            </div>
          </div>

          {/* Enhanced Progress Steps */}
          <EnrollmentProgress
            currentStep={
              currentStep === 0
                ? 'personal'
                : currentStep === 1
                  ? 'course'
                  : currentStep === 2
                    ? 'payment'
                    : 'confirmation'
            }
            completedSteps={Array.from({ length: currentStep }, (_, i) =>
              i === 0 ? 'personal' : i === 1 ? 'course' : i === 2 ? 'payment' : 'confirmation'
            )}
            className="px-4"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Step 0: Free Assessment */}
          {currentStep === 0 && (
            <motion.div
              key="assessment"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-3xl mx-auto"
            >
              <PremiumCard variant="luxury" size="lg">
                <div className="text-center mb-8">
                  <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Free NEET Biology Assessment
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Discover your current level and get a personalized improvement roadmap
                  </p>
                </div>

                <div className="space-y-6 mb-8">
                  {/* Question 1: Biology Score */}
                  <div className="space-y-3">
                    <label htmlFor="current-score" className="block text-lg font-medium text-gray-900">
                      1. {assessmentQuestions[0].question} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="current-score"
                      type="number"
                      min="0"
                      max="360"
                      placeholder={assessmentQuestions[0].placeholder}
                      value={assessmentAnswers.currentScore}
                      onChange={(e) =>
                        setAssessmentAnswers((prev) => ({
                          ...prev,
                          currentScore: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      aria-required="true"
                      aria-describedby={!assessmentAnswers.currentScore ? 'score-hint' : undefined}
                    />
                    {!assessmentAnswers.currentScore && (
                      <p id="score-hint" className="text-sm text-gray-500">
                        Enter your NEET Biology score (out of 360)
                      </p>
                    )}
                  </div>

                  {/* Question 2: Challenging Topics */}
                  <div className="space-y-3">
                    <label className="block text-lg font-medium text-gray-900">
                      2. {assessmentQuestions[1].question}
                    </label>
                    <div className="grid grid-cols-2 gap-3" role="group" aria-label="Select challenging topics">
                      {assessmentQuestions[1].options?.map((option, idx) => (
                        <label key={idx} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={assessmentAnswers.challengingTopics.includes(option)}
                            onChange={(e) => {
                              setAssessmentAnswers((prev) => ({
                                ...prev,
                                challengingTopics: e.target.checked
                                  ? [...prev.challengingTopics, option]
                                  : prev.challengingTopics.filter((t) => t !== option),
                              }))
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Question 3: Study Hours */}
                  <div className="space-y-3">
                    <label htmlFor="study-hours" className="block text-lg font-medium text-gray-900">
                      3. {assessmentQuestions[2].question}
                    </label>
                    <select
                      id="study-hours"
                      value={assessmentAnswers.studyHours}
                      onChange={(e) =>
                        setAssessmentAnswers((prev) => ({
                          ...prev,
                          studyHours: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select an option</option>
                      {assessmentQuestions[2].options?.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="text-center">
                  <PremiumButton
                    onClick={handleAssessmentSubmit}
                    variant="medical"
                    size="lg"
                    className="px-12 py-4"
                  >
                    Start Free Assessment (30 min)
                  </PremiumButton>
                  <p className="text-sm text-gray-500 mt-3">
                    ✓ Completely Free ✓ Instant Results ✓ No Hidden Charges
                  </p>
                </div>
              </PremiumCard>
            </motion.div>
          )}

          {/* Step 1: Counseling Session */}
          {currentStep === 1 && (
            <motion.div
              key="counseling"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-4xl mx-auto"
            >
              {/* Assessment Results */}
              {assessmentResult && (
                <PremiumCard variant="premium" size="lg" className="mb-8">
                  <div className="text-center mb-6">
                    <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Your Assessment Results</h3>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">
                        <BiologyScoreDisplay
                          currentScore={assessmentResult.currentScore}
                          maxScore={360}
                          showLabel={false}
                          showPercentage={false}
                          size="lg"
                          className="[&_.text-blue-600]:text-red-600"
                        />
                      </div>
                      <div className="text-gray-600">Current Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">
                        <BiologyScoreDisplay
                          currentScore={assessmentResult.targetScore}
                          maxScore={360}
                          showLabel={false}
                          showPercentage={false}
                          size="lg"
                          className="[&_.text-blue-600]:text-green-600"
                        />
                      </div>
                      <div className="text-gray-600">Target Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        +{assessmentResult.improvement}
                      </div>
                      <div className="text-gray-600">Improvement Needed</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-blue-800 font-medium">
                      🎯 With our personalized coaching, you can achieve your target score in{' '}
                      {assessmentResult.timeToTarget}
                    </p>
                  </div>
                </PremiumCard>
              )}

              <PremiumCard variant="luxury" size="lg">
                <div className="text-center mb-8">
                  <Users className="w-12 h-12 sm:w-16 sm:h-16 text-purple-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Book Your Counseling Session
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Get personalized guidance from our expert counselors
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {counselingSlots.map((slot, index) => (
                    <motion.div
                      key={index}
                      className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                        slot.available
                          ? 'border-gray-200 hover:border-blue-500 hover:shadow-lg'
                          : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                      }`}
                      whileHover={slot.available ? { scale: 1.02 } : {}}
                      onClick={() => slot.available && handleSlotSelection(slot)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <CalendarDays className="w-6 h-6 text-blue-500" />
                          <div>
                            <div className="font-semibold text-gray-900">{slot.date}</div>
                            <div className="text-gray-600">{slot.time}</div>
                          </div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            slot.mode === 'online'
                              ? 'bg-green-100 text-green-800'
                              : slot.mode === 'offline'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {slot.mode === 'online'
                            ? '🌐 Online'
                            : slot.mode === 'offline'
                              ? '🏢 Offline'
                              : '🏠 Home Visit'}
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 mb-3">Counselor: {slot.counselor}</div>

                      {slot.available ? (
                        <div className="text-green-600 font-medium text-sm">✓ Available</div>
                      ) : (
                        <div className="text-red-600 font-medium text-sm">✗ Fully Booked</div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-gray-600 mb-4">Can't find a suitable slot?</p>
                  <div className="flex justify-center space-x-4">
                    <PremiumButton onClick={onWhatsAppContact} variant="secondary" size="md">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      WhatsApp Us
                    </PremiumButton>
                    <PremiumButton onClick={onCallNow} variant="medical" size="md">
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </PremiumButton>
                  </div>
                </div>

                {/* Back Button */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={handlePrevStep}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                    type="button"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Assessment
                  </button>
                </div>
              </PremiumCard>
            </motion.div>
          )}

          {/* Step 2: Plan Selection */}
          {currentStep === 2 && (
            <motion.div
              key="plan-selection"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-8">
                <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Success Plan</h2>
                <p className="text-gray-600 text-lg">
                  Customized plans based on your assessment results
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {planOptions.map((plan) => (
                  <motion.div
                    key={plan.id}
                    className={`relative border-2 rounded-2xl p-6 cursor-pointer transition-all ${
                      plan.recommended
                        ? 'border-purple-500 shadow-2xl bg-indigo-50'
                        : 'border-gray-200 hover:border-blue-500 hover:shadow-lg'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handlePlanSelection(plan)}
                  >
                    {plan.recommended && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                          ⭐ Most Popular
                        </div>
                      </div>
                    )}

                    {plan.discount && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {plan.discount}% OFF
                        </div>
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        ₹{plan.price.toLocaleString()}
                      </div>
                      <div className="text-gray-600">
                        or ₹{plan.emiPrice.toLocaleString()}/month
                      </div>
                      <div className="text-sm text-gray-500 mt-2">
                        {plan.duration} • Batch of {plan.batchSize}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <PremiumButton
                      variant={plan.recommended ? 'luxury' : 'primary'}
                      size="md"
                      className="w-full"
                    >
                      Select {plan.name}
                    </PremiumButton>
                  </motion.div>
                ))}
              </div>

              {/* Urgency Elements */}
              <div className="grid md:grid-cols-2 gap-6">
                <PremiumCard variant="hover" className="bg-red-50 border-red-200">
                  <div className="flex items-center space-x-4">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                    <div>
                      <div className="font-bold text-red-800">
                        Only {enrollmentStats.seatsLeft} seats left!
                      </div>
                      <div className="text-red-600 text-sm">
                        In next batch starting {format(addDays(new Date(), 14), 'MMMM do')}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 bg-red-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${((50 - enrollmentStats.seatsLeft) / 50) * 100}%` }}
                    />
                  </div>
                </PremiumCard>

                <PremiumCard variant="hover" className="bg-green-50 border-green-200">
                  <div className="flex items-center space-x-4">
                    <Users className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="font-bold text-green-800">
                        <AnimatedCounter value={enrollmentStats.thisMonth} /> students enrolled
                      </div>
                      <div className="text-green-600 text-sm">This month alone</div>
                    </div>
                  </div>
                </PremiumCard>
              </div>

              {/* Back Button */}
              <div className="mt-6">
                <button
                  onClick={handlePrevStep}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                  type="button"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Counseling
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Enrollment Form */}
          {currentStep === 3 && (
            <motion.div
              key="enrollment"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-4xl mx-auto"
            >
              <PremiumCard variant="luxury" size="lg">
                <div className="text-center mb-8">
                  <Clock className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Complete Your Enrollment
                  </h2>
                  <p className="text-gray-600 text-lg">
                    You're just one step away from your NEET success journey
                  </p>
                </div>

                {/* Payment Error Alert */}
                {paymentError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3" role="alert">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-800 font-medium">Payment Error</p>
                      <p className="text-red-700 text-sm">{paymentError}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPaymentError(null)}
                      className="ml-auto text-red-500 hover:text-red-700"
                      aria-label="Dismiss error"
                    >
                      ×
                    </button>
                  </div>
                )}

                {/* Selected Plan Summary */}
                {selectedPlan && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-bold text-blue-900">{selectedPlan.name}</h3>
                        <p className="text-blue-700">
                          Duration: {selectedPlan.duration} • Batch Size: {selectedPlan.batchSize}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-900">
                          ₹{selectedPlan.price.toLocaleString()}
                        </div>
                        <div className="text-blue-700">
                          or ₹{selectedPlan.emiPrice.toLocaleString()}/month
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Enrollment Form */}
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        onBlur={(e) => {
                          const capitalized = capitalizeName(e.target.value)
                          setFormData({ ...formData, fullName: capitalized })
                          validateField('fullName', capitalized, 'name')
                        }}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          validationStates.fullName?.error
                            ? 'border-red-300 bg-red-50'
                            : validationStates.fullName?.isValid
                              ? 'border-green-300 bg-green-50'
                              : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                        aria-required="true"
                        aria-invalid={!!validationStates.fullName?.error}
                        aria-describedby={validationStates.fullName?.error ? 'fullName-error' : undefined}
                      />
                      {validationStates.fullName?.error && (
                        <p id="fullName-error" className="mt-1 text-xs text-red-600">
                          {validationStates.fullName.error}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => {
                          const formatted = formatPhone(e.target.value)
                          setFormData({ ...formData, mobile: formatted })
                        }}
                        onBlur={() => validateField('mobile', formData.mobile, 'phone')}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          validationStates.mobile?.error
                            ? 'border-red-300 bg-red-50'
                            : validationStates.mobile?.isValid
                              ? 'border-green-300 bg-green-50'
                              : 'border-gray-300'
                        }`}
                        placeholder="Enter mobile number"
                        aria-required="true"
                        aria-invalid={!!validationStates.mobile?.error}
                        aria-describedby={validationStates.mobile?.error ? 'mobile-error' : undefined}
                      />
                      {validationStates.mobile?.error && (
                        <p id="mobile-error" className="mt-1 text-xs text-red-600">
                          {validationStates.mobile.error}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onBlur={() => validateField('email', formData.email, 'email')}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          validationStates.email?.error
                            ? 'border-red-300 bg-red-50'
                            : validationStates.email?.isValid
                              ? 'border-green-300 bg-green-50'
                              : 'border-gray-300'
                        }`}
                        placeholder="Enter email address"
                        aria-required="true"
                        aria-invalid={!!validationStates.email?.error}
                        aria-describedby={
                          validationStates.email?.error
                            ? 'email-error'
                            : validationStates.email?.suggestion
                              ? 'email-suggestion'
                              : undefined
                        }
                      />
                      {validationStates.email?.error && (
                        <p id="email-error" className="mt-1 text-xs text-red-600">
                          {validationStates.email.error}
                        </p>
                      )}
                      {validationStates.email?.suggestion && (
                        <p id="email-suggestion" className="mt-1 text-xs text-amber-600">
                          Did you mean{' '}
                          <button
                            type="button"
                            className="underline font-medium"
                            onClick={() => {
                              setFormData({ ...formData, email: validationStates.email?.suggestion || '' })
                              validateField('email', validationStates.email?.suggestion || '', 'email')
                            }}
                          >
                            {validationStates.email.suggestion}
                          </button>
                          ?
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="previousScore" className="block text-sm font-medium text-gray-700 mb-2">
                        Previous NEET Score
                      </label>
                      <input
                        id="previousScore"
                        type="number"
                        min="0"
                        max="720"
                        value={formData.previousScore}
                        onChange={(e) => setFormData({ ...formData, previousScore: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter previous NEET score"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="targetColleges" className="block text-sm font-medium text-gray-700 mb-2">
                      Target Medical Colleges
                    </label>
                    <textarea
                      id="targetColleges"
                      value={formData.targetColleges}
                      onChange={(e) => setFormData({ ...formData, targetColleges: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="List your target medical colleges"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-2">
                        Parent/Guardian Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="parentName"
                        type="text"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        onBlur={(e) => {
                          const capitalized = capitalizeName(e.target.value)
                          setFormData({ ...formData, parentName: capitalized })
                          validateField('parentName', capitalized, 'name')
                        }}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          validationStates.parentName?.error
                            ? 'border-red-300 bg-red-50'
                            : validationStates.parentName?.isValid
                              ? 'border-green-300 bg-green-50'
                              : 'border-gray-300'
                        }`}
                        placeholder="Enter parent/guardian name"
                        aria-required="true"
                        aria-invalid={!!validationStates.parentName?.error}
                        aria-describedby={validationStates.parentName?.error ? 'parentName-error' : undefined}
                      />
                      {validationStates.parentName?.error && (
                        <p id="parentName-error" className="mt-1 text-xs text-red-600">
                          {validationStates.parentName.error}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="parentMobile" className="block text-sm font-medium text-gray-700 mb-2">
                        Parent Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="parentMobile"
                        type="tel"
                        value={formData.parentMobile}
                        onChange={(e) => {
                          const formatted = formatPhone(e.target.value)
                          setFormData({ ...formData, parentMobile: formatted })
                        }}
                        onBlur={() => validateField('parentMobile', formData.parentMobile, 'phone')}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          validationStates.parentMobile?.error
                            ? 'border-red-300 bg-red-50'
                            : validationStates.parentMobile?.isValid
                              ? 'border-green-300 bg-green-50'
                              : 'border-gray-300'
                        }`}
                        placeholder="Enter parent mobile number"
                        aria-required="true"
                        aria-invalid={!!validationStates.parentMobile?.error}
                        aria-describedby={validationStates.parentMobile?.error ? 'parentMobile-error' : undefined}
                      />
                      {validationStates.parentMobile?.error && (
                        <p id="parentMobile-error" className="mt-1 text-xs text-red-600">
                          {validationStates.parentMobile.error}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Payment Options */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-yellow-800 mb-4">
                      🎯 Instant Enrollment Benefits
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-yellow-800">10% Instant Discount</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-yellow-800">0% EMI for 12 months</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-yellow-800">7-day money-back guarantee</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <span className="text-yellow-800">Free study material kit</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={handlePrevStep}
                      className="flex items-center text-gray-600 hover:text-gray-900 transition-colors order-2 sm:order-1"
                      type="button"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Plan Selection
                    </button>

                    <PremiumButton
                      onClick={handleEnrollmentSubmit}
                      variant="medical"
                      size="lg"
                      className="px-12 py-4 order-1 sm:order-2"
                      disabled={
                        isSubmitting ||
                        !formData.fullName ||
                        !formData.mobile ||
                        !formData.email ||
                        !formData.parentName ||
                        !formData.parentMobile ||
                        !!validationStates.fullName?.error ||
                        !!validationStates.mobile?.error ||
                        !!validationStates.email?.error ||
                        !!validationStates.parentName?.error ||
                        !!validationStates.parentMobile?.error
                      }
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-6 h-6 mr-3" />
                          Secure Enrollment & Payment
                        </>
                      )}
                    </PremiumButton>
                  </div>
                  <p className="text-sm text-gray-500 mt-3 text-center">
                    🔒 SSL Secured • 💳 RazorPay Protected • 📞 24/7 Support
                  </p>
                </form>
              </PremiumCard>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {currentStep === 4 && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl mx-auto text-center"
            >
              <PremiumCard variant="luxury" size="xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                >
                  <Trophy className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-yellow-500 mx-auto mb-6" />
                </motion.div>

                <h2 className="text-4xl font-bold text-gray-900 mb-4">🎉 Enrollment Successful!</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Welcome to Cerebrum Biology Academy family! Your NEET success journey starts now.
                </p>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-bold text-green-800 mb-4">What happens next?</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-green-800">
                        Enrollment confirmation SMS & email sent
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-green-800">Counselor will call within 2 hours</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-green-800">Study material kit dispatch initiated</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-green-800">Access to student portal activated</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <PremiumButton onClick={onWhatsAppContact} variant="secondary" size="lg">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Join WhatsApp Group
                  </PremiumButton>
                  <PremiumButton
                    onClick={() => (window.location.href = '/student/dashboard')}
                    variant="medical"
                    size="lg"
                  >
                    Access Student Portal
                  </PremiumButton>
                </div>
              </PremiumCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed Bottom Trust Elements & Support */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700">2,847 enrolled this month</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-700">4.9/5 rating</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <PremiumButton onClick={onWhatsAppContact} variant="secondary" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              WhatsApp
            </PremiumButton>
            <PremiumButton onClick={onCallNow} variant="medical" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </PremiumButton>
          </div>
        </div>
      </div>

      {/* Mobile-only padding for fixed bottom bar */}
      <div className="h-20 md:hidden" />
    </div>
  )
}
