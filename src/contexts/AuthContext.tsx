'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import type { UserRole } from '@/generated/prisma'
import { ROLE_PERMISSIONS } from '@/lib/auth/config'

// PERFORMANCE: Lazy-load Firebase signout to defer ~200KB Firebase SDK until logout is needed
// Most users never log out during a session, so this is a significant optimization
const getFirebaseSignOut = () => import('@/lib/firebase/phone-auth').then((mod) => mod.signOut)

// Token expiry configuration
const TOKEN_EXPIRY_MS = 15 * 60 * 1000 // 15 minutes
const REFRESH_BUFFER_MS = 2 * 60 * 1000 // Refresh 2 minutes before expiry
const MIN_REFRESH_INTERVAL_MS = 30 * 1000 // Don't refresh more than once per 30 seconds

export interface NotificationPreferences {
  email?: boolean
  sms?: boolean
  push?: boolean
}

export interface PrivacyPreferences {
  profileVisible?: boolean
  progressVisible?: boolean
  allowContactFromTeachers?: boolean
}

export interface StudyPreferences {
  preferredStudyTime?: string
  dailyStudyGoal?: number
  reminderFrequency?: string
}

export interface UserPreferences {
  notifications?: NotificationPreferences
  privacy?: PrivacyPreferences
  study?: StudyPreferences
}

export interface UserProfile {
  bio?: string
  avatarUrl?: string
  preferences?: UserPreferences
  phoneNumber?: string
  parentName?: string
  schoolName?: string
  school?: string
  grade?: string
  curriculum?: string
  targetExam?: string
  dateOfBirth?: Date | null
  address?: string
  city?: string
  state?: string
  pincode?: string
  goals?: string[]
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: UserRole
  emailVerified: Date | null
  profile: UserProfile | null
  profileCompletion?: number
}

export interface ProfileUpdateData {
  name?: string
  phone?: string
  profile?: UserProfile
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  isLoggingOut: boolean
  isAuthenticated: boolean
  sessionExpired: boolean
  clearSessionExpired: () => void
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<{ success: boolean; error?: string }>
  signup: (userData: SignupData) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  refreshToken: () => Promise<boolean>
  updateProfile: (data: ProfileUpdateData) => Promise<{ success: boolean; error?: string }>
  permissions: string[]
  hasPermission: (permission: string) => boolean
  hasRole: (role: UserRole | UserRole[]) => boolean
  authFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
}

export interface SignupData {
  name: string
  email: string
  password: string
  phone?: string
  role?: 'STUDENT' | 'PARENT'
  grade?: string
  curriculum?: 'NEET' | 'CBSE' | 'ICSE' | 'IB' | 'IGCSE' | 'STATE_BOARD'
  school?: string
  city?: string
  agreeToTerms: boolean
  subscribeNewsletter?: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [sessionExpired, setSessionExpired] = useState(false)
  const [permissions, setPermissions] = useState<string[]>([])
  const router = useRouter()

  // Clear session expired notification (user dismisses it or logs in again)
  const clearSessionExpired = useCallback(() => {
    setSessionExpired(false)
  }, [])

  // Track token expiry and refresh state
  const tokenExpiryRef = useRef<number>(0)
  const lastRefreshRef = useRef<number>(0)
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isRefreshingRef = useRef<boolean>(false)

  /**
   * Update token expiry time
   * @param expiresInOrAt - Either seconds until expiry (number < 10000000000) or absolute timestamp/ISO string
   */
  const updateTokenExpiry = useCallback((expiresInOrAt?: number | string) => {
    if (!expiresInOrAt) {
      // Default: 15 minutes from now
      tokenExpiryRef.current = Date.now() + TOKEN_EXPIRY_MS
      return
    }

    if (typeof expiresInOrAt === 'string') {
      // ISO date string (expiresAt format)
      tokenExpiryRef.current = new Date(expiresInOrAt).getTime()
    } else if (expiresInOrAt > 10000000000) {
      // Already a timestamp in milliseconds (expiresAt format)
      tokenExpiryRef.current = expiresInOrAt
    } else {
      // Seconds until expiry (expiresIn format)
      tokenExpiryRef.current = Date.now() + expiresInOrAt * 1000
    }

    // Sanity check: if expiry is in the past or too far in future, use default
    const now = Date.now()
    const maxExpiry = now + 30 * 24 * 60 * 60 * 1000 // 30 days max
    if (tokenExpiryRef.current <= now || tokenExpiryRef.current > maxExpiry) {
      console.warn('[AuthContext] Invalid token expiry, using default')
      tokenExpiryRef.current = now + TOKEN_EXPIRY_MS
    }
  }, [])

