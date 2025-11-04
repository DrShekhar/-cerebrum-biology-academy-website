import { NextRequest, NextResponse } from 'next/server'
import { initializeTrial, generateDeviceId } from '@/lib/trial/trialManager'
import { trackTrialEvent } from '@/lib/trial/analytics'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      deviceId: providedDeviceId,
      email,
      name,
      grade,
      curriculum,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body

    const deviceId = providedDeviceId || (await generateDeviceId())

    const trialStatus = await initializeTrial({
      deviceId,
      email,
      name,
      grade,
      curriculum,
    })

    await trackTrialEvent({
      eventName: 'trial_started',
      freeUserId: trialStatus.freeUserId,
      properties: {
        deviceId,
        grade,
        curriculum,
        utmSource,
        utmMedium,
        utmCampaign,
      },
    })

    const response = NextResponse.json({
      success: true,
      freeUserId: trialStatus.freeUserId,
      trialStatus,
    })

    response.cookies.set('freeUserId', trialStatus.freeUserId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    })

    return response
  } catch (error) {
    console.error('Guest user creation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to create guest user',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
