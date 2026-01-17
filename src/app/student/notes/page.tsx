'use client'

export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { EmptyState } from '@/components/ui/EmptyState'
import { NoteStatsWidget } from '@/components/student/NoteStatsWidget'
import { NoteCard, Note } from '@/components/student/NoteCard'
import { CreateNoteModal } from '@/components/student/CreateNoteModal'
import { Plus, Search, FileText, RefreshCw, Grid, List, Star, Archive } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

interface NoteStats {
  total: number
  active: number
  favorites: number
  archived: number
}

type ViewMode = 'grid' | 'list'
type FilterTab = 'all' | 'favorites' | 'archived'

export default function StudentNotesPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()

  const [stats, setStats] = useState<NoteStats | null>(null)
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('lastEditedAt')
  const [sortOrder, setSortOrder] = useState('desc')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
      return
    }

    if (isAuthenticated) {
      fetchNotes()
    }
  }, [isAuthenticated, authLoading, router, sortBy, sortOrder, searchQuery, activeTab])

  const fetchNotes = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const params = new URLSearchParams()
      params.append('sortBy', sortBy)
      params.append('sortOrder', sortOrder)
      if (searchQuery) params.append('search', searchQuery)
      if (activeTab === 'favorites') params.append('isFavorite', 'true')
      if (activeTab === 'archived') {
        params.append('isArchived', 'true')
      } else {
        params.append('isArchived', 'false')
      }

      const response = await fetch(`/api/student/notes?${params.toString()}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch notes')
      }

      setNotes(data.data.notes || [])
      setStats(data.data.stats || null)
    } catch (err) {
      console.error('Error fetching notes:', err)
      setError(err instanceof Error ? err.message : 'Failed to load notes')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNoteCreated = () => {
    fetchNotes()
  }

  const handleFavorite = async (noteId: string, isFavorite: boolean) => {
    try {
      const response = await fetch(`/api/student/notes/${noteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite }),
      })

      if (!response.ok) {
        throw new Error('Failed to update favorite status')
      }

      fetchNotes()
    } catch (err) {
      console.error('Error updating favorite:', err)
    }
  }

  const handleArchive = async (noteId: string) => {
    try {
      const note = notes.find((n) => n.id === noteId)
      const newArchivedStatus = !note?.isArchived

      const response = await fetch(`/api/student/notes/${noteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isArchived: newArchivedStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to archive note')
      }

      fetchNotes()
    } catch (err) {
      console.error('Error archiving note:', err)
    }
  }

  const handleDelete = async (noteId: string) => {
    try {
      const response = await fetch(`/api/student/notes/${noteId}?permanent=true`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete note')
      }

      fetchNotes()
    } catch (err) {
      console.error('Error deleting note:', err)
    }
  }

  const handleNoteClick = (noteId: string) => {
    router.push(`/student/notes/${noteId}`)
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-56 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CreateNoteModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSuccess={handleNoteCreated}
      />

      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-8 h-8 text-blue-600" />
                My Notes
              </h1>
              <p className="text-gray-600 mt-1">Capture ideas, diagrams, and study materials</p>
            </div>
            <Button onClick={() => setShowCreateModal(true)} size="lg">
              <Plus className="w-5 h-5 mr-2" />
              New Note
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {stats && (
          <div className="mb-8">
            <NoteStatsWidget stats={stats} />
          </div>
        )}

        <div className="mb-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === 'all'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-1" />
              All Notes
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === 'favorites'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Star className="w-4 h-4 inline mr-1" />
              Favorites
            </button>
            <button
              onClick={() => setActiveTab('archived')}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === 'archived'
                  ? 'border-gray-500 text-gray-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Archive className="w-4 h-4 inline mr-1" />
              Archived
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="min-w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lastEditedAt">Last Edited</SelectItem>
                  <SelectItem value="createdAt">Created</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="min-w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Newest</SelectItem>
                  <SelectItem value="asc">Oldest</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                >
                  <Grid className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                >
                  <List className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <Button variant="outline" onClick={fetchNotes} size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {notes.length === 0 ? (
          <EmptyState
            icon={FileText}
            title={
              activeTab === 'archived'
                ? 'No archived notes'
                : activeTab === 'favorites'
                  ? 'No favorite notes'
                  : 'No notes yet'
            }
            description={
              searchQuery
                ? 'No notes match your search. Try adjusting your search terms.'
                : activeTab === 'archived'
                  ? 'Notes you archive will appear here.'
                  : activeTab === 'favorites'
                    ? 'Star your important notes to add them to favorites.'
                    : 'Start capturing your ideas and study materials. Create your first note!'
            }
            primaryAction={
              searchQuery || activeTab !== 'all'
                ? undefined
                : {
                    label: 'Create Your First Note',
                    onClick: () => setShowCreateModal(true),
                  }
            }
            size="lg"
            variant="default"
          />
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                : 'space-y-3'
            }
          >
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={() => handleNoteClick(note.id)}
                onFavorite={handleFavorite}
                onArchive={handleArchive}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
