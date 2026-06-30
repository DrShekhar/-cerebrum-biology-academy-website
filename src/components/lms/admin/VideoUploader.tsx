'use client'

/**
 * VideoUploader — admin/teacher UI to add a video lecture.
 *
 * Two paths, both backed by the existing /api/lms/upload:
 *  - Device upload: create_upload → tus-resumable upload of the file to the
 *    one-time Cloudflare URL (handles large lecture files).
 *  - Import from URL: upload_from_url → Cloudflare ingests an existing URL.
 *
 * After upload, Cloudflare processes the video and the (fixed) webhook flips the
 * lecture to READY; the syllabus then shows a "Watch" link.
 */

import { useEffect, useState } from 'react'
import * as tus from 'tus-js-client'
import { showToast } from '@/lib/toast'

interface CourseOption {
  id: string
  name: string
}
interface ChapterOption {
  id: string
  title: string
}

type Mode = 'device' | 'url'

export function VideoUploader() {
  const [mode, setMode] = useState<Mode>('device')
  const [title, setTitle] = useState('')
  const [courseId, setCourseId] = useState('')
  const [chapterId, setChapterId] = useState('')
  const [courses, setCourses] = useState<CourseOption[]>([])
  const [chapters, setChapters] = useState<ChapterOption[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [sourceUrl, setSourceUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState<string | null>(null)

  // Load courses for the dropdown.
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

  // Load chapters when a course is selected.
  useEffect(() => {
    setChapterId('')
    setChapters([])
    if (!courseId) return
    fetch(`/api/admin/lms/chapters?courseId=${encodeURIComponent(courseId)}`)
      .then((r) => r.json())
      .then((j) => {
        if (j?.success && Array.isArray(j.chapters)) {
          setChapters(j.chapters.map((c: any) => ({ id: c.id, title: c.title })))
        }
      })
      .catch(() => {})
  }, [courseId])

  const reset = () => {
    setTitle('')
    setFile(null)
    setSourceUrl('')
    setProgress(0)
    setUploading(false)
  }

  async function handleDeviceUpload() {
    if (!file || !title.trim()) {
      showToast.error('Add a title and choose a video file')
      return
    }
    setUploading(true)
    setProgress(0)
    try {
      // 1) Ask the server for a one-time Cloudflare tus upload URL + records.
      const res = await fetch('/api/lms/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_upload',
          title: title.trim(),
          courseId: courseId || undefined,
          chapterId: chapterId || undefined,
        }),
      })
      const json = await res.json()
      if (!json.success || !json.uploadUrl) {
        throw new Error(json.error || 'Could not create upload URL')
      }

      // 2) Upload the bytes to Cloudflare with tus (resumable).
      await new Promise<void>((resolve, reject) => {
        const upload = new tus.Upload(file, {
          uploadUrl: json.uploadUrl,
          chunkSize: 50 * 1024 * 1024, // 50MB chunks (Cloudflare requires >=5MB)
          metadata: { filename: file.name, filetype: file.type },
          onError: (err) => reject(err),
          onProgress: (sent, total) => setProgress(Math.round((sent / total) * 100)),
          onSuccess: () => resolve(),
        })
        upload.start()
      })

      setDone(json.studyMaterialId || json.videoId || 'uploaded')
      showToast.success('Upload complete — Cloudflare is now processing the video')
      reset()
    } catch (err) {
      console.error(err)
      showToast.error(err instanceof Error ? err.message : 'Upload failed')
      setUploading(false)
    }
  }

  async function handleUrlImport() {
    if (!sourceUrl.trim() || !title.trim()) {
      showToast.error('Add a title and a video URL')
      return
    }
    setUploading(true)
    try {
      const res = await fetch('/api/lms/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'upload_from_url',
          url: sourceUrl.trim(),
          title: title.trim(),
          courseId: courseId || undefined,
          chapterId: chapterId || undefined,
        }),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.error || 'Import failed')
      setDone(json.studyMaterialId || json.videoId || 'imported')
      showToast.success('Import started — Cloudflare is fetching and processing the video')
      reset()
    } catch (err) {
      console.error(err)
      showToast.error(err instanceof Error ? err.message : 'Import failed')
      setUploading(false)
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setMode('device')}
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${mode === 'device' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Upload from device
        </button>
        <button
          onClick={() => setMode('url')}
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${mode === 'url' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Import from URL
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Lecture title *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Cell Cycle & Division — Part 1"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Course</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">— Unassigned —</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Chapter</label>
            <select
              value={chapterId}
              onChange={(e) => setChapterId(e.target.value)}
              disabled={!courseId}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-50"
            >
              <option value="">{courseId ? '— None —' : 'Select a course first'}</option>
              {chapters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
            {courseId && chapters.length === 0 && (
              <p className="mt-1 text-xs text-amber-600">
                No chapters yet — create them in the Curriculum Builder, then a video attaches to a
                chapter to appear in the syllabus.
              </p>
            )}
          </div>
        </div>

        {mode === 'device' ? (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Video file *</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm"
            />
            {uploading && (
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-xs text-gray-600">
                  <span>Uploading…</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
            <button
              onClick={handleDeviceUpload}
              disabled={uploading}
              className="mt-4 rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? 'Uploading…' : 'Upload video'}
            </button>
          </div>
        ) : (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Video URL *</label>
            <input
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://… (publicly fetchable video URL)"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            <button
              onClick={handleUrlImport}
              disabled={uploading}
              className="mt-4 rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? 'Importing…' : 'Import video'}
            </button>
          </div>
        )}

        {done && (
          <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
            Video submitted. It will appear in the syllabus as “Watch” once Cloudflare finishes
            processing (status flips to READY via webhook).
          </div>
        )}
      </div>
    </div>
  )
}
