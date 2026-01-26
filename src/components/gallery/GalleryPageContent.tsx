'use client'

import { useState, useEffect, useCallback } from 'react'
import { GalleryGrid } from './GalleryGrid'
import { GalleryFilters, GalleryCategory } from './GalleryFilters'
import { GalleryItemData } from './GalleryCard'
import { Loader2 } from 'lucide-react'

interface GalleryApiResponse {
  success: boolean
  data?: {
    items: GalleryItemData[]
    pagination: {
      page: number
      limit: number
      total: number
      pages: number
    }
    categories?: {
      category: string
      count: number
    }[]
  }
  error?: string
}

const CATEGORY_CONFIG: Record<string, { label: string; icon: string }> = {
  TOPPERS: { label: 'Toppers', icon: '🏆' },
  EVENTS: { label: 'Events', icon: '🎉' },
  SEMINARS: { label: 'Seminars', icon: '🎓' },
  FACULTY: { label: 'Faculty', icon: '👨‍🏫' },
  CAMPUS: { label: 'Campus', icon: '🏫' },
  MEDIA: { label: 'Media', icon: '📰' },
  VIDEOS: { label: 'Videos', icon: '🎬' },
}

export function GalleryPageContent() {
  const [items, setItems] = useState<GalleryItemData[]>([])
  const [categories, setCategories] = useState<GalleryCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [totalCount, setTotalCount] = useState(0)

  const fetchGallery = useCallback(
    async (pageNum: number, category: string | null, append: boolean = false) => {
      try {
        setIsLoading(true)
        setError(null)

        const params = new URLSearchParams()
        params.set('page', String(pageNum))
        params.set('limit', '24')
        params.set('includeCategories', 'true')

        if (category) {
          params.set('category', category)
        }

        const response = await fetch(`/api/gallery?${params.toString()}`)
        const data: GalleryApiResponse = await response.json()

        if (!data.success || !data.data) {
          throw new Error(data.error || 'Failed to fetch gallery')
        }

        const { items: newItems, pagination, categories: categoryCounts } = data.data

        if (append) {
          setItems((prev) => [...prev, ...newItems])
        } else {
          setItems(newItems)
        }

        setHasMore(pagination.page < pagination.pages)
        setTotalCount(pagination.total)

        if (categoryCounts && !append) {
          const formattedCategories: GalleryCategory[] = categoryCounts.map((cat) => ({
            value: cat.category,
            label: CATEGORY_CONFIG[cat.category]?.label || cat.category,
            icon: CATEGORY_CONFIG[cat.category]?.icon || '📷',
            count: cat.count,
          }))
          setCategories(formattedCategories)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  useEffect(() => {
    fetchGallery(1, selectedCategory, false)
    setPage(1)
  }, [selectedCategory, fetchGallery])

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
  }

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchGallery(nextPage, selectedCategory, true)
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 text-6xl">⚠️</div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">Something went wrong</h3>
        <p className="mb-4 text-gray-500">{error}</p>
        <button
          onClick={() => fetchGallery(1, selectedCategory, false)}
          className="rounded-lg bg-[#3d4d3d] px-6 py-2 text-white hover:bg-[#4a5d4a]"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <GalleryFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        totalCount={totalCount}
      />

      {/* Gallery Grid */}
      {isLoading && items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-[#4a5d4a]" />
          <p className="mt-4 text-gray-500">Loading gallery...</p>
        </div>
      ) : (
        <>
          <GalleryGrid items={items} columns={3} />

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center pt-8">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="flex items-center gap-2 rounded-lg bg-[#3d4d3d] px-8 py-3 text-white transition-colors hover:bg-[#4a5d4a] disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load More'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
