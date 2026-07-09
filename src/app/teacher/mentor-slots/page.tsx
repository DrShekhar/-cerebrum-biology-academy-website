'use client'

/**
 * Teacher / admin mentor-slot manager. Publish recurring weekly 1:1 or
 * small-group session slots students can then book from /student/mentor.
 */

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { Plus, Trash2, RefreshCw, Users, Video, MapPin, Power } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

interface MentorSlot {
  id: string
  dayOfWeek: number
  startTime: string
  durationMins: number
  capacity: number
  mode: string
  meetingUrl: string | null
  topic: string | null
  courseId: string | null
  isActive: boolean
}

const EMPTY_FORM = {
  dayOfWeek: 1,
  startTime: '17:00',
  durationMins: 30,
  capacity: 1,
  mode: 'online' as 'online' | 'offline',
  meetingUrl: '',
  topic: '',
  courseId: '',
}

export default function MentorSlotsPage() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth()
  const router = useRouter()

  const [slots, setSlots] = useState<MentorSlot[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)

  const fetchSlots = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/teacher/mentor-slots')
      const json = await res.json()
      if (json.success) setSlots(json.data.slots)
      else setError(json.error || 'Could not load slots')
    } catch {
      setError('Could not load slots')
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
    if (user?.role !== 'TEACHER' && user?.role !== 'ADMIN') {
      router.push('/student/dashboard')
      return
    }
    fetchSlots()
  }, [authLoading, isAuthenticated, user, router, fetchSlots])

  async function createSlot(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/teacher/mentor-slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          meetingUrl: form.meetingUrl || null,
          topic: form.topic || null,
          courseId: form.courseId || null,
        }),
      })
      const json = await res.json()
      if (!json.success) {
        setError(json.error || 'Could not create slot')
      } else {
        setForm(EMPTY_FORM)
        fetchSlots()
      }
    } catch {
      setError('Could not create slot')
    } finally {
      setSaving(false)
    }
  }

  async function toggleSlot(slot: MentorSlot) {
    await fetch(`/api/teacher/mentor-slots/${slot.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !slot.isActive }),
    })
    fetchSlots()
  }

  async function deleteSlot(id: string) {
    if (!confirm('Delete this slot? Existing bookings will be removed.')) return
    await fetch(`/api/teacher/mentor-slots/${id}`, { method: 'DELETE' })
    fetchSlots()
  }

  function to12h(t: string) {
    const [h, m] = t.split(':').map((x) => parseInt(x, 10))
    const suffix = h >= 12 ? 'PM' : 'AM'
    const h12 = h % 12 === 0 ? 12 : h % 12
    return `${h12}:${String(m).padStart(2, '0')} ${suffix}`
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mentor Session Slots</h1>
        <p className="mt-1 text-sm text-gray-600">
          Publish recurring weekly slots students can book for 1:1 or small-group doubt / mentoring
          sessions. Times are IST.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Card className="mb-8">
        <CardContent className="p-5">
          <h2 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
            <Plus className="h-4 w-4" /> Add a weekly slot
          </h2>
          <form onSubmit={createSlot} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block font-medium text-gray-700">Day</span>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                value={form.dayOfWeek}
                onChange={(e) => setForm({ ...form, dayOfWeek: parseInt(e.target.value, 10) })}
              >
                {DAYS.map((d, i) => (
                  <option key={i} value={i}>
                    {d}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium text-gray-700">Start time (IST)</span>
              <Input
                type="time"
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                required
              />
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium text-gray-700">Duration (mins)</span>
              <Input
                type="number"
                min={10}
                max={180}
                value={form.durationMins}
                onChange={(e) =>
                  setForm({ ...form, durationMins: parseInt(e.target.value, 10) || 30 })
                }
              />
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium text-gray-700">Capacity (1 = true 1:1)</span>
              <Input
                type="number"
                min={1}
                max={50}
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: parseInt(e.target.value, 10) || 1 })}
              />
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium text-gray-700">Mode</span>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                value={form.mode}
                onChange={(e) => setForm({ ...form, mode: e.target.value as 'online' | 'offline' })}
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium text-gray-700">Topic (optional)</span>
              <Input
                type="text"
                placeholder="e.g. Genetics doubts"
                value={form.topic}
                onChange={(e) => setForm({ ...form, topic: e.target.value })}
              />
            </label>

            <label className="text-sm sm:col-span-2">
              <span className="mb-1 block font-medium text-gray-700">
                Meeting link (online sessions)
              </span>
              <Input
                type="url"
                placeholder="https://meet.google.com/..."
                value={form.meetingUrl}
                onChange={(e) => setForm({ ...form, meetingUrl: e.target.value })}
              />
            </label>

            <label className="text-sm sm:col-span-2">
              <span className="mb-1 block font-medium text-gray-700">Course ID (optional)</span>
              <Input
                type="text"
                placeholder="Scope to one course, or leave blank for any"
                value={form.courseId}
                onChange={(e) => setForm({ ...form, courseId: e.target.value })}
              />
            </label>

            <div className="sm:col-span-2">
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving…' : 'Add slot'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Your slots</h2>
        <Button variant="outline" size="sm" onClick={fetchSlots}>
          <RefreshCw className="mr-1 h-4 w-4" /> Refresh
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : slots.length === 0 ? (
        <p className="text-sm text-gray-500">No slots yet. Add your first weekly slot above.</p>
      ) : (
        <div className="space-y-3">
          {slots.map((slot) => (
            <Card key={slot.id} className={cn(!slot.isActive && 'opacity-60')}>
              <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <div className="font-medium text-gray-900">
                    {DAYS[slot.dayOfWeek]} · {to12h(slot.startTime)}
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      {slot.durationMins} min
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {slot.capacity} seat
                      {slot.capacity > 1 ? 's' : ''}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      {slot.mode === 'online' ? (
                        <Video className="h-3.5 w-3.5" />
                      ) : (
                        <MapPin className="h-3.5 w-3.5" />
                      )}
                      {slot.mode}
                    </span>
                    {slot.topic && <span>· {slot.topic}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => toggleSlot(slot)}>
                    <Power className="mr-1 h-4 w-4" />
                    {slot.isActive ? 'Disable' : 'Enable'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteSlot(slot.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
