'use client'

import React, { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ImageIcon, Wifi, WifiOff } from 'lucide-react'
import { useIndianMobileOptimizations } from '@/lib/mobile/indianMobileOptimizations'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  quality?: number
  sizes?: string
  fill?: boolean
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  objectPosition?: string
  onLoad?: () => void
  onError?: () => void
  fallback?: React.ReactNode
  lowQualityFirst?: boolean
  progressive?: boolean
  webpFallback?: boolean
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  quality,
  sizes,
  fill = false,
  objectFit = 'cover',
  objectPosition = 'center',
  onLoad,
  onError,
  fallback,
  lowQualityFirst = true,
  progressive = true,
  webpFallback = true,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState('')
  const [showHighQuality, setShowHighQuality] = useState(false)

  const imgRef = useRef<HTMLImageElement>(null)
  const { isSlowNetwork, getOptimizedImageSrc, shouldReduceAnimations, networkInfo } =
    useIndianMobileOptimizations()

  // Determine optimal image source based on network conditions
  const getImageSource = useCallback(
    (isHighQuality = false) => {
      if (hasError) return ''

      const targetQuality = (() => {
        if (isHighQuality) return quality || 85
        if (isSlowNetwork) return 50
        if (networkInfo?.effectiveType === '3g') return 65
        return quality || 80
      })()

      return getOptimizedImageSrc(src, width, height) + `&q=${targetQuality}`
    },
    [src, width, height, quality, isSlowNetwork, networkInfo, hasError, getOptimizedImageSrc]
  )

  // Progressive loading strategy
  React.useEffect(() => {
    if (!progressive || !lowQualityFirst) {
      setCurrentSrc(getImageSource())
      return
    }

    // Load low quality first for slow networks
    const lowQualitySrc = getImageSource(false)
    setCurrentSrc(lowQualitySrc)

    // Load high quality version after low quality loads
    if (!isSlowNetwork) {
      const timer = setTimeout(() => {
        setShowHighQuality(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [getImageSource, progressive, lowQualityFirst, isSlowNetwork])

  // Handle high quality image loading
  React.useEffect(() => {
    if (!showHighQuality) return

    const highQualityImg = new window.Image()
    highQualityImg.onload = () => {
      setCurrentSrc(getImageSource(true))
    }
    highQualityImg.src = getImageSource(true)
  }, [showHighQuality, getImageSource])

  const handleLoad = useCallback(() => {
    setIsLoading(false)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(() => {
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }, [onError])

  // Intersection Observer for lazy loading optimization
  const [isInView, setIsInView] = useState(priority)

  React.useEffect(() => {
    if (priority || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: isSlowNetwork ? '400px' : '200px', // Load later for slow networks
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority, isInView, isSlowNetwork])

  // Error fallback component
  if (hasError && fallback) {
    return <>{fallback}</>
  }

  if (hasError) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
      >
        <div className="text-center text-gray-400">
          <ImageIcon className="w-8 h-8 mx-auto mb-2" />
          <p className="text-xs">Image unavailable</p>
          {isSlowNetwork && (
            <div className="flex items-center justify-center mt-1 text-xs">
              <WifiOff className="w-3 h-3 mr-1" />
              <span>Slow connection</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Loading placeholder
  if (!isInView || !currentSrc) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-100 animate-pulse flex items-center justify-center ${className}`}
        style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
      >
        <ImageIcon className="w-6 h-6 text-gray-300" />
      </div>
    )
  }

  const imageProps = {
    src: currentSrc,
    alt,
    width: fill ? undefined : width,
    height: fill ? undefined : height,
    className: `${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`,
    onLoad: handleLoad,
    onError: handleError,
    priority,
    placeholder,
    blurDataURL,
    sizes,
    fill,
    style: fill ? { objectFit, objectPosition } : undefined,
    ...props,
  }

  const ImageComponent = () => <Image {...imageProps} />

  // Network status indicator for slow connections
  const NetworkIndicator = () => {
    if (!isSlowNetwork || !isLoading) return null

    return (
      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded flex items-center">
        <Wifi className="w-3 h-3 mr-1" />
        <span>
          {networkInfo?.effectiveType === '2g'
            ? '2G'
            : networkInfo?.effectiveType === '3g'
              ? '3G'
              : 'Slow'}
        </span>
      </div>
    )
  }

  // Progressive enhancement wrapper
  const ProgressiveWrapper = ({ children }: { children: React.ReactNode }) => {
    if (!shouldReduceAnimations) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {children}
        </motion.div>
      )
    }

    return <div className="relative">{children}</div>
  }

  return (
    <ProgressiveWrapper>
      <div className="relative">
        <ImageComponent />

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
            <div className="text-center">
              <ImageIcon className="w-6 h-6 text-gray-300 mx-auto mb-1" />
              {isSlowNetwork && <div className="text-xs text-gray-400">Loading...</div>}
            </div>
          </div>
        )}

        <NetworkIndicator />

        {/* Quality indicator for development */}
        {process.env.NODE_ENV === 'development' && !isLoading && (
          <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
            {isSlowNetwork ? 'LQ' : showHighQuality ? 'HQ' : 'MQ'}
          </div>
        )}
      </div>
    </ProgressiveWrapper>
  )
}

// Preset variants for common use cases
export function HeroImage(props: Omit<OptimizedImageProps, 'priority' | 'sizes'>) {
  return (
    <OptimizedImage
      {...props}
      priority={true}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      progressive={true}
      lowQualityFirst={true}
    />
  )
}

export function CourseCardImage(props: Omit<OptimizedImageProps, 'sizes'>) {
  return (
    <OptimizedImage
      {...props}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      progressive={true}
      lowQualityFirst={true}
    />
  )
}

export function AvatarImage(props: Omit<OptimizedImageProps, 'sizes' | 'objectFit'>) {
  return (
    <OptimizedImage
      {...props}
      sizes="(max-width: 768px) 20vw, 10vw"
      objectFit="cover"
      progressive={false} // Small images don't need progressive loading
      className={`rounded-full ${props.className || ''}`}
    />
  )
}

export function ThumbnailImage(props: Omit<OptimizedImageProps, 'sizes' | 'quality'>) {
  return (
    <OptimizedImage
      {...props}
      sizes="(max-width: 768px) 25vw, 15vw"
      quality={60} // Lower quality for thumbnails
      progressive={false}
    />
  )
}

// Utility hook for image preloading
export function useImagePreloader(imageSources: string[]) {
  const { isSlowNetwork, getOptimizedImageSrc } = useIndianMobileOptimizations()

  React.useEffect(() => {
    if (isSlowNetwork) return // Skip preloading on slow networks

    const preloadImages = imageSources.map((src) => {
      const optimizedSrc = getOptimizedImageSrc(src, 400, 300) // Standard preview size
      const img = new window.Image()
      img.src = optimizedSrc
      return img
    })

    return () => {
      preloadImages.forEach((img) => {
        img.src = '' // Cancel loading
      })
    }
  }, [imageSources, isSlowNetwork, getOptimizedImageSrc])
}
