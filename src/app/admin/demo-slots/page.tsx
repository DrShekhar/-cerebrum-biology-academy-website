'use client'

import { useEffect, useState, useCallback } from 'react'

interface Slot {
  id: string
  dayOfWeek: number
  startTime: string
  durationMins: number
  teacherName: string | null
  capacity: number
  zoomJoinUrl: string | null
  track: string | null
  isActive: boolean
}
interface Block {
  id: string
  startDate: string
  endDate: string
  slotId: string | null
  startTime: string | null
  reason: string | null
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const to12h = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  const s = h >= 12 ? 'PM' : 'AM'
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, '0')} ${s}`
}

export default function DemoSlotsAdminPage() {
  const [slots, setSlots] = useState<Slot[]>([])
  const [blocks, setBlocks] = useState<Block[]>([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')

  // New-slot form
  const [nsDay, setNsDay] = useState(2)
  const [nsTime, setNsTime] = useState('17:00')
  const [nsTeacher, setNsTeacher] = useState('')
  const [nsCapacity, setNsCapacity] = useState(15)
  const [nsZoom, setNsZoom] = useState('')

  // New-block form
  const [nbStart, setNbStart] = useState('')
  const [nbEnd, setNbEnd] = useState('')
  const [nbReason, setNbReason] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/demo-slots', { credentials: 'include' })
      const data = await res.json()
      if (data.success) {
        setSlots(data.slots)
        setBlocks(data.blocks)
      } else setMsg(data.error || 'Failed to load')
    } catch {
      setMsg('Failed to load')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const addSlot = async () => {
    setMsg('')
    const res = await fetch('/api/admin/demo-slots', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dayOfWeek: nsDay,
        startTime: nsTime,
        teacherName: nsTeacher || null,
        capacity: nsCapacity,
        zoomJoinUrl: nsZoom || null,
      }),
    })
    const data = await res.json()
    if (data.success) {
      setNsTeacher('')
      setNsZoom('')
      load()
    } else setMsg(data.error || 'Could not add slot')
  }

  const toggleSlot = async (s: Slot) => {
    await fetch('/api/admin/demo-slots', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: s.id, isActive: !s.isActive }),
    })
    load()
  }

  const deleteSlot = async (id: string) => {
    await fetch(`/api/admin/demo-slots?id=${id}`, { method: 'DELETE', credentials: 'include' })
    load()
  }

  const addBlock = async () => {
    setMsg('')
    if (!nbStart) return setMsg('Pick a start date to block')
    const res = await fetch('/api/admin/demo-slots/blocks', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startDate: nbStart,
        endDate: nbEnd || nbStart,
        reason: nbReason || null,
      }),
    })
    const data = await res.json()
    if (data.success) {
      setNbStart('')
      setNbEnd('')
      setNbReason('')
      load()
    } else setMsg(data.error || 'Could not add block')
  }

  const removeBlock = async (id: string) => {
    await fetch(`/api/admin/demo-slots/blocks?id=${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    load()
  }

  const inputCls =
    'rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100'

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900">Demo &amp; Faculty-Interaction Calendar</h1>
      <p className="mt-1 text-sm text-gray-600">
        Set the weekly slots students &amp; parents can book — and block time when you or a teacher
        are unavailable.
      </p>
      {msg && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{msg}</p>}

      {/* Weekly slots */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">Weekly slots</h2>
        <div className="mt-3 flex flex-wrap items-end gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <label className="flex flex-col text-xs font-medium text-gray-600">
            Day
            <select
              value={nsDay}
              onChange={(e) => setNsDay(+e.target.value)}
              className={`mt-1 ${inputCls}`}
            >
              {DAYS.map((d, i) => (
                <option key={i} value={i}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col text-xs font-medium text-gray-600">
            Time (IST)
            <input
              type="time"
              value={nsTime}
              onChange={(e) => setNsTime(e.target.value)}
              className={`mt-1 ${inputCls}`}
            />
          </label>
          <label className="flex flex-col text-xs font-medium text-gray-600">
            Teacher
            <input
              value={nsTeacher}
              onChange={(e) => setNsTeacher(e.target.value)}
              placeholder="Dr. Shekhar"
              className={`mt-1 ${inputCls}`}
            />
          </label>
          <label className="flex flex-col text-xs font-medium text-gray-600">
            Seats
            <input
              type="number"
              min={1}
              value={nsCapacity}
              onChange={(e) => setNsCapacity(+e.target.value)}
              className={`mt-1 w-20 ${inputCls}`}
            />
          </label>
          <label className="flex flex-1 flex-col text-xs font-medium text-gray-600">
            Zoom link
            <input
              value={nsZoom}
              onChange={(e) => setNsZoom(e.target.value)}
              placeholder="https://zoom.us/j/…"
              className={`mt-1 ${inputCls}`}
            />
          </label>
          <button
            onClick={addSlot}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Add slot
          </button>
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-2">Day</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Teacher</th>
                <th className="px-4 py-2">Seats</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td className="px-4 py-6 text-gray-400" colSpan={6}>
                    Loading…
                  </td>
                </tr>
              ) : slots.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-gray-400" colSpan={6}>
                    No slots yet — add your first weekly slot above.
                  </td>
                </tr>
              ) : (
                slots.map((s) => (
                  <tr key={s.id} className={s.isActive ? '' : 'opacity-50'}>
                    <td className="px-4 py-3 font-medium text-gray-900">{DAYS[s.dayOfWeek]}</td>
                    <td className="px-4 py-3">{to12h(s.startTime)}</td>
                    <td className="px-4 py-3">{s.teacherName || '—'}</td>
                    <td className="px-4 py-3">{s.capacity}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleSlot(s)}
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}
                      >
                        {s.isActive ? 'Active' : 'Paused'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => deleteSlot(s.id)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Blocks */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900">Block time off</h2>
        <p className="mt-1 text-sm text-gray-600">
          Block a day or a range (e.g. travel, holidays) — booking is disabled for anything inside a
          block.
        </p>
        <div className="mt-3 flex flex-wrap items-end gap-3 rounded-xl border border-gray-200 bg-amber-50 p-4">
          <label className="flex flex-col text-xs font-medium text-gray-600">
            From
            <input
              type="date"
              value={nbStart}
              onChange={(e) => setNbStart(e.target.value)}
              className={`mt-1 ${inputCls}`}
            />
          </label>
          <label className="flex flex-col text-xs font-medium text-gray-600">
            To (optional)
            <input
              type="date"
              value={nbEnd}
              onChange={(e) => setNbEnd(e.target.value)}
              className={`mt-1 ${inputCls}`}
            />
          </label>
          <label className="flex flex-1 flex-col text-xs font-medium text-gray-600">
            Reason
            <input
              value={nbReason}
              onChange={(e) => setNbReason(e.target.value)}
              placeholder="Faculty travel"
              className={`mt-1 ${inputCls}`}
            />
          </label>
          <button
            onClick={addBlock}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
          >
            Block dates
          </button>
        </div>

        {blocks.length > 0 && (
          <ul className="mt-4 divide-y divide-gray-100 rounded-xl border border-gray-200">
            {blocks.map((b) => (
              <li key={b.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <span>
                  <span className="font-medium text-gray-900">
                    {b.startDate === b.endDate ? b.startDate : `${b.startDate} → ${b.endDate}`}
                  </span>
                  {b.reason ? <span className="text-gray-500"> · {b.reason}</span> : null}
                </span>
                <button
                  onClick={() => removeBlock(b.id)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Un-block
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
