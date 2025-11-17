import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

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
