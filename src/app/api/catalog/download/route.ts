import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { upsertLead } from '@/lib/leads/upsertLead'
import { processContentLead } from '@/lib/whatsapp/contentLeadFollowup'

interface CatalogDownloadRequest {
  email: string
  phone: string
  name?: string
  source?: string
  utm_campaign?: string
  utm_source?: string
  utm_medium?: string
}

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
    const cleanPhone = body.phone.replace(/\s/g, '')
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json({ error: 'Invalid phone number format' }, { status: 400 })
    }

    const normalizedPhone = cleanPhone.replace(/\D/g, '').slice(-10)
    const clientIp = headersList.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1'
    const userAgent = headersList.get('user-agent') || ''

    // Check for duplicate (rate limit per email/phone)
    const recentLead = await prisma.content_leads.findFirst({
      where: {
        OR: [{ email: body.email }, { whatsappNumber: normalizedPhone }],
        createdAt: { gte: new Date(Date.now() - 5 * 60 * 1000) }, // Last 5 minutes
      },
    })

    if (recentLead) {
      return NextResponse.json({ error: 'Please wait before requesting again' }, { status: 429 })
    }

    // Generate unique lead ID
    const leadId = `content_${Date.now()}_${Math.random().toString(36).substring(7)}`

    // Persist to database - content_leads table
    await prisma.content_leads.create({
      data: {
        id: leadId,
        name: body.name || null,
        email: body.email,
        whatsappNumber: normalizedPhone,
        source: body.source || 'catalog_download',
        ipAddress: clientIp,
        deviceType: userAgent.includes('Mobile') ? 'MOBILE' : 'DESKTOP',
        browser: userAgent,
        utmSource: body.utm_source || null,
        utmMedium: body.utm_medium || null,
        utmCampaign: body.utm_campaign || null,
        leadScore: 20, // Base score for catalog download
        updatedAt: new Date(),
      },
    })

    // Also upsert a CRM lead for follow-up (canonical dedup path; the
    // content_leads capture-log row above is untouched).
    void upsertLead({
      name: body.name || body.email.split('@')[0],
      phone: normalizedPhone,
      email: body.email,
      courseInterest: 'NEET Biology - Catalog Download',
      source: body.utm_source || 'catalog-download',
      utmSource: body.utm_source || null,
      utmMedium: body.utm_medium || null,
      utmCampaign: body.utm_campaign || null,
    }).catch(() => {})

    // Generate catalog download data
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

    // Log successful conversion

    // Send WhatsApp welcome + notify admin + schedule nurturing (non-blocking)
    processContentLead({
      phone: normalizedPhone,
      name: body.name || undefined,
      email: body.email,
      source: body.source || 'catalog_download',
      leadId,
    }).catch((err) => {
      console.error('WhatsApp processing failed (non-blocking):', err)
    })

    return NextResponse.json({
      success: true,
      message: 'Catalog sent successfully',
      catalog: catalogData,
      leadId: leadId,
      estimatedDelivery: '5-10 minutes',
    })
  } catch (error) {
    console.error('Catalog download error:', error)
    return NextResponse.json({ error: 'Failed to process catalog request' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  // Public brochure request (course-finder quiz "Download Details" button opens
  // /api/catalog/download?course=<id>). No auth, no PII — send the prospect to
  // the live courses catalog. Must be handled BEFORE the admin gate below so
  // the prospect flow never hits a 401.
  if (searchParams.get('course')) {
    return NextResponse.redirect(new URL('/courses', request.url))
  }

  // Analytics (ADMIN only — returns lead PII).
  try {
    await requireAdminAuth()

    const timeframe = searchParams.get('timeframe') || '24h'
    const source = searchParams.get('source')

    // Calculate cutoff date based on timeframe
    const now = new Date()
    const timeframes: Record<string, number> = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
    }

    const cutoffMs = timeframes[timeframe] || timeframes['24h']
    const cutoffDate = new Date(now.getTime() - cutoffMs)

    // Query from database
    const whereClause: Record<string, unknown> = {
      source: 'catalog_download',
      createdAt: { gte: cutoffDate },
    }

    if (source) {
      whereClause.source = source
    }

    const [leads, totalCount] = await Promise.all([
      prisma.content_leads.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        take: 100,
      }),
      prisma.content_leads.count({
        where: { source: 'catalog_download' },
      }),
    ])

    // Generate analytics
    const analytics = {
      totalDownloads: leads.length,
      uniqueEmails: new Set(leads.map((l) => l.email).filter(Boolean)).size,
      uniquePhones: new Set(leads.map((l) => l.whatsappNumber)).size,
      sourceBreakdown: leads.reduce(
        (acc, lead) => {
          const src = lead.source || 'unknown'
          acc[src] = (acc[src] || 0) + 1
          return acc
        },
        {} as Record<string, number>
      ),
      timeframe,
      allTimeTotal: totalCount,
    }

    return NextResponse.json({
      success: true,
      analytics,
      recentLeads: leads.slice(0, 10).map((l) => ({
        id: l.id,
        email: l.email,
        phone: l.whatsappNumber,
        source: l.source,
        createdAt: l.createdAt,
      })),
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Catalog analytics error:', error)
    return NextResponse.json({ error: 'Failed to retrieve analytics' }, { status: 500 })
  }
}
