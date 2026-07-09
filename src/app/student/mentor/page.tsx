'use client'

/**
 * Student mentor-session booking. Shows bookable 1:1 / small-group sessions for
 * the next two weeks (with seats remaining) and the student's own upcoming +
 * past bookings, with a join link and one-tap cancel.
 */

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import {
  CalendarClock,
  Users,
  Video,
  MapPin,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

interface AvailableSlot {
  slotId: string
  date: string
  dayLabel: string
  startTime: string
  timeLabel: string
  durationMins: number
  teacherName: string | null
  mode: string
  topic: string | null
  seatsLeft: number
  capacity: number
}

interface Booking {
  id: string
  date: string
  startTime: string
  status: string
  studentNote: string | null
  meetingUrl: string | null
  slot: {
    topic: string | null
    mode: string
    durationMins: number
    teacherName: string | null
  } | null
}

function to12h(t: string) {
  const [h, m] = t.split(':').map((x) => parseInt(x, 10))
  const suffix = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${String(m).padStart(2, '0')} ${suffix}`
}

export default function StudentMentorPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()

  const [slots, setSlots] = useState<AvailableSlot[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [bookingKey, setBookingKey] = useState<string | null>(null)

  const fetchAll = useCallback(async () => {
    setIsLoading(true)
    try {
      const [slotsRes, bookingsRes] = await Promise.all([
        fetch('/api/student/mentor-slots'),
        fetch('/api/student/mentor-bookings'),
      ])
      const slotsJson = await slotsRes.json()
      const bookingsJson = await bookingsRes.json()
      if (slotsJson.success) setSlots(slotsJson.data.slots)
      if (bookingsJson.success) setBookings(bookingsJson.data.bookings)
    } catch {
      setError('Could not load sessions')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authLoading) return
    if (!isAuthenticated) {
      router.push('/sign-in')
      return
    }
    fetchAll()
  }, [authLoading, isAuthenticated, router, fetchAll])

  async function book(slot: AvailableSlot) {
    const key = `${slot.slotId}|${slot.date}`
    setBookingKey(key)
    setError(null)
    try {
      const res = await fetch('/api/student/mentor-bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotId: slot.slotId,
          date: slot.date,
          startTime: slot.startTime,
          studentNote: notes[key] || null,
        }),
      })
      const json = await res.json()
      if (!json.success) {
        setError(json.error || 'Could not book session')
      } else {
        setNotes((n) => ({ ...n, [key]: '' }))
        fetchAll()
      }
    } catch {
      setError('Could not book session')
    } finally {
      setBookingKey(null)
    }
  }

  async function cancel(id: string) {
    if (!confirm('Cancel this session?')) return
    const res = await fetch(`/api/student/mentor-bookings?id=${id}`, { method: 'DELETE' })
    const json = await res.json()
    if (!json.success) setError(json.error || 'Could not cancel')
    else fetchAll()
  }

  const upcoming = bookings.filter((b) => b.status === 'BOOKED')
  const past = bookings.filter((b) => b.status !== 'BOOKED')

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
            <CalendarClock className="h-6 w-6 text-emerald-600" /> Book a Doubt Session
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Reserve a 1:1 or small-group session with a mentor. All times are IST.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchAll}>
          <RefreshCw className="mr-1 h-4 w-4" /> Refresh
        </Button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* My booked sessions */}
      {upcoming.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 font-semibold text-gray-900">Your upcoming sessions</h2>
          <div className="space-y-3">
            {upcoming.map((b) => (
              <Card key={b.id} className="border-emerald-200 bg-emerald-50/40">
                <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      {b.date} · {to12h(b.startTime)}
                      {b.slot?.durationMins ? (
                        <span className="ml-2 text-sm font-normal text-gray-500">
                          {b.slot.durationMins} min
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      {b.slot?.teacherName ? `with ${b.slot.teacherName}` : 'Mentor session'}
                      {b.slot?.topic ? ` · ${b.slot.topic}` : ''}
                    </div>
                    {b.studentNote && (
                      <div className="mt-1 text-xs text-gray-500">Note: {b.studentNote}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {b.meetingUrl && (
                      <a href={b.meetingUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm">
                          <ExternalLink className="mr-1 h-4 w-4" /> Join
                        </Button>
                      </a>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => cancel(b.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Available slots to book */}
      <section className="mb-8">
        <h2 className="mb-3 font-semibold text-gray-900">Available sessions</h2>
        {isLoading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : slots.length === 0 ? (
          <p className="text-sm text-gray-500">
            No sessions available right now. Please check back later.
          </p>
        ) : (
          <div className="space-y-3">
            {slots.map((slot) => {
              const key = `${slot.slotId}|${slot.date}`
              return (
                <Card key={key}>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="font-medium text-gray-900">
                          {slot.dayLabel} · {slot.timeLabel}
                          <span className="ml-2 text-sm font-normal text-gray-500">
                            {slot.durationMins} min
                          </span>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                          {slot.teacherName && <span>{slot.teacherName}</span>}
                          <span className="inline-flex items-center gap-1">
                            {slot.mode === 'online' ? (
                              <Video className="h-3.5 w-3.5" />
                            ) : (
                              <MapPin className="h-3.5 w-3.5" />
                            )}
                            {slot.mode}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" /> {slot.seatsLeft} of {slot.capacity}{' '}
                            left
                          </span>
                          {slot.topic && <span>· {slot.topic}</span>}
                        </div>
                      </div>
                      <Button size="sm" onClick={() => book(slot)} disabled={bookingKey === key}>
                        {bookingKey === key ? 'Booking…' : 'Book'}
                      </Button>
                    </div>
                    <textarea
                      className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      rows={2}
                      placeholder="What do you want help with? (optional)"
                      value={notes[key] || ''}
                      onChange={(e) => setNotes((n) => ({ ...n, [key]: e.target.value }))}
                    />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </section>

      {/* Past / cancelled */}
      {past.length > 0 && (
        <section>
          <h2 className="mb-3 font-semibold text-gray-900">Past sessions</h2>
          <div className="space-y-2">
            {past.map((b) => (
              <div
                key={b.id}
                className={cn(
                  'flex items-center justify-between rounded-lg border px-4 py-2 text-sm',
                  'border-gray-200 text-gray-600'
                )}
              >
                <span>
                  {b.date} · {to12h(b.startTime)}
                  {b.slot?.teacherName ? ` · ${b.slot.teacherName}` : ''}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium">
                  {b.status === 'COMPLETED' && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  )}
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
