/**
 * Performance Utilities for Mobile and Desktop Optimization
 * Provides hooks and utilities for connection-aware loading,
 * viewport detection, and performance monitoring.
 */

// Connection types for adaptive loading
export type ConnectionType = 'slow-2g' | '2g' | '3g' | '4g' | 'unknown'

export interface NetworkInformation {
  effectiveType: ConnectionType
  downlink: number
  rtt: number
  saveData: boolean
}

/**
 * Get current network connection information
 * Returns adaptive settings based on connection quality
 */
export function getNetworkInfo(): NetworkInformation {
  if (typeof navigator === 'undefined') {
    return {
      effectiveType: '4g',
      downlink: 10,
      rtt: 50,
      saveData: false,
    }
  }

  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection

  if (connection) {
    return {
      effectiveType: connection.effectiveType || '4g',
      downlink: connection.downlink || 10,
      rtt: connection.rtt || 50,
      saveData: connection.saveData || false,
    }
  }

  return {
    effectiveType: '4g',
    downlink: 10,
    rtt: 50,
    saveData: false,
  }
}

/**
 * Check if the connection is slow (2G or slow-2G)
 */
export function isSlowConnection(): boolean {
  const { effectiveType, saveData } = getNetworkInfo()
  return saveData || effectiveType === 'slow-2g' || effectiveType === '2g'
}

/**
 * Check if the user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check if the user prefers reduced data usage
 */
export function prefersReducedData(): boolean {
  const { saveData } = getNetworkInfo()
  return saveData
}

/**
 * Get optimal image quality based on connection
 */
export function getOptimalImageQuality(): number {
  const { effectiveType, saveData } = getNetworkInfo()

  if (saveData) return 50
  if (effectiveType === 'slow-2g') return 40
  if (effectiveType === '2g') return 50
  if (effectiveType === '3g') return 70
  return 85
}

/**
 * Get optimal image sizes based on connection
 */
export function getOptimalImageSizes(defaultSizes: string): string {
  if (isSlowConnection()) {
    return '(max-width: 640px) 50vw, 33vw'
  }
  return defaultSizes
}

/**
 * Debounce function for performance-critical operations
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function for scroll and resize events
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Request Idle Callback polyfill for non-critical tasks
 */
export function requestIdleCallbackPolyfill(
  callback: IdleRequestCallback,
  options?: IdleRequestOptions
): number {
  if (typeof window === 'undefined') {
    return 0
  }
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options)
  }
  return setTimeout(
    () => callback({ didTimeout: false, timeRemaining: () => 50 }),
    1
  ) as unknown as number
}

/**
 * Cancel idle callback polyfill
 */
export function cancelIdleCallbackPolyfill(handle: number): void {
  if (typeof window === 'undefined') {
    return
  }
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(handle)
  } else {
    clearTimeout(handle)
  }
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: 'script' | 'style' | 'image' | 'font'): void {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as

  if (as === 'font') {
    link.crossOrigin = 'anonymous'
  }

  document.head.appendChild(link)
}

/**
 * Prefetch resource for future navigation
 */
export function prefetchResource(href: string): void {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = href
  document.head.appendChild(link)
}

/**
 * Measure Core Web Vitals
 */
export interface WebVitals {
  lcp: number | null
  fid: number | null
  cls: number | null
  fcp: number | null
  ttfb: number | null
}

export function measureWebVitals(callback: (vitals: Partial<WebVitals>) => void): void {
  if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') return

  const vitals: Partial<WebVitals> = {}

  // Largest Contentful Paint
  try {
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      vitals.lcp = lastEntry.startTime
      callback(vitals)
    })
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
  } catch {
    // LCP not supported
  }

  // First Input Delay
  try {
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const firstEntry = entries[0] as PerformanceEventTiming
      vitals.fid = firstEntry.processingStart - firstEntry.startTime
      callback(vitals)
    })
    fidObserver.observe({ type: 'first-input', buffered: true })
  } catch {
    // FID not supported
  }

  // Cumulative Layout Shift
  try {
    let clsValue = 0
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as PerformanceEntry & { hadRecentInput?: boolean }).hadRecentInput) {
          clsValue += (entry as PerformanceEntry & { value?: number }).value || 0
        }
      }
      vitals.cls = clsValue
      callback(vitals)
    })
    clsObserver.observe({ type: 'layout-shift', buffered: true })
  } catch {
    // CLS not supported
  }

  // First Contentful Paint
  try {
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const fcpEntry = entries.find((entry) => entry.name === 'first-contentful-paint')
      if (fcpEntry) {
        vitals.fcp = fcpEntry.startTime
        callback(vitals)
      }
    })
    fcpObserver.observe({ type: 'paint', buffered: true })
  } catch {
    // FCP not supported
  }

  // Time to First Byte
  try {
    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
    if (navEntries.length > 0) {
      vitals.ttfb = navEntries[0].responseStart - navEntries[0].requestStart
      callback(vitals)
    }
  } catch {
    // TTFB not supported
  }
}

/**
 * Check if device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * Check if device supports touch
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0
}

/**
 * Get device pixel ratio for responsive images
 */
export function getDevicePixelRatio(): number {
  if (typeof window === 'undefined') return 1
  return Math.min(window.devicePixelRatio || 1, 3)
}

/**
 * Check if browser supports WebP
 */
export async function supportsWebP(): Promise<boolean> {
  if (typeof document === 'undefined') return false

  const elem = document.createElement('canvas')
  if (elem.getContext && elem.getContext('2d')) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
  }
  return false
}

/**
 * Check if browser supports AVIF
 */
export async function supportsAVIF(): Promise<boolean> {
  if (typeof Image === 'undefined') return false

  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src =
      'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKBzgABc0WgkAAAABmJSL/gAAAAAZ/9YAAAAAG'
  })
}

/**
 * Create intersection observer for lazy loading
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null

  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  }

  return new IntersectionObserver(callback, defaultOptions)
}

/**
 * Performance mark utility
 */
export function perfMark(name: string): void {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(name)
  }
}

/**
 * Performance measure utility
 */
export function perfMeasure(
  name: string,
  startMark: string,
  endMark?: string
): PerformanceMeasure | null {
  if (typeof performance !== 'undefined' && performance.measure) {
    try {
      return performance.measure(name, startMark, endMark)
    } catch {
      return null
    }
  }
  return null
}
