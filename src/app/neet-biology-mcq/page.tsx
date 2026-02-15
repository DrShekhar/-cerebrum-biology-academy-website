'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/Toast'
import { ChevronRight, Maximize2, Minimize2 } from 'lucide-react'
import QuestionRenderer from '@/components/mcq/QuestionRenderer'
import { StatsPanel, StatsPanelCompact } from '@/components/mcq/StatsPanel'
import { ContentSourceTabs, type ContentSource } from '@/components/mcq/ContentSourceTabs'
import { FilterPanel } from '@/components/mcq/FilterPanel'
import { NcertOptions } from '@/components/mcq/NcertOptions'
import { ModeRadio, type QuizMode } from '@/components/mcq/ModeRadio'
import { LeadCaptureModal } from '@/components/mcq/LeadCaptureModal'
import { ProtectedContent } from '@/components/mcq/ProtectedContent'
import { SessionSummary } from '@/components/mcq/SessionSummary'
import { ReportErrorModal } from '@/components/mcq/ReportErrorModal'
import { TimedModeTimer } from '@/components/mcq/TimedModeTimer'
import type { MCQQuestion, AnswerResult, UserStats } from '@/lib/mcq/types'
import type { WrongAnswer } from '@/components/mcq/WrongAnswersReview'
import type { DifficultyLevel } from '@/generated/prisma'
import { LEAD_CAPTURE_CONFIG } from '@/lib/mcq/types'

