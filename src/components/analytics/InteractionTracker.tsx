/**
 * Interaction Tracker Component
 * Advanced analytics tracking for course selector with animation integration
 */

'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import { useDataIntegration } from '@/contexts/DataIntegrationContext'
import { trackCourseInteractionWithBackend } from '@/lib/data/backendIntegration'

// Types for tracking events
interface TrackingEvent {
  type: 'click' | 'hover' | 'view' | 'scroll' | 'animation' | 'selection'
  element: string
  data?: Record<string, any>
  timing?: {
    start?: number
    duration?: number
    delay?: number
  }
  position?: {
    x: number
    y: number
  }
  viewport?: {
    width: number
    height: number
    scrollY: number
  }
}

interface InteractionTrackerProps {
  children: React.ReactNode
  trackingId?: string
  enableHeatmap?: boolean
  enableScrollTracking?: boolean
  enableAnimationTracking?: boolean
  enablePerformanceTracking?: boolean
}

export function InteractionTracker({
  children,
  trackingId = 'course-selector',
  enableHeatmap = true,
  enableScrollTracking = true,
  enableAnimationTracking = true,
  enablePerformanceTracking = true,
}: InteractionTrackerProps) {
  const { trackInteraction, state } = useDataIntegration()
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const performanceRef = useRef<{
    startTime: number
    interactions: number
    animations: number
  }>({
    startTime: performance.now(),
    interactions: 0,
    animations: 0,
  })

  // Heatmap data collection
  const heatmapData = useRef<
    Array<{
      x: number
      y: number
      intensity: number
      timestamp: number
    }>
  >([])

  // Track click events with detailed analytics
  const handleClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const rect = containerRef.current?.getBoundingClientRect()

      if (!rect || !containerRef.current?.contains(target)) return

      const relativeX = event.clientX - rect.left
      const relativeY = event.clientY - rect.top

      const trackingEvent: TrackingEvent = {
        type: 'click',
        element: getElementIdentifier(target),
        position: {
          x: relativeX,
          y: relativeY,
        },
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
          scrollY: window.scrollY,
        },
        data: {
          elementType: target.tagName,
          className: target.className,
          textContent: target.textContent?.slice(0, 100),
          timestamp: Date.now(),
        },
      }

      // Track in context
      trackInteraction('click', trackingEvent.element, trackingEvent.data)

      // Track in backend
      trackCourseInteractionWithBackend(
        trackingEvent.element,
        'click',
        state.userId || undefined,
        trackingEvent
      )

      // Update heatmap data
      if (enableHeatmap) {
        heatmapData.current.push({
          x: relativeX,
          y: relativeY,
          intensity: 1,
          timestamp: Date.now(),
        })

        // Limit heatmap data size
        if (heatmapData.current.length > 1000) {
          heatmapData.current = heatmapData.current.slice(-500)
        }
      }

      performanceRef.current.interactions++
    },
    [trackInteraction, state.userId, enableHeatmap]
  )

  // Track hover events with timing
  const handleMouseEnter = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const elementId = getElementIdentifier(target)

      const startTime = performance.now()

      const handleMouseLeave = () => {
        const duration = performance.now() - startTime

        const trackingEvent: TrackingEvent = {
          type: 'hover',
          element: elementId,
          timing: {
            start: startTime,
            duration,
          },
          data: {
            elementType: target.tagName,
            className: target.className,
            hoverDuration: duration,
          },
        }

        trackInteraction('hover', elementId, trackingEvent.data)

        target.removeEventListener('mouseleave', handleMouseLeave)
      }

      target.addEventListener('mouseleave', handleMouseLeave, { once: true })
    },
    [trackInteraction]
  )

  // Track scroll behavior
  const handleScroll = useCallback(() => {
    if (!enableScrollTracking) return

    const scrollY = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100

    // Track scroll milestones
    const milestones = [25, 50, 75, 90, 100]
    milestones.forEach((milestone) => {
      if (scrollPercentage >= milestone) {
        trackInteraction('scroll', `scroll-${milestone}`, {
          scrollPercentage,
          scrollY,
          timestamp: Date.now(),
        })
      }
    })
  }, [enableScrollTracking, trackInteraction])

  // Track element visibility
  const setupVisibilityTracking = useCallback(() => {
    if (!containerRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementId = getElementIdentifier(entry.target as HTMLElement)

          if (entry.isIntersecting) {
            trackInteraction('view', elementId, {
              visibilityRatio: entry.intersectionRatio,
              boundingRect: entry.boundingClientRect,
              timestamp: Date.now(),
            })
          }
        })
      },
      {
        threshold: [0.1, 0.5, 0.9],
        rootMargin: '10px',
      }
    )

    // Observe all trackable elements
    const trackableElements = containerRef.current.querySelectorAll(
      '[data-track], .course-card, .plan-button, .series-selector'
    )

    trackableElements.forEach((element) => {
      observerRef.current?.observe(element)
    })
  }, [trackInteraction])

  // Track animation events
  const trackAnimation = useCallback(
    (animationName: string, element: string, timing: { duration: number; delay?: number }) => {
      if (!enableAnimationTracking) return

      const trackingEvent: TrackingEvent = {
        type: 'animation',
        element,
        timing,
        data: {
          animationName,
          timestamp: Date.now(),
        },
      }

      trackInteraction('animation', element, trackingEvent.data)
      performanceRef.current.animations++
    },
    [enableAnimationTracking, trackInteraction]
  )

  // Performance monitoring
  const trackPerformance = useCallback(() => {
    if (!enablePerformanceTracking) return

    const now = performance.now()
    const sessionDuration = now - performanceRef.current.startTime

    const performanceData = {
      sessionDuration,
      interactionCount: performanceRef.current.interactions,
      animationCount: performanceRef.current.animations,
      interactionRate: performanceRef.current.interactions / (sessionDuration / 1000),
      memoryUsage: (performance as any).memory
        ? {
            used: (performance as any).memory.usedJSHeapSize,
            total: (performance as any).memory.totalJSHeapSize,
            limit: (performance as any).memory.jsHeapSizeLimit,
          }
        : null,
      timing: {
        domContentLoaded:
          (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)
            ?.domContentLoadedEventEnd || 0,
        loadComplete:
          (performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming)
            ?.loadEventEnd || 0,
      },
    }

    trackInteraction('performance', 'session-metrics', performanceData)
  }, [enablePerformanceTracking, trackInteraction])

  // Generate heatmap data for visualization
  const getHeatmapData = useCallback(() => {
    return heatmapData.current.map((point) => ({
      ...point,
      age: Date.now() - point.timestamp,
    }))
  }, [])

  // Setup event listeners
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Click tracking
    container.addEventListener('click', handleClick, true)

    // Hover tracking
    container.addEventListener('mouseenter', handleMouseEnter, true)

    // Scroll tracking
    if (enableScrollTracking) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    // Visibility tracking
    setupVisibilityTracking()

    // Performance tracking interval
    const performanceInterval = enablePerformanceTracking
      ? setInterval(trackPerformance, 30000)
      : null // Every 30 seconds

    return () => {
      container.removeEventListener('click', handleClick, true)
      container.removeEventListener('mouseenter', handleMouseEnter, true)

      if (enableScrollTracking) {
        window.removeEventListener('scroll', handleScroll)
      }

      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      if (performanceInterval) {
        clearInterval(performanceInterval)
      }
    }
  }, [
    handleClick,
    handleMouseEnter,
    handleScroll,
    setupVisibilityTracking,
    trackPerformance,
    enableScrollTracking,
    enablePerformanceTracking,
  ])

  // Expose tracking methods to children via context
  useEffect(() => {
    const contextValue = {
      trackAnimation,
      getHeatmapData,
      performanceMetrics: performanceRef.current,
    }

    // Make available globally for animation components
    ;(window as any).__courseSelector_analytics = contextValue
  }, [trackAnimation, getHeatmapData])

  return (
    <div ref={containerRef} data-tracking-container={trackingId} className="relative">
      {children}

      {/* Performance monitor overlay (development only) */}
      {process.env.NODE_ENV === 'development' && enablePerformanceTracking && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-50">
          <div>Interactions: {performanceRef.current.interactions}</div>
          <div>Animations: {performanceRef.current.animations}</div>
          <div>
            Session: {Math.round((performance.now() - performanceRef.current.startTime) / 1000)}s
          </div>
        </div>
      )}

      {/* Heatmap visualization (development only) */}
      {process.env.NODE_ENV === 'development' && enableHeatmap && (
        <svg
          className="absolute inset-0 pointer-events-none z-40"
          style={{ mixBlendMode: 'multiply' }}
        >
          {heatmapData.current.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={Math.max(2, point.intensity * 5)}
              fill={`rgba(255, 0, 0, ${Math.max(0.1, point.intensity * 0.3)})`}
            />
          ))}
        </svg>
      )}
    </div>
  )
}

// Utility function to generate element identifiers
function getElementIdentifier(element: HTMLElement): string {
  // Check for data attributes first
  if (element.dataset.track) {
    return element.dataset.track
  }

  // Generate identifier from element properties
  const id = element.id
  const className = element.className
  const tagName = element.tagName.toLowerCase()

  if (id) return `#${id}`

  if (className) {
    const primaryClass = className.split(' ')[0]
    return `.${primaryClass}`
  }

  // Fallback to position-based identifier
  const parent = element.parentElement
  if (parent) {
    const siblings = Array.from(parent.children)
    const index = siblings.indexOf(element)
    return `${tagName}:nth-child(${index + 1})`
  }

  return tagName
}

// Hook for components to access tracking functionality
export function useInteractionTracking() {
  const context = (window as any).__courseSelector_analytics

  return {
    trackAnimation: context?.trackAnimation || (() => {}),
    getHeatmapData: context?.getHeatmapData || (() => []),
    performanceMetrics: context?.performanceMetrics || { interactions: 0, animations: 0 },
  }
}
