'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Target,
  Users,
  GraduationCap,
  Award,
  Brain,
  Sparkles,
  Star,
  ArrowRight,
  CheckCircle,
  Clock,
  Trophy,
} from 'lucide-react'
import { courses, type Course } from '@/data/courseData'

interface QuizAnswer {
  questionId: string
  value: string
  label: string
}

interface QuizQuestion {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  options: {
    value: string
    label: string
    description: string
    icon: string
    benefits: string[]
  }[]
}

// Harvard-level educational psychology questions
const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'currentSituation',
    title: 'What best describes your current academic stage?',
    subtitle:
      'This helps us understand your preparation timeline and recommend the optimal learning path',
    icon: <BookOpen className="h-8 w-8 text-blue-500" />,
    options: [
      {
        value: 'class-9-10',
        label: 'Class 9-10',
        description: 'Building strong foundations for future NEET success',
        icon: '🌱',
        benefits: ['Early advantage', 'Conceptual clarity', 'Stress-free preparation'],
      },
      {
        value: 'class-11',
        label: 'Class 11',
        description: 'Critical year for NEET concept building and board preparation',
        icon: '📚',
        benefits: ['Balanced approach', 'Dual preparation', 'Time optimization'],
      },
      {
        value: 'class-12',
        label: 'Class 12',
        description: 'Final year intensive preparation for NEET and boards',
        icon: '🎯',
        benefits: ['Focused strategy', 'Exam techniques', 'Time management'],
      },
      {
        value: 'dropper',
        label: 'NEET Dropper',
        description: 'Dedicated preparation for improved NEET rank',
        icon: '🚀',
        benefits: ['Intensive focus', 'Rank improvement', 'Expert guidance'],
      },
    ],
  },
  {
    id: 'primaryGoal',
    title: "What's your primary academic goal?",
    subtitle: 'Understanding your objectives helps us design the perfect preparation strategy',
    icon: <Target className="h-8 w-8 text-green-500" />,
    options: [
      {
        value: 'neet-only',
        label: 'NEET Only',
        description: 'Dedicated NEET preparation for medical college admission',
        icon: '🏥',
        benefits: ['100% NEET focus', 'Medical college guaranteed', 'Doctor career path'],
      },
      {
        value: 'neet-boards',
        label: 'NEET + Boards',
        description: 'Balanced preparation for both NEET and board examinations',
        icon: '⚖️',
        benefits: ['Dual success', 'Multiple options', 'Safety net approach'],
      },
      {
        value: 'academic-focus',
        label: 'Academic Excellence',
        description: 'Strong academic foundation with competitive exam readiness',
        icon: '🎓',
        benefits: ['Concept mastery', 'Academic honors', 'Future flexibility'],
      },
    ],
  },
  {
    id: 'batchSize',
    title: 'Choose your preferred learning environment',
    subtitle: 'Class size directly impacts personalized attention and learning outcomes',
    icon: <Users className="h-8 w-8 text-purple-500" />,
    options: [
      {
        value: 'small',
        label: 'Small Batch (≤12 students)',
        description: 'Maximum personal attention and customized learning',
        icon: '👥',
        benefits: ['Personal mentoring', 'Doubt clearing', 'Individual progress tracking'],
      },
      {
        value: 'medium',
        label: 'Medium Batch (12-20 students)',
        description: 'Balanced personal attention with peer learning dynamics',
        icon: '👨‍👩‍👧‍👦',
        benefits: ['Peer interaction', 'Group discussions', 'Competitive spirit'],
      },
      {
        value: 'large',
        label: 'Large Batch (20+ students)',
        description: 'Cost-effective learning with diverse peer group',
        icon: '🏫',
        benefits: ['Cost effective', 'Diverse perspectives', 'Large peer network'],
      },
    ],
  },
]

// Silicon Valley AI recommendation engine
const findRecommendedCourse = (answers: QuizAnswer[]): Course | null => {
  const situation = answers.find((a) => a.questionId === 'currentSituation')?.value
  const goal = answers.find((a) => a.questionId === 'primaryGoal')?.value
  const batchSize = answers.find((a) => a.questionId === 'batchSize')?.value

  // Harvard-level decision tree algorithm
  let recommendedCourse = courses[0]

  // Academic stage matching
  if (situation === 'class-9-10') {
    recommendedCourse = courses.find((c) => c.series === 'Foundation') || courses[0]
  } else if (situation === 'dropper') {
    recommendedCourse = courses.find((c) => c.series === 'Intensive') || courses[0]
  } else {
    // Class 11 or 12
    if (goal === 'neet-only') {
      recommendedCourse = courses.find((c) => c.series === 'Ascent') || courses[0]
    } else {
      recommendedCourse = courses.find((c) => c.series === 'Pursuit') || courses[0]
    }
  }

  // Batch size preference override
  if (batchSize === 'small') {
    const smallBatchCourse = courses.find((c) => c.batchSize <= 12)
    if (smallBatchCourse) recommendedCourse = smallBatchCourse
  }

  return recommendedCourse
}

interface CourseFinderProps {
  onCourseRecommended?: (course: Course) => void
  onBookDemo?: (course: Course) => void
  className?: string
}

