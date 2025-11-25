/**
 * Invoice Download API Route
 * GET /api/student/payments/[id]/invoice - Download invoice PDF for a specific payment
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import {
  generateInvoiceHTML,
  generateInvoiceNumber,
  ACADEMY_DETAILS,
} from '@/lib/pdf/invoiceGenerator'
import { InvoiceData } from '@/types/payment'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please log in.' },
        { status: 401 }
      )
    }

    const paymentId = params.id
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'html'

    // Try to fetch from payments table first
    let payment = await prisma.payments.findFirst({
      where: {
        id: paymentId,
        userId: session.user.id,
      },
      include: {
        enrollments: {
          include: {
            courses: true,
          },
        },
      },
    })

    let invoiceData: InvoiceData | null = null

    if (payment) {
      // Enrollment-based payment
      invoiceData = {
        invoiceNumber: generateInvoiceNumber(payment.id, new Date(payment.createdAt)),
        invoiceDate: payment.createdAt,
        studentName: session.user.name || 'Student',
        studentEmail: session.user.email || '',
        studentPhone: session.user.profile?.phone || undefined,
        studentId: session.user.id,
        courseName: payment.enrollments?.courses?.name || 'Course',
        courseType: payment.enrollments?.courses?.type || undefined,
        paymentId: payment.id,
        transactionId: payment.transactionId || payment.razorpayPaymentId || undefined,
        amount: payment.amount,
        currency: payment.currency,
        paymentMethod: payment.paymentMethod,
        paymentDate: payment.completedAt || payment.createdAt,
        academyName: ACADEMY_DETAILS.name,
        academyAddress: ACADEMY_DETAILS.address,
        academyPhone: ACADEMY_DETAILS.phone,
        academyEmail: ACADEMY_DETAILS.email,
        academyGST: ACADEMY_DETAILS.gst || undefined,
        installmentNumber: payment.installmentNumber || undefined,
        totalInstallments: payment.totalInstallments || undefined,
        notes: 'Thank you for your payment. This invoice serves as a receipt for your records.',
      }
    } else {
      // Try fee_payments table
      const feePayment = await prisma.fee_payments.findFirst({
        where: {
          id: paymentId,
          fee_plans: {
            leads: {
              email: session.user.email,
            },
          },
        },
        include: {
          fee_plans: {
            include: {
              leads: true,
            },
          },
        },
      })

      if (!feePayment) {
        return NextResponse.json(
          { success: false, error: 'Payment not found or access denied.' },
          { status: 404 }
        )
      }

      const lead = feePayment.fee_plans.leads
      invoiceData = {
        invoiceNumber: generateInvoiceNumber(feePayment.id, new Date(feePayment.createdAt)),
        invoiceDate: feePayment.createdAt,
        studentName: lead.studentName || session.user.name || 'Student',
        studentEmail: lead.email || session.user.email || '',
        studentPhone: lead.phone || undefined,
        studentId: session.user.id,
        courseName: feePayment.fee_plans.courseName,
        courseType: feePayment.fee_plans.planType,
        paymentId: feePayment.id,
        transactionId: feePayment.razorpayPaymentId || undefined,
        amount: Number(feePayment.amount),
        currency: 'INR',
        paymentMethod: feePayment.paymentMethod,
        paymentDate: feePayment.paidAt || feePayment.createdAt,
        academyName: ACADEMY_DETAILS.name,
        academyAddress: ACADEMY_DETAILS.address,
        academyPhone: ACADEMY_DETAILS.phone,
        academyEmail: ACADEMY_DETAILS.email,
        academyGST: ACADEMY_DETAILS.gst || undefined,
        notes: 'Thank you for your payment. This invoice serves as a receipt for your records.',
      }
    }

    if (!invoiceData) {
      return NextResponse.json(
        { success: false, error: 'Unable to generate invoice data.' },
        { status: 500 }
      )
    }

    // Generate HTML
    const htmlContent = generateInvoiceHTML(invoiceData)

    if (format === 'json') {
      return NextResponse.json({
        success: true,
        data: {
          invoiceUrl: `/api/student/payments/${paymentId}/invoice`,
          invoiceData,
        },
      })
    }

    // Return HTML for browser to handle PDF conversion or printing
    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `inline; filename="invoice-${invoiceData.invoiceNumber}.html"`,
      },
    })
  } catch (error) {
    console.error('Error generating invoice:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate invoice. Please try again.',
      },
      { status: 500 }
    )
  }
}
