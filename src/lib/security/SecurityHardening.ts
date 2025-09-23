/**
 * Security Hardening System - Enterprise-grade security implementation
 * Comprehensive security measures for production deployment
 */

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

interface SecurityConfig {
  environment: 'development' | 'staging' | 'production'
  rateLimiting: RateLimitConfig
  contentSecurity: CSPConfig
  encryption: EncryptionConfig
  authentication: AuthConfig
  monitoring: SecurityMonitoringConfig
}

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  skipSuccessfulRequests: boolean
  standardHeaders: boolean
  legacyHeaders: boolean
  customKeyGenerator?: (req: any) => string
}

interface CSPConfig {
  directives: {
    defaultSrc: string[]
    scriptSrc: string[]
    styleSrc: string[]
    imgSrc: string[]
    fontSrc: string[]
    connectSrc: string[]
    frameSrc: string[]
    mediaSrc: string[]
    objectSrc: string[]
    workerSrc: string[]
  }
  reportUri?: string
  reportOnly: boolean
}

interface EncryptionConfig {
  algorithm: string
  keyLength: number
  ivLength: number
  tagLength: number
  saltLength: number
  iterations: number
}

interface AuthConfig {
  jwtSecret: string
  jwtExpiry: string
  refreshTokenExpiry: string
  sessionTimeout: number
  maxLoginAttempts: number
  lockoutDuration: number
  passwordPolicy: PasswordPolicy
}

interface PasswordPolicy {
  minLength: number
  requireUppercase: boolean
  requireLowercase: boolean
  requireNumbers: boolean
  requireSpecialChars: boolean
  preventCommonPasswords: boolean
  preventReuse: number
}

interface SecurityMonitoringConfig {
  logLevel: 'error' | 'warn' | 'info' | 'debug'
  enableAuditLog: boolean
  alertThresholds: {
    failedLogins: number
    suspiciousActivity: number
    dataAccessAnomalies: number
  }
  incidentResponse: {
    autoBlock: boolean
    alertWebhook: string
    escalationThreshold: number
  }
}

interface SecurityEvent {
  id: string
  type: 'authentication' | 'authorization' | 'data_access' | 'suspicious_activity' | 'system_event'
  severity: 'low' | 'medium' | 'high' | 'critical'
  userId?: string
  sessionId?: string
  ipAddress: string
  userAgent: string
  timestamp: Date
  details: any
  riskScore: number
}

interface ThreatDetection {
  patternId: string
  name: string
  description: string
  category: 'brute_force' | 'injection' | 'xss' | 'csrf' | 'data_exfiltration' | 'anomaly'
  patterns: RegExp[]
  riskScore: number
  action: 'log' | 'warn' | 'block' | 'throttle'
}

export class SecurityHardening {
  private config: SecurityConfig
  private threatPatterns: Map<string, ThreatDetection> = new Map()
  private blockedIPs: Set<string> = new Set()
  private rateLimitStore: Map<string, { count: number; resetTime: number }> = new Map()
  private auditLog: SecurityEvent[] = []

  constructor(environment: 'development' | 'staging' | 'production' = 'production') {
    this.config = this.initializeSecurityConfig(environment)
    this.initializeThreatDetection()
    this.startSecurityMonitoring()
  }

