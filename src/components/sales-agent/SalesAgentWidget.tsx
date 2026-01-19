'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  X,
  Send,
  Phone,
  Calendar,
  User,
  GraduationCap,
  Sparkles,
  ChevronRight,
  CheckCircle,
  Loader2,
} from 'lucide-react'

// Knowledge base for ARIA
const KNOWLEDGE_BASE = {
  greeting: `Hi! I'm ARIA, your personal guide to Cerebrum Biology Academy. I'm here to help you learn about our NEET Biology coaching program. What would you like to know?`,

  about: `Cerebrum Biology Academy is a specialized NEET Biology coaching institute founded by AIIMS faculty members. We focus exclusively on Biology - the highest-scoring subject in NEET (360 marks out of 720). Our unique approach helps students supplement their existing coaching with expert biology guidance.`,

  usp: [
    'AIIMS Faculty - Learn from doctors who cracked NEET themselves',
    'Biology Specialists - We focus only on what we do best',
    'Supplement-friendly - Works alongside your existing coaching',
    '98% Success Rate - Our students consistently score 320+ in Biology',
    'Affordable Pricing - Quality education at accessible prices',
  ],

  pricing: `Our programs start from ₹15,000 for crash courses to ₹45,000 for year-long intensive programs. We also offer EMI options and scholarships for deserving students. Would you like me to arrange a call to discuss the best plan for you?`,

  courses: `We offer:
• NEET Biology Intensive (1 Year) - Complete syllabus coverage
• NEET Biology Crash Course (3 Months) - Quick revision
• Topic-wise Modules - Focus on weak areas
• Test Series - 50+ full-length tests with analysis

All courses include recorded lectures, doubt clearing sessions, and NCERT-based study material.`,

  faculty: `Our faculty includes:
• Dr. Shekhar - Founder, AIIMS graduate with 10+ years teaching experience
• Team of AIIMS/JIPMER doctors who are passionate about teaching
• All faculty members have personally scored 600+ in NEET`,

  results: `Our track record speaks for itself:
• 98% of students score 320+ in Biology
• 500+ students selected in top medical colleges
• Average improvement of 80-100 marks in Biology
• Multiple AIR under 1000 selections`,

  demo: `Absolutely! We offer a FREE demo class so you can experience our teaching style. Our counselor will call you to schedule a convenient time. Would you like to book one now?`,

  contact: `You can reach us at:
• Phone: +91 98765 43210
• Email: hello@cerebrumbiologyacademy.com
• WhatsApp: Click the "Call Me" button and we'll connect instantly!`,

  fallback: `That's a great question! For detailed information about this, I'd recommend speaking with our counselor who can provide personalized guidance. Would you like me to arrange a callback?`,
}

// Intent detection patterns
const INTENT_PATTERNS: { pattern: RegExp; response: keyof typeof KNOWLEDGE_BASE }[] = [
  { pattern: /price|cost|fee|afford|emi|payment/i, response: 'pricing' },
  { pattern: /course|program|batch|class|syllabus/i, response: 'courses' },
  { pattern: /faculty|teacher|sir|mam|doctor/i, response: 'faculty' },
  { pattern: /result|success|score|rank|selection/i, response: 'results' },
  { pattern: /demo|trial|free|sample/i, response: 'demo' },
  { pattern: /about|who|what is|cerebrum/i, response: 'about' },
  { pattern: /why|special|different|unique|usp/i, response: 'usp' },
  { pattern: /contact|call|phone|whatsapp|reach/i, response: 'contact' },
  { pattern: /hi|hello|hey|good morning|good evening/i, response: 'greeting' },
]

// Lead capture stages
type LeadStage = 'chat' | 'name' | 'phone' | 'class' | 'complete'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  quickActions?: string[]
}

interface LeadData {
  name: string
  phone: string
  studentClass: string
  score: number
  interests: string[]
  source: string
}

// Quick action suggestions
const QUICK_ACTIONS = {
  initial: ['Tell me about courses', 'Pricing details', 'Book a demo', 'Why Cerebrum?'],
  afterPricing: ['Book a demo', 'Talk to counselor', 'Course details'],
  afterCourse: ['Check pricing', 'Book a demo', 'Meet the faculty'],
  afterDemo: ['Yes, book demo!', 'Know more first', 'Pricing details'],
}

