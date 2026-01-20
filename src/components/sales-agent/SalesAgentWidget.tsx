'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
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
  User,
  Bot,
  Loader2,
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
  { label: 'Why Cerebrum?', value: 'Why should I join Cerebrum Biology Academy?', icon: <Star className="w-3 h-3" /> },
  { label: 'Course Details', value: 'Tell me about your courses and pricing', icon: <GraduationCap className="w-3 h-3" /> },
  { label: 'Free Demo', value: 'I want to attend a free demo class', icon: <Calendar className="w-3 h-3" /> },
  { label: 'Already have coaching', value: 'I already have a coaching institute, can I still join?', icon: <CheckCircle2 className="w-3 h-3" /> },
]

// Knowledge base for instant responses
const KNOWLEDGE_BASE: Record<string, string> = {
  'why cerebrum': `Great question! Here's why 10,000+ students trust Cerebrum:

🎯 **Biology-Focused Excellence** - We specialize ONLY in Biology, unlike generic coaching
👨‍⚕️ **AIIMS Faculty** - Learn from doctors who cleared NEET themselves
📊 **98% Selection Rate** - Our results speak for themselves
💰 **Affordable Quality** - Premium education at reasonable prices
🔬 **Concept Clarity** - We focus on making you UNDERSTAND, not just memorize

Would you like to know about our courses or book a free demo?`,

  'courses': `We offer specialized Biology courses for:

📚 **Class 11 Foundation** - ₹15,000/year
   Build strong basics from day one

📚 **Class 12 Intensive** - ₹18,000/year
   Complete NEET Biology in one year

📚 **Dropper Batch** - ₹12,000/6 months
   Intensive revision + test series

📚 **Crash Course** - ₹8,000/3 months
   Last-minute preparation

All courses include:
✅ Live classes + Recordings
✅ Study material (PDF + printed)
✅ Doubt solving sessions
✅ Weekly tests + NEET pattern papers

Want to start with a FREE demo class?`,

  'pricing': `Our courses are designed to be affordable:

💰 **Class 11**: ₹15,000/year (₹1,250/month)
💰 **Class 12**: ₹18,000/year (₹1,500/month)
💰 **Dropper**: ₹12,000/6 months (₹2,000/month)
💰 **Crash Course**: ₹8,000/3 months

Compare this to:
- Allen/Aakash: ₹1-2 lakhs
- Physics Wallah: ₹5,000-20,000
- Unacademy: ₹20,000-60,000

We're 3-5x more affordable with AIIMS faculty! 🎯

Would you like to enroll or try a free demo first?`,

  'demo': `Excellent choice! Our FREE demo class includes:

🎥 **60-minute live session** with AIIMS faculty
📖 **Sample study material** (PDF)
🧪 **10 NEET-pattern MCQs** to test yourself
💬 **Direct doubt solving** with the teacher

To book your demo, I just need:
1. Your name
2. Phone number
3. Current class (11th/12th/Dropper)

Shall I help you book it right now?`,

  'already coaching': `That's actually PERFECT! 🎯

Many of our top performers study at Allen, Aakash, or PW AND use Cerebrum for Biology.

**Why it works:**
✅ Your coaching covers Physics & Chemistry well
✅ We specialize in Biology - deeper than any coaching
✅ Our AIIMS faculty explains concepts your coaching might rush through
✅ Extra practice = Higher marks in Biology (90 questions!)

**Think of it this way:**
- Your coaching = General preparation
- Cerebrum = Biology specialist (like consulting a specialist doctor!)

At just ₹1,000-2,000/month, it's a small investment for a BIG Biology boost.

Want to try our FREE demo to see the difference?`,

  'results': `Our results speak louder than words! 📊

**NEET 2024 Results:**
- 98% of students qualified NEET
- 15 students scored 650+
- 42 students in top 10,000 AIR
- Average Biology score: 340/360

**Why we get these results:**
1. Biology-only focus = Deep expertise
2. AIIMS faculty who cleared NEET themselves
3. Concept-first teaching (not rote learning)
4. Extensive practice with NEET-pattern questions

Ready to be our next success story? 🌟`,

  'faculty': `Our faculty are what make us special! 👨‍⚕️

**Dr. Shekhar Sir** (Founder)
- AIIMS Delhi alumnus
- 10+ years teaching experience
- Known for making complex topics simple

**All our teachers:**
✅ Doctors from top medical colleges
✅ Cleared NEET themselves
✅ Passionate about teaching
✅ Available for doubt solving

Unlike big coaching where you're just a number, our teachers actually know your name and progress!

Want to experience their teaching in a FREE demo?`,
}

