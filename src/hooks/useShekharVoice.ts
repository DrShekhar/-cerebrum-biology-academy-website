'use client'

import { useState, useCallback, useEffect } from 'react'
import { shekharVoice } from '@/lib/voice/voiceSynthesis'

interface UseShekharVoiceOptions {
  language?: 'hindi' | 'english' | 'hinglish' | 'auto'
  autoDetectLanguage?: boolean
  onSpeakStart?: () => void
  onSpeakEnd?: () => void
  onSpeakError?: (error: string) => void
}

interface UseShekharVoiceReturn {
  speak: (text: string) => Promise<void>
  speakBiologyTopic: (topic: string, explanation: string) => Promise<void>
  stop: () => void
  pause: () => void
  resume: () => void
  isSpeaking: boolean
  isPaused: boolean
  progress: number
  error: string | null
  isVoiceAvailable: boolean
}

export function useShekharVoice(options: UseShekharVoiceOptions = {}): UseShekharVoiceReturn {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isVoiceAvailable, setIsVoiceAvailable] = useState(false)

  const {
    language = 'auto',
    autoDetectLanguage = true,
    onSpeakStart,
    onSpeakEnd,
    onSpeakError,
  } = options

  useEffect(() => {
    const checkVoiceAvailability = () => {
      setIsVoiceAvailable(typeof window !== 'undefined' && 'speechSynthesis' in window)
    }

    checkVoiceAvailability()

    const interval = setInterval(() => {
      if (isVoiceAvailable) {
        setIsSpeaking(shekharVoice.isSpeaking())
        setIsPaused(shekharVoice.isPaused())
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isVoiceAvailable])

  const speak = useCallback(
    async (text: string): Promise<void> => {
      if (!isVoiceAvailable) {
        const errorMsg = 'Voice synthesis is not available in this browser'
        setError(errorMsg)
        onSpeakError?.(errorMsg)
        return
      }

      try {
        setError(null)
        setProgress(0)

        await shekharVoice.speak(text, {
          language: autoDetectLanguage ? 'auto' : language,
          onStart: () => {
            setIsSpeaking(true)
            onSpeakStart?.()
          },
          onEnd: () => {
            setIsSpeaking(false)
            setProgress(100)
            onSpeakEnd?.()
          },
          onError: (error: string) => {
            setError(error)
            setIsSpeaking(false)
            onSpeakError?.(error)
          },
        })
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Speech synthesis failed'
        setError(errorMsg)
        setIsSpeaking(false)
        onSpeakError?.(errorMsg)
      }
    },
    [isVoiceAvailable, language, autoDetectLanguage, onSpeakStart, onSpeakEnd, onSpeakError]
  )

  const speakBiologyTopic = useCallback(
    async (topic: string, explanation: string): Promise<void> => {
      if (!isVoiceAvailable) {
        const errorMsg = 'Voice synthesis is not available in this browser'
        setError(errorMsg)
        onSpeakError?.(errorMsg)
        return
      }

      try {
        setError(null)
        setProgress(0)

        await shekharVoice.speakBiologyExplanation(topic, explanation, {
          language: autoDetectLanguage ? 'auto' : language,
          includeIntro: true,
          includeConclusion: true,
          onStart: () => {
            setIsSpeaking(true)
            onSpeakStart?.()
          },
          onEnd: () => {
            setIsSpeaking(false)
            setProgress(100)
            onSpeakEnd?.()
          },
          onProgress: (progressValue: number) => {
            setProgress(progressValue)
          },
          onError: (error: string) => {
            setError(error)
            setIsSpeaking(false)
            onSpeakError?.(error)
          },
        })
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Speech synthesis failed'
        setError(errorMsg)
        setIsSpeaking(false)
        onSpeakError?.(errorMsg)
      }
    },
    [isVoiceAvailable, language, autoDetectLanguage, onSpeakStart, onSpeakEnd, onSpeakError]
  )

  const stop = useCallback(() => {
    shekharVoice.stop()
    setIsSpeaking(false)
    setIsPaused(false)
    setProgress(0)
  }, [])

  const pause = useCallback(() => {
    shekharVoice.pause()
    setIsPaused(true)
  }, [])

  const resume = useCallback(() => {
    shekharVoice.resume()
    setIsPaused(false)
  }, [])

  return {
    speak,
    speakBiologyTopic,
    stop,
    pause,
    resume,
    isSpeaking,
    isPaused,
    progress,
    error,
    isVoiceAvailable,
  }
}

export default useShekharVoice
