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
  Volume2,
  VolumeX,
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

// Sound utilities using Web Audio API
const createAudioContext = () => {
  if (typeof window !== 'undefined') {
    return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  }
  return null
}

type SoundType = 'quizStart' | 'teamScore' | 'chatMessage' | 'attention'

const playSound = (audioContext: AudioContext | null, type: SoundType) => {
  if (!audioContext) return

  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  const now = audioContext.currentTime

  switch (type) {
    case 'quizStart':
      // Fanfare - ascending tones
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(523, now) // C5
      oscillator.frequency.setValueAtTime(659, now + 0.15) // E5
      oscillator.frequency.setValueAtTime(784, now + 0.3) // G5
      gainNode.gain.setValueAtTime(0.3, now)
      exponentialDecayTo(gainNode, 0.01, now + 0.5)
      oscillator.start(now)
      oscillator.stop(now + 0.5)
      break
    case 'teamScore':
      // Celebration - quick ascending ding
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(880, now) // A5
      oscillator.frequency.setValueAtTime(1047, now + 0.1) // C6
      gainNode.gain.setValueAtTime(0.25, now)
      exponentialDecayTo(gainNode, 0.01, now + 0.3)
      oscillator.start(now)
      oscillator.stop(now + 0.3)
      break
    case 'chatMessage':
      // Soft notification blip
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(587, now) // D5
      gainNode.gain.setValueAtTime(0.15, now)
      exponentialDecayTo(gainNode, 0.01, now + 0.15)
      oscillator.start(now)
      oscillator.stop(now + 0.15)
      break
    case 'attention':
      // Double beep for attention
      oscillator.type = 'triangle'
      oscillator.frequency.setValueAtTime(698, now) // F5
      oscillator.frequency.setValueAtTime(698, now + 0.2)
      gainNode.gain.setValueAtTime(0.2, now)
      gainNode.gain.setValueAtTime(0.01, now + 0.1)
      gainNode.gain.setValueAtTime(0.2, now + 0.15)
      exponentialDecayTo(gainNode, 0.01, now + 0.25)
      oscillator.start(now)
      oscillator.stop(now + 0.3)
      break
  }
}

// Helper for exponential decay
const exponentialDecayTo = (gainNode: GainNode, value: number, endTime: number) => {
  gainNode.gain.exponentialRampToValueAtTime(Math.max(value, 0.0001), endTime)
}

