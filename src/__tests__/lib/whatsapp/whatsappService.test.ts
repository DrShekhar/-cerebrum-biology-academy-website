import { WhatsAppService } from '@/lib/whatsapp/whatsappService'
import * as metaSender from '@/lib/whatsapp/metaSender'

// The service now sends via the Meta WhatsApp Cloud API (metaSender), not a
// relative-URL fetch to /api/whatsapp/send (the old, broken, silently-no-op'ing
// path). Mock the sender so tests assert the service's behaviour, not HTTP.
jest.mock('@/lib/whatsapp/metaSender', () => ({
  sendMetaText: jest.fn(),
  sendMetaTemplate: jest.fn(),
  sendMetaInteractive: jest.fn(),
  getMetaMediaUrl: jest.fn(),
}))

const mockSendMetaText = metaSender.sendMetaText as jest.MockedFunction<
  typeof metaSender.sendMetaText
>
const mockSendMetaTemplate = metaSender.sendMetaTemplate as jest.MockedFunction<
  typeof metaSender.sendMetaTemplate
>
const mockGetMetaMediaUrl = metaSender.getMetaMediaUrl as jest.MockedFunction<
  typeof metaSender.getMetaMediaUrl
>

const ok = { success: true as const, messageId: 'wamid.test' }
const fail = { success: false as const, error: 'boom' }

describe('WhatsAppService', () => {
  let service: WhatsAppService

  beforeEach(() => {
    jest.clearAllMocks()
    service = new WhatsAppService()
  })

  describe('sendMessage (text)', () => {
    it('sends a free-form text via Meta and returns true on success', async () => {
      mockSendMetaText.mockResolvedValueOnce(ok)

      const result = await service.sendMessage({
        phone: '+918826444334',
        message: 'Hello Student!',
      })

      expect(result).toBe(true)
      // '+91…' is normalized to Meta digits (no '+').
      expect(mockSendMetaText).toHaveBeenCalledWith('918826444334', 'Hello Student!')
    })

    it('normalizes a bare 10-digit number to +91', async () => {
      mockSendMetaText.mockResolvedValueOnce(ok)

      await service.sendMessage({ phone: '8826444334', message: 'Test' })

      expect(mockSendMetaText).toHaveBeenCalledWith('918826444334', 'Test')
    })

    it('returns false when the Meta send fails', async () => {
      mockSendMetaText.mockResolvedValueOnce(fail)

      const result = await service.sendMessage({ phone: '+918826444334', message: 'Test' })

      expect(result).toBe(false)
    })

    it('returns false (never throws) on a network/unexpected error', async () => {
      mockSendMetaText.mockRejectedValueOnce(new Error('Network error'))

      const result = await service.sendMessage({ phone: '+918826444334', message: 'Test' })

      expect(result).toBe(false)
    })

    it('does not send when the phone has no digits', async () => {
      const result = await service.sendMessage({ phone: 'invalid', message: 'Test' })

      expect(result).toBe(false)
      expect(mockSendMetaText).not.toHaveBeenCalled()
    })
  })

  describe('sendMessage (template)', () => {
    it('routes template messages through sendMetaTemplate', async () => {
      mockSendMetaTemplate.mockResolvedValueOnce(ok)

      const result = await service.sendMessage({
        phone: '+918826444334',
        message: 'Template content',
        type: 'template',
        templateName: 'demo_booking_confirmation',
        templateParams: ['John Doe', '2025-10-25', '10:00 AM'],
      })

      expect(result).toBe(true)
      expect(mockSendMetaTemplate).toHaveBeenCalledWith({
        to: '918826444334',
        templateName: 'demo_booking_confirmation',
        bodyValues: ['John Doe', '2025-10-25', '10:00 AM'],
      })
      expect(mockSendMetaText).not.toHaveBeenCalled()
    })
  })

  describe('confirmation / reminder helpers', () => {
    it('demo booking confirmation includes the student name and confirmation copy', async () => {
      mockSendMetaText.mockResolvedValueOnce(ok)

      const result = await service.sendDemoBookingConfirmation(
        '+918826444334',
        'John Doe',
        new Date('2025-10-25T10:00:00Z')
      )

      expect(result).toBe(true)
      const [, message] = mockSendMetaText.mock.calls[0]
      expect(message).toContain('John Doe')
      expect(message).toContain('demo class is confirmed')
    })

    it('enrollment confirmation includes the course name', async () => {
      mockSendMetaText.mockResolvedValueOnce(ok)

      await service.sendEnrollmentConfirmation('+918826444334', 'Alice', 'NEET Biology Pinnacle')

      const [, message] = mockSendMetaText.mock.calls[0]
      expect(message).toContain('Alice')
      expect(message).toContain('NEET Biology Pinnacle')
    })

    it('payment reminder formats the amount', async () => {
      mockSendMetaText.mockResolvedValueOnce(ok)

      await service.sendPaymentReminder('+918826444334', 'Charlie', 42000, new Date('2025-11-01'))

      const [, message] = mockSendMetaText.mock.calls[0]
      expect(message).toContain('Charlie')
      expect(message).toContain('42,000')
    })
  })

  describe('getMediaUrl', () => {
    it('returns the resolved Meta media URL', async () => {
      mockGetMetaMediaUrl.mockResolvedValueOnce('https://lookaside.example/media/abc')

      const url = await service.getMediaUrl('media_123')

      expect(url).toBe('https://lookaside.example/media/abc')
    })

    it('returns an empty string when the media cannot be resolved', async () => {
      mockGetMetaMediaUrl.mockResolvedValueOnce(null)

      const url = await service.getMediaUrl('media_123')

      expect(url).toBe('')
    })
  })

  describe('bulk send', () => {
    it('tallies sent / failed across recipients', async () => {
      mockSendMetaText
        .mockResolvedValueOnce(ok)
        .mockResolvedValueOnce(fail)
        .mockResolvedValueOnce(ok)

      const result = await service.sendBulkMessage(
        ['+918826444334', '+919311946297', '+919999744334'],
        'Broadcast'
      )

      expect(result).toEqual({ sent: 2, failed: 1, total: 3 })
    })
  })
})
