'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface SessionUser {
  id: string
  email: string
  name?: string
  fullName?: string
  role: string
  phone?: string
  coachingTier?: string
  isTrialActive?: boolean
  trialDaysRemaining?: number
}

interface SessionState {
  user: SessionUser | null
  isLoading: boolean
  isAuthenticated: boolean
  error: Error | null
  sessionChecked: boolean
  refresh: () => Promise<void>
}

// Session check timeout (10 seconds)
const SESSION_CHECK_TIMEOUT = 10000

export function useFirebaseSession(): SessionState {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [sessionChecked, setSessionChecked] = useState(false)
  const retryCount = useRef(0)
  const maxRetries = 2

  const checkSession = useCallback(async () => {
    const startTime = Date.now()

    try {
      setIsLoading(true)
      setError(null)

      // Log cookies for debugging
      const cookies = document.cookie
      console.log('[useFirebaseSession] Starting session check...', {
        hasCookies: !!cookies,
        cookieNames: cookies ? cookies.split(';').map((c) => c.trim().split('=')[0]) : [],
        timestamp: new Date().toISOString(),
      })

      // Create abort controller for timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        controller.abort()
        console.error(
          '[useFirebaseSession] Session check timed out after',
          SESSION_CHECK_TIMEOUT,
          'ms'
        )
      }, SESSION_CHECK_TIMEOUT)

      const response = await fetch('/api/auth/session', {
        method: 'GET',
        credentials: 'include',
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache',
        },
      })

      clearTimeout(timeoutId)

      const elapsed = Date.now() - startTime
      console.log(
        '[useFirebaseSession] Session API responded in',
        elapsed,
        'ms, status:',
        response.status
      )

      if (!response.ok) {
        throw new Error(`Session check failed with status ${response.status}`)
      }

      const data = await response.json()
      console.log('[useFirebaseSession] Session data:', {
        authenticated: data.authenticated,
        hasUser: !!data.user,
        userId: data.user?.id,
        role: data.user?.role,
      })

      if (data.authenticated && data.user) {
        setUser({
          ...data.user,
          fullName: data.user.name || data.user.fullName,
        })
        retryCount.current = 0 // Reset retry count on success
      } else {
        // Not authenticated - check if we should retry (cookies might not be set yet)
        if (retryCount.current < maxRetries && cookies.includes('authjs.session-token')) {
          retryCount.current++
          console.log(
            '[useFirebaseSession] Cookie found but not authenticated, retrying...',
            retryCount.current
          )
          await new Promise((resolve) => setTimeout(resolve, 500)) // Wait 500ms before retry
          return checkSession()
        }
        setUser(null)
      }
    } catch (err) {
      const elapsed = Date.now() - startTime

      if (err instanceof Error && err.name === 'AbortError') {
        console.error('[useFirebaseSession] Request aborted (timeout) after', elapsed, 'ms')
        setError(new Error('Session check timed out. Please refresh the page.'))
      } else {
        console.error('[useFirebaseSession] Session check error after', elapsed, 'ms:', err)
        setError(err instanceof Error ? err : new Error('Session check failed'))
      }
      setUser(null)
    } finally {
      setIsLoading(false)
      setSessionChecked(true)
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
    sessionChecked,
    refresh: checkSession,
  }
}
