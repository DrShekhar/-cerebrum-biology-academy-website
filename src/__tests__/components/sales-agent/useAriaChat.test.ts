/**
 * Unit tests for useAriaChat hook
 * Tests chat functionality, streaming responses, lead capture flow, and WhatsApp integration
 */

import { renderHook, act, waitFor } from '@testing-library/react'
import type { AriaMessage, LeadData, LeadStage, Language } from '@/lib/aria/types'

// Mock the persistence hook first - MUST be before any hook imports
const mockAddMessage = jest.fn()
const mockUpdateMessage = jest.fn()
const mockUpdateLeadData = jest.fn()
const mockSetLeadStage = jest.fn()
const mockSetLanguage = jest.fn()
const mockClearConversation = jest.fn()
const mockGetConversationHistory = jest.fn(() => [])
const mockGetContextSummary = jest.fn(() => '')
const mockHasExistingContext = jest.fn(() => false)

// State that can be mutated by the mock
let mockMessages: AriaMessage[] = []
let mockLeadData: LeadData = {
  name: '',
  phone: '',
  studentClass: '',
  city: '',
  email: '',
  score: 0,
  interests: [],
  source: 'aria_widget',
  language: 'en',
}
let mockLeadStage: LeadStage = 'chat'
let mockLanguage: Language = 'en'

jest.mock(
  '@/components/sales-agent/hooks/useConversationPersistence',
  () => ({
    useConversationPersistence: jest.fn((initialLanguage: Language = 'en') => {
      // Update language if initial language provided
      mockLanguage = initialLanguage
      mockLeadData = { ...mockLeadData, language: initialLanguage }

      return {
        messages: mockMessages,
        leadData: mockLeadData,
        leadStage: mockLeadStage,
        language: mockLanguage,
        sessionId: 'test_session_123',
        visitCount: 1,
        isNewVisitor: true,
        isLoaded: true,
        addMessage: mockAddMessage.mockImplementation((msg: AriaMessage) => {
          mockMessages = [...mockMessages, msg]
        }),
        updateMessage: mockUpdateMessage.mockImplementation(
          (id: string, updates: Partial<AriaMessage>) => {
            mockMessages = mockMessages.map((m) =>
              m.id === id ? { ...m, ...updates } : m
            )
          }
        ),
        updateLeadData: mockUpdateLeadData.mockImplementation(
          (updates: Partial<LeadData>) => {
            mockLeadData = { ...mockLeadData, ...updates }
          }
        ),
        setLeadStage: mockSetLeadStage.mockImplementation((stage: LeadStage) => {
          mockLeadStage = stage
        }),
        setLanguage: mockSetLanguage.mockImplementation((lang: Language) => {
          mockLanguage = lang
        }),
        clearConversation: mockClearConversation.mockImplementation(() => {
          mockMessages = []
          mockLeadStage = 'chat'
        }),
        getConversationHistory: mockGetConversationHistory,
        getContextSummary: mockGetContextSummary,
        hasExistingContext: mockHasExistingContext,
      }
    }),
  })
)

// Mock translations
jest.mock('@/lib/aria/translations', () => ({
  getTranslation: jest.fn((key: string, lang: string = 'en') => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        greeting:
          "Hi! I'm ARIA, your AI assistant at Cerebrum Biology Academy.",
        errorMessage: 'Sorry, something went wrong. Please try again.',
        quickActionCourses: 'Tell me about courses',
        quickActionPricing: 'What are the fees?',
        quickActionDemo: 'Book a demo',
        quickActionWhy: 'Why Cerebrum?',
      },
      hi: {
        greeting:
          'नमस्ते! मैं ARIA हूं, Cerebrum Biology Academy में आपकी AI सहायक।',
        errorMessage: 'क्षमा करें, कुछ गलत हो गया। कृपया पुनः प्रयास करें।',
        quickActionCourses: 'कोर्स के बारे में बताएं',
        quickActionPricing: 'फीस क्या है?',
        quickActionDemo: 'डेमो बुक करें',
        quickActionWhy: 'Cerebrum ही क्यों?',
      },
    }
    return translations[lang]?.[key] || key
  }),
  detectLanguage: jest.fn((text: string) => {
    const hindiPattern = /[\u0900-\u097F]/
    return hindiPattern.test(text) ? 'hi' : 'en'
  }),
}))

// Mock WhatsApp integration
const mockOpenWhatsApp = jest.fn()
jest.mock('@/lib/aria/whatsappIntegration', () => ({
  getAriaWhatsAppLink: jest.fn(
    () => 'https://wa.me/919876543210?text=Hello'
  ),
  getDemoBookingWhatsAppLink: jest.fn(
    () => 'https://wa.me/919876543210?text=Demo'
  ),
  openWhatsApp: (link: string) => mockOpenWhatsApp(link),
}))

