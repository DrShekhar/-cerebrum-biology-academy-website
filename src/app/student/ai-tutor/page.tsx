'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { MessageBubble } from '@/components/chat/MessageBubble'
import { TypingIndicator } from '@/components/chat/TypingIndicator'
import { ChatInput } from '@/components/chat/ChatInput'
import { SuggestedQuestions } from '@/components/chat/SuggestedQuestions'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
  ncertReferences?: string[]
  relatedTopics?: string[]
  confidence?: number
  tokensUsed?: number
}

interface ChatSession {
  id: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

const INITIAL_QUESTIONS = [
  'What is the powerhouse of the cell?',
  'Explain photosynthesis in detail',
  'What are the differences between mitosis and meiosis?',
  'Describe the structure of DNA',
]

const TEMP_FREE_USER_ID = 'temp_free_user_001' // TODO: Replace with real freeUserId from session
const STORAGE_KEY = 'cerebrum_ai_tutor_session'

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    const savedSession = localStorage.getItem(STORAGE_KEY)
    if (savedSession) {
      try {
        const session: ChatSession = JSON.parse(savedSession)
        setMessages(
          session.messages.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
        )
        setSessionId(session.id)
      } catch (err) {
        console.error('Failed to load saved session:', err)
        initializeNewSession()
      }
    } else {
      initializeNewSession()
    }
  }, [])

  const initializeNewSession = () => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`
    setSessionId(newSessionId)
  }

  useEffect(() => {
    if (sessionId && messages.length > 0) {
      const session: ChatSession = {
        id: sessionId,
        messages,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    }
  }, [messages, sessionId])

  const saveMessageToDatabase = async (message: Message) => {
    try {
      await fetch('/api/ai/tutor/history/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          freeUserId: TEMP_FREE_USER_ID,
          message: message.content,
          isUserMessage: message.isUser,
          ncertReferences: message.ncertReferences,
          relatedTopics: message.relatedTopics,
          confidence: message.confidence,
          tokensUsed: message.tokensUsed,
          topic: 'General Biology',
          difficulty: 'medium',
        }),
      })
    } catch (error) {
      console.error('Failed to save message to database:', error)
    }
  }

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: `msg_${Date.now()}_user`,
      content: content.trim(),
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    saveMessageToDatabase(userMessage).catch(console.error)

    try {
      const response = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: content.trim(),
          studentId: 'STUDENT_001',
          context: {
            topic: 'General Biology',
            difficulty: 'medium',
            previousQuestions: messages
              .filter((msg) => msg.isUser)
              .slice(-3)
              .map((msg) => msg.content),
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()

      const aiMessage: Message = {
        id: `msg_${Date.now()}_ai`,
        content: data.answer,
        isUser: false,
        timestamp: new Date(),
        ncertReferences: data.ncertReferences,
        relatedTopics: data.relatedTopics,
        confidence: data.confidence,
        tokensUsed: data.tokensUsed,
      }

      setMessages((prev) => [...prev, aiMessage])

      saveMessageToDatabase(aiMessage).catch(console.error)

      if (data.suggestedQuestions && data.suggestedQuestions.length > 0) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `suggestions_${Date.now()}`,
              content: '',
              isUser: false,
              timestamp: new Date(),
              relatedTopics: data.suggestedQuestions,
            },
          ])
        }, 500)
      }
    } catch (err) {
      console.error('Failed to send message:', err)
      setError(
        err instanceof Error ? err.message : 'Sorry, something went wrong. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = () => {
    setError(null)
    const lastUserMessage = messages
      .slice()
      .reverse()
      .find((msg) => msg.isUser)
    if (lastUserMessage) {
      sendMessage(lastUserMessage.content)
    }
  }

  const handleClearChat = () => {
    if (confirm('Are you sure you want to clear the chat history?')) {
      setMessages([])
      localStorage.removeItem(STORAGE_KEY)
      initializeNewSession()
    }
  }

  const handleExportChat = () => {
    const chatText = messages
      .map((msg) => {
        const sender = msg.isUser ? 'Student' : 'AI Tutor'
        const time = msg.timestamp.toLocaleString('en-IN')
        return `[${time}] ${sender}: ${msg.content}`
      })
      .join('\n\n')

    const blob = new Blob([chatText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cerebrum-ai-tutor-chat-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleNewSession = () => {
    if (messages.length > 0 && !confirm('Start a new session? Current chat will be saved.')) {
      return
    }

    if (messages.length > 0) {
      const archiveKey = `${STORAGE_KEY}_archive_${sessionId}`
      const session: ChatSession = {
        id: sessionId,
        messages,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      localStorage.setItem(archiveKey, JSON.stringify(session))
    }

    setMessages([])
    initializeNewSession()
  }

  const getSuggestedQuestions = (): string[] => {
    if (messages.length === 0) {
      return INITIAL_QUESTIONS
    }

    const lastAiMessage = messages
      .slice()
      .reverse()
      .find((msg) => !msg.isUser && msg.relatedTopics && msg.relatedTopics.length > 0)

    return lastAiMessage?.relatedTopics || []
  }

  const currentSuggestions = getSuggestedQuestions()

  return (
    <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-saffron-500 to-saffron-600 shadow-md">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  AI Biology Tutor
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">24/7 NEET Biology Expert</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleNewSession}
                className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-mobile-card transition-colors hover:bg-gray-50 hover:shadow-md active:scale-95 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                aria-label="New session"
                type="button"
              >
                New
              </button>
              <button
                onClick={handleExportChat}
                disabled={messages.length === 0}
                className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-mobile-card transition-colors hover:bg-gray-50 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                aria-label="Export chat"
                type="button"
              >
                Export
              </button>
              <button
                onClick={handleClearChat}
                disabled={messages.length === 0}
                className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-red-600 shadow-mobile-card transition-colors hover:bg-red-50 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:text-red-400 dark:hover:bg-red-950"
                aria-label="Clear chat"
                type="button"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div
          ref={messagesContainerRef}
          className="mx-auto h-full max-w-4xl overflow-y-auto px-4 py-6"
        >
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-saffron-500 to-saffron-600 shadow-lg">
                <svg
                  className="h-10 w-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                Welcome to AI Biology Tutor
              </h2>
              <p className="mb-8 max-w-md text-gray-600 dark:text-gray-400">
                Your 24/7 NEET Biology expert is here to help. Ask any question about biology, get
                instant answers with NCERT references, and boost your preparation.
              </p>
              <div className="w-full max-w-2xl">
                <SuggestedQuestions
                  questions={currentSuggestions}
                  onQuestionClick={sendMessage}
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          {messages.length > 0 && (
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  content={message.content}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                  ncertReferences={message.ncertReferences}
                  relatedTopics={message.relatedTopics}
                  confidence={message.confidence}
                  tokensUsed={message.tokensUsed}
                />
              ))}

              {isLoading && <TypingIndicator />}

              {error && (
                <div className="animate-fade-in rounded-lg border border-red-300 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
                  <div className="flex items-start gap-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-red-800 dark:text-red-200">
                        Error
                      </h3>
                      <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
                      <button
                        onClick={handleRetry}
                        className="mt-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        type="button"
                      >
                        Try again
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {messages.length > 0 && currentSuggestions.length > 0 && !isLoading && (
                <div className="pt-4">
                  <SuggestedQuestions
                    questions={currentSuggestions}
                    onQuestionClick={sendMessage}
                    disabled={isLoading}
                  />
                </div>
              )}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="sticky bottom-0">
        <ChatInput
          onSendMessage={sendMessage}
          isLoading={isLoading}
          placeholder="Ask your biology question..."
          maxLength={1000}
        />
      </footer>
    </div>
  )
}
