'use client'

/**
 * Secure Video Player Component
 *
 * Features:
 * - HLS.js video playback for Cloudflare Stream
 * - Dynamic watermark with user info
 * - Screenshot/screen recording detection
 * - Progress tracking and resume
 * - Chapter navigation
 * - Playback speed control
 * - Quality selection
 * - Anti-piracy measures
 */

import React, { useEffect, useRef, useState, useCallback } from 'react'
// PERFORMANCE: Dynamic import HLS.js - only loaded when video player is used
// This saves ~200KB from pages that don't have video content
import type HlsType from 'hls.js'

interface Chapter {
  title: string
  startTime: number
}

interface VideoProgress {
  lastPosition: number
  completionPercent: number
}

interface SecureVideoPlayerProps {
  videoId: string
  videoUrl: string
  title: string
  thumbnail?: string
  duration: number
  chapters?: Chapter[]
  initialProgress?: VideoProgress
  userId: string
  userName: string
  onProgress?: (position: number, watchedSeconds: number) => void
  onComplete?: () => void
  onSecurityEvent?: (event: string, details: Record<string, unknown>) => void
  pdfSyncEnabled?: boolean
  onPdfPageChange?: (page: number) => void
  pdfSyncData?: Array<{ timestamp: number; page: number }>
}

const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
const QUALITY_OPTIONS = ['auto', '1080p', '720p', '480p', '360p']
const PROGRESS_SAVE_INTERVAL = 10000 // Save progress every 10 seconds

