/**
 * @jest-environment node
 */

import {
  rateLimitStore,
  checkRateLimit,
  isXSSAttempt,
  isSQLInjectionAttempt,
  sanitizeInput,
  validateCSRFToken,
  extractClientIP,
  isValidUserAgent,
} from '../__mocks__/security.mock'

describe('Security Library', () => {
  beforeEach(() => {
    // Clear rate limit store before each test
    rateLimitStore.clear()
  })

  describe('Rate Limiting', () => {
    it('should allow requests within limit', () => {
      const ip = '192.168.1.1'

      // Should allow first 5 requests
      for (let i = 0; i < 5; i++) {
        expect(checkRateLimit(ip)).toBe(true)
      }
    })

    it('should block requests after limit exceeded', () => {
      const ip = '192.168.1.2'

      // Use up the limit
      for (let i = 0; i < 5; i++) {
        checkRateLimit(ip)
      }

      // Next request should be blocked
      expect(checkRateLimit(ip)).toBe(false)
    })

    it('should use separate counters for different IPs', () => {
      const ip1 = '192.168.1.3'
      const ip2 = '192.168.1.4'

      // Use up limit for ip1
      for (let i = 0; i < 5; i++) {
        checkRateLimit(ip1)
      }

      expect(checkRateLimit(ip1)).toBe(false)
      expect(checkRateLimit(ip2)).toBe(true) // ip2 should still work
    })

    it('should reset counter after time window', () => {
      const ip = '192.168.1.5'

      // Use up the limit
      for (let i = 0; i < 5; i++) {
        checkRateLimit(ip)
      }
      expect(checkRateLimit(ip)).toBe(false)

      // Mock time passage (15 minutes)
      const originalNow = Date.now
      Date.now = jest.fn().mockReturnValue(originalNow() + 16 * 60 * 1000)

      // Should allow requests again
      expect(checkRateLimit(ip)).toBe(true)

      // Restore Date.now
      Date.now = originalNow
    })
  })

  describe('XSS Detection', () => {
    it('should detect common XSS patterns', () => {
      const xssAttempts = [
        '<script>alert("xss")</script>',
        'javascript:alert("xss")',
        '<img src=x onerror=alert("xss")>',
        '<iframe src="javascript:alert(\'xss\')"></iframe>',
        'onload="alert(1)"',
        '<svg onload=alert(1)>',
        '<body onpageshow=alert(1)>',
      ]

      xssAttempts.forEach((attempt) => {
        expect(isXSSAttempt(attempt)).toBe(true)
      })
    })

    it('should allow safe content', () => {
      const safeInputs = [
        'Hello World',
        'My email is user@example.com',
        'Price is $10 < $20',
        'Check out this link: https://example.com',
        'Use 2 > 1 for comparison',
      ]

      safeInputs.forEach((input) => {
        expect(isXSSAttempt(input)).toBe(false)
      })
    })
  })

  describe('SQL Injection Detection', () => {
    it('should detect SQL injection patterns', () => {
      const sqlAttempts = [
        "'; DROP TABLE users; --",
        "1' OR '1'='1",
        "admin'/*",
        "' UNION SELECT * FROM users --",
        '1; DELETE FROM products WHERE 1=1',
        "' OR 1=1#",
        "1' HAVING 1=1 --",
      ]

      sqlAttempts.forEach((attempt) => {
        expect(isSQLInjectionAttempt(attempt)).toBe(true)
      })
    })

    it('should allow safe database queries', () => {
      const safeInputs = [
        'John Doe',
        'user@example.com',
        'My favorite color is blue',
        '2024-12-31',
        '₹10,000',
        'CLASS_12',
      ]

      safeInputs.forEach((input) => {
        expect(isSQLInjectionAttempt(input)).toBe(false)
      })
    })
  })

  describe('Input Sanitization', () => {
    it('should sanitize HTML entities', () => {
      expect(sanitizeInput('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
      )

      expect(sanitizeInput('Price: $100 & tax')).toBe('Price: $100 &amp; tax')

      expect(sanitizeInput('Quote: "Hello World"')).toBe('Quote: &quot;Hello World&quot;')
    })

    it('should handle empty and null inputs', () => {
      expect(sanitizeInput('')).toBe('')
      expect(sanitizeInput(null as any)).toBe('')
      expect(sanitizeInput(undefined as any)).toBe('')
    })

    it('should preserve safe content', () => {
      const safeText = 'This is a normal sentence with numbers 123.'
      expect(sanitizeInput(safeText)).toBe(safeText)
    })
  })

  describe('CSRF Token Validation', () => {
    it('should generate and validate tokens', () => {
      const sessionId = 'test-session-123'
      const token = validateCSRFToken('', sessionId) // Generate new token

      expect(token).toBeTruthy()
      expect(typeof token).toBe('string')
      expect((token as string).length).toBeGreaterThan(10)

      // Validate the same token
      const isValid = validateCSRFToken(token as string, sessionId)
      expect(isValid).toBe(true)
    })

    it('should reject invalid tokens', () => {
      const sessionId = 'test-session-456'
      const validToken = validateCSRFToken('', sessionId) // Generate

      expect(validateCSRFToken('invalid-token', sessionId)).toBe(false)
      expect(validateCSRFToken(validToken as string, 'different-session')).toBe(false)
      expect(validateCSRFToken('', sessionId)).toBeTruthy() // Generate new
    })
  })

  describe('IP Extraction', () => {
    it('should extract IP from various headers', () => {
      const mockRequest = {
        headers: {
          get: jest.fn(),
        },
      } as any

      // Test X-Forwarded-For
      mockRequest.headers.get.mockImplementation((header: string) => {
        if (header === 'x-forwarded-for') return '192.168.1.1, 10.0.0.1'
        return null
      })
      expect(extractClientIP(mockRequest)).toBe('192.168.1.1')

      // Test X-Real-IP
      mockRequest.headers.get.mockImplementation((header: string) => {
        if (header === 'x-real-ip') return '192.168.1.2'
        return null
      })
      expect(extractClientIP(mockRequest)).toBe('192.168.1.2')

      // Test CF-Connecting-IP
      mockRequest.headers.get.mockImplementation((header: string) => {
        if (header === 'cf-connecting-ip') return '192.168.1.3'
        return null
      })
      expect(extractClientIP(mockRequest)).toBe('192.168.1.3')
    })

    it('should return default IP when no headers present', () => {
      const mockRequest = {
        headers: {
          get: jest.fn().mockReturnValue(null),
        },
      } as any

      expect(extractClientIP(mockRequest)).toBe('127.0.0.1')
    })
  })

  describe('User Agent Validation', () => {
    it('should validate legitimate user agents', () => {
      const validAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X)',
        'Mozilla/5.0 (Android 11; Mobile; rv:91.0) Gecko/91.0 Firefox/91.0',
      ]

      validAgents.forEach((agent) => {
        expect(isValidUserAgent(agent)).toBe(true)
      })
    })

    it('should reject suspicious user agents', () => {
      const suspiciousAgents = [
        '', // Empty
        'curl/7.68.0', // Command line tool
        'wget/1.20.3', // Command line tool
        'python-requests/2.25.1', // Automated script
        'bot', // Simple bot
        'a', // Too short
      ]

      suspiciousAgents.forEach((agent) => {
        expect(isValidUserAgent(agent)).toBe(false)
      })
    })
  })

  describe('Integration Tests', () => {
    it('should handle multiple security checks together', () => {
      const maliciousInput = '<script>alert("xss")</script> OR 1=1--'

      expect(isXSSAttempt(maliciousInput)).toBe(true)
      expect(isSQLInjectionAttempt(maliciousInput)).toBe(true)

      const sanitized = sanitizeInput(maliciousInput)
      expect(sanitized).not.toContain('<script>')
      expect(sanitized).not.toContain('OR 1=1')
    })

    it('should work with rate limiting and validation together', () => {
      const ip = '192.168.1.100'
      const maliciousInput = '<script>alert("hack")</script>'

      // First few requests should work
      expect(checkRateLimit(ip)).toBe(true)
      expect(isXSSAttempt(maliciousInput)).toBe(true) // Detected as XSS

      // After rate limit exceeded
      for (let i = 0; i < 5; i++) {
        checkRateLimit(ip)
      }
      expect(checkRateLimit(ip)).toBe(false) // Rate limited
    })
  })
})
