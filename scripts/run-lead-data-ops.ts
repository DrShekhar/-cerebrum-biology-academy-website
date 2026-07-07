/**
 * One-off Stage-3 data ops, mirroring the admin API tools exactly
 * (api/admin/leads/backfill + merge-duplicates) but runnable from the CLI
 * against the DB in .env.
 *
 *   npx tsx scripts/run-lead-data-ops.ts backfill --dry
 *   npx tsx scripts/run-lead-data-ops.ts backfill
 *   npx tsx scripts/run-lead-data-ops.ts merge --dry
 *   npx tsx scripts/run-lead-data-ops.ts merge
 */

import { prisma } from '../src/lib/prisma'
import { upsertLead } from '../src/lib/leads/upsertLead'

const CHILD_MODELS = [
  'activities',
  'agent_tasks',
  'crm_communications',
  'payment_links',
  'fee_plans',
  'followup_history',
  'followup_queue',
  'notes',
  'offers',
  'product_recommendations',
  'tasks',
  'whatsapp_conversations',
  'whatsapp_nurturing',
] as const

function last10(phone: string): string {
  return phone.replace(/\D/g, '').slice(-10)
}

async function backfill(dryRun: boolean) {
  const rows = await prisma.content_leads.findMany({
    where: { whatsappNumber: { not: null } },
    orderBy: { createdAt: 'asc' },
    take: 5000,
    select: {
      whatsappNumber: true,
      name: true,
      email: true,
      source: true,
      grade: true,
      interestedIn: true,
    },
  })
  const eligible = rows.filter((r) => (r.whatsappNumber || '').replace(/\D/g, '').length >= 8)
  console.log(`content_leads scanned: ${rows.length}, eligible with phone: ${eligible.length}`)
  if (dryRun) {
    console.log('DRY RUN — nothing written.')
    return
  }

  let created = 0
  let matchedExisting = 0
  let skipped = 0
  for (const r of eligible) {
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
  console.log(
    `Backfill complete: ${created} new CRM leads, ${matchedExisting} matched existing, ${skipped} skipped.`
  )
}

async function merge(dryRun: boolean) {
  const allLeads = await prisma.leads.findMany({
    select: {
      id: true,
      phone: true,
      email: true,
      studentName: true,
      demoBookingId: true,
      score: true,
      createdAt: true,
      stage: true,
    },
    orderBy: { createdAt: 'asc' },
  })

  const groups = new Map<string, typeof allLeads>()
  for (const lead of allLeads) {
    const key = last10(lead.phone)
    if (key.length < 10) continue
    const arr = groups.get(key) || []
    arr.push(lead)
    groups.set(key, arr)
  }

  const plans: Array<{ phone: string; keepId: string; keepName: string; mergeIds: string[] }> = []
  for (const [key, leads] of groups) {
    if (leads.length < 2) continue
    const [keep, ...dupes] = leads
    plans.push({
      phone: key,
      keepId: keep.id,
      keepName: keep.studentName,
      mergeIds: dupes.map((d) => d.id),
    })
  }

  console.log(`groups with duplicates: ${plans.length}`)
  for (const p of plans) {
    console.log(`  ${p.phone}: keep ${p.keepId} (${p.keepName}), remove ${p.mergeIds.join(', ')}`)
  }
  if (dryRun) {
    console.log('DRY RUN — nothing merged.')
    return
  }

  let removedLeads = 0
  const childMoves: Record<string, number> = {}
  for (const plan of plans) {
    const keep = allLeads.find((l) => l.id === plan.keepId)!
    for (const mergeId of plan.mergeIds) {
      const dupe = allLeads.find((l) => l.id === mergeId)!
      await prisma.$transaction(async (tx) => {
        for (const model of CHILD_MODELS) {
          const delegate = (tx as unknown as Record<string, { updateMany: Function }>)[model]
          const res = await delegate.updateMany({
            where: { leadId: mergeId },
            data: { leadId: plan.keepId },
          })
          childMoves[model] = (childMoves[model] || 0) + (res as { count: number }).count
        }
        const backfillData: Record<string, unknown> = {}
        if (!keep.email && dupe.email) backfillData.email = dupe.email
        if (!keep.demoBookingId && dupe.demoBookingId)
          backfillData.demoBookingId = dupe.demoBookingId
        if ((keep.score ?? 0) < (dupe.score ?? 0)) backfillData.score = dupe.score
        if (backfillData.demoBookingId) {
          await tx.leads.update({ where: { id: mergeId }, data: { demoBookingId: null } })
        }
        if (Object.keys(backfillData).length > 0) {
          backfillData.updatedAt = new Date()
          await tx.leads.update({ where: { id: plan.keepId }, data: backfillData })
          if (backfillData.email) keep.email = backfillData.email as string
          if (backfillData.demoBookingId) keep.demoBookingId = backfillData.demoBookingId as string
          if (backfillData.score !== undefined) keep.score = backfillData.score as number
        }
        await tx.leads.delete({ where: { id: mergeId } })
      })
      removedLeads++
    }
  }
  console.log(`merged: removed ${removedLeads} duplicate leads; child records moved:`, childMoves)
}

async function main() {
  const [op, flag] = process.argv.slice(2)
  const dryRun = flag === '--dry'
  if (op === 'backfill') await backfill(dryRun)
  else if (op === 'merge') await merge(dryRun)
  else {
    console.error('usage: tsx scripts/run-lead-data-ops.ts <backfill|merge> [--dry]')
    process.exit(1)
  }
  await prisma.$disconnect()
}

void main()
