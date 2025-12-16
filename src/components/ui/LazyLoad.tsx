'use client'

import { Suspense, lazy, ComponentType, ReactNode, useState, useEffect } from 'react'
import { useLazyLoad, useReducedMotion } from '@/hooks/usePerformance'
import { cn } from '@/lib/utils'

interface LazyLoadProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
  className?: string
  minHeight?: string | number
}

export function LazyLoad({
  children,
  fallback,
  rootMargin = '200px',
  className,
  minHeight = 200,
}: LazyLoadProps) {
  const [ref, shouldLoad] = useLazyLoad(rootMargin)
  const reducedMotion = useReducedMotion()

  const defaultFallback = (
    <div
      className={cn(
        'flex items-center justify-center bg-gray-100',
        !reducedMotion && 'animate-pulse'
      )}
      style={{ minHeight }}
    >
      <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  )

  return (
    <div ref={ref} className={className} style={{ minHeight: shouldLoad ? undefined : minHeight }}>
      {shouldLoad ? children : (fallback ?? defaultFallback)}
    </div>
  )
}

interface LazyComponentProps<P = unknown> {
  loader: () => Promise<{ default: ComponentType<P> }>
  props?: P
  fallback?: ReactNode
  rootMargin?: string
  minHeight?: string | number
}

export function LazyComponent<P extends object>({
  loader,
  props = {} as P,
  fallback,
  rootMargin = '200px',
  minHeight = 200,
}: LazyComponentProps<P>) {
  const [ref, shouldLoad] = useLazyLoad(rootMargin)
  const [Component, setComponent] = useState<ComponentType<P> | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (shouldLoad && !Component) {
      loader().then((module) => {
        setComponent(() => module.default)
      })
    }
  }, [shouldLoad, Component, loader])

  const defaultFallback = (
    <div
      className={cn(
        'flex items-center justify-center bg-gray-100 rounded-lg',
        !reducedMotion && 'animate-pulse'
      )}
      style={{ minHeight }}
    >
      <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  )

  return (
    <div ref={ref} style={{ minHeight: Component ? undefined : minHeight }}>
      {Component ? <Component {...props} /> : (fallback ?? defaultFallback)}
    </div>
  )
}

export function createLazyComponent<P extends object>(
  loader: () => Promise<{ default: ComponentType<P> }>,
  options: {
    fallback?: ReactNode
    ssr?: boolean
  } = {}
): ComponentType<P> {
  const LazyLoaded = lazy(loader)

  return function LazyWrapper(props: P) {
    return (
      <Suspense fallback={options.fallback ?? <LoadingSpinner />}>
        <LazyLoaded {...props} />
      </Suspense>
    )
  }
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  )
}

interface DeferredProps {
  children: ReactNode
  delay?: number
}

export function Deferred({ children, delay = 0 }: DeferredProps) {
  const [shouldRender, setShouldRender] = useState(delay === 0)

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setShouldRender(true)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [delay])

  if (!shouldRender) return null

  return <>{children}</>
}

interface ConditionalRenderProps {
  condition: boolean
  children: ReactNode
  fallback?: ReactNode
}

export function ConditionalRender({ condition, children, fallback }: ConditionalRenderProps) {
  if (condition) {
    return <>{children}</>
  }
  return fallback ? <>{fallback}</> : null
}

interface ProgressiveLoadProps {
  lowPriority: ReactNode
  highPriority: ReactNode
  loadHighAfter?: number
}

export function ProgressiveLoad({
  lowPriority,
  highPriority,
  loadHighAfter = 1000,
}: ProgressiveLoadProps) {
  const [showHigh, setShowHigh] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHigh(true)
    }, loadHighAfter)
    return () => clearTimeout(timer)
  }, [loadHighAfter])

  return showHigh ? <>{highPriority}</> : <>{lowPriority}</>
}
