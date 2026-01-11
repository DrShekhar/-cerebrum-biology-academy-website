'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

// Prevent memory leaks in long chat sessions
const MAX_MESSAGES = 100
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, Image as ImageIcon, X, Loader2 } from 'lucide-react'
import { useSwipeable } from 'react-swipeable'
import { MessageWithLatex } from '../latex/LatexRenderer'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

interface MobileChatInterfaceProps {
  onSendMessage?: (message: string) => Promise<void>
  initialMessages?: Message[]
  className?: string
}

export function MobileChatInterface({
  onSendMessage,
  initialMessages = [],
  className = '',
}: MobileChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }, [input])

  // Swipe handlers for mobile gestures
  const swipeHandlers = useSwipeable({
    onSwipedDown: () => setShowOptions(false),
    onSwipedUp: () => setShowOptions(true),
    trackMouse: false,
  })

  const handleSend = async () => {
    if (!input.trim() || isLoading) {
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage].slice(-MAX_MESSAGES))
    setInput('')
    setIsLoading(true)

    try {
      // Call streaming API
      const response = await fetch('/api/ceri-ai/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            { role: 'user', content: userMessage.content },
          ],
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      // Handle streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      }

      setMessages((prev) => [...prev, assistantMessage].slice(-MAX_MESSAGES))

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') {
                setMessages((prev) =>
                  prev.map((m) => (m.id === assistantMessage.id ? { ...m, isStreaming: false } : m))
                )
                break
              }

              try {
                const parsed = JSON.parse(data)
                if (parsed.text) {
                  assistantMessage.content += parsed.text
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantMessage.id ? { ...m, content: assistantMessage.content } : m
                    )
                  )
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }

      if (onSendMessage) {
        await onSendMessage(userMessage.content)
      }
    } catch (error) {
      console.error('Send message error:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant' as const,
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date(),
        },
      ].slice(-MAX_MESSAGES))
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className={`flex flex-col h-full max-h-screen bg-gradient-to-b from-blue-50 to-white ${className}`}
      {...swipeHandlers}
    >
      {/* Header */}
      <div className="bg-indigo-500 text-white px-4 py-4 sm:py-5 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-xl font-bold">C</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Ceri AI</h1>
              <p className="text-xs sm:text-sm text-blue-100">Your NEET Biology Tutor</p>
            </div>
          </div>
          {isLoading && <Loader2 className="w-5 h-5 animate-spin text-white/80" />}
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 sm:py-6 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 sm:px-5 sm:py-4 ${
                  message.role === 'user'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white shadow-md text-gray-800'
                }`}
              >
                <MessageWithLatex
                  content={message.content}
                  className={`text-sm sm:text-base leading-relaxed ${
                    message.role === 'user' ? 'text-white' : 'text-gray-800'
                  }`}
                />
                {message.isStreaming && (
                  <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1" />
                )}
                <p
                  className={`text-xs mt-2 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 sm:py-4 shadow-lg">
        <div className="flex items-end space-x-2 sm:space-x-3">
          {/* Quick Actions */}
          <div className="flex space-x-2 pb-2">
            <button
              className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Attach image"
            >
              <ImageIcon className="w-5 h-5 text-gray-600" />
            </button>
            <button
              className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Voice input"
            >
              <Mic className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Text Input */}
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about NEET Biology..."
            className="flex-1 resize-none border border-gray-300 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32 min-h-[44px]"
            rows={1}
            disabled={isLoading}
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all shadow-md ${
              input.trim() && !isLoading
                ? 'bg-indigo-500 text-white hover:shadow-lg active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
            ) : (
              <Send className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>

        {/* Character count hint */}
        {input.length > 500 && (
          <p className="text-xs text-gray-500 mt-2 text-right">{input.length} / 2000 characters</p>
        )}
      </div>
    </div>
  )
}
