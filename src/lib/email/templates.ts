/**
 * Email Templates for CRM Communications
 * Professional, mobile-responsive HTML email templates
 */

interface LeadWelcomeData {
  studentName: string
  counselorName: string
  counselorPhone: string
  counselorEmail: string
  source: string
}

interface DemoConfirmationData {
  studentName: string
  demoDate: string
  demoTime: string
  meetingLink: string
  meetingPassword: string
  counselorName: string
}

interface OfferEmailData {
  studentName: string
  courseName: string
  originalPrice: number
  discountPercent: number
  finalPrice: number
  savings: number
  validUntil: string
  offerLink: string
  counselorName: string
}

interface PaymentReminderData {
  studentName: string
  installmentNumber: number
  amount: number
  dueDate: string
  paymentLink: string
  counselorName: string
  courseName: string
}

const baseStyles = `
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #2563eb, #9333ea);
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 30px 20px;
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background: linear-gradient(135deg, #2563eb, #9333ea);
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin: 20px 0;
    }
    .button:hover {
      opacity: 0.9;
    }
    .info-box {
      background-color: #f3f4f6;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .highlight-box {
      background: linear-gradient(135deg, #e0f2fe, #e9d5ff);
      border-left: 4px solid #2563eb;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .footer {
      background-color: #1f2937;
      color: #ffffff;
      padding: 20px;
      text-align: center;
      font-size: 14px;
    }
    .footer a {
      color: #60a5fa;
      text-decoration: none;
    }
    h2 {
      color: #1f2937;
      margin-top: 0;
    }
    p {
      color: #4b5563;
      line-height: 1.6;
      margin: 12px 0;
    }
    ul {
      color: #4b5563;
      line-height: 1.8;
    }
    .price {
      font-size: 32px;
      font-weight: 700;
      color: #2563eb;
    }
    .original-price {
      text-decoration: line-through;
      color: #9ca3af;
      font-size: 18px;
    }
    .savings {
      background-color: #dcfce7;
      color: #166534;
      padding: 4px 12px;
      border-radius: 20px;
      font-weight: 600;
      display: inline-block;
      margin: 8px 0;
    }
    @media only screen and (max-width: 600px) {
      .content {
        padding: 20px 15px;
      }
      .header h1 {
        font-size: 20px;
      }
      .button {
        display: block;
        text-align: center;
      }
    }
  </style>
`

