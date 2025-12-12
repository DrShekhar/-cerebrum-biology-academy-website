'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  CalendarDaysIcon,
  CurrencyRupeeIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  ExclamationTriangleIcon,
  StarIcon,
  TrophyIcon,
  FireIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import {
  CheckCircleIcon as CheckCircleSolid,
  ClockIcon as ClockSolid,
  UserGroupIcon as UserGroupSolid,
  AcademicCapIcon as AcademicCapSolid,
  ShieldCheckIcon as ShieldCheckSolid,
} from '@heroicons/react/24/solid'
import { PremiumCard, PremiumButton, AnimatedCounter } from '@/components/ui/PremiumDesignSystem'
import { EnrollmentProgress } from '@/components/ui/ProgressIndicators'
import { BiologyScoreDisplay } from '@/components/ui/BiologyScoreDisplay'

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
  const [formData, setFormData] = useState<any>({})
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<CounselingSlot | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<PlanOption | null>(null)
  const [urgencyTimer, setUrgencyTimer] = useState(86400) // 24 hours in seconds
  const [enrollmentStats, setEnrollmentStats] = useState({ thisMonth: 2847, seatsLeft: 12 })

  const steps = [
    { id: 0, title: 'Assessment', icon: AcademicCapIcon, iconSolid: AcademicCapSolid },
    { id: 1, title: 'Counseling', icon: UserGroupIcon, iconSolid: UserGroupSolid },
    { id: 2, title: 'Plan Selection', icon: CheckCircleIcon, iconSolid: CheckCircleSolid },
    { id: 3, title: 'Enrollment', icon: ClockIcon, iconSolid: ClockSolid },
    { id: 4, title: 'Success', icon: TrophyIcon, iconSolid: TrophyIcon },
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

  // Mock counseling slots
  const counselingSlots: CounselingSlot[] = [
    {
      date: '2024-12-20',
      time: '10:00 AM',
      mode: 'online',
      available: true,
      counselor: 'Dr. Priya Sharma',
    },
    {
      date: '2024-12-20',
      time: '2:00 PM',
      mode: 'offline',
      available: true,
      counselor: 'Dr. Raj Kumar',
    },
    {
      date: '2024-12-21',
      time: '11:00 AM',
      mode: 'home',
      available: true,
      counselor: 'Dr. Anjali Singh',
    },
    {
      date: '2024-12-21',
      time: '4:00 PM',
      mode: 'online',
      available: false,
      counselor: 'Dr. Priya Sharma',
    },
  ]

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

  const handleAssessmentSubmit = () => {
    // Mock assessment result calculation
    const mockResult: AssessmentResult = {
      currentScore: 180,
      targetScore: 340,
      improvement: 160,
      strengths: ['Cell Biology', 'Genetics'],
      weaknesses: ['Ecology', 'Plant Physiology'],
      timeToTarget: '8-10 months',
    }
    setAssessmentResult(mockResult)
    setCurrentStep(1)
  }

  const handleSlotSelection = (slot: CounselingSlot) => {
    setSelectedSlot(slot)
    setCurrentStep(2)
  }

  const handlePlanSelection = (plan: PlanOption) => {
    setSelectedPlan(plan)
    setCurrentStep(3)
  }

  const handleEnrollmentSubmit = () => {
    setCurrentStep(4)
    onEnrollmentComplete?.({
      assessment: assessmentResult,
      counseling: selectedSlot,
      plan: selectedPlan,
      formData,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header with Progress Indicator */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Secure Your NEET Success
              </h1>
              <p className="text-gray-600 mt-2">Join 2,847 students who enrolled this month</p>
            </div>

            {/* Urgency Timer */}
            <div className="bg-red-100 border border-red-200 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-red-600 mb-2">
                <FireIcon className="w-5 h-5" />
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
                  <AcademicCapSolid className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Free NEET Biology Assessment
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Discover your current level and get a personalized improvement roadmap
                  </p>
                </div>

                <div className="space-y-6 mb-8">
                  {assessmentQuestions.map((question, index) => (
                    <div key={question.id} className="space-y-3">
                      <label className="block text-lg font-medium text-gray-900">
                        {index + 1}. {question.question}
                      </label>

                      {question.type === 'number' && (
                        <input
                          type="number"
                          placeholder={question.placeholder}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required={question.required}
                        />
                      )}

                      {question.type === 'select' && (
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option value="">Select an option</option>
                          {question.options?.map((option, idx) => (
                            <option key={idx} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}

                      {question.type === 'multiselect' && (
                        <div className="grid grid-cols-2 gap-3">
                          {question.options?.map((option, idx) => (
                            <label key={idx} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
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
                    <TrophyIcon className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500 mx-auto mb-3" />
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
                  <UserGroupSolid className="w-12 h-12 sm:w-16 sm:h-16 text-purple-500 mx-auto mb-4" />
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
                          <CalendarDaysIcon className="w-6 h-6 text-blue-500" />
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
                      <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                      WhatsApp Us
                    </PremiumButton>
                    <PremiumButton onClick={onCallNow} variant="medical" size="md">
                      <PhoneIcon className="w-5 h-5 mr-2" />
                      Call Now
                    </PremiumButton>
                  </div>
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
                <CheckCircleSolid className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4" />
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
                        ? 'border-purple-500 shadow-2xl bg-gradient-to-br from-purple-50 to-blue-50'
                        : 'border-gray-200 hover:border-blue-500 hover:shadow-lg'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handlePlanSelection(plan)}
                  >
                    {plan.recommended && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
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
                          <CheckCircleSolid className="w-5 h-5 text-green-500" />
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
                    <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
                    <div>
                      <div className="font-bold text-red-800">
                        Only {enrollmentStats.seatsLeft} seats left!
                      </div>
                      <div className="text-red-600 text-sm">
                        In next batch starting January 15th
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
                    <UsersIcon className="w-8 h-8 text-green-500" />
                    <div>
                      <div className="font-bold text-green-800">
                        <AnimatedCounter value={enrollmentStats.thisMonth} /> students enrolled
                      </div>
                      <div className="text-green-600 text-sm">This month alone</div>
                    </div>
                  </div>
                </PremiumCard>
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
                  <ClockSolid className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Complete Your Enrollment
                  </h2>
                  <p className="text-gray-600 text-lg">
                    You're just one step away from your NEET success journey
                  </p>
                </div>

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
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter mobile number"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Previous NEET Score
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter previous NEET score"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Medical Colleges
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="List your target medical colleges"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parent/Guardian Name *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter parent/guardian name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parent Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter parent mobile number"
                      />
                    </div>
                  </div>

                  {/* Payment Options */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-yellow-800 mb-4">
                      🎯 Instant Enrollment Benefits
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircleSolid className="w-5 h-5 text-green-500" />
                        <span className="text-yellow-800">10% Instant Discount</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircleSolid className="w-5 h-5 text-green-500" />
                        <span className="text-yellow-800">0% EMI for 12 months</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircleSolid className="w-5 h-5 text-green-500" />
                        <span className="text-yellow-800">7-day money-back guarantee</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircleSolid className="w-5 h-5 text-green-500" />
                        <span className="text-yellow-800">Free study material kit</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <PremiumButton
                      onClick={handleEnrollmentSubmit}
                      variant="medical"
                      size="lg"
                      className="px-12 py-4"
                    >
                      <ShieldCheckIcon className="w-6 h-6 mr-3" />
                      Secure Enrollment & Payment
                    </PremiumButton>
                    <p className="text-sm text-gray-500 mt-3">
                      🔒 SSL Secured • 💳 RazorPay Protected • 📞 24/7 Support
                    </p>
                  </div>
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
                  <TrophyIcon className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-yellow-500 mx-auto mb-6" />
                </motion.div>

                <h2 className="text-4xl font-bold text-gray-900 mb-4">🎉 Enrollment Successful!</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Welcome to Cerebrum Biology Academy family! Your NEET success journey starts now.
                </p>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-bold text-green-800 mb-4">What happens next?</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      <CheckCircleSolid className="w-5 h-5 text-green-500" />
                      <span className="text-green-800">
                        Enrollment confirmation SMS & email sent
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircleSolid className="w-5 h-5 text-green-500" />
                      <span className="text-green-800">Counselor will call within 2 hours</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircleSolid className="w-5 h-5 text-green-500" />
                      <span className="text-green-800">Study material kit dispatch initiated</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircleSolid className="w-5 h-5 text-green-500" />
                      <span className="text-green-800">Access to student portal activated</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <PremiumButton onClick={onWhatsAppContact} variant="secondary" size="lg">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
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
              <ShieldCheckSolid className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <UsersIcon className="w-5 h-5 text-blue-500" />
              <span className="text-gray-700">2,847 enrolled this month</span>
            </div>
            <div className="flex items-center space-x-2">
              <StarIcon className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-700">4.9/5 rating</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <PremiumButton onClick={onWhatsAppContact} variant="secondary" size="sm">
              <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" />
              WhatsApp
            </PremiumButton>
            <PremiumButton onClick={onCallNow} variant="medical" size="sm">
              <PhoneIcon className="w-4 h-4 mr-2" />
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
