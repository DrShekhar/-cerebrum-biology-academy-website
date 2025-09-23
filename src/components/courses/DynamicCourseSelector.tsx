'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  ChevronLeft,
  Star,
  Users,
  Clock,
  Target,
  Award,
  TrendingUp,
  BookOpen,
  CheckCircle,
  Zap,
  Crown,
  Gift,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

// Types
interface ClassLevel {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  gradient: string
  textColor: string
}

interface CourseSeries {
  id: string
  name: string
  description: string
  studentCount: number
  features: string[]
  pricing: {
    planA: number
    planB_NEET?: number
    planB_Academy?: number
  }
  color: {
    primary: string
    secondary: string
    gradient: string
  }
  badge?: string
  popular?: boolean
}

interface TestSeries {
  id: string
  name: string
  type: 'regular' | 'final-sprint'
  price: number
  description: string
  features: string[]
}

interface SelectedCourse {
  classLevel: string
  series: string
  plan: string
  testSeries: TestSeries[]
  intensiveUpgrade?: boolean
}

// Data
const CLASS_LEVELS: ClassLevel[] = [
  {
    id: 'ix',
    name: 'Class IX',
    description: 'Foundation Building Phase',
    icon: <BookOpen className="h-8 w-8" />,
    gradient: 'from-blue-500 to-cyan-500',
    textColor: 'text-blue-600',
  },
  {
    id: 'x',
    name: 'Class X',
    description: 'Board Preparation',
    icon: <Target className="h-8 w-8" />,
    gradient: 'from-green-500 to-emerald-500',
    textColor: 'text-green-600',
  },
  {
    id: 'xi',
    name: 'Class XI',
    description: 'NEET Foundation',
    icon: <TrendingUp className="h-8 w-8" />,
    gradient: 'from-purple-500 to-violet-500',
    textColor: 'text-purple-600',
  },
  {
    id: 'xii',
    name: 'Class XII',
    description: 'NEET Final Preparation',
    icon: <Award className="h-8 w-8" />,
    gradient: 'from-orange-500 to-red-500',
    textColor: 'text-orange-600',
  },
  {
    id: 'dropper',
    name: 'Dropper',
    description: 'Complete NEET Mastery',
    icon: <Crown className="h-8 w-8" />,
    gradient: 'from-yellow-500 to-amber-500',
    textColor: 'text-yellow-600',
  },
]

