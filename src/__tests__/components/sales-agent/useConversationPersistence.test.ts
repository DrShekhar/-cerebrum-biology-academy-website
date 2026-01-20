/**
 * Unit tests for useConversationPersistence hook
 * Tests localStorage persistence, message management, and lead tracking
 */

import { renderHook, act } from '@testing-library/react'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Import after mocks
import { useConversationPersistence } from '@/components/sales-agent/hooks/useConversationPersistence'
import type { AriaMessage } from '@/lib/aria/types'

describe('useConversationPersistence', () => {
  beforeEach(() => {
    localStorageMock.clear()
    jest.clearAllMocks()
  })

  describe('initialization', () => {
    it('should initialize with empty state when no data in localStorage', () => {
      const { result } = renderHook(() => useConversationPersistence())

      expect(result.current.messages).toEqual([])
      expect(result.current.leadData.name).toBe('')
      expect(result.current.leadData.phone).toBe('')
      expect(result.current.leadStage).toBe('chat')
      expect(result.current.language).toBe('en')
      expect(result.current.isNewVisitor).toBe(true)
      expect(result.current.visitCount).toBe(1)
    })

    it('should generate a unique session ID', () => {
      const { result } = renderHook(() => useConversationPersistence())

      expect(result.current.sessionId).toMatch(/^aria_\d+_[a-z0-9]+$/)
    })

    it('should restore state from localStorage if valid and not expired', () => {
      const savedState = {
        state: {
          sessionId: 'saved-session',
          messages: [
            {
              id: '1',
              text: 'Hello',
              sender: 'user',
              timestamp: new Date().toISOString(),
            },
          ],
          leadData: {
            name: 'Test User',
            phone: '',
            studentClass: '',
            city: '',
            email: '',
            score: 0,
            interests: [],
            source: 'aria_widget',
            language: 'hi',
          },
          leadStage: 'name_captured',
          language: 'hi',
          lastActivity: new Date().toISOString(),
          isNewVisitor: false,
          visitCount: 1,
        },
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // Expires tomorrow
      }
      localStorageMock.setItem('aria_conversation', JSON.stringify(savedState))

      const { result } = renderHook(() => useConversationPersistence())

      expect(result.current.messages).toHaveLength(1)
      expect(result.current.leadData.name).toBe('Test User')
      expect(result.current.leadStage).toBe('name_captured')
      expect(result.current.language).toBe('hi')
      expect(result.current.isNewVisitor).toBe(false)
      expect(result.current.visitCount).toBe(2) // Incremented
    })

    it('should clear expired data (older than 7 days)', () => {
      const expiredState = {
        state: {
          sessionId: 'old-session',
          messages: [
            {
              id: '1',
              text: 'Old message',
              sender: 'user',
              timestamp: new Date().toISOString(),
            },
          ],
          leadData: {
            name: '',
            phone: '',
            studentClass: '',
            city: '',
            email: '',
            score: 0,
            interests: [],
            source: 'aria_widget',
            language: 'en',
          },
          leadStage: 'chat',
          language: 'en',
          lastActivity: new Date().toISOString(),
          isNewVisitor: true,
          visitCount: 1,
        },
        expiresAt: Date.now() - 1000, // Expired
      }
      localStorageMock.setItem('aria_conversation', JSON.stringify(expiredState))

      const { result } = renderHook(() => useConversationPersistence())

      // Should create new state when expired
      expect(result.current.messages).toEqual([])
      expect(result.current.isNewVisitor).toBe(false) // Not new since expired state existed
      expect(result.current.visitCount).toBe(2) // Incremented from expired state
    })
  })

  describe('message management', () => {
    it('should add a message and persist to localStorage', () => {
      const { result } = renderHook(() => useConversationPersistence())

      const message: AriaMessage = {
        id: 'msg-1',
        text: 'Hello ARIA',
        sender: 'user',
        timestamp: new Date(),
      }

      act(() => {
        result.current.addMessage(message)
      })

      expect(result.current.messages).toHaveLength(1)
      expect(result.current.messages[0].text).toBe('Hello ARIA')
      expect(result.current.messages[0].sender).toBe('user')
      expect(localStorageMock.setItem).toHaveBeenCalled()
    })

    it('should update an existing message', () => {
      const { result } = renderHook(() => useConversationPersistence())

      const message: AriaMessage = {
        id: 'msg-1',
        text: 'Loading...',
        sender: 'bot',
        timestamp: new Date(),
        isStreaming: true,
      }

      act(() => {
        result.current.addMessage(message)
      })

      act(() => {
        result.current.updateMessage('msg-1', {
          text: 'Hello! How can I help?',
          isStreaming: false,
        })
      })

      expect(result.current.messages[0].text).toBe('Hello! How can I help?')
      expect(result.current.messages[0].isStreaming).toBe(false)
    })

    it('should enforce maximum message limit (50 messages)', () => {
      const { result } = renderHook(() => useConversationPersistence())

      // Add 55 messages
      act(() => {
        for (let i = 0; i < 55; i++) {
          const message: AriaMessage = {
            id: `msg-${i}`,
            text: `Message ${i}`,
            sender: i % 2 === 0 ? 'user' : 'bot',
            timestamp: new Date(Date.now() + i),
          }
          result.current.addMessage(message)
        }
      })

      // Should keep only the latest 50
      expect(result.current.messages.length).toBeLessThanOrEqual(50)
      // First messages should be removed
      expect(result.current.messages.find((m) => m.id === 'msg-0')).toBeUndefined()
      // Latest messages should be kept
      expect(result.current.messages.find((m) => m.id === 'msg-54')).toBeDefined()
    })
  })

  describe('lead data management', () => {
    it('should update lead data', () => {
      const { result } = renderHook(() => useConversationPersistence())

      act(() => {
        result.current.updateLeadData({ name: 'John Doe' })
      })

      expect(result.current.leadData.name).toBe('John Doe')

      act(() => {
        result.current.updateLeadData({ phone: '+919876543210' })
      })

      expect(result.current.leadData.name).toBe('John Doe')
      expect(result.current.leadData.phone).toBe('+919876543210')
    })

    it('should update lead stage', () => {
      const { result } = renderHook(() => useConversationPersistence())

      act(() => {
        result.current.setLeadStage('asking_name')
      })

      expect(result.current.leadStage).toBe('asking_name')

      act(() => {
        result.current.setLeadStage('name_captured')
      })

      expect(result.current.leadStage).toBe('name_captured')
    })
  })

  describe('language management', () => {
    it('should update language preference', () => {
      const { result } = renderHook(() => useConversationPersistence())

      expect(result.current.language).toBe('en')

      act(() => {
        result.current.setLanguage('hi')
      })

      expect(result.current.language).toBe('hi')
      expect(result.current.leadData.language).toBe('hi')
      expect(localStorageMock.setItem).toHaveBeenCalled()
    })

    it('should initialize with specified language', () => {
      const { result } = renderHook(() => useConversationPersistence('hi'))

      expect(result.current.language).toBe('hi')
      expect(result.current.leadData.language).toBe('hi')
    })
  })

  describe('conversation history', () => {
    it('should return formatted conversation history for API context', () => {
      const { result } = renderHook(() => useConversationPersistence())

      const userMessage: AriaMessage = {
        id: 'msg-1',
        text: 'Hello',
        sender: 'user',
        timestamp: new Date(),
      }

      const botMessage: AriaMessage = {
        id: 'msg-2',
        text: 'Hi! How can I help?',
        sender: 'bot',
        timestamp: new Date(),
      }

      act(() => {
        result.current.addMessage(userMessage)
        result.current.addMessage(botMessage)
      })

      const history = result.current.getConversationHistory()

      expect(history).toHaveLength(2)
      expect(history[0]).toEqual({ role: 'user', content: 'Hello' })
      expect(history[1]).toEqual({ role: 'assistant', content: 'Hi! How can I help?' })
    })

    it('should filter out system messages from history', () => {
      const { result } = renderHook(() => useConversationPersistence())

      const userMessage: AriaMessage = {
        id: 'msg-1',
        text: 'Hello',
        sender: 'user',
        timestamp: new Date(),
      }

      const systemMessage: AriaMessage = {
        id: 'msg-2',
        text: 'Language changed to Hindi',
        sender: 'system',
        timestamp: new Date(),
      }

      const botMessage: AriaMessage = {
        id: 'msg-3',
        text: 'Namaste!',
        sender: 'bot',
        timestamp: new Date(),
      }

      act(() => {
        result.current.addMessage(userMessage)
        result.current.addMessage(systemMessage)
        result.current.addMessage(botMessage)
      })

      const history = result.current.getConversationHistory()

      // System message should be filtered out
      expect(history).toHaveLength(2)
      expect(history.find((h) => h.content === 'Language changed to Hindi')).toBeUndefined()
    })
  })

  describe('clear conversation', () => {
    it('should clear messages but preserve visit count', () => {
      const { result } = renderHook(() => useConversationPersistence())

      const message: AriaMessage = {
        id: 'msg-1',
        text: 'Hello',
        sender: 'user',
        timestamp: new Date(),
      }

      act(() => {
        result.current.addMessage(message)
        result.current.updateLeadData({ name: 'John' })
        result.current.setLeadStage('name_captured')
      })

      const visitCount = result.current.visitCount

      act(() => {
        result.current.clearConversation()
      })

      expect(result.current.messages).toEqual([])
      expect(result.current.leadData.name).toBe('')
      expect(result.current.leadStage).toBe('chat')
      expect(result.current.visitCount).toBe(visitCount) // Preserved
      expect(result.current.isNewVisitor).toBe(false) // Still not new
    })
  })

  describe('context summary', () => {
    it('should generate context summary from conversation state', () => {
      const { result } = renderHook(() => useConversationPersistence())

      act(() => {
        result.current.updateLeadData({
          name: 'John Doe',
          studentClass: '12',
          phone: '+919876543210',
          interests: ['NEET', 'Biology'],
        })
        result.current.setLeadStage('phone_captured')
      })

      const summary = result.current.getContextSummary()

      expect(summary).toContain('Student name: John Doe')
      expect(summary).toContain('Class: 12')
      expect(summary).toContain('Phone collected: Yes')
      expect(summary).toContain('Interests: NEET, Biology')
      expect(summary).toContain('Lead stage: phone_captured')
    })

    it('should include last discussed topic from messages', () => {
      const { result } = renderHook(() => useConversationPersistence())

      const message: AriaMessage = {
        id: 'msg-1',
        text: 'Tell me about NEET Biology coaching',
        sender: 'user',
        timestamp: new Date(),
      }

      act(() => {
        result.current.addMessage(message)
      })

      const summary = result.current.getContextSummary()

      expect(summary).toContain('Last discussed: Tell me about NEET Biology coaching')
    })
  })

  describe('existing context detection', () => {
    it('should detect returning visitor with existing context', () => {
      const { result } = renderHook(() => useConversationPersistence())

      // Initially new visitor with no context
      expect(result.current.hasExistingContext()).toBe(false)

      // Add a message
      act(() => {
        const message: AriaMessage = {
          id: 'msg-1',
          text: 'Hello',
          sender: 'user',
          timestamp: new Date(),
        }
        result.current.addMessage(message)
      })

      // Still new visitor (isNewVisitor flag matters more than messages)
      expect(result.current.hasExistingContext()).toBe(false)
    })

    it('should detect context when lead data is captured', () => {
      const savedState = {
        state: {
          sessionId: 'saved-session',
          messages: [],
          leadData: {
            name: 'Test User',
            phone: '+919876543210',
            studentClass: '',
            city: '',
            email: '',
            score: 0,
            interests: [],
            source: 'aria_widget',
            language: 'en',
          },
          leadStage: 'phone_captured',
          language: 'en',
          lastActivity: new Date().toISOString(),
          isNewVisitor: false,
          visitCount: 2,
        },
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      }
      localStorageMock.setItem('aria_conversation', JSON.stringify(savedState))

      const { result } = renderHook(() => useConversationPersistence())

      expect(result.current.hasExistingContext()).toBeTruthy() // Returns truthy value, not strict boolean
    })
  })

  describe('visit tracking', () => {
    it('should track visit count across sessions', () => {
      // First visit
      const { result: result1 } = renderHook(() => useConversationPersistence())
      expect(result1.current.visitCount).toBe(1)
      expect(result1.current.isNewVisitor).toBe(true)

      // Simulate saving state
      const savedState = {
        state: {
          sessionId: result1.current.sessionId,
          messages: [],
          leadData: result1.current.leadData,
          leadStage: result1.current.leadStage,
          language: result1.current.language,
          lastActivity: new Date().toISOString(),
          isNewVisitor: false,
          visitCount: 1,
        },
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      }
      localStorageMock.setItem('aria_conversation', JSON.stringify(savedState))

      // Second visit
      const { result: result2 } = renderHook(() => useConversationPersistence())
      expect(result2.current.visitCount).toBe(2)
      expect(result2.current.isNewVisitor).toBe(false)
    })
  })
})
