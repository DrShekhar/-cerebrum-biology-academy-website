import { NextRequest, NextResponse } from 'next/server'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { prisma } from '@/lib/prisma'
import type { QueueStatus } from '@/generated/prisma'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error
    const { session } = authResult

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as QueueStatus | null
    const ruleId = searchParams.get('ruleId')
    const leadId = searchParams.get('leadId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    const where: any = {}

    if (status) {
      where.status = status
    }

    if (ruleId) {
      where.ruleId = ruleId
    }

    if (leadId) {
      where.leadId = leadId
    } else {
      where.lead = {
        assignedToId: session.userId,
      }
    }

    const [queueItems, total] = await Promise.all([
      prisma.followup_queue.findMany({
        where,
        include: {
          lead: {
            select: {
              id: true,
              studentName: true,
              email: true,
              phone: true,
              stage: true,
            },
          },
          rule: {
            select: {
              id: true,
              name: true,
              actionType: true,
              triggerType: true,
            },
          },
        },
        orderBy: [{ scheduledFor: 'asc' }, { createdAt: 'desc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.followup_queue.count({ where }),
    ])

    const statusCounts = await prisma.followup_queue.groupBy({
      by: ['status'],
      where: {
        lead: {
          assignedToId: session.userId,
        },
      },
      _count: true,
    })

    const stats = {
      total,
      pending: statusCounts.find((s) => s.status === 'PENDING')?._count || 0,
      processing: statusCounts.find((s) => s.status === 'PROCESSING')?._count || 0,
      completed: statusCounts.find((s) => s.status === 'COMPLETED')?._count || 0,
      failed: statusCounts.find((s) => s.status === 'FAILED')?._count || 0,
      skipped: statusCounts.find((s) => s.status === 'SKIPPED')?._count || 0,
      cancelled: statusCounts.find((s) => s.status === 'CANCELLED')?._count || 0,
    }

    return NextResponse.json({
      success: true,
      data: queueItems,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats,
    })
  } catch (error) {
    console.error('Error fetching follow-up queue:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch follow-up queue',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
