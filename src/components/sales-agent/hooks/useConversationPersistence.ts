/**
 * ARIA Sales Agent - Conversation Persistence Hook
 * Manages conversation storage in localStorage with expiry and session tracking
 */

'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type {
  AriaMessage,
  LeadData,
  ConversationState,
  Language,
  LeadStage,
} from '@/lib/aria/types'

const STORAGE_KEY = 'aria_conversation'
const MAX_MESSAGES = 50
const EXPIRY_DAYS = 7
const EXPIRY_MS = EXPIRY_DAYS * 24 * 60 * 60 * 1000

interface StoredConversation {
  state: ConversationState
  expiresAt: number
}

function generateSessionId(): string {
  return `aria_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

function createInitialLeadData(language: Language): LeadData {
  return {
    name: '',
    phone: '',
    studentClass: '',
    city: '',
    email: '',
    score: 0,
    interests: [],
    source: 'aria_widget',
    language,
  }
}

function createInitialState(language: Language = 'en'): ConversationState {
  return {
    sessionId: generateSessionId(),
    messages: [],
    leadData: createInitialLeadData(language),
    leadStage: 'chat',
    language,
    lastActivity: new Date(),
    isNewVisitor: true,
    visitCount: 1,
  }
}

export function useConversationPersistence(initialLanguage: Language = 'en') {
  const [conversationState, setConversationState] = useState<ConversationState>(() =>
    createInitialState(initialLanguage)
  )
  const [isLoaded, setIsLoaded] = useState(false)
  const isInitialized = useRef(false)

  // Load conversation from localStorage on mount
  useEffect(() => {
    if (isInitialized.current) return
    isInitialized.current = true

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed: StoredConversation = JSON.parse(stored)
        const now = Date.now()

        // Check if conversation has expired
        if (parsed.expiresAt > now) {
          const restoredState: ConversationState = {
            ...parsed.state,
            lastActivity: new Date(parsed.state.lastActivity),
            messages: parsed.state.messages.map((msg) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            })),
            isNewVisitor: false,
            visitCount: (parsed.state.visitCount || 0) + 1,
          }
          setConversationState(restoredState)
        } else {
          // Expired - create new state but preserve visit count
          const newState = createInitialState(initialLanguage)
          newState.visitCount = (parsed.state.visitCount || 0) + 1
          newState.isNewVisitor = false
          setConversationState(newState)
        }
      }
    } catch (error) {
      console.error('[ARIA] Failed to load conversation:', error)
    }
    setIsLoaded(true)
  }, [initialLanguage])

  // Save conversation to localStorage whenever state changes
  useEffect(() => {
    if (!isLoaded) return

    try {
      const stateToStore: ConversationState = {
        ...conversationState,
        lastActivity: new Date(),
      }

      const stored: StoredConversation = {
        state: stateToStore,
        expiresAt: Date.now() + EXPIRY_MS,
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    } catch (error) {
      console.error('[ARIA] Failed to save conversation:', error)
    }
  }, [conversationState, isLoaded])

  // Add a new message to the conversation
  const addMessage = useCallback((message: AriaMessage) => {
    setConversationState((prev) => {
      const messages = [...prev.messages, message]

      // Trim to max messages, keeping the most recent
      const trimmedMessages =
        messages.length > MAX_MESSAGES ? messages.slice(-MAX_MESSAGES) : messages

      return {
        ...prev,
        messages: trimmedMessages,
        lastActivity: new Date(),
      }
    })
  }, [])

  // Update a specific message (useful for streaming updates)
  const updateMessage = useCallback((messageId: string, updates: Partial<AriaMessage>) => {
    setConversationState((prev) => ({
      ...prev,
      messages: prev.messages.map((msg) => (msg.id === messageId ? { ...msg, ...updates } : msg)),
      lastActivity: new Date(),
    }))
  }, [])

  // Update lead data
  const updateLeadData = useCallback((updates: Partial<LeadData>) => {
    setConversationState((prev) => ({
      ...prev,
      leadData: { ...prev.leadData, ...updates },
      lastActivity: new Date(),
    }))
  }, [])

  // Update lead stage
  const setLeadStage = useCallback((stage: LeadStage) => {
    setConversationState((prev) => ({
      ...prev,
      leadStage: stage,
      lastActivity: new Date(),
    }))
  }, [])

  // Change language
  const setLanguage = useCallback((language: Language) => {
    setConversationState((prev) => ({
      ...prev,
      language,
      leadData: { ...prev.leadData, language },
      lastActivity: new Date(),
    }))
  }, [])

  // Clear conversation (start fresh)
  const clearConversation = useCallback(() => {
    const visitCount = conversationState.visitCount
    const newState = createInitialState(conversationState.language)
    newState.visitCount = visitCount
    newState.isNewVisitor = false
    setConversationState(newState)
  }, [conversationState.visitCount, conversationState.language])

  // Get conversation history for API calls (role/content format)
  const getConversationHistory = useCallback(() => {
    return conversationState.messages
      .filter((msg) => msg.sender === 'user' || msg.sender === 'bot')
      .map((msg) => ({
        role: msg.sender === 'user' ? ('user' as const) : ('assistant' as const),
        content: msg.text,
      }))
  }, [conversationState.messages])

  // Generate a context summary for resuming conversations
  const getContextSummary = useCallback((): string => {
    const { leadData, leadStage, messages } = conversationState
    const parts: string[] = []

    if (leadData.name) {
      parts.push(`Student name: ${leadData.name}`)
    }
    if (leadData.studentClass) {
      parts.push(`Class: ${leadData.studentClass}`)
    }
    if (leadData.phone) {
      parts.push(`Phone collected: Yes`)
    }
    if (leadData.interests.length > 0) {
      parts.push(`Interests: ${leadData.interests.join(', ')}`)
    }
    if (leadStage !== 'chat') {
      parts.push(`Lead stage: ${leadStage}`)
    }

    // Add last topic from conversation
    const userMessages = messages.filter((m) => m.sender === 'user')
    if (userMessages.length > 0) {
      const lastTopic = userMessages[userMessages.length - 1].text.slice(0, 100)
      parts.push(`Last discussed: ${lastTopic}`)
    }

    return parts.length > 0 ? parts.join('. ') : ''
  }, [conversationState])

  // Check if this is a returning visitor with context
  const hasExistingContext = useCallback(() => {
    return (
      !conversationState.isNewVisitor &&
      (conversationState.messages.length > 0 ||
        conversationState.leadData.name ||
        conversationState.leadData.phone)
    )
  }, [conversationState])

  return {
    // State
    conversationState,
    isLoaded,
    messages: conversationState.messages,
    leadData: conversationState.leadData,
    leadStage: conversationState.leadStage,
    language: conversationState.language,
    sessionId: conversationState.sessionId,
    visitCount: conversationState.visitCount,
    isNewVisitor: conversationState.isNewVisitor,

    // Actions
    addMessage,
    updateMessage,
    updateLeadData,
    setLeadStage,
    setLanguage,
    clearConversation,

    // Utilities
    getConversationHistory,
    getContextSummary,
    hasExistingContext,
  }
}

export type UseConversationPersistenceReturn = ReturnType<typeof useConversationPersistence>
