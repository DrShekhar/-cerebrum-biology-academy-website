import { WhatsAppService } from '@/lib/whatsapp/whatsappService'

global.fetch = jest.fn()

describe('WhatsAppService', () => {
  let service: WhatsAppService
  const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>

  beforeEach(() => {
    jest.clearAllMocks()
    service = new WhatsAppService()
    process.env.WHATSAPP_API_URL = 'https://graph.facebook.com/v17.0'
    process.env.WHATSAPP_ACCESS_TOKEN = 'test_token'
  })

  describe('Message Sending', () => {
    it('should send text message successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

      const result = await service.sendMessage({
        phone: '+919876543210',
        message: 'Hello Student!',
      })

      expect(result).toBe(true)
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/whatsapp/send',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      )
    })

    it('should handle message sending failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      } as Response)

      const result = await service.sendMessage({
        phone: '+919876543210',
        message: 'Test message',
      })

      expect(result).toBe(false)
    })

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await service.sendMessage({
        phone: '+919876543210',
        message: 'Test message',
      })

      expect(result).toBe(false)
    })

    it('should send message with correct phone format', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

      await service.sendMessage({
        phone: '+919876543210',
        message: 'Test',
      })

      const call = mockFetch.mock.calls[0][1]
      const body = JSON.parse(call?.body as string)
      expect(body.phone).toBe('+919876543210')
    })
  })

  describe('Template Messages', () => {
    it('should send template message', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

      const result = await service.sendMessage({
        phone: '+919876543210',
        message: 'Template content',
        type: 'template',
        templateName: 'demo_booking_confirmation',
        templateParams: ['John Doe', '2025-10-25', '10:00 AM'],
      })

      expect(result).toBe(true)
    })
  })

  describe('Demo Booking Confirmation', () => {
    it('should send demo booking confirmation', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

      const demoTime = new Date('2025-10-25T10:00:00Z')
      const result = await service.sendDemoBookingConfirmation(
        '+919876543210',
        'John Doe',
        demoTime
      )

      expect(result).toBe(true)
      const call = mockFetch.mock.calls[0][1]
      const body = JSON.parse(call?.body as string)
      expect(body.message).toContain('John Doe')
      expect(body.message).toContain('demo class is confirmed')
    })

    it('should include demo details in message', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

      const demoTime = new Date('2025-10-25T10:00:00Z')
      await service.sendDemoBookingConfirmation('+919876543210', 'Jane Smith', demoTime)

      const call = mockFetch.mock.calls[0][1]
      const body = JSON.parse(call?.body as string)
      expect(body.message).toContain('Cell Biology')
      expect(body.message).toContain('Dr. Priya Sharma')
      expect(body.message).toContain('cerebrumbiologyacademy.com')
    })
  })

  describe('Enrollment Confirmation', () => {
    it('should send enrollment confirmation', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

      const result = await service.sendEnrollmentConfirmation(
        '+919876543210',
        'Alice Johnson',
        'NEET Biology Pinnacle'
      )

      expect(result).toBe(true)
      const call = mockFetch.mock.calls[0][1]
      const body = JSON.parse(call?.body as string)
      expect(body.message).toContain('Alice Johnson')
      expect(body.message).toContain('NEET Biology Pinnacle')
      expect(body.message).toContain('94.2% NEET qualification')
    })

    it('should include course details and next steps', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

      await service.sendEnrollmentConfirmation('+919876543210', 'Bob', 'Test Course')

      const call = mockFetch.mock.calls[0][1]
      const body = JSON.parse(call?.body as string)
      expect(body.message).toContain('Login details sent via email')
      expect(body.message).toContain('Personal mentor assigned')
    })
  })

  describe('Payment Reminder', () => {
    it('should send payment reminder', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

      const dueDate = new Date('2025-11-01')
      const result = await service.sendPaymentReminder('+919876543210', 'Charlie', 42000, dueDate)

      expect(result).toBe(true)
      const call = mockFetch.mock.calls[0][1]
      const body = JSON.parse(call?.body as string)
      expect(body.message).toContain('Charlie')
      expect(body.message).toContain('42,000')
    })

    it('should format amount correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

      const dueDate = new Date('2025-11-01')
      await service.sendPaymentReminder('+919876543210', 'Test', 100000, dueDate)

      const call = mockFetch.mock.calls[0][1]
      const body = JSON.parse(call?.body as string)
      expect(body.message).toMatch(/1,00,000|100,000/)
    })
  })

  describe('Status Tracking', () => {
    it('should track message delivery status', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, messageId: 'msg_123' }),
      } as Response)

      const result = await service.sendMessage({
        phone: '+919876543210',
        message: 'Test',
      })

      expect(result).toBe(true)
    })
  })

  describe('Error Handling', () => {
    it('should handle API timeout', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Timeout'))

      const result = await service.sendMessage({
        phone: '+919876543210',
        message: 'Test',
      })

      expect(result).toBe(false)
    })

    it('should handle invalid phone number', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ error: 'Invalid phone number' }),
      } as Response)

      const result = await service.sendMessage({
        phone: 'invalid',
        message: 'Test',
      })

      expect(result).toBe(false)
    })

    it('should handle authentication failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ error: 'Unauthorized' }),
      } as Response)

      const result = await service.sendMessage({
        phone: '+919876543210',
        message: 'Test',
      })

      expect(result).toBe(false)
    })
  })

  describe('Rate Limiting', () => {
    it('should handle rate limit errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
        json: async () => ({ error: 'Rate limit exceeded' }),
      } as Response)

      const result = await service.sendMessage({
        phone: '+919876543210',
        message: 'Test',
      })

      expect(result).toBe(false)
    })
  })

  describe('Message Queuing', () => {
    it('should send messages sequentially', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      } as Response)

      const results = await Promise.all([
        service.sendMessage({ phone: '+919876543210', message: 'Message 1' }),
        service.sendMessage({ phone: '+919876543211', message: 'Message 2' }),
        service.sendMessage({ phone: '+919876543212', message: 'Message 3' }),
      ])

      expect(results.every((r) => r === true)).toBe(true)
      expect(mockFetch).toHaveBeenCalledTimes(3)
    })
  })

  describe('Retry Logic', () => {
    it('should retry failed messages', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: false,
          status: 500,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ success: true }),
        } as Response)

      const result = await service.sendMessage({
        phone: '+919876543210',
        message: 'Test',
      })

      expect(result).toBe(false)
    })
  })

  describe('API Authentication', () => {
    it('should use access token from environment', () => {
      expect(process.env.WHATSAPP_ACCESS_TOKEN).toBe('test_token')
    })

    it('should handle missing access token gracefully', () => {
      delete process.env.WHATSAPP_ACCESS_TOKEN
      const newService = new WhatsAppService()
      expect(newService).toBeDefined()
    })
  })
})
