'use client'

import { useState, useRef, useEffect, useCallback, memo } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

interface LazyVideoProps {
  src: string
  poster: string
  alt?: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
  controls?: boolean
  preloadPoster?: boolean
  onPlay?: () => void
  onLoad?: () => void
}

/**
 * LazyVideo Component - Optimized for LCP Performance
 *
 * This component addresses the LCP issue by:
 * 1. Showing a poster image immediately (fast LCP)
 * 2. Only loading the video when user clicks play or scrolls into view
 * 3. Using Intersection Observer for efficient lazy loading
 * 4. Preventing video from blocking the main thread during initial load
 */
export const LazyVideo = memo(function LazyVideo({
  src,
  poster,
  alt = 'Video thumbnail',
  className = '',
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
  controls = true,
  preloadPoster = true,
  onPlay,
  onLoad,
}: LazyVideoProps) {
  const [isInView, setIsInView] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [posterLoaded, setPosterLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '100px', // Start loading slightly before in view
        threshold: 0.1,
      }
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
    onPlay?.()

    // Small delay to ensure video element is mounted
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(console.error)
      }
    }, 100)
  }, [onPlay])

  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true)
    onLoad?.()
  }, [onLoad])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-gray-900 ${className}`}
    >
      {/* Poster Image - Always render for fast LCP */}
      {!isPlaying && (
        <div className="absolute inset-0">
          {/* Low-quality placeholder while poster loads */}
          {!posterLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 animate-pulse" />
          )}

          <Image
            src={poster}
            alt={alt}
            fill
            className={`object-cover transition-opacity duration-300 ${posterLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority={preloadPoster}
            onLoad={() => setPosterLoaded(true)}
            onError={() => setPosterLoaded(true)} // Still show play button on error
          />

          {/* Dark overlay for better play button visibility */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Play Button */}
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center group cursor-pointer"
            aria-label="Play video"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
              <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="white" />
            </div>
          </button>
        </div>
      )}

      {/* Video Element - Only load when in view and playing */}
      {isInView && isPlaying && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay || isPlaying}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          controls={controls}
          preload="auto"
          onLoadedData={handleVideoLoaded}
          className={`w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* Loading indicator while video loads */}
      {isPlaying && !videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
})

export default LazyVideo