const COURSE_SERIES: Record<string, CourseSeries[]> = {
  ix: [
    {
      id: 'pinnacle',
      name: 'Pinnacle',
      description: 'Small Group - max 12 students, Personalised Program',
      studentCount: 12,
      badge: 'Premium',
      features: [
        'Personalized attention',
        'Small batch size',
        'Premium resources',
        'One-on-one doubt clearing',
      ],
      pricing: { planA: 45000 },
      color: {
        primary: '#FFD700',
        secondary: '#FFA500',
        gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      },
    },
    {
      id: 'ascent',
      name: 'Ascent',
      description: 'Recommended - 16-18 students',
      studentCount: 18,
      popular: true,
      features: [
        'Optimal class size',
        'Interactive sessions',
        'Regular assessments',
        'Career guidance',
      ],
      pricing: { planA: 35000 },
      color: {
        primary: '#10B981',
        secondary: '#059669',
        gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      },
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description: 'Value - 25+ students',
      studentCount: 25,
      features: [
        'Value for money',
        'Comprehensive curriculum',
        'Group learning',
        'Study materials',
      ],
      pricing: { planA: 25000 },
      color: {
        primary: '#3B82F6',
        secondary: '#2563EB',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      },
    },
  ],
  x: [
    {
      id: 'pinnacle',
      name: 'Pinnacle',
      description: 'Small Group - max 12 students, Personalised Program',
      studentCount: 12,
      badge: 'Premium',
      features: [
        'Board + Foundation prep',
        'Personalized study plan',
        'Regular parent meetings',
        'Premium study material',
      ],
      pricing: { planA: 55000 },
      color: {
        primary: '#FFD700',
        secondary: '#FFA500',
        gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      },
    },
    {
      id: 'ascent',
      name: 'Ascent',
      description: 'Recommended - 16-18 students',
      studentCount: 18,
      popular: true,
      features: ['Board exam focus', 'NEET foundation', 'Interactive learning', 'Mock tests'],
      pricing: { planA: 42000 },
      color: {
        primary: '#10B981',
        secondary: '#059669',
        gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      },
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description: 'Value - 25+ students',
      studentCount: 25,
      features: [
        'Comprehensive syllabus',
        'Regular tests',
        'Study materials',
        'Doubt clearing sessions',
      ],
      pricing: { planA: 32000 },
      color: {
        primary: '#3B82F6',
        secondary: '#2563EB',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      },
    },
  ],
  xi: [
    {
      id: 'pinnacle',
      name: 'Pinnacle',
      description: 'Small Group - max 12 students, Personalised Program',
      studentCount: 12,
      badge: 'Premium',
      features: [
        'NEET + Board dual prep',
        'Personal mentor assigned',
        'Weekly progress tracking',
        'Parents app access',
      ],
      pricing: {
        planA: 98000,
        planB_NEET: 85000,
        planB_Academy: 75000,
      },
      color: {
        primary: '#FFD700',
        secondary: '#FFA500',
        gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      },
    },
    {
      id: 'ascent',
      name: 'Ascent',
      description: 'Recommended - 16-18 students',
      studentCount: 18,
      popular: true,
      features: [
        'NEET focused curriculum',
        'Regular mock tests',
        'Doubt clearing sessions',
        'Study material included',
      ],
      pricing: {
        planA: 76000,
        planB_NEET: 68000,
        planB_Academy: 62000,
      },
      color: {
        primary: '#10B981',
        secondary: '#059669',
        gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      },
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description: 'Value - 25+ students',
      studentCount: 25,
      features: [
        'Complete NEET syllabus',
        'Weekly tests',
        'Digital resources',
        'Group study sessions',
      ],
      pricing: {
        planA: 48000,
        planB_NEET: 42000,
        planB_Academy: 38000,
      },
      color: {
        primary: '#3B82F6',
        secondary: '#2563EB',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      },
    },
  ],
  xii: [
    {
      id: 'pinnacle',
      name: 'Pinnacle',
      description: 'Small Group - max 12 students, Personalised Program',
      studentCount: 12,
      badge: 'Premium',
      features: [
        'NEET crash course',
        'Board preparation',
        'Personal coaching',
        '24/7 doubt support',
      ],
      pricing: {
        planA: 98000,
        planB_NEET: 85000,
        planB_Academy: 75000,
      },
      color: {
        primary: '#FFD700',
        secondary: '#FFA500',
        gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      },
    },
    {
      id: 'ascent',
      name: 'Ascent',
      description: 'Recommended - 16-18 students',
      studentCount: 18,
      popular: true,
      features: [
        'Intensive NEET prep',
        'Board exam strategy',
        'Regular assessments',
        'Parent updates',
      ],
      pricing: {
        planA: 76000,
        planB_NEET: 68000,
        planB_Academy: 62000,
      },
      color: {
        primary: '#10B981',
        secondary: '#059669',
        gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      },
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description: 'Value - 25+ students',
      studentCount: 25,
      features: [
        'Complete revision',
        'Mock test series',
        'Quick recap sessions',
        'Final preparation',
      ],
      pricing: {
        planA: 48000,
        planB_NEET: 42000,
        planB_Academy: 38000,
      },
      color: {
        primary: '#3B82F6',
        secondary: '#2563EB',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      },
    },
  ],
  dropper: [
    {
      id: 'pinnacle',
      name: 'Pinnacle',
      description: 'Small Group - max 12 students, Personalised Program',
      studentCount: 12,
      badge: 'Premium',
      features: [
        'Complete NEET mastery',
        'Individual attention',
        'Psychology support',
        'Success guarantee*',
      ],
      pricing: {
        planA: 125000,
        planB_NEET: 110000,
        planB_Academy: 95000,
      },
      color: {
        primary: '#FFD700',
        secondary: '#FFA500',
        gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
      },
    },
    {
      id: 'ascent',
      name: 'Ascent',
      description: 'Recommended - 16-18 students',
      studentCount: 18,
      popular: true,
      features: [
        'Full year program',
        'Comprehensive coverage',
        'Mentorship program',
        'Career counseling',
      ],
      pricing: {
        planA: 95000,
        planB_NEET: 85000,
        planB_Academy: 75000,
      },
      color: {
        primary: '#10B981',
        secondary: '#059669',
        gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      },
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description: 'Value - 25+ students',
      studentCount: 25,
      features: [
        'Complete preparation',
        'Regular practice',
        'Affordable pricing',
        'Group motivation',
      ],
      pricing: {
        planA: 65000,
        planB_NEET: 58000,
        planB_Academy: 52000,
      },
      color: {
        primary: '#3B82F6',
        secondary: '#2563EB',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      },
    },
  ],
}

const TEST_SERIES: TestSeries[] = [
  {
    id: 'regular-test-series',
    name: 'Regular Test Series',
    type: 'regular',
    price: 8000,
    description: 'Monthly tests with detailed analysis',
    features: [
      '12 Monthly tests',
      'Detailed performance analysis',
      'Rank prediction',
      'Weakness identification',
    ],
  },
  {
    id: 'final-sprint-test-series',
    name: 'Final Sprint Test Series',
    type: 'final-sprint',
    price: 12000,
    description: 'Intensive final preparation tests',
    features: [
      '20 Mock tests',
      'NEET pattern questions',
      'Time management practice',
      'Last-minute revision',
    ],
  },
]

