import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireCronAuth } from '@/lib/auth/cron-auth'
import { upsertLead, normalizePhone } from '@/lib/leads/upsertLead'
import { captureMessage } from '@/lib/sentry'

/**
 * GET /api/cron/leads-reconcile — daily safety net for silent CRM-write
 * failures.
 *
 * Public capture routes write their raw log row (content_leads or
 * contact_inquiries) and then call upsertLead() fire-and-forget. If that CRM
 * write fails, the prospect exists only in the log and no counselor ever sees
 * them. This cron re-promotes any recent phone-bearing capture-log row that
 * has NO matching `leads` row.
 *
 * Rows that already match a CRM lead are skipped entirely (no touchpoint, no
 * activity row) — reconciliation must not spam lead timelines or rescore
 * leads every night. Anything promoted here means the live path failed, so a
 * warning goes to Sentry.
 */

const LOOKBACK_DAYS = 7
const BATCH_LIMIT = 500

interface Candidate {
  phone: string
  input: Parameters<typeof upsertLead>[0]
}

async function runReconcile() {
  const since = new Date(Date.now() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000)

  const [contentRows, inquiryRows] = await Promise.all([
    prisma.content_leads.findMany({
      where: { createdAt: { gte: since }, whatsappNumber: { not: null } },
      orderBy: { createdAt: 'asc' },
      take: BATCH_LIMIT,
      select: {
        whatsappNumber: true,
        name: true,
        email: true,
        source: true,
        grade: true,
        interestedIn: true,
      },
    }),
    prisma.contact_inquiries.findMany({
      where: { createdAt: { gte: since } },
      orderBy: { createdAt: 'asc' },
      take: BATCH_LIMIT,
      select: {
        phone: true,
        name: true,
        email: true,
        source: true,
        supportType: true,
        message: true,
      },
    }),
  ])

  const candidates: Candidate[] = [
    ...contentRows.map((row) => ({
      phone: row.whatsappNumber || '',
      input: {
        name: row.name,
        phone: row.whatsappNumber as string,
        email: row.email,
        courseInterest: row.interestedIn || (row.grade ? `Biology — ${row.grade}` : undefined),
        source: row.source ? `reconcile:${row.source}` : 'reconcile:content_leads',
      },
    })),
    ...inquiryRows.map((row) => ({
      phone: row.phone || '',
      input: {
        name: row.name,
        phone: row.phone,
        email: row.email,
        courseInterest: row.supportType || undefined,
        message: row.message?.slice(0, 500) || undefined,
        source: row.source ? `reconcile:inquiry:${row.source}` : 'reconcile:contact_inquiries',
      },
    })),
  ]

  let promoted = 0
  let alreadyInCrm = 0
  let unusablePhone = 0
  let failed = 0

  // Sequential on purpose: keeps round-robin assignment balanced and DB load
  // gentle, same as the manual backfill route.
  for (const candidate of candidates) {
    const phone = normalizePhone(candidate.phone)
    if (phone.replace(/\D/g, '').length < 8) {
      unusablePhone++
      continue
    }

    // Same dedup predicate as upsertLeadCore — indexed phoneNormalized with a
    // legacy endsWith fallback.
    const last10 = phone.slice(-10)
    const existing = await prisma.leads.findFirst({
      where: { OR: [{ phoneNormalized: last10 }, { phone: { endsWith: last10 } }] },
      select: { id: true },
    })
    if (existing) {
      alreadyInCrm++
      continue
    }

    const result = await upsertLead(candidate.input)
    if (result) promoted++
    else failed++
  }

  if (promoted > 0 || failed > 0) {
    // Anything promoted here was missed by the live capture path — worth an
    // alert so the underlying upsertLead failure gets investigated.
    captureMessage('leads-reconcile: found capture-log rows missing from CRM', 'warning', {
      scanned: candidates.length,
      promoted,
      failed,
      lookbackDays: LOOKBACK_DAYS,
    })
  }

  return { scanned: candidates.length, promoted, alreadyInCrm, unusablePhone, failed }
}

export const GET = requireCronAuth(async () => {
  try {
    const result = await runReconcile()
    return NextResponse.json({ success: true, ...result })
  } catch (error) {
    console.error('leads-reconcile cron failed:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Reconcile failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
})
