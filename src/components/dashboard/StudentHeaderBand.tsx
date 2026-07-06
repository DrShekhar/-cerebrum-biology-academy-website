'use client'

// Student dashboard header band (roadmap P1): avatar + name + grade chip +
// course chips + streak/XP + tier badge + live action buttons. One call to
// /api/student/summary (P0b). Self-contained — drop into any dashboard page.

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Flame, Zap, Camera, Video, PlayCircle, BookOpenCheck, Loader2 } from 'lucide-react'

interface Summary {
  student: {
    name: string
    avatarUrl: string | null
    gradeLabel: string | null
    courseNames: string[]
    ncertClass: 11 | 12 | null
    coachingTier: string
    trialDaysRemaining: number
  }
  gamification: { totalXp: number; currentStreak: number }
  actions: {
    dueHomework: number
    nextClass: { id: string; title: string; at: string; joinUrl: string | null } | null
    resumeTestId: string | null
  }
}

export function StudentHeaderBand() {
  const [data, setData] = useState<Summary | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/student/summary', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.success && setData(d))
      .catch(() => {})
  }, [])

  async function uploadAvatar(file: File) {
    try {
      setUploading(true)
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/user/avatar', {
        method: 'POST',
        credentials: 'include',
        body: form,
      })
      const d = await res.json()
      if (d?.avatarUrl && data) {
        setData({ ...data, student: { ...data.student, avatarUrl: d.avatarUrl } })
      }
    } finally {
      setUploading(false)
    }
  }

  if (!data) return null
  const { student, gamification, actions } = data
  const initials = student.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const nextClassSoon =
    actions.nextClass && new Date(actions.nextClass.at).getTime() - Date.now() < 12 * 60 * 60 * 1000

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          {/* Avatar */}
          <button
            onClick={() => fileRef.current?.click()}
            className="relative group flex-shrink-0"
            title="Change photo"
          >
            {student.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={student.avatarUrl}
                alt={student.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/20"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-teal-600 flex items-center justify-center text-xl font-bold">
                {initials}
              </div>
            )}
            <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-white text-slate-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {uploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Camera className="w-3.5 h-3.5" />
              )}
            </span>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && uploadAvatar(e.target.files[0])}
            />
          </button>

          {/* Identity */}
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold truncate">{student.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              {student.gradeLabel && (
                <span className="px-2.5 py-0.5 bg-white/15 rounded-full text-xs font-semibold">
                  {student.gradeLabel}
                </span>
              )}
              {student.courseNames.slice(0, 2).map((c) => (
                <span
                  key={c}
                  className="px-2.5 py-0.5 bg-white/10 rounded-full text-xs text-slate-200 truncate max-w-[220px]"
                >
                  {c}
                </span>
              ))}
              <span className="px-2.5 py-0.5 bg-amber-400/20 text-amber-300 rounded-full text-xs font-semibold">
                {student.coachingTier}
                {student.trialDaysRemaining > 0 && ` · ${student.trialDaysRemaining}d trial`}
              </span>
            </div>
          </div>

          {/* Streak + XP */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="text-center">
              <div className="flex items-center gap-1 text-orange-400 font-bold text-lg">
                <Flame className="w-5 h-5" /> {gamification.currentStreak}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wide">streak</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 text-yellow-300 font-bold text-lg">
                <Zap className="w-5 h-5" /> {gamification.totalXp.toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wide">xp</div>
            </div>
          </div>
        </div>

        {/* Action row */}
        <div className="flex flex-wrap gap-2.5 mt-5">
          {nextClassSoon && actions.nextClass?.joinUrl && (
            <a
              href={actions.nextClass.joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-semibold"
            >
              <Video className="w-4 h-4" />
              Join: {actions.nextClass.title}
            </a>
          )}
          {actions.resumeTestId && (
            <Link
              href="/cbt"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium"
            >
              <PlayCircle className="w-4 h-4" /> Resume mock test
            </Link>
          )}
          {actions.dueHomework > 0 && (
            <Link
              href="/student/assignments"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium"
            >
              <BookOpenCheck className="w-4 h-4" /> {actions.dueHomework} homework due
            </Link>
          )}
          {student.ncertClass && (
            <Link
              href={`/neet-biology-mcq?ncertClass=${student.ncertClass}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium"
            >
              Practice Class {student.ncertClass} MCQs
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
