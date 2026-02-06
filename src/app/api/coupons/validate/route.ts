import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rateLimit'
import { validateUserSession } from '@/lib/auth/config'

const validateCouponSchema = z.object({
  code: z.string().min(1),
  orderAmount: z.number().min(0),
  courseId: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request, {
      maxRequests: 30,
      windowMs: 60 * 60 * 1000,
    })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests' },
        { status: 429 }
      )
    }

    const session = await validateUserSession(request)
    if (!session.valid || !session.userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { code, orderAmount, courseId } = validateCouponSchema.parse(body)

    const coupon = await prisma.coupons.findUnique({
      where: { code: code.toUpperCase() },
    })

    if (!coupon) {
      return NextResponse.json(
        { success: false, error: 'Invalid coupon code' },
        { status: 404 }
      )
    }

    if (!coupon.isActive) {
      return NextResponse.json(
        { success: false, error: 'This coupon is no longer active' },
        { status: 400 }
      )
    }

    const now = new Date()
    if (coupon.startsAt && now < coupon.startsAt) {
      return NextResponse.json(
        { success: false, error: 'This coupon is not yet valid' },
        { status: 400 }
      )
    }
    if (coupon.expiresAt && now > coupon.expiresAt) {
      return NextResponse.json(
        { success: false, error: 'This coupon has expired' },
        { status: 400 }
      )
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json(
        { success: false, error: 'This coupon has reached its usage limit' },
        { status: 400 }
      )
    }

    if (coupon.maxUsesPerUser) {
      const userRedemptions = await prisma.coupon_redemptions.count({
        where: { couponId: coupon.id, userId: session.userId },
      })
      if (userRedemptions >= coupon.maxUsesPerUser) {
        return NextResponse.json(
          { success: false, error: 'You have already used this coupon' },
          { status: 400 }
        )
      }
    }

    if (coupon.minOrderAmount && orderAmount < coupon.minOrderAmount) {
      return NextResponse.json(
        {
          success: false,
          error: `Minimum order amount is ₹${coupon.minOrderAmount.toLocaleString('en-IN')}`,
        },
        { status: 400 }
      )
    }

    if (
      courseId &&
      coupon.applicableCourseIds.length > 0 &&
      !coupon.applicableCourseIds.includes(courseId)
    ) {
      return NextResponse.json(
        { success: false, error: 'This coupon is not applicable for this course' },
        { status: 400 }
      )
    }

    let discountAmount = 0
    if (coupon.discountAmount && coupon.discountAmount > 0) {
      discountAmount = coupon.discountAmount
    } else if (coupon.discountPercent > 0) {
      discountAmount = Math.round((orderAmount * coupon.discountPercent) / 100)
    }

    discountAmount = Math.min(discountAmount, orderAmount)

    return NextResponse.json({
      success: true,
      data: {
        couponId: coupon.id,
        code: coupon.code,
        discountPercent: coupon.discountPercent,
        discountAmount,
        finalAmount: orderAmount - discountAmount,
        description: coupon.description,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data' },
        { status: 400 }
      )
    }
    console.error('Validate coupon error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to validate coupon' },
      { status: 500 }
    )
  }
}
