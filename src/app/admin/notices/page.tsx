'use client'

import { useState, useEffect, useCallback } from 'react'
import { Megaphone, Plus, Pin, Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { showToast } from '@/lib/toast'

interface Notice {
  id: string
  title: string
  content: string
  category: string
  targetType: string
  targetRoles?: string[]
  isPinned: boolean
  publishedAt: string | null
  expiresAt: string | null
  viewCount: number
}

const ROLE_OPTIONS = ['COUNSELOR', 'TEACHER', 'ADMIN', 'STUDENT', 'PARENT']

/**
 * Announcements authoring — the first notices UI for staff. ALL-targeted
 * notices reach the student/parent notice boards; ROLES-targeted ones reach
 * the selected staff roles (and show in their bell via /api/staff/inbox).
 */
export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  // Form state
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [target, setTarget] = useState<'ALL' | 'ROLES'>('ROLES')
  const [roles, setRoles] = useState<string[]>(['COUNSELOR', 'TEACHER'])
  const [pinned, setPinned] = useState(false)
  const [expiresAt, setExpiresAt] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchNotices = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/notices?limit=50')
      const json = await res.json()
      if (json.success) {
        setNotices(json.data?.notices || json.notices || [])
      } else {
        setError(json.error || 'Failed to load notices')
      }
    } catch {
      setError('Failed to load notices')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchNotices()
  }, [fetchNotices])

  const toggleRole = (role: string) => {
    setRoles((prev) => (prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]))
  }

  const publish = async () => {
    if (!title.trim() || !content.trim()) return
    if (target === 'ROLES' && roles.length === 0) {
      showToast.error('Pick at least one role')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          targetType: target,
          targetRoles: target === 'ROLES' ? roles : undefined,
          isPinned: pinned,
          expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined,
        }),
      })
      const json = await res.json()
      if (json.success) {
        showToast.success('Announcement published')
        setTitle('')
        setContent('')
        setExpiresAt('')
        setPinned(false)
        setShowForm(false)
        void fetchNotices()
      } else {
        showToast.error(json.error || 'Failed to publish')
      }
    } catch {
      showToast.error('Failed to publish')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-purple-100 text-purple-700">
            <Megaphone className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-600">
              Publish to staff roles (shows in their notification bell) or to everyone
            </p>
          </div>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => setShowForm((v) => !v)}
        >
          {showForm ? <X className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {showForm ? 'Cancel' : 'New Announcement'}
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-blue-200 p-6 mb-6 space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="What does the team need to know?"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value as 'ALL' | 'ROLES')}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
            >
              <option value="ROLES">Specific roles</option>
              <option value="ALL">Everyone (incl. students)</option>
            </select>
            {target === 'ROLES' &&
              ROLE_OPTIONS.map((role) => (
                <button
                  key={role}
                  onClick={() => toggleRole(role)}
                  className={`px-3 py-1.5 text-xs rounded-full border ${
                    roles.includes(role)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-300'
                  }`}
                >
                  {role}
                </button>
              ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={pinned}
                onChange={(e) => setPinned(e.target.checked)}
              />
              Pin to top
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              Expires
              <input
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-lg text-sm"
              />
            </label>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => void publish()}
            disabled={submitting || !title.trim() || !content.trim()}
          >
            {submitting ? 'Publishing…' : 'Publish'}
          </Button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 mb-3">{error}</p>
          <Button variant="outline" onClick={() => void fetchNotices()}>
            Retry
          </Button>
        </div>
      ) : notices.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Megaphone className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-2 text-sm text-gray-500">No announcements yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notices.map((n) => (
            <div key={n.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {n.isPinned && <Pin className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                    <h3 className="font-semibold text-gray-900 truncate">{n.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{n.content}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-700">
                    {n.targetType === 'ROLES' ? (n.targetRoles || []).join(', ') : n.targetType}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    {n.publishedAt ? new Date(n.publishedAt).toLocaleDateString() : 'Draft'}
                    {n.expiresAt && ` → ${new Date(n.expiresAt).toLocaleDateString()}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
