'use client'

import { useState, useEffect, useCallback } from 'react'

interface UseBlogViewsOptions {
  slug: string
  initialViews?: number
  trackOnMount?: boolean
}

interface UseBlogViewsReturn {
  views: number
  isLoading: boolean
  error: string | null
  trackView: () => Promise<void>
}

export function useBlogViews({
  slug,
  initialViews = 0,
  trackOnMount = true,
}: UseBlogViewsOptions): UseBlogViewsReturn {
  const [views, setViews] = useState<number>(initialViews)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasTracked, setHasTracked] = useState(false)

  const trackView = useCallback(async () => {
    if (hasTracked) return

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/blog/views', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug }),
      })

      if (!response.ok) {
        throw new Error('Failed to track view')
      }

      const data = await response.json()
      setViews(initialViews + data.views) // Add database views to initial viral count
      setHasTracked(true)
    } catch (err) {
      console.error('Error tracking view:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [slug, initialViews, hasTracked])

  // Track view on mount if enabled
  useEffect(() => {
    if (trackOnMount && slug && !hasTracked) {
      try {
        const viewedPosts = JSON.parse(sessionStorage.getItem('blog-viewed-posts') || '[]')
        if (!viewedPosts.includes(slug)) {
          trackView().then(() => {
            try {
              sessionStorage.setItem('blog-viewed-posts', JSON.stringify([...viewedPosts, slug]))
            } catch {}
          })
        }
      } catch {
        trackView()
      }
    }
  }, [slug, trackOnMount, trackView, hasTracked])

  return { views, isLoading, error, trackView }
}

// Hook to fetch view count without tracking
export function useBlogViewCount(slug: string, initialViews: number = 0) {
  const [views, setViews] = useState<number>(initialViews)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchViews() {
      try {
        const response = await fetch(`/api/blog/views?slug=${encodeURIComponent(slug)}`)
        if (response.ok) {
          const data = await response.json()
          setViews(initialViews + data.views) // Add database views to initial viral count
        }
      } catch (error) {
        console.error('Error fetching views:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchViews()
  }, [slug, initialViews])

  return { views, isLoading }
}
