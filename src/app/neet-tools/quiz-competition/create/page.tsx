'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Loader2,
  Users,
  Swords,
  Settings,
  Check,
} from 'lucide-react'

interface ScoringRules {
  correct: number
  wrong: number
  pass: number
  partial?: Record<string, number>
}

export default function CreateQuizPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    format: 'MODERATOR' as 'MODERATOR' | 'TEAMS_ASK_EACH_OTHER',
    questionMode: 'SIMPLE_SCOREBOARD' as 'SIMPLE_SCOREBOARD' | 'PRELOADED',
    teamAName: 'Team A',
    teamBName: 'Team B',
    scoringRules: {
      correct: 20,
      wrong: -10,
      pass: -10,
    } as ScoringRules,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/quiz/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          createdById: 'anonymous',
        }),
      })

      const data = await res.json()

      if (data.success) {
        router.push(`/neet-tools/quiz-competition/${data.data.roomCode}/host`)
      } else {
        setError(data.error || 'Failed to create quiz')
      }
    } catch (err) {
      setError('Failed to create quiz. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/neet-tools/quiz-competition"
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Quiz Competition
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create New Quiz</h1>
          <p className="mt-2 text-gray-600">
            Set up your quiz session and share the room code with students.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Quiz Title */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Quiz Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Cell Biology Revision Quiz"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              required
            />
          </div>

          {/* Quiz Format */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <label className="mb-4 block text-sm font-medium text-gray-700">
              Quiz Format
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, format: 'MODERATOR' })}
                className={`rounded-xl border-2 p-4 text-left transition-all ${
                  formData.format === 'MODERATOR'
                    ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    formData.format === 'MODERATOR' ? 'bg-indigo-100' : 'bg-gray-100'
                  }`}>
                    <Users className={`h-5 w-5 ${
                      formData.format === 'MODERATOR' ? 'text-indigo-600' : 'text-gray-500'
                    }`} />
                  </div>
                  {formData.format === 'MODERATOR' && (
                    <Check className="ml-auto h-5 w-5 text-indigo-600" />
                  )}
                </div>
                <h3 className="font-semibold text-gray-900">Moderator Mode</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Teacher asks questions. Teams can pass to each other with penalty.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, format: 'TEAMS_ASK_EACH_OTHER' })}
                className={`rounded-xl border-2 p-4 text-left transition-all ${
                  formData.format === 'TEAMS_ASK_EACH_OTHER'
                    ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    formData.format === 'TEAMS_ASK_EACH_OTHER' ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    <Swords className={`h-5 w-5 ${
                      formData.format === 'TEAMS_ASK_EACH_OTHER' ? 'text-purple-600' : 'text-gray-500'
                    }`} />
                  </div>
                  {formData.format === 'TEAMS_ASK_EACH_OTHER' && (
                    <Check className="ml-auto h-5 w-5 text-purple-600" />
                  )}
                </div>
                <h3 className="font-semibold text-gray-900">Teams Ask Each Other</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Teams prepare and ask questions. No passing allowed.
                </p>
              </button>
            </div>
          </div>

          {/* Team Names */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <label className="mb-4 block text-sm font-medium text-gray-700">
              Team Names
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-gray-500">Team A</label>
                <input
                  type="text"
                  value={formData.teamAName}
                  onChange={(e) => setFormData({ ...formData, teamAName: e.target.value })}
                  placeholder="Team A"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">Team B</label>
                <input
                  type="text"
                  value={formData.teamBName}
                  onChange={(e) => setFormData({ ...formData, teamBName: e.target.value })}
                  placeholder="Team B"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
            </div>
          </div>

          {/* Scoring Rules */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-500" />
              <label className="text-sm font-medium text-gray-700">
                Scoring Rules
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs text-gray-500">Correct Answer</label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.scoringRules.correct}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scoringRules: {
                          ...formData.scoringRules,
                          correct: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-green-600">
                    points
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">Wrong Answer</label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.scoringRules.wrong}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scoringRules: {
                          ...formData.scoringRules,
                          wrong: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-red-600">
                    points
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-gray-500">Pass (Moderator Mode)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.scoringRules.pass}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scoringRules: {
                          ...formData.scoringRules,
                          pass: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    disabled={formData.format === 'TEAMS_ASK_EACH_OTHER'}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-orange-600">
                    points
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Use negative numbers for penalties. Partial marks can be awarded during the quiz.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <Link
              href="/neet-tools/quiz-competition"
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading || !formData.title.trim()}
              className="flex-1 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating Quiz...
                </span>
              ) : (
                'Create Quiz & Get Room Code'
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
