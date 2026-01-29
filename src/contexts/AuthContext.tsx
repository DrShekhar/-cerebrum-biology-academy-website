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
import { signOut as firebaseSignOut } from '@/lib/firebase/phone-auth'

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
  isAuthenticated: boolean
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
  const [permissions, setPermissions] = useState<string[]>([])
  const router = useRouter()

  // Track token expiry and refresh state
  const tokenExpiryRef = useRef<number>(0)
  const lastRefreshRef = useRef<number>(0)
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isRefreshingRef = useRef<boolean>(false)

  // Update token expiry time
  const updateTokenExpiry = useCallback((expiresInSeconds?: number) => {
    const expiryMs = expiresInSeconds ? expiresInSeconds * 1000 : TOKEN_EXPIRY_MS
    tokenExpiryRef.current = Date.now() + expiryMs
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
    const timeUntilRefresh = Math.max(
      tokenExpiryRef.current - now - REFRESH_BUFFER_MS,
      MIN_REFRESH_INTERVAL_MS
    )

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

      // Check if we have valid tokens
      const response = await fetch('/api/auth/refresh', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        if (data.valid && data.user) {
          setUser(data.user)
          setPermissions(getUserPermissions(data.user.role))
          // Set expiry based on response or default
          if (data.expiresAt) {
            tokenExpiryRef.current = new Date(data.expiresAt).getTime()
          } else {
            updateTokenExpiry()
          }
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
          // Schedule next refresh
          scheduleRefresh()
          return true
        }
      }

      // If refresh fails, clear auth state
      setUser(null)
      setPermissions([])
      tokenExpiryRef.current = 0
      return false
    } catch (error) {
      console.error('Token refresh error:', error)
      setUser(null)
      setPermissions([])
      tokenExpiryRef.current = 0
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
    try {
      // Clear refresh timeout first to prevent any pending refreshes
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current)
        refreshTimeoutRef.current = null
      }
      // Clear token expiry
      tokenExpiryRef.current = 0
      lastRefreshRef.current = 0

      // Call logout API to clear server-side session
      // We proceed with client-side cleanup regardless of API response
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
        })
        const data = await response.json()
        if (!data.success) {
          console.warn('Server logout incomplete:', data.error || 'Unknown error')
        }
      } catch (fetchError) {
        console.warn('Logout API call failed:', fetchError)
      }

      // Always attempt Firebase signout
      try {
        await firebaseSignOut()
      } catch (firebaseError) {
        console.warn('Firebase signout failed:', firebaseError)
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Always clear client state regardless of API success
      setUser(null)
      setPermissions([])
      router.push('/')
    }
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
    isAuthenticated: !!user,
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
function getUserPermissions(role: UserRole): string[] {
  const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
    STUDENT: [
      'test:take',
      'notes:view',
      'profile:edit',
      'enrollment:view',
      'payment:make',
      'demo:book',
      'community:participate',
    ],
    PARENT: ['student:monitor', 'progress:view', 'payment:make', 'demo:book', 'reports:view'],
    TEACHER: [
      'test:create',
      'test:edit',
      'notes:create',
      'notes:edit',
      'student:view',
      'progress:view',
      'class:manage',
      'assignment:create',
    ],
    COUNSELOR: [
      'student:view',
      'progress:view',
      'demo:book',
      'enrollment:view',
      'reports:view',
      'student:communicate',
      'counseling:provide',
    ],
    ADMIN: [
      '*', // All permissions
    ],
  }

  return ROLE_PERMISSIONS[role] || []
}

export default AuthProvider
