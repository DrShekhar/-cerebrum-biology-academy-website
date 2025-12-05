import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'

interface ContactInquiry {
  name: string
  phone: string
  email: string
  center: string
  supportType: string
  message: string
  timestamp: string
  source: string
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 inquiries per hour per IP
    const rateLimitResult = await rateLimit(request, { maxRequests: 5, windowMs: 60 * 60 * 1000 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many inquiries. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
          },
        }
      )
    }

    const data: ContactInquiry = await request.json()

    // Validate required fields
    if (!data.name || !data.phone || !data.email || !data.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate phone number (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(data.phone.replace(/[^\d]/g, '').slice(-10))) {
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Generate inquiry ID
    const inquiryId = `INQ_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Map center IDs to names
    const centerNames = {
      'south-delhi': 'South Delhi Center',
      rohini: 'Rohini Center',
      gurugram: 'Gurugram Center',
    }

    // Map support types to departments
    const supportDepartments = {
      academic: 'Academic Support Team',
      admission: 'Admission Counselors',
      technical: 'Technical Support Team',
      counseling: 'Counseling Department',
    }

    // Prepare inquiry data for storage
    const inquiryData = {
      id: inquiryId,
      ...data,
      centerName: centerNames[data.center as keyof typeof centerNames] || data.center,
      department:
        supportDepartments[data.supportType as keyof typeof supportDepartments] ||
        'General Support',
      createdAt: new Date().toISOString(),
      status: 'new',
      priority:
        data.supportType === 'technical'
          ? 'high'
          : data.supportType === 'counseling'
            ? 'medium'
            : 'normal',
    }

    console.log('New contact inquiry:', inquiryData)

    // In a real application, you would:
    // 1. Save to database (Prisma/MongoDB/etc.)
    // 2. Send to CRM (Salesforce/HubSpot/etc.)
    // 3. Trigger email notifications to relevant department
    // 4. Send confirmation email to user
    // 5. Create WhatsApp notification for urgent inquiries

    // Simulate database save
    // await prisma.contactInquiry.create({ data: inquiryData })

    // Send immediate response based on support type
    await sendInquiryResponse(data)

    // Notify relevant department
    await notifyDepartment(inquiryData)

    // Send confirmation email to user
    await sendUserConfirmation(data)

    return NextResponse.json({
      success: true,
      inquiryId,
      message:
        'Your inquiry has been submitted successfully. We will respond within our committed timeframe.',
      responseTime: getResponseTime(data.supportType),
    })
  } catch (error) {
    console.error('Error processing contact inquiry:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Simulate inquiry response based on support type
async function sendInquiryResponse(data: ContactInquiry) {
  const responses = {
    academic: `Hi ${data.name}! Thank you for your academic inquiry. Our Biology experts will review your questions and respond within 2 hours with detailed guidance.`,
    admission: `Hi ${data.name}! Thank you for your interest in Cerebrum Biology Academy. Our admission counselor will call you within 1 hour to discuss course options, fees, and available batches.`,
    technical: `Hi ${data.name}! We've received your technical support request. Our tech team will resolve your issue within 30 minutes. You'll receive step-by-step solutions via WhatsApp.`,
    counseling: `Hi ${data.name}! Thank you for reaching out for counseling support. Our experienced counselor will schedule a session with you today to provide personalized guidance.`,
  }

  const response =
    responses[data.supportType as keyof typeof responses] ||
    `Hi ${data.name}! Thank you for contacting Cerebrum Biology Academy. We'll get back to you soon.`

  // In real implementation, send WhatsApp message
  console.log('WhatsApp response to be sent:', response)

  return true
}

// Simulate department notification
async function notifyDepartment(inquiryData: any) {
  const notifications = {
    academic: {
      email: 'academic@cerebrumbiologyacademy.com',
      subject: `New Academic Inquiry - ${inquiryData.name}`,
      priority: 'normal',
    },
    admission: {
      email: 'admissions@cerebrumbiologyacademy.com',
      subject: `New Admission Inquiry - ${inquiryData.name}`,
      priority: 'high',
    },
    technical: {
      email: 'tech@cerebrumbiologyacademy.com',
      subject: `Urgent: Technical Issue - ${inquiryData.name}`,
      priority: 'urgent',
    },
    counseling: {
      email: 'counseling@cerebrumbiologyacademy.com',
      subject: `Counseling Request - ${inquiryData.name}`,
      priority: 'medium',
    },
  }

  const notification = notifications[inquiryData.supportType as keyof typeof notifications]

  console.log('Department notification:', {
    to: notification?.email,
    subject: notification?.subject,
    data: inquiryData,
  })

  return true
}

// Simulate user confirmation email
async function sendUserConfirmation(data: ContactInquiry) {
  const emailContent = {
    to: data.email,
    subject: 'Inquiry Received - Cerebrum Biology Academy',
    html: `
      <h2>Dear ${data.name},</h2>
      <p>Thank you for contacting Cerebrum Biology Academy. We have received your inquiry and will respond soon.</p>

      <h3>Your Inquiry Details:</h3>
      <ul>
        <li><strong>Support Type:</strong> ${data.supportType}</li>
        <li><strong>Preferred Center:</strong> ${data.center}</li>
        <li><strong>Contact Number:</strong> ${data.phone}</li>
        <li><strong>Inquiry ID:</strong> ${Date.now()}</li>
      </ul>

      <h3>Expected Response Time:</h3>
      <p>${getResponseTime(data.supportType)}</p>

      <p>For immediate assistance:</p>
      <ul>
        <li>WhatsApp: +91 88264 44334</li>
        <li>Call: +91 88264 44334</li>
        <li>Email: support@cerebrumbiologyacademy.com</li>
      </ul>

      <p>Best regards,<br>Cerebrum Biology Academy Team</p>
    `,
  }

  console.log('User confirmation email:', emailContent)
  return true
}

// Get response time based on support type
function getResponseTime(supportType: string): string {
  const responseTimes = {
    academic: 'Within 2 hours',
    admission: 'Within 1 hour',
    technical: 'Within 30 minutes',
    counseling: 'Same day (by appointment)',
  }

  return responseTimes[supportType as keyof typeof responseTimes] || 'Within 24 hours'
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || ''
  const allowedOrigins = [
    'https://cerebrumbiologyacademy.com',
    'https://www.cerebrumbiologyacademy.com',
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
  ]
  const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0]

  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': corsOrigin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true',
      },
    }
  )
}
