'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

// Prevent memory leaks in long chat sessions
const MAX_MESSAGES = 100
import {
  Mic,
  Send,
  Bot,
  User,
  Volume2,
  VolumeX,
  Image as ImageIcon,
  MessageSquare,
  Brain,
  Zap,
} from 'lucide-react'

import { VoiceMemosUI } from '../voice/VoiceMemosUI'
import ImageUploadAnalyzer from './ImageUploadAnalyzer'
import AnalysisResultDisplay from './AnalysisResultDisplay'
import VoiceRecognitionService, {
  VoiceRecognitionResult,
} from '../../lib/voice/voiceRecognitionService'

interface ChatMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: number
  inputType: 'text' | 'voice' | 'image'
  metadata?: {
    audioUrl?: string
    imageUrl?: string
    confidence?: number
    analysisResult?: ImageAnalysisResult
  }
}

interface ImageAnalysisResult {
  id: string
  imageUrl: string
  fileName: string
  analysisText: string
  biologyTopics: string[]
  difficultyLevel: 'easy' | 'medium' | 'hard'
  confidence: number
  suggestions: string[]
  relatedConcepts: string[]
  timestamp: number
  processingTime: number
}

interface StudentProgress {
  totalStudyTime: number
  conceptsMastered: number
  neetScore: number
  weakAreas: string[]
  strongAreas: string[]
  motivationLevel: number
  confidenceLevel: number
}

interface EnhancedClaudeChatBoardProps {
  studentId?: string
  studentName?: string
}

