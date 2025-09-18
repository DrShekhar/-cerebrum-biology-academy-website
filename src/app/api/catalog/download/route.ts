import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

interface CatalogDownloadRequest {
  email: string
  phone: string
  source?: string
  utm_campaign?: string
  utm_source?: string
  utm_medium?: string
}

interface CatalogLead {
  email: string
  phone: string
  source: string
  timestamp: number
  userAgent: string
  ip: string
  utm_data?: {
    campaign?: string
    source?: string
    medium?: string
  }
}

// In-memory storage for demo (replace with database in production)
const catalogLeads: CatalogLead[] = []

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CatalogDownloadRequest
    const headersList = await headers()

    // Validate required fields
    if (!body.email || !body.phone) {
      return NextResponse.json({ error: 'Email and phone are required' }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Basic phone validation (10-15 digits)
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,15}$/
    if (!phoneRegex.test(body.phone.replace(/\s/g, ''))) {
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 })
    }

    // Check for duplicate (basic spam prevention)
    const existingLead = catalogLeads.find(
      (lead) => lead.email === body.email || lead.phone === body.phone
    )

    if (existingLead && Date.now() - existingLead.timestamp < 300000) {
      // 5 minutes
      return NextResponse.json({ error: 'Please wait before requesting again' }, { status: 429 })
    }

    // Create lead record
    const lead: CatalogLead = {
      email: body.email,
      phone: body.phone,
      source: body.source || 'exit_intent_popup',
      timestamp: Date.now(),
      userAgent: headersList.get('user-agent') || '',
      ip: headersList.get('x-forwarded-for') || '127.0.0.1',
      utm_data: {
        campaign: body.utm_campaign,
        source: body.utm_source,
        medium: body.utm_medium,
      },
    }

    // Store lead (in production, save to database)
    catalogLeads.push(lead)

    // Generate catalog download data (mock)
    const catalogData = {
      downloadUrl: '/catalog/neet-biology-complete-guide.pdf',
      title: 'NEET Biology Complete Course Catalog',
      pages: 24,
      size: '2.8 MB',
      lastUpdated: '2025-01-17',
      sections: [
        'Course Overview & Structure',
        'Faculty Profiles & Credentials',
        'Chapter-wise Study Timeline',
        'Previous Year Analysis (2020-2024)',
        'Success Stories & Testimonials',
        'Fee Structure & Payment Options',
        'Scholarship Programs',
        'Study Materials Preview',
      ],
    }

    // In production, you would:
    // 1. Send the catalog via email
    // 2. Add to CRM/marketing automation
    // 3. Trigger follow-up sequences
    // 4. Log to analytics

    // Mock email sending (replace with actual email service)
    const emailSent = await sendCatalogEmail(body.email, catalogData)

    // Mock WhatsApp notification (replace with actual WhatsApp API)
    const whatsappSent = await sendWhatsAppNotification(body.phone, lead)

    // Track conversion in analytics
    await trackCatalogDownload(lead)

    // Log successful conversion
    console.log(`[CATALOG-DOWNLOAD] ${body.email} - ${body.source}`)

    return NextResponse.json({
      success: true,
      message: 'Catalog sent successfully',
      catalog: catalogData,
      leadId: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      estimatedDelivery: '5-10 minutes',
    })
  } catch (error) {
    console.error('Catalog download error:', error)
    return NextResponse.json({ error: 'Failed to process catalog request' }, { status: 500 })
  }
}

// Analytics endpoint for catalog downloads
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get('timeframe') || '24h'
    const source = searchParams.get('source')

    // Filter leads based on timeframe
    const now = Date.now()
    const timeframes = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
    }

    const cutoff = now - (timeframes[timeframe as keyof typeof timeframes] || timeframes['24h'])
    let filteredLeads = catalogLeads.filter((lead) => lead.timestamp >= cutoff)

    if (source) {
      filteredLeads = filteredLeads.filter((lead) => lead.source === source)
    }

    // Generate analytics
    const analytics = {
      totalDownloads: filteredLeads.length,
      uniqueEmails: new Set(filteredLeads.map((l) => l.email)).size,
      uniquePhones: new Set(filteredLeads.map((l) => l.phone)).size,
      sourceBreakdown: filteredLeads.reduce(
        (acc, lead) => {
          acc[lead.source] = (acc[lead.source] || 0) + 1
          return acc
        },
        {} as Record<string, number>
      ),
      timeframe,
      conversionRate: (filteredLeads.length / (catalogLeads.length || 1)) * 100,
    }

    return NextResponse.json({
      analytics,
      recentLeads: filteredLeads.slice(-10), // Last 10 leads
    })
  } catch (error) {
    console.error('Catalog analytics error:', error)
    return NextResponse.json({ error: 'Failed to retrieve analytics' }, { status: 500 })
  }
}

// Mock email service (replace with actual implementation)
async function sendCatalogEmail(email: string, catalogData: any): Promise<boolean> {
  // In production, integrate with:
  // - SendGrid, Mailgun, or similar
  // - Email templates
  // - Attachment handling

  console.log(`[EMAIL] Sending catalog to ${email}`)
  return new Promise((resolve) => setTimeout(() => resolve(true), 100))
}

// Mock WhatsApp service (replace with actual implementation)
async function sendWhatsAppNotification(phone: string, lead: CatalogLead): Promise<boolean> {
  // In production, integrate with WhatsApp Business API
  console.log(`[WHATSAPP] Notifying ${phone} about catalog download`)
  return new Promise((resolve) => setTimeout(() => resolve(true), 100))
}

// Mock analytics tracking (replace with actual implementation)
async function trackCatalogDownload(lead: CatalogLead): Promise<void> {
  // In production, send to:
  // - Google Analytics
  // - Facebook Pixel
  // - Custom analytics

  console.log(`[ANALYTICS] Tracking catalog download for ${lead.email}`)
}