interface DynamicCourseSelectorProps {
  onCourseSelect?: (course: SelectedCourse) => void
  className?: string
}

export function DynamicCourseSelector({
  onCourseSelect,
  className = '',
}: DynamicCourseSelectorProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [selectedSeries, setSelectedSeries] = useState<string>('')
  const [selectedPlan, setSelectedPlan] = useState<string>('')
  const [selectedTestSeries, setSelectedTestSeries] = useState<TestSeries[]>([])
  const [showIntensiveUpgrade, setShowIntensiveUpgrade] = useState(false)
  const [intensiveUpgrade, setIntensiveUpgrade] = useState(false)

  const steps = ['Class', 'Series', 'Plan', 'Add-ons']

  // Logic for showing intensive upgrade
  useEffect(() => {
    if (selectedSeries && (selectedSeries === 'pinnacle' || selectedSeries === 'ascent')) {
      setShowIntensiveUpgrade(true)
    } else {
      setShowIntensiveUpgrade(false)
      setIntensiveUpgrade(false)
    }
  }, [selectedSeries])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleClassSelect = (classId: string) => {
    setSelectedClass(classId)
    setSelectedSeries('')
    setSelectedPlan('')
    setSelectedTestSeries([])
    handleNext()
  }

  const handleSeriesSelect = (seriesId: string) => {
    setSelectedSeries(seriesId)
    setSelectedPlan('')
    handleNext()
  }

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    handleNext()
  }

  const handleTestSeriesToggle = (testSeries: TestSeries) => {
    setSelectedTestSeries((prev) => {
      const exists = prev.find((ts) => ts.id === testSeries.id)
      if (exists) {
        return prev.filter((ts) => ts.id !== testSeries.id)
      } else {
        return [...prev, testSeries]
      }
    })
  }

  const handleFinalize = () => {
    const finalSelection: SelectedCourse = {
      classLevel: selectedClass,
      series: selectedSeries,
      plan: selectedPlan,
      testSeries: selectedTestSeries,
      intensiveUpgrade,
    }

    onCourseSelect?.(finalSelection)
  }

  const getCurrentPrice = () => {
    if (!selectedClass || !selectedSeries || !selectedPlan) return 0

    const series = COURSE_SERIES[selectedClass]?.find((s) => s.id === selectedSeries)
    if (!series) return 0

    let basePrice = 0
    switch (selectedPlan) {
      case 'plan-a':
        basePrice = series.pricing.planA
        break
      case 'plan-b-neet':
        basePrice = series.pricing.planB_NEET || 0
        break
      case 'plan-b-academy':
        basePrice = series.pricing.planB_Academy || 0
        break
    }

    const testSeriesPrice = selectedTestSeries.reduce((sum, ts) => sum + ts.price, 0)
    const intensivePrice = intensiveUpgrade ? 15000 : 0

    return basePrice + testSeriesPrice + intensivePrice
  }

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  index <= currentStep
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  index <= currentStep ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {step}
              </span>
              {index < steps.length - 1 && (
                <ChevronRight
                  className={`w-4 h-4 mx-4 ${
                    index < currentStep ? 'text-blue-500' : 'text-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-h-[500px]"
        >
          {/* Step 0: Class Selection */}
          {currentStep === 0 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Your Class</h2>
                <p className="text-lg text-gray-600">
                  Choose your current academic level to see personalized course options
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CLASS_LEVELS.map((classLevel) => (
                  <motion.div
                    key={classLevel.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleClassSelect(classLevel.id)}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-200"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${classLevel.gradient} flex items-center justify-center text-white mb-4 mx-auto`}
                    >
                      {classLevel.icon}
                    </div>
                    <h3 className={`text-xl font-bold ${classLevel.textColor} text-center mb-2`}>
                      {classLevel.name}
                    </h3>
                    <p className="text-gray-600 text-center text-sm">{classLevel.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Series Selection */}
          {currentStep === 1 && selectedClass && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Series</h2>
                <p className="text-lg text-gray-600">
                  Select the learning approach that best fits your goals
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {COURSE_SERIES[selectedClass]?.map((series) => (
                  <motion.div
                    key={series.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleSeriesSelect(series.id)}
                    className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 ${
                      series.popular
                        ? 'border-blue-500 ring-4 ring-blue-500/20'
                        : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    {series.badge && (
                      <div className="absolute -top-3 left-6">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {series.badge}
                        </span>
                      </div>
                    )}

                    {series.popular && (
                      <div className="absolute -top-3 right-6">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div
                      className={`w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-white`}
                      style={{ background: series.color.gradient }}
                    >
                      <Users className="h-8 w-8" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{series.name}</h3>

                    <p className="text-gray-600 mb-4">{series.description}</p>

                    <div className="space-y-2 mb-6">
                      {series.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        ₹{series.pricing.planA.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">Starting from</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Plan Selection */}
          {currentStep === 2 && selectedSeries && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
                <p className="text-lg text-gray-600">
                  Select the plan that matches your focus area
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Plan A */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handlePlanSelect('plan-a')}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-200"
                  >
                    <div className="text-center">
                      <Star className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Plan A</h3>
                      <p className="text-gray-600 mb-4">Complete Program</p>
                      <div className="text-2xl font-bold text-gray-900">
                        ₹
                        {COURSE_SERIES[selectedClass]
                          ?.find((s) => s.id === selectedSeries)
                          ?.pricing.planA.toLocaleString()}
                      </div>
                    </div>
                  </motion.div>

                  {/* Plan B - NEET (if available) */}
                  {COURSE_SERIES[selectedClass]?.find((s) => s.id === selectedSeries)?.pricing
                    .planB_NEET && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handlePlanSelect('plan-b-neet')}
                      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-green-200"
                    >
                      <div className="text-center">
                        <Target className="h-8 w-8 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Plan B - NEET</h3>
                        <p className="text-gray-600 mb-4">NEET Focused</p>
                        <div className="text-2xl font-bold text-gray-900">
                          ₹
                          {COURSE_SERIES[selectedClass]
                            ?.find((s) => s.id === selectedSeries)
                            ?.pricing.planB_NEET?.toLocaleString()}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Plan B - Academy (if available) */}
                  {COURSE_SERIES[selectedClass]?.find((s) => s.id === selectedSeries)?.pricing
                    .planB_Academy && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handlePlanSelect('plan-b-academy')}
                      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-200"
                    >
                      <div className="text-center">
                        <BookOpen className="h-8 w-8 text-purple-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Plan B - Academy</h3>
                        <p className="text-gray-600 mb-4">Board Focused</p>
                        <div className="text-2xl font-bold text-gray-900">
                          ₹
                          {COURSE_SERIES[selectedClass]
                            ?.find((s) => s.id === selectedSeries)
                            ?.pricing.planB_Academy?.toLocaleString()}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Add-ons */}
          {currentStep === 3 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Enhance Your Learning</h2>
                <p className="text-lg text-gray-600">
                  Add optional features to maximize your success
                </p>
              </div>

              <div className="space-y-6">
                {/* Intensive Upgrade */}
                {showIntensiveUpgrade && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                          <Zap className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            Upgrade to Intensive
                          </h3>
                          <p className="text-gray-600">
                            Get extra intensive sessions for better results
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">+₹15,000</div>
                        <label className="flex items-center mt-2">
                          <input
                            type="checkbox"
                            checked={intensiveUpgrade}
                            onChange={(e) => setIntensiveUpgrade(e.target.checked)}
                            className="w-5 h-5 text-yellow-500 rounded border-gray-300 focus:ring-yellow-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">Add to cart</span>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Test Series */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {TEST_SERIES.map((testSeries) => (
                    <motion.div
                      key={testSeries.id}
                      whileHover={{ scale: 1.02 }}
                      className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 cursor-pointer ${
                        selectedTestSeries.find((ts) => ts.id === testSeries.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                      onClick={() => handleTestSeriesToggle(testSeries)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            testSeries.type === 'regular'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-purple-100 text-purple-600'
                          }`}
                        >
                          <Clock className="h-5 w-5" />
                        </div>
                        <input
                          type="checkbox"
                          checked={!!selectedTestSeries.find((ts) => ts.id === testSeries.id)}
                          onChange={() => handleTestSeriesToggle(testSeries)}
                          className="w-5 h-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
                        />
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2">{testSeries.name}</h3>
                      <p className="text-gray-600 mb-4">{testSeries.description}</p>

                      <div className="space-y-2 mb-4">
                        {testSeries.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <div className="text-xl font-bold text-gray-900">
                        ₹{testSeries.price.toLocaleString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation & Summary */}
      <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </button>
            )}
          </div>

          {/* Price Summary */}
          <div className="flex items-center space-x-6">
            {selectedClass && selectedSeries && selectedPlan && (
              <div className="text-right">
                <div className="text-sm text-gray-500">Total Amount</div>
                <div className="text-3xl font-bold text-gray-900">
                  ₹{getCurrentPrice().toLocaleString()}
                </div>
              </div>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 0 && !selectedClass) ||
                  (currentStep === 1 && !selectedSeries) ||
                  (currentStep === 2 && !selectedPlan)
                }
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleFinalize}
                className="flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Enroll Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
