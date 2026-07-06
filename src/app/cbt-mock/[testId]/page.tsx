'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { CBTExam } from '@/components/cbt/CBTExam'
import { getTestById } from '@/data/mockTests'

/**
 * CBT exam-day simulator entry. Loads a mock test and hands it to the NTA-style
 * CBTExam engine. (Currently sources from the sample mock-test data; will move to
 * the DB test_templates + published 180-Q NEET papers in a follow-up stage.)
 */
export default function CBTMockPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = use(params)
  const router = useRouter()
  const { user } = useAuth()
  const test = getTestById(testId)

  if (!test) {
    return (
      <div className="mx-auto max-w-2xl p-10 text-center">
        <h1 className="text-xl font-bold text-gray-900">Test not found</h1>
        <p className="mt-2 text-gray-600">This CBT mock test isn’t available.</p>
        <button
          onClick={() => router.push('/mock-tests')}
          className="mt-4 rounded-lg bg-green-700 px-5 py-2 text-sm font-semibold text-white hover:bg-green-800"
        >
          Back to mock tests
        </button>
      </div>
    )
  }

  return (
    <CBTExam
      test={test}
      candidateName={user?.fullName || user?.name || undefined}
      onExit={() => router.push('/mock-tests')}
    />
  )
}
