import { NextResponse } from 'next/server'
import { requireAdminAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

type IntegrationStatus = 'configured' | 'placeholder' | 'missing'

interface IntegrationReport {
  name: string
  category: string
  status: IntegrationStatus
  envVars: { name: string; status: IntegrationStatus }[]
}

// Status only — env var VALUES never leave the server.
function varStatus(name: string): IntegrationStatus {
  const value = process.env[name]
  if (!value) return 'missing'
  const v = value.toLowerCase()
  if (v.includes('placeholder') || v.includes('your_') || v.includes('xxxx') || v === 'changeme') {
    return 'placeholder'
  }
  return 'configured'
}

function report(name: string, category: string, vars: string[]): IntegrationReport {
  const envVars = vars.map((v) => ({ name: v, status: varStatus(v) }))
  const worst: IntegrationStatus = envVars.some((e) => e.status === 'missing')
    ? 'missing'
    : envVars.some((e) => e.status === 'placeholder')
      ? 'placeholder'
      : 'configured'
  return { name, category, status: worst, envVars }
}

export async function GET() {
  try {
    await requireAdminAuth()

    const integrations: IntegrationReport[] = [
      report('Razorpay', 'Payments', [
        'RAZORPAY_KEY_ID',
        'RAZORPAY_KEY_SECRET',
        'RAZORPAY_WEBHOOK_SECRET',
      ]),
      report('Cashfree', 'Payments', ['CASHFREE_APP_ID', 'CASHFREE_SECRET_KEY']),
      report('Resend (Email)', 'Messaging', ['RESEND_API_KEY', 'RESEND_FROM_EMAIL']),
      report('WhatsApp Business (Meta)', 'Messaging', [
        'WHATSAPP_ACCESS_TOKEN',
        'WHATSAPP_PHONE_NUMBER_ID',
      ]),
      report('Interakt (WhatsApp/OTP)', 'Messaging', ['INTERAKT_API_KEY']),
      report('Zoom', 'Classes', ['ZOOM_ACCOUNT_ID', 'ZOOM_CLIENT_ID', 'ZOOM_CLIENT_SECRET']),
      report('Cloudflare Stream (course videos)', 'LMS', [
        'CLOUDFLARE_ACCOUNT_ID',
        'CLOUDFLARE_API_TOKEN',
      ]),
      report('Vercel Blob (PDF storage)', 'LMS', ['BLOB_READ_WRITE_TOKEN']),
      report('Meta Conversions API (ads feedback)', 'Marketing', [
        'META_CAPI_ACCESS_TOKEN',
        'META_PIXEL_ID',
      ]),
      report('OpenAI (call transcription)', 'AI', ['OPENAI_API_KEY']),
      report('Upstash Redis', 'Infrastructure', [
        'UPSTASH_REDIS_REST_URL',
        'UPSTASH_REDIS_REST_TOKEN',
      ]),
      report('Anthropic (CERI/ARIA)', 'AI', ['ANTHROPIC_API_KEY']),
      report('Sentry', 'Monitoring', ['SENTRY_DSN']),
      report('NextAuth', 'Auth', ['NEXTAUTH_SECRET', 'NEXTAUTH_URL']),
      report('Cron protection', 'Infrastructure', ['CRON_SECRET']),
    ]

    return NextResponse.json({ success: true, data: { integrations } })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('[admin/settings/integrations] GET failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load integration status' },
      { status: 500 }
    )
  }
}
