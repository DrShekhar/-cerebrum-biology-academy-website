'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Star, BookOpen, Award } from 'lucide-react'

interface VideoTestimonialProps {
  videoId: string
  studentName: string
  achievement: string
  score: string
  college: string
  thumbnailUrl?: string
  duration?: string
  className?: string
}

export function VideoTestimonial({
  videoId,
  studentName,
  achievement,
  score,
  college,
  thumbnailUrl,
  duration = '2:45',
  className = '',
}: VideoTestimonialProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Generate YouTube embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
  const defaultThumbnail = thumbnailUrl || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  const handlePlayClick = () => {
    setIsPlaying(true)

    // Track testimonial video interaction
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'testimonial_video_play', {
        event_category: 'engagement',
        event_label: `student_${studentName.replace(/\s+/g, '_').toLowerCase()}`,
        value: 1,
      })
    }
  }

  return (
    <motion.div
      className={`video-testimonial bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Video Container */}
      <div className="relative aspect-video">
        {!isPlaying ? (
          // Thumbnail with Play Button
          <div className="relative w-full h-full group cursor-pointer" onClick={handlePlayClick}>
            <img
              src={defaultThumbnail}
              alt={`${studentName}'s success story`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 group-hover:bg-white/30 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-1" fill="white" />
              </motion.div>
            </div>

            {/* Success Badge */}
            <div className="absolute top-4 left-4 bg-[#4a5d4a] text-white px-3 py-1 rounded-full text-sm font-semibold">
              ✓ Success Story
            </div>

            {/* Duration */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {duration}
            </div>

            {/* Cerebrum Badge */}
            <div className="absolute top-4 right-4 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Cerebrum Student
            </div>
          </div>
        ) : (
          // YouTube Player
          <iframe
            src={embedUrl}
            title={`${studentName}'s Success Story`}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>

      {/* Student Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{studentName}</h3>
            <p className="text-green-600 font-semibold text-sm mb-2">{achievement}</p>
            <p className="text-gray-600 text-sm">{college}</p>
          </div>

          {/* Score Badge */}
          <div className="bg-gradient-to-r from-green-50 to-green-50 border border-green-200 rounded-lg px-3 py-2 text-center">
            <div className="text-lg font-bold text-green-700">{score}</div>
            <div className="text-xs text-green-600">NEET Score</div>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400 mr-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <span className="text-sm text-gray-600">5.0 • Cerebrum Graduate</span>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-600">
            <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
            <span>Cerebrum Biology Academy</span>
          </div>

          <div className="flex items-center text-sm text-green-600">
            <Award className="w-4 h-4 mr-1" />
            <span className="font-medium">Medical College</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Compact version for grid layouts
export function CompactVideoTestimonial({
  videoId,
  studentName,
  achievement,
  score,
  className = '',
}: Omit<VideoTestimonialProps, 'college' | 'thumbnailUrl' | 'duration'>) {
  const [isPlaying, setIsPlaying] = useState(false)
  const defaultThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  const handlePlayClick = () => {
    setIsPlaying(true)

    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'compact_testimonial_play', {
        event_category: 'engagement',
        event_label: studentName.replace(/\s+/g, '_').toLowerCase(),
        value: 1,
      })
    }
  }

  return (
    <motion.div
      className={`compact-video-testimonial bg-white rounded-xl shadow-md overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Compact Video */}
      <div className="relative aspect-video">
        {!isPlaying ? (
          <div className="relative w-full h-full group cursor-pointer" onClick={handlePlayClick}>
            <img
              src={defaultThumbnail}
              alt={`${studentName}'s testimonial`}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border border-white/50">
                <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
              </div>
            </div>
            <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
              ✓ Success
            </div>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
          />
        )}
      </div>

      {/* Compact Info */}
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 text-sm mb-1">{studentName}</h4>
        <p className="text-green-600 text-xs font-medium mb-2">{achievement}</p>
        <div className="flex items-center justify-between">
          <div className="flex text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-3 h-3 fill-current" />
            ))}
          </div>
          <span className="text-sm font-bold text-green-700">{score}</span>
        </div>
      </div>
    </motion.div>
  )
}
