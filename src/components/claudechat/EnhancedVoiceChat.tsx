/**
 * Enhanced VoiceChat with Voice Memos iOS-inspired UI
 * Voice learning with Shekhar Sir's voice synthesis
 */

'use client'

import React, { useState, useRef, useEffect } from 'react'

// Prevent memory leaks in long chat sessions
const MAX_MESSAGES = 100
import { Volume2, Brain, Sparkles, Languages, Heart, Zap } from 'lucide-react'
import VoiceMemosUI from '../voice/VoiceMemosUI'
import VoiceRecognitionService, {
  VoiceRecognitionResult,
} from '../../lib/voice/voiceRecognitionService'

interface VoiceMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  audioUrl?: string
  language: 'english' | 'hindi' | 'hinglish'
  timestamp: Date
  confidence?: number
  detectedBiologyTerms?: string[]
  emotionalTone?: 'excited' | 'confused' | 'confident' | 'frustrated' | 'curious'
}

interface BiologyTermHighlight {
  term: string
  category: 'cellular' | 'anatomy' | 'physiology' | 'genetics' | 'ecology' | 'neet'
  definition: string
  hindiTranslation: string
  neetImportance: 'high' | 'medium' | 'low'
}

interface EnhancedVoiceChatProps {
  onMessage?: (message: VoiceMessage) => void
  defaultLanguage?: 'english' | 'hindi' | 'hinglish'
  autoSpeak?: boolean
  shekharSirVoice?: boolean
  biologyEnhanced?: boolean
  className?: string
}

