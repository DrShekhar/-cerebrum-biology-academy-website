'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  getNetworkInfo,
  prefersReducedMotion,
  isMobileDevice,
  isTouchDevice,
  getDevicePixelRatio,
  createIntersectionObserver,
  type NetworkInformation,
} from '@/lib/performance'

/**
 * Hook to get current network information
 * Updates when connection changes
 */
export function useNetworkInfo(): NetworkInformation {
  const [networkInfo, setNetworkInfo] = useState<NetworkInformation>(getNetworkInfo)

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation & EventTarget })
      .connection

    if (connection) {
      const handleChange = () => {
        setNetworkInfo(getNetworkInfo())
      }

      connection.addEventListener('change', handleChange)
      return () => connection.removeEventListener('change', handleChange)
    }
  }, [])

  return networkInfo
}

/**
 * Hook to check if connection is slow
 */
export function useSlowConnection(): boolean {
  const networkInfo = useNetworkInfo()
  return (
    networkInfo.saveData ||
    networkInfo.effectiveType === 'slow-2g' ||
    networkInfo.effectiveType === '2g'
  )
}

/**
 * Hook to check reduced motion preference
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(prefersReducedMotion())

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return reducedMotion
}

/**
 * Hook to get optimal image quality based on connection
 */
export function useOptimalImageQuality(): number {
  const networkInfo = useNetworkInfo()

  if (networkInfo.saveData) return 50
  if (networkInfo.effectiveType === 'slow-2g') return 40
  if (networkInfo.effectiveType === '2g') return 50
  if (networkInfo.effectiveType === '3g') return 70
  return 85
}

/**
 * Hook to detect device type
 */
export function useDeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTouch: false,
    pixelRatio: 1,
  })

  useEffect(() => {
    setDeviceInfo({
      isMobile: isMobileDevice(),
      isTouch: isTouchDevice(),
      pixelRatio: getDevicePixelRatio(),
    })
  }, [])

  return deviceInfo
}

/**
 * Hook for intersection observer (lazy loading)
 */
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
): [React.RefCallback<Element>, boolean, IntersectionObserverEntry | null] {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const ref = useCallback(
    (node: Element | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      if (node) {
        observerRef.current = createIntersectionObserver((entries) => {
          const [firstEntry] = entries
          setIsIntersecting(firstEntry.isIntersecting)
          setEntry(firstEntry)
        }, options)

        if (observerRef.current) {
          observerRef.current.observe(node)
        }
      }
    },
    [options.root, options.rootMargin, options.threshold]
  )

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return [ref, isIntersecting, entry]
}

/**
 * Hook for lazy loading component visibility
 */
export function useLazyLoad(rootMargin = '100px'): [React.RefCallback<Element>, boolean] {
  const [ref, isIntersecting] = useIntersectionObserver({
    rootMargin,
    threshold: 0,
  })
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    if (isIntersecting && !hasLoaded) {
      setHasLoaded(true)
    }
  }, [isIntersecting, hasLoaded])

  return [ref, hasLoaded]
}

/**
 * Hook for debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Hook for throttled callback
 */
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now())

  return useCallback(
    ((...args) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args)
        lastRun.current = Date.now()
      }
    }) as T,
    [callback, delay]
  )
}

/**
 * Hook to detect if page is visible
 */
export function usePageVisibility(): boolean {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return isVisible
}

/**
 * Hook to get viewport dimensions
 */
export function useViewport() {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setViewport({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }, 100)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [])

  return viewport
}

/**
 * Hook for scroll position with throttling
 */
export function useScrollPosition(throttleMs = 100) {
  const [scrollPosition, setScrollPosition] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollPosition({
            x: window.scrollX,
            y: window.scrollY,
          })
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [throttleMs])

  return scrollPosition
}

/**
 * Hook to check if element is in viewport
 */
export function useInViewport(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isInViewport, setIsInViewport] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = createIntersectionObserver((entries) => {
      setIsInViewport(entries[0].isIntersecting)
    }, options)

    if (observer) {
      observer.observe(element)
      return () => observer.disconnect()
    }
  }, [ref, options.root, options.rootMargin, options.threshold])

  return isInViewport
}

/**
 * Hook for media query matching
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [query])

  return matches
}

/**
 * Common breakpoint hooks
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)')
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1025px)')
}
