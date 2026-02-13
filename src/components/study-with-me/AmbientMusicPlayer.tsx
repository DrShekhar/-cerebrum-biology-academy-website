'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Volume2, VolumeX, Music, Trees, VolumeOff } from 'lucide-react'
import type { DisplayMode, AmbientSound } from '@/lib/study-with-me/types'
import { AMBIENT_SOUNDS } from '@/lib/study-with-me/constants'

interface AmbientMusicPlayerProps {
  mode?: DisplayMode
  sound?: AmbientSound
  volume?: number
  onSoundChange?: (sound: AmbientSound) => void
  onVolumeChange?: (volume: number) => void
  className?: string
}

const SOUND_OPTIONS: { id: AmbientSound; label: string; icon: typeof Music }[] = [
  { id: 'lofi', label: 'Lo-fi', icon: Music },
  { id: 'nature', label: 'Nature', icon: Trees },
  { id: 'silence', label: 'Silent', icon: VolumeOff },
]

export function AmbientMusicPlayer({
  mode = 'web',
  sound = 'silence',
  volume = 0.5,
  onSoundChange,
  onVolumeChange,
  className = '',
}: AmbientMusicPlayerProps) {
  const [currentSound, setCurrentSound] = useState<AmbientSound>(sound)
  const [currentVolume, setCurrentVolume] = useState(volume)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isTabVisible, setIsTabVisible] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Handle tab visibility - pause when hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = !document.hidden
      setIsTabVisible(visible)

      if (audioRef.current) {
        if (!visible) {
          audioRef.current.pause()
        } else if (isPlaying && currentSound !== 'silence') {
          audioRef.current.play().catch(() => {})
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [isPlaying, currentSound])

  // Handle sound change
  useEffect(() => {
    // Clean up previous audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current = null
    }

    const soundUrl = AMBIENT_SOUNDS[currentSound]

    if (soundUrl) {
      audioRef.current = new Audio(soundUrl)
      audioRef.current.loop = true
      audioRef.current.volume = currentVolume

      if (isPlaying && isTabVisible) {
        audioRef.current.play().catch(() => {
          // Autoplay blocked - user hasn't interacted
        })
      }
    } else {
      setIsPlaying(false)
    }

    onSoundChange?.(currentSound)

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [currentSound])

  // Handle volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = currentVolume
    }
    onVolumeChange?.(currentVolume)
  }, [currentVolume, onVolumeChange])

  const handleSoundSelect = useCallback((newSound: AmbientSound) => {
    setCurrentSound(newSound)
    if (newSound !== 'silence') {
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }, [])

  const handleTogglePlay = useCallback(() => {
    if (currentSound === 'silence') return

    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    } else {
      audioRef.current?.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [isPlaying, currentSound])

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentVolume(parseFloat(e.target.value))
  }, [])

  // OBS mode - minimal display
  if (mode === 'obs') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {isPlaying && currentSound !== 'silence' ? (
          <>
            <div
              className="w-4 h-4 animate-fadeInUp"
            >
              <Volume2 className="w-4 h-4 text-green-400" />
            </div>
            <span className="text-gray-400 text-sm capitalize">{currentSound}</span>
          </>
        ) : (
          <>
            <VolumeOff className="w-4 h-4 text-gray-500" />
            <span className="text-gray-500 text-sm">Silent</span>
          </>
        )}
      </div>
    )
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-xl p-5 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          Ambient Sound
        </h3>
        {isPlaying && currentSound !== 'silence' && (
          <div
            className="flex items-center text-xs text-green-600 animate-fadeInUp"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
            Playing
          </div>
        )}
      </div>

      {/* Sound Options */}
      <div className="flex space-x-2 mb-4">
        {SOUND_OPTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => handleSoundSelect(id)}
            className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center space-x-2 ${
              currentSound === id
                ? 'bg-[#3d4d3d] text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Volume Control */}
      <div
        className={`transition-opacity duration-200 ${
          currentSound === 'silence' ? 'opacity-40 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex items-center space-x-3">
          <button
            onClick={handleTogglePlay}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            {isPlaying ? (
              <Volume2 className="w-4 h-4 text-green-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-500" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={currentVolume}
            onChange={handleVolumeChange}
            className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#3d4d3d]"
          />

          <span className="text-xs text-gray-500 w-8 text-right">
            {Math.round(currentVolume * 100)}%
          </span>
        </div>
      </div>

      {/* Visual feedback when playing */}
      {isPlaying && currentSound !== 'silence' && (
        <div
          className="mt-4 flex items-center justify-center space-x-1 animate-fadeInUp"
        >
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-green-400 rounded-full animate-fadeInUp"
            />
          ))}
        </div>
      )}
    </div>
  )
}
