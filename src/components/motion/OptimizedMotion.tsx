'use client'

import { motion, type HTMLMotionProps, type MotionProps } from 'framer-motion'
import { type ComponentPropsWithoutRef, type ElementType, useEffect, useState } from 'react'

/**
 * Hook to detect user's reduced motion preference
 * Returns true if user prefers reduced motion (accessibility)
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

/**
 * Optimized motion.div that respects prefers-reduced-motion
 * and prevents layout thrashing
 */
export function OptimizedMotionDiv(
  props: HTMLMotionProps<'div'> & { disableReducedMotion?: boolean }
) {
  const { disableReducedMotion, ...motionProps } = props
  const prefersReducedMotion = usePrefersReducedMotion()

  // If user prefers reduced motion, disable animations
  if (prefersReducedMotion && !disableReducedMotion) {
    const { animate, initial, exit, whileHover, whileTap, transition, ...restProps } = motionProps
    return <motion.div {...restProps} />
  }

  // Prevent layout recalculation by default (improves INP)
  return <motion.div layout={false} {...motionProps} />
}

/**
 * Fade-in-up animation with optimized defaults
 * Common pattern used throughout the site
 */
export function FadeInUp({
  children,
  delay = 0,
  duration = 0.4,
  ...props
}: HTMLMotionProps<'div'> & { delay?: number; duration?: number }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) {
    return <div {...(props as ComponentPropsWithoutRef<'div'>)}>{children}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      layout={false}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * Scale animation for buttons/cards with optimized defaults
 */
export function ScaleOnHover({
  children,
  scale = 1.02,
  ...props
}: HTMLMotionProps<'div'> & { scale?: number }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) {
    return <div {...(props as ComponentPropsWithoutRef<'div'>)}>{children}</div>
  }

  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      layout={false}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * Stagger children animation with optimized defaults
 */
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  ...props
}: HTMLMotionProps<'div'> & { staggerDelay?: number }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) {
    return <div {...(props as ComponentPropsWithoutRef<'div'>)}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      layout={false}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * Optimized motion variants for common use cases
 */
export const optimizedVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  },
}
