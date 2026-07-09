'use client'

/**
 * Video hub — YouTube-style collections with academic polish. Playlist rows of
 * thumbnail cards; free for every signed-in account. Clicking a YouTube item
 * opens the in-hub watch view; uploaded lectures open the secure /learn player.
 */

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, PlaySquare, Search, Eye, Play } from 'lucide-react'

interface HubItem {
  id: string
  title: string
  description: string | null
  youtubeId: string | null
  videoLectureId: string | null
  thumbnailUrl: string | null
  durationLabel: string | null
  viewCount: number
}
interface HubPlaylist {
  id: string
  title: string
  description: string | null
  items: HubItem[]
}

export default function StudentVideoHubPage() {
  const router = useRouter()
  const [playlists, setPlaylists] = useState<HubPlaylist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<HubItem | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/videos/hub')
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to load')
      setPlaylists(json.data.playlists)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filtered = useMemo(() => {
    if (!query.trim()) return playlists
    const q = query.toLowerCase()
    return playlists
      .map((p) => ({ ...p, items: p.items.filter((i) => i.title.toLowerCase().includes(q)) }))
      .filter((p) => p.items.length > 0)
  }, [playlists, query])

  const open = (item: HubItem) => {
    void fetch('/api/videos/hub', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId: item.id }),
    }).catch(() => {})
    if (item.videoLectureId) {
      router.push(`/learn/${item.videoLectureId}`)
    } else {
      setActive(item)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const activePlaylist = active
    ? playlists.find((p) => p.items.some((i) => i.id === active.id))
    : null

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <PlaySquare className="h-6 w-6 text-red-600" /> Video Library
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Free Biology lectures &amp; concepts — watch anytime, on any plan.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 sm:w-80">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search videos"
              className="w-full text-sm outline-none"
            />
          </div>
        </div>

        {/* In-hub watch view for YouTube items */}
        {active && (
          <div className="mb-8 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-2xl bg-black shadow-lg">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1&rel=0`}
                    title={active.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              </div>
              <h2 className="mt-3 text-lg font-bold text-gray-900">{active.title}</h2>
              {active.description && (
                <p className="mt-1 text-sm text-gray-600">{active.description}</p>
              )}
            </div>
            {/* Up next */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Up next</p>
              {(activePlaylist?.items || [])
                .filter((i) => i.id !== active.id)
                .slice(0, 6)
                .map((i) => (
                  <button
                    key={i.id}
                    onClick={() => open(i)}
                    className="flex w-full items-center gap-3 rounded-xl bg-white p-2 text-left shadow-sm hover:shadow"
                  >
                    <Thumb item={i} small />
                    <span className="line-clamp-2 text-sm font-medium text-gray-800">
                      {i.title}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-20 text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading videos…
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-red-700">{error}</p>
            <button
              onClick={load}
              className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Try again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-gray-500">
            <PlaySquare className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            {query ? 'No videos match your search.' : 'Videos are being added — check back soon!'}
          </div>
        ) : (
          <div className="space-y-10">
            {filtered.map((playlist) => (
              <section key={playlist.id}>
                <h2 className="text-lg font-bold text-gray-900">{playlist.title}</h2>
                {playlist.description && (
                  <p className="mt-0.5 text-sm text-gray-500">{playlist.description}</p>
                )}
                <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {playlist.items.map((item) => (
                    <button key={item.id} onClick={() => open(item)} className="group text-left">
                      <Thumb item={item} />
                      <p className="mt-2 line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-red-700">
                        {item.title}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                        <Eye className="h-3 w-3" /> {item.viewCount.toLocaleString('en-IN')} views
                      </p>
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

function Thumb({ item, small }: { item: HubItem; small?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gray-200 ${small ? 'h-14 w-24 shrink-0' : 'aspect-video w-full'}`}
    >
      {item.thumbnailUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.thumbnailUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-400">
          <Play className="h-6 w-6" />
        </div>
      )}
      {!small && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
          <Play className="h-8 w-8 text-white opacity-0 drop-shadow transition-opacity group-hover:opacity-100" />
        </span>
      )}
      {item.durationLabel && (
        <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-semibold text-white">
          {item.durationLabel}
        </span>
      )}
    </div>
  )
}
