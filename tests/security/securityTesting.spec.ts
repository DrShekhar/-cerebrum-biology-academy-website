/**
 * Security Testing Suite for Cerebrum Biology Academy
 * Comprehensive security testing for authentication, data protection, and API security
 */

import { test, expect } from '@playwright/test'
import { SecurityScanner } from '../utils/securityScanner'
import { PaymentSecurityTester } from '../utils/paymentSecurityTester'
import { AuthenticationTester } from '../utils/authenticationTester'

const SECURITY_VECTORS = JSON.parse(process.env.SECURITY_VECTORS || '{}')

test.describe('Security Testing Suite', () => {
  let securityScanner: SecurityScanner
  let paymentTester: PaymentSecurityTester
  let authTester: AuthenticationTester

  test.beforeEach(async () => {
    securityScanner = new SecurityScanner()
    paymentTester = new PaymentSecurityTester()
    authTester = new AuthenticationTester()
  })

  test.describe('Input Validation & XSS Protection', () => {
    test('Should prevent XSS attacks in enrollment forms', async ({ page }) => {
      await page.goto('/enrollment')

      const xssVectors = [
        '<script>alert("XSS")</script>',
        '"><svg onload=alert(1)>',
        'javascript:alert("XSS")',
        '<img src=x onerror=alert("XSS")>',
        '\"><script>document.cookie</script>',
        '<iframe src="javascript:alert(\'XSS\')"></iframe>'
      ]

      for (const vector of xssVectors) {
        // Test student name field
        await page.fill('[data-testid="student-name"]', vector)
        await page.fill('[data-testid="email"]', 'test@test.com')
        await page.fill('[data-testid="phone"]', '9876543210')

        await page.click('[data-testid="submit-enrollment"]')

        // Check that XSS vector is not executed
        const alertHandled = await page.evaluate(() => {
          return new Promise((resolve) => {
            let alertFired = false
            const originalAlert = window.alert
            window.alert = () => {
              alertFired = true
              return undefined
            }

            setTimeout(() => {
              window.alert = originalAlert
              resolve(alertFired)
            }, 1000)
          })
        })

        expect(alertHandled).toBe(false)

        // Check that input is properly sanitized
        const nameValue = await page.inputValue('[data-testid="student-name"]')
        expect(nameValue).not.toContain('<script>')
        expect(nameValue).not.toContain('javascript:')
        expect(nameValue).not.toContain('onload=')
      }
    })

    test('Should sanitize demo booking form inputs', async ({ page }) => {
      await page.goto('/')
      await page.click('[data-testid="book-demo-button"]')

      const maliciousInputs = [
        '<script>fetch("/api/admin/users")</script>',
        '"><img src=x onerror=fetch("/api/sensitive")>',
        'test@test.com<script>location.href="http://evil.com"</script>'
      ]

      for (const input of maliciousInputs) {
        await page.fill('[data-testid="demo-name"]', input)
        await page.fill('[data-testid="demo-email"]', 'test@test.com')
        await page.fill('[data-testid="demo-phone"]', '9876543210')

        // Monitor network requests for malicious activity
        const maliciousRequest = await page.waitForRequest(
          request => request.url().includes('evil.com'),
          { timeout: 2000 }
        ).catch(() => null)

        expect(maliciousRequest).toBeNull()
      }
    })

    test('Should prevent SQL injection in search functionality', async ({ page }) => {
      await page.goto('/courses')

      const sqlInjectionVectors = [
        "'; DROP TABLE courses; --",
        "1' OR '1'='1",
        "admin'--",
        "' UNION SELECT * FROM users --",
        "'; DELETE FROM enrollments WHERE '1'='1",
        "' OR 1=1 LIMIT 1 OFFSET 1 --"
      ]

      for (const vector of sqlInjectionVectors) {
        // Test course search
        await page.fill('[data-testid="course-search"]', vector)
        await page.keyboard.press('Enter')

        // Wait for search response
        await page.waitForResponse(response =>
          response.url().includes('/api/courses/search'), { timeout: 5000 }
        ).catch(() => null)

        // Check that no database error is exposed
        const errorMessage = await page.locator('[data-testid="error-message"]').textContent()
        expect(errorMessage).not.toContain('SQL')
        expect(errorMessage).not.toContain('database')
        expect(errorMessage).not.toContain('query')

        // Check that normal search still works
        await page.fill('[data-testid="course-search"]', 'biology')
        const response = await page.waitForResponse(response =>
          response.url().includes('/api/courses/search')
        )
        expect(response.status()).toBe(200)
      }
    })
  })

  test.describe('Authentication Security', () => {
    test('Should enforce strong password requirements', async ({ page }) => {
      await page.goto('/auth/register')

      const weakPasswords = [
        '123456',
        'password',
        'qwerty',
        '12345678',
        'admin',
        'test',
        'password123'
      ]

      for (const password of weakPasswords) {
        await page.fill('[data-testid="email"]', 'test@test.com')
        await page.fill('[data-testid="password"]', password)
        await page.fill('[data-testid="confirm-password"]', password)

        await page.click('[data-testid="register-button"]')

        // Should show password strength error
        const errorMessage = await page.locator('[data-testid="password-error"]').textContent()
        expect(errorMessage).toMatch(/password.*strong|weak.*password/i)
      }

      // Test strong password acceptance
      const strongPassword = 'MyStr0ng!P@ssw0rd#2024'
      await page.fill('[data-testid="password"]', strongPassword)
      await page.fill('[data-testid="confirm-password"]', strongPassword)

      const strongPasswordError = await page.locator('[data-testid="password-error"]').textContent()
      expect(strongPasswordError).toBeNull()
    })

    test('Should prevent brute force attacks on login', async ({ page }) => {
      await page.goto('/auth/login')

      const maxAttempts = 5
      const testEmail = 'test@cerebrumbiologyacademy.com'

      // Attempt multiple failed logins
      for (let i = 0; i < maxAttempts + 2; i++) {
        await page.fill('[data-testid="email"]', testEmail)
        await page.fill('[data-testid="password"]', `wrongpassword${i}`)
        await page.click('[data-testid="login-button"]')

        await page.waitForResponse(response =>
          response.url().includes('/api/auth/login')
        )

        if (i >= maxAttempts) {
          // Should be rate limited
          const errorMessage = await page.locator('[data-testid="error-message"]').textContent()
          expect(errorMessage).toMatch(/too many attempts|rate limit|locked/i)
        }
      }
    })

    test('Should validate JWT tokens properly', async ({ page }) => {
      // Test with malformed JWT
      await page.addInitScript(() => {
        localStorage.setItem('auth-token', 'invalid.jwt.token')
      })

      await page.goto('/dashboard')

      // Should redirect to login
      expect(page.url()).toContain('/auth/login')

      // Test with expired JWT
      const expiredJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.invalid'

      await page.addInitScript((token) => {
        localStorage.setItem('auth-token', token)
      }, expiredJWT)

      await page.goto('/dashboard')

      // Should redirect to login
      expect(page.url()).toContain('/auth/login')
    })

    test('Should implement proper session management', async ({ page }) => {
      // Test session timeout
      await authTester.loginAsStudent(page, 'test@test.com', 'password')

      // Simulate session expiry
      await page.evaluate(() => {
        // Modify token to simulate expiry
        const token = localStorage.getItem('auth-token')
        if (token) {
          const parts = token.split('.')
          const payload = JSON.parse(atob(parts[1]))
          payload.exp = Math.floor(Date.now() / 1000) - 3600 // 1 hour ago
          parts[1] = btoa(JSON.stringify(payload))
          localStorage.setItem('auth-token', parts.join('.'))
        }
      })

      // Try to access protected resource
      await page.goto('/dashboard/profile')

      // Should redirect to login
      expect(page.url()).toContain('/auth/login')
    })
  })

  test.describe('Payment Security', () => {
    test('Should secure payment form against tampering', async ({ page }) => {
      await page.goto('/enrollment/payment')

      // Fill enrollment form
      await page.fill('[data-testid="student-name"]', 'Test Student')
      await page.fill('[data-testid="email"]', 'test@test.com')
      await page.fill('[data-testid="phone"]', '9876543210')

      // Try to manipulate payment amount via client-side
      await page.evaluate(() => {
        // Try to modify hidden form fields
        const priceElements = document.querySelectorAll('[data-price]')
        priceElements.forEach(el => {
          el.setAttribute('data-price', '1') // Try to set price to ₹1
        })

        // Try to modify JavaScript variables
        if (window.enrollmentData) {
          window.enrollmentData.amount = 1
          window.enrollmentData.price = 1
        }
      })

      await page.click('[data-testid="initiate-payment"]')

      // Verify server validates actual price
      const paymentResponse = await page.waitForResponse(response =>
        response.url().includes('/api/payment/create-order')
      )

      const responseData = await paymentResponse.json()
      expect(responseData.amount).toBeGreaterThan(10000) // Actual course price
      expect(responseData.amount).not.toBe(1) // Not tampered price
    })

    test('Should validate Razorpay webhooks', async ({ page }) => {
      const webhookEndpoint = '/api/payment/webhook'

      // Test webhook with invalid signature
      const invalidWebhook = {
        entity: 'event',
        account_id: 'acc_test123',
        event: 'payment.captured',
        contains: ['payment'],
        payload: {
          payment: {
            entity: {
              id: 'pay_test123',
              amount: 42000,
              status: 'captured'
            }
          }
        }
      }

      const response = await page.request.post(webhookEndpoint, {
        data: invalidWebhook,
        headers: {
          'X-Razorpay-Signature': 'invalid_signature'
        }
      })

      expect(response.status()).toBe(400) // Should reject invalid signature
    })

    test('Should prevent payment replay attacks', async ({ page }) => {
      // Simulate duplicate payment verification request
      const paymentId = 'pay_test_' + Date.now()

      const verificationData = {
        razorpay_payment_id: paymentId,
        razorpay_order_id: 'order_test123',
        razorpay_signature: 'test_signature'
      }

      // First verification attempt
      const firstResponse = await page.request.post('/api/payment/verify', {
        data: verificationData
      })

      // Second verification attempt with same data
      const secondResponse = await page.request.post('/api/payment/verify', {
        data: verificationData
      })

      // Should reject duplicate verification
      expect(secondResponse.status()).toBe(400)
      const errorData = await secondResponse.json()
      expect(errorData.error).toMatch(/duplicate|already.*processed/i)
    })
  })

  test.describe('API Security', () => {
    test('Should implement proper CORS policies', async ({ page }) => {
      const testOrigin = 'https://malicious-site.com'

      // Test CORS with unauthorized origin
      const response = await page.request.get('/api/courses', {
        headers: {
          'Origin': testOrigin
        }
      })

      const corsHeader = response.headers()['access-control-allow-origin']
      expect(corsHeader).not.toBe('*')
      expect(corsHeader).not.toBe(testOrigin)
    })

    test('Should validate API rate limiting', async ({ page }) => {
      const apiEndpoint = '/api/courses/search'
      const maxRequests = 100 // Assuming 100 requests per minute limit

      const requests = []
      const startTime = Date.now()

      // Send requests rapidly
      for (let i = 0; i < maxRequests + 10; i++) {
        requests.push(
          page.request.get(`${apiEndpoint}?q=biology${i}`)
        )
      }

      const responses = await Promise.all(requests)
      const rateLimitedResponses = responses.filter(response =>
        response.status() === 429 // Too Many Requests
      )

      expect(rateLimitedResponses.length).toBeGreaterThan(0)
    })

    test('Should protect admin endpoints', async ({ page }) => {
      const adminEndpoints = [
        '/api/admin/users',
        '/api/admin/courses',
        '/api/admin/enrollments',
        '/api/admin/analytics',
        '/api/admin/settings'
      ]

      for (const endpoint of adminEndpoints) {
        // Test without authentication
        const unauthResponse = await page.request.get(endpoint)
        expect(unauthResponse.status()).toBe(401)

        // Test with regular user token
        const userResponse = await page.request.get(endpoint, {
          headers: {
            'Authorization': 'Bearer user_token_123'
          }
        })
        expect(userResponse.status()).toBe(403) // Forbidden
      }
    })

    test('Should sanitize API responses', async ({ page }) => {
      const response = await page.request.get('/api/courses')
      const data = await response.json()

      // Check that sensitive data is not exposed
      const coursesArray = Array.isArray(data) ? data : data.courses
      if (coursesArray && coursesArray.length > 0) {
        const firstCourse = coursesArray[0]

        // Should not expose sensitive internal data
        expect(firstCourse).not.toHaveProperty('internal_id')
        expect(firstCourse).not.toHaveProperty('created_by_user_id')
        expect(firstCourse).not.toHaveProperty('database_password')
        expect(firstCourse).not.toHaveProperty('api_key')
      }
    })
  })

  test.describe('Data Protection & Privacy', () => {
    test('Should protect PII in database queries', async ({ page }) => {
      // Test user search functionality
      await page.goto('/admin/users') // Assuming admin access

      const searchResponse = await page.request.get('/api/admin/users?search=test')
      const userData = await searchResponse.json()

      if (userData && userData.users) {
        userData.users.forEach((user: any) => {
          // PII should be masked or not included in search results
          if (user.phone) {
            expect(user.phone).toMatch(/\*+/) // Should be masked
          }
          if (user.email) {
            expect(user.email).toMatch(/\*+.*@.*/) // Email should be partially masked
          }
        })
      }
    })

    test('Should implement proper data encryption', async ({ page }) => {
      // Test that sensitive data is encrypted in transit
      await page.goto('/enrollment')

      // Check for HTTPS enforcement
      expect(page.url()).toContain('https://')

      // Monitor network traffic for unencrypted sensitive data
      let sensitiveDataExposed = false

      page.on('response', async response => {
        const contentType = response.headers()['content-type']
        if (contentType && contentType.includes('application/json')) {
          try {
            const data = await response.json()
            const dataString = JSON.stringify(data)

            // Check for exposed sensitive patterns
            const sensitivePatterns = [
              /password.*[^*]/i,
              /credit.*card/i,
              /ssn.*\d{3}-\d{2}-\d{4}/,
              /api.*key.*[a-zA-Z0-9]{20,}/
            ]

            if (sensitivePatterns.some(pattern => pattern.test(dataString))) {
              sensitiveDataExposed = true
            }
          } catch {
            // Ignore non-JSON responses
          }
        }
      })

      // Trigger enrollment flow
      await page.fill('[data-testid="student-name"]', 'Test Student')
      await page.fill('[data-testid="email"]', 'test@test.com')
      await page.fill('[data-testid="phone"]', '9876543210')
      await page.click('[data-testid="submit-enrollment"]')

      await page.waitForTimeout(3000) // Wait for all requests

      expect(sensitiveDataExposed).toBe(false)
    })

    test('Should implement GDPR compliance features', async ({ page }) => {
      await page.goto('/privacy')

      // Check for required GDPR elements
      const cookieConsent = await page.locator('[data-testid="cookie-consent"]').isVisible()
      expect(cookieConsent).toBe(true)

      const privacyPolicy = await page.locator('text=Privacy Policy').isVisible()
      expect(privacyPolicy).toBe(true)

      // Test data deletion request
      await page.goto('/account/privacy')
      const deleteAccountButton = await page.locator('[data-testid="delete-account"]').isVisible()
      expect(deleteAccountButton).toBe(true)

      // Test data export functionality
      const exportDataButton = await page.locator('[data-testid="export-data"]').isVisible()
      expect(exportDataButton).toBe(true)
    })
  })

  test.describe('File Upload Security', () => {
    test('Should validate file upload types and sizes', async ({ page }) => {
      await page.goto('/profile/upload-photo')

      // Test malicious file upload
      const maliciousFiles = [
        { name: 'malware.exe', type: 'application/x-msdownload' },
        { name: 'script.php', type: 'application/x-php' },
        { name: 'shell.sh', type: 'application/x-sh' },
        { name: 'large-file.jpg', size: 50 * 1024 * 1024 } // 50MB
      ]

      for (const file of maliciousFiles) {
        // Create test file
        const fileContent = 'test content'
        const testFile = new File([fileContent], file.name, { type: file.type })

        // Try to upload malicious file
        await page.setInputFiles('[data-testid="file-upload"]', {
          name: file.name,
          mimeType: file.type,
          buffer: Buffer.from(fileContent)
        })

        await page.click('[data-testid="upload-button"]')

        // Should show error for disallowed file types
        const errorMessage = await page.locator('[data-testid="upload-error"]').textContent()
        expect(errorMessage).toMatch(/not allowed|invalid.*type|too large/i)
      }
    })

    test('Should scan uploaded files for malware', async ({ page }) => {
      await page.goto('/profile/upload-document')

      // Simulate file with malware signature
      const suspiciousContent = 'X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*'

      await page.setInputFiles('[data-testid="document-upload"]', {
        name: 'test.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from(suspiciousContent)
      })

      await page.click('[data-testid="upload-document-button"]')

      // Should detect and reject malicious content
      const scanResult = await page.locator('[data-testid="scan-result"]').textContent()
      expect(scanResult).toMatch(/virus.*detected|malware.*found|file.*rejected/i)
    })
  })

  test.describe('Content Security Policy', () => {
    test('Should implement proper CSP headers', async ({ page }) => {
      const response = await page.request.get('/')

      const cspHeader = response.headers()['content-security-policy']
      expect(cspHeader).toBeDefined()

      // Check for strict CSP directives
      expect(cspHeader).toContain("default-src 'self'")
      expect(cspHeader).toContain("script-src 'self'")
      expect(cspHeader).not.toContain("'unsafe-eval'")
      expect(cspHeader).not.toContain("'unsafe-inline'")
    })

    test('Should prevent clickjacking attacks', async ({ page }) => {
      const response = await page.request.get('/')

      const frameOptions = response.headers()['x-frame-options']
      const cspHeader = response.headers()['content-security-policy']

      // Should have either X-Frame-Options or CSP frame-ancestors
      const hasFrameProtection = frameOptions === 'DENY' ||
                                frameOptions === 'SAMEORIGIN' ||
                                (cspHeader && cspHeader.includes("frame-ancestors 'self'"))

      expect(hasFrameProtection).toBe(true)
    })
  })

  test.describe('Security Headers', () => {
    test('Should implement all required security headers', async ({ page }) => {
      const response = await page.request.get('/')
      const headers = response.headers()

      // Check for essential security headers
      expect(headers['strict-transport-security']).toBeDefined()
      expect(headers['x-content-type-options']).toBe('nosniff')
      expect(headers['x-xss-protection']).toBeDefined()
      expect(headers['referrer-policy']).toBeDefined()
      expect(headers['permissions-policy']).toBeDefined()

      // Check HSTS header value
      const hstsHeader = headers['strict-transport-security']
      expect(hstsHeader).toContain('max-age=')
      expect(hstsHeader).toContain('includeSubDomains')
    })
  })

  test.afterEach(async () => {
    // Generate security report
    const securityReport = await securityScanner.generateReport()
    console.log('Security Test Results:', securityReport.summary)

    // Log any security violations
    if (securityReport.violations.length > 0) {
      console.warn('Security Violations Found:', securityReport.violations)
    }
  })
})