export default function NEETBiologyMCQPage() {
  const router = useRouter()
  const { showToast } = useToast()

  // Session & User State
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [freeUserId, setFreeUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sessionReady, setSessionReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Ref for accurate tracking (avoids stale closure issues)
  const questionsAttemptedRef = useRef(0)

  // Ref for auto-submit callback (avoids stale closure in timer)
  const autoSubmitRef = useRef<(() => void) | null>(null)

  // Question State
  const [questions, setQuestions] = useState<MCQQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answeredIds, setAnsweredIds] = useState<Set<string>>(new Set())
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false)

  // Filter State
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null)
  const [selectedPYQYear, setSelectedPYQYear] = useState<number | null>(null)
  const [questionCount, setQuestionCount] = useState(20)

  // Content Source State (new tab-based UI)
  const [contentSource, setContentSource] = useState<ContentSource>('all')

  // NCERT Filter State
  const [selectedNcertClass, setSelectedNcertClass] = useState<number | null>(null)
  const [selectedNeetWeightage, setSelectedNeetWeightage] = useState<string | null>(null)
  const [hasDiagramOnly, setHasDiagramOnly] = useState(false)

  // Derived states from contentSource
  const isNcertOnly = contentSource === 'ncert'
  const isPYQOnlyFromTabs = contentSource === 'pyq'

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
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [focusMode, setFocusMode] = useState(false)
  const [showSessionSummary, setShowSessionSummary] = useState(false)
  const [showReportError, setShowReportError] = useState(false)
  const [reportErrorQuestionId, setReportErrorQuestionId] = useState<string | null>(null)
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([])

  // Quiz Mode State
  const [quizMode, setQuizMode] = useState<QuizMode>('practice')
  const [reviewDueCount, setReviewDueCount] = useState(0)
  const [isTimerPaused, setIsTimerPaused] = useState(false)
  const [timerKey, setTimerKey] = useState(0) // Used to reset timer on question change

  // Session timer tracking
  const sessionStartTimeRef = useRef<number>(Date.now())
  const [sessionTimeElapsed, setSessionTimeElapsed] = useState(0)

  // Helper function to generate storage key for answered question IDs
  const getAnsweredIdsStorageKey = useCallback(() => {
    const parts = ['mcq_answered_ids']
    if (selectedTopic) parts.push(`topic_${selectedTopic}`)
    if (selectedChapter) parts.push(`chapter_${selectedChapter}`)
    parts.push(`source_${contentSource}`)
    if (contentSource === 'pyq' && selectedPYQYear) parts.push(`year_${selectedPYQYear}`)
    return parts.join('_')
  }, [selectedTopic, selectedChapter, contentSource, selectedPYQYear])

  // Load answered IDs from localStorage for resume functionality
  const loadAnsweredIdsFromStorage = useCallback(() => {
    try {
      const key = getAnsweredIdsStorageKey()
      const raw = localStorage.getItem(key)
      if (raw) {
        const stored = JSON.parse(raw)
        const ids = Array.isArray(stored) ? stored : stored.ids
        return new Set<string>(ids)
      }
    } catch (err) {
      console.error('Failed to load answered IDs from storage:', err)
    }
    return new Set<string>()
  }, [getAnsweredIdsStorageKey])

  // Save answered IDs to localStorage
  const saveAnsweredIdsToStorage = useCallback(
    (ids: Set<string>) => {
      // Defer heavy JSON serialization and localStorage to avoid blocking INP
      const saveTask = () => {
        try {
          const key = getAnsweredIdsStorageKey()
          localStorage.setItem(
            key,
            JSON.stringify({ ids: Array.from(ids), updatedAt: Date.now() })
          )
        } catch (err) {
          if (err instanceof DOMException && err.name === 'QuotaExceededError') {
            console.error('localStorage quota exceeded, skipping save')
          } else {
            console.error('Failed to save answered IDs to storage:', err)
          }
        }
      }
      // Use requestIdleCallback for better performance, fallback to setTimeout
      if ('requestIdleCallback' in window) {
        requestIdleCallback(saveTask, { timeout: 2000 })
      } else {
        setTimeout(saveTask, 0)
      }
    },
    [getAnsweredIdsStorageKey]
  )

  // Cleanup old mcq localStorage entries on mount
  useEffect(() => {
    function cleanupOldMcqStorage() {
      const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000 // 30 days
      const now = Date.now()
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i)
        if (key?.startsWith('mcq_answered_ids_')) {
          try {
            const data = JSON.parse(localStorage.getItem(key) || '')
            if (!Array.isArray(data) && data.updatedAt && now - data.updatedAt > MAX_AGE_MS) {
              localStorage.removeItem(key)
            }
          } catch {
            /* skip invalid entries */
          }
        }
      }
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(cleanupOldMcqStorage)
    } else {
      setTimeout(cleanupOldMcqStorage, 0)
    }
  }, [])

  // Helper to reorder options so "All of the above" type options are always last (option D)
  const reorderOptionsForAllOfTheAbove = useCallback((question: MCQQuestion): MCQQuestion => {
    const allOfAbovePatterns = [
      /^all\s+(of\s+)?the\s+above$/i,
      /^all\s+(of\s+)?these$/i,
      /^all\s+are\s+correct$/i,
      /^all\s+(of\s+)?the\s+above\s+(are\s+)?(correct|true)$/i,
      /^both\s+\(?[a-d]\)?\s*(and|&)\s*\(?[a-d]\)?$/i,
    ]

    const optionLabels: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D']
    const options = [...question.options]
    let correctAnswer = question.correctAnswer

    // Find index of "All of the above" type option
    const allOfAboveIndex = options.findIndex((opt) =>
      allOfAbovePatterns.some((pattern) => pattern.test(opt.trim()))
    )

    // If found and not already last (index 3), reorder
    if (allOfAboveIndex !== -1 && allOfAboveIndex !== 3 && options.length === 4) {
      const allOfAboveOption = options[allOfAboveIndex]
      const originalLabel = optionLabels[allOfAboveIndex]

      // Remove from current position
      options.splice(allOfAboveIndex, 1)
      // Add to end
      options.push(allOfAboveOption)

      // Update correct answer if needed
      if (correctAnswer === originalLabel) {
        // The correct answer was the "All of the above" option, now it's D
        correctAnswer = 'D'
      } else if (correctAnswer === 'D') {
        // D was correct but now moved to allOfAboveIndex position
        correctAnswer = originalLabel
      } else {
        // Handle shifting of options between original position and end
        const correctIndex = optionLabels.indexOf(correctAnswer)
        if (correctIndex > allOfAboveIndex) {
          // Options after allOfAboveIndex shift up by 1
          correctAnswer = optionLabels[correctIndex - 1]
        }
      }

      return { ...question, options, correctAnswer }
    }

    return question
  }, [])

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
          // Fetch review due count
          const reviewRes = await fetch(`/api/mcq/review?freeUserId=${storedUserId}&limit=1`)
          if (reviewRes.ok) {
            const reviewData = await reviewRes.json()
            if (reviewData.success) {
              setReviewDueCount(reviewData.data.stats.totalDue || 0)
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
            setSessionReady(true)
          } else {
            // Session creation failed but continue without session
            setSessionReady(true)
          }
        } else {
          // API error but continue without session
          setSessionReady(true)
        }
      } catch (err) {
        console.error('Failed to initialize session:', err)
        // Continue without session on error
        setSessionReady(true)
      } finally {
        setIsLoading(false)
      }
    }

    initSession()
  }, [])

  // Session timer - tracks total time spent
  useEffect(() => {
    if (!quizStarted || showSessionSummary) return

    // Reset start time when quiz starts
    sessionStartTimeRef.current = Date.now()

    const timer = setInterval(() => {
      setSessionTimeElapsed(Math.floor((Date.now() - sessionStartTimeRef.current) / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [quizStarted, showSessionSummary])

  // Fetch questions
  const fetchQuestions = useCallback(async () => {
    setIsLoadingQuestions(true)
    setError(null)

    // Load persisted answered IDs for resume functionality (practice mode only)
    let currentAnsweredIds = answeredIds
    if (quizMode === 'practice') {
      const persistedIds = loadAnsweredIdsFromStorage()
      if (persistedIds.size > 0) {
        setAnsweredIds(persistedIds)
        currentAnsweredIds = persistedIds
      }
    }

    try {
      // Review mode - fetch from review API
      if (quizMode === 'review' && freeUserId) {
        const reviewRes = await fetch(
          `/api/mcq/review?freeUserId=${freeUserId}&limit=${questionCount}&includeNew=true`
        )
        if (!reviewRes.ok) throw new Error('Failed to fetch review questions')

        const reviewData = await reviewRes.json()
        if (reviewData.success && reviewData.data.questions.length > 0) {
          // Reorder options so "All of the above" is always option D
          const reorderedQuestions = reviewData.data.questions.map(reorderOptionsForAllOfTheAbove)
          setQuestions(reorderedQuestions)
          setCurrentQuestionIndex(0)
          setReviewDueCount(reviewData.data.stats.totalDue || 0)
          setTimerKey((prev) => prev + 1) // Reset timer
        } else {
          setError('No questions due for review. Practice more to build your review queue!')
          showToast(
            'info',
            'No Reviews Due',
            'Practice more questions to build your review queue.',
            4000
          )
        }
        return
      }

      // Practice or Timed mode - fetch from regular questions API
      const params = new URLSearchParams()
      if (selectedTopic) params.append('topic', selectedTopic)
      if (selectedChapter) params.append('chapter', selectedChapter)
      if (selectedDifficulty) params.append('difficulty', selectedDifficulty)

      // Content source filtering (from tabs)
      if (contentSource === 'pyq') {
        params.append('isPYQOnly', 'true')
        if (selectedPYQYear) params.append('pyqYear', selectedPYQYear.toString())
      } else if (contentSource === 'ncert') {
        params.append('isNcertBased', 'true')
        if (selectedNcertClass) params.append('ncertClass', selectedNcertClass.toString())
        if (selectedNeetWeightage) params.append('neetWeightage', selectedNeetWeightage)
        if (hasDiagramOnly) params.append('hasDiagram', 'true')
      }
      // 'all' content source uses no additional filters

      params.append('limit', questionCount.toString())

      // Exclude already answered questions (use currentAnsweredIds for persisted IDs)
      if (currentAnsweredIds.size > 0) {
        params.append('excludeIds', Array.from(currentAnsweredIds).join(','))
      }

      const res = await fetch(`/api/mcq/questions?${params}`)
      if (!res.ok) throw new Error('Failed to fetch questions')

      const data = await res.json()
      if (data.success && data.data.questions.length > 0) {
        // Reorder options so "All of the above" is always option D
        const reorderedQuestions = data.data.questions.map(reorderOptionsForAllOfTheAbove)
        setQuestions(reorderedQuestions)
        setCurrentQuestionIndex(0)
        setTimerKey((prev) => prev + 1) // Reset timer for new questions
        // Show info toast if fewer questions than requested
        if (data.message) {
          showToast('info', 'Limited Questions', data.message, 5000)
        }
      } else if (data.data.questions.length === 0) {
        setError('No more questions available with current filters. Try different filters.')
        showToast(
          'error',
          'No Questions',
          'No questions found for selected filters. Try different options.',
          4000
        )
      }
    } catch (err) {
      setError('Failed to load questions. Please try again.')
      console.error(err)
    } finally {
      setIsLoadingQuestions(false)
    }
  }, [
    quizMode,
    freeUserId,
    selectedTopic,
    selectedChapter,
    selectedDifficulty,
    contentSource,
    selectedPYQYear,
    selectedNcertClass,
    selectedNeetWeightage,
    hasDiagramOnly,
    questionCount,
    answeredIds,
    showToast,
    loadAnsweredIdsFromStorage,
    reorderOptionsForAllOfTheAbove,
  ])

  // Handle answer submission
  const handleAnswer = useCallback(
    async (selectedAnswer: string, timeSpent: number): Promise<AnswerResult> => {
      const question = questions[currentQuestionIndex]
      if (!question) {
        showToast('error', 'Error', 'Question not found. Please try again.', 3000)
        throw new Error('Question not found')
      }

      try {
        const res = await fetch('/api/mcq/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionId: question.id,
            selectedAnswer,
            timeSpent,
            sessionId: sessionId || 'anonymous',
            freeUserId,
            questionSource: question.source,
            topic: question.topic,
            difficulty: question.difficulty,
            questionType: question.type,
          }),
        })

        if (!res.ok) {
          showToast(
            'error',
            'Network Error',
            'Failed to submit answer. Please check your connection.',
            4000
          )
          throw new Error('Failed to submit answer')
        }

        const data = await res.json()
        if (!data.success) {
          showToast('error', 'Submission Error', data.error || 'Failed to submit answer', 4000)
          throw new Error(data.error || 'Submission failed')
        }

        const result: AnswerResult = data.data

        // Update ref immediately for accurate lead capture tracking
        questionsAttemptedRef.current += 1

        // Update session stats
        setSessionStats((prev) => ({
          questionsAttempted: prev.questionsAttempted + 1,
          correctAnswers: prev.correctAnswers + (result.isCorrect ? 1 : 0),
          xpEarned: prev.xpEarned + result.xpEarned,
        }))

        // Track wrong answers for review
        if (!result.isCorrect) {
          setWrongAnswers((prev) => [
            ...prev,
            {
              question,
              selectedAnswer,
              correctAnswer: result.correctAnswer,
              explanation: result.explanation,
              timeSpent,
            },
          ])
        }

        // Mark question as answered and persist to localStorage for resume
        setAnsweredIds((prev) => {
          const newIds = new Set([...prev, question.id])
          saveAnsweredIdsToStorage(newIds)
          return newIds
        })

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

        // Check for lead capture trigger using ref for accurate count
        const totalAnswered = questionsAttemptedRef.current
        if (!hasLeadCaptured) {
          if (totalAnswered === LEAD_CAPTURE_CONFIG.softPromptAfter) {
            setLeadCaptureVariant('soft')
            setShowLeadCapture(true)
          } else if (totalAnswered === LEAD_CAPTURE_CONFIG.hardPromptAfter) {
            setLeadCaptureVariant('hard')
            setShowLeadCapture(true)
          }
        }

        // Record review result for spaced repetition (all modes)
        if (freeUserId) {
          fetch('/api/mcq/review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              freeUserId,
              questionId: question.id,
              isCorrect: result.isCorrect,
              timeSpent,
              avgTimeForQuestion: 30, // Default average time
            }),
          }).catch((err) => console.error('Failed to record review:', err))
        }

        return result
      } catch (error) {
        // Re-throw to let QuestionCard handle the error display
        throw error
      }
    },
    [
      questions,
      currentQuestionIndex,
      sessionId,
      freeUserId,
      userStats,
      hasLeadCaptured,
      showToast,
      saveAnsweredIdsToStorage,
    ]
  )

  // Handle next question
  const handleNextQuestion = useCallback(() => {
    setTimerKey((prev) => prev + 1) // Reset timer for next question
    setIsTimerPaused(false)
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      // Fetch more questions
      fetchQuestions()
    }
  }, [currentQuestionIndex, questions.length, fetchQuestions])

  // Handle skip question (moves to next without answering)
  const handleSkipQuestion = useCallback(() => {
    setTimerKey((prev) => prev + 1) // Reset timer
    setIsTimerPaused(false)
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      fetchQuestions()
    }
  }, [currentQuestionIndex, questions.length, fetchQuestions])

  // Handle timer expiry (timed mode auto-submit)
  const handleTimeUp = useCallback(() => {
    if (quizMode !== 'timed') return

    const question = questions[currentQuestionIndex]
    if (!question || answeredIds.has(question.id)) return

    // Show timeout toast
    showToast('warning', 'Time Up!', "Time's up! Moving to the next question.", 2000)

    // Submit with no answer (counts as wrong)
    handleAnswer('A', 60)
      .then(() => {
        // Auto-advance to next question
        setTimeout(() => handleNextQuestion(), 1500)
      })
      .catch((err) => {
        console.error('Auto-submit failed:', err)
        handleNextQuestion()
      })
  }, [
    quizMode,
    questions,
    currentQuestionIndex,
    answeredIds,
    showToast,
    handleAnswer,
    handleNextQuestion,
  ])

  // Keep auto-submit ref updated for timer callback
  useEffect(() => {
    autoSubmitRef.current = handleTimeUp
  }, [handleTimeUp])

  // Handle mode change
  const handleModeChange = useCallback(
    (mode: QuizMode) => {
      if (mode === 'review' && !freeUserId) {
        showToast(
          'info',
          'Sign Up Required',
          'Please complete your profile to use Review Mode.',
          4000
        )
        setLeadCaptureVariant('soft')
        setShowLeadCapture(true)
        return
      }
      setQuizMode(mode)
      // If quiz already started, refetch questions for new mode
      if (quizStarted) {
        setQuestions([])
        setCurrentQuestionIndex(0)
        setTimerKey((prev) => prev + 1)
      }
    },
    [freeUserId, quizStarted, showToast]
  )

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

  // Handle filter application - now also starts the quiz
  const handleApplyFilters = () => {
    setAnsweredIds(new Set())
    setCurrentQuestionIndex(0)
    setQuestions([])
    setSessionStats({
      questionsAttempted: 0,
      correctAnswers: 0,
      xpEarned: 0,
    })
    setQuizStarted(true)
    fetchQuestions()

    // Show toast with filter summary
    const filterParts = [
      contentSource === 'ncert' ? 'NCERT Based' : null,
      contentSource === 'pyq' ? `PYQ ${selectedPYQYear || 'All Years'}` : null,
      selectedNcertClass ? `Class ${selectedNcertClass}` : null,
      selectedTopic,
      selectedChapter,
      selectedDifficulty,
      selectedNeetWeightage ? `${selectedNeetWeightage} Priority` : null,
    ].filter(Boolean)

    showToast(
      'success',
      'Quiz Started!',
      filterParts.length > 0 ? `Filters: ${filterParts.join(' • ')}` : 'Practicing all questions',
      3000
    )
  }

  // Start quiz
  const handleStartQuiz = () => {
    setQuizStarted(true)
    fetchQuestions()
    // Scroll to top of the page so user sees the question
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Reset quiz (called after confirmation)
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
    questionsAttemptedRef.current = 0
    setWrongAnswers([])
    setShowResetConfirm(false)
    setTimerKey(0)
    setIsTimerPaused(false)
  }

  // Handle report error
  const handleReportError = (questionId: string) => {
    setReportErrorQuestionId(questionId)
    setShowReportError(true)
  }

  // Show reset confirmation dialog
  const handleResetClick = () => {
    if (sessionStats.questionsAttempted > 0) {
      setShowResetConfirm(true)
    } else {
      handleResetQuiz()
    }
  }

  // Show session summary
  const handleEndSession = () => {
    if (sessionStats.questionsAttempted > 0) {
      setShowSessionSummary(true)
    }
  }

  // Continue from session summary
  const handleContinueSession = () => {
    setShowSessionSummary(false)
    // Fetch more questions if needed
    if (currentQuestionIndex >= questions.length - 1) {
      fetchQuestions()
    }
  }

  // Start new session from summary
  const handleNewSessionFromSummary = () => {
    setShowSessionSummary(false)
    handleResetQuiz()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-parchment via-sage-50/30 to-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sage-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600">Loading MCQ Practice...</p>
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
      <div className="min-h-screen bg-gradient-to-br from-parchment via-sage-50/30 to-stone-50">
        {/* Breadcrumb - Botanical Scholar */}
        <nav className="bg-white/90 backdrop-blur-md border-b border-stone-200/50 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-stone-600">
              <Link href="/" className="hover:text-sage-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-stone-400" />
              <span className="text-sage-600 font-medium">NEET Biology MCQ</span>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header - Botanical Scholar */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-sage-100 text-sage-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="text-lg">🧬</span>
              Unlimited Free Practice
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3 tracking-tight">
              NEET Biology MCQ Practice 2026
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
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

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Main Content - Centered */}
            <div className="flex-1 flex flex-col items-center">
              {!quizStarted ? (
                <div className="w-full max-w-2xl space-y-4">
                  {/* Content Source Tabs */}
                  <ContentSourceTabs
                    activeSource={contentSource}
                    onSourceChange={setContentSource}
                    selectedPYQYear={selectedPYQYear}
                    onPYQYearChange={setSelectedPYQYear}
                    questionCounts={{ all: 7000, ncert: 3375, pyq: 500 }}
                  />

                  {/* Mode Selection - Botanical Scholar */}
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-stone-200/50 paper-texture">
                    <ModeRadio
                      selectedMode={quizMode}
                      onModeChange={handleModeChange}
                      reviewDueCount={reviewDueCount}
                    />
                  </div>

                  {/* Filter Panel - Always Visible */}
                  <FilterPanel
                    selectedTopic={selectedTopic}
                    selectedChapter={selectedChapter}
                    selectedDifficulty={selectedDifficulty}
                    questionCount={questionCount}
                    onTopicChange={setSelectedTopic}
                    onChapterChange={setSelectedChapter}
                    onDifficultyChange={setSelectedDifficulty}
                    onQuestionCountChange={setQuestionCount}
                  />

                  {/* NCERT Options - Only when NCERT tab active */}
                  {contentSource === 'ncert' && (
                    <NcertOptions
                      selectedWeightage={selectedNeetWeightage}
                      hasDiagramOnly={hasDiagramOnly}
                      diagramCount={248}
                      selectedClass={selectedNcertClass}
                      onWeightageChange={setSelectedNeetWeightage}
                      onDiagramOnlyChange={setHasDiagramOnly}
                      onClassChange={setSelectedNcertClass}
                    />
                  )}

                  {/* Start Quiz Button - Botanical Scholar CTA */}
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200 overflow-hidden paper-texture">
                    <div className="p-6">
                      {/* Main CTA Button */}
                      <button
                        onClick={handleStartQuiz}
                        className="group relative w-full bg-gradient-to-r from-sage-500 to-sage-700 text-white py-5 px-8 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-sage-500/25 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                      >
                        {/* Shimmer effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                        <div className="relative flex items-center justify-center gap-3">
                          <span className="text-2xl" role="img" aria-label="DNA">
                            🧬
                          </span>
                          <div className="flex flex-col items-start">
                            <span className="tracking-wide">Start Practicing</span>
                            <span className="text-sm font-normal text-white/80">
                              {questionCount} Questions Ready
                            </span>
                          </div>
                          <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </button>

                      {/* Quick Benefits Section */}
                      <div className="mt-5 pt-5 border-t border-dashed border-stone-200">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="h-px flex-1 bg-stone-200" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                            Quick Benefits
                          </span>
                          <div className="h-px flex-1 bg-stone-200" />
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5 text-sage-700">
                            <span className="text-base">🏆</span>
                            <span className="font-medium">Earn XP</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-yellow-700">
                            <span className="text-base">🔥</span>
                            <span className="font-medium">Build Streaks</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-specimen-700">
                            <span className="text-base">📊</span>
                            <span className="font-medium">Track Progress</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Quiz Progress Bar - Botanical Scholar */}
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-sm border border-stone-200/50 p-3 mb-4 w-full max-w-3xl">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium font-mono text-ink">
                          Q {currentQuestionIndex + 1}/{questions.length}
                        </span>
                        <div className="flex items-center gap-1 text-xs font-mono">
                          <span className="text-green-600 font-bold">
                            {sessionStats.correctAnswers}
                          </span>
                          <span className="text-stone-400">/</span>
                          <span className="text-stone-600">{sessionStats.questionsAttempted}</span>
                          <span className="text-stone-400">({sessionAccuracy}%)</span>
                        </div>
                        {/* Timed Mode Timer */}
                        {quizMode === 'timed' &&
                          currentQuestion &&
                          !answeredIds.has(currentQuestion.id) && (
                            <TimedModeTimer
                              key={timerKey}
                              timeLimit={60}
                              onTimeUp={handleTimeUp}
                              isPaused={isTimerPaused}
                              onPauseToggle={() => setIsTimerPaused(!isTimerPaused)}
                              showWarningAt={10}
                            />
                          )}
                        {/* Mode Indicator Badge - Botanical Scholar */}
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            quizMode === 'practice'
                              ? 'bg-sage-100 text-sage-700'
                              : quizMode === 'timed'
                                ? 'bg-sky-100 text-sky-700'
                                : 'bg-specimen-100 text-specimen-700'
                          }`}
                        >
                          {quizMode === 'practice'
                            ? '📚 Practice'
                            : quizMode === 'timed'
                              ? '⏱️ Timed'
                              : '🔄 Review'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setFocusMode(!focusMode)}
                          className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                            focusMode
                              ? 'bg-specimen-100 text-specimen-700'
                              : 'text-stone-600 hover:text-stone-700 hover:bg-stone-100'
                          }`}
                          title={focusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
                        >
                          {focusMode ? (
                            <>
                              <Minimize2 className="w-3 h-3" />
                              Exit Focus
                            </>
                          ) : (
                            <>
                              <Maximize2 className="w-3 h-3" />
                              Focus
                            </>
                          )}
                        </button>
                        {sessionStats.questionsAttempted >= 5 && (
                          <button
                            onClick={handleEndSession}
                            className="flex items-center gap-1 text-sage-600 hover:text-sage-700 text-xs font-medium"
                          >
                            <span>🏆</span>
                            End Session
                          </button>
                        )}
                        <button
                          onClick={handleResetClick}
                          className="flex items-center gap-1 text-stone-600 hover:text-stone-700 text-xs"
                        >
                          <span>🔄</span>
                          Reset
                        </button>
                      </div>
                    </div>
                    {/* Progress bar - Botanical Scholar */}
                    <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sage-400 to-sage-600 rounded-full transition-all duration-300"
                        style={{
                          width: `${questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Session Summary */}
                  {showSessionSummary ? (
                    <div className="w-full max-w-3xl">
                      <SessionSummary
                        questionsAttempted={sessionStats.questionsAttempted}
                        correctAnswers={sessionStats.correctAnswers}
                        xpEarned={sessionStats.xpEarned}
                        totalTimeSeconds={sessionTimeElapsed}
                        onContinue={handleContinueSession}
                        onNewSession={handleNewSessionFromSummary}
                        wrongAnswers={wrongAnswers}
                      />
                    </div>
                  ) : (
                    <>
                      {/* Question Display - Centered and wider */}
                      <div className="w-full max-w-3xl">
                        {isLoadingQuestions ? (
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-stone-200/50 p-6 text-center paper-texture">
                            <div className="w-10 h-10 border-4 border-sage-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                            <p className="text-stone-600 text-sm">Loading questions...</p>
                          </div>
                        ) : error ? (
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-stone-200/50 p-6 text-center paper-texture">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                              <span className="text-2xl">⚠️</span>
                            </div>
                            <p className="text-stone-700 text-sm mb-3">{error}</p>
                            <button
                              onClick={handleApplyFilters}
                              className="bg-gradient-to-r from-sage-500 to-sage-700 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-sage-500/25 transition-all text-sm"
                            >
                              Try Again
                            </button>
                          </div>
                        ) : questions.length === 0 ? (
                          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-stone-200/50 p-6 text-center paper-texture">
                            <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                              <span className="text-2xl">📖</span>
                            </div>
                            <h3 className="text-base font-semibold text-ink mb-2">
                              No Questions Available
                            </h3>
                            <p className="text-stone-600 text-sm mb-4">
                              No questions found for the current filters. Try adjusting your filter
                              settings.
                            </p>
                            <button
                              onClick={handleApplyFilters}
                              className="bg-gradient-to-r from-sage-500 to-sage-700 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-sage-500/25 transition-all text-sm"
                            >
                              Load Questions
                            </button>
                          </div>
                        ) : currentQuestion ? (
                          <div key={currentQuestion.id} className="animate-fade-in-up">
                            <QuestionRenderer
                              question={currentQuestion}
                              questionNumber={sessionStats.questionsAttempted + 1}
                              onAnswer={handleAnswer}
                              onSkip={handleSkipQuestion}
                              showExplanation={hasLeadCaptured}
                              isProtected={true}
                              freeUserId={freeUserId}
                              onReportError={handleReportError}
                            />
                          </div>
                        ) : null}
                      </div>

                      {/* Next Question Button - Botanical Scholar */}
                      {currentQuestion && answeredIds.has(currentQuestion.id) && (
                        <div className="mt-4 w-full max-w-3xl">
                          <button
                            onClick={handleNextQuestion}
                            disabled={isLoadingQuestions}
                            className="group w-full bg-gradient-to-r from-sage-500 to-sage-700 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-sage-500/25 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-70 text-sm"
                          >
                            {isLoadingQuestions ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Loading...
                              </>
                            ) : (
                              <>
                                Next Question
                                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Quick Actions - Botanical Scholar */}
                      {!focusMode && (
                        <div className="mt-4 flex flex-wrap justify-center gap-2 w-full max-w-3xl">
                          <button
                            onClick={() => router.push('/neet-biology-mcq/analytics')}
                            className="flex items-center gap-1.5 bg-white/90 border border-stone-200/50 px-3 py-1.5 rounded-lg shadow-sm text-xs font-medium text-stone-700 hover:bg-specimen-50 hover:text-specimen-700 transition-all"
                          >
                            <span>📊</span>
                            Analytics
                          </button>
                          <button
                            onClick={() => router.push('/neet-biology-mcq/leaderboard')}
                            className="flex items-center gap-1.5 bg-white/90 border border-stone-200/50 px-3 py-1.5 rounded-lg shadow-sm text-xs font-medium text-stone-700 hover:bg-sage-50 hover:text-sage-700 transition-all"
                          >
                            <span>🏆</span>
                            Leaderboard
                          </button>
                          <button
                            onClick={() => router.push('/neet-biology-mcq/contribute')}
                            className="flex items-center gap-1.5 bg-white/90 border border-stone-200/50 px-3 py-1.5 rounded-lg shadow-sm text-xs font-medium text-stone-700 hover:bg-sage-50 hover:text-sage-700 transition-all"
                          >
                            <span>✏️</span>
                            Submit Question
                          </button>
                          <button
                            onClick={() => router.push('/neet-biology-mcq/daily-challenge')}
                            className="flex items-center gap-1.5 bg-white/90 border border-stone-200/50 px-3 py-1.5 rounded-lg shadow-sm text-xs font-medium text-stone-700 hover:bg-amber-50 hover:text-yellow-700 transition-all"
                          >
                            <span>🎯</span>
                            Daily Challenge
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              {/* Features Section - Botanical Scholar (only when not started) */}
              {!quizStarted && (
                <div className="mt-12 grid md:grid-cols-3 gap-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-stone-200/50 paper-texture">
                    <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-2xl">📚</span>
                    </div>
                    <h3 className="text-lg font-semibold text-ink mb-2">Unlimited Practice</h3>
                    <p className="text-stone-600 text-sm">
                      No limits! Practice as many questions as you want. New questions added weekly.
                    </p>
                  </div>

                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-stone-200/50 paper-texture">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-2xl">📜</span>
                    </div>
                    <h3 className="text-lg font-semibold text-ink mb-2">PYQ Support</h3>
                    <p className="text-stone-600 text-sm">
                      Practice Previous Year Questions from 2015-2024 with year-wise filtering.
                    </p>
                  </div>

                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-stone-200/50 paper-texture">
                    <div className="w-12 h-12 bg-specimen-100 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <h3 className="text-lg font-semibold text-ink mb-2">Compete & Win</h3>
                    <p className="text-stone-600 text-sm">
                      Earn XP, unlock badges, and compete on leaderboards with other aspirants.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Stats Panel (Desktop) - Hidden in Focus Mode */}
            {quizStarted && !focusMode && (
              <div className="hidden lg:block w-64 flex-shrink-0 transition-all duration-300">
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

          {/* CTA Section - Botanical Scholar */}
          <div className="mt-16 bg-gradient-to-r from-sage-600 to-sage-800 rounded-2xl p-8 text-white text-center shadow-xl shadow-sage-900/20">
            <h2 className="text-2xl font-bold mb-4 tracking-tight">
              Want Expert Guidance for NEET Biology?
            </h2>
            <p className="text-sage-100 mb-6 max-w-2xl mx-auto">
              Join Cerebrum Biology Academy for comprehensive NEET Biology preparation with
              experienced AIIMS faculty and personalized attention.
            </p>
            <Link
              href="/demo"
              className="inline-block bg-white text-sage-700 px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Book Free Demo Class
            </Link>
          </div>

          {/* Related Links */}
          <div className="mt-12 text-center text-sm text-stone-600">
            <p>
              Related:{' '}
              <Link href="/neet-biology-syllabus-2026" className="text-sage-600 hover:underline">
                NEET Biology Syllabus 2026
              </Link>{' '}
              |{' '}
              <Link href="/neet-rank-predictor" className="text-sage-600 hover:underline">
                NEET Rank Predictor
              </Link>{' '}
              |{' '}
              <Link href="/neet-college-predictor" className="text-sage-600 hover:underline">
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

        {/* Reset Confirmation Dialog */}
        {showResetConfirm && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={() => setShowResetConfirm(false)}
          >
            <div
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-sm w-full shadow-xl border border-stone-200/50 animate-scale-in paper-texture"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="text-lg font-bold text-ink mb-2">Reset Quiz?</h3>
                <p className="text-stone-600 text-sm mb-6">
                  You&apos;ve answered {sessionStats.questionsAttempted} questions with{' '}
                  {sessionStats.correctAnswers} correct ({sessionAccuracy}% accuracy). Your progress
                  will be lost.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 py-2 px-4 border-2 border-stone-300 text-stone-700 rounded-lg font-medium hover:bg-stone-50 hover:border-stone-400 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleResetQuiz}
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-red-500/25 transition-all"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report Error Modal */}
        {showReportError && reportErrorQuestionId && currentQuestion && (
          <ReportErrorModal
            questionId={reportErrorQuestionId}
            freeUserId={freeUserId}
            currentAnswer={currentQuestion.correctAnswer}
            onClose={() => {
              setShowReportError(false)
              setReportErrorQuestionId(null)
            }}
          />
        )}
      </div>
    </ProtectedContent>
  )
}
