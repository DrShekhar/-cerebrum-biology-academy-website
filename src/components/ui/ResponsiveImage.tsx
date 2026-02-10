'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Responsive image configuration
interface ImageSource {
  media?: string
  srcSet: string
  type?: string
}

interface ResponsiveImageProps {
  src: string // Fallback/desktop image
  alt: string
  sources?: ImageSource[]
  width: number
  height: number
  className?: string
  priority?: boolean // For above-the-fold images
  placeholder?: 'blur' | 'empty' | 'skeleton'
  blurDataURL?: string
  sizes?: string
  onLoad?: () => void
  onError?: () => void
  lazy?: boolean
}

export function ResponsiveImage({
  src,
  alt,
  sources = [],
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'skeleton',
  blurDataURL,
  sizes,
  onLoad,
  onError,
  lazy = true,
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(!lazy || priority)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const pictureRef = useRef<HTMLElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !lazy) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px 0px', // Start loading 50px before entering viewport
        threshold: 0.1,
      }
    )

    if (pictureRef.current) {
      observer.observe(pictureRef.current)
    }

    return () => observer.disconnect()
  }, [priority, lazy])

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  // Handle image error
  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  // Generate WebP sources for better compression
  const generateWebPSources = () => {
    const webpSources: ImageSource[] = []

    // Add WebP versions of custom sources
    sources.forEach((source) => {
      if (!source.srcSet.includes('.webp')) {
        webpSources.push({
          ...source,
          srcSet: source.srcSet.replace(/\.(jpg|jpeg|png)/g, '.webp'),
          type: 'image/webp',
        })
      }
    })

    // Add WebP version of main image
    if (!src.includes('.webp')) {
      webpSources.push({
        srcSet: src.replace(/\.(jpg|jpeg|png)/g, '.webp'),
        type: 'image/webp',
      })
    }

    return webpSources
  }

  const webpSources = generateWebPSources()
  const allSources = [...webpSources, ...sources]

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      {/* Placeholder */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {placeholder === 'skeleton' && (
              <div className="w-full h-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-pulse" />
            )}
            {placeholder === 'blur' && blurDataURL && (
              <img
                src={blurDataURL}
                alt=""
                className="w-full h-full object-cover filter blur-sm scale-110"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
          <div className="text-center text-slate-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
            <p className="text-sm">Image not available</p>
          </div>
        </div>
      )}

      {/* Main Image */}
      {isInView && (
        <picture ref={pictureRef}>
          {/* WebP Sources */}
          {allSources.map((source, index) => (
            <source
              key={index}
              media={source.media}
              srcSet={source.srcSet}
              type={source.type}
              sizes={sizes}
            />
          ))}

          {/* Fallback Image */}
          <motion.img
            ref={imgRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </picture>
      )}
    </div>
  )
}

// Hero Image Component (for above-the-fold usage)
export function HeroImage() {
  return (
    <ResponsiveImage
      src="/images/hero-desktop.webp"
      alt="Cerebrum Biology Academy - Best NEET Biology Coaching"
      width={1920}
      height={1080}
      priority={true}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      sizes="100vw"
      className="absolute inset-0 z-0"
    />
  )
}

// Course Card Image Component
interface CourseImageProps {
  courseId: string
  courseName: string
  className?: string
}

export function CourseImage({ courseId, courseName, className = '' }: CourseImageProps) {
  return (
    <ResponsiveImage
      src={`/images/courses/${courseId}-desktop.webp`}
      alt={`${courseName} - NEET Biology Course`}
      width={400}
      height={240}
      sources={[
        {
          media: '(max-width: 640px)',
          srcSet: `/images/courses/${courseId}-mobile.webp`,
        },
        {
          media: '(max-width: 1024px)',
          srcSet: `/images/courses/${courseId}-tablet.webp`,
        },
      ]}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
      className={className}
      placeholder="skeleton"
    />
  )
}

// Faculty Profile Image Component
interface FacultyImageProps {
  facultyId: string
  facultyName: string
  className?: string
}

export function FacultyImage({ facultyId, facultyName, className = '' }: FacultyImageProps) {
  return (
    <ResponsiveImage
      src={`/images/faculty/${facultyId}.webp`}
      alt={`${facultyName} - NEET Biology Faculty`}
      width={300}
      height={300}
      className={`rounded-full ${className}`}
      placeholder="skeleton"
      sizes="(max-width: 640px) 120px, (max-width: 1024px) 200px, 300px"
    />
  )
}

// Testimonial Image Component
interface TestimonialImageProps {
  studentId: string
  studentName: string
  className?: string
}

export function TestimonialImage({
  studentId,
  studentName,
  className = '',
}: TestimonialImageProps) {
  return (
    <ResponsiveImage
      src={`/images/testimonials/${studentId}.webp`}
      alt={`${studentName} - NEET Success Story`}
      width={80}
      height={80}
      className={`rounded-full ${className}`}
      placeholder="skeleton"
      sizes="80px"
    />
  )
}

// Lazy Image Hook for custom implementations
export function useLazyImage(src: string, options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
        ...options,
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [options])

  return {
    imgRef,
    isInView,
    isLoaded,
    setIsLoaded,
    src: isInView ? src : undefined,
  }
}

// Image optimization utilities
export const ImageUtils = {
  // Generate different size variants
  generateSrcSet: (basePath: string, sizes: number[]) => {
    return sizes.map((size) => `${basePath}?w=${size} ${size}w`).join(', ')
  },

  // Create blur data URL from image
  createBlurDataURL: (width: number = 10, height: number = 10) => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')

    if (ctx) {
      // Create a simple gradient blur
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, '#f1f5f9')
      gradient.addColorStop(1, '#e2e8f0')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
    }

    return canvas.toDataURL('image/jpeg', 0.1)
  },

  // Get optimal image format based on browser support
  getOptimalFormat: () => {
    if (typeof window === 'undefined') return 'webp'

    // Check WebP support
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const ctx = canvas.getContext('2d')

    if (ctx && canvas.toDataURL('image/webp').indexOf('image/webp') === 5) {
      return 'webp'
    }

    return 'jpg'
  },
}
