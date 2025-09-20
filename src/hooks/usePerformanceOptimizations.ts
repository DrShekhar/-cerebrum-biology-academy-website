'use client'

import { useEffect, useCallback } from 'react'
import { LoadingPriority } from '@/components/performance/LoadingPriority'

// Main performance optimization hook
export function usePerformanceOptimizations() {
  // Load critical content immediately
  const loadCritical = useCallback(() => {
    const criticalSections = LoadingPriority.immediate

    criticalSections.forEach((sectionId) => {
      const element = document.querySelector(`[data-section="${sectionId}"]`)
      if (element) {
        element.classList.add('critical-loaded')
        // Ensure critical content is visible immediately
        element.style.opacity = '1'
        element.style.transform = 'none'
      }
    })

    // Dispatch event for analytics
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('criticalContentLoaded', {
          detail: {
            timestamp: performance.now(),
            sections: criticalSections,
          },
        })
      )
    }
  }, [])

  // Set up intersection observer for lazy loading
  const setupLazyLoading = useCallback(() => {
    const observerOptions = {
      rootMargin: '50px 0px', // Start loading 50px before element enters viewport
      threshold: 0.1, // Trigger when 10% of element is visible
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement
          const sectionId = element.getAttribute('data-lazy')

          if (sectionId) {
            // Load the section
            loadSection(element, sectionId)
            observer.unobserve(element)
          }
        }
      })
    }, observerOptions)

    // Observe all lazy-loadable elements
    const lazyElements = document.querySelectorAll('[data-lazy]')
    lazyElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Load individual section
  const loadSection = useCallback((element: HTMLElement, sectionId: string) => {
    // Add loaded class for CSS transitions
    element.classList.add('loaded')

    // Apply loading animation
    element.style.opacity = '1'
    element.style.transform = 'translateY(0)'

    // Track loading performance
    const loadTime = performance.now()

    // Dispatch custom event for analytics
    window.dispatchEvent(
      new CustomEvent('sectionLoaded', {
        detail: {
          sectionId,
          timestamp: loadTime,
          element: element.tagName,
        },
      })
    )

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📦 Loaded section: ${sectionId} at ${Math.round(loadTime)}ms`)
    }
  }, [])

  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    // Preload critical images
    const criticalImages = [
      '/images/hero-background.webp',
      '/images/logo.webp',
      '/images/cta-background.webp',
    ]

    criticalImages.forEach((src) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = src
      link.as = 'image'
      document.head.appendChild(link)
    })

    // Preload critical fonts
    const criticalFonts = [{ href: '/fonts/inter-var.woff2', type: 'font/woff2' }]

    criticalFonts.forEach((font) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = font.href
      link.as = 'font'
      link.type = font.type
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })

    // DNS prefetch for external resources
    const externalDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://checkout.razorpay.com',
    ]

    externalDomains.forEach((domain) => {
      const link = document.createElement('link')
      link.rel = 'dns-prefetch'
      link.href = domain
      document.head.appendChild(link)
    })
  }, [])

  // Optimize for Indian networks
  const optimizeForIndianNetworks = useCallback(() => {
    // Detect Indian timezone/locale
    const isIndianUser =
      Intl.DateTimeFormat().resolvedOptions().timeZone.includes('Asia/Kolkata') ||
      navigator.language.includes('hi') ||
      navigator.language.includes('en-IN')

    if (isIndianUser) {
      // Add India-specific performance optimizations
      document.documentElement.classList.add('indian-network-optimization')

      // More conservative lazy loading for slower networks
      const lazyElements = document.querySelectorAll('[data-lazy]')
      lazyElements.forEach((el) => {
        ;(el as HTMLElement).style.setProperty('--lazy-transition', '0.3s')
      })

      // Reduce animation complexity
      document.documentElement.style.setProperty('--animation-complexity', 'reduced')
    }
  }, [])

  // Monitor performance metrics
  const monitorPerformance = useCallback(() => {
    // Track page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (window.performance?.timing) {
          const timing = window.performance.timing
          const metrics = {
            domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
            loadComplete: timing.loadEventEnd - timing.navigationStart,
            firstByte: timing.responseStart - timing.navigationStart,
          }

          // Log performance metrics in development
          if (process.env.NODE_ENV === 'development') {
            console.table({
              'DOM Ready': `${metrics.domContentLoaded}ms`,
              'Load Complete': `${metrics.loadComplete}ms`,
              'First Byte': `${metrics.firstByte}ms`,
            })
          }

          // Send to analytics if available
          if (window.gtag) {
            window.gtag('event', 'performance_timing', {
              event_category: 'Performance',
              custom_parameter_1: metrics.domContentLoaded,
              custom_parameter_2: metrics.loadComplete,
              custom_parameter_3: metrics.firstByte,
            })
          }
        }
      }, 0)
    })

    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.entryType === 'largest-contentful-paint') {
              const lcp = entry.startTime
              if (process.env.NODE_ENV === 'development') {
                console.log(`🎯 LCP: ${Math.round(lcp)}ms`)
              }
            }
          })
        })

        observer.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch (e) {
        console.warn('Performance Observer not supported')
      }
    }
  }, [])

  // Initialize all optimizations
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Load critical content immediately
    loadCritical()

    // Setup lazy loading
    const cleanupLazyLoading = setupLazyLoading()

    // Preload critical resources
    preloadCriticalResources()

    // Optimize for Indian networks
    optimizeForIndianNetworks()

    // Monitor performance
    monitorPerformance()

    // Cleanup
    return () => {
      cleanupLazyLoading?.()
    }
  }, [
    loadCritical,
    setupLazyLoading,
    preloadCriticalResources,
    optimizeForIndianNetworks,
    monitorPerformance,
  ])

  return {
    loadCritical,
    loadSection,
    setupLazyLoading,
  }
}

// Hook for on-demand content loading
export function useOnDemandLoader() {
  const loadOnDemandContent = useCallback(async (contentId: string) => {
    const element = document.querySelector(`[data-on-demand="${contentId}"]`)
    if (!element) return

    // Show loading state
    element.classList.add('loading')

    try {
      // Simulate content loading delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Load content
      element.classList.remove('loading')
      element.classList.add('loaded')

      // Track on-demand loading
      window.dispatchEvent(
        new CustomEvent('onDemandContentLoaded', {
          detail: { contentId, timestamp: performance.now() },
        })
      )
    } catch (error) {
      console.error('Failed to load on-demand content:', error)
      element.classList.remove('loading')
      element.classList.add('error')
    }
  }, [])

  return { loadOnDemandContent }
}

// Hook for video lazy loading
export function useVideoLazyLoading() {
  const setupVideoLazyLoading = useCallback(() => {
    const videoElements = document.querySelectorAll('video[data-lazy-video]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target as HTMLVideoElement
            const src = video.getAttribute('data-lazy-video')

            if (src) {
              video.src = src
              video.load()
              video.removeAttribute('data-lazy-video')
              observer.unobserve(video)
            }
          }
        })
      },
      { threshold: 0.25 }
    )

    videoElements.forEach((video) => observer.observe(video))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cleanup = setupVideoLazyLoading()
      return cleanup
    }
  }, [setupVideoLazyLoading])

  return { setupVideoLazyLoading }
}
