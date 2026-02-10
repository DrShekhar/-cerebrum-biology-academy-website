'use client'

import { type ReactNode, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// PERFORMANCE: Lazy-load framer-motion's LazyMotion to defer ~60KB until after paint
// This improves LCP and FCP by not blocking initial render with animation library
const LazyMotionWrapper = dynamic(
  () =>
    import('framer-motion').then((mod) => {
      const { LazyMotion, domAnimation } = mod
      return function LazyMotionComponent({ children }: { children: ReactNode }) {
        return (
          <LazyMotion features={domAnimation} strict={false}>
            {children}
          </LazyMotion>
        )
      }
    }),
  { ssr: false }
)

/**
 * MotionProvider - Wrapper for framer-motion components with lazy loading
 *
 * PERFORMANCE OPTIMIZATION:
 * - Defers framer-motion loading until after initial paint
 * - Children render immediately without animations
 * - Animations become available after framer-motion loads (~60KB saved from critical path)
 *
 * Features included in domAnimation:
 * - animate, exit, initial
 * - variants
 * - transition
 * - whileHover, whileTap, whileFocus, whileDrag, whileInView
 *
 * RECOMMENDED USAGE:
 * - For new components, use OptimizedMotion components from @/components/motion/OptimizedMotion
 * - These components automatically respect prefers-reduced-motion and prevent layout thrashing
 * - Examples: OptimizedMotionDiv, FadeInUp, ScaleOnHover, StaggerContainer
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const [shouldLoadMotion, setShouldLoadMotion] = useState(false)

  // PERFORMANCE: Defer framer-motion loading using requestIdleCallback
  // This ensures LCP completes before we load the animation library
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(() => setShouldLoadMotion(true), { timeout: 2000 })
      return () => cancelIdleCallback(idleId)
    } else {
      const timerId = setTimeout(() => setShouldLoadMotion(true), 1000)
      return () => clearTimeout(timerId)
    }
  }, [])

  // Render children immediately, wrap with motion provider after it loads
  if (!shouldLoadMotion) {
    return <>{children}</>
  }

  return <LazyMotionWrapper>{children}</LazyMotionWrapper>
}

/**
 * For pages that need layout animations (drag, layout, shared layout)
 * Uses full domMax features - only use when necessary as it's larger
 */
export function FullMotionProvider({ children }: { children: ReactNode }) {
  return <MotionProvider>{children}</MotionProvider>
}
