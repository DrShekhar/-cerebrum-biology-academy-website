'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play, Pause, Volume2, VolumeX, Maximize, X, Star } from 'lucide-react'
interface VideoTestimonialProps {
  id: string
  studentName: string
  college: string
  neetScore: number
  improvement: number
  videoUrl: string
  thumbnailUrl: string
  duration: string
  achievement: string
  quote: string
  onPlay?: () => void
}

export function VideoTestimonial({
  id,
  studentName,
  college,
  neetScore,
  improvement,
  videoUrl,
  thumbnailUrl,
  duration,
  achievement,
  quote,
  onPlay,
}: VideoTestimonialProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (onPlay && !isPlaying) {
      onPlay()
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <>
      {/* Main Video Card */}
      <div
        className="bg-white rounded-3xl shadow-lg overflow-hidden animate-fadeInUp"
      >
        {/* Video Container */}
        <div
          className="relative aspect-video bg-gray-900 cursor-pointer group"
          onClick={handlePlayPause}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(isPlaying ? false : true)}
        >
          {/* Video/Thumbnail */}
          {isPlaying ? (
            <video
              src={videoUrl}
              autoPlay
              muted={isMuted}
              className="w-full h-full object-cover"
              onEnded={() => setIsPlaying(false)}
            />
          ) : (
            <Image
              src={thumbnailUrl}
              alt={`${studentName} testimonial`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}

          {/* Play Overlay */}
{!isPlaying && (
              <div
                className="absolute inset-0 bg-black/40 flex items-center justify-center animate-fadeInUp"
              >
                <div
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg animate-fadeInUp"
                >
                  <Play className="w-8 h-8 text-blue-600 ml-1" />
                </div>
              </div>
            )}
{/* Video Controls */}
{isPlaying && showControls && (
              <div
                className="absolute bottom-4 left-4 right-4 flex items-center justify-between animate-fadeInUp"
              >
                <div className="flex items-center space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePlayPause()
                    }}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleMute()
                    }}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-white text-sm bg-black/30 px-2 py-1 rounded">
                    {duration}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFullscreen()
                    }}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
{/* Achievement Badge */}
          <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {achievement}
          </div>
        </div>

        {/* Student Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{studentName}</h3>
              <p className="text-blue-600 font-medium">{college}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{neetScore}</div>
              <div className="text-sm text-gray-600">NEET Score</div>
            </div>
          </div>

          {/* Score Improvement */}
          <div className="bg-green-50 rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-green-800 font-semibold">Score Improvement</div>
                <div className="text-green-600 text-sm">Biology Section</div>
              </div>
              <div className="text-3xl font-bold text-green-600">+{improvement}</div>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="text-gray-700 italic mb-4">&ldquo;{quote}&rdquo;</blockquote>

          {/* Rating */}
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-600">5.0 • Verified Student</span>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
{isFullscreen && (
          <div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center animate-fadeInUp"
          >
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full h-full max-w-6xl max-h-full p-4">
              <video
                src={videoUrl}
                autoPlay
                muted={isMuted}
                controls
                className="w-full h-full object-contain"
                onEnded={() => {
                  setIsPlaying(false)
                  setIsFullscreen(false)
                }}
              />
            </div>

            {/* Fullscreen Info Overlay */}
            <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-sm text-white p-4 rounded-2xl">
              <h3 className="font-bold text-lg">{studentName}</h3>
              <p className="text-blue-300">{college}</p>
              <p className="text-green-300">
                NEET Score: {neetScore} (+{improvement} improvement)
              </p>
            </div>
          </div>
        )}
</>
  )
}
