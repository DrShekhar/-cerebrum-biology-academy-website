'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'

interface Message {
  id: string
  content: string
  type: 'user' | 'ai'
  timestamp: Date
  streaming?: boolean
}

export default function ClaudeChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content:
        'Hello! I am Ceri AI, your Biology Assistant. What Biology topic would you like to study today?',
      type: 'ai',
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [language, setLanguage] = useState<'english' | 'hindi' | 'hinglish'>('english')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim()) return

    const currentInput = inputMessage
    const userMessageId = `user-${Date.now()}-${Math.random()}`
    const userMessage: Message = {
      id: userMessageId,
      content: currentInput,
      type: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage('')
    setIsThinking(true)

    const aiMessageId = `ai-${Date.now()}-${Math.random()}`

    try {
      // Use streaming for faster perceived response
      const response = await fetch('/api/ai/unified-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          stream: true,
          context: {
            subject: 'Biology',
            studentLevel: 'class-12',
            language: language,
            conversationHistory: messages.slice(-5).map((m) => ({
              role: m.type === 'user' ? 'user' : 'assistant',
              content: m.content,
            })),
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      // Check if response is streaming
      const contentType = response.headers.get('content-type')
      if (contentType?.includes('text/event-stream')) {
        // Handle streaming response
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let streamedContent = ''

        // Add placeholder message
        setMessages((prev) => [
          ...prev,
          {
            id: aiMessageId,
            content: '',
            type: 'ai',
            timestamp: new Date(),
            streaming: true,
          },
        ])
        setIsThinking(false)

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value, { stream: true })
            const lines = chunk.split('\n')

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6))

                  if (data.type === 'token') {
                    streamedContent += data.content
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === aiMessageId ? { ...msg, content: streamedContent } : msg
                      )
                    )
                  } else if (data.type === 'done') {
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === aiMessageId ? { ...msg, streaming: false } : msg
                      )
                    )
                  }
                } catch {
                  // Skip invalid JSON lines
                }
              }
            }
          }
        }
      } else {
        // Handle non-streaming response (fallback)
        const data = await response.json()
        const aiMessage: Message = {
          id: aiMessageId,
          content: data.response || data.message || 'Sorry, I could not process your request.',
          type: 'ai',
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
        setIsThinking(false)
      }
    } catch (error) {
      console.error('AI Chat Error:', error)
      setIsThinking(false)

      const errorMessage: Message = {
        id: aiMessageId,
        content:
          '⚠️ Connection issue. Please try again. For immediate help, contact us at +91 88264 44334.',
        type: 'ai',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }, [inputMessage, language, messages])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-lg p-4 border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">🤖</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Ceri AI - Biology Assistant</h1>
              <p className="text-sm text-gray-600">AI-Powered Biology Learning with Shekhar Sir</p>
            </div>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 hidden sm:inline">Language:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'english' | 'hindi' | 'hinglish')}
              className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="english">English</option>
              <option value="hindi">हिंदी</option>
              <option value="hinglish">Hinglish</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeInUp`}
            >
              <div
                className={`flex items-start space-x-2 max-w-xs lg:max-w-md xl:max-w-lg ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-green-400 to-teal-500 text-white'
                      : 'bg-gradient-to-br from-blue-400 to-purple-500 text-white'
                  }`}
                >
                  {message.type === 'user' ? '👨‍🎓' : '🤖'}
                </div>

                {/* Message */}
                <div
                  className={`p-4 rounded-2xl shadow-md ${
                    message.type === 'user'
                      ? 'bg-gradient-to-br from-blue-400 to-purple-500 text-white'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                    {message.streaming && (
                      <span className="inline-block w-2 h-4 ml-1 bg-blue-500 animate-pulse" />
                    )}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Thinking Indicator */}
          {isThinking && (
            <div className="flex justify-start animate-fadeIn">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-xs">🤖</span>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-md flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">Ceri AI is thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-3">
          <div className="flex-1 bg-gray-100 rounded-xl p-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about Biology in Hindi, English, or Hinglish..."
              className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isThinking) {
                  handleSendMessage()
                }
              }}
              disabled={isThinking}
            />
          </div>

          <button
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
              inputMessage.trim() && !isThinking
                ? 'bg-gradient-to-br from-blue-400 to-purple-500 text-white hover:shadow-lg hover:scale-105 active:scale-95'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isThinking}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Quick suggestions */}
        <div className="max-w-4xl mx-auto mt-3 flex flex-wrap gap-2">
          {['Cell Division', 'Photosynthesis', 'DNA Structure', 'NEET Tips'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setInputMessage(suggestion)
              }}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
