import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { notifyStaff } from '@/lib/staff/notify'

export const dynamic = 'force-dynamic'

const STAFF_ROLES = ['ADMIN', 'TEACHER', 'COUNSELOR']
const CATEGORIES = ['SUPPORT', 'TECH', 'FEES', 'FEATURE', 'ACADEMIC', 'OTHER'] as const

/**
 * Shared task / request board.
 * GET  — staff/admin see all (filterable); a student/parent sees only their own.
 * POST — any authenticated user creates a task/request (stays OPEN until a
 *        staff member resolves it). New items bell the admins.
 */
export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }
  const role = (session.user.role || '').toUpperCase()
  const isStaff = STAFF_ROLES.includes(role)

  const sp = request.nextUrl.searchParams
  const status = sp.get('status')
  const category = sp.get('category')

  const where: Record<string, unknown> = {}
  if (!isStaff) where.createdById = session.user.id // students/parents: own only
  if (status && ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'WONT_DO'].includes(status)) where.status = status
  if (category && CATEGORIES.includes(category as (typeof CATEGORIES)[number])) where.category = category

  try {
    const [tasks, openCount] = await Promise.all([
      prisma.shared_tasks.findMany({
        where,
        orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
        take: 200,
      }),
      isStaff ? prisma.shared_tasks.count({ where: { status: { in: ['OPEN', 'IN_PROGRESS'] } } }) : Promise.resolve(0),
    ])
    return NextResponse.json({ success: true, data: { tasks, openCount, isStaff } })
  } catch (error) {
    console.error('[tasks/shared] GET failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to load tasks' }, { status: 500 })
  }
}

const createSchema = z.object({
  title: z.string().min(3).max(200),
  detail: z.string().max(4000).optional(),
  category: z.enum(CATEGORIES).default('OTHER'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
})

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }
  const parsed = createSchema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'A title (3+ chars) is required', details: parsed.error.issues },
      { status: 400 }
    )
  }
  try {
    const task = await prisma.shared_tasks.create({
      data: {
        id: randomUUID(),
        title: parsed.data.title.trim(),
        detail: parsed.data.detail?.trim() || null,
        category: parsed.data.category,
        priority: parsed.data.priority,
        status: 'OPEN',
        createdById: session.user.id,
        createdByRole: (session.user.role || 'STUDENT').toUpperCase(),
        createdByName: session.user.name || session.user.email || null,
        updatedAt: new Date(),
      },
    })

    // Bell all admins so a new request never sits unseen.
    const admins = await prisma.users.findMany({ where: { role: 'ADMIN' }, select: { id: true } })
    await notifyStaff({
      userIds: admins.map((a) => a.id),
      type: 'SYSTEM',
      title: `New ${parsed.data.category.toLowerCase()} request`,
      body: `${task.createdByName || 'Someone'}: ${task.title}`,
      href: `/admin/tasks?highlight=${task.id}`,
    })

    return NextResponse.json({ success: true, data: { task } }, { status: 201 })
  } catch (error) {
    console.error('[tasks/shared] POST failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to create task' }, { status: 500 })
  }
}
