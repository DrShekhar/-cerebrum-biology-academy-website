'use client'

import React, { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { FileText, Pencil, Layers, X, Plus } from 'lucide-react'

interface CreateNoteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

type NoteType = 'TEXT' | 'DRAWING' | 'MIXED'

const noteTypes: { type: NoteType; icon: typeof FileText; label: string; description: string }[] = [
  {
    type: 'TEXT',
    icon: FileText,
    label: 'Text Note',
    description: 'Write notes with rich text formatting',
  },
  {
    type: 'DRAWING',
    icon: Pencil,
    label: 'Drawing',
    description: 'Sketch diagrams and illustrations',
  },
  { type: 'MIXED', icon: Layers, label: 'Mixed', description: 'Combine text and drawings' },
]

export function CreateNoteModal({ open, onOpenChange, onSuccess }: CreateNoteModalProps) {
  const [title, setTitle] = useState('')
  const [noteType, setNoteType] = useState<NoteType>('TEXT')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase()
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      setTags([...tags, trimmedTag])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Please enter a title')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/student/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          noteType,
          content: noteType === 'TEXT' ? { blocks: [] } : { strokes: [] },
          tags,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create note')
      }

      setTitle('')
      setNoteType('TEXT')
      setTags([])
      onOpenChange(false)
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create note')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setTitle('')
    setNoteType('TEXT')
    setTags([])
    setError(null)
    onOpenChange(false)
  }

  return (
    <Modal open={open} onOpenChange={(isOpen) => !isOpen && handleClose()} title="Create New Note">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Note Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your note..."
            maxLength={200}
          />
          <p className="mt-1 text-xs text-gray-500">{title.length}/200 characters</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Note Type</label>
          <div className="grid grid-cols-3 gap-3">
            {noteTypes.map(({ type, icon: Icon, label, description }) => (
              <button
                key={type}
                type="button"
                onClick={() => setNoteType(type)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  noteType === type
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon
                  className={`w-6 h-6 mb-2 ${
                    noteType === type ? 'text-blue-600' : 'text-gray-400'
                  }`}
                />
                <p
                  className={`text-sm font-medium ${noteType === type ? 'text-blue-900' : 'text-gray-900'}`}
                >
                  {label}
                </p>
                <p className="text-xs text-gray-500 mt-1 hidden sm:block">{description}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags (optional)</label>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a tag..."
              maxLength={30}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddTag}
              disabled={!tagInput.trim() || tags.length >= 5}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-sm"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          <p className="mt-1 text-xs text-gray-500">Max 5 tags</p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !title.trim()}>
            {isSubmitting ? 'Creating...' : 'Create Note'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
