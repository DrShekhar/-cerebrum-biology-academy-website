'use client'

import React, { useState, useEffect, useRef } from 'react'

// Prevent memory leaks in long chat sessions
const MAX_MESSAGES = 100
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  X,
  Send,
  Phone,
  Mail,
  Clock,
  Minimize2,
  Maximize2,
  Paperclip,
  Smile,
  AlertCircle,
  Video,
} from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'agent' | 'bot'
  timestamp: Date
  agentName?: string
  messageType?: 'text' | 'quick-reply' | 'file' | 'system'
  quickReplies?: string[]
  rating?: number
}

interface AgentInfo {
  name: string
  role: string
  avatar: string
  status: 'online' | 'busy' | 'away'
  expertise: string[]
  rating: number
  responseTime: string
}

const LiveChatSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentMessage, setCurrentMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [chatStage, setChatStage] = useState<'initial' | 'connected' | 'ended'>('initial')
  const [currentAgent, setCurrentAgent] = useState<AgentInfo | null>(null)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const [connectionTime, setConnectionTime] = useState<Date | null>(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const agents: AgentInfo[] = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Academic Counselor',
      avatar: '👩‍🏫',
      status: 'online',
      expertise: ['Course Selection', 'Study Planning', 'NEET Strategy'],
      rating: 4.9,
      responseTime: '< 1 min',
    },
    {
      name: 'Rajesh Kumar',
      role: 'Admissions Specialist',
      avatar: '👨‍💼',
      status: 'online',
      expertise: ['Enrollment', 'Fees', 'Documentation'],
      rating: 4.8,
      responseTime: '< 2 min',
    },
    {
      name: 'Neha Gupta',
      role: 'Technical Support',
      avatar: '👩‍💻',
      status: 'busy',
      expertise: ['Platform Issues', 'Login Help', 'App Support'],
      rating: 4.7,
      responseTime: '< 3 min',
    },
  ]

  const quickActions = [
    { id: 'course-info', text: 'Course Information', icon: '📚' },
    { id: 'fees', text: 'Fee Structure', icon: '💰' },
    { id: 'demo-class', text: 'Book Demo Class', icon: '🎓' },
    { id: 'technical-help', text: 'Technical Help', icon: '🔧' },
    { id: 'admission', text: 'Admission Process', icon: '📝' },
    { id: 'schedule', text: 'Class Schedule', icon: '⏰' },
  ]

  const predefinedResponses = {
    'course-info': {
      text: 'I can help you with course information! We offer three main series: Ascent (₹45,000), Pinnacle (₹75,000), and Pursuit (₹1,25,000). Which one interests you?',
      quickReplies: ['Ascent Series', 'Pinnacle Series', 'Pursuit Series', 'Compare All'],
    },
    fees: {
      text: 'Our fee structure is transparent with flexible payment options. Would you like to know about a specific course or payment plans?',
      quickReplies: ['Fee Breakdown', 'EMI Options', 'Scholarships', 'Refund Policy'],
    },
    'demo-class': {
      text: 'Great! I can help you book a free demo class. What subject would you prefer for your demo?',
      quickReplies: ['Biology', 'Chemistry', 'Physics', 'Any Subject'],
    },
  }

  useEffect(() => {
    if (messages.length > 0 && !isOpen) {
      setUnreadCount((prev) => prev + 1)
    } else if (isOpen) {
      setUnreadCount(0)
    }
  }, [messages, isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage].slice(-MAX_MESSAGES))
    setCurrentMessage('')

    if (chatStage === 'initial') {
      setTimeout(() => {
        connectToAgent()
      }, 1000)
    } else {
      simulateAgentResponse(currentMessage)
    }
  }

  const connectToAgent = () => {
    const availableAgent = agents.find((agent) => agent.status === 'online') || agents[0]
    setCurrentAgent(availableAgent)
    setChatStage('connected')
    setConnectionTime(new Date())

    setTimeout(() => {
      const welcomeMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Hi! I'm ${availableAgent.name}, your ${availableAgent.role}. I'm here to help you with any questions about Cerebrum Biology Academy. How can I assist you today?`,
        sender: 'agent',
        timestamp: new Date(),
        agentName: availableAgent.name,
      }
      setMessages((prev) => [...prev, welcomeMessage].slice(-MAX_MESSAGES))
    }, 1500)
  }

  const simulateAgentResponse = (userMessage: string) => {
    setIsTyping(true)

    setTimeout(
      () => {
        const lowerMessage = userMessage.toLowerCase()
        let responseText =
          "Thank you for your message! Let me help you with that. Can you provide more details about what specifically you'd like to know?"
        let quickReplies: string[] = []

        if (lowerMessage.includes('course') || lowerMessage.includes('series')) {
          responseText = predefinedResponses['course-info'].text
          quickReplies = predefinedResponses['course-info'].quickReplies!
        } else if (
          lowerMessage.includes('fee') ||
          lowerMessage.includes('cost') ||
          lowerMessage.includes('price')
        ) {
          responseText = predefinedResponses['fees'].text
          quickReplies = predefinedResponses['fees'].quickReplies!
        } else if (lowerMessage.includes('demo') || lowerMessage.includes('trial')) {
          responseText = predefinedResponses['demo-class'].text
          quickReplies = predefinedResponses['demo-class'].quickReplies!
        } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
          responseText = "You're welcome! Is there anything else I can help you with today?"
          quickReplies = ['More Questions', 'End Chat', 'Rate Experience']
        }

        const agentMessage: Message = {
          id: Date.now().toString(),
          text: responseText,
          sender: 'agent',
          timestamp: new Date(),
          agentName: currentAgent?.name,
          quickReplies,
        }

        setMessages((prev) => [...prev, agentMessage].slice(-MAX_MESSAGES))
        setIsTyping(false)
      },
      1500 + Math.random() * 1500
    )
  }

  const handleQuickAction = (actionId: string) => {
    const action = quickActions.find((a) => a.id === actionId)
    if (action) {
      setCurrentMessage(action.text)
      handleSendMessage()
    }
    setShowQuickActions(false)
  }

  const handleQuickReply = (reply: string) => {
    setCurrentMessage(reply)
    setTimeout(handleSendMessage, 100)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-600'
      case 'busy':
        return 'bg-yellow-500'
      case 'away':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 ${isOpen ? 'hidden' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
            <MessageCircle className="w-8 h-8" />
          </div>
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 rounded-full border-2 border-white animate-pulse" />
        </div>
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: isMinimized ? 'auto' : '600px',
            }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-6 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                      {currentAgent ? currentAgent.avatar : '🎓'}
                    </div>
                    {currentAgent && (
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(currentAgent.status)} rounded-full border-2 border-white`}
                      />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">
                      {currentAgent ? currentAgent.name : 'Cerebrum Support'}
                    </div>
                    <div className="text-xs text-green-100">
                      {currentAgent
                        ? `${currentAgent.role} • ${currentAgent.responseTime} response`
                        : "We're here to help!"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1 hover:bg-white/20 rounded"
                  >
                    {isMinimized ? (
                      <Maximize2 className="w-4 h-4" />
                    ) : (
                      <Minimize2 className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white/20 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {currentAgent && !isMinimized && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {currentAgent.expertise.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-white/20 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.length === 0 ? (
                    <div className="text-center space-y-4">
                      <div className="text-6xl">👋</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Welcome to Cerebrum Support!
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          How can we help you today? Choose a quick action or type your question.
                        </p>
                      </div>

                      {showQuickActions && (
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          {quickActions.map((action) => (
                            <button
                              key={action.id}
                              onClick={() => handleQuickAction(action.id)}
                              className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-400 transition-colors text-left"
                            >
                              <div className="text-lg mb-1">{action.icon}</div>
                              <div className="text-xs font-medium text-gray-900">{action.text}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} className="space-y-2">
                        <div
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                              message.sender === 'user'
                                ? 'bg-green-600 text-white'
                                : 'bg-white border border-gray-200 text-gray-900'
                            }`}
                          >
                            {message.sender === 'agent' && (
                              <div className="text-xs text-gray-500 mb-1 font-medium">
                                {message.agentName}
                              </div>
                            )}
                            <div>{message.text}</div>
                            <div
                              className={`text-xs mt-1 ${
                                message.sender === 'user' ? 'text-green-100' : 'text-gray-400'
                              }`}
                            >
                              {formatTime(message.timestamp)}
                            </div>
                          </div>
                        </div>

                        {message.quickReplies && (
                          <div className="flex flex-wrap gap-2 ml-4">
                            {message.quickReplies.map((reply, index) => (
                              <button
                                key={index}
                                onClick={() => handleQuickReply(reply)}
                                className="px-3 py-1 bg-white border border-green-400 text-green-600 rounded-full text-xs hover:bg-green-50 transition-colors"
                              >
                                {reply}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2 max-w-xs">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0.1s' }}
                          />
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: '0.2s' }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-600 focus:border-green-600 pr-20"
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Paperclip className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Smile className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!currentMessage.trim()}
                      className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Additional Actions */}
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 hover:text-green-600">
                        <Phone className="w-3 h-3" />
                        Call
                      </button>
                      <button className="flex items-center gap-1 hover:text-green-600">
                        <Video className="w-3 h-3" />
                        Video
                      </button>
                      <button className="flex items-center gap-1 hover:text-green-600">
                        <Mail className="w-3 h-3" />
                        Email
                      </button>
                    </div>
                    {connectionTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Connected {formatTime(connectionTime)}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Offline Message */}
      {isOpen && !currentAgent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 right-6 z-40 bg-yellow-100 border border-yellow-300 rounded-lg p-3 text-sm text-yellow-800 max-w-xs"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>All agents are busy. Average wait time: 3-5 minutes</span>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default LiveChatSupport
