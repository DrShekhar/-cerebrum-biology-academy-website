import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
  params: {
    id: string
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json()
    const { paidAmount, paymentMethod, razorpayPaymentId } = body

    const installmentId = params.id

    if (!paidAmount || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = await prisma.$transaction(async (tx) => {
      const installment = await tx.installment.findUnique({
        where: { id: installmentId },
        include: {
          feePlan: {
            include: {
              lead: true,
              installments: true,
            },
          },
        },
      })

      if (!installment) {
        throw new Error('Installment not found')
      }

      if (installment.status === 'PAID') {
        throw new Error('Installment already marked as paid')
      }

      const updatedInstallment = await tx.installment.update({
        where: { id: installmentId },
        data: {
          status: 'PAID',
          paidAt: new Date(),
        },
      })

      const feePayment = await tx.feePayment.create({
        data: {
          installmentId,
          amount: paidAmount,
          paymentMethod,
          razorpayPaymentId,
          status: 'COMPLETED',
          paidAt: new Date(),
        },
      })

      const updatedFeePlan = await tx.feePlan.update({
        where: { id: installment.feePlanId },
        data: {
          amountPaid: {
            increment: paidAmount,
          },
          amountDue: {
            decrement: paidAmount,
          },
        },
        include: {
          installments: true,
        },
      })

      const allPaid = updatedFeePlan.installments.every((inst) => inst.status === 'PAID')

      if (allPaid) {
        await tx.feePlan.update({
          where: { id: updatedFeePlan.id },
          data: {
            status: 'FULLY_PAID',
          },
        })

        await tx.lead.update({
          where: { id: installment.feePlan.leadId },
          data: {
            stage: 'ENROLLED',
          },
        })

        await tx.activity.create({
          data: {
            type: 'PAYMENT_RECEIVED',
            leadId: installment.feePlan.leadId,
            description: `Payment of ₹${paidAmount} received. Fee plan fully paid - Student enrolled!`,
            metadata: {
              installmentId,
              paymentId: feePayment.id,
              amount: paidAmount,
              paymentMethod,
              razorpayPaymentId,
            },
          },
        })
      } else {
        await tx.activity.create({
          data: {
            type: 'PAYMENT_RECEIVED',
            leadId: installment.feePlan.leadId,
            description: `Payment of ₹${paidAmount} received for installment #${installment.installmentNumber}`,
            metadata: {
              installmentId,
              paymentId: feePayment.id,
              amount: paidAmount,
              paymentMethod,
              razorpayPaymentId,
            },
          },
        })
      }

      return {
        installment: updatedInstallment,
        payment: feePayment,
        feePlan: updatedFeePlan,
        enrolled: allPaid,
      }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error marking payment as paid:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to mark payment as paid' },
      { status: 500 }
    )
  }
}
