'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

interface TestimonialVideoProps {
  youtubeId: string
  title: string
  /** Short caption shown below the video. */
  caption: string
  /** Student details shown next to the video. */
  student: {
    name: string
    score: string
    nowAt: string
  }
}

/**
 * Lightweight YouTube embed.
 *
 * Renders the YouTube thumbnail + play button by default so the page
 * does not pay the 500KB+ iframe cost on initial load. On click, the
 * thumbnail is replaced with the full iframe (autoplay).
 */
export function TestimonialVideo({ youtubeId, title, caption, student }: TestimonialVideoProps) {
  const [playing, setPlaying] = useState(false)

  const thumbnail = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 ring-1 ring-slate-900/10 shadow-lg">
        {playing ? (
          <iframe
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 cursor-pointer"
            aria-label={`Play: ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnail}
              alt={title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform group-hover:scale-110">
                <Play className="ml-1 h-8 w-8 text-slate-900" fill="currentColor" />
              </div>
            </div>
          </button>
        )}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-5 sm:items-start">
        <div className="sm:col-span-3">
          <p className="text-sm leading-relaxed text-slate-700">{caption}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
          <p className="text-base font-semibold text-slate-900">{student.name}</p>
          <p className="mt-1 text-sm text-green-700">{student.score}</p>
          <p className="mt-1 text-xs text-slate-600">Now at {student.nowAt}</p>
        </div>
      </div>
    </div>
  )
}
