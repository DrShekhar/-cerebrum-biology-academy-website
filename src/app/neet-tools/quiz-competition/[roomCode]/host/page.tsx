'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Loader2,
  Users,
  Trophy,
  Play,
  RotateCcw,
  Check,
  X,
  ArrowRightLeft,
  Minus,
  Clock,
  Copy,
  CheckCircle2,
  StopCircle,
  Zap,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Timer,
  Pause,
  Settings,
  MessageCircle,
  UserMinus,
  RefreshCw,
} from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils/time'

interface Round {
  id: string
  roundNumber: number
  answeringTeam: 'TEAM_A' | 'TEAM_B'
  outcome: 'CORRECT' | 'INCORRECT' | 'PASSED' | 'PARTIAL' | 'SKIPPED'
  pointsChange: number
  note: string | null
  createdAt: string
}

interface Participant {
  id: string
  name: string
  team: 'TEAM_A' | 'TEAM_B' | null
  isHost: boolean
  joinedAt: string
}

interface ScoringRules {
  correct: number
  wrong: number
  pass: number
  partial?: Record<string, number>
}

interface ChatMessage {
  id: string
  team: 'TEAM_A' | 'TEAM_B'
  participantId: string
  senderName: string
  message: string
  createdAt: string
}

interface QuizSession {
  id: string
  roomCode: string
  title: string
  format: 'MODERATOR' | 'TEAMS_ASK_EACH_OTHER'
  questionMode: string
  status: 'WAITING' | 'IN_PROGRESS' | 'PAUSED' | 'COMPLETED'
  teamAName: string
  teamBName: string
  teamAScore: number
  teamBScore: number
  currentRound: number
  totalRounds: number
  scoringRules: ScoringRules
  rounds: Round[]
  participants: Participant[]
  startedAt: string | null
  endedAt: string | null
  questionTimerSeconds: number
  answerTimerSeconds: number
  activeTimerType: 'question' | 'answer' | null
  timerStartedAt: string | null
  timerPausedAt: string | null
  teamDiscussing: 'TEAM_A' | 'TEAM_B' | null
}

