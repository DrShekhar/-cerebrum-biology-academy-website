'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  BookOpen,
  Brain,
  Clock,
  Star,
  TrendingUp,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'
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
  visualAids?: {
    mnemonics?: string[]
    diagrams?: string[]
  }
  relatedTopics?: string[]
  studyTips?: string[]
  practiceQuestions?: string[]
  examRelevance?: string
  estimatedStudyTime?: number
  confidence: number
}
import { AIErrorBoundary } from '@/components/ai/AIErrorBoundary'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

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
  type: 'practice' | 'diagram' | 'study_plan' | 'related_topic' | 'human_tutor' | 'link'
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
      learningStyle: 'visual',
    },
    voiceSettings: {
      enabled: true,
      autoPlay: false,
      speed: 1,
    },
  })

  const [inputValue, setInputValue] = useState('')
  const [voiceRecognition, setVoiceRecognition] = useState<VoiceRecognition>({
    isSupported: false,
    isListening: false,
    transcript: '',
    confidence: 0,
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

        setVoiceRecognition((prev) => ({
          ...prev,
          transcript,
          confidence,
        }))

        if (event.results[0].isFinal) {
          setInputValue(transcript)
          setVoiceRecognition((prev) => ({ ...prev, isListening: false }))
        }
      }

      recognitionRef.current.onerror = () => {
        setVoiceRecognition((prev) => ({ ...prev, isListening: false }))
      }

      setVoiceRecognition((prev) => ({ ...prev, isSupported: true }))
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
          data: { type: 'practice_questions' },
        },
        {
          type: 'diagram',
          label: 'Explain Diagrams',
          icon: <Brain className="w-4 h-4" />,
          data: { type: 'diagram_explanation' },
        },
        {
          type: 'study_plan',
          label: 'Study Plan',
          icon: <Clock className="w-4 h-4" />,
          data: { type: 'personalized_study_plan' },
        },
      ],
    }

    setChatState((prev) => ({
      ...prev,
      messages: [welcomeMessage],
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
      timestamp: new Date(),
    }

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
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
        timestamp: new Date(),
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
              urgency: 'low',
            },
          },
        }),
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
        actions: generateChatActions(response),
      }

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isTyping: false,
        currentTopic: response.relatedTopics[0],
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
        content:
          "I'm experiencing some technical difficulties. Let me connect you with a human tutor or try asking your question in a different way.",
        timestamp: new Date(),
        actions: [
          {
            type: 'human_tutor',
            label: 'Talk to Human Tutor',
            icon: <User className="w-4 h-4" />,
          },
        ],
      }

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isTyping: false,
      }))
    }
  }

  const detectQueryType = (question: string): BiologyQuery['queryType'] => {
    const lowerQuestion = question.toLowerCase()

    if (
      lowerQuestion.includes('diagram') ||
      lowerQuestion.includes('draw') ||
      lowerQuestion.includes('structure')
    ) {
      return 'diagram'
    }
    if (
      lowerQuestion.includes('solve') ||
      lowerQuestion.includes('calculate') ||
      lowerQuestion.includes('problem')
    ) {
      return 'problem'
    }
    if (
      lowerQuestion.includes('remember') ||
      lowerQuestion.includes('memorize') ||
      lowerQuestion.includes('mnemonic')
    ) {
      return 'memory'
    }
    if (
      lowerQuestion.includes('apply') ||
      lowerQuestion.includes('use') ||
      lowerQuestion.includes('example')
    ) {
      return 'application'
    }

    return 'concept'
  }

  const detectTopic = (question: string): string => {
    const lowerQuestion = question.toLowerCase()

    // Biology topic detection
    if (
      lowerQuestion.includes('cell') ||
      lowerQuestion.includes('membrane') ||
      lowerQuestion.includes('mitochondria')
    ) {
      return 'Cell Biology'
    }
    if (
      lowerQuestion.includes('photosynthesis') ||
      lowerQuestion.includes('respiration') ||
      lowerQuestion.includes('enzyme')
    ) {
      return 'Physiology'
    }
    if (
      lowerQuestion.includes('dna') ||
      lowerQuestion.includes('gene') ||
      lowerQuestion.includes('chromosome')
    ) {
      return 'Genetics'
    }
    if (
      lowerQuestion.includes('evolution') ||
      lowerQuestion.includes('species') ||
      lowerQuestion.includes('natural selection')
    ) {
      return 'Evolution'
    }
    if (
      lowerQuestion.includes('ecosystem') ||
      lowerQuestion.includes('biodiversity') ||
      lowerQuestion.includes('ecology')
    ) {
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
      formatted +=
        '\n\n📚 **Study Tips:**\n' + response.studyTips.map((tip) => `• ${tip}`).join('\n')
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
        data: { questions: response.practiceQuestions },
      })
    }

    if (response.visualAids?.diagrams && response.visualAids.diagrams.length > 0) {
      actions.push({
        type: 'diagram',
        label: 'View Diagrams',
        icon: <Brain className="w-4 h-4" />,
        data: { diagrams: response.visualAids.diagrams },
      })
    }

    if (response.relatedTopics && response.relatedTopics.length > 0) {
      actions.push({
        type: 'related_topic',
        label: 'Related Topics',
        icon: <TrendingUp className="w-4 h-4" />,
        data: { topics: response.relatedTopics },
      })
    }

    return actions
  }

  const handleVoiceToggle = () => {
    if (!voiceRecognition.isSupported) return

    if (voiceRecognition.isListening) {
      recognitionRef.current?.stop()
      setVoiceRecognition((prev) => ({ ...prev, isListening: false }))
    } else {
      recognitionRef.current?.start()
      setVoiceRecognition((prev) => ({ ...prev, isListening: true }))
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
    setChatState((prev) => ({ ...prev, isOpen: !prev.isOpen }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleActionClick = async (action: ChatAction) => {
    setChatState((prev) => ({ ...prev, isTyping: true }))

    try {
      switch (action.type) {
        case 'practice':
          await handlePracticeQuestions(action.data)
          break
        case 'diagram':
          await handleDiagramView(action.data)
          break
        case 'study_plan':
          await handleStudyPlanGeneration(action.data)
          break
        case 'related_topic':
          await handleRelatedTopicExploration(action.data)
          break
        case 'human_tutor':
          handleHumanTutorConnection(action.data)
          break
        case 'link':
          // Open WhatsApp with tracking
          if (action.data?.source) {
            await trackAndOpenWhatsApp({
              source: action.data.source,
              message: action.data.message,
              campaign: 'biology-tutor-chatbot',
            })
          } else {
            // Fallback for legacy links
            window.open(action.data, '_blank', 'noopener,noreferrer')
          }
          setChatState((prev) => ({ ...prev, isTyping: false }))
          break
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'bot',
        content: `Sorry, I encountered an error processing your request: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
        timestamp: new Date(),
      }
      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        isTyping: false,
      }))
    }
  }

  const handlePracticeQuestions = async (data: string) => {
    const topic = data || 'general Biology'
    const practiceMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      content: `Generating 5 practice questions on ${topic}...`,
      timestamp: new Date(),
    }

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, practiceMessage],
    }))

    try {
      const response = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Generate 5 NEET-level practice questions on ${topic} with detailed solutions`,
          studentId: 'current_student',
          mode: 'practice_generation',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate practice questions')
      }

      const result = await response.json()
      const questionsMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content:
          result.response ||
          'Here are your practice questions:\n\n' + result.questions?.join('\n\n'),
        timestamp: new Date(),
      }

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, questionsMessage],
        isTyping: false,
      }))
    } catch (error) {
      throw error
    }
  }

  const handleDiagramView = async (data: string) => {
    const diagramMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      content: `Let me help you understand the diagram for ${data}. You can upload an image using the attachment icon, or I can provide a detailed explanation of common ${data} diagrams.`,
      timestamp: new Date(),
      actions: [
        {
          type: 'practice',
          label: 'Get diagram questions',
          data: data,
        },
      ],
    }

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, diagramMessage],
      isTyping: false,
    }))
  }

  const handleStudyPlanGeneration = async (data: string) => {
    const planMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      content: `Creating a personalized study plan for ${data}...`,
      timestamp: new Date(),
    }

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, planMessage],
    }))

    try {
      const response = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Create a detailed 7-day study plan for ${data} focused on NEET preparation`,
          studentId: 'current_student',
          mode: 'study_plan',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate study plan')
      }

      const result = await response.json()
      const studyPlanMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: result.response || result.studyPlan,
        timestamp: new Date(),
      }

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, studyPlanMessage],
        isTyping: false,
      }))
    } catch (error) {
      throw error
    }
  }

  const handleRelatedTopicExploration = async (data: string) => {
    const relatedMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      content: `Exploring topics related to ${data}...`,
      timestamp: new Date(),
    }

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, relatedMessage],
    }))

    try {
      const response = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `What topics are related to ${data} for NEET? Explain the connections and which ones I should study together.`,
          studentId: 'current_student',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch related topics')
      }

      const result = await response.json()
      const topicsMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: result.response,
        timestamp: new Date(),
        actions: result.relatedTopics?.map((topic: string) => ({
          type: 'related_topic',
          label: `Learn about ${topic}`,
          data: topic,
        })),
      }

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, topicsMessage],
        isTyping: false,
      }))
    } catch (error) {
      throw error
    }
  }

  const handleHumanTutorConnection = (data: string) => {
    const whatsappMessage = `Hi! I need help with Biology${data ? ` - ${data}` : ''}. Can I connect with a tutor?`
    const tutorMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      content: `I understand you'd like to connect with a human tutor${data ? ` for ${data}` : ''}. Our expert biology tutors are available for personalized doubt-solving sessions.\n\n📱 WhatsApp: +91-8826-444334\n📧 Email: support@cerebrumbiologyacademy.com\n\nOr I can continue helping you with your questions!`,
      timestamp: new Date(),
      actions: [
        {
          type: 'link',
          label: '💬 Chat on WhatsApp',
          data: { message: whatsappMessage, source: 'biology-tutor-chatbot' },
        },
        {
          type: 'practice',
          label: 'Continue with AI tutor',
          data: data || 'current topic',
        },
      ],
    }

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, tutorMessage],
      isTyping: false,
    }))
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
              className="bg-gradient-to-r from-green-600 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
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
              className="bg-white rounded-lg shadow-2xl md:w-80 md:h-96 flex flex-col border border-gray-200 fixed inset-0 md:inset-auto md:bottom-4 md:right-4 z-50"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-blue-500 text-white p-4 md:rounded-t-lg">
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
                      onClick={() =>
                        setChatState((prev) => ({
                          ...prev,
                          voiceSettings: {
                            ...prev.voiceSettings,
                            autoPlay: !prev.voiceSettings.autoPlay,
                          },
                        }))
                      }
                      className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-white/20 rounded touch-manipulation"
                      aria-label={chatState.voiceSettings.autoPlay ? 'Mute voice' : 'Enable voice'}
                    >
                      {chatState.voiceSettings.autoPlay ? (
                        <Volume2 className="w-4 h-4" />
                      ) : (
                        <VolumeX className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={toggleChatbot}
                      className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-white/20 rounded touch-manipulation"
                      aria-label="Close chatbot"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatState.messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <EmptyState
                      icon={MessageCircle}
                      title="Ask me anything about Biology!"
                      description="I can explain concepts, solve doubts, and help you understand difficult topics for NEET and school exams."
                      size="sm"
                      variant="default"
                      animate={false}
                    />
                  </div>
                ) : (
                  chatState.messages.map((message) => (
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
                            <Bot className="w-4 h-4 mt-1 text-green-600" />
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
                                  <span>
                                    Confidence: {Math.round(message.response.confidence * 100)}%
                                  </span>
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
                  ))
                )}

                {chatState.isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-green-600" />
                        <div className="flex space-x-1">
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: 0.1,
                            }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -8, 0] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: 0.2,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 pb-safe-bottom">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about Biology..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-base min-h-[48px]"
                      rows={1}
                    />

                    {voiceRecognition.isSupported && (
                      <button
                        onClick={handleVoiceToggle}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded touch-manipulation ${
                          voiceRecognition.isListening
                            ? 'bg-red-100 text-red-500'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                        aria-label={
                          voiceRecognition.isListening ? 'Stop voice input' : 'Start voice input'
                        }
                      >
                        {voiceRecognition.isListening ? (
                          <MicOff className="w-4 h-4" />
                        ) : (
                          <Mic className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>

                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || chatState.isTyping}
                    whileHover={!inputValue.trim() || chatState.isTyping ? {} : { scale: 1.05 }}
                    whileTap={!inputValue.trim() || chatState.isTyping ? {} : { scale: 0.95 }}
                    className="bg-blue-500 text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors touch-manipulation"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
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
