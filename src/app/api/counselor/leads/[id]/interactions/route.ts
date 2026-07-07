import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'
import type { CommType, LeadStage } from '@/generated/prisma'

export const dynamic = 'force-dynamic'

const VALID_STAGES = [
  'NEW_LEAD',
  'DEMO_SCHEDULED',
  'DEMO_COMPLETED',
  'OFFER_SENT',
  'NEGOTIATING',
  'PAYMENT_PLAN_CREATED',
  'ENROLLED',
  'ACTIVE_STUDENT',
  'LOST',
] as const

const interactionSchema = z.object({
  channel: z.enum(['CALL', 'WHATSAPP', 'EMAIL', 'SMS', 'MEETING']),
  direction: z.enum(['OUTBOUND', 'INBOUND']).default('OUTBOUND'),
  /** What was discussed — the core of the interaction log. */
  discussed: z.string().min(1, 'Please describe what was discussed').max(5000),
  /** What was planned / agreed as next steps. */
  planned: z.string().max(2000).optional(),
  /** When the next follow-up is due (updates lead.nextFollowUpAt). */
  nextFollowUpAt: z.string().datetime({ offset: true }).optional(),
  /** Move the lead to a new stage as part of logging. */
  stage: z.enum(VALID_STAGES).optional(),
  /** The student's requirement (updates lead.courseInterest). */
  requirement: z.string().max(500).optional(),
  callDurationMinutes: z.number().int().min(0).max(600).optional(),
})

function rand(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

/**
 * POST /api/counselor/leads/[id]/interactions — "Log interaction".
 *
 * One submission records the full discussion trail on a lead: a
 * crm_communications row (who talked, channel, what was discussed), an
 * activities row for the timeline, and updates the lead's next follow-up /
 * stage / requirement. Every staff member can add one after each call or
 * conversation.
 */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (session.user.role !== 'COUNSELOR' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const parsed = interactionSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.issues },
        { status: 400 }
      )
    }
    const data = parsed.data

    // Tenant isolation: counselor logs interactions only on their own leads.
    const isAdmin = session.user.role === 'ADMIN'
    const lead = await prisma.leads.findFirst({
      where: { id: params.id, ...(isAdmin ? {} : { assignedToId: session.user.id }) },
      select: { id: true, studentName: true, stage: true },
    })
    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
    }

    const commType: CommType = data.channel === 'MEETING' ? 'CALL' : data.channel
    const stageChanged = data.stage && data.stage !== lead.stage

    const communication = await prisma.crm_communications.create({
      data: {
        id: rand('comm'),
        leadId: lead.id,
        type: commType,
        direction: data.direction,
        subject: data.channel === 'MEETING' ? 'In-person meeting' : null,
        message: data.discussed,
        status: 'SENT',
        sentById: session.user.id,
        callDuration: data.callDurationMinutes ? data.callDurationMinutes * 60 : null,
        actionItems: data.planned ? [data.planned] : [],
      },
    })

    await prisma.activities.create({
      data: {
        id: rand('act'),
        leadId: lead.id,
        userId: session.user.id,
        action: 'INTERACTION_LOGGED',
        description: `${data.channel === 'MEETING' ? 'Meeting' : data.channel.toLowerCase()} ${
          data.direction === 'INBOUND' ? 'from' : 'with'
        } ${lead.studentName}: ${data.discussed.slice(0, 300)}${
          data.planned ? ` | Planned: ${data.planned.slice(0, 200)}` : ''
        }`,
        metadata: {
          communicationId: communication.id,
          channel: data.channel,
          direction: data.direction,
          planned: data.planned || null,
          stageChange: stageChanged ? { from: lead.stage, to: data.stage } : null,
        },
      },
    })

    await prisma.leads.update({
      where: { id: lead.id },
      data: {
        lastContactedAt: new Date(),
        updatedAt: new Date(),
        ...(data.nextFollowUpAt ? { nextFollowUpAt: new Date(data.nextFollowUpAt) } : {}),
        ...(stageChanged ? { stage: data.stage as LeadStage } : {}),
        ...(data.requirement ? { courseInterest: data.requirement } : {}),
      },
    })

    if (stageChanged) {
      await prisma.activities.create({
        data: {
          id: rand('act'),
          leadId: lead.id,
          userId: session.user.id,
          action: 'STAGE_CHANGED',
          description: `Stage moved ${lead.stage} → ${data.stage} while logging an interaction`,
        },
      })
    }

    return NextResponse.json({ success: true, data: { communicationId: communication.id } })
  } catch (error) {
    console.error('Error logging interaction:', error)
    return NextResponse.json({ error: 'Failed to log interaction' }, { status: 500 })
  }
}
