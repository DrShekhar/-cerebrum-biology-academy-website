import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { logger } from '@/lib/utils'

// Use Upstash REST API environment variables (https:// URLs, not redis://)
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: (process.env.UPSTASH_REDIS_REST_URL || '').trim(),
        token: (process.env.UPSTASH_REDIS_REST_TOKEN || '').trim(),
      })
    : undefined

export const rateLimiters = {
  // Authentication endpoints — keep strict (security-sensitive)
  authSendOTP: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, '15 m'),
        analytics: true,
        prefix: 'ratelimit:auth:send-otp',
      })
    : null,

  authVerifyOTP: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(20, '15 m'),
        analytics: true,
        prefix: 'ratelimit:auth:verify-otp',
      })
    : null,

  authLogin: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(20, '15 m'),
        analytics: true,
        prefix: 'ratelimit:auth:login',
      })
    : null,

  authSignup: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, '1 h'),
        analytics: true,
        prefix: 'ratelimit:auth:signup',
      })
    : null,

  authPasswordReset: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, '1 h'),
        analytics: true,
        prefix: 'ratelimit:auth:password-reset',
      })
    : null,

  // API endpoints — generous to avoid blocking real users
  apiGeneral: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(500, '1 m'),
        analytics: true,
        prefix: 'ratelimit:api:general',
      })
    : null,

  apiStrict: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(100, '1 m'),
        analytics: true,
        prefix: 'ratelimit:api:strict',
      })
    : null,

  // WhatsApp/SMS — moderate (cost-sensitive but don't block leads)
  whatsappSend: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(1000, '1 h'),
        analytics: true,
        prefix: 'ratelimit:whatsapp:send',
      })
    : null,

  smsSend: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(20, '1 h'),
        analytics: true,
        prefix: 'ratelimit:sms:send',
      })
    : null,

  // Payment endpoints — moderate
  paymentCreate: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(50, '1 h'),
        analytics: true,
        prefix: 'ratelimit:payment:create',
      })
    : null,

  // Demo booking — never block a lead
  demoBooking: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(1000, '1 h'),
        analytics: true,
        prefix: 'ratelimit:demo:booking',
      })
    : null,

  // Contact form — never block a lead
  contactForm: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(1000, '1 h'),
        analytics: true,
        prefix: 'ratelimit:contact:form',
      })
    : null,

  // Newsletter subscription — generous
  newsletterSubscribe: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(50, '1 h'),
        analytics: true,
        prefix: 'ratelimit:newsletter:subscribe',
      })
    : null,

  // Public search APIs — generous for good UX
  publicSearch: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(200, '1 m'),
        analytics: true,
        prefix: 'ratelimit:public:search',
      })
    : null,

  // AI endpoints — moderate (cost-sensitive)
  aiChat: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(60, '1 h'),
        analytics: true,
        prefix: 'ratelimit:ai:chat',
      })
    : null,
}

export type RateLimiterType = keyof typeof rateLimiters

export function isRateLimitEnabled(): boolean {
  const enabled = !!redis
  if (!enabled && process.env.NODE_ENV === 'production') {
    logger.warn('Rate limiting disabled - UPSTASH_REDIS_REST_URL/TOKEN not configured', {
      type: 'rate_limit_warning',
      env: process.env.NODE_ENV,
    })
  }
  return enabled
}

export function getRateLimiter(type: RateLimiterType): Ratelimit | null {
  return rateLimiters[type]
}
