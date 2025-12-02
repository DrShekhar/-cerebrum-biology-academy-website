/**
 * Counselor KPI API
 * GET: Fetch KPI metrics for a counselor
 * POST: Record daily KPI metrics
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { startOfDay, endOfDay, subDays, startOfWeek, startOfMonth } from 'date-fns'

const createKPISchema = z.object({
  date: z.string().optional(),
  leadsCreated: z.number().int().min(0).optional(),
  leadsContacted: z.number().int().min(0).optional(),
  leadsConverted: z.number().int().min(0).optional(),
  demosScheduled: z.number().int().min(0).optional(),
  demosCompleted: z.number().int().min(0).optional(),
  demosNoShow: z.number().int().min(0).optional(),
  callsMade: z.number().int().min(0).optional(),
  callDurationTotal: z.number().int().min(0).optional(),
  whatsappsSent: z.number().int().min(0).optional(),
  emailsSent: z.number().int().min(0).optional(),
  followUpsMade: z.number().int().min(0).optional(),
  tasksCompleted: z.number().int().min(0).optional(),
  notes: z.string().optional(),
})

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'counselor' && session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Counselor access only' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(req.url)
    const period = searchParams.get('period') || 'today'
    const counselorId = searchParams.get('counselorId') || session.user.id

    if (session.user.role === 'counselor' && counselorId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Can only view own KPIs' },
        { status: 403 }
      )
    }

    let startDate: Date
    const endDate: Date = endOfDay(new Date())

    switch (period) {
      case 'today':
        startDate = startOfDay(new Date())
        break
      case 'week':
        startDate = startOfWeek(new Date(), { weekStartsOn: 1 })
        break
      case 'month':
        startDate = startOfMonth(new Date())
        break
      case 'last7days':
        startDate = startOfDay(subDays(new Date(), 7))
        break
      case 'last30days':
        startDate = startOfDay(subDays(new Date(), 30))
        break
      default:
        startDate = startOfDay(new Date())
    }

    const kpis = await prisma.counselor_kpis.findMany({
      where: {
        counselorId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: 'desc',
      },
    })

    const aggregated = kpis.reduce(
      (acc, kpi) => ({
        leadsCreated: acc.leadsCreated + kpi.leadsCreated,
        leadsContacted: acc.leadsContacted + kpi.leadsContacted,
        leadsConverted: acc.leadsConverted + kpi.leadsConverted,
        demosScheduled: acc.demosScheduled + kpi.demosScheduled,
        demosCompleted: acc.demosCompleted + kpi.demosCompleted,
        demosNoShow: acc.demosNoShow + kpi.demosNoShow,
        callsMade: acc.callsMade + kpi.callsMade,
        callDurationTotal: acc.callDurationTotal + kpi.callDurationTotal,
        whatsappsSent: acc.whatsappsSent + kpi.whatsappsSent,
        emailsSent: acc.emailsSent + kpi.emailsSent,
        followUpsMade: acc.followUpsMade + kpi.followUpsMade,
        tasksCompleted: acc.tasksCompleted + kpi.tasksCompleted,
        tasksPending: acc.tasksPending + kpi.tasksPending,
        revenueGenerated: acc.revenueGenerated + Number(kpi.revenueGenerated),
        enrollmentsGenerated: acc.enrollmentsGenerated + kpi.enrollmentsGenerated,
      }),
      {
        leadsCreated: 0,
        leadsContacted: 0,
        leadsConverted: 0,
        demosScheduled: 0,
        demosCompleted: 0,
        demosNoShow: 0,
        callsMade: 0,
        callDurationTotal: 0,
        whatsappsSent: 0,
        emailsSent: 0,
        followUpsMade: 0,
        tasksCompleted: 0,
        tasksPending: 0,
        revenueGenerated: 0,
        enrollmentsGenerated: 0,
      }
    )

    const conversionRate =
      aggregated.leadsContacted > 0
        ? ((aggregated.leadsConverted / aggregated.leadsContacted) * 100).toFixed(2)
        : '0.00'

    const avgDealValue =
      aggregated.enrollmentsGenerated > 0
        ? (aggregated.revenueGenerated / aggregated.enrollmentsGenerated).toFixed(2)
        : '0.00'

    return NextResponse.json({
      success: true,
      data: {
        period,
        startDate,
        endDate,
        metrics: aggregated,
        calculated: {
          conversionRate: parseFloat(conversionRate),
          avgDealValue: parseFloat(avgDealValue),
        },
        dailyRecords: kpis,
      },
    })
  } catch (error) {
    console.error('Error fetching KPIs:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch KPIs' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role !== 'counselor' && session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Counselor access only' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const validatedData = createKPISchema.parse(body)

    const date = validatedData.date ? new Date(validatedData.date) : new Date()
    const dateOnly = startOfDay(date)

    const existingLeads = await prisma.leads.findMany({
      where: {
        assignedToId: session.user.id,
        createdAt: {
          gte: startOfDay(dateOnly),
          lte: endOfDay(dateOnly),
        },
      },
    })

    const convertedLeads = existingLeads.filter((lead) => lead.stage === 'ENROLLED')

    const demos = await prisma.demo_bookings.findMany({
      where: {
        assignedTo: session.user.id,
        createdAt: {
          gte: startOfDay(dateOnly),
          lte: endOfDay(dateOnly),
        },
      },
    })

    const enrollments = await prisma.enrollments.findMany({
      where: {
        users: {
          leads: {
            some: {
              assignedToId: session.user.id,
            },
          },
        },
        enrollmentDate: {
          gte: startOfDay(dateOnly),
          lte: endOfDay(dateOnly),
        },
      },
      include: {
        courses: {
          select: {
            totalFees: true,
          },
        },
      },
    })

    const totalRevenue = enrollments.reduce((sum, enrollment) => sum + enrollment.totalFees, 0)

    const pendingTasks = await prisma.tasks.count({
      where: {
        assignedToId: session.user.id,
        status: 'PENDING',
      },
    })

    const kpi = await prisma.counselor_kpis.upsert({
      where: {
        counselorId_date: {
          counselorId: session.user.id,
          date: dateOnly,
        },
      },
      create: {
        counselorId: session.user.id,
        date: dateOnly,
        leadsCreated: validatedData.leadsCreated ?? existingLeads.length,
        leadsContacted: validatedData.leadsContacted ?? 0,
        leadsConverted: validatedData.leadsConverted ?? convertedLeads.length,
        demosScheduled: validatedData.demosScheduled ?? demos.length,
        demosCompleted: validatedData.demosCompleted ?? 0,
        demosNoShow: validatedData.demosNoShow ?? 0,
        callsMade: validatedData.callsMade ?? 0,
        callDurationTotal: validatedData.callDurationTotal ?? 0,
        whatsappsSent: validatedData.whatsappsSent ?? 0,
        emailsSent: validatedData.emailsSent ?? 0,
        followUpsMade: validatedData.followUpsMade ?? 0,
        tasksCompleted: validatedData.tasksCompleted ?? 0,
        tasksPending: pendingTasks,
        revenueGenerated: totalRevenue,
        enrollmentsGenerated: enrollments.length,
        notes: validatedData.notes,
      },
      update: {
        leadsCreated: validatedData.leadsCreated,
        leadsContacted: validatedData.leadsContacted,
        leadsConverted: validatedData.leadsConverted,
        demosScheduled: validatedData.demosScheduled,
        demosCompleted: validatedData.demosCompleted,
        demosNoShow: validatedData.demosNoShow,
        callsMade: validatedData.callsMade,
        callDurationTotal: validatedData.callDurationTotal,
        whatsappsSent: validatedData.whatsappsSent,
        emailsSent: validatedData.emailsSent,
        followUpsMade: validatedData.followUpsMade,
        tasksCompleted: validatedData.tasksCompleted,
        tasksPending: pendingTasks,
        notes: validatedData.notes,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'KPI metrics recorded successfully',
      data: kpi,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error recording KPIs:', error)
    return NextResponse.json({ success: false, error: 'Failed to record KPIs' }, { status: 500 })
  }
}
