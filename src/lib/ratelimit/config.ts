import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { logger } from '@/lib/utils'

const redis = process.env.REDIS_URL
  ? new Redis({
      url: process.env.REDIS_URL,
      token: process.env.REDIS_TOKEN || '',
    })
  : undefined

export const rateLimiters = {
  // Authentication endpoints - strict limits
  authSendOTP: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '15 m'),
        analytics: true,
        prefix: 'ratelimit:auth:send-otp',
      })
    : null,

  authVerifyOTP: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, '15 m'),
        analytics: true,
        prefix: 'ratelimit:auth:verify-otp',
      })
    : null,

  authLogin: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, '15 m'),
        analytics: true,
        prefix: 'ratelimit:auth:login',
      })
    : null,

  authSignup: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '1 h'),
        analytics: true,
        prefix: 'ratelimit:auth:signup',
      })
    : null,

  authPasswordReset: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, '1 h'),
        analytics: true,
        prefix: 'ratelimit:auth:password-reset',
      })
    : null,

  // API endpoints - moderate limits
  apiGeneral: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(100, '1 m'),
        analytics: true,
        prefix: 'ratelimit:api:general',
      })
    : null,

  apiStrict: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(20, '1 m'),
        analytics: true,
        prefix: 'ratelimit:api:strict',
      })
    : null,

  // WhatsApp/SMS - very strict limits
  whatsappSend: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, '1 h'),
        analytics: true,
        prefix: 'ratelimit:whatsapp:send',
      })
    : null,

  smsSend: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '1 h'),
        analytics: true,
        prefix: 'ratelimit:sms:send',
      })
    : null,

  // Payment endpoints - strict limits
  paymentCreate: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, '1 h'),
        analytics: true,
        prefix: 'ratelimit:payment:create',
      })
    : null,

  // Demo booking - moderate limits
  demoBooking: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(3, '1 h'),
        analytics: true,
        prefix: 'ratelimit:demo:booking',
      })
    : null,
}

export type RateLimiterType = keyof typeof rateLimiters

export function isRateLimitEnabled(): boolean {
  const enabled = !!redis
  if (!enabled && process.env.NODE_ENV === 'production') {
    logger.warn('Rate limiting disabled - REDIS_URL not configured', {
      type: 'rate_limit_warning',
      env: process.env.NODE_ENV,
    })
  }
  return enabled
}

export function getRateLimiter(type: RateLimiterType): Ratelimit | null {
  return rateLimiters[type]
}
