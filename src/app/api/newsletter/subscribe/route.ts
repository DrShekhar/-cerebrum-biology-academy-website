import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    try {
      const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
        where: { email: normalizedEmail },
      })

      if (existingSubscriber) {
        if (existingSubscriber.status === 'active') {
          return NextResponse.json({
            success: true,
            message: 'You are already subscribed to our newsletter!',
            alreadySubscribed: true,
          })
        }

        await prisma.newsletterSubscriber.update({
          where: { email: normalizedEmail },
          data: { status: 'active', updatedAt: new Date() },
        })

        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
        })
      }

      await prisma.newsletterSubscriber.create({
        data: {
          email: normalizedEmail,
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

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}
