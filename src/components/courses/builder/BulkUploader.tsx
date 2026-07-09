'use client'

/**
 * Bulk content uploader — drop N files on a chapter and get N lessons
 * (Thinkific-style content uploader). One study_material per file, titled
 * from the filename, uploaded sequentially:
 *  - videos → Cloudflare Stream via the existing create_upload + tus flow
 *  - PDFs   → the existing admin blob-storage upload (CSRF-protected)
 */

import { useRef, useState } from 'react'
import * as tus from 'tus-js-client'
import { toast } from 'sonner'
import { UploadCloud, FileText, Film, CheckCircle2, XCircle, Loader2, X } from 'lucide-react'

type ItemStatus = 'queued' | 'uploading' | 'done' | 'error'

interface QueueItem {
  file: File
  kind: 'video' | 'pdf' | 'audio'
  status: ItemStatus
  progress: number
  error?: string
}

const titleFromFilename = (name: string) =>
  name
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .trim()

export function BulkUploader({
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
  const [queue, setQueue] = useState<QueueItem[]>([])
  const [running, setRunning] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = (files: FileList | null) => {
    if (!files) return
    const items: QueueItem[] = []
    for (const file of Array.from(files)) {
      if (file.type.startsWith('video/')) {
        items.push({ file, kind: 'video', status: 'queued', progress: 0 })
      } else if (file.type === 'application/pdf') {
        items.push({ file, kind: 'pdf', status: 'queued', progress: 0 })
      } else if (file.type.startsWith('audio/')) {
        items.push({ file, kind: 'audio', status: 'queued', progress: 0 })
      } else {
        toast.error(`${file.name}: only video, PDF and audio files are supported`)
      }
    }
    setQueue((q) => [...q, ...items])
  }

  const update = (index: number, patch: Partial<QueueItem>) =>
    setQueue((q) => q.map((item, i) => (i === index ? { ...item, ...patch } : item)))

  const uploadVideo = async (item: QueueItem, index: number) => {
    const res = await fetch('/api/lms/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create_upload',
        title: titleFromFilename(item.file.name),
        courseId,
        chapterId,
      }),
    })
    const json = await res.json()
    if (!json.success || !json.uploadUrl) {
      throw new Error(json.error || 'Could not create upload URL')
    }
    await new Promise<void>((resolve, reject) => {
      const upload = new tus.Upload(item.file, {
        uploadUrl: json.uploadUrl,
        chunkSize: 50 * 1024 * 1024,
        metadata: { filename: item.file.name, filetype: item.file.type },
        onError: (err) => reject(err),
        onProgress: (sent, total) => update(index, { progress: Math.round((sent / total) * 100) }),
        onSuccess: () => resolve(),
      })
      upload.start()
    })
  }

  const uploadDoc = async (item: QueueItem, index: number, materialType: string) => {
    const csrfResponse = await fetch('/api/auth/csrf-token')
    const csrfData = await csrfResponse.json().catch(() => null)
    if (!csrfResponse.ok || !csrfData?.csrfToken) {
      throw new Error('Could not get a security token')
    }
    update(index, { progress: 30 })
    const formData = new FormData()
    formData.append('file', item.file)
    formData.append(
      'metadata',
      JSON.stringify({
        title: titleFromFilename(item.file.name),
        materialType,
        courseId,
        chapterId,
        accessLevel: 'ENROLLED',
        isPublished: true,
      })
    )
    const response = await fetch('/api/admin/lms/upload', {
      method: 'POST',
      headers: { 'x-csrf-token': csrfData.csrfToken },
      body: formData,
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || 'Upload failed')
    update(index, { progress: 100 })
  }

  const start = async () => {
    setRunning(true)
    let ok = 0
    let failed = 0
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].status === 'done') continue
      update(i, { status: 'uploading', progress: 0, error: undefined })
      try {
        if (queue[i].kind === 'video') await uploadVideo(queue[i], i)
        else if (queue[i].kind === 'audio') await uploadDoc(queue[i], i, 'AUDIO')
        else await uploadDoc(queue[i], i, 'PDF_NOTES')
        update(i, { status: 'done', progress: 100 })
        ok++
      } catch (err) {
        update(i, { status: 'error', error: err instanceof Error ? err.message : 'Failed' })
        failed++
      }
    }
    setRunning(false)
    if (ok > 0) {
      toast.success(
        `${ok} file${ok === 1 ? '' : 's'} added to “${chapterTitle}”` +
          (failed ? ` — ${failed} failed` : '')
      )
      onDone()
    } else if (failed > 0) {
      toast.error('All uploads failed — check the errors below')
    }
  }

  return (
    <div className="space-y-3 border-b border-gray-100 bg-blue-50/40 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-800">
          Bulk upload into “{chapterTitle}” — one lesson per file
        </p>
        <button
          onClick={onClose}
          className="rounded p-1.5 text-gray-400 hover:text-gray-700"
          aria-label="Close bulk uploader"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          addFiles(e.dataTransfer.files)
        }}
        className="flex w-full flex-col items-center gap-1 rounded-xl border-2 border-dashed border-blue-300 bg-white px-4 py-6 text-sm text-gray-600 hover:border-blue-400 hover:bg-blue-50"
      >
        <UploadCloud className="h-6 w-6 text-blue-500" />
        Drop videos / PDFs here or click to choose (multiple allowed)
        <span className="text-xs text-gray-400">
          Videos go to secure streaming; PDFs to protected storage. Titles come from filenames.
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="video/*,application/pdf,audio/*"
        className="hidden"
        onChange={(e) => {
          addFiles(e.target.files)
          e.target.value = ''
        }}
      />

      {queue.length > 0 && (
        <div className="space-y-1.5">
          {queue.map((item, i) => (
            <div
              key={`${item.file.name}-${i}`}
              className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm"
            >
              {item.kind === 'video' ? (
                <Film className="h-4 w-4 shrink-0 text-purple-500" />
              ) : (
                <FileText className="h-4 w-4 shrink-0 text-red-500" />
              )}
              <span className="min-w-0 flex-1 truncate text-gray-800">{item.file.name}</span>
              {item.status === 'uploading' && (
                <span className="flex items-center gap-1.5 text-xs text-blue-600">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> {item.progress}%
                </span>
              )}
              {item.status === 'done' && <CheckCircle2 className="h-4 w-4 text-green-600" />}
              {item.status === 'error' && (
                <span className="flex items-center gap-1 text-xs text-red-600" title={item.error}>
                  <XCircle className="h-4 w-4" /> {item.error?.slice(0, 40)}
                </span>
              )}
              {item.status === 'queued' && !running && (
                <button
                  onClick={() => setQueue((q) => q.filter((_, idx) => idx !== i))}
                  className="rounded p-1 text-gray-300 hover:text-gray-600"
                  aria-label={`Remove ${item.file.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-1">
            <button
              onClick={start}
              disabled={running || queue.every((q) => q.status === 'done')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {running ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Uploading…
                </>
              ) : (
                <>
                  <UploadCloud className="h-4 w-4" /> Upload{' '}
                  {queue.filter((q) => q.status !== 'done').length} file
                  {queue.filter((q) => q.status !== 'done').length === 1 ? '' : 's'}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
