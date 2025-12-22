'use client'

import { LazyMotion, domAnimation } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * MotionProvider - Optimizes framer-motion loading
 *
 * Uses LazyMotion with domAnimation features to:
 * 1. Reduce initial bundle by ~50KB
 * 2. Load animation features only when needed
 * 3. Support all common animations (opacity, scale, x, y, etc.)
 *
 * For advanced features like layout animations, use domMax instead.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}

/**
 * For pages that need layout animations (drag, layout, shared layout)
 * Use this provider instead - it loads the full animation bundle
 */
export function FullMotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={() => import('framer-motion').then((mod) => mod.domMax)} strict>
      {children}
    </LazyMotion>
  )
}
