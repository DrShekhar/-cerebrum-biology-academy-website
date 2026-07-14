import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { upsertLead } from '@/lib/leads/upsertLead'
import { rateLimit } from '@/lib/rateLimit'
import { processContentLead } from '@/lib/whatsapp/contentLeadFollowup'

export async function POST(request: NextRequest) {
  try {
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

    const body = await request.json()
    const { name, phone, page } = body

    if (!phone || !/^\d{8,15}$/.test(phone.replace(/\D/g, ''))) {
      return NextResponse.json(
        { success: false, error: 'A valid phone number is required' },
        { status: 400 }
      )
    }

    // Preserve the FULL number incl. country code — slicing to the last 10
    // digits dropped the +1 on US numbers, making the lead uncallable. Dedup
    // still happens on the last-10 inside upsertLeadCore.
    const digits = phone.replace(/\D/g, '')
    const cleanPhone = phone.trim().startsWith('+') ? `+${digits}` : digits

    const existingLead = await prisma.content_leads.findFirst({
      where: {
        whatsappNumber: cleanPhone,
        source: 'whatsapp_lead_gate',
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    })

    if (existingLead) {
      return NextResponse.json({
        success: true,
        message: 'Welcome back!',
        leadId: existingLead.id,
        alreadyCaptured: true,
      })
    }

    const newLead = await prisma.content_leads.create({
      data: {
        id: `wa_gate_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        whatsappNumber: cleanPhone,
        name: name || undefined,
        source: 'whatsapp_lead_gate',
        landingPage: page || '/',
        leadStage: 'NEW',
        leadScore: 25,
        updatedAt: new Date(),
      },
    })

    processContentLead({
      phone: cleanPhone,
      name: name || undefined,
      source: 'whatsapp_lead_gate',
      leadId: newLead.id,
    }).catch((err) => {
      console.error('WhatsApp gate lead processing failed (non-blocking):', err)
    })

    // Also into the CRM (additive, deduped by phone, never blocks response).
    void upsertLead({
      name,
      phone: cleanPhone,
      source: `whatsapp-gate:${page || '/'}`,
      courseInterest: 'WhatsApp content unlock',
    }).catch(() => {})

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      leadId: newLead.id,
    })
  } catch (error) {
    console.error('WhatsApp gate API error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
