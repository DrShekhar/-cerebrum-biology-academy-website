import { POST } from '@/app/api/payments/create-order/route'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import Razorpay from 'razorpay'

jest.mock('razorpay')
jest.mock('@/lib/prisma', () => ({
  prisma: {
    payment: {
      create: jest.fn(),
    },
  },
}))

const MockedRazorpay = Razorpay as jest.MockedClass<typeof Razorpay>

describe('POST /api/payments/create-order', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_RAZORPAY_KEY_ID: 'rzp_test_key',
      RAZORPAY_KEY_SECRET: 'test_secret',
    }

    MockedRazorpay.mockImplementation(
      () =>
        ({
          orders: {
            create: jest.fn().mockResolvedValue({
              id: 'order_123',
              entity: 'order',
              amount: 4200000,
              currency: 'INR',
              receipt: 'receipt_123',
              status: 'created',
              created_at: 1234567890,
            }),
          },
        }) as any
    )
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('Valid Order Creation', () => {
    it('should create order with valid amount', async () => {
      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42000,
          currency: 'INR',
          receipt: 'receipt_123',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.id).toBe('order_123')
      expect(data.amount).toBe(4200000)
      expect(data.currency).toBe('INR')
    })

    it('should create order with default currency INR', async () => {
      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42000,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.currency).toBe('INR')
    })

    it('should generate auto receipt if not provided', async () => {
      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42000,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.receipt).toContain('receipt_')
    })

    it('should create payment record when enrollmentId provided', async () => {
      const mockCreate = jest.fn().mockResolvedValue({
        id: 'payment_123',
        enrollmentId: 'enroll_123',
        amount: 4200000,
        razorpayOrderId: 'order_123',
        status: 'PENDING',
      })
      ;(prisma.payment.create as jest.Mock) = mockCreate

      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42000,
          enrollmentId: 'enroll_123',
        }),
      })

      const response = await POST(request)
      expect(response.status).toBe(200)
      expect(mockCreate).toHaveBeenCalledWith({
        data: {
          enrollmentId: 'enroll_123',
          amount: 4200000,
          razorpayOrderId: 'order_123',
          status: 'PENDING',
        },
      })
    })
  })

  describe('Amount Validation', () => {
    it('should reject negative amounts', async () => {
      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: -100,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Invalid amount')
    })

    it('should reject zero amount', async () => {
      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 0,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Invalid amount')
    })

    it('should reject missing amount', async () => {
      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({}),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Invalid amount')
    })
  })

  describe('Currency Validation', () => {
    it('should accept INR currency', async () => {
      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42000,
          currency: 'INR',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.currency).toBe('INR')
    })
  })

  describe('Paise Conversion', () => {
    it('should convert rupees to paise correctly', async () => {
      const testCases = [
        { input: 42000, expected: 4200000 },
        { input: 100, expected: 10000 },
        { input: 1, expected: 100 },
        { input: 0.5, expected: 50 },
      ]

      for (const { input, expected } of testCases) {
        const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
          method: 'POST',
          body: JSON.stringify({
            amount: input,
          }),
        })

        const response = await POST(request)
        const data = await response.json()

        expect(data.amount).toBe(expected)
      }
    })

    it('should round paise conversion', async () => {
      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42.567,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data.amount).toBe(4257)
    })
  })

  describe('Environment Variable Validation', () => {
    it('should fail when RAZORPAY_KEY_ID missing', async () => {
      delete process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42000,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Payment gateway not configured')
    })

    it('should fail when RAZORPAY_KEY_SECRET missing', async () => {
      delete process.env.RAZORPAY_KEY_SECRET

      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42000,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Payment gateway not configured')
    })
  })

  describe('Razorpay API Error Handling', () => {
    it('should handle Razorpay API failure', async () => {
      MockedRazorpay.mockImplementation(
        () =>
          ({
            orders: {
              create: jest.fn().mockRejectedValue(new Error('Razorpay API error')),
            },
          }) as any
      )

      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42000,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Razorpay API error')
    })

    it('should handle network timeout', async () => {
      MockedRazorpay.mockImplementation(
        () =>
          ({
            orders: {
              create: jest.fn().mockRejectedValue(new Error('Network timeout')),
            },
          }) as any
      )

      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42000,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
    })
  })

  describe('Receipt Generation', () => {
    it('should use provided receipt', async () => {
      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42000,
          receipt: 'custom_receipt_123',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.receipt).toBe('receipt_123')
    })
  })

  describe('Order ID Format', () => {
    it('should return valid Razorpay order ID', async () => {
      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42000,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.id).toMatch(/^order_/)
    })
  })

  describe('Enrollment ID Linking', () => {
    it('should link payment to enrollment', async () => {
      const mockCreate = jest.fn()
      ;(prisma.payment.create as jest.Mock) = mockCreate

      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42000,
          enrollmentId: 'enroll_abc123',
        }),
      })

      await POST(request)

      expect(mockCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({
          enrollmentId: 'enroll_abc123',
        }),
      })
    })

    it('should not create payment record without enrollmentId', async () => {
      const mockCreate = jest.fn()
      ;(prisma.payment.create as jest.Mock) = mockCreate

      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42000,
        }),
      })

      await POST(request)

      expect(mockCreate).not.toHaveBeenCalled()
    })
  })

  describe('Response Structure', () => {
    it('should return complete order details', async () => {
      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42000,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data).toHaveProperty('success')
      expect(data).toHaveProperty('id')
      expect(data).toHaveProperty('entity')
      expect(data).toHaveProperty('amount')
      expect(data).toHaveProperty('currency')
      expect(data).toHaveProperty('receipt')
      expect(data).toHaveProperty('status')
      expect(data).toHaveProperty('created_at')
    })
  })
})
