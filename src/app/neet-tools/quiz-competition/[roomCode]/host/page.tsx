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
} from 'lucide-react'

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
  const [lastMessageId, setLastMessageId] = useState<string | null>(null)

  const fetchSession = useCallback(async () => {
    try {
      // Add cache-busting timestamp to prevent stale data
      const res = await fetch(`/api/quiz/${roomCode}?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
      const data = await res.json()
      if (data.success) {
        setSession(data.data)
      } else {
        setError(data.error || 'Failed to load quiz')
      }
    } catch {
      setError('Failed to load quiz session')
    } finally {
      setLoading(false)
    }
  }, [roomCode])

  const fetchMessages = useCallback(async () => {
    try {
      const url = new URL(`/api/quiz/${roomCode}/chat`, window.location.origin)
      url.searchParams.set('isHost', 'true')
      if (lastMessageId) {
        url.searchParams.set('after', lastMessageId)
      }
      url.searchParams.set('t', Date.now().toString())

      const res = await fetch(url.toString(), {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      })
      const data = await res.json()
      if (data.success && data.data.length > 0) {
        setChatMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m.id))
          const newMessages = data.data.filter((m: ChatMessage) => !existingIds.has(m.id))
          return [...prev, ...newMessages]
        })
        setLastMessageId(data.data[data.data.length - 1].id)
      }
    } catch (err) {
      console.error('Error fetching chat messages:', err)
    }
  }, [roomCode, lastMessageId])

  useEffect(() => {
    fetchSession()
    const interval = setInterval(fetchSession, 3000)
    return () => clearInterval(interval)
  }, [fetchSession])

  useEffect(() => {
    fetchMessages()
    const chatInterval = setInterval(fetchMessages, 2000)
    return () => clearInterval(chatInterval)
  }, [fetchMessages])

  const copyRoomCode = async () => {
    await navigator.clipboard.writeText(roomCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const submitScore = async (outcome: string, points?: number) => {
    if (!session) return
    setActionLoading(true)

    try {
      const body: Record<string, unknown> = {
        team: selectedTeam,
        outcome,
      }
      if (points !== undefined) {
        body.customPoints = points
      }

      const res = await fetch(`/api/quiz/${roomCode}/score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      const res = await fetch(`/api/quiz/${roomCode}/score`, {
        method: 'DELETE',
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
      const res = await fetch(`/api/quiz/${roomCode}/end`, {
        method: 'POST',
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
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="/neet-tools/quiz-competition"
                className="flex items-center gap-1 text-gray-600 hover:text-indigo-600 sm:gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Exit</span>
              </Link>
              <div className="min-w-0">
                <h1 className="truncate font-bold text-gray-900">{session.title}</h1>
                <p className="hidden text-sm text-gray-500 sm:block">
                  {session.format === 'MODERATOR' ? 'Moderator Mode' : 'Teams Ask Each Other'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 text-xs text-gray-600 sm:gap-2 sm:text-sm">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">{participantCount} joined</span>
                <span className="sm:hidden">{participantCount}</span>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700 sm:gap-2 sm:text-sm">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>R{session.currentRound}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Room Code Banner */}
        <div className="mb-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white shadow-lg sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-indigo-100">Room Code</p>
              <p className="text-3xl font-bold tracking-widest sm:text-4xl">{session.roomCode}</p>
              <p className="mt-1 text-xs text-indigo-200 sm:text-sm">
                <span className="hidden sm:inline">Students join at: </span>
                <span className="font-mono">/{session.roomCode}/view</span>
              </p>
            </div>
            <button
              onClick={copyRoomCode}
              className="flex items-center justify-center gap-2 rounded-lg bg-white/20 px-4 py-2 font-medium transition-colors hover:bg-white/30"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5" />
                  Copy Code
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Score Display */}
          <div className="lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-lg">
              <div className="mb-6 grid grid-cols-2 gap-6">
                {/* Team A */}
                <button
                  onClick={() => setSelectedTeam('TEAM_A')}
                  className={`relative rounded-xl border-4 p-6 text-center transition-all ${
                    selectedTeam === 'TEAM_A'
                      ? 'border-indigo-500 bg-indigo-50 ring-4 ring-indigo-200'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  {selectedTeam === 'TEAM_A' && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white">
                      ANSWERING
                    </div>
                  )}
                  <h3 className="mb-1 text-lg font-semibold text-gray-700">{session.teamAName}</h3>
                  <p className="text-5xl font-bold text-indigo-600">{session.teamAScore}</p>
                  <p className="mt-2 text-sm text-gray-500">{teamACount} players</p>
                </button>

                {/* Team B */}
                <button
                  onClick={() => setSelectedTeam('TEAM_B')}
                  className={`relative rounded-xl border-4 p-6 text-center transition-all ${
                    selectedTeam === 'TEAM_B'
                      ? 'border-purple-500 bg-purple-50 ring-4 ring-purple-200'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {selectedTeam === 'TEAM_B' && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-3 py-1 text-xs font-bold text-white">
                      ANSWERING
                    </div>
                  )}
                  <h3 className="mb-1 text-lg font-semibold text-gray-700">{session.teamBName}</h3>
                  <p className="text-5xl font-bold text-purple-600">{session.teamBScore}</p>
                  <p className="mt-2 text-sm text-gray-500">{teamBCount} players</p>
                </button>
              </div>

              {/* Scoring Buttons */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-700">
                    Score for {selectedTeam === 'TEAM_A' ? session.teamAName : session.teamBName}
                  </h4>
                  <button
                    onClick={() => setSelectedTeam(selectedTeam === 'TEAM_A' ? 'TEAM_B' : 'TEAM_A')}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                    Switch Team
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <button
                    onClick={() => submitScore('CORRECT')}
                    disabled={actionLoading}
                    className="flex flex-col items-center justify-center gap-1 rounded-xl bg-green-600 px-4 py-4 font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                  >
                    <Check className="h-6 w-6" />
                    <span>Correct</span>
                    <span className="text-sm opacity-80">+{session.scoringRules.correct}</span>
                  </button>

                  <button
                    onClick={() => submitScore('INCORRECT')}
                    disabled={actionLoading}
                    className="flex flex-col items-center justify-center gap-1 rounded-xl bg-red-600 px-4 py-4 font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                  >
                    <X className="h-6 w-6" />
                    <span>Wrong</span>
                    <span className="text-sm opacity-80">{session.scoringRules.wrong}</span>
                  </button>

                  {session.format === 'MODERATOR' && (
                    <button
                      onClick={() => submitScore('PASSED')}
                      disabled={actionLoading}
                      className="flex flex-col items-center justify-center gap-1 rounded-xl bg-orange-500 px-4 py-4 font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-50"
                    >
                      <ArrowRightLeft className="h-6 w-6" />
                      <span>Pass</span>
                      <span className="text-sm opacity-80">{session.scoringRules.pass}</span>
                    </button>
                  )}

                  <button
                    onClick={() => setShowPartialInput(!showPartialInput)}
                    disabled={actionLoading}
                    className="flex flex-col items-center justify-center gap-1 rounded-xl bg-blue-600 px-4 py-4 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                  >
                    <Zap className="h-6 w-6" />
                    <span>Partial</span>
                    <span className="text-sm opacity-80">Custom</span>
                  </button>
                </div>

                {showPartialInput && (
                  <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4">
                    <input
                      type="number"
                      value={customPoints}
                      onChange={(e) => setCustomPoints(e.target.value)}
                      placeholder="Enter points"
                      className="w-32 rounded-lg border border-blue-300 px-3 py-2 text-center focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <button
                      onClick={() => submitScore('PARTIAL', parseInt(customPoints) || 0)}
                      disabled={actionLoading || !customPoints}
                      className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                      Award Points
                    </button>
                    <button
                      onClick={() => {
                        setShowPartialInput(false)
                        setCustomPoints('')
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {/* Control Buttons */}
                <div className="flex flex-wrap gap-3 border-t border-gray-200 pt-4">
                  <button
                    onClick={undoLastRound}
                    disabled={actionLoading || session.rounds.length === 0}
                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Undo Last
                  </button>

                  <button
                    onClick={() => submitScore('SKIPPED')}
                    disabled={actionLoading}
                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                    Skip (0 pts)
                  </button>

                  <button
                    onClick={() => setShowEndConfirm(true)}
                    className="ml-auto flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-900"
                  >
                    <StopCircle className="h-4 w-4" />
                    End Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Round History */}
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
              <Clock className="h-5 w-5 text-gray-500" />
              Round History
            </h3>

            {session.rounds.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                <Play className="mx-auto mb-2 h-8 w-8" />
                <p>No rounds yet</p>
                <p className="text-sm">Start scoring to see history</p>
              </div>
            ) : (
              <div className="max-h-96 space-y-2 overflow-y-auto">
                {session.rounds.map((round) => (
                  <div
                    key={round.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-600">
                        {round.roundNumber}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {round.answeringTeam === 'TEAM_A' ? session.teamAName : session.teamBName}
                        </p>
                        <span
                          className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${getOutcomeColor(round.outcome)}`}
                        >
                          {getOutcomeLabel(round.outcome)}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`font-bold ${round.pointsChange >= 0 ? 'text-green-600' : 'text-red-600'}`}
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
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <button
              onClick={() => setChatExpanded(!chatExpanded)}
              className="flex w-full items-center justify-between"
            >
              <h3 className="flex items-center gap-2 font-semibold text-gray-900">
                <MessageSquare className="h-5 w-5 text-gray-500" />
                Team Chats
                {chatMessages.length > 0 && (
                  <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                    {chatMessages.length}
                  </span>
                )}
              </h3>
              {chatExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>

            {chatExpanded && (
              <div className="mt-4 space-y-4">
                {/* Team A Messages */}
                <div>
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-600">
                    <span className="h-2 w-2 rounded-full bg-indigo-500" />
                    {session.teamAName}
                  </h4>
                  <div className="max-h-32 space-y-1 overflow-y-auto rounded-lg bg-indigo-50 p-2">
                    {chatMessages.filter((m) => m.team === 'TEAM_A').length === 0 ? (
                      <p className="py-2 text-center text-xs text-gray-400">No messages yet</p>
                    ) : (
                      chatMessages
                        .filter((m) => m.team === 'TEAM_A')
                        .map((msg) => (
                          <div key={msg.id} className="rounded bg-white p-2 text-xs shadow-sm">
                            <span className="font-semibold text-indigo-700">{msg.senderName}:</span>{' '}
                            <span className="text-gray-700">{msg.message}</span>
                          </div>
                        ))
                    )}
                  </div>
                </div>

                {/* Team B Messages */}
                <div>
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-purple-600">
                    <span className="h-2 w-2 rounded-full bg-purple-500" />
                    {session.teamBName}
                  </h4>
                  <div className="max-h-32 space-y-1 overflow-y-auto rounded-lg bg-purple-50 p-2">
                    {chatMessages.filter((m) => m.team === 'TEAM_B').length === 0 ? (
                      <p className="py-2 text-center text-xs text-gray-400">No messages yet</p>
                    ) : (
                      chatMessages
                        .filter((m) => m.team === 'TEAM_B')
                        .map((msg) => (
                          <div key={msg.id} className="rounded bg-white p-2 text-xs shadow-sm">
                            <span className="font-semibold text-purple-700">{msg.senderName}:</span>{' '}
                            <span className="text-gray-700">{msg.message}</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="mb-2 text-xl font-bold text-gray-900">End Quiz?</h3>
            <p className="mb-6 text-gray-600">
              This will finalize the scores and save the results. This action cannot be undone.
            </p>
            <div className="mb-4 rounded-lg bg-gray-100 p-4">
              <div className="flex justify-between">
                <span className="font-medium">{session.teamAName}</span>
                <span className="font-bold text-indigo-600">{session.teamAScore}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">{session.teamBName}</span>
                <span className="font-bold text-purple-600">{session.teamBScore}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEndConfirm(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={endQuiz}
                disabled={actionLoading}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {actionLoading ? 'Ending...' : 'End Quiz'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
