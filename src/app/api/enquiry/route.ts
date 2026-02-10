import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const enquirySchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  area: z.string().optional(),
  message: z.string().max(1000, 'Message must be less than 1000 characters').optional(),
  source: z.string().default('website'),
  pageUrl: z.string().optional(),
})

// Rate limiting store (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    const rateLimit = rateLimitStore.get(clientIp)

    if (rateLimit && rateLimit.resetTime > now) {
      if (rateLimit.count >= 5) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        )
      }
      rateLimit.count++
    } else {
      rateLimitStore.set(clientIp, {
        count: 1,
        resetTime: now + 15 * 60 * 1000, // 15 minutes
      })
    }

    const rawData = await request.json()

    // Validate input
    const validationResult = enquirySchema.safeParse(rawData)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Clean phone number - keep only digits
    const cleanPhone = data.phone.replace(/\D/g, '').slice(-10)

    // Get device type from user agent
    const userAgent = request.headers.get('user-agent') || ''
    const deviceType = userAgent.toLowerCase().includes('mobile') ? 'MOBILE' : 'DESKTOP'

    // Create enquiry in content_leads table
    const enquiry = await prisma.content_leads.create({
      data: {
        id: `enq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: data.name,
        email: data.email || undefined,
        whatsappNumber: cleanPhone,
        source: data.source,
        city: data.area || undefined,
        interestedIn: data.message || undefined,
        landingPage: data.pageUrl || undefined,
        deviceType: deviceType,
        updatedAt: new Date(),
      },
    })


    // Send WhatsApp notification to admin
    await notifyAdmin(data, cleanPhone)

    return NextResponse.json(
      {
        success: true,
        enquiryId: enquiry.id,
        message: 'Thank you! We will contact you shortly.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('❌ Enquiry submission error:', error)

    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please try again.' },
      { status: 500 }
    )
  }
}

// Notify admin via WhatsApp
async function notifyAdmin(data: z.infer<typeof enquirySchema>, phone: string) {
  if (!process.env.INTERAKT_API_KEY) {
    return
  }

  const adminMessage = `🆕 NEW ENQUIRY

👤 Name: ${data.name}
📞 Phone: ${phone}
📧 Email: ${data.email || 'Not provided'}
📍 Area: ${data.area || 'Not specified'}
💬 Message: ${data.message || 'No message'}
🌐 Source: ${data.source}
📄 Page: ${data.pageUrl || 'Unknown'}

💡 Follow up ASAP!`

  try {
    await fetch('https://api.interakt.ai/v1/public/message/', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(process.env.INTERAKT_API_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        countryCode: '+91',
        phoneNumber: '9311946297',
        type: 'Text',
        data: {
          message: adminMessage,
        },
      }),
    })

  } catch (error) {
    console.error('❌ Admin notification failed:', error)
  }
}
