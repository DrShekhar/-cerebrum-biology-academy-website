/**
 * upsertLead — additive CRM capture.
 *
 * Drops a prospect into the `leads` CRM (the counselor pipeline) WITHOUT
 * touching the caller's existing behaviour. Public forms keep writing their
 * capture-log row (content_leads / contact_inquiries) and keep handing the
 * user to WhatsApp exactly as before; this just ALSO ensures one CRM lead per
 * person, deduped by phone, with an assigned counselor + follow-up task.
 *
 * Two entry points:
 *
 * - upsertLead(input): fire-and-forget wrapper. Never throws — on any failure
 *   it logs and returns null. Fires side effects (admin notification, score,
 *   welcome series) AFTER the write. Use from public form routes:
 *   void upsertLead(...).catch(() => {})
 *
 * - upsertLeadCore(db, input): the write itself, THROWS on failure and runs
 *   against any Prisma handle — pass a $transaction client to make the lead
 *   write atomic with the caller's own writes (demo bookings). No external
 *   I/O happens inside core, so it is safe inside a transaction; callers own
 *   post-commit side effects.
 */

import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/utils/logger'
import { sendAdminLeadNotification } from '@/lib/notifications/adminLeadNotification'
import { notifyStaff } from '@/lib/staff/notify'
import { updateLeadScore } from '@/lib/leadScoring'
import { startWelcomeSeries } from '@/lib/whatsapp/welcomeSeries'
import { sendCapiEvent } from '@/lib/marketing/metaCapi'
import { getSettings } from '@/lib/settings/siteSettings'
import { normalizePhone } from '@/lib/leads/phone'
import type { LeadSource, LeadStage, Priority, Prisma, PrismaClient } from '@/generated/prisma'

export { normalizePhone }

export type LeadDb = PrismaClient | Prisma.TransactionClient

export interface UpsertLeadInput {
  name?: string | null
  phone: string
  email?: string | null
  /** Free-text course/interest context for the counselor. */
  courseInterest?: string | null
  /** Free-text origin (e.g. 'city-hub-inline:patna', 'contact-form', 'olympiad-uk'). */
  source?: string | null
  /** Optional message/notes to surface in the activity log. */
  message?: string | null
  utmSource?: string | null
  utmMedium?: string | null
  utmCampaign?: string | null
  utmTerm?: string | null
  utmContent?: string | null
  referrerUrl?: string | null
  gclid?: string | null
  fbclid?: string | null
  /** Lead priority (HOT/WARM/COLD). Defaults to WARM. */
  priority?: Priority
}

export interface UpsertLeadCoreInput extends UpsertLeadInput {
  /**
   * Explicit LeadSource enum (staff-chosen). Wins over mapLeadSource(source)
   * free-text inference.
   */
  sourceEnum?: LeadSource
  /** Initial stage for a newly created lead (default NEW_LEAD). */
  stage?: LeadStage
  /** Link the lead to a demo booking (unique FK on leads.demoBookingId). */
  demoBookingId?: string | null
  /**
   * Operator-chosen assignee (staff manual creates). Skips round-robin and
   * the autoAssignLeads setting.
   */
  assignedToId?: string | null
  /** Suppress the auto follow-up task (caller creates its own). */
  skipTask?: boolean
}

export interface UpsertLeadResult {
  leadId: string
  created: boolean
  assignedToId: string
}

/** Map a free-text source string to the LeadSource enum; raw kept in sourceDetail. */
export function mapLeadSource(source?: string | null): LeadSource {
  const s = (source || '').toLowerCase()
  if (s.includes('whatsapp') || s.includes('wa-')) return 'WHATSAPP'
  if (s.includes('referral') || s.includes('refer')) return 'REFERRAL'
  if (s.includes('event') || s.includes('seminar') || s.includes('webinar')) return 'EVENT'
  if (s.includes('ads') || s.includes('gclid') || s.includes('campaign')) return 'ADVERTISEMENT'
  if (s.includes('social') || s.includes('instagram') || s.includes('facebook'))
    return 'SOCIAL_MEDIA'
  return 'WEBSITE'
}

