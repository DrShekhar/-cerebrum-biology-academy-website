'use client'

import { useState } from 'react'

/**
 * Click-to-play "facade" for a YouTube class recording: shows a poster
 * thumbnail with a play button, and only mounts the (privacy-enhanced)
 * iframe once the visitor clicks — so the page stays fast and the first
 * frame is a controlled poster rather than an arbitrary video frame.
 */
export function ClassVideoCard({
  id,
  title,
  caption,
}: {
  id: string
  title: string
  caption?: string
}) {
  const [playing, setPlaying] = useState(false)

  return (
    <figure className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-200">
      <div className="relative aspect-video w-full bg-black">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play: ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
              onError={(e) => {
                e.currentTarget.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
              }}
              alt={title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform group-hover:scale-110">
              <svg
                className="ml-1 h-7 w-7 text-[#3d4d3d]"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="px-4 py-3 text-sm font-medium text-gray-800">{caption}</figcaption>
      )}
    </figure>
  )
}
