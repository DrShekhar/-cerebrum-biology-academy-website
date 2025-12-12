'use client'

import dynamic from 'next/dynamic'
import type { ComponentType, JSX } from 'react'
import { useState, useEffect, useRef } from 'react'

// Reusable loading skeleton component
export const LoadingSkeleton = ({
  height = 'h-96',
  className = '',
}: {
  height?: string
  className?: string
}) => (
  <div
    className={`${height} bg-gradient-to-r from-blue-50/50 to-purple-50/50 animate-pulse rounded-lg ${className}`}
    role="status"
    aria-label="Loading..."
  />
)

// Card skeleton for grid layouts
export const CardSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="h-64 bg-gradient-to-r from-gray-100 to-gray-50 animate-pulse rounded-xl"
      />
    ))}
  </div>
)

// Table skeleton for data tables
export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-3">
    <div className="h-10 bg-gray-200 animate-pulse rounded" />
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="h-12 bg-gray-100 animate-pulse rounded" />
    ))}
  </div>
)

// Helper function to create lazy loaded components with consistent loading states
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T } | T>,
  options: {
    loading?: () => JSX.Element
    ssr?: boolean
    height?: string
  } = {}
) {
  const { loading, ssr = true, height = 'h-96' } = options

  return dynamic(
    () =>
      importFn().then((mod) => {
        // Handle both default exports and named exports
        if ('default' in mod) {
          return mod.default
        }
        return mod as T
      }),
    {
      loading: loading || (() => <LoadingSkeleton height={height} />),
      ssr,
    }
  )
}

// Intersection Observer based lazy loading for components
export function useLazyLoad(threshold = 0.1) {
  if (typeof window === 'undefined') return { isVisible: false, ref: null }

  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { isVisible, ref }
}

// Wrapper component for intersection observer based lazy loading
export function LazySection({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = '100px',
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
  threshold?: number
  rootMargin?: string
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return <div ref={ref}>{isVisible ? children : fallback || <LoadingSkeleton />}</div>
}
