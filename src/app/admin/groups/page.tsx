'use client'

/**
 * Admin Groups (Batches)
 *
 * Create student groups/batches, manage their members, and assign
 * materials/videos/tests to the whole group with optional drip scheduling
 * (releaseAt absolute, or dayOffset days after the group's startDate).
 * Backed by /api/admin/groups; tables are owner-provisioned
 * (scripts/apply-student-groups.sh) — the page surfaces a setup banner when
 * they are missing instead of erroring.
 */

import { useState, useEffect, useCallback } from 'react'
import {
  Users,
  UsersRound,
  Plus,
  Trash2,
  X,
  Search,
  Loader2,
  FileText,
  Video,
  ClipboardList,
  CalendarClock,
  AlertTriangle,
} from 'lucide-react'
import { showToast } from '@/lib/toast'

const CLASS_LEVELS = [
  { value: 'CLASS_9', label: 'Class 9' },
  { value: 'CLASS_10', label: 'Class 10' },
  { value: 'CLASS_11', label: 'Class 11' },
  { value: 'CLASS_12', label: 'Class 12' },
  { value: 'DROPPER', label: 'Dropper' },
  { value: 'FOUNDATION', label: 'Foundation' },
]

function classLabel(value: string | null): string | null {
  return CLASS_LEVELS.find((c) => c.value === value)?.label ?? value
}

