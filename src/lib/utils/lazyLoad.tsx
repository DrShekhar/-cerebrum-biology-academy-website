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
    className={`${height} bg-gray-50/50 animate-pulse rounded-lg ${className}`}
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

// Error fallback component for failed dynamic imports
export const DynamicImportError = ({
  error,
  retry,
  componentName,
}: {
  error?: Error
  retry: () => void
  componentName?: string
}) => (
  <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    </div>
    <p className="text-red-800 font-medium mb-1">Failed to load {componentName || 'component'}</p>
    <p className="text-red-600 text-sm mb-4">Please check your connection and try again.</p>
    <button
      onClick={retry}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
    >
      Retry
    </button>
  </div>
)

// Retry wrapper for dynamic imports with exponential backoff
async function retryImport<T>(
  importFn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await importFn()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error))

      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError
}

// Helper function to create lazy loaded components with consistent loading states
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T } | T>,
  options: {
    loading?: () => JSX.Element
    ssr?: boolean
    height?: string
    retries?: number
    componentName?: string
  } = {}
) {
  const { loading, ssr = true, height = 'h-96', retries = 3, componentName } = options

  return dynamic(
    () =>
      retryImport(importFn, retries).then((mod) => {
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

// Helper function to create lazy loaded components with error boundary
export function createLazyComponentWithErrorBoundary<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T } | T>,
  options: {
    loading?: () => JSX.Element
    ssr?: boolean
    height?: string
    retries?: number
    componentName?: string
  } = {}
) {
  const { loading, ssr = true, height = 'h-96', retries = 3, componentName } = options

  const LazyComponent = dynamic(
    () =>
      retryImport(importFn, retries)
        .then((mod) => {
          if ('default' in mod) {
            return mod.default
          }
          return mod as T
        })
        .catch((error) => {
          console.error(`Failed to load component ${componentName}:`, error)
          const ErrorComponent = () => (
            <DynamicImportError
              error={error}
              retry={() => window.location.reload()}
              componentName={componentName}
            />
          )
          return ErrorComponent as unknown as T
        }),
    {
      loading: loading || (() => <LoadingSkeleton height={height} />),
      ssr,
    }
  )

  return LazyComponent
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