export default function StudentViewPage() {
  const params = useParams()
  const roomCode = params.roomCode as string

  const [session, setSession] = useState<QuizSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [failCount, setFailCount] = useState(0)
  const [backoffMs, setBackoffMs] = useState(3000) // Start at 3 seconds
  const prevMessagesLengthRef = useRef(0)
  const [showConnectionStatus, setShowConnectionStatus] = useState(true)

  // Sound state
  const [soundEnabled, setSoundEnabled] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const prevStatusRef = useRef<string | null>(null)
  const prevTeamScoreRef = useRef<number | null>(null)
  const prevMessagesCountRef = useRef(0)

  // Initialize sound from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('quizSoundEnabled')
      setSoundEnabled(stored === 'true')
    }
  }, [])

  // Toggle sound and persist to localStorage
  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const newValue = !prev
      localStorage.setItem('quizSoundEnabled', String(newValue))
      // Initialize audio context on first enable (requires user interaction)
      if (newValue && !audioContextRef.current) {
        audioContextRef.current = createAudioContext()
      }
      return newValue
    })
  }, [])

  // Play sound helper
  const playSoundIfEnabled = useCallback((type: SoundType) => {
    if (soundEnabled && audioContextRef.current) {
      playSound(audioContextRef.current, type)
    }
  }, [soundEnabled])

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
  const lastMessageTimestampRef = useRef<string | null>(null)

  // Sound trigger: Quiz starts (status changes to IN_PROGRESS)
  useEffect(() => {
    if (session && prevStatusRef.current !== null) {
      if (prevStatusRef.current !== 'IN_PROGRESS' && session.status === 'IN_PROGRESS') {
        playSoundIfEnabled('quizStart')
      }
    }
    if (session) {
      prevStatusRef.current = session.status
    }
  }, [session?.status, playSoundIfEnabled, session])

  // Sound trigger: Your team scores (only when your team's score increases)
  useEffect(() => {
    if (session && participant) {
      const currentTeamScore = participant.team === 'TEAM_A' ? session.teamAScore : session.teamBScore
      if (prevTeamScoreRef.current !== null && currentTeamScore > prevTeamScoreRef.current) {
        playSoundIfEnabled('teamScore')
      }
      prevTeamScoreRef.current = currentTeamScore
    }
  }, [session?.teamAScore, session?.teamBScore, participant, playSoundIfEnabled, session])

  // Sound trigger: New chat message from teammate (not your own messages)
  useEffect(() => {
    if (messages.length > prevMessagesCountRef.current && participant) {
      const newMessages = messages.slice(prevMessagesCountRef.current)
      const hasTeammateMessage = newMessages.some((msg) => msg.participantId !== participant.id)
      if (hasTeammateMessage) {
        playSoundIfEnabled('chatMessage')
      }
    }
    prevMessagesCountRef.current = messages.length
  }, [messages, participant, playSoundIfEnabled])

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
        // Reset on success
        setFailCount(0)
        setBackoffMs(3000)
      } else {
        setError(data.error || 'Failed to load quiz')
      }
    } catch {
      // Increment failure count and apply exponential backoff
      setFailCount((prev) => prev + 1)
      setBackoffMs((prev) => Math.min(prev * 2, 10000)) // Max 10 seconds
      setIsConnected(false)
    } finally {
      setLoading(false)
    }
  }, [roomCode])

  const fetchMessages = useCallback(async () => {
    if (!participant) return

    try {
      const afterParam = lastMessageTimestampRef.current
        ? `&after=${encodeURIComponent(lastMessageTimestampRef.current)}`
        : ''
      const url = `/api/quiz/${roomCode}/chat?team=${participant.team}&t=${Date.now()}${afterParam}`
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
            // Use timestamp cursor from API response
            if (data.nextCursor) {
              lastMessageTimestampRef.current = data.nextCursor
            }
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
    // Use dynamic interval based on backoff (3s default, up to 10s on errors)
    const interval = setInterval(fetchSession, backoffMs)
    return () => clearInterval(interval)
  }, [fetchSession, backoffMs])

  useEffect(() => {
    if (!participant) return
    fetchMessages()
    // Chat polling at 2s interval (reduced from 1s)
    const interval = setInterval(fetchMessages, 2000)
    return () => clearInterval(interval)
  }, [fetchMessages, participant])

  // Only scroll to bottom when new messages are added
  useEffect(() => {
    if (messages.length > prevMessagesLengthRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    prevMessagesLengthRef.current = messages.length
  }, [messages.length])

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
        // Update cursor to latest message timestamp
        if (data.data.createdAt) {
          lastMessageTimestampRef.current = data.data.createdAt
        }
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
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="w-full max-w-md">
          {/* Header Card */}
          <div className="mb-4 overflow-hidden rounded-2xl bg-gradient-to-r from-teal-600 to-blue-600 p-6 shadow-2xl">
            <div className="text-center">
              <div className="mb-3 inline-flex items-center justify-center rounded-full bg-white/20 px-4 py-1.5">
                <span className="font-mono text-sm font-bold tracking-widest text-white">{session.roomCode}</span>
              </div>
              <h1 className="text-2xl font-bold text-white">{session.title}</h1>
              <p className="mt-1.5 text-sm text-teal-100">Join to participate in team chat</p>
            </div>
          </div>

          {/* Join Form Card */}
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6 shadow-xl backdrop-blur-sm">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Your Name</label>
                <input
                  type="text"
                  value={joinName}
                  onChange={(e) => setJoinName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border-2 border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-slate-400 transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  maxLength={30}
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-300">Select Your Team</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedTeam('TEAM_A')}
                    className={`group relative overflow-hidden rounded-xl border-2 p-4 text-center transition-all ${
                      selectedTeam === 'TEAM_A'
                        ? 'border-blue-500 bg-blue-500/20 ring-2 ring-blue-400/30'
                        : 'border-slate-600 bg-slate-700/30 hover:border-blue-400/50 hover:bg-slate-700/50'
                    }`}
                  >
                    {selectedTeam === 'TEAM_A' && (
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
                    )}
                    <div className="flex h-8 w-8 mx-auto mb-2 items-center justify-center rounded-full bg-blue-500/30 text-xs font-bold text-blue-300">A</div>
                    <p className="font-semibold text-white">{session.teamAName}</p>
                    <p className="mt-1 text-2xl font-bold text-blue-400">{session.teamAScore}</p>
                  </button>
                  <button
                    onClick={() => setSelectedTeam('TEAM_B')}
                    className={`group relative overflow-hidden rounded-xl border-2 p-4 text-center transition-all ${
                      selectedTeam === 'TEAM_B'
                        ? 'border-purple-500 bg-purple-500/20 ring-2 ring-purple-400/30'
                        : 'border-slate-600 bg-slate-700/30 hover:border-purple-400/50 hover:bg-slate-700/50'
                    }`}
                  >
                    {selectedTeam === 'TEAM_B' && (
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600" />
                    )}
                    <div className="flex h-8 w-8 mx-auto mb-2 items-center justify-center rounded-full bg-purple-500/30 text-xs font-bold text-purple-300">B</div>
                    <p className="font-semibold text-white">{session.teamBName}</p>
                    <p className="mt-1 text-2xl font-bold text-purple-400">{session.teamBScore}</p>
                  </button>
                </div>
              </div>

              {joinError && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center">
                  <p className="text-sm font-medium text-red-400">{joinError}</p>
                </div>
              )}

              <button
                onClick={handleJoin}
                disabled={joining || !joinName.trim() || !selectedTeam}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 px-4 py-3.5 font-semibold text-white shadow-lg transition-all hover:from-teal-400 hover:to-blue-500 hover:shadow-xl disabled:opacity-50"
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
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            Powered by <span className="font-semibold text-teal-500">Cerebrum Biology Academy</span>
          </p>
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
      {/* Sound Toggle Button - always visible */}
      <button
        onClick={toggleSound}
        className="fixed left-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20 transition-colors"
        title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
      >
        {soundEnabled ? (
          <>
            <Volume2 className="h-4 w-4" />
            <span className="hidden sm:inline">Sound On</span>
          </>
        ) : (
          <>
            <VolumeX className="h-4 w-4" />
            <span className="hidden sm:inline">Sound Off</span>
          </>
        )}
      </button>

      {/* Connection Status */}
      {showConnectionStatus && (
        <div
          className={`fixed right-4 top-4 z-10 flex items-center gap-2 rounded-full px-3 py-1.5 text-sm ${
            failCount === 0
              ? 'bg-green-500/20 text-green-300'
              : failCount < 3
                ? 'bg-yellow-500/20 text-yellow-300'
                : 'bg-red-500/20 text-red-300'
          }`}
        >
          {failCount === 0 ? (
            <>
              <Wifi className="h-4 w-4" />
              <span>Live</span>
            </>
          ) : failCount < 3 ? (
            <>
              <Wifi className="h-4 w-4 animate-pulse" />
              <span>Slow connection</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4" />
              <span>Reconnecting...</span>
            </>
          )}
          <button
            onClick={() => setShowConnectionStatus(false)}
            className="ml-1 rounded-full p-0.5 hover:bg-white/20 transition-colors"
            title="Hide connection status"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

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
