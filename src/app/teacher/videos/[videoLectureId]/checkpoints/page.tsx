'use client'

/**
 * Interactive-video checkpoint editor (teacher). Add in-video quiz checkpoints
 * to a lecture: pick a timestamp + a question from the bank; students get a
 * pause-and-answer overlay at that moment in /learn/[lectureId].
 */

import { use, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, ArrowLeft, Plus, Trash2, Search, Clock, Sparkles } from 'lucide-react'

interface CheckpointRow {
  id: string
  timeSeconds: number
  isRequired: boolean
  question: { id: string; text: string; topic: string; difficulty: string }
}

interface BankQuestion {
  id: string
  question: string
  topic: string
  difficulty: string
}

function fmtTime(s: number): string {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${String(sec).padStart(2, '0')}`
}

export default function CheckpointEditorPage({
  params,
}: {
  params: Promise<{ videoLectureId: string }>
}) {
  const { videoLectureId } = use(params)
  const router = useRouter()
  const [checkpoints, setCheckpoints] = useState<CheckpointRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Add form
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<BankQuestion[]>([])
  const [searching, setSearching] = useState(false)
  const [picked, setPicked] = useState<BankQuestion | null>(null)
  const [adding, setAdding] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/teacher/videos/${videoLectureId}/checkpoints`)
      const data = await res.json()
      if (!res.ok || !data.success) {
        setError(data.error || 'Could not load checkpoints.')
        return
      }
      setCheckpoints(data.checkpoints || [])
    } catch {
      setError('Network error.')
    } finally {
      setLoading(false)
    }
  }, [videoLectureId])

  useEffect(() => {
    load()
  }, [load])

  const search = async () => {
    if (!query.trim()) return
    setSearching(true)
    try {
      const res = await fetch(
        `/api/teacher/questions?search=${encodeURIComponent(query.trim())}&limit=8`
      )
      const data = await res.json()
      setResults(
        (data.questions || []).map((q: BankQuestion & { question: string }) => ({
          id: q.id,
          question: q.question,
          topic: q.topic,
          difficulty: q.difficulty,
        }))
      )
    } catch {
      toast.error('Search failed')
    } finally {
      setSearching(false)
    }
  }

  const add = async () => {
    const t = (parseInt(minutes || '0', 10) || 0) * 60 + (parseInt(seconds || '0', 10) || 0)
    if (!picked) {
      toast.error('Pick a question first')
      return
    }
    if (t <= 0) {
      toast.error('Set the timestamp (minutes/seconds)')
      return
    }
    setAdding(true)
    try {
      const res = await fetch(`/api/teacher/videos/${videoLectureId}/checkpoints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timeSeconds: t, questionId: picked.id }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        toast.success(`Checkpoint added at ${fmtTime(t)}`)
        setPicked(null)
        setQuery('')
        setResults([])
        setMinutes('')
        setSeconds('')
        await load()
      } else {
        toast.error(data.error || 'Could not add checkpoint')
      }
    } finally {
      setAdding(false)
    }
  }

  const remove = async (cp: CheckpointRow) => {
    if (!confirm(`Remove the checkpoint at ${fmtTime(cp.timeSeconds)}?`)) return
    const res = await fetch(
      `/api/teacher/videos/${videoLectureId}/checkpoints?checkpointId=${encodeURIComponent(cp.id)}`,
      { method: 'DELETE' }
    )
    if (res.ok) {
      toast.success('Checkpoint removed')
      await load()
    } else {
      toast.error('Remove failed')
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <button
        onClick={() => router.back()}
        className="mb-3 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
        <Sparkles className="h-6 w-6 text-green-600" /> Video checkpoints
      </h1>
      <p className="mt-1 text-sm text-gray-600">
        Add in-video quick-check questions. The video pauses at each timestamp until the student
        answers.
      </p>

      {/* Add checkpoint */}
      <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600" htmlFor="cp-min">
              Minutes
            </label>
            <input
              id="cp-min"
              type="number"
              min={0}
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600" htmlFor="cp-sec">
              Seconds
            </label>
            <input
              id="cp-sec"
              type="number"
              min={0}
              max={59}
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="min-w-0 flex-1">
            <label className="mb-1 block text-xs font-medium text-gray-600" htmlFor="cp-q">
              Find a question
            </label>
            <div className="flex gap-2">
              <input
                id="cp-q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && search()}
                placeholder="Search the question bank…"
                className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              <button
                onClick={search}
                disabled={searching || !query.trim()}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {searching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search results */}
        {results.length > 0 && !picked && (
          <div className="mt-3 max-h-56 space-y-1.5 overflow-y-auto">
            {results.map((q) => (
              <button
                key={q.id}
                onClick={() => setPicked(q)}
                className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-left text-sm hover:border-green-400 hover:bg-green-50"
              >
                <span className="line-clamp-2 text-gray-800">{q.question}</span>
                <span className="mt-0.5 block text-xs text-gray-400">
                  {q.topic} · {String(q.difficulty).toLowerCase()}
                </span>
              </button>
            ))}
          </div>
        )}

        {picked && (
          <div className="mt-3 rounded-lg border border-green-300 bg-green-50 p-3 text-sm">
            <div className="flex items-start justify-between gap-2">
              <span className="line-clamp-2 text-gray-800">{picked.question}</span>
              <button
                onClick={() => setPicked(null)}
                className="text-xs font-medium text-gray-500 hover:text-gray-800"
              >
                change
              </button>
            </div>
          </div>
        )}

        <button
          onClick={add}
          disabled={adding || !picked}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" /> {adding ? 'Adding…' : 'Add checkpoint'}
        </button>
      </div>

      {/* Existing checkpoints */}
      <div className="mt-6">
        <h2 className="mb-2 text-sm font-semibold text-gray-700">Checkpoints on this video</h2>
        {loading ? (
          <div className="flex items-center justify-center py-10 text-gray-500">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading…
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center text-red-700">
            {error}
          </div>
        ) : checkpoints.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
            No checkpoints yet — add the first one above.
          </div>
        ) : (
          <div className="space-y-2">
            {checkpoints.map((cp) => (
              <div
                key={cp.id}
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3"
              >
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">
                  <Clock className="h-3 w-3" /> {fmtTime(cp.timeSeconds)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm text-gray-800">{cp.question.text}</p>
                  <p className="text-xs text-gray-400">
                    {cp.question.topic} · {String(cp.question.difficulty).toLowerCase()}
                  </p>
                </div>
                <button
                  onClick={() => remove(cp)}
                  className="rounded p-1.5 text-red-500 hover:bg-red-50"
                  title="Remove checkpoint"
                  aria-label="Remove checkpoint"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
