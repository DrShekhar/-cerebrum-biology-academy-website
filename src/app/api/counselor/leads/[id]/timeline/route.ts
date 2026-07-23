import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export interface TimelineEntry {
  id: string
  kind: 'activity' | 'note' | 'communication' | 'task'
  at: string
  actor: string | null
  title: string
  body: string | null
  meta: Record<string, unknown>
}

/**
 * GET /api/counselor/leads/[id]/timeline — the FULL historical record of a
 * lead in one chronological feed: every activity (system events, logged
 * interactions, stage changes), every note/comment, every communication
 * (calls/WhatsApp/email with what was discussed), and every task (what was
 * planned, and what's due next).
 */
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    if (!['COUNSELOR', 'ADMIN'].includes((session.user.role || '').toUpperCase())) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
    }

    // Tenant isolation matches the notes route.
    const isAdmin = (session.user.role || '').toUpperCase() === 'ADMIN'
    const lead = await prisma.leads.findFirst({
      where: { id: params.id, ...(isAdmin ? {} : { assignedToId: session.user.id }) },
      select: {
        id: true,
        studentName: true,
        stage: true,
        priority: true,
        courseInterest: true,
        nextFollowUpAt: true,
        lastContactedAt: true,
        createdAt: true,
        score: true,
        users: { select: { id: true, name: true } },
      },
    })
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
    }

    const [activities, notes, communications, tasks] = await Promise.all([
      prisma.activities.findMany({
        where: { leadId: params.id },
        orderBy: { createdAt: 'desc' },
        take: 200,
        include: { users: { select: { name: true } } },
      }),
      prisma.notes.findMany({
        where: { leadId: params.id },
        orderBy: { createdAt: 'desc' },
        take: 200,
        include: { users: { select: { name: true } } },
      }),
      prisma.crm_communications.findMany({
        where: { leadId: params.id },
        orderBy: { sentAt: 'desc' },
        take: 200,
        include: { users: { select: { name: true } } },
      }),
      prisma.tasks.findMany({
        where: { leadId: params.id },
        orderBy: { createdAt: 'desc' },
        take: 100,
        include: { users_tasks_assignedToIdTousers: { select: { name: true } } },
      }),
    ])

    const entries: TimelineEntry[] = [
      ...activities.map((a) => ({
        id: a.id,
        kind: 'activity' as const,
        at: a.createdAt.toISOString(),
        actor: a.users?.name || null,
        title: a.action.replace(/_/g, ' ').toLowerCase(),
        body: a.description,
        meta: { action: a.action, ...(a.metadata as Record<string, unknown> | null) },
      })),
      ...notes.map((n) => ({
        id: n.id,
        kind: 'note' as const,
        at: n.createdAt.toISOString(),
        actor: n.users?.name || null,
        title: n.parentId ? 'reply' : 'note',
        body: n.content,
        meta: { parentId: n.parentId, mentionedUserIds: n.mentionedUserIds },
      })),
      ...communications.map((c) => ({
        id: c.id,
        kind: 'communication' as const,
        at: c.sentAt.toISOString(),
        actor: c.users?.name || null,
        title: `${c.type.toLowerCase()} (${c.direction.toLowerCase()})${c.subject ? ` — ${c.subject}` : ''}`,
        body: c.callSummary || c.message,
        meta: {
          type: c.type,
          direction: c.direction,
          status: c.status,
          callDuration: c.callDuration,
          actionItems: c.actionItems,
        },
      })),
      ...tasks.map((t) => ({
        id: t.id,
        kind: 'task' as const,
        at: t.createdAt.toISOString(),
        actor: t.users_tasks_assignedToIdTousers?.name || null,
        title: `task: ${t.title}`,
        body: t.description,
        meta: {
          status: t.status,
          type: t.type,
          priority: t.priority,
          dueDate: t.dueDate?.toISOString() || null,
          completedAt: t.completedAt?.toISOString() || null,
        },
      })),
    ].sort((a, b) => (a.at < b.at ? 1 : -1))

    const nextDueTask = tasks
      .filter((t) => t.status === 'PENDING' || t.status === 'IN_PROGRESS')
      .sort((a, b) => (a.dueDate?.getTime() || Infinity) - (b.dueDate?.getTime() || Infinity))[0]

    return NextResponse.json({
      success: true,
      data: {
        lead: {
          id: lead.id,
          studentName: lead.studentName,
          stage: lead.stage,
          priority: lead.priority,
          requirement: lead.courseInterest,
          nextFollowUpAt: lead.nextFollowUpAt,
          lastContactedAt: lead.lastContactedAt,
          createdAt: lead.createdAt,
          score: lead.score,
          assignedTo: lead.users ? { id: lead.users.id, name: lead.users.name } : null,
        },
        nextDue: nextDueTask
          ? {
              taskId: nextDueTask.id,
              title: nextDueTask.title,
              dueDate: nextDueTask.dueDate,
              status: nextDueTask.status,
            }
          : null,
        entries,
      },
    })
  } catch (error) {
    console.error('Error building lead timeline:', error)
    return NextResponse.json({ success: false, error: 'Failed to load timeline' }, { status: 500 })
  }
}
