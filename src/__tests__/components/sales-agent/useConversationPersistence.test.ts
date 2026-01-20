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

// Mock nanoid
jest.mock('nanoid', () => ({
  nanoid: jest.fn(() => 'test-session-id'),
}))

// Import after mocks
import { useConversationPersistence } from '@/components/sales-agent/hooks/useConversationPersistence'

describe('useConversationPersistence', () => {
  beforeEach(() => {
    localStorageMock.clear()
    jest.clearAllMocks()
  })

  describe('initialization', () => {
    it('should initialize with empty state when no data in localStorage', () => {
      const { result } = renderHook(() => useConversationPersistence())

      expect(result.current.messages).toEqual([])
      expect(result.current.leadData).toEqual({})
      expect(result.current.leadStage).toBe('none')
      expect(result.current.language).toBe('en')
    })

    it('should generate a unique session ID', () => {
      const { result } = renderHook(() => useConversationPersistence())

      expect(result.current.sessionId).toBe('test-session-id')
    })

    it('should restore state from localStorage if valid and not expired', () => {
      const savedState = {
        sessionId: 'saved-session',
        messages: [
          { id: '1', content: 'Hello', role: 'user', timestamp: Date.now() }
        ],
        leadData: { name: 'Test User' },
        leadStage: 'name_captured',
        language: 'hi',
        savedAt: Date.now(),
      }
      localStorageMock.setItem('aria_conversation', JSON.stringify(savedState))

      const { result } = renderHook(() => useConversationPersistence())

      expect(result.current.messages).toHaveLength(1)
      expect(result.current.leadData.name).toBe('Test User')
      expect(result.current.leadStage).toBe('name_captured')
      expect(result.current.language).toBe('hi')
    })

    it('should clear expired data (older than 7 days)', () => {
      const expiredState = {
        sessionId: 'old-session',
        messages: [{ id: '1', content: 'Old message', role: 'user', timestamp: Date.now() }],
        leadData: {},
        leadStage: 'none',
        language: 'en',
        savedAt: Date.now() - (8 * 24 * 60 * 60 * 1000), // 8 days ago
      }
      localStorageMock.setItem('aria_conversation', JSON.stringify(expiredState))

      const { result } = renderHook(() => useConversationPersistence())

      expect(result.current.messages).toEqual([])
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('aria_conversation')
    })
  })

  describe('message management', () => {
    it('should add a message and persist to localStorage', () => {
      const { result } = renderHook(() => useConversationPersistence())

      act(() => {
        result.current.addMessage({
          id: 'msg-1',
          content: 'Hello ARIA',
          role: 'user',
          timestamp: Date.now(),
        })
      })

      expect(result.current.messages).toHaveLength(1)
      expect(result.current.messages[0].content).toBe('Hello ARIA')
      expect(localStorageMock.setItem).toHaveBeenCalled()
    })

    it('should update an existing message', () => {
      const { result } = renderHook(() => useConversationPersistence())

      act(() => {
        result.current.addMessage({
          id: 'msg-1',
          content: 'Loading...',
          role: 'assistant',
          timestamp: Date.now(),
          isStreaming: true,
        })
      })

      act(() => {
        result.current.updateMessage('msg-1', {
          content: 'Hello! How can I help?',
          isStreaming: false,
        })
      })

      expect(result.current.messages[0].content).toBe('Hello! How can I help?')
      expect(result.current.messages[0].isStreaming).toBe(false)
    })

    it('should enforce maximum message limit (50 messages)', () => {
      const { result } = renderHook(() => useConversationPersistence())

      // Add 55 messages
      act(() => {
        for (let i = 0; i < 55; i++) {
          result.current.addMessage({
            id: `msg-${i}`,
            content: `Message ${i}`,
            role: i % 2 === 0 ? 'user' : 'assistant',
            timestamp: Date.now() + i,
          })
        }
      })

      // Should keep only the latest 50
      expect(result.current.messages.length).toBeLessThanOrEqual(50)
      // First messages should be removed
      expect(result.current.messages.find(m => m.id === 'msg-0')).toBeUndefined()
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
      expect(localStorageMock.setItem).toHaveBeenCalled()
    })
  })

  describe('conversation history', () => {
    it('should return formatted conversation history for AI context', () => {
      const { result } = renderHook(() => useConversationPersistence())

      act(() => {
        result.current.addMessage({
          id: 'msg-1',
          content: 'Hello',
          role: 'user',
          timestamp: Date.now(),
        })
        result.current.addMessage({
          id: 'msg-2',
          content: 'Hi! How can I help?',
          role: 'assistant',
          timestamp: Date.now() + 1,
        })
      })

      const history = result.current.getConversationHistory()

      expect(history).toHaveLength(2)
      expect(history[0]).toEqual({ role: 'user', content: 'Hello' })
      expect(history[1]).toEqual({ role: 'assistant', content: 'Hi! How can I help?' })
    })

    it('should limit history to recent messages for context efficiency', () => {
      const { result } = renderHook(() => useConversationPersistence())

      // Add 30 messages
      act(() => {
        for (let i = 0; i < 30; i++) {
          result.current.addMessage({
            id: `msg-${i}`,
            content: `Message ${i}`,
            role: i % 2 === 0 ? 'user' : 'assistant',
            timestamp: Date.now() + i,
          })
        }
      })

      const history = result.current.getConversationHistory(10)

      expect(history.length).toBeLessThanOrEqual(10)
    })
  })

  describe('clear conversation', () => {
    it('should clear all data and localStorage', () => {
      const { result } = renderHook(() => useConversationPersistence())

      act(() => {
        result.current.addMessage({
          id: 'msg-1',
          content: 'Hello',
          role: 'user',
          timestamp: Date.now(),
        })
        result.current.updateLeadData({ name: 'John' })
        result.current.setLeadStage('name_captured')
      })

      act(() => {
        result.current.clearConversation()
      })

      expect(result.current.messages).toEqual([])
      expect(result.current.leadData).toEqual({})
      expect(result.current.leadStage).toBe('none')
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('aria_conversation')
    })
  })
})
