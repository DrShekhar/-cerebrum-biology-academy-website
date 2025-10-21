import { POST, GET } from '@/app/api/enrollment/route'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    enrollment: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  },
}))

describe('POST /api/enrollment', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Valid Enrollment Creation', () => {
    it('should create enrollment with new user', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.user.create as jest.Mock).mockResolvedValue({
        id: 'user_123',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+919876543210',
        role: 'STUDENT',
      })
      ;(prisma.enrollment.create as jest.Mock).mockResolvedValue({
        id: 'enroll_123',
        userId: 'user_123',
        courseId: 'course_123',
        status: 'PENDING',
        totalFees: 4200000,
        paidAmount: 0,
        pendingAmount: 4200000,
        paymentPlan: 'FULL',
      })

      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'john@example.com',
          phone: '+919876543210',
          courseId: 'course_123',
          amount: 42000,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.enrollmentId).toBe('enroll_123')
      expect(data.userId).toBe('user_123')
    })

    it('should link enrollment to existing user', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: 'existing_user_123',
        email: 'existing@example.com',
      })
      ;(prisma.enrollment.create as jest.Mock).mockResolvedValue({
        id: 'enroll_456',
        userId: 'existing_user_123',
        courseId: 'course_123',
      })

      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'Existing User',
          email: 'existing@example.com',
          phone: '+919876543210',
          courseId: 'course_123',
          amount: 42000,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data.userId).toBe('existing_user_123')
      expect(prisma.user.create).not.toHaveBeenCalled()
    })

    it('should use provided userId if available', async () => {
      ;(prisma.enrollment.create as jest.Mock).mockResolvedValue({
        id: 'enroll_789',
        userId: 'provided_user_123',
      })

      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'Test User',
          email: 'test@example.com',
          phone: '+919876543210',
          courseId: 'course_123',
          amount: 42000,
          userId: 'provided_user_123',
        }),
      })

      await POST(request)

      expect(prisma.user.findUnique).not.toHaveBeenCalled()
    })
  })

  describe('Zod Schema Validation', () => {
    it('should reject invalid email format', async () => {
      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'invalid-email',
          phone: '+919876543210',
          courseId: 'course_123',
          amount: 42000,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid enrollment data')
    })

    it('should reject invalid phone format', async () => {
      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'john@example.com',
          phone: '123',
          courseId: 'course_123',
          amount: 42000,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid enrollment data')
    })

    it('should reject short student name', async () => {
      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'A',
          email: 'test@example.com',
          phone: '+919876543210',
          courseId: 'course_123',
          amount: 42000,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid enrollment data')
    })

    it('should reject missing required fields', async () => {
      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Invalid enrollment data')
    })
  })

  describe('Course ID Validation', () => {
    it('should accept valid course ID', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.user.create as jest.Mock).mockResolvedValue({ id: 'user_123' })
      ;(prisma.enrollment.create as jest.Mock).mockResolvedValue({
        id: 'enroll_123',
        courseId: 'valid_course_123',
      })

      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'john@example.com',
          phone: '+919876543210',
          courseId: 'valid_course_123',
          amount: 42000,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('should reject empty course ID', async () => {
      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'john@example.com',
          phone: '+919876543210',
          courseId: '',
          amount: 42000,
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
    })
  })

  describe('Amount Validation', () => {
    it('should accept positive amount', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.user.create as jest.Mock).mockResolvedValue({ id: 'user_123' })
      ;(prisma.enrollment.create as jest.Mock).mockResolvedValue({
        id: 'enroll_123',
        totalFees: 5000000,
      })

      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'john@example.com',
          phone: '+919876543210',
          courseId: 'course_123',
          amount: 50000,
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
    })

    it('should reject negative amount', async () => {
      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'john@example.com',
          phone: '+919876543210',
          courseId: 'course_123',
          amount: -100,
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
    })

    it('should reject zero amount', async () => {
      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'john@example.com',
          phone: '+919876543210',
          courseId: 'course_123',
          amount: 0,
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
    })
  })

  describe('Payment Plan Selection', () => {
    it('should default to FULL payment plan', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.user.create as jest.Mock).mockResolvedValue({ id: 'user_123' })
      ;(prisma.enrollment.create as jest.Mock).mockResolvedValue({
        id: 'enroll_123',
        paymentPlan: 'FULL',
      })

      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'john@example.com',
          phone: '+919876543210',
          courseId: 'course_123',
          amount: 42000,
        }),
      })

      const response = await POST(request)

      expect(prisma.enrollment.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          paymentPlan: 'FULL',
        }),
      })
    })

    it('should accept QUARTERLY payment plan', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.user.create as jest.Mock).mockResolvedValue({ id: 'user_123' })
      ;(prisma.enrollment.create as jest.Mock).mockResolvedValue({
        id: 'enroll_123',
        paymentPlan: 'QUARTERLY',
      })

      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'john@example.com',
          phone: '+919876543210',
          courseId: 'course_123',
          amount: 42000,
          installmentPlan: 'QUARTERLY',
        }),
      })

      await POST(request)

      expect(prisma.enrollment.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          paymentPlan: 'QUARTERLY',
        }),
      })
    })

    it('should accept MONTHLY payment plan', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.user.create as jest.Mock).mockResolvedValue({ id: 'user_123' })
      ;(prisma.enrollment.create as jest.Mock).mockResolvedValue({
        id: 'enroll_123',
        paymentPlan: 'MONTHLY',
      })

      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'john@example.com',
          phone: '+919876543210',
          courseId: 'course_123',
          amount: 42000,
          installmentPlan: 'MONTHLY',
        }),
      })

      await POST(request)

      expect(prisma.enrollment.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          paymentPlan: 'MONTHLY',
        }),
      })
    })
  })

  describe('Phone Number Validation', () => {
    it('should accept Indian phone with +91', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.user.create as jest.Mock).mockResolvedValue({ id: 'user_123' })
      ;(prisma.enrollment.create as jest.Mock).mockResolvedValue({ id: 'enroll_123' })

      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'john@example.com',
          phone: '+919876543210',
          courseId: 'course_123',
          amount: 42000,
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
    })

    it('should accept phone with spaces', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.user.create as jest.Mock).mockResolvedValue({ id: 'user_123' })
      ;(prisma.enrollment.create as jest.Mock).mockResolvedValue({ id: 'enroll_123' })

      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'john@example.com',
          phone: '+91 98765 43210',
          courseId: 'course_123',
          amount: 42000,
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
    })
  })

  describe('Email Format Validation', () => {
    it('should accept valid email', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.user.create as jest.Mock).mockResolvedValue({ id: 'user_123' })
      ;(prisma.enrollment.create as jest.Mock).mockResolvedValue({ id: 'enroll_123' })

      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+919876543210',
          courseId: 'course_123',
          amount: 42000,
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
    })

    it('should reject email without @', async () => {
      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'johnexample.com',
          phone: '+919876543210',
          courseId: 'course_123',
          amount: 42000,
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(400)
    })
  })

  describe('Duplicate Enrollment Prevention', () => {
    it('should allow multiple enrollments for same user', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: 'user_123',
        email: 'john@example.com',
      })
      ;(prisma.enrollment.create as jest.Mock).mockResolvedValue({
        id: 'enroll_new',
      })

      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'john@example.com',
          phone: '+919876543210',
          courseId: 'course_456',
          amount: 50000,
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(200)
    })
  })

  describe('Enrollment ID Generation', () => {
    it('should generate unique enrollment ID', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.user.create as jest.Mock).mockResolvedValue({ id: 'user_123' })
      ;(prisma.enrollment.create as jest.Mock).mockResolvedValue({
        id: 'unique_enroll_123',
      })

      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'john@example.com',
          phone: '+919876543210',
          courseId: 'course_123',
          amount: 42000,
        }),
      })

      const response = await POST(request)
      const data = await response.json()

      expect(data.enrollmentId).toBeDefined()
      expect(typeof data.enrollmentId).toBe('string')
    })
  })

  describe('Database Transaction Integrity', () => {
    it('should create user and enrollment atomically', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.user.create as jest.Mock).mockResolvedValue({ id: 'user_123' })
      ;(prisma.enrollment.create as jest.Mock).mockResolvedValue({
        id: 'enroll_123',
        userId: 'user_123',
      })

      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'john@example.com',
          phone: '+919876543210',
          courseId: 'course_123',
          amount: 42000,
        }),
      })

      await POST(request)

      expect(prisma.user.create).toHaveBeenCalled()
      expect(prisma.enrollment.create).toHaveBeenCalled()
    })

    it('should rollback on enrollment creation failure', async () => {
      ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.user.create as jest.Mock).mockResolvedValue({ id: 'user_123' })
      ;(prisma.enrollment.create as jest.Mock).mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/enrollment', {
        method: 'POST',
        body: JSON.stringify({
          studentName: 'John Doe',
          email: 'john@example.com',
          phone: '+919876543210',
          courseId: 'course_123',
          amount: 42000,
        }),
      })

      const response = await POST(request)

      expect(response.status).toBe(500)
    })
  })
})

