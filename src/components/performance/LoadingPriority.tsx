'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
// Loading Priority Configuration
export const LoadingPriority = {
  immediate: ['hero-section', 'primary-cta', 'navigation', 'scroll-progress', 'mobile-bottom-nav'],

  lazy: [
    'testimonials',
    'course-details',
    'footer',
    'success-stories',
    'faculty-profiles',
    'stats-section',
  ],

  onDemand: [
    'video-content',
    'calculator-widget',
    'chat-widget',
    'demo-booking-modal',
    'course-comparison',
    'detailed-syllabus',
  ],
}

// Performance Monitoring
interface PerformanceMetrics {
  fcp: number // First Contentful Paint
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  ttfb: number // Time to First Byte
}

// Lazy Loading Hook
export function useLazyLoading() {
  const [loadedSections, setLoadedSections] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  const loadSection = useCallback(
    (element: Element) => {
      const sectionId = element.getAttribute('data-lazy')
      if (!sectionId || loadedSections.has(sectionId)) return

      // Mark section as loaded
      setLoadedSections((prev) => new Set([...prev, sectionId]))

      // Add loaded class for CSS transitions
      element.classList.add('loaded')

      // Trigger custom event for analytics
      window.dispatchEvent(
        new CustomEvent('sectionLoaded', {
          detail: { sectionId, timestamp: performance.now() },
        })
      )

      // Unobserve after loading
      if (observerRef.current) {
        observerRef.current.unobserve(element)
      }
    },
    [loadedSections]
  )

  useEffect(() => {
    // Create intersection observer for lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadSection(entry.target)
          }
        })
      },
      {
        rootMargin: '50px', // Start loading 50px before element comes into view
        threshold: 0.1, // Trigger when 10% of element is visible
      }
    )

    // Observe all lazy-loadable elements
    const lazyElements = document.querySelectorAll('[data-lazy]')
    lazyElements.forEach((el) => {
      if (observerRef.current) {
        observerRef.current.observe(el)
      }
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loadSection])

  return { loadedSections, loadSection }
}

// Critical Content Loader
export function useCriticalLoader() {
  const [criticalLoaded, setCriticalLoaded] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    const loadCritical = async () => {
      const criticalSections = LoadingPriority.immediate
      let loaded = 0

      for (const sectionId of criticalSections) {
        // Simulate loading critical content
        await new Promise((resolve) => setTimeout(resolve, 50))

        // Mark section as priority loaded
        const element = document.querySelector(`[data-section="${sectionId}"]`)
        if (element) {
          element.classList.add('critical-loaded')
        }

        loaded++
        setLoadingProgress((loaded / criticalSections.length) * 100)
      }

      setCriticalLoaded(true)

      // Dispatch event for performance tracking
      window.dispatchEvent(
        new CustomEvent('criticalContentLoaded', {
          detail: { timestamp: performance.now() },
        })
      )
    }

    loadCritical()
  }, [])

  return { criticalLoaded, loadingProgress }
}

// Lazy Section Component
interface LazySectionProps {
  id: string
  children: React.ReactNode
  priority?: 'lazy' | 'onDemand'
  className?: string
  placeholder?: React.ReactNode
}

