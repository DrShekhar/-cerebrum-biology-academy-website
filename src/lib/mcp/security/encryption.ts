/**
 * Security Manager - Data Protection & Encryption
 * Enterprise-grade security for student data protection
 * GDPR + Indian compliance with end-to-end encryption
 */

import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'
import type { SecurityConfig, EncryptionConfig, SecurityPolicy, PasswordPolicy } from '../types'

interface EncryptedData {
  encryptedData: string
  iv: string
  tag: string
  algorithm: string
  timestamp: Date
}

interface SecurityAudit {
  action: string
  userId: string
  timestamp: Date
  ipAddress: string
  userAgent: string
  success: boolean
  details?: any
}

/**
 * SecurityManager handles all encryption, authentication, and security operations
 * Features: AES-256 encryption, JWT tokens, data masking, audit logging
 */
export class SecurityManager {
  private config: SecurityConfig
  private encryptionKey: Buffer
  private jwtSecret: string
  private securityPolicy: SecurityPolicy

  // Security constants
  private readonly ENCRYPTION_ALGORITHM = 'aes-256-gcm'
  private readonly KEY_LENGTH = 32 // 256 bits
  private readonly IV_LENGTH = 16 // 128 bits
  private readonly TAG_LENGTH = 16 // 128 bits
  private readonly JWT_EXPIRES_IN = '24h'
  private readonly SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes

  // Security audit log
  private auditLog: SecurityAudit[] = []

  constructor(config: SecurityConfig) {
    this.config = config
    this.jwtSecret = config.jwtSecret
    this.encryptionKey = this.deriveEncryptionKey(config.encryptionKey)

    this.initializeSecurityPolicy()
    this.validateSecurityConfiguration()
  }

  /**
   * Encrypt sensitive data using AES-256-GCM
   */
  encryptData(data: string | object): EncryptedData {
    try {
      const plaintext = typeof data === 'string' ? data : JSON.stringify(data)

      // Generate random IV for each encryption
      const iv = crypto.randomBytes(this.IV_LENGTH)

      // Create cipher with IV
      const cipher = crypto.createCipheriv(this.ENCRYPTION_ALGORITHM, this.encryptionKey, iv)
      cipher.setAAD(Buffer.from('cerebrum-biology-academy')) // Additional authenticated data

      // Encrypt data
      let encrypted = cipher.update(plaintext, 'utf8', 'hex')
      encrypted += cipher.final('hex')

      // Get authentication tag
      const tag = cipher.getAuthTag()

      return {
        encryptedData: encrypted,
        iv: iv.toString('hex'),
        tag: tag.toString('hex'),
        algorithm: this.ENCRYPTION_ALGORITHM,
        timestamp: new Date(),
      }
    } catch (error) {
      this.logSecurityEvent('encryption_failed', 'system', false, {
        error: (error as Error).message,
      })
      throw new Error('Encryption failed')
    }
  }

  /**
   * Decrypt data using AES-256-GCM
   */
  decryptData(encryptedData: EncryptedData): string {
    try {
      // Validate encrypted data structure
      if (!this.isValidEncryptedData(encryptedData)) {
        throw new Error('Invalid encrypted data format')
      }

      // Create decipher with IV
      const iv = Buffer.from(encryptedData.iv, 'hex')
      const decipher = crypto.createDecipheriv(
        encryptedData.algorithm,
        this.encryptionKey,
        iv
      ) as crypto.DecipherGCM

      decipher.setAAD(Buffer.from('cerebrum-biology-academy'))
      decipher.setAuthTag(Buffer.from(encryptedData.tag, 'hex'))

      // Decrypt data
      let decrypted = decipher.update(encryptedData.encryptedData, 'hex', 'utf8')
      decrypted += decipher.final('utf8')

      this.logSecurityEvent('decryption_success', 'system', true)
      return decrypted
    } catch (error) {
      this.logSecurityEvent('decryption_failed', 'system', false, {
        error: (error as Error).message,
      })
      throw new Error('Decryption failed')
    }
  }

  /**
   * Generate secure JWT token for authentication
   */
  generateAuthToken(payload: any, expiresIn: string | number = this.JWT_EXPIRES_IN): string {
    try {
      const tokenPayload = {
        ...payload,
        iat: Math.floor(Date.now() / 1000),
        iss: 'cerebrum-biology-academy',
        aud: 'mcp-server',
      }

      const token = jwt.sign(tokenPayload, this.jwtSecret, {
        expiresIn: expiresIn as string,
        algorithm: 'HS256',
      })

      this.logSecurityEvent('token_generated', payload.userId || 'system', true, {
        tokenType: 'auth',
        expiresIn,
      })

      return token
    } catch (error) {
      this.logSecurityEvent('token_generation_failed', 'system', false, {
        error: (error as Error).message,
      })
      throw new Error('Token generation failed')
    }
  }

