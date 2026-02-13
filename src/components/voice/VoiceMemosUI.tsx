'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Mic, Play, Pause, Square, RotateCcw, Volume2 } from 'lucide-react'

interface VoiceMemosUIProps {
  isRecording: boolean
  isPlaying: boolean
  audioLevel: number
  duration: number
  onStartRecording: () => void
  onStopRecording: () => void
  onPlayPause: () => void
  onStop: () => void
  onRewind: () => void
  transcript?: string
  confidence?: number
  className?: string
}

interface WaveformProps {
  audioLevel: number
  isRecording: boolean
  isPlaying: boolean
  duration: number
}

const WaveformVisualizer: React.FC<WaveformProps> = ({
  audioLevel,
  isRecording,
  isPlaying,
  duration,
}) => {
  const [waveformData, setWaveformData] = useState<number[]>(new Array(50).fill(0))
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setWaveformData((prev) => {
          const newData = [...prev.slice(1)]
          const newLevel = audioLevel + (Math.random() - 0.5) * 0.3
          newData.push(Math.max(0, Math.min(1, newLevel)))
          return newData
        })
      }, 50)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRecording, audioLevel])

  return (
    <div className="flex items-center justify-center h-20 px-4 space-x-1">
      {waveformData.map((level, index) => (
        <div
          key={index}
          className={`w-1 rounded-full ${
            isRecording ? 'bg-red-500' : isPlaying ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  )
}

const RecordButton: React.FC<{
  isRecording: boolean
  onStart: () => void
  onStop: () => void
  audioLevel: number
}> = ({ isRecording, onStart, onStop, audioLevel }) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer pulsing ring when recording */}
{isRecording && (
          <div
            className="absolute w-20 h-20 border-2 border-red-500 rounded-full animate-fadeInUp"
          />
        )}
{/* Main record button */}
      <button
        className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
          isRecording ? 'bg-red-500 text-white' : 'bg-white text-red-500 border-2 border-red-500'
        }`}
        onClick={isRecording ? onStop : onStart}
      >
{isRecording ? (
            <div
              key="recording"
              className="w-6 h-6 bg-white rounded-sm animate-fadeInUp"
            />
          ) : (
            <div key="mic" className="animate-fadeInUp">
              <Mic size={24} />
            </div>
          )}
</button>

      {/* Audio level indicator */}
      {isRecording && (
        <div
          className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 animate-fadeInUp"
        >
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-1 h-2 rounded-full ${
                  audioLevel * 5 > i ? 'bg-red-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const PlaybackControls: React.FC<{
  isPlaying: boolean
  duration: number
  onPlayPause: () => void
  onStop: () => void
  onRewind: () => void
}> = ({ isPlaying, duration, onPlayPause, onStop, onRewind }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div
      className="flex items-center justify-center space-x-6 py-4 animate-fadeInUp"
    >
      {/* Rewind */}
      <button
        className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 animate-fadeInUp"
        onClick={onRewind}
      >
        <RotateCcw size={20} />
      </button>

      {/* Play/Pause */}
      <button
        className="p-4 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 animate-fadeInUp"
        onClick={onPlayPause}
      >
{isPlaying ? (
            <div
              key="pause"
             className="animate-fadeInUp">
              <Pause size={24} />
            </div>
          ) : (
            <div
              key="play"
             className="animate-fadeInUp">
              <Play size={24} />
            </div>
          )}
</button>

      {/* Stop */}
      <button
        className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 animate-fadeInUp"
        onClick={onStop}
      >
        <Square size={20} />
      </button>

      {/* Duration */}
      <div
        className="text-lg font-mono text-gray-600 min-w-[60px] text-center animate-fadeInUp"
        key={duration}
      >
        {formatTime(duration)}
      </div>
    </div>
  )
}

const TranscriptDisplay: React.FC<{
  transcript: string
  confidence: number
  isRecording: boolean
}> = ({ transcript, confidence, isRecording }) => {
  return (
{transcript && (
        <div
          className="mx-4 p-4 bg-gray-50 rounded-lg border animate-fadeInUp"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Transcript</span>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">
                Confidence: {Math.round(confidence * 100)}%
              </span>
              {isRecording && (
                <div
                  className="w-2 h-2 bg-red-500 rounded-full animate-fadeInUp"
                />
              )}
            </div>
          </div>
          <p
            className="text-gray-800 leading-relaxed animate-fadeInUp"
            key={transcript}
          >
            {transcript}
          </p>
        </div>
      )}
)
}

export const VoiceMemosUI: React.FC<VoiceMemosUIProps> = ({
  isRecording,
  isPlaying,
  audioLevel,
  duration,
  onStartRecording,
  onStopRecording,
  onPlayPause,
  onStop,
  onRewind,
  transcript = '',
  confidence = 0,
  className = '',
}) => {
  const [hasRecording, setHasRecording] = useState(false)

  useEffect(() => {
    if (duration > 0) {
      setHasRecording(true)
    }
  }, [duration])

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div
        className="px-6 py-4 bg-gray-50 border-b animate-fadeInUp"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Voice Learning</h3>
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isRecording ? 'bg-red-500' : hasRecording ? 'bg-green-600' : 'bg-gray-300'
              }`}
            />
            <span className="text-sm text-gray-600">
              {isRecording ? 'Recording...' : hasRecording ? 'Ready to play' : 'Ready to record'}
            </span>
          </div>
        </div>
      </div>

      {/* Waveform Visualizer */}
      <WaveformVisualizer
        audioLevel={audioLevel}
        isRecording={isRecording}
        isPlaying={isPlaying}
        duration={duration}
      />

      {/* Main Controls */}
      <div className="px-6 py-6">
        <div className="flex flex-col items-center space-y-6">
          {/* Record Button */}
          <RecordButton
            isRecording={isRecording}
            onStart={onStartRecording}
            onStop={onStopRecording}
            audioLevel={audioLevel}
          />

          {/* Playback Controls */}
{hasRecording && !isRecording && (
              <PlaybackControls
                isPlaying={isPlaying}
                duration={duration}
                onPlayPause={onPlayPause}
                onStop={onStop}
                onRewind={onRewind}
              />
            )}
</div>
      </div>

      {/* Transcript */}
      <TranscriptDisplay
        transcript={transcript}
        confidence={confidence}
        isRecording={isRecording}
      />

      {/* Bottom Action Bar */}
      <div
        className="px-6 py-4 bg-gray-50 border-t animate-fadeInUp"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white border hover:bg-gray-50 animate-fadeInUp"
            >
              <Volume2 size={16} />
              <span className="text-sm">Biology Mode</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>English/Hindi/Hinglish</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <span>AI Enhanced</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoiceMemosUI
