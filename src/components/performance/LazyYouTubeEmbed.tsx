'use client'

import { useState, useRef, useCallback, memo } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

interface LazyYouTubeEmbedProps {
  videoId: string
  title: string
  thumbnailUrl?: string
  thumbnailQuality?: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault'
  className?: string
  aspectRatio?: 'video' | '16/9' | '4/3'
  autoplay?: boolean
  showTitle?: boolean
  playButtonSize?: 'sm' | 'md' | 'lg'
  onPlay?: () => void
  onLoad?: () => void
  // Badge props for customization
  badge?: {
    text: string
    className?: string
  }
  duration?: string
}

/**
 * LazyYouTubeEmbed Component - Optimized for LCP Performance
 *
 * This component addresses the LCP issue caused by YouTube embeds by:
 * 1. Showing a lightweight thumbnail image immediately (fast LCP)
 * 2. Only loading the heavy YouTube iframe when user clicks play
 * 3. Using YouTube's thumbnail API for fast image loading
 * 4. Preventing iframe from blocking the main thread during initial load
 *
 * This technique is known as "facade pattern" and can improve LCP by 1-3 seconds
 */
export const LazyYouTubeEmbed = memo(function LazyYouTubeEmbed({
  videoId,
  title,
  thumbnailUrl,
  thumbnailQuality = 'maxresdefault',
  className = '',
  aspectRatio = 'video',
  autoplay = true,
  showTitle = false,
  playButtonSize = 'lg',
  onPlay,
  onLoad,
  badge,
  duration,
}: LazyYouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false)
  const [thumbnailError, setThumbnailError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate YouTube thumbnail URL
  const getThumbnailUrl = useCallback(() => {
    if (thumbnailUrl) return thumbnailUrl

    // Try maxresdefault first, fallback to hqdefault on error
    if (thumbnailError) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    }
    return `https://img.youtube.com/vi/${videoId}/${thumbnailQuality}.jpg`
  }, [videoId, thumbnailUrl, thumbnailQuality, thumbnailError])

  // Generate YouTube embed URL with optimized params
  const getEmbedUrl = useCallback(() => {
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      rel: '0', // Don't show related videos from other channels
      modestbranding: '1', // Minimal YouTube branding
      playsinline: '1', // Play inline on mobile
      enablejsapi: '1', // Enable JS API for better control
    })
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
  }, [videoId, autoplay])

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
    onPlay?.()

    // Track video interaction for analytics
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
      ;(window as unknown as { gtag: Function }).gtag('event', 'video_play', {
        event_category: 'engagement',
        event_label: `youtube_${videoId}`,
        value: 1,
      })
    }
  }, [videoId, onPlay])

  const handleIframeLoad = useCallback(() => {
    setIframeLoaded(true)
    onLoad?.()
  }, [onLoad])

  const handleThumbnailError = useCallback(() => {
    if (!thumbnailError) {
      setThumbnailError(true)
    } else {
      // Both thumbnail options failed, still show the play button
      setThumbnailLoaded(true)
    }
  }, [thumbnailError])

  // Play button sizes
  const buttonSizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  }

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  // Aspect ratio classes
  const aspectClasses = {
    video: 'aspect-video',
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-gray-900 rounded-xl ${aspectClasses[aspectRatio]} ${className}`}
    >
      {/* Thumbnail - Always render for fast LCP */}
      {!isPlaying && (
        <div className="absolute inset-0">
          {/* Low-quality placeholder while thumbnail loads */}
          {!thumbnailLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-white/20 border-t-white/60 rounded-full animate-spin" />
            </div>
          )}

          <Image
            src={getThumbnailUrl()}
            alt={title}
            fill
            className={`object-cover transition-opacity duration-300 ${thumbnailLoaded ? 'opacity-100' : 'opacity-0'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setThumbnailLoaded(true)}
            onError={handleThumbnailError}
          />

          {/* Dark overlay for better visibility */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

          {/* Badge (optional) */}
          {badge && (
            <div
              className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${badge.className || 'bg-white/90 text-gray-900'}`}
            >
              {badge.text}
            </div>
          )}

          {/* Duration badge (optional) */}
          {duration && (
            <div className="absolute bottom-4 right-4 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
              {duration}
            </div>
          )}

          {/* Title overlay (optional) */}
          {showTitle && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white font-semibold line-clamp-2">{title}</h3>
            </div>
          )}

          {/* Play Button */}
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center group cursor-pointer"
            aria-label={`Play video: ${title}`}
          >
            <div
              className={`${buttonSizes[playButtonSize]} bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}
            >
              <Play className={`${iconSizes[playButtonSize]} text-white ml-0.5`} fill="white" />
            </div>
          </button>
        </div>
      )}

      {/* YouTube iframe - Only load when user clicks play */}
      {isPlaying && (
        <>
          {/* Loading indicator while iframe loads */}
          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="text-center text-white">
                <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm opacity-80">Loading video...</p>
              </div>
            </div>
          )}

          <iframe
            src={getEmbedUrl()}
            title={title}
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={handleIframeLoad}
          />
        </>
      )}
    </div>
  )
})

export default LazyYouTubeEmbed
