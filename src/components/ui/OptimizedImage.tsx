'use client'

import Image, { ImageProps } from 'next/image'
import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { useLazyLoad, useSlowConnection, useReducedMotion } from '@/hooks/usePerformance'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string
  showSkeleton?: boolean
  aspectRatio?: string
  containerClassName?: string
  enableLazyLoad?: boolean
  rootMargin?: string
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.webp',
  showSkeleton = true,
  aspectRatio,
  containerClassName,
  className,
  enableLazyLoad = true,
  rootMargin = '200px',
  priority,
  quality,
  sizes,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [ref, shouldLoad] = useLazyLoad(rootMargin)
  const isSlowConnection = useSlowConnection()
  const reducedMotion = useReducedMotion()

  const adaptiveQuality = quality ?? (isSlowConnection ? 60 : 80)

  const adaptiveSizes =
    sizes ?? (isSlowConnection ? '(max-width: 640px) 50vw, 33vw' : '(max-width: 768px) 100vw, 50vw')

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
  }, [])

  const shouldRender = priority || !enableLazyLoad || shouldLoad

  return (
    <div
      ref={enableLazyLoad && !priority ? ref : undefined}
      className={cn('relative overflow-hidden', containerClassName)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {showSkeleton && !isLoaded && (
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200',
            !reducedMotion && 'animate-shimmer',
            'bg-[length:200%_100%]'
          )}
          aria-hidden="true"
        />
      )}

      {shouldRender && (
        <Image
          src={hasError ? fallbackSrc : src}
          alt={alt}
          quality={adaptiveQuality}
          sizes={adaptiveSizes}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          priority={priority}
          {...props}
        />
      )}
    </div>
  )
}

interface ResponsiveImageProps extends OptimizedImageProps {
  mobileSrc?: string
  tabletSrc?: string
  desktopSrc?: string
}

export function ResponsiveImage({
  src,
  mobileSrc,
  tabletSrc,
  desktopSrc,
  ...props
}: ResponsiveImageProps) {
  return (
    <picture>
      {mobileSrc && <source media="(max-width: 640px)" srcSet={mobileSrc} />}
      {tabletSrc && <source media="(max-width: 1024px)" srcSet={tabletSrc} />}
      {desktopSrc && <source media="(min-width: 1025px)" srcSet={desktopSrc} />}
      <OptimizedImage src={src} {...props} />
    </picture>
  )
}

export function BackgroundImage({
  src,
  alt,
  children,
  className,
  overlayClassName,
  ...props
}: OptimizedImageProps & { children?: React.ReactNode; overlayClassName?: string }) {
  return (
    <div className={cn('relative', className)}>
      <OptimizedImage src={src} alt={alt} fill className="object-cover" sizes="100vw" {...props} />
      {overlayClassName && <div className={cn('absolute inset-0', overlayClassName)} />}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  )
}
