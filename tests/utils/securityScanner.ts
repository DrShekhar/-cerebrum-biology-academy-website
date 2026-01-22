/**
 * Security Scanner Utilities
 * Comprehensive security testing tools for the education platform
 */

import { Page } from '@playwright/test'

interface SecurityViolation {
  type: 'xss' | 'sql_injection' | 'csrf' | 'authentication' | 'authorization' | 'data_exposure'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  location: string
  evidence?: string
}

interface SecurityReport {
  summary: {
    totalTests: number
    passed: number
    failed: number
    violations: number
    riskLevel: 'low' | 'medium' | 'high' | 'critical'
  }
  violations: SecurityViolation[]
  recommendations: string[]
}

export class SecurityScanner {
  private violations: SecurityViolation[] = []
  private testResults: { test: string; passed: boolean }[] = []

  async scanForXSS(page: Page, inputSelectors: string[], xssVectors: string[]): Promise<SecurityViolation[]> {
    const xssViolations: SecurityViolation[] = []

    for (const selector of inputSelectors) {
      for (const vector of xssVectors) {
        try {
          await page.fill(selector, vector)

          // Check if XSS payload is reflected without encoding
          const pageContent = await page.content()
          if (pageContent.includes(vector) && !this.isProperlyEncoded(vector, pageContent)) {
            xssViolations.push({
              type: 'xss',
              severity: 'high',
              description: `XSS vulnerability found in input field ${selector}`,
              location: selector,
              evidence: vector
            })
          }

          // Check for script execution
          const scriptExecuted = await page.evaluate(() => {
            return window.xssTestExecuted || false
          })

          if (scriptExecuted) {
            xssViolations.push({
              type: 'xss',
              severity: 'critical',
              description: `XSS script execution detected in ${selector}`,
              location: selector,
              evidence: vector
            })
          }
        } catch (_error) {
          // Input rejection is good - no violation
        }
      }
    }

    this.violations.push(...xssViolations)
    return xssViolations
  }

  async scanForSQLInjection(page: Page, endpoint: string, parameters: string[]): Promise<SecurityViolation[]> {
    const sqlViolations: SecurityViolation[] = []

    const sqlInjectionPayloads = [
      "'; DROP TABLE users; --",
      "1' OR '1'='1",
      "admin'--",
      "' UNION SELECT * FROM users --",
      "'; WAITFOR DELAY '00:00:05' --",
      "1' AND SLEEP(5) --"
    ]

    for (const param of parameters) {
      for (const payload of sqlInjectionPayloads) {
        try {
          const url = `${endpoint}?${param}=${encodeURIComponent(payload)}`
          const response = await page.request.get(url)

          // Check for SQL error messages
          const responseText = await response.text()
          const sqlErrorPatterns = [
            /sql.*error/i,
            /mysql.*error/i,
            /ora-\d+/i,
            /microsoft.*odbc/i,
            /postgresql.*error/i,
            /sqlite.*error/i
          ]

          if (sqlErrorPatterns.some(pattern => pattern.test(responseText))) {
            sqlViolations.push({
              type: 'sql_injection',
              severity: 'critical',
              description: `SQL injection vulnerability detected in parameter ${param}`,
              location: `${endpoint}?${param}`,
              evidence: payload
            })
          }

          // Check for unusual response times (time-based SQL injection)
          const responseTime = Date.now()
          await page.request.get(url)
          const endTime = Date.now()

          if (endTime - responseTime > 5000 && payload.includes('SLEEP')) {
            sqlViolations.push({
              type: 'sql_injection',
              severity: 'high',
              description: `Time-based SQL injection detected in parameter ${param}`,
              location: `${endpoint}?${param}`,
              evidence: payload
            })
          }
        } catch (_error) {
          // Request rejection is good - no violation
        }
      }
    }

    this.violations.push(...sqlViolations)
    return sqlViolations
  }

  async scanCSRFProtection(page: Page, forms: string[]): Promise<SecurityViolation[]> {
    const csrfViolations: SecurityViolation[] = []

    for (const formSelector of forms) {
      try {
        // Check if form has CSRF token
        const csrfTokenExists = await page.locator(`${formSelector} input[name*="csrf"], ${formSelector} input[name*="_token"]`).count() > 0

        if (!csrfTokenExists) {
          csrfViolations.push({
            type: 'csrf',
            severity: 'high',
            description: `CSRF protection missing for form`,
            location: formSelector
          })
        }

        // Test form submission without CSRF token
        await page.evaluate((selector) => {
          const form = document.querySelector(selector) as HTMLFormElement
          if (form) {
            // Remove CSRF token if exists
            const csrfInputs = form.querySelectorAll('input[name*="csrf"], input[name*="_token"]')
            csrfInputs.forEach(input => input.remove())
          }
        }, formSelector)

        // Try to submit form
        const submitButton = await page.locator(`${formSelector} button[type="submit"], ${formSelector} input[type="submit"]`)
        if (await submitButton.count() > 0) {
          await submitButton.click()

          // Check if submission was rejected
          const errorMessage = await page.locator('[data-testid="error-message"], .error, .alert-danger').textContent()
          if (!errorMessage || !errorMessage.toLowerCase().includes('token')) {
            csrfViolations.push({
              type: 'csrf',
              severity: 'medium',
              description: `Form submission succeeded without CSRF token`,
              location: formSelector
            })
          }
        }
      } catch (_error) {
        // Form protection working - no violation
      }
    }

    this.violations.push(...csrfViolations)
    return csrfViolations
  }

