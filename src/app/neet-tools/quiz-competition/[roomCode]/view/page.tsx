'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Loader2,
  Trophy,
  Clock,
  Users,
  X,
  Wifi,
  WifiOff,
  Check,
  ArrowRightLeft,
  Zap,
  Minus,
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

interface QuizSession {
  id: string
  roomCode: string
  title: string
  format: 'MODERATOR' | 'TEAMS_ASK_EACH_OTHER'
  status: 'WAITING' | 'IN_PROGRESS' | 'PAUSED' | 'COMPLETED'
  teamAName: string
  teamBName: string
  teamAScore: number
  teamBScore: number
  currentRound: number
  rounds: Round[]
  startedAt: string | null
  endedAt: string | null
}

export default function StudentViewPage() {
  const params = useParams()
  const roomCode = params.roomCode as string

  const [session, setSession] = useState<QuizSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

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
        setIsConnected(true)
        setLastUpdate(new Date())
      } else {
        setError(data.error || 'Failed to load quiz')
      }
    } catch {
      setIsConnected(false)
    } finally {
      setLoading(false)
    }
  }, [roomCode])

  useEffect(() => {
    fetchSession()
    // Poll every 1 second for real-time score updates
    const interval = setInterval(fetchSession, 1000)
    return () => clearInterval(interval)
  }, [fetchSession])

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'CORRECT':
        return <Check className="h-4 w-4 text-green-600" />
      case 'INCORRECT':
        return <X className="h-4 w-4 text-red-600" />
      case 'PASSED':
        return <ArrowRightLeft className="h-4 w-4 text-orange-600" />
      case 'PARTIAL':
        return <Zap className="h-4 w-4 text-blue-600" />
      case 'SKIPPED':
        return <Minus className="h-4 w-4 text-gray-600" />
      default:
        return null
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

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-900 to-purple-900">
        <div className="text-center text-white">
          <Loader2 className="mx-auto h-12 w-12 animate-spin" />
          <p className="mt-4">Connecting to quiz...</p>
        </div>
      </main>
    )
  }

  if (error || !session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-900 to-purple-900 p-4">
        <div className="text-center text-white">
          <X className="mx-auto h-16 w-16 text-red-400" />
          <h1 className="mt-4 text-2xl font-bold">Quiz Not Found</h1>
          <p className="mt-2 text-indigo-200">{error || 'This room code is invalid.'}</p>
          <Link
            href="/neet-tools/quiz-competition"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-indigo-600 hover:bg-indigo-50"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Quiz Competition
          </Link>
        </div>
      </main>
    )
  }

  if (session.status === 'COMPLETED') {
    const winner =
      session.teamAScore > session.teamBScore
        ? session.teamAName
        : session.teamBScore > session.teamAScore
          ? session.teamBName
          : null

    return (
      <main className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 p-4">
        <div className="mx-auto max-w-lg pt-8 text-center sm:pt-12">
          <Trophy className="mx-auto h-16 w-16 text-yellow-400 sm:h-20 sm:w-20" />
          <h1 className="mt-4 text-2xl font-bold text-white sm:mt-6 sm:text-3xl">Quiz Complete!</h1>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
            <div
              className={`rounded-2xl p-4 sm:p-6 ${session.teamAScore >= session.teamBScore ? 'bg-yellow-400/20 ring-4 ring-yellow-400' : 'bg-white/10'}`}
            >
              <p className="truncate text-sm font-medium text-indigo-200 sm:text-lg">{session.teamAName}</p>
              <p className="mt-2 text-4xl font-bold text-white sm:text-5xl">{session.teamAScore}</p>
              {session.teamAScore > session.teamBScore && (
                <span className="mt-2 inline-block rounded-full bg-yellow-400 px-2 py-0.5 text-xs font-bold text-yellow-900 sm:px-3 sm:py-1 sm:text-sm">
                  WINNER
                </span>
              )}
            </div>
            <div
              className={`rounded-2xl p-4 sm:p-6 ${session.teamBScore >= session.teamAScore ? 'bg-yellow-400/20 ring-4 ring-yellow-400' : 'bg-white/10'}`}
            >
              <p className="truncate text-sm font-medium text-indigo-200 sm:text-lg">{session.teamBName}</p>
              <p className="mt-2 text-4xl font-bold text-white sm:text-5xl">{session.teamBScore}</p>
              {session.teamBScore > session.teamAScore && (
                <span className="mt-2 inline-block rounded-full bg-yellow-400 px-2 py-0.5 text-xs font-bold text-yellow-900 sm:px-3 sm:py-1 sm:text-sm">
                  WINNER
                </span>
              )}
            </div>
          </div>

          {!winner && (
            <p className="mt-4 text-lg font-semibold text-yellow-300 sm:mt-6 sm:text-xl">It&apos;s a tie!</p>
          )}

          <p className="mt-4 text-sm text-indigo-300 sm:mt-6 sm:text-base">
            Total Rounds: {session.currentRound}
          </p>

          <Link
            href="/neet-tools/quiz-competition"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 font-semibold text-indigo-600 hover:bg-indigo-50 sm:mt-8 sm:px-6 sm:py-3"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900">
      {/* Connection Status */}
      <div
        className={`fixed right-4 top-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ${
          isConnected ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
        }`}
      >
        {isConnected ? (
          <>
            <Wifi className="h-4 w-4" />
            <span>Live</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            <span>Reconnecting...</span>
          </>
        )}
      </div>

      <div className="mx-auto max-w-lg px-4 py-6">
        {/* Header */}
        <div className="mb-6 text-center">
          <Link
            href="/neet-tools/quiz-competition"
            className="mb-4 inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Exit Quiz
          </Link>
          <h1 className="text-2xl font-bold text-white">{session.title}</h1>
          <div className="mt-2 flex items-center justify-center gap-4 text-sm text-indigo-300">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Round {session.currentRound}
            </span>
            <span className="rounded-full bg-indigo-500/30 px-2 py-0.5 text-xs">
              {session.roomCode}
            </span>
          </div>
        </div>

        {/* Live Scoreboard */}
        <div className="mb-6 rounded-2xl bg-white/10 p-1 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-1">
            {/* Team A */}
            <div
              className={`rounded-xl p-4 text-center transition-all sm:p-6 ${
                session.teamAScore > session.teamBScore
                  ? 'bg-gradient-to-br from-indigo-500 to-indigo-600'
                  : 'bg-white/10'
              }`}
            >
              <h3 className="truncate text-sm font-semibold text-white/90 sm:text-lg">{session.teamAName}</h3>
              <p className="my-2 text-5xl font-bold text-white sm:my-3 sm:text-6xl">{session.teamAScore}</p>
              {session.teamAScore > session.teamBScore && (
                <span className="inline-flex items-center gap-1 text-xs text-indigo-200 sm:text-sm">
                  <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
                  Leading
                </span>
              )}
            </div>

            {/* Team B */}
            <div
              className={`rounded-xl p-4 text-center transition-all sm:p-6 ${
                session.teamBScore > session.teamAScore
                  ? 'bg-gradient-to-br from-purple-500 to-purple-600'
                  : 'bg-white/10'
              }`}
            >
              <h3 className="truncate text-sm font-semibold text-white/90 sm:text-lg">{session.teamBName}</h3>
              <p className="my-2 text-5xl font-bold text-white sm:my-3 sm:text-6xl">{session.teamBScore}</p>
              {session.teamBScore > session.teamAScore && (
                <span className="inline-flex items-center gap-1 text-xs text-purple-200 sm:text-sm">
                  <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
                  Leading
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Status Banner */}
        {session.status === 'WAITING' && (
          <div className="mb-6 rounded-xl bg-yellow-500/20 p-4 text-center">
            <p className="font-medium text-yellow-300">Waiting for quiz to start...</p>
          </div>
        )}

        {session.status === 'PAUSED' && (
          <div className="mb-6 rounded-xl bg-orange-500/20 p-4 text-center">
            <p className="font-medium text-orange-300">Quiz is paused</p>
          </div>
        )}

        {/* Recent Rounds */}
        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
          <h3 className="mb-3 flex items-center gap-2 font-semibold text-white">
            <Clock className="h-5 w-5 text-indigo-300" />
            Recent Activity
          </h3>

          {session.rounds.length === 0 ? (
            <div className="py-6 text-center text-indigo-300">
              <Users className="mx-auto mb-2 h-8 w-8 opacity-50" />
              <p>No rounds yet</p>
              <p className="text-sm opacity-75">Waiting for the first question...</p>
            </div>
          ) : (
            <div className="space-y-2">
              {session.rounds.slice(0, 10).map((round, index) => (
                <div
                  key={round.id}
                  className={`flex items-center justify-between rounded-lg p-3 ${
                    index === 0 ? 'bg-white/20' : 'bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
                      {round.roundNumber}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {round.answeringTeam === 'TEAM_A' ? session.teamAName : session.teamBName}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-indigo-300">
                        {getOutcomeIcon(round.outcome)}
                        <span>{getOutcomeLabel(round.outcome)}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-lg font-bold ${
                      round.pointsChange >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {round.pointsChange >= 0 ? '+' : ''}
                    {round.pointsChange}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Last Updated */}
        <p className="mt-4 text-center text-xs text-indigo-400">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </p>
      </div>
    </main>
  )
}
