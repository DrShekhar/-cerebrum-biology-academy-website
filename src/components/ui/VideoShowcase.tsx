'use client'

import { useState } from 'react'
import { ExternalLink, BookOpen } from 'lucide-react'
import { Button } from './Button'
import { LazyYouTubeEmbed } from '@/components/performance/LazyYouTubeEmbed'

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
  const [hasPlayed, setHasPlayed] = useState(false)

  const handlePlayClick = () => {
    setHasPlayed(true)

    // Track video interaction
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
      ;(window as unknown as { gtag: Function }).gtag('event', 'video_play', {
        event_category: 'engagement',
        event_label: `${category}_video_${videoId}`,
        value: 1,
      })
    }
  }

  const handleCTAClick = () => {
    if (onCTAClick) {
      onCTAClick()
    }

    // Track CTA conversion
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
      ;(window as unknown as { gtag: Function }).gtag('event', 'video_cta_click', {
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
      <div
        className="relative bg-white rounded-2xl shadow-lg overflow-hidden group animate-fadeInUp"
      >
        {/* Video Container - Using LazyYouTubeEmbed for LCP optimization */}
        <LazyYouTubeEmbed
          videoId={videoId}
          title={title}
          thumbnailUrl={thumbnailUrl}
          duration={duration}
          autoplay={autoplay}
          onPlay={handlePlayClick}
          badge={{
            text: getCategoryLabel(),
            className: `border ${getCategoryColor()}`,
          }}
          className="rounded-t-2xl"
        />

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
      </div>
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
