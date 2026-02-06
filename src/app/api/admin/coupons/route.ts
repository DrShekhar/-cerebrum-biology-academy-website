import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'

const createCouponSchema = z.object({
  code: z.string().min(3).max(50).toUpperCase(),
  description: z.string().optional(),
  discountPercent: z.number().min(0).max(100).default(0),
  discountAmount: z.number().min(0).optional(),
  isActive: z.boolean().default(true),
  startsAt: z.string().optional(),
  expiresAt: z.string().optional(),
  maxUses: z.number().min(1).optional(),
  maxUsesPerUser: z.number().min(1).optional(),
  minOrderAmount: z.number().min(0).optional(),
  applicableCourseIds: z.array(z.string()).default([]),
})

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const status = searchParams.get('status')

    const where: Record<string, unknown> = {}

    if (search) {
      where.OR = [
        { code: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (status === 'active') {
      where.isActive = true
    } else if (status === 'inactive') {
      where.isActive = false
    }

    const coupons = await prisma.coupons.findMany({
      where,
      include: {
        _count: { select: { redemptions: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    const totalRedemptions = await prisma.coupon_redemptions.count()
    const totalDiscount = await prisma.coupon_redemptions.aggregate({
      _sum: { discountAmount: true },
    })

    return NextResponse.json({
      success: true,
      data: {
        coupons: coupons.map((c) => ({
          ...c,
          redemptionCount: c._count.redemptions,
          _count: undefined,
        })),
        stats: {
          total: coupons.length,
          active: coupons.filter((c) => c.isActive).length,
          totalRedemptions,
          totalDiscountGiven: totalDiscount._sum.discountAmount || 0,
        },
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Fetch coupons error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch coupons' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminAuth()

    const body = await request.json()
    const validatedData = createCouponSchema.parse(body)

    const existing = await prisma.coupons.findUnique({
      where: { code: validatedData.code },
    })

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Coupon code already exists' },
        { status: 409 }
      )
    }

    const coupon = await prisma.coupons.create({
      data: {
        code: validatedData.code,
        description: validatedData.description || null,
        discountPercent: validatedData.discountPercent,
        discountAmount: validatedData.discountAmount || null,
        isActive: validatedData.isActive,
        startsAt: validatedData.startsAt ? new Date(validatedData.startsAt) : null,
        expiresAt: validatedData.expiresAt ? new Date(validatedData.expiresAt) : null,
        maxUses: validatedData.maxUses || null,
        maxUsesPerUser: validatedData.maxUsesPerUser || null,
        minOrderAmount: validatedData.minOrderAmount || null,
        applicableCourseIds: validatedData.applicableCourseIds,
        createdBy: session.user.id,
      },
    })

    return NextResponse.json(
      { success: true, message: 'Coupon created', data: coupon },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Create coupon error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create coupon' },
      { status: 500 }
    )
  }
}
