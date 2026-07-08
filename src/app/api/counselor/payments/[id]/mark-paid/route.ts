import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { withCounselor } from '@/lib/auth/middleware'
import type { UserSession } from '@/lib/auth/config'
import { WebhookService } from '@/lib/webhooks/webhookService'
import { counselorCanAccessInstallment } from '@/lib/leads/access'

interface RouteParams {
  params: {
    id: string
  }
}

async function handlePOST(request: NextRequest, session: UserSession, { params }: RouteParams) {
  try {
    const body = await request.json()
    const { paidAmount, paymentMethod, razorpayPaymentId } = body

    const installmentId = params.id

    if (!paidAmount || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Ownership gate: a counselor may only settle installments on their own
    // leads (ADMIN bypasses). Prevents cross-counselor payment + force-enroll.
    if (!(await counselorCanAccessInstallment(installmentId, session.userId, session.role))) {
      return NextResponse.json(
        { error: 'This installment is not on a lead assigned to you' },
        { status: 403 }
      )
    }

    const result = await prisma.$transaction(async (tx) => {
      const installment = await tx.installments.findUnique({
        where: { id: installmentId },
        include: {
          fee_plans: {
            include: {
              leads: {
                select: {
                  id: true,
                  studentName: true,
                  email: true,
                  phone: true,
                  courseInterest: true,
                  stage: true,
                  priority: true,
                },
              },
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

      const updatedInstallment = await tx.installments.update({
        where: { id: installmentId },
        data: {
          status: 'PAID',
          paidAt: new Date(),
        },
      })

      const feePayment = await tx.fee_payments.create({
        data: {
          id: `feepay_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
          feePlanId: installment.feePlanId,
          installmentId,
          amount: paidAmount,
          paymentMethod,
          razorpayPaymentId,
          status: 'COMPLETED',
          paidAt: new Date(),
        },
      })

      const updatedFeePlan = await tx.fee_plans.update({
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
        await tx.fee_plans.update({
          where: { id: updatedFeePlan.id },
          data: {
            status: 'COMPLETED',
          },
        })

        await tx.leads.update({
          where: { id: installment.fee_plans.leadId },
          data: {
            stage: 'ENROLLED',
          },
        })

        await tx.activities.create({
          data: {
            id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
            userId: session.userId!,
            action: 'PAYMENT_RECEIVED',
            leadId: installment.fee_plans.leadId,
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
        await tx.activities.create({
          data: {
            id: `act_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
            userId: session.userId!,
            action: 'PAYMENT_RECEIVED',
            leadId: installment.fee_plans.leadId,
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
        lead: installment.fee_plans.leads,
      }
    })

    // Dispatch payment.received webhook
    try {
      if (result.lead) {
        await WebhookService.onPaymentReceived(
          {
            id: result.lead.id,
            studentName: result.lead.studentName,
            email: result.lead.email,
            phone: result.lead.phone,
            courseInterest: result.lead.courseInterest,
            stage: result.lead.stage,
            priority: result.lead.priority,
          },
          {
            id: result.payment.id,
            installmentId: result.installment.id,
            amount: paidAmount,
            paymentMethod,
            razorpayPaymentId,
            status: 'COMPLETED',
            paidAt: result.payment.paidAt,
            feePlanId: result.feePlan.id,
            enrolled: result.enrolled,
          }
        )
      }
    } catch (webhookError) {
      console.error('Failed to dispatch payment.received webhook:', webhookError)
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error marking payment as paid:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to mark payment as paid' },
      { status: 500 }
    )
  }
}

export const POST = withCounselor(handlePOST)
