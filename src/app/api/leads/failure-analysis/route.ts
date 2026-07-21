import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { upsertLead } from '@/lib/leads/upsertLead'
import { rateLimit } from '@/lib/rateLimit'
import { processContentLead } from '@/lib/whatsapp/contentLeadFollowup'

interface FailureAnalysisLead {
  name: string
  phone: string
  email: string
  previousScore: string
  source?: string
  timestamp?: string
  utm_source?: string
  utm_campaign?: string
  utm_medium?: string
}

export async function POST(request: NextRequest) {
  try {
    // Public endpoint — rate limit like the other lead-capture routes.
    const rateLimitResult = await rateLimit(request, {
      maxRequests: 5,
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

    const data: FailureAnalysisLead = await request.json()

    // Validate required fields
    if (!data.name || !data.phone || !data.email || !data.previousScore) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate phone number — accept international formats (8-15 digits).
    const cleanPhone = data.phone.replace(/\D/g, '')
    if (cleanPhone.length < 8 || cleanPhone.length > 15) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone number. Please include your country code.' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 })
    }

    // Validate NEET score
    const score = parseInt(data.previousScore)
    if (isNaN(score) || score < 0 || score > 720) {
      return NextResponse.json(
        { success: false, error: 'Invalid NEET score. Must be between 0 and 720' },
        { status: 400 }
      )
    }

    const source = data.source?.trim() || 'second-chance-neet-landing'

    // 1. Capture-log row (content_leads) — the durable record this endpoint
    //    always owned but never wrote. Written first so the lead survives even
    //    if the CRM upsert or WhatsApp send fails.
    const newLead = await prisma.content_leads.create({
      data: {
        id: `fa_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
        email: data.email,
        whatsappNumber: data.phone,
        name: data.name || undefined,
        source: `failure_analysis_${source}`,
        interestedIn: 'NEET Repeater — Failure Analysis',
        grade: `Previous NEET score: ${score}/720`,
        leadStage: 'NEW',
        // High-intent paid funnel: explicit score + counseling request.
        leadScore: score < 400 ? 60 : 45,
        utmSource: data.utm_source || undefined,
        utmMedium: data.utm_medium || undefined,
        utmCampaign: data.utm_campaign || undefined,
        updatedAt: new Date(),
      },
    })

    // 2. Additive CRM capture — deduped by phone, assigns a counselor, creates
    //    the 30-min follow-up task, bells the counselor, notifies admin, and
    //    kicks the welcome series. Never throws, never blocks the response.
    void upsertLead({
      name: data.name,
      phone: data.phone,
      email: data.email,
      courseInterest: `NEET repeater — previous score ${score}/720`,
      source: `failure-analysis:${source}`,
      message: `Requested a failure-analysis report. Previous NEET score: ${score}/720.`,
      // Explicit score + counseling request from a paid repeater funnel = HOT.
      priority: 'HOT',
      utmSource: data.utm_source || null,
      utmMedium: data.utm_medium || null,
      utmCampaign: data.utm_campaign || null,
    }).catch(() => {})

    // 3. WhatsApp welcome + admin notify + nurturing (non-blocking; no-ops
    //    until the WhatsApp keys are configured).
    processContentLead({
      phone: data.phone,
      name: data.name || undefined,
      email: data.email,
      source: `failure_analysis_${source}`,
      leadId: newLead.id,
    }).catch((err) => {
      console.error('WhatsApp processing failed (non-blocking):', err)
    })

    return NextResponse.json({
      success: true,
      leadId: newLead.id,
      message: 'Your failure analysis report will be sent to your WhatsApp within 2 minutes',
    })
  } catch (error) {
    console.error('Error processing failure analysis lead:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || ''
  const allowedOrigins = [
    'https://cerebrumbiologyacademy.com',
    'https://www.cerebrumbiologyacademy.com',
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
