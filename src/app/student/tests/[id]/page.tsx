'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Clock,
  AlertTriangle,
  Flag,
  ChevronLeft,
  ChevronRight,
  Send,
  Loader2,
  AlertCircle,
  Timer,
  FileText,
  Target,
  Info,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Question {
  id: string
  questionId: string
  orderIndex: number
  marks: number
  negativeMarks: number | null
  question: string
  options: string[]
  type: string
  topic: string | null
  difficulty: string
  correctAnswer?: number
  explanation?: string
}

interface TestData {
  submissionId: string
  testId: string
  title: string
  description: string
  instructions: string
  difficulty: string
  totalQuestions: number
  totalMarks: number
  duration: number
  negativeMarking: boolean
  negativeMarkValue: number | null
  passingMarks: number | null
  dueDate: string
  teacher: {
    id: string
    name: string
  }
  status: string
  startedAt: string | null
  submittedAt: string | null
  timeSpent: number | null
  remainingTime: number | null
  answers: Answer[] | null
  isAvailable: boolean
  isPastDue: boolean
  showAnswers: boolean
}

interface Answer {
  questionId: string
  selectedAnswer: number | null
  isMarkedForReview: boolean
}

export default function StudentTestPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()

  const [testData, setTestData] = useState<TestData | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Answer[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [remainingTime, setRemainingTime] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [testState, setTestState] = useState<'loading' | 'preview' | 'taking' | 'submitting'>(
    'loading'
  )
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const testId = params.id as string

  const fetchTestData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/student/tests/${testId}`)
      const data = await response.json()

      if (data.success) {
        setTestData(data.test)
        setQuestions(data.questions)

        if (data.test.answers && data.test.answers.length > 0) {
          setAnswers(data.test.answers)
        } else {
          const initialAnswers: Answer[] = data.questions.map((q: Question) => ({
            questionId: q.questionId,
            selectedAnswer: null,
            isMarkedForReview: false,
          }))
          setAnswers(initialAnswers)
        }

        if (data.test.remainingTime !== null) {
          setRemainingTime(data.test.remainingTime)
        } else {
          setRemainingTime(data.test.duration * 60)
        }

        if (data.test.status === 'IN_PROGRESS') {
          setTestState('taking')
        } else if (data.test.status === 'SUBMITTED' || data.test.status === 'GRADED') {
          router.push(`/student/tests/${testId}/results`)
        } else {
          setTestState('preview')
        }
      } else {
        setError(data.error || 'Failed to fetch test')
      }
    } catch (err) {
      setError('Failed to load test. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [testId, router])

  useEffect(() => {
    if (isAuthenticated) {
      fetchTestData()
    }
  }, [isAuthenticated, fetchTestData])

  useEffect(() => {
    if (testState === 'taking' && remainingTime !== null && remainingTime > 0) {
      timerIntervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev === null || prev <= 0) {
            if (timerIntervalRef.current) {
              clearInterval(timerIntervalRef.current)
            }
            handleAutoSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current)
      }
    }
  }, [testState])

  useEffect(() => {
    if (testState === 'taking') {
      saveIntervalRef.current = setInterval(() => {
        saveProgress()
      }, 30000)
    }

    return () => {
      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current)
      }
    }
  }, [testState, answers, remainingTime])

  const saveProgress = async (forceSubmit = false) => {
    if (!testData || isSaving) return

    try {
      setIsSaving(true)
      const timeSpent = testData.duration * 60 - (remainingTime || 0)

      await fetch(`/api/student/tests/${testId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          timeSpent,
          remainingTime,
          submit: forceSubmit,
        }),
      })
    } catch (err) {
      console.error('Failed to save progress:', err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleStartTest = async () => {
    try {
      setTestState('submitting')
      const response = await fetch(`/api/student/tests/${testId}`, {
        method: 'POST',
      })
      const data = await response.json()

      if (data.success) {
        setRemainingTime(data.submission.remainingTime)
        setTestState('taking')
      } else {
        setError(data.error || 'Failed to start test')
        setTestState('preview')
      }
    } catch (err) {
      setError('Failed to start test. Please try again.')
      setTestState('preview')
    }
  }

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers((prev) =>
      prev.map((answer) =>
        answer.questionId === questions[currentQuestionIndex].questionId
          ? { ...answer, selectedAnswer: optionIndex }
          : answer
      )
    )
  }

  const handleMarkForReview = () => {
    setAnswers((prev) =>
      prev.map((answer) =>
        answer.questionId === questions[currentQuestionIndex].questionId
          ? { ...answer, isMarkedForReview: !answer.isMarkedForReview }
          : answer
      )
    )
  }

  const handleClearAnswer = () => {
    setAnswers((prev) =>
      prev.map((answer) =>
        answer.questionId === questions[currentQuestionIndex].questionId
          ? { ...answer, selectedAnswer: null }
          : answer
      )
    )
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSubmitTest = async () => {
    try {
      setTestState('submitting')
      setShowSubmitConfirm(false)

      const timeSpent = testData ? testData.duration * 60 - (remainingTime || 0) : 0

      const response = await fetch(`/api/student/tests/${testId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          timeSpent,
          remainingTime: 0,
          submit: true,
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push(`/student/tests/${testId}/results`)
      } else {
        setError(data.error || 'Failed to submit test')
        setTestState('taking')
      }
    } catch (err) {
      setError('Failed to submit test. Please try again.')
      setTestState('taking')
    }
  }

  const handleAutoSubmit = () => {
    handleSubmitTest()
  }

  const handleExit = () => {
    saveProgress()
    router.push('/student/tests')
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const getAnsweredCount = () => answers.filter((a) => a.selectedAnswer !== null).length
  const getMarkedCount = () => answers.filter((a) => a.isMarkedForReview).length
  const getUnansweredCount = () => answers.filter((a) => a.selectedAnswer === null).length

  const currentQuestion = questions[currentQuestionIndex]
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion?.questionId)

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading test...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Login Required</h2>
            <p className="text-gray-600 mb-6">Please login to take this test.</p>
            <Link href="/sign-in">
              <Button className="w-full">Login to Continue</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link href="/student/tests">
              <Button className="w-full">Back to Tests</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (testState === 'preview' && testData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{testData.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {testData.description && <p className="text-gray-600">{testData.description}</p>}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <FileText className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">{testData.totalQuestions}</div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center">
                  <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">{testData.totalMarks}</div>
                  <div className="text-sm text-gray-600">Total Marks</div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg text-center">
                  <Timer className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">{testData.duration}</div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                  <AlertTriangle className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">
                    {testData.negativeMarking ? 'Yes' : 'No'}
                  </div>
                  <div className="text-sm text-gray-600">Negative Marking</div>
                </div>
              </div>

              {testData.instructions && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Instructions
                  </h3>
                  <p className="text-gray-600 whitespace-pre-wrap">{testData.instructions}</p>
                </div>
              )}

              {testData.negativeMarking && testData.negativeMarkValue && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-red-800 text-sm">
                    <strong>Note:</strong> This test has negative marking.{' '}
                    {testData.negativeMarkValue} marks will be deducted for each wrong answer.
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <Link href="/student/tests" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Back to Tests
                  </Button>
                </Link>
                <Button
                  onClick={handleStartTest}
                  className="flex-1"
                  disabled={!testData.isAvailable}
                >
                  {testData.isPastDue
                    ? 'Test Expired'
                    : !testData.isAvailable
                      ? 'Not Available Yet'
                      : 'Start Test'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (testState === 'submitting') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Submitting your test...</p>
        </div>
      </div>
    )
  }

  if (testState === 'taking' && testData && currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 py-3 sticky top-0 z-20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowExitConfirm(true)}
                className="text-gray-600 hover:text-gray-900 font-medium text-sm"
              >
                Exit
              </button>
              <span className="text-gray-400">|</span>
              <span className="font-medium text-gray-900 text-sm truncate max-w-[200px]">
                {testData.title}
              </span>
            </div>

            <div
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-lg font-bold',
                remainingTime !== null && remainingTime <= 300
                  ? 'bg-red-100 text-red-700 animate-pulse'
                  : 'bg-blue-100 text-blue-700'
              )}
            >
              <Clock className="w-5 h-5" />
              {remainingTime !== null ? formatTime(remainingTime) : '--:--'}
            </div>

            <div className="flex items-center gap-4 text-sm">
              <span className="text-green-600 font-medium">
                {getAnsweredCount()}/{questions.length} Answered
              </span>
              {isSaving && (
                <span className="text-gray-400 flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Saving...
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Main Content */}
          <div className="flex-1 p-4 lg:p-6 overflow-auto">
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-6">
                {/* Question Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm text-gray-500">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'px-3 py-1 rounded-full text-xs font-semibold',
                        currentQuestion.difficulty === 'EASY'
                          ? 'bg-green-100 text-green-800'
                          : currentQuestion.difficulty === 'MEDIUM'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      )}
                    >
                      {currentQuestion.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      {currentQuestion.marks} marks
                    </span>
                  </div>
                </div>

                {/* Question */}
                <div className="mb-8">
                  <h2 className="text-lg font-medium text-gray-900 leading-relaxed">
                    {currentQuestion.question}
                  </h2>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={cn(
                        'p-4 rounded-xl border-2 cursor-pointer transition-all',
                        currentAnswer?.selectedAnswer === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                            currentAnswer?.selectedAnswer === index
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                          )}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-gray-900">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleClearAnswer}>
                      Clear
                    </Button>
                    <Button
                      variant={currentAnswer?.isMarkedForReview ? 'default' : 'outline'}
                      size="sm"
                      onClick={handleMarkForReview}
                      className={
                        currentAnswer?.isMarkedForReview ? 'bg-yellow-500 hover:bg-yellow-600' : ''
                      }
                    >
                      <Flag className="w-4 h-4 mr-1" />
                      {currentAnswer?.isMarkedForReview ? 'Marked' : 'Mark for Review'}
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    {currentQuestionIndex === questions.length - 1 ? (
                      <Button
                        onClick={() => setShowSubmitConfirm(true)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Submit Test
                      </Button>
                    ) : (
                      <Button onClick={handleNext}>
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question Navigator - Desktop */}
          <div className="hidden lg:block w-72 bg-white border-l border-gray-200 p-4 overflow-auto">
            <h3 className="font-semibold text-gray-900 mb-4">Question Navigator</h3>

            <div className="grid grid-cols-5 gap-2 mb-6">
              {questions.map((_, index) => {
                const answer = answers[index]
                const isAnswered = answer?.selectedAnswer !== null
                const isMarked = answer?.isMarkedForReview
                const isCurrent = index === currentQuestionIndex

                return (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={cn(
                      'w-10 h-10 rounded-lg text-sm font-semibold transition-all',
                      isCurrent && 'ring-2 ring-blue-500',
                      isAnswered && isMarked
                        ? 'bg-yellow-500 text-white'
                        : isAnswered
                          ? 'bg-green-600 text-white'
                          : isMarked
                            ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    )}
                  >
                    {index + 1}
                  </button>
                )
              })}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-600"></div>
                <span className="text-gray-600">Answered ({getAnsweredCount()})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-gray-100 border border-gray-300"></div>
                <span className="text-gray-600">Unanswered ({getUnansweredCount()})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-yellow-500"></div>
                <span className="text-gray-600">Marked for Review ({getMarkedCount()})</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={() => setShowSubmitConfirm(true)}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Test
              </Button>
            </div>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md mx-4 w-full"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Submit Test?</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Questions:</span>
                  <span className="font-medium">{questions.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Answered:</span>
                  <span className="font-medium text-green-600">{getAnsweredCount()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Unanswered:</span>
                  <span className="font-medium text-red-600">{getUnansweredCount()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Marked for Review:</span>
                  <span className="font-medium text-yellow-600">{getMarkedCount()}</span>
                </div>
              </div>

              {getUnansweredCount() > 0 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>Warning:</strong> You have {getUnansweredCount()} unanswered questions.
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowSubmitConfirm(false)}
                  className="flex-1"
                >
                  Review Again
                </Button>
                <Button
                  onClick={handleSubmitTest}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Submit Now
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Exit Confirmation Modal */}
        {showExitConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md mx-4 w-full"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Exit Test?</h3>
              <p className="text-gray-600 mb-6">
                Your progress will be saved. You can continue the test later.
              </p>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowExitConfirm(false)}
                  className="flex-1"
                >
                  Continue Test
                </Button>
                <Button onClick={handleExit} variant="destructive" className="flex-1">
                  Exit & Save
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    )
  }

  return null
}
