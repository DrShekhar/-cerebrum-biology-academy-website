'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, ExternalLink, BookOpen } from 'lucide-react'
import { Button } from './Button'
import { LoadingSpinner } from './LoadingStates'

interface VideoShowcaseProps {
  videoId: string
  title: string
  description: string
  category: 'demo' | 'testimonial' | 'faculty' | 'course_preview'
  thumbnailUrl?: string
  duration?: string
  className?: string
  autoplay?: boolean
  showCTA?: boolean
  ctaText?: string
  onCTAClick?: () => void
}

export function VideoShowcase({
  videoId,
  title,
  description,
  category,
  thumbnailUrl,
  duration,
  className = '',
  autoplay = false,
  showCTA = true,
  ctaText = 'Book Free Demo Class',
  onCTAClick,
}: VideoShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const videoRef = useRef<HTMLIFrameElement>(null)

  // Generate YouTube embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}?${new URLSearchParams({
    autoplay: showPlayer ? '1' : '0',
    mute: isMuted ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    enablejsapi: '1',
    origin:
      typeof window !== 'undefined' ? window.location.origin : 'https://cerebrumbiologyacademy.com',
  }).toString()}`

  // Generate thumbnail URL if not provided
  const defaultThumbnail = thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  const handlePlayClick = () => {
    setIsLoading(true)
    setShowPlayer(true)
    setIsPlaying(true)

    // Track video interaction
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'video_play', {
        event_category: 'engagement',
        event_label: `${category}_video_${videoId}`,
        value: 1,
      })
    }

    // Simulate loading time for smooth transition
    setTimeout(() => setIsLoading(false), 1500)
  }

  const handleCTAClick = () => {
    if (onCTAClick) {
      onCTAClick()
    }

    // Track CTA conversion
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'video_cta_click', {
        event_category: 'conversion',
        event_label: `${category}_video_cta`,
        value: 1,
      })
    }
  }

  const getCategoryLabel = () => {
    switch (category) {
      case 'demo':
        return 'Teaching Demo'
      case 'testimonial':
        return 'Student Success'
      case 'faculty':
        return 'Faculty Showcase'
      case 'course_preview':
        return 'Course Preview'
      default:
        return 'Video'
    }
  }

  const getCategoryColor = () => {
    switch (category) {
      case 'demo':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'testimonial':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'faculty':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'course_preview':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className={`video-showcase ${className}`}>
      <motion.div
        className="relative bg-white rounded-2xl shadow-lg overflow-hidden group"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Video Container */}
        <div className="relative aspect-video">
          {!showPlayer ? (
            // Custom Thumbnail with Play Button
            <div className="relative w-full h-full">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-pulse flex items-center justify-center">
                  <LoadingSpinner size="lg" variant="cerebrum" />
                </div>
              )}
              <img
                src={defaultThumbnail}
                alt={title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                decoding="async"
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                  setImageLoaded(true)
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

              {/* Play Button */}
              <motion.button
                className="absolute inset-0 flex items-center justify-center"
                onClick={handlePlayClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 group-hover:bg-white/30 transition-all">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </motion.button>

              {/* Category Badge */}
              <div
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor()}`}
              >
                {getCategoryLabel()}
              </div>

              {/* Duration Badge */}
              {duration && (
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {duration}
                </div>
              )}

              {/* Cerebrum Branding */}
              <div className="absolute top-4 right-4 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                Cerebrum Faculty
              </div>
            </div>
          ) : (
            // YouTube Player with Loading State
            <div className="relative w-full h-full">
              {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-indigo-600/90 flex items-center justify-center z-10">
                  <div className="text-center text-white">
                    <LoadingSpinner size="xl" variant="minimal" className="mb-4" />
                    <p className="text-lg font-medium">Loading Cerebrum Video...</p>
                    <p className="text-sm opacity-80 mt-1">
                      Preparing your Biology learning experience
                    </p>
                  </div>
                </div>
              )}
              <iframe
                ref={videoRef}
                src={embedUrl}
                title={title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={() => setIsLoading(false)}
              />
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {showCTA && (
              <Button variant="primary" size="lg" className="flex-1" onClick={handleCTAClick}>
                <BookOpen className="w-5 h-5 mr-2" />
                {ctaText}
              </Button>
            )}

            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Watch on YouTube
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">Dr. Shekhar Singh - Cerebrum Faculty</span>
            </div>

            <div className="text-right text-sm text-gray-500">
              <div className="font-medium text-green-600">✓ AIIMS Qualified</div>
              <div className="text-xs">Expert NEET Biology Coach</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Hook for video analytics tracking
export function useVideoAnalytics() {
  const trackVideoInteraction = (action: string, videoId: string, category: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', `video_${action}`, {
        event_category: 'video_engagement',
        event_label: `${category}_${videoId}`,
        value: 1,
      })
    }
  }

  const trackVideoConversion = (videoId: string, conversionType: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'video_conversion', {
        event_category: 'conversion',
        event_label: `${conversionType}_from_video_${videoId}`,
        value: 1,
      })
    }
  }

  return { trackVideoInteraction, trackVideoConversion }
}