export default function HostControlPanel() {
  const params = useParams()
  const router = useRouter()
  const roomCode = params.roomCode as string

  const [session, setSession] = useState<QuizSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<'TEAM_A' | 'TEAM_B'>('TEAM_A')
  const [actionLoading, setActionLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showEndConfirm, setShowEndConfirm] = useState(false)
  const [showPartialInput, setShowPartialInput] = useState(false)
  const [customPoints, setCustomPoints] = useState('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatExpanded, setChatExpanded] = useState(true)
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState<string | null>(null)

  // Participant management state
  const [showParticipantsManager, setShowParticipantsManager] = useState(false)
  const [removingParticipantId, setRemovingParticipantId] = useState<string | null>(null)

  // Host token for authentication
  const [hostToken, setHostToken] = useState<string | null>(null)

  // Connection status and exponential backoff
  const [failCount, setFailCount] = useState(0)
  const [backoffMs, setBackoffMs] = useState(3000)
  const isConnected = failCount < 3

  // Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(0)
  const [showTimerSettings, setShowTimerSettings] = useState(false)
  const [questionTimerInput, setQuestionTimerInput] = useState('60')
  const [answerTimerInput, setAnswerTimerInput] = useState('60')

  // Load host token from localStorage on mount
  useEffect(() => {
    if (roomCode) {
      const token = localStorage.getItem(`quiz_host_token_${roomCode}`)
      setHostToken(token)
    }
  }, [roomCode])

  const fetchSession = useCallback(async () => {
    try {
      const headers: Record<string, string> = {
        'Cache-Control': 'no-cache',
      }
      if (hostToken) {
        headers['x-host-token'] = hostToken
      }

      const res = await fetch(`/api/quiz/${roomCode}?t=${Date.now()}`, {
        cache: 'no-store',
        headers,
      })
      const data = await res.json()
      if (data.success) {
        setSession(data.data)
        setFailCount(0)
        setBackoffMs(3000)
      } else {
        setFailCount((prev) => prev + 1)
        setBackoffMs((prev) => Math.min(prev * 2, 10000))
        if (!session) {
          setError(data.error || 'Failed to load quiz')
        }
      }
    } catch {
      setFailCount((prev) => prev + 1)
      setBackoffMs((prev) => Math.min(prev * 2, 10000))
      if (!session) {
        setError('Failed to load quiz session')
      }
    } finally {
      setLoading(false)
    }
  }, [roomCode, hostToken, session])

  const handleManualRetry = useCallback(() => {
    setFailCount(0)
    setBackoffMs(3000)
    fetchSession()
  }, [fetchSession])

  const fetchMessages = useCallback(async () => {
    try {
      const url = new URL(`/api/quiz/${roomCode}/chat`, window.location.origin)
      if (lastMessageTimestamp) {
        url.searchParams.set('after', lastMessageTimestamp)
      }
      url.searchParams.set('t', Date.now().toString())

      const headers: Record<string, string> = {
        'Cache-Control': 'no-cache',
      }
      if (hostToken) {
        headers['x-host-token'] = hostToken
      }

      const res = await fetch(url.toString(), {
        cache: 'no-store',
        headers,
      })
      const data = await res.json()
      if (data.success && data.data.length > 0) {
        setChatMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m.id))
          const newMessages = data.data.filter((m: ChatMessage) => !existingIds.has(m.id))
          return [...prev, ...newMessages]
        })
        if (data.nextCursor) {
          setLastMessageTimestamp(data.nextCursor)
        }
      }
    } catch (err) {
      console.error('Error fetching chat messages:', err)
    }
  }, [roomCode, lastMessageTimestamp, hostToken])

  // Polling with exponential backoff
  useEffect(() => {
    fetchSession()
  }, [fetchSession])

  useEffect(() => {
    const interval = setInterval(fetchSession, backoffMs)
    return () => clearInterval(interval)
  }, [fetchSession, backoffMs])

  useEffect(() => {
    if (!hostToken) return
    fetchMessages()
    const chatInterval = setInterval(fetchMessages, Math.max(2000, backoffMs))
    return () => clearInterval(chatInterval)
  }, [fetchMessages, hostToken, backoffMs])

  // Timer countdown effect
  useEffect(() => {
    if (!session?.activeTimerType || !session?.timerStartedAt) {
      setTimerSeconds(0)
      return
    }

    const totalSeconds =
      session.activeTimerType === 'question'
        ? session.questionTimerSeconds
        : session.answerTimerSeconds

    const updateTimer = () => {
      const elapsed = Math.floor((Date.now() - new Date(session.timerStartedAt!).getTime()) / 1000)
      const remaining = Math.max(0, totalSeconds - elapsed)
      setTimerSeconds(remaining)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [
    session?.activeTimerType,
    session?.timerStartedAt,
    session?.questionTimerSeconds,
    session?.answerTimerSeconds,
  ])

  // Initialize timer inputs when session loads
  useEffect(() => {
    if (session) {
      setQuestionTimerInput(String(session.questionTimerSeconds))
      setAnswerTimerInput(String(session.answerTimerSeconds))
    }
  }, [session?.questionTimerSeconds, session?.answerTimerSeconds])

  const startTimer = async (timerType: 'question' | 'answer') => {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (hostToken) headers['x-host-token'] = hostToken

      const res = await fetch(`/api/quiz/${roomCode}/timer`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ action: 'start', timerType }),
      })
      const data = await res.json()
      if (data.success) {
        setSession((prev) =>
          prev
            ? {
                ...prev,
                activeTimerType: data.data.activeTimerType,
                timerStartedAt: data.data.timerStartedAt,
                timerPausedAt: data.data.timerPausedAt,
              }
            : prev
        )
      }
    } catch (err) {
      console.error('Failed to start timer:', err)
    }
  }

  const stopTimer = async () => {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (hostToken) headers['x-host-token'] = hostToken

      const res = await fetch(`/api/quiz/${roomCode}/timer`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ action: 'stop', timerType: session?.activeTimerType || 'question' }),
      })
      const data = await res.json()
      if (data.success) {
        setSession((prev) =>
          prev
            ? {
                ...prev,
                activeTimerType: null,
                timerStartedAt: null,
                timerPausedAt: null,
              }
            : prev
        )
        setTimerSeconds(0)
      }
    } catch (err) {
      console.error('Failed to stop timer:', err)
    }
  }

  const saveTimerSettings = async () => {
    // Validate timer inputs (10-600 seconds)
    const questionSeconds = parseInt(questionTimerInput) || 60
    const answerSeconds = parseInt(answerTimerInput) || 60

    if (questionSeconds < 10 || questionSeconds > 600) {
      alert('Question timer must be between 10 and 600 seconds')
      return
    }
    if (answerSeconds < 10 || answerSeconds > 600) {
      alert('Answer timer must be between 10 and 600 seconds')
      return
    }

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (hostToken) headers['x-host-token'] = hostToken

      const res = await fetch(`/api/quiz/${roomCode}/timer`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          questionTimerSeconds: questionSeconds,
          answerTimerSeconds: answerSeconds,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSession((prev) =>
          prev
            ? {
                ...prev,
                questionTimerSeconds: data.data.questionTimerSeconds,
                answerTimerSeconds: data.data.answerTimerSeconds,
              }
            : prev
        )
        setShowTimerSettings(false)
      }
    } catch (err) {
      console.error('Failed to save timer settings:', err)
    }
  }

  const setDiscussing = async (team: 'TEAM_A' | 'TEAM_B' | null) => {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (hostToken) headers['x-host-token'] = hostToken

      const res = await fetch(`/api/quiz/${roomCode}/timer`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ teamDiscussing: team }),
      })
      const data = await res.json()
      if (data.success) {
        setSession((prev) => (prev ? { ...prev, teamDiscussing: data.data.teamDiscussing } : prev))
      }
    } catch (err) {
      console.error('Failed to set discussion:', err)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const copyRoomCode = async () => {
    const fullLink = `${window.location.origin}/neet-tools/quiz-competition/${roomCode}/view`
    await navigator.clipboard.writeText(fullLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const submitScore = async (outcome: string, points?: number) => {
    if (!session) return

    // Validate custom points if provided
    if (points !== undefined) {
      if (isNaN(points) || points < -1000 || points > 1000) {
        alert('Custom points must be between -1000 and 1000')
        return
      }
    }

    setActionLoading(true)

    try {
      const body: Record<string, unknown> = {
        team: selectedTeam,
        outcome,
      }
      if (points !== undefined) {
        body.customPoints = points
      }

      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (hostToken) headers['x-host-token'] = hostToken

      const res = await fetch(`/api/quiz/${roomCode}/score`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      })

      const data = await res.json()
      if (data.success) {
        setSession((prev) =>
          prev
            ? {
                ...prev,
                teamAScore: data.data.session.teamAScore,
                teamBScore: data.data.session.teamBScore,
                currentRound: data.data.session.currentRound,
                status: data.data.session.status,
                rounds: [data.data.round, ...prev.rounds],
              }
            : prev
        )
        setShowPartialInput(false)
        setCustomPoints('')
      }
    } catch {
      setError('Failed to update score')
    } finally {
      setActionLoading(false)
    }
  }

  const undoLastRound = async () => {
    if (!session || session.rounds.length === 0) return
    setActionLoading(true)

    try {
      const headers: Record<string, string> = {}
      if (hostToken) headers['x-host-token'] = hostToken

      const res = await fetch(`/api/quiz/${roomCode}/score`, {
        method: 'DELETE',
        headers,
      })

      const data = await res.json()
      if (data.success) {
        setSession((prev) =>
          prev
            ? {
                ...prev,
                teamAScore: data.data.session.teamAScore,
                teamBScore: data.data.session.teamBScore,
                currentRound: data.data.session.currentRound,
                rounds: prev.rounds.slice(1),
              }
            : prev
        )
      }
    } catch {
      setError('Failed to undo')
    } finally {
      setActionLoading(false)
    }
  }

  const endQuiz = async () => {
    if (!session) return
    setActionLoading(true)

    try {
      const headers: Record<string, string> = {}
      if (hostToken) headers['x-host-token'] = hostToken

      const res = await fetch(`/api/quiz/${roomCode}/end`, {
        method: 'POST',
        headers,
      })

      const data = await res.json()
      if (data.success) {
        router.push('/neet-tools/quiz-competition')
      }
    } catch {
      setError('Failed to end quiz')
    } finally {
      setActionLoading(false)
      setShowEndConfirm(false)
    }
  }

  const removeParticipant = async (participantId: string, participantName: string) => {
    if (!confirm(`Remove ${participantName} from the quiz?`)) return

    setRemovingParticipantId(participantId)
    try {
      const headers: Record<string, string> = {}
      if (hostToken) headers['x-host-token'] = hostToken

      const res = await fetch(`/api/quiz/${roomCode}/participants?participantId=${participantId}`, {
        method: 'DELETE',
        headers,
      })

      const data = await res.json()
      if (data.success) {
        // Update local state to remove the participant
        setSession((prev) =>
          prev
            ? {
                ...prev,
                participants: prev.participants.filter((p) => p.id !== participantId),
              }
            : prev
        )
      } else {
        alert(data.error || 'Failed to remove participant')
      }
    } catch {
      alert('Failed to remove participant')
    } finally {
      setRemovingParticipantId(null)
    }
  }

  const getOutcomeLabel = (outcome: string) => {
    switch (outcome) {
      case 'CORRECT':
        return 'Correct'
      case 'INCORRECT':
        return 'Wrong'
      case 'PASSED':
        return 'Passed'
      case 'PARTIAL':
        return 'Partial'
      case 'SKIPPED':
        return 'Skipped'
      default:
        return outcome
    }
  }

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'CORRECT':
        return 'text-green-600 bg-green-50'
      case 'INCORRECT':
        return 'text-red-600 bg-red-50'
      case 'PASSED':
        return 'text-orange-600 bg-orange-50'
      case 'PARTIAL':
        return 'text-blue-600 bg-blue-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-indigo-600" />
          <p className="mt-4 text-gray-600">Loading quiz...</p>
        </div>
      </main>
    )
  }

  if (error || !session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <X className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="mt-4 text-xl font-bold text-gray-900">Quiz Not Found</h1>
          <p className="mt-2 text-gray-600">{error || 'This quiz session does not exist.'}</p>
          <Link
            href="/neet-tools/quiz-competition"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Quiz Competition
          </Link>
        </div>
      </main>
    )
  }

  if (session.status === 'COMPLETED') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Trophy className="mx-auto h-16 w-16 text-yellow-500" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Quiz Completed!</h1>
          <div className="mt-6 flex justify-center gap-8">
            <div className="text-center">
              <p className="text-lg font-medium text-gray-600">{session.teamAName}</p>
              <p className="text-4xl font-bold text-indigo-600">{session.teamAScore}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-gray-600">{session.teamBName}</p>
              <p className="text-4xl font-bold text-purple-600">{session.teamBScore}</p>
            </div>
          </div>
          <p className="mt-4 text-lg font-semibold text-gray-700">
            Winner:{' '}
            {session.teamAScore > session.teamBScore
              ? session.teamAName
              : session.teamBScore > session.teamAScore
                ? session.teamBName
                : "It's a tie!"}
          </p>
          <Link
            href="/neet-tools/quiz-competition"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    )
  }

  const participantCount = session.participants.filter((p) => !p.isHost).length
  const teamACount = session.participants.filter((p) => p.team === 'TEAM_A').length
  const teamBCount = session.participants.filter((p) => p.team === 'TEAM_B').length

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/90 shadow-sm backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/neet-tools/quiz-competition"
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 sm:gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Exit</span>
              </Link>
              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold text-gray-900">{session.title}</h1>
                <p className="hidden text-sm text-gray-500 sm:block">
                  {session.format === 'MODERATOR' ? 'Moderator Mode' : 'Teams Ask Each Other'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Connection status indicator */}
              <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium ${
                  failCount === 0
                    ? 'bg-green-50 text-green-700'
                    : failCount < 3
                      ? 'animate-pulse bg-orange-100 text-orange-700'
                      : 'bg-red-100 text-red-700'
                }`}
                title={
                  failCount === 0 ? 'Connected' : failCount < 3 ? 'Slow connection' : 'Offline'
                }
              >
                <div
                  className={`h-2 w-2 rounded-full ${
                    failCount === 0
                      ? 'bg-green-500'
                      : failCount < 3
                        ? 'bg-orange-500'
                        : 'bg-red-500'
                  }`}
                />
                {failCount === 0 ? (
                  <span className="hidden sm:inline">Live</span>
                ) : failCount < 3 ? (
                  <span className="hidden sm:inline">Slow</span>
                ) : (
                  <>
                    <span className="hidden sm:inline">Offline</span>
                    <button
                      onClick={handleManualRetry}
                      className="ml-1 flex items-center gap-1 rounded bg-teal-600 px-1.5 py-0.5 text-xs font-medium text-white hover:bg-teal-500 transition-colors"
                      title="Retry connection"
                    >
                      <RefreshCw className="h-3 w-3" />
                      Retry
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={() => setShowParticipantsManager(true)}
                className="flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-gray-700 transition-colors hover:bg-gray-100 sm:gap-2 sm:text-sm"
                title="Manage participants"
              >
                <Users className="h-4 w-4 text-teal-600" />
                <span className="hidden font-medium sm:inline">{participantCount} joined</span>
                <span className="font-medium sm:hidden">{participantCount}</span>
              </button>
              <div className="flex items-center gap-1.5 rounded-lg bg-purple-100 px-3 py-1.5 text-xs font-semibold text-purple-700 sm:gap-2 sm:text-sm">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Round {session.currentRound}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Room Code Banner */}
        <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#3d4d3d] to-[#4a5d4a] shadow-xl">
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-green-100">Room Code</p>
              <p className="text-3xl font-bold tracking-[0.2em] text-white sm:text-4xl">
                {session.roomCode}
              </p>
              <p className="mt-1.5 text-xs text-green-200 sm:text-sm">
                <span className="hidden sm:inline">Students join at: </span>
                <span className="rounded bg-white/15 px-2 py-0.5 font-mono">
                  /{session.roomCode}/view
                </span>
              </p>
            </div>
            <button
              onClick={copyRoomCode}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 font-semibold text-[#3d4d3d] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5" />
                  Copy Link
                </>
              )}
            </button>
          </div>
        </div>

        {/* Timer & Discussion Control Panel */}
        <div className="mb-6 rounded-2xl bg-white p-4 shadow-xl sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Timer Section */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-teal-600" />
                <span className="font-semibold text-gray-700">Timer</span>
              </div>

              {session.activeTimerType ? (
                <>
                  <div
                    role="timer"
                    aria-live={timerSeconds <= 10 ? 'assertive' : 'polite'}
                    aria-atomic="true"
                    aria-label={`${session.activeTimerType === 'question' ? 'Question' : 'Answer'} timer: ${formatTime(timerSeconds)} remaining`}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-2xl font-bold ${
                      timerSeconds <= 10
                        ? 'animate-pulse bg-red-100 text-red-600'
                        : timerSeconds <= 30
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-green-100 text-green-600'
                    }`}
                  >
                    <Clock className="h-5 w-5" />
                    {formatTime(timerSeconds)}
                  </div>
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                    {session.activeTimerType === 'question' ? 'Asking' : 'Answering'}
                  </span>
                  <button
                    onClick={stopTimer}
                    className="flex items-center gap-1.5 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-200"
                  >
                    <StopCircle className="h-4 w-4" />
                    Stop
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startTimer('question')}
                    className="flex items-center gap-1.5 rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-200"
                  >
                    <Play className="h-4 w-4" />
                    Question ({session.questionTimerSeconds}s)
                  </button>
                  <button
                    onClick={() => startTimer('answer')}
                    className="flex items-center gap-1.5 rounded-lg bg-purple-100 px-3 py-2 text-sm font-medium text-purple-700 transition-colors hover:bg-purple-200"
                  >
                    <Play className="h-4 w-4" />
                    Answer ({session.answerTimerSeconds}s)
                  </button>
                  <button
                    onClick={() => setShowTimerSettings(!showTimerSettings)}
                    className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

            {/* Discussion Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-600">Discussing:</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() =>
                    setDiscussing(session.teamDiscussing === 'TEAM_A' ? null : 'TEAM_A')
                  }
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                    session.teamDiscussing === 'TEAM_A'
                      ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {session.teamAName}
                </button>
                <button
                  onClick={() =>
                    setDiscussing(session.teamDiscussing === 'TEAM_B' ? null : 'TEAM_B')
                  }
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                    session.teamDiscussing === 'TEAM_B'
                      ? 'bg-purple-500 text-white ring-2 ring-purple-300'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                >
                  {session.teamBName}
                </button>
              </div>
            </div>
          </div>

          {/* Timer Settings Panel */}
          {showTimerSettings && (
            <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-600">Question Timer:</label>
                <input
                  type="number"
                  value={questionTimerInput}
                  onChange={(e) => setQuestionTimerInput(e.target.value)}
                  min="10"
                  max="300"
                  className="w-20 rounded-lg border border-gray-300 px-3 py-1.5 text-center text-sm font-semibold focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <span className="text-sm text-gray-500">sec</span>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-600">Answer Timer:</label>
                <input
                  type="number"
                  value={answerTimerInput}
                  onChange={(e) => setAnswerTimerInput(e.target.value)}
                  min="10"
                  max="300"
                  className="w-20 rounded-lg border border-gray-300 px-3 py-1.5 text-center text-sm font-semibold focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
                <span className="text-sm text-gray-500">sec</span>
              </div>
              <button
                onClick={saveTimerSettings}
                className="rounded-lg bg-teal-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-700 hover:shadow-md"
              >
                Save Settings
              </button>
              <button
                onClick={() => setShowTimerSettings(false)}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Score Display */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-6 grid grid-cols-2 gap-4 sm:gap-6">
                {/* Team A */}
                <button
                  onClick={() => setSelectedTeam('TEAM_A')}
                  className={`group relative overflow-hidden rounded-xl border-2 p-4 text-center transition-all duration-200 sm:p-6 ${
                    selectedTeam === 'TEAM_A'
                      ? 'border-blue-500 bg-gradient-to-b from-blue-50 to-blue-100 shadow-lg ring-4 ring-blue-100'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  {selectedTeam === 'TEAM_A' && (
                    <div className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-lg bg-blue-600 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-md">
                      Answering
                    </div>
                  )}
                  <div className="mt-2">
                    <h3 className="mb-2 text-base font-semibold text-gray-700 sm:text-lg">
                      {session.teamAName}
                    </h3>
                    <p className="text-4xl font-bold text-blue-600 sm:text-5xl">
                      {session.teamAScore}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      <Users className="h-3 w-3" />
                      {teamACount} players
                    </div>
                  </div>
                </button>

                {/* Team B */}
                <button
                  onClick={() => setSelectedTeam('TEAM_B')}
                  className={`group relative overflow-hidden rounded-xl border-2 p-4 text-center transition-all duration-200 sm:p-6 ${
                    selectedTeam === 'TEAM_B'
                      ? 'border-purple-500 bg-gradient-to-b from-purple-50 to-purple-100 shadow-lg ring-4 ring-purple-100'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  {selectedTeam === 'TEAM_B' && (
                    <div className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-lg bg-purple-600 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-md">
                      Answering
                    </div>
                  )}
                  <div className="mt-2">
                    <h3 className="mb-2 text-base font-semibold text-gray-700 sm:text-lg">
                      {session.teamBName}
                    </h3>
                    <p className="text-4xl font-bold text-purple-600 sm:text-5xl">
                      {session.teamBScore}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                      <Users className="h-3 w-3" />
                      {teamBCount} players
                    </div>
                  </div>
                </button>
              </div>

              {/* Scoring Buttons */}
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <h4 className="font-semibold text-gray-800">
                    Score for{' '}
                    <span
                      className={selectedTeam === 'TEAM_A' ? 'text-blue-600' : 'text-purple-600'}
                    >
                      {selectedTeam === 'TEAM_A' ? session.teamAName : session.teamBName}
                    </span>
                  </h4>
                  <button
                    onClick={() => setSelectedTeam(selectedTeam === 'TEAM_A' ? 'TEAM_B' : 'TEAM_A')}
                    className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-600 shadow-sm transition-all hover:bg-gray-100 hover:shadow"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                    Switch Team
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <button
                    onClick={() => submitScore('CORRECT')}
                    disabled={actionLoading}
                    className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-green-500 to-green-600 px-4 py-4 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:from-green-400 hover:to-green-500 hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
                  >
                    <Check className="h-7 w-7" />
                    <span>Correct</span>
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                      +{session.scoringRules.correct}
                    </span>
                  </button>

                  <button
                    onClick={() => submitScore('INCORRECT')}
                    disabled={actionLoading}
                    className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-red-500 to-red-600 px-4 py-4 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:from-red-400 hover:to-red-500 hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
                  >
                    <X className="h-7 w-7" />
                    <span>Wrong</span>
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                      {session.scoringRules.wrong}
                    </span>
                  </button>

                  {session.format === 'MODERATOR' && (
                    <button
                      onClick={() => submitScore('PASSED')}
                      disabled={actionLoading}
                      className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-orange-400 to-orange-500 px-4 py-4 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:from-orange-300 hover:to-orange-400 hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
                    >
                      <ArrowRightLeft className="h-7 w-7" />
                      <span>Pass</span>
                      <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                        {session.scoringRules.pass}
                      </span>
                    </button>
                  )}

                  <button
                    onClick={() => setShowPartialInput(!showPartialInput)}
                    disabled={actionLoading}
                    className="flex flex-col items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 px-4 py-4 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:from-blue-400 hover:to-blue-500 hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
                  >
                    <Zap className="h-7 w-7" />
                    <span>Partial</span>
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">Custom</span>
                  </button>
                </div>

                {showPartialInput && (
                  <div className="flex flex-wrap items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
                    <input
                      type="number"
                      value={customPoints}
                      onChange={(e) => setCustomPoints(e.target.value)}
                      placeholder="Points"
                      className="w-28 rounded-lg border-2 border-blue-200 bg-white px-3 py-2 text-center font-semibold focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <button
                      onClick={() => submitScore('PARTIAL', parseInt(customPoints) || 0)}
                      disabled={actionLoading || !customPoints}
                      className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg disabled:opacity-50"
                    >
                      Award Points
                    </button>
                    <button
                      onClick={() => {
                        setShowPartialInput(false)
                        setCustomPoints('')
                      }}
                      className="rounded-lg px-3 py-2 font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {/* Control Buttons */}
                <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-4">
                  <button
                    onClick={undoLastRound}
                    disabled={actionLoading || session.rounds.length === 0}
                    className="flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-4 py-2 font-medium text-gray-600 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow disabled:opacity-50"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Undo Last
                  </button>

                  <button
                    onClick={() => submitScore('SKIPPED')}
                    disabled={actionLoading}
                    className="flex items-center gap-2 rounded-lg border-2 border-gray-200 bg-white px-4 py-2 font-medium text-gray-600 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                    Skip (0 pts)
                  </button>

                  <button
                    onClick={() => setShowEndConfirm(true)}
                    className="ml-auto flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2 font-semibold text-white shadow-md transition-all hover:bg-gray-800 hover:shadow-lg"
                  >
                    <StopCircle className="h-4 w-4" />
                    End Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Round History */}
          <div className="rounded-2xl bg-white p-5 shadow-xl">
            <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-gray-900">
              <div className="rounded-lg bg-gray-100 p-1.5">
                <Clock className="h-4 w-4 text-gray-600" />
              </div>
              Round History
            </h3>

            {session.rounds.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-gray-200 py-10 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <Play className="h-5 w-5 text-gray-400" />
                </div>
                <p className="font-medium text-gray-500">No rounds yet</p>
                <p className="mt-1 text-sm text-gray-400">Start scoring to see history</p>
              </div>
            ) : (
              <div className="max-h-[400px] space-y-2 overflow-y-auto pr-1">
                {session.rounds.map((round) => (
                  <div
                    key={round.id}
                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-gradient-to-r from-gray-50 to-white p-3 transition-colors hover:border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200 text-sm font-bold text-gray-700">
                        {round.roundNumber}
                      </span>
                      <div>
                        <p
                          className={`text-sm font-medium ${round.answeringTeam === 'TEAM_A' ? 'text-blue-700' : 'text-purple-700'}`}
                        >
                          {round.answeringTeam === 'TEAM_A' ? session.teamAName : session.teamBName}
                        </p>
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${getOutcomeColor(round.outcome)}`}
                        >
                          {getOutcomeLabel(round.outcome)}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`rounded-lg px-2 py-1 text-sm font-bold ${round.pointsChange >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}
                    >
                      {round.pointsChange >= 0 ? '+' : ''}
                      {round.pointsChange}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Team Chat Monitor */}
          <div className="lg:col-span-2 rounded-2xl bg-white p-5 shadow-xl">
            <button
              onClick={() => setChatExpanded(!chatExpanded)}
              className="flex w-full items-center justify-between rounded-lg p-1 transition-colors hover:bg-gray-50"
            >
              <h3 className="flex items-center gap-2 text-base font-semibold text-gray-900">
                <div className="rounded-lg bg-gray-100 p-1.5">
                  <MessageSquare className="h-4 w-4 text-gray-600" />
                </div>
                Team Chats
                {chatMessages.length > 0 && (
                  <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
                    {chatMessages.length}
                  </span>
                )}
              </h3>
              <div className="rounded-lg bg-gray-100 p-1">
                {chatExpanded ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </div>
            </button>

            {chatExpanded && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {/* Team A Messages */}
                <div className="rounded-xl border border-blue-100 bg-gradient-to-b from-blue-50/50 to-white p-3">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-blue-700">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                      A
                    </span>
                    {session.teamAName}
                    <span className="ml-auto rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">
                      {chatMessages.filter((m) => m.team === 'TEAM_A').length}
                    </span>
                  </h4>
                  <div className="max-h-36 space-y-1.5 overflow-y-auto">
                    {chatMessages.filter((m) => m.team === 'TEAM_A').length === 0 ? (
                      <p className="py-4 text-center text-xs text-gray-400">No messages yet</p>
                    ) : (
                      chatMessages
                        .filter((m) => m.team === 'TEAM_A')
                        .map((msg) => (
                          <div
                            key={msg.id}
                            className="rounded-lg border border-blue-100 bg-white p-2.5 text-xs shadow-sm"
                          >
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-blue-700">{msg.senderName}</span>
                              <span className="text-[10px] text-gray-400">
                                {formatRelativeTime(msg.createdAt)}
                              </span>
                            </div>
                            <p className="mt-0.5 text-gray-700">{msg.message}</p>
                          </div>
                        ))
                    )}
                  </div>
                </div>

                {/* Team B Messages */}
                <div className="rounded-xl border border-purple-100 bg-gradient-to-b from-purple-50/50 to-white p-3">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-purple-700">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-[10px] font-bold text-white">
                      B
                    </span>
                    {session.teamBName}
                    <span className="ml-auto rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600">
                      {chatMessages.filter((m) => m.team === 'TEAM_B').length}
                    </span>
                  </h4>
                  <div className="max-h-36 space-y-1.5 overflow-y-auto">
                    {chatMessages.filter((m) => m.team === 'TEAM_B').length === 0 ? (
                      <p className="py-4 text-center text-xs text-gray-400">No messages yet</p>
                    ) : (
                      chatMessages
                        .filter((m) => m.team === 'TEAM_B')
                        .map((msg) => (
                          <div
                            key={msg.id}
                            className="rounded-lg border border-purple-100 bg-white p-2.5 text-xs shadow-sm"
                          >
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-purple-700">
                                {msg.senderName}
                              </span>
                              <span className="text-[10px] text-gray-400">
                                {formatRelativeTime(msg.createdAt)}
                              </span>
                            </div>
                            <p className="mt-0.5 text-gray-700">{msg.message}</p>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* End Quiz Confirmation Modal */}
      {showEndConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
              <h3 className="text-xl font-bold text-white">End Quiz?</h3>
              <p className="mt-1 text-sm text-gray-300">
                This will finalize the scores and save the results.
              </p>
            </div>
            <div className="p-6">
              <div className="mb-5 space-y-3 rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                      A
                    </span>
                    <span className="font-medium text-gray-700">{session.teamAName}</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">{session.teamAScore}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">
                      B
                    </span>
                    <span className="font-medium text-gray-700">{session.teamBName}</span>
                  </div>
                  <span className="text-lg font-bold text-purple-600">{session.teamBScore}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEndConfirm(false)}
                  className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-2.5 font-semibold text-gray-700 transition-all hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={endQuiz}
                  disabled={actionLoading}
                  className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 font-semibold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl disabled:opacity-50"
                >
                  {actionLoading ? 'Ending...' : 'End Quiz'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Participants Manager Modal */}
      {showParticipantsManager && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4">
              <h3 className="text-xl font-bold text-white">Manage Participants</h3>
              <p className="mt-1 text-sm text-teal-100">
                {participantCount} participant{participantCount !== 1 ? 's' : ''} in the quiz
              </p>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {/* Team A Participants */}
              <div className="mb-4">
                <h4 className="mb-2 flex items-center gap-2 font-semibold text-blue-700">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                    A
                  </span>
                  {session.teamAName} ({teamACount})
                </h4>
                <div className="space-y-2">
                  {session.participants
                    .filter((p) => p.team === 'TEAM_A' && !p.isHost)
                    .map((participant) => (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between rounded-lg border border-blue-100 bg-blue-50/50 px-3 py-2"
                      >
                        <span className="font-medium text-gray-700">{participant.name}</span>
                        <button
                          onClick={() => removeParticipant(participant.id, participant.name)}
                          disabled={removingParticipantId === participant.id}
                          className="flex items-center gap-1 rounded-lg bg-red-100 px-2 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-200 disabled:opacity-50"
                        >
                          {removingParticipantId === participant.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <UserMinus className="h-3 w-3" />
                          )}
                          Remove
                        </button>
                      </div>
                    ))}
                  {session.participants.filter((p) => p.team === 'TEAM_A' && !p.isHost).length ===
                    0 && <p className="py-2 text-center text-sm text-gray-400">No participants</p>}
                </div>
              </div>

              {/* Team B Participants */}
              <div className="mb-4">
                <h4 className="mb-2 flex items-center gap-2 font-semibold text-purple-700">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-xs font-bold text-white">
                    B
                  </span>
                  {session.teamBName} ({teamBCount})
                </h4>
                <div className="space-y-2">
                  {session.participants
                    .filter((p) => p.team === 'TEAM_B' && !p.isHost)
                    .map((participant) => (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between rounded-lg border border-purple-100 bg-purple-50/50 px-3 py-2"
                      >
                        <span className="font-medium text-gray-700">{participant.name}</span>
                        <button
                          onClick={() => removeParticipant(participant.id, participant.name)}
                          disabled={removingParticipantId === participant.id}
                          className="flex items-center gap-1 rounded-lg bg-red-100 px-2 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-200 disabled:opacity-50"
                        >
                          {removingParticipantId === participant.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <UserMinus className="h-3 w-3" />
                          )}
                          Remove
                        </button>
                      </div>
                    ))}
                  {session.participants.filter((p) => p.team === 'TEAM_B' && !p.isHost).length ===
                    0 && <p className="py-2 text-center text-sm text-gray-400">No participants</p>}
                </div>
              </div>

              {/* Unassigned Participants */}
              {session.participants.filter((p) => !p.team && !p.isHost).length > 0 && (
                <div>
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-600">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-bold text-white">
                      ?
                    </span>
                    Unassigned ({session.participants.filter((p) => !p.team && !p.isHost).length})
                  </h4>
                  <div className="space-y-2">
                    {session.participants
                      .filter((p) => !p.team && !p.isHost)
                      .map((participant) => (
                        <div
                          key={participant.id}
                          className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
                        >
                          <span className="font-medium text-gray-700">{participant.name}</span>
                          <button
                            onClick={() => removeParticipant(participant.id, participant.name)}
                            disabled={removingParticipantId === participant.id}
                            className="flex items-center gap-1 rounded-lg bg-red-100 px-2 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-200 disabled:opacity-50"
                          >
                            {removingParticipantId === participant.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <UserMinus className="h-3 w-3" />
                            )}
                            Remove
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-gray-100 p-4">
              <button
                onClick={() => setShowParticipantsManager(false)}
                className="w-full rounded-xl bg-gray-100 px-4 py-2.5 font-semibold text-gray-700 transition-all hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
