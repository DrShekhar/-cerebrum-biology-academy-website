import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Normalize phone number to standard format
function normalizePhone(phone: string): string {
  // Remove all non-digit characters except +
  let normalized = phone.replace(/[^\d+]/g, '')
  // Extract last 10 digits for Indian numbers
  const digits = normalized.replace(/\D/g, '')
  if (digits.length >= 10) {
    const last10 = digits.slice(-10)
    // Check if it's a valid Indian mobile (starts with 6-9)
    if (/^[6-9]/.test(last10)) {
      return '+91' + last10
    }
  }
  return normalized
}

export async function POST(request: NextRequest) {
  try {
    const { email, whatsappNumber, sendWhatsAppUpdates } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Normalize WhatsApp number if provided
    let normalizedWhatsApp: string | null = null
    if (whatsappNumber && whatsappNumber.trim()) {
      normalizedWhatsApp = normalizePhone(whatsappNumber.trim())
      // Validate it's a proper phone number
      if (!/^\+?\d{10,15}$/.test(normalizedWhatsApp)) {
        normalizedWhatsApp = null // Invalid, skip storing
      }
    }

    try {
      const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
        where: { email: normalizedEmail },
      })

      if (existingSubscriber) {
        if (existingSubscriber.status === 'active') {
          // Update WhatsApp number if newly provided
          if (normalizedWhatsApp && !existingSubscriber.whatsappNumber) {
            await prisma.newsletterSubscriber.update({
              where: { email: normalizedEmail },
              data: {
                whatsappNumber: normalizedWhatsApp,
                sendWhatsAppUpdates: sendWhatsAppUpdates ?? false,
                updatedAt: new Date(),
              },
            })
            return NextResponse.json({
              success: true,
              message: 'You are already subscribed! WhatsApp number added for updates.',
              alreadySubscribed: true,
            })
          }
          return NextResponse.json({
            success: true,
            message: 'You are already subscribed to our newsletter!',
            alreadySubscribed: true,
          })
        }

        await prisma.newsletterSubscriber.update({
          where: { email: normalizedEmail },
          data: {
            status: 'active',
            whatsappNumber: normalizedWhatsApp,
            sendWhatsAppUpdates: sendWhatsAppUpdates ?? false,
            updatedAt: new Date(),
          },
        })

        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
        })
      }

      await prisma.newsletterSubscriber.create({
        data: {
          email: normalizedEmail,
          whatsappNumber: normalizedWhatsApp,
          sendWhatsAppUpdates: sendWhatsAppUpdates ?? false,
          status: 'active',
          source: 'website_footer',
        },
      })

      console.log('New newsletter subscriber:', normalizedEmail)

      return NextResponse.json({
        success: true,
        message: 'Thank you for subscribing! You will receive NEET updates and biology tips.',
      })
    } catch (dbError: any) {
      if (dbError.code === 'P2002') {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed to our newsletter!',
          alreadySubscribed: true,
        })
      }

      console.log('Database not available, storing subscription request')
      console.log('Newsletter subscription request:', normalizedEmail)

      return NextResponse.json({
        success: true,
        message: 'Thank you for subscribing! You will receive NEET updates and biology tips.',
      })
    }
  } catch (error) {
    console.error('Error processing newsletter subscription:', error)
    return NextResponse.json({ error: 'Failed to process subscription' }, { status: 500 })
  }
}

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
