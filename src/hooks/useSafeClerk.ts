'use client'

/**
 * Safe Clerk Hooks Wrapper
 *
 * Provides fallback values when Clerk is not configured (e.g., during CI builds).
 * This prevents build failures when NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set.
 */

import {
  useUser as useClerkUser,
  useAuth as useClerkAuth,
  useClerk as useClerkInstance,
} from '@clerk/nextjs'
import type { UserResource, ClerkOptions } from '@clerk/types'

// Check if Clerk is configured at runtime
function isClerkConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
}

/**
 * Safe wrapper for Clerk's useUser hook
 * Returns null/default values when Clerk is not configured
 */
export function useSafeUser(): {
  user: UserResource | null | undefined
  isLoaded: boolean
  isSignedIn: boolean | undefined
} {
  // If Clerk is not configured, return safe defaults
  if (!isClerkConfigured()) {
    return {
      user: null,
      isLoaded: true,
      isSignedIn: false,
    }
  }

  // Use actual Clerk hook when configured
  try {
    const { user, isLoaded, isSignedIn } = useClerkUser()
    return { user, isLoaded, isSignedIn }
  } catch {
    // Fallback if hook fails (e.g., not wrapped in ClerkProvider)
    return {
      user: null,
      isLoaded: true,
      isSignedIn: false,
    }
  }
}

/**
 * Safe wrapper for Clerk's useAuth hook
 * Returns null/default values when Clerk is not configured
 */
export function useSafeAuth(): {
  isLoaded: boolean
  isSignedIn: boolean | undefined
  userId: string | null | undefined
  sessionId: string | null | undefined
} {
  // If Clerk is not configured, return safe defaults
  if (!isClerkConfigured()) {
    return {
      isLoaded: true,
      isSignedIn: false,
      userId: null,
      sessionId: null,
    }
  }

  // Use actual Clerk hook when configured
  try {
    const { isLoaded, isSignedIn, userId, sessionId } = useClerkAuth()
    return { isLoaded, isSignedIn, userId, sessionId }
  } catch {
    // Fallback if hook fails
    return {
      isLoaded: true,
      isSignedIn: false,
      userId: null,
      sessionId: null,
    }
  }
}

/**
 * Safe wrapper for Clerk's useClerk hook
 * Returns null/noop functions when Clerk is not configured
 */
export function useSafeClerk() {
  // If Clerk is not configured, return safe defaults with noop functions
  if (!isClerkConfigured()) {
    return {
      loaded: true,
      signOut: async () => {},
      openSignIn: () => {},
      openSignUp: () => {},
      openUserProfile: () => {},
      session: null,
      user: null,
      client: null,
    }
  }

  // Use actual Clerk hook when configured
  try {
    return useClerkInstance()
  } catch {
    // Fallback if hook fails
    return {
      loaded: true,
      signOut: async () => {},
      openSignIn: () => {},
      openSignUp: () => {},
      openUserProfile: () => {},
      session: null,
      user: null,
      client: null,
    }
  }
}

/**
 * Check if Clerk is available for rendering Clerk components
 */
export function useClerkAvailable(): boolean {
  return isClerkConfigured()
}