function fmtDate(value: string | null): string {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

interface GroupRow {
  id: string
  name: string
  description: string | null
  classLevel: string | null
  startDate: string | null
  endDate: string | null
  createdAt: string
  memberCount: number
  contentCount: number
}

interface MemberRow {
  id: string
  userId: string
  name: string
  email: string | null
  phone: string | null
  addedAt: string
}

interface ContentRow {
  id: string
  type: 'material' | 'video' | 'test'
  refId: string
  title: string
  releaseAt: string | null
  dayOffset: number | null
  assignedAt: string
}

interface GroupDetailData {
  id: string
  name: string
  description: string | null
  classLevel: string | null
  startDate: string | null
  endDate: string | null
  createdAt: string
  members: MemberRow[]
  content: ContentRow[]
}

interface StudentRow {
  id: string
  name: string
  email: string | null
  phone: string | null
}

interface PickerItem {
  id: string
  title: string
}

type ContentType = 'material' | 'video' | 'test'
type ReleaseMode = 'now' | 'at' | 'offset'

const CONTENT_META: Record<ContentType, { label: string; badge: string; icon: typeof FileText }> = {
  material: { label: 'Material', badge: 'bg-blue-100 text-blue-700', icon: FileText },
  video: { label: 'Video', badge: 'bg-purple-100 text-purple-700', icon: Video },
  test: { label: 'Test', badge: 'bg-green-100 text-green-700', icon: ClipboardList },
}

function releaseInfo(item: ContentRow): string {
  if (item.releaseAt) {
    return `Releases ${new Date(item.releaseAt).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })}`
  }
  if (item.dayOffset !== null && item.dayOffset !== undefined) {
    return `Releases day ${item.dayOffset} of batch`
  }
  return 'Available immediately'
}

export default function AdminGroupsPage() {
  const [groups, setGroups] = useState<GroupRow[]>([])
  const [loading, setLoading] = useState(true)
  const [provisionError, setProvisionError] = useState<string | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [detail, setDetail] = useState<GroupDetailData | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  const fetchGroups = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/groups', { credentials: 'include' })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.success) {
        setGroups(data.groups)
        setProvisionError(null)
      } else if (res.status === 400 && data?.error) {
        setProvisionError(data.error)
      } else {
        showToast.error(data?.error || 'Failed to load groups')
      }
    } catch {
      showToast.error('Failed to load groups')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchDetail = useCallback(async (id: string) => {
    try {
      setDetailLoading(true)
      const res = await fetch(`/api/admin/groups/${id}`, { credentials: 'include' })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.success) {
        setDetail(data.group)
      } else {
        showToast.error(data?.error || 'Failed to load group')
        setDetail(null)
      }
    } catch {
      showToast.error('Failed to load group')
    } finally {
      setDetailLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchGroups()
  }, [fetchGroups])

  useEffect(() => {
    if (selectedId) fetchDetail(selectedId)
    else setDetail(null)
  }, [selectedId, fetchDetail])

  const refreshAll = useCallback(() => {
    fetchGroups()
    if (selectedId) fetchDetail(selectedId)
  }, [fetchGroups, fetchDetail, selectedId])

  const handleDeleteGroup = async (group: GroupRow | GroupDetailData) => {
    const confirmed = confirm(
      `Delete group "${group.name}"?\n\nThis removes the group, its member list and its content assignments. Students, materials, videos and tests themselves are NOT deleted.`
    )
    if (!confirmed) return
    try {
      const res = await fetch(`/api/admin/groups/${group.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.success) {
        showToast.success('Group deleted')
        if (selectedId === group.id) setSelectedId(null)
        fetchGroups()
      } else {
        showToast.error(data?.error || 'Failed to delete group')
      }
    } catch {
      showToast.error('Failed to delete group')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Groups (Batches)</h1>
            <p className="text-gray-600">
              Create student batches and assign materials, videos and tests to the whole group
            </p>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            disabled={!!provisionError}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" /> Create Group
          </button>
        </div>

        {/* Not-provisioned banner */}
        {provisionError && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-yellow-800">Groups are not set up yet</p>
              <p className="text-sm text-yellow-700 mt-1">
                {provisionError} The database tables are created by running{' '}
                <code className="px-1 py-0.5 bg-yellow-100 rounded text-xs">
                  scripts/apply-student-groups.sh
                </code>{' '}
                (owner action). Reload this page afterwards.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Group list */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {loading ? (
                <div className="p-12 text-center text-gray-500">Loading groups...</div>
              ) : groups.length === 0 ? (
                <div className="p-12 text-center">
                  <UsersRound className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">
                    {provisionError ? 'Groups unavailable' : 'No groups yet'}
                  </p>
                  {!provisionError && (
                    <button
                      onClick={() => setCreateOpen(true)}
                      className="mt-4 inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Create Your First Group
                    </button>
                  )}
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {groups.map((g) => (
                    <li key={g.id}>
                      <button
                        onClick={() => setSelectedId(g.id)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                          selectedId === g.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-gray-900 truncate">{g.name}</p>
                          {g.classLevel && (
                            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium flex-shrink-0">
                              {classLabel(g.classLevel)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {g.startDate || g.endDate
                            ? `${fmtDate(g.startDate)} → ${fmtDate(g.endDate)}`
                            : 'No batch dates'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {g.memberCount} member{g.memberCount === 1 ? '' : 's'} · {g.contentCount}{' '}
                          item{g.contentCount === 1 ? '' : 's'}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            {!selectedId ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center text-gray-400">
                <Users className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                Select a group to manage its members and content
              </div>
            ) : detailLoading || !detail ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center text-gray-500">
                <Loader2 className="w-6 h-6 animate-spin mx-auto" />
              </div>
            ) : (
              <GroupDetail
                detail={detail}
                onDelete={() => handleDeleteGroup(detail)}
                onChanged={refreshAll}
              />
            )}
          </div>
        </div>
      </div>

      {createOpen && (
        <CreateGroupModal
          onClose={() => setCreateOpen(false)}
          onCreated={(id) => {
            setCreateOpen(false)
            setSelectedId(id)
            fetchGroups()
          }}
        />
      )}
    </div>
  )
}

function CreateGroupModal({
  onClose,
  onCreated,
}: {
  onClose: () => void
  onCreated: (id: string) => void
}) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [classLevel, setClassLevel] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleCreate = async () => {
    if (!name.trim() || submitting) return
    try {
      setSubmitting(true)
      const res = await fetch('/api/admin/groups', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim() || undefined,
          classLevel: classLevel || undefined,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
        }),
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.success) {
        showToast.success('Group created')
        onCreated(data.group.id)
      } else {
        showToast.error(data?.error || 'Failed to create group')
      }
    } catch {
      showToast.error('Failed to create group')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-5 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Create Group</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. NEET 2027 Morning Batch"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Class level</label>
            <select
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Any / mixed</option>
              {CLASS_LEVELS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Start date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">Needed for day-offset drip</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">End date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-5 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!name.trim() || submitting}
            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

function GroupDetail({
  detail,
  onDelete,
  onChanged,
}: {
  detail: GroupDetailData
  onDelete: () => void
  onChanged: () => void
}) {
  const [tab, setTab] = useState<'members' | 'content'>('members')

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Group header */}
      <div className="p-5 border-b border-gray-200 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-bold text-gray-900">{detail.name}</h2>
            {detail.classLevel && (
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                {classLabel(detail.classLevel)}
              </span>
            )}
          </div>
          {detail.description && <p className="text-sm text-gray-500 mt-1">{detail.description}</p>}
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
            <CalendarClock className="w-3.5 h-3.5" />
            {detail.startDate || detail.endDate
              ? `${fmtDate(detail.startDate)} → ${fmtDate(detail.endDate)}`
              : 'No batch dates set'}
          </p>
        </div>
        <button
          onClick={onDelete}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium flex-shrink-0"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-5 pt-4">
        {(
          [
            { id: 'members', label: `Members (${detail.members.length})` },
            { id: 'content', label: `Content (${detail.content.length})` },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-5">
        {tab === 'members' ? (
          <MembersTab detail={detail} onChanged={onChanged} />
        ) : (
          <ContentTab detail={detail} onChanged={onChanged} />
        )}
      </div>
    </div>
  )
}

function MembersTab({ detail, onChanged }: { detail: GroupDetailData; onChanged: () => void }) {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<StudentRow[]>([])
  const [searching, setSearching] = useState(false)
  const [busyIds, setBusyIds] = useState<Set<string>>(new Set())

  const memberUserIds = new Set(detail.members.map((m) => m.userId))

  const searchStudents = useCallback(async (query: string) => {
    try {
      setSearching(true)
      const params = new URLSearchParams({ role: 'student', limit: '20' })
      if (query) params.set('search', query)
      const res = await fetch(`/api/admin/students?${params}`, { credentials: 'include' })
      const data = await res.json().catch(() => null)
      if (data?.success && data.data?.students) {
        setResults(data.data.students)
      }
    } catch {
      // Non-critical — list just stays empty
    } finally {
      setSearching(false)
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => searchStudents(search), 300)
    return () => clearTimeout(t)
  }, [search, searchStudents])

  const withBusy = async (id: string, fn: () => Promise<void>) => {
    setBusyIds((prev) => new Set(prev).add(id))
    try {
      await fn()
    } finally {
      setBusyIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }
  }

  const addMember = (student: StudentRow) =>
    withBusy(student.id, async () => {
      try {
        const res = await fetch(`/api/admin/groups/${detail.id}/members`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userIds: [student.id] }),
        })
        const data = await res.json().catch(() => null)
        if (res.ok && data?.success) {
          showToast.success(`${student.name} added`)
          onChanged()
        } else {
          showToast.error(data?.error || 'Failed to add member')
        }
      } catch {
        showToast.error('Failed to add member')
      }
    })

  const removeMember = (member: MemberRow) =>
    withBusy(member.userId, async () => {
      try {
        const res = await fetch(`/api/admin/groups/${detail.id}/members`, {
          method: 'DELETE',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userIds: [member.userId] }),
        })
        const data = await res.json().catch(() => null)
        if (res.ok && data?.success) {
          showToast.success(`${member.name} removed`)
          onChanged()
        } else {
          showToast.error(data?.error || 'Failed to remove member')
        }
      } catch {
        showToast.error('Failed to remove member')
      }
    })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Add students */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Add students</h3>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or phone..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
        <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-72 overflow-y-auto">
          {searching ? (
            <div className="p-6 text-center text-gray-400">
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-400">No students found</div>
          ) : (
            results.map((s) => {
              const isMember = memberUserIds.has(s.id)
              return (
                <div key={s.id} className="flex items-center gap-3 px-3 py-2">
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-gray-900 truncate">
                      {s.name}
                    </span>
                    <span className="block text-xs text-gray-500 truncate">
                      {s.email || s.phone || ''}
                    </span>
                  </span>
                  {isMember ? (
                    <span className="text-xs text-green-600 font-medium">Member</span>
                  ) : (
                    <button
                      onClick={() => addMember(s)}
                      disabled={busyIds.has(s.id)}
                      className="px-2.5 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700 disabled:opacity-50"
                    >
                      {busyIds.has(s.id) ? '...' : 'Add'}
                    </button>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Current members */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Current members ({detail.members.length})
        </h3>
        <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-[22rem] overflow-y-auto">
          {detail.members.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-400">No members yet</div>
          ) : (
            detail.members.map((m) => (
              <div key={m.id} className="flex items-center gap-3 px-3 py-2">
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-gray-900 truncate">{m.name}</span>
                  <span className="block text-xs text-gray-500 truncate">
                    {m.email || m.phone || ''}
                  </span>
                </span>
                <button
                  onClick={() => removeMember(m)}
                  disabled={busyIds.has(m.userId)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded disabled:opacity-50"
                  aria-label={`Remove ${m.name}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function ContentTab({ detail, onChanged }: { detail: GroupDetailData; onChanged: () => void }) {
  const [contentType, setContentType] = useState<ContentType>('material')
  const [items, setItems] = useState<Record<ContentType, PickerItem[] | null>>({
    material: null,
    video: null,
    test: null,
  })
  const [itemsLoading, setItemsLoading] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState('')
  const [releaseMode, setReleaseMode] = useState<ReleaseMode>('now')
  const [releaseAt, setReleaseAt] = useState('')
  const [dayOffset, setDayOffset] = useState('')
  const [assigning, setAssigning] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)

  useEffect(() => {
    if (items[contentType] !== null) return
    let cancelled = false
    const load = async () => {
      try {
        setItemsLoading(true)
        let list: PickerItem[] = []
        if (contentType === 'material') {
          const res = await fetch('/api/admin/lms/materials?limit=200', { credentials: 'include' })
          const data = await res.json().catch(() => null)
          if (data?.success && Array.isArray(data.materials)) {
            list = data.materials.map((m: { id: string; title: string }) => ({
              id: m.id,
              title: m.title,
            }))
          }
        } else if (contentType === 'video') {
          const res = await fetch('/api/admin/lms/videos?limit=200', { credentials: 'include' })
          const data = await res.json().catch(() => null)
          if (data?.success && Array.isArray(data.videos)) {
            list = data.videos.map((v: { id: string; title: string }) => ({
              id: v.id,
              title: v.title,
            }))
          }
        } else {
          const res = await fetch('/api/admin/tests', { credentials: 'include' })
          const data = await res.json().catch(() => null)
          if (Array.isArray(data?.tests)) {
            list = data.tests.map((t: { id: string; title: string }) => ({
              id: t.id,
              title: t.title,
            }))
          }
        }
        if (!cancelled) {
          setItems((prev) => ({ ...prev, [contentType]: list }))
        }
      } catch {
        if (!cancelled) setItems((prev) => ({ ...prev, [contentType]: [] }))
      } finally {
        if (!cancelled) setItemsLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [contentType, items])

  const assignedRefIds = new Set(detail.content.map((c) => c.refId))
  const currentItems = items[contentType] ?? []

  const handleAssign = async () => {
    if (!selectedItemId || assigning) return
    if (releaseMode === 'offset' && !detail.startDate) {
      showToast.error('Set the group start date first to use day-offset drip')
      return
    }
    try {
      setAssigning(true)
      const body: Record<string, unknown> = {}
      if (contentType === 'material') body.materialId = selectedItemId
      if (contentType === 'video') body.videoLectureId = selectedItemId
      if (contentType === 'test') body.testTemplateId = selectedItemId
      if (releaseMode === 'at' && releaseAt) body.releaseAt = new Date(releaseAt).toISOString()
      if (releaseMode === 'offset' && dayOffset !== '') body.dayOffset = Number(dayOffset)

      const res = await fetch(`/api/admin/groups/${detail.id}/content`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.success) {
        showToast.success(
          data.alreadyAssigned ? 'Already assigned to this group' : 'Content assigned'
        )
        setSelectedItemId('')
        setReleaseAt('')
        setDayOffset('')
        setReleaseMode('now')
        onChanged()
      } else {
        showToast.error(data?.error || 'Failed to assign content')
      }
    } catch {
      showToast.error('Failed to assign content')
    } finally {
      setAssigning(false)
    }
  }

  const handleRemove = async (item: ContentRow) => {
    if (removingId) return
    try {
      setRemovingId(item.id)
      const res = await fetch(`/api/admin/groups/${detail.id}/content`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentId: item.id }),
      })
      const data = await res.json().catch(() => null)
      if (res.ok && data?.success) {
        showToast.success('Assignment removed')
        onChanged()
      } else {
        showToast.error(data?.error || 'Failed to remove assignment')
      }
    } catch {
      showToast.error('Failed to remove assignment')
    } finally {
      setRemovingId(null)
    }
  }

  const canAssign =
    !!selectedItemId &&
    !assigning &&
    (releaseMode !== 'at' || !!releaseAt) &&
    (releaseMode !== 'offset' || dayOffset !== '')

  return (
    <div className="space-y-6">
      {/* Assign new content */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Assign content to this group</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <select
            value={contentType}
            onChange={(e) => {
              setContentType(e.target.value as ContentType)
              setSelectedItemId('')
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
          >
            <option value="material">Study material</option>
            <option value="video">Video lecture</option>
            <option value="test">Test template</option>
          </select>

          <select
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(e.target.value)}
            disabled={itemsLoading}
            className="sm:col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white disabled:opacity-60"
          >
            <option value="">
              {itemsLoading
                ? 'Loading...'
                : currentItems.length === 0
                  ? `No ${CONTENT_META[contentType].label.toLowerCase()}s found`
                  : `Select a ${CONTENT_META[contentType].label.toLowerCase()}...`}
            </option>
            {currentItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
                {assignedRefIds.has(item.id) ? ' (already assigned)' : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <select
            value={releaseMode}
            onChange={(e) => setReleaseMode(e.target.value as ReleaseMode)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
          >
            <option value="now">Release immediately</option>
            <option value="at">Release at date/time</option>
            <option value="offset">Release on batch day</option>
          </select>

          {releaseMode === 'at' && (
            <input
              type="datetime-local"
              value={releaseAt}
              onChange={(e) => setReleaseAt(e.target.value)}
              className="sm:col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
            />
          )}
          {releaseMode === 'offset' && (
            <div className="sm:col-span-2 flex items-center gap-2">
              <span className="text-sm text-gray-600">Day</span>
              <input
                type="number"
                min={0}
                value={dayOffset}
                onChange={(e) => setDayOffset(e.target.value)}
                placeholder="0"
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
              />
              <span className="text-xs text-gray-500">
                after batch start (
                {detail.startDate ? fmtDate(detail.startDate) : 'no start date set'})
              </span>
            </div>
          )}
        </div>

        <button
          onClick={handleAssign}
          disabled={!canAssign}
          className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {assigning && <Loader2 className="w-4 h-4 animate-spin" />}
          Assign to group
        </button>
      </div>

      {/* Assigned items */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Assigned items ({detail.content.length})
        </h3>
        <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
          {detail.content.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-400">No content assigned yet</div>
          ) : (
            detail.content.map((item) => {
              const meta = CONTENT_META[item.type]
              const Icon = meta.icon
              return (
                <div key={item.id} className="flex items-center gap-3 px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${meta.badge}`}
                  >
                    <Icon className="w-3 h-3" /> {meta.label}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </span>
                    <span className="block text-xs text-gray-500">{releaseInfo(item)}</span>
                  </span>
                  <button
                    onClick={() => handleRemove(item)}
                    disabled={removingId === item.id}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded disabled:opacity-50 flex-shrink-0"
                    aria-label={`Remove ${item.title}`}
                  >
                    {removingId === item.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
