'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'
import type { User } from '@/lib/db'

interface SendOtpCredentials {
  mobile: string
  purpose: 'registration' | 'login' | 'password_reset' | 'mobile_verification'
  whatsapp?: string
}

interface VerifyOtpCredentials {
  mobile: string
  otp: string
  otpId: string
  purpose: 'registration' | 'login' | 'password_reset' | 'mobile_verification'

  // Required for registration
  name?: string
  email?: string
  whatsapp?: string
  role?: 'student' | 'parent'
  currentClass?: '10th' | '11th' | '12th' | 'Dropper'
  parentMobile?: string
  referralCode?: string

  // Marketing consent
  marketingConsent?: boolean
  whatsappConsent?: boolean
  smsConsent?: boolean
}

// Legacy support for password-based auth
interface SignInCredentials {
  email: string
  password: string
}

interface RegisterCredentials {
  name: string
  email: string
  password: string
  phone: string
  role: 'student' | 'parent' | 'teacher'
  currentClass?: '10th' | '11th' | '12th' | 'Dropper'
  parentEmail?: string
  referralCode?: string
}

export function useAuth() {
  const sessionData = useSession()
  const session = sessionData?.data
  const status = sessionData?.status || 'loading'
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated'

  // Convert NextAuth session to our User type
  const user: User | null = session?.user
    ? {
        id: session.user.id,
        email: session.user.email!,
        name: session.user.name!,
        password: '', // Never expose password
        role: session.user.role,
        phone: session.user.profile?.phone,
        createdAt: Date.now(), // This would come from database in real implementation
        updatedAt: Date.now(),
        profile: session.user.profile,
      }
    : null

  // Modern mobile-first OTP authentication
  const sendOtp = async ({ mobile, purpose, whatsapp }: SendOtpCredentials) => {
    try {
      setIsSubmitting(true)
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile, purpose, whatsapp }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle rate limiting with specific error details
        if (response.status === 429) {
          throw new Error(data.error || 'Too many OTP requests', {
            cause: {
              type: 'RATE_LIMITED',
              waitTime: data.waitTime,
              canRetryAt: data.canRetryAt,
            },
          })
        }
        throw new Error(data.error || 'Failed to send OTP')
      }

      return { success: true, data }
    } catch (error) {
      console.error('Send OTP error:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const verifyOtp = async (credentials: VerifyOtpCredentials) => {
    try {
      setIsSubmitting(true)
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'OTP verification failed')
      }

      // For now, return the data (in production, this would trigger NextAuth session)
      return { success: true, data }
    } catch (error) {
      console.error('Verify OTP error:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  // Legacy email/password authentication
  const signInWithEmail = async ({ email, password }: SignInCredentials) => {
    try {
      setIsSubmitting(true)
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      return { success: true, data: result }
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  // Convenience method for mobile login
  const signInWithMobile = async (mobile: string, whatsapp?: string) => {
    return await sendOtp({ mobile, purpose: 'login', whatsapp })
  }

  // Convenience method for mobile registration
  const registerWithMobile = async (mobile: string, whatsapp?: string) => {
    return await sendOtp({ mobile, purpose: 'registration', whatsapp })
  }

  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsSubmitting(true)
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // After successful registration, automatically sign in
      const signInResult = await signInWithEmail({
        email: credentials.email,
        password: credentials.password,
      })

      return { success: true, data: { registration: data, signIn: signInResult } }
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const logout = async () => {
    try {
      await signOut({ redirect: false })
      return { success: true }
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }

  // Helper methods for role checking
  const isStudent = () => user?.role === 'student'
  const isParent = () => user?.role === 'parent'
  const isTeacher = () => user?.role === 'teacher'
  const isAdmin = () => user?.role === 'admin'

  // Check if user has required role
  const hasRole = (roles: string | string[]) => {
    if (!user) return false
    const roleArray = Array.isArray(roles) ? roles : [roles]
    return roleArray.includes(user.role)
  }

  // Legacy method for backwards compatibility (deprecated)
  const createUserProfile = async (userData: Partial<User>) => {
    console.warn('createUserProfile is deprecated. Use register() instead.')
    return user
  }

  return {
    // User data
    user,
    isLoading,
    isAuthenticated,
    isSubmitting,

    // Role helpers
    isStudent,
    isParent,
    isTeacher,
    isAdmin,
    hasRole,

    // Modern mobile-first OTP authentication
    sendOtp,
    verifyOtp,
    signInWithMobile,
    registerWithMobile,

    // Legacy email/password authentication
    signInWithEmail,
    register,
    signOut: logout,

    // Legacy support (deprecated)
    createUserProfile,

    // Additional session data
    session,
    status,
  }
}
