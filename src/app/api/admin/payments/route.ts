import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

export async function GET(request: NextRequest) {
  try {
    await requireAdminAuth()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const method = searchParams.get('method')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit

    const where: Record<string, unknown> = {}

    if (status && status !== 'all') {
      if (status === 'refunded') {
        where.refundAmount = { gt: 0 }
      } else {
        where.status = status.toUpperCase()
      }
    }

    if (method && method !== 'all') {
      where.paymentMethod = method.toUpperCase()
    }

    if (search) {
      where.OR = [
        { transactionId: { contains: search, mode: 'insensitive' } },
        { razorpayPaymentId: { contains: search, mode: 'insensitive' } },
        { users: { name: { contains: search, mode: 'insensitive' } } },
        { users: { email: { contains: search, mode: 'insensitive' } } },
      ]
    }

    const [payments, total] = await Promise.all([
      prisma.payments.findMany({
        where,
        include: {
          users: { select: { id: true, name: true, email: true, phone: true } },
          enrollments: {
            select: { id: true, courses: { select: { id: true, name: true } } },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.payments.count({ where }),
    ])

    const stats = await prisma.payments.aggregate({
      _sum: { amount: true, refundAmount: true },
      _count: true,
    })

    const statusCounts = await prisma.payments.groupBy({
      by: ['status'],
      _count: true,
      _sum: { amount: true },
    })

    const refundedCount = await prisma.payments.count({
      where: { refundAmount: { gt: 0 } },
    })

    return NextResponse.json({
      success: true,
      data: {
        payments,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
        stats: {
          totalRevenue: stats._sum.amount || 0,
          totalRefunded: stats._sum.refundAmount || 0,
          totalCount: stats._count,
          statusCounts: statusCounts.reduce(
            (acc, s) => ({ ...acc, [s.status]: { count: s._count, amount: s._sum.amount || 0 } }),
            {} as Record<string, { count: number; amount: number }>
          ),
          refundedCount,
        },
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Fetch payments error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch payments' }, { status: 500 })
  }
}

const createPaymentSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  enrollmentId: z.string().optional(),
  amount: z.number().min(100, 'Amount must be at least 100'),
  paymentMethod: z.enum([
    'RAZORPAY_UPI',
    'RAZORPAY_CARD',
    'RAZORPAY_NETBANKING',
    'RAZORPAY_WALLET',
    'BANK_TRANSFER',
    'CASH',
    'CHEQUE',
  ]),
  status: z
    .enum(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED'])
    .default('COMPLETED'),
  transactionId: z.string().optional(),
  installmentNumber: z.number().min(1).optional(),
  totalInstallments: z.number().min(1).optional(),
  notes: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth()

    const body = await request.json()
    const validatedData = createPaymentSchema.parse(body)

    const userExists = await prisma.users.findUnique({
      where: { id: validatedData.userId },
    })

    if (!userExists) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    if (validatedData.enrollmentId) {
      const enrollmentExists = await prisma.enrollments.findUnique({
        where: { id: validatedData.enrollmentId },
      })

      if (!enrollmentExists) {
        return NextResponse.json({ success: false, error: 'Enrollment not found' }, { status: 404 })
      }
    }

    const payment = await prisma.payments.create({
      data: {
        id: uuidv4(),
        userId: validatedData.userId,
        enrollmentId: validatedData.enrollmentId || null,
        amount: validatedData.amount,
        status: validatedData.status as any,
        paymentMethod: validatedData.paymentMethod as any,
        transactionId: validatedData.transactionId || null,
        installmentNumber: validatedData.installmentNumber || null,
        totalInstallments: validatedData.totalInstallments || null,
        completedAt: validatedData.status === 'COMPLETED' ? new Date() : null,
        updatedAt: new Date(),
      },
    })

    if (validatedData.notes) {
      await prisma.activities.create({
        data: {
          id: uuidv4(),
          userId: validatedData.userId,
          action: 'payment_added',
          description: `Manual payment of ₹${validatedData.amount} added by admin`,
          metadata: {
            paymentId: payment.id,
            amount: validatedData.amount,
            method: validatedData.paymentMethod,
            status: validatedData.status,
            notes: validatedData.notes,
          },
        },
      })
    } else {
      await prisma.activities.create({
        data: {
          id: uuidv4(),
          userId: validatedData.userId,
          action: 'payment_added',
          description: `Manual payment of ₹${validatedData.amount} added by admin`,
          metadata: {
            paymentId: payment.id,
            amount: validatedData.amount,
            method: validatedData.paymentMethod,
            status: validatedData.status,
          },
        },
      })
    }

    return NextResponse.json(
      { success: true, message: 'Payment added successfully', data: payment },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create payment error:', error)

    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

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

    return NextResponse.json({ success: false, error: 'Failed to create payment' }, { status: 500 })
  }
}
