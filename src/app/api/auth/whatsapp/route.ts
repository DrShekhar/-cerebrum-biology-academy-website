/**
 * WhatsApp OTP Authentication API
 *
 * POST /api/auth/whatsapp - Send or verify OTP
 * GET /api/auth/whatsapp - Get auth status
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  sendOTP,
  verifyOTP,
  resendOTP,
  getOTPStatus,
  cleanupExpiredOTPs,
} from '@/lib/auth/whatsappOTP'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, phone, otp, name } = body

    if (!phone) {
      return NextResponse.json(
        { success: false, error: 'Phone number is required' },
        { status: 400 }
      )
    }

    switch (action) {
      case 'send': {
        const result = await sendOTP(phone, name)
        return NextResponse.json(result, {
          status: result.success ? 200 : 400,
        })
      }

      case 'verify': {
        if (!otp) {
          return NextResponse.json(
            { success: false, error: 'OTP is required for verification' },
            { status: 400 }
          )
        }

        const result = await verifyOTP(phone, otp)

        if (result.success && result.token) {
          // Set auth cookie
          const response = NextResponse.json(result)
          response.cookies.set('auth_token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7 days
            path: '/',
          })
          return response
        }

        return NextResponse.json(result, {
          status: result.success ? 200 : 400,
        })
      }

      case 'resend': {
        const result = await resendOTP(phone, name)
        return NextResponse.json(result, {
          status: result.success ? 200 : 400,
        })
      }

      case 'status': {
        // Admin/debug endpoint - protect in production
        if (process.env.NODE_ENV === 'production') {
          const adminKey = request.headers.get('x-admin-key')
          if (adminKey !== process.env.AUTH_SECRET) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
          }
        }

        const status = getOTPStatus(phone)
        return NextResponse.json({
          success: true,
          phone,
          ...status,
        })
      }

      case 'cleanup': {
        // Admin/debug endpoint - protect in production
        if (process.env.NODE_ENV === 'production') {
          const adminKey = request.headers.get('x-admin-key')
          if (adminKey !== process.env.AUTH_SECRET) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
          }
        }

        const cleaned = cleanupExpiredOTPs()
        return NextResponse.json({
          success: true,
          message: `Cleaned up ${cleaned} expired OTPs`,
        })
      }

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action',
            validActions: ['send', 'verify', 'resend', 'status', 'cleanup'],
          },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('WhatsApp auth error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'WhatsApp OTP Authentication',
    status: 'active',
    features: [
      'Send OTP via WhatsApp',
      'Verify OTP',
      'Resend with cooldown',
      'Rate limiting (5/hour)',
      'Session management',
      'CRM tracking via Interakt',
    ],
    configuration: {
      otpExpiryMinutes: 5,
      maxVerifyAttempts: 3,
      resendCooldownSeconds: 60,
      maxOTPsPerHour: 5,
    },
    usage: {
      sendOTP: 'POST with action="send", phone, name (optional)',
      verifyOTP: 'POST with action="verify", phone, otp',
      resendOTP: 'POST with action="resend", phone, name (optional)',
    },
  })
}
