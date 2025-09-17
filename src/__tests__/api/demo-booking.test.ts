/**
 * @jest-environment node
 */

import { POST } from '@/app/api/demo-booking/route'
import { prisma } from '@/lib/database'
import { NextRequest } from 'next/server'

// Mock Prisma
jest.mock('@/lib/database', () => ({
  prisma: {
    demoBooking: {
      create: jest.fn(),
    },
  },
}))

// Mock WhatsApp service
jest.mock('@/lib/whatsapp/whatsappService', () => ({
  sendWhatsAppMessage: jest.fn().mockResolvedValue(true),
}))

describe('/api/demo-booking', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const validBookingData = {
    studentName: 'John Doe',
    email: 'john@example.com',
    phone: '+919876543210',
    preferredDate: '2024-12-31',
    preferredTime: '10:00 AM',
    message: 'Looking forward to the demo',
    studentClass: 'CLASS_12',
  }

  it('should create a demo booking successfully', async () => {
    const mockBooking = { id: 'booking-123', ...validBookingData }
    ;(prisma.demoBooking.create as jest.Mock).mockResolvedValue(mockBooking)

    const request = new NextRequest('http://localhost:3000/api/demo-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validBookingData),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
    expect(data.booking.id).toBe('booking-123')
    expect(prisma.demoBooking.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        studentName: 'John Doe',
        email: 'john@example.com',
        phone: '+919876543210',
      }),
    })
  })

  it('should handle validation errors', async () => {
    const invalidData = { ...validBookingData, email: 'invalid-email' }

    const request = new NextRequest('http://localhost:3000/api/demo-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidData),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toContain('validation')
  })

  it('should handle missing required fields', async () => {
    const incompleteData = { studentName: 'John Doe' }

    const request = new NextRequest('http://localhost:3000/api/demo-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(incompleteData),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(prisma.demoBooking.create).not.toHaveBeenCalled()
  })

  it('should handle database errors gracefully', async () => {
    ;(prisma.demoBooking.create as jest.Mock).mockRejectedValue(
      new Error('Database connection failed')
    )

    const request = new NextRequest('http://localhost:3000/api/demo-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validBookingData),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error).toBe('Internal server error')
  })

  it('should clean and validate phone numbers', async () => {
    const dataWithFormattedPhone = {
      ...validBookingData,
      phone: '+91-98765 43210',
    }

    const mockBooking = { id: 'booking-123', ...dataWithFormattedPhone }
    ;(prisma.demoBooking.create as jest.Mock).mockResolvedValue(mockBooking)

    const request = new NextRequest('http://localhost:3000/api/demo-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataWithFormattedPhone),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(prisma.demoBooking.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        phone: '+919876543210', // Should be cleaned
      }),
    })
  })

  it('should reject past dates', async () => {
    const pastDate = new Date()
    pastDate.setDate(pastDate.getDate() - 1)

    const invalidData = {
      ...validBookingData,
      preferredDate: pastDate.toISOString().split('T')[0],
    }

    const request = new NextRequest('http://localhost:3000/api/demo-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidData),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(prisma.demoBooking.create).not.toHaveBeenCalled()
  })
})
