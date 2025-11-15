import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit } from '@/lib/rateLimit'
import { prisma } from '@/lib/prisma'

const referralValidationSchema = z.object({
  code: z.string().min(1).max(50).trim().toUpperCase(),
})

const referralRedemptionSchema = z.object({
  code: z.string().min(1).max(50).trim(),
  redeemedBy: z.string().min(2).max(100),
  redeemedByEmail: z.string().email(),
  bookingId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request, { maxRequests: 20, windowMs: 60 * 60 * 1000 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          valid: false,
          message: 'Too many requests. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
          },
        }
      )
    }

    const rawBody = await request.json()
    const validationResult = referralValidationSchema.safeParse(rawBody)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          valid: false,
          message: 'Invalid referral code format',
          details: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    const { code } = validationResult.data

    if (!code) {
      return NextResponse.json(
        { valid: false, message: 'Referral code is required' },
        { status: 400 }
      )
    }

    const referralCode = await prisma.referralCode.findUnique({
      where: { code: code.toUpperCase().trim() },
    })

    if (!referralCode) {
      return NextResponse.json({
        valid: false,
        message: 'Invalid referral code',
      })
    }

    if (referralCode.uses >= referralCode.maxUses) {
      return NextResponse.json({
        valid: false,
        message: 'This referral code has reached its maximum usage limit',
      })
    }

    if (referralCode.expiresAt && new Date() > referralCode.expiresAt) {
      return NextResponse.json({
        valid: false,
        message: 'This referral code has expired',
      })
    }

    return NextResponse.json({
      valid: true,
      discount: referralCode.discount,
      message: `Congratulations! You'll get ₹${referralCode.discount} off!`,
      code: referralCode.code,
      usesRemaining: referralCode.maxUses - referralCode.uses,
    })
  } catch (error) {
    console.error('Referral code validation error:', error)
    return NextResponse.json(
      {
        valid: false,
        message: 'Failed to validate referral code',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request, { maxRequests: 10, windowMs: 60 * 60 * 1000 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many redemption requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
          },
        }
      )
    }

    const rawBody = await request.json()
    const validationResult = referralRedemptionSchema.safeParse(rawBody)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid redemption data',
          details: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    const { code, redeemedBy, redeemedByEmail, bookingId } = validationResult.data

    if (!code || !redeemedBy || !redeemedByEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const referralCode = await prisma.referralCode.findUnique({
      where: { code: code.toUpperCase().trim() },
    })

    if (!referralCode) {
      return NextResponse.json({ error: 'Referral code not found' }, { status: 404 })
    }

    if (referralCode.uses >= referralCode.maxUses) {
      return NextResponse.json({ error: 'Referral code usage limit exceeded' }, { status: 400 })
    }

    const existingRedemption = await prisma.referralRedemption.findFirst({
      where: {
        referralCodeId: referralCode.id,
        redeemedByEmail: redeemedByEmail,
      },
    })

    if (existingRedemption) {
      return NextResponse.json(
        {
          error: 'You have already used this referral code',
          message: 'Each user can only use a referral code once',
        },
        { status: 400 }
      )
    }

    await prisma.$transaction([
      prisma.referralCode.update({
        where: { id: referralCode.id },
        data: { uses: { increment: 1 } },
      }),
      prisma.referralRedemption.create({
        data: {
          referralCodeId: referralCode.id,
          redeemedBy,
          redeemedByEmail,
          discountGiven: referralCode.discount,
          bookingId: bookingId || null,
        },
      }),
    ])

    console.log('Referral code redeemed:', {
      code: referralCode.code,
      redeemedBy,
      discount: referralCode.discount,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Referral code applied successfully',
      discount: referralCode.discount,
    })
  } catch (error) {
    console.error('Referral code redemption error:', error)
    return NextResponse.json(
      {
        error: 'Failed to redeem referral code',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    )
  }
}
