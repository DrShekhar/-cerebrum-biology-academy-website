import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { Decimal } from '@/generated/prisma/runtime/library'

const updateFeePlanSchema = z.object({
  discount: z.number().min(0).optional(),
  discountType: z.enum(['PERCENTAGE', 'FIXED_AMOUNT']).optional(),
  status: z.enum(['PENDING', 'PARTIAL', 'COMPLETED', 'CANCELLED']).optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminAuth()
    const { id } = await params

    const feePlan = await prisma.fee_plans.findUnique({
      where: { id },
      include: {
        leads: { select: { id: true, studentName: true, phone: true, email: true } },
        installments: {
          orderBy: { installmentNumber: 'asc' },
        },
      },
    })

    if (!feePlan) {
      return NextResponse.json(
        { success: false, error: 'Fee plan not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        ...feePlan,
        baseFee: Number(feePlan.baseFee),
        discount: Number(feePlan.discount),
        totalFee: Number(feePlan.totalFee),
        amountPaid: Number(feePlan.amountPaid),
        amountDue: Number(feePlan.amountDue),
        installments: feePlan.installments.map((i) => ({
          ...i,
          amount: Number(i.amount),
          paidAmount: i.paidAmount ? Number(i.paidAmount) : null,
        })),
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Fetch fee plan error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch fee plan' },
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
    const validatedData = updateFeePlanSchema.parse(body)

    const existing = await prisma.fee_plans.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Fee plan not found' },
        { status: 404 }
      )
    }

    const updateData: Record<string, unknown> = { updatedAt: new Date() }

    if (validatedData.status) {
      updateData.status = validatedData.status
    }
    if (validatedData.discount !== undefined) {
      updateData.discount = new Decimal(validatedData.discount)
      const baseFee = Number(existing.baseFee)
      const discountType = validatedData.discountType || existing.discountType
      let totalFee: number
      if (discountType === 'PERCENTAGE') {
        totalFee = baseFee * (1 - validatedData.discount / 100)
      } else {
        totalFee = baseFee - validatedData.discount
      }
      totalFee = Math.max(0, Math.round(totalFee))
      updateData.totalFee = new Decimal(totalFee)
      updateData.amountDue = new Decimal(
        Math.max(0, totalFee - Number(existing.amountPaid))
      )
    }
    if (validatedData.discountType) {
      updateData.discountType = validatedData.discountType
    }

    const feePlan = await prisma.fee_plans.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      data: {
        ...feePlan,
        baseFee: Number(feePlan.baseFee),
        discount: Number(feePlan.discount),
        totalFee: Number(feePlan.totalFee),
        amountPaid: Number(feePlan.amountPaid),
        amountDue: Number(feePlan.amountDue),
      },
    })
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
    console.error('Update fee plan error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update fee plan' },
      { status: 500 }
    )
  }
}
