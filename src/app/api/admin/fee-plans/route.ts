import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'
import { Decimal } from '@/generated/prisma/runtime/library'

const createFeePlanSchema = z.object({
  leadId: z.string().min(1),
  courseId: z.string().min(1),
  courseName: z.string().min(1),
  baseFee: z.number().min(0),
  discount: z.number().min(0).default(0),
  discountType: z.enum(['PERCENTAGE', 'FIXED_AMOUNT']).default('PERCENTAGE'),
  planType: z.string().min(1),
  startDate: z.string().min(1),
})

function calculateInstallments(
  totalFee: number,
  planType: string,
  startDate: Date
): { amount: number; dueDate: Date }[] {
  const installments: { amount: number; dueDate: Date }[] = []

  if (planType === 'FULL' || planType === 'full') {
    installments.push({ amount: totalFee, dueDate: startDate })
  } else if (planType === 'QUARTERLY' || planType === 'quarterly') {
    const count = 4
    const amount = Math.ceil(totalFee / count)
    for (let i = 0; i < count; i++) {
      const dueDate = new Date(startDate)
      dueDate.setMonth(dueDate.getMonth() + i * 3)
      installments.push({
        amount: i === count - 1 ? totalFee - amount * (count - 1) : amount,
        dueDate,
      })
    }
  } else if (planType === 'MONTHLY' || planType === 'monthly') {
    const count = 12
    const amount = Math.ceil(totalFee / count)
    for (let i = 0; i < count; i++) {
      const dueDate = new Date(startDate)
      dueDate.setMonth(dueDate.getMonth() + i)
      installments.push({
        amount: i === count - 1 ? totalFee - amount * (count - 1) : amount,
        dueDate,
      })
    }
  }

  return installments
}

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const leadId = searchParams.get('leadId')

    const where: Record<string, unknown> = {}
    if (status && status !== 'all') {
      where.status = status.toUpperCase()
    }
    if (leadId) {
      where.leadId = leadId
    }

    const feePlans = await prisma.fee_plans.findMany({
      where,
      include: {
        leads: { select: { id: true, studentName: true, phone: true } },
        installments: {
          select: {
            id: true,
            installmentNumber: true,
            amount: true,
            dueDate: true,
            status: true,
            paidAt: true,
          },
          orderBy: { installmentNumber: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    const stats = {
      total: feePlans.length,
      active: feePlans.filter((f) => f.status === 'PARTIAL' || f.status === 'PENDING')
        .length,
      overdueAmount: 0,
      collectedThisMonth: 0,
    }

    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

    for (const plan of feePlans) {
      for (const inst of plan.installments) {
        if (inst.status === 'OVERDUE' || (inst.status === 'PENDING' && inst.dueDate < now)) {
          stats.overdueAmount += Number(inst.amount)
        }
        if (inst.paidAt && inst.paidAt >= monthStart) {
          stats.collectedThisMonth += Number(inst.amount)
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        feePlans: feePlans.map((fp) => ({
          ...fp,
          baseFee: Number(fp.baseFee),
          discount: Number(fp.discount),
          totalFee: Number(fp.totalFee),
          amountPaid: Number(fp.amountPaid),
          amountDue: Number(fp.amountDue),
          installments: fp.installments.map((i) => ({
            ...i,
            amount: Number(i.amount),
          })),
        })),
        stats,
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Fetch fee plans error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch fee plans' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminAuth()

    const body = await request.json()
    const validatedData = createFeePlanSchema.parse(body)

    let totalFee = validatedData.baseFee
    if (validatedData.discountType === 'PERCENTAGE') {
      totalFee = validatedData.baseFee * (1 - validatedData.discount / 100)
    } else {
      totalFee = validatedData.baseFee - validatedData.discount
    }
    totalFee = Math.max(0, Math.round(totalFee))

    const startDate = new Date(validatedData.startDate)
    const installmentSchedule = calculateInstallments(
      totalFee,
      validatedData.planType,
      startDate
    )

    const feePlanId = uuidv4()

    const result = await prisma.$transaction(async (tx) => {
      const feePlan = await tx.fee_plans.create({
        data: {
          id: feePlanId,
          leadId: validatedData.leadId,
          courseId: validatedData.courseId,
          courseName: validatedData.courseName,
          baseFee: new Decimal(validatedData.baseFee),
          discount: new Decimal(validatedData.discount),
          discountType: validatedData.discountType as any,
          totalFee: new Decimal(totalFee),
          amountPaid: new Decimal(0),
          amountDue: new Decimal(totalFee),
          planType: validatedData.planType,
          numberOfInstallments: installmentSchedule.length,
          status: 'PENDING',
          createdById: session.user.id,
          updatedAt: new Date(),
        },
      })

      for (let i = 0; i < installmentSchedule.length; i++) {
        await tx.installments.create({
          data: {
            id: uuidv4(),
            feePlanId: feePlan.id,
            installmentNumber: i + 1,
            amount: new Decimal(installmentSchedule[i].amount),
            dueDate: installmentSchedule[i].dueDate,
            status: 'PENDING',
            updatedAt: new Date(),
          },
        })
      }

      return feePlan
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Fee plan created with installments',
        data: {
          ...result,
          baseFee: Number(result.baseFee),
          discount: Number(result.discount),
          totalFee: Number(result.totalFee),
          amountPaid: Number(result.amountPaid),
          amountDue: Number(result.amountDue),
        },
      },
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
    console.error('Create fee plan error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create fee plan' },
      { status: 500 }
    )
  }
}
