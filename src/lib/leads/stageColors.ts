import type { LeadStage } from '@/generated/prisma'

/**
 * Canonical stage → color/label vocabulary for the whole CRM.
 * Every surface (counselor Kanban, mobile cards, lead detail badges,
 * admin tables, the color legend) reads from this table so a stage is
 * the same hue everywhere.
 *
 * - `solid`: filled chip / Kanban column accent (white text)
 * - `badge`: soft pill for tables and detail headers
 */
export interface StageMeta {
  label: string
  solid: string
  badge: string
}

export const STAGE_META: Record<LeadStage, StageMeta> = {
  NEW_LEAD: { label: 'New Lead', solid: 'bg-blue-500', badge: 'bg-blue-100 text-blue-800' },
  DEMO_SCHEDULED: {
    label: 'Demo Scheduled',
    solid: 'bg-purple-500',
    badge: 'bg-purple-100 text-purple-800',
  },
  DEMO_COMPLETED: {
    label: 'Demo Done',
    solid: 'bg-indigo-500',
    badge: 'bg-indigo-100 text-indigo-800',
  },
  OFFER_SENT: {
    label: 'Offer Sent',
    solid: 'bg-orange-500',
    badge: 'bg-orange-100 text-orange-800',
  },
  NEGOTIATING: {
    label: 'Negotiating',
    solid: 'bg-yellow-500',
    badge: 'bg-yellow-100 text-yellow-800',
  },
  PAYMENT_PLAN_CREATED: {
    label: 'Payment Plan',
    solid: 'bg-green-600',
    badge: 'bg-green-100 text-green-800',
  },
  ENROLLED: { label: 'Enrolled', solid: 'bg-green-600', badge: 'bg-green-100 text-green-800' },
  ACTIVE_STUDENT: {
    label: 'Active Student',
    solid: 'bg-green-600',
    badge: 'bg-green-100 text-green-800',
  },
  LOST: { label: 'Lost', solid: 'bg-red-500', badge: 'bg-red-100 text-red-800' },
}

const FALLBACK: StageMeta = { label: '', solid: 'bg-gray-500', badge: 'bg-gray-100 text-gray-800' }

/** Case-insensitive lookup — some pages carry stages as lowercase strings. */
export function stageMeta(stage: string | null | undefined): StageMeta {
  if (!stage) return FALLBACK
  const meta = STAGE_META[stage.toUpperCase() as LeadStage]
  return meta || { ...FALLBACK, label: stage }
}

export function stageLabel(stage: string | null | undefined): string {
  return stageMeta(stage).label || String(stage ?? '')
}

export function stageBadgeClass(stage: string | null | undefined): string {
  return stageMeta(stage).badge
}

export function stageSolidClass(stage: string | null | undefined): string {
  return stageMeta(stage).solid
}
