'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { useAuth } from '@/contexts/AuthContext'
import {
  ArrowLeft,
  Save,
  Star,
  Archive,
  Trash2,
  Clock,
  Tag,
  FileText,
  Pencil,
  Layers,
  X,
  Plus,
  Check,
} from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'

interface NoteContent {
  blocks?: Array<{ type: string; content: string }>
  text?: string
}

interface Note {
  id: string
  title: string
  noteType: 'TEXT' | 'DRAWING' | 'MIXED'
  content: NoteContent
  thumbnail?: string | null
  courseId?: string | null
  chapterId?: string | null
  topicId?: string | null
  tags: string[]
  isFavorite: boolean
  isArchived: boolean
  lastEditedAt: string
  createdAt: string
  metadata?: Record<string, unknown> | null
}

const noteTypeConfig = {
  TEXT: { icon: FileText, color: 'text-blue-600', label: 'Text Note' },
  DRAWING: { icon: Pencil, color: 'text-green-600', label: 'Drawing' },
  MIXED: { icon: Layers, color: 'text-purple-600', label: 'Mixed' },
}

export default function NoteDetailPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const noteId = params.id as string

  const [note, setNote] = useState<Note | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const [title, setTitle] = useState('')
  const [textContent, setTextContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [showTagInput, setShowTagInput] = useState(false)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/sign-in')
      return
    }

    if (isAuthenticated && noteId) {
      fetchNote()
    }
  }, [isAuthenticated, authLoading, noteId, router])

  const fetchNote = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/student/notes/${noteId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch note')
      }

      const noteData = data.data
      setNote(noteData)
      setTitle(noteData.title)
      setTags(noteData.tags || [])

      const content = noteData.content as NoteContent
      if (content.text) {
        setTextContent(content.text)
      } else if (content.blocks && content.blocks.length > 0) {
        setTextContent(content.blocks.map((b) => b.content).join('\n\n'))
      }
    } catch (err) {
      console.error('Error fetching note:', err)
      setError(err instanceof Error ? err.message : 'Failed to load note')
    } finally {
      setIsLoading(false)
    }
  }

  const saveNote = useCallback(async () => {
    if (!hasChanges || !note) return

    setIsSaving(true)
    try {
      const response = await fetch(`/api/student/notes/${noteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content: { text: textContent },
          tags,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save note')
      }

      setHasChanges(false)
      setLastSaved(new Date())
    } catch (err) {
      console.error('Error saving note:', err)
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setIsSaving(false)
    }
  }, [hasChanges, note, noteId, title, textContent, tags])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasChanges) {
        saveNote()
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [hasChanges, saveNote])

  const handleTitleChange = (value: string) => {
    setTitle(value)
    setHasChanges(true)
  }

  const handleContentChange = (value: string) => {
    setTextContent(value)
    setHasChanges(true)
  }

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase()
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      setTags([...tags, trimmedTag])
      setTagInput('')
      setHasChanges(true)
    }
    setShowTagInput(false)
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
    setHasChanges(true)
  }

  const handleFavorite = async () => {
    if (!note) return
    try {
      const response = await fetch(`/api/student/notes/${noteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: !note.isFavorite }),
      })
      if (response.ok) {
        setNote({ ...note, isFavorite: !note.isFavorite })
      }
    } catch (err) {
      console.error('Error updating favorite:', err)
    }
  }

  const handleArchive = async () => {
    if (!note) return
    try {
      const response = await fetch(`/api/student/notes/${noteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isArchived: !note.isArchived }),
      })
      if (response.ok) {
        router.push('/student/notes')
      }
    } catch (err) {
      console.error('Error archiving note:', err)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to permanently delete this note?')) return
    try {
      const response = await fetch(`/api/student/notes/${noteId}?permanent=true`, {
        method: 'DELETE',
      })
      if (response.ok) {
        router.push('/student/notes')
      }
    } catch (err) {
      console.error('Error deleting note:', err)
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !note) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Note not found'}</p>
          <Button onClick={() => router.push('/student/notes')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Notes
          </Button>
        </div>
      </div>
    )
  }

  const TypeIcon = noteTypeConfig[note.noteType].icon

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Button variant="ghost" onClick={() => router.push('/student/notes')} size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Notes
            </Button>

            <div className="flex items-center gap-2">
              {hasChanges ? (
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  Unsaved changes
                </span>
              ) : lastSaved ? (
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Check className="w-4 h-4 text-green-500" />
                  Saved
                </span>
              ) : null}

              <Button
                variant="outline"
                size="sm"
                onClick={handleFavorite}
                className={note.isFavorite ? 'text-yellow-600' : ''}
              >
                <Star
                  className={`w-4 h-4 ${note.isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`}
                />
              </Button>

              <Button variant="outline" size="sm" onClick={handleArchive}>
                <Archive className="w-4 h-4" />
              </Button>

              {note.isArchived && (
                <Button variant="outline" size="sm" onClick={handleDelete} className="text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}

              <Button onClick={saveNote} disabled={!hasChanges || isSaving} size="sm">
                <Save className="w-4 h-4 mr-1" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${noteTypeConfig[note.noteType].color} bg-gray-50`}
              >
                <TypeIcon className="w-3 h-3" />
                {noteTypeConfig[note.noteType].label}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Edited {formatDistanceToNow(new Date(note.lastEditedAt), { addSuffix: true })}
              </span>
            </div>

            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Note title..."
              className="text-2xl font-bold border-none shadow-none px-0 focus-visible:ring-0"
              maxLength={200}
            />

            <div className="flex flex-wrap items-center gap-2 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm group"
                >
                  <Tag className="w-3 h-3 text-gray-400" />
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {tags.length < 5 &&
                (showTagInput ? (
                  <div className="flex items-center gap-1">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      onBlur={handleAddTag}
                      placeholder="Tag..."
                      className="h-7 w-24 text-sm"
                      autoFocus
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setShowTagInput(true)}
                    className="inline-flex items-center gap-1 px-2 py-1 border border-dashed border-gray-300 rounded-full text-sm text-gray-500 hover:border-gray-400 hover:text-gray-600"
                  >
                    <Plus className="w-3 h-3" />
                    Add tag
                  </button>
                ))}
            </div>
          </div>

          <div className="p-6">
            {note.noteType === 'TEXT' || note.noteType === 'MIXED' ? (
              <Textarea
                value={textContent}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Start writing your note..."
                className="min-h-[400px] border-none shadow-none resize-none focus-visible:ring-0 text-base leading-relaxed"
              />
            ) : (
              <div className="min-h-[400px] flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <div className="text-center text-gray-500">
                  <Pencil className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="font-medium">Drawing Mode</p>
                  <p className="text-sm mt-1">Drawing canvas coming soon</p>
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t text-xs text-gray-500 flex justify-between">
            <span>Created {format(new Date(note.createdAt), 'MMM d, yyyy')}</span>
            <span>Last edited {format(new Date(note.lastEditedAt), 'MMM d, yyyy h:mm a')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
