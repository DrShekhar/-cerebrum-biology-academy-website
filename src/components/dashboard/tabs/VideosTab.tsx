'use client'

// Videos tab (roadmap P2 UI): class-recording / lecture library from
// GET /api/student/videos (enrollment-gated server-side). Cards with
// thumbnail, duration, course chip, watch progress and resume position.

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { PlayCircle, Video, Clock, CheckCircle, Lock, LogIn } from 'lucide-react'

interface StudentVideo {
  id: string
  title: string
  duration: number | null
  thumbnail: string | null
  courseName: string | null
  watchUrl: string
  progressPercent: number
  isCompleted: boolean
  lastPosition: number | null
  tierLocked: boolean
}

function fmtDuration(totalSeconds: number | null): string | null {
  if (!totalSeconds || totalSeconds <= 0) return null
  const mins = Math.floor(totalSeconds / 60)
  const secs = Math.round(totalSeconds % 60)
  if (mins >= 60) return `${Math.floor(mins / 60)}h ${mins % 60}m`
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function VideosTab() {
  const [videos, setVideos] = useState<StudentVideo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [unauthorized, setUnauthorized] = useState(false)

  useEffect(() => {
    fetch('/api/student/videos', { credentials: 'include' })
      .then((r) => {
        if (r.status === 401 || r.status === 403) {
          setUnauthorized(true)
          return null
        }
        return r.ok ? r.json() : null
      })
      .then((d) => {
        if (d?.videos) setVideos(d.videos)
        else if (d?.success && d.data?.videos) setVideos(d.data.videos)
      })
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-52 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (unauthorized) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center">
        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <LogIn className="w-7 h-7 text-blue-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Sign in as a student</h3>
        <p className="text-sm text-gray-600">Video lectures are available for student accounts.</p>
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 sm:p-12 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Video className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No videos yet</h3>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          Recordings will appear here after your classes.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {videos.map((v) => {
        const duration = fmtDuration(v.duration)
        const resume = !v.isCompleted && v.lastPosition ? fmtDuration(v.lastPosition) : null
        const card = (
          <div
            className={`bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden h-full flex flex-col transition-all duration-200 ${
              v.tierLocked ? 'opacity-80' : 'group-hover:shadow-xl group-hover:-translate-y-0.5'
            }`}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-slate-800">
              {v.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Video className="w-10 h-10 text-slate-500" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
                  {v.tierLocked ? (
                    <Lock className="w-5 h-5 text-white" />
                  ) : (
                    <PlayCircle className="w-7 h-7 text-white" />
                  )}
                </div>
              </div>
              {duration && (
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-[11px] font-medium rounded inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {duration}
                </span>
              )}
              {v.isCompleted && (
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-green-500 text-white text-[11px] font-semibold rounded-full inline-flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Watched
                </span>
              )}
              {/* Progress bar */}
              {v.progressPercent > 0 && !v.isCompleted && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
                  <div
                    className="h-1 bg-green-500"
                    style={{ width: `${Math.min(100, Math.max(0, v.progressPercent))}%` }}
                  />
                </div>
              )}
            </div>

            {/* Body */}
            <div className="p-3 sm:p-4 flex flex-col flex-1">
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 mb-1.5">
                {v.title}
              </h4>
              <div className="flex flex-wrap items-center gap-1.5 mt-auto">
                {v.courseName && (
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium truncate max-w-[180px]">
                    {v.courseName}
                  </span>
                )}
                {resume && <span className="text-xs text-gray-500">Resume at {resume}</span>}
              </div>
            </div>
          </div>
        )

        return v.tierLocked ? (
          <Link key={v.id} href="/pricing" className="group" title="Upgrade to watch">
            {card}
          </Link>
        ) : (
          <Link key={v.id} href={v.watchUrl} className="group">
            {card}
          </Link>
        )
      })}
    </div>
  )
}
