'use client'

import { useState, useRef } from 'react'
import { Sparkles, ImagePlus, Loader2, X, GraduationCap, CheckCircle2 } from 'lucide-react'

/**
 * AI Doubt Solver — type a Biology question or snap a photo and get an instant
 * step-by-step solution, with a one-tap "ask a teacher" fallback.
 */
export default function DoubtSolverPage() {
  const [question, setQuestion] = useState('')
  const [imageData, setImageData] = useState<string | null>(null) // data URL for preview
  const [imageB64, setImageB64] = useState<string | null>(null)
  const [imageType, setImageType] = useState<string>('image/jpeg')
  const [solution, setSolution] = useState<string | null>(null)
  const [ticketId, setTicketId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [escalated, setEscalated] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  // Vercel rejects request bodies over ~4.5MB and base64 inflates by ~33%, so
  // phone-camera photos are downscaled client-side to keep the payload safe.
  const MAX_DIM = 1600
  const MAX_B64_CHARS = 4_000_000 // ≈3MB binary

  const onFile = (file: File) => {
    setError(null)
    const objectUrl = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.max(1, Math.round(img.width * scale))
      canvas.height = Math.max(1, Math.round(img.height * scale))
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        setError('Could not process the image — try a different photo.')
        return
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      let dataUrl = canvas.toDataURL('image/jpeg', 0.85)
      if (dataUrl.length > MAX_B64_CHARS) dataUrl = canvas.toDataURL('image/jpeg', 0.6)
      if (dataUrl.length > MAX_B64_CHARS) {
        setError('Image too large even after compression — try a closer crop of the question.')
        return
      }
      setImageData(dataUrl)
      setImageB64(dataUrl.split(',')[1] || null)
      setImageType('image/jpeg')
    }
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      setError('Could not read that image — try a different photo.')
    }
    img.src = objectUrl
  }

  const solve = async () => {
    if (!question.trim() && !imageB64) {
      setError('Type a question or attach a photo.')
      return
    }
    setLoading(true)
    setError(null)
    setSolution(null)
    setTicketId(null)
    setEscalated(false)
    try {
      const res = await fetch('/api/doubts/ai-solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.trim(),
          imageBase64: imageB64,
          imageMediaType: imageType,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setError(data.error || 'Could not solve this right now.')
        return
      }
      setSolution(data.solution)
      setTicketId(data.ticketId || null)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const escalate = async () => {
    if (!ticketId) return
    try {
      const res = await fetch(`/api/doubts/${ticketId}/escalate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: 'Please review — the AI answer wasn’t enough.' }),
      })
      if (res.ok) setEscalated(true)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-green-600" />
        <h1 className="text-2xl font-bold text-gray-900">AI Doubt Solver</h1>
      </div>
      <p className="mt-1 text-sm text-gray-600">
        Stuck on a Biology question? Type it or snap a photo — get a step-by-step solution
        instantly.
      </p>

      {/* Input */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
          placeholder="e.g. Why is the mitochondrion called the powerhouse of the cell? Or paste an MCQ…"
          className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
        />

        {imageData && (
          <div className="mt-3 flex items-start gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageData} alt="Question" className="max-h-40 rounded-lg border" />
            <button
              onClick={() => {
                setImageData(null)
                setImageB64(null)
                if (fileRef.current) fileRef.current.value = ''
              }}
              className="rounded-md p-1 text-gray-400 hover:text-gray-700"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <ImagePlus className="h-4 w-4" /> {imageData ? 'Change photo' : 'Add photo'}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          />
          <button
            onClick={solve}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-lg bg-green-700 px-5 py-2 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Solving…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Solve with AI
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Solution */}
      {solution && (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-green-700">
            <Sparkles className="h-4 w-4" /> Solution
          </div>
          <div className="prose-sm whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
            {renderLite(solution)}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-4">
            {escalated ? (
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700">
                  <CheckCircle2 className="h-4 w-4" /> Sent to a teacher — they’ll follow up.
                </span>
                <a
                  href={`https://wa.me/918826444334?text=${encodeURIComponent(
                    'Hi Cerebrum! I asked a Biology doubt in the app and need help from a teacher.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Chat on WhatsApp instead
                </a>
              </div>
            ) : (
              <>
                <span className="text-sm text-gray-600">Still not clear?</span>
                <button
                  onClick={escalate}
                  disabled={!ticketId}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-green-700 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50 disabled:opacity-50"
                >
                  <GraduationCap className="h-4 w-4" /> Ask a teacher
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/** Minimal renderer: **bold** → <strong>, keep line breaks (via whitespace-pre-wrap). */
function renderLite(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-gray-900">
          {p.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{p}</span>
  })
}
