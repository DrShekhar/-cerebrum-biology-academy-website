import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { prisma } from '@/lib/prisma'
import { verifyCronAuth } from '@/lib/auth/cron-auth'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999)

/**
 * Hourly counselor-KPI compute (the leaderboard was previously only updated
 * when someone manually POSTed — it could sit stale/empty for days).
 *
 * For every COUNSELOR (and ADMIN with assigned leads) upserts today's
 * counselor_kpis row: leads created/contacted/converted, demos, follow-ups,
 * per-stage counts, conversion rate, first-response time, revenue.
 */
export async function GET(request: NextRequest) {
  const auth = verifyCronAuth(request)
  if (!auth.authorized) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const now = new Date()
    const dayStart = startOfDay(now)
    const dayEnd = endOfDay(now)

    const counselors = await prisma.users.findMany({
      where: { role: { in: ['COUNSELOR', 'ADMIN'] } },
      select: { id: true },
    })

    let updated = 0
    for (const counselor of counselors) {
      // Relation filters inside groupBy trip Prisma's TS circularity check —
      // resolve the counselor's lead ids first, filter comms by id list.
      const assignedLeadIds = (
        await prisma.leads.findMany({
          where: { assignedToId: counselor.id },
          select: { id: true },
        })
      ).map((l) => l.id)

      const [leadsToday, stageCounts, demos, comms, tasksDone, tasksPending, payments] =
        await Promise.all([
          prisma.leads.findMany({
            where: {
              assignedToId: counselor.id,
              createdAt: { gte: dayStart, lte: dayEnd },
            },
            select: { id: true, stage: true, lastContactedAt: true, createdAt: true },
          }),
          prisma.leads.groupBy({
            by: ['stage'],
            where: { assignedToId: counselor.id },
            _count: { id: true },
          }),
          prisma.demo_bookings.groupBy({
            by: ['status'],
            where: { assignedTo: counselor.id, createdAt: { gte: dayStart, lte: dayEnd } },
            _count: { id: true },
          }),
          prisma.crm_communications.findMany({
            where: {
              leadId: { in: assignedLeadIds },
              direction: 'OUTBOUND',
              sentAt: { gte: dayStart, lte: dayEnd },
            },
            select: { type: true },
          }),
          prisma.tasks.count({
            where: {
              assignedToId: counselor.id,
              status: 'COMPLETED',
              updatedAt: { gte: dayStart, lte: dayEnd },
            },
          }),
          prisma.tasks.count({
            where: { assignedToId: counselor.id, status: { in: ['PENDING', 'IN_PROGRESS'] } },
          }),
          // Revenue = payments actually RECEIVED today on this counselor's
          // leads (fee_payments.paidAt), never the cumulative plan total —
          // summing amountPaid per day double-counts across days.
          prisma.fee_payments.aggregate({
            where: {
              fee_plans: { leads: { assignedToId: counselor.id } },
              paidAt: { gte: dayStart, lte: dayEnd },
            },
            _sum: { amount: true },
          }),
        ])

      const byStage = (stage: string) => stageCounts.find((s) => s.stage === stage)?._count.id || 0
      const byComm = (type: string) => comms.filter((row) => row.type === type).length
      const byDemo = (status: string) => demos.find((d) => d.status === status)?._count.id || 0

      const contacted = leadsToday.filter((l) => l.lastContactedAt).length
      const converted = leadsToday.filter(
        (l) => l.stage === 'ENROLLED' || l.stage === 'ACTIVE_STUDENT'
      ).length
      // Avg first-response minutes for today's contacted leads.
      const responseTimes = leadsToday
        .filter((l) => l.lastContactedAt)
        .map((l) => Math.max(0, (l.lastContactedAt!.getTime() - l.createdAt.getTime()) / 60000))
      const avgResponseTime = responseTimes.length
        ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length)
        : null

      const totalAssigned = stageCounts.reduce((a, s) => a + s._count.id, 0)
      const totalEnrolled = byStage('ENROLLED') + byStage('ACTIVE_STUDENT')
      const conversionRate = totalAssigned > 0 ? (totalEnrolled / totalAssigned) * 100 : 0

      const data = {
        leadsCreated: leadsToday.length,
        leadsContacted: contacted,
        leadsConverted: converted,
        demosScheduled: demos.reduce((a, d) => a + d._count.id, 0),
        demosCompleted: byDemo('COMPLETED'),
        demosNoShow: byDemo('NO_SHOW'),
        callsMade: byComm('CALL'),
        whatsappsSent: byComm('WHATSAPP'),
        emailsSent: byComm('EMAIL'),
        avgResponseTime,
        conversionRate,
        tasksCompleted: tasksDone,
        tasksPending,
        revenueGenerated: Number(payments._sum.amount || 0),
        enrollmentsGenerated: converted,
        newLeads: byStage('NEW_LEAD'),
        demoScheduledLeads: byStage('DEMO_SCHEDULED'),
        demoCompletedLeads: byStage('DEMO_COMPLETED'),
        offerSentLeads: byStage('OFFER_SENT'),
        negotiatingLeads: byStage('NEGOTIATING'),
        enrolledLeads: totalEnrolled,
        lostLeads: byStage('LOST'),
        updatedAt: new Date(),
      }

      await prisma.counselor_kpis.upsert({
        where: { counselorId_date: { counselorId: counselor.id, date: dayStart } },
        create: { id: randomUUID(), counselorId: counselor.id, date: dayStart, ...data },
        update: data,
      })
      updated++
    }

    return NextResponse.json({ success: true, counselors: updated })
  } catch (error) {
    console.error('[cron/counselor-kpis] failed:', error)
    return NextResponse.json({ success: false, error: 'KPI compute failed' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  return GET(request)
}
