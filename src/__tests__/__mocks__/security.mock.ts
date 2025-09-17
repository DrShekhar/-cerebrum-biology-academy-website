// Mock security functions for testing
export const rateLimitStore = new Map()

export function checkRateLimit(identifier: string, limit = 5, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now()
  const windowStart = now - windowMs

  if (!rateLimitStore.has(identifier)) {
    rateLimitStore.set(identifier, { count: 1, firstRequest: now })
    return true
  }

  const record = rateLimitStore.get(identifier)

  if (record.firstRequest < windowStart) {
    // Reset counter for new window
    rateLimitStore.set(identifier, { count: 1, firstRequest: now })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}

export function isXSSAttempt(input: string): boolean {
  const xssPatterns = [
    /<script.*?>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe.*?>/gi,
    /<img.*?onerror.*?>/gi,
    /<svg.*?onload.*?>/gi,
    /<body.*?onpageshow.*?>/gi,
  ]

  return xssPatterns.some((pattern) => pattern.test(input))
}

export function isSQLInjectionAttempt(input: string): boolean {
  const sqlPatterns = [
    /('|(\\')|(;)|(\\;))/gi,
    /(union|select|insert|update|delete|drop|create|alter|exec|execute)/gi,
    /(or\s+1=1|and\s+1=1)/gi,
    /(\/\*|\*\/|--|#)/gi,
    /(having|group\s+by)/gi,
  ]

  return sqlPatterns.some((pattern) => pattern.test(input))
}

export function sanitizeInput(input: any): string {
  if (!input || typeof input !== 'string') return ''

  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

export function validateCSRFToken(token: string, sessionId: string): string | boolean {
  if (!token) {
    // Generate new token
    return `csrf-${sessionId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  // Simple validation for mock
  return token.startsWith(`csrf-${sessionId}`)
}

export function extractClientIP(request: any): string {
  const headers = request.headers

  if (typeof headers.get === 'function') {
    return (
      headers.get('x-forwarded-for')?.split(',')[0] ||
      headers.get('x-real-ip') ||
      headers.get('cf-connecting-ip') ||
      '127.0.0.1'
    )
  }

  return '127.0.0.1'
}

export function isValidUserAgent(userAgent: string): boolean {
  if (!userAgent || userAgent.length < 10) return false

  const suspiciousPatterns = [/curl/i, /wget/i, /python/i, /bot/i]

  return !suspiciousPatterns.some((pattern) => pattern.test(userAgent))
}
