'use client'

// Self-service demo cancellation (W3). The cancel API existed (token-verified,
// idempotent) but no page consumed it and nothing minted tokens — booking
// changes all had to go through a human. Tokens are now minted at booking
// time; this page completes the loop.

import { Suspense, useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2, CalendarX, CheckCircle, AlertCircle } from 'lucide-react'

interface Booking {
  id: string
  studentName: string
  preferredDate: string
  preferredTime: string
  status: string
}

function CancelBookingInner() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('id')
  const token = searchParams.get('token')

  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [reason, setReason] = useState('')
  const [done, setDone] = useState(false)

  const fetchBooking = useCallback(async () => {
    try {
      const res = await fetch(`/api/demo-booking/cancel?id=${bookingId}&token=${token}`)
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to load booking')
      setBooking(data.booking)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load booking')
    } finally {
      setLoading(false)
    }
  }, [bookingId, token])

  useEffect(() => {
    if (bookingId && token) {
      fetchBooking()
    } else {
      setError('Invalid cancellation link')
      setLoading(false)
    }
  }, [bookingId, token, fetchBooking])

  async function handleCancel() {
    try {
      setSubmitting(true)
      setError('')
      const res = await fetch('/api/demo-booking/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, token, reason: reason.trim() || undefined }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to cancel')
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel booking')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {loading ? (
          <div className="flex flex-col items-center py-8 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin mb-3" />
            Loading your booking…
          </div>
        ) : done ? (
          <div className="text-center py-4">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-gray-900 mb-2">Demo cancelled</h1>
            <p className="text-gray-500 mb-6">
              Your demo class has been cancelled. Changed your mind? You can book a fresh slot any
              time.
            </p>
            <Link
              href="/book-free-demo"
              className="inline-block px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
            >
              Book another demo
            </Link>
          </div>
        ) : error && !booking ? (
          <div className="text-center py-4">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h1 className="text-lg font-semibold text-gray-900 mb-2">This link isn&apos;t valid</h1>
            <p className="text-gray-500 mb-6">{error}</p>
            <Link
              href="/book-free-demo"
              className="inline-block px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
            >
              Book a demo
            </Link>
          </div>
        ) : booking ? (
          <>
            <div className="text-center mb-6">
              <CalendarX className="w-12 h-12 text-red-400 mx-auto mb-3" />
              <h1 className="text-xl font-bold text-gray-900">Cancel your demo?</h1>
              <p className="text-gray-500 mt-1">
                {booking.studentName} —{' '}
                {new Date(`${booking.preferredDate}T00:00:00`).toLocaleDateString('en-IN', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}{' '}
                at {booking.preferredTime}
              </p>
            </div>

            {booking.status === 'CANCELLED' ? (
              <p className="text-center text-gray-500">This booking is already cancelled.</p>
            ) : (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Reason (optional)
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  maxLength={500}
                  placeholder="Tell us why, so we can do better…"
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm mb-4 focus:ring-2 focus:ring-red-400 focus:border-transparent"
                />
                {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
                <div className="flex gap-3">
                  <Link
                    href={`/demo-booking/reschedule?id=${bookingId}&token=${token}`}
                    className="flex-1 text-center px-4 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Reschedule instead
                  </Link>
                  <button
                    onClick={handleCancel}
                    disabled={submitting}
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-60"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                    ) : (
                      'Cancel demo'
                    )}
                  </button>
                </div>
              </>
            )}
          </>
        ) : null}
      </div>
    </div>
  )
}

export default function CancelBookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      }
    >
      <CancelBookingInner />
    </Suspense>
  )
}
