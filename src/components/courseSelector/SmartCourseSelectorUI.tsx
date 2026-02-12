'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Users,
  Calculator,
  Award,
  TrendingUp,
  Shield,
  BookOpen,
  Target,
  Crown,
  Gem,
} from 'lucide-react'
import {
  QualificationQuestion,
  QualificationAnswers,
  CourseRecommendation,
  CourseQualificationEngine,
  isQualificationComplete,
  getQualificationProgress,
  QUALIFICATION_QUESTIONS,
} from '@/lib/courseQualification/qualificationLogic'

interface SmartCourseSelectorUIProps {
  onRecommendationComplete?: (recommendation: CourseRecommendation) => void
}

// Progress Indicator Component
function ProgressIndicator({
  currentStep,
  totalSteps,
  progress,
}: {
  currentStep: number
  totalSteps: number
  progress: number
}) {
  return (
    <div className="w-full mb-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mt-3">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className="flex flex-col items-center">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  i < currentStep
                    ? 'bg-green-600 text-white'
                    : i === currentStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
              </motion.div>
              <span className="text-xs text-gray-500 mt-1 text-center">
                {i === 0 && 'Class'}
                {i === 1 && 'Goals'}
                {i === 2 && 'Style'}
                {i === 3 && 'Budget'}
                {i === 4 && 'Hours'}
                {i === 5 && 'Experience'}
                {i === 6 && 'Areas'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Text */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-semibold text-blue-600">{progress}% Complete</span>
      </div>
    </div>
  )
}

// Interactive Question Card Component
function QuestionCard({
  question,
  selectedValue,
  onAnswerSelect,
}: {
  question: QualificationQuestion
  selectedValue: string | string[]
  onAnswerSelect: (value: string | string[]) => void
}) {
  const handleOptionSelect = (optionValue: string) => {
    if (question.type === 'multiple') {
      const currentValues = Array.isArray(selectedValue) ? selectedValue : []
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue]
      onAnswerSelect(newValues)
    } else {
      onAnswerSelect(optionValue)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{question.question}</h3>
        {question.type === 'multiple' && (
          <p className="text-sm text-gray-600">Select all that apply</p>
        )}
      </div>

      <div className="grid gap-3">
        {question.options?.map((option) => {
          const isSelected =
            question.type === 'multiple'
              ? Array.isArray(selectedValue) && selectedValue.includes(option.value)
              : selectedValue === option.value

          return (
            <motion.button
              key={option.value}
              onClick={() => handleOptionSelect(option.value)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                p-4 rounded-xl border-2 text-left transition-all min-h-[60px] flex items-center
                ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700'
                }
              `}
            >
              <div className="flex items-center w-full">
                <div className="flex-shrink-0 mr-4 text-2xl">{option.icon}</div>
                <div className="flex-grow">
                  <div className="font-semibold">{option.label}</div>
                  {option.description && (
                    <div className="text-sm opacity-75 mt-1">{option.description}</div>
                  )}
                </div>
                {isSelected && <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />}
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

// Series Color Theme Helper
function getSeriesTheme(seriesId: string) {
  switch (seriesId) {
    case 'pinnacle':
      return {
        gradient: 'from-purple-500 to-indigo-600',
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-900',
        accent: 'text-purple-600',
        button: 'bg-purple-600 hover:bg-purple-700',
        icon: Crown,
      }
    case 'ascent':
      return {
        gradient: 'from-blue-500 to-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-900',
        accent: 'text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700',
        icon: Target,
      }
    case 'pursuit':
      return {
        gradient: 'bg-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-900',
        accent: 'text-green-600',
        button: 'bg-green-600 hover:bg-green-700',
        icon: Gem,
      }
    default:
      return {
        gradient: 'from-gray-500 to-gray-700',
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        text: 'text-gray-900',
        accent: 'text-gray-600',
        button: 'bg-gray-600 hover:bg-gray-700',
        icon: BookOpen,
      }
  }
}

// Fee Calculator Component
function FeeCalculator({
  totalFee,
  seriesId,
  planId,
}: {
  totalFee: number
  seriesId: string
  planId: string
}) {
  const [installmentMonths, setInstallmentMonths] = useState(12)
  const [processingFee] = useState(2000)

  const monthlyEMI = Math.ceil((totalFee + processingFee) / installmentMonths)
  const theme = getSeriesTheme(seriesId)

  const installmentOptions = [
    { months: 6, label: '6 Months', discount: 5 },
    { months: 12, label: '1 Year', discount: 0 },
    { months: 18, label: '1.5 Years', discount: -3 },
    { months: 24, label: '2 Years', discount: -5 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${theme.bg} ${theme.border} border-2 rounded-xl p-6`}
    >
      <div className="flex items-center mb-4">
        <Calculator className={`w-5 h-5 ${theme.accent} mr-2`} />
        <h4 className={`font-bold ${theme.text}`}>Fee Calculator</h4>
      </div>

      {/* Total Fee Display */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-gray-900">₹{totalFee.toLocaleString()}</div>
        <div className="text-sm text-gray-600">Total Course Fee</div>
      </div>

      {/* Installment Options */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700 mb-3 block">
          Choose Payment Plan:
        </label>
        <div className="grid grid-cols-2 gap-2">
          {installmentOptions.map((option) => (
            <button
              key={option.months}
              onClick={() => setInstallmentMonths(option.months)}
              className={`
                p-3 rounded-lg border-2 text-center transition-all
                ${
                  installmentMonths === option.months
                    ? `${theme.button.split(' ')[0]} border-current text-white`
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }
              `}
            >
              <div className="font-semibold text-sm">{option.label}</div>
              {option.discount !== 0 && (
                <div className="text-xs opacity-75">
                  {option.discount > 0
                    ? `${option.discount}% off`
                    : `+${Math.abs(option.discount)}% fee`}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* EMI Breakdown */}
      <div className={`${theme.bg} rounded-lg p-4 border ${theme.border}`}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Monthly EMI</span>
          <span className="text-xl font-bold text-gray-900">₹{monthlyEMI.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Processing Fee</span>
          <span>₹{processingFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600 pt-2 border-t border-gray-200 mt-2">
          <span>Total Amount</span>
          <span>₹{(totalFee + processingFee).toLocaleString()}</span>
        </div>
      </div>

      {/* Quick Action */}
      <button
        className={`w-full ${theme.button} text-white py-3 rounded-lg font-semibold mt-4 transition-colors`}
      >
        💳 Secure Payment Gateway
      </button>
    </motion.div>
  )
}

// Success Rate & Confidence Building Component
function SuccessIndicators({ seriesId }: { seriesId: string }) {
  const theme = getSeriesTheme(seriesId)
  const IconComponent = theme.icon

  const successMetrics = {
    pinnacle: {
      successRate: 98.5,
      avgRank: 'Top 500',
      students: '1,50,000+',
      colleges: 'AIIMS/Top Medical',
    },
    ascent: {
      successRate: 98,
      avgRank: 'Top 2000',
      students: '1,50,000+',
      colleges: 'Government Medical',
    },
    pursuit: {
      successRate: 89.7,
      avgRank: 'Top 5000',
      students: '25,000+',
      colleges: 'Medical Colleges',
    },
  }

  const metrics = successMetrics[seriesId as keyof typeof successMetrics] || successMetrics.ascent

  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`${theme.bg} rounded-xl p-4 text-center ${theme.border} border`}
      >
        <div className="flex items-center justify-center mb-2">
          <TrendingUp className={`w-5 h-5 ${theme.accent} mr-1`} />
          <span className="text-2xl font-bold text-green-600">{metrics.successRate}%</span>
        </div>
        <div className="text-xs text-gray-600">NEET Success Rate</div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`${theme.bg} rounded-xl p-4 text-center ${theme.border} border`}
      >
        <div className="flex items-center justify-center mb-2">
          <Award className={`w-5 h-5 ${theme.accent} mr-1`} />
          <span className="text-lg font-bold text-gray-900">{metrics.avgRank}</span>
        </div>
        <div className="text-xs text-gray-600">Average NEET Rank</div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`${theme.bg} rounded-xl p-4 text-center ${theme.border} border`}
      >
        <div className="flex items-center justify-center mb-2">
          <Users className={`w-5 h-5 ${theme.accent} mr-1`} />
          <span className="text-lg font-bold text-gray-900">{metrics.students}</span>
        </div>
        <div className="text-xs text-gray-600">Success Stories</div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={`${theme.bg} rounded-xl p-4 text-center ${theme.border} border`}
      >
        <div className="flex items-center justify-center mb-2">
          <Shield className={`w-5 h-5 ${theme.accent} mr-1`} />
          <span className="text-xs font-bold text-gray-900">{metrics.colleges}</span>
        </div>
        <div className="text-xs text-gray-600">Top Admissions</div>
      </motion.div>
    </div>
  )
}

// Course Recommendation Card Component
function RecommendationCard({
  recommendation,
  showCalculator = false,
}: {
  recommendation: CourseRecommendation
  showCalculator?: boolean
}) {
  const theme = getSeriesTheme(recommendation.seriesId)
  const IconComponent = theme.icon

  // Mock pricing data (should come from actual course data)
  const pricingData = {
    pinnacle: { A: 150000, B: 120000, C: 98000 },
    ascent: { A: 98000, B: 76000, C: 58000 },
    pursuit: { A: 78000, B: 58000, C: 48000 },
  }

  const totalFee =
    pricingData[recommendation.seriesId as keyof typeof pricingData]?.[
      recommendation.planId as keyof typeof pricingData.pinnacle
    ] || 58000

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100"
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${theme.gradient} text-white p-6 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">
            {recommendation.seriesId.charAt(0).toUpperCase() + recommendation.seriesId.slice(1)}{' '}
            Series
          </h3>
          <p className="text-white/90">Plan {recommendation.planId}</p>

          {/* Match Score */}
          <div className="mt-4 inline-block bg-white/20 rounded-full px-4 py-2">
            <span className="text-sm font-semibold">
              {recommendation.matchScore}% Perfect Match
            </span>
          </div>
        </div>

        {/* Recommended Badge */}
        <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
          ⭐ Recommended
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Success Indicators */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">Success Metrics</h4>
          <SuccessIndicators seriesId={recommendation.seriesId} />
        </div>

        {/* Reasoning */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">Why This is Perfect for You</h4>
          <div className="space-y-2">
            {recommendation.reasoning.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start text-sm text-gray-700"
              >
                <Check className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>{reason}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Fee Calculator */}
        {showCalculator && (
          <div className="mb-6">
            <FeeCalculator
              totalFee={totalFee}
              seriesId={recommendation.seriesId}
              planId={recommendation.planId}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            className={`w-full ${theme.button} text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
          >
            🎯 Book FREE Demo Class
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              📋 Full Details
            </button>
            <button
              className={`bg-gradient-to-r ${theme.gradient} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
            >
              ⚡ Enroll Now
            </button>
          </div>
        </div>

        {/* Alternative Options */}
        {recommendation.alternativeOptions && recommendation.alternativeOptions.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-3">Also Consider</h4>
            <div className="space-y-2">
              {recommendation.alternativeOptions.map((alt, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <span className="font-medium text-gray-900">
                      {alt.seriesId.charAt(0).toUpperCase() + alt.seriesId.slice(1)} Plan{' '}
                      {alt.planId}
                    </span>
                    <div className="text-sm text-gray-600">{alt.reason}</div>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    View →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Main Smart Course Selector UI Component
export default function SmartCourseSelectorUI({
  onRecommendationComplete,
}: SmartCourseSelectorUIProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<QualificationAnswers>({})
  const [recommendation, setRecommendation] = useState<CourseRecommendation | null>(null)
  const [showCalculator, setShowCalculator] = useState(false)

  const applicableQuestions = QUALIFICATION_QUESTIONS.filter((q) => {
    if (q.dependsOn && !answers[q.dependsOn]) return false
    if (q.showIf && !q.showIf(answers)) return false
    return true
  })

  const currentQuestion = applicableQuestions[currentQuestionIndex]
  const progress = getQualificationProgress(answers)
  const isComplete = isQualificationComplete(answers)

  // Handle answer selection
  const handleAnswerSelect = (questionId: string, answer: string | string[]) => {
    const newAnswers = { ...answers, [questionId]: answer }
    setAnswers(newAnswers)

    // Auto-advance to next question for single-select
    if (currentQuestion?.type === 'single') {
      setTimeout(() => {
        if (currentQuestionIndex < applicableQuestions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1)
        } else if (isQualificationComplete(newAnswers)) {
          generateRecommendation(newAnswers)
        }
      }, 500)
    }
  }

  // Generate recommendation when qualification is complete
  const generateRecommendation = (finalAnswers: QualificationAnswers) => {
    const engine = new CourseQualificationEngine(finalAnswers)
    const rec = engine.generateRecommendation()
    setRecommendation(rec)
    onRecommendationComplete?.(rec)
  }

  // Navigation
  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const goNext = () => {
    if (currentQuestionIndex < applicableQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (isComplete) {
      generateRecommendation(answers)
    }
  }

  // Show recommendation if complete
  if (recommendation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🎉 Your Perfect NEET Course Match!
            </h1>
            <p className="text-gray-600">
              Based on your preferences, here's our AI-powered recommendation
            </p>
          </motion.div>

          {/* Recommendation Card */}
          <RecommendationCard recommendation={recommendation} showCalculator={showCalculator} />

          {/* Toggle Calculator */}
          <div className="text-center mt-6">
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              {showCalculator ? 'Hide' : 'Show'} Fee Calculator
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show qualification questions
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect NEET Course</h1>
          <p className="text-gray-600">
            Answer a few questions and get personalized course recommendations
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <ProgressIndicator
          currentStep={currentQuestionIndex}
          totalSteps={applicableQuestions.length}
          progress={progress}
        />

        {/* Question Card */}
        <AnimatePresence mode="wait">
          {currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionCard
                question={currentQuestion}
                selectedValue={(() => {
                  const answer = answers[currentQuestion.id]
                  if (answer === undefined) return currentQuestion.type === 'multiple' ? [] : ''
                  if (typeof answer === 'number') return String(answer)
                  return answer
                })()}
                onAnswerSelect={(answer) => handleAnswerSelect(currentQuestion.id, answer)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={goBack}
            disabled={currentQuestionIndex === 0}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>

          <button
            onClick={goNext}
            disabled={
              !answers[currentQuestion?.id] ||
              (currentQuestion?.type === 'multiple' &&
                (!Array.isArray(answers[currentQuestion.id]) ||
                  (answers[currentQuestion.id] as string[]).length === 0))
            }
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {currentQuestionIndex === applicableQuestions.length - 1
              ? 'Get Recommendation'
              : 'Next'}
            {currentQuestionIndex !== applicableQuestions.length - 1 && (
              <ChevronRight className="w-5 h-5 ml-1" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
