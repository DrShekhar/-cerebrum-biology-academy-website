'use client'

/**
 * Click-to-call panel on the counselor lead detail (PLATFORM_VISION §4.2).
 * One button: Exotel rings the counselor's phone, then bridges the lead.
 * Recent calls list with in-CRM recording playback (streamed via the
 * authenticated proxy — the recording disclosure/consent lives on the
 * Exotel applet side).
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { Phone, PhoneCall, Loader2, PlayCircle, PauseCircle } from 'lucide-react'

interface CallRow {
  id: string
  status: string
  durationSec: number | null
  hasRecording: boolean
  startedAt: string
  counselorName: string | null
}

const STATUS_CLS: Record<string, string> = {
  completed: 'bg-green-100 text-green-700',
  initiated: 'bg-blue-100 text-blue-700',
  failed: 'bg-red-100 text-red-600',
  busy: 'bg-amber-100 text-amber-700',
  'no-answer': 'bg-gray-200 text-gray-600',
}

function fmtDuration(sec: number | null): string {
  if (!sec || sec <= 0) return ''
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return m ? `${m}m ${s}s` : `${s}s`
}

export function CallPanel({ leadId }: { leadId: string }) {
  const [calls, setCalls] = useState<CallRow[]>([])
  const [configured, setConfigured] = useState(true)
  const [loading, setLoading] = useState(true)
  const [calling, setCalling] = useState(false)
  const [notice, setNotice] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/counselor/leads/${leadId}/calls`)
      const json = await res.json()
      if (res.ok && json.success) {
        setCalls(json.data.calls)
        setConfigured(json.data.configured)
      }
    } finally {
      setLoading(false)
    }
  }, [leadId])

  useEffect(() => {
    load()
  }, [load])

  const placeCall = async () => {
    if (calling) return
    setCalling(true)
    setNotice(null)
    try {
      const res = await fetch(`/api/counselor/leads/${leadId}/calls`, { method: 'POST' })
      const json = await res.json()
      if (res.ok && json.success) {
        setNotice({ tone: 'ok', text: json.data.message })
        // The terminal webhook lands after the call — refresh a bit later too.
        setTimeout(load, 5000)
      } else {
        setNotice({ tone: 'err', text: json.error || 'Call failed.' })
      }
    } catch {
      setNotice({ tone: 'err', text: 'Network error — call not placed.' })
    } finally {
      setCalling(false)
    }
  }

  const togglePlay = (callId: string) => {
    if (playingId === callId) {
      audioRef.current?.pause()
      audioRef.current = null
      setPlayingId(null)
      return
    }
    audioRef.current?.pause()
    const audio = new Audio(`/api/counselor/calls/${callId}/recording`)
    audio.onended = () => setPlayingId(null)
    audio.onerror = () => {
      setPlayingId(null)
      setNotice({ tone: 'err', text: 'Recording unavailable (it may have expired).' })
    }
    void audio.play()
    audioRef.current = audio
    setPlayingId(callId)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Calls</h3>

      <button
        onClick={placeCall}
        disabled={calling || !configured}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
        title={configured ? 'Rings your phone first, then connects the lead' : undefined}
      >
        {calling ? <Loader2 className="h-4 w-4 animate-spin" /> : <PhoneCall className="h-4 w-4" />}
        Call this lead
      </button>
      {!configured && (
        <p className="mt-2 text-xs text-gray-400">
          Calling isn&apos;t configured yet — Exotel keys pending.
        </p>
      )}
      {notice && (
        <p
          className={`mt-2 text-xs font-medium ${notice.tone === 'ok' ? 'text-green-700' : 'text-red-600'}`}
        >
          {notice.text}
        </p>
      )}

      <div className="mt-4 space-y-2">
        {loading ? (
          <p className="text-xs text-gray-400">Loading call history…</p>
        ) : calls.length === 0 ? (
          <p className="text-xs text-gray-400">No calls yet.</p>
        ) : (
          calls.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between gap-2 rounded-lg border border-gray-100 px-3 py-2"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_CLS[c.status] || 'bg-gray-100 text-gray-600'}`}
                  >
                    {c.status.replace(/-/g, ' ')}
                  </span>
                  {c.durationSec ? (
                    <span className="text-xs text-gray-500">{fmtDuration(c.durationSec)}</span>
                  ) : null}
                </div>
                <p className="mt-0.5 text-[11px] text-gray-400">
                  {new Date(c.startedAt).toLocaleString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  {c.counselorName ? ` · ${c.counselorName}` : ''}
                </p>
              </div>
              {c.hasRecording && (
                <button
                  onClick={() => togglePlay(c.id)}
                  className="shrink-0 text-green-700 hover:text-green-800"
                  title={playingId === c.id ? 'Pause' : 'Play recording'}
                >
                  {playingId === c.id ? (
                    <PauseCircle className="h-6 w-6" />
                  ) : (
                    <PlayCircle className="h-6 w-6" />
                  )}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
