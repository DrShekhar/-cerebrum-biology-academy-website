'use client'

import React from 'react'
import { FileText, Pencil, Layers, Star, Archive, MoreVertical, Trash2, Edit } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export interface Note {
  id: string
  title: string
  noteType: 'TEXT' | 'DRAWING' | 'MIXED'
  thumbnail?: string | null
  courseId?: string | null
  chapterId?: string | null
  topicId?: string | null
  tags: string[]
  isFavorite: boolean
  isArchived: boolean
  lastEditedAt: string
  createdAt: string
}

interface NoteCardProps {
  note: Note
  onClick: () => void
  onFavorite: (id: string, isFavorite: boolean) => void
  onArchive: (id: string) => void
  onDelete: (id: string) => void
}

const noteTypeConfig = {
  TEXT: { icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Text' },
  DRAWING: { icon: Pencil, color: 'text-green-600', bg: 'bg-green-50', label: 'Drawing' },
  MIXED: { icon: Layers, color: 'text-purple-600', bg: 'bg-purple-50', label: 'Mixed' },
}

export function NoteCard({ note, onClick, onFavorite, onArchive, onDelete }: NoteCardProps) {
  const [showMenu, setShowMenu] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const config = noteTypeConfig[note.noteType]
  const TypeIcon = config.icon

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowMenu(!showMenu)
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    onFavorite(note.id, !note.isFavorite)
    setShowMenu(false)
  }

  const handleArchive = (e: React.MouseEvent) => {
    e.stopPropagation()
    onArchive(note.id)
    setShowMenu(false)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Are you sure you want to permanently delete this note?')) {
      onDelete(note.id)
    }
    setShowMenu(false)
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden group"
    >
      {note.thumbnail ? (
        <div className="h-32 bg-gray-100 overflow-hidden">
          <img src={note.thumbnail} alt={note.title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className={`h-32 ${config.bg} flex items-center justify-center`}>
          <TypeIcon className={`w-12 h-12 ${config.color} opacity-50`} />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{note.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${config.bg} ${config.color}`}
              >
                <TypeIcon className="w-3 h-3" />
                {config.label}
              </span>
              {note.isFavorite && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
            </div>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              onClick={handleMenuClick}
              className="p-1 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-8 z-10 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                <button
                  onClick={handleFavorite}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Star
                    className={`w-4 h-4 ${note.isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`}
                  />
                  {note.isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
                </button>
                <button
                  onClick={handleArchive}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Archive className="w-4 h-4 text-gray-400" />
                  {note.isArchived ? 'Restore' : 'Archive'}
                </button>
                {note.isArchived && (
                  <button
                    onClick={handleDelete}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Permanently
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {note.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="px-2 py-0.5 text-gray-400 text-xs">
                +{note.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        <p className="text-xs text-gray-500 mt-3">
          Edited {formatDistanceToNow(new Date(note.lastEditedAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  )
}
