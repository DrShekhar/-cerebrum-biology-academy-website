'use client'

import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'

/**
 * Auth Provider Wrapper
 *
 * Wraps children in ClerkProvider when Clerk is configured.
 * This is needed because some components (ClerkAuthButtons) still use
 * Clerk components like SignedIn/SignedOut which require ClerkProvider.
 *
 * The primary auth is handled by Firebase Phone Auth + JWT sessions,
 * but Clerk is still used for the header auth buttons on desktop.
 */
export function ClerkProviderWrapper({ children }: { children: ReactNode }) {
  // Check if Clerk is configured
  const isClerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)

  // If Clerk is not configured, just pass through children
  if (!isClerkConfigured) {
    return <>{children}</>
  }

  // Wrap with ClerkProvider when configured
  return <ClerkProvider>{children}</ClerkProvider>
}