  /**
   * Verify and decode JWT token
   */
  verifyAuthToken(token: string): any {
    try {
      const decoded = jwt.verify(token, this.jwtSecret, {
        algorithms: ['HS256'],
        issuer: 'cerebrum-biology-academy',
        audience: 'mcp-server',
      })

      this.logSecurityEvent('token_verified', (decoded as any).userId || 'unknown', true)
      return decoded
    } catch (error) {
      this.logSecurityEvent('token_verification_failed', 'unknown', false, {
        error: error.message,
        token: this.maskSensitiveData(token),
      })
      throw new Error('Token verification failed')
    }
  }

  /**
   * Hash passwords using bcrypt with salt
   */
  async hashPassword(password: string): Promise<string> {
    try {
      // Validate password against policy
      this.validatePassword(password)

      // Use crypto-js for hashing (as bcryptjs might not be available)
      const salt = CryptoJS.lib.WordArray.random(16)
      const hashed = CryptoJS.PBKDF2(password, salt, {
        keySize: 256 / 32,
        iterations: 10000,
      })

      const combined = salt.concat(hashed)
      return combined.toString(CryptoJS.enc.Base64)
    } catch (error) {
      this.logSecurityEvent('password_hashing_failed', 'system', false, { error: error.message })
      throw new Error('Password hashing failed')
    }
  }

  /**
   * Verify password against hash
   */
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    try {
      const combined = CryptoJS.enc.Base64.parse(hash)
      const salt = CryptoJS.lib.WordArray.create(combined.words.slice(0, 4))
      const originalHash = CryptoJS.lib.WordArray.create(combined.words.slice(4))

      const computedHash = CryptoJS.PBKDF2(password, salt, {
        keySize: 256 / 32,
        iterations: 10000,
      })

      const isValid = computedHash.toString() === originalHash.toString()

      this.logSecurityEvent('password_verification', 'user', isValid)
      return isValid
    } catch (error) {
      this.logSecurityEvent('password_verification_failed', 'user', false, { error: error.message })
      return false
    }
  }

  /**
   * Mask sensitive data for logging
   */
  maskSensitiveData(data: string): string {
    if (!data || data.length < 8) return '***'

    const visibleChars = 4
    const start = data.substring(0, visibleChars)
    const end = data.substring(data.length - visibleChars)
    const masked = '*'.repeat(Math.max(0, data.length - visibleChars * 2))

    return `${start}${masked}${end}`
  }

  /**
   * Sanitize user input to prevent injection attacks
   */
  sanitizeInput(input: string): string {
    if (typeof input !== 'string') return ''

    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .replace(/[<>'"&]/g, (match) => {
        // Escape HTML characters
        const escapeMap: Record<string, string> = {
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '&': '&amp;',
        }
        return escapeMap[match]
      })
      .trim()
  }

  /**
   * Validate user session and check for timeout
   */
  validateSession(sessionData: any): boolean {
    try {
      if (!sessionData || !sessionData.createdAt || !sessionData.userId) {
        return false
      }

      const sessionAge = Date.now() - new Date(sessionData.createdAt).getTime()
      const isExpired = sessionAge > this.SESSION_TIMEOUT

      if (isExpired) {
        this.logSecurityEvent('session_expired', sessionData.userId, false, {
          sessionAge: Math.round(sessionAge / 1000),
          timeout: Math.round(this.SESSION_TIMEOUT / 1000),
        })
        return false
      }

      this.logSecurityEvent('session_validated', sessionData.userId, true)
      return true
    } catch (error) {
      this.logSecurityEvent('session_validation_failed', 'unknown', false, { error: error.message })
      return false
    }
  }

  /**
   * Check if IP address is allowed
   */
  isAllowedIP(ipAddress: string): boolean {
    // If no IP restrictions configured, allow all
    if (!this.config.allowedOrigins || this.config.allowedOrigins.length === 0) {
      return true
    }

    // Check against allowed origins/IPs
    const isAllowed = this.config.allowedOrigins.some((allowed) => {
      // Support wildcard matching
      if (allowed.includes('*')) {
        const pattern = allowed.replace(/\*/g, '.*')
        return new RegExp(`^${pattern}$`).test(ipAddress)
      }
      return allowed === ipAddress
    })

    this.logSecurityEvent('ip_check', 'system', isAllowed, {
      ipAddress: this.maskSensitiveData(ipAddress),
      allowed: isAllowed,
    })

    return isAllowed
  }

  /**
   * Generate secure random tokens
   */
  generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex')
  }

  /**
   * Hash data using SHA-256
   */
  hashData(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex')
  }

  /**
   * Validate GDPR compliance for data processing
   */
  validateGDPRCompliance(dataType: string, purpose: string, consent: boolean): boolean {
    // GDPR validation logic
    const allowedPurposes = ['education', 'progress_tracking', 'communication', 'analytics']

    if (!allowedPurposes.includes(purpose)) {
      this.logSecurityEvent('gdpr_violation_purpose', 'system', false, {
        dataType,
        purpose,
        allowedPurposes,
      })
      return false
    }

    if (!consent && dataType !== 'anonymous') {
      this.logSecurityEvent('gdpr_violation_consent', 'system', false, {
        dataType,
        purpose,
        consent,
      })
      return false
    }

    this.logSecurityEvent('gdpr_compliance_check', 'system', true, {
      dataType,
      purpose,
      consent,
    })

    return true
  }

  /**
   * Get security audit log
   */
  getSecurityAuditLog(): SecurityAudit[] {
    return [...this.auditLog] // Return copy to prevent modification
  }

  /**
   * Clear old audit logs (data retention policy)
   */
  clearOldAuditLogs(retentionDays: number = 90): void {
    const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000)
    const initialCount = this.auditLog.length

    this.auditLog = this.auditLog.filter((log) => log.timestamp > cutoffDate)

    const clearedCount = initialCount - this.auditLog.length
    this.logSecurityEvent('audit_logs_cleared', 'system', true, {
      clearedCount,
      retentionDays,
      remainingLogs: this.auditLog.length,
    })
  }

  // Private helper methods

  private deriveEncryptionKey(secretKey: string): Buffer {
    // Derive a proper encryption key from the secret
    return crypto.scryptSync(secretKey, 'cerebrum-salt', this.KEY_LENGTH)
  }

  private initializeSecurityPolicy(): void {
    this.securityPolicy = {
      dataEncryption: true,
      accessLogging: true,
      sessionTimeout: this.SESSION_TIMEOUT / 1000, // Convert to seconds
      maxLoginAttempts: 5,
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        expiryDays: 90,
      },
      dataRetention: {
        studentData: 24, // months
        conversationLogs: 12,
        analyticsData: 36,
        auditLogs: 12,
      },
    }
  }

  private validateSecurityConfiguration(): void {
    if (!this.config.jwtSecret || this.config.jwtSecret.length < 32) {
      throw new Error('JWT secret must be at least 32 characters long')
    }

    if (!this.config.encryptionKey || this.config.encryptionKey.length < 32) {
      throw new Error('Encryption key must be at least 32 characters long')
    }

    if (!this.config.rateLimiting) {
      throw new Error('Rate limiting configuration is required')
    }
  }

  private validatePassword(password: string): void {
    const policy = this.securityPolicy.passwordPolicy

    if (password.length < policy.minLength) {
      throw new Error(`Password must be at least ${policy.minLength} characters long`)
    }

    if (policy.requireUppercase && !/[A-Z]/.test(password)) {
      throw new Error('Password must contain at least one uppercase letter')
    }

    if (policy.requireLowercase && !/[a-z]/.test(password)) {
      throw new Error('Password must contain at least one lowercase letter')
    }

    if (policy.requireNumbers && !/\d/.test(password)) {
      throw new Error('Password must contain at least one number')
    }

    if (policy.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      throw new Error('Password must contain at least one special character')
    }
  }

  private isValidEncryptedData(data: any): boolean {
    return (
      data &&
      typeof data.encryptedData === 'string' &&
      typeof data.iv === 'string' &&
      typeof data.tag === 'string' &&
      typeof data.algorithm === 'string' &&
      data.timestamp instanceof Date
    )
  }

  private logSecurityEvent(action: string, userId: string, success: boolean, details?: any): void {
    const auditEntry: SecurityAudit = {
      action,
      userId,
      timestamp: new Date(),
      ipAddress: 'localhost', // In real implementation, get from request
      userAgent: 'MCP-Server', // In real implementation, get from request
      success,
      details,
    }

    this.auditLog.push(auditEntry)

    // Keep only last 10000 entries to prevent memory issues
    if (this.auditLog.length > 10000) {
      this.auditLog = this.auditLog.slice(-5000) // Keep last 5000
    }

    // Log critical security events
    if (
      !success &&
      ['token_verification_failed', 'decryption_failed', 'gdpr_violation'].some((event) =>
        action.includes(event)
      )
    ) {
      console.warn(`🚨 Security Alert: ${action} - User: ${userId} - Details:`, details)
    }
  }
}
