'use client'

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth'
import { auth } from './config'

interface AuthContextType {
  user: User | null
  loading: boolean
  isLoaded: boolean
  isSignedIn: boolean
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signOut = useCallback(async () => {
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
    if (user) {
      await user.reload()
      setUser(auth.currentUser)
    }
  }, [user])

  const value: AuthContextType = {
    user,
    loading,
    isLoaded: !loading,
    isSignedIn: !!user,
    signOut,
    getIdToken,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Hook to access Firebase auth state
 * Returns user, loading state, and auth methods
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a FirebaseAuthProvider')
  }
  return context
}

/**
 * Hook to get current Firebase user with profile data
 * Returns user info and loading states
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
