import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { rateLimit } from '@/lib/rateLimit'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/utils/logger'
import { notifyAdminContactInquiry } from '@/lib/notifications/adminLeadNotification'
import { trackLeadConversion } from '@/lib/integrations/googleAdsConversion'

const contactInquirySchema = z.object({
  name: z.string().min(2).max(100),
  phone: z
    .string()
    .regex(
      /^[6-9]\d{9}$/,
      'Please enter a valid 10-digit Indian mobile number (e.g., 8826444334). We accept formats like +91 88264 44334, 91-8826444334, or just 8826444334.'
    ),
  email: z.string().email('Please enter a valid email address'),
  center: z.string().max(50).optional(),
  supportType: z.enum(['academic', 'admission', 'technical', 'counseling', 'general']),
  message: z.string().min(10).max(2000),
  timestamp: z.string().optional(),
  source: z.string().max(100).optional(),
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  utmContent: z.string().max(100).optional(),
  gclid: z.string().max(200).optional(),
})

type ContactInquiryInput = z.infer<typeof contactInquirySchema>

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

    const rawBody = await request.json()

    // Normalize phone number (remove +91 prefix, spaces, etc.)
    if (rawBody.phone) {
      rawBody.phone = rawBody.phone.replace(/[^\d]/g, '').slice(-10)
    }

    // Validate with Zod
    const validationResult = contactInquirySchema.safeParse(rawBody)
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]
      return NextResponse.json(
        {
          error: firstError?.message || 'Invalid input data',
          details: validationResult.error.issues,
          hint: 'For phone, enter 10-digit mobile number (e.g., 8826444334). We accept +91 prefix.',
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

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

    // Determine priority based on support type
    const priorityMap: Record<string, 'LOW' | 'NORMAL' | 'MEDIUM' | 'HIGH' | 'URGENT'> = {
      technical: 'HIGH',
      counseling: 'MEDIUM',
      admission: 'HIGH',
      academic: 'NORMAL',
      general: 'NORMAL',
    }

    // Get client IP for audit trail
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown'
    const userAgent = request.headers.get('user-agent') || undefined

    // Determine source with Google Ads detection
    let source = data.source || 'Website'
    if (data.gclid) {
      source = 'Google Ads'
    } else if (
      data.utmSource?.toLowerCase() === 'google' &&
      (data.utmMedium?.toLowerCase() === 'cpc' || data.utmMedium?.toLowerCase() === 'ppc')
    ) {
      source = 'Google Ads'
    }

    // Save to database using Prisma
    const inquiry = await prisma.contact_inquiries.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        center: data.center || null,
        supportType: data.supportType,
        message: data.message,
        source,
        status: 'NEW',
        priority: priorityMap[data.supportType] || 'NORMAL',
        department:
          supportDepartments[data.supportType as keyof typeof supportDepartments] ||
          'General Support',
        ipAddress,
        userAgent,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        utmContent: data.utmContent,
        gclid: data.gclid,
      },
    })

    logger.businessEvent('contact_inquiry_created', {
      inquiryId: inquiry.id,
      name: data.name,
      email: data.email,
      supportType: data.supportType,
      priority: inquiry.priority,
    })

    // Send WhatsApp notification to admin about new lead
    notifyAdminContactInquiry({
      name: data.name,
      email: data.email,
      phone: data.phone,
      supportType: data.supportType,
      message: data.message,
      source,
      gclid: data.gclid,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      inquiryId: inquiry.id,
    }).catch((err) => {
      logger.error('Admin WhatsApp notification failed', { error: err, inquiryId: inquiry.id })
    })

    // Track Google Ads conversion if GCLID is present
    if (data.gclid) {
      trackLeadConversion({
        gclid: data.gclid,
        leadId: inquiry.id,
        conversionDateTime: new Date(),
      }).catch((err) => {
        logger.error('Google Ads conversion tracking failed', { error: err, gclid: data.gclid })
      })
    }

    // Send immediate response based on support type
    await sendInquiryResponse(data)

    // Notify relevant department
    await notifyDepartment(data, inquiry.id)

    // Send confirmation email to user
    await sendUserConfirmation(data, inquiry.id)

    return NextResponse.json({
      success: true,
      inquiryId: inquiry.id,
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
async function sendInquiryResponse(data: ContactInquiryInput) {
  const responses = {
    academic: `Hi ${data.name}! Thank you for your academic inquiry. Our Biology experts will review your questions and respond within 2 hours with detailed guidance.`,
    admission: `Hi ${data.name}! Thank you for your interest in Cerebrum Biology Academy. Our admission counselor will call you within 1 hour to discuss course options, fees, and available batches.`,
    technical: `Hi ${data.name}! We've received your technical support request. Our tech team will resolve your issue within 30 minutes. You'll receive step-by-step solutions via WhatsApp.`,
    counseling: `Hi ${data.name}! Thank you for reaching out for counseling support. Our experienced counselor will schedule a session with you today to provide personalized guidance.`,
  }

  const response =
    responses[data.supportType as keyof typeof responses] ||
    `Hi ${data.name}! Thank you for contacting Cerebrum Biology Academy. We'll get back to you soon.`

  // In real implementation, send WhatsApp message via API
  return true
}

// Simulate department notification
async function notifyDepartment(data: ContactInquiryInput, inquiryId: string) {
  const notifications = {
    academic: {
      email: 'academic@cerebrumbiologyacademy.com',
      subject: `New Academic Inquiry - ${data.name}`,
      priority: 'normal',
    },
    admission: {
      email: 'admissions@cerebrumbiologyacademy.com',
      subject: `New Admission Inquiry - ${data.name}`,
      priority: 'high',
    },
    technical: {
      email: 'tech@cerebrumbiologyacademy.com',
      subject: `Urgent: Technical Issue - ${data.name}`,
      priority: 'urgent',
    },
    counseling: {
      email: 'counseling@cerebrumbiologyacademy.com',
      subject: `Counseling Request - ${data.name}`,
      priority: 'medium',
    },
  }

  const notification = notifications[data.supportType as keyof typeof notifications]

  // In real implementation, send email notification to department
  return !!notification
}

// Simulate user confirmation email
async function sendUserConfirmation(data: ContactInquiryInput, inquiryId: string) {
  const emailContent = {
    to: data.email,
    subject: 'Inquiry Received - Cerebrum Biology Academy',
    html: `
      <h2>Dear ${data.name},</h2>
      <p>Thank you for contacting Cerebrum Biology Academy. We have received your inquiry and will respond soon.</p>

      <h3>Your Inquiry Details:</h3>
      <ul>
        <li><strong>Support Type:</strong> ${data.supportType}</li>
        <li><strong>Preferred Center:</strong> ${data.center || 'Not specified'}</li>
        <li><strong>Contact Number:</strong> ${data.phone}</li>
        <li><strong>Inquiry ID:</strong> ${inquiryId}</li>
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

  // In real implementation, send email via API
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
    'https://cerebrumbiologyacademy.com',
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
