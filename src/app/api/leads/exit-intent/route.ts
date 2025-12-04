import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rateLimit'

function generateDiscountCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = 'CEREBRUM20-'
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(request, {
      maxRequests: 3,
      windowMs: 60 * 60 * 1000,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
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

    const body = await request.json()
    const { email, phone, name, source, variant, page } = body

    if (!email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Email and phone are required' },
        { status: 400 }
      )
    }

    const existingLead = await prisma.content_leads.findFirst({
      where: {
        OR: [{ email }, { whatsappNumber: phone }],
        source: { contains: 'exit_intent' },
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    })

    if (existingLead) {
      return NextResponse.json({
        success: true,
        message: 'You have already claimed this offer recently.',
        discountCode: existingLead.interestedIn,
        alreadyClaimed: true,
      })
    }

    const discountCode = generateDiscountCode()

    const newLead = await prisma.content_leads.create({
      data: {
        id: `exit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email,
        whatsappNumber: phone,
        name: name || undefined,
        source: `exit_intent_${variant || 'discount'}`,
        landingPage: page || '/',
        interestedIn: discountCode,
        leadStage: 'NEW',
        leadScore: 15,
        updatedAt: new Date(),
      },
    })

    console.log('Exit intent lead captured:', {
      leadId: newLead.id,
      email,
      discountCode,
      variant,
    })

    return NextResponse.json({
      success: true,
      message:
        variant === 'catalog'
          ? 'Your catalog download link has been sent!'
          : 'Your 20% discount code has been generated!',
      leadId: newLead.id,
      discountCode,
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    })
  } catch (error) {
    console.error('Exit intent API error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
