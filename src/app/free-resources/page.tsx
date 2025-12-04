'use client'

import { useState, useEffect, useRef } from 'react'
import { Loader2, BookOpen, AlertCircle } from 'lucide-react'
import ResourceCard from '@/components/free-resources/ResourceCard'
import ResourceFilter from '@/components/free-resources/ResourceFilter'
import AnnouncementBanner from '@/components/free-resources/AnnouncementBanner'

interface Resource {
  id: string
  title: string
  description?: string | null
  type: string
  fileUrl?: string | null
  content?: string | null
  thumbnailUrl?: string | null
  classCategory: string
  isArchived: boolean
  publishedAt?: string | null
  viewCount: number
}

export default function FreeResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [announcements, setAnnouncements] = useState<Resource[]>([])
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  const [selectedType, setSelectedType] = useState('ALL')
  const [selectedClass, setSelectedClass] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [showArchived, setShowArchived] = useState(false)

  const abortControllerRef = useRef<AbortController | null>(null)

  // Mark component as mounted (for hydration)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch resources when filters change
  useEffect(() => {
    if (!isMounted) return

    const fetchResources = async () => {
      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      abortControllerRef.current = new AbortController()

      try {
        const params = new URLSearchParams()
        if (selectedType !== 'ALL') params.set('type', selectedType)
        if (selectedClass !== 'ALL') params.set('class', selectedClass)
        if (debouncedSearch) params.set('search', debouncedSearch)
        if (showArchived) params.set('archived', 'true')

        const res = await fetch(`/api/free-resources?${params.toString()}`, {
          signal: abortControllerRef.current.signal,
        })
        const data = await res.json()

        if (data.success) {
          setAnnouncements(data.announcements || [])
          setResources(data.resources || [])
          setError(null)
        } else {
          setError(data.error || 'Failed to load resources')
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return
        }
        setError('Failed to load resources. Please try again.')
      } finally {
        setIsInitialLoading(false)
      }
    }

    fetchResources()

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [isMounted, selectedType, selectedClass, debouncedSearch, showArchived])

  // Show loading skeleton before hydration
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="pt-20">
          <div className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm font-medium">Free Study Resources</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Resources Hub</h1>
                <p className="text-lg text-green-100 mb-8">
                  Access free study materials, timetables, announcements, and more. No login
                  required!
                </p>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-green-600" />
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-20">
        <div className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-medium">Free Study Resources</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Resources Hub</h1>
              <p className="text-lg text-green-100 mb-8">
                Access free study materials, timetables, announcements, and more. No login required!
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <AnnouncementBanner announcements={announcements} />

          <ResourceFilter
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            selectedClass={selectedClass}
            onClassChange={setSelectedClass}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            showArchived={showArchived}
            onArchivedChange={setShowArchived}
          />

          {isInitialLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-green-600" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Resources Found</h3>
              <p className="text-gray-500">
                {searchQuery || selectedType !== 'ALL' || selectedClass !== 'ALL'
                  ? 'Try adjusting your filters or search query.'
                  : 'Check back soon for new study materials!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}

          {!isInitialLoading && resources.length > 0 && (
            <p className="text-center text-gray-500 mt-8">
              Showing {resources.length} resource{resources.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
