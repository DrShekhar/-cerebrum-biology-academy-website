'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import {
  Calendar,
  Clock,
  Plus,
  Search,
  Filter,
  Phone,
  Video,
  MapPin,
  User,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { format, startOfWeek, addDays, isSameDay, isToday, isPast, addWeeks, subWeeks } from 'date-fns'
import { showToast } from '@/lib/toast'

// ─── Types ───────────────────────────────────────────────────────────────────

interface ScheduledSession {
  id: string
  leadId: string
  leadName: string
  leadPhone: string
  leadEmail: string | null
  type: 'COUNSELING' | 'DEMO' | 'FOLLOW_UP' | 'PARENT_MEETING' | 'ASSESSMENT'
  mode: 'IN_PERSON' | 'PHONE' | 'VIDEO'
  scheduledAt: string
  duration: number // minutes
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
  notes: string | null
  outcome: string | null
  stage: string
  priority: string
}

const typeConfig: Record<string, { icon: React.ReactNode; label: string; color: string; bg: string }> = {
  COUNSELING: { icon: <User className="w-4 h-4" />, label: 'Counseling', color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
  DEMO: { icon: <Video className="w-4 h-4" />, label: 'Demo Class', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
  FOLLOW_UP: { icon: <Phone className="w-4 h-4" />, label: 'Follow-up', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
  PARENT_MEETING: { icon: <User className="w-4 h-4" />, label: 'Parent Meeting', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  ASSESSMENT: { icon: <FileText className="w-4 h-4" />, label: 'Assessment', color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
}

const modeIcons: Record<string, React.ReactNode> = {
  IN_PERSON: <MapPin className="w-3.5 h-3.5" />,
  PHONE: <Phone className="w-3.5 h-3.5" />,
  VIDEO: <Video className="w-3.5 h-3.5" />,
}

// ─── Schedule a Session Modal ────────────────────────────────────────────────

function ScheduleSessionModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}) {
  const [leads, setLeads] = useState<{ id: string; studentName: string; phone: string }[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLead, setSelectedLead] = useState<string>('')
  const [type, setType] = useState<string>('COUNSELING')
  const [mode, setMode] = useState<string>('PHONE')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [duration, setDuration] = useState(30)
  const [notes, setNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [loadingLeads, setLoadingLeads] = useState(false)

  useEffect(() => {
    if (isOpen) fetchLeads()
  }, [isOpen])

  async function fetchLeads() {
    try {
      setLoadingLeads(true)
      const res = await fetch('/api/counselor/leads?limit=100', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setLeads(data.data || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingLeads(false)
    }
  }

  async function handleSchedule() {
    if (!selectedLead || !date || !time) {
      showToast.error('Please fill in all required fields')
      return
    }
    try {
      setSaving(true)
      const scheduledAt = new Date(`${date}T${time}`).toISOString()
      const res = await fetch('/api/counselor/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          leadId: selectedLead,
          type,
          mode,
          scheduledAt,
          duration,
          notes: notes || null,
        }),
      })
      if (!res.ok) {
        // If API doesn't exist yet, create as task instead
        const taskRes = await fetch('/api/counselor/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            leadId: selectedLead,
            title: `${typeConfig[type]?.label || type} - ${mode.replace('_', ' ')}`,
            type: type === 'DEMO' ? 'DEMO_REMINDER' : 'FOLLOW_UP',
            priority: 'HIGH',
            dueDate: scheduledAt,
            description: notes || `Scheduled ${type.toLowerCase()} session (${duration}min, ${mode})`,
          }),
        })
        if (!taskRes.ok) throw new Error('Failed to schedule')
      }
      showToast.success('Session scheduled successfully')
      onSuccess()
      onClose()
    } catch (err) {
      showToast.error('Failed to schedule session')
    } finally {
      setSaving(false)
    }
  }

  const filteredLeads = leads.filter(
    (l) =>
      l.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm)
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Schedule Session</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <XCircle className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Select Lead */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Student *</label>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or phone..."
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
            <select
              value={selectedLead}
              onChange={(e) => setSelectedLead(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="">Select a student...</option>
              {filteredLeads.map((lead) => (
                <option key={lead.id} value={lead.id}>
                  {lead.studentName} ({lead.phone})
                </option>
              ))}
            </select>
          </div>

          {/* Session Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Session Type *</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(typeConfig).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setType(key)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium border transition-colors ${
                    type === key
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {val.icon} {val.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Mode *</label>
            <div className="flex gap-2">
              {[
                { key: 'PHONE', label: 'Phone Call', icon: <Phone className="w-4 h-4" /> },
                { key: 'VIDEO', label: 'Video Call', icon: <Video className="w-4 h-4" /> },
                { key: 'IN_PERSON', label: 'In-Person', icon: <MapPin className="w-4 h-4" /> },
              ].map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMode(m.key)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium border transition-colors ${
                    mode === m.key
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date *</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={format(new Date(), 'yyyy-MM-dd')}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Time *</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration</label>
            <div className="flex gap-2">
              {[15, 30, 45, 60].map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    duration === d
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {d}m
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Preparation Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Topics to discuss, student background, parent concerns..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm min-h-[80px] resize-y"
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-800 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSchedule}
            disabled={saving || !selectedLead || !date || !time}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calendar className="w-4 h-4" />}
            Schedule Session
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Schedule Page ──────────────────────────────────────────────────────

export default function SchedulePage() {
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [viewMode, setViewMode] = useState<'week' | 'list'>('week')

  useEffect(() => {
    fetchSchedule()
  }, [currentWeek])

  async function fetchSchedule() {
    try {
      setLoading(true)
      const res = await fetch('/api/counselor/tasks?status=TODO&status=IN_PROGRESS', {
        credentials: 'include',
      })
      if (res.ok) {
        const data = await res.json()
        setTasks(data.data || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i))

  const getTasksForDay = (day: Date) =>
    tasks.filter((t) => {
      const taskDate = new Date(t.dueDate)
      return isSameDay(taskDate, day)
    })

  const todayTasks = tasks.filter((t) => isToday(new Date(t.dueDate)))
  const upcomingTasks = tasks
    .filter((t) => !isPast(new Date(t.dueDate)) || isToday(new Date(t.dueDate)))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
          <p className="text-gray-600 mt-1">Manage appointments and counseling sessions</p>
        </div>
        <button
          onClick={() => setShowScheduleModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Schedule Session
        </button>
      </div>

      {/* Today's Summary */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-200 text-sm font-medium">Today, {format(new Date(), 'EEEE, MMMM d')}</p>
            <p className="text-3xl font-bold mt-1">{todayTasks.length} Sessions</p>
            <p className="text-indigo-200 text-sm mt-1">
              {todayTasks.filter((t) => t.status === 'COMPLETED').length} completed •{' '}
              {todayTasks.filter((t) => t.status !== 'COMPLETED').length} remaining
            </p>
          </div>
          <Calendar className="w-12 h-12 text-indigo-300" />
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'week' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Week View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            List View
          </button>
        </div>

        {viewMode === 'week' && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-sm font-medium text-gray-700">
              {format(currentWeek, 'MMM d')} - {format(addDays(currentWeek, 6), 'MMM d, yyyy')}
            </span>
            <button
              onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
        </div>
      ) : viewMode === 'week' ? (
        /* Week View */
        <div className="grid grid-cols-7 gap-3">
          {weekDays.map((day) => {
            const dayTasks = getTasksForDay(day)
            const isCurrentDay = isToday(day)
            return (
              <div
                key={day.toISOString()}
                className={`bg-white rounded-xl border p-3 min-h-[200px] ${
                  isCurrentDay ? 'border-indigo-300 ring-1 ring-indigo-200' : 'border-gray-200'
                }`}
              >
                <div className={`text-center mb-3 pb-2 border-b ${isCurrentDay ? 'border-indigo-200' : 'border-gray-100'}`}>
                  <p className="text-xs text-gray-500 uppercase">{format(day, 'EEE')}</p>
                  <p className={`text-lg font-bold ${isCurrentDay ? 'text-indigo-600' : 'text-gray-900'}`}>
                    {format(day, 'd')}
                  </p>
                </div>
                <div className="space-y-2">
                  {dayTasks.length === 0 ? (
                    <p className="text-xs text-gray-300 text-center py-4">No sessions</p>
                  ) : (
                    dayTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`p-2 rounded-lg border text-xs ${
                          task.status === 'COMPLETED'
                            ? 'bg-green-50 border-green-200 text-green-700'
                            : isPast(new Date(task.dueDate))
                              ? 'bg-red-50 border-red-200 text-red-700'
                              : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                        }`}
                      >
                        <p className="font-medium truncate">{task.lead?.studentName || task.title}</p>
                        <p className="text-[10px] opacity-75 mt-0.5">
                          {format(new Date(task.dueDate), 'h:mm a')} • {task.type?.replace(/_/g, ' ')}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {upcomingTasks.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming sessions</h3>
              <p className="text-gray-500 mb-4">Schedule your first counseling session to get started</p>
              <button
                onClick={() => setShowScheduleModal(true)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Schedule Session
              </button>
            </div>
          ) : (
            upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 hover:shadow-sm transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isToday(new Date(task.dueDate))
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">
                      {task.lead?.studentName || task.title}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      task.priority === 'URGENT' ? 'bg-red-100 text-red-700' :
                      task.priority === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {format(new Date(task.dueDate), 'EEEE, MMM d • h:mm a')} •{' '}
                    {task.type?.replace(/_/g, ' ')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {task.lead?.phone && (
                    <a
                      href={`tel:${task.lead.phone}`}
                      className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href={task.lead ? `/counselor/leads/${task.lead.id}` : '#'}
                    className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium hover:bg-indigo-100 transition-colors"
                  >
                    View
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <ScheduleSessionModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSuccess={fetchSchedule}
      />
    </div>
  )
}
