/**
 * Lead Nurturing API
 * POST /api/leads/nurture - Process a new lead or update lead stage
 * GET /api/leads/nurture - Get nurturing status
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  leadNurturingService,
  processScheduledNurturing,
  cleanupFollowupQueue,
} from '@/lib/automation/leadNurturing'
import { LeadStage } from '@/generated/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      action,
      lead,
      leadId,
      stage,
      counselorName,
      bookingLink,
      offerDetails,
      validityDate,
      promoCode,
      enrollLink,
    } = body

    switch (action) {
      case 'process_new':
        if (!lead || !lead.phone || !lead.name) {
          return NextResponse.json(
            { success: false, error: 'Lead phone and name are required' },
            { status: 400 }
          )
        }
        const newLead = await leadNurturingService.processNewLead({
          phone: lead.phone,
          name: lead.name,
          email: lead.email,
          courseInterest: lead.courseInterest || 'NEET Biology',
          source: lead.source || 'api',
          assignedToId: lead.assignedToId,
        })
        return NextResponse.json({
          success: true,
          message: 'New lead processed and nurturing workflow started',
          lead: newLead,
        })

      case 'update_stage':
        if (!leadId && !lead?.id) {
          return NextResponse.json(
            { success: false, error: 'leadId is required for update_stage action' },
            { status: 400 }
          )
        }
        if (!stage) {
          return NextResponse.json(
            { success: false, error: 'Stage is required for update_stage action' },
            { status: 400 }
          )
        }
        const updatedLead = await leadNurturingService.updateLeadStage(
          leadId || lead.id,
          stage as LeadStage
        )
        if (!updatedLead) {
          return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
        }
        return NextResponse.json({
          success: true,
          message: `Lead stage updated to ${stage}`,
          lead: updatedLead,
        })

      case 'mark_demo_attended':
        if (!leadId && !lead?.id) {
          return NextResponse.json({ success: false, error: 'leadId is required' }, { status: 400 })
        }
        const attendedLead = await leadNurturingService.markDemoAttended(leadId || lead.id)
        if (!attendedLead) {
          return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
        }
        return NextResponse.json({
          success: true,
          message: 'Demo marked as attended, post-demo workflow started',
          lead: attendedLead,
        })

      case 'mark_demo_missed':
        if (!leadId && !lead?.id) {
          return NextResponse.json({ success: false, error: 'leadId is required' }, { status: 400 })
        }
        const missedLead = await leadNurturingService.markDemoMissed(leadId || lead.id)
        if (!missedLead) {
          return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
        }
        return NextResponse.json({
          success: true,
          message: 'Demo marked as missed, recovery workflow started',
          lead: missedLead,
        })

      case 'send_followup':
        if (!leadId && !lead?.id) {
          return NextResponse.json({ success: false, error: 'leadId is required' }, { status: 400 })
        }
        if (!counselorName || !bookingLink) {
          return NextResponse.json(
            { success: false, error: 'counselorName and bookingLink are required' },
            { status: 400 }
          )
        }
        const followupResult = await leadNurturingService.sendManualFollowUp(
          leadId || lead.id,
          counselorName,
          bookingLink
        )
        return NextResponse.json({
          success: followupResult.success,
          messageId: followupResult.messageId,
        })

      case 'send_offer':
        if (!leadId && !lead?.id) {
          return NextResponse.json({ success: false, error: 'leadId is required' }, { status: 400 })
        }
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
          leadId || lead.id,
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
        if (!leadId && !lead?.id) {
          return NextResponse.json({ success: false, error: 'leadId is required' }, { status: 400 })
        }
        const recommendation = await leadNurturingService.getRecommendedAction(leadId || lead.id)
        const leadData = await leadNurturingService.getLeadById(leadId || lead.id)
        return NextResponse.json({
          success: true,
          recommendation,
          lead: leadData,
        })

      case 'get_lead':
        if (leadId) {
          const foundLead = await leadNurturingService.getLeadById(leadId)
          return NextResponse.json({ success: !!foundLead, lead: foundLead })
        }
        if (lead?.phone) {
          const foundLead = await leadNurturingService.getLeadByPhone(lead.phone)
          return NextResponse.json({ success: !!foundLead, lead: foundLead })
        }
        return NextResponse.json(
          { success: false, error: 'leadId or phone is required' },
          { status: 400 }
        )

      case 'get_leads_by_stage':
        if (!stage) {
          return NextResponse.json({ success: false, error: 'stage is required' }, { status: 400 })
        }
        const leads = await leadNurturingService.getLeadsByStage(stage as LeadStage)
        return NextResponse.json({
          success: true,
          stage,
          count: leads.length,
          leads,
        })

      case 'process_scheduled':
        // This would normally be called by a cron job
        const stats = await processScheduledNurturing()
        return NextResponse.json({
          success: true,
          message: 'Scheduled nurturing processed',
          stats,
        })

      case 'cleanup_queue':
        const daysOld = body.daysOld || 30
        const cleaned = await cleanupFollowupQueue(daysOld)
        return NextResponse.json({
          success: true,
          message: `Cleaned up ${cleaned} old queue items`,
          cleaned,
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
              'get_lead',
              'get_leads_by_stage',
              'process_scheduled',
              'cleanup_queue',
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
    database: 'connected',
    features: [
      'Automated follow-up sequences',
      'Stage-based messaging via database queue',
      'Demo attendance tracking',
      'Manual follow-up triggers',
      'Promotional offer sending',
      'CRM integration via Interakt',
      'Scheduled task processing',
      'Follow-up history tracking',
    ],
    stages: [
      'NEW_LEAD',
      'DEMO_SCHEDULED',
      'DEMO_COMPLETED',
      'OFFER_SENT',
      'NEGOTIATING',
      'PAYMENT_PLAN_CREATED',
      'ENROLLED',
      'ACTIVE_STUDENT',
      'LOST',
    ],
    usage: {
      processNewLead: 'POST with action="process_new", lead={phone, name, courseInterest, ...}',
      updateStage: 'POST with action="update_stage", leadId="...", stage="DEMO_COMPLETED"',
      markDemoAttended: 'POST with action="mark_demo_attended", leadId="..."',
      markDemoMissed: 'POST with action="mark_demo_missed", leadId="..."',
      sendFollowup: 'POST with action="send_followup", leadId="...", counselorName, bookingLink',
      sendOffer:
        'POST with action="send_offer", leadId="...", offerDetails, validityDate, promoCode, enrollLink',
      getRecommendation: 'POST with action="get_recommendation", leadId="..."',
      getLead: 'POST with action="get_lead", leadId="..." or lead={phone: "..."}',
      getLeadsByStage: 'POST with action="get_leads_by_stage", stage="NEW_LEAD"',
      processScheduled: 'POST with action="process_scheduled" (for cron jobs)',
      cleanupQueue: 'POST with action="cleanup_queue", daysOld=30 (optional)',
    },
  })
}
