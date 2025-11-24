import { NextRequest, NextResponse } from 'next/server'
import { authenticateCounselor } from '@/lib/auth/counselor-auth'
import { prisma } from '@/lib/prisma'
import type { FollowupStatus } from '@/generated/prisma'

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateCounselor()
    if ('error' in authResult) return authResult.error
    const { session } = authResult

    const { searchParams } = new URL(request.url)
    const leadId = searchParams.get('leadId')
    const ruleId = searchParams.get('ruleId')
    const status = searchParams.get('status') as FollowupStatus | null
    const channel = searchParams.get('channel')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    const where: any = {}

    if (leadId) {
      where.leadId = leadId
    } else {
      where.lead = {
        assignedToId: session.userId,
      }
    }

    if (ruleId) {
      where.ruleId = ruleId
    }

    if (status) {
      where.status = status
    }

    if (channel) {
      where.channel = channel
    }

    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) {
        where.createdAt.gte = new Date(startDate)
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate)
      }
    }

    const [historyItems, total] = await Promise.all([
      prisma.followup_history.findMany({
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
              description: true,
              actionType: true,
              triggerType: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.followup_history.count({ where }),
    ])

    const statusCounts = await prisma.followup_history.groupBy({
      by: ['status'],
      where: {
        lead: {
          assignedToId: session.userId,
        },
      },
      _count: true,
    })

    const channelCounts = await prisma.followup_history.groupBy({
      by: ['channel'],
      where: {
        lead: {
          assignedToId: session.userId,
        },
      },
      _count: true,
    })

    const stats = {
      total,
      sent: statusCounts.find((s) => s.status === 'SENT')?._count || 0,
      failed: statusCounts.find((s) => s.status === 'FAILED')?._count || 0,
      byChannel: channelCounts.map((c) => ({
        channel: c.channel,
        count: c._count,
      })),
    }

    return NextResponse.json({
      success: true,
      data: historyItems,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      stats,
    })
  } catch (error) {
    console.error('Error fetching follow-up history:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch follow-up history',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