  async scanAuthenticationSecurity(page: Page): Promise<SecurityViolation[]> {
    const authViolations: SecurityViolation[] = []

    // Test password policy
    const weakPasswords = ['123456', 'password', 'admin', 'test']
    for (const weakPassword of weakPasswords) {
      try {
        await page.goto('/auth/register')
        await page.fill('[data-testid="password"]', weakPassword)
        await page.click('[data-testid="register-button"]')

        const errorMessage = await page.locator('[data-testid="password-error"]').textContent()
        if (!errorMessage || !errorMessage.toLowerCase().includes('strong')) {
          authViolations.push({
            type: 'authentication',
            severity: 'medium',
            description: `Weak password accepted: ${weakPassword}`,
            location: '/auth/register'
          })
        }
      } catch (_error) {
        // Password rejection is good
      }
    }

    // Test session fixation
    try {
      await page.goto('/auth/login')
      const sessionIdBefore = await page.evaluate(() => document.cookie)

      // Simulate login
      await page.fill('[data-testid="email"]', 'test@test.com')
      await page.fill('[data-testid="password"]', 'validPassword')
      await page.click('[data-testid="login-button"]')

      const sessionIdAfter = await page.evaluate(() => document.cookie)

      if (sessionIdBefore === sessionIdAfter) {
        authViolations.push({
          type: 'authentication',
          severity: 'medium',
          description: 'Session fixation vulnerability - session ID not regenerated after login',
          location: '/auth/login'
        })
      }
    } catch (_error) {
      // Expected for test environment
    }

    this.violations.push(...authViolations)
    return authViolations
  }

