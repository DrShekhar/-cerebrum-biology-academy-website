import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'

const updateCouponSchema = z.object({
  description: z.string().optional(),
  discountPercent: z.number().min(0).max(100).optional(),
  discountAmount: z.number().min(0).optional().nullable(),
  isActive: z.boolean().optional(),
  startsAt: z.string().optional().nullable(),
  expiresAt: z.string().optional().nullable(),
  maxUses: z.number().min(1).optional().nullable(),
  maxUsesPerUser: z.number().min(1).optional().nullable(),
  minOrderAmount: z.number().min(0).optional().nullable(),
  applicableCourseIds: z.array(z.string()).optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminAuth()
    const { id } = await params

    const coupon = await prisma.coupons.findUnique({
      where: { id },
      include: {
        redemptions: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
          orderBy: { createdAt: 'desc' },
          take: 50,
        },
      },
    })

    if (!coupon) {
      return NextResponse.json(
        { success: false, error: 'Coupon not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: coupon })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Fetch coupon error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch coupon' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminAuth()
    const { id } = await params

    const body = await request.json()
    const validatedData = updateCouponSchema.parse(body)

    const existing = await prisma.coupons.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Coupon not found' },
        { status: 404 }
      )
    }

    const updateData: Record<string, unknown> = {}
    if (validatedData.description !== undefined)
      updateData.description = validatedData.description
    if (validatedData.discountPercent !== undefined)
      updateData.discountPercent = validatedData.discountPercent
    if (validatedData.discountAmount !== undefined)
      updateData.discountAmount = validatedData.discountAmount
    if (validatedData.isActive !== undefined) updateData.isActive = validatedData.isActive
    if (validatedData.startsAt !== undefined)
      updateData.startsAt = validatedData.startsAt
        ? new Date(validatedData.startsAt)
        : null
    if (validatedData.expiresAt !== undefined)
      updateData.expiresAt = validatedData.expiresAt
        ? new Date(validatedData.expiresAt)
        : null
    if (validatedData.maxUses !== undefined) updateData.maxUses = validatedData.maxUses
    if (validatedData.maxUsesPerUser !== undefined)
      updateData.maxUsesPerUser = validatedData.maxUsesPerUser
    if (validatedData.minOrderAmount !== undefined)
      updateData.minOrderAmount = validatedData.minOrderAmount
    if (validatedData.applicableCourseIds !== undefined)
      updateData.applicableCourseIds = validatedData.applicableCourseIds

    const coupon = await prisma.coupons.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ success: true, data: coupon })
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
    console.error('Update coupon error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update coupon' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminAuth()
    const { id } = await params

    const existing = await prisma.coupons.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Coupon not found' },
        { status: 404 }
      )
    }

    await prisma.coupons.update({
      where: { id },
      data: { isActive: false },
    })

    return NextResponse.json({ success: true, message: 'Coupon deactivated' })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Delete coupon error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete coupon' },
      { status: 500 }
    )
  }
}
