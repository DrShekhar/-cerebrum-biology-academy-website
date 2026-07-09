'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import {
  CBTExam,
  type CBTAttemptState,
  type CBTResult,
  type CBTReviewItem,
} from '@/components/cbt/CBTExam'
import type { MockTest } from '@/types/mockTest'

/**
 * DB-backed NEET full-mock CBT: assembles a 180-question paper server-side,
 * persists progress + scores on the server (client never sees the answer key).
 */
export default function NeetFullCBTPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [test, setTest] = useState<MockTest | null>(null)
  const [server, setServer] = useState<Parameters<typeof CBTExam>[0]['server'] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const sessionIdRef = useRef<string>('')

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/cbt/session', { method: 'POST' })
      const data = await res.json()
      if (res.status === 401) {
        setError('Please sign in to take the full CBT mock.')
        return
      }
      if (!res.ok || !data.success) {
        setError(data.error || 'Could not start the test.')
        return
      }
      sessionIdRef.current = data.sessionId

      const mockTest: MockTest = {
        id: `cbt_${data.sessionId}`,
        title: 'NEET Full Mock (CBT)',
        description: '',
        slug: 'neet-full-mock',
        category: 'full-test',
        subject: 'mixed',
        duration: data.durationMin,
        totalQuestions: data.questions.length,
        totalMarks: data.questions.length * 4,
        questions: data.questions,
        difficulty: 'mixed',
        topics: [],
        instructions: [],
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
        void fetch(`/api/cbt/session/${sessionIdRef.current}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state),
        }).catch(() => {})
      }
      const onSubmit = async (state: CBTAttemptState): Promise<CBTResult | null> => {
        try {
          const r = await fetch(`/api/cbt/session/${sessionIdRef.current}/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state),
          }).then((x) => x.json())
          return r.success ? (r.result as CBTResult) : null
        } catch {
          return null
        }
      }
      const onReview = async (): Promise<CBTReviewItem[] | null> => {
        try {
          const r = await fetch(`/api/cbt/session/${sessionIdRef.current}/review`).then((x) =>
            x.json()
          )
          return r.success ? (r.items as CBTReviewItem[]) : null
        } catch {
          return null
        }
      }

      setTest(mockTest)
      setServer({
        onSave,
        onSubmit,
        onReview,
        initialState: data.savedState,
        initialRemaining: data.remainingTime,
        initialIndex: data.currentIndex,
        resumed: data.resumed,
      })
    } catch {
      setError('Network error while starting the test.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-500">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Preparing your NEET mock…
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <h1 className="text-xl font-bold text-gray-900">Can’t start the test</h1>
        <p className="mt-2 text-gray-600">{error}</p>
        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={() => router.push('/mock-tests')}
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
      candidateName={user?.fullName || user?.name || undefined}
      server={server}
      onExit={() => router.push('/mock-tests')}
    />
  )
}
