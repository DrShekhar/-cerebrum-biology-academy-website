'use client'

/**
 * PaymentReminderCard — the next-payment reminder shown on the student and
 * parent dashboards. Surfaces the earliest upcoming/overdue installment with a
 * clear due-in-N-days state and a "Pay now" action (payment link). Overdue is
 * escalated visually; the same due-date data drives the 7/3/1-day automated
 * reminders + counselor follow-up on the backend.
 *
 * mode="student" → /api/student/payments/upcoming (own installments)
 * mode="parent"  → /api/parent/payments/upcoming  (across children, labelled)
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, CalendarClock, CheckCircle2, Loader2, IndianRupee } from 'lucide-react'

interface Installment {
  id: string
  installmentNumber: number | null
  amount: number
  dueDate: string
  status: string
  paymentLink?: string | null
  childName?: string
  feePlan?: { courseName: string }
}
interface Data {
  upcoming: Installment[]
  overdue: Installment[]
  nextPayment: Installment | null
}

const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`
const daysUntil = (d: string) => Math.ceil((new Date(d).getTime() - Date.now()) / 86400000)

export function PaymentReminderCard({ mode = 'student' }: { mode?: 'student' | 'parent' }) {
  const [data, setData] = useState<Data | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url =
      mode === 'parent' ? '/api/parent/payments/upcoming' : '/api/student/payments/upcoming'
    fetch(url)
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setData(j.data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [mode])

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading payments…
        </div>
      </div>
    )
  }

  const next = data?.nextPayment || null
  const overdueCount = data?.overdue.length || 0

  // All clear
  if (!next) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-green-100 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Fees up to date</p>
            <p className="text-sm text-gray-500">No upcoming payments due.</p>
          </div>
        </div>
      </div>
    )
  }

  const d = daysUntil(next.dueDate)
  const isOverdue = next.status === 'OVERDUE' || d < 0
  const soon = !isOverdue && d <= 7

  const tone = isOverdue
    ? {
        ring: 'border-red-200',
        bg: 'bg-red-50',
        ic: 'bg-red-100 text-red-600',
        accent: 'text-red-700',
        btn: 'bg-red-600 hover:bg-red-700',
      }
    : soon
      ? {
          ring: 'border-amber-200',
          bg: 'bg-amber-50',
          ic: 'bg-amber-100 text-amber-600',
          accent: 'text-amber-700',
          btn: 'bg-amber-500 hover:bg-amber-600',
        }
      : {
          ring: 'border-gray-200',
          bg: 'bg-white',
          ic: 'bg-blue-100 text-blue-600',
          accent: 'text-blue-700',
          btn: 'bg-blue-600 hover:bg-blue-700',
        }

  const when = isOverdue
    ? `${Math.abs(d)} day${Math.abs(d) === 1 ? '' : 's'} overdue`
    : d === 0
      ? 'Due today'
      : `Due in ${d} day${d === 1 ? '' : 's'}`

  const dueStr = new Date(next.dueDate).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className={`rounded-2xl border ${tone.ring} ${tone.bg} p-5`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tone.ic}`}>
            {isOverdue ? (
              <AlertTriangle className="h-5 w-5" />
            ) : (
              <CalendarClock className="h-5 w-5" />
            )}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              {mode === 'parent' && next.childName ? `${next.childName} · ` : ''}Next payment
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-2xl font-bold text-gray-900">
              <IndianRupee className="h-5 w-5 text-gray-400" />
              {inr(next.amount).replace('₹', '')}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {next.feePlan?.courseName ? `${next.feePlan.courseName} · ` : ''}
              {next.installmentNumber ? `Installment ${next.installmentNumber} · ` : ''}
              due {dueStr}
            </p>
            <span className={`mt-2 inline-block text-sm font-semibold ${tone.accent}`}>{when}</span>
            {overdueCount > 1 && (
              <span className="ml-2 text-xs text-red-600">+{overdueCount - 1} more overdue</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {next.paymentLink ? (
          <a
            href={next.paymentLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white ${tone.btn}`}
          >
            Pay now
          </a>
        ) : (
          <Link
            href={mode === 'parent' ? '/parent/payments' : '/student/payments'}
            className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white ${tone.btn}`}
          >
            View &amp; pay
          </Link>
        )}
        <Link
          href={mode === 'parent' ? '/parent/payments' : '/student/payments'}
          className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          All payments
        </Link>
      </div>
      {isOverdue && (
        <p className="mt-3 text-xs text-gray-500">
          Your counselor has been notified and will reach out. Questions?{' '}
          <Link
            href={mode === 'parent' ? '/parent/concerns' : '/student/doubts'}
            className="font-semibold text-gray-700 underline"
          >
            Contact us
          </Link>
          .
        </p>
      )}
    </div>
  )
}
