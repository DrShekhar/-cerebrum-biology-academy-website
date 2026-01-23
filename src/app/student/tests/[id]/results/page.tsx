'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Trophy,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  BarChart3,
  FileText,
  ChevronDown,
  ChevronUp,
  Loader2,
  MessageSquare,
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
  correctAnswer: number
  explanation: string | null
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

interface Results {
  totalScore: number
  percentage: number
  questionsAttempted: number
  questionsCorrect: number
  questionsWrong: number
  questionsSkipped: number
  teacherFeedback: string | null
}

export default function TestResultsPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()

  const [testData, setTestData] = useState<TestData | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [results, setResults] = useState<Results | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)
  const [showAllQuestions, setShowAllQuestions] = useState(false)

  const testId = params.id as string

  const fetchResults = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/student/tests/${testId}`)
      const data = await response.json()

      if (data.success) {
        if (data.test.status !== 'SUBMITTED' && data.test.status !== 'GRADED') {
          router.push(`/student/tests/${testId}`)
          return
        }

        setTestData(data.test)
        setQuestions(data.questions)
        setResults(data.results)
      } else {
        setError(data.error || 'Failed to fetch results')
      }
    } catch (err) {
      setError('Failed to load results. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [testId, router])

  useEffect(() => {
    if (isAuthenticated) {
      fetchResults()
    }
  }, [isAuthenticated, fetchResults])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    }
    return `${minutes}m ${secs}s`
  }

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' }
    if (percentage >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' }
    if (percentage >= 70) return { grade: 'B+', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (percentage >= 60) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (percentage >= 50) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (percentage >= 40) return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-100' }
    return { grade: 'F', color: 'text-red-600', bg: 'bg-red-100' }
  }

  const getAnswerForQuestion = (questionId: string) => {
    return testData?.answers?.find((a) => a.questionId === questionId)
  }

  const getQuestionStatus = (question: Question) => {
    const answer = getAnswerForQuestion(question.questionId)
    if (answer?.selectedAnswer === null || answer?.selectedAnswer === undefined) {
      return 'skipped'
    }
    return answer.selectedAnswer === question.correctAnswer ? 'correct' : 'wrong'
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading results...</p>
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
            <p className="text-gray-600 mb-6">Please login to view results.</p>
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

  if (!testData || !results) {
    return null
  }

  const gradeInfo = getGrade(results.percentage)
  const isPassed = testData.passingMarks
    ? results.totalScore >= testData.passingMarks
    : results.percentage >= 40

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/student/tests"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tests
        </Link>

        {/* Header Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="mb-6 overflow-hidden">
            <div
              className={cn(
                'p-6 text-white',
                isPassed
                  ? 'bg-green-600'
                  : 'bg-red-600'
              )}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold mb-1">{testData.title}</h1>
                  <p className="text-white/80">
                    {testData.status === 'GRADED' ? 'Graded' : 'Submitted'} on{' '}
                    {testData.submittedAt &&
                      new Date(testData.submittedAt).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className={cn(
                      'w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto',
                      gradeInfo.bg,
                      gradeInfo.color
                    )}
                  >
                    {gradeInfo.grade}
                  </div>
                  <p className="text-white/80 text-sm mt-2">{isPassed ? 'Passed' : 'Not Passed'}</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    {results.percentage.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-500">Score</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    {results.totalScore}/{testData.totalMarks}
                  </div>
                  <div className="text-sm text-gray-500">Marks</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-8 h-8 text-purple-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    {testData.timeSpent ? formatTime(testData.timeSpent) : '-'}
                  </div>
                  <div className="text-sm text-gray-500">Time Taken</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <BarChart3 className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    {results.questionsAttempted}/{testData.totalQuestions}
                  </div>
                  <div className="text-sm text-gray-500">Attempted</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {results.questionsCorrect}
                    </div>
                    <div className="text-sm text-gray-500">Correct</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <XCircle className="w-8 h-8 text-red-500" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{results.questionsWrong}</div>
                    <div className="text-sm text-gray-500">Wrong</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-l-4 border-l-gray-400">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-8 h-8 text-gray-400" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {results.questionsSkipped}
                    </div>
                    <div className="text-sm text-gray-500">Skipped</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Teacher Feedback */}
        {results.teacherFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="mb-6 border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  Teacher Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{results.teacherFeedback}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Question Review */}
        {testData.showAnswers && questions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="w-5 h-5" />
                    Question Review
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAllQuestions(!showAllQuestions)}
                  >
                    {showAllQuestions ? 'Collapse All' : 'Expand All'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {questions.map((question, index) => {
                    const status = getQuestionStatus(question)
                    const answer = getAnswerForQuestion(question.questionId)
                    const isExpanded = expandedQuestion === index || showAllQuestions

                    return (
                      <div
                        key={question.id}
                        className={cn(
                          'border rounded-lg overflow-hidden',
                          status === 'correct'
                            ? 'border-green-200'
                            : status === 'wrong'
                              ? 'border-red-200'
                              : 'border-gray-200'
                        )}
                      >
                        <button
                          onClick={() => setExpandedQuestion(isExpanded ? null : index)}
                          className="w-full p-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold',
                                status === 'correct'
                                  ? 'bg-green-100 text-green-700'
                                  : status === 'wrong'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-gray-100 text-gray-600'
                              )}
                            >
                              {status === 'correct' ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : status === 'wrong' ? (
                                <XCircle className="w-5 h-5" />
                              ) : (
                                index + 1
                              )}
                            </div>
                            <span className="text-left text-sm text-gray-700 line-clamp-1">
                              {question.question}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={cn(
                                'px-2 py-0.5 rounded text-xs font-medium',
                                status === 'correct'
                                  ? 'bg-green-100 text-green-700'
                                  : status === 'wrong'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-gray-100 text-gray-600'
                              )}
                            >
                              {status === 'correct'
                                ? `+${question.marks}`
                                : status === 'wrong'
                                  ? question.negativeMarks
                                    ? `-${question.negativeMarks}`
                                    : '0'
                                  : '0'}
                            </span>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="p-4 bg-gray-50 border-t">
                            <p className="text-gray-900 mb-4">{question.question}</p>

                            <div className="space-y-2 mb-4">
                              {question.options.map((option, optIndex) => {
                                const isCorrect = optIndex === question.correctAnswer
                                const isSelected = answer?.selectedAnswer === optIndex

                                return (
                                  <div
                                    key={optIndex}
                                    className={cn(
                                      'p-3 rounded-lg flex items-center gap-3',
                                      isCorrect
                                        ? 'bg-green-100 border border-green-300'
                                        : isSelected
                                          ? 'bg-red-100 border border-red-300'
                                          : 'bg-white border border-gray-200'
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        'w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold',
                                        isCorrect
                                          ? 'bg-green-600 text-white'
                                          : isSelected
                                            ? 'bg-red-500 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                      )}
                                    >
                                      {String.fromCharCode(65 + optIndex)}
                                    </div>
                                    <span
                                      className={cn(
                                        'text-sm',
                                        isCorrect
                                          ? 'text-green-800'
                                          : isSelected
                                            ? 'text-red-800'
                                            : 'text-gray-700'
                                      )}
                                    >
                                      {option}
                                    </span>
                                    {isCorrect && (
                                      <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                                    )}
                                    {isSelected && !isCorrect && (
                                      <XCircle className="w-4 h-4 text-red-600 ml-auto" />
                                    )}
                                  </div>
                                )
                              })}
                            </div>

                            {question.explanation && (
                              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-sm font-medium text-blue-800 mb-1">
                                  Explanation:
                                </p>
                                <p className="text-sm text-blue-700">{question.explanation}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/student/tests">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tests
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
