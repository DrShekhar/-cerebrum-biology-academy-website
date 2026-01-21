'use client'

import { useState, useEffect, useCallback } from 'react'

interface SessionUser {
  id: string
  email: string
  name?: string
  fullName?: string
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

export function useFirebaseSession(): SessionState {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const checkSession = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/auth/session', {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to check session')
      }

      const data = await response.json()

      if (data.authenticated && data.user) {
        setUser({
          ...data.user,
          fullName: data.user.name || data.user.fullName,
        })
      } else {
        setUser(null)
      }
    } catch (err) {
      console.error('[useFirebaseSession] Session check error:', err)
      setError(err instanceof Error ? err : new Error('Session check failed'))
      setUser(null)
    } finally {
      setIsLoading(false)
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
