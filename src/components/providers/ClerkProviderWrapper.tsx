'use client'

import { ReactNode, Component, ErrorInfo, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import ClerkProvider to reduce initial bundle size
// This defers loading of the 185KB Clerk SDK until after initial render
const ClerkProvider = dynamic(
  () => import('@clerk/nextjs').then((mod) => mod.ClerkProvider),
  {
    ssr: false,
    loading: () => null,
  }
)

/**
 * Error boundary specifically for Clerk provider issues
 * Catches Clerk initialization errors and renders children without Clerk
 */
class ClerkErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ClerkProviderWrapper] Clerk initialization failed:', error.message)
    console.error('[ClerkProviderWrapper] Component stack:', errorInfo.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return <>{this.props.children}</>
    }

    return this.props.children
  }
}

/**
 * Auth Provider Wrapper - Performance Optimized
 *
 * Uses dynamic import with ssr: false to defer Clerk SDK loading.
 * This reduces initial bundle size by ~185KB and improves LCP.
 *
 * The primary auth is handled by InstantDB + Firebase OTP,
 * so delaying Clerk initialization doesn't affect core functionality.
 */
export function ClerkProviderWrapper({ children }: { children: ReactNode }) {
  const [shouldLoadClerk, setShouldLoadClerk] = useState(false)

  // Check if Clerk is configured
  const isClerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)

  // Defer Clerk loading using requestIdleCallback or setTimeout
  useEffect(() => {
    if (!isClerkConfigured) return

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(
        () => setShouldLoadClerk(true),
        { timeout: 2000 }
      )
      return () => window.cancelIdleCallback(id)
    } else {
      const timer = setTimeout(() => setShouldLoadClerk(true), 100)
      return () => clearTimeout(timer)
    }
  }, [isClerkConfigured])

  // If Clerk is not configured or not ready, pass through children
  if (!isClerkConfigured || !shouldLoadClerk) {
    return <>{children}</>
  }

  // Wrap with ClerkProvider when configured and loaded
  return (
    <ClerkErrorBoundary>
      <ClerkProvider>{children}</ClerkProvider>
    </ClerkErrorBoundary>
  )
}
