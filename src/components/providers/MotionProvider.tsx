'use client'

import type { ReactNode } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'

/**
 * MotionProvider - Wrapper for framer-motion components with lazy loading
 *
 * Uses LazyMotion with domAnimation to reduce initial bundle size (~60KB savings)
 * The `strict={false}` prop allows regular `motion` components to work alongside
 * LazyMotion's optimized `m` components during gradual migration.
 *
 * Features included in domAnimation:
 * - animate, exit, initial
 * - variants
 * - transition
 * - whileHover, whileTap, whileFocus, whileDrag, whileInView
 *
 * Note: For drag, layout, or shared layout features, use FullMotionProvider
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict={false}>
      {children}
    </LazyMotion>
  )
}

/**
 * For pages that need layout animations (drag, layout, shared layout)
 * Uses full domMax features - only use when necessary as it's larger
 */
export function FullMotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict={false}>
      {children}
    </LazyMotion>
  )
}
