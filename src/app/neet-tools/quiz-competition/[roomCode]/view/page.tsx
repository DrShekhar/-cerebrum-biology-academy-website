'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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
  MessageCircle,
  Send,
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

interface ChatMessage {
  id: string
  team: 'TEAM_A' | 'TEAM_B'
  participantId: string
  senderName: string
  message: string
  createdAt: string
}

interface ParticipantInfo {
  id: string
  name: string
  team: 'TEAM_A' | 'TEAM_B'
}

export default function StudentViewPage() {
  const params = useParams()
  const roomCode = params.roomCode as string

  const [session, setSession] = useState<QuizSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Join state
  const [participant, setParticipant] = useState<ParticipantInfo | null>(null)
  const [joinName, setJoinName] = useState('')
  const [selectedTeam, setSelectedTeam] = useState<'TEAM_A' | 'TEAM_B' | null>(null)
  const [joining, setJoining] = useState(false)
  const [joinError, setJoinError] = useState<string | null>(null)

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)
  const [chatExpanded, setChatExpanded] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const lastMessageIdRef = useRef<string | null>(null)

  const fetchSession = useCallback(async () => {
    try {
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

  const fetchMessages = useCallback(async () => {
    if (!participant) return

    try {
      const url = `/api/quiz/${roomCode}/chat?team=${participant.team}&t=${Date.now()}${lastMessageIdRef.current ? `&after=${lastMessageIdRef.current}` : ''}`
      const res = await fetch(url, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      })
      const data = await res.json()
      if (data.success && data.data.length > 0) {
        setMessages((prev) => {
          const existingIds = new Set(prev.map((m) => m.id))
          const newMsgs = data.data.filter((m: ChatMessage) => !existingIds.has(m.id))
          if (newMsgs.length > 0) {
            lastMessageIdRef.current = newMsgs[newMsgs.length - 1].id
            return [...prev, ...newMsgs]
          }
          return prev
        })
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err)
    }
  }, [roomCode, participant])

  useEffect(() => {
    fetchSession()
    const interval = setInterval(fetchSession, 1000)
    return () => clearInterval(interval)
  }, [fetchSession])

  useEffect(() => {
    if (!participant) return
    fetchMessages()
    const interval = setInterval(fetchMessages, 1000)
    return () => clearInterval(interval)
  }, [fetchMessages, participant])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleJoin = async () => {
    if (!joinName.trim() || !selectedTeam) return

    setJoining(true)
    setJoinError(null)

    try {
      const res = await fetch(`/api/quiz/${roomCode}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: joinName.trim(),
          team: selectedTeam,
        }),
      })

      const data = await res.json()
      if (data.success) {
        setParticipant({
          id: data.data.participantId,
          name: data.data.name,
          team: data.data.team,
        })
      } else {
        setJoinError(data.error || 'Failed to join')
      }
    } catch {
      setJoinError('Failed to join quiz')
    } finally {
      setJoining(false)
    }
  }

  const sendMessage = async () => {
    if (!participant || !newMessage.trim()) return

    setSendingMessage(true)
    try {
      const res = await fetch(`/api/quiz/${roomCode}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantId: participant.id,
          message: newMessage.trim(),
        }),
      })

      const data = await res.json()
      if (data.success) {
        setMessages((prev) => [...prev, data.data])
        setNewMessage('')
        lastMessageIdRef.current = data.data.id
      }
    } catch (err) {
      console.error('Failed to send message:', err)
    } finally {
      setSendingMessage(false)
    }
  }

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

  // Join screen - show if not joined yet
  if (!participant) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-900 to-purple-900 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
          <h1 className="mb-2 text-center text-2xl font-bold text-white">{session.title}</h1>
          <p className="mb-6 text-center text-indigo-200">Join to participate in team chat</p>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-indigo-200">Your Name</label>
              <input
                type="text"
                value={joinName}
                onChange={(e) => setJoinName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-indigo-300 focus:border-white/40 focus:outline-none"
                maxLength={30}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-indigo-200">Select Your Team</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedTeam('TEAM_A')}
                  className={`rounded-xl border-2 p-4 text-center transition-all ${
                    selectedTeam === 'TEAM_A'
                      ? 'border-indigo-400 bg-indigo-500/30'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <p className="font-semibold text-white">{session.teamAName}</p>
                  <p className="mt-1 text-2xl font-bold text-indigo-300">{session.teamAScore}</p>
                </button>
                <button
                  onClick={() => setSelectedTeam('TEAM_B')}
                  className={`rounded-xl border-2 p-4 text-center transition-all ${
                    selectedTeam === 'TEAM_B'
                      ? 'border-purple-400 bg-purple-500/30'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <p className="font-semibold text-white">{session.teamBName}</p>
                  <p className="mt-1 text-2xl font-bold text-purple-300">{session.teamBScore}</p>
                </button>
              </div>
            </div>

            {joinError && (
              <p className="rounded-lg bg-red-500/20 p-3 text-center text-sm text-red-300">{joinError}</p>
            )}

            <button
              onClick={handleJoin}
              disabled={joining || !joinName.trim() || !selectedTeam}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 font-semibold text-indigo-600 transition-colors hover:bg-indigo-50 disabled:opacity-50"
            >
              {joining ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  <Users className="h-5 w-5" />
                  Join Quiz
                </>
              )}
            </button>

            <p className="text-center text-xs text-indigo-300">
              Room Code: <span className="font-mono font-bold">{session.roomCode}</span>
            </p>
          </div>
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

  const isTeamA = participant.team === 'TEAM_A'
  const teamName = isTeamA ? session.teamAName : session.teamBName

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900">
      {/* Connection Status */}
      <div
        className={`fixed right-4 top-4 z-10 flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ${
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
        <div className="mb-4 text-center">
          <Link
            href="/neet-tools/quiz-competition"
            className="mb-2 inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Exit Quiz
          </Link>
          <h1 className="text-xl font-bold text-white">{session.title}</h1>
          <div className="mt-1 flex items-center justify-center gap-3 text-sm text-indigo-300">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              R{session.currentRound}
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${isTeamA ? 'bg-indigo-500/30' : 'bg-purple-500/30'}`}
            >
              {teamName}
            </span>
          </div>
        </div>

        {/* Compact Scoreboard */}
        <div className="mb-4 rounded-xl bg-white/10 p-1">
          <div className="grid grid-cols-2 gap-1">
            <div
              className={`rounded-lg p-3 text-center ${
                session.teamAScore > session.teamBScore ? 'bg-indigo-500/50' : 'bg-white/5'
              } ${participant.team === 'TEAM_A' ? 'ring-2 ring-indigo-400' : ''}`}
            >
              <p className="truncate text-xs font-medium text-white/80">{session.teamAName}</p>
              <p className="text-3xl font-bold text-white">{session.teamAScore}</p>
            </div>
            <div
              className={`rounded-lg p-3 text-center ${
                session.teamBScore > session.teamAScore ? 'bg-purple-500/50' : 'bg-white/5'
              } ${participant.team === 'TEAM_B' ? 'ring-2 ring-purple-400' : ''}`}
            >
              <p className="truncate text-xs font-medium text-white/80">{session.teamBName}</p>
              <p className="text-3xl font-bold text-white">{session.teamBScore}</p>
            </div>
          </div>
        </div>

        {/* Status Banner */}
        {session.status === 'WAITING' && (
          <div className="mb-4 rounded-lg bg-yellow-500/20 p-3 text-center">
            <p className="text-sm font-medium text-yellow-300">Waiting for quiz to start...</p>
          </div>
        )}

        {/* Team Chat */}
        <div className="mb-4 rounded-xl bg-white/10 backdrop-blur-sm">
          <button
            onClick={() => setChatExpanded(!chatExpanded)}
            className="flex w-full items-center justify-between p-4"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className={`h-5 w-5 ${isTeamA ? 'text-indigo-300' : 'text-purple-300'}`} />
              <span className="font-semibold text-white">Team Chat</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${isTeamA ? 'bg-indigo-500/30 text-indigo-200' : 'bg-purple-500/30 text-purple-200'}`}
              >
                {teamName}
              </span>
            </div>
            {chatExpanded ? (
              <ChevronUp className="h-5 w-5 text-indigo-300" />
            ) : (
              <ChevronDown className="h-5 w-5 text-indigo-300" />
            )}
          </button>

          {chatExpanded && (
            <>
              {/* Messages */}
              <div className="h-48 overflow-y-auto border-t border-white/10 p-3">
                {messages.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-center text-indigo-300">
                    <div>
                      <MessageCircle className="mx-auto mb-2 h-8 w-8 opacity-50" />
                      <p className="text-sm">No messages yet</p>
                      <p className="text-xs opacity-75">Start chatting with your team!</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`rounded-lg p-2 ${
                          msg.participantId === participant.id
                            ? `ml-4 ${isTeamA ? 'bg-indigo-500/30' : 'bg-purple-500/30'}`
                            : 'mr-4 bg-white/5'
                        }`}
                      >
                        <p className="text-xs font-medium text-indigo-200">
                          {msg.participantId === participant.id ? 'You' : msg.senderName}
                        </p>
                        <p className="text-sm text-white">{msg.message}</p>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2 border-t border-white/10 p-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder-indigo-300 focus:border-white/40 focus:outline-none"
                  maxLength={500}
                  disabled={sendingMessage}
                />
                <button
                  onClick={sendMessage}
                  disabled={sendingMessage || !newMessage.trim()}
                  className={`rounded-lg px-4 py-2 text-white transition-colors disabled:opacity-50 ${isTeamA ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                >
                  {sendingMessage ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
            <Clock className="h-4 w-4 text-indigo-300" />
            Recent Activity
          </h3>

          {session.rounds.length === 0 ? (
            <div className="py-4 text-center text-indigo-300">
              <Users className="mx-auto mb-1 h-6 w-6 opacity-50" />
              <p className="text-sm">No rounds yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {session.rounds.slice(0, 5).map((round, index) => (
                <div
                  key={round.id}
                  className={`flex items-center justify-between rounded-lg p-2 ${
                    index === 0 ? 'bg-white/20' : 'bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                      {round.roundNumber}
                    </span>
                    <div>
                      <p className="text-xs font-medium text-white">
                        {round.answeringTeam === 'TEAM_A' ? session.teamAName : session.teamBName}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-indigo-300">
                        {getOutcomeIcon(round.outcome)}
                        <span>{getOutcomeLabel(round.outcome)}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-bold ${
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

        <p className="mt-3 text-center text-xs text-indigo-400">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </p>
      </div>
    </main>
  )
}
