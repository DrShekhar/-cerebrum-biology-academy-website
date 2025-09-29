'use client'

import React, { useState, useRef, useEffect } from 'react'

// Type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  BookOpen,
  Brain,
  Lightbulb,
  FileText,
  Clock,
  Star,
  TrendingUp,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Download,
  Share2,
  ThumbsUp,
  ThumbsDown,
  RotateCcw
} from 'lucide-react'
// import { biologyTutor, BiologyQuery, BiologyResponse } from '@/lib/ai/BiologyTutorEngine' // Using API instead for Edge Runtime compatibility

// Types for API compatibility
interface BiologyQuery {
  id: string
  studentId: string
  question: string
  curriculum: 'NEET' | 'CBSE' | 'ICSE' | 'IB' | 'IGCSE'
  grade: string
  difficulty: 'basic' | 'intermediate' | 'advanced'
  queryType: 'concept' | 'problem' | 'diagram' | 'memory' | 'application'
  timestamp: Date
  context?: {
    topic?: string
    difficulty?: 'basic' | 'intermediate' | 'advanced'
    urgency?: 'low' | 'high'
  }
}

interface BiologyResponse {
  answer: string
  explanation: string
  visualAids?: string[]
  relatedTopics?: string[]
  studyTips?: string[]
  examRelevance?: string
  estimatedStudyTime?: number
  confidence: number
}
import { AIErrorBoundary } from '@/components/ai/AIErrorBoundary'

interface ChatMessage {
  id: string
  type: 'user' | 'bot' | 'system'
  content: string
  query?: BiologyQuery
  response?: BiologyResponse
  timestamp: Date
  isTyping?: boolean
  actions?: ChatAction[]
}

interface ChatAction {
  type: 'practice' | 'diagram' | 'study_plan' | 'related_topic' | 'human_tutor'
  label: string
  data?: any
  icon?: React.ReactNode
}

interface VoiceRecognition {
  isSupported: boolean
  isListening: boolean
  transcript: string
  confidence: number
}

interface ChatbotState {
  isOpen: boolean
  messages: ChatMessage[]
  isTyping: boolean
  currentTopic?: string
  studentProfile: {
    curriculum: 'NEET' | 'CBSE' | 'ICSE' | 'IB' | 'IGCSE'
    grade: string
    weakTopics: string[]
    preferredLanguage: 'english' | 'hindi'
    learningStyle: 'visual' | 'auditory' | 'kinesthetic'
  }
  voiceSettings: {
    enabled: boolean
    autoPlay: boolean
    speed: number
    voice?: SpeechSynthesisVoice
  }
}

