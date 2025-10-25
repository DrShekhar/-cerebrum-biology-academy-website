/**
 * useSwipeGesture Hook
 *
 * Custom React hook for detecting and handling swipe gestures on mobile devices.
 * Provides left/right swipe detection with configurable thresholds and velocity.
 *
 * Features:
 * - Touch event handling
 * - Configurable swipe threshold (distance)
 * - Velocity-based swipe detection
 * - Mobile-only operation
 * - TypeScript support
 *
 * Usage:
 * const { onTouchStart, onTouchMove, onTouchEnd } = useSwipeGesture({
 *   onSwipeLeft: () => console.log('Swiped left'),
 *   onSwipeRight: () => console.log('Swiped right'),
 * });
 */

import { useRef, useCallback } from 'react'

export interface SwipeGestureConfig {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  threshold?: number // Minimum distance in pixels to trigger swipe
  velocityThreshold?: number // Minimum velocity (px/ms) to trigger swipe
  preventDefaultTouchmoveEvent?: boolean
  delta?: number // Touch move delta threshold
}

export interface SwipeGestureHandlers {
  onTouchStart: (e: React.TouchEvent) => void
  onTouchMove: (e: React.TouchEvent) => void
  onTouchEnd: (e: React.TouchEvent) => void
}

interface TouchPosition {
  x: number
  y: number
  time: number
}

export function useSwipeGesture(config: SwipeGestureConfig = {}): SwipeGestureHandlers {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50, // 50px minimum swipe distance
    velocityThreshold = 0.3, // 0.3 px/ms minimum velocity
    preventDefaultTouchmoveEvent = false,
    delta = 10, // 10px delta to start tracking
  } = config

  const touchStart = useRef<TouchPosition | null>(null)
  const touchEnd = useRef<TouchPosition | null>(null)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.targetTouches[0]
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    }
    touchEnd.current = null
  }, [])

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (preventDefaultTouchmoveEvent) {
        e.preventDefault()
      }

      const touch = e.targetTouches[0]
      touchEnd.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      }
    },
    [preventDefaultTouchmoveEvent]
  )

  const onTouchEnd = useCallback(() => {
    if (!touchStart.current || !touchEnd.current) {
      return
    }

    const deltaX = touchEnd.current.x - touchStart.current.x
    const deltaY = touchEnd.current.y - touchStart.current.y
    const deltaTime = touchEnd.current.time - touchStart.current.time

    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    // Calculate velocity
    const velocityX = absX / deltaTime
    const velocityY = absY / deltaTime

    // Determine if it's a horizontal or vertical swipe
    const isHorizontalSwipe = absX > absY

    if (isHorizontalSwipe) {
      // Horizontal swipe
      if (absX >= threshold && velocityX >= velocityThreshold) {
        if (deltaX > 0) {
          // Swipe right
          onSwipeRight?.()
        } else {
          // Swipe left
          onSwipeLeft?.()
        }
      }
    } else {
      // Vertical swipe
      if (absY >= threshold && velocityY >= velocityThreshold) {
        if (deltaY > 0) {
          // Swipe down
          onSwipeDown?.()
        } else {
          // Swipe up
          onSwipeUp?.()
        }
      }
    }

    // Reset
    touchStart.current = null
    touchEnd.current = null
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold, velocityThreshold])

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}

/**
 * useSwipeCarousel Hook
 *
 * Specialized hook for carousel-style swipe navigation.
 * Provides index-based navigation with circular wrapping.
 */
export function useSwipeCarousel(
  itemCount: number,
  initialIndex = 0
): {
  currentIndex: number
  swipeHandlers: SwipeGestureHandlers
  goToIndex: (index: number) => void
  goToPrevious: () => void
  goToNext: () => void
} {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex)

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? itemCount - 1 : prev - 1))
  }, [itemCount])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === itemCount - 1 ? 0 : prev + 1))
  }, [itemCount])

  const goToIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < itemCount) {
        setCurrentIndex(index)
      }
    },
    [itemCount]
  )

  const swipeHandlers = useSwipeGesture({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
    threshold: 50,
    velocityThreshold: 0.3,
  })

  return {
    currentIndex,
    swipeHandlers,
    goToIndex,
    goToPrevious,
    goToNext,
  }
}

/**
 * usePullToRefresh Hook
 *
 * Specialized hook for pull-to-refresh gesture on mobile.
 */
export function usePullToRefresh(
  onRefresh: () => void | Promise<void>,
  threshold = 80
): {
  pullDistance: number
  isRefreshing: boolean
  handlers: SwipeGestureHandlers
} {
  const [pullDistance, setPullDistance] = React.useState(0)
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const touchStartY = useRef<number | null>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Only allow pull to refresh when scrolled to top
    if (window.scrollY === 0) {
      touchStartY.current = e.targetTouches[0].clientY
    }
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartY.current === null || isRefreshing) return

      const currentY = e.targetTouches[0].clientY
      const distance = currentY - touchStartY.current

      if (distance > 0 && distance <= threshold * 1.5) {
        setPullDistance(distance)
      }
    },
    [isRefreshing, threshold]
  )

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true)
      setPullDistance(threshold)

      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
        setPullDistance(0)
      }
    } else {
      setPullDistance(0)
    }

    touchStartY.current = null
  }, [pullDistance, threshold, isRefreshing, onRefresh])

  return {
    pullDistance,
    isRefreshing,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  }
}

/**
 * Helper hook to detect if the device supports touch
 */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = React.useState(false)

  React.useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  return isTouch
}

// Import React for hooks used in carousel and pull-to-refresh
import React from 'react'
