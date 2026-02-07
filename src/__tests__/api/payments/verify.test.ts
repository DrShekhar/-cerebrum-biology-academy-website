import { POST, GET } from '@/app/api/payments/verify/route'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    $transaction: jest.fn(),
    payments: {
      findFirst: jest.fn(),
      updateMany: jest.fn(),
    },
    enrollments: {
      update: jest.fn(),
    },
  },
}))

describe('POST /api/payments/verify', () => {
  const originalEnv = process.env
  const testSecret = 'test_secret_key'

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = {
      ...originalEnv,
      RAZORPAY_KEY_SECRET: testSecret,
    }
  })

  afterEach(() => {
    process.env = originalEnv
  })

  const generateValidSignature = (orderId: string, paymentId: string): string => {
    const body = orderId + '|' + paymentId
    return crypto.createHmac('sha256', testSecret).update(body).digest('hex')
  }

  describe('Valid Signature Verification', () => {
    it('should verify valid payment signature', async () => {
      const orderId = 'order_123'
      const paymentId = 'pay_123'
      const signature = generateValidSignature(orderId, paymentId)

      const mockTransaction = jest.fn().mockResolvedValue(undefined)
      ;(prisma.$transaction as jest.Mock) = mockTransaction

      const request = new NextRequest('http://localhost:3000/api/payments/verify', {
        method: 'POST',
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.verified).toBe(true)
      expect(data.orderId).toBe(orderId)
      expect(data.paymentId).toBe(paymentId)
    })

    it('should support alternative naming convention', async () => {
      const orderId = 'order_456'
      const paymentId = 'pay_456'
      const signature = generateValidSignature(orderId, paymentId)

      const request = new NextRequest('http://localhost:3000/api/payments/verify', {
        method: 'POST',
        body: JSON.stringify({
          order_id: orderId,
          payment_id: paymentId,
          signature: signature,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.verified).toBe(true)
    })
  })

  describe('Invalid Signature Rejection', () => {
    it('should reject invalid signature', async () => {
      const request = new NextRequest('http://localhost:3000/api/payments/verify', {
        method: 'POST',
        body: JSON.stringify({
          razorpay_order_id: 'order_123',
          razorpay_payment_id: 'pay_123',
          razorpay_signature: 'invalid_signature_12345',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.verified).toBe(false)
    })

    it('should reject tampered payment ID', async () => {
      const orderId = 'order_123'
      const paymentId = 'pay_123'
      const signature = generateValidSignature(orderId, paymentId)

      const request = new NextRequest('http://localhost:3000/api/payments/verify', {
        method: 'POST',
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: 'pay_tampered',
          razorpay_signature: signature,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data.verified).toBe(false)
    })
  })

  describe('Transaction Atomicity', () => {
    it('should update payment and enrollment in transaction', async () => {
      const orderId = 'order_123'
      const paymentId = 'pay_123'
      const signature = generateValidSignature(orderId, paymentId)

      const mockTransactionFn = jest.fn(async (callback) => {
        const mockTx = {
          payments: {
            findFirst: jest.fn().mockResolvedValue({
              id: 'payment_123',
              enrollmentId: 'enroll_123',
              amount: 4200000,
              razorpayOrderId: orderId,
              status: 'PENDING',
            }),
            updateMany: jest.fn().mockResolvedValue({ count: 1 }),
          },
          enrollments: {
            update: jest.fn().mockResolvedValue({
              id: 'enroll_123',
              status: 'ACTIVE',
            }),
          },
        }
        return callback(mockTx)
      })
      ;(prisma.$transaction as jest.Mock) = mockTransactionFn

      const request = new NextRequest('http://localhost:3000/api/payments/verify', {
        method: 'POST',
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
        }),
      })

      const response = await POST(request)
      expect(response.status).toBe(200)
      expect(mockTransactionFn).toHaveBeenCalled()
    })

    it('should rollback transaction on error', async () => {
      const orderId = 'order_123'
      const paymentId = 'pay_123'
      const signature = generateValidSignature(orderId, paymentId)

      const mockTransactionFn = jest.fn(async (callback) => {
        const mockTx = {
          payments: {
            findFirst: jest.fn().mockResolvedValue({
              id: 'payment_123',
              enrollmentId: 'enroll_123',
              amount: 4200000,
              razorpayOrderId: orderId,
              status: 'PENDING',
            }),
            updateMany: jest.fn().mockRejectedValue(new Error('Database error')),
          },
        }
        return callback(mockTx)
      })
      ;(prisma.$transaction as jest.Mock) = mockTransactionFn

      const request = new NextRequest('http://localhost:3000/api/payments/verify', {
        method: 'POST',
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.verified).toBe(true)
      expect(data.warning).toBe('Payment verified but database update failed')
    })
  })

  describe('Idempotency', () => {
    it('should handle duplicate verification gracefully', async () => {
      const orderId = 'order_123'
      const paymentId = 'pay_123'
      const signature = generateValidSignature(orderId, paymentId)

      const mockTransactionFn = jest.fn(async (callback) => {
        const mockTx = {
          payments: {
            findFirst: jest.fn().mockResolvedValue({
              id: 'payment_123',
              enrollmentId: 'enroll_123',
              amount: 4200000,
              razorpayOrderId: orderId,
              status: 'COMPLETED',
            }),
          },
        }
        return callback(mockTx)
      })
      ;(prisma.$transaction as jest.Mock) = mockTransactionFn

      const request = new NextRequest('http://localhost:3000/api/payments/verify', {
        method: 'POST',
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.verified).toBe(true)
    })
  })

  describe('Enrollment Status Update', () => {
    it('should activate enrollment after payment', async () => {
      const orderId = 'order_123'
      const paymentId = 'pay_123'
      const signature = generateValidSignature(orderId, paymentId)

      const mockUpdate = jest.fn()
      const mockTransactionFn = jest.fn(async (callback) => {
        const mockTx = {
          payments: {
            findFirst: jest.fn().mockResolvedValue({
              id: 'payment_123',
              enrollmentId: 'enroll_123',
              amount: 4200000,
              razorpayOrderId: orderId,
              status: 'PENDING',
            }),
            updateMany: jest.fn().mockResolvedValue({ count: 1 }),
          },
          enrollments: {
            update: mockUpdate,
          },
        }
        return callback(mockTx)
      })
      ;(prisma.$transaction as jest.Mock) = mockTransactionFn

      const request = new NextRequest('http://localhost:3000/api/payments/verify', {
        method: 'POST',
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
        }),
      })

      await POST(request)

      expect(mockUpdate).toHaveBeenCalledWith({
        where: { id: 'enroll_123' },
        data: {
          status: 'ACTIVE',
          paidAmount: { increment: 4200000 },
          pendingAmount: { decrement: 4200000 },
        },
      })
    })
  })

  describe('Payment Status Update', () => {
    it('should update payment status to COMPLETED', async () => {
      const orderId = 'order_123'
      const paymentId = 'pay_123'
      const signature = generateValidSignature(orderId, paymentId)

      const mockUpdateMany = jest.fn()
      const mockTransactionFn = jest.fn(async (callback) => {
        const mockTx = {
          payments: {
            findFirst: jest.fn().mockResolvedValue({
              id: 'payment_123',
              enrollmentId: 'enroll_123',
              amount: 4200000,
              razorpayOrderId: orderId,
              status: 'PENDING',
            }),
            updateMany: mockUpdateMany,
          },
          enrollments: {
            update: jest.fn(),
          },
        }
        return callback(mockTx)
      })
      ;(prisma.$transaction as jest.Mock) = mockTransactionFn

      const request = new NextRequest('http://localhost:3000/api/payments/verify', {
        method: 'POST',
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
        }),
      })

      await POST(request)

      expect(mockUpdateMany).toHaveBeenCalledWith({
        where: { razorpayOrderId: orderId },
        data: expect.objectContaining({
          razorpayPaymentId: paymentId,
          razorpaySignature: signature,
          status: 'COMPLETED',
        }),
      })
    })
  })

  describe('Missing Parameters Handling', () => {
    it('should reject missing order_id', async () => {
      const request = new NextRequest('http://localhost:3000/api/payments/verify', {
        method: 'POST',
        body: JSON.stringify({
          razorpay_payment_id: 'pay_123',
          razorpay_signature: 'sig_123',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.verified).toBe(false)
      expect(data.error).toBe('Missing required payment verification parameters')
    })

    it('should reject missing payment_id', async () => {
      const request = new NextRequest('http://localhost:3000/api/payments/verify', {
        method: 'POST',
        body: JSON.stringify({
          razorpay_order_id: 'order_123',
          razorpay_signature: 'sig_123',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.verified).toBe(false)
    })

    it('should reject missing signature', async () => {
      const request = new NextRequest('http://localhost:3000/api/payments/verify', {
        method: 'POST',
        body: JSON.stringify({
          razorpay_order_id: 'order_123',
          razorpay_payment_id: 'pay_123',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.verified).toBe(false)
    })
  })

  describe('Environment Configuration', () => {
    it('should fail when RAZORPAY_KEY_SECRET missing', async () => {
      delete process.env.RAZORPAY_KEY_SECRET

      const request = new NextRequest('http://localhost:3000/api/payments/verify', {
        method: 'POST',
        body: JSON.stringify({
          razorpay_order_id: 'order_123',
          razorpay_payment_id: 'pay_123',
          razorpay_signature: 'sig_123',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.verified).toBe(false)
      expect(data.error).toBe('Payment gateway configuration error')
    })
  })

  describe('Payment Amount Reconciliation', () => {
    it('should verify payment amount matches order', async () => {
      const orderId = 'order_123'
      const paymentId = 'pay_123'
      const signature = generateValidSignature(orderId, paymentId)

      const mockTransactionFn = jest.fn(async (callback) => {
        const mockTx = {
          payments: {
            findFirst: jest.fn().mockResolvedValue({
              id: 'payment_123',
              enrollmentId: 'enroll_123',
              amount: 4200000,
              razorpayOrderId: orderId,
              status: 'PENDING',
            }),
            updateMany: jest.fn().mockResolvedValue({ count: 1 }),
          },
          enrollments: {
            update: jest.fn().mockResolvedValue({
              paidAmount: 4200000,
            }),
          },
        }
        return callback(mockTx)
      })
      ;(prisma.$transaction as jest.Mock) = mockTransactionFn

      const request = new NextRequest('http://localhost:3000/api/payments/verify', {
        method: 'POST',
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
        }),
      })

      const response = await POST(request)
      expect(response.status).toBe(200)
    })
  })
})

describe('GET /api/payments/verify', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return payment status', async () => {
    const mockPayment = {
      id: 'payment_123',
      status: 'COMPLETED',
      amount: 4200000,
      razorpayOrderId: 'order_123',
      razorpayPaymentId: 'pay_123',
      createdAt: new Date(),
      completedAt: new Date(),
      enrollments: {
        id: 'enroll_123',
        course: {
          id: 'course_123',
          name: 'Test Course',
        },
      },
    }
    ;(prisma.payments.findFirst as jest.Mock).mockResolvedValue(mockPayment)

    const request = new NextRequest(
      'http://localhost:3000/api/payments/verify?razorpay_order_id=order_123'
    )

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.payment.id).toBe('payment_123')
    expect(data.payment.status).toBe('COMPLETED')
  })

  it('should return 404 for non-existent payment', async () => {
    ;(prisma.payments.findFirst as jest.Mock).mockResolvedValue(null)

    const request = new NextRequest(
      'http://localhost:3000/api/payments/verify?razorpay_order_id=order_nonexistent'
    )

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.error).toBe('Payment not found')
  })

  it('should require order_id parameter', async () => {
    const request = new NextRequest('http://localhost:3000/api/payments/verify')

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Missing order_id parameter')
  })
})
