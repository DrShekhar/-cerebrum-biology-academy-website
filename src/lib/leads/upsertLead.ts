/**
 * upsertLead — additive CRM capture.
 *
 * Drops a prospect into the `leads` CRM (the counselor pipeline) WITHOUT
 * touching the caller's existing behaviour. Public forms keep writing their
 * capture-log row (content_leads / contact_inquiries) and keep handing the
 * user to WhatsApp exactly as before; this just ALSO ensures one CRM lead per
 * person, deduped by phone, with an assigned counselor + follow-up task.
 *
 * Designed to be called fire-and-forget:  void upsertLead(...).catch(() => {})
 * It never throws — on any failure (incl. no staff to assign to) it logs and
 * returns null, so the capture-log row + WhatsApp handoff already hold the lead.
 *
 * Extracted from the proven pattern in src/app/api/aria/lead-capture/route.ts.
 */

import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/utils/logger'
import { sendAdminLeadNotification } from '@/lib/notifications/adminLeadNotification'
import { updateLeadScore } from '@/lib/leadScoring'
import { startWelcomeSeries } from '@/lib/whatsapp/welcomeSeries'
import type { LeadSource, Priority } from '@/generated/prisma'

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
  gclid?: string | null
  /** Lead priority (HOT/WARM/COLD). Defaults to WARM. */
  priority?: Priority
}

/**
 * Normalise a phone the same way /api/enquiry + /api/contact/inquiry do:
 * Indian numbers (with/without +91/91/0) collapse to bare 10 digits so they
 * match existing CRM rows; other countries keep their full digit string.
 */
function normalizePhone(raw: string): string {
  const allDigits = raw.replace(/\D/g, '')
  const isIndian = /^(91)?[6-9]\d{9}$/.test(allDigits) || /^0[6-9]\d{9}$/.test(allDigits)
  return isIndian ? allDigits.slice(-10) : allDigits
}

/** Map a free-text source string to the LeadSource enum; raw kept in sourceDetail. */
function mapLeadSource(source?: string | null): LeadSource {
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

export async function upsertLead(
  input: UpsertLeadInput
): Promise<{ leadId: string; created: boolean } | null> {
  try {
    const phone = normalizePhone(input.phone || '')
    // Need at least 8 digits to be a usable lead; otherwise skip silently.
    if (phone.replace(/\D/g, '').length < 8) return null

    const name = input.name?.trim() || null
    const email = input.email?.trim() || null
    const sourceDetail = input.source?.trim() || null

    // Dedup by phone — one CRM lead per person. Match on the last 10 digits so
    // a bare-10 incoming Indian number matches a legacy row stored as
    // "+919876543210" (15/18 existing rows use the +91 form). International
    // numbers (>10 digits after normalize) match exactly.
    const last10 = phone.slice(-10)
    const existing = await prisma.leads.findFirst({
      where: phone.length === 10 ? { phone: { endsWith: last10 } } : { phone },
      select: { id: true, studentName: true, email: true, assignedToId: true },
    })

    if (existing) {
      // Touchpoint: bump contact time + fill blanks only (never overwrite
      // counselor edits), and log an activity. Do NOT create a duplicate lead
      // or a new task.
      await prisma.leads.update({
        where: { id: existing.id },
        data: {
          lastContactedAt: new Date(),
          updatedAt: new Date(),
          ...(name && !existing.studentName ? { studentName: name } : {}),
          ...(email && !existing.email ? { email } : {}),
        },
      })
      await prisma.activities.create({
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
      // Touchpoints change engagement signals — rescore in the background.
      void updateLeadScore(existing.id).catch(() => {})
      return { leadId: existing.id, created: false }
    }

    // Resolve assignee: round-robin to the COUNSELOR/ADMIN with the fewest
    // leads; fall back to any ADMIN. Null-safe — if no staff exist, skip.
    const counselor = await prisma.users.findFirst({
      where: { role: { in: ['COUNSELOR', 'ADMIN'] } },
      orderBy: { leads: { _count: 'asc' } },
      select: { id: true },
    })
    const assignee =
      counselor ||
      (await prisma.users.findFirst({ where: { role: 'ADMIN' }, select: { id: true } }))

    if (!assignee) {
      logger.warn('upsertLead: no COUNSELOR/ADMIN to assign — CRM lead skipped', {
        service: 'upsert-lead',
        phone,
      })
      return null
    }

    const leadId = rand('lead')
    await prisma.leads.create({
      data: {
        id: leadId,
        studentName: name || 'Website Lead',
        phone,
        email,
        courseInterest: input.courseInterest?.trim() || 'Biology coaching (website enquiry)',
        stage: 'NEW_LEAD',
        priority: input.priority || 'WARM',
        source: mapLeadSource(input.source),
        sourceDetail,
        assignedToId: assignee.id,
        // NOTE: leads model has no utmSource/utmCampaign columns; UTM data is
        // preserved in the activities.metadata block below.
        gclid: input.gclid,
        nextFollowUpAt: new Date(Date.now() + 30 * 60 * 1000),
        lastContactedAt: new Date(),
        updatedAt: new Date(),
      },
    })

    await prisma.activities.create({
      data: {
        id: rand('act'),
        leadId,
        userId: assignee.id,
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

    // Follow-up task on the assigned counselor's board (owner-confirmed).
    await prisma.tasks.create({
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
        assignedToId: assignee.id,
        createdById: assignee.id,
        isAutoGenerated: true,
        triggerEvent: 'website_form_capture',
        updatedAt: new Date(),
      },
    })

    logger.info('upsertLead: CRM lead created', {
      service: 'upsert-lead',
      leadId,
      phone,
      source: sourceDetail,
    })

    // Fire-and-forget: WhatsApp alert to admin + initial score. Without this,
    // leads captured via generic forms (enquiry/blog/exit-intent) land in the
    // CRM silently and wait for task discovery.
    void sendAdminLeadNotification({
      name: name || 'Website Lead',
      phone,
      email: email || undefined,
      type: 'course_interest',
      courseInterest: input.courseInterest?.trim() || undefined,
      message: input.message?.slice(0, 300) || undefined,
      source: sourceDetail || undefined,
      gclid: input.gclid || undefined,
      utmSource: input.utmSource || undefined,
      utmMedium: input.utmMedium || undefined,
      leadId,
    }).catch(() => {})
    void updateLeadScore(leadId).catch(() => {})
    // WhatsApp welcome series (day 0 now, day 1/3/7 via nurturing cron).
    // No-ops until INTERAKT_API_KEY is configured, so owner controls activation.
    void startWelcomeSeries(leadId).catch(() => {})

    return { leadId, created: true }
  } catch (error) {
    // Never break the caller — the capture-log row + WhatsApp already hold it.
    logger.error('upsertLead failed (non-blocking)', {
      service: 'upsert-lead',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    return null
  }
}
