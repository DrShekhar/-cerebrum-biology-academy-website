import { NextRequest, NextResponse } from 'next/server'
import { checkTrialStatus, canTakeTest } from './trialManager'

export interface TrialMiddlewareOptions {
  requireActiveTrial?: boolean
  allowTestAccess?: boolean
  redirectOnExpired?: string
}

export async function withTrial(
  request: NextRequest,
  options: TrialMiddlewareOptions = {}
): Promise<NextResponse | null> {
  const { requireActiveTrial = true, allowTestAccess = false, redirectOnExpired } = options

  const freeUserId =
    request.headers.get('x-free-user-id') || request.cookies.get('freeUserId')?.value

  if (!freeUserId) {
    if (requireActiveTrial) {
      return NextResponse.json({ error: 'Free user ID required' }, { status: 401 })
    }
    return null
  }

  try {
    const trialStatus = await checkTrialStatus(freeUserId)

    if (!trialStatus) {
      return NextResponse.json({ error: 'Trial not found' }, { status: 404 })
    }

    if (requireActiveTrial && trialStatus.isExpired) {
      if (redirectOnExpired) {
        return NextResponse.redirect(new URL(redirectOnExpired, request.url))
      }
      return NextResponse.json(
        {
          error: 'Trial expired',
          trialStatus,
          upgradeRequired: true,
        },
        { status: 403 }
      )
    }

    if (allowTestAccess) {
      const testAccess = await canTakeTest(freeUserId)
      if (!testAccess.allowed) {
        return NextResponse.json(
          {
            error: 'Test access denied',
            reason: testAccess.reason,
            trialStatus,
          },
          { status: 403 }
        )
      }
    }

    const response = NextResponse.next()
    response.headers.set('X-Trial-Days-Remaining', trialStatus.daysRemaining.toString())
    response.headers.set('X-Trial-Tests-Remaining', trialStatus.testsRemaining.toString())
    response.headers.set('X-Trial-Urgency', trialStatus.urgencyLevel)
    response.headers.set('X-Trial-Expired', trialStatus.isExpired.toString())

    return null
  } catch (error) {
    console.error('Trial middleware error:', error)
    return NextResponse.json({ error: 'Trial check failed' }, { status: 500 })
  }
}

export function addTrialHeaders(response: NextResponse, trialStatus: any): NextResponse {
  response.headers.set('X-Trial-Days-Remaining', trialStatus.daysRemaining.toString())
  response.headers.set('X-Trial-Tests-Remaining', trialStatus.testsRemaining.toString())
  response.headers.set('X-Trial-Urgency', trialStatus.urgencyLevel)
  response.headers.set('X-Trial-Expired', trialStatus.isExpired.toString())
  return response
}