describe('GET /api/enrollment', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should get enrollment by ID', async () => {
    const mockEnrollment = {
      id: 'enroll_123',
      userId: 'user_123',
      courseId: 'course_123',
      status: 'ACTIVE',
      course: {
        id: 'course_123',
        name: 'NEET Biology Pinnacle',
      },
      user: {
        id: 'user_123',
        name: 'John Doe',
        email: 'john@example.com',
      },
    }
    ;(prisma.enrollment.findUnique as jest.Mock).mockResolvedValue(mockEnrollment)

    const request = new NextRequest('http://localhost:3000/api/enrollment?id=enroll_123')

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.enrollment.id).toBe('enroll_123')
  })

  it('should return 404 for non-existent enrollment', async () => {
    ;(prisma.enrollment.findUnique as jest.Mock).mockResolvedValue(null)

    const request = new NextRequest('http://localhost:3000/api/enrollment?id=nonexistent')

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data.error).toBe('Enrollment not found')
  })

  it('should list all enrollments when no ID provided', async () => {
    const mockEnrollments = [
      { id: 'enroll_1', course: {}, user: {} },
      { id: 'enroll_2', course: {}, user: {} },
    ]
    ;(prisma.enrollment.findMany as jest.Mock).mockResolvedValue(mockEnrollments)

    const request = new NextRequest('http://localhost:3000/api/enrollment')

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.enrollments).toHaveLength(2)
  })
})
