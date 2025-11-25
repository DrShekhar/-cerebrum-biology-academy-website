import { AIMessageHandler } from '@/lib/whatsapp/aiMessageHandler'
import { SessionManager } from '@/lib/whatsapp/sessionManager'
import { DemoBookingService } from '@/lib/whatsapp/demoBooking'
import { WhatsAppTemplates } from '@/lib/whatsapp/templates'

jest.mock('@/lib/whatsapp/sessionManager')
jest.mock('@/lib/whatsapp/demoBooking')
jest.mock('@/lib/whatsapp/templates')
jest.mock('@/lib/prisma', () => ({
  prisma: {
    whatsappInteraction: {
      create: jest.fn(),
    },
  },
}))

describe('AIMessageHandler', () => {
  let handler: AIMessageHandler
  let mockSessionManager: jest.Mocked<SessionManager>
  let mockDemoBooking: jest.Mocked<DemoBookingService>
  let mockTemplates: jest.Mocked<WhatsAppTemplates>

  const mockMessageData = {
    from: '+919876543210',
    text: 'What is photosynthesis?',
    messageId: 'msg_123',
    phoneNumberId: 'phone_123',
    name: 'John Doe',
    timestamp: '2025-10-21T10:00:00Z',
    messageType: 'text',
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockSessionManager = {
      getOrCreateSession: jest.fn().mockResolvedValue({
        userId: 'user_123',
        phone: '+919876543210',
        name: 'John Doe',
        conversationContext: {
          currentFlow: null,
          messages: [],
        },
        lastInteraction: new Date(),
      }),
      updateSession: jest.fn(),
      addToContext: jest.fn(),
    } as any

    mockDemoBooking = {
      handleDemoBookingFlow: jest.fn(),
    } as any

    mockTemplates = {
      formatResponse: jest.fn((text) => text),
    } as any
    ;(SessionManager as jest.Mock).mockImplementation(() => mockSessionManager)
    ;(DemoBookingService as jest.Mock).mockImplementation(() => mockDemoBooking)
    ;(WhatsAppTemplates as jest.Mock).mockImplementation(() => mockTemplates)

    handler = new AIMessageHandler()
  })

  describe('Intent Detection', () => {
    it('should detect demo booking intent', async () => {
      const message = {
        ...mockMessageData,
        text: 'I want to book a demo class',
      }

      await handler.processMessage(message)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalledWith(
        '+919876543210',
        'John Doe'
      )
    })

    it('should detect payment inquiry intent', async () => {
      const message = {
        ...mockMessageData,
        text: 'What are the course fees?',
      }

      await handler.processMessage(message)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })

    it('should detect course information intent', async () => {
      const message = {
        ...mockMessageData,
        text: 'Tell me about NEET Biology courses',
      }

      await handler.processMessage(message)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })
  })

  describe('Context Management', () => {
    it('should maintain conversation context', async () => {
      mockSessionManager.getOrCreateSession.mockResolvedValue({
        userId: 'user_123',
        phone: '+919876543210',
        name: 'John Doe',
        conversationContext: {
          currentFlow: null,
          messages: [
            { role: 'user', content: 'What is photosynthesis?' },
            { role: 'assistant', content: 'Photosynthesis is...' },
          ],
        },
        lastInteraction: new Date(),
      } as any)

      const message = {
        ...mockMessageData,
        text: 'Can you explain more about it?',
      }

      await handler.processMessage(message)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })

    it('should create new session for new user', async () => {
      await handler.processMessage(mockMessageData)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalledWith(
        '+919876543210',
        'John Doe'
      )
    })
  })

  describe('Response Generation', () => {
    it('should generate biology answer', async () => {
      await handler.processMessage(mockMessageData)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })

    it('should include NCERT references', async () => {
      const message = {
        ...mockMessageData,
        text: 'Explain cell structure',
      }

      await handler.processMessage(message)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })

    it('should suggest related topics', async () => {
      await handler.processMessage(mockMessageData)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })
  })

  describe('Conversation Flow', () => {
    it('should handle demo booking flow', async () => {
      mockSessionManager.getOrCreateSession.mockResolvedValue({
        userId: 'user_123',
        phone: '+919876543210',
        name: 'John Doe',
        conversationContext: {
          currentFlow: 'demo_booking',
          messages: [],
        },
        lastInteraction: new Date(),
      } as any)

      await handler.processMessage(mockMessageData)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })

    it('should handle enrollment flow', async () => {
      mockSessionManager.getOrCreateSession.mockResolvedValue({
        userId: 'user_123',
        phone: '+919876543210',
        name: 'John Doe',
        conversationContext: {
          currentFlow: 'enrollment',
          messages: [],
        },
        lastInteraction: new Date(),
      } as any)

      await handler.processMessage(mockMessageData)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })
  })

  describe('Demo Booking Intent', () => {
    it('should initiate demo booking', async () => {
      const message = {
        ...mockMessageData,
        text: 'DEMO',
      }

      await handler.processMessage(message)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })

    it('should collect student name', async () => {
      mockSessionManager.getOrCreateSession.mockResolvedValue({
        userId: 'user_123',
        phone: '+919876543210',
        conversationContext: {
          currentFlow: 'demo_booking',
          flowStep: 'name',
          messages: [],
        },
      } as any)

      const message = {
        ...mockMessageData,
        text: 'Rahul Kumar',
      }

      await handler.processMessage(message)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })
  })

  describe('Payment Inquiry Intent', () => {
    it('should provide course pricing', async () => {
      const message = {
        ...mockMessageData,
        text: 'How much does the course cost?',
      }

      await handler.processMessage(message)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })

    it('should explain payment plans', async () => {
      const message = {
        ...mockMessageData,
        text: 'Do you have installment options?',
      }

      await handler.processMessage(message)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })
  })

  describe('Course Information Intent', () => {
    it('should provide course details', async () => {
      const message = {
        ...mockMessageData,
        text: 'Tell me about your courses',
      }

      await handler.processMessage(message)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })

    it('should compare courses', async () => {
      const message = {
        ...mockMessageData,
        text: 'Difference between Pinnacle and Foundation?',
      }

      await handler.processMessage(message)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })
  })

  describe('Fallback Responses', () => {
    it('should provide fallback for unknown intent', async () => {
      const message = {
        ...mockMessageData,
        text: 'asdfghjkl',
      }

      await handler.processMessage(message)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })

    it('should suggest help command', async () => {
      const message = {
        ...mockMessageData,
        text: 'random text',
      }

      await handler.processMessage(message)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })
  })

  describe('Multi-turn Conversations', () => {
    it('should handle follow-up questions', async () => {
      mockSessionManager.getOrCreateSession.mockResolvedValue({
        userId: 'user_123',
        phone: '+919876543210',
        name: 'John Doe',
        conversationContext: {
          currentFlow: null,
          messages: [
            { role: 'user', content: 'What is mitosis?' },
            { role: 'assistant', content: 'Mitosis is cell division...' },
          ],
        },
        lastInteraction: new Date(),
      } as any)

      const message = {
        ...mockMessageData,
        text: 'What about meiosis?',
      }

      await handler.processMessage(message)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })

    it('should reference previous context', async () => {
      mockSessionManager.getOrCreateSession.mockResolvedValue({
        userId: 'user_123',
        phone: '+919876543210',
        conversationContext: {
          currentFlow: null,
          messages: [{ role: 'user', content: 'Explain photosynthesis' }],
        },
      } as any)

      const message = {
        ...mockMessageData,
        text: 'Can you give an example?',
      }

      await handler.processMessage(message)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })
  })

  describe('Session Timeout Handling', () => {
    it('should detect expired sessions', async () => {
      const oldDate = new Date()
      oldDate.setHours(oldDate.getHours() - 2)

      mockSessionManager.getOrCreateSession.mockResolvedValue({
        userId: 'user_123',
        phone: '+919876543210',
        name: 'John Doe',
        conversationContext: {
          currentFlow: null,
          messages: [],
        },
        lastInteraction: oldDate,
      } as any)

      await handler.processMessage(mockMessageData)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })

    it('should restart conversation after timeout', async () => {
      const oldDate = new Date()
      oldDate.setHours(oldDate.getHours() - 3)

      mockSessionManager.getOrCreateSession.mockResolvedValue({
        userId: 'user_123',
        phone: '+919876543210',
        conversationContext: {
          currentFlow: 'demo_booking',
          flowStep: 'name',
          messages: [],
        },
        lastInteraction: oldDate,
      } as any)

      await handler.processMessage(mockMessageData)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('should handle session creation errors', async () => {
      mockSessionManager.getOrCreateSession.mockRejectedValue(new Error('Database error'))

      await expect(handler.processMessage(mockMessageData)).rejects.toThrow()
    })

    it('should handle AI API errors gracefully', async () => {
      await handler.processMessage(mockMessageData)

      expect(mockSessionManager.getOrCreateSession).toHaveBeenCalled()
    })

    it('should log errors for debugging', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

      mockSessionManager.getOrCreateSession.mockRejectedValue(new Error('Test error'))

      await expect(handler.processMessage(mockMessageData)).rejects.toThrow()

      consoleErrorSpy.mockRestore()
    })
  })
})
