import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { differenceInDays } from 'date-fns'

export const dynamic = 'force-dynamic'

// POST - Rescore all leads
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Fetch all active leads
    const leads = await prisma.leads.findMany({
      where: {
        stage: { notIn: ['ENROLLED', 'LOST'] },
      },
      include: {
        crm_communications: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
        tasks: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        notes: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        demo_bookings: true,
        fee_plans: true,
      },
    })

    let updated = 0

    for (const lead of leads) {
      let score = 0
      const breakdown: { rule: string; points: number }[] = []

      // ── Behavioral signals ──
      if (lead.demo_bookings) {
        if (lead.stage === 'DEMO_COMPLETED' || lead.stage === 'OFFER_SENT' || lead.stage === 'NEGOTIATING' || lead.stage === 'PAYMENT_PLAN_CREATED') {
          score += 30
          breakdown.push({ rule: 'Demo attended', points: 30 })
        } else if (lead.stage === 'DEMO_SCHEDULED') {
          score += 15
          breakdown.push({ rule: 'Demo scheduled', points: 15 })
        }
      }

      if (lead.fee_plans.length > 0) {
        score += 20
        breakdown.push({ rule: 'Fee plan created', points: 20 })
      }

      // ── Stage-based scoring ──
      const stageScores: Record<string, number> = {
        NEW_LEAD: 5,
        DEMO_SCHEDULED: 15,
        DEMO_COMPLETED: 30,
        OFFER_SENT: 45,
        NEGOTIATING: 60,
        PAYMENT_PLAN_CREATED: 80,
      }
      const stageScore = stageScores[lead.stage] || 0
      if (stageScore > 0) {
        // Don't double-count with demo, but add stage progression bonus
        const bonus = Math.max(0, stageScore - 30)
        if (bonus > 0) {
          score += bonus
          breakdown.push({ rule: `Stage: ${lead.stage}`, points: bonus })
        }
      }

      // ── Engagement signals ──
      const recentComms = lead.crm_communications.filter(
        (c) => differenceInDays(new Date(), new Date(c.createdAt)) <= 7
      )

      const whatsappReplies = recentComms.filter(
        (c) => c.channel === 'WHATSAPP' && c.type === 'INBOUND'
      )
      if (whatsappReplies.length > 0) {
        const pts = Math.min(whatsappReplies.length * 10, 30)
        score += pts
        breakdown.push({ rule: `WhatsApp replies (${whatsappReplies.length})`, points: pts })
      }

      const callsReceived = recentComms.filter(
        (c) => c.channel === 'PHONE' && c.type === 'INBOUND'
      )
      if (callsReceived.length > 0) {
        score += 25
        breakdown.push({ rule: 'Parent called back', points: 25 })
      }

      // ── Notes activity (more notes = more engagement) ──
      if (lead.notes.length >= 3) {
        score += 10
        breakdown.push({ rule: 'Multiple session notes', points: 10 })
      }

      // ── Negative signals ──
      if (lead.lastContactedAt) {
        const daysSinceContact = differenceInDays(new Date(), new Date(lead.lastContactedAt))
        if (daysSinceContact >= 14) {
          score -= 25
          breakdown.push({ rule: 'No contact 14+ days', points: -25 })
        } else if (daysSinceContact >= 7) {
          score -= 15
          breakdown.push({ rule: 'No contact 7+ days', points: -15 })
        }
      } else {
        // Never contacted
        const daysSinceCreated = differenceInDays(new Date(), new Date(lead.createdAt))
        if (daysSinceCreated >= 3) {
          score -= 20
          breakdown.push({ rule: 'Never contacted', points: -20 })
        }
      }

      // Overdue follow-up penalty
      if (lead.nextFollowUpAt && new Date(lead.nextFollowUpAt) < new Date()) {
        const overdueDays = differenceInDays(new Date(), new Date(lead.nextFollowUpAt))
        if (overdueDays >= 3) {
          score -= 10
          breakdown.push({ rule: 'Follow-up overdue', points: -10 })
        }
      }

      // Clamp score
      const finalScore = Math.max(0, Math.min(score, 100))

      // Determine priority
      let priority = 'COLD'
      if (finalScore >= 70) priority = 'HOT'
      else if (finalScore >= 40) priority = 'WARM'

      // Update lead
      await prisma.leads.update({
        where: { id: lead.id },
        data: {
          score: finalScore,
          scoreBreakdown: breakdown,
          scoreUpdatedAt: new Date(),
          priority: priority as any,
          updatedAt: new Date(),
        },
      })

      updated++
    }

    return NextResponse.json({
      data: { updated, total: leads.length },
    })
  } catch (error) {
    console.error('Error rescoring leads:', error)
    return NextResponse.json({ error: 'Failed to rescore leads' }, { status: 500 })
  }
}