export function LazySection({
  id,
  children,
  priority = 'lazy',
  className = '',
  placeholder,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Add delay for onDemand content
            if (priority === 'onDemand') {
              setTimeout(() => setIsLoaded(true), 300)
            } else {
              setIsLoaded(true)
            }
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: priority === 'onDemand' ? '0px' : '100px',
        threshold: 0.1,
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  return (
    <div
      ref={sectionRef}
      data-lazy={id}
      className={`lazy-section ${className}`}
      style={{ minHeight: isLoaded ? 'auto' : '200px' }}
    >
{!isLoaded ? (
          <div
            key="placeholder"
           className="animate-fadeInUp">
            {placeholder || <SectionPlaceholder />}
          </div>
        ) : (
          <div
            key="content"
           className="animate-fadeInUp">
            {children}
          </div>
        )}
</div>
  )
}

// Default Placeholder Component
function SectionPlaceholder() {
  return (
    <div className="animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] rounded-lg h-48 flex items-center justify-center">
      <div className="text-slate-400 text-sm">Loading content...</div>
    </div>
  )
}

// Performance Monitor Component
export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const metric = entry as any

        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              setMetrics((prev) => ({ ...prev, fcp: metric.startTime }))
            }
            break
          case 'largest-contentful-paint':
            setMetrics((prev) => ({ ...prev, lcp: metric.startTime }))
            break
          case 'first-input':
            setMetrics((prev) => ({ ...prev, fid: metric.processingStart - metric.startTime }))
            break
          case 'layout-shift':
            if (!metric.hadRecentInput) {
              setMetrics((prev) => ({
                ...prev,
                cls: (prev.cls || 0) + metric.value,
              }))
            }
            break
        }
      })
    })

    // Observe performance entries
    try {
      observer.observe({
        entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'],
      })
    } catch (e) {
      console.warn('Performance Observer not supported')
    }

    // Monitor TTFB
    if (window.performance?.timing) {
      const ttfb =
        window.performance.timing.responseStart - window.performance.timing.navigationStart
      setMetrics((prev) => ({ ...prev, ttfb }))
    }

    // Show metrics in development
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => setIsVisible(true), 3000)
      return () => clearTimeout(timer)
    }

    return () => observer.disconnect()
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== 'development' || !isVisible) return null

  return (
    <div
      className="fixed bottom-4 left-4 bg-black/80 text-white text-xs p-3 rounded-lg font-mono z-50 animate-fadeInUp"
    >
      <div className="font-semibold mb-2">🚀 Performance Metrics</div>
      <div className="space-y-1">
        {metrics.fcp && <div>FCP: {Math.round(metrics.fcp)}ms</div>}
        {metrics.lcp && <div>LCP: {Math.round(metrics.lcp)}ms</div>}
        {metrics.fid && <div>FID: {Math.round(metrics.fid)}ms</div>}
        {metrics.cls && <div>CLS: {metrics.cls.toFixed(3)}</div>}
        {metrics.ttfb && <div>TTFB: {Math.round(metrics.ttfb)}ms</div>}
      </div>
    </div>
  )
}

// On-Demand Content Hook
export function useOnDemandContent(contentId: string) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const loadContent = useCallback(async () => {
    if (isLoaded || isLoading) return

    setIsLoading(true)

    try {
      // Simulate content loading
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Mark content as loaded
      setIsLoaded(true)

      // Track loading event
      window.dispatchEvent(
        new CustomEvent('onDemandContentLoaded', {
          detail: { contentId, timestamp: performance.now() },
        })
      )
    } catch (error) {
      console.error('Failed to load on-demand content:', error)
    } finally {
      setIsLoading(false)
    }
  }, [contentId, isLoaded, isLoading])

  return { isLoaded, isLoading, loadContent }
}

// Video Lazy Loading Component
interface LazyVideoProps {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  controls?: boolean
}

export function LazyVideo({
  src,
  poster,
  className = '',
  autoPlay = false,
  muted = true,
  controls = true,
}: LazyVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.25 } // Load when 25% visible
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isInView && !isLoaded) {
      setIsLoaded(true)
    }
  }, [isInView, isLoaded])

  return (
    <div className={`relative ${className}`}>
      {!isLoaded ? (
        <div
          className="w-full aspect-video bg-slate-200 rounded-lg flex items-center justify-center"
          style={{ backgroundImage: poster ? `url(${poster})` : undefined }}
        >
          <div className="text-slate-500">📹 Loading video...</div>
        </div>
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          controls={controls}
          className="w-full rounded-lg"
          preload="metadata"
        />
      )}
    </div>
  )
}

// Export main loading system
export const LoadingSystem = {
  LoadingPriority,
  useLazyLoading,
  useCriticalLoader,
  LazySection,
  PerformanceMonitor,
  useOnDemandContent,
  LazyVideo,
}