function rand(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

// Pipeline order — touchpoints may only advance a lead (LOST reopens).
const STAGE_RANK: Record<LeadStage, number> = {
  NEW_LEAD: 0,
  DEMO_SCHEDULED: 1,
  DEMO_COMPLETED: 2,
  OFFER_SENT: 3,
  NEGOTIATING: 4,
  PAYMENT_PLAN_CREATED: 5,
  ENROLLED: 6,
  ACTIVE_STUDENT: 7,
  LOST: -1,
}

function stageRank(stage: LeadStage): number {
  return STAGE_RANK[stage] ?? 0
}

/**
 * The canonical lead write: dedup by phone → create-or-touch (always stamping
 * phoneNormalized) → activity → optional follow-up task. THROWS on failure.
 * No external I/O — safe inside a $transaction.
 */
export async function upsertLeadCore(
  db: LeadDb,
  input: UpsertLeadCoreInput
): Promise<UpsertLeadResult> {
  const phone = normalizePhone(input.phone || '')
  // Need at least 8 digits to be a usable lead.
  if (phone.replace(/\D/g, '').length < 8) {
    throw new Error('upsertLeadCore: phone too short to be a usable lead')
  }

  const name = input.name?.trim() || null
  const email = input.email?.trim() || null
  const sourceDetail = input.source?.trim() || null

  // Dedup by phone — one CRM lead per person. Match on the last 10 digits so
  // a bare-10 incoming Indian number matches a legacy row stored as
  // "+919876543210" (15/18 existing rows use the +91 form). International
  // numbers (>10 digits after normalize) match exactly.
  const last10 = phone.slice(-10)
  // Dedup on phoneNormalized (indexed, backfilled) with a fallback to the
  // legacy phone endsWith for rows not yet backfilled.
  const existing = await db.leads.findFirst({
    where: { OR: [{ phoneNormalized: last10 }, { phone: { endsWith: last10 } }] },
    select: { id: true, studentName: true, email: true, assignedToId: true, stage: true },
  })

  if (existing) {
    // Touchpoint: bump contact time + fill blanks only (never overwrite
    // counselor edits), and log an activity. Do NOT create a duplicate lead
    // or a new task.
    //
    // Stage on a touchpoint may only move the lead FORWARD (or reopen a LOST
    // lead) — a repeat demo submission must never drag an ENROLLED/NEGOTIATING
    // lead back to DEMO_SCHEDULED.
    const newStage =
      input.stage &&
      input.stage !== existing.stage &&
      (existing.stage === 'LOST' || stageRank(input.stage) > stageRank(existing.stage))
        ? input.stage
        : null

    await db.leads.update({
      where: { id: existing.id },
      data: {
        updatedAt: new Date(),
        phoneNormalized: last10, // backfill legacy rows on first touch
        ...(name && !existing.studentName ? { studentName: name } : {}),
        ...(email && !existing.email ? { email } : {}),
        ...(input.demoBookingId ? { demoBookingId: input.demoBookingId } : {}),
        ...(newStage ? { stage: newStage } : {}),
        ...(input.priority ? { priority: input.priority } : {}),
      },
    })
    await db.activities.create({
      data: {
        id: rand('act'),
        leadId: existing.id,
        userId: existing.assignedToId,
        action: 'LEAD_TOUCHPOINT',
        description: `New form submission${sourceDetail ? ` via ${sourceDetail}` : ''}${
          input.message ? ` — ${input.message.slice(0, 200)}` : ''
        }`,
        metadata: {
          source: sourceDetail,
          utmSource: input.utmSource,
          utmMedium: input.utmMedium,
          utmCampaign: input.utmCampaign,
          gclid: input.gclid,
        },
      },
    })
    if (newStage) {
      await db.activities.create({
        data: {
          id: rand('act'),
          leadId: existing.id,
          userId: existing.assignedToId,
          action: 'stage_changed',
          description: `Stage: ${String(existing.stage).replace(/_/g, ' ')} → ${String(newStage).replace(/_/g, ' ')} (via ${sourceDetail || 'form touchpoint'})`,
        },
      })
    }
    return { leadId: existing.id, created: false, assignedToId: existing.assignedToId }
  }

  // Resolve assignee. Operator-chosen assignee wins (staff manual creates);
  // otherwise round-robin to the COUNSELOR/ADMIN with the fewest leads. With
  // autoAssignLeads off (site settings), leads park on an ADMIN for manual
  // triage — assignedToId is a required FK, so "unassigned" is admin-held.
  let assigneeId = input.assignedToId || null
  if (!assigneeId) {
    let autoAssign = true
    try {
      autoAssign = (await getSettings('general')).autoAssignLeads
    } catch {
      // settings unavailable — keep auto-assign on
    }
    // HOT leads route to the best recent converter (last 30 days of KPI
    // rows); everyone else round-robins to the least-loaded counselor.
    // Falls through to round-robin when no KPI data exists yet.
    let counselor: { id: string } | null = null
    if (autoAssign && input.priority === 'HOT') {
      try {
        const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        const top = await db.counselor_kpis.groupBy({
          by: ['counselorId'],
          where: { date: { gte: since }, users: { role: 'COUNSELOR', isActive: true } },
          _avg: { conversionRate: true },
          orderBy: { _avg: { conversionRate: 'desc' } },
          take: 1,
        })
        if (top[0]?._avg.conversionRate && Number(top[0]._avg.conversionRate) > 0) {
          counselor = { id: top[0].counselorId }
        }
      } catch {
        // KPI data unavailable — fall through to round-robin
      }
    }
    if (autoAssign && !counselor) {
      counselor = await db.users.findFirst({
        where: { role: { in: ['COUNSELOR', 'ADMIN'] }, isActive: true },
        orderBy: { leads: { _count: 'asc' } },
        select: { id: true },
      })
    }
    const admin =
      counselor ||
      (await db.users.findFirst({ where: { role: 'ADMIN', isActive: true }, select: { id: true } }))
    assigneeId = admin?.id || null
  }

  if (!assigneeId) {
    throw new Error('upsertLeadCore: no COUNSELOR/ADMIN to assign the lead to')
  }

  const leadId = rand('lead')
  try {
    await db.leads.create({
      data: {
        id: leadId,
        studentName: name || 'Website Lead',
        phone,
        phoneNormalized: last10,
        email,
        courseInterest: input.courseInterest?.trim() || 'Biology coaching (website enquiry)',
        stage: input.stage || 'NEW_LEAD',
        priority: input.priority || 'WARM',
        source: input.sourceEnum || mapLeadSource(input.source),
        sourceDetail,
        assignedToId: assigneeId,
        demoBookingId: input.demoBookingId || null,
        // UTM columns spread conditionally so the INSERT never references
        // them unless a value exists — deploy stays safe even if the
        // add_leads_utm migration lags behind the code.
        ...(input.utmSource ? { utmSource: input.utmSource } : {}),
        ...(input.utmMedium ? { utmMedium: input.utmMedium } : {}),
        ...(input.utmCampaign ? { utmCampaign: input.utmCampaign } : {}),
        ...(input.utmTerm ? { utmTerm: input.utmTerm } : {}),
        ...(input.utmContent ? { utmContent: input.utmContent } : {}),
        ...(input.referrerUrl ? { referrerUrl: input.referrerUrl } : {}),
        gclid: input.gclid,
        ...(input.fbclid ? { fbclid: input.fbclid } : {}),
        nextFollowUpAt: new Date(Date.now() + 30 * 60 * 1000),
        // lastContactedAt intentionally NOT set: it means "we reached out"
        // (outbound). Creation/inbound touches must not look like contact —
        // the SLA watchdog and response-time KPIs depend on this.
        updatedAt: new Date(),
      },
    })
  } catch (createError) {
    // P2002 on phoneNormalized = a concurrent request created this lead
    // between our findFirst and create (the unique index closes the race at
    // the DB level). Re-run dedup and convert to a touchpoint.
    const isUniqueViolation =
      typeof createError === 'object' &&
      createError !== null &&
      (createError as { code?: string }).code === 'P2002'
    if (!isUniqueViolation) throw createError

    const racedLead = await db.leads.findFirst({
      where: { phoneNormalized: last10 },
      select: { id: true, assignedToId: true },
    })
    if (!racedLead) throw createError
    await db.leads.update({
      where: { id: racedLead.id },
      data: { lastContactedAt: new Date(), updatedAt: new Date() },
    })
    return { leadId: racedLead.id, created: false, assignedToId: racedLead.assignedToId }
  }

  await db.activities.create({
    data: {
      id: rand('act'),
      leadId,
      userId: assigneeId,
      action: 'LEAD_CREATED',
      description: `Lead auto-captured from website form${sourceDetail ? ` (${sourceDetail})` : ''}${
        input.message ? ` — ${input.message.slice(0, 200)}` : ''
      }`,
      metadata: {
        source: sourceDetail,
        utmSource: input.utmSource,
        utmMedium: input.utmMedium,
        utmCampaign: input.utmCampaign,
        gclid: input.gclid,
      },
    },
  })

  if (!input.skipTask) {
    // Follow-up task on the assigned counselor's board (owner-confirmed).
    await db.tasks.create({
      data: {
        id: rand('task'),
        title: `🔥 New website lead — ${name || phone}`,
        description: `Auto-captured from a website form${sourceDetail ? ` (${sourceDetail})` : ''}.
Phone: ${phone}${email ? `\nEmail: ${email}` : ''}${
          input.courseInterest ? `\nInterest: ${input.courseInterest}` : ''
        }${input.message ? `\n\nMessage: ${input.message.slice(0, 500)}` : ''}

⚡ Call within 30 minutes for best conversion.`,
        type: 'FOLLOW_UP_CALL',
        priority: 'HIGH',
        dueDate: new Date(Date.now() + 30 * 60 * 1000),
        status: 'PENDING',
        leadId,
        assignedToId: assigneeId,
        createdById: assigneeId,
        isAutoGenerated: true,
        triggerEvent: 'website_form_capture',
        updatedAt: new Date(),
      },
    })
  }

  return { leadId, created: true, assignedToId: assigneeId }
}

export async function upsertLead(
  input: UpsertLeadInput
): Promise<{ leadId: string; created: boolean } | null> {
  try {
    const result = await upsertLeadCore(prisma, input)
    const { leadId, created } = result

    if (created) {
      logger.info('upsertLead: CRM lead created', {
        service: 'upsert-lead',
        leadId,
        source: input.source?.trim() || null,
      })

      // Fire-and-forget: WhatsApp alert to admin + initial score. Without this,
      // leads captured via generic forms (enquiry/blog/exit-intent) land in the
      // CRM silently and wait for task discovery.
      void sendAdminLeadNotification({
        name: input.name?.trim() || 'Website Lead',
        phone: normalizePhone(input.phone || ''),
        email: input.email?.trim() || undefined,
        type: 'course_interest',
        courseInterest: input.courseInterest?.trim() || undefined,
        message: input.message?.slice(0, 300) || undefined,
        source: input.source?.trim() || undefined,
        gclid: input.gclid || undefined,
        utmSource: input.utmSource || undefined,
        utmMedium: input.utmMedium || undefined,
        leadId,
      }).catch(() => {})
      // Bell notification to the assigned counselor — speed-to-lead depends
      // on them seeing the assignment without refreshing the board.
      if (result.assignedToId) {
        void notifyStaff({
          userIds: [result.assignedToId],
          type: 'LEAD_ASSIGNED',
          title: 'New lead assigned to you',
          body: `${input.name?.trim() || 'Website lead'} · ${input.courseInterest?.trim() || 'Biology coaching'}`,
          href: `/counselor/leads/${leadId}`,
          leadId,
        }).catch(() => {})
      }
      // WhatsApp welcome series (day 0 now, day 1/3/7 via nurturing cron).
      // No-ops until INTERAKT_API_KEY is configured, so owner controls activation.
      void startWelcomeSeries(leadId).catch(() => {})
      // Ad-platform feedback: a real CRM lead (deduped) — not a raw click.
      void sendCapiEvent({
        eventName: 'Lead',
        phone: input.phone,
        email: input.email,
        eventId: `${leadId}:created`,
      })
    }

    // New leads get an initial score; touchpoints change engagement signals.
    void updateLeadScore(leadId).catch(() => {})

    return { leadId, created }
  } catch (error) {
    // Never break the caller — the capture-log row + WhatsApp already hold it.
    logger.error('upsertLead failed (non-blocking)', {
      service: 'upsert-lead',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    return null
  }
}
