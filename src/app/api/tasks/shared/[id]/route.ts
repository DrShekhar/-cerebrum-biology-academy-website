import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { auth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

const STAFF_ROLES = ['ADMIN', 'TEACHER', 'COUNSELOR']

const patchSchema = z.object({
  status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'WONT_DO']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  assignedToId: z.string().nullable().optional(),
  resolutionNote: z.string().max(2000).optional(),
})

/**
 * PATCH a shared task — staff/admin only (update status, assign, resolve).
 * Resolving stamps resolvedBy/resolvedAt so nothing silently closes.
 */
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }
  const role = (session.user.role || '').toUpperCase()
  if (!STAFF_ROLES.includes(role)) {
    return NextResponse.json({ success: false, error: 'Staff access required' }, { status: 403 })
  }

  const { id } = await context.params
  const parsed = patchSchema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: 'Invalid update' }, { status: 400 })
  }
  const p = parsed.data

  const existing = await prisma.shared_tasks.findUnique({ where: { id }, select: { status: true } })
  if (!existing) {
    return NextResponse.json({ success: false, error: 'Task not found' }, { status: 404 })
  }

  const data: Record<string, unknown> = { updatedAt: new Date() }
  if (p.priority !== undefined) data.priority = p.priority
  if (p.assignedToId !== undefined) data.assignedToId = p.assignedToId
  if (p.resolutionNote !== undefined) data.resolutionNote = p.resolutionNote
  if (p.status !== undefined) {
    data.status = p.status
    const closing = p.status === 'RESOLVED' || p.status === 'WONT_DO'
    if (closing && existing.status !== p.status) {
      data.resolvedById = session.user.id
      data.resolvedAt = new Date()
    }
    if (!closing) {
      data.resolvedById = null
      data.resolvedAt = null
    }
  }

  try {
    const task = await prisma.shared_tasks.update({ where: { id }, data })
    return NextResponse.json({ success: true, data: { task } })
  } catch (error) {
    console.error('[tasks/shared/:id] PATCH failed:', error)
    return NextResponse.json({ success: false, error: 'Failed to update task' }, { status: 500 })
  }
}

/** DELETE — admin only (spam/mistaken entries). */
export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdminAuth()
    const { id } = await context.params
    await prisma.shared_tasks.deleteMany({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Error && error.message === 'Admin authentication required') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 })
  }
}
