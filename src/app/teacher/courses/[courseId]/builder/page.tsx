'use client'

/**
 * Course Builder — teacher-facing authoring UI for the course structure.
 * Chapters: add / rename / reorder / drip date / prerequisite toggle /
 * activate-deactivate / delete. Topics: add / rename / delete. Material counts
 * shown per chapter/topic (uploads happen via the existing LMS upload flow).
 */

import { use, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  Loader2,
  ArrowLeft,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Pencil,
  CalendarClock,
  Lock,
  Eye,
  EyeOff,
  FileText,
  X,
  Check,
} from 'lucide-react'

interface TopicNode {
  id: string
  title: string
  orderIndex: number
  isActive: boolean
  materialCount: number
}

interface ChapterNode {
  id: string
  title: string
  description: string | null
  orderIndex: number
  isActive: boolean
  releaseAt: string | null
  requiresPrevious: boolean
  materialCount: number
  topics: TopicNode[]
}

interface CourseInfo {
  id: string
  name: string
}

export default function CourseBuilderPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params)
  const router = useRouter()
  const [course, setCourse] = useState<CourseInfo | null>(null)
  const [chapters, setChapters] = useState<ChapterNode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newChapter, setNewChapter] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/teacher/builder/${courseId}`)
      const data = await res.json()
      if (!res.ok || !data.success) {
        setError(data.error || 'Could not load the course.')
        return
      }
      setCourse(data.course)
      setChapters(data.chapters || [])
    } catch {
      setError('Network error.')
    } finally {
      setLoading(false)
    }
  }, [courseId])

  useEffect(() => {
    load()
  }, [load])

  // ── API helpers ────────────────────────────────────────────────────────────
  const patchChapter = async (id: string, patch: Record<string, unknown>) => {
    const res = await fetch(`/api/teacher/builder/chapters/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    })
    if (!res.ok) toast.error('Update failed')
    return res.ok
  }

  const addChapter = async () => {
    const title = newChapter.trim()
    if (!title) return
    setBusy(true)
    try {
      const res = await fetch(`/api/teacher/builder/${courseId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })
      if (res.ok) {
        setNewChapter('')
        toast.success('Chapter added')
        await load()
      } else {
        toast.error('Could not add chapter')
      }
    } finally {
      setBusy(false)
    }
  }

  const deleteChapter = async (ch: ChapterNode) => {
    if (
      !confirm(
        `Delete chapter “${ch.title}”? Its topics and material links are removed. This cannot be undone.`
      )
    )
      return
    const res = await fetch(`/api/teacher/builder/chapters/${ch.id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Chapter deleted')
      await load()
    } else toast.error('Delete failed')
  }

  const moveChapter = async (index: number, dir: -1 | 1) => {
    const target = index + dir
    if (target < 0 || target >= chapters.length) return
    const a = chapters[index]
    const b = chapters[target]
    // Swap orderIndex on both, then reload.
    const ok1 = await patchChapter(a.id, { orderIndex: b.orderIndex })
    const ok2 = await patchChapter(b.id, { orderIndex: a.orderIndex })
    if (ok1 && ok2) await load()
  }

  const addTopic = async (chapterId: string, title: string) => {
    if (!title.trim()) return
    const res = await fetch(`/api/teacher/builder/chapters/${chapterId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.trim() }),
    })
    if (res.ok) {
      toast.success('Topic added')
      await load()
    } else toast.error('Could not add topic')
  }

  const deleteTopic = async (t: TopicNode) => {
    if (!confirm(`Delete topic “${t.title}”?`)) return
    const res = await fetch(`/api/teacher/builder/topics/${t.id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success('Topic deleted')
      await load()
    } else toast.error('Delete failed')
  }

  const renameTopic = async (t: TopicNode) => {
    const title = prompt('Topic title', t.title)
    if (!title || title.trim() === t.title) return
    const res = await fetch(`/api/teacher/builder/topics/${t.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.trim() }),
    })
    if (res.ok) await load()
    else toast.error('Rename failed')
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-500">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Loading builder…
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <h1 className="text-xl font-bold text-gray-900">Builder unavailable</h1>
        <p className="mt-2 text-gray-600">{error}</p>
        <button
          onClick={load}
          className="mt-4 rounded-lg bg-green-700 px-5 py-2 text-sm font-semibold text-white hover:bg-green-800"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <button
        onClick={() => router.push('/teacher/courses')}
        className="mb-3 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" /> All courses
      </button>
      <h1 className="text-2xl font-bold text-gray-900">{course?.name}</h1>
      <p className="mt-1 text-sm text-gray-600">
        Structure the course below. Use the drip date to schedule a chapter’s release, and the
        prerequisite lock to require the previous chapter first.
      </p>

      {/* Add chapter */}
      <div className="mt-5 flex gap-2">
        <input
          value={newChapter}
          onChange={(e) => setNewChapter(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addChapter()}
          placeholder="New chapter title…"
          aria-label="New chapter title"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <button
          onClick={addChapter}
          disabled={busy || !newChapter.trim()}
          className="inline-flex items-center gap-1.5 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" /> Add chapter
        </button>
      </div>

      {/* Chapters */}
      <div className="mt-5 space-y-4">
        {chapters.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
            No chapters yet — add the first one above.
          </div>
        )}
        {chapters.map((ch, i) => (
          <div key={ch.id} className="rounded-2xl border border-gray-200 bg-white">
            {/* Chapter header row */}
            <div className="flex items-center gap-2 border-b border-gray-100 p-4">
              <div className="flex flex-col">
                <button
                  onClick={() => moveChapter(i, -1)}
                  disabled={i === 0}
                  className="text-gray-400 hover:text-gray-700 disabled:opacity-30"
                  aria-label="Move chapter up"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => moveChapter(i, 1)}
                  disabled={i === chapters.length - 1}
                  className="text-gray-400 hover:text-gray-700 disabled:opacity-30"
                  aria-label="Move chapter down"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-gray-900">
                    {i + 1}. {ch.title}
                  </span>
                  {!ch.isActive && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      hidden
                    </span>
                  )}
                  {ch.releaseAt && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
                      <CalendarClock className="h-3 w-3" />
                      drips {new Date(ch.releaseAt).toLocaleDateString('en-IN')}
                    </span>
                  )}
                  {ch.requiresPrevious && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2 py-0.5 text-xs text-purple-700">
                      <Lock className="h-3 w-3" /> needs previous
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                    <FileText className="h-3 w-3" /> {ch.materialCount} materials
                  </span>
                </div>
              </div>
              <button
                onClick={() => setEditingId(editingId === ch.id ? null : ch.id)}
                className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100"
                title="Edit chapter settings"
                aria-label="Edit chapter settings"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => patchChapter(ch.id, { isActive: !ch.isActive }).then(load)}
                className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100"
                title={ch.isActive ? 'Hide from students' : 'Show to students'}
                aria-label={ch.isActive ? 'Hide chapter' : 'Show chapter'}
              >
                {ch.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
              <button
                onClick={() => deleteChapter(ch)}
                className="rounded-md p-1.5 text-red-500 hover:bg-red-50"
                title="Delete chapter"
                aria-label="Delete chapter"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Chapter settings editor */}
            {editingId === ch.id && (
              <ChapterEditor
                chapter={ch}
                onCancel={() => setEditingId(null)}
                onSave={async (patch) => {
                  const ok = await patchChapter(ch.id, patch)
                  if (ok) {
                    toast.success('Chapter updated')
                    setEditingId(null)
                    await load()
                  }
                }}
              />
            )}

            {/* Topics */}
            <div className="p-4">
              <div className="space-y-1.5">
                {ch.topics.map((t, ti) => (
                  <div
                    key={t.id}
                    className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm"
                  >
                    <span className="text-gray-400">
                      {i + 1}.{ti + 1}
                    </span>
                    <span className="flex-1 text-gray-800">{t.title}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                      <FileText className="h-3 w-3" /> {t.materialCount}
                    </span>
                    <button
                      onClick={() => renameTopic(t)}
                      className="rounded p-1 text-gray-400 hover:text-gray-700"
                      title="Rename topic"
                      aria-label="Rename topic"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => deleteTopic(t)}
                      className="rounded p-1 text-red-400 hover:text-red-600"
                      title="Delete topic"
                      aria-label="Delete topic"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <AddTopicInput onAdd={(title) => addTopic(ch.id, title)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChapterEditor({
  chapter,
  onSave,
  onCancel,
}: {
  chapter: ChapterNode
  onSave: (patch: Record<string, unknown>) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState(chapter.title)
  const [description, setDescription] = useState(chapter.description || '')
  const [releaseAt, setReleaseAt] = useState(
    chapter.releaseAt ? new Date(chapter.releaseAt).toISOString().slice(0, 16) : ''
  )
  const [requiresPrevious, setRequiresPrevious] = useState(chapter.requiresPrevious)

  return (
    <div className="space-y-3 border-b border-gray-100 bg-gray-50 p-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-600" htmlFor={`t-${chapter.id}`}>
          Title
        </label>
        <input
          id={`t-${chapter.id}`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-600" htmlFor={`d-${chapter.id}`}>
          Description
        </label>
        <textarea
          id={`d-${chapter.id}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label
            className="mb-1 block text-xs font-medium text-gray-600"
            htmlFor={`r-${chapter.id}`}
          >
            Drip release (optional)
          </label>
          <input
            id={`r-${chapter.id}`}
            type="datetime-local"
            value={releaseAt}
            onChange={(e) => setReleaseAt(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <label className="flex items-center gap-2 pb-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={requiresPrevious}
            onChange={(e) => setRequiresPrevious(e.target.checked)}
          />
          Require previous chapter first
        </label>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-white"
        >
          <X className="h-3.5 w-3.5" /> Cancel
        </button>
        <button
          onClick={() =>
            onSave({
              title,
              description,
              releaseAt: releaseAt ? new Date(releaseAt).toISOString() : null,
              requiresPrevious,
            })
          }
          className="inline-flex items-center gap-1 rounded-lg bg-green-700 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-800"
        >
          <Check className="h-3.5 w-3.5" /> Save
        </button>
      </div>
    </div>
  )
}

function AddTopicInput({ onAdd }: { onAdd: (title: string) => void }) {
  const [value, setValue] = useState('')
  return (
    <div className="mt-2 flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && value.trim()) {
            onAdd(value)
            setValue('')
          }
        }}
        placeholder="Add a topic…"
        aria-label="New topic title"
        className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:border-green-500 focus:outline-none"
      />
      <button
        onClick={() => {
          if (value.trim()) {
            onAdd(value)
            setValue('')
          }
        }}
        disabled={!value.trim()}
        className="inline-flex items-center gap-1 rounded-lg border border-green-700 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-50 disabled:opacity-40"
      >
        <Plus className="h-3.5 w-3.5" /> Topic
      </button>
    </div>
  )
}
