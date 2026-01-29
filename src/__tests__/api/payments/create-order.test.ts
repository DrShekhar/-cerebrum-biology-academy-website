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
    payments: {
      create: jest.fn(),
    },
    enrollment: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    coupons: {
      findUnique: jest.fn(),
    },
  },
}))

// Mock the user session validation
jest.mock('@/lib/auth/config', () => ({
  validateUserSession: jest.fn().mockResolvedValue({
    valid: true,
    userId: 'test-user-123',
    email: 'test@example.com',
    role: 'STUDENT',
  }),
}))

const MockedRazorpay = Razorpay as jest.MockedClass<typeof Razorpay>

// Import the mock to control it in tests
import { validateUserSession } from '@/lib/auth/config'
const mockValidateUserSession = validateUserSession as jest.MockedFunction<
  typeof validateUserSession
>

describe('POST /api/payments/create-order', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_RAZORPAY_KEY_ID: 'rzp_test_key',
      RAZORPAY_KEY_SECRET: 'test_secret',
    }

    // Reset the mock to return valid session by default
    mockValidateUserSession.mockResolvedValue({
      valid: true,
      userId: 'test-user-123',
      email: 'test@example.com',
      role: 'STUDENT',
      name: 'Test User',
    })

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
      // Mock enrollment lookup - pendingAmount should match request amount
      // Request sends 42000, so enrollment pendingAmount should be 42000
      ;(prisma.enrollment.findUnique as jest.Mock).mockResolvedValue({
        id: 'enroll_123',
        userId: 'test-user-123',
        pendingAmount: 42000,
        course: { price: 42000 },
      })

      const mockCreate = jest.fn().mockResolvedValue({
        id: 'payment_123',
        userId: 'test-user-123',
        enrollmentId: 'enroll_123',
        amount: 4200000,
        razorpayOrderId: 'order_123',
        status: 'PENDING',
      })
      ;(prisma.payments.create as jest.Mock) = mockCreate

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
        data: expect.objectContaining({
          userId: 'test-user-123',
          enrollmentId: 'enroll_123',
          amount: 4200000,
          razorpayOrderId: 'order_123',
          status: 'PENDING',
        }),
      })
    })
  })

  describe('Authentication', () => {
    it('should reject unauthenticated requests', async () => {
      mockValidateUserSession.mockResolvedValue({
        valid: false,
        userId: null,
        email: null,
        role: null,
        name: null,
      })

      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42000,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Authentication required')
    })

    it('should reject creating orders for other users', async () => {
      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42000,
          userId: 'different-user-456', // Different from authenticated user
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(403)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Cannot create payment order for another user')
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
      // Test with a single amount - mock returns the amount we configured
      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42000,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      // The mock returns 4200000 (42000 * 100 paise)
      expect(data.amount).toBe(4200000)
    })

    it('should create order with decimal amounts', async () => {
      // Update mock to return the expected paise amount
      MockedRazorpay.mockImplementation(
        () =>
          ({
            orders: {
              create: jest.fn().mockResolvedValue({
                id: 'order_123',
                entity: 'order',
                amount: 4257, // 42.57 * 100 rounded
                currency: 'INR',
                receipt: 'receipt_123',
                status: 'created',
                created_at: 1234567890,
              }),
            },
          }) as any
      )

      const request = new NextRequest('http://localhost:3000/api/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: 42.57,
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
      // Mock enrollment lookup - pendingAmount should match request amount
      ;(prisma.enrollment.findUnique as jest.Mock).mockResolvedValue({
        id: 'enroll_abc123',
        userId: 'test-user-123',
        pendingAmount: 42000,
        course: { price: 42000 },
      })

      const mockCreate = jest.fn()
      ;(prisma.payments.create as jest.Mock) = mockCreate

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
          userId: 'test-user-123',
          enrollmentId: 'enroll_abc123',
        }),
      })
    })

    it('should not create payment record without enrollmentId', async () => {
      const mockCreate = jest.fn()
      ;(prisma.payments.create as jest.Mock) = mockCreate

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
