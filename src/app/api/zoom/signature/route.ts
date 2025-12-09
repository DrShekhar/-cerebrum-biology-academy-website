/**
 * Generate Zoom Meeting SDK Signature
 * POST /api/zoom/signature
 *
 * This endpoint generates a JWT signature required to join Zoom meetings
 * via the Meeting SDK. The SDK secret is kept server-side for security.
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  generateZoomSignature,
  isZoomSDKConfigured,
  getZoomSDKEnvConfig,
} from '@/lib/zoom/zoomSDKService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { meetingNumber, role = 0 } = body

    if (!meetingNumber) {
      return NextResponse.json(
        { success: false, error: 'Meeting number is required' },
        { status: 400 }
      )
    }

    // Check if SDK is configured
    if (!isZoomSDKConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Zoom SDK not configured',
          message: 'Please configure ZOOM_SDK_KEY and ZOOM_SDK_SECRET environment variables',
        },
        { status: 503 }
      )
    }

    const { sdkKey, sdkSecret } = getZoomSDKEnvConfig()

    // Generate signature
    const signature = generateZoomSignature(
      sdkKey,
      sdkSecret,
      meetingNumber.toString().replace(/\s/g, ''),
      role as 0 | 1
    )

    return NextResponse.json({
      success: true,
      signature,
      sdkKey,
      meetingNumber: meetingNumber.toString().replace(/\s/g, ''),
    })
  } catch (error) {
    console.error('Zoom signature error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate signature',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'Zoom Meeting SDK Signature',
    configured: isZoomSDKConfigured(),
    requiredEnvVars: {
      ZOOM_SDK_KEY: !!process.env.ZOOM_SDK_KEY,
      ZOOM_SDK_SECRET: !!process.env.ZOOM_SDK_SECRET,
    },
    usage: 'POST with { meetingNumber, role: 0|1 }',
  })
}
