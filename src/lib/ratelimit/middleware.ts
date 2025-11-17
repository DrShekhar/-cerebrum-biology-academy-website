import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { getRateLimiter, isRateLimitEnabled, type RateLimiterType } from './config'
import logger from '@/lib/utils'

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
  identifier: string
}

export function getIdentifier(request: NextRequest, userId?: string): string {
  if (userId) {
    return `user:${userId}`
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown'

  return `ip:${ip}`
}

export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<RateLimitResult> {
  if (!limiter || !isRateLimitEnabled()) {
    return {
      success: true,
      limit: Infinity,
      remaining: Infinity,
      reset: 0,
      identifier,
    }
  }

  try {
    const result = await limiter.limit(identifier)

    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
      identifier,
    }
  } catch (error) {
    logger.error('Rate limit check failed', error as Error, {
      type: 'rate_limit_error',
      identifier,
    })

    return {
      success: true,
      limit: 0,
      remaining: 0,
      reset: 0,
      identifier,
    }
  }
}

export function createRateLimitResponse(result: RateLimitResult): NextResponse {
  const resetDate = new Date(result.reset)
  const retryAfter = Math.ceil((result.reset - Date.now()) / 1000)

  logger.rateLimitHit(result.identifier, 'unknown', result.limit)

  return NextResponse.json(
    {
      error: 'Too many requests',
      message: `Rate limit exceeded. Try again after ${resetDate.toISOString()}`,
      retryAfter,
      limit: result.limit,
      remaining: 0,
      reset: result.reset,
    },
    {
      status: 429,
      headers: {
        'X-RateLimit-Limit': result.limit.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': result.reset.toString(),
        'Retry-After': retryAfter.toString(),
      },
    }
  )
}

export function withRateLimit<T>(
  handler: (request: NextRequest, context?: any) => Promise<NextResponse>,
  limiterType: RateLimiterType,
  options: {
    getUserId?: (request: NextRequest, context?: any) => Promise<string | undefined>
    skipCheck?: (request: NextRequest, context?: any) => Promise<boolean>
  } = {}
) {
  return async (request: NextRequest, context?: any): Promise<NextResponse> => {
    const { getUserId, skipCheck } = options

    if (skipCheck && (await skipCheck(request, context))) {
      return handler(request, context)
    }

    const userId = getUserId ? await getUserId(request, context) : undefined
    const identifier = getIdentifier(request, userId)

    const limiter = getRateLimiter(limiterType)
    const result = await checkRateLimit(limiter, identifier)

    if (!result.success) {
      return createRateLimitResponse(result)
    }

    const response = await handler(request, context)

    response.headers.set('X-RateLimit-Limit', result.limit.toString())
    response.headers.set('X-RateLimit-Remaining', result.remaining.toString())
    response.headers.set('X-RateLimit-Reset', result.reset.toString())

    return response
  }
}

export async function checkMultipleRateLimits(
  request: NextRequest,
  checks: Array<{
    limiterType: RateLimiterType
    identifier?: string
  }>
): Promise<RateLimitResult | null> {
  for (const check of checks) {
    const identifier = check.identifier || getIdentifier(request)
    const limiter = getRateLimiter(check.limiterType)
    const result = await checkRateLimit(limiter, identifier)

    if (!result.success) {
      return result
    }
  }

  return null
}
