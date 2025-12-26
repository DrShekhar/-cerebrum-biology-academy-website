/**
 * VoiceChat - Multi-language voice processing for ClaudeChat Board
 * Supports English, Hindi, and Hinglish with real-time transcription
 */

'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Mic,
  MicOff,
  Volume2,
  Languages,
  Play,
  Pause,
  RotateCcw,
  MessageCircle,
} from 'lucide-react'

interface VoiceMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  audioUrl?: string
  language: 'english' | 'hindi' | 'hinglish'
  timestamp: Date
  confidence?: number
}

interface VoiceChatProps {
  onMessage?: (message: VoiceMessage) => void
  defaultLanguage?: 'english' | 'hindi' | 'hinglish'
  autoSpeak?: boolean
}

export function VoiceChat({
  onMessage,
  defaultLanguage = 'english',
  autoSpeak = true,
}: VoiceChatProps) {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage)
  const [messages, setMessages] = useState<VoiceMessage[]>([])
  const [transcript, setTranscript] = useState('')
  const [confidence, setConfidence] = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()

      recognition.continuous = true
      recognition.interimResults = true
      recognition.maxAlternatives = 1

      // Set language based on selection
      recognition.lang = getRecognitionLanguage(currentLanguage)

      recognition.onstart = () => {
        console.log('Speech recognition started')
      }

      recognition.onresult = (event: any) => {
        let finalTranscript = ''
        let interimTranscript = ''
        let finalConfidence = 0

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i]
          const transcriptPart = result[0].transcript

          if (result.isFinal) {
            finalTranscript += transcriptPart
            finalConfidence = result[0].confidence || 0
            setConfidence(finalConfidence)
          } else {
            interimTranscript += transcriptPart
          }
        }

        setTranscript(finalTranscript || interimTranscript)

        // Process final transcript
        if (finalTranscript) {
          handleVoiceInput(finalTranscript, finalConfidence)
        }
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }
  }, [currentLanguage])

  // Get speech recognition language code
  const getRecognitionLanguage = (lang: string): string => {
    switch (lang) {
      case 'hindi':
        return 'hi-IN'
      case 'hinglish':
        return 'en-IN' // English India for Hinglish
      case 'english':
      default:
        return 'en-US'
    }
  }

  // Start voice recording
  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      // Start speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.start()
      }

      // Start media recording for audio processing
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start(1000) // Collect data every second
      setIsListening(true)
      setTranscript('')
    } catch (error) {
      console.error('Failed to start listening:', error)
      alert('Please allow microphone access to use voice chat')
    }
  }, [])

  // Stop voice recording
  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }

    setIsListening(false)
  }, [])

  // Handle voice input
  const handleVoiceInput = async (transcript: string, confidence: number) => {
    if (!transcript.trim()) return

    setIsProcessing(true)

    const userMessage: VoiceMessage = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: transcript,
      language: currentLanguage,
      timestamp: new Date(),
      confidence,
    }

    setMessages((prev) => [...prev, userMessage])
    onMessage?.(userMessage)

    try {
      // Get AI response
      const response = await fetch('/api/claudechat/process-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript,
          language: currentLanguage,
          confidence,
          conversationHistory: messages.slice(-5), // Last 5 messages for context
        }),
      })

      const aiResponse = await response.json()

      const assistantMessage: VoiceMessage = {
        id: `assistant_${Date.now()}`,
        type: 'assistant',
        content: aiResponse.text,
        audioUrl: aiResponse.audioUrl,
        language: currentLanguage,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      onMessage?.(assistantMessage)

      // Auto-play response if enabled
      if (autoSpeak && aiResponse.audioUrl) {
        await playAudio(aiResponse.audioUrl)
      }
    } catch (error) {
      console.error('Failed to process voice input:', error)

      const errorMessage: VoiceMessage = {
        id: `error_${Date.now()}`,
        type: 'assistant',
        content: 'Sorry, I had trouble understanding that. Could you please try again?',
        language: currentLanguage,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }

  // Play audio response
  const playAudio = async (audioUrl: string) => {
    try {
      setIsSpeaking(true)

      // Stop any currently playing audio
      if (currentAudioRef.current) {
        currentAudioRef.current.pause()
        currentAudioRef.current.currentTime = 0
      }

      const audio = new Audio(audioUrl)
      currentAudioRef.current = audio

      audio.onended = () => setIsSpeaking(false)
      audio.onerror = () => setIsSpeaking(false)

      await audio.play()
    } catch (error) {
      console.error('Audio playback failed:', error)
      setIsSpeaking(false)
    }
  }

  // Stop current audio
  const stopAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current.currentTime = 0
    }
    setIsSpeaking(false)
  }

  // Clear conversation
  const clearConversation = () => {
    setMessages([])
    setTranscript('')
    setConfidence(0)
  }

  // Language options
  const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸' },
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'hinglish', name: 'Hinglish', flag: '🇮🇳' },
  ]

  return (
    <div className="voice-chat bg-indigo-50 rounded-2xl border border-purple-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-indigo-500 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">🎤 Voice Chat with Shekhar Sir</h2>
            <p className="opacity-90">Ask questions in English, Hindi, or Hinglish</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value as any)}
              className="bg-white/20 text-white rounded-lg px-3 py-2 text-sm font-medium"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="text-gray-900">
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            <button
              onClick={clearConversation}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Voice Controls */}
          <div className="space-y-4">
            {/* Main Voice Button */}
            <div className="text-center">
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={isProcessing}
                className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white disabled:opacity-50 shadow-lg hover:shadow-xl`}
              >
                {isListening ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
              </button>

              <div className="mt-4">
                {isListening && (
                  <div className="text-sm text-red-600 font-medium">🔴 Listening... Speak now</div>
                )}
                {isProcessing && (
                  <div className="text-sm text-blue-600 font-medium">
                    ⚡ Processing your question...
                  </div>
                )}
                {isSpeaking && (
                  <div className="text-sm text-green-600 font-medium flex items-center justify-center space-x-2">
                    <Volume2 className="w-4 h-4 animate-pulse" />
                    <span>Shekhar Sir is speaking...</span>
                    <button
                      onClick={stopAudio}
                      className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs hover:bg-red-200"
                    >
                      Stop
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Live Transcript */}
            {transcript && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Live Transcript</h4>
                  <div className="text-xs text-gray-500">
                    Confidence: {Math.round(confidence * 100)}%
                  </div>
                </div>
                <p className="text-gray-700 italic">"{transcript}"</p>
                <div className="mt-2 text-xs text-blue-600">
                  Language: {languages.find((l) => l.code === currentLanguage)?.name}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setCurrentLanguage('english')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentLanguage === 'english'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🇺🇸 English
              </button>
              <button
                onClick={() => setCurrentLanguage('hindi')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentLanguage === 'hindi'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🇮🇳 हिंदी
              </button>
              <button
                onClick={() => setCurrentLanguage('hinglish')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentLanguage === 'hinglish'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🇮🇳 Hinglish
              </button>
            </div>
          </div>

          {/* Conversation History */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Conversation</span>
            </h3>

            <div className="bg-white rounded-lg border border-gray-200 h-96 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <Mic className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Start a conversation by clicking the microphone</p>
                  <p className="text-sm mt-1">
                    Ask any Biology question in your preferred language
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-75">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.audioUrl && (
                          <button
                            onClick={() => playAudio(message.audioUrl!)}
                            className="p-1 hover:bg-black/10 rounded transition-colors"
                          >
                            <Play className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      {message.confidence && (
                        <div className="text-xs opacity-75 mt-1">
                          Confidence: {Math.round(message.confidence * 100)}%
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Biology Topics */}
      <div className="p-6 bg-gray-50 border-t">
        <h4 className="font-medium text-gray-900 mb-3">💡 Try asking about:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            'Photosynthesis process',
            'Human heart anatomy',
            'Cell structure',
            'DNA replication',
            'Nervous system',
            'Plant reproduction',
            'Blood circulation',
            'Genetics basics',
          ].map((topic) => (
            <button
              key={topic}
              onClick={() => handleVoiceInput(`Explain ${topic}`, 1.0)}
              className="text-left p-2 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm"
              disabled={isProcessing}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VoiceChat
