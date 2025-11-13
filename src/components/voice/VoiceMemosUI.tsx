'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Play, Pause, Square, RotateCcw, Volume2, VolumeX } from 'lucide-react'

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
        <motion.div
          key={index}
          className={`w-1 rounded-full ${
            isRecording ? 'bg-red-500' : isPlaying ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          initial={{ height: 4 }}
          animate={{
            height: isRecording || isPlaying ? Math.max(4, level * 60) : 4,
            opacity: isRecording || isPlaying ? 1 : 0.5,
          }}
          transition={{
            duration: 0.1,
            ease: 'easeOut',
          }}
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
      <AnimatePresence>
        {isRecording && (
          <motion.div
            className="absolute w-20 h-20 border-2 border-red-500 rounded-full"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 0.3, 0.8],
            }}
            exit={{ scale: 1, opacity: 0 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </AnimatePresence>

      {/* Main record button */}
      <motion.button
        className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg ${
          isRecording ? 'bg-red-500 text-white' : 'bg-white text-red-500 border-2 border-red-500'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={isRecording ? onStop : onStart}
        animate={{
          backgroundColor: isRecording
            ? `rgb(239, 68, 68, ${0.8 + audioLevel * 0.4})`
            : 'rgb(255, 255, 255)',
        }}
      >
        <AnimatePresence mode="wait">
          {isRecording ? (
            <motion.div
              key="recording"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="w-6 h-6 bg-white rounded-sm"
            />
          ) : (
            <motion.div key="mic" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Mic size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Audio level indicator */}
      {isRecording && (
        <motion.div
          className="absolute -bottom-3 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-1 h-2 rounded-full ${
                  audioLevel * 5 > i ? 'bg-red-500' : 'bg-gray-300'
                }`}
                animate={{
                  scale: audioLevel * 5 > i ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </motion.div>
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
    <motion.div
      className="flex items-center justify-center space-x-6 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Rewind */}
      <motion.button
        className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onRewind}
      >
        <RotateCcw size={20} />
      </motion.button>

      {/* Play/Pause */}
      <motion.button
        className="p-4 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPlayPause}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="pause"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Pause size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Play size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Stop */}
      <motion.button
        className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onStop}
      >
        <Square size={20} />
      </motion.button>

      {/* Duration */}
      <motion.div
        className="text-lg font-mono text-gray-600 min-w-[60px] text-center"
        key={duration}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.1 }}
      >
        {formatTime(duration)}
      </motion.div>
    </motion.div>
  )
}

const TranscriptDisplay: React.FC<{
  transcript: string
  confidence: number
  isRecording: boolean
}> = ({ transcript, confidence, isRecording }) => {
  return (
    <AnimatePresence>
      {transcript && (
        <motion.div
          className="mx-4 p-4 bg-gray-50 rounded-lg border"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Transcript</span>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">
                Confidence: {Math.round(confidence * 100)}%
              </span>
              {isRecording && (
                <motion.div
                  className="w-2 h-2 bg-red-500 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </div>
          </div>
          <motion.p
            className="text-gray-800 leading-relaxed"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            key={transcript}
          >
            {transcript}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
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
      <motion.div
        className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Voice Learning</h3>
          <div className="flex items-center space-x-2">
            <motion.div
              className={`w-3 h-3 rounded-full ${
                isRecording ? 'bg-red-500' : hasRecording ? 'bg-green-500' : 'bg-gray-300'
              }`}
              animate={{
                scale: isRecording ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 1, repeat: isRecording ? Infinity : 0 }}
            />
            <span className="text-sm text-gray-600">
              {isRecording ? 'Recording...' : hasRecording ? 'Ready to play' : 'Ready to record'}
            </span>
          </div>
        </div>
      </motion.div>

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
          <AnimatePresence>
            {hasRecording && !isRecording && (
              <PlaybackControls
                isPlaying={isPlaying}
                duration={duration}
                onPlayPause={onPlayPause}
                onStop={onStop}
                onRewind={onRewind}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Transcript */}
      <TranscriptDisplay
        transcript={transcript}
        confidence={confidence}
        isRecording={isRecording}
      />

      {/* Bottom Action Bar */}
      <motion.div
        className="px-6 py-4 bg-gray-50 border-t"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white border hover:bg-gray-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Volume2 size={16} />
              <span className="text-sm">Biology Mode</span>
            </motion.button>
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>English/Hindi/Hinglish</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <span>AI Enhanced</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default VoiceMemosUI