export function BiologyTutorChatbot() {
  const [chatState, setChatState] = useState<ChatbotState>({
    isOpen: false,
    messages: [],
    isTyping: false,
    studentProfile: {
      curriculum: 'NEET',
      grade: '12',
      weakTopics: [],
      preferredLanguage: 'english',
      learningStyle: 'visual'
    },
    voiceSettings: {
      enabled: true,
      autoPlay: false,
      speed: 1
    }
  })

  const [inputValue, setInputValue] = useState('')
  const [voiceRecognition, setVoiceRecognition] = useState<VoiceRecognition>({
    isSupported: false,
    isListening: false,
    transcript: '',
    confidence: 0
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatState.messages])

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()

      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        const confidence = event.results[0][0].confidence

        setVoiceRecognition(prev => ({
          ...prev,
          transcript,
          confidence
        }))

        if (event.results[0].isFinal) {
          setInputValue(transcript)
          setVoiceRecognition(prev => ({ ...prev, isListening: false }))
        }
      }

      recognitionRef.current.onerror = () => {
        setVoiceRecognition(prev => ({ ...prev, isListening: false }))
      }

      setVoiceRecognition(prev => ({ ...prev, isSupported: true }))
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  useEffect(() => {
    if (chatState.isOpen && chatState.messages.length === 0) {
      initializeChat()
    }
  }, [chatState.isOpen])

  const initializeChat = () => {
    const welcomeMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      type: 'bot',
      content: `🧬 Hello! I'm Dr. Bio, your AI Biology tutor. I specialize in ${chatState.studentProfile.curriculum} curriculum and I'm here to help you master Biology concepts 24/7.

What would you like to explore today?`,
      timestamp: new Date(),
      actions: [
        {
          type: 'practice',
          label: 'Practice Questions',
          icon: <BookOpen className="w-4 h-4" />,
          data: { type: 'practice_questions' }
        },
        {
          type: 'diagram',
          label: 'Explain Diagrams',
          icon: <Brain className="w-4 h-4" />,
          data: { type: 'diagram_explanation' }
        },
        {
          type: 'study_plan',
          label: 'Study Plan',
          icon: <Clock className="w-4 h-4" />,
          data: { type: 'personalized_study_plan' }
        }
      ]
    }

    setChatState(prev => ({
      ...prev,
      messages: [welcomeMessage]
    }))

    // Auto-play welcome message if enabled
    if (chatState.voiceSettings.autoPlay) {
      speakText(welcomeMessage.content)
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true
    }))

    setInputValue('')

    try {
      // Create biology query
      const query: BiologyQuery = {
        id: `query_${Date.now()}`,
        studentId: 'current_student', // Replace with actual student ID
        question: inputValue,
        curriculum: chatState.studentProfile.curriculum,
        grade: chatState.studentProfile.grade,
        difficulty: 'intermediate',
        queryType: detectQueryType(inputValue),
        timestamp: new Date()
      }

      // Get AI response via API
      const apiResponse = await fetch('/api/ai/education-hub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'resolve_doubt',
          data: {
            studentId: 'demo_student',
            question: inputValue,
            context: {
              topic: detectTopic(inputValue),
              difficulty: 'intermediate',
              urgency: 'low'
            }
          }
        })
      })

      if (!apiResponse.ok) {
        throw new Error('Failed to get AI response')
      }

      const apiData = await apiResponse.json()
      const response: BiologyResponse = apiData.data.response

      // Create bot message
      const botMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        type: 'bot',
        content: formatBotResponse(response),
        query,
        response,
        timestamp: new Date(),
        actions: generateChatActions(response)
      }

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isTyping: false,
        currentTopic: response.relatedTopics[0]
      }))

      // Auto-play response if enabled
      if (chatState.voiceSettings.autoPlay) {
        speakText(response.answer)
      }

    } catch (error) {
      console.error('Biology tutor error:', error)

      const errorMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        type: 'bot',
        content: "I'm experiencing some technical difficulties. Let me connect you with a human tutor or try asking your question in a different way.",
        timestamp: new Date(),
        actions: [
          {
            type: 'human_tutor',
            label: 'Talk to Human Tutor',
            icon: <User className="w-4 h-4" />
          }
        ]
      }

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isTyping: false
      }))
    }
  }

  const detectQueryType = (question: string): BiologyQuery['queryType'] => {
    const lowerQuestion = question.toLowerCase()

    if (lowerQuestion.includes('diagram') || lowerQuestion.includes('draw') || lowerQuestion.includes('structure')) {
      return 'diagram'
    }
    if (lowerQuestion.includes('solve') || lowerQuestion.includes('calculate') || lowerQuestion.includes('problem')) {
      return 'problem'
    }
    if (lowerQuestion.includes('remember') || lowerQuestion.includes('memorize') || lowerQuestion.includes('mnemonic')) {
      return 'memory'
    }
    if (lowerQuestion.includes('apply') || lowerQuestion.includes('use') || lowerQuestion.includes('example')) {
      return 'application'
    }

    return 'concept'
  }

  const detectTopic = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    // Biology topic detection
    if (lowerQuestion.includes('cell') || lowerQuestion.includes('membrane') || lowerQuestion.includes('mitochondria')) {
      return 'Cell Biology'
    }
    if (lowerQuestion.includes('photosynthesis') || lowerQuestion.includes('respiration') || lowerQuestion.includes('enzyme')) {
      return 'Physiology'
    }
    if (lowerQuestion.includes('dna') || lowerQuestion.includes('gene') || lowerQuestion.includes('chromosome')) {
      return 'Genetics'
    }
    if (lowerQuestion.includes('evolution') || lowerQuestion.includes('species') || lowerQuestion.includes('natural selection')) {
      return 'Evolution'
    }
    if (lowerQuestion.includes('ecosystem') || lowerQuestion.includes('biodiversity') || lowerQuestion.includes('ecology')) {
      return 'Ecology'
    }

    return 'General Biology'
  }

  const formatBotResponse = (response: BiologyResponse): string => {
    let formatted = response.answer

    if (response.explanation && response.explanation !== response.answer) {
      formatted += '\n\n' + response.explanation
    }

    if (response.visualAids?.mnemonics && response.visualAids.mnemonics.length > 0) {
      formatted += '\n\n🧠 **Memory Tip:** ' + response.visualAids.mnemonics.join('\n')
    }

    if (response.studyTips && response.studyTips.length > 0) {
      formatted += '\n\n📚 **Study Tips:**\n' + response.studyTips.map(tip => `• ${tip}`).join('\n')
    }

    return formatted
  }

  const generateChatActions = (response: BiologyResponse): ChatAction[] => {
    const actions: ChatAction[] = []

    if (response.practiceQuestions && response.practiceQuestions.length > 0) {
      actions.push({
        type: 'practice',
        label: 'Practice Questions',
        icon: <BookOpen className="w-4 h-4" />,
        data: { questions: response.practiceQuestions }
      })
    }

    if (response.visualAids?.diagrams && response.visualAids.diagrams.length > 0) {
      actions.push({
        type: 'diagram',
        label: 'View Diagrams',
        icon: <Brain className="w-4 h-4" />,
        data: { diagrams: response.visualAids.diagrams }
      })
    }

    if (response.relatedTopics && response.relatedTopics.length > 0) {
      actions.push({
        type: 'related_topic',
        label: 'Related Topics',
        icon: <TrendingUp className="w-4 h-4" />,
        data: { topics: response.relatedTopics }
      })
    }

    return actions
  }

  const handleVoiceToggle = () => {
    if (!voiceRecognition.isSupported) return

    if (voiceRecognition.isListening) {
      recognitionRef.current?.stop()
      setVoiceRecognition(prev => ({ ...prev, isListening: false }))
    } else {
      recognitionRef.current?.start()
      setVoiceRecognition(prev => ({ ...prev, isListening: true }))
    }
  }

  const speakText = (text: string) => {
    if (!synthesisRef.current || !chatState.voiceSettings.enabled) return

    // Remove markdown and formatting
    const cleanText = text.replace(/[*#`]/g, '').replace(/\n/g, '. ')

    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.rate = chatState.voiceSettings.speed

    if (chatState.voiceSettings.voice) {
      utterance.voice = chatState.voiceSettings.voice
    }

    synthesisRef.current.speak(utterance)
  }

  const toggleChatbot = () => {
    setChatState(prev => ({ ...prev, isOpen: !prev.isOpen }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleActionClick = (action: ChatAction) => {
    switch (action.type) {
      case 'practice':
        // Handle practice questions
        break
      case 'diagram':
        // Handle diagram viewing
        break
      case 'study_plan':
        // Handle study plan generation
        break
      case 'related_topic':
        // Handle related topic exploration
        break
      case 'human_tutor':
        // Handle human tutor connection
        break
    }
  }

  return (
    <AIErrorBoundary>
      <div className="fixed bottom-4 right-4 z-50">
        {/* Chat toggle button */}
        <AnimatePresence>
          {!chatState.isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={toggleChatbot}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                🧬
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Chat window */}
        <AnimatePresence>
          {chatState.isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.3 }}
              className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col border border-gray-200"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      🧬
                    </div>
                    <div>
                      <h3 className="font-semibold">Dr. Bio</h3>
                      <p className="text-xs opacity-90">Your AI Biology Tutor</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setChatState(prev => ({
                        ...prev,
                        voiceSettings: { ...prev.voiceSettings, autoPlay: !prev.voiceSettings.autoPlay }
                      }))}
                      className="p-1 hover:bg-white/20 rounded"
                    >
                      {chatState.voiceSettings.autoPlay ?
                        <Volume2 className="w-4 h-4" /> :
                        <VolumeX className="w-4 h-4" />
                      }
                    </button>
                    <button
                      onClick={toggleChatbot}
                      className="p-1 hover:bg-white/20 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatState.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === 'bot' && (
                          <Bot className="w-4 h-4 mt-1 text-green-500" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                          {/* Message actions */}
                          {message.actions && message.actions.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {message.actions.map((action, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleActionClick(action)}
                                  className="flex items-center space-x-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded transition-colors w-full"
                                >
                                  {action.icon}
                                  <span>{action.label}</span>
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Response metadata */}
                          {message.response && (
                            <div className="mt-2 text-xs text-gray-500 space-y-1">
                              <div className="flex items-center space-x-2">
                                <Star className="w-3 h-3" />
                                <span>Confidence: {Math.round(message.response.confidence * 100)}%</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="w-3 h-3" />
                                <span>Study time: {message.response.estimatedStudyTime} min</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {chatState.isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-green-500" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about Biology..."
                      className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={1}
                    />

                    {voiceRecognition.isSupported && (
                      <button
                        onClick={handleVoiceToggle}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded ${
                          voiceRecognition.isListening ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {voiceRecognition.isListening ?
                          <MicOff className="w-4 h-4" /> :
                          <Mic className="w-4 h-4" />
                        }
                      </button>
                    )}
                  </div>

                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || chatState.isTyping}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                {voiceRecognition.isListening && (
                  <div className="mt-2 text-xs text-gray-500">
                    🎤 Listening... (Confidence: {Math.round(voiceRecognition.confidence * 100)}%)
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AIErrorBoundary>
  )
}

export default BiologyTutorChatbot