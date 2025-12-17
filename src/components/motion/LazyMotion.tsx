'use client'

import { lazy, Suspense, type ReactNode, type ComponentProps } from 'react'
import type { HTMLMotionProps } from 'framer-motion'

// Lazy load framer-motion to reduce initial bundle (~50KB savings)
const MotionDiv = lazy(() => import('framer-motion').then((mod) => ({ default: mod.motion.div })))

const MotionSection = lazy(() =>
  import('framer-motion').then((mod) => ({ default: mod.motion.section }))
)

const MotionSpan = lazy(() => import('framer-motion').then((mod) => ({ default: mod.motion.span })))

interface LazyMotionProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  fallback?: ReactNode
  as?: 'div' | 'section' | 'span'
}

// Default fallback - renders children without animation during loading
function DefaultFallback({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

export function LazyMotionDiv({ children, fallback, className, ...props }: LazyMotionProps) {
  return (
    <Suspense
      fallback={fallback ?? <DefaultFallback className={className}>{children}</DefaultFallback>}
    >
      <MotionDiv className={className} {...props}>
        {children}
      </MotionDiv>
    </Suspense>
  )
}

export function LazyMotionSection({
  children,
  fallback,
  className,
  ...props
}: Omit<LazyMotionProps, 'as'> & HTMLMotionProps<'section'>) {
  return (
    <Suspense
      fallback={fallback ?? <DefaultFallback className={className}>{children}</DefaultFallback>}
    >
      <MotionSection className={className} {...props}>
        {children}
      </MotionSection>
    </Suspense>
  )
}

export function LazyMotionSpan({
  children,
  fallback,
  className,
  ...props
}: Omit<LazyMotionProps, 'as'> & HTMLMotionProps<'span'>) {
  return (
    <Suspense fallback={fallback ?? <span className={className}>{children}</span>}>
      <MotionSpan className={className} {...props}>
        {children}
      </MotionSpan>
    </Suspense>
  )
}

// Common animation variants for reuse
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 },
}