export function EnhancedVoiceChat({
  onMessage,
  defaultLanguage = 'english',
  autoSpeak = true,
  shekharSirVoice = true,
  biologyEnhanced = true,
  className = '',
}: EnhancedVoiceChatProps) {
  // Voice states
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  // Audio states
  const [audioLevel, setAudioLevel] = useState(0)
  const [duration, setDuration] = useState(0)
  const [confidence, setConfidence] = useState(0)

  // Language and content states
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage)
  const [transcript, setTranscript] = useState('')
  const [messages, setMessages] = useState<VoiceMessage[]>([])
  const [detectedBiologyTerms, setDetectedBiologyTerms] = useState<string[]>([])
  const [showBiologyHelp, setShowBiologyHelp] = useState(false)
  const [emotionalTone, setEmotionalTone] = useState<
    'excited' | 'confused' | 'confident' | 'frustrated' | 'curious'
  >('curious')

  // Refs
  const voiceServiceRef = useRef<VoiceRecognitionService | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const currentAudioRef = useRef<HTMLAudioElement | null>(null)

  // Biology terms definitions (enhanced)
  const biologyTermDefinitions: Record<string, BiologyTermHighlight> = {
    mitochondria: {
      term: 'Mitochondria',
      category: 'cellular',
      definition:
        'Powerhouse of the cell responsible for ATP production through cellular respiration',
      hindiTranslation: 'माइटोकॉन्ड्रिया - कोशिका का ऊर्जा केंद्र',
      neetImportance: 'high',
    },
    photosynthesis: {
      term: 'Photosynthesis',
      category: 'physiology',
      definition:
        'Process by which plants convert light energy into chemical energy using chlorophyll',
      hindiTranslation: 'प्रकाश संश्लेषण - पौधों में भोजन बनाने की प्रक्रिया',
      neetImportance: 'high',
    },
    DNA: {
      term: 'DNA',
      category: 'genetics',
      definition: 'Deoxyribonucleic acid - carries genetic information in all living organisms',
      hindiTranslation: 'डीएनए - आनुवंशिक जानकारी का भंडार',
      neetImportance: 'high',
    },
    heart: {
      term: 'Heart',
      category: 'anatomy',
      definition: 'Four-chambered muscular organ that pumps blood throughout the body',
      hindiTranslation: 'हृदय - चार कक्षों वाला मांसपेशीय अंग',
      neetImportance: 'high',
    },
    'nervous system': {
      term: 'Nervous System',
      category: 'anatomy',
      definition: 'Network of neurons that controls and coordinates body functions',
      hindiTranslation: 'तंत्रिका तंत्र - शरीर की नियंत्रण प्रणाली',
      neetImportance: 'high',
    },
  }

  // Initialize voice recognition service
  useEffect(() => {
    if (!biologyEnhanced) return

    voiceServiceRef.current = new VoiceRecognitionService({
      language: getRecognitionLanguage(currentLanguage),
      continuous: true,
      interimResults: true,
      biologyTermsEnabled: true,
      noiseReduction: true,
    })

    // Setup callbacks
    voiceServiceRef.current.onResult((result: VoiceRecognitionResult) => {
      setTranscript(result.transcript)
      setConfidence(result.confidence)
      setDetectedBiologyTerms(result.detectedBiologyTerms)

      // Show biology help if terms detected
      if (result.detectedBiologyTerms.length > 0) {
        setShowBiologyHelp(true)
      }

      // Detect emotional tone from speech patterns
      detectEmotionalTone(result.transcript, result.confidence)
    })

    voiceServiceRef.current.onStart(() => {
      setIsRecording(true)
      startDurationTimer()
    })

    voiceServiceRef.current.onEnd(() => {
      setIsRecording(false)
      stopDurationTimer()
      if (transcript.trim()) {
        handleVoiceInput(transcript, confidence)
      }
    })

    voiceServiceRef.current.onError((error) => {
      console.error('Voice recognition error:', error)
      setIsRecording(false)
      stopDurationTimer()
    })

    return () => {
      if (voiceServiceRef.current) {
        voiceServiceRef.current.destroy()
      }
      stopAudioLevelMonitoring()
      stopDurationTimer()
    }
  }, [currentLanguage, biologyEnhanced, transcript, confidence])

  // Get speech recognition language code
  const getRecognitionLanguage = (lang: string): 'en-IN' | 'hi-IN' | 'en-US' => {
    switch (lang) {
      case 'hindi':
        return 'hi-IN'
      case 'hinglish':
        return 'en-IN'
      case 'english':
      default:
        return 'en-US'
    }
  }

  // Detect emotional tone from speech
  const detectEmotionalTone = (text: string, confidence: number) => {
    const lowerText = text.toLowerCase()

    if (
      lowerText.includes('confused') ||
      lowerText.includes("don't understand") ||
      confidence < 0.6
    ) {
      setEmotionalTone('confused')
    } else if (
      lowerText.includes('wow') ||
      lowerText.includes('amazing') ||
      lowerText.includes('great')
    ) {
      setEmotionalTone('excited')
    } else if (
      lowerText.includes('why') ||
      lowerText.includes('how') ||
      lowerText.includes('what')
    ) {
      setEmotionalTone('curious')
    } else if (confidence > 0.9) {
      setEmotionalTone('confident')
    } else {
      setEmotionalTone('curious')
    }
  }

  // Start duration timer
  const startDurationTimer = () => {
    setDuration(0)
    durationIntervalRef.current = setInterval(() => {
      setDuration((prev) => prev + 0.1)
    }, 100)
  }

  // Stop duration timer
  const stopDurationTimer = () => {
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current)
      durationIntervalRef.current = null
    }
  }

  // Start audio level monitoring
  const startAudioLevelMonitoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)

      intervalRef.current = setInterval(() => {
        if (analyserRef.current) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
          analyserRef.current.getByteFrequencyData(dataArray)
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length
          setAudioLevel(average / 255)
        }
      }, 50)
    } catch (error) {
      console.error('Error starting audio monitoring:', error)
    }
  }

  // Stop audio level monitoring
  const stopAudioLevelMonitoring = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    setAudioLevel(0)
  }

  // Start recording
  const startRecording = async () => {
    try {
      await startAudioLevelMonitoring()
      if (voiceServiceRef.current) {
        await voiceServiceRef.current.startRecording()
      }
    } catch (error) {
      console.error('Error starting recording:', error)
      alert('Please allow microphone access to use voice chat')
    }
  }

  // Stop recording
  const stopRecording = () => {
    if (voiceServiceRef.current) {
      voiceServiceRef.current.stopRecording()
    }
    stopAudioLevelMonitoring()
  }

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
      detectedBiologyTerms,
      emotionalTone,
    }

    setMessages((prev) => [...prev, userMessage].slice(-MAX_MESSAGES))
    onMessage?.(userMessage)

    try {
      // Get AI response with Shekhar Sir's voice
      const response = await fetch('/api/claudechat/voice-explanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript,
          language: currentLanguage,
          confidence,
          detectedBiologyTerms,
          emotionalTone,
          shekharSirVoice,
          conversationHistory: messages.slice(-5),
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

      setMessages((prev) => [...prev, assistantMessage].slice(-MAX_MESSAGES))
      onMessage?.(assistantMessage)

      // Auto-play Shekhar Sir's response
      if (autoSpeak && aiResponse.audioUrl) {
        await playAudio(aiResponse.audioUrl)
      }
    } catch (error) {
      console.error('Failed to process voice input:', error)

      const errorMessage: VoiceMessage = {
        id: `error_${Date.now()}`,
        type: 'assistant',
        content: "मुझे खुशी होगी अगर आप दोबारा कोशिश करें। I'd be happy if you try again!",
        language: currentLanguage,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage].slice(-MAX_MESSAGES))
    } finally {
      setIsProcessing(false)
    }
  }

  // Play audio response
  const playAudio = async (audioUrl: string) => {
    try {
      setIsSpeaking(true)
      setIsPlaying(true)

      if (currentAudioRef.current) {
        currentAudioRef.current.pause()
        currentAudioRef.current.currentTime = 0
      }

      const audio = new Audio(audioUrl)
      currentAudioRef.current = audio

      audio.onended = () => {
        setIsSpeaking(false)
        setIsPlaying(false)
      }
      audio.onerror = () => {
        setIsSpeaking(false)
        setIsPlaying(false)
      }

      await audio.play()
    } catch (error) {
      console.error('Audio playback failed:', error)
      setIsSpeaking(false)
      setIsPlaying(false)
    }
  }

  // Stop audio
  const stopAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause()
      currentAudioRef.current.currentTime = 0
    }
    setIsSpeaking(false)
    setIsPlaying(false)
  }

  // Handle play/pause
  const handlePlayPause = () => {
    if (isPlaying) {
      stopAudio()
    } else if (messages.length > 0) {
      const lastAssistantMessage = messages.filter((m) => m.type === 'assistant').pop()
      if (lastAssistantMessage?.audioUrl) {
        playAudio(lastAssistantMessage.audioUrl)
      }
    }
  }

  // Handle stop
  const handleStop = () => {
    stopAudio()
    setDuration(0)
    setTranscript('')
    setConfidence(0)
    setDetectedBiologyTerms([])
    setShowBiologyHelp(false)
  }

  // Handle rewind
  const handleRewind = () => {
    setDuration(0)
    setIsPlaying(false)
    stopAudio()
  }

  // Language selection
  const languages = [
    { code: 'english' as const, name: 'English', flag: '🇺🇸', locale: 'en-US' },
    { code: 'hindi' as const, name: 'हिंदी', flag: '🇮🇳', locale: 'hi-IN' },
    { code: 'hinglish' as const, name: 'Hinglish', flag: '🇮🇳', locale: 'en-IN' },
  ]

  // Get emotion icon
  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'excited':
        return '🤩'
      case 'confused':
        return '😕'
      case 'confident':
        return '😎'
      case 'frustrated':
        return '😤'
      case 'curious':
        return '🤔'
      default:
        return '🙂'
    }
  }

  return (
    <div className={`enhanced-voice-chat ${className}`}>
      {/* Header with Shekhar Sir branding */}
      <div
        className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white rounded-t-2xl p-6 animate-fadeInUp"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
             className="animate-fadeInUp">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Shekhar Sir Voice Chat</h2>
              <p className="opacity-90 text-sm">
                {getEmotionIcon(emotionalTone)} Biology में कोई भी सवाल पूछें
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {shekharSirVoice && (
              <div
                className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium animate-fadeInUp"
              >
                <Heart className="w-3 h-3 inline mr-1" />
                Shekhar Sir's Voice
              </div>
            )}
            <div
              className={`w-3 h-3 rounded-full ${
                isRecording
                  ? 'bg-red-300'
                  : isProcessing
                    ? 'bg-yellow-300'
                    : isSpeaking
                      ? 'bg-green-300'
                      : 'bg-white/50'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Main Voice Interface */}
      <div className="p-6 bg-white">
        <VoiceMemosUI
          isRecording={isRecording}
          isPlaying={isPlaying}
          audioLevel={audioLevel}
          duration={duration}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          onPlayPause={handlePlayPause}
          onStop={handleStop}
          onRewind={handleRewind}
          transcript={transcript}
          confidence={confidence}
          className="mb-6"
        />

        {/* Biology Terms Detection Panel */}
{showBiologyHelp && detectedBiologyTerms.length > 0 && (
            <div
              className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-6 border border-green-200 animate-fadeInUp"
            >
              <div className="flex items-center space-x-2 mb-3">
                <Brain className="text-green-600" size={20} />
                <h4 className="font-semibold text-green-800">Biology Concepts Detected</h4>
                <Sparkles className="text-blue-500" size={16} />
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                  NEET Important
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {detectedBiologyTerms.map((term, index) => {
                  const termData = biologyTermDefinitions[term.toLowerCase()]
                  return termData ? (
                    <div
                      key={term}
                      className="bg-white rounded-lg p-3 border shadow-sm animate-fadeInUp"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800">{termData.term}</span>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              termData.neetImportance === 'high'
                                ? 'bg-red-100 text-red-700'
                                : termData.neetImportance === 'medium'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {termData.neetImportance} priority
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              termData.category === 'cellular'
                                ? 'bg-purple-100 text-purple-700'
                                : termData.category === 'genetics'
                                  ? 'bg-blue-100 text-blue-700'
                                  : termData.category === 'physiology'
                                    ? 'bg-green-100 text-green-700'
                                    : termData.category === 'anatomy'
                                      ? 'bg-red-100 text-red-700'
                                      : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {termData.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{termData.definition}</p>
                      <p className="text-xs text-blue-600 font-medium">
                        {termData.hindiTranslation}
                      </p>
                    </div>
                  ) : null
                })}
              </div>
              <button
                className="mt-3 text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                onClick={() => setShowBiologyHelp(false)}
              >
                <span>Hide Biology Help</span>
                <Zap size={12} />
              </button>
            </div>
          )}
{/* Language & Settings Panel */}
        <div
          className="bg-gray-50 rounded-xl p-4 mb-6 animate-fadeInUp"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Languages className="text-gray-600" size={20} />
              <span className="text-sm font-medium text-gray-700">Language:</span>
              <div className="flex space-x-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentLanguage === lang.code
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border'
                    }`}
                    onClick={() => setCurrentLanguage(lang.code)}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <div
                className="flex items-center space-x-2 animate-fadeInUp"
              >
                <Volume2 size={16} />
                <span>AI Enhanced</span>
              </div>
              <div className="w-2 h-2 bg-green-600 rounded-full" />
            </div>
          </div>
        </div>

        {/* Processing Status */}
{isProcessing && (
            <div
              className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 animate-fadeInUp"
            >
              <div className="flex items-center space-x-3">
                <div
                 className="animate-fadeInUp">
                  <Brain className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="font-medium text-blue-800">Shekhar Sir is thinking...</p>
                  <p className="text-sm text-blue-600">
                    Analyzing your Biology question with AI intelligence
                  </p>
                </div>
              </div>
            </div>
          )}
</div>

      {/* Footer Status */}
      <div
        className="bg-gray-50 px-6 py-4 rounded-b-2xl border-t animate-fadeInUp"
      >
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span>
              Voice: {voiceServiceRef.current?.isSupported() ? 'Active' : 'Not supported'}
            </span>
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <span>
              Biology terms: {voiceServiceRef.current?.getBiologyTerms().length || 0} loaded
            </span>
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
            <span>Emotional AI: {emotionalTone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="text-red-500" size={12} />
            <span>Made with love for NEET students</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedVoiceChat
