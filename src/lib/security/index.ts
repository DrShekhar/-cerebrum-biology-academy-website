import { NextRequest } from 'next/server'
import { z } from 'zod'

// Rate limiting configuration
interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
  message?: string
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
}

// In-memory rate limiting store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limiting function
export function rateLimit(config: RateLimitConfig) {
  return (identifier: string): { allowed: boolean; message?: string; resetTime?: number } => {
    const now = Date.now()
    const key = `rate_limit:${identifier}`
    const existing = rateLimitStore.get(key)

    // If no existing record or window has expired
    if (!existing || now > existing.resetTime) {
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs,
      })
      return { allowed: true }
    }

    // If within rate limit
    if (existing.count < config.maxRequests) {
      existing.count++
      return { allowed: true }
    }

    // Rate limit exceeded
    return {
      allowed: false,
      message: config.message || 'Too many requests. Please try again later.',
      resetTime: existing.resetTime,
    }
  }
}

// Common rate limit configurations
export const rateLimitConfigs = {
  // General API rate limiting
  api: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100, // 100 requests per 15 minutes
    message: 'Too many API requests. Please try again in 15 minutes.',
  },

  // Authentication rate limiting
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 attempts per 15 minutes
    message: 'Too many login attempts. Please try again in 15 minutes.',
  },

  // Demo booking rate limiting
  demoBooking: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3, // 3 demo bookings per hour
    message: 'Too many demo booking requests. Please try again in 1 hour.',
  },

  // Contact form rate limiting
  contact: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 5, // 5 contact submissions per hour
    message: 'Too many contact form submissions. Please try again in 1 hour.',
  },

  // Payment rate limiting
  payment: {
    windowMs: 5 * 60 * 1000, // 5 minutes
    maxRequests: 10, // 10 payment attempts per 5 minutes
    message: 'Too many payment attempts. Please try again in 5 minutes.',
  },
}

// Get client IP address
export function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const clientIP = request.headers.get('x-client-ip')

  if (forwardedFor) {
    // X-Forwarded-For can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim()
  }

  if (realIP) return realIP
  if (clientIP) return clientIP

  // Fallback to default IP for server environments
  return '127.0.0.1'
}

// Get user agent
export function getUserAgent(request: NextRequest): string {
  return request.headers.get('user-agent') || 'unknown'
}

// Input sanitization
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .slice(0, 1000) // Limit length
}

// SQL injection prevention (basic patterns)
const sqlInjectionPatterns = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i,
  /(\b(OR|AND)\b.*=.*)/i,
  /([\';]|--|\*|\|)/,
  /(\b(SCRIPT|JAVASCRIPT|VBSCRIPT|ONLOAD|ONERROR)\b)/i,
]

export function detectSQLInjection(input: string): boolean {
  return sqlInjectionPatterns.some((pattern) => pattern.test(input))
}

// XSS prevention
const xssPatterns = [
  /<script[^>]*>.*?<\/script>/gi,
  /<iframe[^>]*>.*?<\/iframe>/gi,
  /<object[^>]*>.*?<\/object>/gi,
  /<embed[^>]*>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
]

export function detectXSS(input: string): boolean {
  return xssPatterns.some((pattern) => pattern.test(input))
}

// Validate request headers for security
export function validateSecurityHeaders(request: NextRequest): {
  valid: boolean
  issues: string[]
} {
  const issues: string[] = []

  const userAgent = request.headers.get('user-agent')
  const referer = request.headers.get('referer')
  const origin = request.headers.get('origin')

  // Check for suspicious user agents
  if (userAgent) {
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /curl/i,
      /wget/i,
      /python/i,
      /java/i,
    ]

    if (suspiciousPatterns.some((pattern) => pattern.test(userAgent))) {
      // Allow legitimate bots but flag for monitoring
      console.warn('Suspicious user agent detected:', userAgent)
    }
  }

  // Check origin for API requests
  if (request.method !== 'GET' && origin) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3004',
      'https://cerebrumbiologyacademy.com',
      'https://www.cerebrumbiologyacademy.com',
    ]

    if (!allowedOrigins.includes(origin)) {
      issues.push('Invalid origin header')
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  }
}

// CSRF token validation
export function generateCSRFToken(): string {
  const randomBytes = new Uint8Array(32)
  crypto.getRandomValues(randomBytes)
  return Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export function validateCSRFToken(token: string, expected: string): boolean | string {
  // If token is empty, generate a new one
  if (!token) {
    return generateCSRFToken()
  }

  if (!expected) return false
  return token === expected
}

// Content Security Policy
export function getCSPHeader(): string {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "media-src 'self' https:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'block-all-mixed-content',
    'upgrade-insecure-requests',
  ].join('; ')
}

// Security headers
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Content-Security-Policy': getCSPHeader(),
  }
}

// Request validation helper
export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; error: string; details?: z.ZodError } {
  try {
    const validated = schema.parse(data)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Validation failed',
        details: error,
      }
    }
    return {
      success: false,
      error: 'Invalid input data',
    }
  }
}

// Audit logging
export interface AuditLog {
  userId?: string
  action: string
  resource: string
  details?: any
  ip: string
  userAgent: string
  timestamp: Date
  success: boolean
  error?: string
}

export function createAuditLog(
  request: NextRequest,
  action: string,
  resource: string,
  options: {
    userId?: string
    details?: any
    success: boolean
    error?: string
  }
): AuditLog {
  return {
    userId: options.userId,
    action,
    resource,
    details: options.details,
    ip: getClientIP(request),
    userAgent: getUserAgent(request),
    timestamp: new Date(),
    success: options.success,
    error: options.error,
  }
}

// Clean up rate limiting store periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 60 * 1000) // Clean up every minute
