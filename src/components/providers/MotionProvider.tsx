'use client'

import type { ReactNode } from 'react'

/**
 * MotionProvider - Wrapper for framer-motion components
 *
 * Note: LazyMotion was removed because it conflicts with `motion` components.
 * LazyMotion requires using `m` components instead, but 30+ files use `motion` directly.
 * To re-enable LazyMotion optimization, migrate all `motion` imports to `m` imports.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

/**
 * For pages that need layout animations (drag, layout, shared layout)
 * Currently a passthrough - same as MotionProvider
 */
export function FullMotionProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}
