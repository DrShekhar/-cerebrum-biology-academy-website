/**
 * Cron Job Authentication Helper
 * SECURITY: Provides STRICT authentication for cron job endpoints
 *
 * This utility ensures:
 * 1. CRON_SECRET MUST be configured (no bypass)
 * 2. Authorization header MUST match exactly
 * 3. Works with Vercel Cron, external cron services, or manual triggers
 */

import { NextRequest, NextResponse } from 'next/server'

export interface CronAuthResult {
  authorized: boolean
  error?: string
}

/**
 * Verifies cron request authentication
 * STRICT MODE: Requires CRON_SECRET to be set AND header to match
 *
 * @param request - NextRequest object
 * @returns CronAuthResult with authorization status
 */
export function verifyCronAuth(request: NextRequest): CronAuthResult {
  const cronSecret = process.env.CRON_SECRET
  const authHeader = request.headers.get('authorization')

  // SECURITY: CRON_SECRET must be configured
  if (!cronSecret) {
    console.error('[CRON AUTH] CRITICAL: CRON_SECRET not configured')
    return {
      authorized: false,
      error: 'Cron configuration error - CRON_SECRET not set',
    }
  }

  // SECURITY: Authorization header must be present
  if (!authHeader) {
    return {
      authorized: false,
      error: 'Missing authorization header',
    }
  }

  // SECURITY: Header must match exactly
  if (authHeader !== `Bearer ${cronSecret}`) {
    return {
      authorized: false,
      error: 'Invalid cron secret',
    }
  }

  return { authorized: true }
}

/**
 * Creates unauthorized response for cron endpoints
 */
export function createCronUnauthorizedResponse(error: string): NextResponse {
  return NextResponse.json(
    { success: false, error },
    { status: 401 }
  )
}

/**
 * Creates configuration error response for cron endpoints
 */
export function createCronConfigErrorResponse(error: string): NextResponse {
  return NextResponse.json(
    { success: false, error },
    { status: 500 }
  )
}

/**
 * Middleware wrapper for cron endpoints
 * Use this to protect any cron job endpoint
 *
 * @example
 * export const GET = requireCronAuth(async (request) => {
 *   // Your cron job logic here
 *   return NextResponse.json({ success: true })
 * })
 */
export function requireCronAuth(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const authResult = verifyCronAuth(request)

    if (!authResult.authorized) {
      // Distinguish between config errors and auth failures
      if (authResult.error?.includes('not set')) {
        return createCronConfigErrorResponse(authResult.error)
      }
      return createCronUnauthorizedResponse(authResult.error || 'Unauthorized')
    }

    return handler(request)
  }
}
