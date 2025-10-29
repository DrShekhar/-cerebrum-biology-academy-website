'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { UserRole } from '@/generated/prisma'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  emailVerified: Date | null
  profile: any
  profileCompletion?: number
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
  updateProfile: (data: any) => Promise<{ success: boolean; error?: string }>
  permissions: string[]
  hasPermission: (permission: string) => boolean
  hasRole: (role: UserRole | UserRole[]) => boolean
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
  const [isLoading, setIsLoading] = useState(true)
  const [permissions, setPermissions] = useState<string[]>([])

  // Initialize auth state
  useEffect(() => {
    initializeAuth()
  }, [])

  // Auto-refresh tokens
  useEffect(() => {
    if (user) {
      const interval = setInterval(
        () => {
          refreshToken()
        },
        14 * 60 * 1000
      ) // Refresh every 14 minutes

      return () => clearInterval(interval)
    }
  }, [user])

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
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error)
    } finally {
      setIsLoading(false)
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
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      setPermissions([])
    }
  }

  const refreshToken = async (): Promise<boolean> => {
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
          return true
        }
      }

      // If refresh fails, clear auth state
      setUser(null)
      setPermissions([])
      return false
    } catch (error) {
      console.error('Token refresh error:', error)
      setUser(null)
      setPermissions([])
      return false
    }
  }

  const updateProfile = async (profileData: any) => {
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
    ADMIN: [
      '*', // All permissions
    ],
  }

  return ROLE_PERMISSIONS[role] || []
}

export default AuthProvider
