/**
 * LMS Device Management API
 *
 * GET - Get user's devices and access status
 * POST - Register device / Check access
 * DELETE - Revoke device access
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { prisma } from '@/lib/prisma'
import { deviceSecurityService } from '@/lib/lms/deviceSecurity'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    // Get user's devices
    const devices = await deviceSecurityService.getUserDevices(user.id)

    // Get device limits
    const limits = await prisma.user_device_limits.findUnique({
      where: { userId: user.id },
    })

    // Check for suspicious activity
    const suspiciousCheck = await deviceSecurityService.detectSuspiciousActivity(user.id)

    return NextResponse.json({
      success: true,
      devices,
      limits: {
        maxDevices: limits?.maxDevices || 2,
        activeDevices: limits?.activeDevices || 0,
        isRestricted: limits?.isRestricted || false,
        restrictedUntil: limits?.restrictedUntil,
        restrictedReason: limits?.restrictedReason,
      },
      securityAlert: suspiciousCheck.suspicious
        ? {
            suspicious: true,
            reasons: suspiciousCheck.reasons,
          }
        : null,
    })
  } catch (error) {
    console.error('Device GET error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    const { action, deviceSessionId, fingerprint, screenInfo, timezone, language } = body

    // Get request info
    const userAgent = request.headers.get('user-agent') || ''
    const ipAddress =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown'

    switch (action) {
      case 'register':
      case 'check_access': {
        // Generate device fingerprint
        const deviceFingerprint =
          fingerprint ||
          deviceSecurityService.generateDeviceFingerprint(userAgent, screenInfo, timezone, language)

        // Parse user agent
        const deviceParsed = deviceSecurityService.parseUserAgent(userAgent)

        // Check device access
        const result = await deviceSecurityService.checkDeviceAccess(user.id, {
          fingerprint: deviceFingerprint,
          deviceType: deviceParsed.deviceType,
          browser: deviceParsed.browser,
          os: deviceParsed.os,
          ipAddress,
          userAgent,
        })

        if (!result.allowed) {
          return NextResponse.json({
            success: false,
            error: result.error,
            requiresDeviceRevocation: result.requiresDeviceRevocation,
            activeDevices: result.activeDevices,
          })
        }

        return NextResponse.json({
          success: true,
          sessionToken: result.sessionToken,
          deviceSessionId: result.deviceSessionId,
          message: 'Device registered successfully',
        })
      }

      case 'verify_session': {
        const { sessionToken } = body

        if (!sessionToken) {
          return NextResponse.json(
            { success: false, error: 'sessionToken is required' },
            { status: 400 }
          )
        }

        const result = await deviceSecurityService.verifySession(sessionToken)

        return NextResponse.json({
          success: result.valid,
          userId: result.userId,
          deviceSessionId: result.deviceSessionId,
        })
      }

      case 'trust_device': {
        if (!deviceSessionId) {
          return NextResponse.json(
            { success: false, error: 'deviceSessionId is required' },
            { status: 400 }
          )
        }

        const success = await deviceSecurityService.trustDevice(user.id, deviceSessionId)

        return NextResponse.json({
          success,
          message: success ? 'Device trusted' : 'Device not found',
        })
      }

      case 'check_concurrent': {
        const { videoLectureId, currentDeviceId } = body

        if (!videoLectureId || !currentDeviceId) {
          return NextResponse.json(
            { success: false, error: 'videoLectureId and currentDeviceId are required' },
            { status: 400 }
          )
        }

        const result = await deviceSecurityService.checkConcurrentStream(
          user.id,
          videoLectureId,
          currentDeviceId
        )

        return NextResponse.json({
          success: result.allowed,
          error: result.error,
        })
      }

      case 'log_security_event': {
        const { eventType, severity, description, videoLectureId: videoId, evidence } = body

        if (!eventType || !description) {
          return NextResponse.json(
            { success: false, error: 'eventType and description are required' },
            { status: 400 }
          )
        }

        await deviceSecurityService.logSecurityEvent({
          userId: user.id,
          eventType,
          severity: severity || 'LOW',
          description,
          videoLectureId: videoId,
          ipAddress,
          userAgent,
          evidence,
        })

        return NextResponse.json({
          success: true,
          message: 'Security event logged',
        })
      }

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action',
            validActions: [
              'register',
              'check_access',
              'verify_session',
              'trust_device',
              'check_concurrent',
              'log_security_event',
            ],
          },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Device POST error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const deviceSessionId = searchParams.get('deviceSessionId')

    if (!deviceSessionId) {
      return NextResponse.json(
        { success: false, error: 'deviceSessionId is required' },
        { status: 400 }
      )
    }

    const success = await deviceSecurityService.revokeDevice(
      user.id,
      deviceSessionId,
      'User requested revocation'
    )

    if (!success) {
      return NextResponse.json({ success: false, error: 'Device not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Device access revoked',
    })
  } catch (error) {
    console.error('Device DELETE error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
