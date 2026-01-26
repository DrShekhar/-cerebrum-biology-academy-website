'use client'

import { useState, useRef, useEffect, useCallback, memo } from 'react'
import { MapPin, Navigation, ExternalLink, Loader2 } from 'lucide-react'

interface LazyGoogleMapProps {
  embedUrl: string
  title?: string
  height?: number | string
  className?: string
  placeholder?: {
    lat: number
    lng: number
    address?: string
  }
  showDirectionsButton?: boolean
  showViewAreaButton?: boolean
  onLoad?: () => void
}

/**
 * LazyGoogleMap Component - Optimized for LCP Performance
 *
 * This component addresses the LCP issue caused by Google Maps embeds by:
 * 1. Showing a lightweight static placeholder immediately (fast LCP)
 * 2. Only loading the heavy Google Maps iframe when user interacts
 * 3. Using Intersection Observer to preload when near viewport
 * 4. Preventing iframe from blocking the main thread during initial load
 *
 * This technique can improve LCP by 0.5-1.5 seconds on pages with maps
 */
export const LazyGoogleMap = memo(function LazyGoogleMap({
  embedUrl,
  title = 'Location Map',
  height = 400,
  className = '',
  placeholder,
  showDirectionsButton = true,
  showViewAreaButton = true,
  onLoad,
}: LazyGoogleMapProps) {
  const [isInteracting, setIsInteracting] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [isNearViewport, setIsNearViewport] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Extract coordinates from embed URL if not provided in placeholder
  const getCoordinates = useCallback(() => {
    if (placeholder?.lat && placeholder?.lng) {
      return { lat: placeholder.lat, lng: placeholder.lng }
    }

    // Try to extract from embed URL
    const match = embedUrl.match(/!2d([-\d.]+)!3d([-\d.]+)/)
    if (match) {
      return { lat: parseFloat(match[2]), lng: parseFloat(match[1]) }
    }

    // Try q= parameter format
    const qMatch = embedUrl.match(/[?&]q=([-\d.]+),([-\d.]+)/)
    if (qMatch) {
      return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]) }
    }

    // Default to Delhi coordinates
    return { lat: 28.6139, lng: 77.2090 }
  }, [embedUrl, placeholder])

  const coordinates = getCoordinates()

  // Google Maps directions URL
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`

  // Intersection Observer for preloading
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsNearViewport(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '200px', // Start preloading 200px before in view
        threshold: 0.1,
      }
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  const handleInteraction = useCallback(() => {
    setIsInteracting(true)

    // Track map interaction for analytics
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
      ;(window as unknown as { gtag: Function }).gtag('event', 'map_interaction', {
        event_category: 'engagement',
        event_label: title,
        value: 1,
      })
    }
  }, [title])

  const handleIframeLoad = useCallback(() => {
    setIframeLoaded(true)
    onLoad?.()
  }, [onLoad])

  const heightStyle = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl bg-gray-100 ${className}`}
      style={{ height: heightStyle }}
    >
      {/* Placeholder - Always render for fast LCP */}
      {!isInteracting && (
        <div className="absolute inset-0">
          {/* Static map background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
            {/* Grid pattern to simulate map */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
              }}
            />

            {/* Simulated roads */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/3 left-0 right-0 h-1 bg-gray-400" />
              <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-gray-300" />
              <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-400" />
              <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-gray-300" />
            </div>
          </div>

          {/* Center marker */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Marker shadow */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-black/20 rounded-full blur-sm" />
              {/* Marker */}
              <div className="relative">
                <MapPin className="w-12 h-12 text-red-500 drop-shadow-lg" fill="#ef4444" />
              </div>
            </div>
          </div>

          {/* Click to interact overlay */}
          <button
            onClick={handleInteraction}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 hover:bg-black/20 transition-colors cursor-pointer group"
            aria-label={`Click to interact with ${title}`}
          >
            <div className="bg-white rounded-xl shadow-xl p-6 text-center transform group-hover:scale-105 transition-transform">
              <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <p className="text-gray-900 font-semibold mb-1">Click to load interactive map</p>
              {placeholder?.address && (
                <p className="text-sm text-gray-600 max-w-xs">{placeholder.address}</p>
              )}
            </div>
          </button>

          {/* Action buttons at bottom */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
            {showDirectionsButton && (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-lg"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </a>
            )}
            {showViewAreaButton && (
              <a
                href={`https://www.google.com/maps/@${coordinates.lat},${coordinates.lng},15z`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium shadow-lg border border-gray-200"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View in Maps
              </a>
            )}
          </div>
        </div>
      )}

      {/* Google Maps iframe - Only load when user interacts */}
      {isInteracting && (
        <>
          {/* Loading indicator */}
          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-3" />
                <p className="text-gray-600 text-sm">Loading map...</p>
              </div>
            </div>
          )}

          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={title}
            onLoad={handleIframeLoad}
            className={`absolute inset-0 transition-opacity duration-300 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </>
      )}

      {/* Preload hint when near viewport but not yet interacting */}
      {isNearViewport && !isInteracting && (
        <link rel="preconnect" href="https://maps.googleapis.com" />
      )}
    </div>
  )
})

export default LazyGoogleMap
