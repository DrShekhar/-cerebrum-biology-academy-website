/**
 * leadService — the single implementation behind BOTH lead API namespaces.
 *
 * /api/admin/leads/* and /api/counselor/leads/* stay separate routes (their
 * auth wrappers and response shapes differ), but the queries and mutations
 * they run are defined once here. Role scoping is uniform: COUNSELOR sees
 * only leads assigned to them; ADMIN sees everything.
 */

import { prisma } from '@/lib/prisma'
import { inngest } from '@/inngest/client'
import type { LeadSource, LeadStage, Priority, Prisma } from '@/generated/prisma'

export interface LeadViewer {
  userId: string
  /** UPPERCASE role, e.g. 'ADMIN' | 'COUNSELOR' */
  role: string
}

export function leadScopeFor(viewer: LeadViewer): Prisma.leadsWhereInput {
  return viewer.role === 'ADMIN' ? {} : { assignedToId: viewer.userId }
}

// ─── Listing ─────────────────────────────────────────────────────────────────

export interface LeadListFilters {
  stage?: LeadStage | null
  priority?: Priority | null
  source?: LeadSource | null
  assignedToId?: string | null
  search?: string | null
  dateFrom?: string | null
  dateTo?: string | null
  /** Include courseInterest in the text search (admin table does). */
  searchCourseInterest?: boolean
}

export function buildLeadListWhere(
  viewer: LeadViewer,
  filters: LeadListFilters
): Prisma.leadsWhereInput {
  const where: Prisma.leadsWhereInput = { ...leadScopeFor(viewer) }

  if (filters.stage) where.stage = filters.stage
  if (filters.priority) where.priority = filters.priority
  if (filters.source) where.source = filters.source
  // Explicit assignee filter is an admin oversight feature; it must not let a
  // counselor widen their own scope.
  if (filters.assignedToId && viewer.role === 'ADMIN') {
    where.assignedToId = filters.assignedToId
  }

  if (filters.search) {
    where.OR = [
      { studentName: { contains: filters.search, mode: 'insensitive' } },
      { phone: { contains: filters.search } },
      { email: { contains: filters.search, mode: 'insensitive' } },
      ...(filters.searchCourseInterest
        ? [{ courseInterest: { contains: filters.search, mode: 'insensitive' as const } }]
        : []),
    ]
  }

  if (filters.dateFrom || filters.dateTo) {
    where.createdAt = {
      ...(filters.dateFrom ? { gte: new Date(filters.dateFrom) } : {}),
      ...(filters.dateTo ? { lte: new Date(filters.dateTo) } : {}),
    }
  }

  return where
}

// ─── Detail ──────────────────────────────────────────────────────────────────

/** Superset include serving both detail pages; each wrapper maps its own shape. */
export const LEAD_DETAIL_INCLUDE = {
  users: { select: { id: true, name: true, email: true } },
  activities: {
    orderBy: { createdAt: 'desc' as const },
    take: 100,
    include: { users: { select: { name: true } } },
  },
  notes: {
    orderBy: { createdAt: 'desc' as const },
    take: 50,
    include: { users: { select: { id: true, name: true } } },
  },
  tasks: { orderBy: { createdAt: 'desc' as const }, take: 50 },
  crm_communications: { orderBy: { sentAt: 'desc' as const }, take: 50 },
  offers: { orderBy: { createdAt: 'desc' as const }, take: 20 },
  fee_plans: { include: { installments: { orderBy: { dueDate: 'asc' as const } } } },
  demo_bookings: true,
  _count: { select: { crm_communications: true, tasks: true, notes: true } },
} satisfies Prisma.leadsInclude

export type LeadDetailRecord = Prisma.leadsGetPayload<{ include: typeof LEAD_DETAIL_INCLUDE }>

export async function getLeadDetail(
  viewer: LeadViewer,
  id: string
): Promise<LeadDetailRecord | null> {
  return prisma.leads.findFirst({
    where: { id, ...leadScopeFor(viewer) },
    include: LEAD_DETAIL_INCLUDE,
  })
}

// ─── Update ──────────────────────────────────────────────────────────────────

export interface LeadUpdatePatch {
  studentName?: string
  email?: string | null
  phone?: string
  courseInterest?: string
  source?: LeadSource
  stage?: LeadStage
  priority?: Priority
  assignedToId?: string
  nextFollowUpAt?: Date | string | null
  lastContactedAt?: Date | string | null
  lostReason?: string | null
}

/**
 * Field updates with uniform stage-transition side effects: LOST stamps
 * lostAt, ENROLLED stamps convertedAt + fires the lead/enrolled onboarding
 * event, and every stage change lands on the lead's activity timeline.
 * Returns null when the lead is outside the viewer's scope.
 */
export async function updateLeadFields(viewer: LeadViewer, id: string, patch: LeadUpdatePatch) {
  const prior = await prisma.leads.findFirst({
    where: { id, ...leadScopeFor(viewer) },
    select: { id: true, stage: true, courseInterest: true, assignedToId: true },
  })
  if (!prior) return null

  const data: Prisma.leadsUncheckedUpdateInput = { updatedAt: new Date() }
  if (patch.studentName !== undefined) data.studentName = patch.studentName
  if (patch.email !== undefined) data.email = patch.email
  if (patch.phone !== undefined) data.phone = patch.phone
  if (patch.courseInterest !== undefined) data.courseInterest = patch.courseInterest
  if (patch.source !== undefined) data.source = patch.source
  if (patch.stage !== undefined) data.stage = patch.stage
  if (patch.priority !== undefined) data.priority = patch.priority
  if (patch.assignedToId !== undefined) data.assignedToId = patch.assignedToId
  if (patch.nextFollowUpAt !== undefined) {
    data.nextFollowUpAt = patch.nextFollowUpAt ? new Date(patch.nextFollowUpAt) : null
  }
  if (patch.lastContactedAt !== undefined) {
    data.lastContactedAt = patch.lastContactedAt ? new Date(patch.lastContactedAt) : null
  }
  if (patch.lostReason !== undefined) data.lostReason = patch.lostReason

  // Timestamps stamp on the TRANSITION, not the value — re-saving an already
  // ENROLLED/LOST lead must not overwrite the original conversion/lost date.
  const stageChanged = patch.stage !== undefined && patch.stage !== prior.stage
  if (stageChanged && patch.stage === 'LOST') data.lostAt = new Date()
  if (stageChanged && patch.stage === 'ENROLLED') data.convertedAt = new Date()

  const updated = await prisma.leads.update({ where: { id }, data })

  if (stageChanged) {
    prisma.activities
      .create({
        data: {
          id: crypto.randomUUID(),
          action: 'stage_changed',
          description: `Stage: ${String(prior.stage).replace(/_/g, ' ')} → ${String(patch.stage).replace(/_/g, ' ')}`,
          leadId: id,
          userId: viewer.userId,
          createdAt: new Date(),
        },
      })
      .catch(() => {})
  }

  if (patch.stage === 'ENROLLED' && prior.stage !== 'ENROLLED') {
    await inngest.send({
      name: 'lead/enrolled',
      data: {
        leadId: updated.id,
        counselorId: prior.assignedToId,
        courseInterest: prior.courseInterest,
        amountPaid: 0, // manual ENROLLED via UI — payment may not be associated; onboarding still fires
        currency: 'INR',
      },
    })
  }

  return updated
}
