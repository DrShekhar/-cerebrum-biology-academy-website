'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Plus,
  Trophy,
  Clock,
  Users,
  ArrowRight,
  History,
  Play,
  Loader2,
  ChevronRight,
  Swords,
} from 'lucide-react'

interface QuizSession {
  id: string
  roomCode: string
  title: string
  format: 'MODERATOR' | 'TEAMS_ASK_EACH_OTHER'
  winner: string | null
  teamAName: string
  teamBName: string
  teamAScore: number
  teamBScore: number
  totalRounds: number
  participantCount: number
  duration: number
  endedAt: string
}

interface HistoryData {
  sessions: QuizSession[]
  pagination: {
    total: number
    limit: number
    offset: number
    hasMore: boolean
  }
}

export default function QuizCompetitionPage() {
  const router = useRouter()
  const [joinCode, setJoinCode] = useState('')
  const [history, setHistory] = useState<HistoryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/quiz/history?limit=5')
      const data = await res.json()
      if (data.success) {
        setHistory(data.data)
      }
    } catch (err) {
      console.error('Failed to fetch history:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleJoin = () => {
    if (joinCode.length === 6) {
      router.push(`/neet-tools/quiz-competition/${joinCode.toUpperCase()}/view`)
    } else {
      setError('Please enter a valid 6-character room code')
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 pt-16 pb-24 text-white md:pt-24 md:pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/neet-tools" className="hover:underline">
              NEET Tools
            </Link>
            <span className="mx-2">/</span>
            <span>Quiz Competition</span>
          </nav>

          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
              <Swords className="h-5 w-5" />
              <span className="font-semibold">Classroom Quiz Tool</span>
            </div>

            <h1 className="mb-4 text-3xl font-bold md:text-5xl">
              Quiz Competition
            </h1>
            <p className="mb-8 text-lg text-indigo-100 md:text-xl">
              Conduct engaging team-based quizzes in your classroom. Two teams compete,
              live score updates on all devices.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/neet-tools/quiz-competition/create"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-indigo-600 transition-colors hover:bg-indigo-50"
              >
                <Plus className="h-5 w-5" />
                Create Quiz
              </Link>
              <button
                onClick={() => document.getElementById('join-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Play className="h-5 w-5" />
                Join Quiz
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Quick Actions */}
        <div className="-mt-20 relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {/* Create New Quiz Card */}
          <Link
            href="/neet-tools/quiz-competition/create"
            className="group rounded-2xl bg-white p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100">
              <Plus className="h-7 w-7 text-indigo-600" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-indigo-600">
              Create New Quiz
            </h2>
            <p className="mb-4 text-gray-600">
              Set up a new quiz session with custom team names and scoring rules.
            </p>
            <span className="flex items-center gap-1 font-semibold text-indigo-600 group-hover:gap-2 transition-all">
              Get Started <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          {/* Join Quiz Card */}
          <div
            id="join-section"
            className="rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100">
              <Play className="h-7 w-7 text-green-600" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              Join a Quiz
            </h2>
            <p className="mb-4 text-gray-600">
              Enter the 6-character room code to join as a participant.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={joinCode}
                onChange={(e) => {
                  setJoinCode(e.target.value.toUpperCase().slice(0, 6))
                  setError(null)
                }}
                placeholder="Enter code"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-center text-lg font-mono uppercase tracking-wider focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                maxLength={6}
              />
              <button
                onClick={handleJoin}
                disabled={joinCode.length !== 6}
                className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Join
              </button>
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          {/* How It Works Card */}
          <div className="rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100">
              <Trophy className="h-7 w-7 text-purple-600" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              How It Works
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">1</span>
                <span>Teacher creates a quiz & gets room code</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">2</span>
                <span>Students join via code on their phones</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">3</span>
                <span>Scores update live across all devices</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiz Formats */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Quiz Formats</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Users className="h-5 w-5 text-indigo-600" />
                Moderator Mode
              </h3>
              <p className="mb-4 text-gray-600">
                Teacher asks questions verbally. Teams can pass to the other team
                (with a penalty). Best for traditional quiz bowl format.
              </p>
              <ul className="space-y-1 text-sm text-gray-500">
                <li>+20 for correct answers</li>
                <li>-10 for incorrect answers</li>
                <li>-10 for passing (other team gets a chance)</li>
              </ul>
            </div>

            <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Swords className="h-5 w-5 text-purple-600" />
                Teams Ask Each Other
              </h3>
              <p className="mb-4 text-gray-600">
                Teams prepare questions and ask each other. No passing allowed.
                Direct scoring based on answers.
              </p>
              <ul className="space-y-1 text-sm text-gray-500">
                <li>+20 for correct answers</li>
                <li>-10 for incorrect answers</li>
                <li>Partial marks supported</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Recent Quizzes */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Recent Quizzes</h2>
            {history && history.pagination.total > 5 && (
              <Link
                href="/neet-tools/quiz-competition/history"
                className="flex items-center gap-1 text-indigo-600 hover:underline"
              >
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
          ) : history && history.sessions.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Quiz
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Winner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Stats
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {history.sessions.map((session) => (
                    <tr key={session.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{session.title}</div>
                        <div className="text-sm text-gray-500">
                          {session.format === 'MODERATOR' ? 'Moderator Mode' : 'Teams Ask Each Other'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${session.teamAScore > session.teamBScore ? 'text-green-600' : 'text-gray-600'}`}>
                            {session.teamAName}: {session.teamAScore}
                          </span>
                          <span className="text-gray-400">vs</span>
                          <span className={`font-semibold ${session.teamBScore > session.teamAScore ? 'text-green-600' : 'text-gray-600'}`}>
                            {session.teamBName}: {session.teamBScore}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {session.winner ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-sm font-medium text-yellow-800">
                            <Trophy className="h-3 w-3" />
                            {session.winner}
                          </span>
                        ) : (
                          <span className="text-gray-500">Tie</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {session.participantCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatDuration(session.duration)}
                          </span>
                          <span>{session.totalRounds} rounds</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(session.endedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 py-12 text-center">
              <History className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-900">No quizzes yet</h3>
              <p className="mb-4 text-gray-500">
                Create your first quiz to get started!
              </p>
              <Link
                href="/neet-tools/quiz-competition/create"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5" />
                Create Quiz
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
