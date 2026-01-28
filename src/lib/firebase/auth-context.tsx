'use client'

/**
 * @deprecated SECURITY NOTICE (2026-01-28)
 *
 * This Firebase auth context is DEPRECATED and should NOT be used.
 *
 * PRIMARY AUTH SYSTEM: NextAuth + Custom JWT
 * - Client-side: Use `useAuth()` from `@/contexts/AuthContext`
 * - Server-side: Use `unifiedAuth.validate()` from `@/lib/auth/unified-auth`
 *
 * This file is kept for backwards compatibility only.
 * Do NOT import from this file in new code.
 *
 * AUTH HIERARCHY (in order of preference):
 * 1. NextAuth sessions (primary for web users)
 * 2. Custom JWT tokens (for API clients and mobile)
 * 3. API keys (for service-to-service calls)
 *
 * Firebase auth was previously used but is now deprecated.
 * All new authentication should use the unified auth system.
 */

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'
import { auth } from './config'

/** @deprecated Use AuthContextType from @/contexts/AuthContext instead */
interface AuthContextType {
  user: User | null
  loading: boolean
  isLoaded: boolean
  isSignedIn: boolean
  isConfigured: boolean
  signOut: () => Promise<void>
  getIdToken: () => Promise<string | null>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function FirebaseAuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const isConfigured = !!auth

  useEffect(() => {
    // If Firebase is not configured, skip auth state listener
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signOut = useCallback(async () => {
    if (!auth) return
    await firebaseSignOut(auth)
    setUser(null)
  }, [])

  const getIdToken = useCallback(async () => {
    if (!user) return null
    try {
      return await user.getIdToken()
    } catch (error) {
      console.error('Error getting ID token:', error)
      return null
    }
  }, [user])

  const refreshUser = useCallback(async () => {
    if (user && auth) {
      await user.reload()
      setUser(auth.currentUser)
    }
  }, [user])

  const value: AuthContextType = {
    user,
    loading,
    isLoaded: !loading,
    isSignedIn: !!user,
    isConfigured,
    signOut,
    getIdToken,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * @deprecated Use `useAuth()` from `@/contexts/AuthContext` instead
 *
 * This hook uses the deprecated Firebase auth system.
 * The primary auth system is now NextAuth + Custom JWT.
 */
export function useAuth(): AuthContextType {
  // Log deprecation warning in development
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      '[DEPRECATED] useAuth from firebase/auth-context is deprecated. ' +
        'Use useAuth from @/contexts/AuthContext instead.'
    )
  }

  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a FirebaseAuthProvider')
  }
  return context
}

/**
 * @deprecated Use user data from `useAuth()` in `@/contexts/AuthContext` instead
 *
 * This hook uses the deprecated Firebase auth system.
 */
export function useFirebaseUser() {
  const { user, loading, isLoaded, isSignedIn } = useAuth()

  return {
    user,
    isLoaded,
    isSignedIn,
    loading,
    // Derived user properties
    primaryPhoneNumber: user?.phoneNumber ? { phoneNumber: user.phoneNumber } : null,
    emailAddresses: user?.email ? [{ emailAddress: user.email }] : [],
    firstName: user?.displayName?.split(' ')[0] || null,
    lastName: user?.displayName?.split(' ').slice(1).join(' ') || null,
    fullName: user?.displayName || null,
    imageUrl: user?.photoURL || null,
  }
}
