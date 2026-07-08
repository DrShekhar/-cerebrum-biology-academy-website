'use client'

/**
 * Scholarship scorecard — the reveal: score + fee-waiver band + the two CTAs
 * that convert (claim via WhatsApp counseling call, share the scorecard).
 */

import { use, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2, Award, Share2, CheckCircle2, XCircle, MinusCircle, Phone } from 'lucide-react'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

interface ResultData {
  studentName: string
  classLevel: string
  testName: string
  score: number
  maxScore: number
  percent: number
  correct: number
  incorrect: number
  waiverPercent: number
  completedAt: string
}

const CLASS_LABEL: Record<string, string> = {
  CLASS_11: 'Class 11',
  CLASS_12: 'Class 12',
  DROPPER: 'Dropper',
}

export default function ScholarshipResultPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params)
  const [data, setData] = useState<ResultData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/scholarship/result/${token}`)
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.error || 'Result not found')
      setData(json.data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load your result')
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    load()
  }, [load])

  const claimOnWhatsApp = () => {
    if (!data) return
    trackAndOpenWhatsApp({
      source: 'scholarship-result',
      message: `Hi! I completed the ${data.testName} and earned a ${data.waiverPercent}% fee waiver (score ${data.score}/${data.maxScore}). I'd like to claim my scholarship and discuss admission.`,
      campaign: 'scholarship-test',
    })
  }

  const share = async () => {
    if (!data) return
    const text = `I scored ${data.score}/${data.maxScore} (${data.percent}%) in the ${data.testName} and earned a ${data.waiverPercent}% fee waiver at Cerebrum Biology Academy! Take the free test:`
    const url = `${window.location.origin}/scholarship-test`
    if (navigator.share) {
      try {
        await navigator.share({ text, url })
        return
      } catch {
        /* fall through to WhatsApp share */
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, '_blank')
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-500">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading your scorecard…
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <h1 className="text-xl font-bold text-gray-900">Result not found</h1>
        <p className="mt-2 text-gray-600">{error || 'This link may be invalid.'}</p>
        <Link
          href="/scholarship-test"
          className="mt-4 inline-block rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white"
        >
          Go to Scholarship Test
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        {/* Scorecard */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div className="bg-gradient-to-r from-green-700 to-teal-700 px-6 py-5 text-white">
            <p className="text-sm font-medium uppercase tracking-wide text-green-200">
              {data.testName} — Official Scorecard
            </p>
            <h1 className="mt-1 text-2xl font-bold">{data.studentName}</h1>
            <p className="text-sm text-green-100">
              {CLASS_LABEL[data.classLevel] || data.classLevel} ·{' '}
              {new Date(data.completedAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>

          <div className="p-6">
            {/* Waiver reveal */}
            <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 text-center">
              <Award className="mx-auto h-10 w-10 text-amber-500" />
              <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-amber-700">
                You&apos;ve earned a scholarship
              </p>
              <p className="mt-1 text-5xl font-extrabold text-amber-600">
                {data.waiverPercent}%
                <span className="ml-2 text-xl font-bold text-amber-700">fee waiver</span>
              </p>
              <p className="mt-2 text-sm text-amber-800">
                Applicable on your Cerebrum Biology Academy course fee. Our counselor will confirm
                the details on your claim call.
              </p>
            </div>

            {/* Score strip */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {data.score}
                  <span className="text-sm font-medium text-gray-400">/{data.maxScore}</span>
                </p>
                <p className="text-xs text-gray-500">Score ({data.percent}%)</p>
              </div>
              <div className="rounded-xl bg-green-50 p-4 text-center">
                <p className="flex items-center justify-center gap-1 text-2xl font-bold text-green-700">
                  <CheckCircle2 className="h-5 w-5" /> {data.correct}
                </p>
                <p className="text-xs text-gray-500">Correct</p>
              </div>
              <div className="rounded-xl bg-red-50 p-4 text-center">
                <p className="flex items-center justify-center gap-1 text-2xl font-bold text-red-600">
                  <XCircle className="h-5 w-5" /> {data.incorrect}
                </p>
                <p className="text-xs text-gray-500">Incorrect</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                <p className="flex items-center justify-center gap-1 text-2xl font-bold text-gray-600">
                  <MinusCircle className="h-5 w-5" />{' '}
                  {Math.max(0, data.maxScore / 4 - data.correct - data.incorrect)}
                </p>
                <p className="text-xs text-gray-500">Skipped</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={claimOnWhatsApp}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 font-bold text-white hover:bg-green-700"
              >
                <Phone className="h-5 w-5" /> Claim my {data.waiverPercent}% scholarship
              </button>
              <button
                onClick={share}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3.5 font-semibold text-gray-700 hover:bg-gray-50"
              >
                <Share2 className="h-5 w-5" /> Share scorecard
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-gray-400">
              Waiver is applied on course enrollment and confirmed by our admissions team. One
              attempt per student.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Know someone preparing for NEET?{' '}
          <Link href="/scholarship-test" className="font-semibold text-green-700 underline">
            They can take the free test too
          </Link>
        </p>
      </div>
    </main>
  )
}
