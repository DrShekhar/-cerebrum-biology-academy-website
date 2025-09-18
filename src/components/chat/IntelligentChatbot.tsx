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
  Calendar,
  Phone,
  Download,
} from 'lucide-react'
import { usePersonalization } from '@/components/providers/PersonalizationProvider'

interface ChatMessage {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  suggestions?: string[]
  actions?: ChatAction[]
}

interface ChatAction {
  type: 'book_demo' | 'call_request' | 'download_brochure' | 'view_course'
  label: string
  data?: any
}

interface ChatbotState {
  isOpen: boolean
  messages: ChatMessage[]
  isTyping: boolean
  currentFlow?: string
  userContext: {
    hasIntroduced: boolean
    hasSharedClass: boolean
    hasSharedGoal: boolean
    hasSharedBudget: boolean
  }
}

export function IntelligentChatbot() {
  const { preferences, updatePreferences, trackBehavior } = usePersonalization()
  const [chatState, setChatState] = useState<ChatbotState>({
    isOpen: false,
    messages: [],
    isTyping: false,
    userContext: {
      hasIntroduced: false,
      hasSharedClass: false,
      hasSharedGoal: false,
      hasSharedBudget: false,
    },
  })
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatState.messages])

  useEffect(() => {
    if (chatState.isOpen && chatState.messages.length === 0) {
      // Initialize chat with personalized greeting
      initializeChat()
    }
  }, [chatState.isOpen])

  const initializeChat = () => {
    const greeting = getPersonalizedGreeting()
    addBotMessage(greeting.content, greeting.suggestions, greeting.actions)
    trackBehavior('chatbot_opened')
  }

  const getPersonalizedGreeting = () => {
    const timeOfDay = new Date().getHours()
    let timeGreeting = 'Hello'
    if (timeOfDay < 12) timeGreeting = 'Good morning'
    else if (timeOfDay < 17) timeGreeting = 'Good afternoon'
    else timeGreeting = 'Good evening'

    let content = `${timeGreeting}! I'm your AI assistant at Biology Academy. `

    if (preferences.currentClass) {
      content += `I see you're in Class ${preferences.currentClass}. `
    }
    if (preferences.targetExam) {
      content += `Preparing for ${preferences.targetExam.toUpperCase()}? `
    }

    content += 'How can I help you today?'

    const suggestions = [
      'Tell me about courses',
      'Book a demo class',
      'Check course fees',
      'Speak with counselor',
    ]

    const actions: ChatAction[] = [
      { type: 'book_demo', label: 'Book Free Demo' },
      { type: 'call_request', label: 'Request Callback' },
    ]

    return { content, suggestions, actions }
  }

  const addBotMessage = (content: string, suggestions?: string[], actions?: ChatAction[]) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date(),
      suggestions,
      actions,
    }

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
      isTyping: false,
    }))
  }

  const addUserMessage = (content: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    }

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }))

    trackBehavior('chatbot_message_sent', { content })
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    addUserMessage(inputValue)
    setInputValue('')

    // Set typing indicator
    setChatState((prev) => ({ ...prev, isTyping: true }))

    // Process message and respond
    setTimeout(
      () => {
        processUserMessage(inputValue)
      },
      1000 + Math.random() * 1000
    ) // Simulate realistic response time
  }

  const processUserMessage = (message: string) => {
    const lowerMessage = message.toLowerCase()

    // Intent detection and personalized responses
    if (lowerMessage.includes('course') || lowerMessage.includes('program')) {
      handleCourseInquiry(lowerMessage)
    } else if (
      lowerMessage.includes('fee') ||
      lowerMessage.includes('price') ||
      lowerMessage.includes('cost')
    ) {
      handleFeeInquiry()
    } else if (lowerMessage.includes('demo') || lowerMessage.includes('trial')) {
      handleDemoRequest()
    } else if (
      lowerMessage.includes('call') ||
      lowerMessage.includes('phone') ||
      lowerMessage.includes('speak')
    ) {
      handleCallRequest()
    } else if (
      lowerMessage.includes('class 11') ||
      lowerMessage.includes('class 12') ||
      lowerMessage.includes('dropper')
    ) {
      handleClassSpecificInquiry(lowerMessage)
    } else if (
      lowerMessage.includes('neet') ||
      lowerMessage.includes('aiims') ||
      lowerMessage.includes('medical')
    ) {
      handleExamSpecificInquiry(lowerMessage)
    } else if (lowerMessage.includes('faculty') || lowerMessage.includes('teacher')) {
      handleFacultyInquiry()
    } else if (lowerMessage.includes('result') || lowerMessage.includes('success')) {
      handleResultInquiry()
    } else {
      handleGeneralInquiry(lowerMessage)
    }
  }

  const handleCourseInquiry = (message: string) => {
    let response = 'We offer comprehensive NEET Biology courses designed for different needs:\n\n'

    if (preferences.currentClass) {
      response += `Based on your profile (Class ${preferences.currentClass}), I recommend:\n\n`

      switch (preferences.currentClass) {
        case '11':
          response +=
            '📚 **Class 11 Foundation Course**\n• Strong concept building\n• Board + NEET preparation\n• Live doubt sessions\n\n'
          break
        case '12':
          response +=
            '📚 **Class 12 Intensive Course**\n• Final year preparation\n• Board + NEET focus\n• Revision & mock tests\n\n'
          break
        case 'dropper':
          response +=
            '📚 **Dropper Program**\n• Complete NEET preparation\n• Previous year analysis\n• Intensive practice\n\n'
          break
      }
    } else {
      response +=
        '📚 **Foundation Course** (Class 11)\n📚 **Intensive Course** (Class 12)\n📚 **Dropper Program**\n📚 **Crash Course**\n\n'
    }

    response += 'Would you like detailed information about any specific course?'

    const suggestions = [
      'Tell me about Class 11 course',
      'Show Class 12 course details',
      'Dropper program info',
      'Book a demo class',
    ]

    const actions: ChatAction[] = [
      { type: 'view_course', label: 'View All Courses' },
      { type: 'book_demo', label: 'Book Demo' },
    ]

    addBotMessage(response, suggestions, actions)
  }

  const handleFeeInquiry = () => {
    let response =
      'Our course fees are designed to be affordable with flexible payment options:\n\n'

    if (preferences.budgetRange) {
      switch (preferences.budgetRange) {
        case 'budget':
          response +=
            '💰 **Budget-Friendly Options:**\n• Online Foundation: ₹15,000-25,000\n• Recorded Lectures: ₹8,000-12,000\n\n'
          break
        case 'standard':
          response +=
            '💰 **Standard Programs:**\n• Live Online Classes: ₹25,000-40,000\n• Offline Classes: ₹35,000-50,000\n\n'
          break
        case 'premium':
          response +=
            '💰 **Premium Programs:**\n• 1-on-1 Mentorship: ₹80,000-1,20,000\n• Small Batch Classes: ₹60,000-80,000\n\n'
          break
      }
    } else {
      response +=
        '💰 **Course Fee Range:**\n• Foundation Course: ₹25,000 - ₹40,000\n• Intensive Course: ₹35,000 - ₹50,000\n• Dropper Program: ₹45,000 - ₹65,000\n• Premium Mentorship: ₹80,000 - ₹1,20,000\n\n'
    }

    response +=
      '✅ EMI options available\n✅ Scholarship programs\n✅ Money-back guarantee\n\nWould you like to speak with our counselor for exact pricing?'

    const suggestions = [
      'Tell me about EMI options',
      'Scholarship information',
      'Speak with counselor',
      'Book demo first',
    ]

    const actions: ChatAction[] = [
      { type: 'call_request', label: 'Get Fee Details' },
      { type: 'download_brochure', label: 'Download Brochure' },
    ]

    addBotMessage(response, suggestions, actions)
  }

  const handleDemoRequest = () => {
    const response =
      'Great choice! Our free demo class will give you a complete experience of our teaching methodology.\n\n' +
      "🎯 **What you'll get:**\n" +
      '• Live interaction with AIIMS faculty\n' +
      '• Sample of our teaching style\n' +
      '• Course roadmap discussion\n' +
      '• Doubt clearing session\n\n' +
      'Demo classes are available every day at 4 PM and 7 PM. Which time works better for you?'

    const suggestions = ['4 PM slot', '7 PM slot', 'Weekend demo', 'Call me to schedule']

    const actions: ChatAction[] = [{ type: 'book_demo', label: 'Book Demo Now' }]

    addBotMessage(response, suggestions, actions)
  }

  const handleCallRequest = () => {
    const response =
      "I'll arrange for our expert counselor to call you!\n\n" +
      '📞 **Our counselor will:**\n' +
      '• Understand your specific needs\n' +
      '• Recommend the best course for you\n' +
      '• Discuss fees and payment options\n' +
      '• Answer all your questions\n\n' +
      'When would be a good time to call you?'

    const suggestions = ['Call now', 'Call in 1 hour', 'Call tomorrow', "I'll provide my number"]

    const actions: ChatAction[] = [{ type: 'call_request', label: 'Request Callback' }]

    addBotMessage(response, suggestions, actions)
  }

  const handleClassSpecificInquiry = (message: string) => {
    let classType = ''
    if (message.includes('class 11')) classType = '11'
    else if (message.includes('class 12')) classType = '12'
    else if (message.includes('dropper')) classType = 'dropper'

    // Update preferences if not already set
    if (!preferences.currentClass && classType) {
      updatePreferences({ currentClass: classType as any })
    }

    let response = `Perfect! Let me tell you about our Class ${classType} program:\n\n`

    switch (classType) {
      case '11':
        response +=
          '📚 **Class 11 Foundation Course Features:**\n' +
          '• Strong conceptual foundation\n' +
          '• NCERT + Advanced concepts\n' +
          '• Regular tests and assessments\n' +
          '• Board exam preparation\n' +
          '• Duration: 1 year\n' +
          '• Batch size: 25-30 students\n\n'
        break
      case '12':
        response +=
          '📚 **Class 12 Intensive Course Features:**\n' +
          '• Complete NEET syllabus coverage\n' +
          '• Board + NEET preparation\n' +
          '• Extensive practice sessions\n' +
          '• Mock tests and analysis\n' +
          '• Duration: 1 year\n' +
          '• Crash course available\n\n'
        break
      case 'dropper':
        response +=
          '📚 **Dropper Program Features:**\n' +
          '• Complete NEET preparation\n' +
          '• Previous year paper analysis\n' +
          '• Intensive practice sessions\n' +
          '• Mentorship and motivation\n' +
          '• Duration: 1 year\n' +
          '• Small batch advantage\n\n'
        break
    }

    response += 'Would you like to book a demo class to experience our teaching?'

    const suggestions = [
      'Book demo class',
      'Tell me about fees',
      'Faculty information',
      'Success rate',
    ]

    addBotMessage(response, suggestions)
  }

  const handleExamSpecificInquiry = (message: string) => {
    let response = 'Excellent! NEET Biology is our specialty with a proven track record:\n\n'

    response +=
      '🎯 **Our NEET Biology Results:**\n' +
      '• 94.2% success rate\n' +
      '• Average biology score: 335+/360\n' +
      '• 247 AIIMS selections in 2024\n' +
      '• 2,847+ medical college admissions\n\n' +
      '📚 **Our NEET Biology Approach:**\n' +
      '• Complete NCERT mastery\n' +
      '• High-yield topic focus\n' +
      '• Previous 20 years analysis\n' +
      '• Weekly mock tests\n' +
      '• Doubt clearing sessions\n\n'

    if (preferences.targetScore) {
      response += `Based on your target score of ${preferences.targetScore}, our program is perfect for achieving your goal!\n\n`
    }

    response += 'Ready to start your NEET Biology journey with us?'

    const suggestions = [
      'Book demo class',
      'See success stories',
      'Course structure',
      'Fee details',
    ]

    addBotMessage(response, suggestions)
  }

  const handleFacultyInquiry = () => {
    const response =
      'Our faculty is our biggest strength! Meet our expert team:\n\n' +
      '👨‍⚕️ **Dr. Shekhar - Founder & Lead Faculty**\n' +
      '• AIIMS Delhi alumnus\n' +
      '• 15+ years teaching experience\n' +
      '• 10,000+ students taught\n' +
      '• Author of NEET Biology guides\n\n' +
      '👩‍🔬 **Our Faculty Team:**\n' +
      '• 25+ PhD & MD faculty members\n' +
      '• Average 10+ years experience\n' +
      '• AIIMS, AFMC, CMC alumni\n' +
      '• Regular training and updates\n\n' +
      '🎥 **Faculty Interaction:**\n' +
      '• Live doubt clearing sessions\n' +
      '• One-on-one mentorship\n' +
      '• Weekly faculty meetings\n' +
      '• Personalized feedback\n\n' +
      'Would you like to meet our faculty in a demo class?'

    const suggestions = [
      'Book demo class',
      'Meet Dr. Shekhar',
      'Faculty videos',
      'Teaching methodology',
    ]

    addBotMessage(response, suggestions)
  }

  const handleResultInquiry = () => {
    const response =
      "Our results speak for themselves! Here's our track record:\n\n" +
      '🏆 **2024 NEET Results:**\n' +
      '• 94.2% success rate (National avg: 23%)\n' +
      '• 247 AIIMS selections\n' +
      '• 156 AFMC selections\n' +
      '• 2,847 total medical college admissions\n\n' +
      '📊 **Score Improvement:**\n' +
      '• Average improvement: 127 points\n' +
      '• Biology average: 335+/360\n' +
      '• 89% students scored 300+ in Biology\n' +
      '• Fastest improvement: 8 months\n\n' +
      '🎯 **Success Guarantee:**\n' +
      '• 330+ score guarantee in Biology\n' +
      '• Money-back if target not achieved\n' +
      '• Continuous support until success\n\n' +
      'Want to be our next success story?'

    const suggestions = [
      'Book demo class',
      'Success stories',
      'Guarantee details',
      'Start immediately',
    ]

    addBotMessage(response, suggestions)
  }

  const handleGeneralInquiry = (message: string) => {
    const response =
      "I'm here to help you with any questions about our NEET Biology courses!\n\n" +
      '🎯 **I can help you with:**\n' +
      '• Course information and selection\n' +
      '• Fee details and payment options\n' +
      '• Demo class booking\n' +
      '• Faculty and teaching methodology\n' +
      '• Success stories and results\n' +
      '• Scholarship opportunities\n\n' +
      'What would you like to know more about?'

    const suggestions = [
      'Course details',
      'Book demo class',
      'Fee information',
      'Speak with counselor',
    ]

    addBotMessage(response, suggestions)
  }

  const handleSuggestionClick = (suggestion: string) => {
    addUserMessage(suggestion)
    setChatState((prev) => ({ ...prev, isTyping: true }))
    setTimeout(() => processUserMessage(suggestion), 800)
  }

  const handleActionClick = (action: ChatAction) => {
    trackBehavior('chatbot_action_click', { action: action.type })

    switch (action.type) {
      case 'book_demo':
        window.location.href = '/support/demo'
        break
      case 'call_request':
        window.location.href = 'tel:+918826444334'
        break
      case 'download_brochure':
        window.open('/brochure.pdf', '_blank')
        break
      case 'view_course':
        window.location.href = '/courses'
        break
    }
  }

  const toggleChat = () => {
    setChatState((prev) => ({ ...prev, isOpen: !prev.isOpen }))
    trackBehavior(chatState.isOpen ? 'chatbot_closed' : 'chatbot_opened')
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {chatState.isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {chatState.isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-96 h-[32rem] bg-white rounded-2xl shadow-2xl border border-gray-200 z-40 flex flex-col"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-sm text-blue-100">Online • Ready to help</p>
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
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === 'bot' && <Bot className="w-4 h-4 mt-1 text-blue-600" />}
                      <div className="whitespace-pre-line text-sm">{message.content}</div>
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="mt-3 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded border border-white/20 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    {message.actions && (
                      <div className="mt-3 space-y-1">
                        {message.actions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => handleActionClick(action)}
                            className="flex items-center space-x-2 w-full text-left text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors"
                          >
                            {action.type === 'book_demo' && <Calendar className="w-3 h-3" />}
                            {action.type === 'call_request' && <Phone className="w-3 h-3" />}
                            {action.type === 'download_brochure' && (
                              <Download className="w-3 h-3" />
                            )}
                            {action.type === 'view_course' && <BookOpen className="w-3 h-3" />}
                            <span>{action.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {chatState.isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                    <div className="flex items-center space-x-1">
                      <Bot className="w-4 h-4 text-blue-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