// Function to find best matching response
function findResponse(query: string): string | null {
  const lowerQuery = query.toLowerCase()

  const keywords: Record<string, string[]> = {
    'why cerebrum': ['why', 'cerebrum', 'join', 'best', 'different', 'special', 'choose'],
    'courses': ['course', 'batch', 'class 11', 'class 12', 'dropper', 'program', 'offer'],
    'pricing': ['price', 'cost', 'fee', 'afford', 'expensive', 'cheap', 'money', 'rupee', '₹'],
    'demo': ['demo', 'trial', 'free class', 'try', 'sample', 'experience'],
    'already coaching': ['already', 'coaching', 'allen', 'aakash', 'pw', 'unacademy', 'institute', 'other'],
    'results': ['result', 'score', 'rank', 'selection', 'qualified', 'success', 'topper'],
    'faculty': ['teacher', 'faculty', 'sir', 'maam', 'who teaches', 'instructor', 'aiims'],
  }

  for (const [key, words] of Object.entries(keywords)) {
    const matchCount = words.filter(word => lowerQuery.includes(word)).length
    if (matchCount >= 2 || (matchCount === 1 && lowerQuery.length < 30)) {
      return KNOWLEDGE_BASE[key]
    }
  }

  return null
}

// Lead scoring function
function calculateLeadScore(data: Partial<LeadData>, messages: Message[]): number {
  let score = 0

  if (data.name) score += 20
  if (data.phone) score += 30
  if (data.email) score += 15
  if (data.class) score += 15

  // Interest signals from conversation
  const userMessages = messages.filter(m => m.role === 'user').map(m => m.content.toLowerCase()).join(' ')
  if (userMessages.includes('demo')) score += 10
  if (userMessages.includes('enroll') || userMessages.includes('join')) score += 15
  if (userMessages.includes('price') || userMessages.includes('cost')) score += 5

  return Math.min(score, 100)
}