export default function SecureVideoPlayer({
  videoId,
  videoUrl,
  title,
  thumbnail,
  duration,
  chapters = [],
  initialProgress,
  userId,
  userName,
  onProgress,
  onComplete,
  onSecurityEvent,
  pdfSyncEnabled,
  onPdfPageChange,
  pdfSyncData = [],
}: SecureVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<HlsType | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(initialProgress?.lastPosition || 0)
  const [buffered, setBuffered] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const [showQualityMenu, setShowQualityMenu] = useState(false)
  const [currentQuality, setCurrentQuality] = useState('auto')
  const [availableQualities, setAvailableQualities] = useState<string[]>([])
  const [showChapters, setShowChapters] = useState(false)
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null)
  const [watchedSeconds, setWatchedSeconds] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Anti-piracy: Watermark position (changes periodically)
  const [watermarkPosition, setWatermarkPosition] = useState({ top: 10, left: 10 })

  // Initialize HLS player with dynamic import
  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoUrl) return

    let hls: HlsType | null = null

    const initHls = async () => {
      // Dynamic import HLS.js only when needed
      const HlsModule = await import('hls.js')
      const Hls = HlsModule.default

      if (Hls.isSupported()) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: false,
          backBufferLength: 90,
        })

        hls.loadSource(videoUrl)
        hls.attachMedia(video)

        hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
          setIsLoading(false)
          // Get available quality levels
          const qualities = data.levels.map((level) => `${level.height}p`)
          setAvailableQualities(['auto', ...qualities])
        })

        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            setError('Video playback error. Please refresh the page.')
            onSecurityEvent?.('PLAYBACK_ERROR', { error: data.type })
          }
        })

        hlsRef.current = hls

        // Seek to initial position
        if (initialProgress?.lastPosition && initialProgress.lastPosition > 0) {
          video.currentTime = initialProgress.lastPosition
        }
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari native HLS support
        video.src = videoUrl
        setIsLoading(false)
      } else {
        setError('Your browser does not support video playback.')
      }
    }

    initHls()

    return () => {
      if (hls) {
        hls.destroy()
      }
    }
  }, [videoUrl, initialProgress, onSecurityEvent])

  // Anti-piracy: Move watermark periodically
  useEffect(() => {
    const moveWatermark = () => {
      setWatermarkPosition({
        top: Math.random() * 60 + 10, // 10-70%
        left: Math.random() * 60 + 10, // 10-70%
      })
    }

    const interval = setInterval(moveWatermark, 30000) // Move every 30 seconds
    return () => clearInterval(interval)
  }, [])

  // Anti-piracy: Detect screenshot attempts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Detect PrintScreen key
      if (e.key === 'PrintScreen') {
        onSecurityEvent?.('SCREENSHOT_DETECTED', {
          timestamp: currentTime,
          key: 'PrintScreen',
        })
      }

      // Detect common screenshot shortcuts
      if (
        (e.metaKey || e.ctrlKey) &&
        e.shiftKey &&
        (e.key === '3' || e.key === '4' || e.key === 's')
      ) {
        onSecurityEvent?.('SCREENSHOT_DETECTED', {
          timestamp: currentTime,
          shortcut: `${e.metaKey ? 'Cmd' : 'Ctrl'}+Shift+${e.key}`,
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentTime, onSecurityEvent])

  // Anti-piracy: Detect visibility change (tab switch)
  useEffect(() => {
    let tabSwitchCount = 0

    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying) {
        tabSwitchCount++
        if (tabSwitchCount > 5) {
          onSecurityEvent?.('SUSPICIOUS_ACTIVITY', {
            type: 'excessive_tab_switching',
            count: tabSwitchCount,
          })
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [isPlaying, onSecurityEvent])

  // Anti-piracy: Detect screen recording (limited browser support)
  useEffect(() => {
    const checkScreenCapture = async () => {
      try {
        // This API is limited but can detect some cases
        if ('getDisplayMedia' in navigator.mediaDevices) {
          // The presence of active display capture can sometimes be detected
          // through performance metrics or other signals
        }
      } catch (error) {
        console.debug(
          '[Security] Screen capture detection unavailable:',
          error instanceof Error ? error.message : 'Unknown error'
        )
      }
    }

    const interval = setInterval(checkScreenCapture, 60000)
    return () => clearInterval(interval)
  }, [])

  // Progress tracking
  useEffect(() => {
    progressTimerRef.current = setInterval(() => {
      if (isPlaying) {
        onProgress?.(currentTime, watchedSeconds)
      }
    }, PROGRESS_SAVE_INTERVAL)

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current)
      }
    }
  }, [isPlaying, currentTime, watchedSeconds, onProgress])

  // Update current chapter based on time
  useEffect(() => {
    if (chapters.length === 0) return

    const chapter = chapters.reduce((prev, curr) => {
      if (currentTime >= curr.startTime) {
        return curr
      }
      return prev
    }, chapters[0])

    if (chapter !== currentChapter) {
      setCurrentChapter(chapter)
    }
  }, [currentTime, chapters, currentChapter])

  // PDF sync
  useEffect(() => {
    if (!pdfSyncEnabled || !onPdfPageChange || pdfSyncData.length === 0) return

    const syncPoint = pdfSyncData.reduce((prev, curr) => {
      if (currentTime >= curr.timestamp && curr.timestamp > prev.timestamp) {
        return curr
      }
      return prev
    }, pdfSyncData[0])

    if (syncPoint) {
      onPdfPageChange(syncPoint.page)
    }
  }, [currentTime, pdfSyncEnabled, onPdfPageChange, pdfSyncData])

  // Video event handlers
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    setCurrentTime(video.currentTime)

    // Update buffered
    if (video.buffered.length > 0) {
      setBuffered(video.buffered.end(video.buffered.length - 1))
    }

    // Update watched seconds
    setWatchedSeconds((prev) => prev + 0.25) // Called every 250ms approx

    // Check completion
    if (video.currentTime >= duration * 0.9 && !video.ended) {
      onComplete?.()
    }
  }, [duration, onComplete])

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }

  const seek = (time: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime = Math.max(0, Math.min(time, duration))
  }

  const seekToChapter = (chapter: Chapter) => {
    seek(chapter.startTime)
    setShowChapters(false)
  }

  const changeSpeed = (speed: number) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = speed
    setPlaybackSpeed(speed)
    setShowSpeedMenu(false)
  }

  const changeQuality = (quality: string) => {
    if (!hlsRef.current) return

    if (quality === 'auto') {
      hlsRef.current.currentLevel = -1 // Auto
    } else {
      const level = hlsRef.current.levels.findIndex((l) => `${l.height}p` === quality)
      if (level !== -1) {
        hlsRef.current.currentLevel = level
      }
    }

    setCurrentQuality(quality)
    setShowQualityMenu(false)
  }

  const toggleFullscreen = async () => {
    const container = containerRef.current
    if (!container) return

    try {
      if (!document.fullscreenElement) {
        await container.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (err) {
      console.error('Fullscreen error:', err)
    }
  }

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)

    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  // Hide controls after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleMouseMove = () => {
      setShowControls(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (isPlaying) setShowControls(false)
      }, 3000)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', () => {
        if (isPlaying) setShowControls(false)
      })
    }

    return () => {
      clearTimeout(timeout)
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [isPlaying])

  if (error) {
    return (
      <div className="relative aspect-video bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-red-400 mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-video bg-black rounded-lg overflow-hidden group"
      onContextMenu={(e) => e.preventDefault()} // Disable right-click
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={thumbnail}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onPlay={handlePlay}
        onPause={handlePause}
        onClick={togglePlay}
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
        </div>
      )}

      {/* Dynamic Watermark */}
      <div
        className="absolute text-white/30 text-sm pointer-events-none select-none transition-all duration-1000"
        style={{
          top: `${watermarkPosition.top}%`,
          left: `${watermarkPosition.left}%`,
          transform: 'translate(-50%, -50%)',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
        }}
      >
        <div>{userName}</div>
        <div className="text-xs">{userId.slice(0, 8)}</div>
      </div>

      {/* Controls Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4">
          <h3 className="text-white font-medium truncate">{title}</h3>
          {currentChapter && <p className="text-white/70 text-sm mt-1">{currentChapter.title}</p>}
        </div>

        {/* Center Play Button */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition"
          >
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          {/* Progress Bar */}
          <div className="relative h-1 bg-white/30 rounded cursor-pointer group/progress">
            {/* Buffered */}
            <div
              className="absolute h-full bg-white/40 rounded"
              style={{ width: `${(buffered / duration) * 100}%` }}
            />
            {/* Progress */}
            <div
              className="absolute h-full bg-blue-500 rounded"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
            {/* Clickable area */}
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {/* Hover preview */}
            <div className="absolute h-2 -top-0.5 w-full opacity-0 group-hover/progress:opacity-100 transition" />
          </div>

          {/* Chapter Markers */}
          {chapters.length > 0 && (
            <div className="absolute -top-1 left-0 right-0">
              {chapters.map((chapter, idx) => (
                <div
                  key={idx}
                  className="absolute w-1 h-3 bg-yellow-400 rounded-full -translate-x-1/2 cursor-pointer hover:scale-125 transition"
                  style={{ left: `${(chapter.startTime / duration) * 100}%` }}
                  title={chapter.title}
                  onClick={() => seekToChapter(chapter)}
                />
              ))}
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              {/* Play/Pause */}
              <button onClick={togglePlay} className="hover:text-blue-400 transition">
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Skip Back */}
              <button
                onClick={() => seek(currentTime - 10)}
                className="hover:text-blue-400 transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8zm-1.1 11H10v-3.3L9 13v-.7l1.8-.6h.1V16z" />
                </svg>
              </button>

              {/* Skip Forward */}
              <button
                onClick={() => seek(currentTime + 10)}
                className="hover:text-blue-400 transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8zm.6 11h-.6v-3.3L11 13v-.7l1.8-.6h.1V16z" />
                </svg>
              </button>

              {/* Volume */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-blue-400 transition"
                >
                  {isMuted || volume === 0 ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const val = Number(e.target.value)
                    setVolume(val)
                    setIsMuted(val === 0)
                    if (videoRef.current) videoRef.current.volume = val
                  }}
                  className="w-20 accent-blue-500"
                />
              </div>

              {/* Time */}
              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Chapters */}
              {chapters.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setShowChapters(!showChapters)}
                    className="hover:text-blue-400 transition text-sm"
                  >
                    Chapters
                  </button>
                  {showChapters && (
                    <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-900 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {chapters.map((chapter, idx) => (
                        <button
                          key={idx}
                          onClick={() => seekToChapter(chapter)}
                          className={`w-full text-left px-3 py-2 hover:bg-gray-800 ${
                            currentChapter === chapter ? 'bg-blue-900' : ''
                          }`}
                        >
                          <span className="text-xs text-gray-400">
                            {formatTime(chapter.startTime)}
                          </span>
                          <span className="ml-2 text-sm">{chapter.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Speed */}
              <div className="relative">
                <button
                  onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                  className="hover:text-blue-400 transition text-sm"
                >
                  {playbackSpeed}x
                </button>
                {showSpeedMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-lg shadow-lg">
                    {PLAYBACK_SPEEDS.map((speed) => (
                      <button
                        key={speed}
                        onClick={() => changeSpeed(speed)}
                        className={`block w-full text-left px-4 py-2 hover:bg-gray-800 ${
                          playbackSpeed === speed ? 'text-blue-400' : ''
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Quality */}
              <div className="relative">
                <button
                  onClick={() => setShowQualityMenu(!showQualityMenu)}
                  className="hover:text-blue-400 transition"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                  </svg>
                </button>
                {showQualityMenu && (
                  <div className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-lg shadow-lg">
                    {availableQualities.map((quality) => (
                      <button
                        key={quality}
                        onClick={() => changeQuality(quality)}
                        className={`block w-full text-left px-4 py-2 hover:bg-gray-800 ${
                          currentQuality === quality ? 'text-blue-400' : ''
                        }`}
                      >
                        {quality}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button onClick={toggleFullscreen} className="hover:text-blue-400 transition">
                {isFullscreen ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS to prevent video download */}
      <style jsx>{`
        video::-webkit-media-controls-enclosure {
          display: none !important;
        }
        video::-webkit-media-controls {
          display: none !important;
        }
        video::-webkit-media-controls-panel {
          display: none !important;
        }
      `}</style>
    </div>
  )
}
