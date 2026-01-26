/**
 * Secure Logging System with PII Redaction
 * Prevents sensitive data leaks in logs
 */

import pino from 'pino'

// PII patterns to redact
const PII_PATTERNS = {
  // Email addresses
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,

  // Phone numbers (Indian format and international)
  phone: /(\+91[-\s]?)?[6-9]\d{9}|\+\d{1,3}[-\s]?\d{6,14}/g,

  // Credit card numbers
  creditCard: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,

  // Aadhaar numbers (12 digits)
  aadhaar: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,

  // PAN card (Indian tax ID)
  pan: /\b[A-Z]{5}\d{4}[A-Z]\b/g,

  // API keys and tokens (basic patterns)
  apiKey: /\b(api[_-]?key|token|secret)["\s:=]+[a-zA-Z0-9_-]{20,}\b/gi,

  // Passwords in logs
  password: /(password|pwd)["\s:=]+[^"\s,}]+/gi,

  // Authorization headers
  auth: /(Bearer|Basic)\s+[A-Za-z0-9_-]+/g,
}

/**
 * Redact PII from a string
 */
function redactPII(text: string): string {
  if (typeof text !== 'string') return text

  let redacted = text

  // Redact emails
  redacted = redacted.replace(PII_PATTERNS.email, '[EMAIL_REDACTED]')

  // Redact phone numbers
  redacted = redacted.replace(PII_PATTERNS.phone, '[PHONE_REDACTED]')

  // Redact credit cards
  redacted = redacted.replace(PII_PATTERNS.creditCard, '[CARD_REDACTED]')

  // Redact Aadhaar
  redacted = redacted.replace(PII_PATTERNS.aadhaar, '[AADHAAR_REDACTED]')

  // Redact PAN
  redacted = redacted.replace(PII_PATTERNS.pan, '[PAN_REDACTED]')

  // Redact API keys
  redacted = redacted.replace(PII_PATTERNS.apiKey, '$1=[API_KEY_REDACTED]')

  // Redact passwords
  redacted = redacted.replace(PII_PATTERNS.password, '$1=[PASSWORD_REDACTED]')

  // Redact auth headers
  redacted = redacted.replace(PII_PATTERNS.auth, '$1 [TOKEN_REDACTED]')

  return redacted
}

/**
 * Redact PII from objects (deep)
 */
function redactObject(obj: any): any {
  if (obj === null || obj === undefined) return obj
  if (typeof obj !== 'object') return redactPII(String(obj))

  if (Array.isArray(obj)) {
    return obj.map(redactObject)
  }

  const redacted: any = {}

  for (const [key, value] of Object.entries(obj)) {
    // Redact sensitive field names
    const sensitiveKeys = [
      'password',
      'pwd',
      'token',
      'apiKey',
      'api_key',
      'secret',
      'auth',
      'authorization',
      'phone',
      'mobile',
      'email',
      'aadhaar',
      'pan',
      'ssn',
      'creditCard',
      'card',
    ]

    if (sensitiveKeys.some((k) => key.toLowerCase().includes(k.toLowerCase()))) {
      redacted[key] = '[REDACTED]'
    } else if (typeof value === 'string') {
      redacted[key] = redactPII(value)
    } else if (typeof value === 'object') {
      redacted[key] = redactObject(value)
    } else {
      redacted[key] = value
    }
  }

  return redacted
}

/**
 * Create Pino logger with PII redaction
 */
export function createLogger(name: string) {
  const isProduction = process.env.NODE_ENV === 'production'

  return pino({
    name,
    level: process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug'),
    formatters: {
      level: (label) => ({ level: label }),
    },
    serializers: {
      // Redact request objects
      req: (req: any) => {
        if (!req) return req

        const redactedReq = {
          id: req.id,
          method: req.method,
          url: redactPII(req.url || ''),
          headers: redactObject(req.headers || {}),
          remoteAddress: req.remoteAddress,
          remotePort: req.remotePort,
        }

        return redactedReq
      },

      // Redact response objects
      res: (res: any) => {
        if (!res) return res

        return {
          statusCode: res.statusCode,
          headers: redactObject(res.headers || {}),
        }
      },

      // Redact errors
      err: (err: any) => {
        if (!err) return err

        return {
          type: err.type,
          message: redactPII(err.message || ''),
          stack: isProduction ? undefined : redactPII(err.stack || ''),
        }
      },

      // Custom serializer for any object
      data: (data: any) => redactObject(data),
    },
    transport: isProduction
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
          },
        },
  })
}

/**
 * Default logger instance
 */
export const logger = createLogger('cerebrum')

/**
 * Safe console replacement for development
 */
export const safeLog = {
  info: (...args: unknown[]) => {
    const redacted = args.map((arg) =>
      typeof arg === 'string' ? redactPII(arg) : redactObject(arg)
    )
    logger.info(
      { data: redacted },
      redacted.filter((r) => typeof r === 'string').join(' ') || 'info'
    )
  },

  error: (...args: unknown[]) => {
    const redacted = args.map((arg) =>
      typeof arg === 'string' ? redactPII(arg) : redactObject(arg)
    )
    logger.error(
      { data: redacted },
      redacted.filter((r) => typeof r === 'string').join(' ') || 'error'
    )
  },

  warn: (...args: unknown[]) => {
    const redacted = args.map((arg) =>
      typeof arg === 'string' ? redactPII(arg) : redactObject(arg)
    )
    logger.warn(
      { data: redacted },
      redacted.filter((r) => typeof r === 'string').join(' ') || 'warning'
    )
  },

  debug: (...args: unknown[]) => {
    const redacted = args.map((arg) =>
      typeof arg === 'string' ? redactPII(arg) : redactObject(arg)
    )
    logger.debug(
      { data: redacted },
      redacted.filter((r) => typeof r === 'string').join(' ') || 'debug'
    )
  },
}

// Export for testing
export { redactPII, redactObject }
