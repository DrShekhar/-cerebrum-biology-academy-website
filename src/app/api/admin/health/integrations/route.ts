import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

interface IntegrationStatus {
  name: string
  configured: boolean
  envVar: string
  category: 'messaging' | 'email' | 'payments' | 'infrastructure' | 'sms'
}

export async function GET() {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const integrations: IntegrationStatus[] = [
    {
      name: 'Interakt (WhatsApp)',
      configured: !!process.env.INTERAKT_API_KEY,
      envVar: 'INTERAKT_API_KEY',
      category: 'messaging',
    },
    {
      name: 'SendGrid (Email)',
      configured: !!process.env.SENDGRID_API_KEY,
      envVar: 'SENDGRID_API_KEY',
      category: 'email',
    },
    {
      name: 'Resend (Email Fallback)',
      configured: !!process.env.RESEND_API_KEY,
      envVar: 'RESEND_API_KEY',
      category: 'email',
    },
    {
      name: 'Razorpay',
      configured: !!process.env.RAZORPAY_KEY_ID && !!process.env.RAZORPAY_KEY_SECRET,
      envVar: 'RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET',
      category: 'payments',
    },
    {
      name: 'Twilio (SMS)',
      configured:
        !!process.env.TWILIO_ACCOUNT_SID &&
        !!process.env.TWILIO_AUTH_TOKEN &&
        !!process.env.TWILIO_PHONE_NUMBER,
      envVar: 'TWILIO_ACCOUNT_SID + TWILIO_AUTH_TOKEN',
      category: 'sms',
    },
    {
      name: 'MSG91 (SMS)',
      configured: !!process.env.MSG91_AUTH_KEY,
      envVar: 'MSG91_AUTH_KEY',
      category: 'sms',
    },
    {
      name: 'Cron Secret',
      configured: !!process.env.CRON_SECRET,
      envVar: 'CRON_SECRET',
      category: 'infrastructure',
    },
    {
      name: 'Sentry',
      configured: !!process.env.SENTRY_DSN,
      envVar: 'SENTRY_DSN',
      category: 'infrastructure',
    },
  ]

  const configuredCount = integrations.filter((i) => i.configured).length
  const totalCount = integrations.length

  return NextResponse.json({
    success: true,
    summary: {
      configured: configuredCount,
      total: totalCount,
      percentage: Math.round((configuredCount / totalCount) * 100),
    },
    integrations,
    timestamp: new Date().toISOString(),
  })
}
