'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PremiumButton, AnimatedCounter } from '@/components/ui/PremiumDesignSystem'
import { ParentFlow } from '@/components/conversion/ParentFlow'
import { QuizProgress } from '@/components/ui/ProgressIndicators'
import {
  ChevronRightIcon,
  SparklesIcon,
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon,
  StarIcon,
  PhoneIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'

interface QuizAnswer {
  userType: string // student or parent
  step1: string // class
  step2: string // neet experience
  step3: string // study hours
}

interface CourseRecommendation {
  primary: {
    id: string
    name: string
    subtitle: string
    price: number
    originalPrice: number
    duration: string
    successRate: string
    features: string[]
    highlights: string[]
    match: number // percentage match
  }
  alternatives: Array<{
    id: string
    name: string
    price: number
    duration: string
    match: number
  }>
}

interface EnhancedCourseFinderQuizProps {
  onComplete?: (result: QuizAnswer & { recommendation: CourseRecommendation }) => void
  className?: string
}

export function EnhancedCourseFinderQuiz({
  onComplete,
  className = '',
}: EnhancedCourseFinderQuizProps) {
  const [currentStep, setCurrentStep] = useState<
    'userType' | 'step1' | 'step2' | 'step3' | 'recommendation'
  >('userType')
  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({})
  const [recommendation, setRecommendation] = useState<CourseRecommendation | null>(null)
  const [showParentFlow, setShowParentFlow] = useState(false)
  const [liveStats, setLiveStats] = useState({
    studentsOnline: 247,
    recentEnrollment: 'Arjun enrolled 3 min ago',
  })

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setLiveStats((prev) => ({
          studentsOnline: prev.studentsOnline + Math.floor(Math.random() * 3) - 1,
          recentEnrollment: getRandomEnrollment(),
        }))
      }
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  const getRandomEnrollment = () => {
    const names = ['Arjun', 'Priya', 'Rohit', 'Ananya', 'Karan', 'Diya', 'Vivek', 'Sneha']
    const timeframes = ['just now', '1 min ago', '2 min ago', '3 min ago', '4 min ago']
    const name = names[Math.floor(Math.random() * names.length)]
    const time = timeframes[Math.floor(Math.random() * timeframes.length)]
    return `${name} enrolled ${time}`
  }

  const quizFlow = {
    userType: {
      question: 'Who are you?',
      options: [
        { value: 'student', label: "I'm a Student", description: 'Looking for courses for myself' },
        {
          value: 'parent',
          label: "I'm a Parent/Guardian",
          description: 'Looking for courses for my child',
        },
      ],
      next: 'step1' as const,
    },
    step1: {
      question:
        answers.userType === 'parent' ? 'Which class is your child in?' : 'Which class are you in?',
      options: [
        { value: '9-10', label: '9-10', description: 'Foundation building' },
        { value: '11', label: '11', description: 'NEET journey starts' },
        { value: '12', label: '12', description: 'Final preparation' },
        { value: 'passed-12', label: 'Passed 12', description: 'Dropper year' },
      ],
      next: 'step2' as const,
    },
    step2: {
      question:
        answers.userType === 'parent'
          ? 'Has your child attempted NEET before?'
          : 'Have you attempted NEET before?',
      options: [
        { value: 'no', label: 'No, first time', description: 'Fresh start' },
        { value: 'once', label: 'Yes, once', description: 'Second attempt' },
        { value: 'multiple', label: 'Yes, multiple times', description: 'Determined to succeed' },
      ],
      next: 'step3' as const,
    },
    step3: {
      question: 'Study hours available daily?',
      options: [
        { value: '2-3', label: '2-3 hours', description: 'After school/work' },
        { value: '4-5', label: '4-5 hours', description: 'Focused preparation' },
        { value: '6+', label: '6+ hours', description: 'Intensive study' },
        { value: 'full-day', label: 'Full day', description: 'Complete dedication' },
      ],
      next: 'recommendation' as const,
    },
  }

  const calculateRecommendation = (answers: QuizAnswer): CourseRecommendation => {
    const { step1: studentClass, step2: neetExperience, step3: studyHours } = answers

    // Course recommendation algorithm
    let primaryCourse: CourseRecommendation['primary']
    let alternatives: CourseRecommendation['alternatives'] = []

    if (studentClass === '9-10') {
      primaryCourse = {
        id: 'foundation',
        name: 'Foundation Excellence Program',
        subtitle: 'Build strong fundamentals for NEET success',
        price: 45000,
        originalPrice: 60000,
        duration: '2 Years',
        successRate: '96.5%',
        features: [
          'Complete NCERT foundation',
          'Conceptual clarity sessions',
          'Regular assessment tests',
          'Personalized doubt clearing',
        ],
        highlights: [
          '1200+ Foundation students',
          '96.5% Board success rate',
          'AIIMS faculty teaching',
        ],
        match: studyHours === 'full-day' ? 95 : studyHours === '6+' ? 90 : 85,
      }
      alternatives = [
        {
          id: 'class-11-prep',
          name: 'Class 11 Advance Prep',
          price: 35000,
          duration: '1 Year',
          match: 75,
        },
        {
          id: 'weekend-foundation',
          name: 'Weekend Foundation',
          price: 25000,
          duration: '2 Years',
          match: 65,
        },
      ]
    } else if (studentClass === '11') {
      primaryCourse = {
        id: 'neet-complete',
        name: 'Class 11-12 NEET Complete',
        subtitle: 'Comprehensive 2-year NEET preparation',
        price: 65000,
        originalPrice: 85000,
        duration: '2 Years',
        successRate: '94.8%',
        features: [
          'Complete NCERT + advanced',
          'Regular mock tests',
          'Personal mentorship',
          'Doubt resolution sessions',
        ],
        highlights: [
          '2500+ successful students',
          '94.8% NEET success rate',
          'Most popular program',
        ],
        match: studyHours === 'full-day' ? 98 : studyHours === '6+' ? 95 : 88,
      }
      alternatives = [
        {
          id: 'fast-track-11',
          name: 'Fast Track Class 11',
          price: 45000,
          duration: '1 Year',
          match: 80,
        },
        {
          id: 'weekend-11-12',
          name: 'Weekend Complete',
          price: 55000,
          duration: '2 Years',
          match: 70,
        },
      ]
    } else if (studentClass === '12') {
      primaryCourse = {
        id: 'final-sprint',
        name: 'Class 12 Final Sprint',
        subtitle: 'Last mile NEET preparation',
        price: 55000,
        originalPrice: 70000,
        duration: '1 Year',
        successRate: '92.3%',
        features: [
          'Revision + test series',
          'Exam strategy sessions',
          'Previous year analysis',
          'Time management training',
        ],
        highlights: ['1800+ Class 12 students', '92.3% success rate', 'Proven final year strategy'],
        match: studyHours === 'full-day' ? 95 : studyHours === '6+' ? 92 : 85,
      }
      alternatives = [
        {
          id: 'crash-course',
          name: 'NEET Crash Course',
          price: 35000,
          duration: '6 Months',
          match: 75,
        },
        {
          id: 'test-series-only',
          name: 'Test Series + Doubt',
          price: 25000,
          duration: '1 Year',
          match: 65,
        },
      ]
    } else {
      // passed-12 (dropper)
      const isMultipleAttempt = neetExperience === 'multiple'
      primaryCourse = {
        id: 'dropper-intensive',
        name: isMultipleAttempt ? 'Dropper Success Guarantee' : 'Dropper Success Intensive',
        subtitle: isMultipleAttempt
          ? 'Special program for repeat attempts'
          : 'Second chance, first class success',
        price: isMultipleAttempt ? 85000 : 75000,
        originalPrice: isMultipleAttempt ? 110000 : 95000,
        duration: '1 Year',
        successRate: isMultipleAttempt ? '89.5%' : '91.2%',
        features: [
          'Complete syllabus revision',
          'Intensive test series',
          'Psychology counseling',
          'Strategy optimization',
        ],
        highlights: [
          '800+ dropper students',
          isMultipleAttempt ? '89.5% success rate' : '91.2% success rate',
          'Specialized dropper faculty',
        ],
        match: studyHours === 'full-day' ? 98 : studyHours === '6+' ? 95 : 88,
      }
      alternatives = [
        {
          id: 'dropper-fast',
          name: 'Dropper Fast Track',
          price: 55000,
          duration: '8 Months',
          match: 80,
        },
        {
          id: 'dropper-weekend',
          name: 'Dropper Weekend',
          price: 45000,
          duration: '1 Year',
          match: 70,
        },
      ]
    }

    return { primary: primaryCourse, alternatives }
  }

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentStep]: value }
    setAnswers(newAnswers)

    // If parent is selected, trigger ParentFlow instead of continuing quiz
    if (currentStep === 'userType' && value === 'parent') {
      setTimeout(() => {
        setShowParentFlow(true)
      }, 300)
      return
    }

    const currentStepData = quizFlow[currentStep]
    const nextStep = currentStepData.next

    if (nextStep === 'recommendation') {
      const recommendation = calculateRecommendation(newAnswers as QuizAnswer)
      setRecommendation(recommendation)
      setCurrentStep('recommendation')
      onComplete?.({ ...(newAnswers as QuizAnswer), recommendation })
    } else {
      setTimeout(() => {
        setCurrentStep(nextStep)
      }, 300)
    }
  }

  const handleParentFlowAction = (action: string) => {
    console.log('Parent flow action:', action)
    // Handle different parent flow actions
    switch (action) {
      case 'schedule-parent-meeting':
        window.location.href = '/demo?type=parent-meeting'
        break
      case 'schedule-parent-call':
        window.location.href = '/contact?type=parent-call'
        break
      case 'schedule-center-visit':
        window.location.href = '/locations?action=visit'
        break
      default:
        console.log('Unknown parent action:', action)
    }
  }

  const handleEnrollNow = () => {
    if (recommendation) {
      window.location.href = `/enrollment?course=${encodeURIComponent(recommendation.primary.name)}&price=${recommendation.primary.price}`
    }
  }

  const handleBookCounseling = () => {
    window.location.href = '/demo'
  }

  const handleDownloadDetails = () => {
    if (recommendation) {
      // Generate course brochure download
      window.open(
        `/api/catalog/download?course=${encodeURIComponent(recommendation.primary.id)}`,
        '_blank'
      )
    }
  }

  const handleStartOver = () => {
    setCurrentStep('step1')
    setAnswers({})
    setRecommendation(null)
  }

  if (currentStep === 'recommendation' && recommendation) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-white rounded-2xl p-6 max-w-2xl shadow-2xl ${className}`}
      >
        <div className="text-center space-y-6">
          {/* Match Score */}
          <div className="flex items-center justify-center gap-2 text-blue-600 text-sm">
            <SparklesIcon className="h-4 w-4" />
            <span>{recommendation.primary.match}% Perfect Match Found!</span>
          </div>

          {/* Primary Recommendation */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center justify-center gap-2 mb-3">
              <StarSolid className="h-5 w-5 text-purple-600" />
              <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                RECOMMENDED FOR YOU
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{recommendation.primary.name}</h3>
            <p className="text-gray-700 text-sm mb-4">{recommendation.primary.subtitle}</p>

            <div className="flex justify-between items-center mb-4">
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{recommendation.primary.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{recommendation.primary.originalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  {recommendation.primary.duration} • {recommendation.primary.successRate} success
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                <ul className="space-y-1">
                  {recommendation.primary.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <CheckCircleIcon className="h-3 w-3 text-blue-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
                <ul className="space-y-1">
                  {recommendation.primary.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <StarIcon className="h-3 w-3 text-purple-600 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Alternative Options */}
          <div className="text-left">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Other Options:</h4>
            <div className="grid gap-2">
              {recommendation.alternatives.map((alt, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white rounded-lg p-3 border border-gray-200 shadow-sm"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">{alt.name}</div>
                    <div className="text-xs text-gray-600">
                      {alt.duration} • {alt.match}% match
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-600">
                      ₹{alt.price.toLocaleString()}
                    </div>
                    <button className="text-xs text-gray-500 hover:text-blue-600">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <PremiumButton
              variant="medical"
              size="lg"
              onClick={handleEnrollNow}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
            >
              Enroll Now
              <ChevronRightIcon className="h-5 w-5" />
            </PremiumButton>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleBookCounseling}
                className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
              >
                <PhoneIcon className="h-4 w-4" />
                Book Counseling
              </button>
              <button
                onClick={handleDownloadDetails}
                className="flex items-center justify-center gap-2 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
              >
                <DocumentArrowDownIcon className="h-4 w-4" />
                Download Details
              </button>
            </div>

            <button
              onClick={handleStartOver}
              className="w-full py-2 px-4 text-gray-400 hover:text-white transition-colors text-sm"
            >
              🔄 Take Quiz Again
            </button>
          </div>

          {/* Live Stats */}
          <div className="flex justify-between items-center text-xs text-gray-600 pt-2 border-t border-gray-200">
            <span>🟢 {liveStats.studentsOnline} students online</span>
            <span>✅ {liveStats.recentEnrollment}</span>
          </div>
        </div>
      </motion.div>
    )
  }

  const currentStepData = quizFlow[currentStep]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl p-6 max-w-xl shadow-2xl ${className}`}
    >
      {/* Quiz Header */}
      <div className="text-center mb-4">
        <p className="text-sm text-blue-600 mb-1">Find your perfect course in 60 seconds</p>
        <div className="flex justify-center gap-2">
          {Object.keys(quizFlow).map((step, index) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full transition-colors ${
                step === currentStep || Object.keys(quizFlow).indexOf(currentStep) > index
                  ? 'bg-blue-600'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Current Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-900 mb-4 font-medium text-center">{currentStepData.question}</p>

          <div className="grid gap-3">
            {currentStepData.options.map((option, index) => (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleAnswer(option.value)}
                className="quiz-option bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-900 p-4 rounded-lg transition-all duration-200 text-left group hover:ring-2 hover:ring-blue-600 border border-blue-100"
              >
                <div className="font-medium">{option.label}</div>
                {option.description && (
                  <div className="text-xs text-gray-600 mt-1">{option.description}</div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Progress Indicator */}
      <div className="mt-6">
        <QuizProgress
          totalSteps={Object.keys(quizFlow).length}
          currentStep={Object.keys(quizFlow).indexOf(currentStep)}
          className="mb-2"
        />
      </div>

      {/* Parent Flow Modal */}
      <ParentFlow
        isOpen={showParentFlow}
        onClose={() => setShowParentFlow(false)}
        onComplete={handleParentFlowAction}
      />
    </motion.div>
  )
}
