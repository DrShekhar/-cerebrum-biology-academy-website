'use client'

/**
 * Scholarship test exam — token-keyed (no account needed). Reuses the CBT
 * engine with a scholarship server adapter; the paper is frozen server-side
 * and answers are never sent to the client. On submit we route straight to
 * the scorecard (where the fee-waiver reveal lives).
 */

import { use, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { CBTExam, type CBTAttemptState, type CBTResult } from '@/components/cbt/CBTExam'
import type { MockTest } from '@/types/mockTest'

export default function ScholarshipExamPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params)
  const router = useRouter()
  const [test, setTest] = useState<MockTest | null>(null)
  const [candidateName, setCandidateName] = useState<string | undefined>(undefined)
  const [server, setServer] = useState<Parameters<typeof CBTExam>[0]['server'] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/scholarship/session/${token}`)
      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.error || 'Could not load the exam.')
        return
      }
      if (json.data.completed) {
        router.replace(`/scholarship-test/result/${token}`)
        return
      }
      const data = json.data
      setCandidateName(data.studentName)

      const mockTest = {
        id: `scholarship_${token}`,
        title: data.testName,
        description: '',
        slug: 'scholarship-test',
        category: 'full-test',
        subject: 'biology',
        duration: data.durationMin,
        totalQuestions: data.questions.length,
        totalMarks: data.questions.length * 4,
        questions: data.questions,
        difficulty: 'mixed',
        topics: [],
        instructions: [
          'This is your scholarship test — one attempt only.',
          'Each correct answer is +4 marks; each wrong answer is −1.',
          'Do not switch tabs or exit full-screen — such events are recorded.',
          'Your fee-waiver band is decided by your score. All the best!',
        ],
        isActive: true,
        isPremium: false,
        attemptCount: 0,
        averageScore: 0,
        targetClass: 'all',
        classRequirements: {
          minimumClass: 'class-11',
          recommendedFor: ['class-11', 'class-12', 'dropper'],
          difficultyByClass: { 'class-11': 'medium', 'class-12': 'medium', dropper: 'medium' },
        },
        adaptiveSettings: {
          enableAdaptive: false,
          questionPoolByClass: { 'class-11': [], 'class-12': [], dropper: [] },
        },
      } as MockTest

      const onSave = (state: CBTAttemptState) => {
        void fetch(`/api/scholarship/session/${token}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state),
        }).catch(() => {})
      }
      const onSubmit = async (state: CBTAttemptState): Promise<CBTResult | null> => {
        try {
          const r = await fetch(`/api/scholarship/session/${token}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state),
          }).then((x) => x.json())
          if (!r.success) return null
          // The scorecard page owns the reveal (score + fee waiver + share).
          router.replace(`/scholarship-test/result/${token}`)
          const d = r.data
          return {
            correct: d.correct ?? 0,
            incorrect: d.incorrect ?? 0,
            unattempted: d.unattempted ?? 0,
            score: d.score ?? 0,
            maxScore: d.maxScore ?? 0,
            perSection: {},
          }
        } catch {
          return null
        }
      }

      const saved = data.savedState as {
        answers?: Record<string, string>
        marked?: string[]
        visited?: string[]
        currentIndex?: number
        remainingTime?: number | null
      } | null

      setTest(mockTest)
      setServer({
        onSave,
        onSubmit,
        initialState: saved
          ? {
              answers: saved.answers || {},
              marked: saved.marked || [],
              visited: saved.visited || [],
            }
          : undefined,
        initialRemaining: saved?.remainingTime ?? undefined,
        initialIndex: saved?.currentIndex ?? undefined,
        resumed: !!saved,
      })
    } catch {
      setError('Network error while loading the exam.')
    } finally {
      setLoading(false)
    }
  }, [token, router])

  useEffect(() => {
    load()
  }, [load])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-500">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Preparing your scholarship test…
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <h1 className="text-xl font-bold text-gray-900">Can&apos;t load the exam</h1>
        <p className="mt-2 text-gray-600">{error}</p>
        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={() => router.push('/scholarship-test')}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={() => load()}
            className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (!test || !server) return null

  return (
    <CBTExam
      test={test}
      candidateName={candidateName}
      server={server}
      onExit={() => router.push(`/scholarship-test/result/${token}`)}
    />
  )
}
