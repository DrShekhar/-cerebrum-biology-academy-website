'use client'

import { ReactNode, Component, ErrorInfo } from 'react'
import { ClerkProvider } from '@clerk/nextjs'

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
      // On error, render children without Clerk provider
      // This allows the app to function without auth features
      return <>{this.props.children}</>
    }

    return this.props.children
  }
}

/**
 * Auth Provider Wrapper
 *
 * Wraps children in ClerkProvider when Clerk is configured.
 * This is needed because some components (ClerkAuthButtons) still use
 * Clerk components like SignedIn/SignedOut which require ClerkProvider.
 *
 * The primary auth is handled by Firebase Phone Auth + JWT sessions,
 * but Clerk is still used for the header auth buttons on desktop.
 *
 * STABILITY: Wrapped in an error boundary to prevent Clerk issues from
 * crashing the entire application. If Clerk fails, the app continues
 * without authentication features.
 */
export function ClerkProviderWrapper({ children }: { children: ReactNode }) {
  // Check if Clerk is configured
  const isClerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)

  // If Clerk is not configured, just pass through children
  if (!isClerkConfigured) {
    return <>{children}</>
  }

  // Wrap with ClerkProvider when configured, with error boundary for stability
  return (
    <ClerkErrorBoundary>
      <ClerkProvider>{children}</ClerkProvider>
    </ClerkErrorBoundary>
  )
}
