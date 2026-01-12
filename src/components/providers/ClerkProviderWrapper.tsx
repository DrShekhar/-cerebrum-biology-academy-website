'use client'

import { ReactNode } from 'react'

/**
 * Auth Provider Wrapper
 *
 * Previously wrapped children in ClerkProvider, but we've migrated to Firebase Auth.
 * This component now just passes through children.
 *
 * Keeping this wrapper in place to avoid updating all import paths.
 * The actual auth is handled by Firebase Phone Auth + JWT sessions.
 */
export function ClerkProviderWrapper({ children }: { children: ReactNode }) {
  // Firebase Auth is now used instead of Clerk
  // This wrapper is kept for backward compatibility with import paths
  return <>{children}</>
}
