'use client'

import { useState, useEffect, useCallback } from 'react'

interface SessionUser {
  id: string
  email: string
  name?: string
  role: string
  phone?: string
}

interface SessionState {
  user: SessionUser | null
  isLoading: boolean
  isAuthenticated: boolean
  error: Error | null
  refresh: () => Promise<void>
}

/**
 * Hook to check Firebase session authentication status
 * Calls /api/auth/session to verify JWT token from cookies
 */
export function useFirebaseSession(): SessionState {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const checkSession = useCallback(async () => {
    console.log('[useFirebaseSession] Starting session check...')
    try {
      setIsLoading(true)
      setError(null)

      console.log('[useFirebaseSession] Fetching /api/auth/session...')
      const response = await fetch('/api/auth/session', {
        method: 'GET',
        credentials: 'include', // Include cookies
      })

      console.log('[useFirebaseSession] Response status:', response.status)

      if (!response.ok) {
        throw new Error('Failed to check session')
      }

      const data = await response.json()
      console.log('[useFirebaseSession] Session data:', data)

      if (data.authenticated && data.user) {
        console.log('[useFirebaseSession] User authenticated:', data.user)
        setUser(data.user)
      } else {
        console.log('[useFirebaseSession] Not authenticated')
        setUser(null)
      }
    } catch (err) {
      console.error('[useFirebaseSession] Session check error:', err)
      setError(err instanceof Error ? err : new Error('Session check failed'))
      setUser(null)
    } finally {
      setIsLoading(false)
      console.log('[useFirebaseSession] Session check complete')
    }
  }, [])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    refresh: checkSession,
  }
}