export const emailTemplates = {
  /**
   * Welcome email for new leads
   */
  leadWelcome(data: LeadWelcomeData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Cerebrum Biology Academy</title>
          ${baseStyles}
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Cerebrum Biology Academy! 🎉</h1>
            </div>

            <div class="content">
              <h2>Hi ${data.studentName}!</h2>
              <p>Thank you for your interest in Cerebrum Biology Academy. We're excited to help you achieve your NEET dreams!</p>

              <div class="highlight-box">
                <h3 style="margin-top: 0; color: #2563eb;">Your Dedicated Counselor</h3>
                <p><strong>Name:</strong> ${data.counselorName}</p>
                <p><strong>Phone:</strong> <a href="tel:${data.counselorPhone}">${data.counselorPhone}</a></p>
                <p><strong>Email:</strong> <a href="mailto:${data.counselorEmail}">${data.counselorEmail}</a></p>
              </div>

              <p><strong>What's Next?</strong></p>
              <ul>
                <li>Your counselor will contact you within 2 hours</li>
                <li>We'll discuss your learning goals and requirements</li>
                <li>Schedule a FREE demo class to experience our teaching</li>
                <li>Get a personalized learning plan</li>
              </ul>

              <div class="info-box">
                <h4 style="margin-top: 0; color: #1f2937;">Why Cerebrum Biology Academy?</h4>
                <ul>
                  <li>✅ AIIMS & Top Medical College Faculty</li>
                  <li>✅ Personalized 1-on-1 Attention</li>
                  <li>✅ Comprehensive Study Material</li>
                  <li>✅ Regular Tests & Performance Analysis</li>
                  <li>✅ 24/7 Doubt Resolution</li>
                </ul>
              </div>

              <p style="text-align: center;">
                <a href="https://wa.me/${data.counselorPhone.replace(/[^0-9]/g, '')}" class="button">
                  Chat with Your Counselor on WhatsApp
                </a>
              </p>

              <p style="margin-top: 30px;">Looking forward to being part of your NEET success story!</p>
              <p><strong>Team Cerebrum</strong></p>
            </div>

            <div class="footer">
              <p>Cerebrum Biology Academy</p>
              <p>📞 +91 88264 44334 | 🌐 <a href="https://cerebrumbiologyacademy.com">cerebrumbiologyacademy.com</a></p>
              <p style="font-size: 12px; color: #9ca3af; margin-top: 10px;">
                You're receiving this because you expressed interest in our courses via ${data.source}.
              </p>
            </div>
          </div>
        </body>
      </html>
    `
  },

  /**
   * Demo class confirmation email
   */
  demoConfirmation(data: DemoConfirmationData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Demo Class Confirmed</title>
          ${baseStyles}
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Demo Class Confirmed! 📚</h1>
            </div>

            <div class="content">
              <h2>Hi ${data.studentName}!</h2>
              <p>Your FREE NEET Biology demo class has been successfully scheduled.</p>

              <div class="highlight-box">
                <h3 style="margin-top: 0; color: #2563eb;">Class Details</h3>
                <p><strong>📅 Date:</strong> ${data.demoDate}</p>
                <p><strong>🕐 Time:</strong> ${data.demoTime}</p>
                <p><strong>⏱️ Duration:</strong> 60 minutes</p>
                <p><strong>👩‍🏫 Faculty:</strong> Dr. Priya Sharma (AIIMS Graduate)</p>
              </div>

              <div class="info-box">
                <h4 style="margin-top: 0; color: #1f2937;">Meeting Link & Password</h4>
                <p><strong>Join URL:</strong><br>
                <a href="${data.meetingLink}" style="word-break: break-all;">${data.meetingLink}</a></p>
                <p><strong>Password:</strong> <code style="background: #e5e7eb; padding: 4px 8px; border-radius: 4px; font-family: monospace;">${data.meetingPassword}</code></p>
              </div>

              <p style="text-align: center;">
                <a href="${data.meetingLink}" class="button">
                  Join Demo Class
                </a>
              </p>

              <div class="info-box">
                <h4 style="margin-top: 0; color: #1f2937;">What to Prepare:</h4>
                <ul>
                  <li>📔 Notebook and pen for taking notes</li>
                  <li>❓ Your biology questions and doubts</li>
                  <li>🎯 NEET preparation goals</li>
                  <li>🔇 Quiet environment for the class</li>
                </ul>
              </div>

              <p><strong>Join link will also be sent via WhatsApp 30 minutes before the class.</strong></p>

              <p style="margin-top: 30px;">See you in class!</p>
              <p><strong>${data.counselorName}</strong><br>Your Counselor</p>
            </div>

            <div class="footer">
              <p>Cerebrum Biology Academy</p>
              <p>📞 +91 88264 44334 | 🌐 <a href="https://cerebrumbiologyacademy.com">cerebrumbiologyacademy.com</a></p>
            </div>
          </div>
        </body>
      </html>
    `
  },

  /**
   * Course offer email
   */
  courseOffer(data: OfferEmailData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Special Offer for You!</title>
          ${baseStyles}
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Special Offer Just for You! 🎁</h1>
            </div>

            <div class="content">
              <h2>Hi ${data.studentName}!</h2>
              <p>Thank you for attending our demo class! We're excited to offer you an exclusive discount on <strong>${data.courseName}</strong>.</p>

              <div class="highlight-box" style="text-align: center;">
                <h3 style="margin-top: 0; color: #2563eb;">Limited Time Offer</h3>
                <p class="original-price">₹${data.originalPrice.toLocaleString('en-IN')}</p>
                <p class="price">₹${data.finalPrice.toLocaleString('en-IN')}</p>
                <p class="savings">Save ₹${data.savings.toLocaleString('en-IN')} (${data.discountPercent}% OFF)</p>
                <p style="color: #dc2626; font-weight: 600; margin-top: 10px;">⏰ Offer valid until ${data.validUntil}</p>
              </div>

              <div class="info-box">
                <h4 style="margin-top: 0; color: #1f2937;">What's Included:</h4>
                <ul>
                  <li>✅ Complete NEET Biology Curriculum</li>
                  <li>✅ Live Interactive Classes</li>
                  <li>✅ Comprehensive Study Material (PDF + Videos)</li>
                  <li>✅ Weekly Tests & Performance Analysis</li>
                  <li>✅ 24/7 Doubt Resolution Support</li>
                  <li>✅ Previous Year Question Bank</li>
                  <li>✅ Personalized Study Plan</li>
                </ul>
              </div>

              <div class="info-box" style="background: linear-gradient(135deg, #dcfce7, #d1fae5);">
                <h4 style="margin-top: 0; color: #166534;">🎯 Special Bonus</h4>
                <p>Enroll now and get:</p>
                <ul style="color: #166534;">
                  <li>✨ Free access to our mobile app</li>
                  <li>✨ One month of premium doubt-solving</li>
                  <li>✨ Exclusive NEET strategy webinar</li>
                </ul>
              </div>

              <p style="text-align: center;">
                <a href="${data.offerLink}" class="button">
                  View Full Offer & Enroll Now
                </a>
              </p>

              <p style="margin-top: 30px;"><strong>Have questions?</strong> Reply to this email or contact your counselor ${data.counselorName} directly.</p>

              <p>Don't miss this opportunity to join India's top Biology coaching program!</p>
              <p><strong>Team Cerebrum</strong></p>
            </div>

            <div class="footer">
              <p>Cerebrum Biology Academy</p>
              <p>📞 +91 88264 44334 | 🌐 <a href="https://cerebrumbiologyacademy.com">cerebrumbiologyacademy.com</a></p>
            </div>
          </div>
        </body>
      </html>
    `
  },

  /**
   * Payment reminder email
   */
  paymentReminder(data: PaymentReminderData): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Reminder</title>
          ${baseStyles}
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Payment Reminder 💳</h1>
            </div>

            <div class="content">
              <h2>Hi ${data.studentName}!</h2>
              <p>This is a friendly reminder that your installment payment for <strong>${data.courseName}</strong> is due soon.</p>

              <div class="highlight-box">
                <h3 style="margin-top: 0; color: #2563eb;">Payment Details</h3>
                <p><strong>Installment #${data.installmentNumber}</strong></p>
                <p class="price">₹${data.amount.toLocaleString('en-IN')}</p>
                <p><strong>Due Date:</strong> ${data.dueDate}</p>
              </div>

              <p style="text-align: center;">
                <a href="${data.paymentLink}" class="button">
                  Pay Now Securely
                </a>
              </p>

              <div class="info-box">
                <h4 style="margin-top: 0; color: #1f2937;">Payment Methods Available:</h4>
                <ul>
                  <li>💳 Credit/Debit Card</li>
                  <li>🏦 Net Banking</li>
                  <li>📱 UPI (PhonePe, Google Pay, Paytm)</li>
                  <li>💰 Wallets</li>
                </ul>
                <p style="margin-top: 15px;"><small>All transactions are secured with 256-bit encryption via Razorpay.</small></p>
              </div>

              <p><strong>Need help or want to discuss your payment plan?</strong></p>
              <p>Contact your counselor ${data.counselorName} - we're always here to help!</p>

              <p style="margin-top: 30px;">Thank you for being part of the Cerebrum family!</p>
              <p><strong>Team Cerebrum</strong></p>
            </div>

            <div class="footer">
              <p>Cerebrum Biology Academy</p>
              <p>📞 +91 88264 44334 | 🌐 <a href="https://cerebrumbiologyacademy.com">cerebrumbiologyacademy.com</a></p>
            </div>
          </div>
        </body>
      </html>
    `
  },
}

export type EmailTemplate = keyof typeof emailTemplates
