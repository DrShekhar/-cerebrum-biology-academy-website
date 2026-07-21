import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'
import { emailService } from '@/lib/email/emailService'

const WHATSAPP_NUMBER = '918826444334'

// Owner alert on every WhatsApp click — so a lead is visible even if the visitor
// never completes the WhatsApp send (desktop QR / abandons / delivery issue).
// Best-effort, never blocks tracking. Goes to ADMIN_LEAD_EMAIL (default: owner).
// NOTE: requires RESEND_API_KEY (or SENDGRID_API_KEY) configured in prod, else
// the email silently no-ops.
async function sendOwnerWhatsAppAlert(info: {
  source: string
  page: string
  device: string
  message?: string
  campaign?: string | null
  journey?: VisitorJourney | null
}) {
  const adminEmail = process.env.ADMIN_LEAD_EMAIL || 'bobbyaiims@gmail.com'
  const when = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  // The pages the visitor moved through this session (the context of what they
  // read before reaching out) — the most useful signal for the counselor.
  const journeyPath = info.journey?.path?.length ? info.journey.path.join('  →  ') : null
  try {
    await emailService.send({
      to: adminEmail,
      from: 'leads@cerebrumbiologyacademy.com',
      subject: `📲 WhatsApp lead — ${info.page} (${info.device})`,
      html:
        `<h2>Someone is reaching out on WhatsApp</h2>` +
        `<p>A visitor tapped a WhatsApp button. Even if they don't finish the chat on +91 88264 44334, here is the lead intent:</p>` +
        `<ul>` +
        `<li><b>Page:</b> ${info.page}</li>` +
        `<li><b>Source:</b> ${info.source}</li>` +
        `<li><b>Device:</b> ${info.device}</li>` +
        (info.campaign ? `<li><b>Campaign:</b> ${info.campaign}</li>` : '') +
        (info.journey?.landingPage
          ? `<li><b>Landed on:</b> ${info.journey.landingPage}</li>`
          : '') +
        (journeyPath ? `<li><b>Pages viewed:</b> ${journeyPath}</li>` : '') +
        (info.message ? `<li><b>Prefilled message:</b> ${info.message}</li>` : '') +
        `<li><b>Time (IST):</b> ${when}</li>` +
        `</ul>`,
      text:
        `WhatsApp lead intent\nPage: ${info.page}\nSource: ${info.source}\nDevice: ${info.device}\n` +
        (info.campaign ? `Campaign: ${info.campaign}\n` : '') +
        (info.journey?.landingPage ? `Landed on: ${info.journey.landingPage}\n` : '') +
        (journeyPath ? `Pages viewed: ${journeyPath}\n` : '') +
        (info.message ? `Message: ${info.message}\n` : '') +
        `Time (IST): ${when}\n`,
    })
  } catch (error) {
    console.error('Owner WhatsApp-intent alert email failed:', error)
  }
}

interface VisitorJourney {
  landingPage: string
  path: string[]
  pageCount: number
  firstSeenAt: string
  referrer: string
}

interface WhatsAppClickPayload {
  source: string
  page: string
  campaign?: string
  buttonText?: string
  message?: string
  sessionId?: string
  userId?: string
  journey?: VisitorJourney | null
}

function generateId(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 10)
  return `wa_${timestamp}_${random}`
}

function getDeviceType(userAgent: string): string {
  if (/mobile/i.test(userAgent)) return 'mobile'
  if (/tablet|ipad/i.test(userAgent)) return 'tablet'
  return 'desktop'
}

