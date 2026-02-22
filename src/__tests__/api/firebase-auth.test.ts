/**
 * @jest-environment node
 *
 * Firebase Authentication Tests
 * Tests for: firebase-session, firebase webhook, firebase-verify
 */

import { NextRequest } from 'next/server'
import crypto from 'crypto'

// Mock Prisma
const mockPrisma = {
  users: {
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
}

jest.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}))

// Mock Firebase Admin
const mockVerifyIdToken = jest.fn()
jest.mock('@/lib/firebase/admin', () => ({
  verifyIdToken: mockVerifyIdToken,
}))

// Mock rate limiting
const mockRateLimit = {
  checkRateLimit: jest.fn().mockResolvedValue({ allowed: true }),
  resetRateLimit: jest.fn(),
}

jest.mock('@/lib/auth/config', () => ({
  AuthRateLimit: mockRateLimit,
  addSecurityHeaders: (response: Response) => response,
}))

// Mock JWT
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mock-jwt-token'),
}))

// ============================================
// Firebase Session Route Tests
// ============================================
describe('Firebase Session Route (/api/auth/firebase-session)', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockRateLimit.checkRateLimit.mockResolvedValue({ allowed: true })
  })

  const createRequest = (body: object) => {
    return new NextRequest('http://localhost:3000/api/auth/firebase-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  }

  describe('Input Validation', () => {
    it('should reject requests without uid', async () => {
      const { POST } = await import('@/app/api/auth/firebase-session/route')
      const request = createRequest({ phoneNumber: '+919876543210', action: 'check' })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('required')
    })

    it('should reject requests without phoneNumber', async () => {
      const { POST } = await import('@/app/api/auth/firebase-session/route')
      const request = createRequest({ uid: 'firebase-uid-123', action: 'check' })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('required')
    })

    it('should reject invalid action', async () => {
      const { POST } = await import('@/app/api/auth/firebase-session/route')
      const request = createRequest({
        uid: 'firebase-uid-123',
        phoneNumber: '+919876543210',
        action: 'invalid',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('Invalid action')
    })
  })

  describe('Rate Limiting', () => {
    it('should block requests when rate limit exceeded', async () => {
      mockRateLimit.checkRateLimit.mockResolvedValue({
        allowed: false,
        lockoutEndsAt: new Date(Date.now() + 300000),
      })

      const { POST } = await import('@/app/api/auth/firebase-session/route')
      const request = createRequest({
        uid: 'firebase-uid-123',
        phoneNumber: '+919876543210',
        action: 'check',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(429)
      expect(data.error).toContain('Too many')
    })
  })

  describe('Check Action', () => {
    it('should return userExists: true for existing user', async () => {
      mockPrisma.users.findFirst.mockResolvedValue({
        id: 'user-123',
        phone: '+919876543210',
      })

      const { POST } = await import('@/app/api/auth/firebase-session/route')
      const request = createRequest({
        uid: 'firebase-uid-123',
        phoneNumber: '+919876543210',
        action: 'check',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.userExists).toBe(true)
      expect(data.userId).toBe('user-123')
    })

    it('should return userExists: false for new user', async () => {
      mockPrisma.users.findFirst.mockResolvedValue(null)

      const { POST } = await import('@/app/api/auth/firebase-session/route')
      const request = createRequest({
        uid: 'firebase-uid-123',
        phoneNumber: '+919876543210',
        action: 'check',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.userExists).toBe(false)
    })
  })

  describe('Signup Action', () => {
    it('should create new user with correct data', async () => {
      mockPrisma.users.findFirst.mockResolvedValue(null)
      mockPrisma.users.create.mockResolvedValue({
        id: 'new-user-123',
        coachingTier: 'FREE',
        trialStartDate: new Date(),
        trialEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })

      const { POST } = await import('@/app/api/auth/firebase-session/route')
      const request = createRequest({
        uid: 'firebase-uid-123',
        phoneNumber: '+919876543210',
        firstName: 'John',
        lastName: 'Doe',
        role: 'student',
        action: 'signup',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.userId).toBe('new-user-123')
      expect(mockPrisma.users.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          phone: '+919876543210',
          firebaseUid: 'firebase-uid-123',
          role: 'STUDENT',
          coachingTier: 'FREE',
        }),
      })
    })

    it('should reject signup without firstName', async () => {
      const { POST } = await import('@/app/api/auth/firebase-session/route')
      const request = createRequest({
        uid: 'firebase-uid-123',
        phoneNumber: '+919876543210',
        action: 'signup',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toContain('First name')
    })

    it('should handle existing user on signup', async () => {
      mockPrisma.users.findFirst.mockResolvedValue({
        id: 'existing-user-123',
        firebaseUid: null,
      })
      mockPrisma.users.update.mockResolvedValue({})

      const { POST } = await import('@/app/api/auth/firebase-session/route')
      const request = createRequest({
        uid: 'firebase-uid-123',
        phoneNumber: '+919876543210',
        firstName: 'John',
        action: 'signup',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.userId).toBe('existing-user-123')
      expect(data.message).toContain('already exists')
    })
  })

  describe('Login Action', () => {
    it('should create session for existing user', async () => {
      const mockUser = {
        id: 'user-123',
        email: 'test@example.com',
        name: 'John Doe',
        role: 'STUDENT',
        coachingTier: 'FREE',
        firebaseUid: 'firebase-uid-123',
        trialEndDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      }

      mockPrisma.users.findFirst.mockResolvedValue(mockUser)
      mockPrisma.users.update.mockResolvedValue(mockUser)

      const { POST } = await import('@/app/api/auth/firebase-session/route')
      const request = createRequest({
        uid: 'firebase-uid-123',
        phoneNumber: '+919876543210',
        action: 'login',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.user.id).toBe('user-123')
      expect(data.user.isTrialActive).toBe(true)

      // Cookie is set via response.cookies.set() which isn't directly accessible in test
      // We verify login success via response data - cookie setting tested in e2e tests
      expect(data.userId).toBe('user-123')
    })

    it('should return 404 for non-existent user', async () => {
      mockPrisma.users.findFirst.mockResolvedValue(null)

      const { POST } = await import('@/app/api/auth/firebase-session/route')
      const request = createRequest({
        uid: 'firebase-uid-123',
        phoneNumber: '+919876543210',
        action: 'login',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toContain('not found')
    })
  })

  describe('Phone Number Normalization', () => {
    it('should normalize phone without country code', async () => {
      mockPrisma.users.findFirst.mockResolvedValue(null)

      const { POST } = await import('@/app/api/auth/firebase-session/route')
      const request = createRequest({
        uid: 'firebase-uid-123',
        phoneNumber: '918826444334',
        action: 'check',
      })

      await POST(request)

      expect(mockPrisma.users.findFirst).toHaveBeenCalledWith({
        where: {
          OR: [
            { phone: '+918826444334' },
            { phone: '8826444334' },
            { firebaseUid: 'firebase-uid-123' },
          ],
        },
      })
    })
  })
})

// ============================================
// Firebase Webhook Tests
// ============================================
describe('Firebase Webhook (/api/webhooks/firebase)', () => {
  const WEBHOOK_SECRET = 'test-webhook-secret'

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.FIREBASE_WEBHOOK_SECRET = WEBHOOK_SECRET
  })

  afterEach(() => {
    delete process.env.FIREBASE_WEBHOOK_SECRET
  })

  const createSignature = (payload: string): string => {
    return crypto.createHmac('sha256', WEBHOOK_SECRET).update(payload).digest('hex')
  }

  const createWebhookRequest = (payload: object, signature?: string) => {
    const body = JSON.stringify(payload)
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (signature !== undefined) {
      headers['x-firebase-webhook-signature'] = signature
    }

    return new NextRequest('http://localhost:3000/api/webhooks/firebase', {
      method: 'POST',
      headers,
      body,
    })
  }

  describe('Signature Verification', () => {
    it('should reject requests without signature', async () => {
      const { POST } = await import('@/app/api/webhooks/firebase/route')
      const payload = { event: 'user.deleted', uid: 'firebase-uid-123' }
      const request = createWebhookRequest(payload)

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toContain('Invalid signature')
    })

    it('should reject requests with invalid signature', async () => {
      const { POST } = await import('@/app/api/webhooks/firebase/route')
      const payload = { event: 'user.deleted', uid: 'firebase-uid-123' }
      // Use a 64-char hex string (same length as valid HMAC-SHA256) to avoid timingSafeEqual length error
      const invalidSignature = '0'.repeat(64)
      const request = createWebhookRequest(payload, invalidSignature)

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toContain('Invalid signature')
    })

    it('should accept requests with valid signature', async () => {
      mockPrisma.users.findFirst.mockResolvedValue(null)

      const { POST } = await import('@/app/api/webhooks/firebase/route')
      const payload = { event: 'user.deleted', uid: 'firebase-uid-123' }
      const body = JSON.stringify(payload)
      const signature = createSignature(body)
      const request = createWebhookRequest(payload, signature)

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })
  })

  describe('User Deletion Event', () => {
    it('should unlink Firebase UID on user deletion', async () => {
      const mockUser = { id: 'user-123', email: 'test@example.com', phone: '+919876543210' }
      mockPrisma.users.findFirst.mockResolvedValue(mockUser)
      mockPrisma.users.update.mockResolvedValue({})

      const { POST } = await import('@/app/api/webhooks/firebase/route')
      const payload = { event: 'user.deleted', uid: 'firebase-uid-123' }
      const body = JSON.stringify(payload)
      const signature = createSignature(body)
      const request = createWebhookRequest(payload, signature)

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(mockPrisma.users.update).toHaveBeenCalledWith({
        where: { id: 'user-123' },
        data: expect.objectContaining({
          firebaseUid: null,
        }),
      })
    })
  })

  describe('Health Check', () => {
    it('should return status ok on GET', async () => {
      const { GET } = await import('@/app/api/webhooks/firebase/route')

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.status).toBe('ok')
      expect(data.supportedEvents).toContain('user.deleted')
    })
  })
})

// ============================================
// Firebase Verify Utility Tests
// ============================================
describe('Firebase Verify Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('extractFirebaseToken', () => {
    it('should extract token from Bearer header', async () => {
      const { extractFirebaseToken } = await import('@/lib/auth/firebase-verify')
      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: { Authorization: 'Bearer test-token-123' },
      })

      const token = extractFirebaseToken(request)

      expect(token).toBe('test-token-123')
    })

    it('should extract token from Firebase header', async () => {
      const { extractFirebaseToken } = await import('@/lib/auth/firebase-verify')
      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: { Authorization: 'Firebase test-token-456' },
      })

      const token = extractFirebaseToken(request)

      expect(token).toBe('test-token-456')
    })

    it('should extract token from custom header', async () => {
      const { extractFirebaseToken } = await import('@/lib/auth/firebase-verify')
      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: { 'X-Firebase-Token': 'custom-token-789' },
      })

      const token = extractFirebaseToken(request)

      expect(token).toBe('custom-token-789')
    })

    it('should return null when no token present', async () => {
      const { extractFirebaseToken } = await import('@/lib/auth/firebase-verify')
      const request = new NextRequest('http://localhost:3000/api/test')

      const token = extractFirebaseToken(request)

      expect(token).toBeNull()
    })
  })

  describe('requireFreshFirebaseAuth', () => {
    it('should return error for null token', async () => {
      const { requireFreshFirebaseAuth } = await import('@/lib/auth/firebase-verify')

      const result = await requireFreshFirebaseAuth(null)

      expect(result.valid).toBe(false)
      expect(result.error).toContain('required')
    })

    it('should validate token age', async () => {
      const now = Math.floor(Date.now() / 1000)
      mockVerifyIdToken.mockResolvedValue({
        uid: 'user-123',
        iat: now - 600, // 10 minutes ago
        phone_number: '+919876543210',
      })

      const { requireFreshFirebaseAuth } = await import('@/lib/auth/firebase-verify')

      const result = await requireFreshFirebaseAuth('valid-token', { maxAgeSeconds: 300 })

      expect(result.valid).toBe(false)
      expect(result.error).toContain('too old')
    })

    it('should accept fresh token', async () => {
      const now = Math.floor(Date.now() / 1000)
      mockVerifyIdToken.mockResolvedValue({
        uid: 'user-123',
        iat: now - 60, // 1 minute ago
        phone_number: '+919876543210',
        email: 'test@example.com',
      })

      const { requireFreshFirebaseAuth } = await import('@/lib/auth/firebase-verify')

      const result = await requireFreshFirebaseAuth('valid-token', { maxAgeSeconds: 300 })

      expect(result.valid).toBe(true)
      expect(result.uid).toBe('user-123')
      expect(result.phoneNumber).toBe('+919876543210')
    })

    it('should validate required claims', async () => {
      const now = Math.floor(Date.now() / 1000)
      mockVerifyIdToken.mockResolvedValue({
        uid: 'user-123',
        iat: now - 60,
        phone_number: '+919876543210',
      })

      const { requireFreshFirebaseAuth } = await import('@/lib/auth/firebase-verify')

      const result = await requireFreshFirebaseAuth('valid-token', {
        requiredClaims: { phone_number: '+911234567890' }, // Different phone
      })

      expect(result.valid).toBe(false)
      expect(result.error).toContain('mismatch')
    })

    it('should check recent sign-in when required', async () => {
      const now = Math.floor(Date.now() / 1000)
      mockVerifyIdToken.mockResolvedValue({
        uid: 'user-123',
        iat: now - 60,
        auth_time: now - 3600, // Signed in 1 hour ago
        phone_number: '+919876543210',
      })

      const { requireFreshFirebaseAuth } = await import('@/lib/auth/firebase-verify')

      const result = await requireFreshFirebaseAuth('valid-token', {
        maxAgeSeconds: 300,
        requireRecentSignIn: true,
      })

      expect(result.valid).toBe(false)
      expect(result.error).toContain('Recent sign-in required')
    })

    it('should handle expired token error', async () => {
      mockVerifyIdToken.mockRejectedValue(new Error('Token expired'))

      const { requireFreshFirebaseAuth } = await import('@/lib/auth/firebase-verify')

      const result = await requireFreshFirebaseAuth('expired-token')

      expect(result.valid).toBe(false)
      expect(result.error).toContain('expired')
    })

    it('should handle revoked token error', async () => {
      mockVerifyIdToken.mockRejectedValue(new Error('Token has been revoked'))

      const { requireFreshFirebaseAuth } = await import('@/lib/auth/firebase-verify')

      const result = await requireFreshFirebaseAuth('revoked-token')

      expect(result.valid).toBe(false)
      expect(result.error).toContain('revoked')
    })
  })

  describe('withFreshFirebaseAuth middleware', () => {
    it('should pass request to handler when auth valid', async () => {
      const now = Math.floor(Date.now() / 1000)
      mockVerifyIdToken.mockResolvedValue({
        uid: 'user-123',
        iat: now - 60,
        phone_number: '+919876543210',
      })

      const { withFreshFirebaseAuth } = await import('@/lib/auth/firebase-verify')

      const mockHandler = jest.fn().mockResolvedValue(new Response('OK'))
      const wrappedHandler = withFreshFirebaseAuth(mockHandler)

      const request = new NextRequest('http://localhost:3000/api/test', {
        headers: { Authorization: 'Bearer valid-token' },
      })

      await wrappedHandler(request)

      expect(mockHandler).toHaveBeenCalledWith(
        request,
        expect.objectContaining({
          uid: 'user-123',
          phoneNumber: '+919876543210',
        })
      )
    })

    it('should return 401 when auth invalid', async () => {
      const { withFreshFirebaseAuth } = await import('@/lib/auth/firebase-verify')

      const mockHandler = jest.fn()
      const wrappedHandler = withFreshFirebaseAuth(mockHandler)

      const request = new NextRequest('http://localhost:3000/api/test')

      const response = await wrappedHandler(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.code).toBe('FIREBASE_AUTH_REQUIRED')
      expect(mockHandler).not.toHaveBeenCalled()
    })
  })
})