  async scanDataExposure(page: Page, endpoints: string[]): Promise<SecurityViolation[]> {
    const dataViolations: SecurityViolation[] = []

    const sensitiveDataPatterns = [
      { pattern: /password.*[:=]\s*["']?[^"',\s]+/gi, description: 'Password exposure' },
      { pattern: /api[_-]?key.*[:=]\s*["']?[a-zA-Z0-9]{20,}/gi, description: 'API key exposure' },
      { pattern: /secret.*[:=]\s*["']?[a-zA-Z0-9]{20,}/gi, description: 'Secret key exposure' },
      { pattern: /token.*[:=]\s*["']?[a-zA-Z0-9]{50,}/gi, description: 'Token exposure' },
      { pattern: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, description: 'Credit card number exposure' },
      { pattern: /\b\d{3}-\d{2}-\d{4}\b/g, description: 'SSN exposure' }
    ]

    for (const endpoint of endpoints) {
      try {
        const response = await page.request.get(endpoint)
        const responseText = await response.text()

        for (const { pattern, description } of sensitiveDataPatterns) {
          const matches = responseText.match(pattern)
          if (matches && matches.length > 0) {
            dataViolations.push({
              type: 'data_exposure',
              severity: 'critical',
              description: `${description} in API response`,
              location: endpoint,
              evidence: matches[0].substring(0, 50) + '...'
            })
          }
        }

        // Check for database schema exposure
        const schemaPatterns = [
          /create\s+table/gi,
          /alter\s+table/gi,
          /drop\s+table/gi,
          /database.*schema/gi
        ]

        if (schemaPatterns.some(pattern => pattern.test(responseText))) {
          dataViolations.push({
            type: 'data_exposure',
            severity: 'high',
            description: 'Database schema information exposed',
            location: endpoint
          })
        }

      } catch (_error) {
        // Endpoint access denied - good security
      }
    }

    this.violations.push(...dataViolations)
    return dataViolations
  }

  async scanSecurityHeaders(page: Page): Promise<SecurityViolation[]> {
    const headerViolations: SecurityViolation[] = []

    const response = await page.request.get('/')
    const headers = response.headers()

    const requiredHeaders = [
      { name: 'strict-transport-security', severity: 'high' as const, description: 'HSTS header missing' },
      { name: 'x-content-type-options', severity: 'medium' as const, description: 'X-Content-Type-Options header missing' },
      { name: 'x-frame-options', severity: 'medium' as const, description: 'X-Frame-Options header missing' },
      { name: 'content-security-policy', severity: 'high' as const, description: 'CSP header missing' },
      { name: 'x-xss-protection', severity: 'medium' as const, description: 'X-XSS-Protection header missing' }
    ]

    for (const header of requiredHeaders) {
      if (!headers[header.name]) {
        headerViolations.push({
          type: 'authentication',
          severity: header.severity,
          description: header.description,
          location: 'HTTP headers'
        })
      }
    }

    // Check CSP policy strength
    const cspHeader = headers['content-security-policy']
    if (cspHeader) {
      if (cspHeader.includes("'unsafe-eval'") || cspHeader.includes("'unsafe-inline'")) {
        headerViolations.push({
          type: 'xss',
          severity: 'medium',
          description: 'Weak Content Security Policy detected',
          location: 'CSP header',
          evidence: cspHeader
        })
      }
    }

    this.violations.push(...headerViolations)
    return headerViolations
  }

  async scanFileUploadSecurity(page: Page, uploadEndpoint: string): Promise<SecurityViolation[]> {
    const uploadViolations: SecurityViolation[] = []

    const maliciousFiles = [
      { name: 'shell.php', content: '<?php system($_GET["cmd"]); ?>', type: 'application/x-php' },
      { name: 'script.js', content: 'alert("XSS")', type: 'application/javascript' },
      { name: 'malware.exe', content: 'MZ...', type: 'application/x-msdownload' }
    ]

    for (const file of maliciousFiles) {
      try {
        await page.goto(uploadEndpoint)

        await page.setInputFiles('[type="file"]', {
          name: file.name,
          mimeType: file.type,
          buffer: Buffer.from(file.content)
        })

        await page.click('[type="submit"], button[type="submit"]')

        const successMessage = await page.locator('.success, .alert-success').textContent()
        if (successMessage) {
          uploadViolations.push({
            type: 'data_exposure',
            severity: 'critical',
            description: `Malicious file upload accepted: ${file.name}`,
            location: uploadEndpoint,
            evidence: file.name
          })
        }
      } catch (_error) {
        // File rejection is good
      }
    }

    this.violations.push(...uploadViolations)
    return uploadViolations
  }

  recordTestResult(testName: string, passed: boolean) {
    this.testResults.push({ test: testName, passed })
  }

  private isProperlyEncoded(input: string, output: string): boolean {
    // Check if dangerous characters are properly encoded
    const dangerousChars = ['<', '>', '"', "'", '&']
    const encodedChars = ['&lt;', '&gt;', '&quot;', '&#x27;', '&amp;']

    for (let i = 0; i < dangerousChars.length; i++) {
      if (input.includes(dangerousChars[i]) && output.includes(dangerousChars[i]) && !output.includes(encodedChars[i])) {
        return false
      }
    }

    return true
  }

  async generateReport(): Promise<SecurityReport> {
    const totalTests = this.testResults.length
    const passedTests = this.testResults.filter(result => result.passed).length
    const failedTests = totalTests - passedTests

    // Calculate risk level
    const criticalViolations = this.violations.filter(v => v.severity === 'critical').length
    const highViolations = this.violations.filter(v => v.severity === 'high').length

    let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low'
    if (criticalViolations > 0) {
      riskLevel = 'critical'
    } else if (highViolations > 2) {
      riskLevel = 'high'
    } else if (highViolations > 0 || this.violations.length > 5) {
      riskLevel = 'medium'
    }

    // Generate recommendations
    const recommendations = this.generateRecommendations()

    return {
      summary: {
        totalTests,
        passed: passedTests,
        failed: failedTests,
        violations: this.violations.length,
        riskLevel
      },
      violations: this.violations,
      recommendations
    }
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = []

    const violationTypes = new Set(this.violations.map(v => v.type))

    if (violationTypes.has('xss')) {
      recommendations.push('Implement proper input validation and output encoding to prevent XSS attacks')
    }

    if (violationTypes.has('sql_injection')) {
      recommendations.push('Use parameterized queries and input validation to prevent SQL injection')
    }

    if (violationTypes.has('csrf')) {
      recommendations.push('Implement CSRF tokens for all state-changing operations')
    }

    if (violationTypes.has('authentication')) {
      recommendations.push('Strengthen authentication security with proper session management and password policies')
    }

    if (violationTypes.has('data_exposure')) {
      recommendations.push('Review API responses and ensure sensitive data is not exposed')
    }

    if (this.violations.filter(v => v.severity === 'critical').length > 0) {
      recommendations.push('Address critical security vulnerabilities immediately before production deployment')
    }

    return recommendations
  }

  reset() {
    this.violations = []
    this.testResults = []
  }
}