'use client'

/**
 * Course Builder — shared authoring UI for the course structure, rendered by
 * both the teacher builder page and the admin course workspace Curriculum
 * tab. Chapters: add / rename / reorder / drip date / prerequisite toggle /
 * activate-deactivate / delete. Topics: add / rename / delete. Material counts
 * shown per chapter/topic (uploads happen via the existing LMS upload flow).
 */

import { useEffect, useState, useCallback, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  Loader2,
  ArrowLeft,
  Plus,
  Trash2,
  GripVertical,
  Pencil,
  CalendarClock,
  Lock,
  Eye,
  EyeOff,
  FileText,
  X,
  Check,
  Sparkles,
  UploadCloud,
  ClipboardList,
  BookOpen,
} from 'lucide-react'
import { BulkUploader } from './BulkUploader'

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
  dripDaysAfterEnroll: number | null
  requiresPrevious: boolean
  isFreePreview?: boolean
  materialCount: number
  topics: TopicNode[]
}

interface CourseInfo {
  id: string
  name: string
}

export function CourseBuilder({
  courseId,
  backHref,
  showTitle = true,
}: {
  courseId: string
  backHref?: string | null
  showTitle?: boolean
}) {
  const router = useRouter()
  const [course, setCourse] = useState<CourseInfo | null>(null)
  const [chapters, setChapters] = useState<ChapterNode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newChapter, setNewChapter] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [uploadChapterId, setUploadChapterId] = useState<string | null>(null)
  const [assessmentChapterId, setAssessmentChapterId] = useState<string | null>(null)
  const [articleChapterId, setArticleChapterId] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [showAI, setShowAI] = useState(false)

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

  // Drag-and-drop reorder: optimistic local move, then one-shot server write.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const persistOrder = async (payload: Record<string, unknown>) => {
    const res = await fetch(`/api/teacher/builder/${courseId}/reorder`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      toast.error('Reorder failed — reloading')
      await load()
    }
  }

  const onChapterDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const from = chapters.findIndex((ch) => ch.id === active.id)
    const to = chapters.findIndex((ch) => ch.id === over.id)
    if (from < 0 || to < 0) return
    const next = arrayMove(chapters, from, to)
    setChapters(next)
    void persistOrder({ chapterIds: next.map((ch) => ch.id) })
  }

  const onTopicDragEnd = (chapterId: string) => (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const ch = chapters.find((x) => x.id === chapterId)
    if (!ch) return
    const from = ch.topics.findIndex((t) => t.id === active.id)
    const to = ch.topics.findIndex((t) => t.id === over.id)
    if (from < 0 || to < 0) return
    const nextTopics = arrayMove(ch.topics, from, to)
    setChapters((cs) => cs.map((x) => (x.id === chapterId ? { ...x, topics: nextTopics } : x)))
    void persistOrder({ chapterId, topicIds: nextTopics.map((t) => t.id) })
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
    <div className="mx-auto max-w-4xl">
      {backHref && (
        <button
          onClick={() => router.push(backHref)}
          className="mb-3 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" /> All courses
        </button>
      )}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          {showTitle && <h1 className="text-2xl font-bold text-gray-900">{course?.name}</h1>}
          <p className="mt-1 text-sm text-gray-600">
            Structure the course below. Use the drip date to schedule a chapter’s release, and the
            prerequisite lock to require the previous chapter first.
          </p>
        </div>
        <button
          onClick={() => setShowAI((v) => !v)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-purple-300 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-100"
        >
          <Sparkles className="h-4 w-4" /> Generate with AI
        </button>
      </div>

      {showAI && (
        <AIOutlinePanel
          courseId={courseId}
          existingCount={chapters.length}
          onApplied={async () => {
            setShowAI(false)
            await load()
          }}
        />
      )}

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

      {/* Chapters — drag the grip to reorder */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onChapterDragEnd}>
        <SortableContext items={chapters.map((ch) => ch.id)} strategy={verticalListSortingStrategy}>
          <div className="mt-5 space-y-4">
            {chapters.length === 0 && (
              <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
                No chapters yet — add the first one above.
              </div>
            )}
            {chapters.map((ch, i) => (
              <SortableItem key={ch.id} id={ch.id}>
                {({ attributes, listeners }) => (
                  <div className="rounded-2xl border border-gray-200 bg-white">
                    {/* Chapter header row */}
                    <div className="flex items-center gap-2 border-b border-gray-100 p-4">
                      <button
                        {...attributes}
                        {...listeners}
                        className="cursor-grab touch-none rounded p-1.5 text-gray-400 hover:text-gray-700 active:cursor-grabbing"
                        aria-label="Drag to reorder chapter"
                        title="Drag to reorder"
                      >
                        <GripVertical className="h-4 w-4" />
                      </button>
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
                          {ch.dripDaysAfterEnroll != null && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
                              <CalendarClock className="h-3 w-3" />
                              day {ch.dripDaysAfterEnroll} after enrolling
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
                        onClick={() => setUploadChapterId(uploadChapterId === ch.id ? null : ch.id)}
                        className="rounded-md p-2 text-blue-600 hover:bg-blue-50"
                        title="Bulk upload videos/PDFs into this chapter"
                        aria-label="Bulk upload content"
                      >
                        <UploadCloud className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          setAssessmentChapterId(assessmentChapterId === ch.id ? null : ch.id)
                        }
                        className="rounded-md p-2 text-purple-600 hover:bg-purple-50"
                        title="Add an assessment (test) as a lesson in this chapter"
                        aria-label="Add assessment"
                      >
                        <ClipboardList className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() =>
                          setArticleChapterId(articleChapterId === ch.id ? null : ch.id)
                        }
                        className="rounded-md p-2 text-green-700 hover:bg-green-50"
                        title="Add an article (rich-text lesson: welcome page, overview, FAQ, summary)"
                        aria-label="Add article lesson"
                      >
                        <BookOpen className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingId(editingId === ch.id ? null : ch.id)}
                        className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
                        title="Edit chapter settings"
                        aria-label="Edit chapter settings"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => patchChapter(ch.id, { isActive: !ch.isActive }).then(load)}
                        className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
                        title={ch.isActive ? 'Hide from students' : 'Show to students'}
                        aria-label={ch.isActive ? 'Hide chapter' : 'Show chapter'}
                      >
                        {ch.isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => deleteChapter(ch)}
                        className="rounded-md p-2 text-red-500 hover:bg-red-50"
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

                    {/* Bulk content uploader */}
                    {uploadChapterId === ch.id && (
                      <BulkUploader
                        courseId={courseId}
                        chapterId={ch.id}
                        chapterTitle={ch.title}
                        onDone={() => void load()}
                        onClose={() => setUploadChapterId(null)}
                      />
                    )}

                    {/* Article composer */}
                    {articleChapterId === ch.id && (
                      <ArticleComposer
                        chapterId={ch.id}
                        chapterTitle={ch.title}
                        onDone={() => {
                          setArticleChapterId(null)
                          void load()
                        }}
                        onClose={() => setArticleChapterId(null)}
                      />
                    )}

                    {/* Assessment picker */}
                    {assessmentChapterId === ch.id && (
                      <AssessmentPicker
                        courseId={courseId}
                        chapterId={ch.id}
                        chapterTitle={ch.title}
                        onDone={() => {
                          setAssessmentChapterId(null)
                          void load()
                        }}
                        onClose={() => setAssessmentChapterId(null)}
                      />
                    )}

                    {/* Topics — drag to reorder within the chapter */}
                    <div className="p-4">
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={onTopicDragEnd(ch.id)}
                      >
                        <SortableContext
                          items={ch.topics.map((t) => t.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          <div className="space-y-1.5">
                            {ch.topics.map((t, ti) => (
                              <SortableItem key={t.id} id={t.id}>
                                {({ attributes: tAttrs, listeners: tListeners }) => (
                                  <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm">
                                    <button
                                      {...tAttrs}
                                      {...tListeners}
                                      className="cursor-grab touch-none rounded p-1 text-gray-300 hover:text-gray-600 active:cursor-grabbing"
                                      aria-label="Drag to reorder topic"
                                      title="Drag to reorder"
                                    >
                                      <GripVertical className="h-3.5 w-3.5" />
                                    </button>
                                    <span className="text-gray-400">
                                      {i + 1}.{ti + 1}
                                    </span>
                                    <span className="flex-1 text-gray-800">{t.title}</span>
                                    <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                                      <FileText className="h-3 w-3" /> {t.materialCount}
                                    </span>
                                    <button
                                      onClick={() => renameTopic(t)}
                                      className="rounded p-2 text-gray-400 hover:text-gray-700"
                                      title="Rename topic"
                                      aria-label="Rename topic"
                                    >
                                      <Pencil className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      onClick={() => deleteTopic(t)}
                                      className="rounded p-2 text-red-400 hover:text-red-600"
                                      title="Delete topic"
                                      aria-label="Delete topic"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                )}
                              </SortableItem>
                            ))}
                          </div>
                        </SortableContext>
                      </DndContext>
                      <AddTopicInput onAdd={(title) => addTopic(ch.id, title)} />
                    </div>
                  </div>
                )}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}

interface DraftQuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
  topic?: string
}

/** Attach an existing test template — or AI-generate a fresh chapter quiz. */
function AssessmentPicker({
  courseId,
  chapterId,
  chapterTitle,
  onDone,
  onClose,
}: {
  courseId: string
  chapterId: string
  chapterTitle: string
  onDone: () => void
  onClose: () => void
}) {
  const [mode, setMode] = useState<'existing' | 'ai'>('existing')
  const [aiCount, setAiCount] = useState('10')
  const [aiDifficulty, setAiDifficulty] = useState('MEDIUM')
  const [generating, setGenerating] = useState(false)
  const [applying, setApplying] = useState(false)
  const [draft, setDraft] = useState<DraftQuizQuestion[] | null>(null)

  const generate = async () => {
    setGenerating(true)
    setDraft(null)
    try {
      const res = await fetch(`/api/teacher/builder/${courseId}/ai-quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterId,
          questionCount: parseInt(aiCount, 10) || 10,
          difficulty: aiDifficulty,
        }),
      })
      const json = await res.json()
      if (res.ok && json.success) setDraft(json.quiz.questions)
      else toast.error(json.error || 'Generation failed')
    } catch {
      toast.error('Network error')
    } finally {
      setGenerating(false)
    }
  }

  const applyDraft = async () => {
    if (!draft || draft.length === 0) return
    setApplying(true)
    try {
      const res = await fetch(`/api/teacher/builder/${courseId}/ai-quiz`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterId,
          difficulty: aiDifficulty,
          questions: draft,
        }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        toast.success(`Quiz with ${json.questionCount} questions added as a lesson`)
        onDone()
      } else {
        toast.error(json.error || 'Could not save the quiz')
      }
    } finally {
      setApplying(false)
    }
  }
  const [templates, setTemplates] = useState<
    { id: string; title: string; difficulty: string; timeLimit: number; totalQuestions: number }[]
  >([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState('')
  const [title, setTitle] = useState('')
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    fetch('/api/teacher/builder/assessments')
      .then((r) => r.json())
      .then((j) => {
        if (j.success) setTemplates(j.data.templates || [])
        else toast.error(j.error || 'Could not load tests')
      })
      .catch(() => toast.error('Could not load tests'))
      .finally(() => setLoading(false))
  }, [])

  const add = async () => {
    if (!selected) return
    setAdding(true)
    try {
      const res = await fetch('/api/teacher/builder/assessments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterId,
          testTemplateId: selected,
          title: title.trim() || undefined,
        }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        toast.success('Assessment added as a lesson')
        onDone()
      } else {
        toast.error(json.error || 'Could not add assessment')
      }
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="space-y-3 border-b border-gray-100 bg-purple-50/40 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-800">
          Add an assessment to “{chapterTitle}” — students take it inside the course
        </p>
        <button
          onClick={onClose}
          className="rounded p-1.5 text-gray-400 hover:text-gray-700"
          aria-label="Close assessment picker"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-1 rounded-lg bg-white p-1 text-sm w-fit">
        <button
          onClick={() => setMode('existing')}
          className={`rounded-md px-3 py-1.5 font-medium ${mode === 'existing' ? 'bg-purple-100 text-purple-800' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Attach existing test
        </button>
        <button
          onClick={() => setMode('ai')}
          className={`inline-flex items-center gap-1 rounded-md px-3 py-1.5 font-medium ${mode === 'ai' ? 'bg-purple-100 text-purple-800' : 'text-gray-500 hover:text-gray-800'}`}
        >
          <Sparkles className="h-3.5 w-3.5" /> Generate with AI
        </button>
      </div>

      {mode === 'ai' ? (
        <div className="space-y-3">
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600" htmlFor="aq-count">
                Questions
              </label>
              <input
                id="aq-count"
                type="number"
                min={3}
                max={30}
                value={aiCount}
                onChange={(e) => setAiCount(e.target.value)}
                className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-600" htmlFor="aq-diff">
                Difficulty
              </label>
              <select
                id="aq-diff"
                value={aiDifficulty}
                onChange={(e) => setAiDifficulty(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
            <button
              onClick={generate}
              disabled={generating}
              className="inline-flex items-center gap-1.5 rounded-lg bg-purple-700 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-800 disabled:opacity-50"
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Writing questions…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generate from chapter
                </>
              )}
            </button>
          </div>

          {draft && (
            <div>
              <p className="mb-2 text-sm font-semibold text-gray-700">
                Draft — {draft.length} questions (review, drop any, then apply)
              </p>
              <div className="max-h-80 space-y-2 overflow-y-auto">
                {draft.map((q, i) => (
                  <div key={i} className="rounded-lg border border-gray-200 bg-white p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 text-sm">
                        <p className="font-medium text-gray-900">
                          {i + 1}. {q.question}
                        </p>
                        <ul className="mt-1 space-y-0.5 text-xs text-gray-600">
                          {q.options.map((o, oi) => (
                            <li
                              key={oi}
                              className={
                                oi === q.correctIndex ? 'font-semibold text-green-700' : ''
                              }
                            >
                              {String.fromCharCode(65 + oi)}. {o}
                              {oi === q.correctIndex ? ' ✓' : ''}
                            </li>
                          ))}
                        </ul>
                        {q.explanation && (
                          <p className="mt-1 text-xs italic text-gray-500">{q.explanation}</p>
                        )}
                      </div>
                      <button
                        onClick={() => setDraft((d) => (d ? d.filter((_, di) => di !== i) : d))}
                        className="shrink-0 rounded p-1.5 text-red-400 hover:text-red-600"
                        title="Drop this question"
                        aria-label="Drop question"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button
                  onClick={() => setDraft(null)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-white"
                >
                  Discard
                </button>
                <button
                  onClick={applyDraft}
                  disabled={applying || draft.length === 0}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-green-700 px-5 py-2 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-50"
                >
                  <Check className="h-4 w-4" />
                  {applying ? 'Saving…' : `Add quiz (${draft.length} questions)`}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : loading ? (
        <div className="flex items-center gap-2 py-3 text-sm text-gray-500">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading test templates…
        </div>
      ) : templates.length === 0 ? (
        <p className="py-2 text-sm text-gray-500">
          No test templates yet — create one under Admin → Tests, then attach it here.
        </p>
      ) : (
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-0 flex-1">
            <label className="mb-1 block text-xs font-medium text-gray-600" htmlFor="ap-template">
              Test template
            </label>
            <select
              id="ap-template"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">Choose a test…</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title} · {t.totalQuestions}q · {t.timeLimit}min · {t.difficulty}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600" htmlFor="ap-title">
              Lesson title (optional)
            </label>
            <input
              id="ap-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="defaults to test title"
              className="w-56 rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <button
            onClick={add}
            disabled={!selected || adding}
            className="inline-flex items-center gap-1.5 rounded-lg bg-purple-700 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-800 disabled:opacity-50"
          >
            {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add lesson
          </button>
        </div>
      )}
    </div>
  )
}

/** Sortable wrapper: provides the drag handle props via render prop. */
function SortableItem({
  id,
  children,
}: {
  id: string
  children: (handle: {
    attributes: ReturnType<typeof useSortable>['attributes']
    listeners: ReturnType<typeof useSortable>['listeners']
  }) => ReactNode
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  })
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={isDragging ? 'relative z-10 opacity-70' : undefined}
    >
      {children({ attributes, listeners })}
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
  const [dripDays, setDripDays] = useState(
    chapter.dripDaysAfterEnroll != null ? String(chapter.dripDaysAfterEnroll) : ''
  )
  const [requiresPrevious, setRequiresPrevious] = useState(chapter.requiresPrevious)
  const [isFreePreview, setIsFreePreview] = useState(!!chapter.isFreePreview)

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
        <div>
          <label
            className="mb-1 block text-xs font-medium text-gray-600"
            htmlFor={`dd-${chapter.id}`}
          >
            Or days after enrollment
          </label>
          <input
            id={`dd-${chapter.id}`}
            type="number"
            min={0}
            max={3650}
            value={dripDays}
            onChange={(e) => setDripDays(e.target.value)}
            placeholder="e.g. 7"
            className="w-28 rounded-lg border border-gray-300 px-3 py-2 text-sm"
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
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={isFreePreview}
            onChange={(e) => setIsFreePreview(e.target.checked)}
          />
          Free preview (accessible without enrollment — try-before-buy)
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
              dripDaysAfterEnroll: dripDays === '' ? null : parseInt(dripDays, 10),
              requiresPrevious,
              isFreePreview,
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

interface DraftChapter {
  title: string
  description?: string
  topics: string[]
}

/** AI outline: describe the course → Claude drafts chapters/topics → review → apply. */
function AIOutlinePanel({
  courseId,
  existingCount,
  onApplied,
}: {
  courseId: string
  existingCount: number
  onApplied: () => void
}) {
  const [prompt, setPrompt] = useState('')
  const [count, setCount] = useState('10')
  const [generating, setGenerating] = useState(false)
  const [applying, setApplying] = useState(false)
  const [draft, setDraft] = useState<DraftChapter[] | null>(null)

  const generate = async () => {
    setGenerating(true)
    setDraft(null)
    try {
      const res = await fetch(`/api/teacher/builder/${courseId}/ai-outline`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim(), chapterCount: parseInt(count, 10) || 10 }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setDraft(data.outline.chapters)
      } else {
        toast.error(data.error || 'Generation failed')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setGenerating(false)
    }
  }

  const apply = async () => {
    if (!draft) return
    setApplying(true)
    try {
      const res = await fetch(`/api/teacher/builder/${courseId}/ai-outline`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ outline: { chapters: draft } }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        toast.success(`Added ${data.chapterCount} chapters, ${data.topicCount} topics`)
        onApplied()
      } else {
        toast.error(data.error || 'Could not apply outline')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setApplying(false)
    }
  }

  const removeChapter = (i: number) => setDraft((d) => (d ? d.filter((_, idx) => idx !== i) : d))

  return (
    <div className="mt-4 rounded-2xl border border-purple-200 bg-purple-50/50 p-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-0 flex-1">
          <label className="mb-1 block text-xs font-medium text-gray-600" htmlFor="ai-prompt">
            Describe the course (topics to cover, level, focus)
          </label>
          <input
            id="ai-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !generating && generate()}
            placeholder="e.g. Class 12 Genetics & Evolution for NEET, PYQ-focused"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600" htmlFor="ai-count">
            Chapters
          </label>
          <input
            id="ai-count"
            type="number"
            min={3}
            max={30}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          onClick={generate}
          disabled={generating}
          className="inline-flex items-center gap-1.5 rounded-lg bg-purple-700 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-800 disabled:opacity-50"
        >
          {generating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Drafting…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Generate
            </>
          )}
        </button>
      </div>

      {draft && (
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-700">
              Draft outline — {draft.length} chapters (review, then apply)
            </p>
            {existingCount > 0 && (
              <span className="text-xs text-gray-500">
                Appended after your {existingCount} existing
              </span>
            )}
          </div>
          <div className="max-h-80 space-y-2 overflow-y-auto">
            {draft.map((ch, i) => (
              <div key={i} className="rounded-lg border border-gray-200 bg-white p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {i + 1}. {ch.title}
                    </p>
                    {ch.description && (
                      <p className="mt-0.5 text-xs text-gray-500">{ch.description}</p>
                    )}
                    {ch.topics.length > 0 && (
                      <p className="mt-1 text-xs text-gray-600">{ch.topics.join(' · ')}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeChapter(i)}
                    className="shrink-0 rounded p-2 text-red-400 hover:text-red-600"
                    title="Drop this chapter from the draft"
                    aria-label="Drop chapter"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => setDraft(null)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-white"
            >
              Discard
            </button>
            <button
              onClick={apply}
              disabled={applying || draft.length === 0}
              className="inline-flex items-center gap-1.5 rounded-lg bg-green-700 px-5 py-2 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-50"
            >
              <Check className="h-4 w-4" />{' '}
              {applying ? 'Applying…' : `Apply ${draft.length} chapters`}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Article composer — the "Ebook" lesson category as a simple markdown lesson
 * (welcome page, course overview, FAQ, summary). Markdown in, rendered with
 * reading typography on the student side.
 */
function ArticleComposer({
  chapterId,
  chapterTitle,
  onDone,
  onClose,
}: {
  chapterId: string
  chapterTitle: string
  onDone: () => void
  onClose: () => void
}) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [saving, setSaving] = useState(false)

  const save = async () => {
    if (saving || title.trim().length < 2 || !body.trim()) return
    setSaving(true)
    try {
      const res = await fetch('/api/teacher/builder/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chapterId, title: title.trim(), contentBody: body }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        toast.success('Article lesson added')
        onDone()
      } else {
        toast.error(json.error || 'Could not add the article')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mt-3 rounded-xl border border-green-200 bg-green-50/40 p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-800">
          New article lesson in “{chapterTitle}”
        </p>
        <button onClick={onClose} className="rounded p-1 text-gray-400 hover:bg-gray-100">
          <X className="h-4 w-4" />
        </button>
      </div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Lesson title (e.g. Welcome to the course, Chapter summary, FAQ)"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={8}
        placeholder={
          'Write in Markdown — it renders beautifully for students.\n\n# Heading\n**bold**, *italic*, lists:\n- point one\n- point two'
        }
        className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm"
      />
      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-gray-400">Markdown supported: headings, bold, lists, links.</p>
        <button
          onClick={save}
          disabled={saving || title.trim().length < 2 || !body.trim()}
          className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-50"
        >
          {saving ? 'Adding…' : 'Add article'}
        </button>
      </div>
    </div>
  )
}
