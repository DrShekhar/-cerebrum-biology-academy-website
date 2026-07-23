import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminAuth } from '@/lib/auth'
import { upsertLead } from '@/lib/leads/upsertLead'

/**
 * POST /api/admin/leads/backfill
 *
 * One-time (re-runnable) backfill of the raw capture logs → the `leads` CRM,
 * using the same upsertLead() helper the live capture routes use. Safe to run
 * more than once: upsertLead dedups by phone (last-10 match), so
 * already-present leads become touchpoints, not duplicates.
 *
 * Scans BOTH capture logs:
 * - content_leads (lead magnets, blog, exit-intent, SEO forms)
 * - contact_inquiries (contact form, chatbot, olympiad, careers) — added in
 *   the Phase 4 consolidation pass; historical rows from before the live
 *   dual-write were CRM-invisible.
 *
 * Replaces the older /api/admin/leads/migrate route, which read field names
 * that don't exist on content_leads (whatsappPhone/engagementScore/captureType)
 * and would have created phoneless, non-deduped junk.
 *
 * Body (optional): { days?: number, limit?: number, dryRun?: boolean }
 */

function hasUsablePhone(phone: string | null | undefined): boolean {
  return ((phone || '').replace(/\D/g, '') || '').length >= 8
}

export async function POST(request: NextRequest) {
  try {
    await requireAdminAuth()

    const body = await request.json().catch(() => ({}) as Record<string, unknown>)
    const days = Math.min(Number(body.days) || 3650, 3650)
    const limit = Math.min(Number(body.limit) || 1000, 5000)
    const dryRun = body.dryRun === true
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

    // Only rows that carry a usable phone can become CRM leads (the CRM
    // dedups/keys on phone). Email-only newsletter rows are left in the log.
    const [contentRows, inquiryRows] = await Promise.all([
      prisma.content_leads.findMany({
        where: { createdAt: { gte: since }, whatsappNumber: { not: null } },
        orderBy: { createdAt: 'asc' },
        take: limit,
        select: {
          whatsappNumber: true,
          name: true,
          email: true,
          source: true,
          grade: true,
          interestedIn: true,
          createdAt: true,
        },
      }),
      prisma.contact_inquiries.findMany({
        where: { createdAt: { gte: since } },
        orderBy: { createdAt: 'asc' },
        take: limit,
        select: {
          phone: true,
          name: true,
          email: true,
          source: true,
          supportType: true,
          message: true,
          utmSource: true,
          utmMedium: true,
          utmCampaign: true,
          gclid: true,
          createdAt: true,
        },
      }),
    ])

    const eligibleContent = contentRows.filter((r) => hasUsablePhone(r.whatsappNumber))
    const eligibleInquiries = inquiryRows.filter((r) => hasUsablePhone(r.phone))
    const eligibleTotal = eligibleContent.length + eligibleInquiries.length

    if (dryRun) {
      return NextResponse.json({
        success: true,
        dryRun: true,
        contentLeadsScanned: contentRows.length,
        contactInquiriesScanned: inquiryRows.length,
        eligibleWithPhone: eligibleTotal,
        message: 'Dry run — no CRM leads written.',
      })
    }

    let created = 0
    let matchedExisting = 0
    let skipped = 0

    // Sequential to keep round-robin assignment balanced and DB load gentle.
    for (const r of eligibleContent) {
      const result = await upsertLead({
        name: r.name,
        phone: r.whatsappNumber as string,
        email: r.email,
        courseInterest: r.interestedIn || (r.grade ? `Biology — ${r.grade}` : undefined),
        source: r.source ? `backfill:${r.source}` : 'backfill:content_leads',
      })
      if (!result) skipped++
      else if (result.created) created++
      else matchedExisting++
    }

    for (const r of eligibleInquiries) {
      const result = await upsertLead({
        name: r.name,
        phone: r.phone,
        email: r.email,
        courseInterest: r.supportType || undefined,
        message: r.message?.slice(0, 500) || undefined,
        source: r.source ? `backfill:inquiry:${r.source}` : 'backfill:contact_inquiries',
        utmSource: r.utmSource,
        utmMedium: r.utmMedium,
        utmCampaign: r.utmCampaign,
        gclid: r.gclid,
      })
      if (!result) skipped++
      else if (result.created) created++
      else matchedExisting++
    }

    return NextResponse.json({
      success: true,
      contentLeadsScanned: contentRows.length,
      contactInquiriesScanned: inquiryRows.length,
      eligibleWithPhone: eligibleTotal,
      created,
      matchedExisting,
      skipped,
      message: `Backfill complete: ${created} new CRM leads, ${matchedExisting} matched existing, ${skipped} skipped.`,
    })
  } catch (error) {
    if (error instanceof Error && error.message.includes('Admin')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Lead backfill error:', error)
    return NextResponse.json({ success: false, error: 'Backfill failed' }, { status: 500 })
  }
}