export function SalesAgentWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [leadStage, setLeadStage] = useState<LeadStage>('chat')
  const [leadData, setLeadData] = useState<LeadData>({
    name: '',
    phone: '',
    studentClass: '',
    score: 0,
    interests: [],
    source: 'sales-agent',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, leadStage])

  // Initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(KNOWLEDGE_BASE.greeting, QUICK_ACTIONS.initial)
      }, 500)
    }
  }, [isOpen])

  const addBotMessage = useCallback((text: string, quickActions?: string[]) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text,
          sender: 'bot',
          timestamp: new Date(),
          quickActions,
        },
      ])
      setIsTyping(false)
    }, 800 + Math.random() * 400)
  }, [])

  const detectIntent = (message: string): string => {
    for (const { pattern, response } of INTENT_PATTERNS) {
      if (pattern.test(message)) {
        // Track interests for lead scoring
        setLeadData(prev => ({
          ...prev,
          interests: [...new Set([...prev.interests, response])],
          score: prev.score + 10,
        }))

        if (response === 'usp') {
          return KNOWLEDGE_BASE.usp.map((point, i) => `${i + 1}. ${point}`).join('\n')
        }
        return KNOWLEDGE_BASE[response]
      }
    }
    return KNOWLEDGE_BASE.fallback
  }

  const getQuickActionsForResponse = (response: string): string[] => {
    if (response.includes('price') || response.includes('₹')) return QUICK_ACTIONS.afterPricing
    if (response.includes('course') || response.includes('program')) return QUICK_ACTIONS.afterCourse
    if (response.includes('demo')) return QUICK_ACTIONS.afterDemo
    return QUICK_ACTIONS.initial
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setInputValue('')
    setHasInteracted(true)

    // Add user message
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        text: userMessage,
        sender: 'user',
        timestamp: new Date(),
      },
    ])

    // Handle based on current stage
    if (leadStage === 'name') {
      setLeadData(prev => ({ ...prev, name: userMessage, score: prev.score + 20 }))
      setLeadStage('phone')
      addBotMessage(`Nice to meet you, ${userMessage}! What's the best phone number to reach you?`)
      return
    }

    if (leadStage === 'phone') {
      const phoneRegex = /^[6-9]\d{9}$/
      const cleanPhone = userMessage.replace(/\D/g, '').slice(-10)
      if (!phoneRegex.test(cleanPhone)) {
        addBotMessage('Please enter a valid 10-digit Indian mobile number.')
        return
      }
      setLeadData(prev => ({ ...prev, phone: cleanPhone, score: prev.score + 30 }))
      setLeadStage('class')
      addBotMessage('Which class is the student currently in? (11th, 12th, or Dropper)')
      return
    }

    if (leadStage === 'class') {
      setLeadData(prev => ({ ...prev, studentClass: userMessage, score: prev.score + 20 }))
      setLeadStage('complete')
      submitLead({ ...leadData, studentClass: userMessage })
      return
    }

    // Regular chat mode - detect intent
    const response = detectIntent(userMessage)
    const quickActions = getQuickActionsForResponse(response)

    // Check if user shows high intent
    if (
      userMessage.toLowerCase().includes('book') ||
      userMessage.toLowerCase().includes('call me') ||
      userMessage.toLowerCase().includes('yes')
    ) {
      if (!leadData.name) {
        setLeadStage('name')
        addBotMessage(
          "Excellent! Let me connect you with our counselor. First, what's your name?"
        )
        return
      }
    }

    addBotMessage(response, quickActions)
  }

  const handleQuickAction = (action: string) => {
    setInputValue(action)
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }

  const submitLead = async (data: LeadData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          studentClass: data.studentClass,
          message: `Lead from ARIA Sales Agent. Interests: ${data.interests.join(', ')}. Score: ${data.score}`,
          source: 'sales-agent',
          leadScore: data.score,
        }),
      })

      if (response.ok) {
        addBotMessage(
          `Thank you, ${data.name}! Our counselor will call you within 30 minutes on ${data.phone}. In the meantime, feel free to ask me anything else about Cerebrum Biology Academy!`,
          ['Explore courses', 'Meet faculty', 'See results']
        )
      } else {
        throw new Error('Failed to submit')
      }
    } catch {
      addBotMessage(
        "I couldn't submit your details right now. Please try calling us directly at +91 98765 43210 or WhatsApp us!",
        ['Try again', 'Call directly']
      )
    } finally {
      setIsSubmitting(false)
      setLeadStage('chat')
    }
  }

  const startLeadCapture = (type: 'demo' | 'callback') => {
    setLeadStage('name')
    const message =
      type === 'demo'
        ? "Great choice! Let's book your free demo class. What's your name?"
        : "I'll arrange a callback for you. What's your name?"
    addBotMessage(message)
  }

  const getInputPlaceholder = () => {
    switch (leadStage) {
      case 'name':
        return 'Enter your name...'
      case 'phone':
        return 'Enter 10-digit mobile number...'
      case 'class':
        return '11th, 12th, or Dropper...'
      default:
        return 'Type your message...'
    }
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
            aria-label="Open chat"
          >
            <MessageCircle className="w-7 h-7" />
            {!hasInteracted && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">ARIA</h3>
                  <p className="text-xs text-green-100">Your NEET Biology Guide</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex gap-2 p-3 bg-gray-50 border-b">
              <button
                onClick={() => startLeadCapture('demo')}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Book Demo
              </button>
              <button
                onClick={() => startLeadCapture('callback')}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Me
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-green-500 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    {message.quickActions && message.quickActions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.quickActions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuickAction(action)}
                            className="text-xs px-3 py-1.5 bg-white text-green-600 rounded-full border border-green-200 hover:bg-green-50 transition-colors flex items-center gap-1"
                          >
                            {action}
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      />
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Lead Capture Progress */}
            {leadStage !== 'chat' && leadStage !== 'complete' && (
              <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
                <div className="flex items-center gap-2 text-xs text-blue-600">
                  {leadStage === 'name' && (
                    <>
                      <User className="w-4 h-4" />
                      <span>Step 1/3: Your name</span>
                    </>
                  )}
                  {leadStage === 'phone' && (
                    <>
                      <Phone className="w-4 h-4" />
                      <span>Step 2/3: Phone number</span>
                    </>
                  )}
                  {leadStage === 'class' && (
                    <>
                      <GraduationCap className="w-4 h-4" />
                      <span>Step 3/3: Student class</span>
                    </>
                  )}
                </div>
                <div className="mt-1 h-1 bg-blue-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{
                      width:
                        leadStage === 'name' ? '33%' : leadStage === 'phone' ? '66%' : '100%',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <form
                onSubmit={e => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  type={leadStage === 'phone' ? 'tel' : 'text'}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder={getInputPlaceholder()}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isSubmitting}
                  className="p-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-xl transition-colors"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </form>
            </div>

            {/* Lead Score Badge (for debugging - can be removed in production) */}
            {leadData.score > 0 && (
              <div className="absolute top-16 right-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Score: {leadData.score}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
