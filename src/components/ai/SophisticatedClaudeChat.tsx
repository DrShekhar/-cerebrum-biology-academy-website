'use client'

import React, { useState, useRef, useEffect } from 'react'

// Prevent memory leaks in long chat sessions
const MAX_MESSAGES = 100
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic,
  Image,
  Send,
  Sparkles,
  FlaskConical,
  GraduationCap,
  Lightbulb,
  BookOpen,
  Square,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  type: 'user' | 'ai' | 'system'
  content: string
  timestamp: Date
  attachments?: {
    type: 'image' | 'audio'
    url: string
    name: string
  }[]
  isTyping?: boolean
}

interface SophisticatedClaudeChatProps {
  className?: string
  isOpen?: boolean
  onClose?: () => void
}

export function SophisticatedClaudeChat({
  className,
  isOpen = false,
  onClose,
}: SophisticatedClaudeChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content:
        "Welcome to Ceri AI! Your Biology study assistant for NEET preparation. Ask any Biology question to get started.",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [selectedQuickPrompt, setSelectedQuickPrompt] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const quickPrompts = [
    {
      id: 'genetics',
      icon: FlaskConical,
      title: 'Genetics Mastery',
      prompt: "Explain Mendel's laws with modern molecular insights",
      category: 'Molecular Biology',
    },
    {
      id: 'physiology',
      icon: GraduationCap,
      title: 'Human Physiology',
      prompt: 'Describe cardiac cycle with latest research findings',
      category: 'Physiology',
    },
    {
      id: 'ecology',
      icon: Lightbulb,
      title: 'Ecosystem Dynamics',
      prompt: 'Analyze population growth models in ecology',
      category: 'Ecology',
    },
    {
      id: 'neet-strategy',
      icon: BookOpen,
      title: 'NEET Strategy',
      prompt: 'Create a study plan for scoring 350+ in Biology',
      category: 'Exam Prep',
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage].slice(-MAX_MESSAGES))
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse].slice(-MAX_MESSAGES))
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): string => {
    // Sophisticated AI response simulation
    const responses = {
      genetics:
        "Mendel's laws form the foundation of classical genetics, but modern molecular biology has revealed fascinating complexities. The Law of Segregation operates at the chromosomal level during meiosis, where homologous chromosomes separate. However, recent research shows epigenetic factors can influence gene expression without changing DNA sequence...",
      physiology:
        'The cardiac cycle represents one of the most elegant examples of coordinated physiological function. During systole, ventricular contraction creates pressure gradients that drive blood flow. Recent studies using advanced imaging techniques have revealed...',
      ecology:
        'Population dynamics follow mathematical models that predict growth patterns. The logistic growth model (dN/dt = rN(K-N)/K) accounts for carrying capacity limitations. However, real ecosystems show more complex behaviors due to predator-prey interactions, climate variations...',
      neet: 'To score 350+ in NEET Biology, focus on these high-yield topics: Genetics & Evolution (25%), Human Physiology (30%), Cell Biology (20%). Create a systematic study schedule with active recall techniques...',
    }

    const input = userInput.toLowerCase()
    if (input.includes('genetic') || input.includes('mendel')) return responses.genetics
    if (input.includes('cardiac') || input.includes('heart') || input.includes('physiology'))
      return responses.physiology
    if (input.includes('ecology') || input.includes('population') || input.includes('ecosystem'))
      return responses.ecology
    if (input.includes('neet') || input.includes('score') || input.includes('strategy'))
      return responses.neet

    return "That's an excellent question! Based on the latest research and curriculum standards, let me break this down systematically. Biology is fundamentally about understanding life processes at multiple scales - from molecular interactions to ecosystem dynamics..."
  }

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt)
    setSelectedQuickPrompt(prompt)
  }

  const handleVoiceRecording = () => {
    setIsRecording(!isRecording)
    // Implement voice recording logic here
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className={cn('fixed inset-0 z-50 flex items-center justify-center p-4', className)}>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Chat Interface */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Cerebrum AI Biology Mentor</h2>
                <p className="text-sm opacity-90">
                  Harvard-Level Biology Education • Real-time Support
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              ×
            </button>
          </div>

          {/* AI Status */}
          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm">AI Active • Trained on 10,000+ Biology Questions</span>
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="p-4 bg-gray-50 border-b">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {quickPrompts.map((prompt) => (
              <motion.button
                key={prompt.id}
                onClick={() => handleQuickPrompt(prompt.prompt)}
                className={cn(
                  'p-3 rounded-xl border text-left transition-all hover:shadow-md',
                  selectedQuickPrompt === prompt.prompt
                    ? 'bg-blue-50 border-blue-200 text-blue-800'
                    : 'bg-white border-gray-200 hover:border-gray-300'
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <prompt.icon className="h-5 w-5 mb-2 text-blue-600" />
                <div className="text-sm font-medium">{prompt.title}</div>
                <div className="text-xs text-gray-500 mt-1">{prompt.category}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={cn(
                  'flex gap-4',
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.type !== 'user' && (
                  <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <Sparkles className="h-5 w-5" />
                  </div>
                )}

                <div
                  className={cn(
                    'max-w-[70%] rounded-2xl p-4',
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : message.type === 'system'
                        ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                        : 'bg-gray-50 text-gray-800'
                  )}
                >
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </div>
                  <div
                    className={cn(
                      'text-xs mt-2 opacity-70',
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    )}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>

                {message.type === 'user' && (
                  <div className="w-10 h-10 bg-gray-300 rounded-xl flex items-center justify-center text-gray-600 flex-shrink-0">
                    U
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t">
          <div className="flex gap-3">
            {/* Voice Recording */}
            <motion.button
              onClick={handleVoiceRecording}
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                isRecording
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              )}
              whileTap={{ scale: 0.95 }}
            >
              {isRecording ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </motion.button>

            {/* Image Upload */}
            <motion.button
              onClick={handleImageUpload}
              className="w-12 h-12 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <Image className="h-5 w-5" />
            </motion.button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about genetics, physiology, ecology, or NEET strategy..."
                className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>

            {/* Send Button */}
            <motion.button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                inputValue.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              )}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              // Handle file upload
              console.log('File selected:', e.target.files?.[0])
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}
