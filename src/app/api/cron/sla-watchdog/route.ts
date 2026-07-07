import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { prisma } from '@/lib/prisma'
import { verifyCronAuth } from '@/lib/auth/cron-auth'
import { notifyStaff } from '@/lib/staff/notify'
import { sendAdminLeadNotification } from '@/lib/notifications/adminLeadNotification'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * Speed-to-lead SLA watchdog (runs every 10 minutes).
 *
 * A NEW_LEAD that is ≥15 minutes old with no outbound contact (no
 * lastContactedAt, no logged communication) gets escalated ONCE:
 *  - staff bell (SLA_BREACH) to the assigned counselor + all admins
 *  - admin WhatsApp alert (skips gracefully until keys are configured)
 * The escalation is recorded as an `sla_escalated` activity so reruns
 * never double-fire.
 */
export async function GET(request: NextRequest) {
  const auth = verifyCronAuth(request)
  if (!auth.authorized) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const cutoff = new Date(Date.now() - 15 * 60 * 1000)
    const floor = new Date(Date.now() - 24 * 60 * 60 * 1000) // ignore ancient backlog

    const stale = await prisma.leads.findMany({
      where: {
        stage: 'NEW_LEAD',
        createdAt: { lte: cutoff, gte: floor },
        lastContactedAt: null,
        crm_communications: { none: {} },
        activities: { none: { action: 'sla_escalated' } },
      },
      select: {
        id: true,
        studentName: true,
        phone: true,
        courseInterest: true,
        priority: true,
        source: true,
        createdAt: true,
        assignedToId: true,
      },
      take: 25,
      orderBy: { createdAt: 'asc' },
    })

    if (stale.length === 0) {
      return NextResponse.json({ success: true, escalated: 0 })
    }

    const admins = await prisma.users.findMany({
      where: { role: 'ADMIN' },
      select: { id: true },
    })
    const adminIds = admins.map((a) => a.id)

    let escalated = 0
    for (const lead of stale) {
      const minutes = Math.round((Date.now() - lead.createdAt.getTime()) / 60000)

      // Mark FIRST — if anything below fails we'd rather under-alert than spam.
      await prisma.activities.create({
        data: {
          id: randomUUID(),
          userId: lead.assignedToId || adminIds[0] || 'system',
          leadId: lead.id,
          action: 'sla_escalated',
          description: `SLA breach: uncontacted for ${minutes} minutes after creation`,
          metadata: { minutes, priority: lead.priority },
        },
      })

      await notifyStaff({
        userIds: [...(lead.assignedToId ? [lead.assignedToId] : []), ...adminIds],
        type: 'SLA_BREACH',
        title: `⏱ Uncontacted lead: ${lead.studentName}`,
        body: `${minutes} min without first contact · ${lead.courseInterest || 'no course noted'} · ${lead.priority}`,
        href: `/counselor/leads/${lead.id}`,
        leadId: lead.id,
      })

      // Owner WhatsApp ping (no-op until WhatsApp keys are configured).
      void sendAdminLeadNotification({
        name: `⏱ SLA BREACH (${minutes}m): ${lead.studentName}`,
        phone: lead.phone,
        type: 'callback_request',
        courseInterest: lead.courseInterest || undefined,
        message: `Lead uncontacted for ${minutes} minutes (source: ${lead.source || 'unknown'})`,
      }).catch(() => {})

      escalated++
    }

    return NextResponse.json({ success: true, escalated })
  } catch (error) {
    console.error('[cron/sla-watchdog] failed:', error)
    return NextResponse.json({ success: false, error: 'Watchdog failed' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
