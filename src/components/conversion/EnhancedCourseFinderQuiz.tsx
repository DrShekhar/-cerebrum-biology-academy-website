'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PremiumButton, AnimatedCounter } from '@/components/ui/PremiumDesignSystem'
import { ParentFlow } from '@/components/conversion/ParentFlow'
import { QuizProgress } from '@/components/ui/ProgressIndicators'
import {
  ChevronRight,
  Sparkles,
  GraduationCap,
  Clock,
  CheckCircle2,
  Star,
  Phone,
  FileDown,
} from 'lucide-react'

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

    // Course recommendation algorithm based on actual pricing
    let primaryCourse: CourseRecommendation['primary']
    let alternatives: CourseRecommendation['alternatives'] = []

    // Determine recommended tier based on study hours and dedication
    const isHighCommitment = studyHours === 'full-day' || studyHours === '6+'
    const isMediumCommitment = studyHours === '4-5'

    if (studentClass === '9-10') {
      // Foundation courses (Class 9-10)
      if (isHighCommitment) {
        // Recommend Pinnacle for high commitment
        primaryCourse = {
          id: 'foundation-pinnacle',
          name: 'Pinnacle Foundation Program',
          subtitle: 'Elite NEET foundation with personal AIIMS mentorship',
          price: 90000,
          originalPrice: 96000,
          duration: '1 Year',
          successRate: '96.5%',
          features: [
            '10-12 students per batch',
            'Personal mentorship from AIIMS faculty',
            'NEET foundation preparation',
            '5000+ practice questions',
            'Weekly 1-on-1 doubt sessions',
          ],
          highlights: ['Ultra-small batch size', 'AIIMS faculty teaching', 'Money-back guarantee'],
          match: 95,
        }
        alternatives = [
          {
            id: 'foundation-ascent',
            name: 'Ascent Foundation',
            price: 60000,
            duration: '1 Year',
            match: 85,
          },
          {
            id: 'foundation-pursuit',
            name: 'Pursuit Foundation',
            price: 45000,
            duration: '1 Year',
            match: 75,
          },
        ]
      } else {
        // Recommend Ascent for medium commitment
        primaryCourse = {
          id: 'foundation-ascent',
          name: 'Ascent Foundation Program',
          subtitle: 'Most popular choice for NEET foundation',
          price: 60000,
          originalPrice: 63000,
          duration: '1 Year',
          successRate: '94.2%',
          features: [
            '16-18 students per batch',
            'AIIMS faculty teaching',
            'NEET foundation preparation',
            '3000+ practice questions',
            'Weekly group doubt sessions',
          ],
          highlights: ['Most popular choice', '94.2% success rate', 'Complete study materials'],
          match: 92,
        }
        alternatives = [
          {
            id: 'foundation-pinnacle',
            name: 'Pinnacle Foundation',
            price: 90000,
            duration: '1 Year',
            match: 88,
          },
          {
            id: 'foundation-pursuit',
            name: 'Pursuit Foundation',
            price: 45000,
            duration: '1 Year',
            match: 80,
          },
        ]
      }
    } else if (studentClass === '11') {
      // Class 11 NEET courses
      if (isHighCommitment) {
        // Recommend Pinnacle for high commitment
        primaryCourse = {
          id: 'class-11-pinnacle',
          name: 'Pinnacle Series - Class 11 (Board + NEET)',
          subtitle: 'Elite 2-year NEET preparation with personal AIIMS mentorship',
          price: 98000,
          originalPrice: 108000,
          duration: '1 Year',
          successRate: '94.8%',
          features: [
            '10-12 students per batch',
            'Personal mentorship from Dr. Shekhar (AIIMS)',
            '7000+ practice questions',
            '30+ mock tests',
            '24/7 AI-powered doubt bot',
          ],
          highlights: [
            '2500+ successful students',
            '94.8% NEET success rate',
            'Premium materials (₹15K value)',
          ],
          match: 98,
        }
        alternatives = [
          {
            id: 'class-11-ascent',
            name: 'Ascent Series - Class 11',
            price: 76000,
            duration: '1 Year',
            match: 90,
          },
          {
            id: 'class-11-pursuit',
            name: 'Pursuit Series - Class 11',
            price: 48000,
            duration: '1 Year',
            match: 82,
          },
        ]
      } else {
        // Recommend Ascent for medium commitment (most popular)
        primaryCourse = {
          id: 'class-11-ascent',
          name: 'Ascent Series - Class 11 (Board + NEET)',
          subtitle: 'Most popular choice for NEET preparation',
          price: 76000,
          originalPrice: 79000,
          duration: '1 Year',
          successRate: '92.5%',
          features: [
            '16-18 students per batch',
            'AIIMS faculty teaching',
            '5000+ practice questions',
            '20+ mock tests',
            'AI doubt resolution',
          ],
          highlights: [
            '#1 choice of NEET toppers',
            'Perfect study-practice balance',
            '600+ high scorers',
          ],
          match: 95,
        }
        alternatives = [
          {
            id: 'class-11-pinnacle',
            name: 'Pinnacle Series - Class 11',
            price: 98000,
            duration: '1 Year',
            match: 92,
          },
          {
            id: 'class-11-pursuit',
            name: 'Pursuit Series - Class 11',
            price: 48000,
            duration: '1 Year',
            match: 85,
          },
        ]
      }
    } else if (studentClass === '12') {
      // Class 12 NEET courses
      if (isHighCommitment) {
        primaryCourse = {
          id: 'class-12-pinnacle',
          name: 'Pinnacle Series - Class 12 NEET',
          subtitle: 'Final year intensive NEET preparation',
          price: 156000,
          originalPrice: 159000,
          duration: '1 Year',
          successRate: '92.3%',
          features: [
            '10-12 students per batch',
            'Complete syllabus coverage (11th + 12th)',
            '15000+ practice questions',
            '50+ full-length mock tests',
            'Daily doubt clearing sessions',
          ],
          highlights: [
            'Elite faculty access',
            'Proven final year strategy',
            'NEET counseling assistance',
          ],
          match: 95,
        }
        alternatives = [
          {
            id: 'class-12-ascent',
            name: 'Ascent Series - Class 12',
            price: 70000,
            duration: '1 Year',
            match: 88,
          },
          {
            id: 'class-12-pursuit',
            name: 'Pursuit Series - Class 12',
            price: 70000,
            duration: '1 Year',
            match: 80,
          },
        ]
      } else {
        primaryCourse = {
          id: 'class-12-ascent',
          name: 'Ascent Series - Class 12 NEET',
          subtitle: 'Focused NEET preparation for final year',
          price: 70000,
          originalPrice: 73000,
          duration: '1 Year',
          successRate: '91.0%',
          features: [
            '16-18 students per batch',
            'AIIMS faculty teaching',
            '8000+ practice questions',
            '30+ mock tests',
            'NEET strategy sessions',
          ],
          highlights: [
            'Mission mode preparation',
            'Rank prediction 98%+ accuracy',
            'Regular assessments',
          ],
          match: 92,
        }
        alternatives = [
          {
            id: 'class-12-pinnacle',
            name: 'Pinnacle Series - Class 12',
            price: 156000,
            duration: '1 Year',
            match: 90,
          },
          {
            id: 'class-12-pursuit',
            name: 'Pursuit Series - Class 12',
            price: 70000,
            duration: '1 Year',
            match: 82,
          },
        ]
      }
    } else {
      // Dropper courses
      const isMultipleAttempt = neetExperience === 'multiple'

      if (isHighCommitment) {
        primaryCourse = {
          id: 'dropper-pinnacle',
          name: 'Pinnacle Dropper Program',
          subtitle: isMultipleAttempt
            ? 'Rank improvement specialist for multiple attempts'
            : 'Second chance, elite success strategy',
          price: 165000,
          originalPrice: 180000,
          duration: '1 Year',
          successRate: '89.5%',
          features: [
            '10 students per batch',
            'Personal NEET rank improvement strategist',
            'Individual weakness analysis',
            'Advanced problem-solving masterclasses',
            'Previous year toppers mentoring',
          ],
          highlights: [
            '200+ rank jump average',
            'Elite dropper mentoring',
            'Complete question bank (15 years)',
          ],
          match: 98,
        }
        alternatives = [
          {
            id: 'dropper-ascent',
            name: 'Ascent Dropper Program',
            price: 85000,
            duration: '1 Year',
            match: 90,
          },
          {
            id: 'dropper-pursuit',
            name: 'Pursuit Dropper Program',
            price: 72000,
            duration: '1 Year',
            match: 82,
          },
        ]
      } else {
        primaryCourse = {
          id: 'dropper-ascent',
          name: 'Ascent Dropper Program',
          subtitle: 'Most chosen by droppers for rank improvement',
          price: 85000,
          originalPrice: 90000,
          duration: '1 Year',
          successRate: '88.0%',
          features: [
            '18 students per batch',
            'Intensive daily mock tests',
            'Rank improvement tracking',
            'Subject-wise expert faculty',
            'Speed and accuracy enhancement',
          ],
          highlights: [
            '85% achieve target college',
            'Systematic rank improvement',
            'Time management mastery',
          ],
          match: 95,
        }
        alternatives = [
          {
            id: 'dropper-pinnacle',
            name: 'Pinnacle Dropper Program',
            price: 165000,
            duration: '1 Year',
            match: 92,
          },
          {
            id: 'dropper-pursuit',
            name: 'Pursuit Dropper Program',
            price: 72000,
            duration: '1 Year',
            match: 85,
          },
        ]
      }
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
            <Sparkles className="h-4 w-4" />
            <span>{recommendation.primary.match}% Perfect Match Found!</span>
          </div>

          {/* Primary Recommendation */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Star className="h-5 w-5 text-purple-600" />
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
                      <CheckCircle2 className="h-3 w-3 text-blue-600 flex-shrink-0" />
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
                      <Star className="h-3 w-3 text-purple-600 flex-shrink-0" />
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
              <ChevronRight className="h-5 w-5" />
            </PremiumButton>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleBookCounseling}
                className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
              >
                <Phone className="h-4 w-4" />
                Book Counseling
              </button>
              <button
                onClick={handleDownloadDetails}
                className="flex items-center justify-center gap-2 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
              >
                <FileDown className="h-4 w-4" />
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
