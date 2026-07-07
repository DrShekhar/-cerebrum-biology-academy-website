'use client'

/**
 * Shared admin data-fetch hook. Encodes the admin API envelope
 * ({ success, data, error }), aborts stale requests, and exposes a refetch.
 * Replaces the hand-rolled useEffect+fetch loop copy-pasted across pages.
 */

import { useState, useEffect, useCallback, useRef } from 'react'

export interface AdminResourceState<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useAdminResource<T>(
  url: string,
  params?: Record<string, string | undefined>
): AdminResourceState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const serializedParams = JSON.stringify(params || {})

  const fetchData = useCallback(async () => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)
    try {
      const search = new URLSearchParams()
      const parsed: Record<string, string | undefined> = JSON.parse(serializedParams)
      for (const [key, value] of Object.entries(parsed)) {
        if (value !== undefined && value !== '') search.set(key, value)
      }
      const query = search.toString()
      const res = await fetch(query ? `${url}?${query}` : url, { signal: controller.signal })
      const json = await res.json()
      if (json.success) {
        setData(json.data as T)
      } else {
        setError(json.error || `Request failed (${res.status})`)
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError('Failed to load data')
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false)
    }
  }, [url, serializedParams])

  useEffect(() => {
    void fetchData()
    return () => abortRef.current?.abort()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
