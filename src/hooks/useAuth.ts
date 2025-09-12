'use client'

import { useState } from 'react'
import { db, id } from '@/lib/db'
import type { User } from '@/lib/db'

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // Try to use real InstantDB auth, fallback to demo mode
  let authData
  try {
    authData = db.useAuth ? db.useAuth() : { user: null, isLoading: false, error: null }
  } catch {
    authData = { user: null, isLoading: false, error: null }
  }

  const { user: instantUser, isLoading, error } = authData

  const signInWithEmail = async (email: string) => {
    try {
      // Try real InstantDB auth first
      if (db.auth && db.auth.sendMagicCode) {
        console.log('Using real InstantDB auth for:', email)
        return await db.auth.sendMagicCode({ email })
      } else {
        // Fallback to demo mode
        console.log('Demo mode: Simulating magic link for:', email)
        // Simulate successful user creation
        const newUser: User = {
          id: id(),
          email,
          name: email.split('@')[0],
          createdAt: Date.now(),
        }
        setCurrentUser(newUser)
        return { success: true }
      }
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      if (db.auth && db.auth.signOut) {
        await db.auth.signOut()
      }
      setCurrentUser(null)
      return { success: true }
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  const createUserProfile = async (userData: Omit<User, 'id' | 'createdAt'>) => {
    try {
      const userId = id()
      const newUser: User = {
        ...userData,
        id: userId,
        createdAt: Date.now(),
      }

      console.log('Creating user profile:', newUser)
      setCurrentUser(newUser)
      return newUser
    } catch (error) {
      console.error('Create user profile error:', error)
      throw error
    }
  }

  return {
    user:
      currentUser ||
      (instantUser
        ? {
            id: instantUser.id,
            email: instantUser.email,
            name: instantUser.email?.split('@')[0] || 'User',
            createdAt: Date.now(),
          }
        : null),
    isLoading,
    error,
    isAuthenticated: !!(currentUser || instantUser),
    signInWithEmail,
    signOut,
    createUserProfile,
  }
}
