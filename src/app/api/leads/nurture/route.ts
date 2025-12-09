/**
 * Lead Nurturing API
 * POST /api/leads/nurture - Process a new lead or update lead stage
 * GET /api/leads/nurture - Get nurturing status
 */

import { NextRequest, NextResponse } from 'next/server'
import { leadNurturingService, type Lead, type LeadStage } from '@/lib/automation/leadNurturing'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      action,
      lead,
      stage,
      counselorName,
      bookingLink,
      offerDetails,
      validityDate,
      promoCode,
      enrollLink,
    } = body

    if (!lead || !lead.phone || !lead.name) {
      return NextResponse.json(
        { success: false, error: 'Lead phone and name are required' },
        { status: 400 }
      )
    }

    // Ensure lead has all required fields
    const fullLead: Lead = {
      id: lead.id || `lead_${Date.now()}`,
      phone: lead.phone,
      name: lead.name,
      email: lead.email,
      class: lead.class,
      courseInterest: lead.courseInterest || 'NEET Biology',
      stage: lead.stage || 'new_inquiry',
      source: lead.source || 'api',
      createdAt: lead.createdAt ? new Date(lead.createdAt) : new Date(),
      lastContactAt: lead.lastContactAt ? new Date(lead.lastContactAt) : undefined,
      demoDate: lead.demoDate ? new Date(lead.demoDate) : undefined,
      demoAttended: lead.demoAttended,
      enrollmentDate: lead.enrollmentDate ? new Date(lead.enrollmentDate) : undefined,
      notes: lead.notes,
    }

    switch (action) {
      case 'process_new':
        await leadNurturingService.processNewLead(fullLead)
        return NextResponse.json({
          success: true,
          message: 'New lead processed and nurturing workflow started',
          leadId: fullLead.id,
        })

      case 'update_stage':
        if (!stage) {
          return NextResponse.json(
            { success: false, error: 'Stage is required for update_stage action' },
            { status: 400 }
          )
        }
        await leadNurturingService.updateLeadStage(fullLead, stage as LeadStage)
        return NextResponse.json({
          success: true,
          message: `Lead stage updated to ${stage}`,
          leadId: fullLead.id,
        })

      case 'mark_demo_attended':
        await leadNurturingService.markDemoAttended(fullLead)
        return NextResponse.json({
          success: true,
          message: 'Demo marked as attended, post-demo workflow started',
          leadId: fullLead.id,
        })

      case 'mark_demo_missed':
        await leadNurturingService.markDemoMissed(fullLead)
        return NextResponse.json({
          success: true,
          message: 'Demo marked as missed, recovery workflow started',
          leadId: fullLead.id,
        })

      case 'send_followup':
        if (!counselorName || !bookingLink) {
          return NextResponse.json(
            { success: false, error: 'counselorName and bookingLink are required' },
            { status: 400 }
          )
        }
        const followupResult = await leadNurturingService.sendManualFollowUp(
          fullLead,
          counselorName,
          bookingLink
        )
        return NextResponse.json({
          success: followupResult.success,
          messageId: followupResult.messageId,
        })

      case 'send_offer':
        if (!offerDetails || !validityDate || !promoCode || !enrollLink) {
          return NextResponse.json(
            {
              success: false,
              error: 'offerDetails, validityDate, promoCode, and enrollLink are required',
            },
            { status: 400 }
          )
        }
        const offerResult = await leadNurturingService.sendPromotionalOffer(
          fullLead,
          offerDetails,
          validityDate,
          promoCode,
          enrollLink
        )
        return NextResponse.json({
          success: offerResult.success,
          messageId: offerResult.messageId,
        })

      case 'get_recommendation':
        const recommendation = leadNurturingService.getRecommendedAction(fullLead)
        return NextResponse.json({
          success: true,
          recommendation,
          leadStage: fullLead.stage,
        })

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action',
            validActions: [
              'process_new',
              'update_stage',
              'mark_demo_attended',
              'mark_demo_missed',
              'send_followup',
              'send_offer',
              'get_recommendation',
            ],
          },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Lead nurturing error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    service: 'Lead Nurturing API',
    status: 'active',
    features: [
      'Automated follow-up sequences',
      'Stage-based messaging',
      'Demo attendance tracking',
      'Manual follow-up triggers',
      'Promotional offer sending',
      'CRM integration via Interakt',
    ],
    stages: [
      'new_inquiry',
      'demo_booked',
      'demo_attended',
      'demo_missed',
      'interested',
      'enrolled',
      'payment_pending',
      'active_student',
      'inactive',
    ],
    usage: {
      processNewLead: 'POST with action="process_new", lead={phone, name, ...}',
      updateStage: 'POST with action="update_stage", lead={...}, stage="demo_attended"',
      markDemoAttended: 'POST with action="mark_demo_attended", lead={...}',
      markDemoMissed: 'POST with action="mark_demo_missed", lead={...}',
      sendFollowup: 'POST with action="send_followup", lead={...}, counselorName, bookingLink',
      sendOffer:
        'POST with action="send_offer", lead={...}, offerDetails, validityDate, promoCode, enrollLink',
    },
  })
}