  // Check if token needs refresh
  const shouldRefreshToken = useCallback(() => {
    const now = Date.now()
    const timeSinceLastRefresh = now - lastRefreshRef.current
    const timeUntilExpiry = tokenExpiryRef.current - now

    // Don't refresh too frequently
    if (timeSinceLastRefresh < MIN_REFRESH_INTERVAL_MS) {
      return false
    }

    // Refresh if within buffer period of expiry
    return timeUntilExpiry <= REFRESH_BUFFER_MS
  }, [])

  // Schedule next refresh
  const scheduleRefresh = useCallback(() => {
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current)
    }

    const now = Date.now()
    const timeUntilExpiry = tokenExpiryRef.current - now

    // If token is already expired or will expire very soon, refresh immediately
    if (timeUntilExpiry <= REFRESH_BUFFER_MS) {
      if (user && !isRefreshingRef.current) {
        refreshTokenInternal()
      }
      return
    }

    // Schedule refresh before expiry (with buffer)
    const timeUntilRefresh = Math.max(timeUntilExpiry - REFRESH_BUFFER_MS, MIN_REFRESH_INTERVAL_MS)

    refreshTimeoutRef.current = setTimeout(() => {
      if (user && !isRefreshingRef.current) {
        refreshTokenInternal()
      }
    }, timeUntilRefresh)
  }, [user])

  // PERFORMANCE: Defer auth initialization to avoid blocking initial render
  // Only check auth immediately on protected routes, defer on public pages
  useEffect(() => {
    const isProtectedRoute =
      typeof window !== 'undefined' &&
      (window.location.pathname.startsWith('/dashboard') ||
        window.location.pathname.startsWith('/student') ||
        window.location.pathname.startsWith('/admin') ||
        window.location.pathname.startsWith('/teacher') ||
        window.location.pathname.startsWith('/counselor') ||
        window.location.pathname.startsWith('/profile') ||
        window.location.pathname.startsWith('/test/'))

    if (isProtectedRoute) {
      // Protected route: check auth immediately
      initializeAuth()
    } else {
      // Public page: defer auth check by 1 second to prioritize rendering
      const timer = setTimeout(() => {
        initializeAuth()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  // Handle visibility change - refresh immediately if needed when tab becomes visible
  useEffect(() => {
    if (!user) return

    const handleVisibilityChange = () => {
      if (!document.hidden && user) {
        // Tab became visible - check if we need to refresh
        if (shouldRefreshToken()) {
          refreshTokenInternal()
        } else {
          // Reschedule refresh based on current expiry
          scheduleRefresh()
        }
      }
    }

    // Handle online/offline status
    const handleOnline = () => {
      if (user && shouldRefreshToken()) {
        refreshTokenInternal()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('online', handleOnline)

    // Initial schedule
    scheduleRefresh()

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('online', handleOnline)
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current)
      }
    }
  }, [user, shouldRefreshToken, scheduleRefresh])

  const initializeAuth = async () => {
    try {
      setIsLoading(true)

      // IMPORTANT: Check BOTH session endpoints to support all login flows:
      // 1. /api/auth/session - Works with Firebase phone OTP (authjs.session-token cookie)
      // 2. /api/auth/refresh - Works with email/password login (refresh-token cookie)

      // First, try the session endpoint (for Firebase phone OTP login)
      try {
        const sessionResponse = await fetch('/api/auth/session', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Cache-Control': 'no-cache' },
        })

        if (sessionResponse.ok) {
          const sessionData = await sessionResponse.json()
          if (sessionData.authenticated && sessionData.user) {
            setUser({
              id: sessionData.user.id,
              email: sessionData.user.email || '',
              name: sessionData.user.name || '',
              phone: sessionData.user.phone || '',
              role: sessionData.user.role,
              emailVerified: null,
              profile: sessionData.user.profile || null,
            })
            setPermissions(getUserPermissions(sessionData.user.role))
            updateTokenExpiry()
            lastRefreshRef.current = Date.now()
            return // Successfully authenticated via session endpoint
          }
        }
      } catch {
        // Session check failed, try refresh endpoint
      }

      // Second, try the refresh endpoint (for email/password login)
      const refreshResponse = await fetch('/api/auth/refresh', {
        method: 'GET',
        credentials: 'include',
      })

      if (refreshResponse.ok) {
        const data = await refreshResponse.json()
        if (data.valid && data.user) {
          setUser(data.user)
          setPermissions(getUserPermissions(data.user.role))
          // Set expiry based on response or default
          // updateTokenExpiry handles both expiresAt (timestamp) and expiresIn (seconds)
          updateTokenExpiry(data.expiresAt || data.expiresIn)
          lastRefreshRef.current = Date.now()
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Internal refresh function with locking
  const refreshTokenInternal = async (): Promise<boolean> => {
    // Prevent concurrent refreshes
    if (isRefreshingRef.current) {
      return false
    }

    isRefreshingRef.current = true
    const hadUser = !!user // Track if user was logged in before refresh attempt

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.user) {
          setUser(data.user)
          setPermissions(getUserPermissions(data.user.role))
          // Update expiry from response
          updateTokenExpiry(data.expiresIn)
          lastRefreshRef.current = Date.now()
          // Clear any previous session expired state
          setSessionExpired(false)
          // Schedule next refresh
          scheduleRefresh()
          return true
        }
      }

      // If refresh fails, clear auth state and notify user
      console.warn('[AuthContext] Session refresh failed - session expired')
      setUser(null)
      setPermissions([])
      tokenExpiryRef.current = 0
      // Only show session expired notification if user was previously logged in
      if (hadUser) {
        setSessionExpired(true)
      }
      return false
    } catch (error) {
      console.error('Token refresh error:', error)
      setUser(null)
      setPermissions([])
      tokenExpiryRef.current = 0
      // Only show session expired notification if user was previously logged in
      if (hadUser) {
        setSessionExpired(true)
      }
      return false
    } finally {
      isRefreshingRef.current = false
    }
  }

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, rememberMe }),
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setUser(data.user)
        setPermissions(getUserPermissions(data.user.role))
        // Clear any session expired state on successful login
        setSessionExpired(false)
        // Set token expiry
        updateTokenExpiry(data.expiresIn)
        lastRefreshRef.current = Date.now()
        // Schedule auto-refresh
        scheduleRefresh()
        return { success: true }
      } else {
        return { success: false, error: data.message || 'Login failed' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const signup = async (userData: SignupData) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setUser(data.user)
        setPermissions(getUserPermissions(data.user.role))
        // Set token expiry
        updateTokenExpiry(data.expiresIn)
        lastRefreshRef.current = Date.now()
        // Schedule auto-refresh
        scheduleRefresh()
        return { success: true }
      } else {
        return { success: false, error: data.message || 'Signup failed' }
      }
    } catch (error) {
      console.error('Signup error:', error)
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const logout = async () => {
    // Prevent multiple logout attempts
    if (isLoggingOut) {
      console.warn('[Auth] Logout already in progress')
      return
    }

    setIsLoggingOut(true)

    // Clear refresh timeout first to prevent any pending refreshes during logout
    if (refreshTimeoutRef.current) {
      clearTimeout(refreshTimeoutRef.current)
      refreshTimeoutRef.current = null
    }

    // Clear token tracking immediately to prevent refresh attempts during logout
    tokenExpiryRef.current = 0
    lastRefreshRef.current = 0

    let serverLogoutSuccess = false
    let serverLogoutError: string | null = null

    // Step 1: Call server logout API and WAIT for response
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        serverLogoutSuccess = data.success === true
        if (!serverLogoutSuccess) {
          serverLogoutError = data.error || 'Server reported logout failure'
          console.warn('[Auth] Server logout incomplete:', serverLogoutError)
        } else {
          console.log('[Auth] Server logout successful')
        }
      } else {
        serverLogoutError = `Server returned ${response.status}`
        console.warn('[Auth] Server logout failed:', serverLogoutError)
      }
    } catch (fetchError) {
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        serverLogoutError = 'Logout request timed out'
      } else {
        serverLogoutError = fetchError instanceof Error ? fetchError.message : 'Network error'
      }
      console.warn('[Auth] Logout API call failed:', serverLogoutError)
    }

    // Step 2: Attempt Firebase signout (lazy-loaded to defer Firebase SDK)
    try {
      const firebaseSignOut = await getFirebaseSignOut()
      await firebaseSignOut()
      console.log('[Auth] Firebase signout successful')
    } catch (firebaseError) {
      // Don't block logout for Firebase errors - it may not be in use
      console.warn('[Auth] Firebase signout failed (may not be in use):', firebaseError)
    }

    // Step 3: Clear client state
    // We clear client state even if server logout failed for security
    // (better to have user re-login than leave them in a bad state)
    setUser(null)
    setPermissions([])

    // Step 4: Clear any localStorage auth-related data
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('freeUserId')
        localStorage.removeItem('user-session')
        localStorage.removeItem('admin-state')
        localStorage.removeItem('auth-redirect')
        // Clear session storage too
        sessionStorage.removeItem('auth-state')
        sessionStorage.removeItem('login-redirect')
      } catch (storageError) {
        console.warn('[Auth] Failed to clear storage:', storageError)
      }
    }

    // Step 5: Navigate to home
    // Use replace to prevent back button returning to protected page
    router.replace('/')

    // Log final status
    if (serverLogoutSuccess) {
      console.log('[Auth] Logout completed successfully')
    } else {
      console.warn('[Auth] Logout completed with server-side issues:', serverLogoutError)
      // Note: Cookies should still be cleared by the server response
      // If not, middleware will reject next request and force re-login
    }

    setIsLoggingOut(false)
  }

  // Public refresh function (delegates to internal)
  const refreshToken = async (): Promise<boolean> => {
    return refreshTokenInternal()
  }

  // Authenticated fetch wrapper that handles 401 errors with automatic refresh
  const authFetch = useCallback(
    async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      // Ensure credentials are included
      const fetchInit: RequestInit = {
        ...init,
        credentials: 'include',
      }

      // First attempt
      let response = await fetch(input, fetchInit)

      // If 401, try to refresh and retry once
      if (response.status === 401 && user) {
        const refreshed = await refreshTokenInternal()
        if (refreshed) {
          // Retry the original request
          response = await fetch(input, fetchInit)
        }
        // Note: refreshTokenInternal already sets sessionExpired if refresh fails
      }

      return response
    },
    [user]
  )

  const updateProfile = async (profileData: ProfileUpdateData) => {
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, error: data.message || 'Profile update failed' }
      }
    } catch (error) {
      console.error('Profile update error:', error)
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const hasPermission = (permission: string): boolean => {
    return permissions.includes('*') || permissions.includes(permission)
  }

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false
    const roles = Array.isArray(role) ? role : [role]
    return roles.includes(user.role)
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isLoggingOut,
    isAuthenticated: !!user,
    sessionExpired,
    clearSessionExpired,
    login,
    signup,
    logout,
    refreshToken,
    updateProfile,
    permissions,
    hasPermission,
    hasRole,
    authFetch,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Helper function to get permissions based on role
// IMPORTANT: Uses ROLE_PERMISSIONS from @/lib/auth/config.ts (single source of truth)
function getUserPermissions(role: UserRole): string[] {
  return ROLE_PERMISSIONS[role] || []
}

export default AuthProvider
