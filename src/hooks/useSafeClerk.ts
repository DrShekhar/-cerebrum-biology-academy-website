'use client'

/**
 * Safe Clerk Hooks Wrapper
 *
 * Provides fallback values when Clerk is not configured (e.g., during CI builds).
 * This prevents build failures when NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set.
 *
 * ARCHITECTURE: These wrappers use conditional imports based on a build-time constant.
 * When Clerk is not configured, the hooks return safe defaults without importing Clerk.
 * When Clerk IS configured, the actual Clerk hooks are imported and used normally.
 */

import type { UserResource } from '@clerk/types'

// Check if Clerk is configured - this is evaluated at build time
const CLERK_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)

// Safe defaults for when Clerk is not configured
const SAFE_USER_DEFAULTS = {
  user: null as UserResource | null | undefined,
  isLoaded: true,
  isSignedIn: false as boolean | undefined,
}

const SAFE_AUTH_DEFAULTS = {
  isLoaded: true,
  isSignedIn: false as boolean | undefined,
  userId: null as string | null | undefined,
  sessionId: null as string | null | undefined,
}

const SAFE_CLERK_DEFAULTS = {
  loaded: true,
  signOut: async () => {},
  openSignIn: () => {},
  openSignUp: () => {},
  openUserProfile: () => {},
  session: null,
  user: null,
  client: null,
}

// Conditionally import Clerk hooks only when configured
// This prevents import errors when Clerk env vars are not set
let useClerkUser: any = () => SAFE_USER_DEFAULTS
let useClerkAuth: any = () => SAFE_AUTH_DEFAULTS
let useClerkInstance: any = () => SAFE_CLERK_DEFAULTS

if (CLERK_CONFIGURED) {
  try {
    const clerk = require('@clerk/nextjs')
    useClerkUser = clerk.useUser
    useClerkAuth = clerk.useAuth
    useClerkInstance = clerk.useClerk
  } catch {
    // Clerk import failed, keep defaults
    console.warn('[useSafeClerk] Failed to import @clerk/nextjs, using fallback values')
  }
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
  if (!CLERK_CONFIGURED) {
    return SAFE_USER_DEFAULTS
  }

  try {
    const result = useClerkUser()
    return {
      user: result.user,
      isLoaded: result.isLoaded,
      isSignedIn: result.isSignedIn,
    }
  } catch {
    return SAFE_USER_DEFAULTS
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
  if (!CLERK_CONFIGURED) {
    return SAFE_AUTH_DEFAULTS
  }

  try {
    const result = useClerkAuth()
    return {
      isLoaded: result.isLoaded,
      isSignedIn: result.isSignedIn,
      userId: result.userId,
      sessionId: result.sessionId,
    }
  } catch {
    return SAFE_AUTH_DEFAULTS
  }
}

/**
 * Safe wrapper for Clerk's useClerk hook
 * Returns null/noop functions when Clerk is not configured
 */
export function useSafeClerk() {
  if (!CLERK_CONFIGURED) {
    return SAFE_CLERK_DEFAULTS
  }

  try {
    return useClerkInstance()
  } catch {
    return SAFE_CLERK_DEFAULTS
  }
}

/**
 * Check if Clerk is available for rendering Clerk components
 * This is a simple function, not a hook
 */
export function useClerkAvailable(): boolean {
  return CLERK_CONFIGURED
}