export default function SalesAgentWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [leadData, setLeadData] = useState<LeadData>({ source: 'chat_widget', score: 0 })
  const [leadCaptureStep, setLeadCaptureStep] = useState<'none' | 'name' | 'phone' | 'class' | 'complete'>('none')
  const [unreadCount, setUnreadCount] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Check if we're in lead capture flow
    if (leadCaptureStep !== 'none' && leadCaptureStep !== 'complete') {
      handleLeadCapture(content.trim())
      return
    }

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))

    // Try to find a knowledge base response
    const knowledgeResponse = findResponse(content)

    let responseContent: string
    let actions: QuickAction[] | undefined

    if (knowledgeResponse) {
      responseContent = knowledgeResponse

      // Add relevant follow-up actions
      if (content.toLowerCase().includes('demo') || content.toLowerCase().includes('free')) {
        actions = [
          { label: '📅 Book Demo Now', value: 'I want to book a free demo class' },
          { label: '📞 Call Me', value: 'I want someone to call me' },
        ]
      } else if (content.toLowerCase().includes('course') || content.toLowerCase().includes('price')) {
        actions = [
          { label: '🎓 View Courses', value: 'Tell me more about the courses' },
          { label: '📅 Free Demo', value: 'I want to attend a free demo class' },
        ]
      }
    } else {
      // Default helpful response
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

    // Check if we should start lead capture (after 3 messages)
    const userMessageCount = messages.filter(m => m.role === 'user').length + 1
    if (userMessageCount >= 3 && !leadData.name && leadCaptureStep === 'none') {
      responseContent += `\n\n---\n\n💡 **Quick tip:** Share your name and I can personalize your experience and send you course materials!`
      setLeadCaptureStep('name')
    }

    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: responseContent,
      timestamp: new Date(),
      actions,
    }

    setMessages(prev => [...prev, assistantMessage])
    setIsTyping(false)

    // Update lead score
    setLeadData(prev => ({
      ...prev,
      score: calculateLeadScore(prev, [...messages, userMessage]),
    }))

    // Increment unread if closed
    if (!isOpen) {
      setUnreadCount(prev => prev + 1)
    }
  }, [messages, leadData, leadCaptureStep, isOpen])

  // Handle lead capture flow
  const handleLeadCapture = useCallback(async (input: string) => {
    await new Promise(resolve => setTimeout(resolve, 300))

    let responseContent: string
    let nextStep: typeof leadCaptureStep = leadCaptureStep

    switch (leadCaptureStep) {
      case 'name':
        setLeadData(prev => ({ ...prev, name: input }))
        responseContent = `Nice to meet you, **${input}**! 👋\n\nTo send you our course brochure and demo link, could you share your phone number?`
        nextStep = 'phone'
        break

      case 'phone':
        if (!/^[6-9]\d{9}$/.test(input.replace(/\D/g, ''))) {
          responseContent = `Hmm, that doesn't look like a valid Indian phone number. Please enter a 10-digit mobile number starting with 6-9.`
          nextStep = 'phone'
        } else {
          setLeadData(prev => ({ ...prev, phone: input.replace(/\D/g, ''), capturedAt: new Date() }))
          responseContent = `Perfect! 📱\n\nOne last question - which class are you currently in?\n\n1️⃣ Class 11\n2️⃣ Class 12\n3️⃣ Dropper\n4️⃣ Parent of NEET aspirant`
          nextStep = 'class'
        }
        break

      case 'class':
        const classMap: Record<string, string> = {
          '1': 'Class 11', '11': 'Class 11', 'class 11': 'Class 11', 'xi': 'Class 11',
          '2': 'Class 12', '12': 'Class 12', 'class 12': 'Class 12', 'xii': 'Class 12',
          '3': 'Dropper', 'dropper': 'Dropper', 'drop': 'Dropper',
          '4': 'Parent', 'parent': 'Parent',
        }
        const studentClass = classMap[input.toLowerCase()] || input
        setLeadData(prev => ({ ...prev, class: studentClass }))

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

    setMessages(prev => [...prev, assistantMessage])
    setIsTyping(false)
    setLeadCaptureStep(nextStep)
  }, [leadCaptureStep, leadData])

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

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-600 to-teal-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            {/* Pulse indicator */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
            {/* Unread badge */}
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </>
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
            className="fixed bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] md:w-96 max-h-[70vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{ARIA_PERSONALITY.name}</h3>
                  <p className="text-xs text-white/80">{ARIA_PERSONALITY.tagline}</p>
                </div>
                <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                  Online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-green-600 text-white rounded-br-md'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                    }`}
                  >
                    {/* Avatar for assistant */}
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-1">
                        <Bot className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-medium text-green-600">ARIA</span>
                      </div>
                    )}

                    {/* Message content with markdown-like formatting */}
                    <div className="text-sm whitespace-pre-wrap">
                      {message.content.split('\n').map((line, i) => {
                        // Handle bold text
                        const boldRegex = /\*\*(.*?)\*\*/g
                        const parts = line.split(boldRegex)

                        return (
                          <p key={i} className={i > 0 ? 'mt-1' : ''}>
                            {parts.map((part, j) => (
                              j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                            ))}
                          </p>
                        )
                      })}
                    </div>

                    {/* Quick actions */}
                    {message.actions && message.actions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.actions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuickAction(action)}
                            className="inline-flex items-center gap-1 text-xs bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1.5 rounded-full transition-colors"
                          >
                            {action.icon}
                            {action.label}
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick CTA buttons */}
            <div className="px-4 py-2 bg-white border-t border-gray-100 flex gap-2">
              <button
                onClick={() => sendMessage('I want to book a free demo class')}
                className="flex-1 flex items-center justify-center gap-1 text-xs bg-green-50 hover:bg-green-100 text-green-700 py-2 px-3 rounded-lg transition-colors"
              >
                <Calendar className="w-3 h-3" />
                Free Demo
              </button>
              <button
                onClick={() => sendMessage('I want someone to call me')}
                className="flex-1 flex items-center justify-center gap-1 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-lg transition-colors"
              >
                <Phone className="w-3 h-3" />
                Call Me
              </button>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    leadCaptureStep === 'name' ? 'Enter your name...' :
                    leadCaptureStep === 'phone' ? 'Enter phone number...' :
                    leadCaptureStep === 'class' ? 'Enter your class...' :
                    'Ask me anything...'
                  }
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
                >
                  {isTyping ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-500">
                Powered by <span className="font-medium text-green-600">Cerebrum Biology Academy</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
