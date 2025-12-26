'use client'

import { useState, useEffect, useRef } from 'react'
import { useMobileOptimization } from '@/lib/performance/mobileOptimization'

interface AdaptiveLoaderProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  threshold?: number
  priority?: 'high' | 'medium' | 'low'
  enableSkeletonLoader?: boolean
}

// Progressive loading skeleton for Indian mobile networks
const SkeletonLoader = ({
  lines = 3,
  height = 'h-4',
  className = '',
}: {
  lines?: number
  height?: string
  className?: string
}) => (
  <div className={`animate-pulse space-y-3 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`bg-gray-200 rounded ${height} ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
      />
    ))}
  </div>
)

// Network-aware loader with Hindi text
const NetworkLoader = ({ message }: { message?: string }) => {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-gray-600 text-sm">
        {message || 'लोड हो रहा है'}
        {dots}
      </p>
      <p className="text-xs text-gray-500 mt-2">धीमे नेटवर्क के लिए अनुकूलित</p>
    </div>
  )
}

// Offline indicator
const OfflineIndicator = () => {
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    setIsOffline(!navigator.onLine)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!isOffline) return null

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 text-sm z-50">
      📶 इंटरनेट कनेक्शन नहीं है • Offline Mode
    </div>
  )
}

// Data usage indicator for Indian users
const DataUsageIndicator = ({ usageMB }: { usageMB: number }) => {
  if (usageMB < 10) return null

  const color = usageMB > 50 ? 'text-red-500' : usageMB > 30 ? 'text-yellow-500' : 'text-green-600'

  return (
    <div
      className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-2 text-xs ${color} border`}
    >
      📊 {usageMB.toFixed(1)} MB डेटा
    </div>
  )
}

export default function AdaptiveLoader({
  children,
  fallback,
  threshold = 1000,
  priority = 'medium',
  enableSkeletonLoader = true,
}: AdaptiveLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const { isDataSaverMode, isLowEndDevice, dataUsageMB, indianNetworkOptimizations } =
    useMobileOptimization()

  // Adaptive threshold based on device and network
  const adaptiveThreshold = isLowEndDevice
    ? threshold * 2
    : isDataSaverMode
      ? threshold * 1.5
      : threshold

  useEffect(() => {
    // Skip loading delay for high priority content
    if (priority === 'high') {
      setIsLoaded(true)
      setShowContent(true)
      return
    }

    // Implement progressive loading strategy
    const loadContent = () => {
      try {
        // Simulate content loading with adaptive timing
        timeoutRef.current = setTimeout(() => {
          setIsLoaded(true)

          // Stagger content display for better perceived performance
          setTimeout(
            () => {
              setShowContent(true)
            },
            isLowEndDevice ? 200 : 100
          )
        }, adaptiveThreshold)
      } catch (err) {
        setError('Loading failed')
        console.error('AdaptiveLoader error:', err)
      }
    }

    // Use Intersection Observer for lazy loading on mobile
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadContent()
              observer.disconnect()
            }
          })
        },
        {
          rootMargin: isDataSaverMode ? '50px' : '100px',
          threshold: 0.1,
        }
      )

      if (containerRef.current) {
        observer.observe(containerRef.current)
      }

      return () => {
        observer.disconnect()
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    } else {
      // Fallback for older browsers
      loadContent()
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [adaptiveThreshold, priority, isLowEndDevice, isDataSaverMode])

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-red-500 mb-4">⚠️</div>
        <p className="text-gray-600 text-sm mb-2">लोडिंग में समस्या</p>
        <p className="text-xs text-gray-500">कृपया दोबारा कोशिश करें</p>
        <button
          onClick={() => {
            setError(null)
            setIsLoaded(false)
            setShowContent(false)
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded text-sm"
        >
          Retry
        </button>
      </div>
    )
  }

  // Show content when loaded
  if (isLoaded && showContent) {
    return (
      <>
        <OfflineIndicator />
        <div ref={containerRef} className={isDataSaverMode ? 'data-saver' : ''}>
          {children}
        </div>
        <DataUsageIndicator usageMB={dataUsageMB} />
      </>
    )
  }

  // Loading state with different strategies
  return (
    <div ref={containerRef} className="min-h-[200px] flex items-center justify-center">
      <OfflineIndicator />

      {/* Custom fallback */}
      {fallback && fallback}

      {/* Default loading states */}
      {!fallback && (
        <>
          {/* Skeleton loader for better UX */}
          {enableSkeletonLoader && isDataSaverMode && (
            <div className="w-full max-w-md p-4">
              <SkeletonLoader lines={4} className="mb-4" />
              <SkeletonLoader lines={2} height="h-3" />
            </div>
          )}

          {/* Network-aware loader */}
          {(!enableSkeletonLoader || !isDataSaverMode) && (
            <NetworkLoader
              message={
                indianNetworkOptimizations.optimizeFor2G
                  ? '2G नेटवर्क के लिए अनुकूलित'
                  : indianNetworkOptimizations.optimizeFor3G
                    ? '3G नेटवर्क के लिए अनुकूलित'
                    : isLowEndDevice
                      ? 'मोबाइल के लिए अनुकूलित'
                      : 'लोड हो रहा है'
              }
            />
          )}
        </>
      )}

      <DataUsageIndicator usageMB={dataUsageMB} />
    </div>
  )
}

// Specialized loaders for different content types
export const ImageLoader = ({
  src,
  alt,
  className = '',
  priority = 'medium',
}: {
  src: string
  alt: string
  className?: string
  priority?: 'high' | 'medium' | 'low'
}) => {
  const { shouldPreloadImages, optimalImageQuality, isDataSaverMode } = useMobileOptimization()

  if (isDataSaverMode && priority === 'low') {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">📷</span>
      </div>
    )
  }

  return (
    <AdaptiveLoader priority={priority} enableSkeletonLoader={false}>
      <img
        src={src}
        alt={alt}
        className={className}
        loading={shouldPreloadImages ? 'eager' : 'lazy'}
        style={{
          filter: `contrast(${optimalImageQuality}%)`,
        }}
      />
    </AdaptiveLoader>
  )
}

export const VideoLoader = ({
  src,
  poster,
  className = '',
  controls = true,
}: {
  src: string
  poster?: string
  className?: string
  controls?: boolean
}) => {
  const { isDataSaverMode } = useMobileOptimization()

  if (isDataSaverMode) {
    return (
      <div className={`bg-gray-200 flex flex-col items-center justify-center p-8 ${className}`}>
        <div className="text-4xl mb-2">📹</div>
        <p className="text-gray-600 text-sm text-center">डेटा बचाने के लिए वीडियो बंद</p>
        <p className="text-xs text-gray-500 mt-1">WiFi पर स्विच करें</p>
      </div>
    )
  }

  return (
    <AdaptiveLoader priority="low">
      <video
        src={src}
        poster={poster}
        className={className}
        controls={controls}
        preload="metadata"
        playsInline
      />
    </AdaptiveLoader>
  )
}
