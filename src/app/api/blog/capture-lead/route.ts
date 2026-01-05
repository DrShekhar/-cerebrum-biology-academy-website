import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const blogLeadSchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  name: z.string().max(100).optional(),
  source: z.enum(['blog_inline', 'blog_exit_intent', 'blog_sidebar', 'blog_whatsapp']),
  articleSlug: z.string().optional(),
  articleTitle: z.string().optional(),
})

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000
  const maxRequests = 10

  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const validationResult = blogLeadSchema.safeParse(body)

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]
      return NextResponse.json(
        {
          success: false,
          message: firstError?.message || 'Invalid input',
        },
        { status: 400 }
      )
    }

    const { phone, email, name, source, articleSlug, articleTitle } = validationResult.data

    const userAgent = request.headers.get('user-agent') || ''
    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent)
    const browser = userAgent.includes('Chrome')
      ? 'Chrome'
      : userAgent.includes('Firefox')
        ? 'Firefox'
        : userAgent.includes('Safari')
          ? 'Safari'
          : 'Other'

    const existingLead = await prisma.content_leads.findFirst({
      where: {
        whatsappNumber: phone,
        source: { startsWith: 'blog_' },
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    })

    if (existingLead) {
      return NextResponse.json({
        success: true,
        message: 'We already have your details. Our team will reach out soon!',
        duplicate: true,
      })
    }

    const leadId = `BL_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`

    await prisma.content_leads.create({
      data: {
        id: leadId,
        whatsappNumber: phone,
        email: email || null,
        name: name || null,
        source,
        topicSlug: null,
        interestedIn: articleTitle || 'NEET Biology',
        landingPage: `/blog/${articleSlug || ''}`,
        deviceType: isMobile ? 'mobile' : 'desktop',
        browser,
        ipAddress: ip,
        leadScore: 30,
        leadStage: 'NEW',
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you! We will send you the study materials on WhatsApp shortly.',
      leadId,
    })
  } catch (error) {
    console.error('Blog lead capture error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Blog lead capture API' })
}
