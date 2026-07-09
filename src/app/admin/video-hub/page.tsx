'use client'

/**
 * Admin — Video Hub: YouTube-style playlists for the free student video
 * library. Paste a YouTube link (title + thumbnail auto-fetched) or attach an
 * uploaded lecture from the video library.
 */

import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Loader2, Plus, Trash2, PlaySquare, Youtube, Eye } from 'lucide-react'
import { PageHeader } from '@/components/admin/kit'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

interface Item {
  id: string
  title: string
  youtubeId: string | null
  videoLectureId: string | null
  thumbnailUrl: string | null
  durationLabel: string | null
  viewCount: number
  isPublished: boolean
}
interface Playlist {
  id: string
  title: string
  description: string | null
  isPublished: boolean
  items: Item[]
}

export default function AdminVideoHubPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(true)
  const [newTitle, setNewTitle] = useState('')
  const [busy, setBusy] = useState(false)
  const [confirmTarget, setConfirmTarget] = useState<{
    kind: 'playlist' | 'item'
    id: string
  } | null>(null)
  const [confirmBusy, setConfirmBusy] = useState(false)

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/video-hub')
      const json = await res.json()
      if (res.ok && json.success) setPlaylists(json.data.playlists)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const addPlaylist = async () => {
    if (busy || newTitle.trim().length < 2) return
    setBusy(true)
    try {
      const res = await fetch('/api/admin/video-hub', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'playlist', title: newTitle.trim() }),
      })
      if (res.ok) {
        setNewTitle('')
        toast.success('Playlist created')
        load()
      }
    } finally {
      setBusy(false)
    }
  }

  const remove = (kind: 'playlist' | 'item', id: string) => setConfirmTarget({ kind, id })

  const runRemove = async () => {
    if (!confirmTarget || confirmBusy) return
    setConfirmBusy(true)
    try {
      const res = await fetch(
        `/api/admin/video-hub?kind=${confirmTarget.kind}&id=${confirmTarget.id}`,
        {
          method: 'DELETE',
        }
      )
      if (res.ok) {
        setConfirmTarget(null)
        load()
      } else toast.error('Delete failed')
    } finally {
      setConfirmBusy(false)
    }
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Video Hub"
        subtitle="YouTube-style free video library — visible to every account, including free"
      />

      <div className="mb-6 flex gap-2">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New playlist (e.g. Cell Biology Crash Course)"
          className="w-full max-w-md rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
        <button
          onClick={addPlaylist}
          disabled={busy || newTitle.trim().length < 2}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" /> Add playlist
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 py-12 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading…
        </div>
      ) : playlists.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-gray-500">
          <PlaySquare className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          Create your first playlist, then paste YouTube links from your channel.
        </div>
      ) : (
        <div className="space-y-6">
          {playlists.map((p) => (
            <PlaylistCard
              key={p.id}
              playlist={p}
              onChanged={load}
              onDelete={() => remove('playlist', p.id)}
              onRemoveItem={(id) => remove('item', id)}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!confirmTarget}
        busy={confirmBusy}
        title={confirmTarget?.kind === 'playlist' ? 'Delete this playlist?' : 'Remove this video?'}
        description={
          confirmTarget?.kind === 'playlist'
            ? 'The playlist and all its videos are removed from the student hub.'
            : 'Students will no longer see this video in the hub.'
        }
        confirmLabel={confirmTarget?.kind === 'playlist' ? 'Delete playlist' : 'Remove video'}
        onConfirm={() => void runRemove()}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  )
}

function PlaylistCard({
  playlist,
  onChanged,
  onDelete,
  onRemoveItem,
}: {
  playlist: Playlist
  onChanged: () => void
  onDelete: () => void
  onRemoveItem: (id: string) => void
}) {
  const [url, setUrl] = useState('')
  const [adding, setAdding] = useState(false)

  const addVideo = async () => {
    if (adding || !url.trim()) return
    setAdding(true)
    try {
      const res = await fetch('/api/admin/video-hub', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'item', playlistId: playlist.id, url: url.trim() }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setUrl('')
        toast.success(`Added: ${json.data.item.title}`)
        onChanged()
      } else {
        toast.error(json.error || 'Could not add the video')
      }
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-bold text-gray-900">
          {playlist.title}{' '}
          <span className="text-sm font-normal text-gray-400">
            ({playlist.items.length} videos)
          </span>
        </h2>
        <button onClick={onDelete} className="rounded p-1.5 text-red-500 hover:bg-red-50">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex gap-2">
        <div className="flex w-full max-w-lg items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
          <Youtube className="h-4 w-4 shrink-0 text-red-600" />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addVideo()}
            placeholder="Paste a YouTube link — title & thumbnail auto-fetched"
            className="w-full text-sm outline-none"
          />
        </div>
        <button
          onClick={addVideo}
          disabled={adding || !url.trim()}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
        >
          {adding ? 'Adding…' : 'Add'}
        </button>
      </div>

      {playlist.items.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {playlist.items.map((i) => (
            <div key={i.id} className="group relative">
              <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
                {i.thumbnailUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={i.thumbnailUrl} alt={i.title} className="h-full w-full object-cover" />
                )}
              </div>
              <p className="mt-1 line-clamp-2 text-xs font-medium text-gray-800">{i.title}</p>
              <p className="flex items-center gap-1 text-[10px] text-gray-400">
                <Eye className="h-3 w-3" /> {i.viewCount}
              </p>
              <button
                onClick={() => onRemoveItem(i.id)}
                className="absolute right-1 top-1 rounded bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                title="Remove video"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