export function CourseFinder({
  onCourseRecommended,
  onBookDemo,
  className = '',
}: CourseFinderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [recommendedCourse, setRecommendedCourse] = useState<Course | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const progressPercentage = ((currentStep + 1) / QUIZ_QUESTIONS.length) * 100
  const currentQuestion = QUIZ_QUESTIONS[currentStep]

  const handleAnswer = (value: string, label: string) => {
    setSelectedOption(value)

    // Smooth animation delay
    setTimeout(() => {
      const newAnswer: QuizAnswer = {
        questionId: currentQuestion.id,
        value,
        label,
      }

      const updatedAnswers = [
        ...answers.filter((a) => a.questionId !== currentQuestion.id),
        newAnswer,
      ]
      setAnswers(updatedAnswers)

      if (currentStep < QUIZ_QUESTIONS.length - 1) {
        setCurrentStep((prev) => prev + 1)
        setSelectedOption(null)
      } else {
        // Generate recommendation
        const course = findRecommendedCourse(updatedAnswers)
        setRecommendedCourse(course)
        setIsCompleted(true)
        onCourseRecommended?.(course!)
      }
    }, 300)
  }

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      setSelectedOption(null)
    }
  }

  const restartQuiz = () => {
    setCurrentStep(0)
    setAnswers([])
    setIsCompleted(false)
    setRecommendedCourse(null)
    setSelectedOption(null)
  }

  if (isCompleted && recommendedCourse) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-3xl p-8 ${className}`}
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 bg-green-100 text-green-800 px-6 py-3 rounded-full mb-6"
          >
            <CheckCircle className="h-6 w-6" />
            <span className="font-bold">Perfect Match Found!</span>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Recommended Course for You
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Based on your preferences, we've found the perfect course that matches your academic
            goals and learning style
          </motion.p>
        </div>

        {/* Course Recommendation Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mb-8"
        >
          <div className="flex items-start gap-6 mb-6">
            <div className="text-5xl">
              {recommendedCourse.series === 'Foundation'
                ? '🌱'
                : recommendedCourse.series === 'Pursuit'
                  ? '🎯'
                  : recommendedCourse.series === 'Ascent'
                    ? '🚀'
                    : recommendedCourse.series === 'Pinnacle'
                      ? '👑'
                      : '🔥'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {recommendedCourse.series} Series
                </span>
                {recommendedCourse.badge && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {recommendedCourse.badge.replace('_', ' ').toUpperCase()}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{recommendedCourse.name}</h3>
              <p className="text-gray-600 leading-relaxed">{recommendedCourse.description}</p>
            </div>
          </div>

          {/* Course Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <Trophy className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-blue-900">
                {recommendedCourse.successRate}%
              </div>
              <div className="text-blue-700 text-sm">Success Rate</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-900">
                {recommendedCourse.batchSize} students
              </div>
              <div className="text-green-700 text-sm">Batch Size</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-purple-900">{recommendedCourse.duration}</div>
              <div className="text-purple-700 text-sm">Course Duration</div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  ₹{(recommendedCourse.currentPrice / 1000).toFixed(0)}K
                </div>
                {recommendedCourse.originalPrice > recommendedCourse.currentPrice && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 line-through">
                      ₹{(recommendedCourse.originalPrice / 1000).toFixed(0)}K
                    </span>
                    <span className="text-green-600 font-semibold">
                      Save ₹
                      {(
                        (recommendedCourse.originalPrice - recommendedCourse.currentPrice) /
                        1000
                      ).toFixed(0)}
                      K
                    </span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-gray-600 text-sm">EMI from</div>
                <div className="text-xl font-bold text-gray-900">
                  ₹{(recommendedCourse.installmentOptions[0]?.monthlyAmount / 1000).toFixed(1)}K/mo
                </div>
              </div>
            </div>
          </div>

          {/* Why This Course */}
          <div className="bg-green-50 rounded-xl p-6 mb-6">
            <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Why This Course is Perfect for You
            </h4>
            <div className="space-y-2">
              {answers.map((answer, idx) => (
                <div key={idx} className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">
                    You selected "{answer.label}" - This course excels in that area
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => onCourseRecommended?.(recommendedCourse)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            View Full Details
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            onClick={() => onBookDemo?.(recommendedCourse)}
            className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            Book Free Demo
            <Star className="h-5 w-5" />
          </button>
        </motion.div>

        <div className="text-center mt-6">
          <button
            onClick={restartQuiz}
            className="text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Take quiz again with different preferences
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div
      className={`bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden ${className}`}
    >
      {/* Header with Progress */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {currentQuestion.icon}
            <div>
              <h2 className="text-xl font-bold">Course Finder</h2>
              <p className="text-blue-100 text-sm">
                Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
              </p>
            </div>
          </div>
          {currentStep > 0 && (
            <button
              onClick={goBack}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm">Back</span>
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2">
          <motion.div
            className="bg-white rounded-full h-2"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <div className="text-right text-sm text-blue-100 mt-1">
          {Math.round(progressPercentage)}% complete
        </div>
      </div>

      {/* Question Content */}
      <div className="p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{currentQuestion.title}</h3>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {currentQuestion.subtitle}
              </p>
            </div>

            {/* Options */}
            <div className="grid gap-4 max-w-3xl mx-auto">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswer(option.value, option.label)}
                  className={`group relative bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-2xl p-6 text-left transition-all duration-300 ${
                    selectedOption === option.value
                      ? 'bg-blue-50 border-blue-400 scale-[0.98]'
                      : 'hover:scale-[1.02]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">{option.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                        {option.label}
                      </h4>
                      <p className="text-gray-600 mb-3 leading-relaxed">{option.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {option.benefits.map((benefit, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>

                  {selectedOption === option.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-1"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
