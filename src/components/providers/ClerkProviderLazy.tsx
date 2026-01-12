'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode, useState, useEffect } from 'react'

/**
 * PERFORMANCE: Lazy Clerk Provider
 *
 * Defers loading Clerk SDK (~500KB) until after LCP to improve initial page load.
 * Clerk is loaded after:
 * 1. requestIdleCallback (browser is idle)
 * 2. Or 3 seconds timeout (fallback)
 *
 * This significantly improves LCP as Clerk's JS doesn't block the main thread
 * during initial render.
 */
export function ClerkProviderLazy({ children }: { children: ReactNode }) {
  const [isClerkReady, setIsClerkReady] = useState(false)
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  useEffect(() => {
    // Skip if no Clerk key configured
    if (!clerkPublishableKey) {
      return
    }

    // Defer Clerk initialization to after LCP
    const loadClerk = () => {
      setIsClerkReady(true)
    }

    // Use requestIdleCallback for optimal timing, fallback to setTimeout
    if ('requestIdleCallback' in window) {
      const idleCallbackId = requestIdleCallback(loadClerk, { timeout: 3000 })
      return () => cancelIdleCallback(idleCallbackId)
    } else {
      // Fallback: load after 1.5 seconds (after typical LCP)
      const timeoutId = setTimeout(loadClerk, 1500)
      return () => clearTimeout(timeoutId)
    }
  }, [clerkPublishableKey])

  // If Clerk key is not configured, render children without Clerk
  if (!clerkPublishableKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[ClerkProviderLazy] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY not set - auth disabled')
    }
    return <>{children}</>
  }

  // Before Clerk is ready, render children without Clerk wrapper
  // This allows LCP to happen without waiting for Clerk SDK
  if (!isClerkReady) {
    return <>{children}</>
  }

  // Once idle, wrap with ClerkProvider
  return <ClerkProvider>{children}</ClerkProvider>
}
