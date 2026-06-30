'use client'

/**
 * Admin LMS — Curriculum Builder
 *
 * Replaces the old "Coming Soon" placeholder. Lets staff build a course's
 * chapter → topic tree through the UI (previously only possible via DB/seed),
 * so uploaded videos/materials can be attached and appear in the student
 * syllabus.
 */

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2, Plus, Trash2, Pencil, Check, X } from 'lucide-react'
import { showToast } from '@/lib/toast'

interface Topic {
  id: string
  title: string
  orderIndex: number
}
interface Chapter {
  id: string
  title: string
  description?: string | null
  orderIndex: number
  topics: Topic[]
}
interface Course {
  id: string
  name: string
}

export default function CurriculumBuilderPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [courseId, setCourseId] = useState('')
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [loading, setLoading] = useState(false)
  const [newChapter, setNewChapter] = useState('')
  const [newTopic, setNewTopic] = useState<Record<string, string>>({})
  const [editing, setEditing] = useState<{
    kind: 'chapter' | 'topic'
    id: string
    value: string
  } | null>(null)

  useEffect(() => {
    fetch('/api/admin/courses?limit=200')
      .then((r) => r.json())
      .then((j) => {
        if (j?.success && j.data?.courses) {
          setCourses(j.data.courses.map((c: any) => ({ id: c.id, name: c.name })))
        }
      })
      .catch(() => {})
  }, [])

  const loadChapters = useCallback(async () => {
    if (!courseId) {
      setChapters([])
      return
    }
    setLoading(true)
    try {
      const r = await fetch(`/api/admin/lms/chapters?courseId=${encodeURIComponent(courseId)}`)
      const j = await r.json()
      setChapters(j?.success ? j.chapters : [])
    } catch {
      setChapters([])
    } finally {
      setLoading(false)
    }
  }, [courseId])

  useEffect(() => {
    loadChapters()
  }, [loadChapters])

  async function addChapter() {
    if (!newChapter.trim() || !courseId) return
    const r = await fetch('/api/admin/lms/chapters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId, title: newChapter.trim() }),
    })
    const j = await r.json()
    if (j?.success) {
      setNewChapter('')
      showToast.success('Chapter added')
      loadChapters()
    } else {
      showToast.error(j?.error || 'Could not add chapter')
    }
  }

  async function addTopic(chapterId: string) {
    const title = (newTopic[chapterId] || '').trim()
    if (!title) return
    const r = await fetch('/api/admin/lms/topics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chapterId, title }),
    })
    const j = await r.json()
    if (j?.success) {
      setNewTopic((p) => ({ ...p, [chapterId]: '' }))
      loadChapters()
    } else {
      showToast.error(j?.error || 'Could not add topic')
    }
  }

  async function remove(kind: 'chapters' | 'topics', id: string, label: string) {
    if (!window.confirm(`Delete this ${label}? This cannot be undone.`)) return
    const r = await fetch(`/api/admin/lms/${kind}/${id}`, { method: 'DELETE' })
    const j = await r.json()
    if (j?.success) loadChapters()
    else showToast.error(j?.error || `Could not delete ${label}`)
  }

  async function saveEdit() {
    if (!editing || !editing.value.trim()) return
    const kind = editing.kind === 'chapter' ? 'chapters' : 'topics'
    const r = await fetch(`/api/admin/lms/${kind}/${editing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editing.value.trim() }),
    })
    const j = await r.json()
    setEditing(null)
    if (j?.success) loadChapters()
    else showToast.error(j?.error || 'Could not save')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Curriculum Builder</h1>
          <p className="text-gray-600">
            Build the chapter → topic structure for a course, then attach videos &amp; materials so
            they appear in the{' '}
            <Link href="/admin/lms/videos/upload" className="text-blue-600 hover:underline">
              student syllabus
            </Link>
            .
          </p>
        </div>

        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">Course</label>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">— Select a course —</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {!courseId ? (
          <p className="text-gray-500">Select a course to manage its curriculum.</p>
        ) : loading ? (
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-blue-600" />
        ) : (
          <div className="space-y-4">
            {/* Add chapter */}
            <div className="flex gap-2">
              <input
                value={newChapter}
                onChange={(e) => setNewChapter(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addChapter()}
                placeholder="New chapter title…"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
              <button
                onClick={addChapter}
                className="inline-flex items-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" /> Chapter
              </button>
            </div>

            {chapters.length === 0 && (
              <p className="text-sm text-gray-500">No chapters yet. Add the first one above.</p>
            )}

            {chapters.map((ch, i) => (
              <div key={ch.id} className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  {editing?.kind === 'chapter' && editing.id === ch.id ? (
                    <div className="flex flex-1 items-center gap-2">
                      <input
                        value={editing.value}
                        onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                        className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm"
                        autoFocus
                      />
                      <button onClick={saveEdit} className="text-green-600">
                        <Check className="h-4 w-4" />
                      </button>
                      <button onClick={() => setEditing(null)} className="text-gray-400">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <h3 className="font-semibold text-gray-900">
                      {i + 1}. {ch.title}
                    </h3>
                  )}
                  <div className="ml-3 flex items-center gap-2">
                    <button
                      onClick={() => setEditing({ kind: 'chapter', id: ch.id, value: ch.title })}
                      className="text-gray-400 hover:text-blue-600"
                      title="Rename chapter"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => remove('chapters', ch.id, 'chapter')}
                      className="text-gray-400 hover:text-red-600"
                      title="Delete chapter"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Topics */}
                <ul className="mt-3 space-y-1 pl-4">
                  {ch.topics.map((t) => (
                    <li key={t.id} className="flex items-center justify-between text-sm">
                      {editing?.kind === 'topic' && editing.id === t.id ? (
                        <div className="flex flex-1 items-center gap-2">
                          <input
                            value={editing.value}
                            onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                            className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm"
                            autoFocus
                          />
                          <button onClick={saveEdit} className="text-green-600">
                            <Check className="h-4 w-4" />
                          </button>
                          <button onClick={() => setEditing(null)} className="text-gray-400">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="text-gray-700">• {t.title}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditing({ kind: 'topic', id: t.id, value: t.title })}
                              className="text-gray-400 hover:text-blue-600"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => remove('topics', t.id, 'topic')}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Add topic */}
                <div className="mt-3 flex gap-2 pl-4">
                  <input
                    value={newTopic[ch.id] || ''}
                    onChange={(e) => setNewTopic((p) => ({ ...p, [ch.id]: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && addTopic(ch.id)}
                    placeholder="Add a topic…"
                    className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm"
                  />
                  <button
                    onClick={() => addTopic(ch.id)}
                    className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
                  >
                    <Plus className="h-3.5 w-3.5" /> Topic
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