  private initializeSecurityConfig(environment: string): SecurityConfig {
    const baseConfig = {
      environment: environment as any,
      rateLimiting: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        maxRequests: environment === 'production' ? 100 : 1000,
        skipSuccessfulRequests: false,
        standardHeaders: true,
        legacyHeaders: false,
      },
      contentSecurity: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'", // Remove in production
            "'unsafe-eval'", // Remove in production
            'https://vercel.live',
            'https://va.vercel-scripts.com',
            'https://www.google-analytics.com',
            'https://www.googletagmanager.com',
          ],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          imgSrc: ["'self'", 'data:', 'blob:', 'https:', 'http:'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          connectSrc: [
            "'self'",
            'https://api.cerebrumbiologyacademy.com',
            'https://analytics.google.com',
            'https://vitals.vercel-insights.com',
          ],
          frameSrc: ["'self'", 'https://www.youtube.com', 'https://player.vimeo.com'],
          mediaSrc: ["'self'", 'https:', 'data:', 'blob:'],
          objectSrc: ["'none'"],
          workerSrc: ["'self'", 'blob:'],
        },
        reportUri: '/api/security/csp-report',
        reportOnly: environment !== 'production',
      },
      encryption: {
        algorithm: 'aes-256-gcm',
        keyLength: 32,
        ivLength: 16,
        tagLength: 16,
        saltLength: 32,
        iterations: 100000,
      },
      authentication: {
        jwtSecret: process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex'),
        jwtExpiry: '15m',
        refreshTokenExpiry: '7d',
        sessionTimeout: 30 * 60 * 1000, // 30 minutes
        maxLoginAttempts: 5,
        lockoutDuration: 15 * 60 * 1000, // 15 minutes
        passwordPolicy: {
          minLength: 12,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
          preventCommonPasswords: true,
          preventReuse: 5,
        },
      },
      monitoring: {
        logLevel: environment === 'production' ? 'error' : 'debug',
        enableAuditLog: true,
        alertThresholds: {
          failedLogins: 10,
          suspiciousActivity: 5,
          dataAccessAnomalies: 3,
        },
        incidentResponse: {
          autoBlock: environment === 'production',
          alertWebhook: process.env.SECURITY_WEBHOOK_URL || '',
          escalationThreshold: 3,
        },
      },
    }

    return baseConfig
  }

  private initializeThreatDetection() {
    const patterns: ThreatDetection[] = [
      {
        patternId: 'sql_injection',
        name: 'SQL Injection Attempt',
        description: 'Potential SQL injection attack detected',
        category: 'injection',
        patterns: [
          /(\bUNION\b|\bSELECT\b|\bINSERT\b|\bDELETE\b|\bUPDATE\b|\bDROP\b)/i,
          /('|")\s*(OR|AND)\s*('|")/i,
          /(\b1=1\b|\b1\s*=\s*1\b)/i,
        ],
        riskScore: 9,
        action: 'block',
      },
      {
        patternId: 'xss_attempt',
        name: 'Cross-Site Scripting Attempt',
        description: 'Potential XSS attack detected',
        category: 'xss',
        patterns: [/<script[^>]*>.*?<\/script>/i, /javascript:/i, /on\w+\s*=/i, /<iframe[^>]*>/i],
        riskScore: 8,
        action: 'block',
      },
      {
        patternId: 'brute_force',
        name: 'Brute Force Attack',
        description: 'Potential brute force attack detected',
        category: 'brute_force',
        patterns: [
          /(.)\1{10,}/, // Repeated characters
        ],
        riskScore: 7,
        action: 'throttle',
      },
      {
        patternId: 'path_traversal',
        name: 'Path Traversal Attempt',
        description: 'Potential path traversal attack detected',
        category: 'injection',
        patterns: [/\.\.\/|\.\.\\|\.\.[/\\]/, /%2e%2e%2f|%2e%2e[/\\]/i, /etc\/passwd|boot\.ini/i],
        riskScore: 8,
        action: 'block',
      },
      {
        patternId: 'command_injection',
        name: 'Command Injection Attempt',
        description: 'Potential command injection attack detected',
        category: 'injection',
        patterns: [/(\||&|;|`|\$\(|\${)/, /(nc|netcat|wget|curl)\s/i, /(rm|del|format)\s/i],
        riskScore: 9,
        action: 'block',
      },
    ]

    patterns.forEach((pattern) => {
      this.threatPatterns.set(pattern.patternId, pattern)
    })
  }

  /**
   * Security middleware for requests
   */
  securityMiddleware(request: NextRequest): NextResponse | null {
    const clientIP = this.getClientIP(request)
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Check if IP is blocked
    if (this.blockedIPs.has(clientIP)) {
      return this.blockRequest('IP blocked', clientIP)
    }

    // Rate limiting
    const rateLimitResult = this.checkRateLimit(clientIP, request.url)
    if (!rateLimitResult.allowed) {
      return this.rateLimitResponse(rateLimitResult.resetTime)
    }

    // Threat detection
    const threatDetected = this.detectThreats(request)
    if (threatDetected) {
      return this.handleThreat(threatDetected, clientIP, userAgent)
    }

    // Add security headers
    return this.addSecurityHeaders(request)
  }

  /**
   * Validate password against security policy
   */
  validatePassword(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = []
    const policy = this.config.authentication.passwordPolicy

    if (password.length < policy.minLength) {
      errors.push(`Password must be at least ${policy.minLength} characters long`)
    }

    if (policy.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }

    if (policy.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }

    if (policy.requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number')
    }

    if (policy.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character')
    }

    if (policy.preventCommonPasswords && this.isCommonPassword(password)) {
      errors.push('Password is too common, please choose a more secure password')
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }

  /**
   * Encrypt sensitive data
   */
  encryptData(data: string, key?: string): { encrypted: string; iv: string; tag: string } {
    const config = this.config.encryption
    const encryptionKey = key ? Buffer.from(key, 'hex') : crypto.randomBytes(config.keyLength)
    const iv = crypto.randomBytes(config.ivLength)

    const cipher = crypto.createCipher(config.algorithm, encryptionKey)
    cipher.setAAD(Buffer.from('cerebrum-auth'))

    let encrypted = cipher.update(data, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    const tag = cipher.getAuthTag()

    return {
      encrypted,
      iv: iv.toString('hex'),
      tag: tag.toString('hex'),
    }
  }

  /**
   * Decrypt sensitive data
   */
  decryptData(encryptedData: { encrypted: string; iv: string; tag: string }, key: string): string {
    const config = this.config.encryption
    const encryptionKey = Buffer.from(key, 'hex')
    const iv = Buffer.from(encryptedData.iv, 'hex')
    const tag = Buffer.from(encryptedData.tag, 'hex')

    const decipher = crypto.createDecipher(config.algorithm, encryptionKey)
    decipher.setAAD(Buffer.from('cerebrum-auth'))
    decipher.setAuthTag(tag)

    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  }

  /**
   * Generate secure hash for passwords
   */
  async hashPassword(password: string): Promise<{ hash: string; salt: string }> {
    const config = this.config.encryption
    const salt = crypto.randomBytes(config.saltLength).toString('hex')

    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password,
        salt,
        config.iterations,
        config.keyLength,
        'sha512',
        (err, derivedKey) => {
          if (err) reject(err)
          resolve({
            hash: derivedKey.toString('hex'),
            salt,
          })
        }
      )
    })
  }

  /**
   * Verify password against hash
   */
  async verifyPassword(password: string, hash: string, salt: string): Promise<boolean> {
    const config = this.config.encryption

    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password,
        salt,
        config.iterations,
        config.keyLength,
        'sha512',
        (err, derivedKey) => {
          if (err) reject(err)
          resolve(derivedKey.toString('hex') === hash)
        }
      )
    })
  }

  /**
   * Log security events
   */
  logSecurityEvent(event: Omit<SecurityEvent, 'id' | 'timestamp' | 'riskScore'>): void {
    const securityEvent: SecurityEvent = {
      id: crypto.randomUUID(),
      ...event,
      timestamp: new Date(),
      riskScore: this.calculateRiskScore(event),
    }

    this.auditLog.push(securityEvent)

    // Alert on high-risk events
    if (securityEvent.severity === 'high' || securityEvent.severity === 'critical') {
      this.sendSecurityAlert(securityEvent)
    }

    // Maintain audit log size
    if (this.auditLog.length > 10000) {
      this.auditLog = this.auditLog.slice(-5000)
    }
  }

  /**
   * Generate Content Security Policy header
   */
  generateCSPHeader(): string {
    const csp = this.config.contentSecurity
    const directives = Object.entries(csp.directives)
      .map(([key, values]) => {
        const directiveName = key.replace(/([A-Z])/g, '-$1').toLowerCase()
        return `${directiveName} ${values.join(' ')}`
      })
      .join('; ')

    if (csp.reportUri) {
      return `${directives}; report-uri ${csp.reportUri}`
    }

    return directives
  }

  /**
   * Get security metrics
   */
  getSecurityMetrics(): {
    totalEvents: number
    eventsByType: { [key: string]: number }
    eventsBySeverity: { [key: string]: number }
    blockedIPs: number
    threatDetections: number
    averageRiskScore: number
  } {
    const eventsByType: { [key: string]: number } = {}
    const eventsBySeverity: { [key: string]: number } = {}
    let totalRiskScore = 0

    this.auditLog.forEach((event) => {
      eventsByType[event.type] = (eventsByType[event.type] || 0) + 1
      eventsBySeverity[event.severity] = (eventsBySeverity[event.severity] || 0) + 1
      totalRiskScore += event.riskScore
    })

    return {
      totalEvents: this.auditLog.length,
      eventsByType,
      eventsBySeverity,
      blockedIPs: this.blockedIPs.size,
      threatDetections: this.auditLog.filter((e) => e.type === 'suspicious_activity').length,
      averageRiskScore: this.auditLog.length > 0 ? totalRiskScore / this.auditLog.length : 0,
    }
  }

  // Private helper methods
  private getClientIP(request: NextRequest): string {
    return (
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      request.ip ||
      'unknown'
    )
  }

  private checkRateLimit(ip: string, url: string): { allowed: boolean; resetTime?: number } {
    const key = `${ip}:${url}`
    const now = Date.now()
    const window = this.config.rateLimiting.windowMs
    const maxRequests = this.config.rateLimiting.maxRequests

    const record = this.rateLimitStore.get(key)

    if (!record || now >= record.resetTime) {
      this.rateLimitStore.set(key, { count: 1, resetTime: now + window })
      return { allowed: true }
    }

    if (record.count >= maxRequests) {
      return { allowed: false, resetTime: record.resetTime }
    }

    record.count++
    return { allowed: true }
  }

  private detectThreats(request: NextRequest): ThreatDetection | null {
    const url = request.url
    const headers = Object.fromEntries(request.headers.entries())
    const body = request.body?.toString() || ''

    const checkContent = `${url} ${JSON.stringify(headers)} ${body}`

    for (const [, pattern] of this.threatPatterns) {
      for (const regex of pattern.patterns) {
        if (regex.test(checkContent)) {
          return pattern
        }
      }
    }

    return null
  }

  private handleThreat(threat: ThreatDetection, ip: string, userAgent: string): NextResponse {
    this.logSecurityEvent({
      type: 'suspicious_activity',
      severity: threat.riskScore >= 8 ? 'high' : 'medium',
      ipAddress: ip,
      userAgent,
      details: {
        threatType: threat.category,
        patternId: threat.patternId,
        description: threat.description,
      },
    })

    switch (threat.action) {
      case 'block':
        this.blockedIPs.add(ip)
        return this.blockRequest(`Threat detected: ${threat.name}`, ip)

      case 'throttle':
        // Implement throttling logic
        return NextResponse.json(
          { error: 'Request throttled due to suspicious activity' },
          { status: 429 }
        )

      default:
        return NextResponse.next()
    }
  }

  private addSecurityHeaders(request: NextRequest): NextResponse {
    const response = NextResponse.next()

    // Security headers
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    )

    // Content Security Policy
    const cspHeader = this.generateCSPHeader()
    const headerName = this.config.contentSecurity.reportOnly
      ? 'Content-Security-Policy-Report-Only'
      : 'Content-Security-Policy'
    response.headers.set(headerName, cspHeader)

    return response
  }

  private blockRequest(reason: string, ip: string): NextResponse {
    this.logSecurityEvent({
      type: 'system_event',
      severity: 'high',
      ipAddress: ip,
      userAgent: 'blocked',
      details: { reason, action: 'blocked' },
    })

    return NextResponse.json({ error: 'Access denied' }, { status: 403 })
  }

  private rateLimitResponse(resetTime: number): NextResponse {
    const response = NextResponse.json({ error: 'Too many requests' }, { status: 429 })

    response.headers.set('Retry-After', Math.ceil((resetTime - Date.now()) / 1000).toString())
    return response
  }

  private isCommonPassword(password: string): boolean {
    const commonPasswords = [
      'password',
      '123456',
      '123456789',
      'qwerty',
      'abc123',
      'password123',
      'admin',
      'letmein',
      'welcome',
      'monkey',
    ]
    return commonPasswords.includes(password.toLowerCase())
  }

  private calculateRiskScore(event: Omit<SecurityEvent, 'id' | 'timestamp' | 'riskScore'>): number {
    let score = 0

    switch (event.severity) {
      case 'low':
        score += 1
        break
      case 'medium':
        score += 3
        break
      case 'high':
        score += 7
        break
      case 'critical':
        score += 10
        break
    }

    switch (event.type) {
      case 'authentication':
        score += 2
        break
      case 'authorization':
        score += 3
        break
      case 'data_access':
        score += 4
        break
      case 'suspicious_activity':
        score += 6
        break
      case 'system_event':
        score += 1
        break
    }

    return Math.min(score, 10)
  }

  private async sendSecurityAlert(event: SecurityEvent): Promise<void> {
    if (!this.config.monitoring.incidentResponse.alertWebhook) return

    try {
      await fetch(this.config.monitoring.incidentResponse.alertWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alert: 'Security Event',
          severity: event.severity,
          type: event.type,
          details: event.details,
          timestamp: event.timestamp,
          riskScore: event.riskScore,
        }),
      })
    } catch (error) {
      console.error('Failed to send security alert:', error)
    }
  }

  private startSecurityMonitoring(): void {
    // Clean up rate limit store every 15 minutes
    setInterval(
      () => {
        const now = Date.now()
        for (const [key, record] of this.rateLimitStore.entries()) {
          if (now >= record.resetTime) {
            this.rateLimitStore.delete(key)
          }
        }
      },
      15 * 60 * 1000
    )

    // Clean up blocked IPs every hour (optional auto-unblock)
    setInterval(
      () => {
        // Implement auto-unblock logic if needed
      },
      60 * 60 * 1000
    )
  }
}

// Export singleton instance
export const securityHardening = new SecurityHardening(
  (process.env.NODE_ENV as any) || 'production'
)
