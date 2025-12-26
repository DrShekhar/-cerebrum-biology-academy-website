'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PremiumButton, AnimatedCounter } from '@/components/ui/PremiumDesignSystem'
import { ChevronRight, Sparkles, GraduationCap } from 'lucide-react'

interface ProgressiveDisclosureQuizProps {
  onComplete?: (result: QuizResult) => void
  className?: string
}

interface QuizResult {
  studentClass: string
  biologyLevel: string
  targetScore: string
  recommendedCourse: string
  pricing: number
}

interface QuizStep {
  id: string
  question: string
  options: Array<{
    value: string
    label: string
    description?: string
  }>
}

export function ProgressiveDisclosureQuiz({
  onComplete,
  className = '',
}: ProgressiveDisclosureQuizProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [liveStats, setLiveStats] = useState({
    studentsOnline: 247,
    recentEnrollment: 'Priya enrolled 2 min ago',
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
    }, 15000) // Update every 15 seconds
    return () => clearInterval(interval)
  }, [])

  const getRandomEnrollment = () => {
    const names = ['Arjun', 'Priya', 'Rohit', 'Ananya', 'Karan', 'Diya', 'Vivek', 'Sneha']
    const timeframes = ['just now', '1 min ago', '2 min ago', '3 min ago']
    const name = names[Math.floor(Math.random() * names.length)]
    const time = timeframes[Math.floor(Math.random() * timeframes.length)]
    return `${name} enrolled ${time}`
  }

  const quizSteps: QuizStep[] = [
    {
      id: 'class',
      question: 'Which class are you in?',
      options: [
        { value: '9-10', label: '9-10', description: 'Foundation Program' },
        { value: '11', label: '11', description: 'NEET Start' },
        { value: '12', label: '12', description: 'Final Push' },
        { value: '12-passed', label: '12 Passed', description: 'Dropper Year' },
      ],
    },
    {
      id: 'biology_level',
      question: 'How confident are you with Biology?',
      options: [
        { value: 'beginner', label: 'Just starting', description: 'Need strong foundation' },
        { value: 'intermediate', label: 'Decent basics', description: 'Need improvement' },
        { value: 'advanced', label: 'Pretty good', description: 'Need fine-tuning' },
        { value: 'expert', label: 'Very strong', description: 'Need exam strategy' },
      ],
    },
    {
      id: 'target',
      question: "What's your NEET target?",
      options: [
        { value: 'qualify', label: 'Just qualify', description: '400+ marks' },
        { value: 'government', label: 'Government college', description: '500+ marks' },
        { value: 'top', label: 'Top colleges', description: '600+ marks' },
        { value: 'aiims', label: 'AIIMS/JIPMER', description: '650+ marks' },
      ],
    },
  ]

  const calculateResult = (): QuizResult => {
    const studentClass = answers.class
    const biologyLevel = answers.biology_level
    const targetScore = answers.target

    // Course recommendation logic
    let recommendedCourse = ''
    let pricing = 0

    if (studentClass === '9-10') {
      recommendedCourse = 'Foundation Excellence Program'
      pricing = 45000
    } else if (studentClass === '11') {
      recommendedCourse = 'Class 11-12 NEET Complete'
      pricing = 65000
    } else if (studentClass === '12') {
      recommendedCourse = 'Class 12 Final Sprint'
      pricing = 55000
    } else if (studentClass === '12-passed') {
      recommendedCourse = 'Dropper Success Intensive'
      pricing = 75000
    }

    return {
      studentClass,
      biologyLevel,
      targetScore,
      recommendedCourse,
      pricing,
    }
  }

  const handleAnswer = (stepId: string, value: string) => {
    const newAnswers = { ...answers, [stepId]: value }
    setAnswers(newAnswers)

    if (currentStep < quizSteps.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, 300)
    } else {
      setTimeout(() => {
        setShowResult(true)
        const result = calculateResult()
        onComplete?.(result)
      }, 300)
    }
  }

  const handleStartOver = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResult(false)
  }

  const handleEnrollNow = () => {
    const result = calculateResult()
    // Navigate to enrollment with pre-filled data
    window.location.href = `/enrollment?course=${encodeURIComponent(result.recommendedCourse)}&price=${result.pricing}`
  }

  if (showResult) {
    const result = calculateResult()

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-slate-800 rounded-2xl p-6 max-w-xl ${className}`}
      >
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-green-500 text-sm">
            <Sparkles className="h-4 w-4" />
            <span>Perfect Match Found!</span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-2">{result.recommendedCourse}</h3>
            <p className="text-gray-300 text-sm">Recommended based on your answers</p>
          </div>

          <div className="bg-slate-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold">Course Fee</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-500">
                  ₹{result.pricing.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">One-time payment</div>
              </div>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <GraduationCap className="h-3 w-3" />
              <span>94.2% success rate • AIIMS faculty</span>
            </div>
          </div>

          <div className="space-y-3">
            <PremiumButton
              variant="medical"
              size="lg"
              onClick={handleEnrollNow}
              className="w-full bg-green-600 hover:from-green-600 hover:to-green-700 text-white py-3"
            >
              Enroll Now
              <ChevronRight className="h-5 w-5" />
            </PremiumButton>

            <div className="flex gap-2">
              <button
                onClick={() => window.open('tel:+918826444334', '_self')}
                className="flex-1 py-2 px-4 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors text-sm"
              >
                📞 Call Expert
              </button>
              <button
                onClick={handleStartOver}
                className="flex-1 py-2 px-4 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors text-sm"
              >
                🔄 Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  const currentStepData = quizSteps[currentStep]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-slate-800 rounded-2xl p-6 max-w-xl ${className}`}
    >
      {/* Quiz Header */}
      <div className="text-center mb-4">
        <p className="text-sm text-green-500 mb-1">Find your perfect course in 30 seconds</p>
        <div className="flex justify-center gap-2">
          {quizSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index <= currentStep ? 'bg-green-500' : 'bg-slate-600'
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
          <p className="text-white mb-4 font-medium">{currentStepData.question}</p>

          <div className="grid grid-cols-2 gap-2">
            {currentStepData.options.map((option, index) => (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleAnswer(currentStepData.id, option.value)}
                className="quiz-option bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-lg transition-all duration-200 text-left group hover:ring-2 hover:ring-green-500"
              >
                <div className="font-medium">{option.label}</div>
                {option.description && (
                  <div className="text-xs text-gray-400 mt-1">{option.description}</div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="mt-4 text-center text-xs text-gray-400">
        Step {currentStep + 1} of {quizSteps.length}
      </div>
    </motion.div>
  )
}

// Live Trust Indicators Component
export function LiveTrustIndicators({ className = '' }: { className?: string }) {
  const [liveStats, setLiveStats] = useState({
    studentsOnline: 247,
    recentEnrollment: 'Priya enrolled 2 min ago',
  })

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const names = ['Arjun', 'Priya', 'Rohit', 'Ananya', 'Karan', 'Diya', 'Vivek', 'Sneha']
        const timeframes = ['just now', '1 min ago', '2 min ago', '3 min ago']
        const name = names[Math.floor(Math.random() * names.length)]
        const time = timeframes[Math.floor(Math.random() * timeframes.length)]

        setLiveStats((prev) => ({
          studentsOnline: prev.studentsOnline + Math.floor(Math.random() * 3) - 1,
          recentEnrollment: `${name} enrolled ${time}`,
        }))
      }
    }, 12000) // Update every 12 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`hero-trust-indicators fixed bottom-6 right-6 z-40 space-y-3 ${className}`}>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        className="live-students bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
      >
        <div className="flex items-center gap-2 text-sm font-medium">
          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
          <span className="text-gray-800">
            <AnimatedCounter value={liveStats.studentsOnline} /> students online
          </span>
        </div>
      </motion.div>

      <motion.div
        key={liveStats.recentEnrollment}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="recent-enrollment bg-green-600/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg"
      >
        <div className="text-white text-sm font-medium">✅ {liveStats.recentEnrollment}</div>
      </motion.div>
    </div>
  )
}
