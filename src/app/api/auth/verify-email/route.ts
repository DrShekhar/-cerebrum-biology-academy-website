import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { addSecurityHeaders, AuthRateLimit } from '@/lib/auth/config'
import crypto from 'crypto'

/**
 * GET /api/auth/verify-email?token=xxx
 * Verify email address using token
 */
export async function GET(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const clientIP = forwardedFor
    ? forwardedFor.split(',')[0].trim()
    : request.headers.get('x-real-ip') || 'unknown'

  try {
    // Rate limit verification attempts
    const rateLimitCheck = await AuthRateLimit.checkRateLimit(`verify-email-check:${clientIP}`)
    if (!rateLimitCheck.allowed) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Too many verification attempts',
            message: 'Please try again later',
            lockoutEndsAt: rateLimitCheck.lockoutEndsAt,
          },
          { status: 429 }
        )
      )
    }

    const token = request.nextUrl.searchParams.get('token')

    if (!token) {
      return addSecurityHeaders(
        NextResponse.json(
          { error: 'Verification token is required' },
          { status: 400 }
        )
      )
    }

    // Find the verification token
    const verificationToken = await prisma.email_verification_tokens.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!verificationToken) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Invalid verification token',
            message: 'This verification link is invalid or has already been used.',
          },
          { status: 400 }
        )
      )
    }

    // Check if token has expired
    if (verificationToken.expiresAt < new Date()) {
      // Delete expired token
      await prisma.email_verification_tokens.delete({
        where: { id: verificationToken.id },
      })

      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Verification link expired',
            message: 'This verification link has expired. Please request a new one.',
            expired: true,
          },
          { status: 400 }
        )
      )
    }

    // Check if already verified
    if (verificationToken.verified) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Email already verified',
            message: 'Your email has already been verified.',
          },
          { status: 400 }
        )
      )
    }

    // Use constant-time comparison to prevent timing attacks
    const tokenBuffer = Buffer.from(token)
    const storedBuffer = Buffer.from(verificationToken.token)
    if (tokenBuffer.length !== storedBuffer.length || !crypto.timingSafeEqual(tokenBuffer, storedBuffer)) {
      return addSecurityHeaders(
        NextResponse.json(
          { error: 'Invalid verification token' },
          { status: 400 }
        )
      )
    }

    // Verify the email in a transaction
    await prisma.$transaction(async (tx) => {
      // Update user's emailVerified field
      await tx.users.update({
        where: { id: verificationToken.userId },
        data: { emailVerified: new Date() },
      })

      // Mark token as verified
      await tx.email_verification_tokens.update({
        where: { id: verificationToken.id },
        data: { verified: true },
      })
    })

    // Reset rate limit on success
    AuthRateLimit.resetRateLimit(`verify-email-check:${clientIP}`)

    console.log(`✅ Email verified for user ${verificationToken.userId}`)

    // Return success - the frontend will show a success message
    return addSecurityHeaders(
      NextResponse.json({
        success: true,
        message: 'Email verified successfully! You can now sign in.',
        email: verificationToken.email,
      })
    )
  } catch (error) {
    console.error('Email verification error:', error)
    return addSecurityHeaders(
      NextResponse.json(
        { error: 'Failed to verify email. Please try again.' },
        { status: 500 }
      )
    )
  }
}

/**
 * POST /api/auth/verify-email
 * Alternative endpoint for verifying via POST (for API consumers)
 */
export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const clientIP = forwardedFor
    ? forwardedFor.split(',')[0].trim()
    : request.headers.get('x-real-ip') || 'unknown'

  try {
    // Rate limit verification attempts
    const rateLimitCheck = await AuthRateLimit.checkRateLimit(`verify-email-check:${clientIP}`)
    if (!rateLimitCheck.allowed) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Too many verification attempts',
            message: 'Please try again later',
            lockoutEndsAt: rateLimitCheck.lockoutEndsAt,
          },
          { status: 429 }
        )
      )
    }

    const body = await request.json()
    const { token } = body

    if (!token) {
      return addSecurityHeaders(
        NextResponse.json(
          { error: 'Verification token is required' },
          { status: 400 }
        )
      )
    }

    // Find the verification token
    const verificationToken = await prisma.email_verification_tokens.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!verificationToken) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Invalid verification token',
            message: 'This verification link is invalid or has already been used.',
          },
          { status: 400 }
        )
      )
    }

    // Check if token has expired
    if (verificationToken.expiresAt < new Date()) {
      // Delete expired token
      await prisma.email_verification_tokens.delete({
        where: { id: verificationToken.id },
      })

      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Verification link expired',
            message: 'This verification link has expired. Please request a new one.',
            expired: true,
          },
          { status: 400 }
        )
      )
    }

    // Check if already verified
    if (verificationToken.verified) {
      return addSecurityHeaders(
        NextResponse.json(
          {
            error: 'Email already verified',
            message: 'Your email has already been verified.',
          },
          { status: 400 }
        )
      )
    }

    // Use constant-time comparison to prevent timing attacks
    const tokenBuffer = Buffer.from(token)
    const storedBuffer = Buffer.from(verificationToken.token)
    if (tokenBuffer.length !== storedBuffer.length || !crypto.timingSafeEqual(tokenBuffer, storedBuffer)) {
      return addSecurityHeaders(
        NextResponse.json(
          { error: 'Invalid verification token' },
          { status: 400 }
        )
      )
    }

    // Verify the email in a transaction
    await prisma.$transaction(async (tx) => {
      // Update user's emailVerified field
      await tx.users.update({
        where: { id: verificationToken.userId },
        data: { emailVerified: new Date() },
      })

      // Mark token as verified
      await tx.email_verification_tokens.update({
        where: { id: verificationToken.id },
        data: { verified: true },
      })
    })

    // Reset rate limit on success
    AuthRateLimit.resetRateLimit(`verify-email-check:${clientIP}`)

    console.log(`✅ Email verified for user ${verificationToken.userId}`)

    return addSecurityHeaders(
      NextResponse.json({
        success: true,
        message: 'Email verified successfully! You can now sign in.',
        email: verificationToken.email,
      })
    )
  } catch (error) {
    console.error('Email verification error:', error)
    return addSecurityHeaders(
      NextResponse.json(
        { error: 'Failed to verify email. Please try again.' },
        { status: 500 }
      )
    )
  }
}
