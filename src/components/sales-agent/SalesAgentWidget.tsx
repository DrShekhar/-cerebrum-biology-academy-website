'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  X,
  Send,
  Phone,
  Calendar,
  GraduationCap,
  Star,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Bot,
  Loader2,
  Maximize2,
  Minimize2,
} from 'lucide-react'

// Types
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  actions?: QuickAction[]
}

interface QuickAction {
  label: string
  value: string
  icon?: React.ReactNode
}

interface LeadData {
  name?: string
  phone?: string
  email?: string
  class?: string
  currentCoaching?: string
  source: string
  score: number
  capturedAt?: Date
}

// Sales Agent Personality & Knowledge
const ARIA_PERSONALITY = {
  name: 'ARIA',
  fullName: 'Admissions & Retention Intelligence Assistant',
  greeting: (hour: number) => {
    if (hour < 12) return 'Good morning!'
    if (hour < 17) return 'Good afternoon!'
    return 'Good evening!'
  },
  tagline: 'Your NEET Biology Expert',
}

// Quick starter questions
const STARTER_QUESTIONS: QuickAction[] = [
  {
    label: 'Why Cerebrum?',
    value: 'Why should I join Cerebrum Biology Academy?',
    icon: <Star className="w-3 h-3" />,
  },
  {
    label: 'Course Details',
    value: 'Tell me about your courses and pricing',
    icon: <GraduationCap className="w-3 h-3" />,
  },
  {
    label: 'Free Demo',
    value: 'I want to attend a free demo class',
    icon: <Calendar className="w-3 h-3" />,
  },
  {
    label: 'Already have coaching',
    value: 'I already have a coaching institute, can I still join?',
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
]

// Note: Hardcoded KNOWLEDGE_BASE and findResponse removed
// Now using Claude AI API at /api/aria/chat for intelligent responses

// Lead scoring function
function calculateLeadScore(data: Partial<LeadData>, messages: Message[]): number {
  let score = 0

  if (data.name) score += 20
  if (data.phone) score += 30
  if (data.email) score += 15
  if (data.class) score += 15

  // Interest signals from conversation
  const userMessages = messages
    .filter((m) => m.role === 'user')
    .map((m) => m.content.toLowerCase())
    .join(' ')
  if (userMessages.includes('demo')) score += 10
  if (userMessages.includes('enroll') || userMessages.includes('join')) score += 15
  if (userMessages.includes('price') || userMessages.includes('cost')) score += 5

  return Math.min(score, 100)
}

export default function SalesAgentWidget() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  const [isOpen, setIsOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [leadData, setLeadData] = useState<LeadData>({ source: 'chat_widget', score: 0 })
  const [leadCaptureStep, setLeadCaptureStep] = useState<
    'none' | 'name' | 'phone' | 'class' | 'complete'
  >('none')
  const [unreadCount, setUnreadCount] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // ARIA should ONLY show on public pages (homepage, landing pages, pricing)
  // Should NOT show on authenticated pages (dashboard, tests, profile)
  const shouldShowAria =
    !isAuthenticated ||
    (!pathname.startsWith('/dashboard') &&
      !pathname.startsWith('/tests') &&
      !pathname.startsWith('/ai-education-demo') &&
      !pathname.startsWith('/profile') &&
      !pathname.startsWith('/courses/enrolled'))

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setUnreadCount(0)
    }
  }, [isOpen])

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const hour = new Date().getHours()
      const greeting: Message = {
        id: 'greeting',
        role: 'assistant',
        content: `${ARIA_PERSONALITY.greeting(hour)} I'm **ARIA**, your NEET Biology expert at Cerebrum! 🧬

I can help you with:
- Understanding our courses & pricing
- Booking a FREE demo class
- Answering your NEET preparation questions
- Clearing doubts about joining alongside your current coaching

How can I help you today?`,
        timestamp: new Date(),
        actions: STARTER_QUESTIONS,
      }
      setMessages([greeting])
    }
  }, [isOpen, messages.length])

  // Send message handler
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim()) return

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInputValue('')
      setIsTyping(true)

      // Check if we're in lead capture flow
      if (leadCaptureStep !== 'none' && leadCaptureStep !== 'complete') {
        handleLeadCapture(content.trim())
        return
      }

      // Call AI API for intelligent response
      let responseContent: string
      let actions: QuickAction[] | undefined

      try {
        const response = await fetch('/api/aria/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: content,
            conversationHistory: messages.slice(-10).map((m) => ({
              role: m.role,
              content: m.content,
            })),
            context: {
              leadStage: leadCaptureStep,
              leadData: leadData,
            },
          }),
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        // Read SSE stream
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        if (!reader) {
          throw new Error('No response body')
        }

        let accumulatedText = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') break

              try {
                const parsed = JSON.parse(data)
                if (parsed.text) {
                  accumulatedText += parsed.text
                }
              } catch (e) {
                console.error('[ARIA] Failed to parse SSE data:', e)
              }
            }
          }
        }

        responseContent =
          accumulatedText ||
          'I apologize, but I encountered an issue. Can you please rephrase your question?'

        // Add relevant follow-up actions based on content
        if (content.toLowerCase().includes('demo') || content.toLowerCase().includes('free')) {
          actions = [
            { label: '📅 Book Demo Now', value: 'I want to book a free demo class' },
            { label: '📞 Call Me', value: 'I want someone to call me' },
          ]
        } else if (
          content.toLowerCase().includes('course') ||
          content.toLowerCase().includes('price')
        ) {
          actions = [
            { label: '🎓 View Courses', value: 'Tell me more about the courses' },
            { label: '📅 Free Demo', value: 'I want to attend a free demo class' },
          ]
        }
      } catch (error) {
        console.error('[ARIA] API error:', error)

        // Fallback to helpful message
        responseContent = `Thanks for your question! Let me help you with that.

For detailed information about "${content.substring(0, 50)}${content.length > 50 ? '...' : ''}", I'd recommend speaking with our counselor who can give you personalized guidance.

In the meantime, would you like to:
- 📅 Book a FREE demo class to experience our teaching
- 📞 Get a callback from our team
- 💬 Ask about courses, pricing, or results`

        actions = [
          { label: '📅 Book Demo', value: 'I want to book a free demo class' },
          { label: '📞 Request Callback', value: 'I want someone to call me' },
          { label: '📋 Course Details', value: 'Tell me about your courses' },
        ]
      }

      // Check if user shows genuine interest (interest-based, not forced)
      const contentLower = content.toLowerCase()
      const interestSignals = [
        'demo',
        'book',
        'enroll',
        'join',
        'admission',
        'apply',
        'interested',
        'want to',
        'sign up',
        'register',
        'brochure',
        'send me',
        'course details',
        'more info',
        'call me',
      ]
      const showsInterest = interestSignals.some((signal) => contentLower.includes(signal))

      if (showsInterest && !leadData.name && leadCaptureStep === 'none') {
        responseContent += `\n\n---\n\n💡 To help you better, may I know your name? I can then send personalized course information!`
        setLeadCaptureStep('name')
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
        actions,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)

      // Update lead score
      setLeadData((prev) => ({
        ...prev,
        score: calculateLeadScore(prev, [...messages, userMessage]),
      }))

      // Increment unread if closed
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1)
      }
    },
    [messages, leadData, leadCaptureStep, isOpen]
  )

  // Handle lead capture flow
  const handleLeadCapture = useCallback(
    async (input: string) => {
      await new Promise((resolve) => setTimeout(resolve, 300))

      let responseContent: string
      let nextStep: typeof leadCaptureStep = leadCaptureStep

      switch (leadCaptureStep) {
        case 'name':
          setLeadData((prev) => ({ ...prev, name: input }))
          responseContent = `Nice to meet you, **${input}**! 👋\n\nTo send you our course brochure and demo link, could you share your phone number?`
          nextStep = 'phone'
          break

        case 'phone':
          if (!/^[6-9]\d{9}$/.test(input.replace(/\D/g, ''))) {
            responseContent = `Hmm, that doesn't look like a valid Indian phone number. Please enter a 10-digit mobile number starting with 6-9.`
            nextStep = 'phone'
          } else {
            setLeadData((prev) => ({
              ...prev,
              phone: input.replace(/\D/g, ''),
              capturedAt: new Date(),
            }))
            responseContent = `Perfect! 📱\n\nOne last question - which class are you currently in?\n\n1️⃣ Class 11\n2️⃣ Class 12\n3️⃣ Dropper\n4️⃣ Parent of NEET aspirant`
            nextStep = 'class'
          }
          break

        case 'class':
          const classMap: Record<string, string> = {
            '1': 'Class 11',
            '11': 'Class 11',
            'class 11': 'Class 11',
            xi: 'Class 11',
            '2': 'Class 12',
            '12': 'Class 12',
            'class 12': 'Class 12',
            xii: 'Class 12',
            '3': 'Dropper',
            dropper: 'Dropper',
            drop: 'Dropper',
            '4': 'Parent',
            parent: 'Parent',
          }
          const studentClass = classMap[input.toLowerCase()] || input
          setLeadData((prev) => ({ ...prev, class: studentClass }))

          responseContent = `Excellent! 🎯\n\n**Thank you, ${leadData.name}!** Here's what happens next:\n\n✅ Our counselor will call you within 2 hours\n✅ You'll receive course details on WhatsApp\n✅ We'll send you a FREE demo class link\n\nIn the meantime, feel free to ask me anything about NEET preparation!`
          nextStep = 'complete'

          // Submit lead to API (fire and forget)
          submitLead({ ...leadData, class: studentClass })
          break

        default:
          responseContent = 'How can I help you today?'
          nextStep = 'none'
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
      setLeadCaptureStep(nextStep)
    },
    [leadCaptureStep, leadData]
  )

  // Submit lead to API
  const submitLead = async (data: LeadData) => {
    try {
      await fetch('/api/contact/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          class: data.class,
          source: 'ARIA_Sales_Agent',
          message: `Lead captured via ARIA chat. Score: ${data.score}`,
        }),
      })
    } catch (error) {
      console.error('Failed to submit lead:', error)
    }
  }

  // Handle quick action click
  const handleQuickAction = (action: QuickAction) => {
    sendMessage(action.value)
  }

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  // Don't render ARIA on authenticated pages - show Ceri AI instead
  if (!shouldShowAria) return null

  return (
    <>
      {/* Floating Button - ARIA branded (Green to match brand) */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close ARIA Sales Agent Chat' : 'Open ARIA Sales Agent Chat'}
        className="fixed bottom-20 left-4 md:bottom-8 md:left-8 z-[80] bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all"
        style={{
          borderRadius: isOpen ? '50%' : '16px',
          padding: isOpen ? '16px' : '12px 16px',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="flex items-center gap-2">
            {/* ARIA Logo/Badge */}
            <div className="relative">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center border border-white/30">
                <span className="text-[10px] font-bold tracking-tight">ARIA</span>
              </div>
              {/* AI sparkle indicator */}
              <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300" />
            </div>
            {/* Label on desktop */}
            <span className="hidden lg:inline text-sm font-medium whitespace-nowrap">Ask AI</span>
            {/* Unread badge */}
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed z-[80] flex flex-col overflow-hidden border border-gray-200 bg-white shadow-2xl transition-all duration-300 ${
              isFullscreen
                ? 'inset-0 rounded-none'
                : 'bottom-36 left-4 w-[calc(100vw-2rem)] max-h-[55dvh] max-h-[55vh] rounded-2xl sm:bottom-24 sm:left-6 sm:w-[400px] sm:max-h-[70dvh] sm:max-h-[70vh] md:w-[420px] lg:max-h-[75dvh] lg:max-h-[75vh] xl:w-[480px]'
            }`}
            style={isFullscreen ? {
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
              paddingLeft: 'env(safe-area-inset-left)',
              paddingRight: 'env(safe-area-inset-right)',
            } : undefined}
          >
            {/* Header */}
            <div className={`bg-green-500 text-white ${isFullscreen ? 'p-4 sm:p-5' : 'p-4'}`}>
              <div className="flex items-center gap-3">
                <div className={`bg-white/20 rounded-full flex items-center justify-center ${isFullscreen ? 'w-12 h-12' : 'w-10 h-10'}`}>
                  <Sparkles className={isFullscreen ? 'w-6 h-6' : 'w-5 h-5'} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${isFullscreen ? 'text-lg' : 'text-base'}`}>{ARIA_PERSONALITY.name}</h3>
                  <p className={`text-white/80 ${isFullscreen ? 'text-sm' : 'text-xs'}`}>{ARIA_PERSONALITY.tagline}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
                    <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                    Online
                  </div>
                  {/* Fullscreen Toggle */}
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-4 h-4" />
                    ) : (
                      <Maximize2 className="w-4 h-4" />
                    )}
                  </button>
                  {/* Close button in fullscreen */}
                  {isFullscreen && (
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-white/20 rounded-full transition-colors"
                      aria-label="Close chat"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto bg-gray-50 space-y-4 ${isFullscreen ? 'p-6 sm:p-8' : 'p-4'}`}>
              {/* Fullscreen: center content with max-width for readability */}
              <div className={isFullscreen ? 'max-w-3xl mx-auto' : ''}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex mb-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        isFullscreen ? 'max-w-[75%]' : 'max-w-[85%]'
                      } ${
                        message.role === 'user'
                          ? 'bg-green-600 text-white rounded-br-md'
                          : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                      }`}
                    >
                      {/* Avatar for assistant */}
                      {message.role === 'assistant' && (
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className={`text-green-600 ${isFullscreen ? 'w-5 h-5' : 'w-4 h-4'}`} />
                          <span className={`font-medium text-green-600 ${isFullscreen ? 'text-sm' : 'text-xs'}`}>ARIA</span>
                        </div>
                      )}

                      {/* Message content with markdown-like formatting */}
                      <div className={`whitespace-pre-wrap ${isFullscreen ? 'text-base leading-relaxed' : 'text-sm'}`}>
                        {message.content.split('\n').map((line, i) => {
                          // Handle bold text
                          const boldRegex = /\*\*(.*?)\*\*/g
                          const parts = line.split(boldRegex)

                          return (
                            <p key={i} className={i > 0 ? 'mt-2' : ''}>
                              {parts.map((part, j) =>
                                j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                              )}
                            </p>
                          )
                        })}
                      </div>

                      {/* Quick actions */}
                      {message.actions && message.actions.length > 0 && (
                        <div className={`mt-4 flex flex-wrap gap-2 ${isFullscreen ? 'gap-3' : 'gap-2'}`}>
                          {message.actions.map((action, i) => (
                            <button
                              key={i}
                              onClick={() => handleQuickAction(action)}
                              className={`inline-flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-full transition-colors ${
                                isFullscreen ? 'text-sm px-4 py-2' : 'text-xs px-3 py-1.5'
                              }`}
                            >
                              {action.icon}
                              {action.label}
                              <ChevronRight className={isFullscreen ? 'w-4 h-4' : 'w-3 h-3'} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${isFullscreen ? 'px-5 py-4' : 'px-4 py-3'}`}>
                      <div className={`flex items-center ${isFullscreen ? 'gap-2' : 'gap-1'}`}>
                        <span
                          className={`bg-gray-400 rounded-full animate-bounce ${isFullscreen ? 'w-3 h-3' : 'w-2 h-2'}`}
                          style={{ animationDelay: '0ms' }}
                        />
                        <span
                          className={`bg-gray-400 rounded-full animate-bounce ${isFullscreen ? 'w-3 h-3' : 'w-2 h-2'}`}
                          style={{ animationDelay: '150ms' }}
                        />
                        <span
                          className={`bg-gray-400 rounded-full animate-bounce ${isFullscreen ? 'w-3 h-3' : 'w-2 h-2'}`}
                          style={{ animationDelay: '300ms' }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick CTA buttons */}
            <div className={`bg-white border-t border-gray-100 flex gap-2 ${isFullscreen ? 'px-6 py-3 max-w-3xl mx-auto' : 'px-4 py-2'}`}>
              <button
                onClick={() => sendMessage('I want to book a free demo class')}
                className={`flex-1 flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors ${
                  isFullscreen ? 'text-sm py-3 px-4' : 'text-xs py-2 px-3'
                }`}
              >
                <Calendar className={isFullscreen ? 'w-4 h-4' : 'w-3 h-3'} />
                Free Demo
              </button>
              <button
                onClick={() => sendMessage('I want someone to call me')}
                className={`flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors ${
                  isFullscreen ? 'text-sm py-3 px-4' : 'text-xs py-2 px-3'
                }`}
              >
                <Phone className={isFullscreen ? 'w-4 h-4' : 'w-3 h-3'} />
                Call Me
              </button>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className={`bg-white border-t border-gray-200 ${isFullscreen ? 'p-4' : 'p-3'}`}>
              <div className={`flex gap-3 ${isFullscreen ? 'max-w-3xl mx-auto' : ''}`}>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    leadCaptureStep === 'name'
                      ? 'Enter your name...'
                      : leadCaptureStep === 'phone'
                        ? 'Enter phone number...'
                        : leadCaptureStep === 'class'
                          ? 'Enter your class...'
                          : 'Ask me anything...'
                  }
                  className={`flex-1 bg-gray-100 rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    isFullscreen ? 'py-3 text-base' : 'py-2 text-sm'
                  }`}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className={`bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-full transition-colors ${
                    isFullscreen ? 'p-3' : 'p-2'
                  }`}
                >
                  {isTyping ? (
                    <Loader2 className={`animate-spin ${isFullscreen ? 'w-6 h-6' : 'w-5 h-5'}`} />
                  ) : (
                    <Send className={isFullscreen ? 'w-6 h-6' : 'w-5 h-5'} />
                  )}
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className={`bg-gray-50 border-t border-gray-100 text-center ${isFullscreen ? 'px-6 py-3' : 'px-4 py-2'}`}>
              <p className={`text-gray-500 ${isFullscreen ? 'text-sm' : 'text-xs'}`}>
                Powered by{' '}
                <span className="font-medium text-green-600">Cerebrum Biology Academy</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
