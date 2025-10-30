'use client'

import { useState, useMemo } from 'react'
import { db, id } from '@/lib/db'
import type { User } from '@/lib/db'

interface SendOtpParams {
  mobile: string
  purpose: 'registration' | 'login' | 'password_reset' | 'mobile_verification'
  whatsapp?: string
}

interface VerifyOtpParams {
  mobile: string
  otp: string
  otpId: string
  purpose: 'registration' | 'login' | 'password_reset' | 'mobile_verification'
  whatsapp?: string
  name?: string
  email?: string
  role?: 'student' | 'parent'
  currentClass?: '10th' | '11th' | '12th' | 'Dropper'
  parentMobile?: string
  referralCode?: string
  marketingConsent?: boolean
  whatsappConsent?: boolean
  smsConsent?: boolean
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const sendOtp = async (params: SendOtpParams) => {
    try {
      setIsSubmitting(true)
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle rate limiting specifically
        if (response.status === 429) {
          const error = new Error(data.error || 'Too many requests')
          ;(error as any).cause = {
            type: 'RATE_LIMITED',
            waitTime: data.waitTime,
            canRetryAt: data.canRetryAt,
          }
          throw error
        }
        throw new Error(data.error || 'Failed to send OTP')
      }

      return { success: true, data: { otpId: data.otpId, expiresAt: data.expiresAt } }
    } catch (error) {
      console.error('Send OTP error:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const verifyOtp = async (params: VerifyOtpParams) => {
    try {
      setIsSubmitting(true)
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify OTP')
      }

      // Set current user from response
      if (data.user) {
        const authenticatedUser: User = {
          id: data.user.id,
          email: data.user.email || '',
          name: data.user.name || 'User',
          createdAt: Date.now(),
        }
        setCurrentUser(authenticatedUser)
      }

      return { success: true, data: data.user, token: data.token }
    } catch (error) {
      console.error('Verify OTP error:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const user = useMemo(() => {
    if (currentUser) return currentUser
    if (instantUser) {
      return {
        id: instantUser.id,
        email: instantUser.email,
        name: instantUser.email?.split('@')[0] || 'User',
        createdAt: Date.now(),
      }
    }
    return null
  }, [currentUser, instantUser])

  const isAuthenticated = useMemo(() => !!(currentUser || instantUser), [currentUser, instantUser])

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    isSubmitting,
    signInWithEmail,
    signOut,
    createUserProfile,
    sendOtp,
    verifyOtp,
  }
}
