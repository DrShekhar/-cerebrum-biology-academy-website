'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'

/**
 * Conditional Clerk Provider Wrapper
 *
 * Wraps children in ClerkProvider only when NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is available.
 * This prevents build failures in CI environments where Clerk keys aren't set.
 *
 * In production, Clerk is fully functional.
 * In CI/build environments without keys, auth features are disabled but the app still builds.
 */
export function ClerkProviderWrapper({ children }: { children: ReactNode }) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  // If Clerk key is not configured, render children without Clerk
  // This allows builds to succeed in CI environments
  if (!clerkPublishableKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[ClerkProviderWrapper] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY not set - auth disabled')
    }
    return <>{children}</>
  }

  return <ClerkProvider>{children}</ClerkProvider>
}
