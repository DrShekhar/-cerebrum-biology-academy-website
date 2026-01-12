/**
 * Invoice PDF Generator
 * Generates professional invoice PDFs for student payments
 */

import { InvoiceData } from '@/types/payment'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

/**
 * Generate invoice HTML content
 */
export function generateInvoiceHTML(invoiceData: InvoiceData): string {
  const {
    invoiceNumber,
    invoiceDate,
    studentName,
    studentEmail,
    studentPhone,
    courseName,
    courseType,
    amount,
    currency,
    paymentMethod,
    paymentDate,
    transactionId,
    academyName,
    academyAddress,
    academyPhone,
    academyEmail,
    academyGST,
    installmentNumber,
    totalInstallments,
    notes,
  } = invoiceData

  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency || 'INR',
  }).format(amount)

  const formattedDate = new Date(invoiceDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const formattedPaymentDate = new Date(paymentDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice ${invoiceNumber}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Arial', sans-serif;
      font-size: 14px;
      line-height: 1.6;
      color: #333;
      padding: 40px;
      background-color: #f5f5f5;
    }

    .invoice-container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 3px solid #2563eb;
    }

    .academy-info {
      flex: 1;
    }

    .academy-name {
      font-size: 24px;
      font-weight: bold;
      color: #2563eb;
      margin-bottom: 10px;
    }

    .academy-details {
      font-size: 12px;
      color: #666;
    }

    .invoice-title {
      text-align: right;
      flex: 0 0 auto;
    }

    .invoice-title h1 {
      font-size: 32px;
      color: #2563eb;
      margin-bottom: 5px;
    }

    .invoice-number {
      font-size: 14px;
      color: #666;
    }

    .info-section {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
    }

    .info-box {
      flex: 1;
    }

    .info-box h3 {
      font-size: 14px;
      color: #2563eb;
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    .info-box p {
      margin: 5px 0;
      font-size: 13px;
    }

    .payment-details {
      margin: 40px 0;
      background: #f8fafc;
      padding: 30px;
      border-radius: 8px;
    }

    .payment-details h2 {
      color: #2563eb;
      margin-bottom: 20px;
      font-size: 18px;
    }

    .payment-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    .payment-table th {
      background: #2563eb;
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: 600;
    }

    .payment-table td {
      padding: 12px;
      border-bottom: 1px solid #e5e7eb;
    }

    .payment-table tr:last-child td {
      border-bottom: none;
    }

    .amount-total {
      text-align: right;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #2563eb;
    }

    .amount-total .label {
      font-size: 18px;
      color: #666;
      margin-right: 20px;
    }

    .amount-total .value {
      font-size: 28px;
      font-weight: bold;
      color: #2563eb;
    }

    .payment-status {
      display: inline-block;
      padding: 8px 20px;
      background: #10b981;
      color: white;
      border-radius: 20px;
      font-weight: 600;
      margin-top: 20px;
    }

    .notes {
      margin-top: 40px;
      padding: 20px;
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      border-radius: 4px;
    }

    .notes h4 {
      color: #92400e;
      margin-bottom: 10px;
    }

    .notes p {
      color: #78350f;
      font-size: 13px;
    }

    .footer {
      margin-top: 60px;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #666;
      font-size: 12px;
    }

    .footer p {
      margin: 5px 0;
    }

    @media print {
      body {
        background: white;
        padding: 0;
      }

      .invoice-container {
        box-shadow: none;
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <!-- Header -->
    <div class="header">
      <div class="academy-info">
        <div class="academy-name">${academyName}</div>
        <div class="academy-details">
          <p>${academyAddress}</p>
          <p>Phone: ${academyPhone}</p>
          <p>Email: ${academyEmail}</p>
          ${academyGST ? `<p>GST: ${academyGST}</p>` : ''}
        </div>
      </div>
      <div class="invoice-title">
        <h1>INVOICE</h1>
        <div class="invoice-number">${invoiceNumber}</div>
        <div class="invoice-number">${formattedDate}</div>
      </div>
    </div>

    <!-- Info Section -->
    <div class="info-section">
      <div class="info-box">
        <h3>Bill To:</h3>
        <p><strong>${studentName}</strong></p>
        <p>${studentEmail}</p>
        ${studentPhone ? `<p>${studentPhone}</p>` : ''}
      </div>
      <div class="info-box">
        <h3>Course Details:</h3>
        <p><strong>${courseName}</strong></p>
        ${courseType ? `<p>Type: ${courseType}</p>` : ''}
        ${installmentNumber && totalInstallments ? `<p>Installment: ${installmentNumber} of ${totalInstallments}</p>` : ''}
      </div>
    </div>

    <!-- Payment Details -->
    <div class="payment-details">
      <h2>Payment Information</h2>
      <table class="payment-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Payment Date</strong></td>
            <td>${formattedPaymentDate}</td>
          </tr>
          <tr>
            <td><strong>Payment Method</strong></td>
            <td>${paymentMethod}</td>
          </tr>
          ${
            transactionId
              ? `
          <tr>
            <td><strong>Transaction ID</strong></td>
            <td>${transactionId}</td>
          </tr>
          `
              : ''
          }
          <tr>
            <td><strong>Amount Paid</strong></td>
            <td><strong>${formattedAmount}</strong></td>
          </tr>
        </tbody>
      </table>

      <div class="amount-total">
        <span class="label">Total Amount:</span>
        <span class="value">${formattedAmount}</span>
      </div>

      <div style="text-align: center;">
        <span class="payment-status">PAID</span>
      </div>
    </div>

    <!-- Notes -->
    ${
      notes
        ? `
    <div class="notes">
      <h4>Important Notes:</h4>
      <p>${notes}</p>
    </div>
    `
        : ''
    }

    <!-- Footer -->
    <div class="footer">
      <p><strong>Thank you for your payment!</strong></p>
      <p>This is a computer-generated invoice and does not require a signature.</p>
      <p>For any queries, please contact us at ${academyEmail} or call ${academyPhone}</p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

/**
 * Generate invoice number based on payment ID and date
 */
export function generateInvoiceNumber(paymentId: string, date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const shortId = paymentId.slice(0, 8).toUpperCase()
  return `INV-${year}${month}-${shortId}`
}

/**
 * Academy default details
 */
export const ACADEMY_DETAILS = {
  name: 'Cerebrum Biology Academy',
  address: 'India',
  phone: CONTACT_INFO.phone.display.hyphenated.primary,
  email: 'help@cerebrumbiologyacademy.com',
  gst: '',
  logo: '',
}
