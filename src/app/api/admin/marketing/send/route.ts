import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { sendWhatsAppMessage, isInteraktConfigured } from '@/lib/interakt'
import type { LeadStage } from '@/generated/prisma'

/**
 * Send a WhatsApp marketing campaign to its audience.
 *
 * Safety model:
 *  - Audience is CRM leads (opt-in prospects) that have a phone, filtered by the
 *    campaign's enrollment_status → lead-stage mapping. Phones are de-duped.
 *  - `dryRun: true` (default) returns the audience size WITHOUT sending anything.
 *  - A real send is capped at MAX_RECIPIENTS per call (serverless time budget);
 *    anything beyond the cap is reported as `skipped`, never silently dropped.
 *  - Interakt must be configured; otherwise a clear 400 is returned.
 *  - Metrics are incremented with REAL attempted/delivered counts. Status moves
 *    to 'completed'. A campaign already 'completed' won't re-send (no double-DM).
 *
 * NOTE: WhatsApp business-initiated (broadcast) messages must use an approved
 * template outside the 24h service window. If the campaign provides
 * content.whatsapp.templateName it is used; otherwise the free-text message is
 * sent (only delivered by WhatsApp inside an open 24h session).
 */

const MAX_RECIPIENTS = 500

const STATUS_MAP: Record<string, LeadStage[]> = {
  lead: ['NEW_LEAD'],
  demo_taken: ['DEMO_SCHEDULED', 'DEMO_COMPLETED'],
  enrolled: ['ENROLLED', 'ACTIVE_STUDENT'],
  inactive: [], // handled separately (lastContactedAt age)
}

type WhatsappContent = {
  message?: string
  templateName?: string
  templateParams?: Record<string, string>
  mediaUrl?: string
}

async function resolveAudience(
  targetAudience: unknown
): Promise<{ id: string; phone: string; studentName: string }[]> {
  const criteria =
    (targetAudience as {
      behavior?: { enrollment_status?: string[]; last_activity_days?: number }
    }) || {}
  const statuses = criteria.behavior?.enrollment_status || []

  const stages = statuses.filter((s) => s !== 'inactive').flatMap((s) => STATUS_MAP[s] || [])
  const wantsInactive = statuses.includes('inactive')

  const where: {
    phone: { not: '' }
    OR?: unknown[]
    stage?: { in: LeadStage[] }
    lastContactedAt?: { lt: Date }
  } = { phone: { not: '' } }

  if (stages.length && wantsInactive) {
    const days = criteria.behavior?.last_activity_days || 30
    where.OR = [
      { stage: { in: stages } },
      { lastContactedAt: { lt: new Date(Date.now() - days * 24 * 60 * 60 * 1000) } },
    ]
  } else if (stages.length) {
    where.stage = { in: stages }
  } else if (wantsInactive) {
    const days = criteria.behavior?.last_activity_days || 30
    where.lastContactedAt = { lt: new Date(Date.now() - days * 24 * 60 * 60 * 1000) }
  }
  // No status filter → all leads with a phone.

  const leads = await prisma.leads.findMany({
    where: where as never,
    select: { id: true, phone: true, studentName: true },
    orderBy: { createdAt: 'desc' },
    take: 5000,
  })

  // De-dupe by last-10 phone digits.
  const seen = new Set<string>()
  const out: { id: string; phone: string; studentName: string }[] = []
  for (const l of leads) {
    const key = l.phone.replace(/\D/g, '').slice(-10)
    if (key.length < 10 || seen.has(key)) continue
    seen.add(key)
    out.push(l)
  }
  return out
}

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth()
    const body = await request.json().catch(() => ({}))
    const campaignId: string | undefined = body.campaignId
    const dryRun: boolean = body.dryRun !== false // default true

    if (!campaignId) {
      return NextResponse.json({ success: false, error: 'campaignId required' }, { status: 400 })
    }

    const campaign = await prisma.marketing_campaigns.findUnique({ where: { id: campaignId } })
    if (!campaign) {
      return NextResponse.json({ success: false, error: 'Campaign not found' }, { status: 404 })
    }
    if (campaign.type !== 'whatsapp' && campaign.type !== 'mixed') {
      return NextResponse.json(
        { success: false, error: 'This endpoint only sends WhatsApp campaigns' },
        { status: 400 }
      )
    }
    if (campaign.status === 'completed') {
      return NextResponse.json(
        { success: false, error: 'Campaign already sent (completed)' },
        { status: 400 }
      )
    }

    const wa = (campaign.contentWhatsapp as WhatsappContent | null) || null
    if (!wa || (!wa.message && !wa.templateName)) {
      return NextResponse.json(
        { success: false, error: 'Campaign has no WhatsApp message or template' },
        { status: 400 }
      )
    }

    const audience = await resolveAudience(campaign.targetAudience)

    if (dryRun) {
      return NextResponse.json({
        success: true,
        dryRun: true,
        audienceSize: audience.length,
        willSend: Math.min(audience.length, MAX_RECIPIENTS),
        skipped: Math.max(0, audience.length - MAX_RECIPIENTS),
        sample: audience.slice(0, 5).map((a) => ({
          name: a.studentName,
          phone: `••••${a.phone.replace(/\D/g, '').slice(-4)}`,
        })),
      })
    }

    if (!isInteraktConfigured()) {
      return NextResponse.json(
        { success: false, error: 'WhatsApp (Interakt) is not configured — set INTERAKT_API_KEY' },
        { status: 400 }
      )
    }

    const recipients = audience.slice(0, MAX_RECIPIENTS)
    const skipped = audience.length - recipients.length
    let accepted = 0 // handed to Interakt successfully
    let failed = 0

    for (const r of recipients) {
      try {
        const res = await sendWhatsAppMessage({
          phone: r.phone,
          message: wa.message,
          templateName: wa.templateName,
          templateParams: wa.templateParams,
          mediaUrl: wa.mediaUrl,
          campaignId,
          // Echoed back on delivery/read webhooks so we can attribute status
          // updates to this campaign.
          callbackData: `campaign:${campaignId}`,
        })
        if (res.success) accepted++
        else failed++
      } catch {
        failed++
      }
    }

    const attempted = recipients.length
    // metricsSent = accepted by the provider. metricsDelivered / metricsOpened
    // are owned by the delivery webhook (device-delivered / read) so they reflect
    // real WhatsApp status rather than "API accepted".
    await prisma.marketing_campaigns.update({
      where: { id: campaignId },
      data: {
        status: 'completed',
        metricsSent: { increment: accepted },
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      dryRun: false,
      attempted,
      accepted,
      failed,
      skipped,
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Campaign send error:', error)
    return NextResponse.json({ success: false, error: 'Failed to send campaign' }, { status: 500 })
  }
}