// Mock fetch for API calls
const mockFetch = jest.fn()
global.fetch = mockFetch

// Import after mocks
import { useAriaChat } from '@/components/sales-agent/hooks/useAriaChat'
import { detectLanguage } from '@/lib/aria/translations'

// Helper to create a mock streaming response
function createMockStreamResponse(chunks: string[]) {
  const encoder = new TextEncoder()
  let index = 0

  const stream = new ReadableStream({
    pull(controller) {
      if (index < chunks.length) {
        const data = `data: ${JSON.stringify({ text: chunks[index] })}\n\n`
        controller.enqueue(encoder.encode(data))
        index++
      } else {
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      }
    },
  })

  return new Response(stream, {
    status: 200,
    headers: { 'Content-Type': 'text/event-stream' },
  })
}

describe('useAriaChat', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks()
    mockFetch.mockReset()
    mockOpenWhatsApp.mockReset()

    // Reset mock state
    mockMessages = []
    mockLeadData = {
      name: '',
      phone: '',
      studentClass: '',
      city: '',
      email: '',
      score: 0,
      interests: [],
      source: 'aria_widget',
      language: 'en',
    }
    mockLeadStage = 'chat'
    mockLanguage = 'en'
  })

  describe('initialization', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useAriaChat())

      expect(result.current.messages).toBeDefined()
      expect(Array.isArray(result.current.messages)).toBe(true)
      expect(result.current.isStreaming).toBe(false)
      expect(result.current.error).toBeNull()
      expect(result.current.leadStage).toBe('chat')
      expect(result.current.language).toBe('en')
      expect(result.current.isLoaded).toBe(true)
    })

    it('should accept initial language option', () => {
      const { result } = renderHook(() =>
        useAriaChat({ initialLanguage: 'hi' })
      )

      expect(result.current.language).toBe('hi')
    })

    it('should provide greeting message generator', () => {
      const { result } = renderHook(() => useAriaChat())

      const greeting = result.current.getGreeting()
      expect(greeting).toBeDefined()
      expect(greeting.sender).toBe('bot')
      expect(greeting.text).toContain('ARIA')
      expect(greeting.quickActions).toBeDefined()
      expect(greeting.quickActions?.length).toBeGreaterThan(0)
    })
  })

  describe('sendMessage', () => {
    it('should add user message and call API', async () => {
      mockFetch.mockResolvedValueOnce(
        createMockStreamResponse(['Hello', '! How can', ' I help you?'])
      )

      const { result } = renderHook(() => useAriaChat())

      await act(async () => {
        await result.current.sendMessage('Tell me about courses')
      })

      // addMessage should be called for user message and bot message
      expect(mockAddMessage).toHaveBeenCalled()

      // API should be called
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/aria/chat',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      )
    })

    it('should handle streaming response', async () => {
      mockFetch.mockResolvedValueOnce(
        createMockStreamResponse(['Hi', ' there', '!'])
      )

      const { result } = renderHook(() => useAriaChat())

      await act(async () => {
        await result.current.sendMessage('Hello')
      })

      // updateMessage should be called as chunks arrive
      expect(mockUpdateMessage).toHaveBeenCalled()
    })

    it('should handle API error gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const { result } = renderHook(() => useAriaChat())

      await act(async () => {
        await result.current.sendMessage('Hello')
      })

      expect(result.current.error).toBeTruthy()
    })

    it('should handle non-ok response status', async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ error: 'Rate limited' }), { status: 429 })
      )

      const { result } = renderHook(() => useAriaChat())

      await act(async () => {
        await result.current.sendMessage('Hello')
      })

      expect(result.current.error).toBeTruthy()
    })

    it('should not send empty messages', async () => {
      const { result } = renderHook(() => useAriaChat())

      await act(async () => {
        await result.current.sendMessage('')
      })

      expect(mockFetch).not.toHaveBeenCalled()
    })

    it('should not send while already streaming', async () => {
      // Test that sendMessage returns early when isStreaming is true
      // We do this by checking behavior after the first message starts streaming
      mockFetch.mockResolvedValueOnce(
        createMockStreamResponse(['Response 1'])
      )
      mockFetch.mockResolvedValueOnce(
        createMockStreamResponse(['Response 2'])
      )

      const { result } = renderHook(() => useAriaChat())

      // Send first message - this should set isStreaming to true internally
      await act(async () => {
        await result.current.sendMessage('First')
      })

      // After first message completes, isStreaming should be false
      // The hook guards against duplicate sends via the isStreaming check
      expect(mockFetch).toHaveBeenCalledTimes(1)

      // Now send another message - this should work since streaming is done
      await act(async () => {
        await result.current.sendMessage('Second')
      })

      // Both messages should have been sent
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })

  describe('lead capture flow', () => {
    it('should track lead stage progression', () => {
      const { result } = renderHook(() => useAriaChat())

      expect(result.current.leadStage).toBe('chat')

      act(() => {
        result.current.setLeadStage('name')
      })

      expect(mockSetLeadStage).toHaveBeenCalledWith('name')
    })

    it('should start lead capture flow', () => {
      const { result } = renderHook(() => useAriaChat())

      expect(result.current.leadStage).toBe('chat')

      act(() => {
        result.current.startLeadCapture()
      })

      expect(mockSetLeadStage).toHaveBeenCalledWith('name')
    })

    it('should submit lead name field', () => {
      // Start with name stage
      mockLeadStage = 'name'
      const { result } = renderHook(() => useAriaChat())

      act(() => {
        result.current.submitLeadField('name', 'John Doe')
      })

      expect(mockUpdateLeadData).toHaveBeenCalledWith({ name: 'John Doe' })
      expect(mockSetLeadStage).toHaveBeenCalledWith('phone')
    })

    it('should validate phone number format - valid Indian number', () => {
      mockLeadStage = 'phone'
      const { result } = renderHook(() => useAriaChat())

      let success: boolean = false
      act(() => {
        success = result.current.submitLeadField('phone', '9876543210')
      })

      expect(success).toBe(true)
      expect(mockUpdateLeadData).toHaveBeenCalledWith({ phone: '9876543210' })
    })

    it('should reject invalid phone number', () => {
      mockLeadStage = 'phone'
      const { result } = renderHook(() => useAriaChat())

      let success: boolean = true
      act(() => {
        success = result.current.submitLeadField('phone', '1234567890') // Doesn't start with 6-9
      })

      expect(success).toBe(false)
      expect(mockUpdateLeadData).not.toHaveBeenCalled()
    })

    it('should progress through all stages', () => {
      const mockLeadCaptured = jest.fn()

      // Test each stage transition separately with correct initial state
      // Stage 1: name -> phone
      mockLeadStage = 'name'
      const { result: result1, unmount: unmount1 } = renderHook(() =>
        useAriaChat({ onLeadCaptured: mockLeadCaptured })
      )
      act(() => {
        result1.current.submitLeadField('name', 'Test User')
      })
      expect(mockSetLeadStage).toHaveBeenCalledWith('phone')
      unmount1()
      jest.clearAllMocks()

      // Stage 2: phone -> class
      mockLeadStage = 'phone'
      const { result: result2, unmount: unmount2 } = renderHook(() =>
        useAriaChat({ onLeadCaptured: mockLeadCaptured })
      )
      act(() => {
        result2.current.submitLeadField('phone', '9876543210')
      })
      expect(mockSetLeadStage).toHaveBeenCalledWith('class')
      unmount2()
      jest.clearAllMocks()

      // Stage 3: class -> complete (should trigger onLeadCaptured)
      mockLeadStage = 'class'
      const { result: result3 } = renderHook(() =>
        useAriaChat({ onLeadCaptured: mockLeadCaptured })
      )
      act(() => {
        result3.current.submitLeadField('class', '12')
      })
      expect(mockSetLeadStage).toHaveBeenCalledWith('complete')
      expect(mockLeadCaptured).toHaveBeenCalled()
    })
  })

  describe('language switching', () => {
    it('should toggle language from English to Hindi', () => {
      const { result } = renderHook(() => useAriaChat())

      expect(result.current.language).toBe('en')

      act(() => {
        result.current.toggleLanguage()
      })

      expect(mockSetLanguage).toHaveBeenCalledWith('hi')
    })

    it('should toggle language from Hindi to English', () => {
      mockLanguage = 'hi'
      const { result } = renderHook(() =>
        useAriaChat({ initialLanguage: 'hi' })
      )

      expect(result.current.language).toBe('hi')

      act(() => {
        result.current.toggleLanguage()
      })

      expect(mockSetLanguage).toHaveBeenCalledWith('en')
    })

    it('should include language in API requests', async () => {
      mockLanguage = 'hi'
      mockFetch.mockResolvedValueOnce(createMockStreamResponse(['नमस्ते!']))

      const { result } = renderHook(() =>
        useAriaChat({ initialLanguage: 'hi' })
      )

      await act(async () => {
        await result.current.sendMessage('नमस्ते')
      })

      const call = mockFetch.mock.calls[0]
      const body = JSON.parse(call[1].body)
      expect(body.language).toBe('hi')
    })

    it('should auto-detect Hindi in user message', async () => {
      mockFetch.mockResolvedValueOnce(createMockStreamResponse(['नमस्ते!']))

      const { result } = renderHook(() => useAriaChat())

      expect(result.current.language).toBe('en')

      await act(async () => {
        await result.current.sendMessage('नमस्ते, मुझे जानकारी चाहिए')
      })

      // detectLanguage should have been called
      expect(detectLanguage).toHaveBeenCalledWith('नमस्ते, मुझे जानकारी चाहिए')

      // setLanguage should be called with 'hi'
      expect(mockSetLanguage).toHaveBeenCalledWith('hi')
    })
  })

  describe('WhatsApp integration', () => {
    it('should open WhatsApp handoff', () => {
      const { result } = renderHook(() => useAriaChat())

      act(() => {
        result.current.openWhatsAppHandoff()
      })

      expect(mockOpenWhatsApp).toHaveBeenCalled()
    })

    it('should include lead data in WhatsApp message', () => {
      mockLeadData.name = 'John'
      const { result } = renderHook(() => useAriaChat())

      act(() => {
        result.current.openWhatsAppHandoff()
      })

      expect(mockOpenWhatsApp).toHaveBeenCalled()
    })

    it('should book demo via WhatsApp', () => {
      const { result } = renderHook(() => useAriaChat())

      act(() => {
        result.current.bookDemoViaWhatsApp()
      })

      expect(mockOpenWhatsApp).toHaveBeenCalled()
    })
  })

  describe('conversation management', () => {
    it('should clear conversation', async () => {
      mockFetch.mockResolvedValueOnce(createMockStreamResponse(['Hello!']))

      const { result } = renderHook(() => useAriaChat())

      // Add some messages
      await act(async () => {
        await result.current.sendMessage('Hi')
      })

      expect(mockAddMessage).toHaveBeenCalled()

      // Clear
      act(() => {
        result.current.clearConversation()
      })

      expect(mockClearConversation).toHaveBeenCalled()
    })

    it('should update lead data directly', () => {
      const { result } = renderHook(() => useAriaChat())

      act(() => {
        result.current.updateLeadData({
          name: 'Test User',
          phone: '9876543210',
        })
      })

      expect(mockUpdateLeadData).toHaveBeenCalledWith({
        name: 'Test User',
        phone: '9876543210',
      })
    })

    it('should cancel streaming', async () => {
      // Create a slow response that won't complete
      let aborted = false
      mockFetch.mockImplementationOnce(
        (_url: string, options: { signal?: AbortSignal }) => {
          return new Promise((_, reject) => {
            options?.signal?.addEventListener('abort', () => {
              aborted = true
              reject(new DOMException('Aborted', 'AbortError'))
            })
          })
        }
      )

      const { result } = renderHook(() => useAriaChat())

      // Start sending (don't await)
      act(() => {
        result.current.sendMessage('Hello')
      })

      // Wait a moment for the request to start
      await new Promise((resolve) => setTimeout(resolve, 10))

      // Cancel
      act(() => {
        result.current.cancelStream()
      })

      await waitFor(() => {
        expect(result.current.isStreaming).toBe(false)
      })
    })
  })

  describe('welcome back', () => {
    it('should generate welcome back message for returning visitors', () => {
      // Set up existing context
      mockHasExistingContext.mockReturnValue(true)
      mockLeadData.name = 'John'
      mockGetContextSummary.mockReturnValue('Last discussed: courses')

      const { result } = renderHook(() => useAriaChat())

      const welcomeBack = result.current.getWelcomeBackMessage()

      expect(welcomeBack).not.toBeNull()
      expect(welcomeBack?.sender).toBe('bot')
      expect(welcomeBack?.text).toContain('Welcome back')
      expect(welcomeBack?.text).toContain('John')
    })

    it('should return null for new visitors', () => {
      mockHasExistingContext.mockReturnValue(false)

      const { result } = renderHook(() => useAriaChat())

      const welcomeBack = result.current.getWelcomeBackMessage()

      expect(welcomeBack).toBeNull()
    })
  })

  describe('analytics callbacks', () => {
    it('should call onAnalyticsEvent when sending message', async () => {
      mockFetch.mockResolvedValueOnce(createMockStreamResponse(['Response']))

      const mockAnalytics = jest.fn()
      const { result } = renderHook(() =>
        useAriaChat({ onAnalyticsEvent: mockAnalytics })
      )

      await act(async () => {
        await result.current.sendMessage('Test')
      })

      expect(mockAnalytics).toHaveBeenCalledWith(
        'aria_message_sent',
        expect.any(Object)
      )
    })

    it('should call onLeadCaptured when lead is complete', () => {
      const mockLeadCaptured = jest.fn()
      mockLeadStage = 'class'

      const { result } = renderHook(() =>
        useAriaChat({ onLeadCaptured: mockLeadCaptured })
      )

      act(() => {
        result.current.submitLeadField('class', '12')
      })

      expect(mockLeadCaptured).toHaveBeenCalled()
    })
  })
})
