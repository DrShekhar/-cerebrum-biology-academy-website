import { NextRequest, NextResponse } from 'next/server'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { prisma } from '@/lib/prisma'

// Counselor notifications, synthesized LIVE from real CRM state (no separate
// notifications table — nothing to drift or migrate). Previously this route
// didn't exist and the notifications page silently fell back to fabricated
// demo data, so counselors saw fake alerts.
//
// Sources:
//  - HOT_LEAD_NEW:      HOT leads assigned to me, created in the last 48h
//  - TASK_DUE:          my PENDING/IN_PROGRESS tasks due today or overdue
//  - LEAD_UNTOUCHED:    my open leads with no activity in 3+ days
//
// Read-state: items are ephemeral projections of live data, so PATCH is an
// acknowledged no-op (client keeps optimistic per-session read state). When a
// task completes or a lead is touched, its notification disappears naturally.

const DAY = 24 * 60 * 60 * 1000

export async function GET() {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error
    const { session } = authResult
    const now = Date.now()

    const [hotLeads, dueTasks, staleLeads] = await Promise.all([
      prisma.leads.findMany({
        where: {
          assignedToId: session.userId,
          priority: 'HOT',
          createdAt: { gte: new Date(now - 2 * DAY) },
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
        select: { id: true, studentName: true, createdAt: true, stage: true },
      }),
      prisma.tasks.findMany({
        where: {
          assignedToId: session.userId,
          status: { in: ['PENDING', 'IN_PROGRESS'] },
          dueDate: { lte: new Date(now + DAY) },
        },
        orderBy: { dueDate: 'asc' },
        take: 30,
        select: { id: true, title: true, dueDate: true, priority: true, leadId: true },
      }),
      prisma.leads.findMany({
        where: {
          assignedToId: session.userId,
          stage: { notIn: ['ENROLLED', 'ACTIVE_STUDENT', 'LOST'] },
          updatedAt: { lte: new Date(now - 3 * DAY) },
        },
        orderBy: { updatedAt: 'asc' },
        take: 15,
        select: { id: true, studentName: true, updatedAt: true },
      }),
    ])

    const notifications = [
      ...hotLeads.map((l) => ({
        id: `hot_${l.id}`,
        type: 'HOT_LEAD_NEW',
        priority: 'URGENT',
        title: 'New HOT lead assigned',
        message: `${l.studentName} — currently in ${String(l.stage).replace(/_/g, ' ').toLowerCase()}. Call while the interest is fresh.`,
        leadId: l.id,
        leadName: l.studentName,
        actionUrl: `/counselor/leads/${l.id}`,
        isRead: false,
        createdAt: l.createdAt.toISOString(),
      })),
      ...dueTasks.map((t) => {
        const overdue = t.dueDate.getTime() < now
        return {
          id: `task_${t.id}`,
          type: overdue ? 'OVERDUE_FOLLOWUP' : 'TASK_DUE',
          priority: overdue ? 'URGENT' : 'HIGH',
          title: overdue ? 'Overdue task' : 'Task due soon',
          message: t.title,
          leadId: t.leadId || undefined,
          actionUrl: '/counselor/tasks',
          isRead: false,
          createdAt: t.dueDate.toISOString(),
        }
      }),
      ...staleLeads.map((l) => ({
        id: `stale_${l.id}`,
        type: 'LEAD_UNTOUCHED',
        priority: 'MEDIUM',
        title: 'Lead going cold',
        message: `${l.studentName} — no activity since ${l.updatedAt.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short' })}.`,
        leadId: l.id,
        leadName: l.studentName,
        actionUrl: `/counselor/leads/${l.id}`,
        isRead: false,
        createdAt: l.updatedAt.toISOString(),
      })),
    ].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))

    return NextResponse.json({ success: true, data: notifications })
  } catch (error) {
    console.error('[counselor/notifications] GET failed:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load notifications' },
      { status: 500 }
    )
  }
}

// Notifications are live projections (no stored rows), so read-state is
// client-side. Acknowledge so the page's optimistic update settles cleanly.
export async function PATCH(_request: NextRequest) {
  const authResult = await authenticateCounselor()
  if ('error' in authResult) return authResult.error
  return NextResponse.json({ success: true })
}
