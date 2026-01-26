'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PremiumButton, PremiumCard, AnimatedCounter } from '@/components/ui/PremiumDesignSystem'
import { ChevronRight, CheckCircle2, Sparkles, Trophy, Clock, GraduationCap } from 'lucide-react'

interface QuickQuizFlowProps {
  onComplete?: (result: QuizResult) => void
  className?: string
}

interface QuizResult {
  studentType: 'foundation' | 'class11' | 'class12' | 'dropper'
  currentScore: number
  targetScore: number
  timeframe: string
  confidence: number
  recommendedCourse: string
  pricing: number
}

interface Question {
  id: string
  text: string
  subtitle?: string
  options: Array<{
    value: string
    label: string
    score: number
    type?: string
  }>
}

export function QuickQuizFlow({ onComplete, className = '' }: QuickQuizFlowProps) {
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'result' | 'enrollment'>(
    'intro'
  )
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [progress, setProgress] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const questions: Question[] = [
    {
      id: 'student_type',
      text: 'What best describes your current situation?',
      subtitle: 'This helps us recommend the perfect course for you',
      options: [
        {
          value: 'foundation',
          label: '🎯 Class 9-10: Building Foundation',
          score: 10,
          type: 'foundation',
        },
        { value: 'class11', label: '📚 Class 11: Starting NEET Prep', score: 15, type: 'class11' },
        { value: 'class12', label: '🎓 Class 12: Final Year Push', score: 20, type: 'class12' },
        {
          value: 'dropper',
          label: '💪 Dropper: Serious About Success',
          score: 25,
          type: 'dropper',
        },
      ],
    },
    {
      id: 'current_score',
      text: "What's your current Biology performance level?",
      subtitle: "Be honest - we'll help you improve from wherever you are",
      options: [
        { value: 'beginner', label: '📖 Beginner (0-40%)', score: 5 },
        { value: 'intermediate', label: '📈 Intermediate (40-70%)', score: 15 },
        { value: 'advanced', label: '🎯 Advanced (70-85%)', score: 25 },
        { value: 'expert', label: '🏆 Expert (85%+)', score: 30 },
      ],
    },
    {
      id: 'target_goal',
      text: "What's your NEET target score?",
      subtitle: "Dream big - we've helped students achieve 360/360 in Biology",
      options: [
        { value: 'pass', label: '✅ Just Pass NEET (300+)', score: 10 },
        { value: 'good', label: '🎯 Good Score (450+)', score: 20 },
        { value: 'excellent', label: '🏆 Excellent Score (550+)', score: 30 },
        { value: 'aiims', label: '👑 AIIMS/Top College (600+)', score: 40 },
      ],
    },
  ]

  const calculateResult = (): QuizResult => {
    const studentType = answers.student_type as QuizResult['studentType']
    const currentScore = answers.current_score
    const targetGoal = answers.target_goal

    let totalScore = 0
    questions.forEach((q) => {
      const answer = answers[q.id]
      const option = q.options.find((opt) => opt.value === answer)
      if (option) totalScore += option.score
    })

    const confidence = Math.min(95, Math.max(70, totalScore * 1.2))

    // Course recommendations based on student type and goals
    const courseMapping = {
      foundation: { name: 'Foundation Excellence Program', price: 25000 },
      class11: { name: 'Class 11 NEET Mastery', price: 45000 },
      class12: { name: 'Class 12 Final Sprint', price: 55000 },
      dropper: { name: 'Dropper Success Intensive', price: 75000 },
    }

    const course = courseMapping[studentType]

    return {
      studentType,
      currentScore: confidence - 25,
      targetScore: confidence,
      timeframe:
        studentType === 'dropper' ? '1 Year' : studentType === 'class12' ? '6 Months' : '2 Years',
      confidence,
      recommendedCourse: course.name,
      pricing: course.price,
    }
  }

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setTimeout(() => {
        setCurrentQuestion(nextQuestion)
        setProgress((nextQuestion / questions.length) * 100)
      }, 300)
    } else {
      setTimeout(() => {
        setProgress(100)
        setCurrentStep('result')
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
      }, 500)
    }
  }

  const handleStartQuiz = () => {
    setCurrentStep('quiz')
    setProgress(10)
  }

  const handleEnrollNow = () => {
    const result = calculateResult()
    setCurrentStep('enrollment')
    onComplete?.(result)
  }

  const result = currentStep === 'result' ? calculateResult() : null

  if (currentStep === 'intro') {
    return (
      <PremiumCard variant="luxury" size="lg" className={`bg-gray-50 border-blue-200 ${className}`}>
        <div className="text-center space-y-6 p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-blue-600 font-semibold">
              <Sparkles className="h-5 w-5" />
              <span>PERSONALIZED COURSE FINDER</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              Find Your Perfect NEET Biology Course
            </h3>
            <p className="text-gray-600">
              Take our 3-question quiz and get a personalized course recommendation in under 2
              minutes
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">3</div>
              <div className="text-sm text-gray-500">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">2</div>
              <div className="text-sm text-gray-500">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">94.2%</div>
              <div className="text-sm text-gray-500">Success Rate</div>
            </div>
          </div>

          <PremiumButton
            variant="medical"
            size="lg"
            onClick={handleStartQuiz}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4"
          >
            <Clock className="h-5 w-5" />
            Start 2-Minute Quiz
            <ChevronRight className="h-5 w-5" />
          </PremiumButton>

          <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            Used by 5,000+ students • 100% Free
          </div>
        </div>
      </PremiumCard>
    )
  }

  if (currentStep === 'quiz') {
    const question = questions[currentQuestion]

    return (
      <PremiumCard variant="luxury" size="lg" className={`bg-white border-gray-200 ${className}`}>
        <div className="p-6 space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-blue-600 font-semibold">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-blue-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900">{question.text}</h3>
            {question.subtitle && <p className="text-gray-600">{question.subtitle}</p>}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleAnswer(question.id, option.value)}
                className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 group-hover:text-blue-700">
                    {option.label}
                  </span>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </PremiumCard>
    )
  }

  if (currentStep === 'result' && result) {
    return (
      <PremiumCard
        variant="luxury"
        size="lg"
        className={`bg-green-50 border-green-200 ${className}`}
      >
        <div className="p-6 space-y-6">
          {/* Confetti Effect */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -50, 0],
                    rotate: [0, 360],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          )}

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-green-600 font-semibold">
              <Trophy className="h-5 w-5" />
              <span>PERSONALIZED RECOMMENDATION</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Perfect Course Found!</h3>
            <p className="text-gray-600">
              Based on your answers, here's your personalized path to NEET success
            </p>
          </div>

          {/* Recommended Course */}
          <div className="bg-white rounded-xl border-2 border-green-200 p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-gray-900">{result.recommendedCourse}</h4>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    ₹{result.pricing.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">One-time fee</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    <AnimatedCounter value={result.confidence} suffix="%" />
                  </div>
                  <div className="text-sm text-gray-500">Success Probability</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{result.timeframe}</div>
                  <div className="text-sm text-gray-500">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">360</div>
                  <div className="text-sm text-gray-500">Target Biology</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-green-700 bg-green-100 rounded-lg p-3">
                <CheckCircle2 className="h-5 w-5" />
                <span>100% Refund Guarantee • Personal Mentorship • 24/7 Support</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <PremiumButton
              variant="medical"
              size="lg"
              onClick={handleEnrollNow}
              className="w-full bg-green-600 hover:from-green-700 hover:to-green-700 text-white py-4"
            >
              <GraduationCap className="h-5 w-5" />
              Enroll Now - Start Your Success Journey
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs ml-2">LIMITED SEATS</span>
            </PremiumButton>

            <div className="flex gap-3">
              <button className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
                📞 Call Counselor
              </button>
              <button className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
                💬 WhatsApp Chat
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">5,000+</div>
              <div className="text-xs text-gray-500">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">247</div>
              <div className="text-xs text-gray-500">AIIMS Selections</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">94.2%</div>
              <div className="text-xs text-gray-500">Success Rate</div>
            </div>
          </div>
        </div>
      </PremiumCard>
    )
  }

  return null
}
