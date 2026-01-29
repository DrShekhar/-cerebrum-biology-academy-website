import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { renderToBuffer } from '@react-pdf/renderer'
import React from 'react'
import { ReceiptPDF, ReceiptData } from '@/lib/pdf/ReceiptPDF'
import { validateUserSession } from '@/lib/auth/config'

export async function GET(request: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    // SECURITY: Validate user session before returning receipt
    const session = await validateUserSession(request)
    if (!session.valid || !session.userId) {
      return NextResponse.json(
        { error: 'Authentication required to access receipts' },
        { status: 401 }
      )
    }

    const { orderId } = params

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    // Get payment details with related data
    const payment = await prisma.payments.findFirst({
      where: { razorpayOrderId: orderId },
      include: {
        user: true,
        enrollment: {
          include: {
            course: true,
          },
        },
      },
    })

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    // SECURITY: Verify ownership - user can only access their own receipts
    // Admins can access any receipt
    if (payment.userId !== session.userId && session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'You are not authorized to access this receipt' },
        { status: 403 }
      )
    }

    if (payment.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 })
    }

    // Generate PDF receipt data
    const receiptData: ReceiptData = {
      receiptNumber: `CBA-${payment.id.substring(0, 8).toUpperCase()}`,
      date:
        payment.completedAt?.toLocaleDateString('en-IN') || new Date().toLocaleDateString('en-IN'),
      customerName: payment.user.name,
      customerEmail: payment.user.email,
      customerPhone: payment.user.phone || 'N/A',
      courseName: payment.enrollment?.course.name || 'Course',
      orderId: payment.razorpayOrderId || 'N/A',
      paymentId: payment.razorpayPaymentId || 'N/A',
      amount: payment.amount / 100,
      currency: payment.currency,
      paymentMethod: payment.paymentMethod.replace('RAZORPAY_', ''),
      gst: Math.round((payment.amount / 100) * 0.18 * 100) / 100,
      subtotal: Math.round((payment.amount / 118) * 100) / 100,
    }

    // Check if user wants HTML or PDF
    const format = request.nextUrl.searchParams.get('format')

    if (format === 'html') {
      // Create HTML receipt for preview
      const htmlReceipt = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Payment Receipt - ${receiptData.receiptNumber}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      color: #333;
    }
    .header {
      text-align: center;
      border-bottom: 3px solid #16a34a;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #16a34a;
      margin-bottom: 10px;
    }
    .receipt-title {
      font-size: 24px;
      color: #666;
      margin-top: 10px;
    }
    .receipt-number {
      font-size: 14px;
      color: #999;
      margin-top: 5px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 14px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 5px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #f3f4f6;
    }
    .info-label {
      color: #666;
      font-weight: 500;
    }
    .info-value {
      color: #333;
      text-align: right;
    }
    .amount-section {
      background: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      margin-top: 20px;
    }
    .amount-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
    }
    .total-row {
      border-top: 2px solid #16a34a;
      margin-top: 10px;
      padding-top: 10px;
      font-size: 18px;
      font-weight: bold;
      color: #16a34a;
    }
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #999;
      font-size: 12px;
    }
    .status-badge {
      display: inline-block;
      background: #d1fae5;
      color: #065f46;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
    }
    @media print {
      body {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Cerebrum Biology Academy</div>
    <div style="color: #666; font-size: 14px; margin-bottom: 15px;">
      NEET Biology Excellence Since 2020
    </div>
    <div class="receipt-title">Payment Receipt</div>
    <div class="receipt-number">Receipt No: ${receiptData.receiptNumber}</div>
    <div style="margin-top: 10px;">
      <span class="status-badge">✓ PAID</span>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Customer Information</div>
    <div class="info-row">
      <span class="info-label">Name</span>
      <span class="info-value">${receiptData.customerName}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Email</span>
      <span class="info-value">${receiptData.customerEmail}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Phone</span>
      <span class="info-value">${receiptData.customerPhone}</span>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Course Details</div>
    <div class="info-row">
      <span class="info-label">Course Name</span>
      <span class="info-value">${receiptData.courseName}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Enrollment Status</span>
      <span class="info-value">Active</span>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Payment Information</div>
    <div class="info-row">
      <span class="info-label">Payment Date</span>
      <span class="info-value">${receiptData.date}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Order ID</span>
      <span class="info-value">${receiptData.orderId}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Payment ID</span>
      <span class="info-value">${receiptData.paymentId}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Payment Method</span>
      <span class="info-value">${receiptData.paymentMethod}</span>
    </div>
  </div>

  <div class="amount-section">
    <div class="amount-row">
      <span>Subtotal (excluding GST)</span>
      <span>₹${receiptData.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
    </div>
    <div class="amount-row">
      <span>GST @ 18%</span>
      <span>₹${receiptData.gst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
    </div>
    <div class="amount-row total-row">
      <span>Total Amount Paid</span>
      <span>₹${receiptData.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
    </div>
  </div>

  <div class="footer">
    <p><strong>Cerebrum Biology Academy</strong></p>
    <p>Email: support@cerebrumbiologyacademy.com | Phone: +91-8826444334</p>
    <p>Website: www.cerebrumbiologyacademy.com</p>
    <p style="margin-top: 20px;">Thank you for choosing Cerebrum Biology Academy!</p>
    <p style="margin-top: 10px; font-size: 11px;">
      This is a computer-generated receipt and does not require a signature.
    </p>
  </div>

  <script>
    // Auto-print functionality (optional)
    // window.print();
  </script>
</body>
</html>
`

      // Return HTML for preview
      return new NextResponse(htmlReceipt, {
        headers: {
          'Content-Type': 'text/html',
          'Content-Disposition': `inline; filename="Receipt-${receiptData.receiptNumber}.html"`,
        },
      })
    }

    // Generate PDF using react-pdf - ReceiptPDF returns a Document element
    const pdfBuffer = await renderToBuffer(
      React.createElement(ReceiptPDF, { data: receiptData }) as React.ReactElement<any>
    )

    // Return PDF
    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Receipt-${receiptData.receiptNumber}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error('Receipt generation error:', error)
    return NextResponse.json(
      {
        error: 'Failed to generate receipt',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
