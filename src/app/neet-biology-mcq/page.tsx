'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  ChevronRight,
  RefreshCw,
  Award,
  Target,
  Brain,
  Trophy,
  Flame,
  Zap,
  Users,
  Send,
  AlertTriangle,
} from 'lucide-react'
import { QuestionCard } from '@/components/mcq/QuestionCard'
import { StatsPanel, StatsPanelCompact } from '@/components/mcq/StatsPanel'
import { TopicFilter } from '@/components/mcq/TopicFilter'
import { LeadCaptureModal } from '@/components/mcq/LeadCaptureModal'
import { ProtectedContent } from '@/components/mcq/ProtectedContent'
import type { MCQQuestion, AnswerResult, UserStats } from '@/lib/mcq/types'
import type { DifficultyLevel } from '@/generated/prisma'
import { BIOLOGY_TOPICS, LEAD_CAPTURE_CONFIG } from '@/lib/mcq/types'

export default function NEETBiologyMCQPage() {
  // Session & User State
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [freeUserId, setFreeUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Question State
  const [questions, setQuestions] = useState<MCQQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set())
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false)

  // Filter State
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null)
  const [isPYQOnly, setIsPYQOnly] = useState(false)
  const [selectedPYQYear, setSelectedPYQYear] = useState<number | null>(null)

  // Stats State
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [sessionStats, setSessionStats] = useState({
    questionsAttempted: 0,
    correctAnswers: 0,
    xpEarned: 0,
  })

  // UI State
  const [quizStarted, setQuizStarted] = useState(false)
  const [showLeadCapture, setShowLeadCapture] = useState(false)
  const [leadCaptureVariant, setLeadCaptureVariant] = useState<'soft' | 'hard'>('soft')
  const [hasLeadCaptured, setHasLeadCaptured] = useState(false)

  // Initialize session and load user data
  useEffect(() => {
    const initSession = async () => {
      try {
        // Check for existing freeUserId in localStorage
        const storedUserId = localStorage.getItem('mcq_free_user_id')
        if (storedUserId) {
          setFreeUserId(storedUserId)
          setHasLeadCaptured(true)
          // Fetch user stats
          const statsRes = await fetch(`/api/mcq/stats?freeUserId=${storedUserId}`)
          if (statsRes.ok) {
            const statsData = await statsRes.json()
            if (statsData.success) {
              setUserStats(statsData.data)
            }
          }
        }

        // Create a new session
        const sessionRes = await fetch('/api/mcq/stats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            freeUserId: storedUserId,
            userAgent: navigator.userAgent,
          }),
        })

        if (sessionRes.ok) {
          const sessionData = await sessionRes.json()
          if (sessionData.success) {
            setSessionId(sessionData.data.sessionId)
          }
        }
      } catch (err) {
        console.error('Failed to initialize session:', err)
      } finally {
        setIsLoading(false)
      }
    }

    initSession()
  }, [])

  // Fetch questions
  const fetchQuestions = useCallback(async () => {
    setIsLoadingQuestions(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      if (selectedTopic) params.append('topic', selectedTopic)
      if (selectedDifficulty) params.append('difficulty', selectedDifficulty)
      if (isPYQOnly) params.append('isPYQOnly', 'true')
      if (selectedPYQYear) params.append('pyqYear', selectedPYQYear.toString())
      params.append('limit', '20')

      // Exclude already answered questions
      if (answeredIds.size > 0) {
        params.append('excludeIds', Array.from(answeredIds).join(','))
      }

      const res = await fetch(`/api/mcq/questions?${params}`)
      if (!res.ok) throw new Error('Failed to fetch questions')

      const data = await res.json()
      if (data.success && data.data.questions.length > 0) {
        setQuestions(data.data.questions)
        setCurrentQuestionIndex(0)
      } else if (data.data.questions.length === 0) {
        setError('No more questions available with current filters. Try different filters.')
      }
    } catch (err) {
      setError('Failed to load questions. Please try again.')
      console.error(err)
    } finally {
      setIsLoadingQuestions(false)
    }
  }, [selectedTopic, selectedDifficulty, isPYQOnly, selectedPYQYear, answeredIds])

  // Handle answer submission
  const handleAnswer = useCallback(
    async (selectedAnswer: 'A' | 'B' | 'C' | 'D'): Promise<AnswerResult> => {
      const question = questions[currentQuestionIndex]
      if (!question || !sessionId) {
        throw new Error('Question or session not found')
      }

      const res = await fetch('/api/mcq/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.id,
          selectedAnswer,
          timeSpent: 30, // TODO: Track actual time
          sessionId,
          freeUserId,
          questionSource: question.source,
          topic: question.topic,
          difficulty: question.difficulty,
        }),
      })

      if (!res.ok) throw new Error('Failed to submit answer')

      const data = await res.json()
      if (!data.success) throw new Error(data.error || 'Submission failed')

      const result: AnswerResult = data.data

      // Update session stats
      setSessionStats((prev) => ({
        questionsAttempted: prev.questionsAttempted + 1,
        correctAnswers: prev.correctAnswers + (result.isCorrect ? 1 : 0),
        xpEarned: prev.xpEarned + result.xpEarned,
      }))

      // Mark question as answered
      setAnsweredIds((prev) => new Set([...prev, question.id]))

      // Update user stats if available
      if (freeUserId && userStats) {
        setUserStats((prev) =>
          prev
            ? {
                ...prev,
                totalXp: prev.totalXp + result.xpEarned,
                totalQuestions: prev.totalQuestions + 1,
                correctAnswers: prev.correctAnswers + (result.isCorrect ? 1 : 0),
                currentStreak: result.newStreak || prev.currentStreak,
              }
            : null
        )
      }

      // Check for lead capture trigger
      const totalAnswered = sessionStats.questionsAttempted + 1
      if (!hasLeadCaptured) {
        if (totalAnswered === LEAD_CAPTURE_CONFIG.softPromptAfter) {
          setLeadCaptureVariant('soft')
          setShowLeadCapture(true)
        } else if (totalAnswered === LEAD_CAPTURE_CONFIG.hardPromptAfter) {
          setLeadCaptureVariant('hard')
          setShowLeadCapture(true)
        }
      }

      return result
    },
    [
      questions,
      currentQuestionIndex,
      sessionId,
      freeUserId,
      userStats,
      sessionStats,
      hasLeadCaptured,
    ]
  )

  // Handle next question
  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      // Fetch more questions
      fetchQuestions()
    }
  }, [currentQuestionIndex, questions.length, fetchQuestions])

  // Handle lead capture submission
  const handleLeadCapture = async (data: {
    phone: string
    name?: string
    email?: string
    studentClass?: string
  }) => {
    try {
      // Create a free user record
      const res = await fetch('/api/free-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'mcq_practice',
          sessionId,
        }),
      })

      if (res.ok) {
        const userData = await res.json()
        if (userData.success && userData.data?.id) {
          setFreeUserId(userData.data.id)
          localStorage.setItem('mcq_free_user_id', userData.data.id)
          setHasLeadCaptured(true)
        }
      }
    } catch (err) {
      console.error('Lead capture failed:', err)
      throw err
    }
  }

  // Handle filter application
  const handleApplyFilters = () => {
    setAnsweredIds(new Set())
    setCurrentQuestionIndex(0)
    setQuestions([])
    fetchQuestions()
  }

  // Start quiz
  const handleStartQuiz = () => {
    setQuizStarted(true)
    fetchQuestions()
  }

  // Reset quiz
  const handleResetQuiz = () => {
    setQuizStarted(false)
    setQuestions([])
    setCurrentQuestionIndex(0)
    setAnsweredIds(new Set())
    setSessionStats({
      questionsAttempted: 0,
      correctAnswers: 0,
      xpEarned: 0,
    })
  }

  // Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many questions are asked from Biology in NEET?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'NEET has 90 questions from Biology (45 from Botany and 45 from Zoology). Biology carries 360 marks out of 720 total marks.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this MCQ practice free and unlimited?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our NEET Biology MCQ practice is completely free with unlimited questions. Practice as much as you want with PYQs and topic-wise questions.',
        },
      },
    ],
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading MCQ Practice...</p>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const sessionAccuracy =
    sessionStats.questionsAttempted > 0
      ? Math.round((sessionStats.correctAnswers / sessionStats.questionsAttempted) * 100)
      : 0

  return (
    <ProtectedContent>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* Breadcrumb */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-green-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-green-600 font-medium">NEET Biology MCQ</span>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Brain className="w-4 h-4" />
              Unlimited Free Practice
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              NEET Biology MCQ Practice 2026
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Free unlimited practice with PYQs, gamification, and topic-wise questions. Track your
              progress and compete on leaderboards!
            </p>
          </div>

          {/* Mobile Stats Bar */}
          {quizStarted && (
            <div className="lg:hidden mb-4">
              <StatsPanelCompact
                totalXp={userStats?.totalXp || sessionStats.xpEarned}
                currentLevel={userStats?.currentLevel || 1}
                currentStreak={userStats?.currentStreak || 0}
                sessionQuestions={sessionStats.questionsAttempted}
                sessionCorrect={sessionStats.correctAnswers}
              />
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {!quizStarted ? (
                <>
                  {/* Filter Section */}
                  <TopicFilter
                    selectedTopic={selectedTopic}
                    selectedDifficulty={selectedDifficulty}
                    isPYQOnly={isPYQOnly}
                    selectedPYQYear={selectedPYQYear}
                    onTopicChange={setSelectedTopic}
                    onDifficultyChange={setSelectedDifficulty}
                    onPYQOnlyChange={setIsPYQOnly}
                    onPYQYearChange={setSelectedPYQYear}
                    onApplyFilters={() => {}}
                  />

                  {/* Start Quiz Card */}
                  <div className="bg-white rounded-2xl shadow-xl p-8 text-center mt-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {selectedTopic || 'All Topics'} Practice
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Unlimited questions with instant feedback, explanations, and XP rewards!
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm">
                      <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full">
                        <Zap className="w-4 h-4" />
                        <span>Earn XP</span>
                      </div>
                      <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full">
                        <Flame className="w-4 h-4" />
                        <span>Build Streaks</span>
                      </div>
                      <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full">
                        <Trophy className="w-4 h-4" />
                        <span>Leaderboards</span>
                      </div>
                      <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full">
                        <Award className="w-4 h-4" />
                        <span>Badges</span>
                      </div>
                    </div>

                    <button
                      onClick={handleStartQuiz}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all text-lg"
                    >
                      Start Practicing
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Quiz Progress Bar */}
                  <div className="bg-white rounded-xl shadow-md p-4 mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-500">
                        Question {currentQuestionIndex + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-bold">
                          {sessionStats.correctAnswers}
                        </span>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-600">{sessionStats.questionsAttempted}</span>
                        <span className="text-gray-400 text-sm">({sessionAccuracy}%)</span>
                      </div>
                    </div>
                    <button
                      onClick={handleResetQuiz}
                      className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Reset
                    </button>
                  </div>

                  {/* Question Display */}
                  {isLoadingQuestions ? (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                      <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading questions...</p>
                    </div>
                  ) : error ? (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                      <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                      <p className="text-gray-700 mb-4">{error}</p>
                      <button
                        onClick={handleApplyFilters}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : currentQuestion ? (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentQuestion.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <QuestionCard
                          question={currentQuestion}
                          questionNumber={sessionStats.questionsAttempted + 1}
                          onAnswer={handleAnswer}
                          showExplanation={hasLeadCaptured}
                          isProtected={true}
                        />
                      </motion.div>
                    </AnimatePresence>
                  ) : null}

                  {/* Next Question Button */}
                  {currentQuestion && answeredIds.has(currentQuestion.id) && (
                    <div className="mt-4 text-center">
                      <button
                        onClick={handleNextQuestion}
                        disabled={isLoadingQuestions}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
                      >
                        Next Question
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="mt-6 flex flex-wrap gap-3 justify-center">
                    <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <Users className="w-4 h-4 text-blue-500" />
                      Leaderboard
                    </button>
                    <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <Send className="w-4 h-4 text-green-500" />
                      Submit Question
                    </button>
                    <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <Target className="w-4 h-4 text-amber-500" />
                      Daily Challenge
                    </button>
                  </div>
                </>
              )}

              {/* Features Section (only when not started) */}
              {!quizStarted && (
                <div className="mt-12 grid md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                      <BookOpen className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Unlimited Practice</h3>
                    <p className="text-gray-600 text-sm">
                      No limits! Practice as many questions as you want. New questions added weekly.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                      <Award className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">PYQ Support</h3>
                    <p className="text-gray-600 text-sm">
                      Practice Previous Year Questions from 2015-2024 with year-wise filtering.
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                      <Trophy className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Compete & Win</h3>
                    <p className="text-gray-600 text-sm">
                      Earn XP, unlock badges, and compete on leaderboards with other aspirants.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Stats Panel (Desktop) */}
            {quizStarted && (
              <div className="hidden lg:block w-80">
                <StatsPanel
                  totalXp={userStats?.totalXp || sessionStats.xpEarned}
                  currentLevel={userStats?.currentLevel || 1}
                  levelProgress={userStats?.levelProgress || 0}
                  currentStreak={userStats?.currentStreak || 0}
                  accuracy={userStats?.accuracy || sessionAccuracy}
                  totalQuestions={userStats?.totalQuestions || sessionStats.questionsAttempted}
                  correctAnswers={userStats?.correctAnswers || sessionStats.correctAnswers}
                  sessionQuestions={sessionStats.questionsAttempted}
                  sessionCorrect={sessionStats.correctAnswers}
                />
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Want Expert Guidance for NEET Biology?</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Join Cerebrum Biology Academy for comprehensive NEET Biology preparation with
              experienced AIIMS faculty and personalized attention.
            </p>
            <Link
              href="/demo"
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Book Free Demo Class
            </Link>
          </div>

          {/* Related Links */}
          <div className="mt-12 text-center text-sm text-gray-500">
            <p>
              Related:{' '}
              <Link href="/neet-biology-syllabus-2026" className="text-green-600 hover:underline">
                NEET Biology Syllabus 2026
              </Link>{' '}
              |{' '}
              <Link href="/neet-rank-predictor" className="text-green-600 hover:underline">
                NEET Rank Predictor
              </Link>{' '}
              |{' '}
              <Link href="/neet-college-predictor" className="text-green-600 hover:underline">
                College Predictor
              </Link>
            </p>
          </div>
        </div>

        {/* Lead Capture Modal */}
        <LeadCaptureModal
          isOpen={showLeadCapture}
          onClose={() => setShowLeadCapture(false)}
          onSubmit={handleLeadCapture}
          questionsAnswered={sessionStats.questionsAttempted}
          accuracy={sessionAccuracy}
          xpEarned={sessionStats.xpEarned}
          variant={leadCaptureVariant}
        />
      </div>
    </ProtectedContent>
  )
}