export async function POST(request: NextRequest) {
  try {
    const body: WhatsAppClickPayload = await request.json()
    const headersList = await headers()

    const userAgent = headersList.get('user-agent') || ''
    const referer = headersList.get('referer') || ''
    const forwardedFor = headersList.get('x-forwarded-for')
    const realIp = headersList.get('x-real-ip')
    const ipAddress = forwardedFor?.split(',')[0] || realIp || 'unknown'

    // Extract UTM parameters from referer URL
    let utmSource: string | null = null
    let utmMedium: string | null = null
    let utmCampaign: string | null = null

    try {
      const url = new URL(referer)
      utmSource = url.searchParams.get('utm_source')
      utmMedium = url.searchParams.get('utm_medium')
      utmCampaign = url.searchParams.get('utm_campaign')
    } catch {
      // Invalid URL, ignore
    }

    // Build properties object with all tracking data
    const properties = {
      source: body.source,
      buttonText: body.buttonText || 'WhatsApp',
      deviceType: getDeviceType(userAgent),
      message: body.message,
      campaign: body.campaign || utmCampaign,
      timestamp: new Date().toISOString(),
      // Visitor journey — the pages viewed this session before the click.
      landingPage: body.journey?.landingPage,
      journeyPath: body.journey?.path,
      journeyPageCount: body.journey?.pageCount,
    }

    // Log to database
    const analyticsEvent = await prisma.analytics_events.create({
      data: {
        id: generateId(),
        userId: body.userId || null,
        sessionId: body.sessionId || null,
        eventType: 'whatsapp',
        eventName: 'whatsapp_click',
        properties,
        pagePath: body.page,
        pageTitle: null,
        referrer: referer,
        userAgent,
        utmSource,
        utmMedium,
        utmCampaign: body.campaign || utmCampaign,
        ipAddress,
        country: null,
        city: null,
      },
    })

    // Fire the owner alert (best-effort; awaited so it completes in the
    // serverless lifecycle, but never throws into the response).
    await sendOwnerWhatsAppAlert({
      source: body.source,
      page: body.page,
      device: getDeviceType(userAgent),
      message: body.message,
      campaign: body.campaign || utmCampaign,
      journey: body.journey,
    })

    // Build WhatsApp URL with tracking in message
    const trackingInfo = body.source ? ` [Source: ${body.source}]` : ''
    const baseMessage = body.message || 'Hi! I am interested in NEET Biology coaching.'
    const fullMessage = `${baseMessage}${trackingInfo}`
    const encodedMessage = encodeURIComponent(fullMessage)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`

    return NextResponse.json({
      success: true,
      eventId: analyticsEvent.id,
      whatsappUrl,
    })
  } catch (error) {
    console.error('WhatsApp click tracking error:', error)

    // Even if tracking fails, return the WhatsApp URL
    const fallbackUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi! I am interested in NEET Biology coaching.')}`

    return NextResponse.json(
      {
        success: false,
        error: 'Tracking failed',
        whatsappUrl: fallbackUrl,
      },
      { status: 200 } // Still return 200 so the click works
    )
  }
}

// GET endpoint for simple redirect-based tracking (for legacy links)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const source = searchParams.get('source') || 'direct'
  const page = searchParams.get('page') || '/'
  const message = searchParams.get('message') || 'Hi! I am interested in NEET Biology coaching.'

  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''
  const referer = headersList.get('referer') || ''
  const forwardedFor = headersList.get('x-forwarded-for')
  const realIp = headersList.get('x-real-ip')
  const ipAddress = forwardedFor?.split(',')[0] || realIp || 'unknown'

  try {
    // Log to database
    await prisma.analytics_events.create({
      data: {
        id: generateId(),
        userId: null,
        sessionId: null,
        eventType: 'whatsapp',
        eventName: 'whatsapp_click',
        properties: {
          source,
          deviceType: getDeviceType(userAgent),
          method: 'redirect',
        },
        pagePath: page,
        referrer: referer,
        userAgent,
        ipAddress,
      },
    })
  } catch (error) {
    console.error('WhatsApp redirect tracking error:', error)
  }

  // Build WhatsApp URL and redirect
  const trackingInfo = ` [Source: ${source}]`
  const fullMessage = `${message}${trackingInfo}`
  const encodedMessage = encodeURIComponent(fullMessage)
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`

  return NextResponse.redirect(whatsappUrl)
}