const EnhancedClaudeChatBoard: React.FC<EnhancedClaudeChatBoardProps> = ({
  studentId = 'student_123',
  studentName = 'Biology Student',
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMode, setInputMode] = useState<'text' | 'voice' | 'image'>('text')
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isVoiceRecording, setIsVoiceRecording] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const [voiceTranscript, setVoiceTranscript] = useState('')
  const [voiceConfidence, setVoiceConfidence] = useState(0)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [currentPlayingMessage, setCurrentPlayingMessage] = useState<string | null>(null)
  const [voiceDuration, setVoiceDuration] = useState(0)
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)
  const [studentProgress, setStudentProgress] = useState<StudentProgress>({
    totalStudyTime: 245,
    conceptsMastered: 47,
    neetScore: 520,
    weakAreas: ['Genetics', 'Evolution'],
    strongAreas: ['Cell Biology', 'Anatomy'],
    motivationLevel: 0.85,
    confidenceLevel: 0.78,
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const voiceService = useRef<VoiceRecognitionService | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const durationInterval = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Initialize voice recognition service
    voiceService.current = new VoiceRecognitionService({
      language: 'en-IN',
      continuous: false,
      interimResults: true,
      biologyTermsEnabled: true,
    })

    voiceService.current.onResult((result: VoiceRecognitionResult) => {
      setVoiceTranscript(result.transcript)
      setVoiceConfidence(result.confidence)
    })

    voiceService.current.onError((error: string) => {
      console.error('Voice recognition error:', error)
      setIsVoiceRecording(false)
    })

    voiceService.current.onStart(() => {
      setIsVoiceRecording(true)
      startAudioLevelMonitoring()
      startDurationTimer()
    })

    voiceService.current.onEnd(() => {
      setIsVoiceRecording(false)
      stopAudioLevelMonitoring()
      stopDurationTimer()
      if (voiceTranscript.trim()) {
        handleVoiceSubmit(voiceTranscript)
      }
    })

    // Add welcome message
    if (messages.length === 0) {
      setTimeout(() => {
        const welcomeMessage: ChatMessage = {
          id: 'welcome-msg',
          type: 'assistant',
          content: `Namaste ${studentName}! 🙏

I'm Shekhar Sir's AI assistant, and I'm thrilled to help you with your Biology studies today!

You can:
🎤 **Ask questions by speaking** - I understand English, Hindi, and Hinglish
📸 **Upload Biology diagrams** - I'll analyze them instantly
💬 **Type your questions** - Traditional text chat

What would you like to learn about today? Remember, every question brings you closer to your NEET success! 🎯`,
          timestamp: Date.now(),
          inputType: 'text',
        }
        setMessages([welcomeMessage])
      }, 1000)
    }

    return () => {
      voiceService.current?.destroy()
      stopAudioLevelMonitoring()
      stopDurationTimer()
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const startSession = () => {
    setIsSessionActive(true)
    setSessionStartTime(new Date())
  }

  const endSession = () => {
    setIsSessionActive(false)
    setSessionStartTime(null)
  }

  const getSessionDuration = (): number => {
    if (!sessionStartTime) return 0
    return Math.floor((Date.now() - sessionStartTime.getTime()) / (1000 * 60))
  }

  const startAudioLevelMonitoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)

      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)

      const updateAudioLevel = () => {
        if (analyserRef.current && isVoiceRecording) {
          analyserRef.current.getByteFrequencyData(dataArray)
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length
          setAudioLevel(average / 255)
          requestAnimationFrame(updateAudioLevel)
        }
      }
      updateAudioLevel()
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopAudioLevelMonitoring = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    setAudioLevel(0)
  }

  const startDurationTimer = () => {
    setVoiceDuration(0)
    durationInterval.current = setInterval(() => {
      setVoiceDuration((prev) => prev + 1)
    }, 1000)
  }

  const stopDurationTimer = () => {
    if (durationInterval.current) {
      clearInterval(durationInterval.current)
      durationInterval.current = null
    }
  }

  const handleVoiceStart = async () => {
    try {
      if (!isSessionActive) startSession()
      await voiceService.current?.startRecording()
    } catch (error) {
      console.error('Failed to start voice recording:', error)
    }
  }

  const handleVoiceStop = () => {
    voiceService.current?.stopRecording()
  }

  const handleVoiceSubmit = async (transcript: string) => {
    if (!transcript.trim()) return

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      type: 'user',
      content: transcript,
      timestamp: Date.now(),
      inputType: 'voice',
      metadata: {
        confidence: voiceConfidence,
      },
    }

    setMessages((prev) => [...prev, userMessage].slice(-MAX_MESSAGES))
    setVoiceTranscript('')
    setVoiceConfidence(0)

    await generateAIResponse(transcript, 'voice')
  }

  const handleTextSubmit = async () => {
    if (!inputText.trim()) return

    if (!isSessionActive) startSession()

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      type: 'user',
      content: inputText,
      timestamp: Date.now(),
      inputType: 'text',
    }

    setMessages((prev) => [...prev, userMessage].slice(-MAX_MESSAGES))
    setInputText('')

    await generateAIResponse(inputText, 'text')
  }

  const handleImageAnalysis = async (result: ImageAnalysisResult) => {
    if (!isSessionActive) startSession()

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      type: 'user',
      content: `Uploaded Biology image: ${result.fileName}`,
      timestamp: Date.now(),
      inputType: 'image',
      metadata: {
        imageUrl: result.imageUrl,
        analysisResult: result,
      },
    }

    setMessages((prev) => [...prev, userMessage].slice(-MAX_MESSAGES))

    await generateAIResponse(result.analysisText, 'image', result)
  }

  const generateAIResponse = async (
    userInput: string,
    inputType: 'text' | 'voice' | 'image',
    analysisResult?: ImageAnalysisResult
  ) => {
    setIsTyping(true)

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    let responseContent = ''

    if (inputType === 'image' && analysisResult) {
      responseContent = `Excellent! I can see you've shared a Biology diagram about **${analysisResult.biologyTopics.join(', ')}**.

${analysisResult.analysisText}

**NEET Focus Points:**
• This is a **${analysisResult.difficultyLevel}** level topic
• Confidence level: **${Math.round(analysisResult.confidence * 100)}%**
• Expected in NEET Section: Biology

**Study Strategy:**
${analysisResult.suggestions.map((suggestion) => `• ${suggestion}`).join('\n')}

**Related Topics to Master:**
${analysisResult.relatedConcepts.map((concept) => `• ${concept}`).join('\n')}

Ready for the next question! Remember - every diagram you understand brings you closer to your NEET goal! 🎯`
    } else if (inputType === 'voice') {
      responseContent = `Great question! I heard you asking about "${userInput}".

As Shekhar Sir always says - "समझना ही सफलता की चाबी है" (Understanding is the key to success).

Let me explain this Biology concept step by step:

**🔬 Concept Explanation:**
This relates to fundamental Biology principles that are crucial for NEET preparation.

**📚 NEET Connection:**
• Appears in: NEET Biology Section
• Difficulty: Medium to High
• Marks weightage: 4-8 marks typically

**💡 Key Points to Remember:**
• Focus on understanding the mechanism
• Practice with related diagrams
• Connect to real-life examples

**🎯 Study Tip:**
Try drawing this concept while explaining it aloud - this engages both visual and auditory learning!

Kya aur koi doubt hai? (Any other doubts?) 😊`
    } else {
      responseContent = `Thank you for your question about "${userInput}".

**🧠 Biology Mastery Approach:**

This is an important topic for NEET success. Let me break it down:

**🎯 Core Understanding:**
The fundamental principle here connects to cellular biology and physiological processes.

**📖 NEET Strategy:**
• This topic accounts for significant marks
• Focus on diagrams and processes
• Practice previous year questions

**🚀 Next Steps:**
1. Review the concept in NCERT
2. Practice related numerical problems
3. Connect to other Biology systems

Remember: "हर सवाल आपको मेडिकल कॉलेज के एक कदम और करीब ले जाता है!"

Want me to explain any specific part in more detail?`
    }

    const assistantMessage: ChatMessage = {
      id: `msg-${Date.now()}-assistant`,
      type: 'assistant',
      content: responseContent,
      timestamp: Date.now(),
      inputType,
      metadata: {
        analysisResult: inputType === 'image' ? analysisResult : undefined,
      },
    }

    setMessages((prev) => [...prev, assistantMessage].slice(-MAX_MESSAGES))
    setIsTyping(false)

    // Update progress
    setStudentProgress((prev) => ({
      ...prev,
      conceptsMastered: prev.conceptsMastered + 1,
      totalStudyTime: prev.totalStudyTime + 0.5,
    }))
  }

  const playAudioMessage = (messageId: string) => {
    setCurrentPlayingMessage(messageId)
    setIsPlayingAudio(true)

    // Simulate audio playback with Shekhar Sir's voice
    setTimeout(() => {
      setIsPlayingAudio(false)
      setCurrentPlayingMessage(null)
    }, 5000)
  }

  const stopAudioMessage = () => {
    setIsPlayingAudio(false)
    setCurrentPlayingMessage(null)
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getMotivationMessage = (): string => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning, future doctor! Ready to ace Biology today? 🌅'
    if (hour < 17) return "Afternoon study power! You're doing amazing! ⚡"
    return 'Evening excellence! Every minute counts for NEET success! 🌟'
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div
        className="bg-indigo-500 text-white shadow-lg animate-fadeInUp"
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center animate-fadeInUp"
              >
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">ClaudeChat Board</h1>
                <p className="text-sm opacity-90">AI-Powered Biology Learning with Shekhar Sir</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Student Info */}
              <div className="text-right">
                <div className="font-medium">Hello, {studentName}! 👋</div>
                <div className="text-xs opacity-90">{getMotivationMessage()}</div>
              </div>

              {/* Session Controls */}
              {isSessionActive ? (
                <button
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium animate-fadeInUp"
                  onClick={endSession}
                >
                  End Session ({getSessionDuration()}m)
                </button>
              ) : (
                <button
                  className="bg-green-600 hover:bg-green-600 px-4 py-2 rounded-lg font-medium animate-fadeInUp"
                  onClick={startSession}
                >
                  Start Learning
                </button>
              )}
            </div>
          </div>

          {/* Progress Stats */}
          {isSessionActive && (
            <div
              className="mt-4 grid grid-cols-4 gap-4 text-center animate-fadeInUp"
            >
              <div className="bg-white bg-opacity-10 rounded-lg p-3">
                <div className="text-lg font-bold">
                  {messages.filter((m) => m.type === 'user').length}
                </div>
                <div className="text-xs opacity-90">Questions Asked</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-3">
                <div className="text-lg font-bold">{studentProgress.conceptsMastered}</div>
                <div className="text-xs opacity-90">Concepts Mastered</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-3">
                <div className="text-lg font-bold">{getSessionDuration()}m</div>
                <div className="text-xs opacity-90">Study Time</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-3">
                <div className="text-lg font-bold">
                  {Math.round(studentProgress.motivationLevel * 100)}%
                </div>
                <div className="text-xs opacity-90">Motivation</div>
              </div>
            </div>
          )}
        </div>

        {/* Input Mode Selector */}
        <div className="px-6 pb-4">
          <div className="flex bg-white bg-opacity-10 rounded-lg p-1">
            {[
              { mode: 'text', icon: MessageSquare, label: 'Text Chat' },
              { mode: 'voice', icon: Mic, label: 'Voice (Hindi/English)' },
              { mode: 'image', icon: ImageIcon, label: 'Image Analysis' },
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                className={`flex-1 px-4 py-2 rounded-md flex items-center justify-center space-x-2 transition-all ${
                  inputMode === mode
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
                onClick={() => setInputMode(mode as any)}
              >
                <Icon size={16} />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
{messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-4xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      message.type === 'user'
                        ? 'bg-blue-500'
                        : 'bg-gradient-to-br from-green-600 to-blue-600'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`flex-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                    <div
                      className={`inline-block p-4 rounded-2xl shadow-lg max-w-3xl ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-800 border'
                      }`}
                    >
                      {/* Message Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`flex items-center space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                        >
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              message.type === 'user'
                                ? 'bg-blue-400 text-blue-100'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {message.inputType === 'voice' && (
                              <Mic size={12} className="inline mr-1" />
                            )}
                            {message.inputType === 'image' && (
                              <ImageIcon size={12} className="inline mr-1" />
                            )}
                            {message.inputType === 'text' && (
                              <MessageSquare size={12} className="inline mr-1" />
                            )}
                            {message.inputType}
                          </span>
                          {message.metadata?.confidence && (
                            <span
                              className={`text-xs ${message.type === 'user' ? 'text-blue-200' : 'text-gray-500'}`}
                            >
                              {Math.round(message.metadata.confidence * 100)}% confident
                            </span>
                          )}
                        </div>
                        <span
                          className={`text-xs ${message.type === 'user' ? 'text-blue-200' : 'text-gray-500'}`}
                        >
                          {formatTime(message.timestamp)}
                        </span>
                      </div>

                      {/* Message Text */}
                      <div className="whitespace-pre-line leading-relaxed">{message.content}</div>

                      {/* Image Preview */}
                      {message.metadata?.imageUrl && (
                        <div
                          className="mt-3 rounded-lg overflow-hidden relative animate-fadeInUp"
                        >
                          <Image
                            src={message.metadata.imageUrl}
                            alt="Biology diagram"
                            width={400}
                            height={256}
                            className="max-w-full h-auto max-h-64 object-contain"
                            style={{ width: 'auto', height: 'auto' }}
                          />
                        </div>
                      )}

                      {/* Audio Controls for Assistant Messages */}
                      {message.type === 'assistant' && (
                        <div
                          className="mt-3 flex items-center space-x-2 animate-fadeInUp"
                        >
                          <button
                            className={`p-2 rounded-lg ${
                              currentPlayingMessage === message.id && isPlayingAudio
                                ? 'bg-red-100 text-red-600'
                                : 'bg-blue-100 text-blue-600'
                            } hover:bg-opacity-80`}
                            onClick={() =>
                              currentPlayingMessage === message.id && isPlayingAudio
                                ? stopAudioMessage()
                                : playAudioMessage(message.id)
                            }
                          >
                            {currentPlayingMessage === message.id && isPlayingAudio ? (
                              <VolumeX size={16} />
                            ) : (
                              <Volume2 size={16} />
                            )}
                          </button>
                          <span className="text-xs text-gray-600">
                            {currentPlayingMessage === message.id && isPlayingAudio
                              ? "🔊 Playing in Shekhar Sir's voice..."
                              : "🎵 Click to hear in Shekhar Sir's voice"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Analysis Result Display */}
                    {message.metadata?.analysisResult && (
                      <div
                        className="mt-4 animate-fadeInUp"
                      >
                        <AnalysisResultDisplay result={message.metadata.analysisResult} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
{/* Typing Indicator */}
{isTyping && (
            <div
              className="flex justify-start animate-fadeInUp"
            >
              <div className="flex items-start space-x-3">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center animate-fadeInUp"
                >
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-lg border">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-blue-500 rounded-full animate-fadeInUp"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">Shekhar Sir is analyzing...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
<div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Area */}
      <div
        className="bg-white border-t p-6 animate-fadeInUp"
      >
        {inputMode === 'text' && (
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                placeholder="Ask Shekhar Sir any Biology question... (e.g., 'Mitochondria kya hai?' or 'Explain photosynthesis')"
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 pr-12"
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 animate-fadeInUp"
                onClick={handleTextSubmit}
                disabled={!inputText.trim()}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        )}

        {inputMode === 'voice' && (
          <VoiceMemosUI
            isRecording={isVoiceRecording}
            isPlaying={false}
            audioLevel={audioLevel}
            duration={voiceDuration}
            onStartRecording={handleVoiceStart}
            onStopRecording={handleVoiceStop}
            onPlayPause={() => {}}
            onStop={() => {}}
            onRewind={() => {}}
            transcript={voiceTranscript}
            confidence={voiceConfidence}
          />
        )}

        {inputMode === 'image' && (
          <ImageUploadAnalyzer
            onAnalysisComplete={handleImageAnalysis}
            onError={(error) => console.error('Image analysis error:', error)}
          />
        )}
      </div>

      {/* Floating Progress Indicator */}
      {isSessionActive && (
        <div
          className="fixed bottom-6 left-6 bg-white rounded-full shadow-lg p-3 border animate-fadeInUp"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm">
              <div className="font-semibold text-gray-800">Learning Active</div>
              <div className="text-gray-600">{getSessionDuration()} minutes</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EnhancedClaudeChatBoard
