import { NextRequest, NextResponse } from 'next/server'
import { withCounselor } from '@/lib/auth/middleware'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { Decimal } from '@prisma/client/runtime/library'

const installmentSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  dueDate: z.string().min(1, 'Due date is required'),
})

const createFeePlanSchema = z.object({
  leadId: z.string().min(1, 'Lead ID is required'),
  courseId: z.string().min(1, 'Course ID is required'),
  courseName: z.string().min(1, 'Course name is required'),
  baseFee: z.number().positive('Base fee must be positive'),
  discount: z.number().min(0, 'Discount cannot be negative').optional().default(0),
  discountType: z.enum(['PERCENTAGE', 'FLAT']).optional().default('PERCENTAGE'),
  planType: z.string().min(1, 'Plan type is required'),
  numberOfInstallments: z.number().int().positive('Number of installments must be positive'),
  installments: z.array(installmentSchema).min(1, 'At least one installment is required'),
})

async function handleGET(request: NextRequest, session: any) {
  try {
    const { searchParams } = new URL(request.url)
    const leadId = searchParams.get('leadId')
    const status = searchParams.get('status')

    const where: any = {
      lead: {
        assignedToId: session.userId,
      },
    }

    if (leadId) {
      where.leadId = leadId
    }

    if (status) {
      where.status = status
    }

    const feePlans = await prisma.fee_plans.findMany({
      where,
      include: {
        leads: {
          select: {
            id: true,
            studentName: true,
            email: true,
            phone: true,
            stage: true,
          },
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        installments: {
          orderBy: { dueDate: 'asc' },
        },
        fee_payments: {
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            installments: true,
            fee_payments: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: feePlans.map(({ leads, users, fee_payments, ...rest }) => ({
        ...rest,
        lead: leads,
        createdBy: users,
        payments: fee_payments,
      })),
      count: feePlans.length,
    })
  } catch (error) {
    console.error('Error fetching fee plans:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch fee plans',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

async function handlePOST(request: NextRequest, session: any) {
  try {
    const body = await request.json()
    const validatedData = createFeePlanSchema.parse(body)

    const lead = await prisma.leads.findUnique({
      where: { id: validatedData.leadId },
      select: { assignedToId: true, studentName: true },
    })

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          error: 'Lead not found',
        },
        { status: 404 }
      )
    }

    if (lead.assignedToId !== session.userId && session.role !== 'ADMIN') {
      return NextResponse.json(
        {
          success: false,
          error: 'Access denied',
        },
        { status: 403 }
      )
    }

    let discountAmount = 0
    if (validatedData.discountType === 'PERCENTAGE') {
      discountAmount = (validatedData.baseFee * validatedData.discount) / 100
    } else {
      discountAmount = validatedData.discount
    }

    const totalFee = validatedData.baseFee - discountAmount
    const installmentSum = validatedData.installments.reduce((sum, inst) => sum + inst.amount, 0)

    if (Math.abs(installmentSum - totalFee) > 0.01) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          message: 'Sum of installments must equal total fee',
        },
        { status: 400 }
      )
    }

    const feePlan = await prisma.fee_plans.create({
      data: {
        id: `feeplan_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        leadId: validatedData.leadId,
        courseId: validatedData.courseId,
        courseName: validatedData.courseName,
        baseFee: new Decimal(validatedData.baseFee),
        discount: new Decimal(validatedData.discount),
        discountType: validatedData.discountType === 'FLAT' ? 'FIXED_AMOUNT' : 'PERCENTAGE',
        totalFee: new Decimal(totalFee),
        amountDue: new Decimal(totalFee),
        planType: validatedData.planType,
        numberOfInstallments: validatedData.numberOfInstallments,
        status: 'PENDING',
        createdById: session.userId,
        updatedAt: new Date(),
        installments: {
          create: validatedData.installments.map((inst, index) => ({
            id: `inst_${Date.now()}_${index}_${Math.random().toString(36).slice(2, 9)}`,
            installmentNumber: index + 1,
            amount: new Decimal(inst.amount),
            dueDate: new Date(inst.dueDate),
            status: 'PENDING' as const,
            updatedAt: new Date(),
          })),
        },
      },
      include: {
        leads: {
          select: {
            id: true,
            studentName: true,
          },
        },
        installments: {
          orderBy: { dueDate: 'asc' },
        },
      },
    })

    await prisma.leads.update({
      where: { id: validatedData.leadId },
      data: {
        stage: 'PAYMENT_PLAN_CREATED',
      },
    })

    await prisma.activities.create({
      data: {
        id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        userId: session.userId,
        leadId: validatedData.leadId,
        action: 'FEE_PLAN_CREATED',
        description: `Created fee plan for ${feePlan.courseName} - ₹${totalFee} in ${validatedData.numberOfInstallments} installments`,
      },
    })

    const { leads: feePlanLead, ...feePlanRest } = feePlan
    return NextResponse.json(
      {
        success: true,
        data: { ...feePlanRest, lead: feePlanLead },
        message: 'Fee plan created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    console.error('Error creating fee plan:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create fee plan',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export const GET = withCounselor(handleGET)
export const POST = withCounselor(handlePOST)
