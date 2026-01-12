'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { LoadingSystem } from '@/components/performance/LoadingPriority'
import { addWebPClass, preloadCriticalImages } from '@/utils/imageOptimization'

interface PerformanceContextType {
  criticalLoaded: boolean
  loadingProgress: number
  loadedSections: Set<string>
  isLowEndDevice: boolean
  connectionSpeed: 'slow' | 'fast' | 'unknown'
}

const PerformanceContext = createContext<PerformanceContextType | null>(null)

export function usePerformance() {
  const context = useContext(PerformanceContext)
  if (!context) {
    throw new Error('usePerformance must be used within PerformanceProvider')
  }
  return context
}

interface PerformanceProviderProps {
  children: React.ReactNode
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  const { criticalLoaded, loadingProgress } = LoadingSystem.useCriticalLoader()
  const { loadedSections } = LoadingSystem.useLazyLoading()
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)
  const [connectionSpeed, setConnectionSpeed] = useState<'slow' | 'fast' | 'unknown'>('unknown')
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    // Detect device capabilities
    const detectDeviceCapabilities = () => {
      // Check for low-end device indicators
      const lowEndIndicators = {
        // Hardware concurrency (CPU cores)
        cores: navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2,
        // Memory (if available)
        memory: (navigator as any).deviceMemory && (navigator as any).deviceMemory <= 2,
        // Save Data preference
        saveData: (navigator as any).connection?.saveData,
      }

      const isLowEnd = Object.values(lowEndIndicators).some(Boolean)
      setIsLowEndDevice(isLowEnd)

      // Adjust performance based on device
      if (isLowEnd) {
        document.documentElement.classList.add('low-end-device')
        // Reduce animations and effects
        document.documentElement.style.setProperty('--lazy-transition', '0.2s')
      }
    }

    // Detect connection speed
    const detectConnectionSpeed = () => {
      const connection = (navigator as any).connection
      if (connection) {
        const effectiveType = connection.effectiveType
        if (effectiveType === '4g' || effectiveType === '3g') {
          setConnectionSpeed('fast')
        } else {
          setConnectionSpeed('slow')
        }

        // Listen for connection changes
        connection.addEventListener('change', () => {
          const newType = connection.effectiveType
          setConnectionSpeed(newType === '4g' || newType === '3g' ? 'fast' : 'slow')
        })
      }
    }

    detectDeviceCapabilities()
    detectConnectionSpeed()

    // Performance monitoring
    const monitorPerformance = () => {
      // Track page load performance
      window.addEventListener('load', () => {
        if (window.performance?.timing) {
          const timing = window.performance.timing
          const metrics = {
            domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
            loadComplete: timing.loadEventEnd - timing.navigationStart,
            firstByte: timing.responseStart - timing.navigationStart,
          }

          // Log performance metrics (in development)
          if (process.env.NODE_ENV === 'development') {
            console.table(metrics)
          }

          // Send to analytics (if configured)
          if (window.gtag) {
            window.gtag('event', 'performance_metrics', {
              event_category: 'Performance',
              custom_parameter_1: metrics.domContentLoaded,
              custom_parameter_2: metrics.loadComplete,
              custom_parameter_3: metrics.firstByte,
            })
          }
        }
      })

      // Track lazy loading performance
      window.addEventListener('sectionLoaded', (event: any) => {
        const { sectionId, timestamp } = event.detail

        if (process.env.NODE_ENV === 'development') {
          console.log(`Section ${sectionId} loaded at ${timestamp}ms`)
        }

        // Track in analytics
        if (window.gtag) {
          window.gtag('event', 'section_loaded', {
            event_category: 'Lazy Loading',
            event_label: sectionId,
            value: Math.round(timestamp),
          })
        }
      })
    }

    monitorPerformance()

    // Preload critical resources
    const preloadCriticalResources = async () => {
      // Detect and add WebP support class
      await addWebPClass()

      // Preload critical images with WebP detection
      preloadCriticalImages()

      // Preload critical fonts
      const fontLink = document.createElement('link')
      fontLink.rel = 'preload'
      fontLink.href = '/fonts/inter-var.woff2'
      fontLink.as = 'font'
      fontLink.type = 'font/woff2'
      fontLink.crossOrigin = 'anonymous'
      document.head.appendChild(fontLink)

      // DNS prefetch for external resources
      const dnsPrefetchLinks = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.googletagmanager.com',
        'https://checkout.razorpay.com',
      ]

      dnsPrefetchLinks.forEach((url) => {
        const link = document.createElement('link')
        link.rel = 'dns-prefetch'
        link.href = url
        document.head.appendChild(link)
      })
    }

    preloadCriticalResources()

    // Optimize for Indian networks
    const optimizeForIndianNetworks = () => {
      // Detect if user is likely in India
      const isIndia =
        Intl.DateTimeFormat().resolvedOptions().timeZone.includes('Asia/Kolkata') ||
        navigator.language.includes('hi') ||
        navigator.language.includes('en-IN')

      if (isIndia) {
        // Add India-specific optimizations
        document.documentElement.classList.add('india-network')

        // More aggressive lazy loading for Indian networks
        const lazyElements = document.querySelectorAll('[data-lazy]')
        lazyElements.forEach((el) => {
          el.classList.add('india-lazy')
        })
      }
    }

    optimizeForIndianNetworks()
  }, [isHydrated])

  const contextValue: PerformanceContextType = {
    criticalLoaded,
    loadingProgress,
    loadedSections,
    isLowEndDevice,
    connectionSpeed,
  }

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
      {/* Performance Monitor in Development */}
      <LoadingSystem.PerformanceMonitor />
    </PerformanceContext.Provider>
  )
}

// Hook for conditional rendering based on performance
export function usePerformanceOptimization() {
  const { isLowEndDevice, connectionSpeed } = usePerformance()

  const shouldReduceAnimations = isLowEndDevice || connectionSpeed === 'slow'
  const shouldLazyLoadImages = connectionSpeed === 'slow'
  const shouldPreloadNextPage = connectionSpeed === 'fast' && !isLowEndDevice

  return {
    shouldReduceAnimations,
    shouldLazyLoadImages,
    shouldPreloadNextPage,
    isLowEndDevice,
    connectionSpeed,
  }
}
