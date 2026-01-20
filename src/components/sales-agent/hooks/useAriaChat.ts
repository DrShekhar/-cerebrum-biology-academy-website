/**
 * ARIA Sales Agent - Main Chat Hook
 * Orchestrates AI communication, conversation persistence, and state management
 */

'use client'

import { useState, useCallback, useRef } from 'react'
import { useConversationPersistence } from './useConversationPersistence'
import type { AriaMessage, Language, LeadStage } from '@/lib/aria/types'
import { getTranslation, detectLanguage } from '@/lib/aria/translations'
import {
  getAriaWhatsAppLink,
  getDemoBookingWhatsAppLink,
  openWhatsApp,
} from '@/lib/aria/whatsappIntegration'

interface UseAriaChatOptions {
  initialLanguage?: Language
  currentPage?: string
  onLeadCaptured?: (leadData: Record<string, unknown>) => void
  onDemoBooked?: () => void
  onAnalyticsEvent?: (event: string, params?: Record<string, unknown>) => void
}

interface StreamChunk {
  text?: string
  error?: string
  language?: Language
}

function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

export function useAriaChat(options: UseAriaChatOptions = {}) {
  const {
    initialLanguage = 'en',
    currentPage,
    onLeadCaptured,
    onDemoBooked,
    onAnalyticsEvent,
  } = options

  // Use conversation persistence
  const persistence = useConversationPersistence(initialLanguage)
  const {
    messages,
    leadData,
    leadStage,
    language,
    sessionId,
    visitCount,
    isNewVisitor,
    addMessage,
    updateMessage,
    updateLeadData,
    setLeadStage,
    setLanguage,
    clearConversation,
    getConversationHistory,
    getContextSummary,
    hasExistingContext,
    isLoaded,
  } = persistence

  // Local state
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Send a message and stream the AI response
  const sendMessage = useCallback(
    async (userMessageText: string) => {
      if (!userMessageText.trim() || isStreaming) return

      setError(null)

      // Detect language from user input
      const detectedLang = detectLanguage(userMessageText)
      if (detectedLang !== language) {
        setLanguage(detectedLang)
      }

      // Create and add user message
      const userMessage: AriaMessage = {
        id: generateMessageId(),
        text: userMessageText.trim(),
        sender: 'user',
        timestamp: new Date(),
        type: 'text',
        metadata: {
          language: detectedLang,
        },
      }
      addMessage(userMessage)
      onAnalyticsEvent?.('aria_message_sent', { language: detectedLang })

      // Create placeholder for bot response
      const botMessageId = generateMessageId()
      const botMessage: AriaMessage = {
        id: botMessageId,
        text: '',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text',
        metadata: {
          isStreaming: true,
          language: detectedLang,
        },
      }
      addMessage(botMessage)

      setIsStreaming(true)

      // Create abort controller for this request
      abortControllerRef.current = new AbortController()

      try {
        const conversationHistory = getConversationHistory().slice(0, -1) // Exclude the message we just added

        const response = await fetch('/api/aria/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessageText.trim(),
            conversationHistory,
            language: detectedLang,
            context: {
              currentPage,
              leadStage,
              leadData: {
                name: leadData.name || undefined,
                studentClass: leadData.studentClass || undefined,
                city: leadData.city || undefined,
              },
            },
          }),
          signal: abortControllerRef.current.signal,
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || `HTTP error ${response.status}`)
        }

        // Read the SSE stream
        const reader = response.body?.getReader()
        if (!reader) {
          throw new Error('No response body')
        }

        const decoder = new TextDecoder()
        let fullText = ''
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)

              if (data === '[DONE]') {
                continue
              }

              try {
                const chunk: StreamChunk = JSON.parse(data)
                if (chunk.error) {
                  throw new Error(chunk.error)
                }
                if (chunk.text) {
                  fullText += chunk.text
                  updateMessage(botMessageId, {
                    text: fullText,
                    metadata: {
                      isStreaming: true,
                      language: chunk.language || detectedLang,
                    },
                  })
                }
              } catch {
                // Invalid JSON, skip
              }
            }
          }
        }

        // Finalize the message
        updateMessage(botMessageId, {
          text: fullText,
          metadata: {
            isStreaming: false,
            language: detectedLang,
          },
        })

        onAnalyticsEvent?.('aria_ai_response', {
          responseLength: fullText.length,
          language: detectedLang,
        })
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          // Request was cancelled
          return
        }

        const errorMessage =
          err instanceof Error ? err.message : 'Failed to get response'
        setError(errorMessage)

        // Update bot message with error
        const errorText = getTranslation('errorMessage', language)
        updateMessage(botMessageId, {
          text: errorText,
          metadata: {
            isStreaming: false,
            language,
          },
        })

        onAnalyticsEvent?.('aria_error', { error: errorMessage })
      } finally {
        setIsStreaming(false)
        abortControllerRef.current = null
      }
    },
    [
      isStreaming,
      language,
      leadStage,
      leadData,
      currentPage,
      addMessage,
      updateMessage,
      getConversationHistory,
      setLanguage,
      onAnalyticsEvent,
    ]
  )

  // Cancel the current streaming request
  const cancelStream = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setIsStreaming(false)
    }
  }, [])

  // Handle lead capture field submission
  const submitLeadField = useCallback(
    (field: 'name' | 'phone' | 'class', value: string) => {
      const trimmedValue = value.trim()
      if (!trimmedValue) return false

      // Validate phone number if applicable
      if (field === 'phone') {
        const phoneRegex = /^[6-9]\d{9}$/
        if (!phoneRegex.test(trimmedValue.replace(/\D/g, ''))) {
          return false
        }
        updateLeadData({ phone: trimmedValue.replace(/\D/g, '') })
      } else if (field === 'name') {
        updateLeadData({ name: trimmedValue })
      } else if (field === 'class') {
        updateLeadData({ studentClass: trimmedValue })
      }

      // Progress to next stage
      const stageProgression: Record<LeadStage, LeadStage> = {
        chat: 'name',
        name: 'phone',
        phone: 'class',
        class: 'complete',
        complete: 'complete',
      }

      const nextStage = stageProgression[leadStage]
      setLeadStage(nextStage)

      // Check if lead is complete
      if (nextStage === 'complete') {
        onLeadCaptured?.({
          ...leadData,
          [field === 'class' ? 'studentClass' : field]: trimmedValue,
        })
        onAnalyticsEvent?.('aria_lead_captured', { sessionId })
      } else {
        onAnalyticsEvent?.('aria_lead_capture_started', { stage: nextStage })
      }

      return true
    },
    [leadStage, leadData, sessionId, updateLeadData, setLeadStage, onLeadCaptured, onAnalyticsEvent]
  )

  // Start lead capture flow
  const startLeadCapture = useCallback(() => {
    if (leadStage === 'chat') {
      setLeadStage('name')
      onAnalyticsEvent?.('aria_lead_capture_started', { stage: 'name' })
    }
  }, [leadStage, setLeadStage, onAnalyticsEvent])

  // Handle WhatsApp handoff
  const openWhatsAppHandoff = useCallback(() => {
    const lastUserMessage = messages
      .filter((m) => m.sender === 'user')
      .pop()?.text

    const link = getAriaWhatsAppLink({
      leadData,
      lastTopic: lastUserMessage,
      sessionId,
      language,
    })

    openWhatsApp(link)
    onAnalyticsEvent?.('aria_whatsapp_clicked', { hasContext: !!lastUserMessage })
  }, [messages, leadData, sessionId, language, onAnalyticsEvent])

  // Handle demo booking via WhatsApp
  const bookDemoViaWhatsApp = useCallback(() => {
    const link = getDemoBookingWhatsAppLink(leadData, language)
    openWhatsApp(link)
    onDemoBooked?.()
    onAnalyticsEvent?.('aria_demo_booked', { method: 'whatsapp' })
  }, [leadData, language, onDemoBooked, onAnalyticsEvent])

  // Toggle language
  const toggleLanguage = useCallback(() => {
    const newLang: Language = language === 'en' ? 'hi' : 'en'
    setLanguage(newLang)
    onAnalyticsEvent?.('aria_language_changed', { from: language, to: newLang })
  }, [language, setLanguage, onAnalyticsEvent])

  // Get greeting message
  const getGreeting = useCallback((): AriaMessage => {
    const greetingText = getTranslation('greeting', language)
    return {
      id: 'greeting',
      text: greetingText,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text',
      quickActions: [
        getTranslation('quickActionCourses', language),
        getTranslation('quickActionPricing', language),
        getTranslation('quickActionDemo', language),
        getTranslation('quickActionWhy', language),
      ],
      metadata: {
        language,
      },
    }
  }, [language])

  // Get welcome back message for returning visitors
  const getWelcomeBackMessage = useCallback((): AriaMessage | null => {
    if (!hasExistingContext()) return null

    const contextSummary = getContextSummary()
    let text: string

    if (language === 'hi') {
      text = `वापस आने पर स्वागत है${leadData.name ? `, ${leadData.name}` : ''}! 🙏\n\nमैं आपकी पिछली बातचीत याद रख रही हूं। ${contextSummary ? `\n\n${contextSummary}` : ''}\n\nकैसे आगे बढ़ें?`
    } else {
      text = `Welcome back${leadData.name ? `, ${leadData.name}` : ''}! 🙏\n\nI remember our previous conversation. ${contextSummary ? `\n\n${contextSummary}` : ''}\n\nHow can I help you today?`
    }

    return {
      id: 'welcome_back',
      text,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text',
      quickActions: [
        getTranslation('quickActionDemo', language),
        language === 'hi' ? 'जहां छोड़ा था वहीं से शुरू करें' : 'Continue where we left off',
      ],
      metadata: {
        language,
      },
    }
  }, [language, leadData.name, hasExistingContext, getContextSummary])

  return {
    // State
    messages,
    isStreaming,
    error,
    isLoaded,
    language,
    leadData,
    leadStage,
    sessionId,
    visitCount,
    isNewVisitor,

    // Actions
    sendMessage,
    cancelStream,
    submitLeadField,
    startLeadCapture,
    openWhatsAppHandoff,
    bookDemoViaWhatsApp,
    toggleLanguage,
    clearConversation,
    setLeadStage,
    updateLeadData,

    // Utilities
    getGreeting,
    getWelcomeBackMessage,
    hasExistingContext: hasExistingContext(),
  }
}

export type UseAriaChatReturn = ReturnType<typeof useAriaChat>
